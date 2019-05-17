export default function updateHelperText(cityId) {
  const helperText = document.querySelector('.js-helper-text');
  const { data, xAxis } = window.chartData;
  const helperTextDictionary = {
    racial: 'Raça',
    sex: 'Gênero',
    nse: 'Nível Sócio Econômico',
    baixa: 'Baixa',
    'medio-baixa': 'Médio Baixa',
    media: 'Média',
    'medio-alta': 'Médio Alta',
    alta: 'Alta',
    'desigualdade-extrema': 'Desigualdade Extrema',
    'desigualdade-alta': 'Desigualdade Alta',
    desigualdade: 'Desigualdade',
    equidade: 'Equidade',
    'situacoes-atipicas': 'Situações Atípicas',
  };

  if (!cityId) {
    helperText.setAttribute('hidden', '');
    return;
  }

  function getCityInfo() {
    return data.filter(item => item.city.id === cityId);
  }

  const cityInfo = getCityInfo(cityId);

  const ptInfo = cityInfo.find(item => item.subject === 'Português');
  const matInfo = cityInfo.find(item => item.subject === 'Matemática');

  helperText.removeAttribute('hidden');


  // city info
  helperText.querySelector('.js-city').textContent = ptInfo.city.name;
  helperText.querySelector('.js-uf').textContent = ptInfo.state.uf;
  helperText.querySelector('.js-inhabitants').textContent = ptInfo.city.inhabitants;
  helperText.querySelector('.js-xAxis').textContent = helperTextDictionary[xAxis];

  // pt info
  helperText.querySelector('.js-pt-quality').textContent = helperTextDictionary[ptInfo.range_quality];
  helperText.querySelector('.js-pt-inequality').textContent = helperTextDictionary[ptInfo.range_inequality];

  // mat info
  helperText.querySelector('.js-mat-quality').textContent = helperTextDictionary[matInfo.range_quality];
  helperText.querySelector('.js-mat-inequality').textContent = helperTextDictionary[matInfo.range_inequality];
}