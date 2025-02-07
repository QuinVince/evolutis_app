
// Update mock projects
export const mockProjects = [
  {
    id: "project-1",
    name: "Systematic Reviews of Upadacitinib in Alopecia",
    status: "in_progress" as const,
    author: "Chang A.H.",
    createdAt: "2024-01-15T10:00:00.000Z",
    queryCount: 2,
    tags: ["Systematic Review", "Meta-analysis", "Evidence Synthesis"]
  },
  {
    id: "project-2",
    name: "Meta-analysis of Upadacitinib Safety",
    status: "done" as const,
    author: "Brownstone N.D.",
    createdAt: "2024-02-01T09:00:00.000Z",
    queryCount: 2,
    tags: ["Meta-analysis", "Safety", "Evidence Synthesis"]
  },
  {
    id: "project-3",
    name: "Evidence Synthesis: Pediatric Alopecia Treatment",
    status: "done" as const,
    author: "Wilson T.",
    createdAt: "2023-11-15T09:00:00.000Z",
    queryCount: 2,
    tags: ["Evidence Synthesis", "Pediatric", "Systematic Review"]
  },
  {
    id: "project-4",
    name: "Quality of Life Meta-analysis in Alopecia",
    status: "in_progress" as const,
    author: "White H.",
    createdAt: "2024-01-15T10:00:00.000Z",
    queryCount: 1,
    tags: ["Meta-analysis", "Quality of Life", "Evidence Synthesis"]
  }
];

