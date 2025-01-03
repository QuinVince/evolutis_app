from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import subprocess
import json
import logging
import os
from dotenv import load_dotenv
from .document_stats import DocumentStats
#For production in replit, replace by: 
#from .prisma_generator import generate_prisma_diagram
from .prisma_generator import generate_prisma_diagram
import tempfile

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str

class PubMedQueryRequest(BaseModel):
    query: str
    answers: dict

class SynonymRequest(BaseModel):
    description: str
    questions: list
    answers: dict
    query: str

class PrismaData(BaseModel):
    totalVolume: int
    pubmedVolume: int
    semanticScholarVolume: int
    duplicates: int
    postDeduplication: int
    hundredPercentMatch: int

# Keep only the necessary endpoints (generate_questions, generate_pubmed_query, generate_synonyms, export_prisma)
# Remove all project-related endpoints

@app.post("/generate_questions")
async def generate_questions(request: Request):
    try:
        body = await request.json()
        logger.info(f"Received request body: {body}")
        query = body.get('query')
        if not query:
            raise HTTPException(status_code=400, detail="Query is required")

        # Check if MISTRAL_API_KEY is set
        if not os.getenv("MISTRAL_API_KEY"):
            raise HTTPException(status_code=500, detail="MISTRAL_API_KEY environment variable not set")
        #For production in replit, replace by:
        result = subprocess.run(['python', 'backend/generate_questions.py', query], capture_output=True, text=True)
        logger.info(f"generate_questions.py output: {result.stdout}")
        if result.stderr:
            logger.error(f"generate_questions.py error: {result.stderr}")

        try:
            return json.loads(result.stdout)
        except json.JSONDecodeError:
            error_message = result.stdout or result.stderr or "Unknown error occurred"
            logger.error(f"Failed to parse JSON: {error_message}")
            raise HTTPException(status_code=500, detail=f"Failed to parse response from generate_questions.py: {error_message}")
    except Exception as e:
        logger.error(f"Error in generate_questions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate_pubmed_query")
async def generate_pubmed_query(request: PubMedQueryRequest):
    logger.info(f"Received PubMed query request: {request}")
    try:
        logger.info("Running generate_pubmed_query.py")
        
        # Create a temporary file for the output
        with tempfile.NamedTemporaryFile(suffix='.json', delete=False) as tmp_file:
            output_path = tmp_file.name
        
        result = subprocess.run(
            ['python', 'backend/generate_pubmed_query.py', request.query, json.dumps(request.answers), output_path], 
            capture_output=True, 
            text=True
        )
        
        if result.stderr:
            logger.warning(f"generate_pubmed_query.py stderr: {result.stderr}")
        
        # Read the result from the temporary file
        try:
            with open(output_path, 'r', encoding='utf-8') as f:
                query_data = json.load(f)
            
            # Clean up the temporary file
            os.unlink(output_path)
            
            return query_data
            
        except Exception as e:
            logger.error(f"Error reading query result: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to read query result: {str(e)}")
            
    except Exception as e:
        logger.error(f"Error in generate_pubmed_query: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate_synonyms")
async def generate_synonyms(request: SynonymRequest):
    logger.info(f"Received synonym request: {request}")
    try:
        script_path = os.path.join(os.path.dirname(__file__), 'generate_synonyms.py')
        logger.info(f"Looking for script at: {script_path}")
        if not os.path.exists(script_path):
            logger.error(f"Script not found at {script_path}")
            raise FileNotFoundError(f"The script {script_path} was not found.")

        logger.info("Running generate_synonyms.py")
        result = subprocess.run(['python', script_path, 
                                 request.description, 
                                 json.dumps(request.questions), 
                                 json.dumps(request.answers), 
                                 request.query], 
                                capture_output=True, text=True)
        logger.info(f"generate_synonyms.py output: {result.stdout}")
        if result.stderr:
            logger.error(f"generate_synonyms.py error: {result.stderr}")

        try:
            return json.loads(result.stdout)
        except json.JSONDecodeError:
            logger.error(f"Failed to parse JSON from generate_synonyms.py: {result.stdout}")
            return {"synonyms": [], "error": "Failed to parse response from generate_synonyms.py"}
    except Exception as e:
        logger.error(f"Error in generate_synonyms: {str(e)}")
        return {"synonyms": [], "error": str(e)}

@app.get("/test_synonyms")
async def test_synonyms():
    logger.debug("test_synonyms endpoint called")
    return {"message": "Synonym route is working"}

@app.post("/export_prisma")
async def export_prisma(data: PrismaData):
    logger.debug("export_prisma endpoint called with data")
    try:
        logger.debug("Generating PRISMA diagram...")
        image_path = generate_prisma_diagram(data.dict())
        logger.debug(f"PRISMA diagram generated successfully at {image_path}")
        if not os.path.exists(image_path):
            logger.error(f"Generated image file not found: {image_path}")
            raise FileNotFoundError(f"Generated image file not found: {image_path}")
        logger.debug(f"Sending file response for {image_path}")
        return FileResponse(image_path, media_type="image/png", filename="prisma_diagram.png")
    except Exception as e:
        logger.error(f"Error in export_prisma: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate_stats")
async def generate_stats(request: Request):
    try:
        body = await request.json()
        project_id = body.get('projectId')
        if not project_id:
            raise HTTPException(status_code=400, detail="Project ID is required")
        
        stats = DocumentStats.generate_stats(project_id)
        logger.info(f"Generated stats for project {project_id}: {stats}")
        return stats
    except Exception as e:
        logger.error(f"Error generating stats: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Add this at the end of the file
logger.debug("All routes registered:")
for route in app.routes:
    if hasattr(route, 'methods'):
        logger.debug(f"{route.methods} {route.path}")
    else:
        logger.debug(f"Mount: {route.path}")

# Mount the static directory
frontend_dir = os.path.join(os.path.dirname(__file__), '..', 'server', 'build')
#For production in replit, replace by:
app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="static")
logger.debug(f"Serving static files from {frontend_dir}")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=port)
