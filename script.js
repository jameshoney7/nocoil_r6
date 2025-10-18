const mockPlayers = {
  "playerOne": { name: "playerOne", kd: 1.42, winrate: 52.3, matches: 1280, level: 243 },
  "nightshade": { name: "nightshade", kd: 2.01, winrate: 61.7, matches: 2045, level: 325 },
  "rookie": { name: "rookie", kd: 0.78, winrate: 38.1, matches: 412, level: 48 }
};

function $(id) { return document.getElementById(id); }

function formatNumber(n){ return n.toLocaleString(); }

function showStats(data){
  $("playerName").textContent = data.name;
  $("kd").textContent = data.kd.toFixed(2);
  $("winrate").textContent = data.winrate.toFixed(1) + "%";
  $("matches").textContent = formatNumber(data.matches);
  $("level").textContent = data.level;
  $("stats").classList.remove("hidden");
}

function generateRandomStats(name){
  // plausible ranges for demo
  const kd = (Math.random() * 2.8 + 0.4);
  const winrate = (Math.random() * 45 + 30);
  const matches = Math.floor(Math.random() * 3000 + 20);
  const level = Math.floor(Math.random() * 400 + 1);
  return { name, kd, winrate, matches, level };
}

function sanitize(input){ return input.trim().toLowerCase().replace(/[^a-z0-9_-]/g, ""); }

document.addEventListener('DOMContentLoaded', ()=>{
  const input = $("playerInput");
  const btn = $("searchBtn");

  function doSearch(){
    const raw = input.value || "";
    if(!raw.trim()){ input.focus(); return; }
    const key = sanitize(raw);
    const found = mockPlayers[key];
    if(found){
      // short delay to feel interactive
      setTimeout(()=> showStats(found), 260);
    } else {
      const fallback = generateRandomStats(raw.trim());
      setTimeout(()=> showStats(fallback), 260);
    }
  }

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') doSearch(); });
});
