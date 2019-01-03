import Bouncer from 'bouncer';
import IMask from 'imask';
import axios from 'axios';
import qs from 'qs';
import config from '../config';

export default function initContactForm() {
  // Mask phone number
  const form = document.querySelector('.js-contato');
  let loading = false;
  const message = form ? form.querySelector('#js-response-message') : '';
  const phone = document.getElementById('phone');
  const maskOptions = { mask: '+00 (00) 000000000' };
  // eslint-disable-next-line
  let mask;
  if (phone) {
    mask = new IMask(phone, maskOptions);
  }

  function clearPhone(dirtyPhone) {
    return dirtyPhone.replace(/[^0-9$+]/g, '');
  }

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

  function toggleLoading() {
    form.setAttribute('aria-busy', !(form.getAttribute('aria-busy') === 'true'));
    loading = !loading;
  }

  function submitForm(event) {
    // const formData = new FormData(event.target);
    toggleLoading();

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: clearPhone(event.target.phone.value),
      message: event.target.message.value,
    };

    axios({
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url: 'contact',
      data: qs.stringify(data),
      baseURL: config.api.domain,
    })
      .then(() => {
        showSuccess();
        clearForm();
        toggleLoading();
      })
      .catch(() => {
        showError();
        toggleLoading();
      });
  }

  // eslint-disable-next-line
  const validate = new Bouncer('form', {
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

  document.addEventListener('bouncerFormInvalid', (event) => {
    window.scrollTo(0, event.detail.errors[0].offsetTop - 30);
  }, false);

  document.addEventListener('bouncerFormValid', (event) => {
    submitForm(event);
  }, false);
}
