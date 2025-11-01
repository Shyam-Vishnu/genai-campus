// Course definition: lessons + inline checkpoints.
// Each lesson can define: id, title, time, content (HTML), questions (MCQ & short answer)
window.GENAI_COURSE = [
  {
    id: "foundations.intro",
    title: "What is Generative AI?",
    time: "7 min",
    content: `
      <h3>What is Generative AI?</h3>
      <p>Generative AI (GenAI) models <em>produce</em> content: text, images, code, audio. They learn patterns from large datasets and generate new samples that follow similar distributions.</p>
      <ul>
        <li><b>Language models</b> (LLMs) generate text/code.</li>
        <li><b>Diffusion</b> and <b>GANs</b> generate images/audio/video.</li>
        <li>Key ideas: tokens, embeddings, attention, sampling.</li>
      </ul>
      <p><b>Responsible AI</b> is essential: bias, safety, privacy, and attribution must be considered in every design.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Which is NOT a typical GenAI output?",
        options: ["Text", "Images", "Network packets", "Code"],
        answerIndex: 2,
        explain: "Generative models commonly produce text, images, code, audio, or video—not raw network traffic."
      },
      {
        type: "text",
        prompt: "Name one ethical consideration when designing GenAI systems.",
        rubric: ["bias", "safety", "privacy", "attribution", "security", "misuse"]
      }
    ]
  },
  {
    id: "llms.tokens",
    title: "Tokens & Embeddings",
    time: "9 min",
    content: `
      <h3>Tokens & Embeddings</h3>
      <p>LLMs operate on <b>tokens</b>—subword pieces. Each token is mapped to an <b>embedding</b> (a vector). Similar meanings cluster in vector space.</p>
      <p>Embedding spaces enable semantic search and retrieval-augmented generation (RAG).</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "What best describes an embedding?",
        options: [
          "A compressed image file",
          "A numerical vector representing meaning",
          "A tokenization error",
          "A model parameter initializer"
        ],
        answerIndex: 1,
        explain: "Embeddings represent tokens (or larger units) as vectors capturing semantic relationships."
      }
    ]
  },
  {
    id: "llms.attention",
    title: "Attention & Transformers",
    time: "12 min",
    content: `
      <h3>Attention & Transformers</h3>
      <p><b>Self-attention</b> lets a token attend to others to build context. Transformers stack attention + feed-forward blocks, enabling parallel training and long-range dependencies.</p>
      <p>Key hyperparameters: layers, heads, hidden size, context window.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Why did Transformers replace many RNNs?",
        options: [
          "They ignore context",
          "They train faster in parallel and capture long-range dependencies",
          "They use fewer parameters always",
          "They only work for images"
        ],
        answerIndex: 1,
        explain: "Parallelism and effective long-range context made Transformers dominant."
      }
    ]
  },
  {
    id: "prompting.core",
    title: "Prompt Engineering",
    time: "10 min",
    content: `
      <h3>Prompt Engineering</h3>
      <p>Clear instructions, constraints, and examples improve outputs.</p>
      <ul>
        <li><b>Structure</b>: role, task, constraints, examples, output format.</li>
        <li><b>Scaffolding</b>: chain-of-thought (summarized), checklists, planning.</li>
        <li><b>Evaluation</b>: define success criteria to judge outputs.</li>
      </ul>
    `,
    questions: [
      {
        type: "text",
        prompt: "Write one constraint you might include in a prompt for summarization.",
        rubric: ["word", "limit", "bullets", "tone", "audience", "format"]
      }
    ]
  },
  {
    id: "rag.basics",
    title: "RAG Basics",
    time: "10 min",
    content: `
      <h3>Retrieval-Augmented Generation (RAG)</h3>
      <p>Combine a retriever (vector search) with an LLM to ground answers in your data.</p>
      <ol>
        <li>Chunk & embed documents</li>
        <li>Retrieve top-k passages</li>
        <li>Compose a grounded prompt</li>
        <li>Generate & cite sources</li>
      </ol>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Which step comes first in RAG?",
        options: ["Generate", "Chunk & embed docs", "Evaluate", "Deploy"],
        answerIndex: 1,
        explain: "You must create embeddings to enable retrieval."
      }
    ]
  },
  {
    id: "safety.ethics",
    title: "Safety & Ethics",
    time: "8 min",
    content: `
      <h3>Safety & Ethics</h3>
      <p>Mitigate risks: toxic content, disallowed requests, privacy leaks, hallucinations.</p>
      <p>Use guardrails: policies, moderation, red-teaming, and user education.</p>
    `,
    questions: [
      {
        type: "text",
        prompt: "Name one strategy to reduce hallucinations in LLM apps.",
        rubric: ["retrieval", "rag", "verify", "self-check", "grounding", "post-processing"]
      }
    ]
  }
];

// Simple projects
window.GENAI_PROJECTS = [
  {
    id: "proj.promptlib",
    title: "Design a Prompt Library",
    description: "Curate 10 reusable prompts with roles, constraints, and output schemas.",
    reward: "Bronze Badge"
  },
  {
    id: "proj.ragdemo",
    title: "Build a Tiny RAG Notebook",
    description: "Sketch a pipeline (pseudo) to chunk, embed, retrieve, and answer with citations.",
    reward: "Silver Badge"
  },
  {
    id: "proj.safetycheck",
    title: "Write Safety Checks",
    description: "Define 10 red-flag cases and how your app responds.",
    reward: "Gold Badge"
  }
];
