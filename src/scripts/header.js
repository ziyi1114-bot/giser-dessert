
document.addEventListener("DOMContentLoaded", function () {
  const headerNav = document.querySelector(".site-header__nav");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.querySelectorAll("#nav-list a");
  const navBackdrop = document.getElementById("nav-backdrop");

  if (!headerNav || !hamburgerBtn) return;

  function openMenu() {
    headerNav.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    headerNav.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  function toggleMenu() {
    if (headerNav.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // 開關選單
  hamburgerBtn.addEventListener("click", toggleMenu);


  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });


  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMenu);
  }


  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && headerNav.classList.contains("active")) {
      closeMenu();
    }
  });
});
