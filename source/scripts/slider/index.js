import { tns } from 'tiny-slider/src/tiny-slider';

export default function initSlider() {
  Array.prototype.forEach.call(document.querySelectorAll('.slider'), (el) => {
    tns({
      container: el,
      controls: false,
      navPosition: 'bottom',
      autoplayButtonOutput: false,
      // items: 1,
      center: true,
      // autoWidth: true,
      // autoplay: true,
      autoplay: false,
      responsive: {
        1024: {
          disable: true,
        },
      },
    });
  });
}
