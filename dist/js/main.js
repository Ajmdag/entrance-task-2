(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./modules/devices-filter');

require('./modules/devices-open-menu');

require('./modules/header-nav');

require('./modules/main-scroll-panels');

require('./modules/scripts-arrows');
},{"./modules/devices-filter":2,"./modules/devices-open-menu":3,"./modules/header-nav":4,"./modules/main-scroll-panels":5,"./modules/scripts-arrows":6}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
let itemClickToShow = document.querySelector('.content-devices__menu-list-item-all');
let menuList = document.querySelector('.content-devices__menu-list');

itemClickToShow.addEventListener('click', () => {
  menuList.classList.toggle('open');
});

},{}],4:[function(require,module,exports){
const nav = document.querySelector('.header__nav');
const burger = document.querySelector('.header__burger');

burger.addEventListener('click', () => {
  nav.classList.toggle('show');
  burger.classList.toggle('close');
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

const panelLists = document.querySelectorAll('.content-scripts .panel__list');
const panelItems = document.querySelectorAll('.content-scripts .panel__list .panel__item');

if (panelLists.length > 1) {
  leftArrow.classList.add('show');
  rightArrow.classList.add('show');

  rightArrow.addEventListener('click', () => {
    panelLists[0].classList.add('active');
  });


};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3l1cnkvUHJvamVjdHMvc2hyaS0yMDE4L2VudHJhbmNlLXRhc2stMi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9mYWtlX2I5YmNkODgzLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtZmlsdGVyLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtb3Blbi1tZW51LmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2hlYWRlci1uYXYuanMiLCIvaG9tZS95dXJ5L1Byb2plY3RzL3NocmktMjAxOC9lbnRyYW5jZS10YXNrLTIvc3JjL2pzL21vZHVsZXMvbWFpbi1zY3JvbGwtcGFuZWxzLmpzIiwiL2hvbWUveXVyeS9Qcm9qZWN0cy9zaHJpLTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL3NjcmlwdHMtYXJyb3dzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9kZXZpY2VzLWZpbHRlcicpO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvZGV2aWNlcy1vcGVuLW1lbnUnKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL2hlYWRlci1uYXYnKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4tc2Nyb2xsLXBhbmVscycpO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvc2NyaXB0cy1hcnJvd3MnKTsiLCJjb25zdCBkZXZpY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRlbnQtZGV2aWNlcyAucGFuZWxfX2l0ZW0nKTtcbmNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250ZW50LWRldmljZXNfX21lbnUtbGlzdC1pdGVtJyk7XG5cbm1lbnVJdGVtcy5mb3JFYWNoKChpdGVtLCBpZCkgPT4ge1xuICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgncGlja2VkJyk7XG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1maWx0ZXInKTtcblxuICAgIGRldmljZXMuZm9yRWFjaChkZXZpY2UgPT4ge1xuICAgICAgaWYgKGRldmljZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsdGVyJykuc3BsaXQoJyAnKS5ldmVyeShpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGZpbHRlclZhbHVlO1xuICAgICAgfSkpIHtcbiAgICAgICAgZGV2aWNlLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktbm9uZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGV2aWNlLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktbm9uZScpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH0pO1xufSk7XG4iLCJsZXQgaXRlbUNsaWNrVG9TaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtZGV2aWNlc19fbWVudS1saXN0LWl0ZW0tYWxsJyk7XG5sZXQgbWVudUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1kZXZpY2VzX19tZW51LWxpc3QnKTtcblxuaXRlbUNsaWNrVG9TaG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBtZW51TGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XG59KTtcbiIsImNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hdicpO1xuY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnVyZ2VyJyk7XG5cbmJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbmF2LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcbiAgYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb3NlJyk7XG59KTtcbiIsImNvbnN0IHNob3dNb3JlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtbWFpbl9fc2Nyb2xsLWJ1dHRvbicpO1xuY29uc3QgcGFuZWxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtbWFpbiAucGFuZWxfX2xpc3QnKTtcblxuc2hvd01vcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHBhbmVsTGlzdC5zY3JvbGxCeSh7XG4gICAgdG9wOiAyNzAsXG4gICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gIH0pO1xufSk7XG4iLCJjb25zdCBsZWZ0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1zY3JpcHRzX19hcnJvdy0tbGVmdCcpO1xuY29uc3QgcmlnaHRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXNjcmlwdHNfX2Fycm93LS1yaWdodCcpO1xuXG5jb25zdCBwYW5lbExpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRlbnQtc2NyaXB0cyAucGFuZWxfX2xpc3QnKTtcbmNvbnN0IHBhbmVsSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGVudC1zY3JpcHRzIC5wYW5lbF9fbGlzdCAucGFuZWxfX2l0ZW0nKTtcblxuaWYgKHBhbmVsTGlzdHMubGVuZ3RoID4gMSkge1xuICBsZWZ0QXJyb3cuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICByaWdodEFycm93LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICByaWdodEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHBhbmVsTGlzdHNbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIH0pO1xuXG5cbn07XG4iXX0=
