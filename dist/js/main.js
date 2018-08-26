(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./modules/devices-popup');

require('./modules/devices-filter');

require('./modules/devices-open-menu');

require('./modules/header-nav');

require('./modules/main-scroll-panels');

require('./modules/scripts-arrows');
},{"./modules/devices-filter":2,"./modules/devices-open-menu":3,"./modules/devices-popup":4,"./modules/header-nav":5,"./modules/main-scroll-panels":6,"./modules/scripts-arrows":7}],2:[function(require,module,exports){
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
const nav = document.querySelector('.header__nav');
const burger = document.querySelector('.header__burger');

burger.addEventListener('click', () => {
  nav.classList.toggle('show');
  burger.classList.toggle('close');
});

},{}],6:[function(require,module,exports){
const showMoreButton = document.querySelector('.content-main__scroll-button');
const panelList = document.querySelector('.content-main .panel__list');

showMoreButton.addEventListener('click', () => {
  panelList.scrollBy({
    top: 270,
    behavior: 'smooth'
  });
});

},{}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3l1cnkvUHJvamVjdHMvc2hyaS0yMDE4L2VudHJhbmNlLXRhc2stMi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9mYWtlXzZjNDIxYjc1LmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtZmlsdGVyLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtb3Blbi1tZW51LmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtcG9wdXAuanMiLCIvaG9tZS95dXJ5L1Byb2plY3RzL3NocmktMjAxOC9lbnRyYW5jZS10YXNrLTIvc3JjL2pzL21vZHVsZXMvaGVhZGVyLW5hdi5qcyIsIi9ob21lL3l1cnkvUHJvamVjdHMvc2hyaS0yMDE4L2VudHJhbmNlLXRhc2stMi9zcmMvanMvbW9kdWxlcy9tYWluLXNjcm9sbC1wYW5lbHMuanMiLCIvaG9tZS95dXJ5L1Byb2plY3RzL3NocmktMjAxOC9lbnRyYW5jZS10YXNrLTIvc3JjL2pzL21vZHVsZXMvc2NyaXB0cy1hcnJvd3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9kZXZpY2VzLXBvcHVwJyk7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9kZXZpY2VzLWZpbHRlcicpO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvZGV2aWNlcy1vcGVuLW1lbnUnKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL2hlYWRlci1uYXYnKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4tc2Nyb2xsLXBhbmVscycpO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvc2NyaXB0cy1hcnJvd3MnKTsiLCJjb25zdCBtZW51SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGVudC1kZXZpY2VzX19tZW51LWxpc3QtaXRlbScpO1xuY29uc3QgbWVudUFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWRldmljZXNfX21lbnUtbGlzdC1pdGVtLWFsbCcpO1xuY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250ZW50LWRldmljZXNfX2NoZWNrYm94Jyk7XG5cbm1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1lbnVBbGwuY2xhc3NMaXN0LnJlbW92ZSgncGlja2VkJyk7XG4gICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdwaWNrZWQnKTtcbiAgfSk7XG59KTtcblxubWVudUFsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbWVudUFsbC5jbGFzc0xpc3QuYWRkKCdwaWNrZWQnKTtcbiAgY2hlY2tib3hlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICB9KTtcbiAgbWVudUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdwaWNrZWQnKTtcbiAgfSk7XG59KTsiLCJsZXQgaXRlbUNsaWNrVG9TaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtZGV2aWNlc19fbWVudS1saXN0LWl0ZW0tYWxsJyk7XG5sZXQgbWVudUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1kZXZpY2VzX19tZW51LWxpc3QnKTtcblxuaXRlbUNsaWNrVG9TaG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBtZW51TGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gIGlmIChtZW51TGlzdC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKVxuICAgICYmICFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250ZW50LWRldmljZXNfX21lbnUtbGlzdC1pdGVtJylcbiAgICAmJiAhZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29udGVudC1kZXZpY2VzX19jaGVja2JveCcpXG4gICAgJiYgIWV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbnRlbnQtZGV2aWNlc19fbWVudS1saXN0LWl0ZW0tYWxsJylcbiAgICAmJiAhZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250ZW50LWRldmljZXNfX21lbnUtbGlzdC1pdGVtLWFsbCcpKSB7XG4gICAgICBtZW51TGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gIH1cbn0pO1xuIiwiY29uc3QgZGV2aWNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBvcHVwXScpO1xuY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlX193cmFwcGVyJyk7XG5cbmZ1bmN0aW9uIGdldENvb3JkcyhlbGVtKSB7XG4gIHZhciBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBcbiAgcmV0dXJuIHtcbiAgICB0b3A6IGJveC50b3AgKyBwYWdlWU9mZnNldCxcbiAgICBsZWZ0OiBib3gubGVmdCArIHBhZ2VYT2Zmc2V0XG4gIH07XG59XG5cbmRldmljZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIC8vINCh0L7Qt9C00LDRjiDQutC+0L3RgtC10LnQvdC10YAg0L/QvtC/0LDQv9CwXG4gICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgncG9wdXAnKTtcbiAgXG4gICAgICAvLyDQodC+0LfQtNCw0Y4g0Y3Qu9C10LzQtdC90YLRiyDQv9C+0L/QsNC/0LBcbiAgICAgIGNvbnN0IHBvcHVwQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcG9wdXBDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jb250ZW50LWNvbnRhaW5lcicpO1xuICAgICAgXG4gICAgICBjb25zdCBwb3B1cEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcG9wdXBIZWFkZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2hlYWRlcicpO1xuICAgICAgXG4gICAgICBjb25zdCBwb3B1cE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBwb3B1cE5hbWUuY2xhc3NMaXN0LmFkZCgncG9wdXBfX25hbWUnKTtcbiAgICAgIFxuICAgICAgY29uc3QgcG9wdXBTdGF0dXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBwb3B1cFN0YXR1cy5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fc3RhdHVzJyk7XG4gICAgICBcbiAgICAgIGNvbnN0IHBvcHVwQWNjZXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgcG9wdXBBY2NlcHQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FjY2VwdCcpO1xuICAgICAgXG4gICAgICBjb25zdCBwb3B1cENsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgcG9wdXBDbG9zZS5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2xvc2UnKTtcbiAgICAgIFxuICAgICAgLy8g0J/QtdGA0LLQuNGH0L3QsNGPINC60L7QvdGB0YLRgNGD0LrRhtC40Y8g0L/QvtC/0LDQv9CwXG4gICAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cENvbnRlbnQpO1xuICAgICAgcG9wdXBDb250ZW50LmFwcGVuZENoaWxkKHBvcHVwSGVhZGVyKTtcbiAgICAgIHBvcHVwSGVhZGVyLmFwcGVuZENoaWxkKHBvcHVwTmFtZSk7XG4gICAgICBwb3B1cEhlYWRlci5hcHBlbmRDaGlsZChwb3B1cFN0YXR1cyk7XG4gICAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cEFjY2VwdCk7XG4gICAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cENsb3NlKTtcbiAgICAgIFxuICAgICAgLy8g0J/QtdGA0LLQuNGH0L3QvtC1INC90LDQv9C+0LvQvdC10L3QuNC1INGC0LXQutGB0YLQvtC8XG4gICAgICBwb3B1cE5hbWUuaW5uZXJIVE1MID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcucGFuZWxfX25hbWUnKS5pbm5lckhUTUw7XG4gICAgICBwb3B1cFN0YXR1cy5pbm5lckhUTUwgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wYW5lbF9fdGltZScpLmlubmVySFRNTDtcbiAgICAgIFxuICAgICAgcG9wdXBBY2NlcHQuaW5uZXJIVE1MID0gJ9Cf0YDQuNC80LXQvdC40YLRjCc7XG4gICAgICBwb3B1cENsb3NlLmlubmVySFRNTCA9ICfQl9Cw0LrRgNGL0YLRjCc7XG5cbiAgICAgIC8vINCa0L7QvtGA0LTQuNC90LDRgtGLXG4gICAgICBjb25zdCBjb29yZHMgPSBnZXRDb29yZHMoaXRlbSk7XG4gIFxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cCk7XG4gICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBwb3B1cC5zdHlsZS50b3AgPSBjb29yZHMudG9wIC0gMjAgKyAncHgnO1xuICAgICAgcG9wdXAuc3R5bGUubGVmdCA9IGNvb3Jkcy5sZWZ0IC0gMjAgKyAncHgnO1xuICBcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIDwgMTM2Nikge1xuICAgICAgICAgIHBvcHVwLnN0eWxlLnRvcCA9IDA7XG4gICAgICAgICAgcG9wdXAuc3R5bGUubGVmdCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0sIDEpO1xuICAgICAgcGFnZS5jbGFzc0xpc3QuYWRkKCdibHVyJyk7XG4gICAgICBcbiAgICAgIHN3aXRjaCAoaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wdXAnKSkge1xuICAgICAgICBjYXNlICdmbG9vcic6XG4gICAgICAgICAgY29uc3QgcG9wdXBGbG9vckNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBwb3B1cEZsb29yQ29udGVudC5pbm5lckhUTUwgPSAnKzIzJztcbiAgICAgICAgICBwb3B1cEZsb29yQ29udGVudC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY29udGVudC0tZmxvb3InKTtcbiAgICAgICAgICBwb3B1cENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZmxvb3InKTtcbiAgICAgICAgICBwb3B1cENvbnRlbnQuYXBwZW5kQ2hpbGQocG9wdXBGbG9vckNvbnRlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndGVtcCc6XG4gICAgICAgICAgY29uc3QgcG9wdXBUZW1wQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgLy8g0KHQvtC30LTQsNC10Lwg0YDRi9GH0LDQsyDRgdC70LDQudC00LXRgNCwXG4gICAgICAgICAgY29uc3QgcG9wdXBUZW1wTGV2ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBwb3B1cFRlbXBMZXZlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGV2ZXInKTtcblxuICAgICAgICAgIGNvbnN0IHBvcHVwVGVtcENob2ljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHBvcHVwVGVtcENob2ljZS5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2hvaWNlJyk7XG4gICAgICAgICAgY29uc3QgcG9wdXBUZW1wQ2hvaWNlSXRlbXNEYXRhID0gWyfQktGA0YPRh9C90YPRjicsICfQpdC+0LvQvtC00L3QvicsICfQotC10L/Qu9C+JywgJ9CW0LDRgNC60L4nXTtcbiAgICAgICAgICBsZXQgcG9wdXBUZW1wQ2hvaWNlSXRlbXMgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvcHVwVGVtcENob2ljZUl0ZW1zRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcG9wdXBDaG9pY2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgcG9wdXBDaG9pY2VJdGVtLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jaG9pY2UtaXRlbScpO1xuICAgICAgICAgICAgcG9wdXBDaG9pY2VJdGVtLmlubmVySFRNTCA9IHBvcHVwVGVtcENob2ljZUl0ZW1zRGF0YVtpXTtcbiAgICAgICAgICAgIHBvcHVwVGVtcENob2ljZS5hcHBlbmRDaGlsZChwb3B1cENob2ljZUl0ZW0pO1xuICAgICAgICAgICAgcG9wdXBUZW1wQ2hvaWNlSXRlbXMucHVzaChwb3B1cENob2ljZUl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3B1cFRlbXBDaG9pY2VJdGVtcy5mb3JFYWNoKChpdGVtLCBpZCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgcG9wdXBUZW1wQ2hvaWNlSXRlbXMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBwb3B1cFRlbXBDaG9pY2VJdGVtc1tpZF0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwb3B1cFRlbXBDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jb250ZW50LS10ZW1wJyk7XG4gICAgICAgICAgcG9wdXBUZW1wQ29udGVudC5hcHBlbmRDaGlsZChwb3B1cFRlbXBMZXZlcik7XG4gICAgICAgICAgcG9wdXBDb250ZW50LmFwcGVuZENoaWxkKHBvcHVwVGVtcENvbnRlbnQpO1xuICAgICAgICAgIHBvcHVwQ29udGVudC5pbnNlcnRCZWZvcmUocG9wdXBUZW1wQ2hvaWNlLCBwb3B1cFRlbXBDb250ZW50KTtcblxuICAgICAgICAgIHBvcHVwVGVtcExldmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlckNvb3JkcyA9IGdldENvb3Jkcyhwb3B1cFRlbXBDb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVyQ29vcmRzID0gZ2V0Q29vcmRzKHBvcHVwVGVtcExldmVyKTtcbiAgICAgICAgICAgIGNvbnN0IHNoaWZ0WSA9IGV2ZW50LnBhZ2VZIC0gbGV2ZXJDb29yZHMudG9wO1xuICAgICAgICAgICAgY29uc3Qgc2hpZnRYID0gZXZlbnQucGFnZVggLSBsZXZlckNvb3Jkcy5sZWZ0O1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCA+IDEzNjYpIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld09mZnNldExlZnQgPSBldmVudC5wYWdlWCAtIHNoaWZ0WCAtIHNsaWRlckNvb3Jkcy5sZWZ0O1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld09mZnNldExlZnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICBuZXdPZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0RWRnZSA9IHBvcHVwVGVtcENvbnRlbnQub2Zmc2V0V2lkdGggLSBwb3B1cFRlbXBMZXZlci5vZmZzZXRXaWR0aDtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdPZmZzZXRMZWZ0ID4gbGVmdEVkZ2UpIHtcbiAgICAgICAgICAgICAgICAgIG5ld09mZnNldExlZnQgPSBsZWZ0RWRnZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwb3B1cFRlbXBMZXZlci5zdHlsZS5sZWZ0ID0gbmV3T2Zmc2V0TGVmdCArICdweCc7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3T2Zmc2V0VG9wID0gZXZlbnQucGFnZVkgLSBzaGlmdFkgLSBzbGlkZXJDb29yZHMudG9wO1xuICBcbiAgICAgICAgICAgICAgICBpZiAobmV3T2Zmc2V0VG9wIDwgMCkge1xuICAgICAgICAgICAgICAgICAgbmV3T2Zmc2V0VG9wID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gIFxuICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbUVkZ2UgPSBwb3B1cFRlbXBDb250ZW50Lm9mZnNldEhlaWdodCAtIHBvcHVwVGVtcExldmVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAobmV3T2Zmc2V0VG9wID4gYm90dG9tRWRnZSkge1xuICAgICAgICAgICAgICAgICAgbmV3T2Zmc2V0VG9wID0gYm90dG9tRWRnZTtcbiAgICAgICAgICAgICAgICB9XG4gIFxuICAgICAgICAgICAgICAgIHBvcHVwVGVtcExldmVyLnN0eWxlLnRvcCA9IG5ld09mZnNldFRvcCArICdweCc7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZXVwID0gKCkgPT4ge1xuICAgICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGRvY3VtZW50Lm9ubW91c2V1cCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwb3B1cFRlbXBMZXZlci5vbmRyYWdzdGFydCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbGlnaHQnOlxuICAgICAgICAgIGNvbnN0IHBvcHVwTGlnaHRDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcG9wdXBMaWdodENvbnRlbnQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2NvbnRlbnQtLWxpZ2h0Jyk7XG4gICAgICAgICAgY29uc3QgcG9wdXBMaWdodExldmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgcG9wdXBMaWdodExldmVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19sZXZlcicpO1xuXG4gICAgICAgICAgY29uc3QgcG9wdXBMaWdodENob2ljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHBvcHVwTGlnaHRDaG9pY2UuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2Nob2ljZScpO1xuICAgICAgICAgIGNvbnN0IHBvcHVwTGlnaHRDaG9pY2VJdGVtc0RhdGEgPSBbJ9CS0YDRg9GH0L3Rg9GOJywgJ9CU0L3QtdCy0L3QvtC5Jm5ic3A70YHQstC10YInLCAn0JLQtdGH0LXRgNC90LjQuSZuYnNwO9GB0LLQtdGCJywgJ9Cg0LDRgdGB0LLQtdGCJ107XG4gICAgICAgICAgbGV0IHBvcHVwTGlnaHRDaG9pY2VJdGVtcyA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9wdXBMaWdodENob2ljZUl0ZW1zRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcG9wdXBDaG9pY2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgcG9wdXBDaG9pY2VJdGVtLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jaG9pY2UtaXRlbScpO1xuICAgICAgICAgICAgcG9wdXBDaG9pY2VJdGVtLmlubmVySFRNTCA9IHBvcHVwTGlnaHRDaG9pY2VJdGVtc0RhdGFbaV07XG4gICAgICAgICAgICBwb3B1cExpZ2h0Q2hvaWNlLmFwcGVuZENoaWxkKHBvcHVwQ2hvaWNlSXRlbSk7XG4gICAgICAgICAgICBwb3B1cExpZ2h0Q2hvaWNlSXRlbXMucHVzaChwb3B1cENob2ljZUl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3B1cExpZ2h0Q2hvaWNlSXRlbXMuZm9yRWFjaCgoaXRlbSwgaWQpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHBvcHVwTGlnaHRDaG9pY2VJdGVtcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHBvcHVwTGlnaHRDaG9pY2VJdGVtc1tpZF0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwb3B1cExpZ2h0Q29udGVudC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY29udGVudC0tbGlnaHQnKTtcbiAgICAgICAgICBwb3B1cExpZ2h0Q29udGVudC5hcHBlbmRDaGlsZChwb3B1cExpZ2h0TGV2ZXIpO1xuICAgICAgICAgIHBvcHVwQ29udGVudC5hcHBlbmRDaGlsZChwb3B1cExpZ2h0Q29udGVudCk7XG4gICAgICAgICAgcG9wdXBDb250ZW50Lmluc2VydEJlZm9yZShwb3B1cExpZ2h0Q2hvaWNlLCBwb3B1cExpZ2h0Q29udGVudCk7XG5cbiAgICAgICAgICBwb3B1cExpZ2h0TGV2ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyQ29vcmRzID0gZ2V0Q29vcmRzKHBvcHVwTGlnaHRDb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVyQ29vcmRzID0gZ2V0Q29vcmRzKHBvcHVwTGlnaHRMZXZlcik7XG4gICAgICAgICAgICBjb25zdCBzaGlmdFkgPSBldmVudC5wYWdlWSAtIGxldmVyQ29vcmRzLnRvcDtcbiAgICAgICAgICAgIGNvbnN0IHNoaWZ0WCA9IGV2ZW50LnBhZ2VYIC0gbGV2ZXJDb29yZHMubGVmdDtcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggPiAxMzY2KSB7XG4gICAgICAgICAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuZXdPZmZzZXRMZWZ0ID0gZXZlbnQucGFnZVggLSBzaGlmdFggLSBzbGlkZXJDb29yZHMubGVmdDtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdPZmZzZXRMZWZ0IDwgMCkge1xuICAgICAgICAgICAgICAgICAgbmV3T2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdEVkZ2UgPSBwb3B1cExpZ2h0Q29udGVudC5vZmZzZXRXaWR0aCAtIHBvcHVwTGlnaHRMZXZlci5vZmZzZXRXaWR0aDtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdPZmZzZXRMZWZ0ID4gbGVmdEVkZ2UpIHtcbiAgICAgICAgICAgICAgICAgIG5ld09mZnNldExlZnQgPSBsZWZ0RWRnZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwb3B1cExpZ2h0TGV2ZXIuc3R5bGUubGVmdCA9IG5ld09mZnNldExlZnQgKyAncHgnO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld09mZnNldFRvcCA9IGV2ZW50LnBhZ2VZIC0gc2hpZnRZIC0gc2xpZGVyQ29vcmRzLnRvcDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3T2Zmc2V0VG9wIDwgMCkge1xuICAgICAgICAgICAgICAgICAgbmV3T2Zmc2V0VG9wID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBib3R0b21FZGdlID0gcG9wdXBMaWdodENvbnRlbnQub2Zmc2V0SGVpZ2h0IC0gcG9wdXBMaWdodExldmVyLm9mZnNldEhlaWdodDtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdPZmZzZXRUb3AgPiBib3R0b21FZGdlKSB7XG4gICAgICAgICAgICAgICAgICBuZXdPZmZzZXRUb3AgPSBib3R0b21FZGdlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBvcHVwTGlnaHRMZXZlci5zdHlsZS50b3AgPSBuZXdPZmZzZXRUb3AgKyAncHgnO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcG9wdXBMaWdodExldmVyLm9uZHJhZ3N0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICB9O1xuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2xvc2UnKTtcbiAgY29uc3QgYWNjZXB0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19hY2NlcHQnKTtcbiAgYWNjZXB0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgcG9wdXAuc3R5bGUudG9wID0gY29vcmRzLnRvcCAtIDIwICsgJ3B4JztcbiAgICAgIHBvcHVwLnN0eWxlLmxlZnQgPSBjb29yZHMubGVmdCAtIDIwICsgJ3B4JztcbiAgICAgIHBhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnYmx1cicpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocG9wdXApO1xuICAgICAgfSwgNDAwKTtcbiAgICAgIH0sIDEpO1xuICAgIH0pO1xuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgIHBvcHVwLnN0eWxlLnRvcCA9IGNvb3Jkcy50b3AgLSAyMCArICdweCc7XG4gICAgICBwb3B1cC5zdHlsZS5sZWZ0ID0gY29vcmRzLmxlZnQgLSAyMCArICdweCc7XG4gICAgICBwYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2JsdXInKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvcHVwKTtcbiAgICAgIH0sIDQwMCk7XG4gICAgICB9LCAxKTtcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuICAgIH0sIDUwMClcblxuICB9KVxufSk7XG4iLCJjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYXYnKTtcbmNvbnN0IGJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2J1cmdlcicpO1xuXG5idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG5hdi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XG4gIGJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKCdjbG9zZScpO1xufSk7XG4iLCJjb25zdCBzaG93TW9yZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LW1haW5fX3Njcm9sbC1idXR0b24nKTtcbmNvbnN0IHBhbmVsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LW1haW4gLnBhbmVsX19saXN0Jyk7XG5cbnNob3dNb3JlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBwYW5lbExpc3Quc2Nyb2xsQnkoe1xuICAgIHRvcDogMjcwLFxuICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICB9KTtcbn0pO1xuIiwiY29uc3QgbGVmdEFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtc2NyaXB0c19fYXJyb3ctLWxlZnQnKTtcbmNvbnN0IHJpZ2h0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1zY3JpcHRzX19hcnJvdy0tcmlnaHQnKTtcblxuY29uc3QgcGFuZWxMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250ZW50LXNjcmlwdHNfX3BhbmVsLWxpc3QnKTtcbmNvbnN0IHBhbmVsc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXNjcmlwdHNfX3BhbmVscy1jb250YWluZXInKTtcblxuaWYgKHBhbmVsTGlzdHMubGVuZ3RoID4gMSkgeyAvLyDQldGB0LvQuCDQsdC+0LvRjNGI0LUg0L7QtNC90L7Qs9C+INGB0LvQsNC50LTQsFxuICAvLyDQn9C+0LrQsNC30YvQstCw0LXQvCDRgdGC0YDQtdC70LrQuFxuICBsZWZ0QXJyb3cuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICByaWdodEFycm93LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAvLyDQlNC+0LHQsNCy0LvRj9C10Lwg0LrQu9Cw0YHRgSBhY3RpdmUg0Log0L/QtdGA0LLQvtC80YMg0YHQu9Cw0LnQtNGDXG4gIHBhbmVsTGlzdHNbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgbGV0IGFjdGl2ZUxpc3Q7XG4gIGxldCBwYW5lbExpc3RXaWR0aDtcblxuICBsZWZ0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcGFuZWxMaXN0V2lkdGggPSBwYW5lbExpc3RzWzBdLm9mZnNldFdpZHRoO1xuICAgIGFjdGl2ZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1zY3JpcHRzX19wYW5lbC1saXN0LmFjdGl2ZScpO1xuICAgIGlmIChhY3RpdmVMaXN0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIHBvc2l0aW9uICs9IHBhbmVsTGlzdFdpZHRoO1xuICAgICAgcGFuZWxzQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBwb3NpdGlvbiArICdweCknO1xuICAgICAgYWN0aXZlTGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIGFjdGl2ZUxpc3QucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmlnaHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwYW5lbExpc3RXaWR0aCA9IHBhbmVsTGlzdHNbMF0ub2Zmc2V0V2lkdGg7XG4gICAgYWN0aXZlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXNjcmlwdHNfX3BhbmVsLWxpc3QuYWN0aXZlJyk7XG4gICAgaWYgKGFjdGl2ZUxpc3QubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICBwb3NpdGlvbiArPSAtcGFuZWxMaXN0V2lkdGg7XG4gICAgICBwYW5lbHNDb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIHBvc2l0aW9uICsgJ3B4KSc7XG4gICAgICBhY3RpdmVMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgYWN0aXZlTGlzdC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuICB9KTtcbn07XG5cblxuIl19
