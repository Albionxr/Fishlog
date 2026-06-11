function renderAll() {
  const fish = loadFish();
  renderTable(fish);
  renderStats(fish);
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
      '<td></td>' +
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
