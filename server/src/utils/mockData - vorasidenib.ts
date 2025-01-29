import { DuplicatePair } from '../components/DuplicateAnalysisTable';
import { Document } from '../components/DocumentAnalysis';


export const mockDuplicatePairs: DuplicatePair[] = [
  { 
    id: 1, 
    article1: {
      title: "Systematic Review and Meta-analysis of Vorasidenib in IDH-Mutant Gliomas",
      abstract: "This systematic review and meta-analysis examines the efficacy and safety of vorasidenib in IDH1/2-mutant gliomas. The analysis included 8 clinical trials with 1,200 participants, synthesizing evidence on tumor response, progression-free survival, and adverse events using GRADE methodology."
    },
    article2: {
      title: "Meta-analysis and Systematic Review: Vorasidenib for IDH-Mutant Gliomas",
      abstract: "This comprehensive systematic review and meta-analysis evaluates the effectiveness and safety profile of vorasidenib in IDH1/2-mutant glioma treatment. The study synthesized data from 8 clinical trials involving 1,200 participants, analyzing outcomes including tumor response, progression-free survival, and adverse events using GRADE methodology."
    },
    proximityScore: 0.95
  },
  { 
    id: 2, 
    article1: {
      title: "Network Meta-analysis of IDH Inhibitors in Low-Grade Gliomas",
      abstract: "This network meta-analysis compares the relative efficacy of different IDH inhibitors, including vorasidenib, in low-grade gliomas. The analysis synthesized evidence from 12 randomized trials with 2,500 participants, providing hierarchical rankings of treatments based on efficacy and safety profiles."
    },
    article2: {
      title: "IDH Inhibitors in Low-Grade Gliomas: A Network Meta-analysis",
      abstract: "This comprehensive network meta-analysis evaluates the comparative effectiveness of IDH inhibitors, with focus on vorasidenib, in low-grade gliomas. The study analyzed data from 12 randomized trials encompassing 2,500 participants, establishing treatment hierarchies based on efficacy and safety outcomes."
    },
    proximityScore: 0.98
  },
  { 
    id: 3, 
    article1: {
      title: "Quality of Life Outcomes with Vorasidenib in IDH-Mutant Gliomas",
      abstract: "This systematic review synthesizes evidence on quality of life outcomes in patients treated with vorasidenib for IDH-mutant gliomas. The analysis included 15 studies with 2,000 participants, using standardized mean differences to pool quality of life measures and patient-reported outcomes."
    },
    article2: {
      title: "Quality of Life with Vorasidenib in IDH-Mutant Gliomas: A Systematic Review",
      abstract: "This systematic review comprehensively analyzes quality of life outcomes in patients receiving vorasidenib for IDH-mutant gliomas. The study synthesized data from 15 studies involving 2,000 participants, employing standardized mean differences to aggregate quality of life metrics and patient-reported outcomes."
    },
    proximityScore: 0.97
  },
  { 
    id: 4, 
    article1: {
      title: "The Role of IDH Inhibition in Brain Tumor Treatment",
      abstract: "This comprehensive review examines the current understanding of IDH inhibition therapies, particularly vorasidenib, in treating brain tumors. The analysis covers both low-grade and high-grade gliomas, discussing the therapy's effects on various aspects of the disease and its potential implications for long-term disease management."
    },
    article2: {
      title: "IDH Inhibition and Its Impact on Brain Tumor Treatment",
      abstract: "This extensive review explores the present knowledge regarding IDH inhibition therapies, with a focus on vorasidenib, in treating brain tumors. The study encompasses both low-grade and high-grade gliomas, analyzing the therapy's impact on different aspects of the disease and its potential significance for long-term management strategies."
    },
    proximityScore: 0.99
  },
  { 
    id: 5, 
    article1: {
      title: "Comparative Efficacy of Ocrelizumab and Other Disease-Modifying Therapies in Multiple Sclerosis",
      abstract: "This randomized controlled trial evaluates the effectiveness of ocrelizumab compared to other disease-modifying therapies in managing multiple sclerosis. The study included 250 participants with diagnosed MS, comparing ocrelizumab with interferon beta-1a and glatiramer acetate over a 24-month period."
    },
    article2: {
      title: "Comparative Efficacy of Ocrelizumab and Other Disease-Modifying Therapies in Multiple Sclerosis",
      abstract: "This randomized controlled trial evaluates the effectiveness of ocrelizumab compared to other disease-modifying therapies in managing multiple sclerosis. The study included 250 participants with diagnosed MS, comparing ocrelizumab with interferon beta-1a and glatiramer acetate over a 24-month period."
    },
    proximityScore: 1.0
  },
  { 
    id: 6, 
    article1: {
      title: "Safety Profile of Long-Term Ocrelizumab Use in Multiple Sclerosis",
      abstract: "This systematic review examines the long-term safety of ocrelizumab in treating multiple sclerosis. The analysis includes 30 clinical trials and observational studies with a total of 3,000 participants, investigating outcomes such as adverse events, infections, and malignancies over extended treatment periods."
    },
    article2: {
      title: "Long-Term Safety of Ocrelizumab in Multiple Sclerosis Treatment",
      abstract: "This comprehensive review explores the long-term safety implications of ocrelizumab use in multiple sclerosis treatment. The study analyzes data from 30 clinical trials and observational studies, encompassing 3,000 participants, and examines outcomes including adverse events, infection rates, and incidence of malignancies over prolonged treatment durations."
    },
    proximityScore: 0.95
  },
  { 
    id: 7, 
    article1: {
      title: "Vorasidenib's Effect on Cognitive Function in Glioma Patients",
      abstract: "This experimental study investigates the impact of vorasidenib on cognitive function in glioma patients. The research involved 150 participants who underwent cognitive assessments before and after vorasidenib treatment, with subsequent tests to evaluate changes in memory, attention, and executive functioning."
    },
    article2: {
      title: "Cognitive Outcomes with Vorasidenib Treatment in Glioma Patients",
      abstract: "This experimental study explores how vorasidenib affects cognitive function in individuals with gliomas. The investigation included 150 subjects who completed cognitive evaluations prior to and following vorasidenib therapy, followed by assessments to measure changes in memory, attention, and executive functioning."
    },
    proximityScore: 0.97
  },
  { 
    id: 8, 
    article1: {
      title: "Cost-Effectiveness of Vorasidenib in IDH-Mutant Glioma Management",
      abstract: "This meta-analysis evaluates the cost-effectiveness of vorasidenib in managing IDH-mutant gliomas compared to other treatment options. The study synthesizes data from 30 economic evaluations and clinical trials, involving a total of 5,000 patients across various healthcare settings and countries."
    },
    article2: {
      title: "Vorasidenib for IDH-Mutant Glioma Management: A Cost-Effectiveness Analysis",
      abstract: "This comprehensive meta-analysis assesses the cost-effectiveness of vorasidenib-based interventions in the management of IDH-mutant gliomas, compared to alternative treatments. The research compiles and analyzes data from 30 economic evaluations and clinical trials, encompassing 5,000 patients from diverse healthcare environments and geographical locations."
    },
    proximityScore: 0.96
  }
];

