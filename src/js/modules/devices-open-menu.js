let itemClickToShow = document.querySelector('.content-devices__menu-list-item.all');
let menuList = document.querySelector('.content-devices__menu-list');

itemClickToShow.addEventListener('click', () => {
  menuList.classList.toggle('open');
});
