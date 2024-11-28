interface DocumentCounts {
  pubmed: number;
  semanticScholar: number;
  duplicates: number;
  selected: number;
  total: number;
}

class DocumentStats {
  private static projectStats: Map<string, DocumentCounts> = new Map();

  private static seededRandom(initialSeed: number): () => number {
    let seed = initialSeed;
    return () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  }

  static generateInitialStats(projectId: string): DocumentCounts {
    // If stats already exist for this project, return them
    if (this.projectStats.has(projectId)) {
      return this.projectStats.get(projectId)!;
    }

    // Create seeded random number generator
    const initialSeed = parseInt(projectId.replace(/\D/g, '')) || Date.now();
    const random = this.seededRandom(initialSeed);

    // Calculate total papers (800-1500)
    const total = Math.floor(random() * (1500 - 800 + 1)) + 800;

    // Split between PubMed and Semantic Scholar (40-60% PubMed)
    const pubmedPercentage = 0.4 + (random() * 0.2); // 40-60%
    const pubmed = Math.floor(total * pubmedPercentage);
    const semanticScholar = total - pubmed;

    // Calculate duplicates (around 15% of total)
    const duplicates = Math.floor(total * (0.13 + random() * 0.04)); // 13-17%

    // Calculate selected papers (10-25% of deduplicated papers)
    const deduplicatedTotal = total - duplicates;
    const selected = Math.floor(deduplicatedTotal * (0.1 + random() * 0.15)); // 10-25%

    const stats: DocumentCounts = {
      pubmed,
      semanticScholar,
      duplicates,
      selected,
      total
    };

    // Store the stats for this project
    this.projectStats.set(projectId, stats);
    return stats;
  }

  static updateStats(projectId: string, newStats: Partial<DocumentCounts>): DocumentCounts {
    const currentStats = this.projectStats.get(projectId) || this.generateInitialStats(projectId);
    const updatedStats = { ...currentStats, ...newStats };
    this.projectStats.set(projectId, updatedStats);
    return updatedStats;
  }

  static getStats(projectId: string): DocumentCounts {
    return this.projectStats.get(projectId) || this.generateInitialStats(projectId);
  }

  static clearStats(projectId: string): void {
    this.projectStats.delete(projectId);
  }
}

export default DocumentStats; 