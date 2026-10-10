/* =========================================================
   ADF2027 — A Day with the Foxes  |  script.js
   Edit the CONFIG block below to turn the APIs on.
   ========================================================= */
const CONFIG = {
  EVENT_DATE: "2027-02-23T09:00:00+08:00",

  // --- API 1: YouTube (promotional video) ---
  // Paste the video ID only, e.g. "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ
  YT_VIDEO_ID: "ZnlP-tYRBmo",
  // OPTIONAL: YouTube Data API v3 key (for view/like counts). Title + author work without a key via oEmbed.
  YT_API_KEY: "",

  // --- API 2: Open-Meteo weather (free, no key) ---
  PLACE: "Angeles City, Pampanga",
  LAT: 15.145,
  LON: 120.5887,

  // --- API 3: Google Maps embed (no key needed for the basic embed) ---
  MAP_QUERY: "Holy Angel University, Angeles City, Pampanga",

  // --- Forms (Contact + Newsletter) ---
  // Easiest: create a free form at https://formspree.io and paste the endpoint, e.g. "https://formspree.io/f/abcdwxyz"
  // Or deploy a Google Apps Script web app that appends rows to a Google Sheet and paste its URL.
  FORM_ENDPOINT: "",
  NEWSLETTER_ENDPOINT: "",
  FALLBACK_EMAIL: "adf2027@example.com" // palitan ng real email
};

/* ---------- Data ---------- */
const ORGS = [
  {k:"cyber",  ico:"🛡️", name:"Cybersecurity Intelligence Alliance", tag:"Same mission, stronger alliance.", type:"Org for Cybersecurity", adv:"Adviser: TBA"},
  {k:"council",ico:"🏛️", name:"School of Computing Student Council", tag:"Rooted in code, driven by purpose.", type:"Highest governing body of the School of Computing", adv:"Adviser: TBA"},
  {k:"aws",    ico:"☁️", name:"AWS Student Builder Group · HAU", tag:"Cloud computing powers modern tech, with AWS leading the way.", type:"Org for Cloud Computing", adv:"Adviser: TBA"},
  {k:"lop",    ico:"💻", name:"League of Outstanding Programmers", tag:"Where outstanding begins.", type:"Org for Computer Science", adv:"Adviser: TBA"},
  {k:"codegeeks",ico:"⌨️", name:"Code Geeks", tag:"We are the future.", type:"Org for Web Development", adv:"Adviser: TBA"},
  {k:"gdg",    ico:"🔷", name:"Google Developer Groups on Campus · HAU", tag:"Build. Learn. Transform.", type:"University-wide organization", adv:"Adviser: TBA"},
  {k:"maia",   ico:"🎨", name:"Multimedia Afficionados for Interested Artists · HAU", tag:"Dare to create.", type:"Org for Entertainment and Multimedia Computing", adv:"Adviser: TBA"},
  {k:"access", ico:"📰", name:"The Access Point", tag:"Compiling news, interpreting views.", type:"Student publication of the School of Computing", adv:"Adviser: TBA"}
];

// Org logo from images/logos/<key>.png. Falls back to the emoji if the file is missing.
const orgLogo = (o,cls="logo")=>`<img class="${cls}" src="images/logos/${o.k}.png" alt="${o.name} logo" loading="lazy" onerror="this.replaceWith(document.createTextNode('${o.ico}'))">`;

const GALLERY = [
  {cat:"Opening", t:"Opening Program"}, {cat:"Opening", t:"Welcome Remarks"},
  {cat:"Booths",  t:"Org Booths"},      {cat:"Booths",  t:"Tech Demo Corner"},
  {cat:"Mascot",  t:"Meet the Fox"},    {cat:"Mascot",  t:"Fox Photo Op"},
  {cat:"Crowd",   t:"Audience"},        {cat:"Crowd",   t:"Students at the Hall"},
  {cat:"Booths",  t:"Games Area"},      {cat:"Opening", t:"Guest Speaker"},
  {cat:"Crowd",   t:"Group Photo"},     {cat:"Mascot",  t:"Ready to Explore"}
];

const SOCIALS = [["Facebook","#"],["Instagram","#"],["YouTube","#"],["TikTok","#"]];

const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

