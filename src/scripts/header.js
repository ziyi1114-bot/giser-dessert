// src/scripts/header.js

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

  // 點漢堡：開關選單
  hamburgerBtn.addEventListener("click", toggleMenu);

  // 點選單連結：關閉選單
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // 點背景遮罩：關閉選單
  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMenu);
  }

  // 視窗放大回桌機：自動收合
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && headerNav.classList.contains("active")) {
      closeMenu();
    }
  });
});