export const mockDocuments: Document[] = [
  {
    id: 1,
    title: "Systematic Review and Meta-analysis of IDH Inhibition in Glioma Treatment",
    abstract: "This systematic review and meta-analysis comprehensively examines the role of IDH inhibition, particularly vorasidenib, in treating IDH-mutant gliomas. Following PRISMA guidelines, we synthesized evidence from 15 clinical trials involving 3,000 participants, providing pooled estimates of efficacy, safety, and survival outcomes.",
    date: "2024-01-15",
    authors: ["Chang, A.H.", "Brownstone, N.D.", "Hsu, S."],
    citationCount: 45,
    selected: false,
    abstractExpanded: false,
    studyType: 'Meta-analysis',
    pico: {
      population: "Patients with IDH1/2-mutant gliomas in clinical trials",
      intervention: "IDH inhibitors, primarily vorasidenib",
      comparator: "Placebo or standard treatments",
      outcome: "Pooled efficacy, safety, and survival measures",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/39258033/"
  },
  {
    id: 2,
    title: "Network Meta-analysis of Targeted Therapies for Low-Grade Gliomas",
    abstract: "This network meta-analysis provides a comprehensive comparison of targeted therapies for low-grade gliomas, with special focus on IDH inhibitors including vorasidenib. Following Cochrane methodology, we analyzed 20 randomized trials with 4,000 participants to establish treatment hierarchies and comparative effectiveness.",
    date: "2024-02-01",
    authors: ["Smith, J.", "Johnson, M."],
    citationCount: 38,
    selected: false,
    abstractExpanded: false,
    studyType: 'Meta-analysis',
    pico: {
      population: "Low-grade glioma patients in comparative trials",
      intervention: "All targeted treatments including vorasidenib",
      comparator: "Network of all available treatments",
      outcome: "Comparative efficacy and safety rankings",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 3,
    title: "Evidence Synthesis: Pediatric Applications of JAK Inhibitors in Alopecia Areata",
    abstract: "This systematic review synthesizes evidence on JAK inhibitors, including upadacitinib, in pediatric alopecia areata. Following PRISMA-Children guidelines, we analyzed 10 studies with 800 pediatric participants, providing structured assessment of efficacy, safety, and age-specific considerations.",
    date: "2023-12-10",
    authors: ["Wilson, T.", "Taylor, M.", "Anderson, K."],
    citationCount: 32,
    selected: false,
    abstractExpanded: false,
    studyType: 'Systematic Review',
    pico: {
      population: "Pediatric patients with alopecia areata",
      intervention: "JAK inhibitors including upadacitinib",
      comparator: "Standard care or other treatments",
      outcome: "Efficacy and safety in pediatric population",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 4,
    title: "Mixed-Methods Systematic Review of Quality of Life in Alopecia Treatments",
    abstract: "This mixed-methods systematic review combines quantitative and qualitative evidence on quality of life outcomes in alopecia areata treatments, with focus on JAK inhibitors including upadacitinib. Following JBI methodology, we synthesized data from 40 studies, including 15 qualitative studies.",
    date: "2023-11-22",
    authors: ["Thomas, R.", "Moore, J.", "Jackson, L."],
    citationCount: 28,
    selected: false,
    abstractExpanded: false,
    studyType: 'Systematic Review',
    pico: {
      population: "Alopecia areata patients with quality of life data",
      intervention: "All treatments including upadacitinib",
      comparator: "Various treatment options",
      outcome: "Quality of life and patient experiences",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 5,
    title: "Umbrella Review of JAK Inhibitors in Autoimmune Conditions",
    abstract: "This umbrella review synthesizes evidence from systematic reviews and meta-analyses of JAK inhibitors across autoimmune conditions, including alopecia areata. We evaluated 25 systematic reviews, assessing methodological quality using AMSTAR-2 and providing overview of efficacy and safety profiles.",
    date: "2023-10-15",
    authors: ["White, H.", "Harris, P.", "Clark, S."],
    citationCount: 42,
    selected: false,
    abstractExpanded: false,
    studyType: 'Systematic Review',
    pico: {
      population: "Patients with autoimmune conditions including alopecia",
      intervention: "JAK inhibitors including upadacitinib",
      comparator: "Various by condition",
      outcome: "Cross-condition efficacy and safety patterns",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 6,
    title: "Upadacitinib in Adolescent Alopecia Areata: A Pilot Study",
    abstract: "This pilot study investigates the safety and efficacy of upadacitinib in adolescent patients with alopecia areata. The study included 30 patients aged 12-17 with severe AA, who received weight-based dosing of upadacitinib over 24 weeks. Primary outcomes included safety profile and hair regrowth assessment.",
    date: "2023-08-20",
    authors: ["Rodriguez, C.", "Lee, S.", "Patel, A."],
    citationCount: 55,
    selected: false,
    abstractExpanded: false,
    studyType: 'Case series',
    pico: {
      population: "Adolescent patients with severe alopecia areata",
      intervention: "Weight-based upadacitinib treatment",
      comparator: "Historical controls",
      outcome: "Safety profile and hair regrowth",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 7,
    title: "Upadacitinib and Pregnancy Outcomes in Alopecia Areata: A Retrospective Analysis",
    abstract: "This retrospective study examines pregnancy outcomes in women with alopecia areata who were exposed to upadacitinib before or during pregnancy. The study analyzed data from 150 pregnancies in women who received upadacitinib within 6 months prior to conception or during pregnancy.",
    date: "2023-09-05",
    authors: ["Garcia, M.", "Thompson, R.", "Chen, L."],
    citationCount: 78,
    selected: false,
    abstractExpanded: false,
    studyType: 'Cohort study',
    pico: {
      population: "Pregnant women with alopecia areata exposed to upadacitinib",
      intervention: "Upadacitinib exposure",
      comparator: "General alopecia areata population pregnancy outcomes",
      outcome: "Pregnancy and fetal outcomes, postpartum disease activity",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 8,
    title: "Comparative Effectiveness of Upadacitinib vs Baricitinib in Severe Alopecia Areata",
    abstract: "This head-to-head study compares the effectiveness of upadacitinib and baricitinib in patients with severe alopecia areata. The study included 300 patients randomized to receive either upadacitinib or baricitinib over 2 years.",
    date: "2023-10-12",
    authors: ["Kim, J.", "Novak, I.", "Fernandez, O."],
    citationCount: 92,
    selected: false,
    abstractExpanded: false,
    studyType: 'RCT',
    pico: {
      population: "Patients with severe alopecia areata",
      intervention: "Upadacitinib",
      comparator: "Baricitinib",
      outcome: "Hair regrowth and treatment response",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 9,
    title: "Long-term Effects of Upadacitinib on Disease Progression in Severe Alopecia Areata",
    abstract: "This extension study evaluates the long-term effects of upadacitinib on disease progression in patients with severe alopecia areata. The study followed 500 patients from the original phase III trial for an additional 5 years.",
    date: "2023-11-18",
    authors: ["Smith, A.", "Jones, B.", "Williams, C."],
    citationCount: 85,
    selected: false,
    abstractExpanded: false,
    studyType: 'Cohort study',
    pico: {
      population: "Patients with severe alopecia areata",
      intervention: "Long-term upadacitinib treatment",
      comparator: "Historical data from untreated severe AA cohorts",
      outcome: "Long-term disease progression and treatment response",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 10,
    title: "Upadacitinib and Risk of Infections in Alopecia Areata: A Comprehensive Safety Analysis",
    abstract: "This comprehensive safety analysis focuses on the risk of infections associated with upadacitinib treatment in alopecia areata. The study pooled data from clinical trials and post-marketing surveillance, including over 5000 patients treated with upadacitinib.",
    date: "2023-12-01",
    authors: ["Brown, E.", "Miller, F.", "Davis, G."],
    citationCount: 88,
    selected: false,
    abstractExpanded: false,
    studyType: 'Meta-analysis',
    pico: {
      population: "Alopecia areata patients treated with upadacitinib",
      intervention: "Upadacitinib treatment",
      comparator: "Other AA treatments and general population",
      outcome: "Incidence and types of infections",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  }
];

// Update mock projects
export const mockProjects = [
  {
    id: "project-1",
    name: "Systematic Reviews of Vorasidenib in Gliomas",
    status: "in_progress" as const,
    author: "Chang A.H.",
    createdAt: "2024-01-15T10:00:00.000Z",
    queryCount: 2,
    tags: ["Systematic Review", "Meta-analysis", "Evidence Synthesis"]
  },
  {
    id: "project-2",
    name: "Meta-analysis of Vorasidenib Safety in Brain Tumors",
    status: "done" as const,
    author: "Brownstone N.D.",
    createdAt: "2024-02-01T09:00:00.000Z",
    queryCount: 2,
    tags: ["Meta-analysis", "Safety", "Evidence Synthesis"]
  },
  {
    id: "project-3",
    name: "Evidence Synthesis: Pediatric Glioma Treatment",
    status: "done" as const,
    author: "Wilson T.",
    createdAt: "2023-11-15T09:00:00.000Z",
    queryCount: 2,
    tags: ["Evidence Synthesis", "Pediatric", "Systematic Review"]
  },
  {
    id: "project-4",
    name: "Quality of Life Meta-analysis in Brain Tumors",
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
      description: "Analyzing systematic reviews and meta-analyses of vorasidenib in IDH-mutant gliomas",
      query: "(vorasidenib OR VORANIGO) AND (glioma OR astrocytoma OR oligodendroglioma) AND (IDH1 OR IDH2) AND (systematic review OR meta-analysis)",
      projectTitle: "Systematic Reviews of Vorasidenib in Gliomas",
      projectId: "project-1",
      questions: [
        "Which specific types of IDH-mutant gliomas would you like to focus on in this analysis?",
        "What particular aspects of vorasidenib treatment would you like the systematic reviews to address?",
        "Are there specific outcome measures you want to prioritize in the analysis?"
      ],
      answers: {
        "Which specific types of IDH-mutant gliomas would you like to focus on in this analysis?": "Both low-grade and high-grade gliomas with confirmed IDH1 or IDH2 mutations",
        "What particular aspects of vorasidenib treatment would you like the systematic reviews to address?": "Primary focus on treatment efficacy, progression-free survival, and treatment-related adverse events",
        "Are there specific outcome measures you want to prioritize in the analysis?": "Prioritize tumor response rates, quality of life metrics, and long-term survival outcomes"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'vorasidenib OR VORANIGO',
            operator: 'AND'
          },
          {
            content: 'glioma OR astrocytoma OR oligodendroglioma',
            operator: 'AND'
          },
          {
            content: 'IDH1 OR IDH2',
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
      description: "Assessing quality of evidence in systematic reviews of vorasidenib for gliomas",
      query: "(vorasidenib) AND (glioma OR brain tumor) AND (GRADE OR evidence quality OR PRISMA)",
      projectTitle: "Systematic Reviews of Vorasidenib in Gliomas",
      projectId: "project-1",
      questions: [
        "Which quality assessment tools would you like to use for evaluating the evidence?",
        "What specific aspects of methodology should be prioritized in the quality assessment?",
        "Are there particular types of bias you want to focus on in the evaluation?"
      ],
      answers: {
        "Which quality assessment tools would you like to use for evaluating the evidence?": "Use GRADE methodology as primary tool, supplemented by AMSTAR-2 for systematic review quality",
        "What specific aspects of methodology should be prioritized in the quality assessment?": "Focus on randomization methods, allocation concealment, and completeness of outcome reporting",
        "Are there particular types of bias you want to focus on in the evaluation?": "Prioritize assessment of selection bias, reporting bias, and industry sponsorship bias"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'vorasidenib',
            operator: 'AND'
          },
          {
            content: 'glioma OR brain tumor',
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
      description: "Meta-analysis of safety outcomes for vorasidenib in IDH-mutant gliomas",
      query: "(vorasidenib OR VORANIGO) AND (glioma OR brain tumor) AND (safety OR adverse events OR risk assessment) AND (meta-analysis OR systematic review)",
      projectTitle: "Meta-analysis of Vorasidenib Safety in Brain Tumors",
      projectId: "project-2",
      questions: [
        "Which specific safety outcomes should be prioritized in the analysis?",
        "What timeframe of adverse events should be considered?",
        "Are there particular patient subgroups you want to analyze separately?"
      ],
      answers: {
        "Which specific safety outcomes should be prioritized in the analysis?": "Focus on grade 3-4 adverse events, treatment discontinuations, and specific neurological complications",
        "What timeframe of adverse events should be considered?": "Include both acute events (within first 6 months) and long-term follow-up (up to 2 years)",
        "Are there particular patient subgroups you want to analyze separately?": "Analyze elderly patients (>65 years) and those with comorbidities as separate subgroups"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'vorasidenib OR VORANIGO',
            operator: 'AND'
          },
          {
            content: 'glioma OR brain tumor',
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
        "How does the safety profile of upadacitinib compare to other JAK inhibitors?",
        "Are there differences in specific adverse event rates between treatments?",
        "What are the implications for treatment selection based on safety profiles?"
      ],
      answers: {
        "How does the safety profile of upadacitinib compare to other JAK inhibitors?": "Network meta-analyses show comparable overall safety with some treatment-specific differences",
        "Are there differences in specific adverse event rates between treatments?": "Each JAK inhibitor shows unique patterns of specific adverse events",
        "What are the implications for treatment selection based on safety profiles?": "Safety profiles can guide personalized treatment selection based on patient characteristics"
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
      description: "Synthesizing evidence on IDH inhibitors in pediatric gliomas",
      query: "(vorasidenib OR IDH inhibitors) AND (glioma OR brain tumor) AND (pediatric OR adolescent OR children) AND (systematic review OR meta-analysis)",
      projectTitle: "Evidence Synthesis: Pediatric Glioma Treatment",
      projectId: "project-3",
      questions: [
        "What age ranges should be included in the pediatric population analysis?",
        "Which specific pediatric safety parameters should be monitored?",
        "What developmental outcomes should be included in the assessment?"
      ],
      answers: {
        "What age ranges should be included in the pediatric population analysis?": "Include patients aged 12-17 years, as per current approval for vorasidenib",
        "Which specific pediatric safety parameters should be monitored?": "Monitor growth parameters, neurocognitive development, and endocrine function",
        "What developmental outcomes should be included in the assessment?": "Include school performance, physical development milestones, and age-appropriate functional assessments"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'vorasidenib OR IDH inhibitors',
            operator: 'AND'
          },
          {
            content: 'glioma OR brain tumor',
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
      description: "Meta-analysis of quality of life outcomes in brain tumor treatments",
      query: "(vorasidenib OR IDH inhibitors) AND (glioma OR brain tumor) AND (quality of life OR patient reported outcomes) AND (meta-analysis OR systematic review)",
      projectTitle: "Quality of Life Meta-analysis in Brain Tumors",
      projectId: "project-4",
      questions: [
        "Which quality of life assessment tools should be included?",
        "What specific domains of daily functioning are most important to assess?",
        "How should treatment-related symptoms be incorporated into the analysis?"
      ],
      answers: {
        "Which quality of life assessment tools should be included?": "Use EORTC QLQ-C30 and BN20 as primary measures, supplemented with FACT-Br when available",
        "What specific domains of daily functioning are most important to assess?": "Prioritize cognitive function, physical independence, and social/family relationships",
        "How should treatment-related symptoms be incorporated into the analysis?": "Include symptom burden scores and their impact on daily activities, focusing on neurological symptoms"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'vorasidenib OR IDH inhibitors',
            operator: 'AND'
          },
          {
            content: 'glioma OR brain tumor',
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
    category: "Study Type",
    description: "I want to select only systematic reviews, meta-analyses, and evidence syntheses that evaluate IDH-mutant gliomas or brain tumors, with a focus on IDH inhibitors including vorasidenib"
  },
  {
    id: 2,
    shortName: "C2",
    category: "Analysis",
    description: "I want to select articles that follow PRISMA guidelines and include clear methodology for data synthesis, with explicit reporting of search strategies, inclusion criteria, and quality assessment methods for brain tumor treatments"
  },
  {
    id: 3,
    shortName: "C3",
    category: "Sample Size",
    description: "I want to select only systematic reviews and meta-analyses with a minimum total sample size of 200 participants across included studies to ensure adequate statistical power"
  },
  {
    id: 4,
    shortName: "C4",
    category: "Study Type",
    description: "I want to exclude primary clinical trials, case reports, and narrative reviews. Only include systematic reviews, meta-analyses, and structured evidence syntheses focused on IDH-mutant gliomas and brain tumors"
  },
  {
    id: 5,
    shortName: "C5",
    category: "Analysis",
    description: "I want to select articles that include quantitative synthesis (meta-analysis) of clinical outcomes where possible, or structured qualitative synthesis when meta-analysis is not feasible, specifically for brain tumor treatments and IDH inhibitor therapies"
  },
  {
    id: 6,
    shortName: "C6",
    category: "Language",
    description: "I want to include only systematic reviews and meta-analyses published in English, ensuring comprehensive coverage of international research on brain tumor treatments and IDH inhibitors"
  }
];

export const FREQUENT_CRITERIA = {
  all: [
    {
      id: 1,
      category: "Study Type",
      text: "I want to select only systematic reviews and meta-analyses of IDH-mutant glioma treatments",
      usageCount: 145
    },
    {
      id: 2,
      category: "Study Type", 
      text: "I want to include only evidence syntheses and systematic reviews of brain tumor therapies",
      usageCount: 132
    },
    {
      id: 3,
      category: "Quality",
      text: "I want to select articles following PRISMA guidelines for brain tumor research",
      usageCount: 120
    },
    {
      id: 4,
      category: "Quality",
      text: "I want to include only high quality systematic reviews of IDH inhibitor treatments",
      usageCount: 115
    },
    {
      id: 5,
      category: "Evidence",
      text: "I want to select articles with comprehensive evidence grading for brain tumor therapies",
      usageCount: 95
    },
    {
      id: 6,
      category: "Evidence",
      text: "I want to include studies with clear evidence synthesis methods for glioma treatments",
      usageCount: 92
    },
    {
      id: 7,
      category: "Methodology",
      text: "I want to include only reviews with clear methodology for brain tumor research",
      usageCount: 78
    },
    {
      id: 8,
      category: "Methodology", 
      text: "I want to select studies with reproducible methods for IDH inhibitor analysis",
      usageCount: 75
    },
    {
      id: 9,
      category: "Methodology", 
      text: "I want to select only systematic reviews and meta-analyses with a minimum total sample size of 200 participants",
      usageCount: 75
    }
  ],
  categoryCounts: {
    "Study Type": 16,
    "Quality": 14,
    "Evidence": 10,
    "Methodology": 8
  }
};
