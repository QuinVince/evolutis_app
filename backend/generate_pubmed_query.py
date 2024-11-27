# scripts/generate_pubmed_query.py

from mistralai import Mistral
import os
import sys
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the MISTRAL_API_KEY
api_key = os.getenv("MISTRAL_API_KEY")

def main():
    if len(sys.argv) < 4:
        print(json.dumps({"error": "Not enough arguments. Usage: python generate_pubmed_query.py <description> <answers_json> <output_path>"}))
        sys.exit(1)

    description = sys.argv[1]
    answers_json = sys.argv[2]
    output_path = sys.argv[3]

    try:
        answers = json.loads(answers_json)
    except json.JSONDecodeError:
        save_error("Answers must be a valid JSON string.", output_path)
        sys.exit(1)

    if not api_key:
        save_error("MISTRAL_API_KEY environment variable not set.", output_path)
        sys.exit(1)

    try:
        client = Mistral(api_key=api_key)
        model = "mistral-large-latest"

        prompt = '''Generate a PubMed query for a systematic review based on the following description and answers. 
        The query should be structured as a series of subqueries combined with boolean operators.
        
        Return ONLY a JSON object with the following structure, without any markdown formatting or additional text:
        {
            "subqueries": [
                {
                    "content": "<terms joined by OR>",
                    "operator": "AND"
                },
                {
                    "content": "<terms joined by OR>",
                    "operator": "AND"
                }
            ]
        }

        Example input: Research on diet impact on hypertension
        Example output:
        {
            "subqueries": [
                {
                    "content": "(Hypertension OR high blood pressure OR elevated blood pressure)",
                    "operator": "AND"
                },
                {
                    "content": "(Diet OR Nutrition OR dietary intervention OR nutritional intervention)",
                    "operator": "AND"
                }
            ]
        }

        Description: '''

        full_prompt = prompt + "\n\nDescription:\n" + description + "\n\nAnswers:\n" + json.dumps(answers)

        chat_response = client.chat.complete(
            model=model,
            messages=[{"role": "user", "content": full_prompt}],
            temperature=0,
            max_tokens=1000,
            random_seed=0,
            response_format = {"type": "json_object"}
        )
        
        response_text = chat_response.choices[0].message.content.strip()
        
        try:
            query_structure = json.loads(response_text)
            if not isinstance(query_structure, dict) or 'subqueries' not in query_structure:
                raise ValueError("Invalid response structure")
            
            for subquery in query_structure['subqueries']:
                if not isinstance(subquery, dict) or 'content' not in subquery or 'operator' not in subquery:
                    raise ValueError("Invalid subquery structure")
            
            save_result(query_structure, output_path)
            
        except (json.JSONDecodeError, ValueError) as e:
            parts = response_text.split(' AND ')
            subqueries = []
            for i, part in enumerate(parts):
                cleaned_part = part.strip('() \n')
                if cleaned_part:
                    subqueries.append({
                        "content": cleaned_part,
                        "operator": "AND" if i < len(parts) - 1 else ""
                    })
            
            if not subqueries:
                subqueries = [{
                    "content": "Please provide more specific search terms",
                    "operator": ""
                }]
            
            save_result({"subqueries": subqueries}, output_path)

    except Exception as e:
        save_error(str(e), output_path)
        sys.exit(1)

def save_result(data, output_path):
    """Save the result to a JSON file."""
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(json.dumps({"error": f"Failed to save result: {str(e)}"}))
        sys.exit(1)

def save_error(error_message, output_path):
    """Save an error message to the output file."""
    error_data = {
        "error": error_message,
        "subqueries": [{
            "content": "Error generating query. Please try again.",
            "operator": ""
        }]
    }
    save_result(error_data, output_path)

if __name__ == "__main__":
    main()
