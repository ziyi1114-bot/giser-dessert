window.onscroll = function(){
    if(document.documentElement.scrollTop > 200){
      document.getElementById("header-scroll").classList.add("smallPanel")
    }
    else{
          document.getElementById("header-scroll").classList.remove("smallPanel")
    }
    
}