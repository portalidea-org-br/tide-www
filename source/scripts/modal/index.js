import MicroModal from 'micromodal';

function setModalGlobalStatus() {
  sessionStorage.setItem('modalHasBeenClosed', 1);
}

export default function initModal() {
  const $modalLink = document.getElementById('js-open-modal')

  MicroModal.init({
    // debugMode: true,
    onClose: () => setModalGlobalStatus(1), // [2]
  });

  if ($modalLink && !sessionStorage.getItem('modalHasBeenClosed')) {
    $modalLink.click();
  }
}
