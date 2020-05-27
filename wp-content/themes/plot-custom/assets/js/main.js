(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var o={};t(o),e.bodyScrollLock=o}}(this,function(exports){"use strict";function i(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}function d(t){return u.some(function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})}function c(e){var t=e||window.event;return!!d(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))}function o(){setTimeout(function(){void 0!==m&&(document.body.style.paddingRight=m,m=void 0),void 0!==f&&(document.body.style.overflow=f,f=void 0)})}var a="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&1<window.navigator.maxTouchPoints),u=[],s=!1,v=-1,f=void 0,m=void 0;exports.disableBodyScroll=function(r,e){if(a){if(!r)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(r&&!u.some(function(e){return e.targetElement===r})){var t={targetElement:r,options:e||{}};u=[].concat(i(u),[t]),r.ontouchstart=function(e){1===e.targetTouches.length&&(v=e.targetTouches[0].clientY)},r.ontouchmove=function(e){var t,o,n,i;1===e.targetTouches.length&&(o=r,i=(t=e).targetTouches[0].clientY-v,d(t.target)||(o&&0===o.scrollTop&&0<i||(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&i<0?c(t):t.stopPropagation()))},s||(document.addEventListener("touchmove",c,l?{passive:!1}:void 0),s=!0)}}else{n=e,setTimeout(function(){if(void 0===m){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(m=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===f&&(f=document.body.style.overflow,document.body.style.overflow="hidden")});var o={targetElement:r,options:e||{}};u=[].concat(i(u),[o])}var n},exports.clearAllBodyScrollLocks=function(){a?(u.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),s&&(document.removeEventListener("touchmove",c,l?{passive:!1}:void 0),s=!1),u=[],v=-1):(o(),u=[])},exports.enableBodyScroll=function(t){if(a){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,u=u.filter(function(e){return e.targetElement!==t}),s&&0===u.length&&(document.removeEventListener("touchmove",c,l?{passive:!1}:void 0),s=!1)}else(u=u.filter(function(e){return e.targetElement!==t})).length||o()}});

},{}],2:[function(require,module,exports){
"use strict";

(function () {
  var FAQs;
  FAQs = {
    sections: document.querySelectorAll('.faqs'),
    init: function init() {
      if (!FAQs.sections) return;
      FAQs.sections.forEach(function (section) {
        return FAQs.initialiseListeners(section);
      });
    },
    initialiseListeners: function initialiseListeners(section) {
      var faqs = section.querySelectorAll('.faq');
      faqs.forEach(function (faq) {
        var question = faq.querySelector('.faq__question');
        var answer = faq.querySelector('.faq__answer');
        question.addEventListener('click', function () {
          faq.classList.toggle('faq--open');

          if (faq.classList.contains('faq--open')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          } else {
            answer.style.maxHeight = 0;
          }
        });
      });
    }
  };
  module.exports = FAQs;
})();

},{}],3:[function(require,module,exports){
"use strict";

// LazyLoad for Plot by Jon Mills, Matty Glen & Michael Watson
// This module loads in images asyncronously. It will look for the class
// "JS--lazyLoad" and then look for a data-src on image or video tags. 
// It will then replace the src of that element with the image linked on
// the data attribute.
// If the element is not an image or a video- it will assign the data-src
// as a background image. 
// If the screen size is less than the defined mobileBreakpoint, we load
// the src from data-small-src instead. 
// Creation of these video and image objects can be made using the PHP
// helper in lib/helpers.php plotLazyLoad()
// If we need to stipulate the height of an image before it loads, to avoid
// any jumpiness, we can pass through a ratio (w/h) of the image so it's
// set before the image loads.
// We also handle autoplaying videos, if the video has an autoplay attribute.
// It will pause and play videos appropriately depending on if they're in
// view or not.
(function () {
  var LazyLoad;
  LazyLoad = {
    mobileBreakpoint: 640,
    images: document.querySelectorAll('.JS--lazyLoad'),
    config: {
      rootMargin: '0px',
      threshold: 0.01
    },
    observer: null,
    init: function init() {
      LazyLoad.observer = new IntersectionObserver(LazyLoad.handleImageLoad, LazyLoad.config);
      LazyLoad.loadImages();
    },
    loadImages: function loadImages() {
      LazyLoad.images.forEach(function (image) {
        LazyLoad.observer.observe(image);
      });
    },
    addElements: function addElements(elements) {
      return new Promise(function (resolve, reject) {
        elements.forEach(function (image) {
          LazyLoad.observer.observe(image);
        });
        resolve();
      });
    },
    handleImageLoad: function handleImageLoad(entries) {
      entries.forEach(function (entry) {
        var element = entry.target;

        if (!element.classList.contains('loaded') && !element.classList.contains('loading')) {
          if (!entry.isIntersecting) return;
          element.classList.add('loading');
          var tag = entry.isIntersecting && element.tagName;
          var src = element.dataset.src;

          if (LazyLoad.isSmallScreen() && element.dataset.smallSrc) {
            src = element.dataset.smallSrc;
          }

          if (tag == "VIDEO") {
            if (LazyLoad.isSmallScreen() && element.dataset.smallSrc) {
              element.src = element.dataset.smallSrc;
            } else {
              element.src = element.dataset.src;
              if (element.getAttribute('autoplay')) element.play();
            }

            element.classList.add('loaded');
          } else {
            LazyLoad.getImage(src, element).then(function (data) {
              var tag = element.tagName;

              if (tag == "IMG") {
                data.element.src = data.src;
              } else {
                data.element.style.backgroundImage = 'url(' + data.src + ')';
              }

              data.element.classList.add('loaded');
              data.element.classList.remove('loading');
            })["catch"](function (erroredSrc) {
              console.log(erroredSrc, 'image not found');
            });
          }
        } else {
          if (element.tagName == "VIDEO") if (element.getAttribute('autoplay')) if (!entry.isIntersecting && element.paused == false) element.pause();else element.play();
        }
      });
    },
    getImage: function getImage(src, element) {
      return new Promise(function (resolve, reject) {
        var img = new Image();

        img.onload = function () {
          resolve({
            src: src,
            element: element
          });
        };

        img.onerror = function () {
          reject({
            src: src,
            element: element
          });
        };

        img.src = src;
      });
    },
    isSmallScreen: function isSmallScreen() {
      if (window.innerWidth < LazyLoad.mobileBreakpoint) return true;
      return false;
    }
  };
  module.exports = LazyLoad;
})();

},{}],4:[function(require,module,exports){
"use strict";

// Modals for Plot by Michael Watson
// A simple modals solution that looks for the class "JS--plotModalButton"
// And when clicked, reads the value set on data-plot-modal. it then looks
// for an HTML element called ".JS--plotModalContents" with a corresponding value.
// For example, <a class="JS--plotModalButton" data-plot-modal="1">Click me</a>
// Will find the following element:
// <div class="JS--plotModalContents">I am some modal content!</div>
// And will take the innerHTML to put inside a modal on the screen.
// Galleries can be created by connecting multiple Plot Modal Buttons
// by giving them a data-plot-modal-group option.
// They will then have working left and right arrows to navigate through
// Contents in a loop.
(function () {
  var LazyLoad = require('./lazyload'),
      Plot = require('./plot'),
      BodyScrollLock = require('body-scroll-lock'),
      Modals;

  Modals = {
    currentGroupItem: 0,
    groupLinks: [],
    currentModalId: null,
    isOpen: false,
    isLoading: false,
    controlsTimer: false,
    modalContent: document.querySelector('.JS--plotModalReplaceContents'),
    modalGroupControls: document.querySelector('.JS--plotModalControls'),
    modalGroupNext: document.querySelector('.JS--plotModalControls__next'),
    modalGroupBack: document.querySelector('.JS--plotModalControls__back'),
    plotModal: document.querySelector('.JS--plotModal'),
    init: function init() {
      Modals.createListeners();
      Modals.checkForModalNotification();
    },
    createListeners: function createListeners() {
      var closeButtons = document.querySelectorAll('.JS--closePlotModal');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = closeButtons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var closeButton = _step.value;
          closeButton.addEventListener('click', function (e) {
            if (e.target !== this) return;
            Modals.closePlotModal();
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      Modals.plotModal.addEventListener('mousemove', function () {
        if (Modals.currentModalId && !Plot.isTouchDevice()) {
          if (Modals.controlsTimer) clearTimeout(Modals.controlsTimer);
          if (Modals.plotModal.classList.contains('hideControls')) Modals.plotModal.classList.remove('hideControls');
          Modals.controlsTimer = setTimeout(function () {
            Modals.plotModal.classList.add('hideControls');
          }, 2200);
        }
      });
      document.querySelector('.siteWrap').addEventListener('click', function (e) {
        if (e.target.closest('[data-plot-modal]')) {
          e.preventDefault();
          Modals.openPlotModal(e.target.closest('[data-plot-modal]'));
        }
      });

      if (Modals.modalGroupBack) {
        Modals.modalGroupBack.addEventListener('click', Modals.triggerBackGroupItem);
      }

      if (Modals.modalGroupNext) {
        Modals.modalGroupNext.addEventListener('click', Modals.triggerNextGroupItem);
      }

      document.addEventListener('keydown', function (e) {
        if (e.which == 39 && Modals.groupLinks.length > 0) {
          Modals.triggerNextGroupItem();
        }

        if (e.which == 37 && Modals.groupLinks.length > 0) {
          Modals.triggerBackGroupItem();
        }

        if (Modals.isOpen && e.which == 27) {
          Modals.closePlotModal();
        }
      });
    },
    checkForModalNotification: function checkForModalNotification() {
      var notificationTrigger = document.querySelector('.JS--fakeButtonForModalNotifications');

      if (notificationTrigger) {
        if (sessionStorage.getItem('plotHasNotificationFired') !== "1") {
          sessionStorage.setItem('plotHasNotificationFired', '1');
          setTimeout(function () {
            Modals.openPlotModal(notificationTrigger);
          }, notificationTrigger.dataset.plotNotificationWait * 1000);
        }
      }
    },
    triggerBackGroupItem: function triggerBackGroupItem() {
      Modals.currentGroupItem--;

      if (Modals.currentGroupItem < 0) {
        Modals.currentGroupItem = Modals.groupLinks.length - 1;
      }

      Modals.openPlotModal(Modals.groupLinks[Modals.currentGroupItem]);
    },
    triggerNextGroupItem: function triggerNextGroupItem() {
      Modals.currentGroupItem++;

      if (Modals.currentGroupItem == Modals.groupLinks.length) {
        Modals.currentGroupItem = 0;
      }

      Modals.openPlotModal(Modals.groupLinks[Modals.currentGroupItem]);
    },
    openPlotModal: function openPlotModal(element) {
      if (Modals.isLoading == true) return false;
      var settings = {
        type: 'inline',
        // (inline|ajax) if the content is already in the dom or not
        groupId: '',
        //The optional ID of the group of modals used for gallery views
        contentsId: '',
        //The ID that references where, on the page, the content to use lives
        templatePart: '',
        //The template part to load, if AJAX
        ajaxData: {},
        //Data to send via AJAX
        modalClass: '' //A custom class to add to our modal

      };
      Modals.isLoading = true;

      if (element.dataset.plotModalType == 'ajax') {
        settings.type = 'ajax';
      }

      settings.contentsId = element.dataset.plotModalContents;
      settings.groupId = element.dataset.plotModalGroup;
      settings.templatePart = element.dataset.plotModalTemplatePart;
      settings.modalClass = element.dataset.plotModalClass;

      if (!settings.contentsId && settings.type == 'inline') {
        console.log('Inline Modals need a plot-modal-contents variable added');
        return false;
      }

      if (settings.type == 'ajax' && !settings.templatePart) {
        console.log('Ajax modals need a plot-modal-template-part variable added');
        return false;
      } //Check to see if it's part of a group


      if (Modals.groupLinks.length == 0 && settings.groupId) Modals.initialiseGroup(element);
      if (!settings.groupId) Modals.modalGroupControls.classList.add('hidden');

      if (settings.modalClass) {
        Modals.plotModal.classList.add(settings.modalClass);
      }

      if (settings.type == 'inline') {
        Modals.currentModalId = settings.contentsId; //Find content to insert in our modal

        var plotModalContents = document.querySelector('.JS--plotModalContents[data-plot-modal-contents="' + Modals.currentModalId + '"]');
        if (!plotModalContents.length == 0) return false;
        plotModalContents = plotModalContents.innerHTML;
        Modals.putContentsIntoModal(plotModalContents);
      } else {
        //AJAX loading content
        var ajaxData = {};
        document.body.classList.add('plotModalLoadingAjax');

        for (var key in element.dataset) {
          if (key.substring(0, 13) == 'plotModalData') {
            ajaxData[key.charAt(13).toLowerCase() + key.substring(14)] = element.dataset[key];
          }
        }

        var args = {
          returnOrWrite: 'return',
          templatePart: settings.templatePart,
          data: ajaxData
        };
        Plot.loadTemplatePart(args).then(function (html) {
          Modals.putContentsIntoModal(html);
        });
      }
    },
    putContentsIntoModal: function putContentsIntoModal(contents) {
      Modals.modalContent.style.minHeight = Modals.modalContent.clientHeight + 'px';
      Modals.modalContent.innerHTML = contents;
      BodyScrollLock.disableBodyScroll(Modals.plotModal);
      document.body.classList.add('plotModalInView');
      var newImages = Modals.modalContent.querySelectorAll('img');
      LazyLoad.addElements(newImages).then(function () {
        setTimeout(function () {
          Modals.modalContent.style.minHeight = 0;
        }, 50);
      });
      var newVideos = Modals.modalContent.querySelectorAll('video');
      newVideos.forEach(function (video) {
        var player = new MediaElementPlayer(video);
        player.play();
      });
      Modals.isOpen = true;
      Modals.isLoading = false;
      document.body.classList.remove('plotModalLoadingAjax');
    },
    initialiseGroup: function initialiseGroup(element) {
      Modals.groupLinks = document.querySelectorAll('[data-plot-modal-group="' + element.dataset.plotModalGroup + '"]');
      var i = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Modals.groupLinks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var groupLink = _step2.value;
          if (element == groupLink) Modals.currentGroupItem = i;
          i++;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (Modals.currentModalId && !Plot.isTouchDevice()) Modals.controlsTimer = setTimeout(function () {
        Modals.plotModal.classList.add('hideControls');
      }, 3000);
      Modals.modalGroupControls.classList.remove('hidden');
    },
    closePlotModal: function closePlotModal() {
      document.body.classList.remove('plotModalInView');
      Modals.currentModalId = null;
      Modals.plotModal.classList = 'JS--plotModal plotModal';
      Modals.groupLinks = [];
      Modals.currentGroupItem = 0;
      Modals.modalContent.innerHTML = '';
      BodyScrollLock.enableBodyScroll(Modals.plotModal);
      Modals.isOpen = false;
    }
  };
  module.exports = Modals;
})();

},{"./lazyload":3,"./plot":6,"body-scroll-lock":1}],5:[function(require,module,exports){
"use strict";

(function () {
  var Smooth;
  Smooth = {
    trackedElementsObserver: null,
    standardScrollFramesObserver: null,
    mainScrollAnimationFrame: null,
    currentPosition: 0,
    mutationObserverDebounce: null,
    onScrollCallbackThrottler: null,
    ease: 0.07,
    lastPosition: 0,
    onScroll: null,
    standardScroll: false,
    scrollElements: [],
    topBarHeight: 0,
    scrollFrames: [],
    ticking: false,
    dom: {
      scrollWindow: document.querySelector('[data-plot-smooth-scroll]'),
      scrollFrames: document.querySelectorAll('[data-plot-smooth-scroll-frame]'),
      scrollElements: document.querySelectorAll('[data-plot-smooth-scroll-element]'),
      topBar: document.querySelector('[data-plot-smooth-scroll-topbar')
    },
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    init: function init(settings) {
      //override any default settings with passed parameters
      Smooth.setSettings(settings);

      if (!Smooth.standardScroll) {
        //Set our current and last positions 
        //to the current scroll Y position, in case
        //we are scrolled down the page on load
        Smooth.currentPosition = window.scrollY;
        Smooth.lastPosition = window.scrollY; //Put fixed onto the whole site ready to 
        //intercept scrolling

        Smooth.setStyles();
        window.addEventListener('resize', Smooth.refresh, {
          passive: true
        });
        window.addEventListener('scroll', Smooth.scroll, {
          passive: true
        }); //Read through each scroll frame and set data
        //into a single array for processing later
        //{
        //      element           : element,      (the dom element)
        //      top               : 100,          (the offset top value without transforms, in pixels)
        //      height            : 300,          (the height of the element without transforms, in pixels)
        //      bottom            : 400,          (the offset bottom position value without transforms, in pixels)
        //      sticky            : false,        (if the element should behave like CSS sticky or not)
        //      parentBottom      : false || 500  (if the element is sticky, return the bottom position of its parent in pixels (when it should unstick))
        //  }

        Smooth.setScrollFrameData();
      } //If any scroll elements exist, we can add them and monitor them


      if (Smooth.dom.scrollElements) {
        //Read through each scroll element and set data
        //into a single array for processing later
        //{
        //      element         : element,          (the dom element)
        //      top             : 100,              (the offset top value without transforms, in pixels)
        //      height          : 300,              (the height of the element without transforms, in pixels)
        //      bottom          : 400,              (the offset bottom position value without transforms, in pixels)
        //      isVisible       : false,            (if the element is currently in the window frame or not)
        //      initialOffset   : .2,               (how far away this element is from the initial center of the screen)
        //      currentPosition : 0                 (how far up the viewport this element currently is (between -1 and 1))
        //      callback        : 'function.name'   (the name of a function you can call when this moves within view)
        // }
        Smooth.trackedElementsObserver = new IntersectionObserver(Smooth.trackVisibleElements, {
          rootMargin: '0px',
          threshold: 0.01
        });
        Smooth.setScrollElementData();
      } //Set up a mutation observer to listen out for changes in height,
      //to adjust our height of document accordingly


      Smooth.initMutationObserver(); //If there's a fixed topbar on this site, we can set the height
      //here, in order to offset any sticky positions. 

      Smooth.setTopBarHeight(); //If it's not standard scroll, set our initial scroll frame positions

      if (!Smooth.standardScroll) {
        Smooth.setPositionOfFrames();
      } else {
        Smooth.standardScrollFramesObserver = new IntersectionObserver(Smooth.trackStandardScrollFrames, {
          rootMargin: '0px',
          threshold: 0.01
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Smooth.dom.scrollFrames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var frame = _step.value;
            Smooth.standardScrollFramesObserver.observe(frame);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } //Set our position of any scroll elements


      Smooth.positionScrollElements();
    },
    setSettings: function setSettings(settings) {
      if (!settings) return true;
      if (typeof settings.onScroll == 'function') Smooth.onScroll = settings.onScroll;
      if (settings.standardScroll == true) Smooth.standardScroll = true;
      if (settings.ease) Smooth.ease = settings.ease;
    },
    retriggerWindowSizeOnMutate: function retriggerWindowSizeOnMutate(mutationsList, observer) {
      if (!Smooth.mutationObserverDebounce) {
        Smooth.mutationObserverDebounce = setTimeout(function () {
          var changed = false;
          Smooth.scrollFrames.forEach(function (frame) {
            if (frame.height != frame.element.clientHeight) changed = true;
          });
          if (changed == true) Smooth.refresh();
          clearTimeout(Smooth.mutationObserverDebounce);
          Smooth.mutationObserverDebounce = null;
        }, 200);
      }
    },
    initMutationObserver: function initMutationObserver() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Smooth.dom.scrollFrames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var scrollFrame = _step2.value;
          var observer = new MutationObserver(Smooth.retriggerWindowSizeOnMutate);
          observer.observe(scrollFrame, {
            childList: true,
            attributes: true,
            subtree: true
          });
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    },
    destroy: function destroy() {
      Smooth.scrollElements.forEach(function (entry) {
        entry.element.removeAttribute('style');
      });
      Smooth.scrollFrames.forEach(function (entry) {
        entry.element.removeAttribute('style');
      });
      Smooth.trackedElementsObserver = null;
      Smooth.mainScrollAnimationFrame = null;
      Smooth.currentPosition = 0;
      Smooth.mutationObserverDebounce = null;
      Smooth.onScrollCallbackThrottler = null;
      Smooth.ease = 0.07;
      Smooth.lastPosition = 0;
      Smooth.onScroll = null;
      Smooth.standardScroll = false;
      Smooth.scrollElements = [];
      Smooth.topBarHeight = 0;
      Smooth.scrollFrames = [];
      Smooth.ticking = false;
      Smooth.dom.scrollWindow.removeAttribute('style');
    },
    addElements: function addElements(elements) {
      return new Promise(function (resolve, reject) {
        elements.forEach(function (element) {
          Smooth.trackedElementsObserver.observe(element);
        });
        resolve();
      });
    },
    scrollTo: function scrollTo(element) {
      window.scrollTo(0, Smooth.exactPositionOfElement(element) - 100);

      if (Smooth.standardScroll != false) {
        Smooth.ticking = true;
        Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run);
      }
    },
    setScrollElementData: function setScrollElementData() {
      Smooth.dom.scrollElements = document.querySelectorAll('[data-plot-smooth-scroll-element]');
      Smooth.addElements(Smooth.dom.scrollElements);
      if (!Smooth.dom.scrollElements) return false;
      Smooth.scrollElements = [];
      Smooth.dom.scrollElements.forEach(function (element, i) {
        var elementTop = Smooth.exactPositionOfElement(element);
        var height = element.clientHeight;
        var callback = false,
            fromValue = -1,
            toValue = 1; //Is anything set on this element as a callback?

        if (element.dataset.plotSmoothScrollElement) {
          var c = element.dataset.plotSmoothScrollElement; //First up - have values been passed to this callback in this form: callback(2,5)

          var values = c.substring(c.indexOf('(') + 1, c.indexOf(')'));
          values = values.split(','); //Valid if we have 2, and from is less that to value

          if (values.length == 2 && values[0] < values[1]) {
            fromValue = Number(values[0]);
            toValue = Number(values[1]);
          }

          var potentialFunction = window[c];

          if (typeof potentialFunction === "function") {
            callback = potentialFunction.replace(/\s*\(.*?\)\s*/g, '');
          } else {
            var callbackSplit = c.replace(/\s*\(.*?\)\s*/g, '').split('.');

            if (callbackSplit.length == 2) {
              potentialFunction = window[callbackSplit[0]][callbackSplit[1]];

              if (typeof potentialFunction === "function") {
                callback = potentialFunction;
              }
            }
          }
        }

        var initialOffset = 0;
        if (elementTop < Smooth.windowHeight) initialOffset = (elementTop + height) / (Smooth.windowHeight + height) * (toValue - fromValue) + fromValue;
        Smooth.scrollElements[i] = {
          element: element,
          top: elementTop,
          height: height,
          bottom: elementTop + element.clientHeight,
          isVisible: elementTop < Smooth.currentPosition + Smooth.windowHeight && elementTop + height > Smooth.currentPosition,
          initialOffset: initialOffset,
          callback: callback,
          fromValue: fromValue,
          toValue: toValue,
          currentPosition: 0
        };
        element.dataset.plotSmoothScrollElementId = i;
      });
    },
    setTopBarHeight: function setTopBarHeight() {
      if (Smooth.dom.topBar) Smooth.topBarHeight = Smooth.dom.topBar.clientHeight;
    },
    setScrollFrameData: function setScrollFrameData() {
      Smooth.dom.scrollFrames = document.querySelectorAll('[data-plot-smooth-scroll-frame]');
      Smooth.scrollFrames = [];
      var newHeight = 0;
      Smooth.dom.scrollFrames.forEach(function (element) {
        var elementTop = Smooth.exactPositionOfElement(element);
        Smooth.scrollFrames.push({
          element: element,
          top: elementTop,
          height: element.clientHeight,
          bottom: elementTop + element.clientHeight,
          sticky: typeof element.dataset.plotSmoothScrollSticky != 'undefined' ? true : false,
          parentBottom: element.parentElement ? Smooth.exactPositionOfElement(element.parentElement) + element.parentElement.getBoundingClientRect().height : false
        });
      });
      document.body.style.height = "".concat(Smooth.dom.scrollWindow.scrollHeight, "px");
    },
    trackVisibleElements: function trackVisibleElements(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry) {
          entry.target.classList.add('plotSmoothScrollInView', 'plotSmoothScrollSeenOnce');
        } else {
          entry.target.classList.remove('plotSmoothScrollInView');
        }

        if (Smooth.scrollElements[entry.target.dataset.plotSmoothScrollElementId]) Smooth.scrollElements[entry.target.dataset.plotSmoothScrollElementId].isVisible = entry.isIntersecting;
      });
    },
    trackStandardScrollFrames: function trackStandardScrollFrames(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry) {
          entry.target.classList.add('plotSmoothScrollFrameInView', 'plotSmoothScrollFrameSeenOnce');
        } else {
          entry.target.classList.remove('plotSmoothScrollFrameInView');
        }
      });
    },
    refresh: function refresh() {
      if (Smooth.standardScroll) return true;
      Smooth.windowHeight = window.innerHeight;
      Smooth.windowWidth = window.innerWidth;
      Smooth.setScrollElementData();
      Smooth.setScrollFrameData();
      Smooth.setTopBarHeight();
      Smooth.scroll();
    },
    run: function run() {
      Smooth.lastPosition = Smooth.lerp(Smooth.lastPosition, Smooth.currentPosition, Smooth.ease);
      if (Smooth.lastPosition < .1) Smooth.lastPosition = 0;
      var diff = Smooth.currentPosition - Smooth.lastPosition;

      if (Math.abs(diff) < 0.5) {
        Smooth.ticking = false;
        diff = 0;
      }

      var velocity = diff / Smooth.windowWidth;
      Smooth.setPositionOfFrames();
      Smooth.fireOnScrollEvent(velocity);
      Smooth.positionScrollElements();
      if (Smooth.ticking == true) Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run);
    },
    positionScrollElements: function positionScrollElements() {
      Smooth.scrollElements.forEach(function (entry) {
        if (entry.isVisible == true && entry.callback) {
          var currentPosition = (entry.top - Smooth.lastPosition + entry.height) / (Smooth.windowHeight + entry.height) * (entry.toValue - entry.fromValue) + entry.fromValue - entry.initialOffset;

          if (entry.currentPosition != currentPosition) {
            entry.currentPosition = currentPosition;
            entry.callback(entry.element, currentPosition);
          }
        }
      });
    },
    fireOnScrollEvent: function fireOnScrollEvent(velocity) {
      if (typeof Smooth.onScroll == 'function') if (Smooth.onScrollCallbackThrottler === null) {
        Smooth.onScrollCallbackThrottler = setTimeout(function () {
          Smooth.onScroll(Smooth.dom.scrollFrames, velocity);
          Smooth.onScrollCallbackThrottler = null;
        }, 50);
      }
    },
    setPositionOfFrames: function setPositionOfFrames() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Smooth.scrollFrames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var scrollFrame = _step3.value;
          var windowScrollPosition = Smooth.lastPosition;

          if (scrollFrame.sticky && scrollFrame.parentBottom) {
            windowScrollPosition = Smooth.calcPositionOfStickyElement(scrollFrame, windowScrollPosition);
          }

          if (windowScrollPosition > scrollFrame.bottom || windowScrollPosition + Smooth.windowHeight < scrollFrame.top) {
            scrollFrame.element.classList.remove('plotSmoothScrollFrameInView');
          } else {
            scrollFrame.element.classList.add('plotSmoothScrollFrameInView', 'plotSmoothScrollFrameSeenOnce');
            scrollFrame.element.style.transform = "translate3d(0, -".concat(windowScrollPosition, "px, 0)");
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    },
    scroll: function scroll() {
      Smooth.currentPosition = window.scrollY;

      if (Smooth.ticking == false) {
        Smooth.ticking = true;
        Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run);
      }
    },
    setStyles: function setStyles() {
      Object.assign(Smooth.dom.scrollWindow.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      });
    },
    calcPositionOfStickyElement: function calcPositionOfStickyElement(entry, position) {
      //If the item is below the bottom of it's parent
      if (position + Smooth.topBarHeight >= entry.parentBottom) return position;

      if (entry.parentBottom - position - Smooth.topBarHeight <= entry.height) {
        return entry.top - entry.parentBottom + position + entry.height;
      }

      if (position + Smooth.topBarHeight > entry.top) return entry.top - Smooth.topBarHeight;
      return position;
    },
    lerp: function lerp(a, b, n) {
      return (1 - n) * a + n * b;
    },
    exactPositionOfElement: function exactPositionOfElement(element) {
      var el = element,
          offsetTop = 0;

      do {
        offsetTop += el.offsetTop;
        el = el.offsetParent;
      } while (el);

      return offsetTop;
    }
  };
  module.exports = Smooth;
})();

},{}],6:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var BodyScrollLock = require('body-scroll-lock'),
      LazyLoad = require('./lazyload'),
      SyncScroll = require('./syncscroll'),
      Plot;

  Plot = {
    init: function init() {
      Plot.createListeners();
      SyncScroll.init();
      Plot.animateBannerNotifications();
    },
    createListeners: function createListeners() {
      var burgerMenuTriggers = document.querySelectorAll('.JS--menuTrigger');

      if (burgerMenuTriggers.length > 0) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = burgerMenuTriggers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var burgerMenuTrigger = _step.value;
            burgerMenuTrigger.addEventListener('click', Plot.toggleBurger);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      var sideSwipes = document.querySelectorAll('.plotSideSwipes');

      if (sideSwipes.length > 0) {
        Plot.sideSwipes(sideSwipes);
      }
    },
    animateBannerNotifications: function animateBannerNotifications() {
      var banner = document.querySelector('.JS--bannerNotification');
      if (banner) if (banner.dataset.animationType == 'always') {
        Plot.buildBannerRepeatingText(banner);
        window.addEventListener('resize', function () {
          Plot.buildBannerRepeatingText(banner);
        });
      } else {
        Plot.checkToSeeIfWeNeedToAnimationBanner(banner);
        window.addEventListener('resize', function () {
          Plot.checkToSeeIfWeNeedToAnimationBanner(banner);
        });
      }
    },
    checkToSeeIfWeNeedToAnimationBanner: function checkToSeeIfWeNeedToAnimationBanner(banner) {
      banner.innerHTML = "<div>".concat(banner.dataset.message, "</div>");
      var div1 = banner.querySelector('div:nth-of-type(1)');
      var windowWidth = window.innerWidth;

      if (div1.scrollWidth > windowWidth) {
        banner.classList.add('withAnimation');
        Plot.buildBannerRepeatingText(banner);
      } else {
        banner.classList.remove('withAnimation');
      }
    },
    buildBannerRepeatingText: function buildBannerRepeatingText(banner) {
      banner.innerHTML = "<div>".concat(banner.dataset.message, "</div><div>").concat(banner.dataset.message, "</div>");
      var div1 = banner.querySelector('div:nth-of-type(1)');
      var div2 = banner.querySelector('div:nth-of-type(2)');
      var windowWidth = window.innerWidth;
      div1.style.animationDuration = windowWidth / 20 + "s";
      div2.style.animationDuration = windowWidth / 20 + "s";
      var i = 0;

      while (div1.scrollWidth < windowWidth && i < 100) {
        div1.innerHTML = div1.innerHTML + " ".concat(banner.dataset.message);
        div2.innerHTML = div2.innerHTML + " ".concat(banner.dataset.message);
        i++;
      }
    },
    sideSwipes: function sideSwipes(_sideSwipes) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _sideSwipes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var sideSwipe = _step2.value;

          if (parseInt(sideSwipe.getBoundingClientRect().width) + 1 < parseInt(sideSwipe.scrollWidth)) {}
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    },
    toggleBurger: function toggleBurger() {
      var burgerMenu = document.querySelector('.JS--burgerMenu');

      if (!document.documentElement.classList.contains('burgerOpen')) {
        document.documentElement.classList.add('burgerOpen');
        BodyScrollLock.disableBodyScroll(burgerMenu);
      } else {
        document.documentElement.classList.remove('burgerOpen');
        BodyScrollLock.enableBodyScroll(burgerMenu);
      }
    },
    isPage: function isPage(slug) {
      return document.body.classList.contains('page-' + slug);
    },
    fixVh: function fixVh() {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    },
    isTouchDevice: function isTouchDevice() {
      var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

      var mq = function mq(query) {
        return window.matchMedia(query).matches;
      };

      if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
        document.body.addClass('isTouchDevice');
        return true;
      }

      var query = ['(', prefixes.join('touch-enabled),('), 'plot', ')'].join('');
      return mq(query);
    },
    areWeAtTheTop: function areWeAtTheTop(scrollTop) {
      if (scrollTop > 0) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    },
    loadTemplatePart: function loadTemplatePart(args) {
      var defaults = {
        templatePart: null,
        action: 'plotLoadTemplatePart',
        //This is the action fired into our PlotSite PHP setup.php file
        data: {},
        returnOrWrite: 'write',
        //(write|return) either adds content to contentArea, or returns new HTML in the promise
        contentArea: '.JS--ajaxTargetArea',
        append: false
      };
      var settings = Object.assign({}, defaults, args);

      try {
        if (settings.returnOrWrite == 'write') var contentArea = document.querySelector(settings.contentArea);
      } catch (e) {
        console.log('contentArea needs to be a valid selector!');
        return false;
      }

      if (contentArea == null && settings.returnOrWrite == 'write') {
        console.log('Couldn\'t find selector for contentArea on page.');
        return false;
      }

      if (settings.templatePart == null) {
        console.log('Couldn\'t find template part. Make sure you set one as templatePart, for example parts/ajax-content');
        return false;
      }

      if (typeof settings.append !== "boolean") {
        console.log('Value passed to append was not a boolean.');
        return false;
      }

      if (settings.returnOrWrite == 'write') contentArea.classList.add('plotLoading');
      settings.data = {
        data: settings.data,
        action: settings.action,
        templatePart: settings.templatePart
      };
      var queryString = Plot.toQueryString(settings.data);
      return fetch(au, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: queryString,
        credentials: 'same-origin'
      }).then(function (data) {
        return data.json();
      }).then(function (result) {
        if (settings.returnOrWrite == 'write') contentArea.classList.remove('plotLoading');

        if (result.success) {
          if (settings.returnOrWrite !== 'write') return result.html;

          if (settings.append) {
            contentArea.insertAdjacentHTML('beforeend', result.html);
          } else {
            contentArea.innerHTML = result.html;
          }

          contentArea.querySelectorAll('.JS--lazyLoad').forEach(function (el) {
            LazyLoad.observer.observe(el);
          });
          return result.html;
        }
      })["catch"](function (error) {
        console.log('error', error);
      });
    },
    dateFormat: function dateFormat(date, format) {
      if (format == 'dS M') return date.getDate() + Plot.getOrdinal(date.getDate()) + ' ' + Plot.getMonth(date);
      if (format == 'M dS') return Plot.getMonth(date) + ' ' + date.getDate() + Plot.getOrdinal(date.getDate());
      if (format == 'd/m/y') return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear().toString().substr(-2);
      if (format == 'm/d/y') return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear().toString().substr(-2);
      return Plot.getDayOfWeek(date);
    },
    getDayOfWeek: function getDayOfWeek(date) {
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    },
    getOrdinal: function getOrdinal(number) {
      if (number > 3 && number < 21) return 'th';

      switch (number % 10) {
        case 1:
          return "st";

        case 2:
          return "nd";

        case 3:
          return "rd";

        default:
          return "th";
      }
    },
    getMonth: function getMonth(date) {
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return monthNames[date.getMonth()];
    },
    toQueryString: function toQueryString(obj, prefix) {
      var str = [],
          k,
          v;

      for (var p in obj) {
        if (!obj.hasOwnProperty(p)) {
          continue;
        } // skip things from the prototype


        if (~p.indexOf('[')) {
          k = prefix ? prefix + "[" + p.substring(0, p.indexOf('[')) + "]" + p.substring(p.indexOf('[')) : p;
        } else {
          k = prefix ? prefix + "[" + p + "]" : p;
        }

        v = obj[p];
        str.push(_typeof(v) == "object" ? Plot.toQueryString(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }

      return str.join("&");
    }
  };
  module.exports = Plot;
})();

},{"./lazyload":3,"./syncscroll":7,"body-scroll-lock":1}],7:[function(require,module,exports){
"use strict";

(function () {
  var Syncscroll;
  Syncscroll = {
    init: function init() {
      var Width = 'Width',
          Height = 'Height',
          Top = 'Top',
          Left = 'Left',
          scroll = 'scroll',
          client = 'client',
          EventListener = 'EventListener',
          addEventListener = 'add' + EventListener,
          length = 'length',
          Math_round = Math.round,
          names = {},
          reset = function reset() {
        var elems = document.getElementsByClassName('sync' + scroll); // clearing existing listeners

        var i, j, el, found, name;

        for (name in names) {
          if (names.hasOwnProperty(name)) {
            for (i = 0; i < names[name][length]; i++) {
              names[name][i]['remove' + EventListener](scroll, names[name][i].syn, 0);
            }
          }
        } // setting-up the new listeners


        for (i = 0; i < elems[length];) {
          found = j = 0;
          el = elems[i++];

          if (!(name = el.getAttribute('name'))) {
            // name attribute is not set
            continue;
          }

          el = el[scroll + 'er'] || el; // needed for intence
          // searching for existing entry in array of names;
          // searching for the element in that entry

          for (; j < (names[name] = names[name] || [])[length];) {
            found |= names[name][j++] == el;
          }

          if (!found) {
            names[name].push(el);
          }

          el.eX = el.eY = 0;

          (function (el, name) {
            el[addEventListener](scroll, el.syn = function () {
              var elems = names[name];
              var scrollX = el[scroll + Left];
              var scrollY = el[scroll + Top];
              var xRate = scrollX / (el[scroll + Width] - el[client + Width]);
              var yRate = scrollY / (el[scroll + Height] - el[client + Height]);
              var updateX = scrollX != el.eX;
              var updateY = scrollY != el.eY;
              var otherEl,
                  i = 0;
              el.eX = scrollX;
              el.eY = scrollY;

              for (; i < elems[length];) {
                otherEl = elems[i++];

                if (otherEl != el) {
                  if (updateX && Math_round(otherEl[scroll + Left] - (scrollX = otherEl.eX = Math_round(xRate * (otherEl[scroll + Width] - otherEl[client + Width]))))) {
                    otherEl[scroll + Left] = scrollX;
                  }

                  if (updateY && Math_round(otherEl[scroll + Top] - (scrollY = otherEl.eY = Math_round(yRate * (otherEl[scroll + Height] - otherEl[client + Height]))))) {
                    otherEl[scroll + Top] = scrollY;
                  }
                }
              }
            }, 0);
          })(el, name);
        }
      };

      if (document.readyState == "complete") {
        reset();
      } else {
        window[addEventListener]("load", reset, 0);
      }
    }
  };
  module.exports = Syncscroll;
})();

},{}],8:[function(require,module,exports){
/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

},{}],9:[function(require,module,exports){
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

},{}],10:[function(require,module,exports){
/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

},{"desandro-matches-selector":8}],11:[function(require,module,exports){
/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
      'imagesloaded/imagesloaded'
    ], function( Flickity, imagesLoaded ) {
      return factory( window, Flickity, imagesLoaded );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('flickity'),
      require('imagesloaded')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.imagesLoaded
    );
  }

}( window, function factory( window, Flickity, imagesLoaded ) {
'use strict';

Flickity.createMethods.push('_createImagesLoaded');

var proto = Flickity.prototype;

proto._createImagesLoaded = function() {
  this.on( 'activate', this.imagesLoaded );
};

proto.imagesLoaded = function() {
  if ( !this.options.imagesLoaded ) {
    return;
  }
  var _this = this;
  function onImagesLoadedProgress( instance, image ) {
    var cell = _this.getParentCell( image.img );
    _this.cellSizeChange( cell && cell.element );
    if ( !_this.options.freeScroll ) {
      _this.positionSliderAtSelected();
    }
  }
  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
};

return Flickity;

}));

},{"flickity":17,"imagesloaded":24}],12:[function(require,module,exports){
// add, remove cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {

'use strict';

// append cells to a document fragment
function getCellsFragment( cells ) {
  var fragment = document.createDocumentFragment();
  cells.forEach( function( cell ) {
    fragment.appendChild( cell.element );
  });
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

var proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {Element, Array, NodeList} elems
 * @param {Integer} index
 */
proto.insert = function( elems, index ) {
  var cells = this._makeCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }
  var len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  var fragment = getCellsFragment( cells );
  // append to slider
  var isAppend = index == len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    var insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    var endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );
  this.cellChange( index, true );
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {Element, Array, NodeList} elems
 */
proto.remove = function( elems ) {
  var cells = this.getCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }

  var minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( function( cell ) {
    cell.remove();
    var index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
  }, this );

  this.cellChange( minCellIndex, true );
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  var cell = this.getCell( elem );
  if ( !cell ) {
    return;
  }
  cell.getSize();

  var index = this.cells.indexOf( cell );
  this.cellChange( index );
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
  var prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._getWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex
  // try to maintain position & select previous selected element
  var cell = this.getCell( prevSelectedElem );
  if ( cell ) {
    this.selectedIndex = this.getCellSlideIndex( cell );
  }
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
  // do not position slider after lazy load
  if ( isPositioningSlider ) {
    this.positionSliderAtSelected();
  }
};

// -----  ----- //

return Flickity;

}));

},{"./flickity":16,"fizzy-ui-utils":10}],13:[function(require,module,exports){
// animate
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'fizzy-ui-utils/utils'
    ], function( utils ) {
      return factory( window, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory(
      window,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, utils ) {

'use strict';

// -------------------------- animate -------------------------- //

var proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) {
    return;
  }

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  var previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) {
    var _this = this;
    requestAnimationFrame( function animateFrame() {
      _this.animate();
    });
  }
};

proto.positionSlider = function() {
  var x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) {
    x = utils.modulo( x, this.slideableWidth );
    x = x - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  this.setTranslateX( x, this.isAnimating );
  this.dispatchScrollEvent();
};

proto.setTranslateX = function( x, is3d ) {
  x += this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft ? -x : x;
  var translateX = this.getPositionValue( x );
  // use 3D tranforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = is3d ?
    'translate3d(' + translateX + ',0,0)' : 'translateX(' + translateX + ')';
};

proto.dispatchScrollEvent = function() {
  var firstSlide = this.slides[0];
  if ( !firstSlide ) {
    return;
  }
  var positionX = -this.x - firstSlide.target;
  var progress = positionX / this.slidesWidth;
  this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) {
    return;
  }
  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';
  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) {
    this.restingFrames++;
  }
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  var beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    var cellShift = gap > 0 ? shift : 0;
    cell.wrapShift( cellShift );
    gap -= cell.size.outerWidth;
  }
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) {
    return;
  }
  for ( var i=0; i < cells.length; i++ ) {
    cells[i].wrapShift( 0 );
  }
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isDraggable || !this.isPointerDown ) {
    return;
  }
  // change the position to drag position by applying force
  var dragVelocity = this.dragX - this.x;
  var dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no slides
  var dragDown = this.isDraggable && this.isPointerDown;
  if ( dragDown || this.isFreeScrolling || !this.slides.length ) {
    return;
  }
  var distance = this.selectedSlide.target * -1 - this.x;
  var force = distance * this.options.selectedAttraction;
  this.applyForce( force );
};

return proto;

}));

},{"fizzy-ui-utils":10}],14:[function(require,module,exports){
// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'get-size/get-size'
    ], function( getSize ) {
      return factory( window, getSize );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory(
      window,
      window.getSize
    );
  }

}( window, function factory( window, getSize ) {

'use strict';

function Cell( elem, parent ) {
  this.element = elem;
  this.parent = parent;

  this.create();
}

var proto = Cell.prototype;

proto.create = function() {
  this.element.style.position = 'absolute';
  this.element.setAttribute( 'aria-hidden', 'true' );
  this.x = 0;
  this.shift = 0;
};

proto.destroy = function() {
  // reset style
  this.unselect();
  this.element.style.position = '';
  var side = this.parent.originSide;
  this.element.style[ side ] = '';
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.setPosition = function( x ) {
  this.x = x;
  this.updateTarget();
  this.renderPosition( x );
};

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function() {
  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
  this.target = this.x + this.size[ marginProperty ] +
    this.size.width * this.parent.cellAlign;
};

proto.renderPosition = function( x ) {
  // render position of cell with in slider
  var side = this.parent.originSide;
  this.element.style[ side ] = this.parent.getPositionValue( x );
};

proto.select = function() {
  this.element.classList.add('is-selected');
  this.element.removeAttribute('aria-hidden');
};

proto.unselect = function() {
  this.element.classList.remove('is-selected');
  this.element.setAttribute( 'aria-hidden', 'true' );
};

/**
 * @param {Integer} factor - 0, 1, or -1
**/
proto.wrapShift = function( shift ) {
  this.shift = shift;
  this.renderPosition( this.x + this.parent.slideableWidth * shift );
};

proto.remove = function() {
  this.element.parentNode.removeChild( this.element );
};

return Cell;

}));

},{"get-size":23}],15:[function(require,module,exports){
// drag
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'unidragger/unidragger',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unidragger, utils ) {
      return factory( window, Flickity, Unidragger, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unidragger'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.Unidragger,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unidragger, utils ) {

'use strict';

// ----- defaults ----- //

utils.extend( Flickity.defaults, {
  draggable: '>1',
  dragThreshold: 3,
});

// ----- create ----- //

Flickity.createMethods.push('_createDrag');

// -------------------------- drag prototype -------------------------- //

var proto = Flickity.prototype;
utils.extend( proto, Unidragger.prototype );
proto._touchActionValue = 'pan-y';

// --------------------------  -------------------------- //

var isTouch = 'createTouch' in document;
var isTouchmoveScrollCanceled = false;

proto._createDrag = function() {
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'deactivate', this.onDeactivateDrag );
  this.on( 'cellChange', this.updateDraggable );
  // TODO updateDraggable on resize? if groupCells & slides change
  // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
  // #457, RubaXa/Sortable#973
  if ( isTouch && !isTouchmoveScrollCanceled ) {
    window.addEventListener( 'touchmove', function() {});
    isTouchmoveScrollCanceled = true;
  }
};

proto.onActivateDrag = function() {
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
};

proto.onDeactivateDrag = function() {
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
};

proto.updateDraggable = function() {
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable == '>1' ) {
    this.isDraggable = this.slides.length > 1;
  } else {
    this.isDraggable = this.options.draggable;
  }
  if ( this.isDraggable ) {
    this.element.classList.add('is-draggable');
  } else {
    this.element.classList.remove('is-draggable');
  }
};

// backwards compatibility
proto.bindDrag = function() {
  this.options.draggable = true;
  this.updateDraggable();
};

proto.unbindDrag = function() {
  this.options.draggable = false;
  this.updateDraggable();
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

// -------------------------- pointer events -------------------------- //

proto.pointerDown = function( event, pointer ) {
  if ( !this.isDraggable ) {
    this._pointerDownDefault( event, pointer );
    return;
  }
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }

  this._pointerDownPreventDefault( event );
  this.pointerDownFocus( event );
  // blur
  if ( document.activeElement != this.element ) {
    // do not blur if already focused
    this.pointerDownBlur();
  }

  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );

  this._pointerDownDefault( event, pointer );
};

// default pointerDown logic, used for staticClick
proto._pointerDownDefault = function( event, pointer ) {
  // track start event position
  // Safari 9 overrides pageX and pageY. These values needs to be copied. #779
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };
  // bind move and end events
  this._bindPostStartEvents( event );
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

var focusNodes = {
  INPUT: true,
  TEXTAREA: true,
  SELECT: true,
};

proto.pointerDownFocus = function( event ) {
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isFocusNode ) {
    this.focus();
  }
};

proto._pointerDownPreventDefault = function( event ) {
  var isTouchStart = event.type == 'touchstart';
  var isTouchPointer = event.pointerType == 'touch';
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) {
    event.preventDefault();
  }
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.pointerUp = function( event, pointer ) {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

proto.pointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.dragStart = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  this.dragStartPosition = this.x;
  this.startAnimation();
  window.removeEventListener( 'scroll', this );
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
};

proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isDraggable ) {
    return;
  }
  event.preventDefault();

  this.previousDragX = this.dragX;
  // reverse if right-to-left
  var direction = this.options.rightToLeft ? -1 : 1;
  if ( this.options.wrapAround ) {
    // wrap around move. #589
    moveVector.x = moveVector.x % this.slideableWidth;
  }
  var dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.options.wrapAround && this.slides.length ) {
    // slow drag
    var originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    var endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  }

  this.dragX = dragX;

  this.dragMoveTime = new Date();
  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

proto.dragEnd = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  if ( this.options.freeScroll ) {
    this.isFreeScrolling = true;
  }
  // set selectedIndex based on where flick will end up
  var index = this.dragEndRestingSelect();

  if ( this.options.freeScroll && !this.options.wrapAround ) {
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    var restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  } else if ( !this.options.freeScroll && index == this.selectedIndex ) {
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  }
  delete this.previousDragX;
  // apply selection
  // TODO refactor this, selecting here feels weird
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.options.wrapAround;
  this.select( index );
  delete this.isDragSelect;
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

proto.dragEndRestingSelect = function() {
  var restingX = this.getRestingPosition();
  // how far away from selected slide
  var distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  var positiveResting = this._getClosestResting( restingX, distance, 1 );
  var negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  var index = positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
  return index;
};

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */
proto._getClosestResting = function( restingX, distance, increment ) {
  var index = this.selectedIndex;
  var minDistance = Infinity;
  var condition = this.options.contain && !this.options.wrapAround ?
    // if contain, keep going if distance is equal to minDistance
    function( d, md ) { return d <= md; } : function( d, md ) { return d < md; };
  while ( condition( distance, minDistance ) ) {
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) {
      break;
    }
    distance = Math.abs( distance );
  }
  return {
    distance: minDistance,
    // selected was previous index
    index: index - increment
  };
};

/**
 * measure distance between x and a slide target
 * @param {Number} x
 * @param {Integer} index - slide index
 */
proto.getSlideDistance = function( x, index ) {
  var len = this.slides.length;
  // wrap around if at least 2 slides
  var isWrapAround = this.options.wrapAround && len > 1;
  var slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  var slide = this.slides[ slideIndex ];
  if ( !slide ) {
    return null;
  }
  // add distance for wrap-around slides
  var wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
  return x - ( slide.target + wrap );
};

proto.dragEndBoostSelect = function() {
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) {
    return 0;
  }

  var distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  var delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) {
    // boost to next if moving towards the right, and positive velocity
    return 1;
  } else if ( distance < 0 && delta < 0 ) {
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  }
  return 0;
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  // get clickedCell, if cell was clicked
  var clickedCell = this.getParentCell( event.target );
  var cellElem = clickedCell && clickedCell.element;
  var cellIndex = clickedCell && this.cells.indexOf( clickedCell );
  this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
};

// ----- scroll ----- //

proto.onscroll = function() {
  var scroll = getScrollPosition();
  var scrollMoveX = this.pointerDownScroll.x - scroll.x;
  var scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
    this._pointerDone();
  }
};

// ----- utils ----- //

function getScrollPosition() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}

// -----  ----- //

return Flickity;

}));

},{"./flickity":16,"fizzy-ui-utils":10,"unidragger":25}],16:[function(require,module,exports){
// Flickity main
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter',
      'get-size/get-size',
      'fizzy-ui-utils/utils',
      './cell',
      './slide',
      './animate'
    ], function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
      return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./cell'),
      require('./slide'),
      require('./animate')
    );
  } else {
    // browser global
    var _Flickity = window.Flickity;

    window.Flickity = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      _Flickity.Cell,
      _Flickity.Slide,
      _Flickity.animatePrototype
    );
  }

}( window, function factory( window, EvEmitter, getSize,
  utils, Cell, Slide, animatePrototype ) {

'use strict';

// vars
var jQuery = window.jQuery;
var getComputedStyle = window.getComputedStyle;
var console = window.console;

function moveElements( elems, toElem ) {
  elems = utils.makeArray( elems );
  while ( elems.length ) {
    toElem.appendChild( elems.shift() );
  }
}

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Flickity intances
var instances = {};

function Flickity( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) {
    var instance = instances[ this.element.flickityGUID ];
    instance.option( options );
    return instance;
  }

  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }
  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // kick things off
  this._create();
}

Flickity.defaults = {
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true
  // watchCSS: false,
  // wrapAround: false
};

// hash of methods triggered on _create()
Flickity.createMethods = [];

var proto = Flickity.prototype;
// inherit EventEmitter
utils.extend( proto, EvEmitter.prototype );

proto._create = function() {
  // add id for Flickity.data
  var id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.originSide = this.options.rightToLeft ? 'right' : 'left';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();

  if ( this.options.resize || this.options.watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  // add listeners from on option
  for ( var eventName in this.options.on ) {
    var listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  }

  Flickity.createMethods.forEach( function( method ) {
    this[ method ]();
  }, this );

  if ( this.options.watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }

};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) {
    return;
  }
  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  var cellElems = this._filterFindCellElements( this.element.children );
  moveElements( cellElems, this.slider );
  this.viewport.appendChild( this.slider );
  this.element.appendChild( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');
  this.selectInitialIndex();
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
};

// slider positions the cells
proto._createSlider = function() {
  // slider element does all the positioning
  var slider = document.createElement('div');
  slider.className = 'flickity-slider';
  slider.style[ this.originSide ] = 0;
  this.slider = slider;
};

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) {
  var cellElems = this._filterFindCellElements( elems );

  // create new Flickity for collection
  var cells = cellElems.map( function( cellElem ) {
    return new Cell( cellElem, this );
  }, this );

  return cells;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.getLastSlide = function() {
  return this.slides[ this.slides.length - 1 ];
};

// positions all cells
proto.positionCells = function() {
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
};

/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */
proto._positionCells = function( index ) {
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  var cellX = 0;
  // get cellX
  if ( index > 0 ) {
    var startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  }
  var len = this.cells.length;
  for ( var i=index; i < len; i++ ) {
    var cell = this.cells[i];
    cell.setPosition( cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  }
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
};

/**
 * cell.getSize() on multiple cells
 * @param {Array} cells
 */
proto._sizeCells = function( cells ) {
  cells.forEach( function( cell ) {
    cell.getSize();
  });
};

// --------------------------  -------------------------- //

proto.updateSlides = function() {
  this.slides = [];
  if ( !this.cells.length ) {
    return;
  }

  var slide = new Slide( this );
  this.slides.push( slide );
  var isOriginLeft = this.originSide == 'left';
  var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

  var canCellFit = this._getCanCellFit();

  this.cells.forEach( function( cell, i ) {
    // just add cell if first cell in slide
    if ( !slide.cells.length ) {
      slide.addCell( cell );
      return;
    }

    var slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ nextMargin ] );

    if ( canCellFit.call( this, i, slideWidth ) ) {
      slide.addCell( cell );
    } else {
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( this );
      this.slides.push( slide );
      slide.addCell( cell );
    }
  }, this );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
};

proto._getCanCellFit = function() {
  var groupCells = this.options.groupCells;
  if ( !groupCells ) {
    return function() {
      return false;
    };
  } else if ( typeof groupCells == 'number' ) {
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    var number = parseInt( groupCells, 10 );
    return function( i ) {
      return ( i % number ) !== 0;
    };
  }
  // default, group by width of slide
  // parse '75%
  var percentMatch = typeof groupCells == 'string' &&
    groupCells.match(/^(\d+)%$/);
  var percent = percentMatch ? parseInt( percentMatch[1], 10 ) / 100 : 1;
  return function( i, slideWidth ) {
    return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
  };
};

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() {
  this.positionCells();
  this.positionSliderAtSelected();
};

proto.getSize = function() {
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
};

var cellAlignShorthands = {
  // cell align, then based on origin side
  center: {
    left: 0.5,
    right: 0.5
  },
  left: {
    left: 0,
    right: 1
  },
  right: {
    right: 0,
    left: 1
  }
};

proto.setCellAlign = function() {
  var shorthand = cellAlignShorthands[ this.options.cellAlign ];
  this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
};

proto.setGallerySize = function() {
  if ( this.options.setGallerySize ) {
    var height = this.options.adaptiveHeight && this.selectedSlide ?
      this.selectedSlide.height : this.maxCellHeight;
    this.viewport.style.height = height + 'px';
  }
};

proto._getWrapShiftCells = function() {
  // only for wrap-around
  if ( !this.options.wrapAround ) {
    return;
  }
  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  var gapX = this.cursorPosition;
  var cellIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  gapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
};

proto._getGapCells = function( gapX, cellIndex, increment ) {
  // keep adding cells until the cover the initial gap
  var cells = [];
  while ( gapX > 0 ) {
    var cell = this.cells[ cellIndex ];
    if ( !cell ) {
      break;
    }
    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  }
  return cells;
};

// ----- contain ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() {
  if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) {
    return;
  }
  var isRightToLeft = this.options.rightToLeft;
  var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
  var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
  var contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
  // content is less than gallery size
  var isContentSmaller = contentWidth < this.size.innerWidth;
  // bounds
  var beginBound = this.cursorPosition + this.cells[0].size[ beginMargin ];
  var endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
  // contain each cell target
  this.slides.forEach( function( slide ) {
    if ( isContentSmaller ) {
      // all cells fit inside gallery
      slide.target = contentWidth * this.cellAlign;
    } else {
      // contain to bounds
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
    }
  }, this );
};

// -----  ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) {
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    var $event = type;
    if ( event ) {
      // create jQuery event
      var jQEvent = jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
    }
    this.$element.trigger( $event, args );
  }
};

// -------------------------- select -------------------------- //

/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) {
  if ( !this.isActive ) {
    return;
  }
  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.options.wrapAround || isWrap ) {
    index = utils.modulo( index, this.slides.length );
  }
  // bail if invalid index
  if ( !this.slides[ index ] ) {
    return;
  }
  var prevIndex = this.selectedIndex;
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) {
    this.positionSliderAtSelected();
  } else {
    this.startAnimation();
  }
  if ( this.options.adaptiveHeight ) {
    this.setGallerySize();
  }
  // events
  this.dispatchEvent( 'select', null, [ index ] );
  // change event if new index
  if ( index != prevIndex ) {
    this.dispatchEvent( 'change', null, [ index ] );
  }
  // old v1 event name, remove in v3
  this.dispatchEvent('cellSelect');
};

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) {
  var len = this.slides.length;
  var isWrapping = this.options.wrapAround && len > 1;
  if ( !isWrapping ) {
    return index;
  }
  var wrapIndex = utils.modulo( index, len );
  // go to shortest
  var delta = Math.abs( wrapIndex - this.selectedIndex );
  var backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
  var forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
  if ( !this.isDragSelect && backWrapDelta < delta ) {
    index += len;
  } else if ( !this.isDragSelect && forewardWrapDelta < delta ) {
    index -= len;
  }
  // wrap position so slider is within normal area
  if ( index < 0 ) {
    this.x -= this.slideableWidth;
  } else if ( index >= len ) {
    this.x += this.slideableWidth;
  }
};

proto.previous = function( isWrap, isInstant ) {
  this.select( this.selectedIndex - 1, isWrap, isInstant );
};

proto.next = function( isWrap, isInstant ) {
  this.select( this.selectedIndex + 1, isWrap, isInstant );
};

proto.updateSelectedSlide = function() {
  var slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) {
    return;
  }
  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  // Remove in v3?
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
};

proto.unselectSelectedSlide = function() {
  if ( this.selectedSlide ) {
    this.selectedSlide.unselect();
  }
};

proto.selectInitialIndex = function() {
  var initialIndex = this.options.initialIndex;
  // already activated, select previous selectedIndex
  if ( this.isInitActivated ) {
    this.select( this.selectedIndex, false, true );
    return;
  }
  // select with selector string
  if ( initialIndex && typeof initialIndex == 'string' ) {
    var cell = this.queryCell( initialIndex );
    if ( cell ) {
      this.selectCell( initialIndex, false, true );
      return;
    }
  }

  var index = 0;
  // select with number
  if ( initialIndex && this.slides[ initialIndex ] ) {
    index = initialIndex;
  }
  // select instantly
  this.select( index, false, true );
};

/**
 * select slide from number or cell element
 * @param {Element or Number} elem
 */
proto.selectCell = function( value, isWrap, isInstant ) {
  // get cell
  var cell = this.queryCell( value );
  if ( !cell ) {
    return;
  }

  var index = this.getCellSlideIndex( cell );
  this.select( index, isWrap, isInstant );
};

proto.getCellSlideIndex = function( cell ) {
  // get index of slides that has cell
  for ( var i=0; i < this.slides.length; i++ ) {
    var slide = this.slides[i];
    var index = slide.cells.indexOf( cell );
    if ( index != -1 ) {
      return i;
    }
  }
};

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem
 * @returns {Flickity.Cell} item
 */
proto.getCell = function( elem ) {
  // loop through cells to get the one that matches
  for ( var i=0; i < this.cells.length; i++ ) {
    var cell = this.cells[i];
    if ( cell.element == elem ) {
      return cell;
    }
  }
};

/**
 * get collection of Flickity.Cells, given Elements
 * @param {Element, Array, NodeList} elems
 * @returns {Array} cells - Flickity.Cells
 */
proto.getCells = function( elems ) {
  elems = utils.makeArray( elems );
  var cells = [];
  elems.forEach( function( elem ) {
    var cell = this.getCell( elem );
    if ( cell ) {
      cells.push( cell );
    }
  }, this );
  return cells;
};

/**
 * get cell elements
 * @returns {Array} cellElems
 */
proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

/**
 * get parent cell from an element
 * @param {Element} elem
 * @returns {Flickit.Cell} cell
 */
proto.getParentCell = function( elem ) {
  // first check if elem is cell
  var cell = this.getCell( elem );
  if ( cell ) {
    return cell;
  }
  // try to get parent cell elem
  elem = utils.getParent( elem, '.flickity-slider > *' );
  return this.getCell( elem );
};

/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) {
  if ( !adjCount ) {
    return this.selectedSlide.getCellElements();
  }
  index = index === undefined ? this.selectedIndex : index;

  var len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) {
    return this.getCellElements();
  }

  var cellElems = [];
  for ( var i = index - adjCount; i <= index + adjCount ; i++ ) {
    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
    var slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

/**
 * select slide from number or cell element
 * @param {Element, Selector String, or Number} selector
 */
proto.queryCell = function( selector ) {
  if ( typeof selector == 'number' ) {
    // use number as index
    return this.cells[ selector ];
  }
  if ( typeof selector == 'string' ) {
    // do not select invalid selectors from hash: #123, #/. #791
    if ( selector.match(/^[#\.]?[\d\/]/) ) {
      return;
    }
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  }
  // get cell from element
  return this.getCell( selector );
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

// keep focus on element when child UI elements are clicked
proto.childUIPointerDown = function( event ) {
  // HACK iOS does not allow touch events to bubble up?!
  if ( event.type != 'touchstart' ) {
    event.preventDefault();
  }
  this.focus();
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  if ( !this.isActive ) {
    return;
  }
  this.getSize();
  // wrap values
  if ( this.options.wrapAround ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  var selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  var watchOption = this.options.watchCSS;
  if ( !watchOption ) {
    return;
  }

  var afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.indexOf('flickity') != -1 ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  // only work if element is in focus
  var isNotFocused = document.activeElement && document.activeElement != this.element;
  if ( !this.options.accessibility ||isNotFocused ) {
    return;
  }

  var handler = Flickity.keyboardHandlers[ event.keyCode ];
  if ( handler ) {
    handler.call( this );
  }
};

Flickity.keyboardHandlers = {
  // left arrow
  37: function() {
    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this.uiChange();
    this[ leftMethod ]();
  },
  // right arrow
  39: function() {
    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this.uiChange();
    this[ rightMethod ]();
  },
};

// ----- focus ----- //

proto.focus = function() {
  // TODO remove scrollTo once focus options gets more support
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
  var prevScrollY = window.pageYOffset;
  this.element.focus({ preventScroll: true });
  // hack to fix scroll jump after focus, #76
  if ( window.pageYOffset != prevScrollY ) {
    window.scrollTo( window.pageXOffset, prevScrollY );
  }
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) {
    return;
  }
  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( function( cell ) {
    cell.destroy();
  });
  this.element.removeChild( this.viewport );
  // move child elements back into element
  moveElements( this.slider.children, this.element );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.allOff();
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

utils.extend( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {Element} elem
 * @returns {Flickity}
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.flickityGUID;
  return id && instances[ id ];
};

utils.htmlInit( Flickity, 'flickity' );

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'flickity', Flickity );
}

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) {
  jQuery = jq;
};

Flickity.Cell = Cell;
Flickity.Slide = Slide;

return Flickity;

}));

},{"./animate":13,"./cell":14,"./slide":22,"ev-emitter":9,"fizzy-ui-utils":10,"get-size":23}],17:[function(require,module,exports){
/*!
 * Flickity v2.2.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2019 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      './drag',
      './prev-next-button',
      './page-dots',
      './player',
      './add-remove-cell',
      './lazyload'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('./flickity'),
      require('./drag'),
      require('./prev-next-button'),
      require('./page-dots'),
      require('./player'),
      require('./add-remove-cell'),
      require('./lazyload')
    );
  }

})( window, function factory( Flickity ) {
  /*jshint strict: false*/
  return Flickity;
});

},{"./add-remove-cell":12,"./drag":15,"./flickity":16,"./lazyload":18,"./page-dots":19,"./player":20,"./prev-next-button":21}],18:[function(require,module,exports){
// lazyload
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {
'use strict';

Flickity.createMethods.push('_createLazyload');
var proto = Flickity.prototype;

proto._createLazyload = function() {
  this.on( 'select', this.lazyLoad );
};

proto.lazyLoad = function() {
  var lazyLoad = this.options.lazyLoad;
  if ( !lazyLoad ) {
    return;
  }
  // get adjacent cells, use lazyLoad option for adjacent count
  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  var cellElems = this.getAdjacentCellElements( adjCount );
  // get lazy images in those cells
  var lazyImages = [];
  cellElems.forEach( function( cellElem ) {
    var lazyCellImages = getCellLazyImages( cellElem );
    lazyImages = lazyImages.concat( lazyCellImages );
  });
  // load lazy images
  lazyImages.forEach( function( img ) {
    new LazyLoader( img, this );
  }, this );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.nodeName == 'IMG' ) {
    var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
    var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
    var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
    if ( lazyloadAttr || srcAttr || srcsetAttr ) {
      return [ cellElem ];
    }
  }
  // select lazy images in cell
  var lazySelector = 'img[data-flickity-lazyload], ' +
    'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
  var imgs = cellElem.querySelectorAll( lazySelector );
  return utils.makeArray( imgs );
}

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 */
function LazyLoader( img, flickity ) {
  this.img = img;
  this.flickity = flickity;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  var src = this.img.getAttribute('data-flickity-lazyload') ||
    this.img.getAttribute('data-flickity-lazyload-src');
  var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
  // set src & serset
  this.img.src = src;
  if ( srcset ) {
    this.img.setAttribute( 'srcset', srcset );
  }
  // remove attr
  this.img.removeAttribute('data-flickity-lazyload');
  this.img.removeAttribute('data-flickity-lazyload-src');
  this.img.removeAttribute('data-flickity-lazyload-srcset');
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );

  var cell = this.flickity.getParentCell( this.img );
  var cellElem = cell && cell.element;
  this.flickity.cellSizeChange( cellElem );

  this.img.classList.add( className );
  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

}));

},{"./flickity":16,"fizzy-ui-utils":10}],19:[function(require,module,exports){
// page dots
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'unipointer/unipointer',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unipointer, utils ) {
      return factory( window, Flickity, Unipointer, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unipointer'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.Unipointer,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unipointer, utils ) {

// -------------------------- PageDots -------------------------- //

'use strict';

function PageDots( parent ) {
  this.parent = parent;
  this._create();
}

PageDots.prototype = Object.create( Unipointer.prototype );

PageDots.prototype._create = function() {
  // create holder element
  this.holder = document.createElement('ol');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
  // events
  this.handleClick = this.onClick.bind( this );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PageDots.prototype.activate = function() {
  this.setDots();
  this.holder.addEventListener( 'click', this.handleClick );
  this.bindStartEvent( this.holder );
  // add to DOM
  this.parent.element.appendChild( this.holder );
};

PageDots.prototype.deactivate = function() {
  this.holder.removeEventListener( 'click', this.handleClick );
  this.unbindStartEvent( this.holder );
  // remove from DOM
  this.parent.element.removeChild( this.holder );
};

PageDots.prototype.setDots = function() {
  // get difference between number of slides and number of dots
  var delta = this.parent.slides.length - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  var fragment = document.createDocumentFragment();
  var newDots = [];
  var length = this.dots.length;
  var max = length + count;

  for ( var i = length; i < max; i++ ) {
    var dot = document.createElement('li');
    dot.className = 'dot';
    dot.setAttribute( 'aria-label', 'Page dot ' + ( i + 1 ) );
    fragment.appendChild( dot );
    newDots.push( dot );
  }

  this.holder.appendChild( fragment );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  var removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( function( dot ) {
    this.holder.removeChild( dot );
  }, this );
};

PageDots.prototype.updateSelected = function() {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.className = 'dot';
    this.selectedDot.removeAttribute('aria-current');
  }
  // don't proceed if no dots
  if ( !this.dots.length ) {
    return;
  }
  this.selectedDot = this.dots[ this.parent.selectedIndex ];
  this.selectedDot.className = 'dot is-selected';
  this.selectedDot.setAttribute( 'aria-current', 'step' );
};

PageDots.prototype.onTap = // old method name, backwards-compatible
PageDots.prototype.onClick = function( event ) {
  var target = event.target;
  // only care about dot clicks
  if ( target.nodeName != 'LI' ) {
    return;
  }

  this.parent.uiChange();
  var index = this.dots.indexOf( target );
  this.parent.select( index );
};

PageDots.prototype.destroy = function() {
  this.deactivate();
  this.allOff();
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pageDots: true
});

Flickity.createMethods.push('_createPageDots');

var proto = Flickity.prototype;

proto._createPageDots = function() {
  if ( !this.options.pageDots ) {
    return;
  }
  this.pageDots = new PageDots( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

proto.activatePageDots = function() {
  this.pageDots.activate();
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected();
};

proto.updatePageDots = function() {
  this.pageDots.setDots();
};

proto.deactivatePageDots = function() {
  this.pageDots.deactivate();
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

}));

},{"./flickity":16,"fizzy-ui-utils":10,"unipointer":26}],20:[function(require,module,exports){
// player & autoPlay
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter',
      'fizzy-ui-utils/utils',
      './flickity'
    ], function( EvEmitter, utils, Flickity ) {
      return factory( EvEmitter, utils, Flickity );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('ev-emitter'),
      require('fizzy-ui-utils'),
      require('./flickity')
    );
  } else {
    // browser global
    factory(
      window.EvEmitter,
      window.fizzyUIUtils,
      window.Flickity
    );
  }

}( window, function factory( EvEmitter, utils, Flickity ) {

'use strict';

// -------------------------- Player -------------------------- //

function Player( parent ) {
  this.parent = parent;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
}

Player.prototype = Object.create( EvEmitter.prototype );

// start play
Player.prototype.play = function() {
  if ( this.state == 'playing' ) {
    return;
  }
  // do not play if page is hidden, start playing when page is visible
  var isPageHidden = document.hidden;
  if ( isPageHidden ) {
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state != 'playing' ) {
    return;
  }

  var time = this.parent.options.autoPlay;
  // default to 3 seconds
  time = typeof time == 'number' ? time : 3000;
  var _this = this;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( function() {
    _this.parent.next( true );
    _this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state == 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state == 'paused' ) {
    this.play();
  }
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  var isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pauseAutoPlayOnHover: true
});

Flickity.createMethods.push('_createPlayer');
var proto = Flickity.prototype;

proto._createPlayer = function() {
  this.player = new Player( this );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) {
    return;
  }
  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) {
    return;
  }
  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

}));

},{"./flickity":16,"ev-emitter":9,"fizzy-ui-utils":10}],21:[function(require,module,exports){
// prev/next buttons
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'unipointer/unipointer',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unipointer, utils ) {
      return factory( window, Flickity, Unipointer, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unipointer'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.Unipointer,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unipointer, utils ) {
'use strict';

var svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( direction, parent ) {
  this.direction = direction;
  this.parent = parent;
  this._create();
}

PrevNextButton.prototype = Object.create( Unipointer.prototype );

PrevNextButton.prototype._create = function() {
  // properties
  this.isEnabled = true;
  this.isPrevious = this.direction == -1;
  var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
  this.isLeft = this.direction == leftDirection;

  var element = this.element = document.createElement('button');
  element.className = 'flickity-button flickity-prev-next-button';
  element.className += this.isPrevious ? ' previous' : ' next';
  // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  // init as disabled
  this.disable();

  element.setAttribute( 'aria-label', this.isPrevious ? 'Previous' : 'Next' );

  // create arrow
  var svg = this.createSVG();
  element.appendChild( svg );
  // events
  this.parent.on( 'select', this.update.bind( this ) );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PrevNextButton.prototype.activate = function() {
  this.bindStartEvent( this.element );
  this.element.addEventListener( 'click', this );
  // add to DOM
  this.parent.element.appendChild( this.element );
};

PrevNextButton.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.element );
  // click events
  this.unbindStartEvent( this.element );
  this.element.removeEventListener( 'click', this );
};

PrevNextButton.prototype.createSVG = function() {
  var svg = document.createElementNS( svgURI, 'svg');
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  var path = document.createElementNS( svgURI, 'path');
  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
  }
  svg.appendChild( path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) {
    return shape;
  }
  // create movement string
  return 'M ' + shape.x0 + ',50' +
    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
    ' L ' + shape.x3 + ',50 ' +
    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
    ' Z';
}

PrevNextButton.prototype.handleEvent = utils.handleEvent;

PrevNextButton.prototype.onclick = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.parent.uiChange();
  var method = this.isPrevious ? 'previous' : 'next';
  this.parent[ method ]();
};

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  if ( this.isEnabled ) {
    return;
  }
  this.element.disabled = false;
  this.isEnabled = true;
};

PrevNextButton.prototype.disable = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.element.disabled = true;
  this.isEnabled = false;
};

PrevNextButton.prototype.update = function() {
  // index of first or last slide, if previous or next
  var slides = this.parent.slides;
  // enable is wrapAround and at least 2 slides
  if ( this.parent.options.wrapAround && slides.length > 1 ) {
    this.enable();
    return;
  }
  var lastIndex = slides.length ? slides.length - 1 : 0;
  var boundIndex = this.isPrevious ? 0 : lastIndex;
  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
  this[ method ]();
};

PrevNextButton.prototype.destroy = function() {
  this.deactivate();
  this.allOff();
};

// -------------------------- Flickity prototype -------------------------- //

utils.extend( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  }
});

Flickity.createMethods.push('_createPrevNextButtons');
var proto = Flickity.prototype;

proto._createPrevNextButtons = function() {
  if ( !this.options.prevNextButtons ) {
    return;
  }

  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );

  this.on( 'activate', this.activatePrevNextButtons );
};

proto.activatePrevNextButtons = function() {
  this.prevButton.activate();
  this.nextButton.activate();
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.deactivate();
  this.nextButton.deactivate();
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

}));

},{"./flickity":16,"fizzy-ui-utils":10,"unipointer":26}],22:[function(require,module,exports){
// slide
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( window, function factory() {
'use strict';

function Slide( parent ) {
  this.parent = parent;
  this.isOriginLeft = parent.originSide == 'left';
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

var proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length == 1 ) {
    this.x = cell.x; // x comes from first cell
    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
    this.firstMargin = cell.size[ beginMargin ];
  }
};

proto.updateTarget = function() {
  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
  var lastCell = this.getLastCell();
  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.cells.forEach( function( cell ) {
    cell.select();
  });
};

proto.unselect = function() {
  this.cells.forEach( function( cell ) {
    cell.unselect();
  });
};

proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

return Slide;

}));

},{}],23:[function(require,module,exports){
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

},{}],24:[function(require,module,exports){
/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});

},{"ev-emitter":9}],25:[function(require,module,exports){
/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */
proto._bindHandles = function( isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = touchAction;
    }
  }
};

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }
  // track start event position
  this.pointerDownPointer = pointer;

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) {
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) {
    this._pointerReset();
  }
  return isOkay;
};

// kludge to blur previously focused input
proto.pointerDownBlur = function() {
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) {
    focused.blur();
  }
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

},{"unipointer":26}],26:[function(require,module,exports){
/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {

'use strict';

function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd - remove if falsey
 */
proto._bindStartEvent = function( elem, isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

  // default to mouse events
  var startEvent = 'mousedown';
  if ( window.PointerEvent ) {
    // Pointer Events
    startEvent = 'pointerdown';
  } else if ( 'ontouchstart' in window ) {
    // Touch Events. iOS Safari
    startEvent = 'touchstart';
  }
  elem[ bindMethod ]( startEvent, this );
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss right click and other pointers
  // button = 0 is okay, 1-4 not
  if ( event.button || this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  this._pointerReset();
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto._pointerReset = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

},{"ev-emitter":9}],27:[function(require,module,exports){
"use strict";

(function () {
  var Flickity = require('flickity'),
      LazyLoad = require('../../../../plot-core/src/js/lazyload'),
      Carousels;

  require('flickity-imagesloaded');

  Carousels = {
    init: function init() {
      Carousels.initialiseCarousel();
    },
    initialiseCarousel: function initialiseCarousel() {
      var carousels = document.querySelectorAll('.JS--carousel');
      carousels.forEach(function (carousel) {
        var slides = carousel.querySelectorAll('.JS--carousel__slideWrap');

        if (slides.length > 1) {
          var flkty = new Flickity(carousel, {
            cellAlign: 'center',
            wrapAround: true,
            autoPlay: false,
            imagesLoaded: true,
            pageDots: false,
            prevNextButtons: false,
            lazyLoad: 2
          });
        }

        carousel.classList.remove('JS--carousel--hidden');
      });
    }
  };
  module.exports = Carousels;
})();

},{"../../../../plot-core/src/js/lazyload":3,"flickity":17,"flickity-imagesloaded":11}],28:[function(require,module,exports){
"use strict";

(function () {
  var TogglePrice;
  TogglePrice = {
    container: document.querySelector('.JS--TogglePrice'),
    init: function init() {
      TogglePrice.container.firstElementChild.addEventListener('click', TogglePrice.toggle);
      console.log(TogglePrice.container.firstElementChild);
    },
    toggle: function toggle() {
      TogglePrice.container.classList.toggle('planToggle--showMonthlyPrice');
    }
  };
  module.exports = TogglePrice;
})();

},{}],29:[function(require,module,exports){
"use strict";

(function () {
  'use strict';

  var Plot = require('../../../plot-core/src/js/plot'),
      LazyLoad = require('../../../plot-core/src/js/lazyload'),
      Modals = require('../../../plot-core/src/js/modals'),
      Carousels = require('./components/carousel'),
      Smooth = require('../../../plot-core/src/js/plot-smooth-scroll'),
      FAQs = require('../../../plot-core/src/js/faqs'),
      // CustomMouse 	= require('../../../plot-core/src/js/custom-mouse'),
  Home = require('./pages/home'),
      TogglePrice = require('./components/toggle-price'),
      Artists = require('./pages/artists'),
      Schedule = require('./pages/schedule'),
      News = require('./pages/news'),
      Main;

  Main = {
    init: function init() {
      Main.initalizeSmooth();
      Plot.init();
      LazyLoad.init();
      Modals.init();
      Carousels.init();
      FAQs.init(); // CustomMouse.init({
      // 	'a' 				: 'anchorHover',
      // 	'.altHoverTarget'	: 'altHover'
      // })
      //Pages

      if (Plot.isPage('home')) Home.init();
      if (Plot.isPage('schedule')) Schedule.init();
      if (Plot.isPage('artists')) Artists.init();
      if (Plot.isPage('pricing')) TogglePrice.init();
      News.init();
      Main.demoAjaxButton();
    },
    initalizeSmooth: function initalizeSmooth() {
      var hasSmoothScroll = document.body.dataset.plotCustomizerSmoothScroll;
      var smoothSettings = {
        standardScroll: hasSmoothScroll != 'yes'
      };
      Smooth.init(smoothSettings);
    },
    demoAjaxButton: function demoAjaxButton() {
      var plotDemoLoadContent = document.querySelector('.JS--plotLoadTemplatePartDemo');
      if (plotDemoLoadContent) plotDemoLoadContent.addEventListener('click', function (e) {
        // Take a look at what you can pass to this function
        // var args = {
        //              templatePart    : null,
        //              action          : 'plotLoadTemplatePart', //This is the action fired into our PlotSite PHP setup.php file
        //              data            : {}, //Any data we'd like to pass to the template part. 
        //              contentArea     : '.JS--ajaxTargetArea', //Where the new content gets inserts
        //              append          : false //If we want to append to the above area, or replace the content
        //          }
        var args = {
          templatePart: 'demos/ajax-content',
          data: {
            'foo': 'bar',
            'bangers': 'mash',
            'having': 'it'
          }
        };
        Plot.loadTemplatePart(args);
      });
    }
  };
  window.Main = Main;
})();

},{"../../../plot-core/src/js/faqs":2,"../../../plot-core/src/js/lazyload":3,"../../../plot-core/src/js/modals":4,"../../../plot-core/src/js/plot":6,"../../../plot-core/src/js/plot-smooth-scroll":5,"./components/carousel":27,"./components/toggle-price":28,"./pages/artists":30,"./pages/home":31,"./pages/news":32,"./pages/schedule":33}],30:[function(require,module,exports){
"use strict";

(function () {
  var Plot = require('../../../../plot-core/src/js/plot'),
      Modals = require('../../../../plot-core/src/js/modals'),
      Artists; //May this object act as a guide to using Plot core functions
  //and how to set up ajax dynamic data with our new principles with ease


  Artists = {
    maxPages: 1,
    currentPage: 1,
    currentArtistType: false,
    loadMoreButton: document.querySelector('.JS--artistsLoadMore'),
    init: function init() {
      Artists.showOrHideLoadMoreButton();
      Artists.createListeners();
    },
    createListeners: function createListeners() {
      Artists.loadMoreButton.addEventListener('click', function (e) {
        var nextPage = parseInt(Artists.loadMoreButton.dataset.nextPage);
        Artists.currentPage = nextPage;
        Artists.loadArtists(true);
        Artists.loadMoreButton.dataset.nextPage = nextPage + 1;
      });
      document.addEventListener('click', function (e) {
        //Have we clicked on an artist type filter button?
        if (e.target.closest('.JS--artistTypeButton')) {
          Artists.currentArtistType = e.target.dataset.artistTypeId;
          Artists.currentPage = 1;
          Artists.loadMoreButton.dataset.nextPage = 2;
          Artists.loadArtists(false).then(function () {
            document.querySelectorAll('.JS--artistTypeButton').forEach(function (artistTypeButton) {
              artistTypeButton.classList.remove('selected');
            });
            e.target.classList.add('selected');
          });
        }
      }, false);
    },
    loadArtists: function loadArtists(append) {
      var args = {
        templatePart: 'parts/artist-listing',
        data: {
          'page': Artists.currentPage,
          'artistType': Artists.currentArtistType
        },
        append: append
      };
      return Plot.loadTemplatePart(args).then(function (html) {
        Artists.showOrHideLoadMoreButton();
        return true;
      });
    },
    showOrHideLoadMoreButton: function showOrHideLoadMoreButton() {
      //Check if max pages is 1. If it is, there's only 1 page of artists
      //so we can hide load more button
      Artists.maxPages = document.querySelector('.JS--maxPages').dataset.maxPages;
      if (Artists.maxPages > Artists.currentPage) Artists.loadMoreButton.classList.remove('hidden');else Artists.loadMoreButton.classList.add('hidden');
    }
  };
  module.exports = Artists;
})();

},{"../../../../plot-core/src/js/modals":4,"../../../../plot-core/src/js/plot":6}],31:[function(require,module,exports){
"use strict";

(function () {
  var Home;
  Home = {
    intervalLength: 3000,
    themes: ['arts', 'sounds', 'urban', 'purple'],
    init: function init() {
      Home.createListeners();
    },
    createListeners: function createListeners() {
      // Observe the homebanner section
      var homeBanner = document.querySelector('.homeBanner');
      var observer = new MutationObserver(Home.bannerInView);
      observer.observe(homeBanner, {
        attributes: true
      });
    },
    bannerInView: function bannerInView(mutationsList, observer) {
      // If the banner element is in view
      if (mutationsList[0].target.classList.contains('plotSmoothScrollInView')) {
        Home.startThemeCounter();
      } else {
        Home.stopThemeCounter();
      } // If banner is out of view
      // Cancel interval

    },
    startThemeCounter: function startThemeCounter() {
      // Change the class on the body element
      // remove previous class
      // If we reach the end of the theme, start at the begging again
      var i = 0;
      Home.counter = setInterval(function () {
        if (Home.previousTheme) document.body.classList.remove(Home.previousTheme);
        document.body.classList.add("homeBannerTheme--".concat(Home.themes[i]));
        Home.previousTheme = "homeBannerTheme--".concat(Home.themes[i]);

        if (i >= Home.themes.length - 1) {
          i = 0;
        } else {
          i++;
        }
      }, 2000);
    },
    stopThemeCounter: function stopThemeCounter() {
      if (Home.counter) clearInterval(Home.counter);
    }
  };
  module.exports = Home;
})();

},{}],32:[function(require,module,exports){
"use strict";

(function () {
  var Plot = require('../../../../plot-core/src/js/plot'),
      News; //May this object act as a guide to using Plot core functions
  //and how to set up ajax dynamic data with our new principles with ease


  News = {
    maxPages: 1,
    currentNewsCategory: 0,
    currentPage: 1,
    loadMoreButton: document.querySelector('.JS--newsLoadMore'),
    init: function init() {
      if (News.loadMoreButton) {
        News.showOrHideLoadMoreButton();
        News.createListeners();
      }
    },
    createListeners: function createListeners() {
      News.loadMoreButton.addEventListener('click', function (e) {
        var nextPage = parseInt(News.loadMoreButton.dataset.nextPage);
        News.currentPage = nextPage;
        News.loadNews(true);
        News.loadMoreButton.dataset.nextPage = nextPage + 1;
      });
    },
    loadNews: function loadNews(append) {
      var args = {
        templatePart: 'parts/news-listing',
        data: {
          'page': News.currentPage,
          'artistType': News.currentNewsCategory
        },
        append: append
      };
      return Plot.loadTemplatePart(args).then(function (html) {
        News.showOrHideLoadMoreButton();
        return true;
      });
    },
    showOrHideLoadMoreButton: function showOrHideLoadMoreButton() {
      //Check if max pages is 1. If it is, there's only 1 page of News
      //so we can hide load more button
      News.maxPages = document.querySelector('.JS--maxPages').dataset.maxPages;
      console.log(News.maxPages);
      if (News.maxPages > News.currentPage) News.loadMoreButton.classList.remove('hidden');else News.loadMoreButton.classList.add('hidden');
    }
  };
  module.exports = News;
})();

},{"../../../../plot-core/src/js/plot":6}],33:[function(require,module,exports){
"use strict";

(function () {
  var Schedule;
  Schedule = {
    dayButtons: document.querySelectorAll('.JS--scheduleDayPickerButton'),
    calendars: document.querySelectorAll('.scheduleCalendarWrap'),
    init: function init() {
      Schedule.createListeners();
      Schedule.checkToSeeIfNavArrowsNeeded();
    },
    createListeners: function createListeners() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Schedule.dayButtons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dayButton = _step.value;
          dayButton.addEventListener('click', function () {
            Schedule.loadNewDate(this);
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      window.addEventListener('resize', function () {
        Schedule.checkToSeeIfNavArrowsNeeded();
      });
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          calendar = _step2.value;
          var rightButton = calendar.querySelector('.JS--scheduleRight'),
              leftButton = calendar.querySelector('.JS--scheduleLeft'),
              tracks = calendar.querySelector('.scheduleCalendarTracks'),
              tracksW = tracks.offsetWidth;
          rightButton.addEventListener('click', function () {
            tracks.scrollBy({
              left: tracksW / 2,
              behavior: 'smooth'
            });
          });
          leftButton.addEventListener('click', function () {
            tracks.scrollBy({
              left: -tracksW / 2,
              behavior: 'smooth'
            });
          });
        };

        for (var _iterator2 = Schedule.calendars[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var calendar;

          _loop();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    },
    loadNewDate: function loadNewDate(elem) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Schedule.dayButtons[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var dB = _step3.value;
          dB.classList.remove('selected');
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      elem.classList.add('selected');
      var day = elem.dataset.scheduleDay;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = Schedule.calendars[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var calendar = _step4.value;
          if (calendar.dataset.scheduleDay == day) calendar.classList.remove('hidden');else calendar.classList.add('hidden');
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      Schedule.checkToSeeIfNavArrowsNeeded();
    },
    checkToSeeIfNavArrowsNeeded: function checkToSeeIfNavArrowsNeeded() {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = Schedule.calendars[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var calendar = _step5.value;

          if (!calendar.classList.contains('hidden')) {
            var tracks = calendar.querySelector('.scheduleCalendarTracks');

            if (tracks.scrollWidth > calendar.scrollWidth) {
              calendar.querySelector('.JS--scheduleLeft').classList.remove('hidden');
              calendar.querySelector('.JS--scheduleRight').classList.remove('hidden');
            } else {
              calendar.querySelector('.JS--scheduleLeft').classList.add('hidden');
              calendar.querySelector('.JS--scheduleRight').classList.add('hidden');
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  };
  module.exports = Schedule;
})();

},{}]},{},[29])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2JvZHktc2Nyb2xsLWxvY2svbGliL2JvZHlTY3JvbGxMb2NrLm1pbi5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvZmFxcy5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvbGF6eWxvYWQuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL21vZGFscy5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvcGxvdC1zbW9vdGgtc2Nyb2xsLmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90LmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9zeW5jc2Nyb2xsLmpzIiwibm9kZV9tb2R1bGVzL2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9ldi1lbWl0dGVyL2V2LWVtaXR0ZXIuanMiLCJub2RlX21vZHVsZXMvZml6enktdWktdXRpbHMvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHktaW1hZ2VzbG9hZGVkL2ZsaWNraXR5LWltYWdlc2xvYWRlZC5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9hZGQtcmVtb3ZlLWNlbGwuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvYW5pbWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9jZWxsLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2RyYWcuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvZmxpY2tpdHkuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvbGF6eWxvYWQuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvcGFnZS1kb3RzLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL3BsYXllci5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9wcmV2LW5leHQtYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL3NsaWRlLmpzIiwibm9kZV9tb2R1bGVzL2dldC1zaXplL2dldC1zaXplLmpzIiwibm9kZV9tb2R1bGVzL2ltYWdlc2xvYWRlZC9pbWFnZXNsb2FkZWQuanMiLCJub2RlX21vZHVsZXMvdW5pZHJhZ2dlci91bmlkcmFnZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3VuaXBvaW50ZXIvdW5pcG9pbnRlci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdG9nZ2xlLXByaWNlLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvcGFnZXMvYXJ0aXN0cy5qcyIsInNyYy9qcy9wYWdlcy9ob21lLmpzIiwic3JjL2pzL3BhZ2VzL25ld3MuanMiLCJzcmMvanMvcGFnZXMvc2NoZWR1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOzs7O0FDREMsYUFBWTtBQUVULE1BQUksSUFBSjtBQUVBLEVBQUEsSUFBSSxHQUFHO0FBQ0gsSUFBQSxRQUFRLEVBQUUsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLENBRFA7QUFHSCxJQUFBLElBQUksRUFBRSxnQkFBTTtBQUVSLFVBQUcsQ0FBQyxJQUFJLENBQUMsUUFBVCxFQUNJO0FBRUosTUFBQSxJQUFJLENBQUMsUUFBTCxDQUFjLE9BQWQsQ0FBc0IsVUFBQSxPQUFPO0FBQUEsZUFBSSxJQUFJLENBQUMsbUJBQUwsQ0FBeUIsT0FBekIsQ0FBSjtBQUFBLE9BQTdCO0FBRUgsS0FWRTtBQVlILElBQUEsbUJBQW1CLEVBQUUsNkJBQUMsT0FBRCxFQUFhO0FBRTlCLFVBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxnQkFBUixDQUF5QixNQUF6QixDQUFYO0FBRUEsTUFBQSxJQUFJLENBQUMsT0FBTCxDQUFhLFVBQUEsR0FBRyxFQUFJO0FBRWhCLFlBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxh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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDellBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqNkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN1NDLGFBQVk7QUFFVCxNQUFJLFFBQVEsR0FBVSxPQUFPLENBQUMsVUFBRCxDQUE3QjtBQUFBLE1BQ0EsUUFBUSxHQUFZLE9BQU8sQ0FBQyx1Q0FBRCxDQUQzQjtBQUFBLE1BRUEsU0FGQTs7QUFJQSxFQUFBLE9BQU8sQ0FBQyx1QkFBRCxDQUFQOztBQUVBLEVBQUEsU0FBUyxHQUFHO0FBRVIsSUFBQSxJQUFJLEVBQUUsZ0JBQU07QUFF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QyxhQUFULENBQXVCLG9CQUF2QixFQUE2QyxTQUE3QyxDQUF1RCxNQUF2RCxDQUE4RCxRQUE5RDtBQUNGLGFBSEQsTUFHTztBQUNKLGNBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFNBQTVDLENBQXNELEdBQXRELENBQTBELFFBQTFEO0FBQ0EsY0FBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsU0FBN0MsQ0FBdUQsR0FBdkQsQ0FBMkQsUUFBM0Q7QUFDRjtBQUVIO0FBRUY7QUFsQmlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQm5DO0FBaEdNLEdBQVg7QUFvR0EsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixRQUFqQjtBQUVILENBMUdBLEdBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIhZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtcImV4cG9ydHNcIl0sdCk7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyl0KGV4cG9ydHMpO2Vsc2V7dmFyIG89e307dChvKSxlLmJvZHlTY3JvbGxMb2NrPW99fSh0aGlzLGZ1bmN0aW9uKGV4cG9ydHMpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGkoZSl7aWYoQXJyYXkuaXNBcnJheShlKSl7Zm9yKHZhciB0PTAsbz1BcnJheShlLmxlbmd0aCk7dDxlLmxlbmd0aDt0Kyspb1t0XT1lW3RdO3JldHVybiBvfXJldHVybiBBcnJheS5mcm9tKGUpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBsPSExO2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cpe3ZhciBlPXtnZXQgcGFzc2l2ZSgpe2w9ITB9fTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RQYXNzaXZlXCIsbnVsbCxlKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRlc3RQYXNzaXZlXCIsbnVsbCxlKX1mdW5jdGlvbiBkKHQpe3JldHVybiB1LnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuISghZS5vcHRpb25zLmFsbG93VG91Y2hNb3ZlfHwhZS5vcHRpb25zLmFsbG93VG91Y2hNb3ZlKHQpKX0pfWZ1bmN0aW9uIGMoZSl7dmFyIHQ9ZXx8d2luZG93LmV2ZW50O3JldHVybiEhZCh0LnRhcmdldCl8fCgxPHQudG91Y2hlcy5sZW5ndGh8fCh0LnByZXZlbnREZWZhdWx0JiZ0LnByZXZlbnREZWZhdWx0KCksITEpKX1mdW5jdGlvbiBvKCl7c2V0VGltZW91dChmdW5jdGlvbigpe3ZvaWQgMCE9PW0mJihkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodD1tLG09dm9pZCAwKSx2b2lkIDAhPT1mJiYoZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1mLGY9dm9pZCAwKX0pfXZhciBhPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5uYXZpZ2F0b3ImJndpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0mJigvaVAoYWR8aG9uZXxvZCkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSl8fFwiTWFjSW50ZWxcIj09PXdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0mJjE8d2luZG93Lm5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyksdT1bXSxzPSExLHY9LTEsZj12b2lkIDAsbT12b2lkIDA7ZXhwb3J0cy5kaXNhYmxlQm9keVNjcm9sbD1mdW5jdGlvbihyLGUpe2lmKGEpe2lmKCFyKXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJkaXNhYmxlQm9keVNjcm9sbCB1bnN1Y2Nlc3NmdWwgLSB0YXJnZXRFbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgd2hlbiBjYWxsaW5nIGRpc2FibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTtpZihyJiYhdS5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQ9PT1yfSkpe3ZhciB0PXt0YXJnZXRFbGVtZW50OnIsb3B0aW9uczplfHx7fX07dT1bXS5jb25jYXQoaSh1KSxbdF0pLHIub250b3VjaHN0YXJ0PWZ1bmN0aW9uKGUpezE9PT1lLnRhcmdldFRvdWNoZXMubGVuZ3RoJiYodj1lLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSl9LHIub250b3VjaG1vdmU9ZnVuY3Rpb24oZSl7dmFyIHQsbyxuLGk7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJihvPXIsaT0odD1lKS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFktdixkKHQudGFyZ2V0KXx8KG8mJjA9PT1vLnNjcm9sbFRvcCYmMDxpfHwobj1vKSYmbi5zY3JvbGxIZWlnaHQtbi5zY3JvbGxUb3A8PW4uY2xpZW50SGVpZ2h0JiZpPDA/Yyh0KTp0LnN0b3BQcm9wYWdhdGlvbigpKSl9LHN8fChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsYyxsP3twYXNzaXZlOiExfTp2b2lkIDApLHM9ITApfX1lbHNle249ZSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aWYodm9pZCAwPT09bSl7dmFyIGU9ISFuJiYhMD09PW4ucmVzZXJ2ZVNjcm9sbEJhckdhcCx0PXdpbmRvdy5pbm5lcldpZHRoLWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtlJiYwPHQmJihtPWRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0LGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0PXQrXCJweFwiKX12b2lkIDA9PT1mJiYoZj1kb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93LGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIil9KTt2YXIgbz17dGFyZ2V0RWxlbWVudDpyLG9wdGlvbnM6ZXx8e319O3U9W10uY29uY2F0KGkodSksW29dKX12YXIgbn0sZXhwb3J0cy5jbGVhckFsbEJvZHlTY3JvbGxMb2Nrcz1mdW5jdGlvbigpe2E/KHUuZm9yRWFjaChmdW5jdGlvbihlKXtlLnRhcmdldEVsZW1lbnQub250b3VjaHN0YXJ0PW51bGwsZS50YXJnZXRFbGVtZW50Lm9udG91Y2htb3ZlPW51bGx9KSxzJiYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLGMsbD97cGFzc2l2ZTohMX06dm9pZCAwKSxzPSExKSx1PVtdLHY9LTEpOihvKCksdT1bXSl9LGV4cG9ydHMuZW5hYmxlQm9keVNjcm9sbD1mdW5jdGlvbih0KXtpZihhKXtpZighdClyZXR1cm4gdm9pZCBjb25zb2xlLmVycm9yKFwiZW5hYmxlQm9keVNjcm9sbCB1bnN1Y2Nlc3NmdWwgLSB0YXJnZXRFbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgd2hlbiBjYWxsaW5nIGVuYWJsZUJvZHlTY3JvbGwgb24gSU9TIGRldmljZXMuXCIpO3Qub250b3VjaHN0YXJ0PW51bGwsdC5vbnRvdWNobW92ZT1udWxsLHU9dS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudCE9PXR9KSxzJiYwPT09dS5sZW5ndGgmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsYyxsP3twYXNzaXZlOiExfTp2b2lkIDApLHM9ITEpfWVsc2UodT11LmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50IT09dH0pKS5sZW5ndGh8fG8oKX19KTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgRkFRc1xuXG4gICAgRkFRcyA9IHtcbiAgICAgICAgc2VjdGlvbnM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYXFzJyksXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgICBpZighRkFRcy5zZWN0aW9ucylcbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgRkFRcy5zZWN0aW9ucy5mb3JFYWNoKHNlY3Rpb24gPT4gRkFRcy5pbml0aWFsaXNlTGlzdGVuZXJzKHNlY3Rpb24pKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdGlhbGlzZUxpc3RlbmVyczogKHNlY3Rpb24pID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGZhcXMgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYXEnKVxuXG4gICAgICAgICAgICBmYXFzLmZvckVhY2goZmFxID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgcXVlc3Rpb24gPSBmYXEucXVlcnlTZWxlY3RvcignLmZhcV9fcXVlc3Rpb24nKVxuICAgICAgICAgICAgICAgIGxldCBhbnN3ZXIgICA9IGZhcS5xdWVyeVNlbGVjdG9yKCcuZmFxX19hbnN3ZXInKVxuXG4gICAgICAgICAgICAgICAgcXVlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgZmFxLmNsYXNzTGlzdC50b2dnbGUoJ2ZhcS0tb3BlbicpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZmFxLmNsYXNzTGlzdC5jb250YWlucygnZmFxLS1vcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlci5zdHlsZS5tYXhIZWlnaHQgPSBhbnN3ZXIuc2Nyb2xsSGVpZ2h0ICsgJ3B4J1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyLnN0eWxlLm1heEhlaWdodCA9IDBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gRkFRc1xuXG59KCkpXG4iLCIvLyBMYXp5TG9hZCBmb3IgUGxvdCBieSBKb24gTWlsbHMsIE1hdHR5IEdsZW4gJiBNaWNoYWVsIFdhdHNvblxuXG4vLyBUaGlzIG1vZHVsZSBsb2FkcyBpbiBpbWFnZXMgYXN5bmNyb25vdXNseS4gSXQgd2lsbCBsb29rIGZvciB0aGUgY2xhc3Ncbi8vIFwiSlMtLWxhenlMb2FkXCIgYW5kIHRoZW4gbG9vayBmb3IgYSBkYXRhLXNyYyBvbiBpbWFnZSBvciB2aWRlbyB0YWdzLiBcbi8vIEl0IHdpbGwgdGhlbiByZXBsYWNlIHRoZSBzcmMgb2YgdGhhdCBlbGVtZW50IHdpdGggdGhlIGltYWdlIGxpbmtlZCBvblxuLy8gdGhlIGRhdGEgYXR0cmlidXRlLlxuXG4vLyBJZiB0aGUgZWxlbWVudCBpcyBub3QgYW4gaW1hZ2Ugb3IgYSB2aWRlby0gaXQgd2lsbCBhc3NpZ24gdGhlIGRhdGEtc3JjXG4vLyBhcyBhIGJhY2tncm91bmQgaW1hZ2UuIFxuXG4vLyBJZiB0aGUgc2NyZWVuIHNpemUgaXMgbGVzcyB0aGFuIHRoZSBkZWZpbmVkIG1vYmlsZUJyZWFrcG9pbnQsIHdlIGxvYWRcbi8vIHRoZSBzcmMgZnJvbSBkYXRhLXNtYWxsLXNyYyBpbnN0ZWFkLiBcblxuLy8gQ3JlYXRpb24gb2YgdGhlc2UgdmlkZW8gYW5kIGltYWdlIG9iamVjdHMgY2FuIGJlIG1hZGUgdXNpbmcgdGhlIFBIUFxuLy8gaGVscGVyIGluIGxpYi9oZWxwZXJzLnBocCBwbG90TGF6eUxvYWQoKVxuXG4vLyBJZiB3ZSBuZWVkIHRvIHN0aXB1bGF0ZSB0aGUgaGVpZ2h0IG9mIGFuIGltYWdlIGJlZm9yZSBpdCBsb2FkcywgdG8gYXZvaWRcbi8vIGFueSBqdW1waW5lc3MsIHdlIGNhbiBwYXNzIHRocm91Z2ggYSByYXRpbyAody9oKSBvZiB0aGUgaW1hZ2Ugc28gaXQnc1xuLy8gc2V0IGJlZm9yZSB0aGUgaW1hZ2UgbG9hZHMuXG5cbi8vIFdlIGFsc28gaGFuZGxlIGF1dG9wbGF5aW5nIHZpZGVvcywgaWYgdGhlIHZpZGVvIGhhcyBhbiBhdXRvcGxheSBhdHRyaWJ1dGUuXG4vLyBJdCB3aWxsIHBhdXNlIGFuZCBwbGF5IHZpZGVvcyBhcHByb3ByaWF0ZWx5IGRlcGVuZGluZyBvbiBpZiB0aGV5J3JlIGluXG4vLyB2aWV3IG9yIG5vdC5cblxuKGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgTGF6eUxvYWRcblxuICAgIExhenlMb2FkID0ge1xuICAgICAgICBtb2JpbGVCcmVha3BvaW50IDogNjQwLFxuICAgICAgICBpbWFnZXMgOiAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1sYXp5TG9hZCcpLFxuICAgICAgICBjb25maWcgOiB7XG4gICAgICAgICAgICByb290TWFyZ2luOiAnMHB4JyxcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC4wMVxuICAgICAgICB9LFxuICAgICAgICBvYnNlcnZlciA6IG51bGwsXG4gICAgICAgIGluaXQgOiBmdW5jdGlvbigpeyBcblxuICAgICAgICAgICAgTGF6eUxvYWQub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoTGF6eUxvYWQuaGFuZGxlSW1hZ2VMb2FkLCBMYXp5TG9hZC5jb25maWcpXG5cbiAgICAgICAgICAgIExhenlMb2FkLmxvYWRJbWFnZXMoKVxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZEltYWdlcyA6ICgpID0+IHsgXG5cbiAgICAgICAgICAgIExhenlMb2FkLmltYWdlcy5mb3JFYWNoKCBpbWFnZSA9PiB7ICBcblxuICAgICAgICAgICAgICAgIExhenlMb2FkLm9ic2VydmVyLm9ic2VydmUoaW1hZ2UpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIGFkZEVsZW1lbnRzIDogZWxlbWVudHMgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaCggaW1hZ2UgPT4geyAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgTGF6eUxvYWQub2JzZXJ2ZXIub2JzZXJ2ZShpbWFnZSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlSW1hZ2VMb2FkIDogZW50cmllcyA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCggZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZW50cnkudGFyZ2V0XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2FkZWQnKSAmJiAhZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xvYWRpbmcnKSkgeyBcblxuICAgICAgICAgICAgICAgICAgICBpZighZW50cnkuaXNJbnRlcnNlY3RpbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZyA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIGVsZW1lbnQudGFnTmFtZVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcmMgPSBlbGVtZW50LmRhdGFzZXQuc3JjXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoTGF6eUxvYWQuaXNTbWFsbFNjcmVlbigpICYmIGVsZW1lbnQuZGF0YXNldC5zbWFsbFNyYykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmMgPSBlbGVtZW50LmRhdGFzZXQuc21hbGxTcmNcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZih0YWcgPT0gXCJWSURFT1wiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKExhenlMb2FkLmlzU21hbGxTY3JlZW4oKSAmJiBlbGVtZW50LmRhdGFzZXQuc21hbGxTcmMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjID0gZWxlbWVudC5kYXRhc2V0LnNtYWxsU3JjXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zcmMgPSBlbGVtZW50LmRhdGFzZXQuc3JjXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBsYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgTGF6eUxvYWQuZ2V0SW1hZ2Uoc3JjLCBlbGVtZW50KS50aGVuKCBkYXRhID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YWcgPSBlbGVtZW50LnRhZ05hbWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRhZyA9PSBcIklNR1wiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5lbGVtZW50LnNyYyA9IGRhdGEuc3JjXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBkYXRhLnNyYyArICcpJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCggZXJyb3JlZFNyYyA9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yZWRTcmMsICdpbWFnZSBub3QgZm91bmQnKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC50YWdOYW1lID09IFwiVklERU9cIikgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhdXRvcGxheScpKSBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFlbnRyeS5pc0ludGVyc2VjdGluZyAmJiBlbGVtZW50LnBhdXNlZCA9PSBmYWxzZSkgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5wYXVzZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5wbGF5KClcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRJbWFnZTogKHNyYywgZWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xuXG4gICAgICAgICAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpXG5cbiAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbWcub25lcnJvciA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IHNyY1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIGlzU21hbGxTY3JlZW4gOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDwgTGF6eUxvYWQubW9iaWxlQnJlYWtwb2ludClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBMYXp5TG9hZFxuXG59KSgpXG5cbiIsIi8vIE1vZGFscyBmb3IgUGxvdCBieSBNaWNoYWVsIFdhdHNvblxuLy8gQSBzaW1wbGUgbW9kYWxzIHNvbHV0aW9uIHRoYXQgbG9va3MgZm9yIHRoZSBjbGFzcyBcIkpTLS1wbG90TW9kYWxCdXR0b25cIlxuLy8gQW5kIHdoZW4gY2xpY2tlZCwgcmVhZHMgdGhlIHZhbHVlIHNldCBvbiBkYXRhLXBsb3QtbW9kYWwuIGl0IHRoZW4gbG9va3Ncbi8vIGZvciBhbiBIVE1MIGVsZW1lbnQgY2FsbGVkIFwiLkpTLS1wbG90TW9kYWxDb250ZW50c1wiIHdpdGggYSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuXG4vLyBGb3IgZXhhbXBsZSwgPGEgY2xhc3M9XCJKUy0tcGxvdE1vZGFsQnV0dG9uXCIgZGF0YS1wbG90LW1vZGFsPVwiMVwiPkNsaWNrIG1lPC9hPlxuLy8gV2lsbCBmaW5kIHRoZSBmb2xsb3dpbmcgZWxlbWVudDpcbi8vIDxkaXYgY2xhc3M9XCJKUy0tcGxvdE1vZGFsQ29udGVudHNcIj5JIGFtIHNvbWUgbW9kYWwgY29udGVudCE8L2Rpdj5cbi8vIEFuZCB3aWxsIHRha2UgdGhlIGlubmVySFRNTCB0byBwdXQgaW5zaWRlIGEgbW9kYWwgb24gdGhlIHNjcmVlbi5cblxuLy8gR2FsbGVyaWVzIGNhbiBiZSBjcmVhdGVkIGJ5IGNvbm5lY3RpbmcgbXVsdGlwbGUgUGxvdCBNb2RhbCBCdXR0b25zXG4vLyBieSBnaXZpbmcgdGhlbSBhIGRhdGEtcGxvdC1tb2RhbC1ncm91cCBvcHRpb24uXG4vLyBUaGV5IHdpbGwgdGhlbiBoYXZlIHdvcmtpbmcgbGVmdCBhbmQgcmlnaHQgYXJyb3dzIHRvIG5hdmlnYXRlIHRocm91Z2hcbi8vIENvbnRlbnRzIGluIGEgbG9vcC5cblxuKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBMYXp5TG9hZCAgICAgICAgID0gcmVxdWlyZSgnLi9sYXp5bG9hZCcpLCAgXG4gICAgICAgIFBsb3QgICAgICAgICAgICAgPSByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICAgICAgQm9keVNjcm9sbExvY2sgICA9IHJlcXVpcmUoJ2JvZHktc2Nyb2xsLWxvY2snKSxcbiAgICAgICAgTW9kYWxzXG5cbiAgICBNb2RhbHMgPSB7XG4gICAgICAgIGN1cnJlbnRHcm91cEl0ZW0gICAgOiAwLFxuICAgICAgICBncm91cExpbmtzICAgICAgICAgIDogW10sICBcbiAgICAgICAgY3VycmVudE1vZGFsSWQgICAgICA6IG51bGwsXG4gICAgICAgIGlzT3BlbiAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgaXNMb2FkaW5nICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBjb250cm9sc1RpbWVyICAgICAgIDogZmFsc2UsXG4gICAgICAgIG1vZGFsQ29udGVudCAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbFJlcGxhY2VDb250ZW50cycpLFxuICAgICAgICBtb2RhbEdyb3VwQ29udHJvbHMgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWxDb250cm9scycpLFxuICAgICAgICBtb2RhbEdyb3VwTmV4dCAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWxDb250cm9sc19fbmV4dCcpLFxuICAgICAgICBtb2RhbEdyb3VwQmFjayAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWxDb250cm9sc19fYmFjaycpLFxuICAgICAgICBwbG90TW9kYWwgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWwnKSxcblxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgTW9kYWxzLmNyZWF0ZUxpc3RlbmVycygpXG4gICAgICAgICAgICBNb2RhbHMuY2hlY2tGb3JNb2RhbE5vdGlmaWNhdGlvbigpXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGNsb3NlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tY2xvc2VQbG90TW9kYWwnKVxuXG4gICAgICAgICAgICBmb3IodmFyIGNsb3NlQnV0dG9uIG9mIGNsb3NlQnV0dG9ucykge1xuICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgTW9kYWxzLmNsb3NlUGxvdE1vZGFsKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgIGlmKE1vZGFscy5jdXJyZW50TW9kYWxJZCAmJiAhUGxvdC5pc1RvdWNoRGV2aWNlKCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihNb2RhbHMuY29udHJvbHNUaW1lcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChNb2RhbHMuY29udHJvbHNUaW1lcilcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlQ29udHJvbHMnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZUNvbnRyb2xzJylcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMuY29udHJvbHNUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZUNvbnRyb2xzJylcblxuICAgICAgICAgICAgICAgICAgICB9LDIyMDApXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZVdyYXAnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXBsb3QtbW9kYWxdJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5vcGVuUGxvdE1vZGFsKGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXBsb3QtbW9kYWxdJykpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZihNb2RhbHMubW9kYWxHcm91cEJhY2spIHtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5tb2RhbEdyb3VwQmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsTW9kYWxzLnRyaWdnZXJCYWNrR3JvdXBJdGVtKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihNb2RhbHMubW9kYWxHcm91cE5leHQpIHtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5tb2RhbEdyb3VwTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsTW9kYWxzLnRyaWdnZXJOZXh0R3JvdXBJdGVtKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKGUud2hpY2ggPT0gMzkgJiYgTW9kYWxzLmdyb3VwTGlua3MubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy50cmlnZ2VyTmV4dEdyb3VwSXRlbSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZS53aGljaCA9PSAzNyAmJiBNb2RhbHMuZ3JvdXBMaW5rcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnRyaWdnZXJCYWNrR3JvdXBJdGVtKClcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihNb2RhbHMuaXNPcGVuICYmIGUud2hpY2g9PTI3KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLmNsb3NlUGxvdE1vZGFsKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cblxuICAgICAgICBjaGVja0Zvck1vZGFsTm90aWZpY2F0aW9uIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb25UcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1mYWtlQnV0dG9uRm9yTW9kYWxOb3RpZmljYXRpb25zJylcblxuICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uVHJpZ2dlcikge1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Bsb3RIYXNOb3RpZmljYXRpb25GaXJlZCcpICE9PSBcIjFcIikgeyBcblxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwbG90SGFzTm90aWZpY2F0aW9uRmlyZWQnLCAnMScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGFscy5vcGVuUGxvdE1vZGFsKG5vdGlmaWNhdGlvblRyaWdnZXIpXG5cbiAgICAgICAgICAgICAgICAgICAgfSxub3RpZmljYXRpb25UcmlnZ2VyLmRhdGFzZXQucGxvdE5vdGlmaWNhdGlvbldhaXQqMTAwMClcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJpZ2dlckJhY2tHcm91cEl0ZW0gOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtLS1cblxuICAgICAgICAgICAgaWYoTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPCAwKSB7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA9IE1vZGFscy5ncm91cExpbmtzLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTW9kYWxzLm9wZW5QbG90TW9kYWwoTW9kYWxzLmdyb3VwTGlua3NbTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW1dKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJpZ2dlck5leHRHcm91cEl0ZW0gOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtKytcblxuICAgICAgICAgICAgaWYoTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPT0gTW9kYWxzLmdyb3VwTGlua3MubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA9IDBcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNb2RhbHMub3BlblBsb3RNb2RhbChNb2RhbHMuZ3JvdXBMaW5rc1tNb2RhbHMuY3VycmVudEdyb3VwSXRlbV0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBvcGVuUGxvdE1vZGFsOiAoZWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICBpZihNb2RhbHMuaXNMb2FkaW5nID09IHRydWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgICAgOiAnaW5saW5lJywgLy8gKGlubGluZXxhamF4KSBpZiB0aGUgY29udGVudCBpcyBhbHJlYWR5IGluIHRoZSBkb20gb3Igbm90XG4gICAgICAgICAgICAgICAgZ3JvdXBJZCAgICAgICAgIDogJycsIC8vVGhlIG9wdGlvbmFsIElEIG9mIHRoZSBncm91cCBvZiBtb2RhbHMgdXNlZCBmb3IgZ2FsbGVyeSB2aWV3c1xuICAgICAgICAgICAgICAgIGNvbnRlbnRzSWQgICAgICA6ICcnLCAvL1RoZSBJRCB0aGF0IHJlZmVyZW5jZXMgd2hlcmUsIG9uIHRoZSBwYWdlLCB0aGUgY29udGVudCB0byB1c2UgbGl2ZXNcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiAnJywgLy9UaGUgdGVtcGxhdGUgcGFydCB0byBsb2FkLCBpZiBBSkFYXG4gICAgICAgICAgICAgICAgYWpheERhdGEgICAgICAgIDoge30sIC8vRGF0YSB0byBzZW5kIHZpYSBBSkFYXG4gICAgICAgICAgICAgICAgbW9kYWxDbGFzcyAgICAgIDogJycgLy9BIGN1c3RvbSBjbGFzcyB0byBhZGQgdG8gb3VyIG1vZGFsXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE1vZGFscy5pc0xvYWRpbmcgPSB0cnVlXG5cbiAgICAgICAgICAgIGlmKGVsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxUeXBlID09ICdhamF4Jykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnR5cGUgPSAnYWpheCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0dGluZ3MuY29udGVudHNJZCAgICAgPSBlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsQ29udGVudHNcbiAgICAgICAgICAgIHNldHRpbmdzLmdyb3VwSWQgICAgICAgID0gZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbEdyb3VwXG4gICAgICAgICAgICBzZXR0aW5ncy50ZW1wbGF0ZVBhcnQgICA9IGVsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxUZW1wbGF0ZVBhcnRcbiAgICAgICAgICAgIHNldHRpbmdzLm1vZGFsQ2xhc3MgICAgID0gZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbENsYXNzXG5cbiAgICAgICAgICAgIGlmKCFzZXR0aW5ncy5jb250ZW50c0lkICYmIHNldHRpbmdzLnR5cGUgPT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5saW5lIE1vZGFscyBuZWVkIGEgcGxvdC1tb2RhbC1jb250ZW50cyB2YXJpYWJsZSBhZGRlZCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnR5cGUgPT0gJ2FqYXgnICYmICFzZXR0aW5ncy50ZW1wbGF0ZVBhcnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWpheCBtb2RhbHMgbmVlZCBhIHBsb3QtbW9kYWwtdGVtcGxhdGUtcGFydCB2YXJpYWJsZSBhZGRlZCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2hlY2sgdG8gc2VlIGlmIGl0J3MgcGFydCBvZiBhIGdyb3VwXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKE1vZGFscy5ncm91cExpbmtzLmxlbmd0aCA9PSAwICYmIHNldHRpbmdzLmdyb3VwSWQpXG4gICAgICAgICAgICAgICBNb2RhbHMuaW5pdGlhbGlzZUdyb3VwKGVsZW1lbnQpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCFzZXR0aW5ncy5ncm91cElkKVxuICAgICAgICAgICAgICAgIE1vZGFscy5tb2RhbEdyb3VwQ29udHJvbHMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuICAgICAgICAgICAgaWYoc2V0dGluZ3MubW9kYWxDbGFzcykge1xuICAgICAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0LmFkZChzZXR0aW5ncy5tb2RhbENsYXNzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy50eXBlID09ICdpbmxpbmUnKSB7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMuY3VycmVudE1vZGFsSWQgPSBzZXR0aW5ncy5jb250ZW50c0lkXG5cbiAgICAgICAgICAgICAgICAvL0ZpbmQgY29udGVudCB0byBpbnNlcnQgaW4gb3VyIG1vZGFsXG4gICAgICAgICAgICAgICAgdmFyIHBsb3RNb2RhbENvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWxDb250ZW50c1tkYXRhLXBsb3QtbW9kYWwtY29udGVudHM9XCInICsgTW9kYWxzLmN1cnJlbnRNb2RhbElkICsgJ1wiXScpXG5cbiAgICAgICAgICAgICAgICBpZighcGxvdE1vZGFsQ29udGVudHMubGVuZ3RoID09IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgICAgICAgcGxvdE1vZGFsQ29udGVudHMgPSBwbG90TW9kYWxDb250ZW50cy5pbm5lckhUTUw7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMucHV0Q29udGVudHNJbnRvTW9kYWwocGxvdE1vZGFsQ29udGVudHMpXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9BSkFYIGxvYWRpbmcgY29udGVudFxuICAgICAgICAgICAgICAgIHZhciBhamF4RGF0YSA9IHt9XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Bsb3RNb2RhbExvYWRpbmdBamF4JylcblxuICAgICAgICAgICAgICAgIGZvcihjb25zdCBrZXkgaW4gZWxlbWVudC5kYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGtleS5zdWJzdHJpbmcoMCwxMykgPT0gJ3Bsb3RNb2RhbERhdGEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhamF4RGF0YVtrZXkuY2hhckF0KDEzKS50b0xvd2VyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxNCldID0gZWxlbWVudC5kYXRhc2V0W2tleV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgYXJncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuT3JXcml0ZSAgIDogJ3JldHVybicsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUGFydCAgICA6IHNldHRpbmdzLnRlbXBsYXRlUGFydCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YSAgICAgICAgICAgIDogYWpheERhdGFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgUGxvdC5sb2FkVGVtcGxhdGVQYXJ0KGFyZ3MpLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5wdXRDb250ZW50c0ludG9Nb2RhbChodG1sKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBwdXRDb250ZW50c0ludG9Nb2RhbCA6IGNvbnRlbnRzID0+ICB7XG5cblxuICAgICAgICAgICAgTW9kYWxzLm1vZGFsQ29udGVudC5zdHlsZS5taW5IZWlnaHQgPSBNb2RhbHMubW9kYWxDb250ZW50LmNsaWVudEhlaWdodCArICdweCdcbiAgICAgICAgICAgIE1vZGFscy5tb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gY29udGVudHNcblxuICAgICAgICAgICAgQm9keVNjcm9sbExvY2suZGlzYWJsZUJvZHlTY3JvbGwoTW9kYWxzLnBsb3RNb2RhbClcblxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwbG90TW9kYWxJblZpZXcnKVxuXG4gICAgICAgICAgICBjb25zdCBuZXdJbWFnZXMgPSBNb2RhbHMubW9kYWxDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpXG5cbiAgICAgICAgICAgIExhenlMb2FkLmFkZEVsZW1lbnRzKG5ld0ltYWdlcykudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5tb2RhbENvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gMFxuXG4gICAgICAgICAgICAgICAgfSw1MClcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29uc3QgbmV3VmlkZW9zID0gTW9kYWxzLm1vZGFsQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCd2aWRlbycpXG5cblxuXG4gICAgICAgICAgICBuZXdWaWRlb3MuZm9yRWFjaCh2aWRlbyA9PntcblxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgTWVkaWFFbGVtZW50UGxheWVyKHZpZGVvLC8qIE9wdGlvbnMgKi8pO1xuICAgICAgICAgICAgICAgIHBsYXllci5wbGF5KCk7XG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIE1vZGFscy5pc09wZW4gPSB0cnVlXG4gICAgICAgICAgICBNb2RhbHMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGxvdE1vZGFsTG9hZGluZ0FqYXgnKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdGlhbGlzZUdyb3VwIDogKGVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgTW9kYWxzLmdyb3VwTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbG90LW1vZGFsLWdyb3VwPVwiJytlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsR3JvdXArJ1wiXScpXG5cbiAgICAgICAgICAgIHZhciBpID0gMFxuXG4gICAgICAgICAgICBmb3IodmFyIGdyb3VwTGluayBvZiBNb2RhbHMuZ3JvdXBMaW5rcykge1xuXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudCA9PSBncm91cExpbmspXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtID0gaTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpKytcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihNb2RhbHMuY3VycmVudE1vZGFsSWQgJiYgIVBsb3QuaXNUb3VjaERldmljZSgpKVxuXG4gICAgICAgICAgICAgICAgTW9kYWxzLmNvbnRyb2xzVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZUNvbnRyb2xzJylcblxuICAgICAgICAgICAgICAgIH0sMzAwMClcblxuICAgICAgICAgICAgTW9kYWxzLm1vZGFsR3JvdXBDb250cm9scy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xvc2VQbG90TW9kYWw6ICgpID0+IHtcbiAgICBcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGxvdE1vZGFsSW5WaWV3JylcblxuICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRNb2RhbElkID0gbnVsbFxuXG4gICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdCA9ICdKUy0tcGxvdE1vZGFsIHBsb3RNb2RhbCdcblxuICAgICAgICAgICAgTW9kYWxzLmdyb3VwTGlua3MgPSBbXVxuXG4gICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA9IDBcblxuICAgICAgICAgICAgTW9kYWxzLm1vZGFsQ29udGVudC5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBCb2R5U2Nyb2xsTG9jay5lbmFibGVCb2R5U2Nyb2xsKE1vZGFscy5wbG90TW9kYWwpXG5cbiAgICAgICAgICAgIE1vZGFscy5pc09wZW4gPSBmYWxzZVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IE1vZGFsc1xuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBTbW9vdGg7XG5cbiAgU21vb3RoID0ge1xuXG4gICAgdHJhY2tlZEVsZW1lbnRzT2JzZXJ2ZXIgOiBudWxsLFxuICAgIHN0YW5kYXJkU2Nyb2xsRnJhbWVzT2JzZXJ2ZXIgOiBudWxsLFxuXG4gICAgbWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lIDogbnVsbCxcblxuICAgIGN1cnJlbnRQb3NpdGlvbiA6IDAsXG5cbiAgICBtdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgOiBudWxsLFxuXG4gICAgb25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA6IG51bGwsXG5cbiAgICBlYXNlIDogMC4wNyxcblxuICAgIGxhc3RQb3NpdGlvbiA6IDAsXG5cbiAgICBvblNjcm9sbCA6IG51bGwsXG5cbiAgICBzdGFuZGFyZFNjcm9sbCA6IGZhbHNlLFxuXG4gICAgc2Nyb2xsRWxlbWVudHMgOiBbXSxcblxuICAgIHRvcEJhckhlaWdodCA6IDAsXG5cbiAgICBzY3JvbGxGcmFtZXMgOiBbXSxcblxuICAgIHRpY2tpbmcgOiBmYWxzZSxcblxuICAgIGRvbSA6IHtcbiAgICAgICAgICAgIHNjcm9sbFdpbmRvdyAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbF0nKSxcbiAgICAgICAgICAgIHNjcm9sbEZyYW1lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbC1mcmFtZV0nKSxcbiAgICAgICAgICAgIHNjcm9sbEVsZW1lbnRzICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbC1lbGVtZW50XScpLFxuICAgICAgICAgICAgdG9wQmFyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLXRvcGJhcicpXG4gICAgICAgICAgfSxcblxuICAgIHdpbmRvd0hlaWdodCA6IHdpbmRvdy5pbm5lckhlaWdodCwgXG5cbiAgICB3aW5kb3dXaWR0aCA6IHdpbmRvdy5pbm5lcldpZHRoLFxuXG4gICAgaW5pdDogc2V0dGluZ3MgPT4ge1xuXG4gICAgICAvL292ZXJyaWRlIGFueSBkZWZhdWx0IHNldHRpbmdzIHdpdGggcGFzc2VkIHBhcmFtZXRlcnNcbiAgICAgIFNtb290aC5zZXRTZXR0aW5ncyhzZXR0aW5ncylcblxuICAgICAgaWYoIVNtb290aC5zdGFuZGFyZFNjcm9sbCkge1xuXG4gICAgICAgIC8vU2V0IG91ciBjdXJyZW50IGFuZCBsYXN0IHBvc2l0aW9ucyBcbiAgICAgICAgLy90byB0aGUgY3VycmVudCBzY3JvbGwgWSBwb3NpdGlvbiwgaW4gY2FzZVxuICAgICAgICAvL3dlIGFyZSBzY3JvbGxlZCBkb3duIHRoZSBwYWdlIG9uIGxvYWRcbiAgICAgICAgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiAgICA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICAgIFNtb290aC5sYXN0UG9zaXRpb24gICAgICAgPSB3aW5kb3cuc2Nyb2xsWVxuXG4gICAgICAgIC8vUHV0IGZpeGVkIG9udG8gdGhlIHdob2xlIHNpdGUgcmVhZHkgdG8gXG4gICAgICAgIC8vaW50ZXJjZXB0IHNjcm9sbGluZ1xuICAgICAgICBTbW9vdGguc2V0U3R5bGVzKClcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgU21vb3RoLnJlZnJlc2gsIHsgcGFzc2l2ZTogdHJ1ZSB9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgU21vb3RoLnNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pXG5cbiAgICAgICAgLy9SZWFkIHRocm91Z2ggZWFjaCBzY3JvbGwgZnJhbWUgYW5kIHNldCBkYXRhXG4gICAgICAgIC8vaW50byBhIHNpbmdsZSBhcnJheSBmb3IgcHJvY2Vzc2luZyBsYXRlclxuICAgICAgICAvL3tcbiAgICAgICAgLy8gICAgICBlbGVtZW50ICAgICAgICAgICA6IGVsZW1lbnQsICAgICAgKHRoZSBkb20gZWxlbWVudClcbiAgICAgICAgLy8gICAgICB0b3AgICAgICAgICAgICAgICA6IDEwMCwgICAgICAgICAgKHRoZSBvZmZzZXQgdG9wIHZhbHVlIHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIGhlaWdodCAgICAgICAgICAgIDogMzAwLCAgICAgICAgICAodGhlIGhlaWdodCBvZiB0aGUgZWxlbWVudCB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBib3R0b20gICAgICAgICAgICA6IDQwMCwgICAgICAgICAgKHRoZSBvZmZzZXQgYm90dG9tIHBvc2l0aW9uIHZhbHVlIHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIHN0aWNreSAgICAgICAgICAgIDogZmFsc2UsICAgICAgICAoaWYgdGhlIGVsZW1lbnQgc2hvdWxkIGJlaGF2ZSBsaWtlIENTUyBzdGlja3kgb3Igbm90KVxuICAgICAgICAvLyAgICAgIHBhcmVudEJvdHRvbSAgICAgIDogZmFsc2UgfHwgNTAwICAoaWYgdGhlIGVsZW1lbnQgaXMgc3RpY2t5LCByZXR1cm4gdGhlIGJvdHRvbSBwb3NpdGlvbiBvZiBpdHMgcGFyZW50IGluIHBpeGVscyAod2hlbiBpdCBzaG91bGQgdW5zdGljaykpXG4gICAgICAgIC8vICB9XG4gICAgICAgIFNtb290aC5zZXRTY3JvbGxGcmFtZURhdGEoKVxuXG4gICAgICB9XG5cbiAgICAgIC8vSWYgYW55IHNjcm9sbCBlbGVtZW50cyBleGlzdCwgd2UgY2FuIGFkZCB0aGVtIGFuZCBtb25pdG9yIHRoZW1cbiAgICAgIGlmKFNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMpIHtcbiAgICAgICAgLy9SZWFkIHRocm91Z2ggZWFjaCBzY3JvbGwgZWxlbWVudCBhbmQgc2V0IGRhdGFcbiAgICAgICAgLy9pbnRvIGEgc2luZ2xlIGFycmF5IGZvciBwcm9jZXNzaW5nIGxhdGVyXG4gICAgICAgIC8ve1xuICAgICAgICAvLyAgICAgIGVsZW1lbnQgICAgICAgICA6IGVsZW1lbnQsICAgICAgICAgICh0aGUgZG9tIGVsZW1lbnQpXG4gICAgICAgIC8vICAgICAgdG9wICAgICAgICAgICAgIDogMTAwLCAgICAgICAgICAgICAgKHRoZSBvZmZzZXQgdG9wIHZhbHVlIHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIGhlaWdodCAgICAgICAgICA6IDMwMCwgICAgICAgICAgICAgICh0aGUgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIGJvdHRvbSAgICAgICAgICA6IDQwMCwgICAgICAgICAgICAgICh0aGUgb2Zmc2V0IGJvdHRvbSBwb3NpdGlvbiB2YWx1ZSB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBpc1Zpc2libGUgICAgICAgOiBmYWxzZSwgICAgICAgICAgICAoaWYgdGhlIGVsZW1lbnQgaXMgY3VycmVudGx5IGluIHRoZSB3aW5kb3cgZnJhbWUgb3Igbm90KVxuICAgICAgICAvLyAgICAgIGluaXRpYWxPZmZzZXQgICA6IC4yLCAgICAgICAgICAgICAgIChob3cgZmFyIGF3YXkgdGhpcyBlbGVtZW50IGlzIGZyb20gdGhlIGluaXRpYWwgY2VudGVyIG9mIHRoZSBzY3JlZW4pXG4gICAgICAgIC8vICAgICAgY3VycmVudFBvc2l0aW9uIDogMCAgICAgICAgICAgICAgICAgKGhvdyBmYXIgdXAgdGhlIHZpZXdwb3J0IHRoaXMgZWxlbWVudCBjdXJyZW50bHkgaXMgKGJldHdlZW4gLTEgYW5kIDEpKVxuICAgICAgICAvLyAgICAgIGNhbGxiYWNrICAgICAgICA6ICdmdW5jdGlvbi5uYW1lJyAgICh0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uIHlvdSBjYW4gY2FsbCB3aGVuIHRoaXMgbW92ZXMgd2l0aGluIHZpZXcpXG4gICAgICAgIC8vIH1cbiAgICAgICAgU21vb3RoLnRyYWNrZWRFbGVtZW50c09ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFNtb290aC50cmFja1Zpc2libGVFbGVtZW50cywge3Jvb3RNYXJnaW46ICcwcHgnLHRocmVzaG9sZDogMC4wMX0pXG4gICAgICAgIFNtb290aC5zZXRTY3JvbGxFbGVtZW50RGF0YSgpXG4gICAgICB9XG5cbiAgICAgIC8vU2V0IHVwIGEgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gbGlzdGVuIG91dCBmb3IgY2hhbmdlcyBpbiBoZWlnaHQsXG4gICAgICAvL3RvIGFkanVzdCBvdXIgaGVpZ2h0IG9mIGRvY3VtZW50IGFjY29yZGluZ2x5XG4gICAgICBTbW9vdGguaW5pdE11dGF0aW9uT2JzZXJ2ZXIoKVxuXG4gICAgICAvL0lmIHRoZXJlJ3MgYSBmaXhlZCB0b3BiYXIgb24gdGhpcyBzaXRlLCB3ZSBjYW4gc2V0IHRoZSBoZWlnaHRcbiAgICAgIC8vaGVyZSwgaW4gb3JkZXIgdG8gb2Zmc2V0IGFueSBzdGlja3kgcG9zaXRpb25zLiBcbiAgICAgIFNtb290aC5zZXRUb3BCYXJIZWlnaHQoKVxuXG4gICAgICAvL0lmIGl0J3Mgbm90IHN0YW5kYXJkIHNjcm9sbCwgc2V0IG91ciBpbml0aWFsIHNjcm9sbCBmcmFtZSBwb3NpdGlvbnNcbiAgICAgIGlmKCFTbW9vdGguc3RhbmRhcmRTY3JvbGwpIHtcbiAgICAgICAgU21vb3RoLnNldFBvc2l0aW9uT2ZGcmFtZXMoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIFNtb290aC5zdGFuZGFyZFNjcm9sbEZyYW1lc09ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFNtb290aC50cmFja1N0YW5kYXJkU2Nyb2xsRnJhbWVzLCB7cm9vdE1hcmdpbjogJzBweCcsdGhyZXNob2xkOiAwLjAxfSlcbiAgICAgICAgIGZvcihsZXQgZnJhbWUgb2YgU21vb3RoLmRvbS5zY3JvbGxGcmFtZXMpIHtcbiAgICAgICAgICAgIFNtb290aC5zdGFuZGFyZFNjcm9sbEZyYW1lc09ic2VydmVyLm9ic2VydmUoZnJhbWUpXG4gICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vU2V0IG91ciBwb3NpdGlvbiBvZiBhbnkgc2Nyb2xsIGVsZW1lbnRzXG4gICAgICBTbW9vdGgucG9zaXRpb25TY3JvbGxFbGVtZW50cygpXG5cbiAgICB9LFxuXG4gICAgc2V0U2V0dGluZ3MgOiBzZXR0aW5ncyA9PiB7XG5cbiAgICAgIGlmKCFzZXR0aW5ncylcbiAgICAgICAgcmV0dXJuIHRydWVcblxuICAgICAgaWYodHlwZW9mKHNldHRpbmdzLm9uU2Nyb2xsKSA9PSAnZnVuY3Rpb24nKVxuICAgICAgICBTbW9vdGgub25TY3JvbGwgPSBzZXR0aW5ncy5vblNjcm9sbFxuICAgICAgXG4gICAgICBpZihzZXR0aW5ncy5zdGFuZGFyZFNjcm9sbCA9PSB0cnVlKVxuICAgICAgICBTbW9vdGguc3RhbmRhcmRTY3JvbGwgPSB0cnVlXG5cbiAgICAgIGlmKHNldHRpbmdzLmVhc2UpIFxuICAgICAgICBTbW9vdGguZWFzZSA9IHNldHRpbmdzLmVhc2VcbiAgICAgIFxuICAgIH0sXG5cbiAgICByZXRyaWdnZXJXaW5kb3dTaXplT25NdXRhdGUgOiAobXV0YXRpb25zTGlzdCwgb2JzZXJ2ZXIpID0+IHsgXG5cbiAgICAgIGlmKCFTbW9vdGgubXV0YXRpb25PYnNlcnZlckRlYm91bmNlKSB7XG5cbiAgICAgICAgU21vb3RoLm11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZVxuXG4gICAgICAgICAgICBTbW9vdGguc2Nyb2xsRnJhbWVzLmZvckVhY2goZnJhbWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGZyYW1lLmhlaWdodCAhPSBmcmFtZS5lbGVtZW50LmNsaWVudEhlaWdodClcbiAgICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZihjaGFuZ2VkID09IHRydWUpIFxuICAgICAgICAgICAgICBTbW9vdGgucmVmcmVzaCgpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChTbW9vdGgubXV0YXRpb25PYnNlcnZlckRlYm91bmNlKVxuICAgICAgICAgICAgU21vb3RoLm11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSA9IG51bGxcblxuICAgICAgICB9LDIwMClcblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIGluaXRNdXRhdGlvbk9ic2VydmVyIDogKCkgPT4ge1xuXG4gICAgICBmb3IodmFyIHNjcm9sbEZyYW1lIG9mIFNtb290aC5kb20uc2Nyb2xsRnJhbWVzKSB7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihTbW9vdGgucmV0cmlnZ2VyV2luZG93U2l6ZU9uTXV0YXRlKVxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHNjcm9sbEZyYW1lLCB7XG4gICAgICAgICAgY2hpbGRMaXN0ICAgOiB0cnVlLFxuICAgICAgICAgIGF0dHJpYnV0ZXMgIDogdHJ1ZSxcbiAgICAgICAgICBzdWJ0cmVlICAgICA6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBkZXN0cm95IDogKCkgPT4ge1xuXG4gICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHMuZm9yRWFjaChlbnRyeSA9PntcbiAgICAgICAgZW50cnkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJylcbiAgICAgIH0pXG5cbiAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMuZm9yRWFjaChlbnRyeSA9PntcbiAgICAgICAgZW50cnkuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJylcbiAgICAgIH0pXG5cbiAgICAgIFNtb290aC50cmFja2VkRWxlbWVudHNPYnNlcnZlciA9IG51bGxcbiAgICAgIFNtb290aC5tYWluU2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSBudWxsXG4gICAgICBTbW9vdGguY3VycmVudFBvc2l0aW9uID0gMFxuICAgICAgU21vb3RoLm11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSA9IG51bGxcbiAgICAgIFNtb290aC5vblNjcm9sbENhbGxiYWNrVGhyb3R0bGVyID0gbnVsbFxuICAgICAgU21vb3RoLmVhc2UgPSAwLjA3XG4gICAgICBTbW9vdGgubGFzdFBvc2l0aW9uID0gMFxuICAgICAgU21vb3RoLm9uU2Nyb2xsID0gbnVsbFxuICAgICAgU21vb3RoLnN0YW5kYXJkU2Nyb2xsID0gZmFsc2VcbiAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50cyA9IFtdXG4gICAgICBTbW9vdGgudG9wQmFySGVpZ2h0ID0gMFxuICAgICAgU21vb3RoLnNjcm9sbEZyYW1lcyA9IFtdXG4gICAgICBTbW9vdGgudGlja2luZyA9IGZhbHNlXG4gICAgICBTbW9vdGguZG9tLnNjcm9sbFdpbmRvdy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJylcblxuICAgIH0sXG5cbiAgICBhZGRFbGVtZW50cyA6IChlbGVtZW50cykgPT4ge1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xuXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKCBlbGVtZW50ID0+IHsgICAgICAgXG4gICAgICAgICAgICAgICAgU21vb3RoLnRyYWNrZWRFbGVtZW50c09ic2VydmVyLm9ic2VydmUoZWxlbWVudClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJlc29sdmUoKVxuXG4gICAgICB9KVxuXG4gICAgfSxcblxuICAgIHNjcm9sbFRvIDogKGVsZW1lbnQpID0+IHtcbiAgICAgIFxuICAgICAgd2luZG93LnNjcm9sbFRvKDAsU21vb3RoLmV4YWN0UG9zaXRpb25PZkVsZW1lbnQoZWxlbWVudCkgLSAxMDApXG5cbiAgICAgIGlmKFNtb290aC5zdGFuZGFyZFNjcm9sbCAhPSBmYWxzZSkge1xuICAgICAgICBTbW9vdGgudGlja2luZyA9IHRydWVcbiAgICAgICAgU21vb3RoLm1haW5TY3JvbGxBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShTbW9vdGgucnVuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRTY3JvbGxFbGVtZW50RGF0YSA6ICgpID0+IHtcblxuICAgICAgU21vb3RoLmRvbS5zY3JvbGxFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbC1lbGVtZW50XScpXG4gICAgICBTbW9vdGguYWRkRWxlbWVudHMoU21vb3RoLmRvbS5zY3JvbGxFbGVtZW50cykgXG5cbiAgICAgIGlmKCFTbW9vdGguZG9tLnNjcm9sbEVsZW1lbnRzKVxuICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzID0gW11cbiAgICBcbiAgICAgIFNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMuZm9yRWFjaCggKGVsZW1lbnQsaSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRUb3AgPSBTbW9vdGguZXhhY3RQb3NpdGlvbk9mRWxlbWVudChlbGVtZW50KVxuXG4gICAgICAgIHZhciBoZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodFxuXG4gICAgICAgIHZhciBjYWxsYmFjayAgPSBmYWxzZSxcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IC0xLFxuICAgICAgICAgICAgdG9WYWx1ZSAgID0gMVxuXG4gICAgICAgIC8vSXMgYW55dGhpbmcgc2V0IG9uIHRoaXMgZWxlbWVudCBhcyBhIGNhbGxiYWNrP1xuICAgICAgICBpZihlbGVtZW50LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbEVsZW1lbnQpIHtcblxuICAgICAgICAgIGxldCBjID0gZWxlbWVudC5kYXRhc2V0LnBsb3RTbW9vdGhTY3JvbGxFbGVtZW50XG5cbiAgICAgICAgICAvL0ZpcnN0IHVwIC0gaGF2ZSB2YWx1ZXMgYmVlbiBwYXNzZWQgdG8gdGhpcyBjYWxsYmFjayBpbiB0aGlzIGZvcm06IGNhbGxiYWNrKDIsNSlcbiAgICAgICAgICBsZXQgdmFsdWVzID0gYy5zdWJzdHJpbmcoIGMuaW5kZXhPZiggJygnICkgKyAxLCBjLmluZGV4T2YoICcpJyApIClcbiAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuc3BsaXQoJywnKVxuXG4gICAgICAgICAgLy9WYWxpZCBpZiB3ZSBoYXZlIDIsIGFuZCBmcm9tIGlzIGxlc3MgdGhhdCB0byB2YWx1ZVxuICAgICAgICAgIGlmKHZhbHVlcy5sZW5ndGggPT0gMiAmJiB2YWx1ZXNbMF0gPCB2YWx1ZXNbMV0pIHtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IE51bWJlcih2YWx1ZXNbMF0pXG4gICAgICAgICAgICB0b1ZhbHVlID0gTnVtYmVyKHZhbHVlc1sxXSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcG90ZW50aWFsRnVuY3Rpb24gPSB3aW5kb3dbY11cblxuICAgICAgICAgIGlmICh0eXBlb2YgcG90ZW50aWFsRnVuY3Rpb24gPT09IFwiZnVuY3Rpb25cIikge1xuXG4gICAgICAgICAgICBjYWxsYmFjayA9IHBvdGVudGlhbEZ1bmN0aW9uLnJlcGxhY2UoL1xccypcXCguKj9cXClcXHMqL2csICcnKVxuXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja1NwbGl0ID0gYy5yZXBsYWNlKC9cXHMqXFwoLio/XFwpXFxzKi9nLCAnJykuc3BsaXQoJy4nKVxuXG4gICAgICAgICAgICBpZihjYWxsYmFja1NwbGl0Lmxlbmd0aCA9PSAyKSB7XG5cbiAgICAgICAgICAgICAgcG90ZW50aWFsRnVuY3Rpb24gPSB3aW5kb3dbY2FsbGJhY2tTcGxpdFswXV1bY2FsbGJhY2tTcGxpdFsxXV1cblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHBvdGVudGlhbEZ1bmN0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHBvdGVudGlhbEZ1bmN0aW9uXG4gICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluaXRpYWxPZmZzZXQgPSAwXG5cbiAgICAgICAgaWYoZWxlbWVudFRvcCA8IFNtb290aC53aW5kb3dIZWlnaHQpXG4gICAgICAgICAgaW5pdGlhbE9mZnNldCA9IChlbGVtZW50VG9wICsgaGVpZ2h0KSAvIChTbW9vdGgud2luZG93SGVpZ2h0ICsgaGVpZ2h0KSAqICh0b1ZhbHVlIC0gZnJvbVZhbHVlKSArIGZyb21WYWx1ZVxuXG5cbiAgICAgICAgXG4gICAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50c1tpXSA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQgICAgICAgICA6IGVsZW1lbnQsXG4gICAgICAgICAgICB0b3AgICAgICAgICAgICAgOiBlbGVtZW50VG9wLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICAgICAgIDogaGVpZ2h0LFxuICAgICAgICAgICAgYm90dG9tICAgICAgICAgIDogZWxlbWVudFRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgaXNWaXNpYmxlICAgICAgIDogZWxlbWVudFRvcCA8IFNtb290aC5jdXJyZW50UG9zaXRpb24gKyBTbW9vdGgud2luZG93SGVpZ2h0ICYmIGVsZW1lbnRUb3AgKyBoZWlnaHQgPiBTbW9vdGguY3VycmVudFBvc2l0aW9uLFxuICAgICAgICAgICAgaW5pdGlhbE9mZnNldCAgIDogaW5pdGlhbE9mZnNldCxcbiAgICAgICAgICAgIGNhbGxiYWNrICAgICAgICA6IGNhbGxiYWNrLFxuICAgICAgICAgICAgZnJvbVZhbHVlICAgICAgIDogZnJvbVZhbHVlLFxuICAgICAgICAgICAgdG9WYWx1ZSAgICAgICAgIDogdG9WYWx1ZSxcbiAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbiA6IDBcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudElkID0gaVxuXG4gICAgICB9KVxuXG5cbiAgICB9LFxuXG4gICAgc2V0VG9wQmFySGVpZ2h0IDogKCkgPT4ge1xuXG4gICAgICBpZihTbW9vdGguZG9tLnRvcEJhcilcbiAgICAgICAgU21vb3RoLnRvcEJhckhlaWdodCA9IFNtb290aC5kb20udG9wQmFyLmNsaWVudEhlaWdodFxuXG4gICAgfSxcblxuICAgIHNldFNjcm9sbEZyYW1lRGF0YSA6ICgpID0+IHtcblxuICAgICAgU21vb3RoLmRvbS5zY3JvbGxGcmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGwtZnJhbWVdJylcblxuICAgICAgU21vb3RoLnNjcm9sbEZyYW1lcyA9IFtdXG4gICAgICB2YXIgbmV3SGVpZ2h0ID0gMFxuXG4gICAgICBTbW9vdGguZG9tLnNjcm9sbEZyYW1lcy5mb3JFYWNoKCBlbGVtZW50ID0+IHtcblxuICAgICAgICBjb25zdCBlbGVtZW50VG9wID0gU21vb3RoLmV4YWN0UG9zaXRpb25PZkVsZW1lbnQoZWxlbWVudClcblxuICAgICAgICBTbW9vdGguc2Nyb2xsRnJhbWVzLnB1c2goe1xuICAgICAgICAgICAgZWxlbWVudCAgICAgICAgICAgOiBlbGVtZW50LFxuICAgICAgICAgICAgdG9wICAgICAgICAgICAgICAgOiBlbGVtZW50VG9wLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICAgICAgICAgOiBlbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgIGJvdHRvbSAgICAgICAgICAgIDogZWxlbWVudFRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgc3RpY2t5ICAgICAgICAgICAgOiB0eXBlb2YoZWxlbWVudC5kYXRhc2V0LnBsb3RTbW9vdGhTY3JvbGxTdGlja3kpICE9ICd1bmRlZmluZWQnID8gdHJ1ZSA6IGZhbHNlLCBcbiAgICAgICAgICAgIHBhcmVudEJvdHRvbSAgICAgIDogZWxlbWVudC5wYXJlbnRFbGVtZW50ID8gU21vb3RoLmV4YWN0UG9zaXRpb25PZkVsZW1lbnQoZWxlbWVudC5wYXJlbnRFbGVtZW50KSArIGVsZW1lbnQucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgOiBmYWxzZVxuICAgICAgICB9KVxuXG4gICAgICB9KVxuXG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmhlaWdodCA9IGAke1Ntb290aC5kb20uc2Nyb2xsV2luZG93LnNjcm9sbEhlaWdodH1weGBcblxuICAgIH0sXG5cbiAgICB0cmFja1Zpc2libGVFbGVtZW50cyA6IChlbnRyaWVzKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCggZW50cnkgPT4ge1xuXG4gICAgICAgICAgaWYoZW50cnkuaXNJbnRlcnNlY3RpbmcgJiYgZW50cnkpIHtcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdwbG90U21vb3RoU2Nyb2xsSW5WaWV3JywncGxvdFNtb290aFNjcm9sbFNlZW5PbmNlJylcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgncGxvdFNtb290aFNjcm9sbEluVmlldycpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoU21vb3RoLnNjcm9sbEVsZW1lbnRzW2VudHJ5LnRhcmdldC5kYXRhc2V0LnBsb3RTbW9vdGhTY3JvbGxFbGVtZW50SWRdKVxuICAgICAgICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzW2VudHJ5LnRhcmdldC5kYXRhc2V0LnBsb3RTbW9vdGhTY3JvbGxFbGVtZW50SWRdLmlzVmlzaWJsZSA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nXG5cblxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICB0cmFja1N0YW5kYXJkU2Nyb2xsRnJhbWVzIDogKGVudHJpZXMpID0+IHtcbiAgICAgICBcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKCBlbnRyeSA9PiB7XG5cbiAgICAgICAgICBpZihlbnRyeS5pc0ludGVyc2VjdGluZyAmJiBlbnRyeSkge1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycsJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZVNlZW5PbmNlJylcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgncGxvdFNtb290aFNjcm9sbEZyYW1lSW5WaWV3JylcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgcmVmcmVzaCA6ICgpID0+IHtcbiAgICAgIGlmKFNtb290aC5zdGFuZGFyZFNjcm9sbClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIFxuICAgICAgU21vb3RoLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgU21vb3RoLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgIFNtb290aC5zZXRTY3JvbGxFbGVtZW50RGF0YSgpXG4gICAgICBTbW9vdGguc2V0U2Nyb2xsRnJhbWVEYXRhKClcbiAgICAgIFNtb290aC5zZXRUb3BCYXJIZWlnaHQoKVxuICAgICAgU21vb3RoLnNjcm9sbCgpXG4gICAgfSxcblxuICAgIHJ1biA6ICgpID0+IHtcblxuICAgICAgU21vb3RoLmxhc3RQb3NpdGlvbiA9IFNtb290aC5sZXJwKFNtb290aC5sYXN0UG9zaXRpb24sIFNtb290aC5jdXJyZW50UG9zaXRpb24sIFNtb290aC5lYXNlKVxuXG4gICAgICBpZiAoU21vb3RoLmxhc3RQb3NpdGlvbiA8IC4xKVxuICAgICAgICBTbW9vdGgubGFzdFBvc2l0aW9uID0gMFxuICAgICBcbiAgICAgIGxldCBkaWZmID0gU21vb3RoLmN1cnJlbnRQb3NpdGlvbiAtIFNtb290aC5sYXN0UG9zaXRpb25cblxuICAgICAgaWYoTWF0aC5hYnMoZGlmZikgPCAwLjUpIHtcbiAgICAgICAgU21vb3RoLnRpY2tpbmcgPSBmYWxzZVxuICAgICAgICBkaWZmID0gMFxuICAgICAgfVxuXG4gICAgICB2YXIgdmVsb2NpdHkgPSBkaWZmIC8gU21vb3RoLndpbmRvd1dpZHRoXG5cbiAgICAgIFNtb290aC5zZXRQb3NpdGlvbk9mRnJhbWVzKClcblxuICAgICAgU21vb3RoLmZpcmVPblNjcm9sbEV2ZW50KHZlbG9jaXR5KVxuXG4gICAgICBTbW9vdGgucG9zaXRpb25TY3JvbGxFbGVtZW50cygpXG5cbiAgICAgIGlmKFNtb290aC50aWNraW5nID09IHRydWUpXG4gICAgICAgIFNtb290aC5tYWluU2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoU21vb3RoLnJ1bilcbiAgICAgIFxuXG4gICAgfSxcblxuICAgIHBvc2l0aW9uU2Nyb2xsRWxlbWVudHMgOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50cy5mb3JFYWNoKGVudHJ5ID0+IHtcblxuICAgICAgICAgIGlmKGVudHJ5LmlzVmlzaWJsZSA9PSB0cnVlICYmIGVudHJ5LmNhbGxiYWNrKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IChlbnRyeS50b3AgLSBTbW9vdGgubGFzdFBvc2l0aW9uICsgZW50cnkuaGVpZ2h0KSAvIChTbW9vdGgud2luZG93SGVpZ2h0ICsgZW50cnkuaGVpZ2h0KSAqIChlbnRyeS50b1ZhbHVlIC0gZW50cnkuZnJvbVZhbHVlKSArIGVudHJ5LmZyb21WYWx1ZSAtIGVudHJ5LmluaXRpYWxPZmZzZXRcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoZW50cnkuY3VycmVudFBvc2l0aW9uICE9IGN1cnJlbnRQb3NpdGlvbikge1xuXG4gICAgICAgICAgICAgIGVudHJ5LmN1cnJlbnRQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvblxuXG4gICAgICAgICAgICAgIGVudHJ5LmNhbGxiYWNrKGVudHJ5LmVsZW1lbnQsY3VycmVudFBvc2l0aW9uKVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIH0pXG5cbiAgICB9LFxuXG4gICAgZmlyZU9uU2Nyb2xsRXZlbnQgOiAodmVsb2NpdHkpID0+IHtcblxuICAgICAgaWYodHlwZW9mKFNtb290aC5vblNjcm9sbCkgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgXG4gICAgICAgIGlmKFNtb290aC5vblNjcm9sbENhbGxiYWNrVGhyb3R0bGVyID09PSBudWxsKSB7XG5cbiAgICAgICAgICBTbW9vdGgub25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgU21vb3RoLm9uU2Nyb2xsKFNtb290aC5kb20uc2Nyb2xsRnJhbWVzLHZlbG9jaXR5KVxuICAgICAgICAgICAgU21vb3RoLm9uU2Nyb2xsQ2FsbGJhY2tUaHJvdHRsZXIgPSBudWxsXG5cbiAgICAgICAgICB9LDUwKVxuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBzZXRQb3NpdGlvbk9mRnJhbWVzIDogKCkgPT4ge1xuXG4gICAgICBmb3IodmFyIHNjcm9sbEZyYW1lIG9mIFNtb290aC5zY3JvbGxGcmFtZXMpIHtcblxuICAgICAgICAgIHZhciB3aW5kb3dTY3JvbGxQb3NpdGlvbiA9IFNtb290aC5sYXN0UG9zaXRpb25cblxuICAgICAgICAgIGlmKHNjcm9sbEZyYW1lLnN0aWNreSAmJiBzY3JvbGxGcmFtZS5wYXJlbnRCb3R0b20pIHtcbiAgICAgICAgICAgIHdpbmRvd1Njcm9sbFBvc2l0aW9uID0gU21vb3RoLmNhbGNQb3NpdGlvbk9mU3RpY2t5RWxlbWVudChzY3JvbGxGcmFtZSwgd2luZG93U2Nyb2xsUG9zaXRpb24pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYod2luZG93U2Nyb2xsUG9zaXRpb24gPiBzY3JvbGxGcmFtZS5ib3R0b20gfHwgd2luZG93U2Nyb2xsUG9zaXRpb24gKyBTbW9vdGgud2luZG93SGVpZ2h0IDwgc2Nyb2xsRnJhbWUudG9wKSB7XG4gICAgICAgICAgICBzY3JvbGxGcmFtZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycpXG4gICAgICAgICAgICBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Nyb2xsRnJhbWUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnLCdwbG90U21vb3RoU2Nyb2xsRnJhbWVTZWVuT25jZScpXG4gICAgICAgICAgICBzY3JvbGxGcmFtZS5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgwLCAtJHt3aW5kb3dTY3JvbGxQb3NpdGlvbn1weCwgMClgXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBzY3JvbGwgOiAoKSA9PiB7XG4gICAgICBTbW9vdGguY3VycmVudFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFlcbiAgICAgIGlmKFNtb290aC50aWNraW5nID09IGZhbHNlKSB7XG4gICAgICAgIFNtb290aC50aWNraW5nID0gdHJ1ZVxuICAgICAgICBTbW9vdGgubWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFNtb290aC5ydW4pIFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRTdHlsZXMgOiAoKSA9PiB7XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oU21vb3RoLmRvbS5zY3JvbGxXaW5kb3cuc3R5bGUse1xuICAgICAgICBwb3NpdGlvbiAgOiAnZml4ZWQnLFxuICAgICAgICB0b3AgICAgICAgOiAwLFxuICAgICAgICBsZWZ0ICAgICAgOiAwLFxuICAgICAgICBoZWlnaHQgICAgOiAnMTAwJScsXG4gICAgICAgIHdpZHRoICAgICA6ICcxMDAlJyxcbiAgICAgICAgb3ZlcmZsb3cgIDogJ2hpZGRlbidcbiAgICAgIH0pXG5cbiAgICB9LFxuXG4gICAgY2FsY1Bvc2l0aW9uT2ZTdGlja3lFbGVtZW50IDogKGVudHJ5LCBwb3NpdGlvbikgPT4ge1xuXG4gICAgICAvL0lmIHRoZSBpdGVtIGlzIGJlbG93IHRoZSBib3R0b20gb2YgaXQncyBwYXJlbnRcbiAgICAgIGlmKHBvc2l0aW9uICsgU21vb3RoLnRvcEJhckhlaWdodCA+PSBlbnRyeS5wYXJlbnRCb3R0b20pXG4gICAgICAgIHJldHVybiBwb3NpdGlvblxuICAgICAgXG5cbiAgICAgIGlmKGVudHJ5LnBhcmVudEJvdHRvbSAtIHBvc2l0aW9uIC0gU21vb3RoLnRvcEJhckhlaWdodCA8PSBlbnRyeS5oZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGVudHJ5LnRvcCAtIGVudHJ5LnBhcmVudEJvdHRvbSArIHBvc2l0aW9uICsgZW50cnkuaGVpZ2h0XG4gICAgICB9XG5cbiAgICAgIGlmKHBvc2l0aW9uICsgU21vb3RoLnRvcEJhckhlaWdodCA+IGVudHJ5LnRvcCkgXG4gICAgICAgIHJldHVybiBlbnRyeS50b3AgLSBTbW9vdGgudG9wQmFySGVpZ2h0ICAgXG5cblxuICAgICAgcmV0dXJuIHBvc2l0aW9uXG5cbiAgICB9LFxuXG4gICAgbGVycDogKGEsYixuKSA9PiAge1xuXG4gICAgICAgIHJldHVybiAoMSAtIG4pICogYSArIG4gKiBiXG5cbiAgICB9LFxuXG4gICAgZXhhY3RQb3NpdGlvbk9mRWxlbWVudCA6IChlbGVtZW50KSA9PiB7XG4gICAgICB2YXIgZWwgPSBlbGVtZW50LFxuICAgICAgb2Zmc2V0VG9wICA9IDA7XG5cbiAgICAgIGRve1xuICAgICAgICAgIG9mZnNldFRvcCAgKz0gZWwub2Zmc2V0VG9wO1xuXG4gICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XG4gICAgICB9IHdoaWxlKCBlbCApO1xuXG4gICAgICByZXR1cm4gb2Zmc2V0VG9wXG5cbiAgICB9XG5cbiAgfVxuXG4gIG1vZHVsZS5leHBvcnRzID0gU21vb3RoXG5cbn0oKSkiLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIEJvZHlTY3JvbGxMb2NrICAgPSByZXF1aXJlKCdib2R5LXNjcm9sbC1sb2NrJyksXG4gICAgICAgIExhenlMb2FkICAgICAgICAgPSByZXF1aXJlKCcuL2xhenlsb2FkJyksXG4gICAgICAgIFN5bmNTY3JvbGwgICAgICAgPSByZXF1aXJlKCcuL3N5bmNzY3JvbGwnKSwgXG4gICAgICAgIFBsb3RcblxuICAgIFBsb3QgPSB7XG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgICBQbG90LmNyZWF0ZUxpc3RlbmVycygpXG4gICAgICAgICAgICBTeW5jU2Nyb2xsLmluaXQoKSBcbiAgICAgICAgICAgIFBsb3QuYW5pbWF0ZUJhbm5lck5vdGlmaWNhdGlvbnMoKSBcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUxpc3RlbmVyczogKCkgPT4ge1xuXG4gICAgICAgICAgIFx0Y29uc3QgYnVyZ2VyTWVudVRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1tZW51VHJpZ2dlcicpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGJ1cmdlck1lbnVUcmlnZ2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBidXJnZXJNZW51VHJpZ2dlciBvZiBidXJnZXJNZW51VHJpZ2dlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVyZ2VyTWVudVRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFBsb3QudG9nZ2xlQnVyZ2VyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc2lkZVN3aXBlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbG90U2lkZVN3aXBlcycpXG5cbiAgICAgICAgICAgIGlmKHNpZGVTd2lwZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIFBsb3Quc2lkZVN3aXBlcyhzaWRlU3dpcGVzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgYW5pbWF0ZUJhbm5lck5vdGlmaWNhdGlvbnMgOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBiYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLWJhbm5lck5vdGlmaWNhdGlvbicpXG5cbiAgICAgICAgICAgIGlmKGJhbm5lcilcbiAgICAgICAgICAgICAgICBpZihiYW5uZXIuZGF0YXNldC5hbmltYXRpb25UeXBlID09ICdhbHdheXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIFBsb3QuYnVpbGRCYW5uZXJSZXBlYXRpbmdUZXh0KGJhbm5lcilcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgUGxvdC5idWlsZEJhbm5lclJlcGVhdGluZ1RleHQoYmFubmVyKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFBsb3QuY2hlY2tUb1NlZUlmV2VOZWVkVG9BbmltYXRpb25CYW5uZXIoYmFubmVyKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBQbG90LmNoZWNrVG9TZWVJZldlTmVlZFRvQW5pbWF0aW9uQmFubmVyKGJhbm5lcilcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tUb1NlZUlmV2VOZWVkVG9BbmltYXRpb25CYW5uZXIgOiBiYW5uZXIgPT4ge1xuXG4gICAgICAgICAgICBiYW5uZXIuaW5uZXJIVE1MID0gYDxkaXY+JHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfTwvZGl2PmBcbiAgICAgICAgICAgIGNvbnN0IGRpdjEgPSBiYW5uZXIucXVlcnlTZWxlY3RvcignZGl2Om50aC1vZi10eXBlKDEpJylcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoZGl2MS5zY3JvbGxXaWR0aCA+IHdpbmRvd1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgYmFubmVyLmNsYXNzTGlzdC5hZGQoJ3dpdGhBbmltYXRpb24nKVxuICAgICAgICAgICAgICAgIFBsb3QuYnVpbGRCYW5uZXJSZXBlYXRpbmdUZXh0KGJhbm5lcilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIGJhbm5lci5jbGFzc0xpc3QucmVtb3ZlKCd3aXRoQW5pbWF0aW9uJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGJ1aWxkQmFubmVyUmVwZWF0aW5nVGV4dCA6IGJhbm5lciA9PiB7XG5cbiAgICAgICAgICAgIGJhbm5lci5pbm5lckhUTUwgPSBgPGRpdj4ke2Jhbm5lci5kYXRhc2V0Lm1lc3NhZ2V9PC9kaXY+PGRpdj4ke2Jhbm5lci5kYXRhc2V0Lm1lc3NhZ2V9PC9kaXY+YFxuICAgICAgICAgICAgY29uc3QgZGl2MSA9IGJhbm5lci5xdWVyeVNlbGVjdG9yKCdkaXY6bnRoLW9mLXR5cGUoMSknKVxuICAgICAgICAgICAgY29uc3QgZGl2MiA9IGJhbm5lci5xdWVyeVNlbGVjdG9yKCdkaXY6bnRoLW9mLXR5cGUoMiknKVxuICAgICAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuXG4gICAgICAgICAgICBkaXYxLnN0eWxlLmFuaW1hdGlvbkR1cmF0aW9uPSh3aW5kb3dXaWR0aC8yMCkrXCJzXCJcbiAgICAgICAgICAgIGRpdjIuc3R5bGUuYW5pbWF0aW9uRHVyYXRpb249KHdpbmRvd1dpZHRoLzIwKStcInNcIlxuXG4gICAgICAgICAgICB2YXIgaSAgPSAwXG5cbiAgICAgICAgICAgIHdoaWxlKGRpdjEuc2Nyb2xsV2lkdGggPCB3aW5kb3dXaWR0aCAmJiBpIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgZGl2MS5pbm5lckhUTUwgPSBkaXYxLmlubmVySFRNTCArIGAgJHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfWBcbiAgICAgICAgICAgICAgICBkaXYyLmlubmVySFRNTCA9IGRpdjIuaW5uZXJIVE1MICsgYCAke2Jhbm5lci5kYXRhc2V0Lm1lc3NhZ2V9YFxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHNpZGVTd2lwZXMgOiAoc2lkZVN3aXBlcykgPT4ge1xuXG4gICAgICAgICAgICBmb3IodmFyIHNpZGVTd2lwZSBvZiBzaWRlU3dpcGVzKSB7XG5cbiAgICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoc2lkZVN3aXBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSArIDEgPCBwYXJzZUludChzaWRlU3dpcGUuc2Nyb2xsV2lkdGgpKSB7XG5cblxuICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHRvZ2dsZUJ1cmdlciA6ICgpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tYnVyZ2VyTWVudScpXG5cbiAgICAgICAgICAgIGlmKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXJPcGVuJykpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYnVyZ2VyT3BlbicpXG4gICAgICAgICAgICAgICAgQm9keVNjcm9sbExvY2suZGlzYWJsZUJvZHlTY3JvbGwoYnVyZ2VyTWVudSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2J1cmdlck9wZW4nKVxuICAgICAgICAgICAgICAgIEJvZHlTY3JvbGxMb2NrLmVuYWJsZUJvZHlTY3JvbGwoYnVyZ2VyTWVudSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGlzUGFnZSA6IHNsdWcgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2UtJytzbHVnKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZml4VmggOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIEZpcnN0IHdlIGdldCB0aGUgdmlld3BvcnQgaGVpZ2h0IGFuZCB3ZSBtdWx0aXBsZSBpdCBieSAxJSB0byBnZXQgYSB2YWx1ZSBmb3IgYSB2aCB1bml0XG4gICAgICAgICAgICBsZXQgdmggPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjAxXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdmgnLCBgJHt2aH1weGApXG5cblxuICAgICAgICB9LFxuXG4gICAgICAgIGlzVG91Y2hEZXZpY2U6ICgpID0+IHtcblxuICAgICAgICAgICAgdmFyIHByZWZpeGVzID0gJyAtd2Via2l0LSAtbW96LSAtby0gLW1zLSAnLnNwbGl0KCcgJylcbiAgICAgICAgICAgIHZhciBtcSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYShxdWVyeSkubWF0Y2hlc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSB7XG4gICAgICAgICAgICBcdGRvY3VtZW50LmJvZHkuYWRkQ2xhc3MoJ2lzVG91Y2hEZXZpY2UnKSAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gWycoJywgcHJlZml4ZXMuam9pbigndG91Y2gtZW5hYmxlZCksKCcpLCAncGxvdCcsICcpJ10uam9pbignJylcbiAgICAgICAgICAgIHJldHVybiBtcShxdWVyeSlcbiAgICAgICAgfSxcblxuICAgICAgICBhcmVXZUF0VGhlVG9wIDogc2Nyb2xsVG9wID0+IHtcblxuICAgICAgICAgICAgaWYoc2Nyb2xsVG9wID4gMCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsZWQnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbGVkJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkVGVtcGxhdGVQYXJ0IDogKGFyZ3MpID0+IHsgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIGFjdGlvbiAgICAgICAgICA6ICdwbG90TG9hZFRlbXBsYXRlUGFydCcsIC8vVGhpcyBpcyB0aGUgYWN0aW9uIGZpcmVkIGludG8gb3VyIFBsb3RTaXRlIFBIUCBzZXR1cC5waHAgZmlsZVxuICAgICAgICAgICAgICAgIGRhdGEgICAgICAgICAgICA6IHt9LFxuICAgICAgICAgICAgICAgIHJldHVybk9yV3JpdGUgICA6ICd3cml0ZScsIC8vKHdyaXRlfHJldHVybikgZWl0aGVyIGFkZHMgY29udGVudCB0byBjb250ZW50QXJlYSwgb3IgcmV0dXJucyBuZXcgSFRNTCBpbiB0aGUgcHJvbWlzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnRBcmVhICAgICA6ICcuSlMtLWFqYXhUYXJnZXRBcmVhJywgXG4gICAgICAgICAgICAgICAgYXBwZW5kICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGFyZ3MpXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgdHJ5IHsgXG4gICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MucmV0dXJuT3JXcml0ZSA9PSAnd3JpdGUnKVxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNldHRpbmdzLmNvbnRlbnRBcmVhKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29udGVudEFyZWEgbmVlZHMgdG8gYmUgYSB2YWxpZCBzZWxlY3RvciEnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjb250ZW50QXJlYSA9PSBudWxsICYmIHNldHRpbmdzLnJldHVybk9yV3JpdGUgPT0gJ3dyaXRlJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb3VsZG5cXCd0IGZpbmQgc2VsZWN0b3IgZm9yIGNvbnRlbnRBcmVhIG9uIHBhZ2UuJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2V0dGluZ3MudGVtcGxhdGVQYXJ0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ291bGRuXFwndCBmaW5kIHRlbXBsYXRlIHBhcnQuIE1ha2Ugc3VyZSB5b3Ugc2V0IG9uZSBhcyB0ZW1wbGF0ZVBhcnQsIGZvciBleGFtcGxlIHBhcnRzL2FqYXgtY29udGVudCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZihzZXR0aW5ncy5hcHBlbmQpICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdWYWx1ZSBwYXNzZWQgdG8gYXBwZW5kIHdhcyBub3QgYSBib29sZWFuLicpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnJldHVybk9yV3JpdGUgPT0gJ3dyaXRlJylcbiAgICAgICAgICAgICAgICBjb250ZW50QXJlYS5jbGFzc0xpc3QuYWRkKCdwbG90TG9hZGluZycpXG5cbiAgICAgICAgICAgIHNldHRpbmdzLmRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZGF0YSAgICAgICAgICAgIDogc2V0dGluZ3MuZGF0YSxcbiAgICAgICAgICAgICAgICBhY3Rpb24gICAgICAgICAgOiBzZXR0aW5ncy5hY3Rpb24sXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQYXJ0ICAgIDogc2V0dGluZ3MudGVtcGxhdGVQYXJ0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBxdWVyeVN0cmluZyA9IFBsb3QudG9RdWVyeVN0cmluZyhzZXR0aW5ncy5kYXRhKVxuICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChhdSwge1xuXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IHF1ZXJ5U3RyaW5nLFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nXG5cbiAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5qc29uKClcblxuICAgICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MucmV0dXJuT3JXcml0ZSA9PSAnd3JpdGUnKVxuICAgICAgICAgICAgICAgICAgICBjb250ZW50QXJlYS5jbGFzc0xpc3QucmVtb3ZlKCdwbG90TG9hZGluZycpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LnN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5yZXR1cm5PcldyaXRlICE9PSAnd3JpdGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5odG1sXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MuYXBwZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50QXJlYS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHJlc3VsdC5odG1sKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRBcmVhLmlubmVySFRNTCA9IHJlc3VsdC5odG1sXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb250ZW50QXJlYS5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWxhenlMb2FkJykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMYXp5TG9hZC5vYnNlcnZlci5vYnNlcnZlKGVsKVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmh0bWxcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyxlcnJvcilcblxuICAgICAgICAgICAgfSlcblxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBkYXRlRm9ybWF0IDogKGRhdGUsZm9ybWF0KSA9PiB7XG5cbiAgICAgICAgICAgIGlmKGZvcm1hdCA9PSAnZFMgTScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpICsgUGxvdC5nZXRPcmRpbmFsKGRhdGUuZ2V0RGF0ZSgpKSArICcgJyArIFBsb3QuZ2V0TW9udGgoZGF0ZSlcblxuICAgICAgICAgICAgaWYoZm9ybWF0ID09ICdNIGRTJylcbiAgICAgICAgICAgICAgICByZXR1cm4gUGxvdC5nZXRNb250aChkYXRlKSArICcgJyArIGRhdGUuZ2V0RGF0ZSgpICsgUGxvdC5nZXRPcmRpbmFsKGRhdGUuZ2V0RGF0ZSgpKSBcblxuICAgICAgICAgICAgaWYoZm9ybWF0ID09ICdkL20veScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpICsgJy8nICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpICsgJy8nICsgZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkuc3Vic3RyKC0yKVxuXG4gICAgICAgICAgICBpZihmb3JtYXQgPT0gJ20vZC95JylcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRhdGUuZ2V0TW9udGgoKSArIDEpICsgJy8nICsgZGF0ZS5nZXREYXRlKCkgKyAnLycgKyBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKS5zdWJzdHIoLTIpXG5cbiAgICAgICAgICAgIHJldHVybiBQbG90LmdldERheU9mV2VlayhkYXRlKVxuICAgICAgICAgfSxcblxuICAgICAgICBnZXREYXlPZldlZWsgOiBkYXRlID0+IHtcblxuICAgICAgICAgICAgY29uc3QgZGF5cyA9IFtcbiAgICAgICAgICAgICAgICAnU3VuZGF5JyxcbiAgICAgICAgICAgICAgICAnTW9uZGF5JyxcbiAgICAgICAgICAgICAgICAnVHVlc2RheScsXG4gICAgICAgICAgICAgICAgJ1dlZG5lc2RheScsXG4gICAgICAgICAgICAgICAgJ1RodXJzZGF5JyxcbiAgICAgICAgICAgICAgICAnRnJpZGF5JyxcbiAgICAgICAgICAgICAgICAnU2F0dXJkYXknXG4gICAgICAgICAgICBdXG5cbiAgICAgICAgICAgIHJldHVybiBkYXlzW2RhdGUuZ2V0RGF5KCldXG5cbiAgICAgICAgfSxcblxuICAgICAgICBnZXRPcmRpbmFsIDogbnVtYmVyID0+IHtcblxuICAgICAgICAgICAgICBpZiAobnVtYmVyID4gMyAmJiBudW1iZXIgPCAyMSkgcmV0dXJuICd0aCc7XG4gICAgICAgICAgICAgIHN3aXRjaCAobnVtYmVyICUgMTApIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6ICByZXR1cm4gXCJzdFwiO1xuICAgICAgICAgICAgICAgIGNhc2UgMjogIHJldHVybiBcIm5kXCI7XG4gICAgICAgICAgICAgICAgY2FzZSAzOiAgcmV0dXJuIFwicmRcIjtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJ0aFwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuXG4gICAgICAgIGdldE1vbnRoIDogZGF0ZSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIixcbiAgICAgICAgICAgICAgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIlxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoTmFtZXNbZGF0ZS5nZXRNb250aCgpXVxuICAgICAgICB9LFxuXG4gICAgICAgIHRvUXVlcnlTdHJpbmcgOiAob2JqLCBwcmVmaXgpID0+IHtcbiAgICAgICAgICAgIHZhciBzdHIgPSBbXSwgaywgdjtcbiAgICAgICAgICAgIGZvcih2YXIgcCBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShwKSkge2NvbnRpbnVlO30gLy8gc2tpcCB0aGluZ3MgZnJvbSB0aGUgcHJvdG90eXBlXG4gICAgICAgICAgICAgICAgaWYgKH5wLmluZGV4T2YoJ1snKSkge1xuICAgICAgICAgICAgICAgICAgICBrID0gcHJlZml4ID8gcHJlZml4ICsgXCJbXCIgKyBwLnN1YnN0cmluZygwLCBwLmluZGV4T2YoJ1snKSkgKyBcIl1cIiArIHAuc3Vic3RyaW5nKHAuaW5kZXhPZignWycpKSA6IHA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgayA9IHByZWZpeCA/IHByZWZpeCArIFwiW1wiICsgcCArIFwiXVwiIDogcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdiA9IG9ialtwXTtcbiAgICAgICAgICAgICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PSBcIm9iamVjdFwiID9cbiAgICAgICAgICAgICAgICAgIFBsb3QudG9RdWVyeVN0cmluZyh2LCBrKSA6XG4gICAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoaykgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyLmpvaW4oXCImXCIpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gUGxvdFxuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFxuICAgIFN5bmNzY3JvbGxcblxuICAgIFN5bmNzY3JvbGwgPSB7XG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgV2lkdGggICAgICAgICAgID0gJ1dpZHRoJyxcbiAgICAgICAgICAgIEhlaWdodCAgICAgICAgICAgICAgPSAnSGVpZ2h0JyxcbiAgICAgICAgICAgIFRvcCAgICAgICAgICAgICAgICAgPSAnVG9wJyxcbiAgICAgICAgICAgIExlZnQgICAgICAgICAgICAgICAgPSAnTGVmdCcsXG4gICAgICAgICAgICBzY3JvbGwgICAgICAgICAgICAgID0gJ3Njcm9sbCcsXG4gICAgICAgICAgICBjbGllbnQgICAgICAgICAgICAgID0gJ2NsaWVudCcsXG4gICAgICAgICAgICBFdmVudExpc3RlbmVyICAgICAgID0gJ0V2ZW50TGlzdGVuZXInLFxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lciAgICA9ICdhZGQnICsgRXZlbnRMaXN0ZW5lcixcbiAgICAgICAgICAgIGxlbmd0aCAgICAgICAgICAgICAgPSAnbGVuZ3RoJyxcbiAgICAgICAgICAgIE1hdGhfcm91bmQgICAgICAgICAgPSBNYXRoLnJvdW5kLFxuICAgICAgICAgICAgbmFtZXMgICAgICAgICAgICAgICA9IHt9LFxuICAgICAgICAgICAgcmVzZXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIHZhciBlbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N5bmMnK3Njcm9sbClcblxuICAgICAgICAgICAgICAgIC8vIGNsZWFyaW5nIGV4aXN0aW5nIGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIHZhciBpLCBqLCBlbCwgZm91bmQsIG5hbWVcbiAgICAgICAgICAgICAgICBmb3IgKG5hbWUgaW4gbmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmFtZXNbbmFtZV1bbGVuZ3RoXTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNbbmFtZV1baV1bJ3JlbW92ZScrRXZlbnRMaXN0ZW5lcl0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCwgbmFtZXNbbmFtZV1baV0uc3luLCAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gc2V0dGluZy11cCB0aGUgbmV3IGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBlbGVtc1tsZW5ndGhdOykge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGogPSAwXG4gICAgICAgICAgICAgICAgICAgIGVsID0gZWxlbXNbaSsrXVxuICAgICAgICAgICAgICAgICAgICBpZiAoIShuYW1lID0gZWwuZ2V0QXR0cmlidXRlKCduYW1lJykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYW1lIGF0dHJpYnV0ZSBpcyBub3Qgc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWwgPSBlbFtzY3JvbGwrJ2VyJ118fGVsICAvLyBuZWVkZWQgZm9yIGludGVuY2VcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZWFyY2hpbmcgZm9yIGV4aXN0aW5nIGVudHJ5IGluIGFycmF5IG9mIG5hbWVzO1xuICAgICAgICAgICAgICAgICAgICAvLyBzZWFyY2hpbmcgZm9yIHRoZSBlbGVtZW50IGluIHRoYXQgZW50cnlcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7aiA8IChuYW1lc1tuYW1lXSA9IG5hbWVzW25hbWVdfHxbXSlbbGVuZ3RoXTspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kIHw9IG5hbWVzW25hbWVdW2orK10gPT0gZWxcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzW25hbWVdLnB1c2goZWwpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbC5lWCA9IGVsLmVZID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24oZWwsIG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsW2FkZEV2ZW50TGlzdGVuZXJdKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zeW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1zID0gbmFtZXNbbmFtZV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsWCA9IGVsW3Njcm9sbCtMZWZ0XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsWSA9IGVsW3Njcm9sbCtUb3BdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhSYXRlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFggL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVsW3Njcm9sbCtXaWR0aF0gLSBlbFtjbGllbnQrV2lkdGhdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeVJhdGUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsWSAvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZWxbc2Nyb2xsK0hlaWdodF0gLSBlbFtjbGllbnQrSGVpZ2h0XSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlWCA9IHNjcm9sbFggIT0gZWwuZVhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZVkgPSBzY3JvbGxZICE9IGVsLmVZXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG90aGVyRWwsIGkgPSAwXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuZVggPSBzY3JvbGxYXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmVZID0gc2Nyb2xsWVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoO2kgPCBlbGVtc1tsZW5ndGhdOykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbCA9IGVsZW1zW2krK11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlckVsICE9IGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZVggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aF9yb3VuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbc2Nyb2xsK0xlZnRdIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzY3JvbGxYID0gb3RoZXJFbC5lWCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aF9yb3VuZCh4UmF0ZSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvdGhlckVsW3Njcm9sbCtXaWR0aF0gLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbFtjbGllbnQrV2lkdGhdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW3Njcm9sbCtMZWZ0XSA9IHNjcm9sbFhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZVkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aF9yb3VuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbc2Nyb2xsK1RvcF0gLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNjcm9sbFkgPSBvdGhlckVsLmVZID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoX3JvdW5kKHlSYXRlICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG90aGVyRWxbc2Nyb2xsK0hlaWdodF0gLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbFtjbGllbnQrSGVpZ2h0XSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbFtzY3JvbGwrVG9wXSA9IHNjcm9sbFlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pKGVsLCBuYW1lKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICByZXNldCgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvd1thZGRFdmVudExpc3RlbmVyXShcImxvYWRcIiwgcmVzZXQsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFN5bmNzY3JvbGxcblxufSgpKVxuIiwiLyoqXG4gKiBtYXRjaGVzU2VsZWN0b3IgdjIuMC4yXG4gKiBtYXRjaGVzU2VsZWN0b3IoIGVsZW1lbnQsICcuc2VsZWN0b3InIClcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSAqL1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cubWF0Y2hlc1NlbGVjdG9yID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtYXRjaGVzTWV0aG9kID0gKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgRWxlbVByb3RvID0gd2luZG93LkVsZW1lbnQucHJvdG90eXBlO1xuICAgIC8vIGNoZWNrIGZvciB0aGUgc3RhbmRhcmQgbWV0aG9kIG5hbWUgZmlyc3RcbiAgICBpZiAoIEVsZW1Qcm90by5tYXRjaGVzICkge1xuICAgICAgcmV0dXJuICdtYXRjaGVzJztcbiAgICB9XG4gICAgLy8gY2hlY2sgdW4tcHJlZml4ZWRcbiAgICBpZiAoIEVsZW1Qcm90by5tYXRjaGVzU2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gJ21hdGNoZXNTZWxlY3Rvcic7XG4gICAgfVxuICAgIC8vIGNoZWNrIHZlbmRvciBwcmVmaXhlc1xuICAgIHZhciBwcmVmaXhlcyA9IFsgJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbycgXTtcblxuICAgIGZvciAoIHZhciBpPTA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBwcmVmaXggPSBwcmVmaXhlc1tpXTtcbiAgICAgIHZhciBtZXRob2QgPSBwcmVmaXggKyAnTWF0Y2hlc1NlbGVjdG9yJztcbiAgICAgIGlmICggRWxlbVByb3RvWyBtZXRob2QgXSApIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZDtcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciggZWxlbSwgc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIGVsZW1bIG1hdGNoZXNNZXRob2QgXSggc2VsZWN0b3IgKTtcbiAgfTtcblxufSkpO1xuIiwiLyoqXG4gKiBFdkVtaXR0ZXIgdjEuMS4wXG4gKiBMaWwnIGV2ZW50IGVtaXR0ZXJcbiAqIE1JVCBMaWNlbnNlXG4gKi9cblxuLyoganNoaW50IHVudXNlZDogdHJ1ZSwgdW5kZWY6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKiBnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCB3aW5kb3cgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTUQgLSBSZXF1aXJlSlNcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KUyAtIEJyb3dzZXJpZnksIFdlYnBhY2tcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICBnbG9iYWwuRXZFbWl0dGVyID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbigpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIEV2RW1pdHRlcigpIHt9XG5cbnZhciBwcm90byA9IEV2RW1pdHRlci5wcm90b3R5cGU7XG5cbnByb3RvLm9uID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNldCBldmVudHMgaGFzaFxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgbGlzdGVuZXJzIGFycmF5XG4gIHZhciBsaXN0ZW5lcnMgPSBldmVudHNbIGV2ZW50TmFtZSBdID0gZXZlbnRzWyBldmVudE5hbWUgXSB8fCBbXTtcbiAgLy8gb25seSBhZGQgb25jZVxuICBpZiAoIGxpc3RlbmVycy5pbmRleE9mKCBsaXN0ZW5lciApID09IC0xICkge1xuICAgIGxpc3RlbmVycy5wdXNoKCBsaXN0ZW5lciApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5vbmNlID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGFkZCBldmVudFxuICB0aGlzLm9uKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gIC8vIHNldCBvbmNlIGZsYWdcbiAgLy8gc2V0IG9uY2VFdmVudHMgaGFzaFxuICB2YXIgb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgPSB0aGlzLl9vbmNlRXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgb25jZUxpc3RlbmVycyBvYmplY3RcbiAgdmFyIG9uY2VMaXN0ZW5lcnMgPSBvbmNlRXZlbnRzWyBldmVudE5hbWUgXSA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdIHx8IHt9O1xuICAvLyBzZXQgZmxhZ1xuICBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdID0gdHJ1ZTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLm9mZiA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF07XG4gIGlmICggIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YoIGxpc3RlbmVyICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgbGlzdGVuZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgYXJncyApIHtcbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbIGV2ZW50TmFtZSBdO1xuICBpZiAoICFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGNvcHkgb3ZlciB0byBhdm9pZCBpbnRlcmZlcmVuY2UgaWYgLm9mZigpIGluIGxpc3RlbmVyXG4gIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgwKTtcbiAgYXJncyA9IGFyZ3MgfHwgW107XG4gIC8vIG9uY2Ugc3R1ZmZcbiAgdmFyIG9uY2VMaXN0ZW5lcnMgPSB0aGlzLl9vbmNlRXZlbnRzICYmIHRoaXMuX29uY2VFdmVudHNbIGV2ZW50TmFtZSBdO1xuXG4gIGZvciAoIHZhciBpPTA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldXG4gICAgdmFyIGlzT25jZSA9IG9uY2VMaXN0ZW5lcnMgJiYgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICBpZiAoIGlzT25jZSApIHtcbiAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgLy8gcmVtb3ZlIGJlZm9yZSB0cmlnZ2VyIHRvIHByZXZlbnQgcmVjdXJzaW9uXG4gICAgICB0aGlzLm9mZiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICAgICAgLy8gdW5zZXQgb25jZSBmbGFnXG4gICAgICBkZWxldGUgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICB9XG4gICAgLy8gdHJpZ2dlciBsaXN0ZW5lclxuICAgIGxpc3RlbmVyLmFwcGx5KCB0aGlzLCBhcmdzICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLmFsbE9mZiA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICBkZWxldGUgdGhpcy5fb25jZUV2ZW50cztcbn07XG5cbnJldHVybiBFdkVtaXR0ZXI7XG5cbn0pKTtcbiIsIi8qKlxuICogRml6enkgVUkgdXRpbHMgdjIuMC43XG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yJ1xuICAgIF0sIGZ1bmN0aW9uKCBtYXRjaGVzU2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBtYXRjaGVzU2VsZWN0b3IgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3InKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZml6enlVSVV0aWxzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3JcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBtYXRjaGVzU2VsZWN0b3IgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0ge307XG5cbi8vIC0tLS0tIGV4dGVuZCAtLS0tLSAvL1xuXG4vLyBleHRlbmRzIG9iamVjdHNcbnV0aWxzLmV4dGVuZCA9IGZ1bmN0aW9uKCBhLCBiICkge1xuICBmb3IgKCB2YXIgcHJvcCBpbiBiICkge1xuICAgIGFbIHByb3AgXSA9IGJbIHByb3AgXTtcbiAgfVxuICByZXR1cm4gYTtcbn07XG5cbi8vIC0tLS0tIG1vZHVsbyAtLS0tLSAvL1xuXG51dGlscy5tb2R1bG8gPSBmdW5jdGlvbiggbnVtLCBkaXYgKSB7XG4gIHJldHVybiAoICggbnVtICUgZGl2ICkgKyBkaXYgKSAlIGRpdjtcbn07XG5cbi8vIC0tLS0tIG1ha2VBcnJheSAtLS0tLSAvL1xuXG52YXIgYXJyYXlTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLy8gdHVybiBlbGVtZW50IG9yIG5vZGVMaXN0IGludG8gYW4gYXJyYXlcbnV0aWxzLm1ha2VBcnJheSA9IGZ1bmN0aW9uKCBvYmogKSB7XG4gIGlmICggQXJyYXkuaXNBcnJheSggb2JqICkgKSB7XG4gICAgLy8gdXNlIG9iamVjdCBpZiBhbHJlYWR5IGFuIGFycmF5XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICAvLyByZXR1cm4gZW1wdHkgYXJyYXkgaWYgdW5kZWZpbmVkIG9yIG51bGwuICM2XG4gIGlmICggb2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkICkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBpc0FycmF5TGlrZSA9IHR5cGVvZiBvYmogPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5sZW5ndGggPT0gJ251bWJlcic7XG4gIGlmICggaXNBcnJheUxpa2UgKSB7XG4gICAgLy8gY29udmVydCBub2RlTGlzdCB0byBhcnJheVxuICAgIHJldHVybiBhcnJheVNsaWNlLmNhbGwoIG9iaiApO1xuICB9XG5cbiAgLy8gYXJyYXkgb2Ygc2luZ2xlIGluZGV4XG4gIHJldHVybiBbIG9iaiBdO1xufTtcblxuLy8gLS0tLS0gcmVtb3ZlRnJvbSAtLS0tLSAvL1xuXG51dGlscy5yZW1vdmVGcm9tID0gZnVuY3Rpb24oIGFyeSwgb2JqICkge1xuICB2YXIgaW5kZXggPSBhcnkuaW5kZXhPZiggb2JqICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgYXJ5LnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gZ2V0UGFyZW50IC0tLS0tIC8vXG5cbnV0aWxzLmdldFBhcmVudCA9IGZ1bmN0aW9uKCBlbGVtLCBzZWxlY3RvciApIHtcbiAgd2hpbGUgKCBlbGVtLnBhcmVudE5vZGUgJiYgZWxlbSAhPSBkb2N1bWVudC5ib2R5ICkge1xuICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFF1ZXJ5RWxlbWVudCAtLS0tLSAvL1xuXG4vLyB1c2UgZWxlbWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbnV0aWxzLmdldFF1ZXJ5RWxlbWVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cbiAgcmV0dXJuIGVsZW07XG59O1xuXG4vLyAtLS0tLSBoYW5kbGVFdmVudCAtLS0tLSAvL1xuXG4vLyBlbmFibGUgLm9udHlwZSB0byB0cmlnZ2VyIGZyb20gLmFkZEV2ZW50TGlzdGVuZXIoIGVsZW0sICd0eXBlJyApXG51dGlscy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBmaWx0ZXJGaW5kRWxlbWVudHMgLS0tLS0gLy9cblxudXRpbHMuZmlsdGVyRmluZEVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zLCBzZWxlY3RvciApIHtcbiAgLy8gbWFrZSBhcnJheSBvZiBlbGVtc1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgdmFyIGZmRWxlbXMgPSBbXTtcblxuICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAvLyBjaGVjayB0aGF0IGVsZW0gaXMgYW4gYWN0dWFsIGVsZW1lbnRcbiAgICBpZiAoICEoIGVsZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCApICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBhZGQgZWxlbSBpZiBubyBzZWxlY3RvclxuICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGZpbHRlciAmIGZpbmQgaXRlbXMgaWYgd2UgaGF2ZSBhIHNlbGVjdG9yXG4gICAgLy8gZmlsdGVyXG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGVsZW0gKTtcbiAgICB9XG4gICAgLy8gZmluZCBjaGlsZHJlblxuICAgIHZhciBjaGlsZEVsZW1zID0gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvciApO1xuICAgIC8vIGNvbmNhdCBjaGlsZEVsZW1zIHRvIGZpbHRlckZvdW5kIGFycmF5XG4gICAgZm9yICggdmFyIGk9MDsgaSA8IGNoaWxkRWxlbXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGNoaWxkRWxlbXNbaV0gKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmZkVsZW1zO1xufTtcblxuLy8gLS0tLS0gZGVib3VuY2VNZXRob2QgLS0tLS0gLy9cblxudXRpbHMuZGVib3VuY2VNZXRob2QgPSBmdW5jdGlvbiggX2NsYXNzLCBtZXRob2ROYW1lLCB0aHJlc2hvbGQgKSB7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCAxMDA7XG4gIC8vIG9yaWdpbmFsIG1ldGhvZFxuICB2YXIgbWV0aG9kID0gX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdO1xuICB2YXIgdGltZW91dE5hbWUgPSBtZXRob2ROYW1lICsgJ1RpbWVvdXQnO1xuXG4gIF9jbGFzcy5wcm90b3R5cGVbIG1ldGhvZE5hbWUgXSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aW1lb3V0ID0gdGhpc1sgdGltZW91dE5hbWUgXTtcbiAgICBjbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblxuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpc1sgdGltZW91dE5hbWUgXSA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgbWV0aG9kLmFwcGx5KCBfdGhpcywgYXJncyApO1xuICAgICAgZGVsZXRlIF90aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIH0sIHRocmVzaG9sZCApO1xuICB9O1xufTtcblxuLy8gLS0tLS0gZG9jUmVhZHkgLS0tLS0gLy9cblxudXRpbHMuZG9jUmVhZHkgPSBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG4gIHZhciByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgaWYgKCByZWFkeVN0YXRlID09ICdjb21wbGV0ZScgfHwgcmVhZHlTdGF0ZSA9PSAnaW50ZXJhY3RpdmUnICkge1xuICAgIC8vIGRvIGFzeW5jIHRvIGFsbG93IGZvciBvdGhlciBzY3JpcHRzIHRvIHJ1bi4gbWV0YWZpenp5L2ZsaWNraXR5IzQ0MVxuICAgIHNldFRpbWVvdXQoIGNhbGxiYWNrICk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYWxsYmFjayApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBodG1sSW5pdCAtLS0tLSAvL1xuXG4vLyBodHRwOi8vamFtZXNyb2JlcnRzLm5hbWUvYmxvZy8yMDEwLzAyLzIyL3N0cmluZy1mdW5jdGlvbnMtZm9yLWphdmFzY3JpcHQtdHJpbS10by1jYW1lbC1jYXNlLXRvLWRhc2hlZC1hbmQtdG8tdW5kZXJzY29yZS9cbnV0aWxzLnRvRGFzaGVkID0gZnVuY3Rpb24oIHN0ciApIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKCAvKC4pKFtBLVpdKS9nLCBmdW5jdGlvbiggbWF0Y2gsICQxLCAkMiApIHtcbiAgICByZXR1cm4gJDEgKyAnLScgKyAkMjtcbiAgfSkudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4vKipcbiAqIGFsbG93IHVzZXIgdG8gaW5pdGlhbGl6ZSBjbGFzc2VzIHZpYSBbZGF0YS1uYW1lc3BhY2VdIG9yIC5qcy1uYW1lc3BhY2UgY2xhc3NcbiAqIGh0bWxJbml0KCBXaWRnZXQsICd3aWRnZXROYW1lJyApXG4gKiBvcHRpb25zIGFyZSBwYXJzZWQgZnJvbSBkYXRhLW5hbWVzcGFjZS1vcHRpb25zXG4gKi9cbnV0aWxzLmh0bWxJbml0ID0gZnVuY3Rpb24oIFdpZGdldENsYXNzLCBuYW1lc3BhY2UgKSB7XG4gIHV0aWxzLmRvY1JlYWR5KCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGFzaGVkTmFtZXNwYWNlID0gdXRpbHMudG9EYXNoZWQoIG5hbWVzcGFjZSApO1xuICAgIHZhciBkYXRhQXR0ciA9ICdkYXRhLScgKyBkYXNoZWROYW1lc3BhY2U7XG4gICAgdmFyIGRhdGFBdHRyRWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnWycgKyBkYXRhQXR0ciArICddJyApO1xuICAgIHZhciBqc0Rhc2hFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuanMtJyArIGRhc2hlZE5hbWVzcGFjZSApO1xuICAgIHZhciBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZGF0YUF0dHJFbGVtcyApXG4gICAgICAuY29uY2F0KCB1dGlscy5tYWtlQXJyYXkoIGpzRGFzaEVsZW1zICkgKTtcbiAgICB2YXIgZGF0YU9wdGlvbnNBdHRyID0gZGF0YUF0dHIgKyAnLW9wdGlvbnMnO1xuICAgIHZhciBqUXVlcnkgPSB3aW5kb3cualF1ZXJ5O1xuXG4gICAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICB2YXIgYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKCBkYXRhQXR0ciApIHx8XG4gICAgICAgIGVsZW0uZ2V0QXR0cmlidXRlKCBkYXRhT3B0aW9uc0F0dHIgKTtcbiAgICAgIHZhciBvcHRpb25zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgb3B0aW9ucyA9IGF0dHIgJiYgSlNPTi5wYXJzZSggYXR0ciApO1xuICAgICAgfSBjYXRjaCAoIGVycm9yICkge1xuICAgICAgICAvLyBsb2cgZXJyb3IsIGRvIG5vdCBpbml0aWFsaXplXG4gICAgICAgIGlmICggY29uc29sZSApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCAnRXJyb3IgcGFyc2luZyAnICsgZGF0YUF0dHIgKyAnIG9uICcgKyBlbGVtLmNsYXNzTmFtZSArXG4gICAgICAgICAgJzogJyArIGVycm9yICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgdmFyIGluc3RhbmNlID0gbmV3IFdpZGdldENsYXNzKCBlbGVtLCBvcHRpb25zICk7XG4gICAgICAvLyBtYWtlIGF2YWlsYWJsZSB2aWEgJCgpLmRhdGEoJ25hbWVzcGFjZScpXG4gICAgICBpZiAoIGpRdWVyeSApIHtcbiAgICAgICAgalF1ZXJ5LmRhdGEoIGVsZW0sIG5hbWVzcGFjZSwgaW5zdGFuY2UgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9KTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gdXRpbHM7XG5cbn0pKTtcbiIsIi8qIVxuICogRmxpY2tpdHkgaW1hZ2VzTG9hZGVkIHYyLjAuMFxuICogZW5hYmxlcyBpbWFnZXNMb2FkZWQgb3B0aW9uIGZvciBGbGlja2l0eVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2ZsaWNraXR5L2pzL2luZGV4JyxcbiAgICAgICdpbWFnZXNsb2FkZWQvaW1hZ2VzbG9hZGVkJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgaW1hZ2VzTG9hZGVkICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIGltYWdlc0xvYWRlZCApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ2ltYWdlc2xvYWRlZCcpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuaW1hZ2VzTG9hZGVkXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIGltYWdlc0xvYWRlZCApIHtcbid1c2Ugc3RyaWN0JztcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlSW1hZ2VzTG9hZGVkJyk7XG5cbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxucHJvdG8uX2NyZWF0ZUltYWdlc0xvYWRlZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9uKCAnYWN0aXZhdGUnLCB0aGlzLmltYWdlc0xvYWRlZCApO1xufTtcblxucHJvdG8uaW1hZ2VzTG9hZGVkID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5pbWFnZXNMb2FkZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIGZ1bmN0aW9uIG9uSW1hZ2VzTG9hZGVkUHJvZ3Jlc3MoIGluc3RhbmNlLCBpbWFnZSApIHtcbiAgICB2YXIgY2VsbCA9IF90aGlzLmdldFBhcmVudENlbGwoIGltYWdlLmltZyApO1xuICAgIF90aGlzLmNlbGxTaXplQ2hhbmdlKCBjZWxsICYmIGNlbGwuZWxlbWVudCApO1xuICAgIGlmICggIV90aGlzLm9wdGlvbnMuZnJlZVNjcm9sbCApIHtcbiAgICAgIF90aGlzLnBvc2l0aW9uU2xpZGVyQXRTZWxlY3RlZCgpO1xuICAgIH1cbiAgfVxuICBpbWFnZXNMb2FkZWQoIHRoaXMuc2xpZGVyICkub24oICdwcm9ncmVzcycsIG9uSW1hZ2VzTG9hZGVkUHJvZ3Jlc3MgKTtcbn07XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gYWRkLCByZW1vdmUgY2VsbFxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIHV0aWxzICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIGFwcGVuZCBjZWxscyB0byBhIGRvY3VtZW50IGZyYWdtZW50XG5mdW5jdGlvbiBnZXRDZWxsc0ZyYWdtZW50KCBjZWxscyApIHtcbiAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBjZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCggY2VsbC5lbGVtZW50ICk7XG4gIH0pO1xuICByZXR1cm4gZnJhZ21lbnQ7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGFkZC9yZW1vdmUgY2VsbCBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG4vKipcbiAqIEluc2VydCwgcHJlcGVuZCwgb3IgYXBwZW5kIGNlbGxzXG4gKiBAcGFyYW0ge0VsZW1lbnQsIEFycmF5LCBOb2RlTGlzdH0gZWxlbXNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXhcbiAqL1xucHJvdG8uaW5zZXJ0ID0gZnVuY3Rpb24oIGVsZW1zLCBpbmRleCApIHtcbiAgdmFyIGNlbGxzID0gdGhpcy5fbWFrZUNlbGxzKCBlbGVtcyApO1xuICBpZiAoICFjZWxscyB8fCAhY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuID0gdGhpcy5jZWxscy5sZW5ndGg7XG4gIC8vIGRlZmF1bHQgdG8gYXBwZW5kXG4gIGluZGV4ID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IGxlbiA6IGluZGV4O1xuICAvLyBhZGQgY2VsbHMgd2l0aCBkb2N1bWVudCBmcmFnbWVudFxuICB2YXIgZnJhZ21lbnQgPSBnZXRDZWxsc0ZyYWdtZW50KCBjZWxscyApO1xuICAvLyBhcHBlbmQgdG8gc2xpZGVyXG4gIHZhciBpc0FwcGVuZCA9IGluZGV4ID09IGxlbjtcbiAgaWYgKCBpc0FwcGVuZCApIHtcbiAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCggZnJhZ21lbnQgKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaW5zZXJ0Q2VsbEVsZW1lbnQgPSB0aGlzLmNlbGxzWyBpbmRleCBdLmVsZW1lbnQ7XG4gICAgdGhpcy5zbGlkZXIuaW5zZXJ0QmVmb3JlKCBmcmFnbWVudCwgaW5zZXJ0Q2VsbEVsZW1lbnQgKTtcbiAgfVxuICAvLyBhZGQgdG8gdGhpcy5jZWxsc1xuICBpZiAoIGluZGV4ID09PSAwICkge1xuICAgIC8vIHByZXBlbmQsIGFkZCB0byBzdGFydFxuICAgIHRoaXMuY2VsbHMgPSBjZWxscy5jb25jYXQoIHRoaXMuY2VsbHMgKTtcbiAgfSBlbHNlIGlmICggaXNBcHBlbmQgKSB7XG4gICAgLy8gYXBwZW5kLCBhZGQgdG8gZW5kXG4gICAgdGhpcy5jZWxscyA9IHRoaXMuY2VsbHMuY29uY2F0KCBjZWxscyApO1xuICB9IGVsc2Uge1xuICAgIC8vIGluc2VydCBpbiB0aGlzLmNlbGxzXG4gICAgdmFyIGVuZENlbGxzID0gdGhpcy5jZWxscy5zcGxpY2UoIGluZGV4LCBsZW4gLSBpbmRleCApO1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmNlbGxzLmNvbmNhdCggY2VsbHMgKS5jb25jYXQoIGVuZENlbGxzICk7XG4gIH1cblxuICB0aGlzLl9zaXplQ2VsbHMoIGNlbGxzICk7XG4gIHRoaXMuY2VsbENoYW5nZSggaW5kZXgsIHRydWUgKTtcbn07XG5cbnByb3RvLmFwcGVuZCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdGhpcy5pbnNlcnQoIGVsZW1zLCB0aGlzLmNlbGxzLmxlbmd0aCApO1xufTtcblxucHJvdG8ucHJlcGVuZCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdGhpcy5pbnNlcnQoIGVsZW1zLCAwICk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBjZWxsc1xuICogQHBhcmFtIHtFbGVtZW50LCBBcnJheSwgTm9kZUxpc3R9IGVsZW1zXG4gKi9cbnByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGNlbGxzID0gdGhpcy5nZXRDZWxscyggZWxlbXMgKTtcbiAgaWYgKCAhY2VsbHMgfHwgIWNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbWluQ2VsbEluZGV4ID0gdGhpcy5jZWxscy5sZW5ndGggLSAxO1xuICAvLyByZW1vdmUgY2VsbHMgZnJvbSBjb2xsZWN0aW9uICYgRE9NXG4gIGNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwucmVtb3ZlKCk7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5jZWxscy5pbmRleE9mKCBjZWxsICk7XG4gICAgbWluQ2VsbEluZGV4ID0gTWF0aC5taW4oIGluZGV4LCBtaW5DZWxsSW5kZXggKTtcbiAgICB1dGlscy5yZW1vdmVGcm9tKCB0aGlzLmNlbGxzLCBjZWxsICk7XG4gIH0sIHRoaXMgKTtcblxuICB0aGlzLmNlbGxDaGFuZ2UoIG1pbkNlbGxJbmRleCwgdHJ1ZSApO1xufTtcblxuLyoqXG4gKiBsb2dpYyB0byBiZSBydW4gYWZ0ZXIgYSBjZWxsJ3Mgc2l6ZSBjaGFuZ2VzXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW0gLSBjZWxsJ3MgZWxlbWVudFxuICovXG5wcm90by5jZWxsU2l6ZUNoYW5nZSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbCggZWxlbSApO1xuICBpZiAoICFjZWxsICkge1xuICAgIHJldHVybjtcbiAgfVxuICBjZWxsLmdldFNpemUoKTtcblxuICB2YXIgaW5kZXggPSB0aGlzLmNlbGxzLmluZGV4T2YoIGNlbGwgKTtcbiAgdGhpcy5jZWxsQ2hhbmdlKCBpbmRleCApO1xufTtcblxuLyoqXG4gKiBsb2dpYyBhbnkgdGltZSBhIGNlbGwgaXMgY2hhbmdlZDogYWRkZWQsIHJlbW92ZWQsIG9yIHNpemUgY2hhbmdlZFxuICogQHBhcmFtIHtJbnRlZ2VyfSBjaGFuZ2VkQ2VsbEluZGV4IC0gaW5kZXggb2YgdGhlIGNoYW5nZWQgY2VsbCwgb3B0aW9uYWxcbiAqL1xucHJvdG8uY2VsbENoYW5nZSA9IGZ1bmN0aW9uKCBjaGFuZ2VkQ2VsbEluZGV4LCBpc1Bvc2l0aW9uaW5nU2xpZGVyICkge1xuICB2YXIgcHJldlNlbGVjdGVkRWxlbSA9IHRoaXMuc2VsZWN0ZWRFbGVtZW50O1xuICB0aGlzLl9wb3NpdGlvbkNlbGxzKCBjaGFuZ2VkQ2VsbEluZGV4ICk7XG4gIHRoaXMuX2dldFdyYXBTaGlmdENlbGxzKCk7XG4gIHRoaXMuc2V0R2FsbGVyeVNpemUoKTtcbiAgLy8gdXBkYXRlIHNlbGVjdGVkSW5kZXhcbiAgLy8gdHJ5IHRvIG1haW50YWluIHBvc2l0aW9uICYgc2VsZWN0IHByZXZpb3VzIHNlbGVjdGVkIGVsZW1lbnRcbiAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoIHByZXZTZWxlY3RlZEVsZW0gKTtcbiAgaWYgKCBjZWxsICkge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMuZ2V0Q2VsbFNsaWRlSW5kZXgoIGNlbGwgKTtcbiAgfVxuICB0aGlzLnNlbGVjdGVkSW5kZXggPSBNYXRoLm1pbiggdGhpcy5zbGlkZXMubGVuZ3RoIC0gMSwgdGhpcy5zZWxlY3RlZEluZGV4ICk7XG5cbiAgdGhpcy5lbWl0RXZlbnQoICdjZWxsQ2hhbmdlJywgWyBjaGFuZ2VkQ2VsbEluZGV4IF0gKTtcbiAgLy8gcG9zaXRpb24gc2xpZGVyXG4gIHRoaXMuc2VsZWN0KCB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgLy8gZG8gbm90IHBvc2l0aW9uIHNsaWRlciBhZnRlciBsYXp5IGxvYWRcbiAgaWYgKCBpc1Bvc2l0aW9uaW5nU2xpZGVyICkge1xuICAgIHRoaXMucG9zaXRpb25TbGlkZXJBdFNlbGVjdGVkKCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIGFuaW1hdGVcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkZsaWNraXR5ID0gd2luZG93LkZsaWNraXR5IHx8IHt9O1xuICAgIHdpbmRvdy5GbGlja2l0eS5hbmltYXRlUHJvdG90eXBlID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCB1dGlscyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBhbmltYXRlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBwcm90byA9IHt9O1xuXG5wcm90by5zdGFydEFuaW1hdGlvbiA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuaXNBbmltYXRpbmcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gIHRoaXMucmVzdGluZ0ZyYW1lcyA9IDA7XG4gIHRoaXMuYW5pbWF0ZSgpO1xufTtcblxucHJvdG8uYW5pbWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFwcGx5RHJhZ0ZvcmNlKCk7XG4gIHRoaXMuYXBwbHlTZWxlY3RlZEF0dHJhY3Rpb24oKTtcblxuICB2YXIgcHJldmlvdXNYID0gdGhpcy54O1xuXG4gIHRoaXMuaW50ZWdyYXRlUGh5c2ljcygpO1xuICB0aGlzLnBvc2l0aW9uU2xpZGVyKCk7XG4gIHRoaXMuc2V0dGxlKCBwcmV2aW91c1ggKTtcbiAgLy8gYW5pbWF0ZSBuZXh0IGZyYW1lXG4gIGlmICggdGhpcy5pc0FuaW1hdGluZyApIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZnVuY3Rpb24gYW5pbWF0ZUZyYW1lKCkge1xuICAgICAgX3RoaXMuYW5pbWF0ZSgpO1xuICAgIH0pO1xuICB9XG59O1xuXG5wcm90by5wb3NpdGlvblNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgeCA9IHRoaXMueDtcbiAgLy8gd3JhcCBwb3NpdGlvbiBhcm91bmRcbiAgaWYgKCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiB0aGlzLmNlbGxzLmxlbmd0aCA+IDEgKSB7XG4gICAgeCA9IHV0aWxzLm1vZHVsbyggeCwgdGhpcy5zbGlkZWFibGVXaWR0aCApO1xuICAgIHggPSB4IC0gdGhpcy5zbGlkZWFibGVXaWR0aDtcbiAgICB0aGlzLnNoaWZ0V3JhcENlbGxzKCB4ICk7XG4gIH1cblxuICB0aGlzLnNldFRyYW5zbGF0ZVgoIHgsIHRoaXMuaXNBbmltYXRpbmcgKTtcbiAgdGhpcy5kaXNwYXRjaFNjcm9sbEV2ZW50KCk7XG59O1xuXG5wcm90by5zZXRUcmFuc2xhdGVYID0gZnVuY3Rpb24oIHgsIGlzM2QgKSB7XG4gIHggKz0gdGhpcy5jdXJzb3JQb3NpdGlvbjtcbiAgLy8gcmV2ZXJzZSBpZiByaWdodC10by1sZWZ0IGFuZCB1c2luZyB0cmFuc2Zvcm1cbiAgeCA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/IC14IDogeDtcbiAgdmFyIHRyYW5zbGF0ZVggPSB0aGlzLmdldFBvc2l0aW9uVmFsdWUoIHggKTtcbiAgLy8gdXNlIDNEIHRyYW5mb3JtcyBmb3IgaGFyZHdhcmUgYWNjZWxlcmF0aW9uIG9uIGlPU1xuICAvLyBidXQgdXNlIDJEIHdoZW4gc2V0dGxlZCwgZm9yIGJldHRlciBmb250LXJlbmRlcmluZ1xuICB0aGlzLnNsaWRlci5zdHlsZS50cmFuc2Zvcm0gPSBpczNkID9cbiAgICAndHJhbnNsYXRlM2QoJyArIHRyYW5zbGF0ZVggKyAnLDAsMCknIDogJ3RyYW5zbGF0ZVgoJyArIHRyYW5zbGF0ZVggKyAnKSc7XG59O1xuXG5wcm90by5kaXNwYXRjaFNjcm9sbEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmaXJzdFNsaWRlID0gdGhpcy5zbGlkZXNbMF07XG4gIGlmICggIWZpcnN0U2xpZGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwb3NpdGlvblggPSAtdGhpcy54IC0gZmlyc3RTbGlkZS50YXJnZXQ7XG4gIHZhciBwcm9ncmVzcyA9IHBvc2l0aW9uWCAvIHRoaXMuc2xpZGVzV2lkdGg7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3Njcm9sbCcsIG51bGwsIFsgcHJvZ3Jlc3MsIHBvc2l0aW9uWCBdICk7XG59O1xuXG5wcm90by5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5jZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMueCA9IC10aGlzLnNlbGVjdGVkU2xpZGUudGFyZ2V0O1xuICB0aGlzLnZlbG9jaXR5ID0gMDsgLy8gc3RvcCB3b2JibGVcbiAgdGhpcy5wb3NpdGlvblNsaWRlcigpO1xufTtcblxucHJvdG8uZ2V0UG9zaXRpb25WYWx1ZSA9IGZ1bmN0aW9uKCBwb3NpdGlvbiApIHtcbiAgaWYgKCB0aGlzLm9wdGlvbnMucGVyY2VudFBvc2l0aW9uICkge1xuICAgIC8vIHBlcmNlbnQgcG9zaXRpb24sIHJvdW5kIHRvIDIgZGlnaXRzLCBsaWtlIDEyLjM0JVxuICAgIHJldHVybiAoIE1hdGgucm91bmQoICggcG9zaXRpb24gLyB0aGlzLnNpemUuaW5uZXJXaWR0aCApICogMTAwMDAgKSAqIDAuMDEgKSsgJyUnO1xuICB9IGVsc2Uge1xuICAgIC8vIHBpeGVsIHBvc2l0aW9uaW5nXG4gICAgcmV0dXJuIE1hdGgucm91bmQoIHBvc2l0aW9uICkgKyAncHgnO1xuICB9XG59O1xuXG5wcm90by5zZXR0bGUgPSBmdW5jdGlvbiggcHJldmlvdXNYICkge1xuICAvLyBrZWVwIHRyYWNrIG9mIGZyYW1lcyB3aGVyZSB4IGhhc24ndCBtb3ZlZFxuICBpZiAoICF0aGlzLmlzUG9pbnRlckRvd24gJiYgTWF0aC5yb3VuZCggdGhpcy54ICogMTAwICkgPT0gTWF0aC5yb3VuZCggcHJldmlvdXNYICogMTAwICkgKSB7XG4gICAgdGhpcy5yZXN0aW5nRnJhbWVzKys7XG4gIH1cbiAgLy8gc3RvcCBhbmltYXRpbmcgaWYgcmVzdGluZyBmb3IgMyBvciBtb3JlIGZyYW1lc1xuICBpZiAoIHRoaXMucmVzdGluZ0ZyYW1lcyA+IDIgKSB7XG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIGRlbGV0ZSB0aGlzLmlzRnJlZVNjcm9sbGluZztcbiAgICAvLyByZW5kZXIgcG9zaXRpb24gd2l0aCB0cmFuc2xhdGVYIHdoZW4gc2V0dGxlZFxuICAgIHRoaXMucG9zaXRpb25TbGlkZXIoKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoICdzZXR0bGUnLCBudWxsLCBbIHRoaXMuc2VsZWN0ZWRJbmRleCBdICk7XG4gIH1cbn07XG5cbnByb3RvLnNoaWZ0V3JhcENlbGxzID0gZnVuY3Rpb24oIHggKSB7XG4gIC8vIHNoaWZ0IGJlZm9yZSBjZWxsc1xuICB2YXIgYmVmb3JlR2FwID0gdGhpcy5jdXJzb3JQb3NpdGlvbiArIHg7XG4gIHRoaXMuX3NoaWZ0Q2VsbHMoIHRoaXMuYmVmb3JlU2hpZnRDZWxscywgYmVmb3JlR2FwLCAtMSApO1xuICAvLyBzaGlmdCBhZnRlciBjZWxsc1xuICB2YXIgYWZ0ZXJHYXAgPSB0aGlzLnNpemUuaW5uZXJXaWR0aCAtICggeCArIHRoaXMuc2xpZGVhYmxlV2lkdGggKyB0aGlzLmN1cnNvclBvc2l0aW9uICk7XG4gIHRoaXMuX3NoaWZ0Q2VsbHMoIHRoaXMuYWZ0ZXJTaGlmdENlbGxzLCBhZnRlckdhcCwgMSApO1xufTtcblxucHJvdG8uX3NoaWZ0Q2VsbHMgPSBmdW5jdGlvbiggY2VsbHMsIGdhcCwgc2hpZnQgKSB7XG4gIGZvciAoIHZhciBpPTA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgY2VsbCA9IGNlbGxzW2ldO1xuICAgIHZhciBjZWxsU2hpZnQgPSBnYXAgPiAwID8gc2hpZnQgOiAwO1xuICAgIGNlbGwud3JhcFNoaWZ0KCBjZWxsU2hpZnQgKTtcbiAgICBnYXAgLT0gY2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIH1cbn07XG5cbnByb3RvLl91bnNoaWZ0Q2VsbHMgPSBmdW5jdGlvbiggY2VsbHMgKSB7XG4gIGlmICggIWNlbGxzIHx8ICFjZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoIHZhciBpPTA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKyApIHtcbiAgICBjZWxsc1tpXS53cmFwU2hpZnQoIDAgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcGh5c2ljcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by5pbnRlZ3JhdGVQaHlzaWNzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5O1xuICB0aGlzLnZlbG9jaXR5ICo9IHRoaXMuZ2V0RnJpY3Rpb25GYWN0b3IoKTtcbn07XG5cbnByb3RvLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiggZm9yY2UgKSB7XG4gIHRoaXMudmVsb2NpdHkgKz0gZm9yY2U7XG59O1xuXG5wcm90by5nZXRGcmljdGlvbkZhY3RvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gMSAtIHRoaXMub3B0aW9uc1sgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgPyAnZnJlZVNjcm9sbEZyaWN0aW9uJyA6ICdmcmljdGlvbicgXTtcbn07XG5cbnByb3RvLmdldFJlc3RpbmdQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBteSB0aGFua3MgdG8gU3RldmVuIFdpdHRlbnMsIHdobyBzaW1wbGlmaWVkIHRoaXMgbWF0aCBncmVhdGx5XG4gIHJldHVybiB0aGlzLnggKyB0aGlzLnZlbG9jaXR5IC8gKCAxIC0gdGhpcy5nZXRGcmljdGlvbkZhY3RvcigpICk7XG59O1xuXG5wcm90by5hcHBseURyYWdGb3JjZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzRHJhZ2dhYmxlIHx8ICF0aGlzLmlzUG9pbnRlckRvd24gKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGNoYW5nZSB0aGUgcG9zaXRpb24gdG8gZHJhZyBwb3NpdGlvbiBieSBhcHBseWluZyBmb3JjZVxuICB2YXIgZHJhZ1ZlbG9jaXR5ID0gdGhpcy5kcmFnWCAtIHRoaXMueDtcbiAgdmFyIGRyYWdGb3JjZSA9IGRyYWdWZWxvY2l0eSAtIHRoaXMudmVsb2NpdHk7XG4gIHRoaXMuYXBwbHlGb3JjZSggZHJhZ0ZvcmNlICk7XG59O1xuXG5wcm90by5hcHBseVNlbGVjdGVkQXR0cmFjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBkbyBub3QgYXR0cmFjdCBpZiBwb2ludGVyIGRvd24gb3Igbm8gc2xpZGVzXG4gIHZhciBkcmFnRG93biA9IHRoaXMuaXNEcmFnZ2FibGUgJiYgdGhpcy5pc1BvaW50ZXJEb3duO1xuICBpZiAoIGRyYWdEb3duIHx8IHRoaXMuaXNGcmVlU2Nyb2xsaW5nIHx8ICF0aGlzLnNsaWRlcy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBkaXN0YW5jZSA9IHRoaXMuc2VsZWN0ZWRTbGlkZS50YXJnZXQgKiAtMSAtIHRoaXMueDtcbiAgdmFyIGZvcmNlID0gZGlzdGFuY2UgKiB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRBdHRyYWN0aW9uO1xuICB0aGlzLmFwcGx5Rm9yY2UoIGZvcmNlICk7XG59O1xuXG5yZXR1cm4gcHJvdG87XG5cbn0pKTtcbiIsIi8vIEZsaWNraXR5LkNlbGxcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZ2V0LXNpemUvZ2V0LXNpemUnXG4gICAgXSwgZnVuY3Rpb24oIGdldFNpemUgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBnZXRTaXplICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdnZXQtc2l6ZScpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IHdpbmRvdy5GbGlja2l0eSB8fCB7fTtcbiAgICB3aW5kb3cuRmxpY2tpdHkuQ2VsbCA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuZ2V0U2l6ZVxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIGdldFNpemUgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gQ2VsbCggZWxlbSwgcGFyZW50ICkge1xuICB0aGlzLmVsZW1lbnQgPSBlbGVtO1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcblxuICB0aGlzLmNyZWF0ZSgpO1xufVxuXG52YXIgcHJvdG8gPSBDZWxsLnByb3RvdHlwZTtcblxucHJvdG8uY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoICdhcmlhLWhpZGRlbicsICd0cnVlJyApO1xuICB0aGlzLnggPSAwO1xuICB0aGlzLnNoaWZ0ID0gMDtcbn07XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVzZXQgc3R5bGVcbiAgdGhpcy51bnNlbGVjdCgpO1xuICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgdmFyIHNpZGUgPSB0aGlzLnBhcmVudC5vcmlnaW5TaWRlO1xuICB0aGlzLmVsZW1lbnQuc3R5bGVbIHNpZGUgXSA9ICcnO1xufTtcblxucHJvdG8uZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNpemUgPSBnZXRTaXplKCB0aGlzLmVsZW1lbnQgKTtcbn07XG5cbnByb3RvLnNldFBvc2l0aW9uID0gZnVuY3Rpb24oIHggKSB7XG4gIHRoaXMueCA9IHg7XG4gIHRoaXMudXBkYXRlVGFyZ2V0KCk7XG4gIHRoaXMucmVuZGVyUG9zaXRpb24oIHggKTtcbn07XG5cbi8vIHNldERlZmF1bHRUYXJnZXQgdjEgbWV0aG9kLCBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSwgcmVtb3ZlIGluIHYzXG5wcm90by51cGRhdGVUYXJnZXQgPSBwcm90by5zZXREZWZhdWx0VGFyZ2V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJnaW5Qcm9wZXJ0eSA9IHRoaXMucGFyZW50Lm9yaWdpblNpZGUgPT0gJ2xlZnQnID8gJ21hcmdpbkxlZnQnIDogJ21hcmdpblJpZ2h0JztcbiAgdGhpcy50YXJnZXQgPSB0aGlzLnggKyB0aGlzLnNpemVbIG1hcmdpblByb3BlcnR5IF0gK1xuICAgIHRoaXMuc2l6ZS53aWR0aCAqIHRoaXMucGFyZW50LmNlbGxBbGlnbjtcbn07XG5cbnByb3RvLnJlbmRlclBvc2l0aW9uID0gZnVuY3Rpb24oIHggKSB7XG4gIC8vIHJlbmRlciBwb3NpdGlvbiBvZiBjZWxsIHdpdGggaW4gc2xpZGVyXG4gIHZhciBzaWRlID0gdGhpcy5wYXJlbnQub3JpZ2luU2lkZTtcbiAgdGhpcy5lbGVtZW50LnN0eWxlWyBzaWRlIF0gPSB0aGlzLnBhcmVudC5nZXRQb3NpdGlvblZhbHVlKCB4ICk7XG59O1xuXG5wcm90by5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLXNlbGVjdGVkJyk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG59O1xuXG5wcm90by51bnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtc2VsZWN0ZWQnKTtcbiAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSggJ2FyaWEtaGlkZGVuJywgJ3RydWUnICk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SW50ZWdlcn0gZmFjdG9yIC0gMCwgMSwgb3IgLTFcbioqL1xucHJvdG8ud3JhcFNoaWZ0ID0gZnVuY3Rpb24oIHNoaWZ0ICkge1xuICB0aGlzLnNoaWZ0ID0gc2hpZnQ7XG4gIHRoaXMucmVuZGVyUG9zaXRpb24oIHRoaXMueCArIHRoaXMucGFyZW50LnNsaWRlYWJsZVdpZHRoICogc2hpZnQgKTtcbn07XG5cbnByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG59O1xuXG5yZXR1cm4gQ2VsbDtcblxufSkpO1xuIiwiLy8gZHJhZ1xuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICd1bmlkcmFnZ2VyL3VuaWRyYWdnZXInLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgVW5pZHJhZ2dlciwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pZHJhZ2dlciwgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ3VuaWRyYWdnZXInKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkZsaWNraXR5ID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5VbmlkcmFnZ2VyLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlkcmFnZ2VyLCB1dGlscyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLSBkZWZhdWx0cyAtLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIEZsaWNraXR5LmRlZmF1bHRzLCB7XG4gIGRyYWdnYWJsZTogJz4xJyxcbiAgZHJhZ1RocmVzaG9sZDogMyxcbn0pO1xuXG4vLyAtLS0tLSBjcmVhdGUgLS0tLS0gLy9cblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlRHJhZycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkcmFnIHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG51dGlscy5leHRlbmQoIHByb3RvLCBVbmlkcmFnZ2VyLnByb3RvdHlwZSApO1xucHJvdG8uX3RvdWNoQWN0aW9uVmFsdWUgPSAncGFuLXknO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIGlzVG91Y2ggPSAnY3JlYXRlVG91Y2gnIGluIGRvY3VtZW50O1xudmFyIGlzVG91Y2htb3ZlU2Nyb2xsQ2FuY2VsZWQgPSBmYWxzZTtcblxucHJvdG8uX2NyZWF0ZURyYWcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vbiggJ2FjdGl2YXRlJywgdGhpcy5vbkFjdGl2YXRlRHJhZyApO1xuICB0aGlzLm9uKCAndWlDaGFuZ2UnLCB0aGlzLl91aUNoYW5nZURyYWcgKTtcbiAgdGhpcy5vbiggJ2RlYWN0aXZhdGUnLCB0aGlzLm9uRGVhY3RpdmF0ZURyYWcgKTtcbiAgdGhpcy5vbiggJ2NlbGxDaGFuZ2UnLCB0aGlzLnVwZGF0ZURyYWdnYWJsZSApO1xuICAvLyBUT0RPIHVwZGF0ZURyYWdnYWJsZSBvbiByZXNpemU/IGlmIGdyb3VwQ2VsbHMgJiBzbGlkZXMgY2hhbmdlXG4gIC8vIEhBQ0sgLSBhZGQgc2VlbWluZ2x5IGlubm9jdW91cyBoYW5kbGVyIHRvIGZpeCBpT1MgMTAgc2Nyb2xsIGJlaGF2aW9yXG4gIC8vICM0NTcsIFJ1YmFYYS9Tb3J0YWJsZSM5NzNcbiAgaWYgKCBpc1RvdWNoICYmICFpc1RvdWNobW92ZVNjcm9sbENhbmNlbGVkICkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgZnVuY3Rpb24oKSB7fSk7XG4gICAgaXNUb3VjaG1vdmVTY3JvbGxDYW5jZWxlZCA9IHRydWU7XG4gIH1cbn07XG5cbnByb3RvLm9uQWN0aXZhdGVEcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaGFuZGxlcyA9IFsgdGhpcy52aWV3cG9ydCBdO1xuICB0aGlzLmJpbmRIYW5kbGVzKCk7XG4gIHRoaXMudXBkYXRlRHJhZ2dhYmxlKCk7XG59O1xuXG5wcm90by5vbkRlYWN0aXZhdGVEcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudW5iaW5kSGFuZGxlcygpO1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtZHJhZ2dhYmxlJyk7XG59O1xuXG5wcm90by51cGRhdGVEcmFnZ2FibGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gZGlzYWJsZSBkcmFnZ2luZyBpZiBsZXNzIHRoYW4gMiBzbGlkZXMuICMyNzhcbiAgaWYgKCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlID09ICc+MScgKSB7XG4gICAgdGhpcy5pc0RyYWdnYWJsZSA9IHRoaXMuc2xpZGVzLmxlbmd0aCA+IDE7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pc0RyYWdnYWJsZSA9IHRoaXMub3B0aW9ucy5kcmFnZ2FibGU7XG4gIH1cbiAgaWYgKCB0aGlzLmlzRHJhZ2dhYmxlICkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1kcmFnZ2FibGUnKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtZHJhZ2dhYmxlJyk7XG4gIH1cbn07XG5cbi8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5wcm90by5iaW5kRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgdGhpcy51cGRhdGVEcmFnZ2FibGUoKTtcbn07XG5cbnByb3RvLnVuYmluZERyYWcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSA9IGZhbHNlO1xuICB0aGlzLnVwZGF0ZURyYWdnYWJsZSgpO1xufTtcblxucHJvdG8uX3VpQ2hhbmdlRHJhZyA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5pc0ZyZWVTY3JvbGxpbmc7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwb2ludGVyIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by5wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgaWYgKCAhdGhpcy5pc0RyYWdnYWJsZSApIHtcbiAgICB0aGlzLl9wb2ludGVyRG93bkRlZmF1bHQoIGV2ZW50LCBwb2ludGVyICk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpc09rYXkgPSB0aGlzLm9rYXlQb2ludGVyRG93biggZXZlbnQgKTtcbiAgaWYgKCAhaXNPa2F5ICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuX3BvaW50ZXJEb3duUHJldmVudERlZmF1bHQoIGV2ZW50ICk7XG4gIHRoaXMucG9pbnRlckRvd25Gb2N1cyggZXZlbnQgKTtcbiAgLy8gYmx1clxuICBpZiAoIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT0gdGhpcy5lbGVtZW50ICkge1xuICAgIC8vIGRvIG5vdCBibHVyIGlmIGFscmVhZHkgZm9jdXNlZFxuICAgIHRoaXMucG9pbnRlckRvd25CbHVyKCk7XG4gIH1cblxuICAvLyBzdG9wIGlmIGl0IHdhcyBtb3ZpbmdcbiAgdGhpcy5kcmFnWCA9IHRoaXMueDtcbiAgdGhpcy52aWV3cG9ydC5jbGFzc0xpc3QuYWRkKCdpcy1wb2ludGVyLWRvd24nKTtcbiAgLy8gdHJhY2sgc2Nyb2xsaW5nXG4gIHRoaXMucG9pbnRlckRvd25TY3JvbGwgPSBnZXRTY3JvbGxQb3NpdGlvbigpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHRoaXMgKTtcblxuICB0aGlzLl9wb2ludGVyRG93bkRlZmF1bHQoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG4vLyBkZWZhdWx0IHBvaW50ZXJEb3duIGxvZ2ljLCB1c2VkIGZvciBzdGF0aWNDbGlja1xucHJvdG8uX3BvaW50ZXJEb3duRGVmYXVsdCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gdHJhY2sgc3RhcnQgZXZlbnQgcG9zaXRpb25cbiAgLy8gU2FmYXJpIDkgb3ZlcnJpZGVzIHBhZ2VYIGFuZCBwYWdlWS4gVGhlc2UgdmFsdWVzIG5lZWRzIHRvIGJlIGNvcGllZC4gIzc3OVxuICB0aGlzLnBvaW50ZXJEb3duUG9pbnRlciA9IHtcbiAgICBwYWdlWDogcG9pbnRlci5wYWdlWCxcbiAgICBwYWdlWTogcG9pbnRlci5wYWdlWSxcbiAgfTtcbiAgLy8gYmluZCBtb3ZlIGFuZCBlbmQgZXZlbnRzXG4gIHRoaXMuX2JpbmRQb3N0U3RhcnRFdmVudHMoIGV2ZW50ICk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3BvaW50ZXJEb3duJywgZXZlbnQsIFsgcG9pbnRlciBdICk7XG59O1xuXG52YXIgZm9jdXNOb2RlcyA9IHtcbiAgSU5QVVQ6IHRydWUsXG4gIFRFWFRBUkVBOiB0cnVlLFxuICBTRUxFQ1Q6IHRydWUsXG59O1xuXG5wcm90by5wb2ludGVyRG93bkZvY3VzID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgaXNGb2N1c05vZGUgPSBmb2N1c05vZGVzWyBldmVudC50YXJnZXQubm9kZU5hbWUgXTtcbiAgaWYgKCAhaXNGb2N1c05vZGUgKSB7XG4gICAgdGhpcy5mb2N1cygpO1xuICB9XG59O1xuXG5wcm90by5fcG9pbnRlckRvd25QcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIGlzVG91Y2hTdGFydCA9IGV2ZW50LnR5cGUgPT0gJ3RvdWNoc3RhcnQnO1xuICB2YXIgaXNUb3VjaFBvaW50ZXIgPSBldmVudC5wb2ludGVyVHlwZSA9PSAndG91Y2gnO1xuICB2YXIgaXNGb2N1c05vZGUgPSBmb2N1c05vZGVzWyBldmVudC50YXJnZXQubm9kZU5hbWUgXTtcbiAgaWYgKCAhaXNUb3VjaFN0YXJ0ICYmICFpc1RvdWNoUG9pbnRlciAmJiAhaXNGb2N1c05vZGUgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gbW92ZSAtLS0tLSAvL1xuXG5wcm90by5oYXNEcmFnU3RhcnRlZCA9IGZ1bmN0aW9uKCBtb3ZlVmVjdG9yICkge1xuICByZXR1cm4gTWF0aC5hYnMoIG1vdmVWZWN0b3IueCApID4gdGhpcy5vcHRpb25zLmRyYWdUaHJlc2hvbGQ7XG59O1xuXG4vLyAtLS0tLSB1cCAtLS0tLSAvL1xuXG5wcm90by5wb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGRlbGV0ZSB0aGlzLmlzVG91Y2hTY3JvbGxpbmc7XG4gIHRoaXMudmlld3BvcnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtcG9pbnRlci1kb3duJyk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3BvaW50ZXJVcCcsIGV2ZW50LCBbIHBvaW50ZXIgXSApO1xuICB0aGlzLl9kcmFnUG9pbnRlclVwKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8ucG9pbnRlckRvbmUgPSBmdW5jdGlvbigpIHtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB0aGlzICk7XG4gIGRlbGV0ZSB0aGlzLnBvaW50ZXJEb3duU2Nyb2xsO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZ2dpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8uZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBpZiAoICF0aGlzLmlzRHJhZ2dhYmxlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uID0gdGhpcy54O1xuICB0aGlzLnN0YXJ0QW5pbWF0aW9uKCk7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgdGhpcyApO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdkcmFnU3RhcnQnLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbn07XG5cbnByb3RvLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgbW92ZVZlY3RvciA9IHRoaXMuX2RyYWdQb2ludGVyTW92ZSggZXZlbnQsIHBvaW50ZXIgKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAncG9pbnRlck1vdmUnLCBldmVudCwgWyBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbiAgdGhpcy5fZHJhZ01vdmUoIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICk7XG59O1xuXG5wcm90by5kcmFnTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApIHtcbiAgaWYgKCAhdGhpcy5pc0RyYWdnYWJsZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICB0aGlzLnByZXZpb3VzRHJhZ1ggPSB0aGlzLmRyYWdYO1xuICAvLyByZXZlcnNlIGlmIHJpZ2h0LXRvLWxlZnRcbiAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/IC0xIDogMTtcbiAgaWYgKCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCApIHtcbiAgICAvLyB3cmFwIGFyb3VuZCBtb3ZlLiAjNTg5XG4gICAgbW92ZVZlY3Rvci54ID0gbW92ZVZlY3Rvci54ICUgdGhpcy5zbGlkZWFibGVXaWR0aDtcbiAgfVxuICB2YXIgZHJhZ1ggPSB0aGlzLmRyYWdTdGFydFBvc2l0aW9uICsgbW92ZVZlY3Rvci54ICogZGlyZWN0aW9uO1xuXG4gIGlmICggIXRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIHRoaXMuc2xpZGVzLmxlbmd0aCApIHtcbiAgICAvLyBzbG93IGRyYWdcbiAgICB2YXIgb3JpZ2luQm91bmQgPSBNYXRoLm1heCggLXRoaXMuc2xpZGVzWzBdLnRhcmdldCwgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiApO1xuICAgIGRyYWdYID0gZHJhZ1ggPiBvcmlnaW5Cb3VuZCA/ICggZHJhZ1ggKyBvcmlnaW5Cb3VuZCApICogMC41IDogZHJhZ1g7XG4gICAgdmFyIGVuZEJvdW5kID0gTWF0aC5taW4oIC10aGlzLmdldExhc3RTbGlkZSgpLnRhcmdldCwgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiApO1xuICAgIGRyYWdYID0gZHJhZ1ggPCBlbmRCb3VuZCA/ICggZHJhZ1ggKyBlbmRCb3VuZCApICogMC41IDogZHJhZ1g7XG4gIH1cblxuICB0aGlzLmRyYWdYID0gZHJhZ1g7XG5cbiAgdGhpcy5kcmFnTW92ZVRpbWUgPSBuZXcgRGF0ZSgpO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdkcmFnTW92ZScsIGV2ZW50LCBbIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xufTtcblxucHJvdG8uZHJhZ0VuZCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgaWYgKCAhdGhpcy5pc0RyYWdnYWJsZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCB0aGlzLm9wdGlvbnMuZnJlZVNjcm9sbCApIHtcbiAgICB0aGlzLmlzRnJlZVNjcm9sbGluZyA9IHRydWU7XG4gIH1cbiAgLy8gc2V0IHNlbGVjdGVkSW5kZXggYmFzZWQgb24gd2hlcmUgZmxpY2sgd2lsbCBlbmQgdXBcbiAgdmFyIGluZGV4ID0gdGhpcy5kcmFnRW5kUmVzdGluZ1NlbGVjdCgpO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLmZyZWVTY3JvbGwgJiYgIXRoaXMub3B0aW9ucy53cmFwQXJvdW5kICkge1xuICAgIC8vIGlmIGZyZWUtc2Nyb2xsICYgbm90IHdyYXAgYXJvdW5kXG4gICAgLy8gZG8gbm90IGZyZWUtc2Nyb2xsIGlmIGdvaW5nIG91dHNpZGUgb2YgYm91bmRpbmcgc2xpZGVzXG4gICAgLy8gc28gYm91bmRpbmcgc2xpZGVzIGNhbiBhdHRyYWN0IHNsaWRlciwgYW5kIGtlZXAgaXQgaW4gYm91bmRzXG4gICAgdmFyIHJlc3RpbmdYID0gdGhpcy5nZXRSZXN0aW5nUG9zaXRpb24oKTtcbiAgICB0aGlzLmlzRnJlZVNjcm9sbGluZyA9IC1yZXN0aW5nWCA+IHRoaXMuc2xpZGVzWzBdLnRhcmdldCAmJlxuICAgICAgLXJlc3RpbmdYIDwgdGhpcy5nZXRMYXN0U2xpZGUoKS50YXJnZXQ7XG4gIH0gZWxzZSBpZiAoICF0aGlzLm9wdGlvbnMuZnJlZVNjcm9sbCAmJiBpbmRleCA9PSB0aGlzLnNlbGVjdGVkSW5kZXggKSB7XG4gICAgLy8gYm9vc3Qgc2VsZWN0aW9uIGlmIHNlbGVjdGVkIGluZGV4IGhhcyBub3QgY2hhbmdlZFxuICAgIGluZGV4ICs9IHRoaXMuZHJhZ0VuZEJvb3N0U2VsZWN0KCk7XG4gIH1cbiAgZGVsZXRlIHRoaXMucHJldmlvdXNEcmFnWDtcbiAgLy8gYXBwbHkgc2VsZWN0aW9uXG4gIC8vIFRPRE8gcmVmYWN0b3IgdGhpcywgc2VsZWN0aW5nIGhlcmUgZmVlbHMgd2VpcmRcbiAgLy8gSEFDSywgc2V0IGZsYWcgc28gZHJhZ2dpbmcgc3RheXMgaW4gY29ycmVjdCBkaXJlY3Rpb25cbiAgdGhpcy5pc0RyYWdTZWxlY3QgPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZDtcbiAgdGhpcy5zZWxlY3QoIGluZGV4ICk7XG4gIGRlbGV0ZSB0aGlzLmlzRHJhZ1NlbGVjdDtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnZHJhZ0VuZCcsIGV2ZW50LCBbIHBvaW50ZXIgXSApO1xufTtcblxucHJvdG8uZHJhZ0VuZFJlc3RpbmdTZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc3RpbmdYID0gdGhpcy5nZXRSZXN0aW5nUG9zaXRpb24oKTtcbiAgLy8gaG93IGZhciBhd2F5IGZyb20gc2VsZWN0ZWQgc2xpZGVcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5hYnMoIHRoaXMuZ2V0U2xpZGVEaXN0YW5jZSggLXJlc3RpbmdYLCB0aGlzLnNlbGVjdGVkSW5kZXggKSApO1xuICAvLyBnZXQgY2xvc2V0IHJlc3RpbmcgZ29pbmcgdXAgYW5kIGdvaW5nIGRvd25cbiAgdmFyIHBvc2l0aXZlUmVzdGluZyA9IHRoaXMuX2dldENsb3Nlc3RSZXN0aW5nKCByZXN0aW5nWCwgZGlzdGFuY2UsIDEgKTtcbiAgdmFyIG5lZ2F0aXZlUmVzdGluZyA9IHRoaXMuX2dldENsb3Nlc3RSZXN0aW5nKCByZXN0aW5nWCwgZGlzdGFuY2UsIC0xICk7XG4gIC8vIHVzZSBjbG9zZXIgcmVzdGluZyBmb3Igd3JhcC1hcm91bmRcbiAgdmFyIGluZGV4ID0gcG9zaXRpdmVSZXN0aW5nLmRpc3RhbmNlIDwgbmVnYXRpdmVSZXN0aW5nLmRpc3RhbmNlID9cbiAgICBwb3NpdGl2ZVJlc3RpbmcuaW5kZXggOiBuZWdhdGl2ZVJlc3RpbmcuaW5kZXg7XG4gIHJldHVybiBpbmRleDtcbn07XG5cbi8qKlxuICogZ2l2ZW4gcmVzdGluZyBYIGFuZCBkaXN0YW5jZSB0byBzZWxlY3RlZCBjZWxsXG4gKiBnZXQgdGhlIGRpc3RhbmNlIGFuZCBpbmRleCBvZiB0aGUgY2xvc2VzdCBjZWxsXG4gKiBAcGFyYW0ge051bWJlcn0gcmVzdGluZ1ggLSBlc3RpbWF0ZWQgcG9zdC1mbGljayByZXN0aW5nIHBvc2l0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gZGlzdGFuY2UgLSBkaXN0YW5jZSB0byBzZWxlY3RlZCBjZWxsXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluY3JlbWVudCAtICsxIG9yIC0xLCBnb2luZyB1cCBvciBkb3duXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAtIHsgZGlzdGFuY2U6IHtOdW1iZXJ9LCBpbmRleDoge0ludGVnZXJ9IH1cbiAqL1xucHJvdG8uX2dldENsb3Nlc3RSZXN0aW5nID0gZnVuY3Rpb24oIHJlc3RpbmdYLCBkaXN0YW5jZSwgaW5jcmVtZW50ICkge1xuICB2YXIgaW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXg7XG4gIHZhciBtaW5EaXN0YW5jZSA9IEluZmluaXR5O1xuICB2YXIgY29uZGl0aW9uID0gdGhpcy5vcHRpb25zLmNvbnRhaW4gJiYgIXRoaXMub3B0aW9ucy53cmFwQXJvdW5kID9cbiAgICAvLyBpZiBjb250YWluLCBrZWVwIGdvaW5nIGlmIGRpc3RhbmNlIGlzIGVxdWFsIHRvIG1pbkRpc3RhbmNlXG4gICAgZnVuY3Rpb24oIGQsIG1kICkgeyByZXR1cm4gZCA8PSBtZDsgfSA6IGZ1bmN0aW9uKCBkLCBtZCApIHsgcmV0dXJuIGQgPCBtZDsgfTtcbiAgd2hpbGUgKCBjb25kaXRpb24oIGRpc3RhbmNlLCBtaW5EaXN0YW5jZSApICkge1xuICAgIC8vIG1lYXN1cmUgZGlzdGFuY2UgdG8gbmV4dCBjZWxsXG4gICAgaW5kZXggKz0gaW5jcmVtZW50O1xuICAgIG1pbkRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgZGlzdGFuY2UgPSB0aGlzLmdldFNsaWRlRGlzdGFuY2UoIC1yZXN0aW5nWCwgaW5kZXggKTtcbiAgICBpZiAoIGRpc3RhbmNlID09PSBudWxsICkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoIGRpc3RhbmNlICk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBkaXN0YW5jZTogbWluRGlzdGFuY2UsXG4gICAgLy8gc2VsZWN0ZWQgd2FzIHByZXZpb3VzIGluZGV4XG4gICAgaW5kZXg6IGluZGV4IC0gaW5jcmVtZW50XG4gIH07XG59O1xuXG4vKipcbiAqIG1lYXN1cmUgZGlzdGFuY2UgYmV0d2VlbiB4IGFuZCBhIHNsaWRlIHRhcmdldFxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBzbGlkZSBpbmRleFxuICovXG5wcm90by5nZXRTbGlkZURpc3RhbmNlID0gZnVuY3Rpb24oIHgsIGluZGV4ICkge1xuICB2YXIgbGVuID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAvLyB3cmFwIGFyb3VuZCBpZiBhdCBsZWFzdCAyIHNsaWRlc1xuICB2YXIgaXNXcmFwQXJvdW5kID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgbGVuID4gMTtcbiAgdmFyIHNsaWRlSW5kZXggPSBpc1dyYXBBcm91bmQgPyB1dGlscy5tb2R1bG8oIGluZGV4LCBsZW4gKSA6IGluZGV4O1xuICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlc1sgc2xpZGVJbmRleCBdO1xuICBpZiAoICFzbGlkZSApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBhZGQgZGlzdGFuY2UgZm9yIHdyYXAtYXJvdW5kIHNsaWRlc1xuICB2YXIgd3JhcCA9IGlzV3JhcEFyb3VuZCA/IHRoaXMuc2xpZGVhYmxlV2lkdGggKiBNYXRoLmZsb29yKCBpbmRleCAvIGxlbiApIDogMDtcbiAgcmV0dXJuIHggLSAoIHNsaWRlLnRhcmdldCArIHdyYXAgKTtcbn07XG5cbnByb3RvLmRyYWdFbmRCb29zdFNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICAvLyBkbyBub3QgYm9vc3QgaWYgbm8gcHJldmlvdXNEcmFnWCBvciBkcmFnTW92ZVRpbWVcbiAgaWYgKCB0aGlzLnByZXZpb3VzRHJhZ1ggPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5kcmFnTW92ZVRpbWUgfHxcbiAgICAvLyBvciBpZiBkcmFnIHdhcyBoZWxkIGZvciAxMDAgbXNcbiAgICBuZXcgRGF0ZSgpIC0gdGhpcy5kcmFnTW92ZVRpbWUgPiAxMDAgKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgZGlzdGFuY2UgPSB0aGlzLmdldFNsaWRlRGlzdGFuY2UoIC10aGlzLmRyYWdYLCB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgdmFyIGRlbHRhID0gdGhpcy5wcmV2aW91c0RyYWdYIC0gdGhpcy5kcmFnWDtcbiAgaWYgKCBkaXN0YW5jZSA+IDAgJiYgZGVsdGEgPiAwICkge1xuICAgIC8vIGJvb3N0IHRvIG5leHQgaWYgbW92aW5nIHRvd2FyZHMgdGhlIHJpZ2h0LCBhbmQgcG9zaXRpdmUgdmVsb2NpdHlcbiAgICByZXR1cm4gMTtcbiAgfSBlbHNlIGlmICggZGlzdGFuY2UgPCAwICYmIGRlbHRhIDwgMCApIHtcbiAgICAvLyBib29zdCB0byBwcmV2aW91cyBpZiBtb3ZpbmcgdG93YXJkcyB0aGUgbGVmdCwgYW5kIG5lZ2F0aXZlIHZlbG9jaXR5XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuLy8gLS0tLS0gc3RhdGljQ2xpY2sgLS0tLS0gLy9cblxucHJvdG8uc3RhdGljQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIGdldCBjbGlja2VkQ2VsbCwgaWYgY2VsbCB3YXMgY2xpY2tlZFxuICB2YXIgY2xpY2tlZENlbGwgPSB0aGlzLmdldFBhcmVudENlbGwoIGV2ZW50LnRhcmdldCApO1xuICB2YXIgY2VsbEVsZW0gPSBjbGlja2VkQ2VsbCAmJiBjbGlja2VkQ2VsbC5lbGVtZW50O1xuICB2YXIgY2VsbEluZGV4ID0gY2xpY2tlZENlbGwgJiYgdGhpcy5jZWxscy5pbmRleE9mKCBjbGlja2VkQ2VsbCApO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdzdGF0aWNDbGljaycsIGV2ZW50LCBbIHBvaW50ZXIsIGNlbGxFbGVtLCBjZWxsSW5kZXggXSApO1xufTtcblxuLy8gLS0tLS0gc2Nyb2xsIC0tLS0tIC8vXG5cbnByb3RvLm9uc2Nyb2xsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzY3JvbGwgPSBnZXRTY3JvbGxQb3NpdGlvbigpO1xuICB2YXIgc2Nyb2xsTW92ZVggPSB0aGlzLnBvaW50ZXJEb3duU2Nyb2xsLnggLSBzY3JvbGwueDtcbiAgdmFyIHNjcm9sbE1vdmVZID0gdGhpcy5wb2ludGVyRG93blNjcm9sbC55IC0gc2Nyb2xsLnk7XG4gIC8vIGNhbmNlbCBjbGljay90YXAgaWYgc2Nyb2xsIGlzIHRvbyBtdWNoXG4gIGlmICggTWF0aC5hYnMoIHNjcm9sbE1vdmVYICkgPiAzIHx8IE1hdGguYWJzKCBzY3JvbGxNb3ZlWSApID4gMyApIHtcbiAgICB0aGlzLl9wb2ludGVyRG9uZSgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSB1dGlscyAtLS0tLSAvL1xuXG5mdW5jdGlvbiBnZXRTY3JvbGxQb3NpdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICB4OiB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgeTogd2luZG93LnBhZ2VZT2Zmc2V0XG4gIH07XG59XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIEZsaWNraXR5IG1haW5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZXYtZW1pdHRlci9ldi1lbWl0dGVyJyxcbiAgICAgICdnZXQtc2l6ZS9nZXQtc2l6ZScsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnLFxuICAgICAgJy4vY2VsbCcsXG4gICAgICAnLi9zbGlkZScsXG4gICAgICAnLi9hbmltYXRlJ1xuICAgIF0sIGZ1bmN0aW9uKCBFdkVtaXR0ZXIsIGdldFNpemUsIHV0aWxzLCBDZWxsLCBTbGlkZSwgYW5pbWF0ZVByb3RvdHlwZSApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciwgZ2V0U2l6ZSwgdXRpbHMsIENlbGwsIFNsaWRlLCBhbmltYXRlUHJvdG90eXBlICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdldi1lbWl0dGVyJyksXG4gICAgICByZXF1aXJlKCdnZXQtc2l6ZScpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICAgIHJlcXVpcmUoJy4vY2VsbCcpLFxuICAgICAgcmVxdWlyZSgnLi9zbGlkZScpLFxuICAgICAgcmVxdWlyZSgnLi9hbmltYXRlJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgdmFyIF9GbGlja2l0eSA9IHdpbmRvdy5GbGlja2l0eTtcblxuICAgIHdpbmRvdy5GbGlja2l0eSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRXZFbWl0dGVyLFxuICAgICAgd2luZG93LmdldFNpemUsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzLFxuICAgICAgX0ZsaWNraXR5LkNlbGwsXG4gICAgICBfRmxpY2tpdHkuU2xpZGUsXG4gICAgICBfRmxpY2tpdHkuYW5pbWF0ZVByb3RvdHlwZVxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciwgZ2V0U2l6ZSxcbiAgdXRpbHMsIENlbGwsIFNsaWRlLCBhbmltYXRlUHJvdG90eXBlICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIHZhcnNcbnZhciBqUXVlcnkgPSB3aW5kb3cualF1ZXJ5O1xudmFyIGdldENvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZTtcbnZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG5cbmZ1bmN0aW9uIG1vdmVFbGVtZW50cyggZWxlbXMsIHRvRWxlbSApIHtcbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHdoaWxlICggZWxlbXMubGVuZ3RoICkge1xuICAgIHRvRWxlbS5hcHBlbmRDaGlsZCggZWxlbXMuc2hpZnQoKSApO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZsaWNraXR5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdsb2JhbGx5IHVuaXF1ZSBpZGVudGlmaWVyc1xudmFyIEdVSUQgPSAwO1xuLy8gaW50ZXJuYWwgc3RvcmUgb2YgYWxsIEZsaWNraXR5IGludGFuY2VzXG52YXIgaW5zdGFuY2VzID0ge307XG5cbmZ1bmN0aW9uIEZsaWNraXR5KCBlbGVtZW50LCBvcHRpb25zICkge1xuICB2YXIgcXVlcnlFbGVtZW50ID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtZW50ICk7XG4gIGlmICggIXF1ZXJ5RWxlbWVudCApIHtcbiAgICBpZiAoIGNvbnNvbGUgKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCAnQmFkIGVsZW1lbnQgZm9yIEZsaWNraXR5OiAnICsgKCBxdWVyeUVsZW1lbnQgfHwgZWxlbWVudCApICk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQgPSBxdWVyeUVsZW1lbnQ7XG4gIC8vIGRvIG5vdCBpbml0aWFsaXplIHR3aWNlIG9uIHNhbWUgZWxlbWVudFxuICBpZiAoIHRoaXMuZWxlbWVudC5mbGlja2l0eUdVSUQgKSB7XG4gICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VzWyB0aGlzLmVsZW1lbnQuZmxpY2tpdHlHVUlEIF07XG4gICAgaW5zdGFuY2Uub3B0aW9uKCBvcHRpb25zICk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgLy8gYWRkIGpRdWVyeVxuICBpZiAoIGpRdWVyeSApIHtcbiAgICB0aGlzLiRlbGVtZW50ID0galF1ZXJ5KCB0aGlzLmVsZW1lbnQgKTtcbiAgfVxuICAvLyBvcHRpb25zXG4gIHRoaXMub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCgge30sIHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdHMgKTtcbiAgdGhpcy5vcHRpb24oIG9wdGlvbnMgKTtcblxuICAvLyBraWNrIHRoaW5ncyBvZmZcbiAgdGhpcy5fY3JlYXRlKCk7XG59XG5cbkZsaWNraXR5LmRlZmF1bHRzID0ge1xuICBhY2Nlc3NpYmlsaXR5OiB0cnVlLFxuICAvLyBhZGFwdGl2ZUhlaWdodDogZmFsc2UsXG4gIGNlbGxBbGlnbjogJ2NlbnRlcicsXG4gIC8vIGNlbGxTZWxlY3RvcjogdW5kZWZpbmVkLFxuICAvLyBjb250YWluOiBmYWxzZSxcbiAgZnJlZVNjcm9sbEZyaWN0aW9uOiAwLjA3NSwgLy8gZnJpY3Rpb24gd2hlbiBmcmVlLXNjcm9sbGluZ1xuICBmcmljdGlvbjogMC4yOCwgLy8gZnJpY3Rpb24gd2hlbiBzZWxlY3RpbmdcbiAgbmFtZXNwYWNlSlF1ZXJ5RXZlbnRzOiB0cnVlLFxuICAvLyBpbml0aWFsSW5kZXg6IDAsXG4gIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcbiAgcmVzaXplOiB0cnVlLFxuICBzZWxlY3RlZEF0dHJhY3Rpb246IDAuMDI1LFxuICBzZXRHYWxsZXJ5U2l6ZTogdHJ1ZVxuICAvLyB3YXRjaENTUzogZmFsc2UsXG4gIC8vIHdyYXBBcm91bmQ6IGZhbHNlXG59O1xuXG4vLyBoYXNoIG9mIG1ldGhvZHMgdHJpZ2dlcmVkIG9uIF9jcmVhdGUoKVxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcyA9IFtdO1xuXG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG4vLyBpbmhlcml0IEV2ZW50RW1pdHRlclxudXRpbHMuZXh0ZW5kKCBwcm90bywgRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG5wcm90by5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGFkZCBpZCBmb3IgRmxpY2tpdHkuZGF0YVxuICB2YXIgaWQgPSB0aGlzLmd1aWQgPSArK0dVSUQ7XG4gIHRoaXMuZWxlbWVudC5mbGlja2l0eUdVSUQgPSBpZDsgLy8gZXhwYW5kb1xuICBpbnN0YW5jZXNbIGlkIF0gPSB0aGlzOyAvLyBhc3NvY2lhdGUgdmlhIGlkXG4gIC8vIGluaXRpYWwgcHJvcGVydGllc1xuICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAvLyBob3cgbWFueSBmcmFtZXMgc2xpZGVyIGhhcyBiZWVuIGluIHNhbWUgcG9zaXRpb25cbiAgdGhpcy5yZXN0aW5nRnJhbWVzID0gMDtcbiAgLy8gaW5pdGlhbCBwaHlzaWNzIHByb3BlcnRpZXNcbiAgdGhpcy54ID0gMDtcbiAgdGhpcy52ZWxvY2l0eSA9IDA7XG4gIHRoaXMub3JpZ2luU2lkZSA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/ICdyaWdodCcgOiAnbGVmdCc7XG4gIC8vIGNyZWF0ZSB2aWV3cG9ydCAmIHNsaWRlclxuICB0aGlzLnZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRoaXMudmlld3BvcnQuY2xhc3NOYW1lID0gJ2ZsaWNraXR5LXZpZXdwb3J0JztcbiAgdGhpcy5fY3JlYXRlU2xpZGVyKCk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMucmVzaXplIHx8IHRoaXMub3B0aW9ucy53YXRjaENTUyApIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMgKTtcbiAgfVxuXG4gIC8vIGFkZCBsaXN0ZW5lcnMgZnJvbSBvbiBvcHRpb25cbiAgZm9yICggdmFyIGV2ZW50TmFtZSBpbiB0aGlzLm9wdGlvbnMub24gKSB7XG4gICAgdmFyIGxpc3RlbmVyID0gdGhpcy5vcHRpb25zLm9uWyBldmVudE5hbWUgXTtcbiAgICB0aGlzLm9uKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gIH1cblxuICBGbGlja2l0eS5jcmVhdGVNZXRob2RzLmZvckVhY2goIGZ1bmN0aW9uKCBtZXRob2QgKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oKTtcbiAgfSwgdGhpcyApO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLndhdGNoQ1NTICkge1xuICAgIHRoaXMud2F0Y2hDU1MoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFjdGl2YXRlKCk7XG4gIH1cblxufTtcblxuLyoqXG4gKiBzZXQgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xucHJvdG8ub3B0aW9uID0gZnVuY3Rpb24oIG9wdHMgKSB7XG4gIHV0aWxzLmV4dGVuZCggdGhpcy5vcHRpb25zLCBvcHRzICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuaXNBY3RpdmUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxpY2tpdHktZW5hYmxlZCcpO1xuICBpZiAoIHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCApIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxpY2tpdHktcnRsJyk7XG4gIH1cblxuICB0aGlzLmdldFNpemUoKTtcbiAgLy8gbW92ZSBpbml0aWFsIGNlbGwgZWxlbWVudHMgc28gdGhleSBjYW4gYmUgbG9hZGVkIGFzIGNlbGxzXG4gIHZhciBjZWxsRWxlbXMgPSB0aGlzLl9maWx0ZXJGaW5kQ2VsbEVsZW1lbnRzKCB0aGlzLmVsZW1lbnQuY2hpbGRyZW4gKTtcbiAgbW92ZUVsZW1lbnRzKCBjZWxsRWxlbXMsIHRoaXMuc2xpZGVyICk7XG4gIHRoaXMudmlld3BvcnQuYXBwZW5kQ2hpbGQoIHRoaXMuc2xpZGVyICk7XG4gIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCggdGhpcy52aWV3cG9ydCApO1xuICAvLyBnZXQgY2VsbHMgZnJvbSBjaGlsZHJlblxuICB0aGlzLnJlbG9hZENlbGxzKCk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSApIHtcbiAgICAvLyBhbGxvdyBlbGVtZW50IHRvIGZvY3VzYWJsZVxuICAgIHRoaXMuZWxlbWVudC50YWJJbmRleCA9IDA7XG4gICAgLy8gbGlzdGVuIGZvciBrZXkgcHJlc3Nlc1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIHRoaXMgKTtcbiAgfVxuXG4gIHRoaXMuZW1pdEV2ZW50KCdhY3RpdmF0ZScpO1xuICB0aGlzLnNlbGVjdEluaXRpYWxJbmRleCgpO1xuICAvLyBmbGFnIGZvciBpbml0aWFsIGFjdGl2YXRpb24sIGZvciB1c2luZyBpbml0aWFsSW5kZXhcbiAgdGhpcy5pc0luaXRBY3RpdmF0ZWQgPSB0cnVlO1xuICAvLyByZWFkeSBldmVudC4gIzQ5M1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoJ3JlYWR5Jyk7XG59O1xuXG4vLyBzbGlkZXIgcG9zaXRpb25zIHRoZSBjZWxsc1xucHJvdG8uX2NyZWF0ZVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAvLyBzbGlkZXIgZWxlbWVudCBkb2VzIGFsbCB0aGUgcG9zaXRpb25pbmdcbiAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBzbGlkZXIuY2xhc3NOYW1lID0gJ2ZsaWNraXR5LXNsaWRlcic7XG4gIHNsaWRlci5zdHlsZVsgdGhpcy5vcmlnaW5TaWRlIF0gPSAwO1xuICB0aGlzLnNsaWRlciA9IHNsaWRlcjtcbn07XG5cbnByb3RvLl9maWx0ZXJGaW5kQ2VsbEVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICByZXR1cm4gdXRpbHMuZmlsdGVyRmluZEVsZW1lbnRzKCBlbGVtcywgdGhpcy5vcHRpb25zLmNlbGxTZWxlY3RvciApO1xufTtcblxuLy8gZ29lcyB0aHJvdWdoIGFsbCBjaGlsZHJlblxucHJvdG8ucmVsb2FkQ2VsbHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gY29sbGVjdGlvbiBvZiBpdGVtIGVsZW1lbnRzXG4gIHRoaXMuY2VsbHMgPSB0aGlzLl9tYWtlQ2VsbHMoIHRoaXMuc2xpZGVyLmNoaWxkcmVuICk7XG4gIHRoaXMucG9zaXRpb25DZWxscygpO1xuICB0aGlzLl9nZXRXcmFwU2hpZnRDZWxscygpO1xuICB0aGlzLnNldEdhbGxlcnlTaXplKCk7XG59O1xuXG4vKipcbiAqIHR1cm4gZWxlbWVudHMgaW50byBGbGlja2l0eS5DZWxsc1xuICogQHBhcmFtIHtBcnJheSBvciBOb2RlTGlzdCBvciBIVE1MRWxlbWVudH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXMgLSBjb2xsZWN0aW9uIG9mIG5ldyBGbGlja2l0eSBDZWxsc1xuICovXG5wcm90by5fbWFrZUNlbGxzID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB2YXIgY2VsbEVsZW1zID0gdGhpcy5fZmlsdGVyRmluZENlbGxFbGVtZW50cyggZWxlbXMgKTtcblxuICAvLyBjcmVhdGUgbmV3IEZsaWNraXR5IGZvciBjb2xsZWN0aW9uXG4gIHZhciBjZWxscyA9IGNlbGxFbGVtcy5tYXAoIGZ1bmN0aW9uKCBjZWxsRWxlbSApIHtcbiAgICByZXR1cm4gbmV3IENlbGwoIGNlbGxFbGVtLCB0aGlzICk7XG4gIH0sIHRoaXMgKTtcblxuICByZXR1cm4gY2VsbHM7XG59O1xuXG5wcm90by5nZXRMYXN0Q2VsbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZWxsc1sgdGhpcy5jZWxscy5sZW5ndGggLSAxIF07XG59O1xuXG5wcm90by5nZXRMYXN0U2xpZGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2xpZGVzWyB0aGlzLnNsaWRlcy5sZW5ndGggLSAxIF07XG59O1xuXG4vLyBwb3NpdGlvbnMgYWxsIGNlbGxzXG5wcm90by5wb3NpdGlvbkNlbGxzID0gZnVuY3Rpb24oKSB7XG4gIC8vIHNpemUgYWxsIGNlbGxzXG4gIHRoaXMuX3NpemVDZWxscyggdGhpcy5jZWxscyApO1xuICAvLyBwb3NpdGlvbiBhbGwgY2VsbHNcbiAgdGhpcy5fcG9zaXRpb25DZWxscyggMCApO1xufTtcblxuLyoqXG4gKiBwb3NpdGlvbiBjZXJ0YWluIGNlbGxzXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gd2hpY2ggY2VsbCB0byBzdGFydCB3aXRoXG4gKi9cbnByb3RvLl9wb3NpdGlvbkNlbGxzID0gZnVuY3Rpb24oIGluZGV4ICkge1xuICBpbmRleCA9IGluZGV4IHx8IDA7XG4gIC8vIGFsc28gbWVhc3VyZSBtYXhDZWxsSGVpZ2h0XG4gIC8vIHN0YXJ0IDAgaWYgcG9zaXRpb25pbmcgYWxsIGNlbGxzXG4gIHRoaXMubWF4Q2VsbEhlaWdodCA9IGluZGV4ID8gdGhpcy5tYXhDZWxsSGVpZ2h0IHx8IDAgOiAwO1xuICB2YXIgY2VsbFggPSAwO1xuICAvLyBnZXQgY2VsbFhcbiAgaWYgKCBpbmRleCA+IDAgKSB7XG4gICAgdmFyIHN0YXJ0Q2VsbCA9IHRoaXMuY2VsbHNbIGluZGV4IC0gMSBdO1xuICAgIGNlbGxYID0gc3RhcnRDZWxsLnggKyBzdGFydENlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICB9XG4gIHZhciBsZW4gPSB0aGlzLmNlbGxzLmxlbmd0aDtcbiAgZm9yICggdmFyIGk9aW5kZXg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMuY2VsbHNbaV07XG4gICAgY2VsbC5zZXRQb3NpdGlvbiggY2VsbFggKTtcbiAgICBjZWxsWCArPSBjZWxsLnNpemUub3V0ZXJXaWR0aDtcbiAgICB0aGlzLm1heENlbGxIZWlnaHQgPSBNYXRoLm1heCggY2VsbC5zaXplLm91dGVySGVpZ2h0LCB0aGlzLm1heENlbGxIZWlnaHQgKTtcbiAgfVxuICAvLyBrZWVwIHRyYWNrIG9mIGNlbGxYIGZvciB3cmFwLWFyb3VuZFxuICB0aGlzLnNsaWRlYWJsZVdpZHRoID0gY2VsbFg7XG4gIC8vIHNsaWRlc1xuICB0aGlzLnVwZGF0ZVNsaWRlcygpO1xuICAvLyBjb250YWluIHNsaWRlcyB0YXJnZXRcbiAgdGhpcy5fY29udGFpblNsaWRlcygpO1xuICAvLyB1cGRhdGUgc2xpZGVzV2lkdGhcbiAgdGhpcy5zbGlkZXNXaWR0aCA9IGxlbiA/IHRoaXMuZ2V0TGFzdFNsaWRlKCkudGFyZ2V0IC0gdGhpcy5zbGlkZXNbMF0udGFyZ2V0IDogMDtcbn07XG5cbi8qKlxuICogY2VsbC5nZXRTaXplKCkgb24gbXVsdGlwbGUgY2VsbHNcbiAqIEBwYXJhbSB7QXJyYXl9IGNlbGxzXG4gKi9cbnByb3RvLl9zaXplQ2VsbHMgPSBmdW5jdGlvbiggY2VsbHMgKSB7XG4gIGNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwuZ2V0U2l6ZSgpO1xuICB9KTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by51cGRhdGVTbGlkZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zbGlkZXMgPSBbXTtcbiAgaWYgKCAhdGhpcy5jZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHNsaWRlID0gbmV3IFNsaWRlKCB0aGlzICk7XG4gIHRoaXMuc2xpZGVzLnB1c2goIHNsaWRlICk7XG4gIHZhciBpc09yaWdpbkxlZnQgPSB0aGlzLm9yaWdpblNpZGUgPT0gJ2xlZnQnO1xuICB2YXIgbmV4dE1hcmdpbiA9IGlzT3JpZ2luTGVmdCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG5cbiAgdmFyIGNhbkNlbGxGaXQgPSB0aGlzLl9nZXRDYW5DZWxsRml0KCk7XG5cbiAgdGhpcy5jZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCwgaSApIHtcbiAgICAvLyBqdXN0IGFkZCBjZWxsIGlmIGZpcnN0IGNlbGwgaW4gc2xpZGVcbiAgICBpZiAoICFzbGlkZS5jZWxscy5sZW5ndGggKSB7XG4gICAgICBzbGlkZS5hZGRDZWxsKCBjZWxsICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNsaWRlV2lkdGggPSAoIHNsaWRlLm91dGVyV2lkdGggLSBzbGlkZS5maXJzdE1hcmdpbiApICtcbiAgICAgICggY2VsbC5zaXplLm91dGVyV2lkdGggLSBjZWxsLnNpemVbIG5leHRNYXJnaW4gXSApO1xuXG4gICAgaWYgKCBjYW5DZWxsRml0LmNhbGwoIHRoaXMsIGksIHNsaWRlV2lkdGggKSApIHtcbiAgICAgIHNsaWRlLmFkZENlbGwoIGNlbGwgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZG9lc24ndCBmaXQsIG5ldyBzbGlkZVxuICAgICAgc2xpZGUudXBkYXRlVGFyZ2V0KCk7XG5cbiAgICAgIHNsaWRlID0gbmV3IFNsaWRlKCB0aGlzICk7XG4gICAgICB0aGlzLnNsaWRlcy5wdXNoKCBzbGlkZSApO1xuICAgICAgc2xpZGUuYWRkQ2VsbCggY2VsbCApO1xuICAgIH1cbiAgfSwgdGhpcyApO1xuICAvLyBsYXN0IHNsaWRlXG4gIHNsaWRlLnVwZGF0ZVRhcmdldCgpO1xuICAvLyB1cGRhdGUgLnNlbGVjdGVkU2xpZGVcbiAgdGhpcy51cGRhdGVTZWxlY3RlZFNsaWRlKCk7XG59O1xuXG5wcm90by5fZ2V0Q2FuQ2VsbEZpdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZ3JvdXBDZWxscyA9IHRoaXMub3B0aW9ucy5ncm91cENlbGxzO1xuICBpZiAoICFncm91cENlbGxzICkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgZ3JvdXBDZWxscyA9PSAnbnVtYmVyJyApIHtcbiAgICAvLyBncm91cCBieSBudW1iZXIuIDMgLT4gWzAsMSwyXSwgWzMsNCw1XSwgLi4uXG4gICAgdmFyIG51bWJlciA9IHBhcnNlSW50KCBncm91cENlbGxzLCAxMCApO1xuICAgIHJldHVybiBmdW5jdGlvbiggaSApIHtcbiAgICAgIHJldHVybiAoIGkgJSBudW1iZXIgKSAhPT0gMDtcbiAgICB9O1xuICB9XG4gIC8vIGRlZmF1bHQsIGdyb3VwIGJ5IHdpZHRoIG9mIHNsaWRlXG4gIC8vIHBhcnNlICc3NSVcbiAgdmFyIHBlcmNlbnRNYXRjaCA9IHR5cGVvZiBncm91cENlbGxzID09ICdzdHJpbmcnICYmXG4gICAgZ3JvdXBDZWxscy5tYXRjaCgvXihcXGQrKSUkLyk7XG4gIHZhciBwZXJjZW50ID0gcGVyY2VudE1hdGNoID8gcGFyc2VJbnQoIHBlcmNlbnRNYXRjaFsxXSwgMTAgKSAvIDEwMCA6IDE7XG4gIHJldHVybiBmdW5jdGlvbiggaSwgc2xpZGVXaWR0aCApIHtcbiAgICByZXR1cm4gc2xpZGVXaWR0aCA8PSAoIHRoaXMuc2l6ZS5pbm5lcldpZHRoICsgMSApICogcGVyY2VudDtcbiAgfTtcbn07XG5cbi8vIGFsaWFzIF9pbml0IGZvciBqUXVlcnkgcGx1Z2luIC5mbGlja2l0eSgpXG5wcm90by5faW5pdCA9XG5wcm90by5yZXBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucG9zaXRpb25DZWxscygpO1xuICB0aGlzLnBvc2l0aW9uU2xpZGVyQXRTZWxlY3RlZCgpO1xufTtcblxucHJvdG8uZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNpemUgPSBnZXRTaXplKCB0aGlzLmVsZW1lbnQgKTtcbiAgdGhpcy5zZXRDZWxsQWxpZ24oKTtcbiAgdGhpcy5jdXJzb3JQb3NpdGlvbiA9IHRoaXMuc2l6ZS5pbm5lcldpZHRoICogdGhpcy5jZWxsQWxpZ247XG59O1xuXG52YXIgY2VsbEFsaWduU2hvcnRoYW5kcyA9IHtcbiAgLy8gY2VsbCBhbGlnbiwgdGhlbiBiYXNlZCBvbiBvcmlnaW4gc2lkZVxuICBjZW50ZXI6IHtcbiAgICBsZWZ0OiAwLjUsXG4gICAgcmlnaHQ6IDAuNVxuICB9LFxuICBsZWZ0OiB7XG4gICAgbGVmdDogMCxcbiAgICByaWdodDogMVxuICB9LFxuICByaWdodDoge1xuICAgIHJpZ2h0OiAwLFxuICAgIGxlZnQ6IDFcbiAgfVxufTtcblxucHJvdG8uc2V0Q2VsbEFsaWduID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzaG9ydGhhbmQgPSBjZWxsQWxpZ25TaG9ydGhhbmRzWyB0aGlzLm9wdGlvbnMuY2VsbEFsaWduIF07XG4gIHRoaXMuY2VsbEFsaWduID0gc2hvcnRoYW5kID8gc2hvcnRoYW5kWyB0aGlzLm9yaWdpblNpZGUgXSA6IHRoaXMub3B0aW9ucy5jZWxsQWxpZ247XG59O1xuXG5wcm90by5zZXRHYWxsZXJ5U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMub3B0aW9ucy5zZXRHYWxsZXJ5U2l6ZSApIHtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ICYmIHRoaXMuc2VsZWN0ZWRTbGlkZSA/XG4gICAgICB0aGlzLnNlbGVjdGVkU2xpZGUuaGVpZ2h0IDogdGhpcy5tYXhDZWxsSGVpZ2h0O1xuICAgIHRoaXMudmlld3BvcnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgfVxufTtcblxucHJvdG8uX2dldFdyYXBTaGlmdENlbGxzID0gZnVuY3Rpb24oKSB7XG4gIC8vIG9ubHkgZm9yIHdyYXAtYXJvdW5kXG4gIGlmICggIXRoaXMub3B0aW9ucy53cmFwQXJvdW5kICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB1bnNoaWZ0IHByZXZpb3VzIGNlbGxzXG4gIHRoaXMuX3Vuc2hpZnRDZWxscyggdGhpcy5iZWZvcmVTaGlmdENlbGxzICk7XG4gIHRoaXMuX3Vuc2hpZnRDZWxscyggdGhpcy5hZnRlclNoaWZ0Q2VsbHMgKTtcbiAgLy8gZ2V0IGJlZm9yZSBjZWxsc1xuICAvLyBpbml0aWFsIGdhcFxuICB2YXIgZ2FwWCA9IHRoaXMuY3Vyc29yUG9zaXRpb247XG4gIHZhciBjZWxsSW5kZXggPSB0aGlzLmNlbGxzLmxlbmd0aCAtIDE7XG4gIHRoaXMuYmVmb3JlU2hpZnRDZWxscyA9IHRoaXMuX2dldEdhcENlbGxzKCBnYXBYLCBjZWxsSW5kZXgsIC0xICk7XG4gIC8vIGdldCBhZnRlciBjZWxsc1xuICAvLyBlbmRpbmcgZ2FwIGJldHdlZW4gbGFzdCBjZWxsIGFuZCBlbmQgb2YgZ2FsbGVyeSB2aWV3cG9ydFxuICBnYXBYID0gdGhpcy5zaXplLmlubmVyV2lkdGggLSB0aGlzLmN1cnNvclBvc2l0aW9uO1xuICAvLyBzdGFydCBjbG9uaW5nIGF0IGZpcnN0IGNlbGwsIHdvcmtpbmcgZm9yd2FyZHNcbiAgdGhpcy5hZnRlclNoaWZ0Q2VsbHMgPSB0aGlzLl9nZXRHYXBDZWxscyggZ2FwWCwgMCwgMSApO1xufTtcblxucHJvdG8uX2dldEdhcENlbGxzID0gZnVuY3Rpb24oIGdhcFgsIGNlbGxJbmRleCwgaW5jcmVtZW50ICkge1xuICAvLyBrZWVwIGFkZGluZyBjZWxscyB1bnRpbCB0aGUgY292ZXIgdGhlIGluaXRpYWwgZ2FwXG4gIHZhciBjZWxscyA9IFtdO1xuICB3aGlsZSAoIGdhcFggPiAwICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1sgY2VsbEluZGV4IF07XG4gICAgaWYgKCAhY2VsbCApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjZWxscy5wdXNoKCBjZWxsICk7XG4gICAgY2VsbEluZGV4ICs9IGluY3JlbWVudDtcbiAgICBnYXBYIC09IGNlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICB9XG4gIHJldHVybiBjZWxscztcbn07XG5cbi8vIC0tLS0tIGNvbnRhaW4gLS0tLS0gLy9cblxuLy8gY29udGFpbiBjZWxsIHRhcmdldHMgc28gbm8gZXhjZXNzIHNsaWRpbmdcbnByb3RvLl9jb250YWluU2xpZGVzID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5jb250YWluIHx8IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kIHx8ICF0aGlzLmNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGlzUmlnaHRUb0xlZnQgPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQ7XG4gIHZhciBiZWdpbk1hcmdpbiA9IGlzUmlnaHRUb0xlZnQgPyAnbWFyZ2luUmlnaHQnIDogJ21hcmdpbkxlZnQnO1xuICB2YXIgZW5kTWFyZ2luID0gaXNSaWdodFRvTGVmdCA/ICdtYXJnaW5MZWZ0JyA6ICdtYXJnaW5SaWdodCc7XG4gIHZhciBjb250ZW50V2lkdGggPSB0aGlzLnNsaWRlYWJsZVdpZHRoIC0gdGhpcy5nZXRMYXN0Q2VsbCgpLnNpemVbIGVuZE1hcmdpbiBdO1xuICAvLyBjb250ZW50IGlzIGxlc3MgdGhhbiBnYWxsZXJ5IHNpemVcbiAgdmFyIGlzQ29udGVudFNtYWxsZXIgPSBjb250ZW50V2lkdGggPCB0aGlzLnNpemUuaW5uZXJXaWR0aDtcbiAgLy8gYm91bmRzXG4gIHZhciBiZWdpbkJvdW5kID0gdGhpcy5jdXJzb3JQb3NpdGlvbiArIHRoaXMuY2VsbHNbMF0uc2l6ZVsgYmVnaW5NYXJnaW4gXTtcbiAgdmFyIGVuZEJvdW5kID0gY29udGVudFdpZHRoIC0gdGhpcy5zaXplLmlubmVyV2lkdGggKiAoIDEgLSB0aGlzLmNlbGxBbGlnbiApO1xuICAvLyBjb250YWluIGVhY2ggY2VsbCB0YXJnZXRcbiAgdGhpcy5zbGlkZXMuZm9yRWFjaCggZnVuY3Rpb24oIHNsaWRlICkge1xuICAgIGlmICggaXNDb250ZW50U21hbGxlciApIHtcbiAgICAgIC8vIGFsbCBjZWxscyBmaXQgaW5zaWRlIGdhbGxlcnlcbiAgICAgIHNsaWRlLnRhcmdldCA9IGNvbnRlbnRXaWR0aCAqIHRoaXMuY2VsbEFsaWduO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb250YWluIHRvIGJvdW5kc1xuICAgICAgc2xpZGUudGFyZ2V0ID0gTWF0aC5tYXgoIHNsaWRlLnRhcmdldCwgYmVnaW5Cb3VuZCApO1xuICAgICAgc2xpZGUudGFyZ2V0ID0gTWF0aC5taW4oIHNsaWRlLnRhcmdldCwgZW5kQm91bmQgKTtcbiAgICB9XG4gIH0sIHRoaXMgKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG4vKipcbiAqIGVtaXRzIGV2ZW50cyB2aWEgZXZlbnRFbWl0dGVyIGFuZCBqUXVlcnkgZXZlbnRzXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIG5hbWUgb2YgZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gb3JpZ2luYWwgZXZlbnRcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgLSBleHRyYSBhcmd1bWVudHNcbiAqL1xucHJvdG8uZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKCB0eXBlLCBldmVudCwgYXJncyApIHtcbiAgdmFyIGVtaXRBcmdzID0gZXZlbnQgPyBbIGV2ZW50IF0uY29uY2F0KCBhcmdzICkgOiBhcmdzO1xuICB0aGlzLmVtaXRFdmVudCggdHlwZSwgZW1pdEFyZ3MgKTtcblxuICBpZiAoIGpRdWVyeSAmJiB0aGlzLiRlbGVtZW50ICkge1xuICAgIC8vIGRlZmF1bHQgdHJpZ2dlciB3aXRoIHR5cGUgaWYgbm8gZXZlbnRcbiAgICB0eXBlICs9IHRoaXMub3B0aW9ucy5uYW1lc3BhY2VKUXVlcnlFdmVudHMgPyAnLmZsaWNraXR5JyA6ICcnO1xuICAgIHZhciAkZXZlbnQgPSB0eXBlO1xuICAgIGlmICggZXZlbnQgKSB7XG4gICAgICAvLyBjcmVhdGUgalF1ZXJ5IGV2ZW50XG4gICAgICB2YXIgalFFdmVudCA9IGpRdWVyeS5FdmVudCggZXZlbnQgKTtcbiAgICAgIGpRRXZlbnQudHlwZSA9IHR5cGU7XG4gICAgICAkZXZlbnQgPSBqUUV2ZW50O1xuICAgIH1cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoICRldmVudCwgYXJncyApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBzZWxlY3QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzV3JhcCAtIHdpbGwgd3JhcC1hcm91bmQgdG8gbGFzdC9maXJzdCBpZiBhdCB0aGUgZW5kXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzSW5zdGFudCAtIHdpbGwgaW1tZWRpYXRlbHkgc2V0IHBvc2l0aW9uIGF0IHNlbGVjdGVkIGNlbGxcbiAqL1xucHJvdG8uc2VsZWN0ID0gZnVuY3Rpb24oIGluZGV4LCBpc1dyYXAsIGlzSW5zdGFudCApIHtcbiAgaWYgKCAhdGhpcy5pc0FjdGl2ZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaW5kZXggPSBwYXJzZUludCggaW5kZXgsIDEwICk7XG4gIHRoaXMuX3dyYXBTZWxlY3QoIGluZGV4ICk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCB8fCBpc1dyYXAgKSB7XG4gICAgaW5kZXggPSB1dGlscy5tb2R1bG8oIGluZGV4LCB0aGlzLnNsaWRlcy5sZW5ndGggKTtcbiAgfVxuICAvLyBiYWlsIGlmIGludmFsaWQgaW5kZXhcbiAgaWYgKCAhdGhpcy5zbGlkZXNbIGluZGV4IF0gKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwcmV2SW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXg7XG4gIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICB0aGlzLnVwZGF0ZVNlbGVjdGVkU2xpZGUoKTtcbiAgaWYgKCBpc0luc3RhbnQgKSB7XG4gICAgdGhpcy5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YXJ0QW5pbWF0aW9uKCk7XG4gIH1cbiAgaWYgKCB0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgKSB7XG4gICAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSgpO1xuICB9XG4gIC8vIGV2ZW50c1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdzZWxlY3QnLCBudWxsLCBbIGluZGV4IF0gKTtcbiAgLy8gY2hhbmdlIGV2ZW50IGlmIG5ldyBpbmRleFxuICBpZiAoIGluZGV4ICE9IHByZXZJbmRleCApIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoICdjaGFuZ2UnLCBudWxsLCBbIGluZGV4IF0gKTtcbiAgfVxuICAvLyBvbGQgdjEgZXZlbnQgbmFtZSwgcmVtb3ZlIGluIHYzXG4gIHRoaXMuZGlzcGF0Y2hFdmVudCgnY2VsbFNlbGVjdCcpO1xufTtcblxuLy8gd3JhcHMgcG9zaXRpb24gZm9yIHdyYXBBcm91bmQsIHRvIG1vdmUgdG8gY2xvc2VzdCBzbGlkZS4gIzExM1xucHJvdG8uX3dyYXBTZWxlY3QgPSBmdW5jdGlvbiggaW5kZXggKSB7XG4gIHZhciBsZW4gPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gIHZhciBpc1dyYXBwaW5nID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgbGVuID4gMTtcbiAgaWYgKCAhaXNXcmFwcGluZyApIHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cbiAgdmFyIHdyYXBJbmRleCA9IHV0aWxzLm1vZHVsbyggaW5kZXgsIGxlbiApO1xuICAvLyBnbyB0byBzaG9ydGVzdFxuICB2YXIgZGVsdGEgPSBNYXRoLmFicyggd3JhcEluZGV4IC0gdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIHZhciBiYWNrV3JhcERlbHRhID0gTWF0aC5hYnMoICggd3JhcEluZGV4ICsgbGVuICkgLSB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgdmFyIGZvcmV3YXJkV3JhcERlbHRhID0gTWF0aC5hYnMoICggd3JhcEluZGV4IC0gbGVuICkgLSB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgaWYgKCAhdGhpcy5pc0RyYWdTZWxlY3QgJiYgYmFja1dyYXBEZWx0YSA8IGRlbHRhICkge1xuICAgIGluZGV4ICs9IGxlbjtcbiAgfSBlbHNlIGlmICggIXRoaXMuaXNEcmFnU2VsZWN0ICYmIGZvcmV3YXJkV3JhcERlbHRhIDwgZGVsdGEgKSB7XG4gICAgaW5kZXggLT0gbGVuO1xuICB9XG4gIC8vIHdyYXAgcG9zaXRpb24gc28gc2xpZGVyIGlzIHdpdGhpbiBub3JtYWwgYXJlYVxuICBpZiAoIGluZGV4IDwgMCApIHtcbiAgICB0aGlzLnggLT0gdGhpcy5zbGlkZWFibGVXaWR0aDtcbiAgfSBlbHNlIGlmICggaW5kZXggPj0gbGVuICkge1xuICAgIHRoaXMueCArPSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICB9XG59O1xuXG5wcm90by5wcmV2aW91cyA9IGZ1bmN0aW9uKCBpc1dyYXAsIGlzSW5zdGFudCApIHtcbiAgdGhpcy5zZWxlY3QoIHRoaXMuc2VsZWN0ZWRJbmRleCAtIDEsIGlzV3JhcCwgaXNJbnN0YW50ICk7XG59O1xuXG5wcm90by5uZXh0ID0gZnVuY3Rpb24oIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICB0aGlzLnNlbGVjdCggdGhpcy5zZWxlY3RlZEluZGV4ICsgMSwgaXNXcmFwLCBpc0luc3RhbnQgKTtcbn07XG5cbnByb3RvLnVwZGF0ZVNlbGVjdGVkU2xpZGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNsaWRlID0gdGhpcy5zbGlkZXNbIHRoaXMuc2VsZWN0ZWRJbmRleCBdO1xuICAvLyBzZWxlY3RlZEluZGV4IGNvdWxkIGJlIG91dHNpZGUgb2Ygc2xpZGVzLCBpZiB0cmlnZ2VyZWQgYmVmb3JlIHJlc2l6ZSgpXG4gIGlmICggIXNsaWRlICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB1bnNlbGVjdCBwcmV2aW91cyBzZWxlY3RlZCBzbGlkZVxuICB0aGlzLnVuc2VsZWN0U2VsZWN0ZWRTbGlkZSgpO1xuICAvLyB1cGRhdGUgbmV3IHNlbGVjdGVkIHNsaWRlXG4gIHRoaXMuc2VsZWN0ZWRTbGlkZSA9IHNsaWRlO1xuICBzbGlkZS5zZWxlY3QoKTtcbiAgdGhpcy5zZWxlY3RlZENlbGxzID0gc2xpZGUuY2VsbHM7XG4gIHRoaXMuc2VsZWN0ZWRFbGVtZW50cyA9IHNsaWRlLmdldENlbGxFbGVtZW50cygpO1xuICAvLyBIQUNLOiBzZWxlY3RlZENlbGwgJiBzZWxlY3RlZEVsZW1lbnQgaXMgZmlyc3QgY2VsbCBpbiBzbGlkZSwgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgLy8gUmVtb3ZlIGluIHYzP1xuICB0aGlzLnNlbGVjdGVkQ2VsbCA9IHNsaWRlLmNlbGxzWzBdO1xuICB0aGlzLnNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc2VsZWN0ZWRFbGVtZW50c1swXTtcbn07XG5cbnByb3RvLnVuc2VsZWN0U2VsZWN0ZWRTbGlkZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuc2VsZWN0ZWRTbGlkZSApIHtcbiAgICB0aGlzLnNlbGVjdGVkU2xpZGUudW5zZWxlY3QoKTtcbiAgfVxufTtcblxucHJvdG8uc2VsZWN0SW5pdGlhbEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpbml0aWFsSW5kZXggPSB0aGlzLm9wdGlvbnMuaW5pdGlhbEluZGV4O1xuICAvLyBhbHJlYWR5IGFjdGl2YXRlZCwgc2VsZWN0IHByZXZpb3VzIHNlbGVjdGVkSW5kZXhcbiAgaWYgKCB0aGlzLmlzSW5pdEFjdGl2YXRlZCApIHtcbiAgICB0aGlzLnNlbGVjdCggdGhpcy5zZWxlY3RlZEluZGV4LCBmYWxzZSwgdHJ1ZSApO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBzZWxlY3Qgd2l0aCBzZWxlY3RvciBzdHJpbmdcbiAgaWYgKCBpbml0aWFsSW5kZXggJiYgdHlwZW9mIGluaXRpYWxJbmRleCA9PSAnc3RyaW5nJyApIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMucXVlcnlDZWxsKCBpbml0aWFsSW5kZXggKTtcbiAgICBpZiAoIGNlbGwgKSB7XG4gICAgICB0aGlzLnNlbGVjdENlbGwoIGluaXRpYWxJbmRleCwgZmFsc2UsIHRydWUgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICB2YXIgaW5kZXggPSAwO1xuICAvLyBzZWxlY3Qgd2l0aCBudW1iZXJcbiAgaWYgKCBpbml0aWFsSW5kZXggJiYgdGhpcy5zbGlkZXNbIGluaXRpYWxJbmRleCBdICkge1xuICAgIGluZGV4ID0gaW5pdGlhbEluZGV4O1xuICB9XG4gIC8vIHNlbGVjdCBpbnN0YW50bHlcbiAgdGhpcy5zZWxlY3QoIGluZGV4LCBmYWxzZSwgdHJ1ZSApO1xufTtcblxuLyoqXG4gKiBzZWxlY3Qgc2xpZGUgZnJvbSBudW1iZXIgb3IgY2VsbCBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnQgb3IgTnVtYmVyfSBlbGVtXG4gKi9cbnByb3RvLnNlbGVjdENlbGwgPSBmdW5jdGlvbiggdmFsdWUsIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICAvLyBnZXQgY2VsbFxuICB2YXIgY2VsbCA9IHRoaXMucXVlcnlDZWxsKCB2YWx1ZSApO1xuICBpZiAoICFjZWxsICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBpbmRleCA9IHRoaXMuZ2V0Q2VsbFNsaWRlSW5kZXgoIGNlbGwgKTtcbiAgdGhpcy5zZWxlY3QoIGluZGV4LCBpc1dyYXAsIGlzSW5zdGFudCApO1xufTtcblxucHJvdG8uZ2V0Q2VsbFNsaWRlSW5kZXggPSBmdW5jdGlvbiggY2VsbCApIHtcbiAgLy8gZ2V0IGluZGV4IG9mIHNsaWRlcyB0aGF0IGhhcyBjZWxsXG4gIGZvciAoIHZhciBpPTA7IGkgPCB0aGlzLnNsaWRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlc1tpXTtcbiAgICB2YXIgaW5kZXggPSBzbGlkZS5jZWxscy5pbmRleE9mKCBjZWxsICk7XG4gICAgaWYgKCBpbmRleCAhPSAtMSApIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0IGNlbGxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogZ2V0IEZsaWNraXR5LkNlbGwsIGdpdmVuIGFuIEVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHJldHVybnMge0ZsaWNraXR5LkNlbGx9IGl0ZW1cbiAqL1xucHJvdG8uZ2V0Q2VsbCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAvLyBsb29wIHRocm91Z2ggY2VsbHMgdG8gZ2V0IHRoZSBvbmUgdGhhdCBtYXRjaGVzXG4gIGZvciAoIHZhciBpPTA7IGkgPCB0aGlzLmNlbGxzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1tpXTtcbiAgICBpZiAoIGNlbGwuZWxlbWVudCA9PSBlbGVtICkge1xuICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIGdldCBjb2xsZWN0aW9uIG9mIEZsaWNraXR5LkNlbGxzLCBnaXZlbiBFbGVtZW50c1xuICogQHBhcmFtIHtFbGVtZW50LCBBcnJheSwgTm9kZUxpc3R9IGVsZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGNlbGxzIC0gRmxpY2tpdHkuQ2VsbHNcbiAqL1xucHJvdG8uZ2V0Q2VsbHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBlbGVtcyApO1xuICB2YXIgY2VsbHMgPSBbXTtcbiAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoIGVsZW0gKTtcbiAgICBpZiAoIGNlbGwgKSB7XG4gICAgICBjZWxscy5wdXNoKCBjZWxsICk7XG4gICAgfVxuICB9LCB0aGlzICk7XG4gIHJldHVybiBjZWxscztcbn07XG5cbi8qKlxuICogZ2V0IGNlbGwgZWxlbWVudHNcbiAqIEByZXR1cm5zIHtBcnJheX0gY2VsbEVsZW1zXG4gKi9cbnByb3RvLmdldENlbGxFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZWxscy5tYXAoIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIHJldHVybiBjZWxsLmVsZW1lbnQ7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBnZXQgcGFyZW50IGNlbGwgZnJvbSBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtGbGlja2l0LkNlbGx9IGNlbGxcbiAqL1xucHJvdG8uZ2V0UGFyZW50Q2VsbCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAvLyBmaXJzdCBjaGVjayBpZiBlbGVtIGlzIGNlbGxcbiAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoIGVsZW0gKTtcbiAgaWYgKCBjZWxsICkge1xuICAgIHJldHVybiBjZWxsO1xuICB9XG4gIC8vIHRyeSB0byBnZXQgcGFyZW50IGNlbGwgZWxlbVxuICBlbGVtID0gdXRpbHMuZ2V0UGFyZW50KCBlbGVtLCAnLmZsaWNraXR5LXNsaWRlciA+IConICk7XG4gIHJldHVybiB0aGlzLmdldENlbGwoIGVsZW0gKTtcbn07XG5cbi8qKlxuICogZ2V0IGNlbGxzIGFkamFjZW50IHRvIGEgc2xpZGVcbiAqIEBwYXJhbSB7SW50ZWdlcn0gYWRqQ291bnQgLSBudW1iZXIgb2YgYWRqYWNlbnQgc2xpZGVzXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gaW5kZXggb2Ygc2xpZGUgdG8gc3RhcnRcbiAqIEByZXR1cm5zIHtBcnJheX0gY2VsbHMgLSBhcnJheSBvZiBGbGlja2l0eS5DZWxsc1xuICovXG5wcm90by5nZXRBZGphY2VudENlbGxFbGVtZW50cyA9IGZ1bmN0aW9uKCBhZGpDb3VudCwgaW5kZXggKSB7XG4gIGlmICggIWFkakNvdW50ICkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkU2xpZGUuZ2V0Q2VsbEVsZW1lbnRzKCk7XG4gIH1cbiAgaW5kZXggPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGhpcy5zZWxlY3RlZEluZGV4IDogaW5kZXg7XG5cbiAgdmFyIGxlbiA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgaWYgKCAxICsgKCBhZGpDb3VudCAqIDIgKSA+PSBsZW4gKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbEVsZW1lbnRzKCk7XG4gIH1cblxuICB2YXIgY2VsbEVsZW1zID0gW107XG4gIGZvciAoIHZhciBpID0gaW5kZXggLSBhZGpDb3VudDsgaSA8PSBpbmRleCArIGFkakNvdW50IDsgaSsrICkge1xuICAgIHZhciBzbGlkZUluZGV4ID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQgPyB1dGlscy5tb2R1bG8oIGksIGxlbiApIDogaTtcbiAgICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlc1sgc2xpZGVJbmRleCBdO1xuICAgIGlmICggc2xpZGUgKSB7XG4gICAgICBjZWxsRWxlbXMgPSBjZWxsRWxlbXMuY29uY2F0KCBzbGlkZS5nZXRDZWxsRWxlbWVudHMoKSApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2VsbEVsZW1zO1xufTtcblxuLyoqXG4gKiBzZWxlY3Qgc2xpZGUgZnJvbSBudW1iZXIgb3IgY2VsbCBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnQsIFNlbGVjdG9yIFN0cmluZywgb3IgTnVtYmVyfSBzZWxlY3RvclxuICovXG5wcm90by5xdWVyeUNlbGwgPSBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gIGlmICggdHlwZW9mIHNlbGVjdG9yID09ICdudW1iZXInICkge1xuICAgIC8vIHVzZSBudW1iZXIgYXMgaW5kZXhcbiAgICByZXR1cm4gdGhpcy5jZWxsc1sgc2VsZWN0b3IgXTtcbiAgfVxuICBpZiAoIHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyApIHtcbiAgICAvLyBkbyBub3Qgc2VsZWN0IGludmFsaWQgc2VsZWN0b3JzIGZyb20gaGFzaDogIzEyMywgIy8uICM3OTFcbiAgICBpZiAoIHNlbGVjdG9yLm1hdGNoKC9eWyNcXC5dP1tcXGRcXC9dLykgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHVzZSBzdHJpbmcgYXMgc2VsZWN0b3IsIGdldCBlbGVtZW50XG4gICAgc2VsZWN0b3IgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3Rvciggc2VsZWN0b3IgKTtcbiAgfVxuICAvLyBnZXQgY2VsbCBmcm9tIGVsZW1lbnRcbiAgcmV0dXJuIHRoaXMuZ2V0Q2VsbCggc2VsZWN0b3IgKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by51aUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVtaXRFdmVudCgndWlDaGFuZ2UnKTtcbn07XG5cbi8vIGtlZXAgZm9jdXMgb24gZWxlbWVudCB3aGVuIGNoaWxkIFVJIGVsZW1lbnRzIGFyZSBjbGlja2VkXG5wcm90by5jaGlsZFVJUG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIC8vIEhBQ0sgaU9TIGRvZXMgbm90IGFsbG93IHRvdWNoIGV2ZW50cyB0byBidWJibGUgdXA/IVxuICBpZiAoIGV2ZW50LnR5cGUgIT0gJ3RvdWNoc3RhcnQnICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgdGhpcy5mb2N1cygpO1xufTtcblxuLy8gLS0tLS0gcmVzaXplIC0tLS0tIC8vXG5cbnByb3RvLm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMud2F0Y2hDU1MoKTtcbiAgdGhpcy5yZXNpemUoKTtcbn07XG5cbnV0aWxzLmRlYm91bmNlTWV0aG9kKCBGbGlja2l0eSwgJ29ucmVzaXplJywgMTUwICk7XG5cbnByb3RvLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzQWN0aXZlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmdldFNpemUoKTtcbiAgLy8gd3JhcCB2YWx1ZXNcbiAgaWYgKCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCApIHtcbiAgICB0aGlzLnggPSB1dGlscy5tb2R1bG8oIHRoaXMueCwgdGhpcy5zbGlkZWFibGVXaWR0aCApO1xuICB9XG4gIHRoaXMucG9zaXRpb25DZWxscygpO1xuICB0aGlzLl9nZXRXcmFwU2hpZnRDZWxscygpO1xuICB0aGlzLnNldEdhbGxlcnlTaXplKCk7XG4gIHRoaXMuZW1pdEV2ZW50KCdyZXNpemUnKTtcbiAgLy8gdXBkYXRlIHNlbGVjdGVkIGluZGV4IGZvciBncm91cCBzbGlkZXMsIGluc3RhbnRcbiAgLy8gVE9ETzogcG9zaXRpb24gY2FuIGJlIGxvc3QgYmV0d2VlbiBncm91cHMgb2YgdmFyaW91cyBudW1iZXJzXG4gIHZhciBzZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnNlbGVjdGVkRWxlbWVudHMgJiYgdGhpcy5zZWxlY3RlZEVsZW1lbnRzWzBdO1xuICB0aGlzLnNlbGVjdENlbGwoIHNlbGVjdGVkRWxlbWVudCwgZmFsc2UsIHRydWUgKTtcbn07XG5cbi8vIHdhdGNoZXMgdGhlIDphZnRlciBwcm9wZXJ0eSwgYWN0aXZhdGVzL2RlYWN0aXZhdGVzXG5wcm90by53YXRjaENTUyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgd2F0Y2hPcHRpb24gPSB0aGlzLm9wdGlvbnMud2F0Y2hDU1M7XG4gIGlmICggIXdhdGNoT3B0aW9uICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhZnRlckNvbnRlbnQgPSBnZXRDb21wdXRlZFN0eWxlKCB0aGlzLmVsZW1lbnQsICc6YWZ0ZXInICkuY29udGVudDtcbiAgLy8gYWN0aXZhdGUgaWYgOmFmdGVyIHsgY29udGVudDogJ2ZsaWNraXR5JyB9XG4gIGlmICggYWZ0ZXJDb250ZW50LmluZGV4T2YoJ2ZsaWNraXR5JykgIT0gLTEgKSB7XG4gICAgdGhpcy5hY3RpdmF0ZSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBrZXlkb3duIC0tLS0tIC8vXG5cbi8vIGdvIHByZXZpb3VzL25leHQgaWYgbGVmdC9yaWdodCBrZXlzIHByZXNzZWRcbnByb3RvLm9ua2V5ZG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgLy8gb25seSB3b3JrIGlmIGVsZW1lbnQgaXMgaW4gZm9jdXNcbiAgdmFyIGlzTm90Rm9jdXNlZCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSB0aGlzLmVsZW1lbnQ7XG4gIGlmICggIXRoaXMub3B0aW9ucy5hY2Nlc3NpYmlsaXR5IHx8aXNOb3RGb2N1c2VkICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gRmxpY2tpdHkua2V5Ym9hcmRIYW5kbGVyc1sgZXZlbnQua2V5Q29kZSBdO1xuICBpZiAoIGhhbmRsZXIgKSB7XG4gICAgaGFuZGxlci5jYWxsKCB0aGlzICk7XG4gIH1cbn07XG5cbkZsaWNraXR5LmtleWJvYXJkSGFuZGxlcnMgPSB7XG4gIC8vIGxlZnQgYXJyb3dcbiAgMzc6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZWZ0TWV0aG9kID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gJ25leHQnIDogJ3ByZXZpb3VzJztcbiAgICB0aGlzLnVpQ2hhbmdlKCk7XG4gICAgdGhpc1sgbGVmdE1ldGhvZCBdKCk7XG4gIH0sXG4gIC8vIHJpZ2h0IGFycm93XG4gIDM5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmlnaHRNZXRob2QgPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAncHJldmlvdXMnIDogJ25leHQnO1xuICAgIHRoaXMudWlDaGFuZ2UoKTtcbiAgICB0aGlzWyByaWdodE1ldGhvZCBdKCk7XG4gIH0sXG59O1xuXG4vLyAtLS0tLSBmb2N1cyAtLS0tLSAvL1xuXG5wcm90by5mb2N1cyA9IGZ1bmN0aW9uKCkge1xuICAvLyBUT0RPIHJlbW92ZSBzY3JvbGxUbyBvbmNlIGZvY3VzIG9wdGlvbnMgZ2V0cyBtb3JlIHN1cHBvcnRcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxFbGVtZW50L2ZvY3VzI0Jyb3dzZXJfY29tcGF0aWJpbGl0eVxuICB2YXIgcHJldlNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIHRoaXMuZWxlbWVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIC8vIGhhY2sgdG8gZml4IHNjcm9sbCBqdW1wIGFmdGVyIGZvY3VzLCAjNzZcbiAgaWYgKCB3aW5kb3cucGFnZVlPZmZzZXQgIT0gcHJldlNjcm9sbFkgKSB7XG4gICAgd2luZG93LnNjcm9sbFRvKCB3aW5kb3cucGFnZVhPZmZzZXQsIHByZXZTY3JvbGxZICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRlc3Ryb3kgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZGVhY3RpdmF0ZSBhbGwgRmxpY2tpdHkgZnVuY3Rpb25hbGl0eSwgYnV0IGtlZXAgc3R1ZmYgYXZhaWxhYmxlXG5wcm90by5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNBY3RpdmUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlja2l0eS1lbmFibGVkJyk7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlja2l0eS1ydGwnKTtcbiAgdGhpcy51bnNlbGVjdFNlbGVjdGVkU2xpZGUoKTtcbiAgLy8gZGVzdHJveSBjZWxsc1xuICB0aGlzLmNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwuZGVzdHJveSgpO1xuICB9KTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKCB0aGlzLnZpZXdwb3J0ICk7XG4gIC8vIG1vdmUgY2hpbGQgZWxlbWVudHMgYmFjayBpbnRvIGVsZW1lbnRcbiAgbW92ZUVsZW1lbnRzKCB0aGlzLnNsaWRlci5jaGlsZHJlbiwgdGhpcy5lbGVtZW50ICk7XG4gIGlmICggdGhpcy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndGFiSW5kZXgnKTtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCB0aGlzICk7XG4gIH1cbiAgLy8gc2V0IGZsYWdzXG4gIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgdGhpcy5lbWl0RXZlbnQoJ2RlYWN0aXZhdGUnKTtcbn07XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAncmVzaXplJywgdGhpcyApO1xuICB0aGlzLmFsbE9mZigpO1xuICB0aGlzLmVtaXRFdmVudCgnZGVzdHJveScpO1xuICBpZiAoIGpRdWVyeSAmJiB0aGlzLiRlbGVtZW50ICkge1xuICAgIGpRdWVyeS5yZW1vdmVEYXRhKCB0aGlzLmVsZW1lbnQsICdmbGlja2l0eScgKTtcbiAgfVxuICBkZWxldGUgdGhpcy5lbGVtZW50LmZsaWNraXR5R1VJRDtcbiAgZGVsZXRlIGluc3RhbmNlc1sgdGhpcy5ndWlkIF07XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBwcm90bywgYW5pbWF0ZVByb3RvdHlwZSApO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBleHRyYXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXQgRmxpY2tpdHkgaW5zdGFuY2UgZnJvbSBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtGbGlja2l0eX1cbiAqL1xuRmxpY2tpdHkuZGF0YSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBlbGVtID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtICk7XG4gIHZhciBpZCA9IGVsZW0gJiYgZWxlbS5mbGlja2l0eUdVSUQ7XG4gIHJldHVybiBpZCAmJiBpbnN0YW5jZXNbIGlkIF07XG59O1xuXG51dGlscy5odG1sSW5pdCggRmxpY2tpdHksICdmbGlja2l0eScgKTtcblxuaWYgKCBqUXVlcnkgJiYgalF1ZXJ5LmJyaWRnZXQgKSB7XG4gIGpRdWVyeS5icmlkZ2V0KCAnZmxpY2tpdHknLCBGbGlja2l0eSApO1xufVxuXG4vLyBzZXQgaW50ZXJuYWwgalF1ZXJ5LCBmb3IgV2VicGFjayArIGpRdWVyeSB2MywgIzQ3OFxuRmxpY2tpdHkuc2V0SlF1ZXJ5ID0gZnVuY3Rpb24oIGpxICkge1xuICBqUXVlcnkgPSBqcTtcbn07XG5cbkZsaWNraXR5LkNlbGwgPSBDZWxsO1xuRmxpY2tpdHkuU2xpZGUgPSBTbGlkZTtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvKiFcbiAqIEZsaWNraXR5IHYyLjIuMVxuICogVG91Y2gsIHJlc3BvbnNpdmUsIGZsaWNrYWJsZSBjYXJvdXNlbHNcbiAqXG4gKiBMaWNlbnNlZCBHUEx2MyBmb3Igb3BlbiBzb3VyY2UgdXNlXG4gKiBvciBGbGlja2l0eSBDb21tZXJjaWFsIExpY2Vuc2UgZm9yIGNvbW1lcmNpYWwgdXNlXG4gKlxuICogaHR0cHM6Ly9mbGlja2l0eS5tZXRhZml6enkuY29cbiAqIENvcHlyaWdodCAyMDE1LTIwMTkgTWV0YWZpenp5XG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICcuL2RyYWcnLFxuICAgICAgJy4vcHJldi1uZXh0LWJ1dHRvbicsXG4gICAgICAnLi9wYWdlLWRvdHMnLFxuICAgICAgJy4vcGxheWVyJyxcbiAgICAgICcuL2FkZC1yZW1vdmUtY2VsbCcsXG4gICAgICAnLi9sYXp5bG9hZCdcbiAgICBdLCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCcuL2RyYWcnKSxcbiAgICAgIHJlcXVpcmUoJy4vcHJldi1uZXh0LWJ1dHRvbicpLFxuICAgICAgcmVxdWlyZSgnLi9wYWdlLWRvdHMnKSxcbiAgICAgIHJlcXVpcmUoJy4vcGxheWVyJyksXG4gICAgICByZXF1aXJlKCcuL2FkZC1yZW1vdmUtY2VsbCcpLFxuICAgICAgcmVxdWlyZSgnLi9sYXp5bG9hZCcpXG4gICAgKTtcbiAgfVxuXG59KSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBGbGlja2l0eSApIHtcbiAgLypqc2hpbnQgc3RyaWN0OiBmYWxzZSovXG4gIHJldHVybiBGbGlja2l0eTtcbn0pO1xuIiwiLy8gbGF6eWxvYWRcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCB1dGlscyApIHtcbid1c2Ugc3RyaWN0JztcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlTGF6eWxvYWQnKTtcbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxucHJvdG8uX2NyZWF0ZUxhenlsb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub24oICdzZWxlY3QnLCB0aGlzLmxhenlMb2FkICk7XG59O1xuXG5wcm90by5sYXp5TG9hZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGF6eUxvYWQgPSB0aGlzLm9wdGlvbnMubGF6eUxvYWQ7XG4gIGlmICggIWxhenlMb2FkICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBnZXQgYWRqYWNlbnQgY2VsbHMsIHVzZSBsYXp5TG9hZCBvcHRpb24gZm9yIGFkamFjZW50IGNvdW50XG4gIHZhciBhZGpDb3VudCA9IHR5cGVvZiBsYXp5TG9hZCA9PSAnbnVtYmVyJyA/IGxhenlMb2FkIDogMDtcbiAgdmFyIGNlbGxFbGVtcyA9IHRoaXMuZ2V0QWRqYWNlbnRDZWxsRWxlbWVudHMoIGFkakNvdW50ICk7XG4gIC8vIGdldCBsYXp5IGltYWdlcyBpbiB0aG9zZSBjZWxsc1xuICB2YXIgbGF6eUltYWdlcyA9IFtdO1xuICBjZWxsRWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGxFbGVtICkge1xuICAgIHZhciBsYXp5Q2VsbEltYWdlcyA9IGdldENlbGxMYXp5SW1hZ2VzKCBjZWxsRWxlbSApO1xuICAgIGxhenlJbWFnZXMgPSBsYXp5SW1hZ2VzLmNvbmNhdCggbGF6eUNlbGxJbWFnZXMgKTtcbiAgfSk7XG4gIC8vIGxvYWQgbGF6eSBpbWFnZXNcbiAgbGF6eUltYWdlcy5mb3JFYWNoKCBmdW5jdGlvbiggaW1nICkge1xuICAgIG5ldyBMYXp5TG9hZGVyKCBpbWcsIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xufTtcblxuZnVuY3Rpb24gZ2V0Q2VsbExhenlJbWFnZXMoIGNlbGxFbGVtICkge1xuICAvLyBjaGVjayBpZiBjZWxsIGVsZW1lbnQgaXMgbGF6eSBpbWFnZVxuICBpZiAoIGNlbGxFbGVtLm5vZGVOYW1lID09ICdJTUcnICkge1xuICAgIHZhciBsYXp5bG9hZEF0dHIgPSBjZWxsRWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQnKTtcbiAgICB2YXIgc3JjQXR0ciA9IGNlbGxFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmMnKTtcbiAgICB2YXIgc3Jjc2V0QXR0ciA9IGNlbGxFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmNzZXQnKTtcbiAgICBpZiAoIGxhenlsb2FkQXR0ciB8fCBzcmNBdHRyIHx8IHNyY3NldEF0dHIgKSB7XG4gICAgICByZXR1cm4gWyBjZWxsRWxlbSBdO1xuICAgIH1cbiAgfVxuICAvLyBzZWxlY3QgbGF6eSBpbWFnZXMgaW4gY2VsbFxuICB2YXIgbGF6eVNlbGVjdG9yID0gJ2ltZ1tkYXRhLWZsaWNraXR5LWxhenlsb2FkXSwgJyArXG4gICAgJ2ltZ1tkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyY10sIGltZ1tkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyY3NldF0nO1xuICB2YXIgaW1ncyA9IGNlbGxFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIGxhenlTZWxlY3RvciApO1xuICByZXR1cm4gdXRpbHMubWFrZUFycmF5KCBpbWdzICk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIExhenlMb2FkZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBjbGFzcyB0byBoYW5kbGUgbG9hZGluZyBpbWFnZXNcbiAqL1xuZnVuY3Rpb24gTGF6eUxvYWRlciggaW1nLCBmbGlja2l0eSApIHtcbiAgdGhpcy5pbWcgPSBpbWc7XG4gIHRoaXMuZmxpY2tpdHkgPSBmbGlja2l0eTtcbiAgdGhpcy5sb2FkKCk7XG59XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gdXRpbHMuaGFuZGxlRXZlbnQ7XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMuaW1nLmFkZEV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcbiAgLy8gZ2V0IHNyYyAmIHNyY3NldFxuICB2YXIgc3JjID0gdGhpcy5pbWcuZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkJykgfHxcbiAgICB0aGlzLmltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3JjJyk7XG4gIHZhciBzcmNzZXQgPSB0aGlzLmltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3Jjc2V0Jyk7XG4gIC8vIHNldCBzcmMgJiBzZXJzZXRcbiAgdGhpcy5pbWcuc3JjID0gc3JjO1xuICBpZiAoIHNyY3NldCApIHtcbiAgICB0aGlzLmltZy5zZXRBdHRyaWJ1dGUoICdzcmNzZXQnLCBzcmNzZXQgKTtcbiAgfVxuICAvLyByZW1vdmUgYXR0clxuICB0aGlzLmltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQnKTtcbiAgdGhpcy5pbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyYycpO1xuICB0aGlzLmltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3Jjc2V0Jyk7XG59O1xuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5vbmxvYWQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuY29tcGxldGUoIGV2ZW50LCAnZmxpY2tpdHktbGF6eWxvYWRlZCcgKTtcbn07XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuY29tcGxldGUoIGV2ZW50LCAnZmxpY2tpdHktbGF6eWVycm9yJyApO1xufTtcblxuTGF6eUxvYWRlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiggZXZlbnQsIGNsYXNzTmFtZSApIHtcbiAgLy8gdW5iaW5kIGV2ZW50c1xuICB0aGlzLmltZy5yZW1vdmVFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuXG4gIHZhciBjZWxsID0gdGhpcy5mbGlja2l0eS5nZXRQYXJlbnRDZWxsKCB0aGlzLmltZyApO1xuICB2YXIgY2VsbEVsZW0gPSBjZWxsICYmIGNlbGwuZWxlbWVudDtcbiAgdGhpcy5mbGlja2l0eS5jZWxsU2l6ZUNoYW5nZSggY2VsbEVsZW0gKTtcblxuICB0aGlzLmltZy5jbGFzc0xpc3QuYWRkKCBjbGFzc05hbWUgKTtcbiAgdGhpcy5mbGlja2l0eS5kaXNwYXRjaEV2ZW50KCAnbGF6eUxvYWQnLCBldmVudCwgY2VsbEVsZW0gKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5GbGlja2l0eS5MYXp5TG9hZGVyID0gTGF6eUxvYWRlcjtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBwYWdlIGRvdHNcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAndW5pcG9pbnRlci91bmlwb2ludGVyJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCd1bmlwb2ludGVyJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuVW5pcG9pbnRlcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKSB7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBhZ2VEb3RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gUGFnZURvdHMoIHBhcmVudCApIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG5QYWdlRG90cy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVbmlwb2ludGVyLnByb3RvdHlwZSApO1xuXG5QYWdlRG90cy5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBjcmVhdGUgaG9sZGVyIGVsZW1lbnRcbiAgdGhpcy5ob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbCcpO1xuICB0aGlzLmhvbGRlci5jbGFzc05hbWUgPSAnZmxpY2tpdHktcGFnZS1kb3RzJztcbiAgLy8gY3JlYXRlIGRvdHMsIGFycmF5IG9mIGVsZW1lbnRzXG4gIHRoaXMuZG90cyA9IFtdO1xuICAvLyBldmVudHNcbiAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMub25DbGljay5iaW5kKCB0aGlzICk7XG4gIHRoaXMub24oICdwb2ludGVyRG93bicsIHRoaXMucGFyZW50LmNoaWxkVUlQb2ludGVyRG93bi5iaW5kKCB0aGlzLnBhcmVudCApICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXREb3RzKCk7XG4gIHRoaXMuaG9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2sgKTtcbiAgdGhpcy5iaW5kU3RhcnRFdmVudCggdGhpcy5ob2xkZXIgKTtcbiAgLy8gYWRkIHRvIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLmhvbGRlciApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLmRlYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ob2xkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayApO1xuICB0aGlzLnVuYmluZFN0YXJ0RXZlbnQoIHRoaXMuaG9sZGVyICk7XG4gIC8vIHJlbW92ZSBmcm9tIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LnJlbW92ZUNoaWxkKCB0aGlzLmhvbGRlciApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLnNldERvdHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gZ2V0IGRpZmZlcmVuY2UgYmV0d2VlbiBudW1iZXIgb2Ygc2xpZGVzIGFuZCBudW1iZXIgb2YgZG90c1xuICB2YXIgZGVsdGEgPSB0aGlzLnBhcmVudC5zbGlkZXMubGVuZ3RoIC0gdGhpcy5kb3RzLmxlbmd0aDtcbiAgaWYgKCBkZWx0YSA+IDAgKSB7XG4gICAgdGhpcy5hZGREb3RzKCBkZWx0YSApO1xuICB9IGVsc2UgaWYgKCBkZWx0YSA8IDAgKSB7XG4gICAgdGhpcy5yZW1vdmVEb3RzKCAtZGVsdGEgKTtcbiAgfVxufTtcblxuUGFnZURvdHMucHJvdG90eXBlLmFkZERvdHMgPSBmdW5jdGlvbiggY291bnQgKSB7XG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgdmFyIG5ld0RvdHMgPSBbXTtcbiAgdmFyIGxlbmd0aCA9IHRoaXMuZG90cy5sZW5ndGg7XG4gIHZhciBtYXggPSBsZW5ndGggKyBjb3VudDtcblxuICBmb3IgKCB2YXIgaSA9IGxlbmd0aDsgaSA8IG1heDsgaSsrICkge1xuICAgIHZhciBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGRvdC5jbGFzc05hbWUgPSAnZG90JztcbiAgICBkb3Quc2V0QXR0cmlidXRlKCAnYXJpYS1sYWJlbCcsICdQYWdlIGRvdCAnICsgKCBpICsgMSApICk7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRvdCApO1xuICAgIG5ld0RvdHMucHVzaCggZG90ICk7XG4gIH1cblxuICB0aGlzLmhvbGRlci5hcHBlbmRDaGlsZCggZnJhZ21lbnQgKTtcbiAgdGhpcy5kb3RzID0gdGhpcy5kb3RzLmNvbmNhdCggbmV3RG90cyApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLnJlbW92ZURvdHMgPSBmdW5jdGlvbiggY291bnQgKSB7XG4gIC8vIHJlbW92ZSBmcm9tIHRoaXMuZG90cyBjb2xsZWN0aW9uXG4gIHZhciByZW1vdmVEb3RzID0gdGhpcy5kb3RzLnNwbGljZSggdGhpcy5kb3RzLmxlbmd0aCAtIGNvdW50LCBjb3VudCApO1xuICAvLyByZW1vdmUgZnJvbSBET01cbiAgcmVtb3ZlRG90cy5mb3JFYWNoKCBmdW5jdGlvbiggZG90ICkge1xuICAgIHRoaXMuaG9sZGVyLnJlbW92ZUNoaWxkKCBkb3QgKTtcbiAgfSwgdGhpcyApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLnVwZGF0ZVNlbGVjdGVkID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlbW92ZSBzZWxlY3RlZCBjbGFzcyBvbiBwcmV2aW91c1xuICBpZiAoIHRoaXMuc2VsZWN0ZWREb3QgKSB7XG4gICAgdGhpcy5zZWxlY3RlZERvdC5jbGFzc05hbWUgPSAnZG90JztcbiAgICB0aGlzLnNlbGVjdGVkRG90LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50Jyk7XG4gIH1cbiAgLy8gZG9uJ3QgcHJvY2VlZCBpZiBubyBkb3RzXG4gIGlmICggIXRoaXMuZG90cy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuc2VsZWN0ZWREb3QgPSB0aGlzLmRvdHNbIHRoaXMucGFyZW50LnNlbGVjdGVkSW5kZXggXTtcbiAgdGhpcy5zZWxlY3RlZERvdC5jbGFzc05hbWUgPSAnZG90IGlzLXNlbGVjdGVkJztcbiAgdGhpcy5zZWxlY3RlZERvdC5zZXRBdHRyaWJ1dGUoICdhcmlhLWN1cnJlbnQnLCAnc3RlcCcgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5vblRhcCA9IC8vIG9sZCBtZXRob2QgbmFtZSwgYmFja3dhcmRzLWNvbXBhdGlibGVcblBhZ2VEb3RzLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAvLyBvbmx5IGNhcmUgYWJvdXQgZG90IGNsaWNrc1xuICBpZiAoIHRhcmdldC5ub2RlTmFtZSAhPSAnTEknICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMucGFyZW50LnVpQ2hhbmdlKCk7XG4gIHZhciBpbmRleCA9IHRoaXMuZG90cy5pbmRleE9mKCB0YXJnZXQgKTtcbiAgdGhpcy5wYXJlbnQuc2VsZWN0KCBpbmRleCApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gIHRoaXMuYWxsT2ZmKCk7XG59O1xuXG5GbGlja2l0eS5QYWdlRG90cyA9IFBhZ2VEb3RzO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGbGlja2l0eSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIEZsaWNraXR5LmRlZmF1bHRzLCB7XG4gIHBhZ2VEb3RzOiB0cnVlXG59KTtcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlUGFnZURvdHMnKTtcblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG5wcm90by5fY3JlYXRlUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLnBhZ2VEb3RzICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnBhZ2VEb3RzID0gbmV3IFBhZ2VEb3RzKCB0aGlzICk7XG4gIC8vIGV2ZW50c1xuICB0aGlzLm9uKCAnYWN0aXZhdGUnLCB0aGlzLmFjdGl2YXRlUGFnZURvdHMgKTtcbiAgdGhpcy5vbiggJ3NlbGVjdCcsIHRoaXMudXBkYXRlU2VsZWN0ZWRQYWdlRG90cyApO1xuICB0aGlzLm9uKCAnY2VsbENoYW5nZScsIHRoaXMudXBkYXRlUGFnZURvdHMgKTtcbiAgdGhpcy5vbiggJ3Jlc2l6ZScsIHRoaXMudXBkYXRlUGFnZURvdHMgKTtcbiAgdGhpcy5vbiggJ2RlYWN0aXZhdGUnLCB0aGlzLmRlYWN0aXZhdGVQYWdlRG90cyApO1xufTtcblxucHJvdG8uYWN0aXZhdGVQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBhZ2VEb3RzLmFjdGl2YXRlKCk7XG59O1xuXG5wcm90by51cGRhdGVTZWxlY3RlZFBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFnZURvdHMudXBkYXRlU2VsZWN0ZWQoKTtcbn07XG5cbnByb3RvLnVwZGF0ZVBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFnZURvdHMuc2V0RG90cygpO1xufTtcblxucHJvdG8uZGVhY3RpdmF0ZVBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFnZURvdHMuZGVhY3RpdmF0ZSgpO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbkZsaWNraXR5LlBhZ2VEb3RzID0gUGFnZURvdHM7XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gcGxheWVyICYgYXV0b1BsYXlcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZXYtZW1pdHRlci9ldi1lbWl0dGVyJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscycsXG4gICAgICAnLi9mbGlja2l0eSdcbiAgICBdLCBmdW5jdGlvbiggRXZFbWl0dGVyLCB1dGlscywgRmxpY2tpdHkgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggRXZFbWl0dGVyLCB1dGlscywgRmxpY2tpdHkgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdy5FdkVtaXR0ZXIsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzLFxuICAgICAgd2luZG93LkZsaWNraXR5XG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIEV2RW1pdHRlciwgdXRpbHMsIEZsaWNraXR5ICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBsYXllciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBQbGF5ZXIoIHBhcmVudCApIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuc3RhdGUgPSAnc3RvcHBlZCc7XG4gIC8vIHZpc2liaWxpdHkgY2hhbmdlIGV2ZW50IGhhbmRsZXJcbiAgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UgPSB0aGlzLnZpc2liaWxpdHlDaGFuZ2UuYmluZCggdGhpcyApO1xuICB0aGlzLm9uVmlzaWJpbGl0eVBsYXkgPSB0aGlzLnZpc2liaWxpdHlQbGF5LmJpbmQoIHRoaXMgKTtcbn1cblxuUGxheWVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxuLy8gc3RhcnQgcGxheVxuUGxheWVyLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5zdGF0ZSA9PSAncGxheWluZycgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGRvIG5vdCBwbGF5IGlmIHBhZ2UgaXMgaGlkZGVuLCBzdGFydCBwbGF5aW5nIHdoZW4gcGFnZSBpcyB2aXNpYmxlXG4gIHZhciBpc1BhZ2VIaWRkZW4gPSBkb2N1bWVudC5oaWRkZW47XG4gIGlmICggaXNQYWdlSGlkZGVuICkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy5vblZpc2liaWxpdHlQbGF5ICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5zdGF0ZSA9ICdwbGF5aW5nJztcbiAgLy8gbGlzdGVuIHRvIHZpc2liaWxpdHkgY2hhbmdlXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UgKTtcbiAgLy8gc3RhcnQgdGlja2luZ1xuICB0aGlzLnRpY2soKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKCkge1xuICAvLyBkbyBub3QgdGljayBpZiBub3QgcGxheWluZ1xuICBpZiAoIHRoaXMuc3RhdGUgIT0gJ3BsYXlpbmcnICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB0aW1lID0gdGhpcy5wYXJlbnQub3B0aW9ucy5hdXRvUGxheTtcbiAgLy8gZGVmYXVsdCB0byAzIHNlY29uZHNcbiAgdGltZSA9IHR5cGVvZiB0aW1lID09ICdudW1iZXInID8gdGltZSA6IDMwMDA7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIC8vIEhBQ0s6IHJlc2V0IHRpY2tzIGlmIHN0b3BwZWQgYW5kIHN0YXJ0ZWQgd2l0aGluIGludGVydmFsXG4gIHRoaXMuY2xlYXIoKTtcbiAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgX3RoaXMucGFyZW50Lm5leHQoIHRydWUgKTtcbiAgICBfdGhpcy50aWNrKCk7XG4gIH0sIHRpbWUgKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnN0YXRlID0gJ3N0b3BwZWQnO1xuICB0aGlzLmNsZWFyKCk7XG4gIC8vIHJlbW92ZSB2aXNpYmlsaXR5IGNoYW5nZSBldmVudFxuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAndmlzaWJpbGl0eWNoYW5nZScsIHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlICk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gIGNsZWFyVGltZW91dCggdGhpcy50aW1lb3V0ICk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5zdGF0ZSA9PSAncGxheWluZycgKSB7XG4gICAgdGhpcy5zdGF0ZSA9ICdwYXVzZWQnO1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgfVxufTtcblxuUGxheWVyLnByb3RvdHlwZS51bnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlLXN0YXJ0IHBsYXkgaWYgcGF1c2VkXG4gIGlmICggdGhpcy5zdGF0ZSA9PSAncGF1c2VkJyApIHtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxufTtcblxuLy8gcGF1c2UgaWYgcGFnZSB2aXNpYmlsaXR5IGlzIGhpZGRlbiwgdW5wYXVzZSBpZiB2aXNpYmxlXG5QbGF5ZXIucHJvdG90eXBlLnZpc2liaWxpdHlDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGlzUGFnZUhpZGRlbiA9IGRvY3VtZW50LmhpZGRlbjtcbiAgdGhpc1sgaXNQYWdlSGlkZGVuID8gJ3BhdXNlJyA6ICd1bnBhdXNlJyBdKCk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnZpc2liaWxpdHlQbGF5ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheSgpO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAndmlzaWJpbGl0eWNoYW5nZScsIHRoaXMub25WaXNpYmlsaXR5UGxheSApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmxpY2tpdHkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBGbGlja2l0eS5kZWZhdWx0cywge1xuICBwYXVzZUF1dG9QbGF5T25Ib3ZlcjogdHJ1ZVxufSk7XG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZVBsYXllcicpO1xudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG5wcm90by5fY3JlYXRlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyID0gbmV3IFBsYXllciggdGhpcyApO1xuXG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMuYWN0aXZhdGVQbGF5ZXIgKTtcbiAgdGhpcy5vbiggJ3VpQ2hhbmdlJywgdGhpcy5zdG9wUGxheWVyICk7XG4gIHRoaXMub24oICdwb2ludGVyRG93bicsIHRoaXMuc3RvcFBsYXllciApO1xuICB0aGlzLm9uKCAnZGVhY3RpdmF0ZScsIHRoaXMuZGVhY3RpdmF0ZVBsYXllciApO1xufTtcblxucHJvdG8uYWN0aXZhdGVQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmF1dG9QbGF5ICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnBsYXllci5wbGF5KCk7XG4gIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2VlbnRlcicsIHRoaXMgKTtcbn07XG5cbi8vIFBsYXllciBBUEksIGRvbid0IGhhdGUgdGhlIC4uLiB0aGFua3MgSSBrbm93IHdoZXJlIHRoZSBkb29yIGlzXG5cbnByb3RvLnBsYXlQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIucGxheSgpO1xufTtcblxucHJvdG8uc3RvcFBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci5zdG9wKCk7XG59O1xuXG5wcm90by5wYXVzZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci5wYXVzZSgpO1xufTtcblxucHJvdG8udW5wYXVzZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci51bnBhdXNlKCk7XG59O1xuXG5wcm90by5kZWFjdGl2YXRlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnN0b3AoKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZWVudGVyJywgdGhpcyApO1xufTtcblxuLy8gLS0tLS0gbW91c2VlbnRlci9sZWF2ZSAtLS0tLSAvL1xuXG4vLyBwYXVzZSBhdXRvLXBsYXkgb24gaG92ZXJcbnByb3RvLm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMucGF1c2VBdXRvUGxheU9uSG92ZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucGxheWVyLnBhdXNlKCk7XG4gIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2VsZWF2ZScsIHRoaXMgKTtcbn07XG5cbi8vIHJlc3VtZSBhdXRvLXBsYXkgb24gaG92ZXIgb2ZmXG5wcm90by5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIudW5wYXVzZSgpO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbGVhdmUnLCB0aGlzICk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuRmxpY2tpdHkuUGxheWVyID0gUGxheWVyO1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIHByZXYvbmV4dCBidXR0b25zXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJ3VuaXBvaW50ZXIvdW5pcG9pbnRlcicsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgndW5pcG9pbnRlcicpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LlVuaXBvaW50ZXIsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3ZnVVJJID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUHJldk5leHRCdXR0b24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gUHJldk5leHRCdXR0b24oIGRpcmVjdGlvbiwgcGFyZW50ICkge1xuICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVbmlwb2ludGVyLnByb3RvdHlwZSApO1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBwcm9wZXJ0aWVzXG4gIHRoaXMuaXNFbmFibGVkID0gdHJ1ZTtcbiAgdGhpcy5pc1ByZXZpb3VzID0gdGhpcy5kaXJlY3Rpb24gPT0gLTE7XG4gIHZhciBsZWZ0RGlyZWN0aW9uID0gdGhpcy5wYXJlbnQub3B0aW9ucy5yaWdodFRvTGVmdCA/IDEgOiAtMTtcbiAgdGhpcy5pc0xlZnQgPSB0aGlzLmRpcmVjdGlvbiA9PSBsZWZ0RGlyZWN0aW9uO1xuXG4gIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2ZsaWNraXR5LWJ1dHRvbiBmbGlja2l0eS1wcmV2LW5leHQtYnV0dG9uJztcbiAgZWxlbWVudC5jbGFzc05hbWUgKz0gdGhpcy5pc1ByZXZpb3VzID8gJyBwcmV2aW91cycgOiAnIG5leHQnO1xuICAvLyBwcmV2ZW50IGJ1dHRvbiBmcm9tIHN1Ym1pdHRpbmcgZm9ybSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMDgzNjA3Ni8xODIxODNcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoICd0eXBlJywgJ2J1dHRvbicgKTtcbiAgLy8gaW5pdCBhcyBkaXNhYmxlZFxuICB0aGlzLmRpc2FibGUoKTtcblxuICBlbGVtZW50LnNldEF0dHJpYnV0ZSggJ2FyaWEtbGFiZWwnLCB0aGlzLmlzUHJldmlvdXMgPyAnUHJldmlvdXMnIDogJ05leHQnICk7XG5cbiAgLy8gY3JlYXRlIGFycm93XG4gIHZhciBzdmcgPSB0aGlzLmNyZWF0ZVNWRygpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKCBzdmcgKTtcbiAgLy8gZXZlbnRzXG4gIHRoaXMucGFyZW50Lm9uKCAnc2VsZWN0JywgdGhpcy51cGRhdGUuYmluZCggdGhpcyApICk7XG4gIHRoaXMub24oICdwb2ludGVyRG93bicsIHRoaXMucGFyZW50LmNoaWxkVUlQb2ludGVyRG93bi5iaW5kKCB0aGlzLnBhcmVudCApICk7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5iaW5kU3RhcnRFdmVudCggdGhpcy5lbGVtZW50ICk7XG4gIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzICk7XG4gIC8vIGFkZCB0byBET01cbiAgdGhpcy5wYXJlbnQuZWxlbWVudC5hcHBlbmRDaGlsZCggdGhpcy5lbGVtZW50ICk7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyByZW1vdmUgZnJvbSBET01cbiAgdGhpcy5wYXJlbnQuZWxlbWVudC5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG4gIC8vIGNsaWNrIGV2ZW50c1xuICB0aGlzLnVuYmluZFN0YXJ0RXZlbnQoIHRoaXMuZWxlbWVudCApO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcyApO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmNyZWF0ZVNWRyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCBzdmdVUkksICdzdmcnKTtcbiAgc3ZnLnNldEF0dHJpYnV0ZSggJ2NsYXNzJywgJ2ZsaWNraXR5LWJ1dHRvbi1pY29uJyApO1xuICBzdmcuc2V0QXR0cmlidXRlKCAndmlld0JveCcsICcwIDAgMTAwIDEwMCcgKTtcbiAgdmFyIHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoIHN2Z1VSSSwgJ3BhdGgnKTtcbiAgdmFyIHBhdGhNb3ZlbWVudHMgPSBnZXRBcnJvd01vdmVtZW50cyggdGhpcy5wYXJlbnQub3B0aW9ucy5hcnJvd1NoYXBlICk7XG4gIHBhdGguc2V0QXR0cmlidXRlKCAnZCcsIHBhdGhNb3ZlbWVudHMgKTtcbiAgcGF0aC5zZXRBdHRyaWJ1dGUoICdjbGFzcycsICdhcnJvdycgKTtcbiAgLy8gcm90YXRlIGFycm93XG4gIGlmICggIXRoaXMuaXNMZWZ0ICkge1xuICAgIHBhdGguc2V0QXR0cmlidXRlKCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgxMDAsIDEwMCkgcm90YXRlKDE4MCkgJyApO1xuICB9XG4gIHN2Zy5hcHBlbmRDaGlsZCggcGF0aCApO1xuICByZXR1cm4gc3ZnO1xufTtcblxuLy8gZ2V0IFNWRyBwYXRoIG1vdm1lbWVudFxuZnVuY3Rpb24gZ2V0QXJyb3dNb3ZlbWVudHMoIHNoYXBlICkge1xuICAvLyB1c2Ugc2hhcGUgYXMgbW92ZW1lbnQgaWYgc3RyaW5nXG4gIGlmICggdHlwZW9mIHNoYXBlID09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBzaGFwZTtcbiAgfVxuICAvLyBjcmVhdGUgbW92ZW1lbnQgc3RyaW5nXG4gIHJldHVybiAnTSAnICsgc2hhcGUueDAgKyAnLDUwJyArXG4gICAgJyBMICcgKyBzaGFwZS54MSArICcsJyArICggc2hhcGUueTEgKyA1MCApICtcbiAgICAnIEwgJyArIHNoYXBlLngyICsgJywnICsgKCBzaGFwZS55MiArIDUwICkgK1xuICAgICcgTCAnICsgc2hhcGUueDMgKyAnLDUwICcgK1xuICAgICcgTCAnICsgc2hhcGUueDIgKyAnLCcgKyAoIDUwIC0gc2hhcGUueTIgKSArXG4gICAgJyBMICcgKyBzaGFwZS54MSArICcsJyArICggNTAgLSBzaGFwZS55MSApICtcbiAgICAnIFonO1xufVxuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSB1dGlscy5oYW5kbGVFdmVudDtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0VuYWJsZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucGFyZW50LnVpQ2hhbmdlKCk7XG4gIHZhciBtZXRob2QgPSB0aGlzLmlzUHJldmlvdXMgPyAncHJldmlvdXMnIDogJ25leHQnO1xuICB0aGlzLnBhcmVudFsgbWV0aG9kIF0oKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5pc0VuYWJsZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICB0aGlzLmlzRW5hYmxlZCA9IHRydWU7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzRW5hYmxlZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5lbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gaW5kZXggb2YgZmlyc3Qgb3IgbGFzdCBzbGlkZSwgaWYgcHJldmlvdXMgb3IgbmV4dFxuICB2YXIgc2xpZGVzID0gdGhpcy5wYXJlbnQuc2xpZGVzO1xuICAvLyBlbmFibGUgaXMgd3JhcEFyb3VuZCBhbmQgYXQgbGVhc3QgMiBzbGlkZXNcbiAgaWYgKCB0aGlzLnBhcmVudC5vcHRpb25zLndyYXBBcm91bmQgJiYgc2xpZGVzLmxlbmd0aCA+IDEgKSB7XG4gICAgdGhpcy5lbmFibGUoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IHNsaWRlcy5sZW5ndGggPyBzbGlkZXMubGVuZ3RoIC0gMSA6IDA7XG4gIHZhciBib3VuZEluZGV4ID0gdGhpcy5pc1ByZXZpb3VzID8gMCA6IGxhc3RJbmRleDtcbiAgdmFyIG1ldGhvZCA9IHRoaXMucGFyZW50LnNlbGVjdGVkSW5kZXggPT0gYm91bmRJbmRleCA/ICdkaXNhYmxlJyA6ICdlbmFibGUnO1xuICB0aGlzWyBtZXRob2QgXSgpO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gIHRoaXMuYWxsT2ZmKCk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGbGlja2l0eSBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBGbGlja2l0eS5kZWZhdWx0cywge1xuICBwcmV2TmV4dEJ1dHRvbnM6IHRydWUsXG4gIGFycm93U2hhcGU6IHtcbiAgICB4MDogMTAsXG4gICAgeDE6IDYwLCB5MTogNTAsXG4gICAgeDI6IDcwLCB5MjogNDAsXG4gICAgeDM6IDMwXG4gIH1cbn0pO1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVQcmV2TmV4dEJ1dHRvbnMnKTtcbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxucHJvdG8uX2NyZWF0ZVByZXZOZXh0QnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMucHJldk5leHRCdXR0b25zICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMucHJldkJ1dHRvbiA9IG5ldyBQcmV2TmV4dEJ1dHRvbiggLTEsIHRoaXMgKTtcbiAgdGhpcy5uZXh0QnV0dG9uID0gbmV3IFByZXZOZXh0QnV0dG9uKCAxLCB0aGlzICk7XG5cbiAgdGhpcy5vbiggJ2FjdGl2YXRlJywgdGhpcy5hY3RpdmF0ZVByZXZOZXh0QnV0dG9ucyApO1xufTtcblxucHJvdG8uYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wcmV2QnV0dG9uLmFjdGl2YXRlKCk7XG4gIHRoaXMubmV4dEJ1dHRvbi5hY3RpdmF0ZSgpO1xuICB0aGlzLm9uKCAnZGVhY3RpdmF0ZScsIHRoaXMuZGVhY3RpdmF0ZVByZXZOZXh0QnV0dG9ucyApO1xufTtcblxucHJvdG8uZGVhY3RpdmF0ZVByZXZOZXh0QnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnByZXZCdXR0b24uZGVhY3RpdmF0ZSgpO1xuICB0aGlzLm5leHRCdXR0b24uZGVhY3RpdmF0ZSgpO1xuICB0aGlzLm9mZiggJ2RlYWN0aXZhdGUnLCB0aGlzLmRlYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5GbGlja2l0eS5QcmV2TmV4dEJ1dHRvbiA9IFByZXZOZXh0QnV0dG9uO1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIHNsaWRlXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRmxpY2tpdHkgPSB3aW5kb3cuRmxpY2tpdHkgfHwge307XG4gICAgd2luZG93LkZsaWNraXR5LlNsaWRlID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gU2xpZGUoIHBhcmVudCApIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuaXNPcmlnaW5MZWZ0ID0gcGFyZW50Lm9yaWdpblNpZGUgPT0gJ2xlZnQnO1xuICB0aGlzLmNlbGxzID0gW107XG4gIHRoaXMub3V0ZXJXaWR0aCA9IDA7XG4gIHRoaXMuaGVpZ2h0ID0gMDtcbn1cblxudmFyIHByb3RvID0gU2xpZGUucHJvdG90eXBlO1xuXG5wcm90by5hZGRDZWxsID0gZnVuY3Rpb24oIGNlbGwgKSB7XG4gIHRoaXMuY2VsbHMucHVzaCggY2VsbCApO1xuICB0aGlzLm91dGVyV2lkdGggKz0gY2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIHRoaXMuaGVpZ2h0ID0gTWF0aC5tYXgoIGNlbGwuc2l6ZS5vdXRlckhlaWdodCwgdGhpcy5oZWlnaHQgKTtcbiAgLy8gZmlyc3QgY2VsbCBzdHVmZlxuICBpZiAoIHRoaXMuY2VsbHMubGVuZ3RoID09IDEgKSB7XG4gICAgdGhpcy54ID0gY2VsbC54OyAvLyB4IGNvbWVzIGZyb20gZmlyc3QgY2VsbFxuICAgIHZhciBiZWdpbk1hcmdpbiA9IHRoaXMuaXNPcmlnaW5MZWZ0ID8gJ21hcmdpbkxlZnQnIDogJ21hcmdpblJpZ2h0JztcbiAgICB0aGlzLmZpcnN0TWFyZ2luID0gY2VsbC5zaXplWyBiZWdpbk1hcmdpbiBdO1xuICB9XG59O1xuXG5wcm90by51cGRhdGVUYXJnZXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGVuZE1hcmdpbiA9IHRoaXMuaXNPcmlnaW5MZWZ0ID8gJ21hcmdpblJpZ2h0JyA6ICdtYXJnaW5MZWZ0JztcbiAgdmFyIGxhc3RDZWxsID0gdGhpcy5nZXRMYXN0Q2VsbCgpO1xuICB2YXIgbGFzdE1hcmdpbiA9IGxhc3RDZWxsID8gbGFzdENlbGwuc2l6ZVsgZW5kTWFyZ2luIF0gOiAwO1xuICB2YXIgc2xpZGVXaWR0aCA9IHRoaXMub3V0ZXJXaWR0aCAtICggdGhpcy5maXJzdE1hcmdpbiArIGxhc3RNYXJnaW4gKTtcbiAgdGhpcy50YXJnZXQgPSB0aGlzLnggKyB0aGlzLmZpcnN0TWFyZ2luICsgc2xpZGVXaWR0aCAqIHRoaXMucGFyZW50LmNlbGxBbGlnbjtcbn07XG5cbnByb3RvLmdldExhc3RDZWxsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbGxzWyB0aGlzLmNlbGxzLmxlbmd0aCAtIDEgXTtcbn07XG5cbnByb3RvLnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwuc2VsZWN0KCk7XG4gIH0pO1xufTtcblxucHJvdG8udW5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLnVuc2VsZWN0KCk7XG4gIH0pO1xufTtcblxucHJvdG8uZ2V0Q2VsbEVsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbGxzLm1hcCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgcmV0dXJuIGNlbGwuZWxlbWVudDtcbiAgfSk7XG59O1xuXG5yZXR1cm4gU2xpZGU7XG5cbn0pKTtcbiIsIi8qIVxuICogZ2V0U2l6ZSB2Mi4wLjNcbiAqIG1lYXN1cmUgc2l6ZSBvZiBlbGVtZW50c1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKiBqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG4vKiBnbG9iYWxzIGNvbnNvbGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZ2V0U2l6ZSA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBoZWxwZXJzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdldCBhIG51bWJlciBmcm9tIGEgc3RyaW5nLCBub3QgYSBwZXJjZW50YWdlXG5mdW5jdGlvbiBnZXRTdHlsZVNpemUoIHZhbHVlICkge1xuICB2YXIgbnVtID0gcGFyc2VGbG9hdCggdmFsdWUgKTtcbiAgLy8gbm90IGEgcGVyY2VudCBsaWtlICcxMDAlJywgYW5kIGEgbnVtYmVyXG4gIHZhciBpc1ZhbGlkID0gdmFsdWUuaW5kZXhPZignJScpID09IC0xICYmICFpc05hTiggbnVtICk7XG4gIHJldHVybiBpc1ZhbGlkICYmIG51bTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBsb2dFcnJvciA9IHR5cGVvZiBjb25zb2xlID09ICd1bmRlZmluZWQnID8gbm9vcCA6XG4gIGZ1bmN0aW9uKCBtZXNzYWdlICkge1xuICAgIGNvbnNvbGUuZXJyb3IoIG1lc3NhZ2UgKTtcbiAgfTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWVhc3VyZW1lbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBtZWFzdXJlbWVudHMgPSBbXG4gICdwYWRkaW5nTGVmdCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nQm90dG9tJyxcbiAgJ21hcmdpbkxlZnQnLFxuICAnbWFyZ2luUmlnaHQnLFxuICAnbWFyZ2luVG9wJyxcbiAgJ21hcmdpbkJvdHRvbScsXG4gICdib3JkZXJMZWZ0V2lkdGgnLFxuICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICdib3JkZXJUb3BXaWR0aCcsXG4gICdib3JkZXJCb3R0b21XaWR0aCdcbl07XG5cbnZhciBtZWFzdXJlbWVudHNMZW5ndGggPSBtZWFzdXJlbWVudHMubGVuZ3RoO1xuXG5mdW5jdGlvbiBnZXRaZXJvU2l6ZSgpIHtcbiAgdmFyIHNpemUgPSB7XG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIGlubmVyV2lkdGg6IDAsXG4gICAgaW5uZXJIZWlnaHQ6IDAsXG4gICAgb3V0ZXJXaWR0aDogMCxcbiAgICBvdXRlckhlaWdodDogMFxuICB9O1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgbWVhc3VyZW1lbnRzTGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHNpemVbIG1lYXN1cmVtZW50IF0gPSAwO1xuICB9XG4gIHJldHVybiBzaXplO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBnZXRTdHlsZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGdldFN0eWxlLCBnZXQgc3R5bGUgb2YgZWxlbWVudCwgY2hlY2sgZm9yIEZpcmVmb3ggYnVnXG4gKiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGUoIGVsZW0gKSB7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoIGVsZW0gKTtcbiAgaWYgKCAhc3R5bGUgKSB7XG4gICAgbG9nRXJyb3IoICdTdHlsZSByZXR1cm5lZCAnICsgc3R5bGUgK1xuICAgICAgJy4gQXJlIHlvdSBydW5uaW5nIHRoaXMgY29kZSBpbiBhIGhpZGRlbiBpZnJhbWUgb24gRmlyZWZveD8gJyArXG4gICAgICAnU2VlIGh0dHBzOi8vYml0Lmx5L2dldHNpemVidWcxJyApO1xuICB9XG4gIHJldHVybiBzdHlsZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIGlzU2V0dXAgPSBmYWxzZTtcblxudmFyIGlzQm94U2l6ZU91dGVyO1xuXG4vKipcbiAqIHNldHVwXG4gKiBjaGVjayBpc0JveFNpemVyT3V0ZXJcbiAqIGRvIG9uIGZpcnN0IGdldFNpemUoKSByYXRoZXIgdGhhbiBvbiBwYWdlIGxvYWQgZm9yIEZpcmVmb3ggYnVnXG4gKi9cbmZ1bmN0aW9uIHNldHVwKCkge1xuICAvLyBzZXR1cCBvbmNlXG4gIGlmICggaXNTZXR1cCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaXNTZXR1cCA9IHRydWU7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYm94IHNpemluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4gIC8qKlxuICAgKiBDaHJvbWUgJiBTYWZhcmkgbWVhc3VyZSB0aGUgb3V0ZXItd2lkdGggb24gc3R5bGUud2lkdGggb24gYm9yZGVyLWJveCBlbGVtc1xuICAgKiBJRTExICYgRmlyZWZveDwyOSBtZWFzdXJlcyB0aGUgaW5uZXItd2lkdGhcbiAgICovXG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LnN0eWxlLndpZHRoID0gJzIwMHB4JztcbiAgZGl2LnN0eWxlLnBhZGRpbmcgPSAnMXB4IDJweCAzcHggNHB4JztcbiAgZGl2LnN0eWxlLmJvcmRlclN0eWxlID0gJ3NvbGlkJztcbiAgZGl2LnN0eWxlLmJvcmRlcldpZHRoID0gJzFweCAycHggM3B4IDRweCc7XG4gIGRpdi5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG5cbiAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgYm9keS5hcHBlbmRDaGlsZCggZGl2ICk7XG4gIHZhciBzdHlsZSA9IGdldFN0eWxlKCBkaXYgKTtcbiAgLy8gcm91bmQgdmFsdWUgZm9yIGJyb3dzZXIgem9vbS4gZGVzYW5kcm8vbWFzb25yeSM5MjhcbiAgaXNCb3hTaXplT3V0ZXIgPSBNYXRoLnJvdW5kKCBnZXRTdHlsZVNpemUoIHN0eWxlLndpZHRoICkgKSA9PSAyMDA7XG4gIGdldFNpemUuaXNCb3hTaXplT3V0ZXIgPSBpc0JveFNpemVPdXRlcjtcblxuICBib2R5LnJlbW92ZUNoaWxkKCBkaXYgKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0U2l6ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBnZXRTaXplKCBlbGVtICkge1xuICBzZXR1cCgpO1xuXG4gIC8vIHVzZSBxdWVyeVNlbGV0b3IgaWYgZWxlbSBpcyBzdHJpbmdcbiAgaWYgKCB0eXBlb2YgZWxlbSA9PSAnc3RyaW5nJyApIHtcbiAgICBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggZWxlbSApO1xuICB9XG5cbiAgLy8gZG8gbm90IHByb2NlZWQgb24gbm9uLW9iamVjdHNcbiAgaWYgKCAhZWxlbSB8fCB0eXBlb2YgZWxlbSAhPSAnb2JqZWN0JyB8fCAhZWxlbS5ub2RlVHlwZSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc3R5bGUgPSBnZXRTdHlsZSggZWxlbSApO1xuXG4gIC8vIGlmIGhpZGRlbiwgZXZlcnl0aGluZyBpcyAwXG4gIGlmICggc3R5bGUuZGlzcGxheSA9PSAnbm9uZScgKSB7XG4gICAgcmV0dXJuIGdldFplcm9TaXplKCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IHt9O1xuICBzaXplLndpZHRoID0gZWxlbS5vZmZzZXRXaWR0aDtcbiAgc2l6ZS5oZWlnaHQgPSBlbGVtLm9mZnNldEhlaWdodDtcblxuICB2YXIgaXNCb3JkZXJCb3ggPSBzaXplLmlzQm9yZGVyQm94ID0gc3R5bGUuYm94U2l6aW5nID09ICdib3JkZXItYm94JztcblxuICAvLyBnZXQgYWxsIG1lYXN1cmVtZW50c1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgbWVhc3VyZW1lbnRzTGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlWyBtZWFzdXJlbWVudCBdO1xuICAgIHZhciBudW0gPSBwYXJzZUZsb2F0KCB2YWx1ZSApO1xuICAgIC8vIGFueSAnYXV0bycsICdtZWRpdW0nIHZhbHVlIHdpbGwgYmUgMFxuICAgIHNpemVbIG1lYXN1cmVtZW50IF0gPSAhaXNOYU4oIG51bSApID8gbnVtIDogMDtcbiAgfVxuXG4gIHZhciBwYWRkaW5nV2lkdGggPSBzaXplLnBhZGRpbmdMZWZ0ICsgc2l6ZS5wYWRkaW5nUmlnaHQ7XG4gIHZhciBwYWRkaW5nSGVpZ2h0ID0gc2l6ZS5wYWRkaW5nVG9wICsgc2l6ZS5wYWRkaW5nQm90dG9tO1xuICB2YXIgbWFyZ2luV2lkdGggPSBzaXplLm1hcmdpbkxlZnQgKyBzaXplLm1hcmdpblJpZ2h0O1xuICB2YXIgbWFyZ2luSGVpZ2h0ID0gc2l6ZS5tYXJnaW5Ub3AgKyBzaXplLm1hcmdpbkJvdHRvbTtcbiAgdmFyIGJvcmRlcldpZHRoID0gc2l6ZS5ib3JkZXJMZWZ0V2lkdGggKyBzaXplLmJvcmRlclJpZ2h0V2lkdGg7XG4gIHZhciBib3JkZXJIZWlnaHQgPSBzaXplLmJvcmRlclRvcFdpZHRoICsgc2l6ZS5ib3JkZXJCb3R0b21XaWR0aDtcblxuICB2YXIgaXNCb3JkZXJCb3hTaXplT3V0ZXIgPSBpc0JvcmRlckJveCAmJiBpc0JveFNpemVPdXRlcjtcblxuICAvLyBvdmVyd3JpdGUgd2lkdGggYW5kIGhlaWdodCBpZiB3ZSBjYW4gZ2V0IGl0IGZyb20gc3R5bGVcbiAgdmFyIHN0eWxlV2lkdGggPSBnZXRTdHlsZVNpemUoIHN0eWxlLndpZHRoICk7XG4gIGlmICggc3R5bGVXaWR0aCAhPT0gZmFsc2UgKSB7XG4gICAgc2l6ZS53aWR0aCA9IHN0eWxlV2lkdGggK1xuICAgICAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB1bmxlc3MgaXQncyBhbHJlYWR5IGluY2x1ZGluZyBpdFxuICAgICAgKCBpc0JvcmRlckJveFNpemVPdXRlciA/IDAgOiBwYWRkaW5nV2lkdGggKyBib3JkZXJXaWR0aCApO1xuICB9XG5cbiAgdmFyIHN0eWxlSGVpZ2h0ID0gZ2V0U3R5bGVTaXplKCBzdHlsZS5oZWlnaHQgKTtcbiAgaWYgKCBzdHlsZUhlaWdodCAhPT0gZmFsc2UgKSB7XG4gICAgc2l6ZS5oZWlnaHQgPSBzdHlsZUhlaWdodCArXG4gICAgICAvLyBhZGQgcGFkZGluZyBhbmQgYm9yZGVyIHVubGVzcyBpdCdzIGFscmVhZHkgaW5jbHVkaW5nIGl0XG4gICAgICAoIGlzQm9yZGVyQm94U2l6ZU91dGVyID8gMCA6IHBhZGRpbmdIZWlnaHQgKyBib3JkZXJIZWlnaHQgKTtcbiAgfVxuXG4gIHNpemUuaW5uZXJXaWR0aCA9IHNpemUud2lkdGggLSAoIHBhZGRpbmdXaWR0aCArIGJvcmRlcldpZHRoICk7XG4gIHNpemUuaW5uZXJIZWlnaHQgPSBzaXplLmhlaWdodCAtICggcGFkZGluZ0hlaWdodCArIGJvcmRlckhlaWdodCApO1xuXG4gIHNpemUub3V0ZXJXaWR0aCA9IHNpemUud2lkdGggKyBtYXJnaW5XaWR0aDtcbiAgc2l6ZS5vdXRlckhlaWdodCA9IHNpemUuaGVpZ2h0ICsgbWFyZ2luSGVpZ2h0O1xuXG4gIHJldHVybiBzaXplO1xufVxuXG5yZXR1cm4gZ2V0U2l6ZTtcblxufSk7XG4iLCIvKiFcbiAqIGltYWdlc0xvYWRlZCB2NC4xLjRcbiAqIEphdmFTY3JpcHQgaXMgYWxsIGxpa2UgXCJZb3UgaW1hZ2VzIGFyZSBkb25lIHlldCBvciB3aGF0P1wiXG4gKiBNSVQgTGljZW5zZVxuICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHsgJ3VzZSBzdHJpY3QnO1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cblxuICAvKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlLCByZXF1aXJlOiBmYWxzZSAqL1xuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZXYtZW1pdHRlci9ldi1lbWl0dGVyJ1xuICAgIF0sIGZ1bmN0aW9uKCBFdkVtaXR0ZXIgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuaW1hZ2VzTG9hZGVkID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5FdkVtaXR0ZXJcbiAgICApO1xuICB9XG5cbn0pKCB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMsXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBmYWN0b3J5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciAkID0gd2luZG93LmpRdWVyeTtcbnZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGhlbHBlcnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZXh0ZW5kIG9iamVjdHNcbmZ1bmN0aW9uIGV4dGVuZCggYSwgYiApIHtcbiAgZm9yICggdmFyIHByb3AgaW4gYiApIHtcbiAgICBhWyBwcm9wIF0gPSBiWyBwcm9wIF07XG4gIH1cbiAgcmV0dXJuIGE7XG59XG5cbnZhciBhcnJheVNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4vLyB0dXJuIGVsZW1lbnQgb3Igbm9kZUxpc3QgaW50byBhbiBhcnJheVxuZnVuY3Rpb24gbWFrZUFycmF5KCBvYmogKSB7XG4gIGlmICggQXJyYXkuaXNBcnJheSggb2JqICkgKSB7XG4gICAgLy8gdXNlIG9iamVjdCBpZiBhbHJlYWR5IGFuIGFycmF5XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciBpc0FycmF5TGlrZSA9IHR5cGVvZiBvYmogPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5sZW5ndGggPT0gJ251bWJlcic7XG4gIGlmICggaXNBcnJheUxpa2UgKSB7XG4gICAgLy8gY29udmVydCBub2RlTGlzdCB0byBhcnJheVxuICAgIHJldHVybiBhcnJheVNsaWNlLmNhbGwoIG9iaiApO1xuICB9XG5cbiAgLy8gYXJyYXkgb2Ygc2luZ2xlIGluZGV4XG4gIHJldHVybiBbIG9iaiBdO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBpbWFnZXNMb2FkZWQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5LCBFbGVtZW50LCBOb2RlTGlzdCwgU3RyaW5nfSBlbGVtXG4gKiBAcGFyYW0ge09iamVjdCBvciBGdW5jdGlvbn0gb3B0aW9ucyAtIGlmIGZ1bmN0aW9uLCB1c2UgYXMgY2FsbGJhY2tcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQWx3YXlzIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gSW1hZ2VzTG9hZGVkKCBlbGVtLCBvcHRpb25zLCBvbkFsd2F5cyApIHtcbiAgLy8gY29lcmNlIEltYWdlc0xvYWRlZCgpIHdpdGhvdXQgbmV3LCB0byBiZSBuZXcgSW1hZ2VzTG9hZGVkKClcbiAgaWYgKCAhKCB0aGlzIGluc3RhbmNlb2YgSW1hZ2VzTG9hZGVkICkgKSB7XG4gICAgcmV0dXJuIG5ldyBJbWFnZXNMb2FkZWQoIGVsZW0sIG9wdGlvbnMsIG9uQWx3YXlzICk7XG4gIH1cbiAgLy8gdXNlIGVsZW0gYXMgc2VsZWN0b3Igc3RyaW5nXG4gIHZhciBxdWVyeUVsZW0gPSBlbGVtO1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIHF1ZXJ5RWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGVsZW0gKTtcbiAgfVxuICAvLyBiYWlsIGlmIGJhZCBlbGVtZW50XG4gIGlmICggIXF1ZXJ5RWxlbSApIHtcbiAgICBjb25zb2xlLmVycm9yKCAnQmFkIGVsZW1lbnQgZm9yIGltYWdlc0xvYWRlZCAnICsgKCBxdWVyeUVsZW0gfHwgZWxlbSApICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5lbGVtZW50cyA9IG1ha2VBcnJheSggcXVlcnlFbGVtICk7XG4gIHRoaXMub3B0aW9ucyA9IGV4dGVuZCgge30sIHRoaXMub3B0aW9ucyApO1xuICAvLyBzaGlmdCBhcmd1bWVudHMgaWYgbm8gb3B0aW9ucyBzZXRcbiAgaWYgKCB0eXBlb2Ygb3B0aW9ucyA9PSAnZnVuY3Rpb24nICkge1xuICAgIG9uQWx3YXlzID0gb3B0aW9ucztcbiAgfSBlbHNlIHtcbiAgICBleHRlbmQoIHRoaXMub3B0aW9ucywgb3B0aW9ucyApO1xuICB9XG5cbiAgaWYgKCBvbkFsd2F5cyApIHtcbiAgICB0aGlzLm9uKCAnYWx3YXlzJywgb25BbHdheXMgKTtcbiAgfVxuXG4gIHRoaXMuZ2V0SW1hZ2VzKCk7XG5cbiAgaWYgKCAkICkge1xuICAgIC8vIGFkZCBqUXVlcnkgRGVmZXJyZWQgb2JqZWN0XG4gICAgdGhpcy5qcURlZmVycmVkID0gbmV3ICQuRGVmZXJyZWQoKTtcbiAgfVxuXG4gIC8vIEhBQ0sgY2hlY2sgYXN5bmMgdG8gYWxsb3cgdGltZSB0byBiaW5kIGxpc3RlbmVyc1xuICBzZXRUaW1lb3V0KCB0aGlzLmNoZWNrLmJpbmQoIHRoaXMgKSApO1xufVxuXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlLm9wdGlvbnMgPSB7fTtcblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5nZXRJbWFnZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5pbWFnZXMgPSBbXTtcblxuICAvLyBmaWx0ZXIgJiBmaW5kIGl0ZW1zIGlmIHdlIGhhdmUgYW4gaXRlbSBzZWxlY3RvclxuICB0aGlzLmVsZW1lbnRzLmZvckVhY2goIHRoaXMuYWRkRWxlbWVudEltYWdlcywgdGhpcyApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IGVsZW1lbnRcbiAqL1xuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5hZGRFbGVtZW50SW1hZ2VzID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIC8vIGZpbHRlciBzaWJsaW5nc1xuICBpZiAoIGVsZW0ubm9kZU5hbWUgPT0gJ0lNRycgKSB7XG4gICAgdGhpcy5hZGRJbWFnZSggZWxlbSApO1xuICB9XG4gIC8vIGdldCBiYWNrZ3JvdW5kIGltYWdlIG9uIGVsZW1lbnRcbiAgaWYgKCB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZCA9PT0gdHJ1ZSApIHtcbiAgICB0aGlzLmFkZEVsZW1lbnRCYWNrZ3JvdW5kSW1hZ2VzKCBlbGVtICk7XG4gIH1cblxuICAvLyBmaW5kIGNoaWxkcmVuXG4gIC8vIG5vIG5vbi1lbGVtZW50IG5vZGVzLCAjMTQzXG4gIHZhciBub2RlVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG4gIGlmICggIW5vZGVUeXBlIHx8ICFlbGVtZW50Tm9kZVR5cGVzWyBub2RlVHlwZSBdICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgY2hpbGRJbWdzID0gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKTtcbiAgLy8gY29uY2F0IGNoaWxkRWxlbXMgdG8gZmlsdGVyRm91bmQgYXJyYXlcbiAgZm9yICggdmFyIGk9MDsgaSA8IGNoaWxkSW1ncy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgaW1nID0gY2hpbGRJbWdzW2ldO1xuICAgIHRoaXMuYWRkSW1hZ2UoIGltZyApO1xuICB9XG5cbiAgLy8gZ2V0IGNoaWxkIGJhY2tncm91bmQgaW1hZ2VzXG4gIGlmICggdHlwZW9mIHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kID09ICdzdHJpbmcnICkge1xuICAgIHZhciBjaGlsZHJlbiA9IGVsZW0ucXVlcnlTZWxlY3RvckFsbCggdGhpcy5vcHRpb25zLmJhY2tncm91bmQgKTtcbiAgICBmb3IgKCBpPTA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgdGhpcy5hZGRFbGVtZW50QmFja2dyb3VuZEltYWdlcyggY2hpbGQgKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBlbGVtZW50Tm9kZVR5cGVzID0ge1xuICAxOiB0cnVlLFxuICA5OiB0cnVlLFxuICAxMTogdHJ1ZVxufTtcblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5hZGRFbGVtZW50QmFja2dyb3VuZEltYWdlcyA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKCBlbGVtICk7XG4gIGlmICggIXN0eWxlICkge1xuICAgIC8vIEZpcmVmb3ggcmV0dXJucyBudWxsIGlmIGluIGEgaGlkZGVuIGlmcmFtZSBodHRwczovL2J1Z3ppbC5sYS81NDgzOTdcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZ2V0IHVybCBpbnNpZGUgdXJsKFwiLi4uXCIpXG4gIHZhciByZVVSTCA9IC91cmxcXCgoWydcIl0pPyguKj8pXFwxXFwpL2dpO1xuICB2YXIgbWF0Y2hlcyA9IHJlVVJMLmV4ZWMoIHN0eWxlLmJhY2tncm91bmRJbWFnZSApO1xuICB3aGlsZSAoIG1hdGNoZXMgIT09IG51bGwgKSB7XG4gICAgdmFyIHVybCA9IG1hdGNoZXMgJiYgbWF0Y2hlc1syXTtcbiAgICBpZiAoIHVybCApIHtcbiAgICAgIHRoaXMuYWRkQmFja2dyb3VuZCggdXJsLCBlbGVtICk7XG4gICAgfVxuICAgIG1hdGNoZXMgPSByZVVSTC5leGVjKCBzdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWdcbiAqL1xuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5hZGRJbWFnZSA9IGZ1bmN0aW9uKCBpbWcgKSB7XG4gIHZhciBsb2FkaW5nSW1hZ2UgPSBuZXcgTG9hZGluZ0ltYWdlKCBpbWcgKTtcbiAgdGhpcy5pbWFnZXMucHVzaCggbG9hZGluZ0ltYWdlICk7XG59O1xuXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlLmFkZEJhY2tncm91bmQgPSBmdW5jdGlvbiggdXJsLCBlbGVtICkge1xuICB2YXIgYmFja2dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCB1cmwsIGVsZW0gKTtcbiAgdGhpcy5pbWFnZXMucHVzaCggYmFja2dyb3VuZCApO1xufTtcblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB0aGlzLnByb2dyZXNzZWRDb3VudCA9IDA7XG4gIHRoaXMuaGFzQW55QnJva2VuID0gZmFsc2U7XG4gIC8vIGNvbXBsZXRlIGlmIG5vIGltYWdlc1xuICBpZiAoICF0aGlzLmltYWdlcy5sZW5ndGggKSB7XG4gICAgdGhpcy5jb21wbGV0ZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUHJvZ3Jlc3MoIGltYWdlLCBlbGVtLCBtZXNzYWdlICkge1xuICAgIC8vIEhBQ0sgLSBDaHJvbWUgdHJpZ2dlcnMgZXZlbnQgYmVmb3JlIG9iamVjdCBwcm9wZXJ0aWVzIGhhdmUgY2hhbmdlZC4gIzgzXG4gICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5wcm9ncmVzcyggaW1hZ2UsIGVsZW0sIG1lc3NhZ2UgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRoaXMuaW1hZ2VzLmZvckVhY2goIGZ1bmN0aW9uKCBsb2FkaW5nSW1hZ2UgKSB7XG4gICAgbG9hZGluZ0ltYWdlLm9uY2UoICdwcm9ncmVzcycsIG9uUHJvZ3Jlc3MgKTtcbiAgICBsb2FkaW5nSW1hZ2UuY2hlY2soKTtcbiAgfSk7XG59O1xuXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlLnByb2dyZXNzID0gZnVuY3Rpb24oIGltYWdlLCBlbGVtLCBtZXNzYWdlICkge1xuICB0aGlzLnByb2dyZXNzZWRDb3VudCsrO1xuICB0aGlzLmhhc0FueUJyb2tlbiA9IHRoaXMuaGFzQW55QnJva2VuIHx8ICFpbWFnZS5pc0xvYWRlZDtcbiAgLy8gcHJvZ3Jlc3MgZXZlbnRcbiAgdGhpcy5lbWl0RXZlbnQoICdwcm9ncmVzcycsIFsgdGhpcywgaW1hZ2UsIGVsZW0gXSApO1xuICBpZiAoIHRoaXMuanFEZWZlcnJlZCAmJiB0aGlzLmpxRGVmZXJyZWQubm90aWZ5ICkge1xuICAgIHRoaXMuanFEZWZlcnJlZC5ub3RpZnkoIHRoaXMsIGltYWdlICk7XG4gIH1cbiAgLy8gY2hlY2sgaWYgY29tcGxldGVkXG4gIGlmICggdGhpcy5wcm9ncmVzc2VkQ291bnQgPT0gdGhpcy5pbWFnZXMubGVuZ3RoICkge1xuICAgIHRoaXMuY29tcGxldGUoKTtcbiAgfVxuXG4gIGlmICggdGhpcy5vcHRpb25zLmRlYnVnICYmIGNvbnNvbGUgKSB7XG4gICAgY29uc29sZS5sb2coICdwcm9ncmVzczogJyArIG1lc3NhZ2UsIGltYWdlLCBlbGVtICk7XG4gIH1cbn07XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGV2ZW50TmFtZSA9IHRoaXMuaGFzQW55QnJva2VuID8gJ2ZhaWwnIDogJ2RvbmUnO1xuICB0aGlzLmlzQ29tcGxldGUgPSB0cnVlO1xuICB0aGlzLmVtaXRFdmVudCggZXZlbnROYW1lLCBbIHRoaXMgXSApO1xuICB0aGlzLmVtaXRFdmVudCggJ2Fsd2F5cycsIFsgdGhpcyBdICk7XG4gIGlmICggdGhpcy5qcURlZmVycmVkICkge1xuICAgIHZhciBqcU1ldGhvZCA9IHRoaXMuaGFzQW55QnJva2VuID8gJ3JlamVjdCcgOiAncmVzb2x2ZSc7XG4gICAgdGhpcy5qcURlZmVycmVkWyBqcU1ldGhvZCBdKCB0aGlzICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBMb2FkaW5nSW1hZ2UoIGltZyApIHtcbiAgdGhpcy5pbWcgPSBpbWc7XG59XG5cbkxvYWRpbmdJbWFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbkxvYWRpbmdJbWFnZS5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgLy8gSWYgY29tcGxldGUgaXMgdHJ1ZSBhbmQgYnJvd3NlciBzdXBwb3J0cyBuYXR1cmFsIHNpemVzLFxuICAvLyB0cnkgdG8gY2hlY2sgZm9yIGltYWdlIHN0YXR1cyBtYW51YWxseS5cbiAgdmFyIGlzQ29tcGxldGUgPSB0aGlzLmdldElzSW1hZ2VDb21wbGV0ZSgpO1xuICBpZiAoIGlzQ29tcGxldGUgKSB7XG4gICAgLy8gcmVwb3J0IGJhc2VkIG9uIG5hdHVyYWxXaWR0aFxuICAgIHRoaXMuY29uZmlybSggdGhpcy5pbWcubmF0dXJhbFdpZHRoICE9PSAwLCAnbmF0dXJhbFdpZHRoJyApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIElmIG5vbmUgb2YgdGhlIGNoZWNrcyBhYm92ZSBtYXRjaGVkLCBzaW11bGF0ZSBsb2FkaW5nIG9uIGRldGFjaGVkIGVsZW1lbnQuXG4gIHRoaXMucHJveHlJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICB0aGlzLnByb3h5SW1hZ2UuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMucHJveHlJbWFnZS5hZGRFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG4gIC8vIGJpbmQgdG8gaW1hZ2UgYXMgd2VsbCBmb3IgRmlyZWZveC4gIzE5MVxuICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuICB0aGlzLnByb3h5SW1hZ2Uuc3JjID0gdGhpcy5pbWcuc3JjO1xufTtcblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS5nZXRJc0ltYWdlQ29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2hlY2sgZm9yIG5vbi16ZXJvLCBub24tdW5kZWZpbmVkIG5hdHVyYWxXaWR0aFxuICAvLyBmaXhlcyBTYWZhcmkrSW5maW5pdGVTY3JvbGwrTWFzb25yeSBidWcgaW5maW5pdGUtc2Nyb2xsIzY3MVxuICByZXR1cm4gdGhpcy5pbWcuY29tcGxldGUgJiYgdGhpcy5pbWcubmF0dXJhbFdpZHRoO1xufTtcblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS5jb25maXJtID0gZnVuY3Rpb24oIGlzTG9hZGVkLCBtZXNzYWdlICkge1xuICB0aGlzLmlzTG9hZGVkID0gaXNMb2FkZWQ7XG4gIHRoaXMuZW1pdEV2ZW50KCAncHJvZ3Jlc3MnLCBbIHRoaXMsIHRoaXMuaW1nLCBtZXNzYWdlIF0gKTtcbn07XG5cbi8vIC0tLS0tIGV2ZW50cyAtLS0tLSAvL1xuXG4vLyB0cmlnZ2VyIHNwZWNpZmllZCBoYW5kbGVyIGZvciBldmVudCB0eXBlXG5Mb2FkaW5nSW1hZ2UucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbkxvYWRpbmdJbWFnZS5wcm90b3R5cGUub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY29uZmlybSggdHJ1ZSwgJ29ubG9hZCcgKTtcbiAgdGhpcy51bmJpbmRFdmVudHMoKTtcbn07XG5cbkxvYWRpbmdJbWFnZS5wcm90b3R5cGUub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNvbmZpcm0oIGZhbHNlLCAnb25lcnJvcicgKTtcbiAgdGhpcy51bmJpbmRFdmVudHMoKTtcbn07XG5cbkxvYWRpbmdJbWFnZS5wcm90b3R5cGUudW5iaW5kRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucHJveHlJbWFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5wcm94eUltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMuaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEJhY2tncm91bmQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gQmFja2dyb3VuZCggdXJsLCBlbGVtZW50ICkge1xuICB0aGlzLnVybCA9IHVybDtcbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgdGhpcy5pbWcgPSBuZXcgSW1hZ2UoKTtcbn1cblxuLy8gaW5oZXJpdCBMb2FkaW5nSW1hZ2UgcHJvdG90eXBlXG5CYWNrZ3JvdW5kLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIExvYWRpbmdJbWFnZS5wcm90b3R5cGUgKTtcblxuQmFja2dyb3VuZC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMuaW1nLmFkZEV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcbiAgdGhpcy5pbWcuc3JjID0gdGhpcy51cmw7XG4gIC8vIGNoZWNrIGlmIGltYWdlIGlzIGFscmVhZHkgY29tcGxldGVcbiAgdmFyIGlzQ29tcGxldGUgPSB0aGlzLmdldElzSW1hZ2VDb21wbGV0ZSgpO1xuICBpZiAoIGlzQ29tcGxldGUgKSB7XG4gICAgdGhpcy5jb25maXJtKCB0aGlzLmltZy5uYXR1cmFsV2lkdGggIT09IDAsICduYXR1cmFsV2lkdGgnICk7XG4gICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgfVxufTtcblxuQmFja2dyb3VuZC5wcm90b3R5cGUudW5iaW5kRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLmltZy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG59O1xuXG5CYWNrZ3JvdW5kLnByb3RvdHlwZS5jb25maXJtID0gZnVuY3Rpb24oIGlzTG9hZGVkLCBtZXNzYWdlICkge1xuICB0aGlzLmlzTG9hZGVkID0gaXNMb2FkZWQ7XG4gIHRoaXMuZW1pdEV2ZW50KCAncHJvZ3Jlc3MnLCBbIHRoaXMsIHRoaXMuZWxlbWVudCwgbWVzc2FnZSBdICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBqUXVlcnkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuSW1hZ2VzTG9hZGVkLm1ha2VKUXVlcnlQbHVnaW4gPSBmdW5jdGlvbiggalF1ZXJ5ICkge1xuICBqUXVlcnkgPSBqUXVlcnkgfHwgd2luZG93LmpRdWVyeTtcbiAgaWYgKCAhalF1ZXJ5ICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBzZXQgbG9jYWwgdmFyaWFibGVcbiAgJCA9IGpRdWVyeTtcbiAgLy8gJCgpLmltYWdlc0xvYWRlZCgpXG4gICQuZm4uaW1hZ2VzTG9hZGVkID0gZnVuY3Rpb24oIG9wdGlvbnMsIGNhbGxiYWNrICkge1xuICAgIHZhciBpbnN0YW5jZSA9IG5ldyBJbWFnZXNMb2FkZWQoIHRoaXMsIG9wdGlvbnMsIGNhbGxiYWNrICk7XG4gICAgcmV0dXJuIGluc3RhbmNlLmpxRGVmZXJyZWQucHJvbWlzZSggJCh0aGlzKSApO1xuICB9O1xufTtcbi8vIHRyeSBtYWtpbmcgcGx1Z2luXG5JbWFnZXNMb2FkZWQubWFrZUpRdWVyeVBsdWdpbigpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucmV0dXJuIEltYWdlc0xvYWRlZDtcblxufSk7XG4iLCIvKiFcbiAqIFVuaWRyYWdnZXIgdjIuMy4wXG4gKiBEcmFnZ2FibGUgYmFzZSBjbGFzc1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHVuZGVmOiB0cnVlLCBzdHJpY3Q6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLypqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKmdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ3VuaXBvaW50ZXIvdW5pcG9pbnRlcidcbiAgICBdLCBmdW5jdGlvbiggVW5pcG9pbnRlciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIFVuaXBvaW50ZXIgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ3VuaXBvaW50ZXInKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuVW5pZHJhZ2dlciA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuVW5pcG9pbnRlclxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIFVuaXBvaW50ZXIgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gVW5pZHJhZ2dlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBVbmlkcmFnZ2VyKCkge31cblxuLy8gaW5oZXJpdCBVbmlwb2ludGVyICYgRXZFbWl0dGVyXG52YXIgcHJvdG8gPSBVbmlkcmFnZ2VyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVuaXBvaW50ZXIucHJvdG90eXBlICk7XG5cbi8vIC0tLS0tIGJpbmQgc3RhcnQgLS0tLS0gLy9cblxucHJvdG8uYmluZEhhbmRsZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fYmluZEhhbmRsZXMoIHRydWUgKTtcbn07XG5cbnByb3RvLnVuYmluZEhhbmRsZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fYmluZEhhbmRsZXMoIGZhbHNlICk7XG59O1xuXG4vKipcbiAqIEFkZCBvciByZW1vdmUgc3RhcnQgZXZlbnRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNBZGRcbiAqL1xucHJvdG8uX2JpbmRIYW5kbGVzID0gZnVuY3Rpb24oIGlzQWRkICkge1xuICAvLyBtdW5nZSBpc0FkZCwgZGVmYXVsdCB0byB0cnVlXG4gIGlzQWRkID0gaXNBZGQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpc0FkZDtcbiAgLy8gYmluZCBlYWNoIGhhbmRsZVxuICB2YXIgYmluZE1ldGhvZCA9IGlzQWRkID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuICB2YXIgdG91Y2hBY3Rpb24gPSBpc0FkZCA/IHRoaXMuX3RvdWNoQWN0aW9uVmFsdWUgOiAnJztcbiAgZm9yICggdmFyIGk9MDsgaSA8IHRoaXMuaGFuZGxlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgaGFuZGxlID0gdGhpcy5oYW5kbGVzW2ldO1xuICAgIHRoaXMuX2JpbmRTdGFydEV2ZW50KCBoYW5kbGUsIGlzQWRkICk7XG4gICAgaGFuZGxlWyBiaW5kTWV0aG9kIF0oICdjbGljaycsIHRoaXMgKTtcbiAgICAvLyB0b3VjaC1hY3Rpb246IG5vbmUgdG8gb3ZlcnJpZGUgYnJvd3NlciB0b3VjaCBnZXN0dXJlcy4gbWV0YWZpenp5L2ZsaWNraXR5IzU0MFxuICAgIGlmICggd2luZG93LlBvaW50ZXJFdmVudCApIHtcbiAgICAgIGhhbmRsZS5zdHlsZS50b3VjaEFjdGlvbiA9IHRvdWNoQWN0aW9uO1xuICAgIH1cbiAgfVxufTtcblxuLy8gcHJvdG90eXBlIHNvIGl0IGNhbiBiZSBvdmVyd3JpdGVhYmxlIGJ5IEZsaWNraXR5XG5wcm90by5fdG91Y2hBY3Rpb25WYWx1ZSA9ICdub25lJztcblxuLy8gLS0tLS0gc3RhcnQgZXZlbnQgLS0tLS0gLy9cblxuLyoqXG4gKiBwb2ludGVyIHN0YXJ0XG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIGlzT2theSA9IHRoaXMub2theVBvaW50ZXJEb3duKCBldmVudCApO1xuICBpZiAoICFpc09rYXkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHRyYWNrIHN0YXJ0IGV2ZW50IHBvc2l0aW9uXG4gIHRoaXMucG9pbnRlckRvd25Qb2ludGVyID0gcG9pbnRlcjtcblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0aGlzLnBvaW50ZXJEb3duQmx1cigpO1xuICAvLyBiaW5kIG1vdmUgYW5kIGVuZCBldmVudHNcbiAgdGhpcy5fYmluZFBvc3RTdGFydEV2ZW50cyggZXZlbnQgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyRG93bicsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gbm9kZXMgdGhhdCBoYXZlIHRleHQgZmllbGRzXG52YXIgY3Vyc29yTm9kZXMgPSB7XG4gIFRFWFRBUkVBOiB0cnVlLFxuICBJTlBVVDogdHJ1ZSxcbiAgU0VMRUNUOiB0cnVlLFxuICBPUFRJT046IHRydWUsXG59O1xuXG4vLyBpbnB1dCB0eXBlcyB0aGF0IGRvIG5vdCBoYXZlIHRleHQgZmllbGRzXG52YXIgY2xpY2tUeXBlcyA9IHtcbiAgcmFkaW86IHRydWUsXG4gIGNoZWNrYm94OiB0cnVlLFxuICBidXR0b246IHRydWUsXG4gIHN1Ym1pdDogdHJ1ZSxcbiAgaW1hZ2U6IHRydWUsXG4gIGZpbGU6IHRydWUsXG59O1xuXG4vLyBkaXNtaXNzIGlucHV0cyB3aXRoIHRleHQgZmllbGRzLiBmbGlja2l0eSM0MDMsIGZsaWNraXR5IzQwNFxucHJvdG8ub2theVBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgaXNDdXJzb3JOb2RlID0gY3Vyc29yTm9kZXNbIGV2ZW50LnRhcmdldC5ub2RlTmFtZSBdO1xuICB2YXIgaXNDbGlja1R5cGUgPSBjbGlja1R5cGVzWyBldmVudC50YXJnZXQudHlwZSBdO1xuICB2YXIgaXNPa2F5ID0gIWlzQ3Vyc29yTm9kZSB8fCBpc0NsaWNrVHlwZTtcbiAgaWYgKCAhaXNPa2F5ICkge1xuICAgIHRoaXMuX3BvaW50ZXJSZXNldCgpO1xuICB9XG4gIHJldHVybiBpc09rYXk7XG59O1xuXG4vLyBrbHVkZ2UgdG8gYmx1ciBwcmV2aW91c2x5IGZvY3VzZWQgaW5wdXRcbnByb3RvLnBvaW50ZXJEb3duQmx1ciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZm9jdXNlZCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIC8vIGRvIG5vdCBibHVyIGJvZHkgZm9yIElFMTAsIG1ldGFmaXp6eS9mbGlja2l0eSMxMTdcbiAgdmFyIGNhbkJsdXIgPSBmb2N1c2VkICYmIGZvY3VzZWQuYmx1ciAmJiBmb2N1c2VkICE9IGRvY3VtZW50LmJvZHk7XG4gIGlmICggY2FuQmx1ciApIHtcbiAgICBmb2N1c2VkLmJsdXIoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gbW92ZSBldmVudCAtLS0tLSAvL1xuXG4vKipcbiAqIGRyYWcgbW92ZVxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8ucG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHZhciBtb3ZlVmVjdG9yID0gdGhpcy5fZHJhZ1BvaW50ZXJNb3ZlKCBldmVudCwgcG9pbnRlciApO1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJNb3ZlJywgWyBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciBdICk7XG4gIHRoaXMuX2RyYWdNb3ZlKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApO1xufTtcblxuLy8gYmFzZSBwb2ludGVyIG1vdmUgbG9naWNcbnByb3RvLl9kcmFnUG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHZhciBtb3ZlVmVjdG9yID0ge1xuICAgIHg6IHBvaW50ZXIucGFnZVggLSB0aGlzLnBvaW50ZXJEb3duUG9pbnRlci5wYWdlWCxcbiAgICB5OiBwb2ludGVyLnBhZ2VZIC0gdGhpcy5wb2ludGVyRG93blBvaW50ZXIucGFnZVlcbiAgfTtcbiAgLy8gc3RhcnQgZHJhZyBpZiBwb2ludGVyIGhhcyBtb3ZlZCBmYXIgZW5vdWdoIHRvIHN0YXJ0IGRyYWdcbiAgaWYgKCAhdGhpcy5pc0RyYWdnaW5nICYmIHRoaXMuaGFzRHJhZ1N0YXJ0ZWQoIG1vdmVWZWN0b3IgKSApIHtcbiAgICB0aGlzLl9kcmFnU3RhcnQoIGV2ZW50LCBwb2ludGVyICk7XG4gIH1cbiAgcmV0dXJuIG1vdmVWZWN0b3I7XG59O1xuXG4vLyBjb25kaXRpb24gaWYgcG9pbnRlciBoYXMgbW92ZWQgZmFyIGVub3VnaCB0byBzdGFydCBkcmFnXG5wcm90by5oYXNEcmFnU3RhcnRlZCA9IGZ1bmN0aW9uKCBtb3ZlVmVjdG9yICkge1xuICByZXR1cm4gTWF0aC5hYnMoIG1vdmVWZWN0b3IueCApID4gMyB8fCBNYXRoLmFicyggbW92ZVZlY3Rvci55ICkgPiAzO1xufTtcblxuLy8gLS0tLS0gZW5kIGV2ZW50IC0tLS0tIC8vXG5cbi8qKlxuICogcG9pbnRlciB1cFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8ucG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJVcCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xuICB0aGlzLl9kcmFnUG9pbnRlclVwKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8uX2RyYWdQb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggdGhpcy5pc0RyYWdnaW5nICkge1xuICAgIHRoaXMuX2RyYWdFbmQoIGV2ZW50LCBwb2ludGVyICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gcG9pbnRlciBkaWRuJ3QgbW92ZSBlbm91Z2ggZm9yIGRyYWcgdG8gc3RhcnRcbiAgICB0aGlzLl9zdGF0aWNDbGljayggZXZlbnQsIHBvaW50ZXIgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBkcmFnU3RhcnRcbnByb3RvLl9kcmFnU3RhcnQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gIC8vIHByZXZlbnQgY2xpY2tzXG4gIHRoaXMuaXNQcmV2ZW50aW5nQ2xpY2tzID0gdHJ1ZTtcbiAgdGhpcy5kcmFnU3RhcnQoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5kcmFnU3RhcnQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAnZHJhZ1N0YXJ0JywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyBkcmFnTW92ZVxucHJvdG8uX2RyYWdNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICkge1xuICAvLyBkbyBub3QgZHJhZyBpZiBub3QgZHJhZ2dpbmcgeWV0XG4gIGlmICggIXRoaXMuaXNEcmFnZ2luZyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmRyYWdNb3ZlKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApO1xufTtcblxucHJvdG8uZHJhZ01vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRoaXMuZW1pdEV2ZW50KCAnZHJhZ01vdmUnLCBbIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbn07XG5cbi8vIGRyYWdFbmRcbnByb3RvLl9kcmFnRW5kID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBzZXQgZmxhZ3NcbiAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gIC8vIHJlLWVuYWJsZSBjbGlja2luZyBhc3luY1xuICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgdGhpcy5pc1ByZXZlbnRpbmdDbGlja3M7XG4gIH0uYmluZCggdGhpcyApICk7XG5cbiAgdGhpcy5kcmFnRW5kKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8uZHJhZ0VuZCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdkcmFnRW5kJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSBvbmNsaWNrIC0tLS0tIC8vXG5cbi8vIGhhbmRsZSBhbGwgY2xpY2tzIGFuZCBwcmV2ZW50IGNsaWNrcyB3aGVuIGRyYWdnaW5nXG5wcm90by5vbmNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIHRoaXMuaXNQcmV2ZW50aW5nQ2xpY2tzICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIHN0YXRpY0NsaWNrIC0tLS0tIC8vXG5cbi8vIHRyaWdnZXJlZCBhZnRlciBwb2ludGVyIGRvd24gJiB1cCB3aXRoIG5vL3RpbnkgbW92ZW1lbnRcbnByb3RvLl9zdGF0aWNDbGljayA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gaWdub3JlIGVtdWxhdGVkIG1vdXNlIHVwIGNsaWNrc1xuICBpZiAoIHRoaXMuaXNJZ25vcmluZ01vdXNlVXAgJiYgZXZlbnQudHlwZSA9PSAnbW91c2V1cCcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5zdGF0aWNDbGljayggZXZlbnQsIHBvaW50ZXIgKTtcblxuICAvLyBzZXQgZmxhZyBmb3IgZW11bGF0ZWQgY2xpY2tzIDMwMG1zIGFmdGVyIHRvdWNoZW5kXG4gIGlmICggZXZlbnQudHlwZSAhPSAnbW91c2V1cCcgKSB7XG4gICAgdGhpcy5pc0lnbm9yaW5nTW91c2VVcCA9IHRydWU7XG4gICAgLy8gcmVzZXQgZmxhZyBhZnRlciAzMDBtc1xuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgZGVsZXRlIHRoaXMuaXNJZ25vcmluZ01vdXNlVXA7XG4gICAgfS5iaW5kKCB0aGlzICksIDQwMCApO1xuICB9XG59O1xuXG5wcm90by5zdGF0aWNDbGljayA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdzdGF0aWNDbGljaycsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gdXRpbHMgLS0tLS0gLy9cblxuVW5pZHJhZ2dlci5nZXRQb2ludGVyUG9pbnQgPSBVbmlwb2ludGVyLmdldFBvaW50ZXJQb2ludDtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBVbmlkcmFnZ2VyO1xuXG59KSk7XG4iLCIvKiFcbiAqIFVuaXBvaW50ZXIgdjIuMy4wXG4gKiBiYXNlIGNsYXNzIGZvciBkb2luZyBvbmUgdGhpbmcgd2l0aCBwb2ludGVyIGV2ZW50XG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKmdsb2JhbCBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcidcbiAgICBdLCBmdW5jdGlvbiggRXZFbWl0dGVyICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdldi1lbWl0dGVyJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LlVuaXBvaW50ZXIgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkV2RW1pdHRlclxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gVW5pcG9pbnRlcigpIHt9XG5cbi8vIGluaGVyaXQgRXZFbWl0dGVyXG52YXIgcHJvdG8gPSBVbmlwb2ludGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxucHJvdG8uYmluZFN0YXJ0RXZlbnQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGVsZW0sIHRydWUgKTtcbn07XG5cbnByb3RvLnVuYmluZFN0YXJ0RXZlbnQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGVsZW0sIGZhbHNlICk7XG59O1xuXG4vKipcbiAqIEFkZCBvciByZW1vdmUgc3RhcnQgZXZlbnRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNBZGQgLSByZW1vdmUgaWYgZmFsc2V5XG4gKi9cbnByb3RvLl9iaW5kU3RhcnRFdmVudCA9IGZ1bmN0aW9uKCBlbGVtLCBpc0FkZCApIHtcbiAgLy8gbXVuZ2UgaXNBZGQsIGRlZmF1bHQgdG8gdHJ1ZVxuICBpc0FkZCA9IGlzQWRkID09PSB1bmRlZmluZWQgPyB0cnVlIDogaXNBZGQ7XG4gIHZhciBiaW5kTWV0aG9kID0gaXNBZGQgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cbiAgLy8gZGVmYXVsdCB0byBtb3VzZSBldmVudHNcbiAgdmFyIHN0YXJ0RXZlbnQgPSAnbW91c2Vkb3duJztcbiAgaWYgKCB3aW5kb3cuUG9pbnRlckV2ZW50ICkge1xuICAgIC8vIFBvaW50ZXIgRXZlbnRzXG4gICAgc3RhcnRFdmVudCA9ICdwb2ludGVyZG93bic7XG4gIH0gZWxzZSBpZiAoICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyApIHtcbiAgICAvLyBUb3VjaCBFdmVudHMuIGlPUyBTYWZhcmlcbiAgICBzdGFydEV2ZW50ID0gJ3RvdWNoc3RhcnQnO1xuICB9XG4gIGVsZW1bIGJpbmRNZXRob2QgXSggc3RhcnRFdmVudCwgdGhpcyApO1xufTtcblxuLy8gdHJpZ2dlciBoYW5kbGVyIG1ldGhvZHMgZm9yIGV2ZW50c1xucHJvdG8uaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBtZXRob2QgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgaWYgKCB0aGlzWyBtZXRob2QgXSApIHtcbiAgICB0aGlzWyBtZXRob2QgXSggZXZlbnQgKTtcbiAgfVxufTtcblxuLy8gcmV0dXJucyB0aGUgdG91Y2ggdGhhdCB3ZSdyZSBrZWVwaW5nIHRyYWNrIG9mXG5wcm90by5nZXRUb3VjaCA9IGZ1bmN0aW9uKCB0b3VjaGVzICkge1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgdG91Y2hlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgdG91Y2ggPSB0b3VjaGVzW2ldO1xuICAgIGlmICggdG91Y2guaWRlbnRpZmllciA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgICAgcmV0dXJuIHRvdWNoO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0gc3RhcnQgZXZlbnQgLS0tLS0gLy9cblxucHJvdG8ub25tb3VzZWRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIC8vIGRpc21pc3MgY2xpY2tzIGZyb20gcmlnaHQgb3IgbWlkZGxlIGJ1dHRvbnNcbiAgdmFyIGJ1dHRvbiA9IGV2ZW50LmJ1dHRvbjtcbiAgaWYgKCBidXR0b24gJiYgKCBidXR0b24gIT09IDAgJiYgYnV0dG9uICE9PSAxICkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuX3BvaW50ZXJEb3duKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbnByb3RvLm9udG91Y2hzdGFydCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5fcG9pbnRlckRvd24oIGV2ZW50LCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSApO1xufTtcblxucHJvdG8ub25wb2ludGVyZG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5fcG9pbnRlckRvd24oIGV2ZW50LCBldmVudCApO1xufTtcblxuLyoqXG4gKiBwb2ludGVyIHN0YXJ0XG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5fcG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIGRpc21pc3MgcmlnaHQgY2xpY2sgYW5kIG90aGVyIHBvaW50ZXJzXG4gIC8vIGJ1dHRvbiA9IDAgaXMgb2theSwgMS00IG5vdFxuICBpZiAoIGV2ZW50LmJ1dHRvbiB8fCB0aGlzLmlzUG9pbnRlckRvd24gKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5pc1BvaW50ZXJEb3duID0gdHJ1ZTtcbiAgLy8gc2F2ZSBwb2ludGVyIGlkZW50aWZpZXIgdG8gbWF0Y2ggdXAgdG91Y2ggZXZlbnRzXG4gIHRoaXMucG9pbnRlcklkZW50aWZpZXIgPSBwb2ludGVyLnBvaW50ZXJJZCAhPT0gdW5kZWZpbmVkID9cbiAgICAvLyBwb2ludGVySWQgZm9yIHBvaW50ZXIgZXZlbnRzLCB0b3VjaC5pbmRlbnRpZmllciBmb3IgdG91Y2ggZXZlbnRzXG4gICAgcG9pbnRlci5wb2ludGVySWQgOiBwb2ludGVyLmlkZW50aWZpZXI7XG5cbiAgdGhpcy5wb2ludGVyRG93biggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLnBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLl9iaW5kUG9zdFN0YXJ0RXZlbnRzKCBldmVudCApO1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJEb3duJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyBoYXNoIG9mIGV2ZW50cyB0byBiZSBib3VuZCBhZnRlciBzdGFydCBldmVudFxudmFyIHBvc3RTdGFydEV2ZW50cyA9IHtcbiAgbW91c2Vkb3duOiBbICdtb3VzZW1vdmUnLCAnbW91c2V1cCcgXSxcbiAgdG91Y2hzdGFydDogWyAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJywgJ3RvdWNoY2FuY2VsJyBdLFxuICBwb2ludGVyZG93bjogWyAncG9pbnRlcm1vdmUnLCAncG9pbnRlcnVwJywgJ3BvaW50ZXJjYW5jZWwnIF0sXG59O1xuXG5wcm90by5fYmluZFBvc3RTdGFydEV2ZW50cyA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCAhZXZlbnQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGdldCBwcm9wZXIgZXZlbnRzIHRvIG1hdGNoIHN0YXJ0IGV2ZW50XG4gIHZhciBldmVudHMgPSBwb3N0U3RhcnRFdmVudHNbIGV2ZW50LnR5cGUgXTtcbiAgLy8gYmluZCBldmVudHMgdG8gbm9kZVxuICBldmVudHMuZm9yRWFjaCggZnVuY3Rpb24oIGV2ZW50TmFtZSApIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggZXZlbnROYW1lLCB0aGlzICk7XG4gIH0sIHRoaXMgKTtcbiAgLy8gc2F2ZSB0aGVzZSBhcmd1bWVudHNcbiAgdGhpcy5fYm91bmRQb2ludGVyRXZlbnRzID0gZXZlbnRzO1xufTtcblxucHJvdG8uX3VuYmluZFBvc3RTdGFydEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICAvLyBjaGVjayBmb3IgX2JvdW5kRXZlbnRzLCBpbiBjYXNlIGRyYWdFbmQgdHJpZ2dlcmVkIHR3aWNlIChvbGQgSUU4IGJ1ZylcbiAgaWYgKCAhdGhpcy5fYm91bmRQb2ludGVyRXZlbnRzICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHMuZm9yRWFjaCggZnVuY3Rpb24oIGV2ZW50TmFtZSApIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggZXZlbnROYW1lLCB0aGlzICk7XG4gIH0sIHRoaXMgKTtcblxuICBkZWxldGUgdGhpcy5fYm91bmRQb2ludGVyRXZlbnRzO1xufTtcblxuLy8gLS0tLS0gbW92ZSBldmVudCAtLS0tLSAvL1xuXG5wcm90by5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5fcG9pbnRlck1vdmUoIGV2ZW50LCBldmVudCApO1xufTtcblxucHJvdG8ub25wb2ludGVybW92ZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCBldmVudC5wb2ludGVySWQgPT0gdGhpcy5wb2ludGVySWRlbnRpZmllciApIHtcbiAgICB0aGlzLl9wb2ludGVyTW92ZSggZXZlbnQsIGV2ZW50ICk7XG4gIH1cbn07XG5cbnByb3RvLm9udG91Y2htb3ZlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgdG91Y2ggPSB0aGlzLmdldFRvdWNoKCBldmVudC5jaGFuZ2VkVG91Y2hlcyApO1xuICBpZiAoIHRvdWNoICkge1xuICAgIHRoaXMuX3BvaW50ZXJNb3ZlKCBldmVudCwgdG91Y2ggKTtcbiAgfVxufTtcblxuLyoqXG4gKiBwb2ludGVyIG1vdmVcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKiBAcHJpdmF0ZVxuICovXG5wcm90by5fcG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMucG9pbnRlck1vdmUoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG4vLyBwdWJsaWNcbnByb3RvLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJNb3ZlJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSBlbmQgZXZlbnQgLS0tLS0gLy9cblxuXG5wcm90by5vbm1vdXNldXAgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJVcCggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG5wcm90by5vbnBvaW50ZXJ1cCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCBldmVudC5wb2ludGVySWQgPT0gdGhpcy5wb2ludGVySWRlbnRpZmllciApIHtcbiAgICB0aGlzLl9wb2ludGVyVXAoIGV2ZW50LCBldmVudCApO1xuICB9XG59O1xuXG5wcm90by5vbnRvdWNoZW5kID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgdG91Y2ggPSB0aGlzLmdldFRvdWNoKCBldmVudC5jaGFuZ2VkVG91Y2hlcyApO1xuICBpZiAoIHRvdWNoICkge1xuICAgIHRoaXMuX3BvaW50ZXJVcCggZXZlbnQsIHRvdWNoICk7XG4gIH1cbn07XG5cbi8qKlxuICogcG9pbnRlciB1cFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqIEBwcml2YXRlXG4gKi9cbnByb3RvLl9wb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb25lKCk7XG4gIHRoaXMucG9pbnRlclVwKCBldmVudCwgcG9pbnRlciApO1xufTtcblxuLy8gcHVibGljXG5wcm90by5wb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlclVwJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSBwb2ludGVyIGRvbmUgLS0tLS0gLy9cblxuLy8gdHJpZ2dlcmVkIG9uIHBvaW50ZXIgdXAgJiBwb2ludGVyIGNhbmNlbFxucHJvdG8uX3BvaW50ZXJEb25lID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3BvaW50ZXJSZXNldCgpO1xuICB0aGlzLl91bmJpbmRQb3N0U3RhcnRFdmVudHMoKTtcbiAgdGhpcy5wb2ludGVyRG9uZSgpO1xufTtcblxucHJvdG8uX3BvaW50ZXJSZXNldCA9IGZ1bmN0aW9uKCkge1xuICAvLyByZXNldCBwcm9wZXJ0aWVzXG4gIHRoaXMuaXNQb2ludGVyRG93biA9IGZhbHNlO1xuICBkZWxldGUgdGhpcy5wb2ludGVySWRlbnRpZmllcjtcbn07XG5cbnByb3RvLnBvaW50ZXJEb25lID0gbm9vcDtcblxuLy8gLS0tLS0gcG9pbnRlciBjYW5jZWwgLS0tLS0gLy9cblxucHJvdG8ub25wb2ludGVyY2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIGV2ZW50LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgIHRoaXMuX3BvaW50ZXJDYW5jZWwoIGV2ZW50LCBldmVudCApO1xuICB9XG59O1xuXG5wcm90by5vbnRvdWNoY2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgdG91Y2ggPSB0aGlzLmdldFRvdWNoKCBldmVudC5jaGFuZ2VkVG91Y2hlcyApO1xuICBpZiAoIHRvdWNoICkge1xuICAgIHRoaXMuX3BvaW50ZXJDYW5jZWwoIGV2ZW50LCB0b3VjaCApO1xuICB9XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgY2FuY2VsXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICogQHByaXZhdGVcbiAqL1xucHJvdG8uX3BvaW50ZXJDYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb25lKCk7XG4gIHRoaXMucG9pbnRlckNhbmNlbCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIHB1YmxpY1xucHJvdG8ucG9pbnRlckNhbmNlbCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyQ2FuY2VsJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuLy8gdXRpbGl0eSBmdW5jdGlvbiBmb3IgZ2V0dGluZyB4L3kgY29vcmRzIGZyb20gZXZlbnRcblVuaXBvaW50ZXIuZ2V0UG9pbnRlclBvaW50ID0gZnVuY3Rpb24oIHBvaW50ZXIgKSB7XG4gIHJldHVybiB7XG4gICAgeDogcG9pbnRlci5wYWdlWCxcbiAgICB5OiBwb2ludGVyLnBhZ2VZXG4gIH07XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIFVuaXBvaW50ZXI7XG5cbn0pKTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgRmxpY2tpdHkgICAgICAgID0gcmVxdWlyZSgnZmxpY2tpdHknKSxcbiAgICBMYXp5TG9hZCAgIFx0IFx0ICAgID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9sYXp5bG9hZCcpLFxuICAgIENhcm91c2Vsc1xuXG4gICAgcmVxdWlyZSgnZmxpY2tpdHktaW1hZ2VzbG9hZGVkJylcblxuICAgIENhcm91c2VscyA9IHtcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIENhcm91c2Vscy5pbml0aWFsaXNlQ2Fyb3VzZWwoKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdGlhbGlzZUNhcm91c2VsICA6ICgpID0+IHtcblxuICAgICAgICAgICAgdmFyIGNhcm91c2VscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tY2Fyb3VzZWwnKVxuXG4gICAgICAgICAgICBjYXJvdXNlbHMuZm9yRWFjaChjYXJvdXNlbCA9PiB7IFxuXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlcyA9IGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tY2Fyb3VzZWxfX3NsaWRlV3JhcCcpXG5cbiAgICAgICAgICAgICAgICBpZihzbGlkZXMubGVuZ3RoID4gMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmbGt0eSA9IG5ldyBGbGlja2l0eShjYXJvdXNlbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEFsaWduICAgOiAnY2VudGVyJywgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBBcm91bmQgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9QbGF5ICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXNMb2FkZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlRG90cyAgICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhenlMb2FkOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2Fyb3VzZWwuY2xhc3NMaXN0LnJlbW92ZSgnSlMtLWNhcm91c2VsLS1oaWRkZW4nKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBDYXJvdXNlbHNcblxufSgpKVxuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBUb2dnbGVQcmljZVxuXG4gICAgVG9nZ2xlUHJpY2UgPSB7XG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1Ub2dnbGVQcmljZScpLFxuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgVG9nZ2xlUHJpY2UuY29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVG9nZ2xlUHJpY2UudG9nZ2xlKVxuICAgICAgICAgICAgY29uc29sZS5sb2coVG9nZ2xlUHJpY2UuY29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkKVxuICAgICAgICB9LFxuXG4gICAgICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgICAgICAgVG9nZ2xlUHJpY2UuY29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ3BsYW5Ub2dnbGUtLXNob3dNb250aGx5UHJpY2UnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBUb2dnbGVQcmljZVxuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCl7XG5cbiAgICAndXNlIHN0cmljdCdcblxuXHR2YXIgUGxvdCAgICBcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3QnKSwgIFxuXHRcdExhenlMb2FkICAgXHQgXHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbGF6eWxvYWQnKSxcblx0XHRNb2RhbHNcdFx0XHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbW9kYWxzJyksXG5cdFx0Q2Fyb3VzZWxzXHRcdD0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2Nhcm91c2VsJyksXG5cdFx0U21vb3RoIFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90LXNtb290aC1zY3JvbGwnKSxcblx0XHRGQVFzIFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9mYXFzJyksXG5cdFx0Ly8gQ3VzdG9tTW91c2UgXHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvY3VzdG9tLW1vdXNlJyksXG5cdFx0SG9tZVx0XHRcdD0gcmVxdWlyZSgnLi9wYWdlcy9ob21lJyksXG5cdFx0VG9nZ2xlUHJpY2UgICAgID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RvZ2dsZS1wcmljZScpLFxuXHRcdEFydGlzdHNcdFx0XHQ9IHJlcXVpcmUoJy4vcGFnZXMvYXJ0aXN0cycpLFxuXHRcdFNjaGVkdWxlXHRcdD0gcmVxdWlyZSgnLi9wYWdlcy9zY2hlZHVsZScpLFxuXHRcdE5ld3MgXHRcdFx0PSByZXF1aXJlKCcuL3BhZ2VzL25ld3MnKSxcblx0ICAgIE1haW5cblxuXHRNYWluID0ge1xuXG5cdFx0aW5pdDogKCkgPT4ge1x0XG5cblx0XHRcdE1haW4uaW5pdGFsaXplU21vb3RoKClcblxuXHRcdFx0UGxvdC5pbml0KCkgXG5cdFx0XHRMYXp5TG9hZC5pbml0KClcblx0XHRcdE1vZGFscy5pbml0KCkgIFxuXHRcdFx0Q2Fyb3VzZWxzLmluaXQoKVxuXHRcdFx0RkFRcy5pbml0KClcblx0XHRcdC8vIEN1c3RvbU1vdXNlLmluaXQoe1xuXHRcdFx0Ly8gXHQnYScgXHRcdFx0XHQ6ICdhbmNob3JIb3ZlcicsXG5cdFx0XHQvLyBcdCcuYWx0SG92ZXJUYXJnZXQnXHQ6ICdhbHRIb3Zlcidcblx0XHRcdC8vIH0pXG5cblx0XHRcdC8vUGFnZXNcbiAgICAgICAgXHRpZihQbG90LmlzUGFnZSgnaG9tZScpKVxuXHRcdFx0XHRIb21lLmluaXQoKVxuXG4gICAgICAgIFx0aWYoUGxvdC5pc1BhZ2UoJ3NjaGVkdWxlJykpXG5cdFx0XHRcdFNjaGVkdWxlLmluaXQoKVxuXG4gICAgICAgIFx0aWYoUGxvdC5pc1BhZ2UoJ2FydGlzdHMnKSlcblx0XHRcdFx0QXJ0aXN0cy5pbml0KClcblxuXHRcdFx0aWYoUGxvdC5pc1BhZ2UoJ3ByaWNpbmcnKSlcblx0XHRcdFx0VG9nZ2xlUHJpY2UuaW5pdCgpXG5cblx0XHRcdE5ld3MuaW5pdCgpXG5cdFx0XHRcblx0XHRcdE1haW4uZGVtb0FqYXhCdXR0b24oKSBcblxuXHRcdH0sXG5cdFx0XG5cdFx0aW5pdGFsaXplU21vb3RoIDogKCkgPT4ge1xuXG4gICAgICAgIFx0Y29uc3QgaGFzU21vb3RoU2Nyb2xsID0gZG9jdW1lbnQuYm9keS5kYXRhc2V0LnBsb3RDdXN0b21pemVyU21vb3RoU2Nyb2xsXG5cbiAgICAgICAgXHRjb25zdCBzbW9vdGhTZXR0aW5ncyA9IHtcblx0XHRcdFx0c3RhbmRhcmRTY3JvbGwgIDogaGFzU21vb3RoU2Nyb2xsICE9ICd5ZXMnXG5cdFx0XHR9XG5cbiAgICAgICAgXHRTbW9vdGguaW5pdChzbW9vdGhTZXR0aW5ncylcblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlbW9BamF4QnV0dG9uIDogKCkgPT4ge1xuXG5cdFx0XHR2YXIgcGxvdERlbW9Mb2FkQ29udGVudCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RMb2FkVGVtcGxhdGVQYXJ0RGVtbycpO1xuXHRcdFx0XG5cblx0XHRcdGlmKHBsb3REZW1vTG9hZENvbnRlbnQpXG5cblx0XHRcdFx0cGxvdERlbW9Mb2FkQ29udGVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG5cdFx0XHRcdFx0Ly8gVGFrZSBhIGxvb2sgYXQgd2hhdCB5b3UgY2FuIHBhc3MgdG8gdGhpcyBmdW5jdGlvblxuXHRcdFx0XHRcdC8vIHZhciBhcmdzID0ge1xuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIHRlbXBsYXRlUGFydCAgICA6IG51bGwsXG5cdFx0XHRcdCAgICAvLyAgICAgICAgICAgICAgYWN0aW9uICAgICAgICAgIDogJ3Bsb3RMb2FkVGVtcGxhdGVQYXJ0JywgLy9UaGlzIGlzIHRoZSBhY3Rpb24gZmlyZWQgaW50byBvdXIgUGxvdFNpdGUgUEhQIHNldHVwLnBocCBmaWxlXG5cdFx0XHRcdCAgICAvLyAgICAgICAgICAgICAgZGF0YSAgICAgICAgICAgIDoge30sIC8vQW55IGRhdGEgd2UnZCBsaWtlIHRvIHBhc3MgdG8gdGhlIHRlbXBsYXRlIHBhcnQuIFxuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGNvbnRlbnRBcmVhICAgICA6ICcuSlMtLWFqYXhUYXJnZXRBcmVhJywgLy9XaGVyZSB0aGUgbmV3IGNvbnRlbnQgZ2V0cyBpbnNlcnRzXG5cdFx0XHRcdCAgICAvLyAgICAgICAgICAgICAgYXBwZW5kICAgICAgICAgIDogZmFsc2UgLy9JZiB3ZSB3YW50IHRvIGFwcGVuZCB0byB0aGUgYWJvdmUgYXJlYSwgb3IgcmVwbGFjZSB0aGUgY29udGVudFxuXHRcdFx0XHQgICAgLy8gICAgICAgICAgfVxuXG5cdFx0XHRcdFx0Y29uc3QgYXJncyA9IHtcblxuXHRcdFx0XHRcdFx0dGVtcGxhdGVQYXJ0IDogJ2RlbW9zL2FqYXgtY29udGVudCcsIFxuXHRcdFx0XHRcdFx0ZGF0YSA6IHtcblx0XHRcdFx0XHRcdFx0J2ZvbycgXHRcdDogJ2JhcicsXG5cdFx0XHRcdFx0XHRcdCdiYW5nZXJzJ1x0OiAnbWFzaCcsXG5cdFx0XHRcdFx0XHRcdCdoYXZpbmcnXHQ6ICdpdCdcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblxuXHRcdFx0XHRcdFBsb3QubG9hZFRlbXBsYXRlUGFydChhcmdzKVxuXG5cdFx0XHRcdH0pXG5cbiAgICAgICAgfVxuXG5cdH1cblxuXHR3aW5kb3cuTWFpbiA9IE1haW5cblxufSgpKTtcbiAiLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFBsb3QgXHRcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3QnKSxcbiAgICAgICAgTW9kYWxzICAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9tb2RhbHMnKSxcbiAgICBcdEFydGlzdHNcblxuICAgIC8vTWF5IHRoaXMgb2JqZWN0IGFjdCBhcyBhIGd1aWRlIHRvIHVzaW5nIFBsb3QgY29yZSBmdW5jdGlvbnNcbiAgICAvL2FuZCBob3cgdG8gc2V0IHVwIGFqYXggZHluYW1pYyBkYXRhIHdpdGggb3VyIG5ldyBwcmluY2lwbGVzIHdpdGggZWFzZVxuICAgIEFydGlzdHMgPSB7XG5cbiAgICBcdG1heFBhZ2VzIFx0XHRcdDogMSxcbiAgICBcdGN1cnJlbnRQYWdlIFx0XHQ6IDEsXG4gICAgXHRjdXJyZW50QXJ0aXN0VHlwZVx0OiBmYWxzZSxcbiAgICBcdGxvYWRNb3JlQnV0dG9uICBcdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1hcnRpc3RzTG9hZE1vcmUnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgXHRBcnRpc3RzLnNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbigpXG5cbiAgICAgICAgICAgIEFydGlzdHMuY3JlYXRlTGlzdGVuZXJzKClcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUxpc3RlbmVyczogKCkgPT4ge1xuXG4gICAgICAgIFx0QXJ0aXN0cy5sb2FkTW9yZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG4gICAgICAgIFx0XHRjb25zdCBuZXh0UGFnZSA9IHBhcnNlSW50KEFydGlzdHMubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSlcblxuICAgICAgICBcdFx0QXJ0aXN0cy5jdXJyZW50UGFnZSA9IG5leHRQYWdlXG5cbiAgICAgICAgXHRcdEFydGlzdHMubG9hZEFydGlzdHModHJ1ZSlcblxuICAgICAgICBcdFx0QXJ0aXN0cy5sb2FkTW9yZUJ1dHRvbi5kYXRhc2V0Lm5leHRQYWdlID0gbmV4dFBhZ2UgKyAxXG5cbiAgICAgICAgXHR9KVxuXG4gICAgICAgIFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblxuICAgICAgICAgICAgICAgIC8vSGF2ZSB3ZSBjbGlja2VkIG9uIGFuIGFydGlzdCB0eXBlIGZpbHRlciBidXR0b24/XG5cdFx0XHRcdGlmIChlLnRhcmdldC5jbG9zZXN0KCcuSlMtLWFydGlzdFR5cGVCdXR0b24nKSkge1xuXHRcdFx0XHRcdEFydGlzdHMuY3VycmVudEFydGlzdFR5cGUgPSBlLnRhcmdldC5kYXRhc2V0LmFydGlzdFR5cGVJZFxuXHRcdFx0XHRcdEFydGlzdHMuY3VycmVudFBhZ2UgPSAxXG4gICAgICAgICAgICAgICAgICAgIEFydGlzdHMubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSA9IDJcblx0XHRcdFx0XHRBcnRpc3RzLmxvYWRBcnRpc3RzKGZhbHNlKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1hcnRpc3RUeXBlQnV0dG9uJykuZm9yRWFjaChhcnRpc3RUeXBlQnV0dG9uID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFydGlzdFR5cGVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSlcblx0XHRcdFx0fSBcblxuXHRcdFx0fSwgZmFsc2UpXG5cblxuICAgICAgICB9LFxuXG4gICAgICAgIGxvYWRBcnRpc3RzIDogYXBwZW5kID0+IHtcblxuICAgICAgICBcdGNvbnN0IGFyZ3MgPSB7XG5cdFx0XHRcdHRlbXBsYXRlUGFydCA6ICdwYXJ0cy9hcnRpc3QtbGlzdGluZycsIFxuXHRcdFx0XHRkYXRhIDoge1xuXHRcdFx0XHRcdCdwYWdlJyBcdFx0XHQ6IEFydGlzdHMuY3VycmVudFBhZ2UsXG5cdFx0XHRcdFx0J2FydGlzdFR5cGUnXHQ6IEFydGlzdHMuY3VycmVudEFydGlzdFR5cGVcblx0XHRcdFx0fSxcblx0XHRcdFx0YXBwZW5kIDogYXBwZW5kIFxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gUGxvdC5sb2FkVGVtcGxhdGVQYXJ0KGFyZ3MpLnRoZW4oaHRtbCA9PiB7XG5cblx0XHRcdFx0QXJ0aXN0cy5zaG93T3JIaWRlTG9hZE1vcmVCdXR0b24oKVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuXHRcdFx0fSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbiA6ICgpID0+IHtcblxuICAgICAgICBcdC8vQ2hlY2sgaWYgbWF4IHBhZ2VzIGlzIDEuIElmIGl0IGlzLCB0aGVyZSdzIG9ubHkgMSBwYWdlIG9mIGFydGlzdHNcbiAgICAgICAgXHQvL3NvIHdlIGNhbiBoaWRlIGxvYWQgbW9yZSBidXR0b25cbiAgICAgICAgXHRBcnRpc3RzLm1heFBhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1tYXhQYWdlcycpLmRhdGFzZXQubWF4UGFnZXNcblxuICAgICAgICBcdGlmKEFydGlzdHMubWF4UGFnZXMgPiBBcnRpc3RzLmN1cnJlbnRQYWdlKVxuICAgICAgICBcdFx0QXJ0aXN0cy5sb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICBcdGVsc2UgXG4gICAgICAgIFx0XHRBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBBcnRpc3RzXG5cbn0oKSkiLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIEhvbWVcblxuICAgIEhvbWUgPSB7XG4gICAgICAgIGludGVydmFsTGVuZ3RoOiAzMDAwLFxuICAgICAgICB0aGVtZXM6IFtcbiAgICAgICAgICAgICdhcnRzJyxcbiAgICAgICAgICAgICdzb3VuZHMnLFxuICAgICAgICAgICAgJ3VyYmFuJyxcbiAgICAgICAgICAgICdwdXJwbGUnXG4gICAgICAgIF0sXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgICBIb21lLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICAgICAgLy8gT2JzZXJ2ZSB0aGUgaG9tZWJhbm5lciBzZWN0aW9uXG4gICAgICAgICAgICBjb25zdCBob21lQmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVCYW5uZXInKVxuXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKEhvbWUuYmFubmVySW5WaWV3KVxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShob21lQmFubmVyLCB7XG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXMgIDogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBiYW5uZXJJblZpZXc6IChtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiB0aGUgYmFubmVyIGVsZW1lbnQgaXMgaW4gdmlld1xuICAgICAgICAgICAgaWYobXV0YXRpb25zTGlzdFswXS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbG90U21vb3RoU2Nyb2xsSW5WaWV3JykpIHtcbiAgICAgICAgICAgICAgICBIb21lLnN0YXJ0VGhlbWVDb3VudGVyKClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgSG9tZS5zdG9wVGhlbWVDb3VudGVyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgLy8gSWYgYmFubmVyIGlzIG91dCBvZiB2aWV3XG4gICAgICAgICAgICAgICAgLy8gQ2FuY2VsIGludGVydmFsXG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RhcnRUaGVtZUNvdW50ZXI6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIENoYW5nZSB0aGUgY2xhc3Mgb24gdGhlIGJvZHkgZWxlbWVudFxuICAgICAgICAgICAgLy8gcmVtb3ZlIHByZXZpb3VzIGNsYXNzXG4gICAgICAgICAgICAvLyBJZiB3ZSByZWFjaCB0aGUgZW5kIG9mIHRoZSB0aGVtZSwgc3RhcnQgYXQgdGhlIGJlZ2dpbmcgYWdhaW5cbiAgICAgICAgICAgIGxldCBpID0gMFxuICAgICAgICAgICAgSG9tZS5jb3VudGVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoSG9tZS5wcmV2aW91c1RoZW1lKVxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoSG9tZS5wcmV2aW91c1RoZW1lKVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKGBob21lQmFubmVyVGhlbWUtLSR7SG9tZS50aGVtZXNbaV19YClcblxuICAgICAgICAgICAgICAgIEhvbWUucHJldmlvdXNUaGVtZSA9IGBob21lQmFubmVyVGhlbWUtLSR7SG9tZS50aGVtZXNbaV19YFxuXG4gICAgICAgICAgICAgICAgaWYoaSA+PSBIb21lLnRoZW1lcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSAwXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzdG9wVGhlbWVDb3VudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBpZihIb21lLmNvdW50ZXIpXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChIb21lLmNvdW50ZXIpXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gSG9tZVxuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBQbG90IFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90JyksXG4gICAgXHROZXdzXG5cbiAgICAvL01heSB0aGlzIG9iamVjdCBhY3QgYXMgYSBndWlkZSB0byB1c2luZyBQbG90IGNvcmUgZnVuY3Rpb25zXG4gICAgLy9hbmQgaG93IHRvIHNldCB1cCBhamF4IGR5bmFtaWMgZGF0YSB3aXRoIG91ciBuZXcgcHJpbmNpcGxlcyB3aXRoIGVhc2VcbiAgICBOZXdzID0ge1xuXG4gICAgXHRtYXhQYWdlcyBcdFx0XHQ6IDEsXG4gICAgICAgIGN1cnJlbnROZXdzQ2F0ZWdvcnkgOiAwLFxuICAgICAgICBjdXJyZW50UGFnZSAgICAgICAgIDogMSxcbiAgICBcdGxvYWRNb3JlQnV0dG9uICBcdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1uZXdzTG9hZE1vcmUnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKE5ld3MubG9hZE1vcmVCdXR0b24pIHtcblxuICAgICAgICAgICAgXHROZXdzLnNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbigpXG5cbiAgICAgICAgICAgICAgICBOZXdzLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUxpc3RlbmVyczogKCkgPT4ge1xuXG4gICAgICAgIFx0TmV3cy5sb2FkTW9yZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG4gICAgICAgIFx0XHRjb25zdCBuZXh0UGFnZSA9IHBhcnNlSW50KE5ld3MubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSlcblxuICAgICAgICBcdFx0TmV3cy5jdXJyZW50UGFnZSA9IG5leHRQYWdlXG5cbiAgICAgICAgXHRcdE5ld3MubG9hZE5ld3ModHJ1ZSlcblxuICAgICAgICBcdFx0TmV3cy5sb2FkTW9yZUJ1dHRvbi5kYXRhc2V0Lm5leHRQYWdlID0gbmV4dFBhZ2UgKyAxXG5cbiAgICAgICAgXHR9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZE5ld3MgOiBhcHBlbmQgPT4ge1xuXG4gICAgICAgIFx0Y29uc3QgYXJncyA9IHtcblx0XHRcdFx0dGVtcGxhdGVQYXJ0IDogJ3BhcnRzL25ld3MtbGlzdGluZycsIFxuXHRcdFx0XHRkYXRhIDoge1xuXHRcdFx0XHRcdCdwYWdlJyBcdFx0XHQ6IE5ld3MuY3VycmVudFBhZ2UsXG5cdFx0XHRcdFx0J2FydGlzdFR5cGUnXHQ6IE5ld3MuY3VycmVudE5ld3NDYXRlZ29yeVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBlbmQgOiBhcHBlbmQgXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncykudGhlbihodG1sID0+IHtcblxuXHRcdFx0XHROZXdzLnNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbigpXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cdFx0XHR9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uIDogKCkgPT4ge1xuXG4gICAgICAgIFx0Ly9DaGVjayBpZiBtYXggcGFnZXMgaXMgMS4gSWYgaXQgaXMsIHRoZXJlJ3Mgb25seSAxIHBhZ2Ugb2YgTmV3c1xuICAgICAgICBcdC8vc28gd2UgY2FuIGhpZGUgbG9hZCBtb3JlIGJ1dHRvblxuICAgICAgICBcdE5ld3MubWF4UGFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLW1heFBhZ2VzJykuZGF0YXNldC5tYXhQYWdlc1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhOZXdzLm1heFBhZ2VzKVxuXG4gICAgICAgIFx0aWYoTmV3cy5tYXhQYWdlcyA+IE5ld3MuY3VycmVudFBhZ2UpXG4gICAgICAgIFx0XHROZXdzLmxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIFx0ZWxzZSBcbiAgICAgICAgXHRcdE5ld3MubG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IE5ld3NcblxufSgpKSIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgU2NoZWR1bGVcblxuICAgIFNjaGVkdWxlID0ge1xuICAgICAgZGF5QnV0dG9ucyAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tc2NoZWR1bGVEYXlQaWNrZXJCdXR0b24nKSxcbiAgICAgIGNhbGVuZGFycyAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NoZWR1bGVDYWxlbmRhcldyYXAnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICBTY2hlZHVsZS5jcmVhdGVMaXN0ZW5lcnMoKVxuICAgICAgICAgIFNjaGVkdWxlLmNoZWNrVG9TZWVJZk5hdkFycm93c05lZWRlZCgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICAgIGZvcih2YXIgZGF5QnV0dG9uIG9mIFNjaGVkdWxlLmRheUJ1dHRvbnMpIHtcblxuICAgICAgICAgICAgZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICBTY2hlZHVsZS5sb2FkTmV3RGF0ZSh0aGlzKSBcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsKCkgPT4ge1xuXG4gICAgICAgICAgICBTY2hlZHVsZS5jaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQoKVxuXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGZvcih2YXIgY2FsZW5kYXIgb2YgU2NoZWR1bGUuY2FsZW5kYXJzKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0QnV0dG9uICAgICAgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlUmlnaHQnKSxcbiAgICAgICAgICAgIGxlZnRCdXR0b24gICAgICAgICAgICAgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlTGVmdCcpLFxuICAgICAgICAgICAgdHJhY2tzICAgICAgICAgICAgICAgICA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5zY2hlZHVsZUNhbGVuZGFyVHJhY2tzJyksXG4gICAgICAgICAgICB0cmFja3NXICAgICAgICAgICAgICAgID0gdHJhY2tzLm9mZnNldFdpZHRoXG5cbiAgICAgICAgICAgIHJpZ2h0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICB0cmFja3Muc2Nyb2xsQnkoe1xuICAgICAgICAgICAgICAgIGxlZnQ6IHRyYWNrc1cgLyAyLFxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGVmdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgdHJhY2tzLnNjcm9sbEJ5KHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAtdHJhY2tzVyAvIDIsXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkTmV3RGF0ZSA6IGVsZW0gPT4ge1xuXG4gICAgICAgICAgZm9yKHZhciBkQiBvZiBTY2hlZHVsZS5kYXlCdXR0b25zKSB7XG4gICAgICAgICAgICBkQi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG5cbiAgICAgICAgICBsZXQgZGF5ID0gZWxlbS5kYXRhc2V0LnNjaGVkdWxlRGF5IFxuXG4gICAgICAgICAgZm9yKHZhciBjYWxlbmRhciBvZiBTY2hlZHVsZS5jYWxlbmRhcnMpIHtcblxuICAgICAgICAgICAgaWYoY2FsZW5kYXIuZGF0YXNldC5zY2hlZHVsZURheSA9PSBkYXkpXG4gICAgICAgICAgICAgIGNhbGVuZGFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgICAgICBlbHNlIFxuICAgICAgICAgICAgICBjYWxlbmRhci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIFNjaGVkdWxlLmNoZWNrVG9TZWVJZk5hdkFycm93c05lZWRlZCgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQgOiAoKSA9PiB7IFxuXG4gICAgICAgICAgZm9yKHZhciBjYWxlbmRhciBvZiBTY2hlZHVsZS5jYWxlbmRhcnMpIHtcblxuICAgICAgICAgICAgaWYoIWNhbGVuZGFyLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcblxuICAgICAgICAgICAgICAgY29uc3QgdHJhY2tzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLnNjaGVkdWxlQ2FsZW5kYXJUcmFja3MnKVxuXG4gICAgICAgICAgICAgICBpZih0cmFja3Muc2Nyb2xsV2lkdGggPiBjYWxlbmRhci5zY3JvbGxXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZUxlZnQnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZVJpZ2h0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlTGVmdCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlUmlnaHQnKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTY2hlZHVsZVxuXG59KCkpXG5cbiJdfQ==
