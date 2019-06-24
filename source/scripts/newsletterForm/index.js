import Bouncer from 'bouncer';
import axios from 'axios';
import qs from 'qs';
import config from '../config';

export default function initNewsletterForm() {
  // Mask phone number
  const form = document.querySelector('.js-newsletter-form');
  let loading = false;
  const message = form ? form.querySelector('#js-response-message') : '';

  function showSuccess() {
    message.hidden = false;
    message.classList.add('response-message--success');
    message.textContent = 'Mensagem enviada com sucesso!';
  }

  function showError() {
    message.hidden = false;
    message.classList.add('response-message--error');
    message.textContent = 'Houve um erro ao enviar sua mensagem! Por favor, tente novamente.';
  }

  function clearForm() {
    form.reset();
  }

  function toggleFormLoading() {
    form.setAttribute('aria-busy', !(form.getAttribute('aria-busy') === 'true'));
    loading = !loading;
  }

  function submitForm(event) {
    // const formData = new FormData(event.target);
    toggleFormLoading();

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      organization: event.target.organization.value,
      role: event.target.role.value,
    };

    axios({
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url: 'newsletter',
      data: qs.stringify(data),
      baseURL: config.api.domain,
    })
      .then(() => {
        showSuccess();
        clearForm();
        toggleFormLoading();
      })
      .catch(() => {
        showError();
        toggleFormLoading();
      });
  }

  // eslint-disable-next-line no-unused-vars
  const validate = new Bouncer('.js-newsletter-form', {
    disableSubmit: true,
    // Error messages by error type
    messages: {
      missingValue: {
        checkbox: 'Campo obrigatório.',
        radio: 'Por favor, selecione um valor.',
        select: 'Por favor, selecione um valor.',
        'select-multiple': 'Por favor, selecione ao menos um valor',
        default: 'Campo obrigatório.',
      },
      patternMismatch: {
        email: 'Por favor, preenhca com um email válido.',
        url: 'Por favor, digite uma URL válida.',
        number: 'Por favor, digite uma número válido.',
        color: 'Por favor, siga o formato: #rrggbb.',
        date: 'Por favor use o formato: YYYY-MM-DD.',
        time: 'Por favor use o formato: 24-hour time. Ex. 23:00',
        month: 'Por favor use o formato YYYY-MM.',
        default: 'Por favor use o formato requerido.',
      },
      outOfRange: {
        over: 'Por favor selecione uma valor de no máximo {max}.',
        under: 'Por favor selecione a valor de no mínimo {min}.',
      },
      wrongLength: {
        over: 'O texto deve ter no máximo {maxLength} caracteres. Você usou {length} caracteres.',
        under: 'O texto deve ter no mínimo {minLength} caracteres. Você já usou {length} caracteres.',
      },
    },
  });

  if (form) {
    form.addEventListener('bouncerFormInvalid', (event) => {
      window.scrollTo(0, event.detail.errors[0].offsetTop - 30);
    }, false);

    form.addEventListener('bouncerFormValid', (event) => {
      submitForm(event);
    }, false);
  }
}
