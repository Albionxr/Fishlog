const XP_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000];

function loadFish() {
  return JSON.parse(localStorage.getItem('fl_fish') || '[]');
}

function saveFishData(arr) {
  localStorage.setItem('fl_fish', JSON.stringify(arr));
}

function loadAchievements() {
  return JSON.parse(localStorage.getItem('fl_ach') || '[]');
}

function saveAchievements(arr) {
  localStorage.setItem('fl_ach', JSON.stringify(arr));
}

function calcXP(fish) {
  return fish.reduce((sum, f) => sum + 10 + Math.floor((+f.weight || 0) * 8), 0);
}

function calcLevel(xp) {
  let level = 1;
  XP_THRESHOLDS.forEach((t, i) => {
    if (xp >= t) level = i + 1;
  });
  return level;
}

function prevThreshold(level) {
  return XP_THRESHOLDS[level - 1] ?? 0;
}

function nextThreshold(level) {
  return XP_THRESHOLDS[level] ?? (XP_THRESHOLDS[XP_THRESHOLDS.length - 1] + 1000);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
