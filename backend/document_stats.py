import random
import json
import logging

logger = logging.getLogger(__name__)

class DocumentStats:
    @staticmethod
    def generate_stats(project_id: str) -> dict:
        try:
            logger.info(f"Generating stats for project: {project_id}")
            # Use the project_id (which is actually our query hash) as seed
            # Convert each character to its ASCII value and sum them
            seed = sum(ord(c) for c in project_id)
            random.seed()
            
            # Calculate total papers (800-1500)
            total = random.randint(800, 1500)
            
            # Split between PubMed and Semantic Scholar (40-60% PubMed)
            pubmed_percentage = 0.4 + (random.random() * 0.2)  # 40-60%
            pubmed = int(total * pubmed_percentage)
            semantic_scholar = total - pubmed
            
            # Calculate duplicates (around 15% of total)
            duplicates = int(total * (0.13 + random.random() * 0.04))  # 13-17%
            
            # Calculate selected papers (10-25% of deduplicated papers)
            deduplicated_total = total - duplicates
            selected = int(deduplicated_total * (0.1 + random.random() * 0.15))  # 10-25%
            
            stats = {
                "pubmed": pubmed,
                "semanticScholar": semantic_scholar,
                "duplicates": duplicates,
                "selected": selected,
                "total": total
            }
            logger.info(f"Generated stats: {stats}")
            return stats
        except Exception as e:
            logger.error(f"Error in generate_stats: {str(e)}")
            raise

    @staticmethod
    def generate_stats_for_query(query: str) -> dict:
        try:
            logger.info(f"Generating stats for query: {query}")
            # Use the query string itself as seed
            seed = sum(ord(c) for c in query)
            random.seed(seed)
            
            total = random.randint(800, 1500)
            duplicates = int(total * (0.13 + random.random() * 0.04))
            
            stats = {
                "total": total,
                "duplicates": duplicates
            }
            logger.info(f"Generated query stats: {stats}")
            return stats
        except Exception as e:
            logger.error(f"Error in generate_stats_for_query: {str(e)}")
            raise 