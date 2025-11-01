// Expanded Generative AI curriculum for GenAI Campus
// Drop-in replacement for lessons.js
// -------------------------------------------------------
// What’s new:
// - 12 lesson modules from foundations → deployment
// - 2–3 checkpoints per lesson (MCQ + short-answer)
// - Crisp, learner-friendly content that fits the UI
// - Consistent IDs (module.topic) so progress persists safely
// -------------------------------------------------------

window.GENAI_COURSE = [
  // 0. Foundations
  {
    id: "foundations.intro",
    title: "What is Generative AI?",
    time: "7 min",
    content: `
      <h3>What is Generative AI?</h3>
      <p>Generative AI (GenAI) models create <em>new</em> content—text, images, audio, code—by learning patterns from data and sampling from those distributions.</p>
      <ul>
        <li>LLMs → text/code; Diffusion & GANs → images/audio/video.</li>
        <li>Core ideas: tokens, embeddings, attention, sampling.</li>
        <li>Responsible AI: safety, bias, privacy, attribution.</li>
      </ul>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Which is NOT a typical GenAI output?",
        options: ["Text", "Images", "Network packets", "Code"],
        answerIndex: 2,
        explain: "GenAI models don’t commonly generate raw network traffic."
      },
      {
        type: "text",
        prompt: "Name one ethical consideration when building GenAI apps.",
        rubric: ["bias", "safety", "privacy", "attribution", "security", "misuse"]
      }
    ]
  },

  // 1. Tokens & Embeddings
  {
    id: "llms.tokens",
    title: "Tokens & Embeddings",
    time: "9 min",
    content: `
      <h3>Tokens & Embeddings</h3>
      <p>LLMs operate on <b>tokens</b> (subword units). Each token maps to a numerical <b>embedding</b> vector; similar meanings cluster in vector space.</p>
      <p>Embeddings enable semantic search, clustering, deduplication, and RAG.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "What best describes an embedding?",
        options: [
          "A compressed image",
          "A vector representing meaning",
          "A tokenizer error",
          "A model hyperparameter"
        ],
        answerIndex: 1,
        explain: "Embeddings encode semantic information as numeric vectors."
      },
      {
        type: "text",
        prompt: "Give one use-case of embeddings beyond RAG.",
        rubric: ["clustering", "dedup", "similarity", "classification"]
      }
    ]
  },

  // 2. Attention & Transformers
  {
    id: "llms.attention",
    title: "Attention & Transformers",
    time: "12 min",
    content: `
      <h3>Attention & Transformers</h3>
      <p><b>Self-attention</b> lets each token weigh others to form context. Transformers stack attention with feed-forward layers, enabling parallel training and long-range dependencies.</p>
      <p>Key dials: #layers, heads, hidden size, context window, positional encodings.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Why did Transformers outperform many RNNs?",
        options: [
          "They ignore context",
          "Parallel training + long-range dependencies",
          "They always have fewer parameters",
          "They only work for images"
        ],
        answerIndex: 1,
        explain: "Transformers scale via parallelism and capture long contexts effectively."
      },
      {
        type: "text",
        prompt: "Name one parameter that limits context length.",
        rubric: ["context", "window", "sequence", "positional"]
      }
    ]
  },

  // 3. Prompt Engineering
  {
    id: "prompting.core",
    title: "Prompt Engineering",
    time: "10 min",
    content: `
      <h3>Prompt Engineering</h3>
      <p>Clear structure and constraints improve reliability.</p>
      <ul>
        <li>Role, task, constraints, examples, output schema.</li>
        <li>Scaffolding: plans, checklists, tool-usage instructions.</li>
        <li>Define success criteria to evaluate outputs.</li>
      </ul>
    `,
    questions: [
      {
        type: "text",
        prompt: "Write one constraint you’d include for a summary task.",
        rubric: ["word", "limit", "bullets", "tone", "audience", "format"]
      },
      {
        type: "mcq",
        prompt: "Which element typically <em>reduces</em> randomness in outputs?",
        options: ["Longer context", "Clear constraints", "No examples", "Ambiguous goals"],
        answerIndex: 1,
        explain: "Constraints narrow the output space and reduce randomness."
      }
    ]
  },

  // 4. Sampling & Decoding
  {
    id: "llms.decoding",
    title: "Sampling & Decoding",
    time: "8 min",
    content: `
      <h3>Sampling & Decoding</h3>
      <p>Generation uses decoding strategies: greedy, beam, top-k, nucleus (top-p), temperature.</p>
      <p>Trade-offs: determinism vs creativity; coherence vs diversity.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Raising temperature generally makes outputs…",
        options: ["More deterministic", "More creative/diverse", "Shorter", "Less grammatical"],
        answerIndex: 1,
        explain: "Higher temperature increases randomness and diversity."
      }
    ]
  },

  // 5. RAG Basics
  {
    id: "rag.basics",
    title: "RAG Basics",
    time: "10 min",
    content: `
      <h3>Retrieval-Augmented Generation (RAG)</h3>
      <ol>
        <li>Chunk & embed documents</li>
        <li>Retrieve top-k passages</li>
        <li>Compose a grounded prompt</li>
        <li>Generate with citations</li>
      </ol>
      <p>Focus on chunking, metadata, filters, and evaluation.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Which step comes first in RAG?",
        options: ["Generate", "Chunk & embed docs", "Evaluate", "Deploy"],
        answerIndex: 1,
        explain: "Embeddings are needed before retrieval can work."
      },
      {
        type: "text",
        prompt: "Name one way to reduce hallucinations in RAG.",
        rubric: ["ground", "retrieval", "rerank", "verify", "guardrail", "cite"]
      }
    ]
  },

  // 6. RAG – Quality & Evaluation
  {
    id: "rag.quality",
    title: "RAG Quality & Evaluation",
    time: "9 min",
    content: `
      <h3>RAG Quality</h3>
      <p>Key levers: chunk size/overlap, hybrid search (BM25 + vectors), reranking, query rewriting, and fresh indexes.</p>
      <p>Evaluate with answer faithfulness, citation accuracy, coverage, latency.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Which combo often yields stronger retrieval?",
        options: ["Vectors only", "BM25 only", "Hybrid: BM25 + vectors", "Random sampling"],
        answerIndex: 2,
        explain: "Hybrid search captures lexical and semantic matches."
      },
      {
        type: "text",
        prompt: "Give one metric to evaluate grounded answers.",
        rubric: ["faithful", "citation", "coverage", "latency", "precision", "recall"]
      }
    ]
  },

  // 7. Fine‑Tuning & Adapters
  {
    id: "finetune.adapters",
    title: "Fine‑Tuning & Adapters (LoRA/PEFT)",
    time: "10 min",
    content: `
      <h3>When to Fine‑Tune</h3>
      <p>Use fine‑tuning for style adherence, domain jargon, or structured outputs when prompting + RAG isn’t enough.</p>
      <p><b>Adapters</b> (LoRA/PEFT) train small parameter sets, keeping costs and overfitting lower.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Adapters (e.g., LoRA) primarily help by…",
        options: ["Training the full model", "Updating small low‑rank weights", "Changing the tokenizer", "Extending context window"],
        answerIndex: 1,
        explain: "LoRA learns low‑rank updates to existing weights."
      },
      {
        type: "text",
        prompt: "Name a case where RAG is better than fine‑tuning.",
        rubric: ["private data", "frequent updates", "facts change", "docs change"]
      }
    ]
  },

  // 8. Safety & Governance
  {
    id: "safety.ethics",
    title: "Safety & Governance",
    time: "8 min",
    content: `
      <h3>Safety & Governance</h3>
      <p>Mitigate toxic content, jailbreaks, privacy leaks, insecure code, and hallucinations.</p>
      <p>Guardrails: policies, filters, input/output checks, rate limits, red‑teaming, user education.</p>
    `,
    questions: [
      {
        type: "text",
        prompt: "Name one defense against prompt injection.",
        rubric: ["sanitize", "isolation", "system prompt", "policy", "filter", "escape"]
      },
      {
        type: "mcq",
        prompt: "Which practice helps prevent data leakage?",
        options: ["Log everything in plain text", "Encrypt sensitive data and minimize logs", "Disable auth", "Share API keys"],
        answerIndex: 1,
        explain: "Encrypt + minimize logs; never store secrets in prompts or outputs."
      }
    ]
  },

  // 9. Evaluation & Observability
  {
    id: "eval.metrics",
    title: "Evaluation & Observability",
    time: "9 min",
    content: `
      <h3>Evaluate What Matters</h3>
      <p>Define task‑level metrics (exact match, BLEU/ROUGE for summaries with care), human review rubrics, and LLM‑as‑judge (calibrated) for subjective tasks.</p>
      <p>Track latency, cost, error rates, and user feedback. Log prompts/outputs safely.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Which is <em>not</em> an observability signal?",
        options: ["Latency", "Token usage", "Cost per request", "User’s SSN"],
        answerIndex: 3,
        explain: "Never collect sensitive data unnecessarily."
      }
    ]
  },

  // 10. Tools, Function Calling & Agents
  {
    id: "agents.tools",
    title: "Tools, Function Calling & Agents",
    time: "10 min",
    content: `
      <h3>Tools & Agents</h3>
      <p>Function/tool calling lets models request external actions (search, DB, calculators). Agents coordinate multi‑step tasks via planning + tool use.</p>
      <p>Key design: action schemas, validation, retries, guardrails, timeouts.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "What’s the main benefit of tool calling?",
        options: ["Bigger prompts", "External actions grounded in real data", "Fewer tokens", "Offline mode"],
        answerIndex: 1,
        explain: "Tools let models act and fetch fresh/grounded information."
      },
      {
        type: "text",
        prompt: "Name one safeguard for an agent using tools.",
        rubric: ["schema", "validate", "timeout", "rate", "approval", "sandbox"]
      }
    ]
  },

  // 11. Multimodal & Deployment
  {
    id: "deploy.multimodal",
    title: "Multimodal & Deployment",
    time: "10 min",
    content: `
      <h3>Multimodal & Deployment</h3>
      <p>Models can process images/audio/video + text. Deployment options: hosted APIs, self‑hosting, on‑device (edge).</p>
      <p>Checklist: keys management, quotas, caching, fallback models, A/B testing, CANARY releases, SLOs.</p>
    `,
    questions: [
      {
        type: "mcq",
        prompt: "Which helps control costs at scale?",
        options: ["Disable caching", "Unlimited retries", "Response caching & smaller models for easy tasks", "No rate limits"],
        answerIndex: 2,
        explain: "Cache non‑personalized responses; right‑size the model to the task."
      },
      {
        type: "text",
        prompt: "Name one reason to run on edge/on‑device.",
        rubric: ["latency", "privacy", "offline", "cost"]
      }
    ]
  }
];

// Projects unchanged; you can extend separately if you like
window.GENAI_PROJECTS = window.GENAI_PROJECTS || [
  { id: "proj.promptlib", title: "Design a Prompt Library", description: "Curate 10 reusable prompts with roles, constraints, and output schemas.", reward: "Bronze Badge" },
  { id: "proj.ragdemo", title: "Build a Tiny RAG Notebook", description: "Sketch a pipeline (pseudo) to chunk, embed, retrieve, and answer with citations.", reward: "Silver Badge" },
  { id: "proj.safetycheck", title: "Write Safety Checks", description: "Define 10 red‑flag cases and how your app responds.", reward: "Gold Badge" }
];
