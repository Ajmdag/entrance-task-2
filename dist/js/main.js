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
      popupContent.classList.add('popup__content');
      
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
        popup.style.top = 0;
        popup.style.left = 0;
      }, 1);
      page.classList.add('blur');
      
      switch (item.getAttribute('data-popup')) {
        case 'floor':
          const popupFloorContent = document.createElement('div');
          popupFloorContent.innerHTML = '+23';
          popupFloorContent.classList.add('popup__content--floor');
          popupContent.appendChild(popupFloorContent);
        break;
        case 'temp':
          const popupTempContent = document.createElement('div');

          // Создаем рычаг слайдера
          const popupTempLever = document.createElement('div');
          popupTempLever.classList.add('popup__lever');

          const popupTempChoice = document.createElement('div');
          popupTempChoice.classList.add('popup__choice');
          const popupTempChoiceItemsData = ['Вручную', 'Холодно', 'Тепло'];
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
          const popupLightChoiceItemsData = ['Вручную', 'Дневной свет', 'Вечерний свет'];
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

            document.onmousemove = event => {
              let newOffsetTop = event.pageY - shiftY - sliderCoords.top;

              if (newOffsetTop < 0) {
                newOffsetTop = 0;
              }

              const bottomEdge = popupLightContent.offsetHeight - popupLightLever.offsetHeight;
              
              if (newOffsetTop > bottomEdge) {
                newOffsetTop = bottomEdge;
              }

              popupLightLever.style.top = newOffsetTop + 'px';
            };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3l1cnkvUHJvamVjdHMvc2hyaS0yMDE4L2VudHJhbmNlLXRhc2stMi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9mYWtlXzg1YWQyODhmLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtZmlsdGVyLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtb3Blbi1tZW51LmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtcG9wdXAuanMiLCIvaG9tZS95dXJ5L1Byb2plY3RzL3NocmktMjAxOC9lbnRyYW5jZS10YXNrLTIvc3JjL2pzL21vZHVsZXMvaGVhZGVyLW5hdi5qcyIsIi9ob21lL3l1cnkvUHJvamVjdHMvc2hyaS0yMDE4L2VudHJhbmNlLXRhc2stMi9zcmMvanMvbW9kdWxlcy9tYWluLXNjcm9sbC1wYW5lbHMuanMiLCIvaG9tZS95dXJ5L1Byb2plY3RzL3NocmktMjAxOC9lbnRyYW5jZS10YXNrLTIvc3JjL2pzL21vZHVsZXMvc2NyaXB0cy1hcnJvd3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvZGV2aWNlcy1wb3B1cCcpO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvZGV2aWNlcy1maWx0ZXInKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL2RldmljZXMtb3Blbi1tZW51Jyk7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9oZWFkZXItbmF2Jyk7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWluLXNjcm9sbC1wYW5lbHMnKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL3NjcmlwdHMtYXJyb3dzJyk7IiwiY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRlbnQtZGV2aWNlc19fbWVudS1saXN0LWl0ZW0nKTtcbmNvbnN0IG1lbnVBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1kZXZpY2VzX19tZW51LWxpc3QtaXRlbS1hbGwnKTtcbmNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGVudC1kZXZpY2VzX19jaGVja2JveCcpO1xuXG5tZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtZW51QWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3BpY2tlZCcpO1xuICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgncGlja2VkJyk7XG4gIH0pO1xufSk7XG5cbm1lbnVBbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1lbnVBbGwuY2xhc3NMaXN0LmFkZCgncGlja2VkJyk7XG4gIGNoZWNrYm94ZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgfSk7XG4gIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgncGlja2VkJyk7XG4gIH0pO1xufSk7IiwibGV0IGl0ZW1DbGlja1RvU2hvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWRldmljZXNfX21lbnUtbGlzdC1pdGVtLWFsbCcpO1xubGV0IG1lbnVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtZGV2aWNlc19fbWVudS1saXN0Jyk7XG5cbml0ZW1DbGlja1RvU2hvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbWVudUxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xufSk7XG4iLCJjb25zdCBkZXZpY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcG9wdXBdJyk7XG5jb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2VfX3dyYXBwZXInKTtcblxuZnVuY3Rpb24gZ2V0Q29vcmRzKGVsZW0pIHtcbiAgdmFyIGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIFxuICByZXR1cm4ge1xuICAgIHRvcDogYm94LnRvcCArIHBhZ2VZT2Zmc2V0LFxuICAgIGxlZnQ6IGJveC5sZWZ0ICsgcGFnZVhPZmZzZXRcbiAgfTtcbn1cblxuZGV2aWNlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgLy8g0KHQvtC30LTQsNGOINC60L7QvdGC0LXQudC90LXRgCDQv9C+0L/QsNC/0LBcbiAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xuICBcbiAgICAgIC8vINCh0L7Qt9C00LDRjiDRjdC70LXQvNC10L3RgtGLINC/0L7Qv9Cw0L/QsFxuICAgICAgY29uc3QgcG9wdXBDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwb3B1cENvbnRlbnQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2NvbnRlbnQnKTtcbiAgICAgIFxuICAgICAgY29uc3QgcG9wdXBIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHBvcHVwSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19oZWFkZXInKTtcbiAgICAgIFxuICAgICAgY29uc3QgcG9wdXBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgcG9wdXBOYW1lLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19uYW1lJyk7XG4gICAgICBcbiAgICAgIGNvbnN0IHBvcHVwU3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgcG9wdXBTdGF0dXMuY2xhc3NMaXN0LmFkZCgncG9wdXBfX3N0YXR1cycpO1xuICAgICAgXG4gICAgICBjb25zdCBwb3B1cEFjY2VwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHBvcHVwQWNjZXB0LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hY2NlcHQnKTtcbiAgICAgIFxuICAgICAgY29uc3QgcG9wdXBDbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHBvcHVwQ2xvc2UuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2Nsb3NlJyk7XG4gICAgICBcbiAgICAgIC8vINCf0LXRgNCy0LjRh9C90LDRjyDQutC+0L3RgdGC0YDRg9C60YbQuNGPINC/0L7Qv9Cw0L/QsFxuICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBDb250ZW50KTtcbiAgICAgIHBvcHVwQ29udGVudC5hcHBlbmRDaGlsZChwb3B1cEhlYWRlcik7XG4gICAgICBwb3B1cEhlYWRlci5hcHBlbmRDaGlsZChwb3B1cE5hbWUpO1xuICAgICAgcG9wdXBIZWFkZXIuYXBwZW5kQ2hpbGQocG9wdXBTdGF0dXMpO1xuICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBBY2NlcHQpO1xuICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBDbG9zZSk7XG4gICAgICBcbiAgICAgIC8vINCf0LXRgNCy0LjRh9C90L7QtSDQvdCw0L/QvtC70L3QtdC90LjQtSDRgtC10LrRgdGC0L7QvFxuICAgICAgcG9wdXBOYW1lLmlubmVySFRNTCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnBhbmVsX19uYW1lJykuaW5uZXJIVE1MO1xuICAgICAgcG9wdXBTdGF0dXMuaW5uZXJIVE1MID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcucGFuZWxfX3RpbWUnKS5pbm5lckhUTUw7XG4gICAgICBcbiAgICAgIHBvcHVwQWNjZXB0LmlubmVySFRNTCA9ICfQn9GA0LjQvNC10L3QuNGC0YwnO1xuICAgICAgcG9wdXBDbG9zZS5pbm5lckhUTUwgPSAn0JfQsNC60YDRi9GC0YwnO1xuXG4gICAgICAvLyDQmtC+0L7RgNC00LjQvdCw0YLRi1xuICAgICAgY29uc3QgY29vcmRzID0gZ2V0Q29vcmRzKGl0ZW0pO1xuICBcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXApO1xuICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgcG9wdXAuc3R5bGUudG9wID0gY29vcmRzLnRvcCAtIDIwICsgJ3B4JztcbiAgICAgIHBvcHVwLnN0eWxlLmxlZnQgPSBjb29yZHMubGVmdCAtIDIwICsgJ3B4JztcbiAgXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBwb3B1cC5zdHlsZS50b3AgPSAwO1xuICAgICAgICBwb3B1cC5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgIH0sIDEpO1xuICAgICAgcGFnZS5jbGFzc0xpc3QuYWRkKCdibHVyJyk7XG4gICAgICBcbiAgICAgIHN3aXRjaCAoaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wdXAnKSkge1xuICAgICAgICBjYXNlICdmbG9vcic6XG4gICAgICAgICAgY29uc3QgcG9wdXBGbG9vckNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBwb3B1cEZsb29yQ29udGVudC5pbm5lckhUTUwgPSAnKzIzJztcbiAgICAgICAgICBwb3B1cEZsb29yQ29udGVudC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY29udGVudC0tZmxvb3InKTtcbiAgICAgICAgICBwb3B1cENvbnRlbnQuYXBwZW5kQ2hpbGQocG9wdXBGbG9vckNvbnRlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndGVtcCc6XG4gICAgICAgICAgY29uc3QgcG9wdXBUZW1wQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgLy8g0KHQvtC30LTQsNC10Lwg0YDRi9GH0LDQsyDRgdC70LDQudC00LXRgNCwXG4gICAgICAgICAgY29uc3QgcG9wdXBUZW1wTGV2ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBwb3B1cFRlbXBMZXZlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGV2ZXInKTtcblxuICAgICAgICAgIGNvbnN0IHBvcHVwVGVtcENob2ljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHBvcHVwVGVtcENob2ljZS5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2hvaWNlJyk7XG4gICAgICAgICAgY29uc3QgcG9wdXBUZW1wQ2hvaWNlSXRlbXNEYXRhID0gWyfQktGA0YPRh9C90YPRjicsICfQpdC+0LvQvtC00L3QvicsICfQotC10L/Qu9C+J107XG4gICAgICAgICAgbGV0IHBvcHVwVGVtcENob2ljZUl0ZW1zID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3B1cFRlbXBDaG9pY2VJdGVtc0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwQ2hvaWNlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHBvcHVwQ2hvaWNlSXRlbS5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2hvaWNlLWl0ZW0nKTtcbiAgICAgICAgICAgIHBvcHVwQ2hvaWNlSXRlbS5pbm5lckhUTUwgPSBwb3B1cFRlbXBDaG9pY2VJdGVtc0RhdGFbaV07XG4gICAgICAgICAgICBwb3B1cFRlbXBDaG9pY2UuYXBwZW5kQ2hpbGQocG9wdXBDaG9pY2VJdGVtKTtcbiAgICAgICAgICAgIHBvcHVwVGVtcENob2ljZUl0ZW1zLnB1c2gocG9wdXBDaG9pY2VJdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9wdXBUZW1wQ2hvaWNlSXRlbXMuZm9yRWFjaCgoaXRlbSwgaWQpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHBvcHVwVGVtcENob2ljZUl0ZW1zLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcG9wdXBUZW1wQ2hvaWNlSXRlbXNbaWRdLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcG9wdXBUZW1wQ29udGVudC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY29udGVudC0tdGVtcCcpO1xuICAgICAgICAgIHBvcHVwVGVtcENvbnRlbnQuYXBwZW5kQ2hpbGQocG9wdXBUZW1wTGV2ZXIpO1xuICAgICAgICAgIHBvcHVwQ29udGVudC5hcHBlbmRDaGlsZChwb3B1cFRlbXBDb250ZW50KTtcbiAgICAgICAgICBwb3B1cENvbnRlbnQuaW5zZXJ0QmVmb3JlKHBvcHVwVGVtcENob2ljZSwgcG9wdXBUZW1wQ29udGVudCk7XG5cbiAgICAgICAgICBwb3B1cFRlbXBMZXZlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXJDb29yZHMgPSBnZXRDb29yZHMocG9wdXBUZW1wQ29udGVudCk7XG4gICAgICAgICAgICBjb25zdCBsZXZlckNvb3JkcyA9IGdldENvb3Jkcyhwb3B1cFRlbXBMZXZlcik7XG4gICAgICAgICAgICBjb25zdCBzaGlmdFkgPSBldmVudC5wYWdlWSAtIGxldmVyQ29vcmRzLnRvcDtcblxuICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgIGxldCBuZXdPZmZzZXRUb3AgPSBldmVudC5wYWdlWSAtIHNoaWZ0WSAtIHNsaWRlckNvb3Jkcy50b3A7XG5cbiAgICAgICAgICAgICAgaWYgKG5ld09mZnNldFRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXdPZmZzZXRUb3AgPSAwO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgYm90dG9tRWRnZSA9IHBvcHVwVGVtcENvbnRlbnQub2Zmc2V0SGVpZ2h0IC0gcG9wdXBUZW1wTGV2ZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKG5ld09mZnNldFRvcCA+IGJvdHRvbUVkZ2UpIHtcbiAgICAgICAgICAgICAgICBuZXdPZmZzZXRUb3AgPSBib3R0b21FZGdlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcG9wdXBUZW1wTGV2ZXIuc3R5bGUudG9wID0gbmV3T2Zmc2V0VG9wICsgJ3B4JztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcG9wdXBUZW1wTGV2ZXIub25kcmFnc3RhcnQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2xpZ2h0JzpcbiAgICAgICAgICBjb25zdCBwb3B1cExpZ2h0Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHBvcHVwTGlnaHRDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jb250ZW50LS1saWdodCcpO1xuICAgICAgICAgIGNvbnN0IHBvcHVwTGlnaHRMZXZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHBvcHVwTGlnaHRMZXZlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGV2ZXInKTtcblxuICAgICAgICAgIGNvbnN0IHBvcHVwTGlnaHRDaG9pY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBwb3B1cExpZ2h0Q2hvaWNlLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jaG9pY2UnKTtcbiAgICAgICAgICBjb25zdCBwb3B1cExpZ2h0Q2hvaWNlSXRlbXNEYXRhID0gWyfQktGA0YPRh9C90YPRjicsICfQlNC90LXQstC90L7QuSDRgdCy0LXRgicsICfQktC10YfQtdGA0L3QuNC5INGB0LLQtdGCJ107XG4gICAgICAgICAgbGV0IHBvcHVwTGlnaHRDaG9pY2VJdGVtcyA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9wdXBMaWdodENob2ljZUl0ZW1zRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcG9wdXBDaG9pY2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgcG9wdXBDaG9pY2VJdGVtLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jaG9pY2UtaXRlbScpO1xuICAgICAgICAgICAgcG9wdXBDaG9pY2VJdGVtLmlubmVySFRNTCA9IHBvcHVwTGlnaHRDaG9pY2VJdGVtc0RhdGFbaV07XG4gICAgICAgICAgICBwb3B1cExpZ2h0Q2hvaWNlLmFwcGVuZENoaWxkKHBvcHVwQ2hvaWNlSXRlbSk7XG4gICAgICAgICAgICBwb3B1cExpZ2h0Q2hvaWNlSXRlbXMucHVzaChwb3B1cENob2ljZUl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3B1cExpZ2h0Q2hvaWNlSXRlbXMuZm9yRWFjaCgoaXRlbSwgaWQpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHBvcHVwTGlnaHRDaG9pY2VJdGVtcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHBvcHVwTGlnaHRDaG9pY2VJdGVtc1tpZF0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwb3B1cExpZ2h0Q29udGVudC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY29udGVudC0tbGlnaHQnKTtcbiAgICAgICAgICBwb3B1cExpZ2h0Q29udGVudC5hcHBlbmRDaGlsZChwb3B1cExpZ2h0TGV2ZXIpO1xuICAgICAgICAgIHBvcHVwQ29udGVudC5hcHBlbmRDaGlsZChwb3B1cExpZ2h0Q29udGVudCk7XG4gICAgICAgICAgcG9wdXBDb250ZW50Lmluc2VydEJlZm9yZShwb3B1cExpZ2h0Q2hvaWNlLCBwb3B1cExpZ2h0Q29udGVudCk7XG5cbiAgICAgICAgICBwb3B1cExpZ2h0TGV2ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyQ29vcmRzID0gZ2V0Q29vcmRzKHBvcHVwTGlnaHRDb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVyQ29vcmRzID0gZ2V0Q29vcmRzKHBvcHVwTGlnaHRMZXZlcik7XG4gICAgICAgICAgICBjb25zdCBzaGlmdFkgPSBldmVudC5wYWdlWSAtIGxldmVyQ29vcmRzLnRvcDtcblxuICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgIGxldCBuZXdPZmZzZXRUb3AgPSBldmVudC5wYWdlWSAtIHNoaWZ0WSAtIHNsaWRlckNvb3Jkcy50b3A7XG5cbiAgICAgICAgICAgICAgaWYgKG5ld09mZnNldFRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXdPZmZzZXRUb3AgPSAwO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgYm90dG9tRWRnZSA9IHBvcHVwTGlnaHRDb250ZW50Lm9mZnNldEhlaWdodCAtIHBvcHVwTGlnaHRMZXZlci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBpZiAobmV3T2Zmc2V0VG9wID4gYm90dG9tRWRnZSkge1xuICAgICAgICAgICAgICAgIG5ld09mZnNldFRvcCA9IGJvdHRvbUVkZ2U7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwb3B1cExpZ2h0TGV2ZXIuc3R5bGUudG9wID0gbmV3T2Zmc2V0VG9wICsgJ3B4JztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcG9wdXBMaWdodExldmVyLm9uZHJhZ3N0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICB9O1xuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2xvc2UnKTtcbiAgY29uc3QgYWNjZXB0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19hY2NlcHQnKTtcbiAgYWNjZXB0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgcG9wdXAuc3R5bGUudG9wID0gY29vcmRzLnRvcCAtIDIwICsgJ3B4JztcbiAgICAgIHBvcHVwLnN0eWxlLmxlZnQgPSBjb29yZHMubGVmdCAtIDIwICsgJ3B4JztcbiAgICAgIHBhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnYmx1cicpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocG9wdXApO1xuICAgICAgfSwgNDAwKTtcbiAgICAgIH0sIDEpO1xuICAgIH0pO1xuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgIHBvcHVwLnN0eWxlLnRvcCA9IGNvb3Jkcy50b3AgLSAyMCArICdweCc7XG4gICAgICBwb3B1cC5zdHlsZS5sZWZ0ID0gY29vcmRzLmxlZnQgLSAyMCArICdweCc7XG4gICAgICBwYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2JsdXInKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvcHVwKTtcbiAgICAgIH0sIDQwMCk7XG4gICAgICB9LCAxKTtcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuICAgIH0sIDUwMClcblxuICB9KVxufSk7XG5cbiIsImNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hdicpO1xuY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnVyZ2VyJyk7XG5cbmJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbmF2LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcbiAgYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb3NlJyk7XG59KTtcbiIsImNvbnN0IHNob3dNb3JlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtbWFpbl9fc2Nyb2xsLWJ1dHRvbicpO1xuY29uc3QgcGFuZWxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtbWFpbiAucGFuZWxfX2xpc3QnKTtcblxuc2hvd01vcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHBhbmVsTGlzdC5zY3JvbGxCeSh7XG4gICAgdG9wOiAyNzAsXG4gICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gIH0pO1xufSk7XG4iLCJjb25zdCBsZWZ0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1zY3JpcHRzX19hcnJvdy0tbGVmdCcpO1xuY29uc3QgcmlnaHRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXNjcmlwdHNfX2Fycm93LS1yaWdodCcpO1xuXG5jb25zdCBwYW5lbExpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRlbnQtc2NyaXB0c19fcGFuZWwtbGlzdCcpO1xuY29uc3QgcGFuZWxzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtc2NyaXB0c19fcGFuZWxzLWNvbnRhaW5lcicpO1xuXG5pZiAocGFuZWxMaXN0cy5sZW5ndGggPiAxKSB7IC8vINCV0YHQu9C4INCx0L7Qu9GM0YjQtSDQvtC00L3QvtCz0L4g0YHQu9Cw0LnQtNCwXG4gIC8vINCf0L7QutCw0LfRi9Cy0LDQtdC8INGB0YLRgNC10LvQutC4XG4gIGxlZnRBcnJvdy5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gIHJpZ2h0QXJyb3cuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gIC8vINCU0L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBIGFjdGl2ZSDQuiDQv9C10YDQstC+0LzRgyDRgdC70LDQudC00YNcbiAgcGFuZWxMaXN0c1swXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICBsZXQgcG9zaXRpb24gPSAwO1xuICBsZXQgYWN0aXZlTGlzdDtcbiAgbGV0IHBhbmVsTGlzdFdpZHRoO1xuXG4gIGxlZnRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwYW5lbExpc3RXaWR0aCA9IHBhbmVsTGlzdHNbMF0ub2Zmc2V0V2lkdGg7XG4gICAgYWN0aXZlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXNjcmlwdHNfX3BhbmVsLWxpc3QuYWN0aXZlJyk7XG4gICAgaWYgKGFjdGl2ZUxpc3QucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgICAgcG9zaXRpb24gKz0gcGFuZWxMaXN0V2lkdGg7XG4gICAgICBwYW5lbHNDb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIHBvc2l0aW9uICsgJ3B4KSc7XG4gICAgICBhY3RpdmVMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgYWN0aXZlTGlzdC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfSk7XG4gIFxuICByaWdodEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHBhbmVsTGlzdFdpZHRoID0gcGFuZWxMaXN0c1swXS5vZmZzZXRXaWR0aDtcbiAgICBhY3RpdmVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtc2NyaXB0c19fcGFuZWwtbGlzdC5hY3RpdmUnKTtcbiAgICBpZiAoYWN0aXZlTGlzdC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIHBvc2l0aW9uICs9IC1wYW5lbExpc3RXaWR0aDtcbiAgICAgIHBhbmVsc0NvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgcG9zaXRpb24gKyAncHgpJztcbiAgICAgIGFjdGl2ZUxpc3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICBhY3RpdmVMaXN0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG4iXX0=
