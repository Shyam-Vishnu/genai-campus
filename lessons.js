window.GENAI_COURSE = [
  { id: "foundations.intro", title: "What is Generative AI?", time: "7 min",
    content: `<h3>What is Generative AI?</h3>
      <p>Generative AI models produce content: text, images, code, audio.</p>
      <ul><li>LLMs (text/code)</li><li>Diffusion & GANs (images/audio)</li><li>Key ideas: tokens, embeddings, attention</li></ul>
      <p><b>Responsible AI</b>: bias, safety, privacy, attribution.</p>`,
    questions: [
      { type: "mcq", prompt: "Which is NOT a typical GenAI output?",
        options: ["Text", "Images", "Network packets", "Code"], answerIndex: 2,
        explain: "GenAI doesn’t generate raw network traffic." },
      { type: "text", prompt: "Name one ethical consideration.", rubric: ["bias","safety","privacy","attribution"] }
    ]
  },
  { id: "llms.tokens", title: "Tokens & Embeddings", time: "9 min",
    content: `<h3>Tokens & Embeddings</h3><p>Tokens map to numeric vectors (embeddings); similar meanings cluster.</p>`,
    questions: [
      { type: "mcq", prompt: "What is an embedding?",
        options: ["Compressed image", "Vector of meaning", "Tokenizer bug", "Hyperparameter"],
        answerIndex: 1, explain: "Embeddings encode semantics." }
    ]
  },
  { id: "llms.attention", title: "Attention & Transformers", time: "12 min",
    content: `<h3>Attention & Transformers</h3><p>Self‑attention builds context; Transformers enable parallel training and long-range dependencies.</p>`,
    questions: [
      { type: "mcq", prompt: "Why did Transformers replace many RNNs?",
        options: ["Ignore context","Parallel + long-range","Always fewer params","Only for images"],
        answerIndex: 1, explain: "Parallelism + long context." }
    ]
  },
  { id: "prompting.core", title: "Prompt Engineering", time: "10 min",
    content: `<h3>Prompt Engineering</h3>
      <p>Clear instructions, constraints, examples, output schema.</p>
      <ul><li>Structure: role, task, constraints, examples, format</li><li>Scaffolding: plans/checklists</li><li>Evaluation criteria</li></ul>`,
    questions: [
      { type: "text", prompt: "Write one constraint for a summary.", rubric:["word","limit","bullets","tone","audience","format"] }
    ]
  },
  { id: "rag.basics", title: "RAG Basics", time: "10 min",
    content: `<h3>RAG Basics</h3><ol><li>Chunk & embed</li><li>Retrieve top‑k</li><li>Grounded prompt</li><li>Generate & cite</li></ol>`,
    questions: [
      { type: "mcq", prompt: "Which step comes first in RAG?",
        options: ["Generate","Chunk & embed docs","Evaluate","Deploy"], answerIndex: 1,
        explain: "Embeddings enable retrieval." }
    ]
  },
  { id: "safety.ethics", title: "Safety & Ethics", time: "8 min",
    content: `<h3>Safety & Ethics</h3><p>Mitigate toxic content, privacy leaks, hallucinations. Guardrails + user education.</p>`,
    questions: [
      { type: "text", prompt: "Name one way to reduce hallucinations.", rubric:["retrieval","rag","verify","self-check","ground"] }
    ]
  }
];

window.GENAI_PROJECTS = [
  { id:"proj.promptlib", title:"Design a Prompt Library", description:"Curate 10 reusable prompts.", reward:"Bronze Badge" },
  { id:"proj.ragdemo", title:"Build a Tiny RAG Notebook", description:"Sketch chunk→embed→retrieve→answer.", reward:"Silver Badge" },
  { id:"proj.safetycheck", title:"Write Safety Checks", description:"Define 10 red-flag cases & responses.", reward:"Gold Badge" }
];
