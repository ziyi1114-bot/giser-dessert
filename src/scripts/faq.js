

let accordionControl = document.getElementsByClassName("accordion-header")
let accordionPanel = document.getElementById("accordion-panel")

accordionControl.addEventListener('click', function(){
    console.log("功能正廠");
    
    accordionPanel.classList.toggle('open')
})