// Update mock pipelines for these projects
export const mockPipelines = [
  {
    id: "pipeline-1",
    projectId: "project-1",
    name: "Systematic Review Analysis",
    fileScreening: "in_progress" as const,
    totalFiles: 156,
    duplicates: 12,
    fileSelection: 144,
    criteria: 5,
    lastModified: "2024-02-20T15:30:00.000Z",
    currentStep: "screening" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Analyzing systematic reviews and meta-analyses of upadacitinib in alopecia areata",
      query: "(upadacitinib) AND (alopecia areata) AND (systematic review OR meta-analysis OR evidence synthesis)",
      projectTitle: "Systematic Reviews of Upadacitinib in Alopecia",
      projectId: "project-1",
      questions: [
        "Which years of publication should we include?",
        "Should we include only high-quality systematic reviews?",
        "Are you interested in specific outcome measures?"
      ],
      answers: {
        "Which years of publication should we include?": "Focus on 2022-2024 to capture recent evidence",
        "Should we include only high-quality systematic reviews?": "Yes, include only reviews following PRISMA guidelines with clear methodology",
        "Are you interested in specific outcome measures?": "Focus on SALT score improvements and quality of life measures"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'upadacitinib',
            operator: 'AND'
          },
          {
            content: 'alopecia areata',
            operator: 'AND'
          },
          {
            content: 'systematic review OR meta-analysis OR evidence synthesis',
            operator: 'AND'
          }
        ]
      }),
      generatedQuery: true
    }
  },
  {
    id: "pipeline-2",
    projectId: "project-1",
    name: "Evidence Quality Assessment",
    fileScreening: "in_progress" as const,
    totalFiles: 89,
    duplicates: 7,
    fileSelection: 82,
    criteria: 4,
    lastModified: "2024-02-22T11:20:00.000Z",
    currentStep: "criteria" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Assessing quality of evidence in systematic reviews of upadacitinib for alopecia",
      query: "(upadacitinib) AND (alopecia areata) AND (GRADE OR evidence quality OR PRISMA)",
      projectTitle: "Systematic Reviews of Upadacitinib in Alopecia",
      projectId: "project-1",
      questions: [
        "Which quality assessment tools should we focus on?",
        "Should we include reviews without risk of bias assessment?",
        "Do you want to include non-English reviews?"
      ],
      answers: {
        "Which quality assessment tools should we focus on?": "GRADE and AMSTAR-2 are preferred",
        "Should we include reviews without risk of bias assessment?": "No, exclude reviews without formal risk assessment",
        "Do you want to include non-English reviews?": "No, English-language reviews only"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'upadacitinib',
            operator: 'AND'
          },
          {
            content: 'alopecia areata',
            operator: 'AND'
          },
          {
            content: 'GRADE OR evidence quality OR PRISMA',
            operator: 'AND'
          }
        ]
      }),
      generatedQuery: true
    }
  },
  {
    id: "pipeline-3",
    projectId: "project-2",
    name: "Safety Meta-analysis",
    fileScreening: "completed" as const,
    totalFiles: 234,
    duplicates: 18,
    fileSelection: 216,
    criteria: 6,
    lastModified: "2024-01-05T09:45:00.000Z",
    currentStep: "abstract" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Meta-analysis of safety outcomes for upadacitinib in alopecia areata",
      query: "(upadacitinib) AND (alopecia areata) AND (safety OR adverse events OR risk assessment) AND (meta-analysis OR systematic review)",
      projectTitle: "Meta-analysis of Upadacitinib Safety",
      projectId: "project-2",
      questions: [
        "Which safety outcomes are most important?",
        "What is the minimum follow-up period needed?",
        "Should we include case reports of adverse events?"
      ],
      answers: {
        "Which safety outcomes are most important?": "Serious infections, cardiovascular events, and malignancies",
        "What is the minimum follow-up period needed?": "At least 24 weeks of safety data",
        "Should we include case reports of adverse events?": "No, focus on systematic reviews and meta-analyses only"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'upadacitinib',
            operator: 'AND'
          },
          {
            content: 'alopecia areata',
            operator: 'AND'
          },
          {
            content: 'safety OR adverse events OR risk assessment',
            operator: 'AND'
          },
          {
            content: 'meta-analysis OR systematic review',
            operator: 'AND'
          }
        ]
      }),
      generatedQuery: true
    }
  },
  {
    id: "pipeline-4",
    projectId: "project-2",
    name: "Comparative Safety Analysis",
    fileScreening: "completed" as const,
    totalFiles: 178,
    duplicates: 15,
    fileSelection: 163,
    criteria: 5,
    lastModified: "2024-01-03T14:20:00.000Z",
    currentStep: "abstract" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Comparative analysis of safety profiles between different JAK inhibitors in alopecia areata",
      query: "(upadacitinib OR baricitinib OR tofacitinib) AND (alopecia areata) AND (comparative safety OR adverse events) AND (systematic review OR meta-analysis)",
      projectTitle: "Meta-analysis of Upadacitinib Safety",
      projectId: "project-2",
      questions: [
        "Which JAK inhibitors should we compare?",
        "Are indirect comparisons acceptable?",
        "Should we focus on specific patient subgroups?"
      ],
      answers: {
        "Which JAK inhibitors should we compare?": "Upadacitinib, baricitinib, and tofacitinib",
        "Are indirect comparisons acceptable?": "Yes, through network meta-analyses",
        "Should we focus on specific patient subgroups?": "Adults with moderate-to-severe disease"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'upadacitinib OR baricitinib OR tofacitinib',
            operator: 'AND'
          },
          {
            content: 'alopecia areata',
            operator: 'AND'
          },
          {
            content: 'comparative safety OR adverse events',
            operator: 'AND'
          },
          {
            content: 'systematic review OR meta-analysis',
            operator: 'AND'
          }
        ]
      }),
      generatedQuery: true
    }
  },
  {
    id: "pipeline-5",
    projectId: "project-3",
    name: "Pediatric Evidence Synthesis",
    fileScreening: "completed" as const,
    totalFiles: 145,
    duplicates: 12,
    fileSelection: 133,
    criteria: 7,
    lastModified: "2023-12-15T10:15:00.000Z",
    currentStep: "abstract" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Synthesizing evidence on JAK inhibitors in pediatric alopecia areata",
      query: "(upadacitinib OR JAK inhibitors) AND (alopecia areata) AND (pediatric OR adolescent OR children) AND (systematic review OR meta-analysis)",
      projectTitle: "Evidence Synthesis: Pediatric Alopecia Treatment",
      projectId: "project-3",
      questions: [
        "What age range should we focus on?",
        "Which efficacy outcomes are priority?",
        "Should we include ongoing trials?"
      ],
      answers: {
        "What age range should we focus on?": "Children and adolescents aged 12-17 years",
        "Which efficacy outcomes are priority?": "SALT score and quality of life measures",
        "Should we include ongoing trials?": "Yes, include registered clinical trials"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'upadacitinib OR JAK inhibitors',
            operator: 'AND'
          },
          {
            content: 'alopecia areata',
            operator: 'AND'
          },
          {
            content: 'pediatric OR adolescent OR children',
            operator: 'AND'
          },
          {
            content: 'systematic review OR meta-analysis',
            operator: 'AND'
          }
        ]
      }),
      generatedQuery: true
    }
  },
  {
    id: "pipeline-6",
    projectId: "project-4",
    name: "Quality of Life Meta-analysis",
    fileScreening: "in_progress" as const,
    totalFiles: 167,
    duplicates: 14,
    fileSelection: 153,
    criteria: 5,
    lastModified: "2024-01-15T16:45:00.000Z",
    currentStep: "abstract" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Meta-analysis of quality of life outcomes in alopecia areata treatments",
      query: "(upadacitinib OR JAK inhibitors) AND (alopecia areata) AND (quality of life OR patient reported outcomes) AND (meta-analysis OR systematic review)",
      projectTitle: "Quality of Life Meta-analysis in Alopecia",
      projectId: "project-4",
      questions: [
        "Which QoL assessment tools should we include?",
        "What is the minimum sample size needed?",
        "Should we include non-validated measures?"
      ],
      answers: {
        "Which QoL assessment tools should we include?": "DLQI and Skindex-16 are primary measures",
        "What is the minimum sample size needed?": "Studies with at least 50 participants",
        "Should we include non-validated measures?": "No, only validated QoL instruments"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'upadacitinib OR JAK inhibitors',
            operator: 'AND'
          },
          {
            content: 'alopecia areata',
            operator: 'AND'
          },
          {
            content: 'quality of life OR patient reported outcomes',
            operator: 'AND'
          },
          {
            content: 'meta-analysis OR systematic review',
            operator: 'AND'
          }
        ]
      }),
      generatedQuery: true
    }
  }
];

