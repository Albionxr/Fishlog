document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  document.getElementById('fishModal').addEventListener('hidden.bs.modal', clearModalFields);

  document.getElementById('fishPhoto').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      currentPhoto = e.target.result;
      document.getElementById('photoPreview').innerHTML =
        '<img src="' + currentPhoto + '" style="width:100%;height:100%;object-fit:cover">';
    };
    reader.readAsDataURL(file);
  });
});
