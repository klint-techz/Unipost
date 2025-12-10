const fileInput = document.getElementById('mediaUpload');
const fileName = document.getElementById('file-name');

fileInput.addEventListener('change', () => {
  if(fileInput.files.length > 0){
    fileName.textContent = fileInput.files[0].name;
  } else {
    fileName.textContent = "No file chosen";
  }
});
