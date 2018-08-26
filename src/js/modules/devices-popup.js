const devices = document.querySelectorAll('[data-popup]');
const page = document.querySelector('.page__wrapper');

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

devices.forEach(item => {
  item.addEventListener('click', () => {
      // Создаю контейнер попапа
      const popup = document.createElement('div');
      popup.classList.add('popup');
  
      // Создаю элементы попапа
      const popupContent = document.createElement('div');
      popupContent.classList.add('popup__content-container');
      
      const popupHeader = document.createElement('div');
      popupHeader.classList.add('popup__header');
      
      const popupName = document.createElement('p');
      popupName.classList.add('popup__name');
      
      const popupStatus = document.createElement('p');
      popupStatus.classList.add('popup__status');
      
      const popupAccept = document.createElement('a');
      popupAccept.classList.add('popup__accept');
      
      const popupClose = document.createElement('a');
      popupClose.classList.add('popup__close');
      
      // Первичная конструкция попапа
      popup.appendChild(popupContent);
      popupContent.appendChild(popupHeader);
      popupHeader.appendChild(popupName);
      popupHeader.appendChild(popupStatus);
      popup.appendChild(popupAccept);
      popup.appendChild(popupClose);
      
      // Первичное наполнение текстом
      popupName.innerHTML = item.querySelector('.panel__name').innerHTML;
      popupStatus.innerHTML = item.querySelector('.panel__time').innerHTML;
      
      popupAccept.innerHTML = 'Применить';
      popupClose.innerHTML = 'Закрыть';

      // Координаты
      const coords = getCoords(item);
  
      document.body.appendChild(popup);
      popup.classList.remove('hide');
      popup.style.top = coords.top - 20 + 'px';
      popup.style.left = coords.left - 20 + 'px';
  
      setTimeout(() => {
        popup.classList.add('show');
        if (document.body.offsetWidth < 1366) {
          popup.style.top = 0;
          popup.style.left = 0;
        }
      }, 1);
      page.classList.add('blur');
      
      switch (item.getAttribute('data-popup')) {
        case 'floor':
          const popupFloorContent = document.createElement('div');
          popupFloorContent.innerHTML = '+23';
          popupFloorContent.classList.add('popup__content--floor');
          popupContent.classList.add('floor');
          popupContent.appendChild(popupFloorContent);
        break;
        case 'temp':
          const popupTempContent = document.createElement('div');

          // Создаем рычаг слайдера
          const popupTempLever = document.createElement('div');
          popupTempLever.classList.add('popup__lever');

          const popupTempChoice = document.createElement('div');
          popupTempChoice.classList.add('popup__choice');
          const popupTempChoiceItemsData = ['Вручную', 'Холодно', 'Тепло', 'Жарко'];
          let popupTempChoiceItems = [];
          for (let i = 0; i < popupTempChoiceItemsData.length; i++) {
            const popupChoiceItem = document.createElement('span');
            popupChoiceItem.classList.add('popup__choice-item');
            popupChoiceItem.innerHTML = popupTempChoiceItemsData[i];
            popupTempChoice.appendChild(popupChoiceItem);
            popupTempChoiceItems.push(popupChoiceItem);
          }
          popupTempChoiceItems.forEach((item, id) => {
            item.addEventListener('click', () => {
              popupTempChoiceItems.forEach(el => {
                el.classList.remove('active');
              });
              popupTempChoiceItems[id].classList.toggle('active');
            });
          });
          popupTempContent.classList.add('popup__content--temp');
          popupTempContent.appendChild(popupTempLever);
          popupContent.appendChild(popupTempContent);
          popupContent.insertBefore(popupTempChoice, popupTempContent);

          popupTempLever.addEventListener('mousedown', event => {
            const sliderCoords = getCoords(popupTempContent);
            const leverCoords = getCoords(popupTempLever);
            const shiftY = event.pageY - leverCoords.top;
            const shiftX = event.pageX - leverCoords.left;

            if (document.body.offsetWidth > 1366) {
              document.onmousemove = event => {
                let newOffsetLeft = event.pageX - shiftX - sliderCoords.left;

                if (newOffsetLeft < 0) {
                  newOffsetLeft = 0;
                }

                const leftEdge = popupTempContent.offsetWidth - popupTempLever.offsetWidth;

                if (newOffsetLeft > leftEdge) {
                  newOffsetLeft = leftEdge;
                }

                popupTempLever.style.left = newOffsetLeft + 'px';
              };
            } else {
              document.onmousemove = event => {
                let newOffsetTop = event.pageY - shiftY - sliderCoords.top;
  
                if (newOffsetTop < 0) {
                  newOffsetTop = 0;
                }
  
                const bottomEdge = popupTempContent.offsetHeight - popupTempLever.offsetHeight;
                
                if (newOffsetTop > bottomEdge) {
                  newOffsetTop = bottomEdge;
                }
  
                popupTempLever.style.top = newOffsetTop + 'px';
              };
            }


            document.onmouseup = () => {
              document.onmousemove = document.onmouseup = null;
            };

            return false;
          });

          popupTempLever.ondragstart = () => {
            return false;
          };
        break;
        case 'light':
          const popupLightContent = document.createElement('div');
          popupLightContent.classList.add('popup__content--light');
          const popupLightLever = document.createElement('div');
          popupLightLever.classList.add('popup__lever');

          const popupLightChoice = document.createElement('div');
          popupLightChoice.classList.add('popup__choice');
          const popupLightChoiceItemsData = ['Вручную', 'Дневной&nbsp;свет', 'Вечерний&nbsp;свет', 'Рассвет'];
          let popupLightChoiceItems = [];
          for (let i = 0; i < popupLightChoiceItemsData.length; i++) {
            const popupChoiceItem = document.createElement('span');
            popupChoiceItem.classList.add('popup__choice-item');
            popupChoiceItem.innerHTML = popupLightChoiceItemsData[i];
            popupLightChoice.appendChild(popupChoiceItem);
            popupLightChoiceItems.push(popupChoiceItem);
          }
          popupLightChoiceItems.forEach((item, id) => {
            item.addEventListener('click', () => {
              popupLightChoiceItems.forEach(el => {
                el.classList.remove('active');
              });
              popupLightChoiceItems[id].classList.toggle('active');
            });
          });
          popupLightContent.classList.add('popup__content--light');
          popupLightContent.appendChild(popupLightLever);
          popupContent.appendChild(popupLightContent);
          popupContent.insertBefore(popupLightChoice, popupLightContent);

          popupLightLever.addEventListener('mousedown', event => {
            const sliderCoords = getCoords(popupLightContent);
            const leverCoords = getCoords(popupLightLever);
            const shiftY = event.pageY - leverCoords.top;
            const shiftX = event.pageX - leverCoords.left;

            if (document.body.offsetWidth > 1366) {
              document.onmousemove = event => {
                let newOffsetLeft = event.pageX - shiftX - sliderCoords.left;

                if (newOffsetLeft < 0) {
                  newOffsetLeft = 0;
                }

                const leftEdge = popupLightContent.offsetWidth - popupLightLever.offsetWidth;

                if (newOffsetLeft > leftEdge) {
                  newOffsetLeft = leftEdge;
                }

                popupLightLever.style.left = newOffsetLeft + 'px';
              };
            } else {
              document.onmousemove = event => {
                let newOffsetTop = event.pageY - shiftY - sliderCoords.top;
                console.log('err');

                if (newOffsetTop < 0) {
                  newOffsetTop = 0;
                }

                const bottomEdge = popupLightContent.offsetHeight - popupLightLever.offsetHeight;

                if (newOffsetTop > bottomEdge) {
                  newOffsetTop = bottomEdge;
                }

                popupLightLever.style.top = newOffsetTop + 'px';
              };
            }


            document.onmouseup = () => {
              document.onmousemove = document.onmouseup = null;
            };

            return false;
          });

          popupLightLever.ondragstart = () => {
            return false;
          };
        break;

      };
  const closeButton = document.querySelector('.popup__close');
  const acceptButton = document.querySelector('.popup__accept');
  acceptButton.addEventListener('click', () => {
    setTimeout(() => {
      popup.classList.remove('show');
      popup.style.top = coords.top - 20 + 'px';
      popup.style.left = coords.left - 20 + 'px';
      page.classList.remove('blur');
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 400);
      }, 1);
    });
  closeButton.addEventListener('click', () => {
    setTimeout(() => {
      popup.classList.remove('show');
      popup.style.top = coords.top - 20 + 'px';
      popup.style.left = coords.left - 20 + 'px';
      page.classList.remove('blur');
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 400);
      }, 1);
    });

    setTimeout(() => {
      popup.classList.add('visible');
    }, 500)

  })
});
