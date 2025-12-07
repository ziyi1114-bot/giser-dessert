document.addEventListener("DOMContentLoaded", function() {
   let headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', function() {
            let itemContainer = this.closest(".accordion-item");
            itemContainer.classList.toggle('active');
            
        });
    });
});