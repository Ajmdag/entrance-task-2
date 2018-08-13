const devices = document.querySelectorAll('.content-devices .panel__item');
const menuItems = document.querySelectorAll('.content-devices__menu-list-item');

menuItems.forEach((item, id) => {
  item.addEventListener('click', () => {
    item.classList.toggle('picked');
    const filterValue = item.getAttribute('data-filter');

    devices.forEach(device => {
      if (device.getAttribute('data-filter').split(' ').every(item => {
        return item !== filterValue;
      })) {
        device.classList.add('display-none');
      } else {
        device.classList.remove('display-none');
      }
    });

  });
});
