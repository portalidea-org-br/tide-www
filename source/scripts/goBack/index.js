export default function goBack() {
  const $goBackButton = document.querySelector('.js-go-back');

  if ($goBackButton) {
    $goBackButton.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.back();
    });
  }
}
