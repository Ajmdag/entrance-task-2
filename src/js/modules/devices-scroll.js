const leftArrow = document.querySelector('.content-devices__arrow--left');
const rightArrow = document.querySelector('.content-devices__arrow--right');

const panelList = document.querySelector('.content-devices .panel__list');

leftArrow.addEventListener('click', () => {
  panelList.scrollBy({
    left: -1320,
    behavior: 'smooth'
  });
});

rightArrow.addEventListener('click', () => {
  panelList.scrollBy({
    left: 1320,
    behavior: 'smooth'
  });
});
