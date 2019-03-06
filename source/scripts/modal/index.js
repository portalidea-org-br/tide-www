import MicroModal from 'micromodal';

function setModalGlobalStatus() {
  sessionStorage.setItem('modalHasBeenClosed', 1);
}

export default function initModal() {
  MicroModal.init({
    debugMode: true,
    onClose: () => setModalGlobalStatus(1), // [2]
  });

  if (!sessionStorage.getItem('modalHasBeenClosed')) {
    document.getElementById('js-open-modal').click();
  }
}