export const SCREENING_CRITERIA = [
  {
    id: 1,
    shortName: "C1",
    category: "Scope",
    description: "I want to select articles where the population size is at least 100 patients for clinical studies and at least 1000 patients for meta-analyses"
  },
  {
    id: 2,
    shortName: "C2",
    category: "Analysis",
    description: "I want to select articles that follow PRISMA guidelines for systematic reviews and meta-analyses. If methodology is unclear, mark as uncertain"
  },
  {
    id: 3,
    shortName: "C3",
    category: "Analysis",
    description: "I want to select articles where at least one of the following is synthesized:\n• Pooled efficacy data of upadacitinib in alopecia\n• Systematic assessment of safety outcomes\n• Meta-analyzed quality of life measures\n• Network meta-analysis comparing treatments\n• Comprehensive evidence grading"
  },
  {
    id: 4,
    shortName: "C4",
    category: "Scope",
    description: "I want to select articles where upadacitinib is used as primary treatment for alopecia areata, not as secondary or salvage therapy"
  }
];

export const FREQUENT_CRITERIA = {
  all: [
    {
      id: 1,
      category: "Scope",
      text: "I want to select articles with minimum population size requirements",
      usageCount: 145
    },
    {
      id: 2,
      category: "Scope", 
      text: "I want to include only primary treatment studies",
      usageCount: 132
    },
    {
      id: 3,
      category: "Quality",
      text: "I want to select articles following PRISMA guidelines",
      usageCount: 120
    },
    {
      id: 4,
      category: "Quality",
      text: "I want to include only high quality systematic reviews with clear reporting",
      usageCount: 115
    },
    {
      id: 5,
      category: "Evidence",
      text: "I want to select articles with comprehensive evidence grading",
      usageCount: 95
    },
    {
      id: 6,
      category: "Scope",
      text: "I want to exclude drug repositioning studies",
      usageCount: 92
    },
    {
      id: 7,
      category: "Methodology",
      text: "I want to include only reviews with clear methodology",
      usageCount: 78
    },
    {
      id: 8,
      category: "Scope", 
      text: "I want to select studies evaluating approved indications only",
      usageCount: 75
    }
  ],
  categoryCounts: {
    "Scope": 20,
    "Quality": 14,
    "Evidence": 10,
    "Methodology": 8
  }
};