/* ---------- Shared header + footer ---------- */
function mountChrome(){
  const page = location.pathname.split("/").pop() || "index.html";
  const links = [["index.html","Home"],["features.html","Explore"],["services.html","Discover"],["contact.html","Contact"]];
  const h = $("#site-header");
  if(h) h.innerHTML = `
  <header class="site"><div class="container nav">
    <a class="brand" href="index.html"><span class="logo">🦊</span><span>Holy Angel University<br>School of Computing</span></a>
    <button class="burger" aria-label="Menu">☰</button>
    <ul>${links.map(([u,n])=>`<li><a href="${u}" class="${page===u?"active":""}">${n}</a></li>`).join("")}</ul>
  </div></header>`;
  const f = $("#site-footer");
  if(f) f.innerHTML = `
  <footer class="site"><div class="container">
    <div class="foot-grid">
      <div><h4>ADF2027</h4><p>A Day with the Foxes is the premier student experience event at HAU, bridging the gap between technology, creativity, and the next generation of leaders.</p></div>
      <div><h4>Quick Links</h4><ul>${links.map(([u,n])=>`<li><a href="${u}">${n}</a></li>`).join("")}</ul></div>
      <div><h4>Follow Us</h4><ul>${SOCIALS.map(([n,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join("")}</ul></div>
    </div>
    <p class="copy">© 2027 A Day with the Foxes | School of Computing | All Rights Reserved</p>
  </div></footer>`;
  const b = $(".burger"); if(b) b.onclick=()=>$(".nav ul").classList.toggle("open");
}

/* ---------- Placeholder image helper ---------- */
// Drop real photos in /images and name them e.g. gallery-1.jpg. If missing, a placeholder shows.
function ph(src,label,extra=""){
  return `<div class="ph ${extra}" style="position:relative"><span>${label}<small style="display:block;font:500 .7rem var(--font-b);opacity:.8;margin-top:4px">${src}</small></span><img src="${src}" alt="${label}" loading="lazy" onerror="this.remove()" style="position:absolute;inset:0"></div>`;
}

/* ---------- Scroll reveal ---------- */
function reveal(){
  const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);} }),{threshold:.12});
  $$(".rv").forEach(el=>io.observe(el));
}

/* ---------- Home: org cards ---------- */
function renderOrgCards(){
  const box = $("#org-cards"); if(!box) return;
  box.innerHTML = ORGS.map(o=>`
  <article class="paper org rv">
    <div class="tag">"${o.tag}"</div>
    <div class="ico">${o.ico}</div>
    <h3>${o.name}</h3>
    <p>${o.type}</p>
    <div class="btns">
      <a class="btn dark sm" href="features.html#orgs">Learn More</a>
      <a class="btn dark sm" href="contact.html?org=${o.k}#form">Join</a>
    </div>
  </article>`).join("");
}

