import initMenuToggle from './menuToggle';
import initContactForm from './contactForm';
import initModal from './modal';
import goBack from './goBack';
import initTabs from './tabs';
import initSlider from './slider';
import initRandomize from './randomize';

initMenuToggle();
initModal();
initContactForm();
goBack();
initTabs();
async function handleSliderTimer() {
  await initRandomize();
  await initSlider();
}
handleSliderTimer();
