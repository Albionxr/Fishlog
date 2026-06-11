let currentPhoto = null;
let editIndex = -1;
let deleteIndex = -1;

function openAdd() {
  editIndex = -1;
  document.getElementById('fishModalTitle').innerHTML = '<i class="fa-solid fa-plus me-2"></i>Fang eintragen';
  document.getElementById('fishSaveBtn').innerHTML = '<i class="fa-solid fa-check me-1"></i> Speichern';
  clearModalFields();
}

function openEdit(index) {
  const fish = loadFish();
  const entry = fish[index];
  editIndex = index;

  document.getElementById('fishModalTitle').innerHTML = '<i class="fa-solid fa-pen me-2"></i>Fang bearbeiten';
  document.getElementById('fishSaveBtn').innerHTML = '<i class="fa-solid fa-floppy-disk me-1"></i> Änderungen speichern';

  document.getElementById('fishName').value = entry.name;
  document.getElementById('fishWeight').value = entry.weight;
  document.getElementById('fishSize').value = entry.size;
  document.getElementById('fishLocation').value = entry.location;

  currentPhoto = entry.photo || null;
  document.getElementById('photoPreview').innerHTML = entry.photo
    ? '<img src="' + entry.photo + '" style="width:100%;height:100%;object-fit:cover">'
    : '<i class="fa-regular fa-image"></i>';

  ['fishName', 'fishWeight', 'fishSize', 'fishLocation'].forEach(id =>
    document.getElementById(id).classList.remove('is-invalid')
  );

  new bootstrap.Modal(document.getElementById('fishModal')).show();
}

function saveFish() {
  let valid = true;
  ['fishName', 'fishWeight', 'fishSize', 'fishLocation'].forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.classList.add('is-invalid');
      valid = false;
    } else {
      el.classList.remove('is-invalid');
    }
  });

  if (!valid) return;

  const fish = loadFish();
  const entry = {
    name: document.getElementById('fishName').value.trim(),
    weight: document.getElementById('fishWeight').value.trim(),
    size: document.getElementById('fishSize').value.trim(),
    location: document.getElementById('fishLocation').value.trim(),
    photo: currentPhoto,
    date: editIndex >= 0 ? fish[editIndex].date : new Date().toLocaleDateString('de-CH')
  };

  if (editIndex >= 0) {
    fish[editIndex] = entry;
  } else {
    fish.unshift(entry);
  }

  saveFishData(fish);
  checkAchievements(fish);
  renderAll();
  bootstrap.Modal.getInstance(document.getElementById('fishModal')).hide();
}

function askDelete(index) {
  deleteIndex = index;
  new bootstrap.Modal(document.getElementById('delModal')).show();
}

function clearModalFields() {
  ['fishName', 'fishWeight', 'fishSize', 'fishLocation'].forEach(id => {
    const el = document.getElementById(id);
    el.value = '';
    el.classList.remove('is-invalid');
  });
  document.getElementById('fishPhoto').value = '';
  document.getElementById('photoPreview').innerHTML = '<i class="fa-regular fa-image"></i>';
  currentPhoto = null;
}
