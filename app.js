/* GenAI Campus app logic
  - Tabs + routing
  - Load lessons and render list/content
  - Checkpoints: MCQ & short text graded locally
  - Mastery score stored in localStorage
  - Progressive UI: unlocks better themes as mastery grows
  - Playground prompt evaluator (rule-based)
  - Projects & badges
  - Export/Import/Reset
*/

const $ = (q)=>document.querySelector(q);
const $$ = (q)=>Array.from(document.querySelectorAll(q));

const store = {
  get(){ try {return JSON.parse(localStorage.getItem('genai-campus')||'{}')} catch(e){return {}} },
  set(data){ localStorage.setItem('genai-campus', JSON.stringify(data)); },
  patch(p){ const d=this.get(); this.set({...d, ...p}); },
  clear(){ localStorage.removeItem('genai-campus'); }
};

const state = {
  course: window.GENAI_COURSE,
  projects: window.GENAI_PROJECTS,
  progress: 0,
  level: 0,
  mastery: {}, // lessonId -> {done, score}
  badges: [],
  streak: 0,
  name: "",
  theme: "starter"
};

function init(){
  // restore
  const saved = store.get();
  Object.assign(state, saved);
  bindTabs();
  renderStats();
  renderLessonList();
  renderProjects();
  bindHome();
  bindProfile();
  bindPlayground();
  applyTheme();
}
document.addEventListener('DOMContentLoaded', init);

// ---------- Tabs
function bindTabs(){
  const map = {
    "tab-home": "view-home",
    "tab-learn": "view-learn",
    "tab-practice": "view-practice",
    "tab-projects": "view-projects",
    "tab-profile": "view-profile"
  };
  Object.entries(map).forEach(([btnId, viewId])=>{
    document.getElementById(btnId).addEventListener('click', ()=>{
      $$('.tab').forEach(t=>t.classList.remove('active'));
      $$('#main .view').forEach(()=>{}); // not used
      Object.values(map).forEach(id => document.getElementById(id).classList.remove('active'));
      document.getElementById(btnId).classList.add('active');
      document.getElementById(viewId).classList.add('active');
    });
  });
}
function navigateTo(view){
  $$('.tab').forEach(t=>t.classList.remove('active'));
  $$('.view').forEach(v=>v.classList.remove('active'));
  $(`#tab-${view}`).classList.add('active');
  $(`#view-${view}`).classList.add('active');
}

// ---------- Home
function renderStats(){
  const lessonsTotal = state.course.length;
  const completed = Object.values(state.mastery).filter(m=>m && m.done).length;
  state.progress = Math.round((completed/lessonsTotal)*100)||0;
  $('#stat-lessons').textContent = String(lessonsTotal);
  $('#stat-progress').textContent = state.progress + '%';
  $('#stat-streak').textContent = state.streak || 0;
  // Achievements
  const node = $('#achievements');
  node.innerHTML = '';
  (state.badges||[]).forEach(b=>{
    const s = document.createElement('span');
    s.className='badge';
    s.textContent = b;
    node.appendChild(s);
  });
  // footer level
  $('#footer-level').textContent = 'Level ' + getLevel().level;
  save();
}
function bindHome(){
  $('#cta-start').addEventListener('click', ()=>{
    navigateTo('learn');
  });
}

// ---------- Lessons
function renderLessonList(){
  const list = $('#lesson-list');
  list.innerHTML = '';
  state.course.forEach(lesson=>{
    const item = document.createElement('div');
    item.className = 'lesson-item';
    item.innerHTML = `
      <div class="title">${lesson.title}</div>
      <div class="pill">${lesson.time}</div>
    `;
    item.addEventListener('click', ()=> openLesson(lesson.id));
    list.appendChild(item);
  });
}
function openLesson(id){
  const lesson = state.course.find(l => l.id === id);
  const pane = $('#lesson-content');
  pane.innerHTML = lesson.content;
  // render checkpoint
  const cp = $('#checkpoint');
  cp.innerHTML = '';
  lesson.questions.forEach((q, idx)=> cp.appendChild(renderQuestion(q, id, idx)));
  cp.classList.remove('hidden');
}

