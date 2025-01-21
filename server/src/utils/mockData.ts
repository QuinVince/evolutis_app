import { DuplicatePair } from '../components/DuplicateAnalysisTable';
import { Document } from '../components/DocumentAnalysis';


export const mockDuplicatePairs: DuplicatePair[] = [
  { 
    id: 1, 
    article1: {
      title: "Efficacy of Upadacitinib in Severe Alopecia Areata: A Clinical Trial",
      abstract: "This study examines the effects of upadacitinib on hair regrowth in adults with severe alopecia areata. The research, conducted over a 24-week period, involved 500 participants aged 18-65 who were randomly assigned to either a upadacitinib treatment group or a placebo control group."
    },
    article2: {
      title: "Efficacy of Upadacitinib in Severe Alopecia Areata: A Clinical Trial Analysis",
      abstract: "This comprehensive study investigates the impact of upadacitinib on hair regrowth among adults with severe alopecia areata. Over a 24-week period, 500 participants between 18 and 65 years old were randomly divided into a upadacitinib treatment group and a placebo control group to assess the effects of the medication on hair regrowth and disease progression."
    },
    proximityScore: 0.95
  },
  { 
    id: 2, 
    article1: {
      title: "Upadacitinib for Treatment-Resistant Alopecia Areata",
      abstract: "This randomized controlled trial evaluates the efficacy of upadacitinib in treating treatment-resistant alopecia areata. The study included 200 participants with confirmed treatment-resistant AA, comparing upadacitinib interventions with standard care over a 52-week period."
    },
    article2: {
      title: "Upadacitinib in Treatment-Resistant Alopecia Areata: A Clinical Trial",
      abstract: "This clinical trial investigates the effectiveness of upadacitinib as a treatment for treatment-resistant alopecia areata. Two hundred individuals diagnosed with treatment-resistant AA were randomly assigned to either a upadacitinib intervention group or a control group receiving standard care, with outcomes assessed over a 52-week period."
    },
    proximityScore: 0.98
  },
  { 
    id: 3, 
    article1: {
      title: "Quality of Life Improvements with Upadacitinib in Alopecia Areata",
      abstract: "This study investigates the impact of upadacitinib on quality of life metrics in patients with alopecia areata. The research involved 300 participants who received upadacitinib treatment over a 12-month period, with regular assessments of quality of life scores and patient-reported outcomes."
    },
    article2: {
      title: "Quality of Life Outcomes with Upadacitinib in Alopecia Areata Treatment",
      abstract: "This study investigates the impact of upadacitinib on quality of life measures in patients with alopecia areata. The research involved 300 participants who received upadacitinib treatment over a 12-month period, with regular assessments of quality of life metrics and patient-reported outcomes."
    },
    proximityScore: 1.0
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
    title: "Upadacitinib and JAK Inhibition in Alopecia Areata Treatment",
    abstract: "Selective inhibition of JAK1 by upadacitinib represents an important advance in the treatment of severe alopecia areata. This comprehensive review examines the mechanism of action, efficacy, and safety profile of upadacitinib in treating AA, with particular focus on its role in immune modulation and hair follicle regeneration.",
    date: "2024-01-15",
    authors: ["Chang, A.H.", "Brownstone, N.D.", "Hsu, S."],
    citationCount: 45,
    selected: false,
    abstractExpanded: false,
    studyType: 'Narrative review',
    pico: {
      population: "Patients with severe alopecia areata",
      intervention: "Upadacitinib treatment",
      comparator: "Standard treatment or placebo",
      outcome: "Hair regrowth and disease progression",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/39258033/"
  },
  {
    id: 2,
    title: "Safety Profile of Long-Term Upadacitinib Use in Alopecia Areata",
    abstract: "This systematic review examines the long-term safety of upadacitinib in treating alopecia areata. The analysis includes 30 clinical trials and observational studies with a total of 3,000 participants, investigating outcomes such as adverse events, infections, and potential complications over extended treatment periods.",
    date: "2024-02-01",
    authors: ["Smith, J.", "Johnson, M."],
    citationCount: 23,
    selected: false,
    abstractExpanded: false,
    studyType: 'Meta-analysis',
    pico: {
      population: "Individuals with alopecia areata",
      intervention: "Long-term upadacitinib treatment",
      comparator: "Other JAK inhibitors or standard treatments",
      outcome: "Safety profile and adverse events",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 3,
    title: "Pediatric Applications of Upadacitinib in Alopecia Areata",
    abstract: "This randomized controlled trial investigates the effects of upadacitinib in pediatric patients with severe alopecia areata. The study included 150 children aged 12-17 who were assigned to either a upadacitinib treatment group or a placebo control group for 48 weeks. Outcomes measured included hair regrowth, safety profile, and quality of life measures.",
    date: "2023-06-10",
    authors: ["Wilson, T.", "Taylor, M.", "Anderson, K."],
    citationCount: 87,
    selected: false,
    abstractExpanded: false,
    studyType: 'RCT',
    pico: {
      population: "Pediatric patients with severe alopecia areata",
      intervention: "Upadacitinib",
      comparator: "Placebo",
      outcome: "Hair regrowth and safety profile",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 4,
    title: "Long-Term Efficacy of Upadacitinib in Alopecia Areata: A 5-Year Follow-Up Study",
    abstract: "This long-term follow-up study evaluates the safety and efficacy of upadacitinib in patients with alopecia areata over a 5-year period. The study includes data from 2,500 patients who participated in the initial phase III trials and continued treatment in the open-label extension phase.",
    date: "2023-03-22",
    authors: ["Thomas, R.", "Moore, J.", "Jackson, L."],
    citationCount: 110,
    selected: false,
    abstractExpanded: false,
    studyType: 'Cohort study',
    pico: {
      population: "Patients with alopecia areata",
      intervention: "Long-term upadacitinib treatment",
      comparator: "Historical data and initial trial results",
      outcome: "Long-term safety profile and efficacy measures",
      expanded: false
    },
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/"
  },
  {
    id: 5,
    title: "Upadacitinib's Effect on Quality of Life and Mental Health in Alopecia Areata",
    abstract: "This observational study investigates the impact of upadacitinib on quality of life and mental health in patients with alopecia areata. The research involved 200 patients treated with upadacitinib and 200 matched controls receiving other treatments, analyzing changes in quality of life scores and psychological well-being over a 2-year period.",
    date: "2023-07-05",
    authors: ["White, H.", "Harris, P.", "Clark, S."],
    citationCount: 95,
    selected: false,
    abstractExpanded: false,
    studyType: 'Case-control study',
    pico: {
      population: "Patients with alopecia areata",
      intervention: "Upadacitinib treatment",
      comparator: "Other standard treatments",
      outcome: "Quality of life and mental health measures",
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
    name: "Upadacitinib in Alopecia Treatment Review",
    status: "in_progress" as const,
    author: "Chang A.H.",
    createdAt: "2024-01-15T10:00:00.000Z",
    queryCount: 2,
    tags: ["Alopecia", "JAK Inhibitors", "Clinical Trials"]
  },
  {
    id: "project-2",
    name: "Alopecia Treatment Safety Analysis",
    status: "done" as const,
    author: "Brownstone N.D.",
    createdAt: "2024-02-01T09:00:00.000Z",
    queryCount: 2,
    tags: ["Drug Safety", "Side Effects", "Clinical Outcomes"]
  },
  {
    id: "project-3",
    name: "Pediatric Alopecia Treatment Review",
    status: "done" as const,
    author: "Wilson T.",
    createdAt: "2023-11-15T09:00:00.000Z",
    queryCount: 2,
    tags: ["Pediatric", "Alopecia", "Treatment Outcomes"]
  },
  {
    id: "project-4",
    name: "Quality of Life in Alopecia Treatment",
    status: "in_progress" as const,
    author: "White H.",
    createdAt: "2024-01-15T10:00:00.000Z",
    queryCount: 1,
    tags: ["Quality of Life", "Mental Health", "Patient Outcomes"]
  }
];

// Update mock pipelines for these projects
export const mockPipelines = [
  {
    id: "pipeline-1",
    projectId: "project-1",
    name: "Upadacitinib Efficacy Analysis",
    fileScreening: "in_progress" as const,
    totalFiles: 156,
    duplicates: 12,
    fileSelection: 144,
    criteria: 5,
    lastModified: "2024-02-20T15:30:00.000Z",
    currentStep: "screening" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Investigating upadacitinib efficacy in alopecia areata treatment",
      query: "(upadacitinib OR JAK1 inhibitor) AND (alopecia areata) AND (efficacy OR treatment outcome)",
      projectTitle: "Upadacitinib in Alopecia Treatment Review",
      projectId: "project-1",
      questions: [
        "What is the efficacy of upadacitinib in treating alopecia areata?",
        "How does upadacitinib compare to other JAK inhibitors?",
        "What are the main challenges in upadacitinib treatment?"
      ],
      answers: {
        "What is the efficacy of upadacitinib in treating alopecia areata?": "Studies show significant improvement in hair regrowth with varying response rates",
        "How does upadacitinib compare to other JAK inhibitors?": "Comparative studies indicate unique benefits and safety profile",
        "What are the main challenges in upadacitinib treatment?": "Long-term safety concerns and treatment resistance in some patients"
      },
      pubmedQuery: JSON.stringify({
        subqueries: [
          {
            content: 'upadacitinib OR JAK1 inhibitor',
            operator: 'AND'
          },
          {
            content: 'alopecia areata',
            operator: 'AND'
          },
          {
            content: 'efficacy OR treatment outcome',
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
    name: "Safety Profile Analysis",
    fileScreening: "in_progress" as const,
    totalFiles: 89,
    duplicates: 7,
    fileSelection: 82,
    criteria: 4,
    lastModified: "2024-02-22T11:20:00.000Z",
    currentStep: "criteria" as const,
    screeningStep: "generator" as const,
    queryData: {
      description: "Analyzing safety profile of upadacitinib in alopecia areata treatment",
      query: "(upadacitinib) AND (alopecia areata) AND (safety OR adverse effects OR side effects)",
      projectTitle: "Upadacitinib in Alopecia Treatment Review",
      projectId: "project-1",
      questions: [
        "What are the common adverse effects of upadacitinib in alopecia treatment?",
        "How does the safety profile compare to other treatments?",
        "What are the long-term safety implications?"
      ],
      answers: {
        "What are the common adverse effects of upadacitinib in alopecia treatment?": "Common effects include upper respiratory infections and acne",
        "How does the safety profile compare to other treatments?": "Generally favorable compared to other systemic treatments",
        "What are the long-term safety implications?": "Ongoing studies are evaluating long-term safety data"
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
            content: 'safety OR adverse effects OR side effects',
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
    category: "Scope",
    description: "I want to select articles where the population studied is adult patients with alopecia areata"
  },
  {
    id: 2,
    shortName: "C2",
    category: "Treatment",
    description: "I want to select articles where upadacitinib is used as a treatment for alopecia areata. If no mention of dosage, mark as uncertain"
  },
  {
    id: 3,
    shortName: "C3",
    category: "Outcomes",
    description: "I want to select articles where at least one of the following outcomes is evaluated:\n• Hair regrowth measurements\n• Quality of life scores\n• Comparison with other treatments\n• Safety and adverse events\n• Treatment duration and follow-up"
  },
  {
    id: 4,
    shortName: "C4",
    category: "Publication",
    description: "I want to exclude case reports, laboratory studies, and animal studies. I only want articles reporting clinical data on humans."
  },
  {
    id: 5,
    shortName: "C5",
    category: "Treatment",
    description: "I want to exclude documents that report data on topical JAK inhibitors only. I'm only interested in systemic treatments or their comparison."
  },
  {
    id: 6,
    shortName: "C6",
    category: "Language",
    description: "I want to include articles in English only."
  }
];

export const FREQUENT_CRITERIA = {
  all: [
    {
      id: 1,
      category: "Language",
      text: "I want to include articles in English only",
      usageCount: 145
    },
    {
      id: 2,
      category: "Scope",
      text: "I want to select articles where the population studied is adult patients with alopecia areata",
      usageCount: 100
    },
    {
      id: 3,
      category: "Scope",
      text: "I want to select articles where the population studied is pediatric patients with alopecia areata",
      usageCount: 85
    },
    {
      id: 4,
      category: "Treatment",
      text: "I want to select articles where JAK inhibitors are used as treatment",
      usageCount: 95
    },
    {
      id: 5,
      category: "Publication",
      text: "I want to exclude case reports and animal studies",
      usageCount: 89
    },
    {
      id: 6,
      category: "Publication",
      text: "I want to include only clinical trials and systematic reviews",
      usageCount: 78
    }
  ],
  categoryCounts: {
    "Language": 12,
    "Publication": 16,
    "Scope": 16,
    "Device": 16
  }
};
