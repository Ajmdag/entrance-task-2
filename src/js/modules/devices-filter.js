const menuItems = document.querySelectorAll('.content-devices__menu-list-item');
const menuAll = document.querySelector('.content-devices__menu-list-item-all');
const checkboxes = document.querySelectorAll('.content-devices__checkbox');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuAll.classList.remove('picked');
    item.classList.toggle('picked');
  });
});

menuAll.addEventListener('click', () => {
  menuAll.classList.add('picked');
  checkboxes.forEach(item => {
    item.checked = false;
  });
  menuItems.forEach(item => {
    item.classList.remove('picked');
  });
});