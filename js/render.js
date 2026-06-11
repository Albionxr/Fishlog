function renderAll() {
  const fish = loadFish();
  renderTable(fish);
  renderStats(fish);
  renderXP(fish);
  renderAchievements(fish);
  renderLocations(fish);
}

function renderTable(fish) {
  const tbody = document.getElementById('fishTableBody');
  const empty = document.getElementById('emptyState');

  if (!fish.length) {
    tbody.innerHTML = '';
    empty.classList.remove('d-none');
    return;
  }

  empty.classList.add('d-none');

  const maxWeight = Math.max(...fish.map(f => +f.weight || 0));

  tbody.innerHTML = fish.map((f, i) => {
    const isRecord = maxWeight > 0 && +f.weight === maxWeight;
    const photo = f.photo
      ? '<img src="' + f.photo + '" class="fish-thumb" alt="">'
      : '<div class="fish-ph"><i class="fa-solid fa-fish" style="font-size:0.9rem"></i></div>';

    return '<tr>' +
      '<td>' + photo + '</td>' +
      '<td><strong>' + escapeHtml(f.name) + '</strong>' +
      (isRecord ? '<span class="badge ms-1" style="background:#ffc107;color:#333;font-size:0.7rem"><i class="fa-solid fa-trophy me-1"></i>Rekord</span>' : '') +
      '</td>' +
      '<td>' + (f.weight ? f.weight + ' kg' : '—') + '</td>' +
      '<td>' + (f.size ? f.size + ' cm' : '—') + '</td>' +
      '<td>' + escapeHtml(f.location) + '</td>' +
      '<td class="text-muted small">' + f.date + '</td>' +
      '<td><button class="btn btn-sm btn-outline-danger" onclick="askDelete(' + i + ')" title="Löschen"><i class="fa-solid fa-trash"></i></button></td>' +
      '</tr>';
  }).join('');
}

function renderStats(fish) {
  const weights = fish.map(f => +f.weight).filter(Boolean);
  const sizes = fish.map(f => +f.size).filter(Boolean);
  const species = new Set(fish.map(f => f.name.trim().toLowerCase())).size;

  document.getElementById('recTotal').textContent = fish.length;
  document.getElementById('recMaxWeight').textContent = weights.length ? Math.max(...weights).toFixed(2) + ' kg' : '—';
  document.getElementById('recMaxSize').textContent = sizes.length ? Math.max(...sizes) + ' cm' : '—';
  document.getElementById('recSpecies').textContent = species || 0;
}

function renderXP(fish) {
  const xp = calcXP(fish);
  const level = calcLevel(xp);
  const prev = prevThreshold(level);
  const next = nextThreshold(level);
  const progress = xp - prev;
  const range = next - prev;
  const pct = Math.min(100, Math.round((progress / range) * 100));

  document.getElementById('currentLevel').textContent = level;
  document.getElementById('totalXP').textContent = xp + ' XP';
  document.getElementById('xpProgress').textContent = progress + ' / ' + range + ' XP';
  document.getElementById('xpNextLabel').textContent = '→ Level ' + (level + 1);
  document.getElementById('xpBar').style.width = pct + '%';
}

function renderAchievements(fish) {
  const unlocked = loadAchievements();
  document.getElementById('achievementsList').innerHTML = ACHIEVEMENTS.map(a => {
    const done = unlocked.includes(a.id);
    return '<div class="ach ' + (done ? 'done' : 'locked') + '">' +
      '<i class="fa-solid ' + a.icon + '"></i>' +
      '<div><div class="ach-name">' + a.title +
      (done ? '<i class="fa-solid fa-check text-success ms-1" style="font-size:0.75rem"></i>' : '') +
      '</div><div class="ach-desc">' + a.desc + '</div></div>' +
      '</div>';
  }).join('');
}

function renderLocations(fish) {
  const locationEmpty = document.getElementById('locationEmptyState');
  const locationList = document.getElementById('locationList');

  if (!fish.length) {
    locationEmpty.classList.remove('d-none');
    locationList.innerHTML = '';
    return;
  }

  const counts = {};
  fish.forEach(f => {
    const loc = f.location.trim();
    counts[loc] = (counts[loc] || 0) + 1;
  });

  locationEmpty.classList.add('d-none');
  locationList.innerHTML = Object.entries(counts).map(([loc, count]) =>
    '<div class="col-6 col-md-4 col-lg-3">' +
    '<div class="location-card">' +
    '<i class="fa-solid fa-location-dot me-2" style="color:#e8611a"></i>' +
    '<span class="loc-name">' + escapeHtml(loc) + '</span>' +
    '<div class="loc-count mt-1">' + count + ' Fang' + (count !== 1 ? 'e' : '') + '</div>' +
    '</div></div>'
  ).join('');
}
