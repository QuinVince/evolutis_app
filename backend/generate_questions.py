# scripts/generate_questions.py

from mistralai import Mistral
import os
import sys
import json
from dotenv import load_dotenv
import os

# Charge les variables d'environnement depuis le fichier .env
load_dotenv()

# Vous pouvez maintenant accéder à la variable d'environnement comme ceci :
api_key = os.getenv("MISTRAL_API_KEY")

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Query is required"}))
        sys.exit(1)

    query = sys.argv[1]
    
    # Validate query is not empty
    if not query.strip():
        print(json.dumps({"error": "Query cannot be empty"}))
        sys.exit(1)

    api_key = os.getenv("MISTRAL_API_KEY")
    if not api_key:
        print(json.dumps({"error": "MISTRAL_API_KEY environment variable not set."}))
        sys.exit(1)

    try:
        client = Mistral(api_key=api_key)
        model = "open-mistral-7b"

        prompt = '''You are an assistant for a medical reviewer conducting a systematic literature review in the domain
        of medical devices. 
        Based on the following description, generate a list of follow-up questions that will help you better
         understand the research needs and generate a more accurate PubMed query. 
         The questions should be clear, concise, and aimed at clarifying the research scope. 
         Topics are useful of a high expertise level, then propose very relevant and expert questions to clarify the research scope.
         Ask maximum 5 questions, that cannot exceed 30 words each

         Include systematically a question about the body part related to the medical device, if it relevant only.
         Among relevant questions, ones that help to understand the PICO (population, intervention, comparison, outcome) can be useful
        Exclude questions about study type and timeframe
        Questions can be adressed directly to the author: "About what type are you interested in ?"
        Description:
        '''

        full_prompt = prompt + query + "\nQuestions:"

        chat_response = client.chat.complete(
            model=model,
            messages=[{"role": "user", "content": full_prompt}],
            temperature=0.5,
            max_tokens=500,
            random_seed=0
        )
        
        if not chat_response.choices:
            print(json.dumps({"error": "No response generated"}))
            sys.exit(1)
            
        questions_text = chat_response.choices[0].message.content.strip()
        
        if not questions_text:
            print(json.dumps({"error": "Empty response from model"}))
            sys.exit(1)

        # Convert the LLM output to a JSON array of questions
        questions = []
        for line in questions_text.split('\n'):
            line = line.strip()
            if line.startswith('- ') or line.startswith('* ') or line[0].isdigit() or line.startswith('Q:'):
                # Remove bullet points, numbering, or prefixes like 'Q:'
                if line[0].isdigit():
                    question = line.split('.', 1)[1].strip()
                elif line.startswith('Q:'):
                    question = line.split(':', 1)[1].strip()
                else:
                    question = line[2:].strip()
                if question:  # Only add non-empty questions
                    questions.append(question)
            elif line:
                questions.append(line)

        if not questions:
            print(json.dumps({"error": "No valid questions generated"}))
            sys.exit(1)

        # Output as JSON
        print(json.dumps({"questions": questions}))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
