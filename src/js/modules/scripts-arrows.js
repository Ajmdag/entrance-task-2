const leftArrow = document.querySelector('.content-scripts__arrow--left');
const rightArrow = document.querySelector('.content-scripts__arrow--right');

const panelLists = document.querySelectorAll('.content-scripts__panel-list');
const panelsContainer = document.querySelector('.content-scripts__panels-container');

if (panelLists.length > 1) { // Если больше одного слайда
  // Показываем стрелки
  leftArrow.classList.add('show');
  rightArrow.classList.add('show');

  // Добавляем класс active к первому слайду
  panelLists[0].classList.add('active');

  let position = 0;
  let activeList;
  let panelListWidth;

  leftArrow.addEventListener('click', () => {
    panelListWidth = panelLists[0].offsetWidth;
    activeList = document.querySelector('.content-scripts__panel-list.active');
    if (activeList.previousElementSibling) {
      position += panelListWidth;
      panelsContainer.style.transform = 'translateX(' + position + 'px)';
      activeList.classList.remove('active');
      activeList.previousElementSibling.classList.add('active');
    }
  });
  
  rightArrow.addEventListener('click', () => {
    panelListWidth = panelLists[0].offsetWidth;
    activeList = document.querySelector('.content-scripts__panel-list.active');
    if (activeList.nextElementSibling) {
      position += -panelListWidth;
      panelsContainer.style.transform = 'translateX(' + position + 'px)';
      activeList.classList.remove('active');
      activeList.nextElementSibling.classList.add('active');
    }
  });
};


