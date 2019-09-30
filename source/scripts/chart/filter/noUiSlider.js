import * as noUiSlider from 'nouislider/distribute/nouislider';
// import 'nouislider/distribute/nouislider.css';
// import 'nouislider';
// import 'nouislider/distribute/nouislider.css';
// import noUiSlider from 'nouislider';
// import noUiSlider from "nouislider";
// const noUiSlider = require('nouislider');
// require('nouislider/distribute/nouislider.css');


// require('nouislider');
// require('nouislider/distribute/nouislider.css');

export default function startRange() {
  // console.log(nouislider)
  const range = document.getElementById('js-range');
  // window.noUiSlider = noUiSlider;

  noUiSlider.create(range, {
    start: [20, 80],
    connect: true,
    tooltips: true,
    range: {
      'min': 0,
      'max': 100
    }
  });
}
