const leftArrow = document.querySelector('.content-scripts__arrow--left');
const rightArrow = document.querySelector('.content-scripts__arrow--right');

const panelLists = document.querySelectorAll('.content-scripts .panel__list');
const panelItems = document.querySelectorAll('.content-scripts .panel__list .panel__item');

if (panelLists.length > 1) {
  leftArrow.classList.add('show');
  rightArrow.classList.add('show');

  rightArrow.addEventListener('click', () => {
    panelLists[0].classList.add('active');
  });


};
