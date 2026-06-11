let currentPhoto = null;
let editIndex = -1;
let deleteIndex = -1;

function openAdd() {
  editIndex = -1;
  document.getElementById('fishModalTitle').innerHTML = '<i class="fa-solid fa-plus me-2"></i>Fang eintragen';
  document.getElementById('fishSaveBtn').innerHTML = '<i class="fa-solid fa-check me-1"></i> Speichern';
  clearModalFields();
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
    date: new Date().toLocaleDateString('de-CH')
  };

  fish.unshift(entry);
  saveFishData(fish);
  checkAchievements(fish);
  renderAll();
  bootstrap.Modal.getInstance(document.getElementById('fishModal')).hide();
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
