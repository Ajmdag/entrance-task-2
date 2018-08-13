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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlQ6XFxQcm9qZWN0c1xcc2hyaTIwMThcXGVudHJhbmNlLXRhc2stMlxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiVDovUHJvamVjdHMvc2hyaTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9mYWtlXzVjYTVjNWU0LmpzIiwiVDovUHJvamVjdHMvc2hyaTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtZmlsdGVyLmpzIiwiVDovUHJvamVjdHMvc2hyaTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtb3Blbi1tZW51LmpzIiwiVDovUHJvamVjdHMvc2hyaTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2hlYWRlci1uYXYuanMiLCJUOi9Qcm9qZWN0cy9zaHJpMjAxOC9lbnRyYW5jZS10YXNrLTIvc3JjL2pzL21vZHVsZXMvbWFpbi1zY3JvbGwtcGFuZWxzLmpzIiwiVDovUHJvamVjdHMvc2hyaTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL3NjcmlwdHMtYXJyb3dzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvZGV2aWNlcy1maWx0ZXInKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL2RldmljZXMtb3Blbi1tZW51Jyk7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9oZWFkZXItbmF2Jyk7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWluLXNjcm9sbC1wYW5lbHMnKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL3NjcmlwdHMtYXJyb3dzJyk7IiwiY29uc3QgZGV2aWNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250ZW50LWRldmljZXMgLnBhbmVsX19pdGVtJyk7XHJcbmNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250ZW50LWRldmljZXNfX21lbnUtbGlzdC1pdGVtJyk7XHJcblxyXG5tZW51SXRlbXMuZm9yRWFjaCgoaXRlbSwgaWQpID0+IHtcclxuICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdwaWNrZWQnKTtcclxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsdGVyJyk7XHJcblxyXG4gICAgZGV2aWNlcy5mb3JFYWNoKGRldmljZSA9PiB7XHJcbiAgICAgIGlmIChkZXZpY2UuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbHRlcicpLnNwbGl0KCcgJykuZXZlcnkoaXRlbSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGZpbHRlclZhbHVlO1xyXG4gICAgICB9KSkge1xyXG4gICAgICAgIGRldmljZS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LW5vbmUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkZXZpY2UuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9KTtcclxufSk7XHJcbiIsImxldCBpdGVtQ2xpY2tUb1Nob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1kZXZpY2VzX19tZW51LWxpc3QtaXRlbS1hbGwnKTtcclxubGV0IG1lbnVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtZGV2aWNlc19fbWVudS1saXN0Jyk7XHJcblxyXG5pdGVtQ2xpY2tUb1Nob3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbWVudUxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG59KTtcclxuIiwiY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbmNvbnN0IGJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2J1cmdlcicpO1xyXG5cclxuYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG5hdi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XHJcbiAgYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb3NlJyk7XHJcbn0pO1xyXG4iLCJjb25zdCBzaG93TW9yZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LW1haW5fX3Njcm9sbC1idXR0b24nKTtcclxuY29uc3QgcGFuZWxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtbWFpbiAucGFuZWxfX2xpc3QnKTtcclxuXHJcbnNob3dNb3JlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHBhbmVsTGlzdC5zY3JvbGxCeSh7XHJcbiAgICB0b3A6IDI3MCxcclxuICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gIH0pO1xyXG59KTtcclxuIixudWxsXX0=
