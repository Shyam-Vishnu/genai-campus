# GenAI Campus — Progressive Learning Website

This is a self‑contained, vanilla HTML/CSS/JS site that teaches Generative AI with interactive lessons, a prompt‑engineering playground, and capstone projects. As learners complete checkpoints, the site **unlocks better themes (bronze → silver → gold → platinum)**, so by the time the course is finished, the site looks its best.

## Quick start
1. Download and unzip the project.
2. Open `index.html` in your browser. (No build tools required.)
3. Progress is saved in `localStorage` (export/import available from Profile).

## Structure
- `index.html` — Layout and views
- `styles.css` — Base styling + progressive themes
- `lessons.js` — Course content & checkpoints (extend here)
- `app.js` — Logic: routing, grading, progression, badges, export/import

## Add lessons
Open `lessons.js` and append to `window.GENAI_COURSE`:
```js
{
  id: "module.topic",
  title: "My New Topic",
  time: "8 min",
  content: `<h3>...</h3><p>Explain the concept...</p>`,
  questions: [
    { type: "mcq", prompt: "...", options: ["A","B","C"], answerIndex: 1, explain: "why" },
    { type: "text", prompt: "...", rubric: ["keyword1","keyword2"] }
  ]
}
```

## How the site “gets better” as you learn
- Completing lessons increases **progress** → upgrades theme automatically.
- Earning project badges adds to the **Achievements** area.
- The **footer Level** increments with progress milestones.
- At **100% completion**, the **Platinum** theme is applied.

## Roadmap ideas
- Add a service worker for offline/PWA.
- Add code sandboxes that validate outputs.
- Add spaced repetition (SRS) review sessions.
- Hook a real LLM (server or API) behind the playground.