function renderQuestion(q, lessonId, idx){
  const wrap = document.createElement('div');
  wrap.className='q';
  const title = document.createElement('h4');
  title.textContent = `Check ${idx+1}`;
  wrap.appendChild(title);

  if(q.type === 'mcq'){
    const p = document.createElement('p'); p.textContent = q.prompt; wrap.appendChild(p);
    q.options.forEach((opt, i)=>{
      const btn = document.createElement('button');
      btn.textContent = opt; btn.style.marginRight='8px';
      btn.addEventListener('click', ()=>{
        const correct = (i === q.answerIndex);
        btn.style.borderColor = correct? 'var(--accent-2)': '#6b1c2a';
        btn.style.boxShadow = correct? 'var(--ring)': 'none';
        if(correct){
          incrementScore(lessonId, 1);
          toast('Correct! ' + (q.explain||''));
          maybeCompleteLesson(lessonId);
        }else{
          toast('Not quite. Try again.');
        }
      });
      wrap.appendChild(btn);
    });
    if(q.explain){
      const small = document.createElement('div');
      small.className='small'; small.textContent = 'Tip: ' + q.explain;
      wrap.appendChild(small);
    }
  }else if(q.type === 'text'){
    const p = document.createElement('p'); p.textContent = q.prompt; wrap.appendChild(p);
    const input = document.createElement('input');
    input.placeholder = 'Type your answer…'; input.style.width='100%';
    input.style.padding='10px'; input.style.borderRadius='10px'; input.style.border='1px solid #29314c';
    wrap.appendChild(input);
    const submit = document.createElement('button'); submit.textContent = 'Submit'; submit.style.marginTop='8px';
    wrap.appendChild(submit);
    submit.addEventListener('click', ()=>{
      const val = (input.value||'').toLowerCase();
      const rubric = (q.rubric||[]).some(key => val.includes(key));
      if(rubric){
        incrementScore(lessonId, 1);
        toast('Nice – that covers a key idea.');
        maybeCompleteLesson(lessonId);
      }else{
        toast('Hmm, try to include a key concept (hint: ' + (q.rubric?.[0]||'clarity') + ')');
      }
    });
  }
  return wrap;
}

function incrementScore(lessonId, delta){
  const m = state.mastery[lessonId] || {done:false, score:0};
  m.score = Math.min(3, (m.score||0) + delta); // simple cap
  state.mastery[lessonId] = m;
  save();
}
function maybeCompleteLesson(lessonId){
  const m = state.mastery[lessonId];
  if(m.score >= 2 && !m.done){
    m.done = true;
    state.streak = (state.streak||0) + 1;
    toast('Lesson complete!');
    gainThemeProgress();
  }
  renderStats();
  applyTheme();
}

// ---------- Theme progression
function getLevel(){
  const p = state.progress||0;
  let t='starter', level=0;
  if(p >= 10){ t='bronze'; level=1; }
  if(p >= 40){ t='silver'; level=2; }
  if(p >= 70){ t='gold'; level=3; }
  if(p >= 100){ t='platinum'; level=4; }
  return {theme:t, level};
}
function applyTheme(){
  const {theme} = getLevel();
  document.body.classList.remove('theme-bronze','theme-silver','theme-gold','theme-platinum');
  if(theme!=='starter'){ document.body.classList.add('theme-' + theme); }
  // lock profile theme to unlocked
  const select = $('#profile-theme');
  if(select){
    const desired = state.theme || 'starter';
    const unlocked = getLevel().theme;
    const finalTheme = rank(desired) <= rank(unlocked) ? desired : unlocked;
    state.theme = finalTheme;
    document.body.classList.remove('theme-' + desired);
    if(finalTheme!=='starter') document.body.classList.add('theme-' + finalTheme);
    select.value = finalTheme;
  }
}
function rank(name){
  return {starter:0, bronze:1, silver:2, gold:3, platinum:4}[name] ?? 0;
}
function gainThemeProgress(){
  // Cosmetic confetti-like pulse
  document.body.animate([
    {filter:'brightness(1)'},{filter:'brightness(1.2)'},{filter:'brightness(1)'}
  ],{duration:600});
}

