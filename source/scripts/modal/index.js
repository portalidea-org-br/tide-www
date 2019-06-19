import MicroModal from 'micromodal';

function setModalGlobalStatus() {
  sessionStorage.setItem('modalHasBeenClosed', 1);
}

function handleModalClose(modalId) {
  if (modalId === 'js-modal-idea-video') {
    const iframeYoutube = document.querySelector('#iframeYoutube');
    iframeYoutube.contentWindow.postMessage('{"event":"command", "func":"pauseVideo", "args":""}', '*');
  }
  if (modalId === 'js-modal-user-popup') {
    setModalGlobalStatus(1); // [2]
  }
}

export default function initModal() {
  const $modalLink = document.getElementById('js-open-modal');

  MicroModal.init({
    // debugMode: true,
    onClose: (modal) => {
      handleModalClose(modal.id);
    },
  });

  if ($modalLink && !sessionStorage.getItem('modalHasBeenClosed')) {
    $modalLink.click();
  }
}
