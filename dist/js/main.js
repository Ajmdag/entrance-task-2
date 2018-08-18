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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlQ6XFxQcm9qZWN0c1xcc2hyaTIwMThcXGVudHJhbmNlLXRhc2stMlxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiVDovUHJvamVjdHMvc2hyaTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9mYWtlXzEzNTA3ZjBlLmpzIiwiVDovUHJvamVjdHMvc2hyaTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtZmlsdGVyLmpzIiwiVDovUHJvamVjdHMvc2hyaTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2RldmljZXMtb3Blbi1tZW51LmpzIiwiVDovUHJvamVjdHMvc2hyaTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL2hlYWRlci1uYXYuanMiLCJUOi9Qcm9qZWN0cy9zaHJpMjAxOC9lbnRyYW5jZS10YXNrLTIvc3JjL2pzL21vZHVsZXMvbWFpbi1zY3JvbGwtcGFuZWxzLmpzIiwiVDovUHJvamVjdHMvc2hyaTIwMTgvZW50cmFuY2UtdGFzay0yL3NyYy9qcy9tb2R1bGVzL3NjcmlwdHMtYXJyb3dzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9kZXZpY2VzLWZpbHRlcicpO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvZGV2aWNlcy1vcGVuLW1lbnUnKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL2hlYWRlci1uYXYnKTtcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4tc2Nyb2xsLXBhbmVscycpO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvc2NyaXB0cy1hcnJvd3MnKTsiLCJjb25zdCBkZXZpY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRlbnQtZGV2aWNlcyAucGFuZWxfX2l0ZW0nKTtcclxuY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRlbnQtZGV2aWNlc19fbWVudS1saXN0LWl0ZW0nKTtcclxuXHJcbm1lbnVJdGVtcy5mb3JFYWNoKChpdGVtLCBpZCkgPT4ge1xyXG4gIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ3BpY2tlZCcpO1xyXG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1maWx0ZXInKTtcclxuXHJcbiAgICBkZXZpY2VzLmZvckVhY2goZGV2aWNlID0+IHtcclxuICAgICAgaWYgKGRldmljZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsdGVyJykuc3BsaXQoJyAnKS5ldmVyeShpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4gaXRlbSAhPT0gZmlsdGVyVmFsdWU7XHJcbiAgICAgIH0pKSB7XHJcbiAgICAgICAgZGV2aWNlLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktbm9uZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRldmljZS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LW5vbmUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH0pO1xyXG59KTtcclxuIiwibGV0IGl0ZW1DbGlja1RvU2hvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWRldmljZXNfX21lbnUtbGlzdC1pdGVtLWFsbCcpO1xyXG5sZXQgbWVudUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1kZXZpY2VzX19tZW51LWxpc3QnKTtcclxuXHJcbml0ZW1DbGlja1RvU2hvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtZW51TGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbn0pO1xyXG4iLCJjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYXYnKTtcclxuY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnVyZ2VyJyk7XHJcblxyXG5idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbmF2LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZSgnY2xvc2UnKTtcclxufSk7XHJcbiIsImNvbnN0IHNob3dNb3JlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtbWFpbl9fc2Nyb2xsLWJ1dHRvbicpO1xyXG5jb25zdCBwYW5lbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1tYWluIC5wYW5lbF9fbGlzdCcpO1xyXG5cclxuc2hvd01vcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgcGFuZWxMaXN0LnNjcm9sbEJ5KHtcclxuICAgIHRvcDogMjcwLFxyXG4gICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgfSk7XHJcbn0pO1xyXG4iLCJjb25zdCBsZWZ0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1zY3JpcHRzX19hcnJvdy0tbGVmdCcpO1xyXG5jb25zdCByaWdodEFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtc2NyaXB0c19fYXJyb3ctLXJpZ2h0Jyk7XHJcblxyXG5jb25zdCBwYW5lbExpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRlbnQtc2NyaXB0cyAucGFuZWxfX2xpc3QnKTtcclxuY29uc3QgcGFuZWxJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250ZW50LXNjcmlwdHMgLnBhbmVsX19saXN0IC5wYW5lbF9faXRlbScpO1xyXG5cclxuaWYgKHBhbmVsTGlzdHMubGVuZ3RoID4gMSkge1xyXG4gIGxlZnRBcnJvdy5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgcmlnaHRBcnJvdy5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcblxyXG4gIHJpZ2h0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBwYW5lbExpc3RzWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gIH0pO1xyXG5cclxuXHJcbn07XHJcbiJdfQ==
