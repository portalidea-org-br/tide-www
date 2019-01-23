import MicroModal from 'micromodal';

export default function initModal() {
  console.log('modal hello!!');
  MicroModal.init({
    debugMode: true,
  });
  MicroModal.show('js-modal-user-popup'); // [1]
}
