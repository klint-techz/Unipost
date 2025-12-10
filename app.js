// --- Shared DOM elements ---
const fileInput = document.getElementById('mediaUpload');
const fileNameDisplay = document.getElementById('file-name');
const previewContainer = document.getElementById('previewContainer');
const previewBtn = document.getElementById('previewBtn');

// --- Array to track selected files ---
let selectedFiles = [];

// --- Update selectedFiles when input changes ---
fileInput.addEventListener('change', () => {
    selectedFiles = Array.from(fileInput.files);
    updateFileNames();
});

// --- Helper function to update file name display ---
function updateFileNames() {
    if (selectedFiles.length > 0) {
        fileNameDisplay.textContent = selectedFiles.map(f => f.name).join(', ');
    } else {
        fileNameDisplay.textContent = "No files chosen";
    }
}

// --- Post button functionality ---
function post() {
    // Track caption
    const captionInput = document.getElementById('caption');
    const caption = captionInput.value.trim();

    // Track selected platforms
    const platformCheckboxes = document.querySelectorAll('.platforms input, .platforms2 input');
    const selectedPlatforms = [];
    platformCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedPlatforms.push(checkbox.value);
        }
    });

    // Validation
    if (!caption && selectedFiles.length === 0) {
        alert("Please enter a caption or select at least one file!");
        return;
    }
    if (selectedPlatforms.length === 0) {
        alert("Please select at least one social platform!");
        return;
    }

    // Log data (replace with backend integration later)
    console.log("Caption:", caption);
    console.log("Selected Platforms:", selectedPlatforms);
    console.log("Files:", selectedFiles);

    alert("Post data collected! Check console for details.");
}

// --- Preview button functionality ---
previewBtn.addEventListener('click', () => {
    renderPreviews();
});

// --- Render previews with remove buttons ---
function renderPreviews() {
    previewContainer.innerHTML = "";

    selectedFiles.forEach((file, index) => {
        const fileType = file.type;
        const wrapper = document.createElement("div");
        wrapper.classList.add("preview-wrapper");

        let element;
        if (fileType.startsWith("image/")) {
            element = document.createElement("img");
            element.src = URL.createObjectURL(file);
            element.classList.add("preview-media");
        } else if (fileType.startsWith("video/")) {
            element = document.createElement("video");
            element.src = URL.createObjectURL(file);
            element.controls = true;
            element.classList.add("preview-media");
        }

        // Remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "×";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener('click', () => {
            selectedFiles.splice(index, 1);
            renderPreviews();
            updateFileNames();
        });

        wrapper.appendChild(element);
        wrapper.appendChild(removeBtn);
        previewContainer.appendChild(wrapper);
    });
}
