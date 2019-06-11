import Axios from 'axios';

function shufleAndSelect(array, items) {
  // Shuffle array
  const shuffled = array.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  const selected = shuffled.slice(0, items);
  return selected;
}

function mountInspireHtml(items, id) {
  let sections = '';
  const element = document.getElementById(id);

  if (element) {
    items.forEach((item) => {
      sections += `
      <section>
        <header>
          <h2>${item.title}<span>${item.author}</span></h2>
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
}

function mountNovidadesHtml(items, id) {
  let sections = '';
  const element = document.getElementById(id);

  if (element) {
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
}

function mountDepoimentosHtml(items, id) {
  let sections = '';
  const element = document.getElementById(id);

  if (element) {
    items.forEach((item) => {
      let videoId;
      if (item.video) {
        videoId = getYoutubeVideoId(item.video);
      }
      sections += `
        <blockquote>
          <div class="testimonials__content">
            ${
              item.video
                ? `<a
                    class="testimonials__video-link"
                    data-micromodal-trigger="js-${videoId}">
                  `
                : ''
            }
              <figure>
                <img src="${item.image}" alt="${item.alt}">
              </figure>
            ${item.video ? '</a>' : ''}
            ${item.content}
            <footer><cite>${item.name}</cite></footer>
          </div>
          ${item.video
              ?
              `
                <div class="modal micromodal-slide" id="js-${videoId}" aria-hidden="true">
                  <div class="modal__overlay" tabindex="-1" data-micromodal-close>
                    <div class="modal__container modal__container--auto" role="dialog" aria-modal="true" aria-labelledby="js-modal-user-popup-title">
                      <header class="modal__header">
                        <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                      </header>
                      <main id="js-modal-user-popup-content">
                        <iframe class="modal__video" src="https://www.youtube-nocookie.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      </main>
                    </div>
                  </div>
                </div>
                `
              : ''
          }
        </blockquote>
      `;
    });
    element.innerHTML = sections;
  }
}

function mountPesquisasHtml(items, id) {
  let sections = '';
  const element = document.getElementById(id);

  if (element) {
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
}

function getYoutubeVideoId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length === 11) {
    return match[7];
  }
  else {
    return null;
  }
}

export default async function initRamdomize() {
  await Axios.get('/inspirese/index.json')
    .then(response => response.data.inspirese)
    .then(response => shufleAndSelect(response, 3))
    .then(response => mountInspireHtml(response, 'js-inspire'));

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
