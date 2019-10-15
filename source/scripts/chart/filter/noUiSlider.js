import * as noUiSlider from 'nouislider/distribute/nouislider';
import numbro from 'numbro';
import 'numbro/languages/pt-BR';

numbro.setLanguage('pt-BR');

export default function startRange() {
  // console.log(nouislider)
  const range = document.getElementById('js-range');
  // window.noUiSlider = noUiSlider;

  if (!range) {
    return;
  }

  noUiSlider.create(range, {
    start: [0, 80],
    connect: true,
    // tooltips: true,
    range: {
      min: 0,
      max: 100,
    },
  });

  range.setAttribute('disabled', true);

  const minValue = document.getElementById('js-range-min-value');
  const maxValue = document.getElementById('js-rang-max-value');

  range.noUiSlider.on('update', (values, handle) => {
    if (handle) {
      maxValue.value = numbro(values[handle]).format({
        average: true,
        mantissa: 1,
        optionalMantissa: true,
      });
    } else {
      minValue.value = numbro(values[handle]).format({
        average: true,
        mantissa: 1,
        optionalMantissa: true,
      });
    }
  });

  window.range = range;
}
