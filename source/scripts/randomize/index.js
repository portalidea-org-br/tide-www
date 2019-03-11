import Axios from 'axios';

function shufleAndSelect(array, items) {
  // Shuffle array
  const shuffled = array.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  const selected = shuffled.slice(0, items);
  return selected;
}

function mountInpireHtml(items, id) {
  let sections = '';
  const element = document.getElementById(id);

  items.forEach((item) => {
    sections += `
    <section>
      <header>
        <h2>
          ${item.title}
          <br>
          <span>${item.author}</span>
        </h2>
        <p>${item.short_description}</p>
      </header>
      <img
        srcset="${item.image} 600w, ${item.image_big} 1000w"
        src="${item.image}" alt="${item.alt}">
      <a href="${item.file}" class="button button--black" target="_blank">ler experiencia</a>
    </section>
    `;
  });
  element.innerHTML = sections;
}

function mountNovidadesHtml(items, id) {
  let sections = '';
  const element = document.getElementById(id);

  items.forEach((item) => {
    sections += `
      <section>
        <div class="home-block-news__content">
          <header>
            <h3>${item.title}</h3>
            <p>${item.short_description}</p>
          </header>
          <a href="${item.permalink}" class="button button--arrow-icon">ver mais</a>
        </div>
      </section>
    `;
  });
  element.innerHTML = sections;
}

function mountDepoimentosHtml(items, id) {
  let sections = '';
  const element = document.getElementById(id);

  items.forEach((item) => {
    sections += `
      <blockquote>
        <div class="testimonials__content">
          <figure>
            <img src="${item.image}" alt="${item.alt}">
          </figure>
          ${item.content}
          <footer><cite>${item.name}</cite></footer>
        </div>
      </blockquote>
    `;
  });
  element.innerHTML = sections;
}

function mountPesquisasHtml(items, id) {
  let sections = '';
  const element = document.getElementById(id);

  items.forEach((item) => {
    sections += `
      <section>
        <header>
          <h2>${item.title}</h2>
        </header>
        <p>${item.short_description}</p>
        <a href="${item.file}" class="button button--black">ler pesquisa</a>
      </section>
    `;
  });
  element.innerHTML = sections;
}

export default async function initRamdomize() {
  await Axios.get('/inspirese/index.json')
    .then(response => response.data.inspirese)
    .then(response => shufleAndSelect(response, 3))
    .then(response => mountInpireHtml(response, 'js-inspire'));

  await Axios.get('/novidades/index.json')
    .then(response => response.data.novidades)
    .then(response => shufleAndSelect(response, 3))
    .then(response => mountNovidadesHtml(response, 'js-novidades'));

  await Axios.get('/depoimentos/index.json')
    .then(response => response.data.depoimentos)
    .then(response => shufleAndSelect(response, 3))
    .then(response => mountDepoimentosHtml(response, 'js-depoimentos'));

  await Axios.get('/pesquisas/index.json')
    .then(response => response.data.pesquisas)
    .then(response => shufleAndSelect(response, 2))
    .then(response => mountPesquisasHtml(response, 'js-pesquisas'));
}