// ---------- Playground (prompt evaluator)
function bindPlayground(){
  $('#btn-evaluate').addEventListener('click', ()=>{
    const t = $('#prompt-input').value||'';
    const score = evaluatePrompt(t);
    const feedback = [
      `Score: ${score}/10`,
      ...(score<7 ? [
        '- Add constraints (length, tone, format).',
        '- Include examples (few-shot).',
        '- Specify audience & success criteria.'
      ] : ['Great structure! Consider adding edge-case tests.'])
    ].join('\n');
    $('#prompt-feedback').textContent = feedback;
    if(score>=8){ awardBadge('Prompt Crafter'); }
  });
}
function evaluatePrompt(t){
  let s=0;
  const low = t.toLowerCase();
  if(low.includes('you are')||low.includes('act as')) s++;
  if(/output|json|schema|markdown/.test(low)) s++;
  if(/limit|words|bullets|tone|style|audience|format/.test(low)) s++;
  if(/example|few-shot|demonstration|e\.g\./.test(low)) s+=2;
  if(/steps|checklist|plan|chain/.test(low)) s++;
  if(/tests|criteria|acceptance|evaluation/.test(low)) s++;
  if(t.length>140) s++;
  if(/avoid|do not|must/.test(low)) s++;
  if(/context|background/.test(low)) s++;
  return Math.min(10,s);
}

// ---------- Projects
function renderProjects(){
  const wrap = $('#projects');
  wrap.innerHTML='';
  state.projects.forEach(p=>{
    const card = document.createElement('div');
    card.className='project-card';
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="actions">
        <button data-id="${p.id}" class="btn-done">Mark Complete</button>
        <span class="small">Reward: ${p.reward}</span>
      </div>
    `;
    card.querySelector('.btn-done').addEventListener('click', ()=>{
      awardBadge(p.reward);
    });
    $('#projects').appendChild(card);
  });
}
function awardBadge(name){
  if(!(state.badges||[]).includes(name)){
    state.badges = [...(state.badges||[]), name];
    toast('Badge earned: ' + name);
    renderStats();
    applyTheme();
  }
}

// ---------- Profile & data mgmt
function bindProfile(){
  const name = $('#profile-name'); name.value = state.name || '';
  name.addEventListener('change', ()=>{ state.name = name.value; save(); });

  const theme = $('#profile-theme'); theme.value = state.theme || 'starter';
  theme.addEventListener('change', ()=>{
    const desired = theme.value;
    const unlocked = getLevel().theme;
    if(rank(desired) <= rank(unlocked)){
      state.theme = desired; applyTheme(); save();
    }else{
      toast('That theme unlocks later!');
      theme.value = state.theme;
    }
  });

  $('#btn-export').addEventListener('click', ()=>{
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'genai-campus-progress.json'; a.click();
    URL.revokeObjectURL(url);
  });
  $('#btn-import').addEventListener('click', ()=> $('#file-import').click());
  $('#file-import').addEventListener('change', async (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const text = await file.text();
    try{
      const data = JSON.parse(text);
      Object.assign(state, data); save(); location.reload();
    }catch(err){
      toast('Invalid file.');
    }
  });
  $('#btn-reset').addEventListener('click', ()=>{
    if(confirm('Reset all progress?')){
      store.clear(); location.reload();
    }
  });
}

// ---------- utils
function toast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position:'fixed', bottom:'18px', left:'50%', transform:'translateX(-50%)',
    background:'#121a33', color:'white', padding:'10px 14px', border:'1px solid #2a3868',
    borderRadius:'10px', zIndex:10
  });
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 1800);
}
function save(){ store.set(state); }

// Auto-upgrade to platinum theme on full completion
window.addEventListener('storage', ()=> applyTheme());