/* ---------- API 1: YouTube ---------- */
async function initVideo(){
  const box = $("#video"); if(!box) return;
  const id = CONFIG.YT_VIDEO_ID.trim();
  if(!id){
    box.innerHTML = `<div class="empty">▶ Paste your YouTube video ID in <code>CONFIG.YT_VIDEO_ID</code> (script.js) to show the ADF2027 promotional video here.</div>`;
    return;
  }
  if(location.protocol==="file:"){
    // YouTube refuses embeds on pages opened straight from a folder (Error 153).
    // Show a thumbnail that opens the video on YouTube. Once the site is hosted, the real player loads.
    box.innerHTML = `<a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener" style="position:absolute;inset:0;display:block"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="Watch the ADF2027 promotional video on YouTube" style="width:100%;height:100%;object-fit:cover"><span style="position:absolute;inset:0;display:grid;place-items:center;font:700 1.5rem var(--font-h);color:#fff;background:rgba(0,0,0,.45)">▶ Watch on YouTube</span></a>`;
  }else{
    box.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}" title="ADF2027 Promotional Video" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>`;
  }
  const stats = $("#vstats");
  try{
    // oEmbed — no API key required
    const r = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
    const d = await r.json();
    stats.innerHTML = `<span>🎬 ${d.title}</span><span>📺 ${d.author_name}</span>`;
  }catch(e){ /* silent */ }
  if(CONFIG.YT_API_KEY){
    try{
      const r = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${CONFIG.YT_API_KEY}`);
      const s = (await r.json()).items?.[0]?.statistics;
      if(s) stats.innerHTML += `<span>👁 ${(+s.viewCount).toLocaleString()} views</span><span>👍 ${(+s.likeCount).toLocaleString()} likes</span>`;
    }catch(e){}
  }
}

/* ---------- Countdown ---------- */
function initCountdown(){
  const box = $("#countdown"); if(!box) return;
  const target = new Date(CONFIG.EVENT_DATE).getTime();
  const tick = ()=>{
    let d = Math.max(0,target-Date.now());
    const v = [Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];
    box.innerHTML = ["Days","Hours","Minutes","Seconds"].map((l,i)=>`<div class="cd"><b>${String(v[i]).padStart(2,"0")}</b><span>${l}</span></div>`).join("");
  };
  tick(); setInterval(tick,1000);
}

/* ---------- Gallery + Lightbox ---------- */
function initGallery(){
  const g = $("#gallery"); if(!g) return;
  const cats = ["All",...new Set(GALLERY.map(x=>x.cat))];
  $("#filters").innerHTML = cats.map((c,i)=>`<button class="chip ${i?"":"on"}" data-c="${c}">${c}</button>`).join("");
  let cur = [];
  const draw = c=>{
    cur = GALLERY.map((x,i)=>({...x,i})).filter(x=>c==="All"||x.cat===c);
    g.innerHTML = cur.map((x,n)=>`<div class="gitem" data-n="${n}">${ph(`images/gallery-${x.i+1}.jpg`,x.t)}</div>`).join("");
  };
  draw("All");
  $("#filters").onclick = e=>{
    const b = e.target.closest(".chip"); if(!b) return;
    $$(".chip",$("#filters")).forEach(x=>x.classList.remove("on")); b.classList.add("on"); draw(b.dataset.c);
  };
  const lb = $("#lightbox"); let idx = 0;
  const show = n=>{
    idx = (n+cur.length)%cur.length; const x = cur[idx];
    $("#lb-body").innerHTML = ph(`images/gallery-${x.i+1}.jpg`,x.t);
    $("#lb-body .ph").style.cssText += ";width:min(900px,92vw);aspect-ratio:16/10;font-size:2rem";
    $("#lb-cap").textContent = `${x.cat} · ${x.t}  (${idx+1}/${cur.length})`;
  };
  g.onclick = e=>{ const it = e.target.closest(".gitem"); if(it){ lb.classList.add("open"); show(+it.dataset.n); } };
  $("#lb-x").onclick = ()=>lb.classList.remove("open");
  $("#lb-p").onclick = ()=>show(idx-1);
  $("#lb-n").onclick = ()=>show(idx+1);
  lb.onclick = e=>{ if(e.target===lb) lb.classList.remove("open"); };
  document.addEventListener("keydown",e=>{
    if(!lb.classList.contains("open")) return;
    if(e.key==="Escape") lb.classList.remove("open");
    if(e.key==="ArrowLeft") show(idx-1);
    if(e.key==="ArrowRight") show(idx+1);
  });
}

/* ---------- Brochure viewer ---------- */
function initBrochure(){
  const b = $("#brochure"); if(!b) return;
  const pages = [
    ["Event Details",["Date: Feb 23–24, 2027","Venue: SJH Building, Academic Hall","Time: 9:00 AM – 4:00 PM"]],
    ["Discover Our Organizations",ORGS.slice(0,4).map(o=>o.name)],
    ["More Organizations",ORGS.slice(4).map(o=>o.name)],
    ["Event Highlights",["Games & Activities","Organization Booths","Technology Exhibits","Networking","Giveaways & Photo Opportunities"]],
    ["Join the Foxes",["Register at the booth","Follow our socials","Bring your friends!"]],
    ["Contact",["Dr. Mary Jane Rabena","Sir Bon Flores","SJH Building, HAU"]]
  ];
  let p = 0;
  const draw = ()=>{
    b.innerHTML = [pages[p],pages[p+1]].map(x=>x?`<div class="page"><h3>${x[0]}</h3><ul>${x[1].map(i=>`<li>${i}</li>`).join("")}</ul></div>`:"").join("");
    $("#bro-ind").textContent = `Pages ${p+1}–${Math.min(p+2,pages.length)} of ${pages.length}`;
  };
  draw();
  $("#bro-p").onclick = ()=>{ p = Math.max(0,p-2); draw(); };
  $("#bro-n").onclick = ()=>{ if(p+2<pages.length){ p+=2; draw(); } };
}

/* ---------- Flip cards ---------- */
function initFlip(){
  const box = $("#flip-cards"); if(!box) return;
  box.innerHTML = ORGS.map(o=>`
  <div class="flip rv"><div class="flip-in">
    <div class="face front"><div class="ico">${orgLogo(o)}</div><h3>${o.name}</h3><small>Tap / hover to flip</small></div>
    <div class="face back"><h3>${o.name}</h3><p>"${o.tag}"</p><p>${o.type}</p><p><b>${o.adv}</b></p>
      <a class="btn dark sm" href="contact.html?org=${o.k}#form">Join</a></div>
  </div></div>`).join("");
  box.onclick = e=>{ if(e.target.closest("a")) return; const f=e.target.closest(".flip"); if(f) f.classList.toggle("on"); };
}

/* ---------- Schedule tabs ---------- */
function initTabs(){
  const t = $("#sched-tabs"); if(!t) return;
  t.onclick = e=>{
    const b = e.target.closest(".chip"); if(!b) return;
    $$(".chip",t).forEach(x=>x.classList.remove("on")); b.classList.add("on");
    $$(".tab-panel").forEach(p=>p.classList.toggle("on",p.id===b.dataset.t));
  };
}

/* ---------- FAQ accordion ---------- */
function initFaq(){
  $$(".faq-q").forEach(q=>q.onclick=()=>{
    const it = q.parentElement, was = it.classList.contains("on");
    $$(".faq-item").forEach(i=>i.classList.remove("on"));
    if(!was) it.classList.add("on");
  });
}

/* ---------- Quiz: which org fits you? ---------- */
function initQuiz(){
  const q = $("#quiz"); if(!q) return;
  const QS = [
    ["What do you enjoy most?",[["Finding bugs & breaking things (ethically)","cyber"],["Building websites","codegeeks"],["Designing & creating visuals","maia"],["Writing & storytelling","access"]]],
    ["Pick a weekend project:",[["Deploy an app to the cloud","aws"],["Solve algorithm challenges","lop"],["Organize a campus event","council"],["Learn Flutter / Android","gdg"]]],
    ["Your ideal teammate is…",[["Methodical & security-minded","cyber"],["A creative who loves animation","maia"],["A natural leader","council"],["A competitive problem solver","lop"]]],
    ["Which sounds most exciting?",[["A hackathon with Google tools","gdg"],["A cloud architecture workshop","aws"],["Publishing a campus news piece","access"],["Launching a portfolio site","codegeeks"]]]
  ];
  const score = {}; let i = 0;
  const draw = ()=>{
    if(i>=QS.length){
      const top = Object.entries(score).sort((a,b)=>b[1]-a[1])[0][0];
      const o = ORGS.find(x=>x.k===top);
      q.innerHTML = `<div class="progress"><div style="width:100%"></div></div><h3>You belong in…</h3><p>${orgLogo(o,"logo big")}</p><h3>${o.name}</h3><p>"${o.tag}"</p><br>
        <a class="btn dark" href="contact.html?org=${o.k}#form">Join this org</a> <button class="btn dark" id="retry">Retake</button>`;
      $("#retry").onclick = ()=>{ i=0; for(const k in score) delete score[k]; draw(); };
      return;
    }
    const [t,opts] = QS[i];
    q.innerHTML = `<div class="progress"><div style="width:${i/QS.length*100}%"></div></div><h3>${t}</h3>` +
      opts.map(([l,k])=>`<button class="opt" data-k="${k}">${l}</button>`).join("");
    $$(".opt",q).forEach(b=>b.onclick=()=>{ score[b.dataset.k]=(score[b.dataset.k]||0)+1; i++; draw(); });
  };
  draw();
}

/* ---------- API 2: Open-Meteo weather ---------- */
const WX = {0:["Clear sky","☀️"],1:["Mostly clear","🌤️"],2:["Partly cloudy","⛅"],3:["Overcast","☁️"],45:["Fog","🌫️"],48:["Fog","🌫️"],
  51:["Light drizzle","🌦️"],53:["Drizzle","🌦️"],55:["Heavy drizzle","🌧️"],61:["Light rain","🌧️"],63:["Rain","🌧️"],65:["Heavy rain","🌧️"],
  80:["Rain showers","🌦️"],81:["Rain showers","🌧️"],82:["Violent showers","⛈️"],95:["Thunderstorm","⛈️"],96:["Thunderstorm","⛈️"],99:["Thunderstorm","⛈️"]};
async function initWeather(){
  const box = $("#weather"); if(!box) return;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${CONFIG.LAT}&longitude=${CONFIG.LON}`+
    `&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max`+
    `&timezone=Asia%2FManila&forecast_days=16`;
  try{
    const d = await (await fetch(url)).json();
    const c = d.current, w = WX[c.weather_code]||["—","🌡️"];
    let html = `<div class="wx"><small>Now · ${CONFIG.PLACE}</small><b>${w[1]} ${Math.round(c.temperature_2m)}°C</b>${w[0]} · wind ${Math.round(c.wind_speed_10m)} km/h</div>`;
    const day = "2027-02-23", n = d.daily.time.indexOf(day);
    if(n>-1){
      const ew = WX[d.daily.weather_code[n]]||["—","🌡️"];
      html += `<div class="wx"><small>Event day · Feb 23, 2027</small><b>${ew[1]} ${Math.round(d.daily.temperature_2m_max[n])}° / ${Math.round(d.daily.temperature_2m_min[n])}°</b>${ew[0]} · ${d.daily.precipitation_probability_max[n]}% rain</div>`;
    }else{
      html += `<div class="wx"><small>Event day · Feb 23, 2027</small><b>📅</b>Forecast appears 16 days before the event.</div>`;
    }
    box.innerHTML = html;
  }catch(e){ box.innerHTML = `<div class="wx">Weather unavailable right now.</div>`; }
}

/* ---------- API 3: Google Maps embed ---------- */
function initMap(){
  const m = $("#map"); if(!m) return;
  m.innerHTML = `<iframe loading="lazy" title="Venue map" src="https://maps.google.com/maps?q=${encodeURIComponent(CONFIG.MAP_QUERY)}&output=embed"></iframe>`;
}

/* ---------- Forms (contact + newsletter) ---------- */
async function send(endpoint,payload,msgEl,okText){
  msgEl.className="msg"; msgEl.textContent="Sending…";
  // always keep a local copy so nothing is lost during the demo
  try{ const k="adf_submissions"; const arr=JSON.parse(localStorage.getItem(k)||"[]"); arr.push({...payload,at:new Date().toISOString()}); localStorage.setItem(k,JSON.stringify(arr)); }catch(e){}
  if(!endpoint){
    msgEl.className="msg ok"; msgEl.textContent = okText+" (demo mode: saved locally. Add FORM_ENDPOINT in script.js to send for real.)"; return true;
  }
  try{
    const r = await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
    if(!r.ok) throw 0;
    msgEl.className="msg ok"; msgEl.textContent = okText; return true;
  }catch(e){
    msgEl.className="msg err"; msgEl.textContent = `Hindi na-send. Pakisubukan ulit o mag-email sa ${CONFIG.FALLBACK_EMAIL}.`; return false;
  }
}
function initForms(){
  const cf = $("#contact-form");
  if(cf){
    const org = new URLSearchParams(location.search).get("org");
    if(org){ const o = ORGS.find(x=>x.k===org); if(o) $("#subject").value = `I want to join: ${o.name}`; }
    cf.onsubmit = async e=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(cf));
      if(await send(CONFIG.FORM_ENDPOINT,data,$("#cf-msg"),"Salamat! Natanggap namin ang message mo.")) cf.reset();
    };
  }
  const nl = $("#news-form");
  if(nl) nl.onsubmit = async e=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(nl));
    if(await send(CONFIG.NEWSLETTER_ENDPOINT||CONFIG.FORM_ENDPOINT,{type:"newsletter",...data},$("#nl-msg"),"Subscribed! Check your inbox for ADF2027 updates.")) nl.reset();
  };
}

/* ---------- Placeholders for hero / promo images ---------- */
function initPh(){
  $$("[data-ph]").forEach(el=>{ el.outerHTML = ph(el.dataset.src||"",el.dataset.ph,el.dataset.shape||""); });
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded",()=>{
  mountChrome(); initPh(); renderOrgCards(); initVideo(); initCountdown(); initGallery(); initBrochure();
  initFlip(); initTabs(); initFaq(); initQuiz(); initWeather(); initMap(); initForms(); reveal();
});
