(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./modules/devices-popup');

require('./modules/devices-filter');

require('./modules/devices-open-menu');

require('./modules/main-scroll-panels');

require('./modules/scripts-arrows');
},{"./modules/devices-filter":2,"./modules/devices-open-menu":3,"./modules/devices-popup":4,"./modules/main-scroll-panels":5,"./modules/scripts-arrows":6}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
const showMoreButton = document.querySelector('.content-main__scroll-button');
const panelList = document.querySelector('.content-main .panel__list');

showMoreButton.addEventListener('click', () => {
  panelList.scrollBy({
    top: 270,
    behavior: 'smooth'
  });
});

},{}],6:[function(require,module,exports){
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



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3l1cnkvUHJvamVjdHMvc2hyaS0yMDE4L2VudHJhbmNlLXRhc2stMi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9mYWtlXzg3NTZhMDY3LmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtZmlsdGVyLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtb3Blbi1tZW51LmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtcG9wdXAuanMiLCIvaG9tZS95dXJ5L1Byb2plY3RzL3NocmktMjAxOC9lbnRyYW5jZS10YXNrLTIvc3JjL2pzL21vZHVsZXMvbWFpbi1zY3JvbGwtcGFuZWxzLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL3NjcmlwdHMtYXJyb3dzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvZGV2aWNlcy1wb3B1cCcpO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvZGV2aWNlcy1maWx0ZXInKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL2RldmljZXMtb3Blbi1tZW51Jyk7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWluLXNjcm9sbC1wYW5lbHMnKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL3NjcmlwdHMtYXJyb3dzJyk7IiwiY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRlbnQtZGV2aWNlc19fbWVudS1saXN0LWl0ZW0nKTtcbmNvbnN0IG1lbnVBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1kZXZpY2VzX19tZW51LWxpc3QtaXRlbS1hbGwnKTtcbmNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGVudC1kZXZpY2VzX19jaGVja2JveCcpO1xuXG5tZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtZW51QWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3BpY2tlZCcpO1xuICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgncGlja2VkJyk7XG4gIH0pO1xufSk7XG5cbm1lbnVBbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1lbnVBbGwuY2xhc3NMaXN0LmFkZCgncGlja2VkJyk7XG4gIGNoZWNrYm94ZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgfSk7XG4gIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgncGlja2VkJyk7XG4gIH0pO1xufSk7IiwibGV0IGl0ZW1DbGlja1RvU2hvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWRldmljZXNfX21lbnUtbGlzdC1pdGVtLWFsbCcpO1xubGV0IG1lbnVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtZGV2aWNlc19fbWVudS1saXN0Jyk7XG5cbml0ZW1DbGlja1RvU2hvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbWVudUxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICBpZiAobWVudUxpc3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJylcbiAgICAmJiAhZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29udGVudC1kZXZpY2VzX19tZW51LWxpc3QtaXRlbScpXG4gICAgJiYgIWV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbnRlbnQtZGV2aWNlc19fY2hlY2tib3gnKVxuICAgICYmICFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250ZW50LWRldmljZXNfX21lbnUtbGlzdC1pdGVtLWFsbCcpXG4gICAgJiYgIWV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnY29udGVudC1kZXZpY2VzX19tZW51LWxpc3QtaXRlbS1hbGwnKSkge1xuICAgICAgbWVudUxpc3QuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICB9XG59KTtcbiIsImNvbnN0IGRldmljZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wb3B1cF0nKTtcbmNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZV9fd3JhcHBlcicpO1xuXG5mdW5jdGlvbiBnZXRDb29yZHMoZWxlbSkge1xuICB2YXIgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgXG4gIHJldHVybiB7XG4gICAgdG9wOiBib3gudG9wICsgcGFnZVlPZmZzZXQsXG4gICAgbGVmdDogYm94LmxlZnQgKyBwYWdlWE9mZnNldFxuICB9O1xufVxuXG5kZXZpY2VzLmZvckVhY2goaXRlbSA9PiB7XG4gIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAvLyDQodC+0LfQtNCw0Y4g0LrQvtC90YLQtdC50L3QtdGAINC/0L7Qv9Cw0L/QsFxuICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XG4gIFxuICAgICAgLy8g0KHQvtC30LTQsNGOINGN0LvQtdC80LXQvdGC0Ysg0L/QvtC/0LDQv9CwXG4gICAgICBjb25zdCBwb3B1cENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHBvcHVwQ29udGVudC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY29udGVudC1jb250YWluZXInKTtcbiAgICAgIFxuICAgICAgY29uc3QgcG9wdXBIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHBvcHVwSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19oZWFkZXInKTtcbiAgICAgIFxuICAgICAgY29uc3QgcG9wdXBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgcG9wdXBOYW1lLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19uYW1lJyk7XG4gICAgICBcbiAgICAgIGNvbnN0IHBvcHVwU3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgcG9wdXBTdGF0dXMuY2xhc3NMaXN0LmFkZCgncG9wdXBfX3N0YXR1cycpO1xuICAgICAgXG4gICAgICBjb25zdCBwb3B1cEFjY2VwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHBvcHVwQWNjZXB0LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hY2NlcHQnKTtcbiAgICAgIFxuICAgICAgY29uc3QgcG9wdXBDbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHBvcHVwQ2xvc2UuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2Nsb3NlJyk7XG4gICAgICBcbiAgICAgIC8vINCf0LXRgNCy0LjRh9C90LDRjyDQutC+0L3RgdGC0YDRg9C60YbQuNGPINC/0L7Qv9Cw0L/QsFxuICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBDb250ZW50KTtcbiAgICAgIHBvcHVwQ29udGVudC5hcHBlbmRDaGlsZChwb3B1cEhlYWRlcik7XG4gICAgICBwb3B1cEhlYWRlci5hcHBlbmRDaGlsZChwb3B1cE5hbWUpO1xuICAgICAgcG9wdXBIZWFkZXIuYXBwZW5kQ2hpbGQocG9wdXBTdGF0dXMpO1xuICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBBY2NlcHQpO1xuICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBDbG9zZSk7XG4gICAgICBcbiAgICAgIC8vINCf0LXRgNCy0LjRh9C90L7QtSDQvdCw0L/QvtC70L3QtdC90LjQtSDRgtC10LrRgdGC0L7QvFxuICAgICAgcG9wdXBOYW1lLmlubmVySFRNTCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnBhbmVsX19uYW1lJykuaW5uZXJIVE1MO1xuICAgICAgcG9wdXBTdGF0dXMuaW5uZXJIVE1MID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcucGFuZWxfX3RpbWUnKS5pbm5lckhUTUw7XG4gICAgICBcbiAgICAgIHBvcHVwQWNjZXB0LmlubmVySFRNTCA9ICfQn9GA0LjQvNC10L3QuNGC0YwnO1xuICAgICAgcG9wdXBDbG9zZS5pbm5lckhUTUwgPSAn0JfQsNC60YDRi9GC0YwnO1xuXG4gICAgICAvLyDQmtC+0L7RgNC00LjQvdCw0YLRi1xuICAgICAgY29uc3QgY29vcmRzID0gZ2V0Q29vcmRzKGl0ZW0pO1xuICBcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXApO1xuICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgcG9wdXAuc3R5bGUudG9wID0gY29vcmRzLnRvcCAtIDIwICsgJ3B4JztcbiAgICAgIHBvcHVwLnN0eWxlLmxlZnQgPSBjb29yZHMubGVmdCAtIDIwICsgJ3B4JztcbiAgXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBpZiAoZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCA8IDEzNjYpIHtcbiAgICAgICAgICBwb3B1cC5zdHlsZS50b3AgPSAwO1xuICAgICAgICAgIHBvcHVwLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICB9XG4gICAgICB9LCAxKTtcbiAgICAgIHBhZ2UuY2xhc3NMaXN0LmFkZCgnYmx1cicpO1xuICAgICAgXG4gICAgICBzd2l0Y2ggKGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXBvcHVwJykpIHtcbiAgICAgICAgY2FzZSAnZmxvb3InOlxuICAgICAgICAgIGNvbnN0IHBvcHVwRmxvb3JDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcG9wdXBGbG9vckNvbnRlbnQuaW5uZXJIVE1MID0gJysyMyc7XG4gICAgICAgICAgcG9wdXBGbG9vckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2NvbnRlbnQtLWZsb29yJyk7XG4gICAgICAgICAgcG9wdXBDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2Zsb29yJyk7XG4gICAgICAgICAgcG9wdXBDb250ZW50LmFwcGVuZENoaWxkKHBvcHVwRmxvb3JDb250ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RlbXAnOlxuICAgICAgICAgIGNvbnN0IHBvcHVwVGVtcENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgIC8vINCh0L7Qt9C00LDQtdC8INGA0YvRh9Cw0LMg0YHQu9Cw0LnQtNC10YDQsFxuICAgICAgICAgIGNvbnN0IHBvcHVwVGVtcExldmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcG9wdXBUZW1wTGV2ZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xldmVyJyk7XG5cbiAgICAgICAgICBjb25zdCBwb3B1cFRlbXBDaG9pY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBwb3B1cFRlbXBDaG9pY2UuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2Nob2ljZScpO1xuICAgICAgICAgIGNvbnN0IHBvcHVwVGVtcENob2ljZUl0ZW1zRGF0YSA9IFsn0JLRgNGD0YfQvdGD0Y4nLCAn0KXQvtC70L7QtNC90L4nLCAn0KLQtdC/0LvQvicsICfQltCw0YDQutC+J107XG4gICAgICAgICAgbGV0IHBvcHVwVGVtcENob2ljZUl0ZW1zID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3B1cFRlbXBDaG9pY2VJdGVtc0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwQ2hvaWNlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHBvcHVwQ2hvaWNlSXRlbS5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2hvaWNlLWl0ZW0nKTtcbiAgICAgICAgICAgIHBvcHVwQ2hvaWNlSXRlbS5pbm5lckhUTUwgPSBwb3B1cFRlbXBDaG9pY2VJdGVtc0RhdGFbaV07XG4gICAgICAgICAgICBwb3B1cFRlbXBDaG9pY2UuYXBwZW5kQ2hpbGQocG9wdXBDaG9pY2VJdGVtKTtcbiAgICAgICAgICAgIHBvcHVwVGVtcENob2ljZUl0ZW1zLnB1c2gocG9wdXBDaG9pY2VJdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9wdXBUZW1wQ2hvaWNlSXRlbXMuZm9yRWFjaCgoaXRlbSwgaWQpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHBvcHVwVGVtcENob2ljZUl0ZW1zLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcG9wdXBUZW1wQ2hvaWNlSXRlbXNbaWRdLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcG9wdXBUZW1wQ29udGVudC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY29udGVudC0tdGVtcCcpO1xuICAgICAgICAgIHBvcHVwVGVtcENvbnRlbnQuYXBwZW5kQ2hpbGQocG9wdXBUZW1wTGV2ZXIpO1xuICAgICAgICAgIHBvcHVwQ29udGVudC5hcHBlbmRDaGlsZChwb3B1cFRlbXBDb250ZW50KTtcbiAgICAgICAgICBwb3B1cENvbnRlbnQuaW5zZXJ0QmVmb3JlKHBvcHVwVGVtcENob2ljZSwgcG9wdXBUZW1wQ29udGVudCk7XG5cbiAgICAgICAgICBwb3B1cFRlbXBMZXZlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXJDb29yZHMgPSBnZXRDb29yZHMocG9wdXBUZW1wQ29udGVudCk7XG4gICAgICAgICAgICBjb25zdCBsZXZlckNvb3JkcyA9IGdldENvb3Jkcyhwb3B1cFRlbXBMZXZlcik7XG4gICAgICAgICAgICBjb25zdCBzaGlmdFkgPSBldmVudC5wYWdlWSAtIGxldmVyQ29vcmRzLnRvcDtcbiAgICAgICAgICAgIGNvbnN0IHNoaWZ0WCA9IGV2ZW50LnBhZ2VYIC0gbGV2ZXJDb29yZHMubGVmdDtcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggPiAxMzY2KSB7XG4gICAgICAgICAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuZXdPZmZzZXRMZWZ0ID0gZXZlbnQucGFnZVggLSBzaGlmdFggLSBzbGlkZXJDb29yZHMubGVmdDtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdPZmZzZXRMZWZ0IDwgMCkge1xuICAgICAgICAgICAgICAgICAgbmV3T2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdEVkZ2UgPSBwb3B1cFRlbXBDb250ZW50Lm9mZnNldFdpZHRoIC0gcG9wdXBUZW1wTGV2ZXIub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3T2Zmc2V0TGVmdCA+IGxlZnRFZGdlKSB7XG4gICAgICAgICAgICAgICAgICBuZXdPZmZzZXRMZWZ0ID0gbGVmdEVkZ2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcG9wdXBUZW1wTGV2ZXIuc3R5bGUubGVmdCA9IG5ld09mZnNldExlZnQgKyAncHgnO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld09mZnNldFRvcCA9IGV2ZW50LnBhZ2VZIC0gc2hpZnRZIC0gc2xpZGVyQ29vcmRzLnRvcDtcbiAgXG4gICAgICAgICAgICAgICAgaWYgKG5ld09mZnNldFRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICAgIG5ld09mZnNldFRvcCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICBcbiAgICAgICAgICAgICAgICBjb25zdCBib3R0b21FZGdlID0gcG9wdXBUZW1wQ29udGVudC5vZmZzZXRIZWlnaHQgLSBwb3B1cFRlbXBMZXZlci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG5ld09mZnNldFRvcCA+IGJvdHRvbUVkZ2UpIHtcbiAgICAgICAgICAgICAgICAgIG5ld09mZnNldFRvcCA9IGJvdHRvbUVkZ2U7XG4gICAgICAgICAgICAgICAgfVxuICBcbiAgICAgICAgICAgICAgICBwb3B1cFRlbXBMZXZlci5zdHlsZS50b3AgPSBuZXdPZmZzZXRUb3AgKyAncHgnO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcG9wdXBUZW1wTGV2ZXIub25kcmFnc3RhcnQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2xpZ2h0JzpcbiAgICAgICAgICBjb25zdCBwb3B1cExpZ2h0Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHBvcHVwTGlnaHRDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jb250ZW50LS1saWdodCcpO1xuICAgICAgICAgIGNvbnN0IHBvcHVwTGlnaHRMZXZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHBvcHVwTGlnaHRMZXZlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGV2ZXInKTtcblxuICAgICAgICAgIGNvbnN0IHBvcHVwTGlnaHRDaG9pY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBwb3B1cExpZ2h0Q2hvaWNlLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jaG9pY2UnKTtcbiAgICAgICAgICBjb25zdCBwb3B1cExpZ2h0Q2hvaWNlSXRlbXNEYXRhID0gWyfQktGA0YPRh9C90YPRjicsICfQlNC90LXQstC90L7QuSZuYnNwO9GB0LLQtdGCJywgJ9CS0LXRh9C10YDQvdC40LkmbmJzcDvRgdCy0LXRgicsICfQoNCw0YHRgdCy0LXRgiddO1xuICAgICAgICAgIGxldCBwb3B1cExpZ2h0Q2hvaWNlSXRlbXMgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvcHVwTGlnaHRDaG9pY2VJdGVtc0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwQ2hvaWNlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHBvcHVwQ2hvaWNlSXRlbS5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2hvaWNlLWl0ZW0nKTtcbiAgICAgICAgICAgIHBvcHVwQ2hvaWNlSXRlbS5pbm5lckhUTUwgPSBwb3B1cExpZ2h0Q2hvaWNlSXRlbXNEYXRhW2ldO1xuICAgICAgICAgICAgcG9wdXBMaWdodENob2ljZS5hcHBlbmRDaGlsZChwb3B1cENob2ljZUl0ZW0pO1xuICAgICAgICAgICAgcG9wdXBMaWdodENob2ljZUl0ZW1zLnB1c2gocG9wdXBDaG9pY2VJdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9wdXBMaWdodENob2ljZUl0ZW1zLmZvckVhY2goKGl0ZW0sIGlkKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICBwb3B1cExpZ2h0Q2hvaWNlSXRlbXMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBwb3B1cExpZ2h0Q2hvaWNlSXRlbXNbaWRdLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcG9wdXBMaWdodENvbnRlbnQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2NvbnRlbnQtLWxpZ2h0Jyk7XG4gICAgICAgICAgcG9wdXBMaWdodENvbnRlbnQuYXBwZW5kQ2hpbGQocG9wdXBMaWdodExldmVyKTtcbiAgICAgICAgICBwb3B1cENvbnRlbnQuYXBwZW5kQ2hpbGQocG9wdXBMaWdodENvbnRlbnQpO1xuICAgICAgICAgIHBvcHVwQ29udGVudC5pbnNlcnRCZWZvcmUocG9wdXBMaWdodENob2ljZSwgcG9wdXBMaWdodENvbnRlbnQpO1xuXG4gICAgICAgICAgcG9wdXBMaWdodExldmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlckNvb3JkcyA9IGdldENvb3Jkcyhwb3B1cExpZ2h0Q29udGVudCk7XG4gICAgICAgICAgICBjb25zdCBsZXZlckNvb3JkcyA9IGdldENvb3Jkcyhwb3B1cExpZ2h0TGV2ZXIpO1xuICAgICAgICAgICAgY29uc3Qgc2hpZnRZID0gZXZlbnQucGFnZVkgLSBsZXZlckNvb3Jkcy50b3A7XG4gICAgICAgICAgICBjb25zdCBzaGlmdFggPSBldmVudC5wYWdlWCAtIGxldmVyQ29vcmRzLmxlZnQ7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoID4gMTM2Nikge1xuICAgICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3T2Zmc2V0TGVmdCA9IGV2ZW50LnBhZ2VYIC0gc2hpZnRYIC0gc2xpZGVyQ29vcmRzLmxlZnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3T2Zmc2V0TGVmdCA8IDApIHtcbiAgICAgICAgICAgICAgICAgIG5ld09mZnNldExlZnQgPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRFZGdlID0gcG9wdXBMaWdodENvbnRlbnQub2Zmc2V0V2lkdGggLSBwb3B1cExpZ2h0TGV2ZXIub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3T2Zmc2V0TGVmdCA+IGxlZnRFZGdlKSB7XG4gICAgICAgICAgICAgICAgICBuZXdPZmZzZXRMZWZ0ID0gbGVmdEVkZ2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcG9wdXBMaWdodExldmVyLnN0eWxlLmxlZnQgPSBuZXdPZmZzZXRMZWZ0ICsgJ3B4JztcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuZXdPZmZzZXRUb3AgPSBldmVudC5wYWdlWSAtIHNoaWZ0WSAtIHNsaWRlckNvb3Jkcy50b3A7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VycicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld09mZnNldFRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICAgIG5ld09mZnNldFRvcCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgYm90dG9tRWRnZSA9IHBvcHVwTGlnaHRDb250ZW50Lm9mZnNldEhlaWdodCAtIHBvcHVwTGlnaHRMZXZlci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3T2Zmc2V0VG9wID4gYm90dG9tRWRnZSkge1xuICAgICAgICAgICAgICAgICAgbmV3T2Zmc2V0VG9wID0gYm90dG9tRWRnZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwb3B1cExpZ2h0TGV2ZXIuc3R5bGUudG9wID0gbmV3T2Zmc2V0VG9wICsgJ3B4JztcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNldXAgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHBvcHVwTGlnaHRMZXZlci5vbmRyYWdzdGFydCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9O1xuICAgICAgICBicmVhaztcblxuICAgICAgfTtcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Nsb3NlJyk7XG4gIGNvbnN0IGFjY2VwdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYWNjZXB0Jyk7XG4gIGFjY2VwdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgIHBvcHVwLnN0eWxlLnRvcCA9IGNvb3Jkcy50b3AgLSAyMCArICdweCc7XG4gICAgICBwb3B1cC5zdHlsZS5sZWZ0ID0gY29vcmRzLmxlZnQgLSAyMCArICdweCc7XG4gICAgICBwYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2JsdXInKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvcHVwKTtcbiAgICAgIH0sIDQwMCk7XG4gICAgICB9LCAxKTtcbiAgICB9KTtcbiAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICBwb3B1cC5zdHlsZS50b3AgPSBjb29yZHMudG9wIC0gMjAgKyAncHgnO1xuICAgICAgcG9wdXAuc3R5bGUubGVmdCA9IGNvb3Jkcy5sZWZ0IC0gMjAgKyAncHgnO1xuICAgICAgcGFnZS5jbGFzc0xpc3QucmVtb3ZlKCdibHVyJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb3B1cCk7XG4gICAgICB9LCA0MDApO1xuICAgICAgfSwgMSk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcbiAgICB9LCA1MDApXG5cbiAgfSlcbn0pO1xuIiwiY29uc3Qgc2hvd01vcmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1tYWluX19zY3JvbGwtYnV0dG9uJyk7XG5jb25zdCBwYW5lbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1tYWluIC5wYW5lbF9fbGlzdCcpO1xuXG5zaG93TW9yZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgcGFuZWxMaXN0LnNjcm9sbEJ5KHtcbiAgICB0b3A6IDI3MCxcbiAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgfSk7XG59KTtcbiIsImNvbnN0IGxlZnRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXNjcmlwdHNfX2Fycm93LS1sZWZ0Jyk7XG5jb25zdCByaWdodEFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtc2NyaXB0c19fYXJyb3ctLXJpZ2h0Jyk7XG5cbmNvbnN0IHBhbmVsTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGVudC1zY3JpcHRzX19wYW5lbC1saXN0Jyk7XG5jb25zdCBwYW5lbHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1zY3JpcHRzX19wYW5lbHMtY29udGFpbmVyJyk7XG5cbmlmIChwYW5lbExpc3RzLmxlbmd0aCA+IDEpIHsgLy8g0JXRgdC70Lgg0LHQvtC70YzRiNC1INC+0LTQvdC+0LPQviDRgdC70LDQudC00LBcbiAgLy8g0J/QvtC60LDQt9GL0LLQsNC10Lwg0YHRgtGA0LXQu9C60LhcbiAgbGVmdEFycm93LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgcmlnaHRBcnJvdy5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgLy8g0JTQvtCx0LDQstC70Y/QtdC8INC60LvQsNGB0YEgYWN0aXZlINC6INC/0LXRgNCy0L7QvNGDINGB0LvQsNC50LTRg1xuICBwYW5lbExpc3RzWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gIGxldCBwb3NpdGlvbiA9IDA7XG4gIGxldCBhY3RpdmVMaXN0O1xuICBsZXQgcGFuZWxMaXN0V2lkdGg7XG5cbiAgbGVmdEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHBhbmVsTGlzdFdpZHRoID0gcGFuZWxMaXN0c1swXS5vZmZzZXRXaWR0aDtcbiAgICBhY3RpdmVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtc2NyaXB0c19fcGFuZWwtbGlzdC5hY3RpdmUnKTtcbiAgICBpZiAoYWN0aXZlTGlzdC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICBwb3NpdGlvbiArPSBwYW5lbExpc3RXaWR0aDtcbiAgICAgIHBhbmVsc0NvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgcG9zaXRpb24gKyAncHgpJztcbiAgICAgIGFjdGl2ZUxpc3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICBhY3RpdmVMaXN0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJpZ2h0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcGFuZWxMaXN0V2lkdGggPSBwYW5lbExpc3RzWzBdLm9mZnNldFdpZHRoO1xuICAgIGFjdGl2ZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1zY3JpcHRzX19wYW5lbC1saXN0LmFjdGl2ZScpO1xuICAgIGlmIChhY3RpdmVMaXN0Lm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgcG9zaXRpb24gKz0gLXBhbmVsTGlzdFdpZHRoO1xuICAgICAgcGFuZWxzQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBwb3NpdGlvbiArICdweCknO1xuICAgICAgYWN0aXZlTGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIGFjdGl2ZUxpc3QubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cbiJdfQ==
