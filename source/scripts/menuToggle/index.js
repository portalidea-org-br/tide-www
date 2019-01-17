export default function initMenuToggle() {
  const menuButton = document.querySelector('.js-menu-toggle');
  const menuList = document.querySelector('.js-menu-list');

  function toggleMenu() {
    menuList.classList.toggle('active');
  }

  menuButton.addEventListener('click', () => {
    toggleMenu();
  });
}
