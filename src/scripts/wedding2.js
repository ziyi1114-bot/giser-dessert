
function toggleUpload(show) {
    const uploadSection = document.getElementById('upload-section');
    if (show) {
        uploadSection.style.display = 'block'; // 顯示
    } else {
        uploadSection.style.display = 'none';  // 隱藏
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const realInput = document.getElementById('real-file-input');
    const fileNameDisplay = document.getElementById('file-name-display');

    if (realInput) {
        realInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                fileNameDisplay.innerText = this.files[0].name;
                fileNameDisplay.style.color = "#333";
            } else {
                fileNameDisplay.innerText = "尚未選擇檔案";
                fileNameDisplay.style.color = "#999";
            }
        });
    }
});