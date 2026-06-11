const ACHIEVEMENTS = [
  { id: 'first', icon: 'fa-fish', title: 'Erster Fang', desc: 'Ersten Fisch eingetragen!', check: f => f.length >= 1 },
  { id: 'five', icon: 'fa-layer-group', title: 'Handvoll', desc: '5 Fänge erfasst.', check: f => f.length >= 5 },
  { id: 'ten', icon: 'fa-list-ol', title: 'Zehner-Club', desc: '10 Fänge erfasst.', check: f => f.length >= 10 },
  { id: 'fivekg', icon: 'fa-weight-hanging', title: 'Grosses Tier', desc: 'Fisch über 5 kg gefangen.', check: f => f.some(x => +x.weight >= 5) },
  { id: 'tenkg', icon: 'fa-star', title: 'Monsterfisch', desc: 'Fisch über 10 kg gefangen!', check: f => f.some(x => +x.weight >= 10) },
  { id: 'long', icon: 'fa-ruler', title: 'Der Lange', desc: 'Fisch über 80 cm gefangen.', check: f => f.some(x => +x.size >= 80) },
  { id: 'photo', icon: 'fa-camera', title: 'Fotograf', desc: 'Alle Fänge mit Foto dokumentiert.', check: f => f.length > 0 && f.every(x => x.photo) },
  { id: 'variety', icon: 'fa-shuffle', title: 'Vielfalt', desc: '5 verschiedene Fischarten gefangen.', check: f => new Set(f.map(x => x.name.trim().toLowerCase())).size >= 5 }
];

function checkAchievements(fish) {
  const unlocked = loadAchievements();
  const newly = [];
  ACHIEVEMENTS.forEach(a => {
    if (!unlocked.includes(a.id) && a.check(fish)) {
      unlocked.push(a.id);
      newly.push(a);
    }
  });
  if (newly.length) {
    saveAchievements(unlocked);
    newly.forEach(a => showAchievementToast(a));
  }
}

function showAchievementToast(achievement) {
  document.getElementById('achToastBody').textContent = achievement.title + ' – ' + achievement.desc;
  new bootstrap.Toast(document.getElementById('achToast'), { delay: 5000 }).show();
}
