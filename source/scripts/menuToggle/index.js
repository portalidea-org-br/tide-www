export default function initMenuToggle() {
  const menuButton = document.querySelector('.js-menu-toggle');
  const menuList = document.querySelector('.js-menu-list');
  console.log(menuList);

  function toggleMenu() {
    menuList.classList.toggle('active');
  }

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      toggleMenu();
    });
  }
}
