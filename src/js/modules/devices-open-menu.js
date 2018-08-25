let itemClickToShow = document.querySelector('.content-devices__menu-list-item-all');
let menuList = document.querySelector('.content-devices__menu-list');

itemClickToShow.addEventListener('click', () => {
  menuList.classList.toggle('open');
});

document.addEventListener('click', event => {
  if (menuList.classList.contains('open')
    && !event.target.classList.contains('content-devices__menu-list-item')
    && !event.target.classList.contains('content-devices__checkbox')
    && !event.target.classList.contains('content-devices__menu-list-item-all')
    && !event.target.parentNode.classList.contains('content-devices__menu-list-item-all')) {
      menuList.classList.remove('open');
  }
});
