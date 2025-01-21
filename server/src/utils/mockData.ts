import { DuplicatePair } from '../components/DuplicateAnalysisTable';
import { Document } from '../components/DocumentAnalysis';


export const mockDuplicatePairs: DuplicatePair[] = [
  { 
    id: 1, 
    article1: {
      title: "Systematic Review and Meta-analysis of Upadacitinib in Severe Alopecia Areata",
      abstract: "This systematic review and meta-analysis examines the efficacy and safety of upadacitinib in severe alopecia areata. The analysis included 12 randomized controlled trials with 3,500 participants, synthesizing evidence on hair regrowth, quality of life, and adverse events using GRADE methodology."
    },
    article2: {
      title: "Systematic Review and Meta-analysis: Upadacitinib for Severe Alopecia Areata",
      abstract: "This comprehensive systematic review and meta-analysis evaluates the effectiveness and safety profile of upadacitinib in severe alopecia areata treatment. The study synthesized data from 12 randomized controlled trials involving 3,500 participants, analyzing outcomes including hair regrowth, quality of life measures, and adverse events using GRADE methodology."
    },
    proximityScore: 0.95
  },
  { 
    id: 2, 
    article1: {
      title: "Network Meta-analysis of JAK Inhibitors in Treatment-Resistant Alopecia Areata",
      abstract: "This network meta-analysis compares the relative efficacy of different JAK inhibitors, including upadacitinib, in treatment-resistant alopecia areata. The analysis synthesized evidence from 15 randomized trials with 4,000 participants, providing hierarchical rankings of treatments based on efficacy and safety profiles."
    },
    article2: {
      title: "JAK Inhibitors in Treatment-Resistant Alopecia Areata: A Network Meta-analysis",
      abstract: "This comprehensive network meta-analysis evaluates the comparative effectiveness of JAK inhibitors, with focus on upadacitinib, in treatment-resistant alopecia areata. The study analyzed data from 15 randomized trials encompassing 4,000 participants, establishing treatment hierarchies based on efficacy and safety outcomes."
    },
    proximityScore: 0.98
  },
  { 
    id: 3, 
    article1: {
      title: "Evidence Synthesis of Quality of Life Outcomes with Upadacitinib in Alopecia Areata",
      abstract: "This systematic review synthesizes evidence on quality of life outcomes in patients treated with upadacitinib for alopecia areata. The analysis included 20 studies with 5,000 participants, using standardized mean differences to pool quality of life measures and patient-reported outcomes."
    },
    article2: {
      title: "Quality of Life with Upadacitinib in Alopecia Areata: A Systematic Review and Evidence Synthesis",
      abstract: "This systematic review comprehensively analyzes quality of life outcomes in patients receiving upadacitinib for alopecia areata. The study synthesized data from 20 studies involving 5,000 participants, employing standardized mean differences to aggregate quality of life metrics and patient-reported outcomes."
    },
    proximityScore: 0.97
  },
  { 
    id: 4, 
    article1: {
      title: "The Role of JAK Inhibition in Alopecia Areata Treatment",
      abstract: "This comprehensive review examines the current understanding of JAK inhibition therapies, particularly upadacitinib, in treating alopecia areata. The analysis covers both moderate and severe cases, discussing the therapy's effects on various aspects of the disease and its potential implications for long-term disease management."
    },
    article2: {
      title: "JAK Inhibition and Its Impact on Alopecia Areata Treatment",
      abstract: "This extensive review explores the present knowledge regarding JAK inhibition therapies, with a focus on upadacitinib, in treating alopecia areata. The study encompasses both moderate and severe cases, analyzing the therapy's impact on different aspects of the disease and its potential significance for long-term management strategies."
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
      title: "Upadacitinib's Effect on Psychological Well-being in Alopecia Areata",
      abstract: "This experimental study investigates the impact of upadacitinib on psychological well-being in alopecia areata patients. The research involved 100 participants who underwent psychological assessments before and after upadacitinib treatment, with subsequent tests to evaluate changes in anxiety, depression, and social functioning."
    },
    article2: {
      title: "Psychological Outcomes with Upadacitinib Treatment in Alopecia Areata",
      abstract: "This experimental study explores how upadacitinib affects psychological well-being in individuals with alopecia areata. The investigation included 100 subjects who completed psychological evaluations prior to and following upadacitinib therapy, followed by assessments to measure changes in anxiety, depression, and social functioning."
    },
    proximityScore: 0.97
  },
  { 
    id: 8, 
    article1: {
      title: "Cost-Effectiveness of Upadacitinib in Alopecia Areata Management",
      abstract: "This meta-analysis evaluates the cost-effectiveness of upadacitinib in managing alopecia areata compared to other treatment options. The study synthesizes data from 50 economic evaluations and clinical trials, involving a total of 10,000 patients across various healthcare settings and countries."
    },
    article2: {
      title: "Upadacitinib for Alopecia Areata Management: A Cost-Effectiveness Analysis",
      abstract: "This comprehensive meta-analysis assesses the cost-effectiveness of upadacitinib-based interventions in the management of alopecia areata, compared to alternative treatments. The research compiles and analyzes data from 50 economic evaluations and clinical trials, encompassing 10,000 patients from diverse healthcare environments and geographical locations."
    },
    proximityScore: 0.96
  }
];

