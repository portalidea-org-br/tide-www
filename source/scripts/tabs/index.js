export default function initTabs() {
  const $tabLinks = document.querySelectorAll('.tabs__controller a');
  const $tabs = document.querySelectorAll('.tabs__content div');

  function selectTab(tab) {
    $tabs.forEach(item => item.classList.remove('visible'));
    document.getElementById(tab).classList.add('visible');
  }

  function setActiveLink(link) {
    $tabLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  }

  if ($tabLinks && $tabs) {
    $tabLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        setActiveLink(link);

        const tab = event.target.hash.substr(1);
        selectTab(tab);
      });
    });
  }
}