export const mockDocuments: Document[] = [
  {
    id: 1,
    title: "Systematic Review and Meta-analysis of JAK Inhibition in Alopecia Areata Treatment",
    abstract: "This systematic review and meta-analysis comprehensively examines the role of JAK inhibition, particularly upadacitinib, in treating alopecia areata. Following PRISMA guidelines, we synthesized evidence from 25 randomized controlled trials involving 6,000 participants, providing pooled estimates of efficacy, safety, and quality of life outcomes.",
    date: "2024-01-15",
    authors: ["Chang, A.H.", "Brownstone, N.D.", "Hsu, S."],
    citationCount: 45,
    selected: false,
    abstractExpanded: false,
    studyType: 'Meta-analysis',
    pico: {
      population: "Patients with alopecia areata in randomized controlled trials",
      intervention: "JAK inhibitors, primarily upadacitinib",
      comparator: "Placebo or other systemic treatments",
      outcome: "Pooled efficacy, safety, and quality of life measures",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/39258033/"
  },
  {
    id: 2,
    title: "Network Meta-analysis of Systemic Treatments for Alopecia Areata",
    abstract: "This network meta-analysis provides a comprehensive comparison of systemic treatments for alopecia areata, with special focus on JAK inhibitors including upadacitinib. Following Cochrane methodology, we analyzed 30 randomized trials with 7,000 participants to establish treatment hierarchies and comparative effectiveness.",
    date: "2024-02-01",
    authors: ["Smith, J.", "Johnson, M."],
    citationCount: 38,
    selected: false,
    abstractExpanded: false,
    studyType: 'Meta-analysis',
    pico: {
      population: "Alopecia areata patients in comparative trials",
      intervention: "All systemic treatments including upadacitinib",
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
        "What is the pooled efficacy of upadacitinib across systematic reviews?",
        "How consistent are safety findings across meta-analyses?",
        "What are the evidence gaps identified in existing syntheses?"
      ],
      answers: {
        "What is the pooled efficacy of upadacitinib across systematic reviews?": "Meta-analyses show consistent efficacy with pooled response rates of 60-80%",
        "How consistent are safety findings across meta-analyses?": "Safety profiles are consistent across reviews with well-documented adverse events",
        "What are the evidence gaps identified in existing syntheses?": "Long-term data and pediatric populations are commonly identified gaps"
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
        "What is the quality of evidence in existing systematic reviews?",
        "How well do reviews adhere to PRISMA guidelines?",
        "What methodological improvements are needed?"
      ],
      answers: {
        "What is the quality of evidence in existing systematic reviews?": "Most reviews provide moderate to high quality evidence with clear GRADE assessments",
        "How well do reviews adhere to PRISMA guidelines?": "Adherence varies, with recent reviews showing better compliance",
        "What methodological improvements are needed?": "Better handling of heterogeneity and more comprehensive risk of bias assessments"
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
    name: "Long-term Safety Analysis",
    fileScreening: "completed" as const,
    totalFiles: 234,
    duplicates: 18,
    fileSelection: 216,
    criteria: 6,
    lastModified: "2024-01-05T09:45:00.000Z",
    currentStep: "abstract" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Evaluating long-term safety of upadacitinib in alopecia areata",
      query: "(upadacitinib) AND (alopecia areata) AND (long-term safety OR adverse effects OR complications)",
      projectTitle: "Alopecia Treatment Safety Analysis",
      projectId: "project-2",
      questions: [
        "What are the long-term safety outcomes of upadacitinib in alopecia areata?",
        "How do long-term adverse effects compare to other treatments?",
        "What are the implications for patient monitoring and management?"
      ],
      answers: {
        "What are the long-term safety outcomes of upadacitinib in alopecia areata?": "Studies show manageable safety profile with specific monitoring needs",
        "How do long-term adverse effects compare to other treatments?": "Comparable or favorable safety profile compared to other systemic treatments",
        "What are the implications for patient monitoring and management?": "Regular monitoring of specific parameters recommended, with individualized follow-up"
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
            content: 'long-term safety OR adverse effects OR complications',
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
    name: "Device-Related Infections",
    fileScreening: "completed" as const,
    totalFiles: 178,
    duplicates: 15,
    fileSelection: 163,
    criteria: 5,
    lastModified: "2024-01-03T14:20:00.000Z",
    currentStep: "abstract" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Analysis of infection risks in implantable medical devices",
      query: "(implantable medical device) AND (infection OR bacterial colonization) AND (prevention OR risk factors)",
      projectTitle: "Implantable Medical Devices Safety",
      projectId: "project-2",
      questions: [
        "What are the main factors contributing to infection risks in implantable medical devices?",
        "How effective are prevention measures in reducing infection risks in implantable medical devices?",
        "What are the implications of infection risks in implantable medical device design?"
      ],
      answers: {
        "What are the main factors contributing to infection risks in implantable medical devices?": "Various factors, including bacterial colonization, patient factors, and device design",
        "How effective are prevention measures in reducing infection risks in implantable medical devices?": "Studies show varying degrees of effectiveness, with some devices achieving minimal infection rates",
        "What are the implications of infection risks in implantable medical device design?": "Infection risks are crucial in implantable medical device design, as they ensure patient safety and device longevity"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'implantable medical device',
            operator: 'AND'
          },
          {
            content: 'infection OR bacterial colonization',
            operator: 'AND'
          },
          {
            content: 'prevention OR risk factors',
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
    name: "Hip Implant Durability",
    fileScreening: "completed" as const,
    totalFiles: 145,
    duplicates: 12,
    fileSelection: 133,
    criteria: 7,
    lastModified: "2023-12-15T10:15:00.000Z",
    currentStep: "abstract" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Long-term durability assessment of hip replacement implants",
      query: "(hip replacement OR hip arthroplasty) AND (longevity OR durability OR wear) AND (long-term outcomes)",
      projectTitle: "Orthopedic Implants Longevity",
      projectId: "project-3",
      questions: [
        "What factors contribute to the longevity of hip replacement implants?",
        "How effective are materials in enhancing hip replacement implant durability?",
        "What are the implications of hip replacement implant durability for long-term outcomes?"
      ],
      answers: {
        "What factors contribute to the longevity of hip replacement implants?": "Various factors, including material selection, implant design, and patient factors",
        "How effective are materials in enhancing hip replacement implant durability?": "Studies show varying degrees of effectiveness, with some materials achieving long-term durability",
        "What are the implications of hip replacement implant durability for long-term outcomes?": "Hip replacement implant durability is crucial for long-term outcomes, as it ensures patient safety and device longevity"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'hip replacement OR hip arthroplasty',
            operator: 'AND'
          },
          {
            content: 'longevity OR durability OR wear',
            operator: 'AND'
          },
          {
            content: 'long-term outcomes',
            operator: 'AND'
          }
        ]
      }),
      generatedQuery: true
    }
  },
  {
    id: "pipeline-6",
    projectId: "project-3",
    name: "Material Innovation Impact",
    fileScreening: "completed" as const,
    totalFiles: 167,
    duplicates: 14,
    fileSelection: 153,
    criteria: 5,
    lastModified: "2023-12-20T16:45:00.000Z",
    currentStep: "abstract" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Impact of new materials on orthopedic implant performance",
      query: "(orthopedic implant) AND (material innovation OR new materials) AND (performance OR outcomes)",
      projectTitle: "Orthopedic Implants Longevity",
      projectId: "project-3",
      questions: [
        "What are the main factors contributing to the performance of orthopedic implants?",
        "How effective are new materials in enhancing orthopedic implant performance?",
        "What are the implications of material innovation in orthopedic implant design?"
      ],
      answers: {
        "What are the main factors contributing to the performance of orthopedic implants?": "Various factors, including material selection, implant design, and patient factors",
        "How effective are new materials in enhancing orthopedic implant performance?": "Studies show varying degrees of effectiveness, with some materials achieving improved performance",
        "What are the implications of material innovation in orthopedic implant design?": "Material innovation is crucial in orthopedic implant design, as it ensures patient safety and device longevity"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'orthopedic implant',
            operator: 'AND'
          },
          {
            content: 'material innovation OR new materials',
            operator: 'AND'
          },
          {
            content: 'performance OR outcomes',
            operator: 'AND'
          }
        ]
      }),
      generatedQuery: true
    }
  },
  {
    id: "pipeline-7",
    projectId: "project-4",
    name: "Knee Surgery Outcomes",
    fileScreening: "in_progress" as const,
    totalFiles: 187,
    duplicates: 15,
    fileSelection: 172,
    criteria: 6,
    lastModified: "2024-02-15T13:30:00.000Z",
    currentStep: "screening" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Comparative analysis of minimally invasive versus traditional knee surgery techniques and outcomes",
      query: "(knee surgery OR knee arthroplasty OR knee replacement) AND (minimally invasive OR arthroscopic) AND (outcomes OR recovery OR complications)",
      projectTitle: "Knee Surgery Techniques Review",
      projectId: "project-4",
      questions: [
        "What are the key differences in outcomes between minimally invasive and traditional knee surgery?",
        "How do recovery times compare between different surgical techniques?",
        "What are the complication rates associated with each approach?"
      ],
      answers: {
        "What are the key differences in outcomes between minimally invasive and traditional knee surgery?": "Studies show differences in post-operative pain, scarring, and initial recovery period, with minimally invasive techniques generally showing faster early recovery",
        "How do recovery times compare between different surgical techniques?": "Minimally invasive approaches typically show 20-30% faster return to daily activities, though long-term outcomes are similar",
        "What are the complication rates associated with each approach?": "Traditional approaches show more wound-related complications, while minimally invasive techniques have higher rates of component positioning challenges"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'knee surgery OR knee arthroplasty OR knee replacement',
            operator: 'AND'
          },
          {
            content: 'minimally invasive OR arthroscopic',
            operator: 'AND'
          },
          {
            content: 'outcomes OR recovery OR complications',
            operator: 'AND'
          },
          {
            content: 'randomized controlled trial OR systematic review OR meta-analysis',
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
    description: "I want to select only systematic reviews, meta-analyses, and high-quality evidence syntheses"
  },
  {
    id: 2,
    shortName: "C2",
    category: "Quality",
    description: "I want to select articles that follow PRISMA guidelines for systematic reviews and meta-analyses. If methodology is unclear, mark as uncertain"
  },
  {
    id: 3,
    shortName: "C3",
    category: "Outcomes",
    description: "I want to select articles where at least one of the following is synthesized:\n• Pooled efficacy data of upadacitinib in alopecia\n• Systematic assessment of safety outcomes\n• Meta-analyzed quality of life measures\n• Network meta-analysis comparing treatments\n• Comprehensive evidence grading"
  },
  {
    id: 4,
    shortName: "C4",
    category: "Publication",
    description: "I want to exclude primary studies, narrative reviews, and opinion pieces. Only include systematic reviews, meta-analyses, and evidence syntheses."
  },
  {
    id: 5,
    shortName: "C5",
    category: "Analysis",
    description: "I want to select articles that include quantitative synthesis (meta-analysis) where possible, or structured qualitative synthesis when meta-analysis is not feasible"
  },
  {
    id: 6,
    shortName: "C6",
    category: "Language",
    description: "I want to include only systematic reviews and meta-analyses published in English"
  }
];

export const FREQUENT_CRITERIA = {
  all: [
    {
      id: 1,
      category: "Study Type",
      text: "I want to select only systematic reviews and meta-analyses",
      usageCount: 145
    },
    {
      id: 2,
      category: "Quality",
      text: "I want to select articles following PRISMA guidelines",
      usageCount: 120
    },
    {
      id: 3,
      category: "Analysis",
      text: "I want to select articles with quantitative synthesis",
      usageCount: 110
    },
    {
      id: 4,
      category: "Evidence",
      text: "I want to select articles with comprehensive evidence grading",
      usageCount: 95
    },
    {
      id: 5,
      category: "Publication",
      text: "I want to exclude primary studies and narrative reviews",
      usageCount: 89
    },
    {
      id: 6,
      category: "Methodology",
      text: "I want to include only reviews with clear methodology",
      usageCount: 78
    }
  ],
  categoryCounts: {
    "Study Type": 16,
    "Quality": 14,
    "Evidence": 10,
    "Methodology": 8
  }
};
