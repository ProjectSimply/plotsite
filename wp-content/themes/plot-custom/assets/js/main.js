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
  var RollerText;
  RollerText = {
    phrases: ['multi-day', 'rock', 'weekend', 'boutique', 'country', 'holiday', 'city', 'dance', 'family', 'metal', 'jazz', 'weird', 'special', 'classical', 'winter'],
    dom: {
      textWrap: document.querySelector('.rollerText'),
      current: document.querySelector('[data-text-current]'),
      next: document.querySelector('[data-text-next]')
    },
    intervalLength: 1500,
    nextPhrase: 'winter',
    counter: null,
    ticker: false,
    init: function init() {
      if (RollerText.dom.textWrap) RollerText.startcounter();
    },
    startcounter: function startcounter() {
      RollerText.setWidth(RollerText.dom.current);
      var i = 1;
      RollerText.counter = setInterval(function () {
        var currentPhrase = RollerText.phrases[i];
        var nextPhrase = RollerText.phrases[i + 1] ? RollerText.phrases[i + 1] : RollerText.phrases[0];
        RollerText.dom.textWrap.classList.add('turn');
        RollerText.setWidth(RollerText.dom.next);
        setTimeout(function () {
          RollerText.dom.textWrap.classList.remove('turn'); // Update mobile screen image

          RollerText.dom.current.textContent = currentPhrase;
          RollerText.dom.next.textContent = nextPhrase;
        }, 1000); // If we reach the end of the themes, reset to first theme

        i >= RollerText.phrases.length - 1 ? i = 0 : i++;
      }, RollerText.intervalLength);
    },
    setWidth: function setWidth(element) {
      var textWidth = element.getBoundingClientRect().width;
      RollerText.dom.textWrap.style.width = "".concat(textWidth, "px");
    }
  };
  module.exports = RollerText;
})();

},{}],29:[function(require,module,exports){
"use strict";

(function () {
  var TogglePrice;
  TogglePrice = {
    dom: {
      container: document.querySelector('.JS--TogglePrice'),
      annualButton: document.querySelector('.JS--planToggle--annual'),
      monthlyButton: document.querySelector('.JS--planToggle--monthly')
    },
    init: function init() {
      // Update data set with 
      TogglePrice.dom.annualButton.addEventListener('click', TogglePrice.showAnnual);
      console.log(TogglePrice.dom);
      TogglePrice.dom.monthlyButton.addEventListener('click', TogglePrice.showMonthly);
    },
    showAnnual: function showAnnual() {
      if (TogglePrice.dom.container.dataset.plan = "annual") return;
      TogglePrice.dom.container.dataset.plan = "annaul";
    },
    showMonthly: function showMonthly() {
      if (TogglePrice.dom.container.dataset.plan = "monthly") return;
      TogglePrice.dom.container.dataset.plan = "monthly";
    }
  };
  module.exports = TogglePrice;
})();

},{}],30:[function(require,module,exports){
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
      RollerText = require('./components/roller-text'),
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
      FAQs.init();
      RollerText.init(); // CustomMouse.init({
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

},{"../../../plot-core/src/js/faqs":2,"../../../plot-core/src/js/lazyload":3,"../../../plot-core/src/js/modals":4,"../../../plot-core/src/js/plot":6,"../../../plot-core/src/js/plot-smooth-scroll":5,"./components/carousel":27,"./components/roller-text":28,"./components/toggle-price":29,"./pages/artists":31,"./pages/home":32,"./pages/news":33,"./pages/schedule":34}],31:[function(require,module,exports){
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

},{"../../../../plot-core/src/js/modals":4,"../../../../plot-core/src/js/plot":6}],32:[function(require,module,exports){
"use strict";

(function () {
  var Home;
  Home = {
    dom: {
      body: document.body,
      root: document.querySelector('html'),
      phone: document.querySelector('.mobile3D__phone'),
      homeBanner: document.querySelector('.homeBanner'),
      header: document.querySelector('#siteMainHeader'),
      colourShapes: {
        1: document.querySelector('.colourShape--1'),
        2: document.querySelector('.colourShape--2'),
        3: document.querySelector('.colourShape--3'),
        4: document.querySelector('.colourShape--4'),
        5: document.querySelector('.colourShape--5'),
        6: document.querySelector('.colourShape--6')
      }
    },
    intervalLength: 5000,
    previousTheme: 'none',
    counter: null,
    ticker: false,
    currentMousePosition: {
      X: window.innerWidth / 2,
      Y: window.innerHeight / 2
    },
    previousMousePosition: {
      X: window.innerWidth / 2,
      Y: window.innerHeight / 2
    },
    mouseMoveAnimationFrame: null,
    themes: ['sounds', 'urban', 'tagout', 'box', 'inter', 'halftone', 'deep', 'arts'],
    init: function init() {
      Home.createListeners();
      Home.startThemeCounter();
      Home.setWidthOfPhone();
    },
    createListeners: function createListeners() {
      var homeBanner = document.querySelector('.homeBanner'); // Observe the homebanner section for class changes

      var observer = new MutationObserver(Home.bannerMutation);
      observer.observe(homeBanner, {
        attributes: true
      });
      var burgerMenuTriggers = document.querySelector('.JS--menuTrigger'); // Toggle banner animation when menu opened/closed

      burgerMenuTriggers.addEventListener('click', Home.toggleThemeCounter);
      window.addEventListener('resize', Home.setWidthOfPhone);

      if (window.innerWidth < 640) {
        Home.dom.body.classList.add('smallScreen');
      } else {
        Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove);
        Home.dom.homeBanner.addEventListener('mousemove', function (e) {
          return Home.trackCursorPosition(e);
        });
      }
    },
    setWidthOfPhone: function setWidthOfPhone() {
      Home.dom.phone.style.width = Home.dom.phone.getBoundingClientRect().height * .55 + 'px';
    },
    bannerMutation: function bannerMutation(mutationsList, observer) {
      // If the banner element is in view
      if (mutationsList[0].target.classList.contains('plotSmoothScrollFrameInView') && !Home.bannerInView) {
        Home.bannerInView = true;
        Home.startThemeCounter();
      }

      if (!mutationsList[0].target.classList.contains('plotSmoothScrollFrameInView') && Home.bannerInView) {
        Home.bannerInView = false;
        Home.stopThemeCounter();
        Home.removeTheme();
      }
    },
    trackCursorPosition: function trackCursorPosition(e) {
      Home.currentMousePosition = {
        X: e.clientX,
        Y: e.clientY
      };
      var middlePointX = window.innerWidth / 2;
      var middlePointY = window.innerHeight / 2;
      if (Home.currentMousePosition.X - 2000 > middlePointX) Home.currentMousePosition.X = middlePointX + 2000;
      if (Home.currentMousePosition.X + 2000 < middlePointX) Home.currentMousePosition.X = middlePointX - 2000;
      if (Home.currentMousePosition.Y - 2000 > middlePointY) Home.currentMousePosition.Y = middlePointY + 2000;
      if (Home.currentMousePosition.Y + 2000 < middlePointY) Home.currentMousePosition.Y = middlePointY - 2000;

      if (Home.ticker == false) {
        Home.ticker = true;
        Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove);
      }
    },
    startThemeCounter: function startThemeCounter() {
      Home.bannerInView = true; // Set header to default style

      if (Home.dom.header.classList.contains('defaultHeader')) Home.dom.header.classList.remove('defaultHeader');
      var i = 0;
      Home.counter = setInterval(function () {
        Home.dom.body.classList.remove('showFloaters');
        setTimeout(function () {
          Home.dom.body.classList.add('showFloaters');
        }, 100); // Update mobile screen image

        Home.dom.body.dataset.currentTheme = Home.themes[i];
        Home.dom.body.dataset.previousTheme = Home.previousTheme; // Update state

        Home.previousTheme = Home.themes[i];
        Home.dom.body.classList.add('slideMobileScreen');
        setTimeout(function () {
          Home.dom.body.classList.remove('slideMobileScreen');
        }, 2000); // If we reach the end of the themes, reset to first theme

        i >= Home.themes.length - 1 ? i = 0 : i++;
      }, 7000);
    },
    stopThemeCounter: function stopThemeCounter() {
      if (Home.counter) clearInterval(Home.counter);
    },
    removeTheme: function removeTheme() {
      if (Home.previousTheme) Home.dom.body.classList.remove(Home.previousTheme);
      Home.previousTheme = ''; // Set header to default style

      Home.dom.header.classList.add('defaultHeader');
    },
    toggleThemeCounter: function toggleThemeCounter() {
      // Cancel animation if menu is open
      if (Home.dom.root.classList.contains('burgerOpen')) {
        Home.stopThemeCounter();
        Home.removeTheme(); // Start animation if menu is closed and banner is in view    
      } else if (Home.bannerInView) {
        Home.startThemeCounter();
      }
    },
    runMouseMove: function runMouseMove() {
      var differenceOfPositions = {
        Y: Home.currentMousePosition.Y - Home.previousMousePosition.Y,
        X: Home.currentMousePosition.X - Home.previousMousePosition.X
      };
      Home.previousMousePosition = {
        X: Home.previousMousePosition.X + differenceOfPositions.X * 0.1,
        Y: Home.previousMousePosition.Y + differenceOfPositions.Y * 0.1
      };
      var xShift = (Home.previousMousePosition.X - window.innerWidth / 2) / (window.innerWidth / 2);
      var yShift = (window.innerHeight / 2 - Home.previousMousePosition.Y) / (window.innerHeight / 2);
      Home.dom.phone.style.transform = "rotateX(".concat(15 + yShift * 7, "deg) rotateY(").concat(xShift * 60 > 50 ? 50 : xShift * 60, "deg)");
      var multiplier = 10;
      Home.dom.colourShapes[1].style.transform = "translateX(".concat(xShift * multiplier * 5, "px) translateY(").concat(-5 * yShift * multiplier, "px) translateZ(5rem)");
      Home.dom.colourShapes[2].style.transform = "translateX(".concat(xShift * multiplier * 3, "px) translateY(").concat(-3 * yShift * multiplier, "px) translateZ(5rem)");
      Home.dom.colourShapes[3].style.transform = "translateX(".concat(xShift * multiplier * 9, "px) translateY(").concat(-9 * yShift * multiplier, "px) translateZ(5rem)");
      Home.dom.colourShapes[4].style.transform = "translateX(".concat(xShift * multiplier * 2, "px) translateY(").concat(-2 * yShift * multiplier, "px) translateZ(5rem)");
      Home.dom.colourShapes[5].style.transform = "translateX(".concat(xShift * multiplier * 4, "px) translateY(").concat(-4 * yShift * multiplier, "px) translateZ(5rem)");
      Home.dom.colourShapes[6].style.transform = "translateX(".concat(xShift * multiplier * 7, "px) translateY(").concat(-7 * yShift * multiplier, "px) translateZ(5rem)");
      if (Math.abs(differenceOfPositions.X + differenceOfPositions.Y) < .1) Home.ticker = false;
      if (Home.ticker == true) Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove);
    }
  };
  module.exports = Home;
})();

},{}],33:[function(require,module,exports){
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

},{"../../../../plot-core/src/js/plot":6}],34:[function(require,module,exports){
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

},{}]},{},[30])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2JvZHktc2Nyb2xsLWxvY2svbGliL2JvZHlTY3JvbGxMb2NrLm1pbi5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvZmFxcy5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvbGF6eWxvYWQuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL21vZGFscy5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvcGxvdC1zbW9vdGgtc2Nyb2xsLmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90LmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9zeW5jc2Nyb2xsLmpzIiwibm9kZV9tb2R1bGVzL2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9ldi1lbWl0dGVyL2V2LWVtaXR0ZXIuanMiLCJub2RlX21vZHVsZXMvZml6enktdWktdXRpbHMvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHktaW1hZ2VzbG9hZGVkL2ZsaWNraXR5LWltYWdlc2xvYWRlZC5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9hZGQtcmVtb3ZlLWNlbGwuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvYW5pbWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9jZWxsLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2RyYWcuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvZmxpY2tpdHkuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvbGF6eWxvYWQuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvcGFnZS1kb3RzLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL3BsYXllci5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9wcmV2LW5leHQtYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL3NsaWRlLmpzIiwibm9kZV9tb2R1bGVzL2dldC1zaXplL2dldC1zaXplLmpzIiwibm9kZV9tb2R1bGVzL2ltYWdlc2xvYWRlZC9pbWFnZXNsb2FkZWQuanMiLCJub2RlX21vZHVsZXMvdW5pZHJhZ2dlci91bmlkcmFnZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3VuaXBvaW50ZXIvdW5pcG9pbnRlci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvcm9sbGVyLXRleHQuanMiLCJzcmMvanMvY29tcG9uZW50cy90b2dnbGUtcHJpY2UuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYWdlcy9hcnRpc3RzLmpzIiwic3JjL2pzL3BhZ2VzL2hvbWUuanMiLCJzcmMvanMvcGFnZXMvbmV3cy5qcyIsInNyYy9qcy9wYWdlcy9zY2hlZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7Ozs7QUNEQyxhQUFZO0FBRVQsTUFBSSxJQUFKO0FBRUEsRUFBQSxJQUFJLEdBQUc7QUFDSCxJQUFBLFFBQVEsRUFBRSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FEUDtBQUdILElBQUEsSUFBSSxFQUFFLGdCQUFNO0FBRVIsVUFBRyxDQUFDLElBQUksQ0FBQyxRQUFULEVBQ0k7QUFFSixNQUFBLElBQUksQ0FBQyxRQUFMLENBQWMsT0FBZCxDQUFzQixVQUFBLE9BQU87QUFBQSxlQUFJLElBQUksQ0FBQyxtQkFBTCxDQUF5QixPQUF6QixDQUFKO0FBQUEsT0FBN0I7QUFFSCxLQVZFO0FBWUgsSUFBQSxtQkFBbUIsRUFBRSw2QkFBQyxPQUFELEVBQWE7QUFFOUIsVUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGdCQUFSLENBQXlCLE1BQXpCLENBQVg7QUFFQSxNQUFBLElBQUksQ0FBQyxPQUFMLENBQWEsVUFBQSxHQUFHLEVB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LENBcElBLEdBQUQ7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2o2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3U0MsYUFBWTtBQUVULE1BQUksUUFBUSxHQUFVLE9BQU8sQ0FBQyxVQUFELENBQTdCO0FBQUEsTUFDQSxRQUFRLEdBQVksT0FBTyxDQUFDLHVDQUFELENBRDNCO0FBQUEsTUFFQSxTQUZBOztBQUlBLEVBQUEsT0FBTyxDQUFDLHVCQUFELENBQVA7O0FBRUEsRUFBQSxTQUFT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Q0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxTQUE1QyxDQUFzRCxNQUF0RCxDQUE2RCxRQUE3RDtBQUNBLGNBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLFNBQTdDLENBQXVELE1BQXZELENBQThELFFBQTlEO0FBQ0YsYUFIRCxNQUdPO0FBQ0osY0FBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsQ0FBc0QsR0FBdEQsQ0FBMEQsUUFBMUQ7QUFDQSxjQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLG9CQUF2QixFQUE2QyxTQUE3QyxDQUF1RCxHQUF2RCxDQUEyRCxRQUEzRDtBQUNGO0FBRUg7QUFFRjtBQWxCaUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9CbkM7QUFoR00sR0FBWDtBQW9HQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFFBQWpCO0FBRUgsQ0ExR0EsR0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIiFmdW5jdGlvbihlLHQpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW1wiZXhwb3J0c1wiXSx0KTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzKXQoZXhwb3J0cyk7ZWxzZXt2YXIgbz17fTt0KG8pLGUuYm9keVNjcm9sbExvY2s9b319KHRoaXMsZnVuY3Rpb24oZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gaShlKXtpZihBcnJheS5pc0FycmF5KGUpKXtmb3IodmFyIHQ9MCxvPUFycmF5KGUubGVuZ3RoKTt0PGUubGVuZ3RoO3QrKylvW3RdPWVbdF07cmV0dXJuIG99cmV0dXJuIEFycmF5LmZyb20oZSl9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGw9ITE7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyl7dmFyIGU9e2dldCBwYXNzaXZlKCl7bD0hMH19O3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFBhc3NpdmVcIixudWxsLGUpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidGVzdFBhc3NpdmVcIixudWxsLGUpfWZ1bmN0aW9uIGQodCl7cmV0dXJuIHUuc29tZShmdW5jdGlvbihlKXtyZXR1cm4hKCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmV8fCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmUodCkpfSl9ZnVuY3Rpb24gYyhlKXt2YXIgdD1lfHx3aW5kb3cuZXZlbnQ7cmV0dXJuISFkKHQudGFyZ2V0KXx8KDE8dC50b3VjaGVzLmxlbmd0aHx8KHQucHJldmVudERlZmF1bHQmJnQucHJldmVudERlZmF1bHQoKSwhMSkpfWZ1bmN0aW9uIG8oKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dm9pZCAwIT09bSYmKGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0PW0sbT12b2lkIDApLHZvaWQgMCE9PWYmJihkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PWYsZj12b2lkIDApfSl9dmFyIGE9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lm5hdmlnYXRvciYmd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSYmKC9pUChhZHxob25lfG9kKS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtKXx8XCJNYWNJbnRlbFwiPT09d2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSYmMTx3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzKSx1PVtdLHM9ITEsdj0tMSxmPXZvaWQgMCxtPXZvaWQgMDtleHBvcnRzLmRpc2FibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKHIsZSl7aWYoYSl7aWYoIXIpcmV0dXJuIHZvaWQgY29uc29sZS5lcnJvcihcImRpc2FibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZGlzYWJsZUJvZHlTY3JvbGwgb24gSU9TIGRldmljZXMuXCIpO2lmKHImJiF1LnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudD09PXJ9KSl7dmFyIHQ9e3RhcmdldEVsZW1lbnQ6cixvcHRpb25zOmV8fHt9fTt1PVtdLmNvbmNhdChpKHUpLFt0XSksci5vbnRvdWNoc3RhcnQ9ZnVuY3Rpb24oZSl7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJih2PWUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZKX0sci5vbnRvdWNobW92ZT1mdW5jdGlvbihlKXt2YXIgdCxvLG4saTsxPT09ZS50YXJnZXRUb3VjaGVzLmxlbmd0aCYmKG89cixpPSh0PWUpLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WS12LGQodC50YXJnZXQpfHwobyYmMD09PW8uc2Nyb2xsVG9wJiYwPGl8fChuPW8pJiZuLnNjcm9sbEhlaWdodC1uLnNjcm9sbFRvcDw9bi5jbGllbnRIZWlnaHQmJmk8MD9jKHQpOnQuc3RvcFByb3BhZ2F0aW9uKCkpKX0sc3x8KGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixjLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCkscz0hMCl9fWVsc2V7bj1lLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZih2b2lkIDA9PT1tKXt2YXIgZT0hIW4mJiEwPT09bi5yZXNlcnZlU2Nyb2xsQmFyR2FwLHQ9d2luZG93LmlubmVyV2lkdGgtZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO2UmJjA8dCYmKG09ZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQsZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dCtcInB4XCIpfXZvaWQgMD09PWYmJihmPWRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3csZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiKX0pO3ZhciBvPXt0YXJnZXRFbGVtZW50OnIsb3B0aW9uczplfHx7fX07dT1bXS5jb25jYXQoaSh1KSxbb10pfXZhciBufSxleHBvcnRzLmNsZWFyQWxsQm9keVNjcm9sbExvY2tzPWZ1bmN0aW9uKCl7YT8odS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UudGFyZ2V0RWxlbWVudC5vbnRvdWNoc3RhcnQ9bnVsbCxlLnRhcmdldEVsZW1lbnQub250b3VjaG1vdmU9bnVsbH0pLHMmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsYyxsP3twYXNzaXZlOiExfTp2b2lkIDApLHM9ITEpLHU9W10sdj0tMSk6KG8oKSx1PVtdKX0sZXhwb3J0cy5lbmFibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKHQpe2lmKGEpe2lmKCF0KXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJlbmFibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZW5hYmxlQm9keVNjcm9sbCBvbiBJT1MgZGV2aWNlcy5cIik7dC5vbnRvdWNoc3RhcnQ9bnVsbCx0Lm9udG91Y2htb3ZlPW51bGwsdT11LmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50IT09dH0pLHMmJjA9PT11Lmxlbmd0aCYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixjLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCkscz0hMSl9ZWxzZSh1PXUuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSkpLmxlbmd0aHx8bygpfX0pO1xuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBGQVFzXG5cbiAgICBGQVFzID0ge1xuICAgICAgICBzZWN0aW9uczogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhcXMnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKCFGQVFzLnNlY3Rpb25zKVxuICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICBGQVFzLnNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiBGQVFzLmluaXRpYWxpc2VMaXN0ZW5lcnMoc2VjdGlvbikpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpbml0aWFsaXNlTGlzdGVuZXJzOiAoc2VjdGlvbikgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgZmFxcyA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbCgnLmZhcScpXG5cbiAgICAgICAgICAgIGZhcXMuZm9yRWFjaChmYXEgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBxdWVzdGlvbiA9IGZhcS5xdWVyeVNlbGVjdG9yKCcuZmFxX19xdWVzdGlvbicpXG4gICAgICAgICAgICAgICAgbGV0IGFuc3dlciAgID0gZmFxLnF1ZXJ5U2VsZWN0b3IoJy5mYXFfX2Fuc3dlcicpXG5cbiAgICAgICAgICAgICAgICBxdWVzdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBmYXEuY2xhc3NMaXN0LnRvZ2dsZSgnZmFxLS1vcGVuJylcblxuICAgICAgICAgICAgICAgICAgICBpZihmYXEuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYXEtLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyLnN0eWxlLm1heEhlaWdodCA9IGFuc3dlci5zY3JvbGxIZWlnaHQgKyAncHgnXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXIuc3R5bGUubWF4SGVpZ2h0ID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGQVFzXG5cbn0oKSlcbiIsIi8vIExhenlMb2FkIGZvciBQbG90IGJ5IEpvbiBNaWxscywgTWF0dHkgR2xlbiAmIE1pY2hhZWwgV2F0c29uXG5cbi8vIFRoaXMgbW9kdWxlIGxvYWRzIGluIGltYWdlcyBhc3luY3Jvbm91c2x5LiBJdCB3aWxsIGxvb2sgZm9yIHRoZSBjbGFzc1xuLy8gXCJKUy0tbGF6eUxvYWRcIiBhbmQgdGhlbiBsb29rIGZvciBhIGRhdGEtc3JjIG9uIGltYWdlIG9yIHZpZGVvIHRhZ3MuIFxuLy8gSXQgd2lsbCB0aGVuIHJlcGxhY2UgdGhlIHNyYyBvZiB0aGF0IGVsZW1lbnQgd2l0aCB0aGUgaW1hZ2UgbGlua2VkIG9uXG4vLyB0aGUgZGF0YSBhdHRyaWJ1dGUuXG5cbi8vIElmIHRoZSBlbGVtZW50IGlzIG5vdCBhbiBpbWFnZSBvciBhIHZpZGVvLSBpdCB3aWxsIGFzc2lnbiB0aGUgZGF0YS1zcmNcbi8vIGFzIGEgYmFja2dyb3VuZCBpbWFnZS4gXG5cbi8vIElmIHRoZSBzY3JlZW4gc2l6ZSBpcyBsZXNzIHRoYW4gdGhlIGRlZmluZWQgbW9iaWxlQnJlYWtwb2ludCwgd2UgbG9hZFxuLy8gdGhlIHNyYyBmcm9tIGRhdGEtc21hbGwtc3JjIGluc3RlYWQuIFxuXG4vLyBDcmVhdGlvbiBvZiB0aGVzZSB2aWRlbyBhbmQgaW1hZ2Ugb2JqZWN0cyBjYW4gYmUgbWFkZSB1c2luZyB0aGUgUEhQXG4vLyBoZWxwZXIgaW4gbGliL2hlbHBlcnMucGhwIHBsb3RMYXp5TG9hZCgpXG5cbi8vIElmIHdlIG5lZWQgdG8gc3RpcHVsYXRlIHRoZSBoZWlnaHQgb2YgYW4gaW1hZ2UgYmVmb3JlIGl0IGxvYWRzLCB0byBhdm9pZFxuLy8gYW55IGp1bXBpbmVzcywgd2UgY2FuIHBhc3MgdGhyb3VnaCBhIHJhdGlvICh3L2gpIG9mIHRoZSBpbWFnZSBzbyBpdCdzXG4vLyBzZXQgYmVmb3JlIHRoZSBpbWFnZSBsb2Fkcy5cblxuLy8gV2UgYWxzbyBoYW5kbGUgYXV0b3BsYXlpbmcgdmlkZW9zLCBpZiB0aGUgdmlkZW8gaGFzIGFuIGF1dG9wbGF5IGF0dHJpYnV0ZS5cbi8vIEl0IHdpbGwgcGF1c2UgYW5kIHBsYXkgdmlkZW9zIGFwcHJvcHJpYXRlbHkgZGVwZW5kaW5nIG9uIGlmIHRoZXkncmUgaW5cbi8vIHZpZXcgb3Igbm90LlxuXG4oZnVuY3Rpb24oKXtcblxuICAgIHZhciBMYXp5TG9hZFxuXG4gICAgTGF6eUxvYWQgPSB7XG4gICAgICAgIG1vYmlsZUJyZWFrcG9pbnQgOiA2NDAsXG4gICAgICAgIGltYWdlcyA6ICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWxhenlMb2FkJyksXG4gICAgICAgIGNvbmZpZyA6IHtcbiAgICAgICAgICAgIHJvb3RNYXJnaW46ICcwcHgnLFxuICAgICAgICAgICAgdGhyZXNob2xkOiAwLjAxXG4gICAgICAgIH0sXG4gICAgICAgIG9ic2VydmVyIDogbnVsbCxcbiAgICAgICAgaW5pdCA6IGZ1bmN0aW9uKCl7IFxuXG4gICAgICAgICAgICBMYXp5TG9hZC5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihMYXp5TG9hZC5oYW5kbGVJbWFnZUxvYWQsIExhenlMb2FkLmNvbmZpZylcblxuICAgICAgICAgICAgTGF6eUxvYWQubG9hZEltYWdlcygpXG4gICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkSW1hZ2VzIDogKCkgPT4geyBcblxuICAgICAgICAgICAgTGF6eUxvYWQuaW1hZ2VzLmZvckVhY2goIGltYWdlID0+IHsgIFxuXG4gICAgICAgICAgICAgICAgTGF6eUxvYWQub2JzZXJ2ZXIub2JzZXJ2ZShpbWFnZSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkRWxlbWVudHMgOiBlbGVtZW50cyA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKCBpbWFnZSA9PiB7ICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBMYXp5TG9hZC5vYnNlcnZlci5vYnNlcnZlKGltYWdlKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKClcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVJbWFnZUxvYWQgOiBlbnRyaWVzID0+IHsgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKCBlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlbnRyeS50YXJnZXRcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZighZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xvYWRlZCcpICYmICFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbG9hZGluZycpKSB7IFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKCFlbnRyeS5pc0ludGVyc2VjdGluZylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJylcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFnID0gZW50cnkuaXNJbnRlcnNlY3RpbmcgJiYgZWxlbWVudC50YWdOYW1lXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNyYyA9IGVsZW1lbnQuZGF0YXNldC5zcmNcblxuICAgICAgICAgICAgICAgICAgICBpZihMYXp5TG9hZC5pc1NtYWxsU2NyZWVuKCkgJiYgZWxlbWVudC5kYXRhc2V0LnNtYWxsU3JjKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYyA9IGVsZW1lbnQuZGF0YXNldC5zbWFsbFNyY1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHRhZyA9PSBcIlZJREVPXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTGF6eUxvYWQuaXNTbWFsbFNjcmVlbigpICYmIGVsZW1lbnQuZGF0YXNldC5zbWFsbFNyYykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zcmMgPSBlbGVtZW50LmRhdGFzZXQuc21hbGxTcmNcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNyYyA9IGVsZW1lbnQuZGF0YXNldC5zcmNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXV0b3BsYXknKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGxheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJylcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBMYXp5TG9hZC5nZXRJbWFnZShzcmMsIGVsZW1lbnQpLnRoZW4oIGRhdGEgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhZyA9IGVsZW1lbnQudGFnTmFtZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGFnID09IFwiSU1HXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmVsZW1lbnQuc3JjID0gZGF0YS5zcmNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIGRhdGEuc3JjICsgJyknXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCBlcnJvcmVkU3JjID0+e1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JlZFNyYywgJ2ltYWdlIG5vdCBmb3VuZCcpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LnRhZ05hbWUgPT0gXCJWSURFT1wiKSBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JykpIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIGVsZW1lbnQucGF1c2VkID09IGZhbHNlKSBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBhdXNlKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBsYXkoKVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldEltYWdlOiAoc3JjLCBlbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG5cbiAgICAgICAgICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKClcblxuICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHNyYyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGltZy5vbmVycm9yID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHNyYyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gc3JjXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNTbWFsbFNjcmVlbiA6ICgpID0+IHtcblxuICAgICAgICAgICAgaWYod2luZG93LmlubmVyV2lkdGggPCBMYXp5TG9hZC5tb2JpbGVCcmVha3BvaW50KVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IExhenlMb2FkXG5cbn0pKClcblxuIiwiLy8gTW9kYWxzIGZvciBQbG90IGJ5IE1pY2hhZWwgV2F0c29uXG4vLyBBIHNpbXBsZSBtb2RhbHMgc29sdXRpb24gdGhhdCBsb29rcyBmb3IgdGhlIGNsYXNzIFwiSlMtLXBsb3RNb2RhbEJ1dHRvblwiXG4vLyBBbmQgd2hlbiBjbGlja2VkLCByZWFkcyB0aGUgdmFsdWUgc2V0IG9uIGRhdGEtcGxvdC1tb2RhbC4gaXQgdGhlbiBsb29rc1xuLy8gZm9yIGFuIEhUTUwgZWxlbWVudCBjYWxsZWQgXCIuSlMtLXBsb3RNb2RhbENvbnRlbnRzXCIgd2l0aCBhIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG5cbi8vIEZvciBleGFtcGxlLCA8YSBjbGFzcz1cIkpTLS1wbG90TW9kYWxCdXR0b25cIiBkYXRhLXBsb3QtbW9kYWw9XCIxXCI+Q2xpY2sgbWU8L2E+XG4vLyBXaWxsIGZpbmQgdGhlIGZvbGxvd2luZyBlbGVtZW50OlxuLy8gPGRpdiBjbGFzcz1cIkpTLS1wbG90TW9kYWxDb250ZW50c1wiPkkgYW0gc29tZSBtb2RhbCBjb250ZW50ITwvZGl2PlxuLy8gQW5kIHdpbGwgdGFrZSB0aGUgaW5uZXJIVE1MIHRvIHB1dCBpbnNpZGUgYSBtb2RhbCBvbiB0aGUgc2NyZWVuLlxuXG4vLyBHYWxsZXJpZXMgY2FuIGJlIGNyZWF0ZWQgYnkgY29ubmVjdGluZyBtdWx0aXBsZSBQbG90IE1vZGFsIEJ1dHRvbnNcbi8vIGJ5IGdpdmluZyB0aGVtIGEgZGF0YS1wbG90LW1vZGFsLWdyb3VwIG9wdGlvbi5cbi8vIFRoZXkgd2lsbCB0aGVuIGhhdmUgd29ya2luZyBsZWZ0IGFuZCByaWdodCBhcnJvd3MgdG8gbmF2aWdhdGUgdGhyb3VnaFxuLy8gQ29udGVudHMgaW4gYSBsb29wLlxuXG4oZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIExhenlMb2FkICAgICAgICAgPSByZXF1aXJlKCcuL2xhenlsb2FkJyksICBcbiAgICAgICAgUGxvdCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vcGxvdCcpLFxuICAgICAgICBCb2R5U2Nyb2xsTG9jayAgID0gcmVxdWlyZSgnYm9keS1zY3JvbGwtbG9jaycpLFxuICAgICAgICBNb2RhbHNcblxuICAgIE1vZGFscyA9IHtcbiAgICAgICAgY3VycmVudEdyb3VwSXRlbSAgICA6IDAsXG4gICAgICAgIGdyb3VwTGlua3MgICAgICAgICAgOiBbXSwgIFxuICAgICAgICBjdXJyZW50TW9kYWxJZCAgICAgIDogbnVsbCxcbiAgICAgICAgaXNPcGVuICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBpc0xvYWRpbmcgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIGNvbnRyb2xzVGltZXIgICAgICAgOiBmYWxzZSxcbiAgICAgICAgbW9kYWxDb250ZW50ICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsUmVwbGFjZUNvbnRlbnRzJyksXG4gICAgICAgIG1vZGFsR3JvdXBDb250cm9scyAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbENvbnRyb2xzJyksXG4gICAgICAgIG1vZGFsR3JvdXBOZXh0ICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbENvbnRyb2xzX19uZXh0JyksXG4gICAgICAgIG1vZGFsR3JvdXBCYWNrICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbENvbnRyb2xzX19iYWNrJyksXG4gICAgICAgIHBsb3RNb2RhbCAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbCcpLFxuXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBNb2RhbHMuY3JlYXRlTGlzdGVuZXJzKClcbiAgICAgICAgICAgIE1vZGFscy5jaGVja0Zvck1vZGFsTm90aWZpY2F0aW9uKClcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1jbG9zZVBsb3RNb2RhbCcpXG5cbiAgICAgICAgICAgIGZvcih2YXIgY2xvc2VCdXR0b24gb2YgY2xvc2VCdXR0b25zKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICBNb2RhbHMuY2xvc2VQbG90TW9kYWwoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJyxmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgaWYoTW9kYWxzLmN1cnJlbnRNb2RhbElkICYmICFQbG90LmlzVG91Y2hEZXZpY2UoKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKE1vZGFscy5jb250cm9sc1RpbWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KE1vZGFscy5jb250cm9sc1RpbWVyKVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGVDb250cm9scycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlQ29udHJvbHMnKVxuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5jb250cm9sc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlQ29udHJvbHMnKVxuXG4gICAgICAgICAgICAgICAgICAgIH0sMjIwMClcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlV3JhcCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcGxvdC1tb2RhbF0nKSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLm9wZW5QbG90TW9kYWwoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcGxvdC1tb2RhbF0nKSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5tb2RhbEdyb3VwQmFjaykge1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLm1vZGFsR3JvdXBCYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxNb2RhbHMudHJpZ2dlckJhY2tHcm91cEl0ZW0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5tb2RhbEdyb3VwTmV4dCkge1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLm1vZGFsR3JvdXBOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxNb2RhbHMudHJpZ2dlck5leHRHcm91cEl0ZW0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoZS53aGljaCA9PSAzOSAmJiBNb2RhbHMuZ3JvdXBMaW5rcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnRyaWdnZXJOZXh0R3JvdXBJdGVtKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihlLndoaWNoID09IDM3ICYmIE1vZGFscy5ncm91cExpbmtzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMudHJpZ2dlckJhY2tHcm91cEl0ZW0oKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKE1vZGFscy5pc09wZW4gJiYgZS53aGljaD09MjcpIHtcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMuY2xvc2VQbG90TW9kYWwoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuXG4gICAgICAgIGNoZWNrRm9yTW9kYWxOb3RpZmljYXRpb24gOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvblRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLWZha2VCdXR0b25Gb3JNb2RhbE5vdGlmaWNhdGlvbnMnKVxuXG4gICAgICAgICAgICBpZihub3RpZmljYXRpb25UcmlnZ2VyKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncGxvdEhhc05vdGlmaWNhdGlvbkZpcmVkJykgIT09IFwiMVwiKSB7IFxuXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Bsb3RIYXNOb3RpZmljYXRpb25GaXJlZCcsICcxJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWxzLm9wZW5QbG90TW9kYWwobm90aWZpY2F0aW9uVHJpZ2dlcilcblxuICAgICAgICAgICAgICAgICAgICB9LG5vdGlmaWNhdGlvblRyaWdnZXIuZGF0YXNldC5wbG90Tm90aWZpY2F0aW9uV2FpdCoxMDAwKVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB0cmlnZ2VyQmFja0dyb3VwSXRlbSA6ICgpID0+IHtcblxuICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0tLVxuXG4gICAgICAgICAgICBpZihNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA8IDApIHtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtID0gTW9kYWxzLmdyb3VwTGlua3MubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNb2RhbHMub3BlblBsb3RNb2RhbChNb2RhbHMuZ3JvdXBMaW5rc1tNb2RhbHMuY3VycmVudEdyb3VwSXRlbV0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICB0cmlnZ2VyTmV4dEdyb3VwSXRlbSA6ICgpID0+IHtcblxuICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0rK1xuXG4gICAgICAgICAgICBpZihNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA9PSBNb2RhbHMuZ3JvdXBMaW5rcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtID0gMFxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE1vZGFscy5vcGVuUGxvdE1vZGFsKE1vZGFscy5ncm91cExpbmtzW01vZGFscy5jdXJyZW50R3JvdXBJdGVtXSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIG9wZW5QbG90TW9kYWw6IChlbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5pc0xvYWRpbmcgPT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICAgICA6ICdpbmxpbmUnLCAvLyAoaW5saW5lfGFqYXgpIGlmIHRoZSBjb250ZW50IGlzIGFscmVhZHkgaW4gdGhlIGRvbSBvciBub3RcbiAgICAgICAgICAgICAgICBncm91cElkICAgICAgICAgOiAnJywgLy9UaGUgb3B0aW9uYWwgSUQgb2YgdGhlIGdyb3VwIG9mIG1vZGFscyB1c2VkIGZvciBnYWxsZXJ5IHZpZXdzXG4gICAgICAgICAgICAgICAgY29udGVudHNJZCAgICAgIDogJycsIC8vVGhlIElEIHRoYXQgcmVmZXJlbmNlcyB3aGVyZSwgb24gdGhlIHBhZ2UsIHRoZSBjb250ZW50IHRvIHVzZSBsaXZlc1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlUGFydCAgICA6ICcnLCAvL1RoZSB0ZW1wbGF0ZSBwYXJ0IHRvIGxvYWQsIGlmIEFKQVhcbiAgICAgICAgICAgICAgICBhamF4RGF0YSAgICAgICAgOiB7fSwgLy9EYXRhIHRvIHNlbmQgdmlhIEFKQVhcbiAgICAgICAgICAgICAgICBtb2RhbENsYXNzICAgICAgOiAnJyAvL0EgY3VzdG9tIGNsYXNzIHRvIGFkZCB0byBvdXIgbW9kYWxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTW9kYWxzLmlzTG9hZGluZyA9IHRydWVcblxuICAgICAgICAgICAgaWYoZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbFR5cGUgPT0gJ2FqYXgnKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudHlwZSA9ICdhamF4J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXR0aW5ncy5jb250ZW50c0lkICAgICA9IGVsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxDb250ZW50c1xuICAgICAgICAgICAgc2V0dGluZ3MuZ3JvdXBJZCAgICAgICAgPSBlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsR3JvdXBcbiAgICAgICAgICAgIHNldHRpbmdzLnRlbXBsYXRlUGFydCAgID0gZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbFRlbXBsYXRlUGFydFxuICAgICAgICAgICAgc2V0dGluZ3MubW9kYWxDbGFzcyAgICAgPSBlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsQ2xhc3NcblxuICAgICAgICAgICAgaWYoIXNldHRpbmdzLmNvbnRlbnRzSWQgJiYgc2V0dGluZ3MudHlwZSA9PSAnaW5saW5lJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbmxpbmUgTW9kYWxzIG5lZWQgYSBwbG90LW1vZGFsLWNvbnRlbnRzIHZhcmlhYmxlIGFkZGVkJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2V0dGluZ3MudHlwZSA9PSAnYWpheCcgJiYgIXNldHRpbmdzLnRlbXBsYXRlUGFydCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBamF4IG1vZGFscyBuZWVkIGEgcGxvdC1tb2RhbC10ZW1wbGF0ZS1wYXJ0IHZhcmlhYmxlIGFkZGVkJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9DaGVjayB0byBzZWUgaWYgaXQncyBwYXJ0IG9mIGEgZ3JvdXBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoTW9kYWxzLmdyb3VwTGlua3MubGVuZ3RoID09IDAgJiYgc2V0dGluZ3MuZ3JvdXBJZClcbiAgICAgICAgICAgICAgIE1vZGFscy5pbml0aWFsaXNlR3JvdXAoZWxlbWVudClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIXNldHRpbmdzLmdyb3VwSWQpXG4gICAgICAgICAgICAgICAgTW9kYWxzLm1vZGFsR3JvdXBDb250cm9scy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5tb2RhbENsYXNzKSB7XG4gICAgICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QuYWRkKHNldHRpbmdzLm1vZGFsQ2xhc3MpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnR5cGUgPT0gJ2lubGluZScpIHtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5jdXJyZW50TW9kYWxJZCA9IHNldHRpbmdzLmNvbnRlbnRzSWRcblxuICAgICAgICAgICAgICAgIC8vRmluZCBjb250ZW50IHRvIGluc2VydCBpbiBvdXIgbW9kYWxcbiAgICAgICAgICAgICAgICB2YXIgcGxvdE1vZGFsQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbENvbnRlbnRzW2RhdGEtcGxvdC1tb2RhbC1jb250ZW50cz1cIicgKyBNb2RhbHMuY3VycmVudE1vZGFsSWQgKyAnXCJdJylcblxuICAgICAgICAgICAgICAgIGlmKCFwbG90TW9kYWxDb250ZW50cy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgICAgICBwbG90TW9kYWxDb250ZW50cyA9IHBsb3RNb2RhbENvbnRlbnRzLmlubmVySFRNTDtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5wdXRDb250ZW50c0ludG9Nb2RhbChwbG90TW9kYWxDb250ZW50cylcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0FKQVggbG9hZGluZyBjb250ZW50XG4gICAgICAgICAgICAgICAgdmFyIGFqYXhEYXRhID0ge31cblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxvdE1vZGFsTG9hZGluZ0FqYXgnKVxuXG4gICAgICAgICAgICAgICAgZm9yKGNvbnN0IGtleSBpbiBlbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoa2V5LnN1YnN0cmluZygwLDEzKSA9PSAncGxvdE1vZGFsRGF0YScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFqYXhEYXRhW2tleS5jaGFyQXQoMTMpLnRvTG93ZXJDYXNlKCkgKyBrZXkuc3Vic3RyaW5nKDE0KV0gPSBlbGVtZW50LmRhdGFzZXRba2V5XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBhcmdzID0ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5PcldyaXRlICAgOiAncmV0dXJuJyxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQYXJ0ICAgIDogc2V0dGluZ3MudGVtcGxhdGVQYXJ0LFxuICAgICAgICAgICAgICAgICAgICBkYXRhICAgICAgICAgICAgOiBhamF4RGF0YVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncykudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnB1dENvbnRlbnRzSW50b01vZGFsKGh0bWwpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHB1dENvbnRlbnRzSW50b01vZGFsIDogY29udGVudHMgPT4gIHtcblxuXG4gICAgICAgICAgICBNb2RhbHMubW9kYWxDb250ZW50LnN0eWxlLm1pbkhlaWdodCA9IE1vZGFscy5tb2RhbENvbnRlbnQuY2xpZW50SGVpZ2h0ICsgJ3B4J1xuICAgICAgICAgICAgTW9kYWxzLm1vZGFsQ29udGVudC5pbm5lckhUTUwgPSBjb250ZW50c1xuXG4gICAgICAgICAgICBCb2R5U2Nyb2xsTG9jay5kaXNhYmxlQm9keVNjcm9sbChNb2RhbHMucGxvdE1vZGFsKVxuXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Bsb3RNb2RhbEluVmlldycpXG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlcyA9IE1vZGFscy5tb2RhbENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nJylcblxuICAgICAgICAgICAgTGF6eUxvYWQuYWRkRWxlbWVudHMobmV3SW1hZ2VzKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLm1vZGFsQ29udGVudC5zdHlsZS5taW5IZWlnaHQgPSAwXG5cbiAgICAgICAgICAgICAgICB9LDUwKVxuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25zdCBuZXdWaWRlb3MgPSBNb2RhbHMubW9kYWxDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZpZGVvJylcblxuXG5cbiAgICAgICAgICAgIG5ld1ZpZGVvcy5mb3JFYWNoKHZpZGVvID0+e1xuXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IG5ldyBNZWRpYUVsZW1lbnRQbGF5ZXIodmlkZW8sLyogT3B0aW9ucyAqLyk7XG4gICAgICAgICAgICAgICAgcGxheWVyLnBsYXkoKTtcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgTW9kYWxzLmlzT3BlbiA9IHRydWVcbiAgICAgICAgICAgIE1vZGFscy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbG90TW9kYWxMb2FkaW5nQWpheCcpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpbml0aWFsaXNlR3JvdXAgOiAoZWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICBNb2RhbHMuZ3JvdXBMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsb3QtbW9kYWwtZ3JvdXA9XCInK2VsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxHcm91cCsnXCJdJylcblxuICAgICAgICAgICAgdmFyIGkgPSAwXG5cbiAgICAgICAgICAgIGZvcih2YXIgZ3JvdXBMaW5rIG9mIE1vZGFscy5ncm91cExpbmtzKSB7XG5cbiAgICAgICAgICAgICAgICBpZihlbGVtZW50ID09IGdyb3VwTGluaylcbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPSBpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGkrK1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5jdXJyZW50TW9kYWxJZCAmJiAhUGxvdC5pc1RvdWNoRGV2aWNlKCkpXG5cbiAgICAgICAgICAgICAgICBNb2RhbHMuY29udHJvbHNUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlQ29udHJvbHMnKVxuXG4gICAgICAgICAgICAgICAgfSwzMDAwKVxuXG4gICAgICAgICAgICBNb2RhbHMubW9kYWxHcm91cENvbnRyb2xzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjbG9zZVBsb3RNb2RhbDogKCkgPT4ge1xuICAgIFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbG90TW9kYWxJblZpZXcnKVxuXG4gICAgICAgICAgICBNb2RhbHMuY3VycmVudE1vZGFsSWQgPSBudWxsXG5cbiAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0ID0gJ0pTLS1wbG90TW9kYWwgcGxvdE1vZGFsJ1xuXG4gICAgICAgICAgICBNb2RhbHMuZ3JvdXBMaW5rcyA9IFtdXG5cbiAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtID0gMFxuXG4gICAgICAgICAgICBNb2RhbHMubW9kYWxDb250ZW50LmlubmVySFRNTCA9ICcnXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEJvZHlTY3JvbGxMb2NrLmVuYWJsZUJvZHlTY3JvbGwoTW9kYWxzLnBsb3RNb2RhbClcblxuICAgICAgICAgICAgTW9kYWxzLmlzT3BlbiA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gTW9kYWxzXG5cbn0oKSlcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIFNtb290aDtcblxuICBTbW9vdGggPSB7XG5cbiAgICB0cmFja2VkRWxlbWVudHNPYnNlcnZlciA6IG51bGwsXG4gICAgc3RhbmRhcmRTY3JvbGxGcmFtZXNPYnNlcnZlciA6IG51bGwsXG5cbiAgICBtYWluU2Nyb2xsQW5pbWF0aW9uRnJhbWUgOiBudWxsLFxuXG4gICAgY3VycmVudFBvc2l0aW9uIDogMCxcblxuICAgIG11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSA6IG51bGwsXG5cbiAgICBvblNjcm9sbENhbGxiYWNrVGhyb3R0bGVyIDogbnVsbCxcblxuICAgIGVhc2UgOiAwLjA3LFxuXG4gICAgbGFzdFBvc2l0aW9uIDogMCxcblxuICAgIG9uU2Nyb2xsIDogbnVsbCxcblxuICAgIHN0YW5kYXJkU2Nyb2xsIDogZmFsc2UsXG5cbiAgICBzY3JvbGxFbGVtZW50cyA6IFtdLFxuXG4gICAgdG9wQmFySGVpZ2h0IDogMCxcblxuICAgIHNjcm9sbEZyYW1lcyA6IFtdLFxuXG4gICAgdGlja2luZyA6IGZhbHNlLFxuXG4gICAgZG9tIDoge1xuICAgICAgICAgICAgc2Nyb2xsV2luZG93ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsXScpLFxuICAgICAgICAgICAgc2Nyb2xsRnJhbWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLWZyYW1lXScpLFxuICAgICAgICAgICAgc2Nyb2xsRWxlbWVudHMgICAgICAgICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLWVsZW1lbnRdJyksXG4gICAgICAgICAgICB0b3BCYXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGwtdG9wYmFyJylcbiAgICAgICAgICB9LFxuXG4gICAgd2luZG93SGVpZ2h0IDogd2luZG93LmlubmVySGVpZ2h0LCBcblxuICAgIHdpbmRvd1dpZHRoIDogd2luZG93LmlubmVyV2lkdGgsXG5cbiAgICBpbml0OiBzZXR0aW5ncyA9PiB7XG5cbiAgICAgIC8vb3ZlcnJpZGUgYW55IGRlZmF1bHQgc2V0dGluZ3Mgd2l0aCBwYXNzZWQgcGFyYW1ldGVyc1xuICAgICAgU21vb3RoLnNldFNldHRpbmdzKHNldHRpbmdzKVxuXG4gICAgICBpZighU21vb3RoLnN0YW5kYXJkU2Nyb2xsKSB7XG5cbiAgICAgICAgLy9TZXQgb3VyIGN1cnJlbnQgYW5kIGxhc3QgcG9zaXRpb25zIFxuICAgICAgICAvL3RvIHRoZSBjdXJyZW50IHNjcm9sbCBZIHBvc2l0aW9uLCBpbiBjYXNlXG4gICAgICAgIC8vd2UgYXJlIHNjcm9sbGVkIGRvd24gdGhlIHBhZ2Ugb24gbG9hZFxuICAgICAgICBTbW9vdGguY3VycmVudFBvc2l0aW9uICAgID0gd2luZG93LnNjcm9sbFlcbiAgICAgICAgU21vb3RoLmxhc3RQb3NpdGlvbiAgICAgICA9IHdpbmRvdy5zY3JvbGxZXG5cbiAgICAgICAgLy9QdXQgZml4ZWQgb250byB0aGUgd2hvbGUgc2l0ZSByZWFkeSB0byBcbiAgICAgICAgLy9pbnRlcmNlcHQgc2Nyb2xsaW5nXG4gICAgICAgIFNtb290aC5zZXRTdHlsZXMoKVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBTbW9vdGgucmVmcmVzaCwgeyBwYXNzaXZlOiB0cnVlIH0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBTbW9vdGguc2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSlcblxuICAgICAgICAvL1JlYWQgdGhyb3VnaCBlYWNoIHNjcm9sbCBmcmFtZSBhbmQgc2V0IGRhdGFcbiAgICAgICAgLy9pbnRvIGEgc2luZ2xlIGFycmF5IGZvciBwcm9jZXNzaW5nIGxhdGVyXG4gICAgICAgIC8ve1xuICAgICAgICAvLyAgICAgIGVsZW1lbnQgICAgICAgICAgIDogZWxlbWVudCwgICAgICAodGhlIGRvbSBlbGVtZW50KVxuICAgICAgICAvLyAgICAgIHRvcCAgICAgICAgICAgICAgIDogMTAwLCAgICAgICAgICAodGhlIG9mZnNldCB0b3AgdmFsdWUgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgaGVpZ2h0ICAgICAgICAgICAgOiAzMDAsICAgICAgICAgICh0aGUgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIGJvdHRvbSAgICAgICAgICAgIDogNDAwLCAgICAgICAgICAodGhlIG9mZnNldCBib3R0b20gcG9zaXRpb24gdmFsdWUgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgc3RpY2t5ICAgICAgICAgICAgOiBmYWxzZSwgICAgICAgIChpZiB0aGUgZWxlbWVudCBzaG91bGQgYmVoYXZlIGxpa2UgQ1NTIHN0aWNreSBvciBub3QpXG4gICAgICAgIC8vICAgICAgcGFyZW50Qm90dG9tICAgICAgOiBmYWxzZSB8fCA1MDAgIChpZiB0aGUgZWxlbWVudCBpcyBzdGlja3ksIHJldHVybiB0aGUgYm90dG9tIHBvc2l0aW9uIG9mIGl0cyBwYXJlbnQgaW4gcGl4ZWxzICh3aGVuIGl0IHNob3VsZCB1bnN0aWNrKSlcbiAgICAgICAgLy8gIH1cbiAgICAgICAgU21vb3RoLnNldFNjcm9sbEZyYW1lRGF0YSgpXG5cbiAgICAgIH1cblxuICAgICAgLy9JZiBhbnkgc2Nyb2xsIGVsZW1lbnRzIGV4aXN0LCB3ZSBjYW4gYWRkIHRoZW0gYW5kIG1vbml0b3IgdGhlbVxuICAgICAgaWYoU21vb3RoLmRvbS5zY3JvbGxFbGVtZW50cykge1xuICAgICAgICAvL1JlYWQgdGhyb3VnaCBlYWNoIHNjcm9sbCBlbGVtZW50IGFuZCBzZXQgZGF0YVxuICAgICAgICAvL2ludG8gYSBzaW5nbGUgYXJyYXkgZm9yIHByb2Nlc3NpbmcgbGF0ZXJcbiAgICAgICAgLy97XG4gICAgICAgIC8vICAgICAgZWxlbWVudCAgICAgICAgIDogZWxlbWVudCwgICAgICAgICAgKHRoZSBkb20gZWxlbWVudClcbiAgICAgICAgLy8gICAgICB0b3AgICAgICAgICAgICAgOiAxMDAsICAgICAgICAgICAgICAodGhlIG9mZnNldCB0b3AgdmFsdWUgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgaGVpZ2h0ICAgICAgICAgIDogMzAwLCAgICAgICAgICAgICAgKHRoZSBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgYm90dG9tICAgICAgICAgIDogNDAwLCAgICAgICAgICAgICAgKHRoZSBvZmZzZXQgYm90dG9tIHBvc2l0aW9uIHZhbHVlIHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIGlzVmlzaWJsZSAgICAgICA6IGZhbHNlLCAgICAgICAgICAgIChpZiB0aGUgZWxlbWVudCBpcyBjdXJyZW50bHkgaW4gdGhlIHdpbmRvdyBmcmFtZSBvciBub3QpXG4gICAgICAgIC8vICAgICAgaW5pdGlhbE9mZnNldCAgIDogLjIsICAgICAgICAgICAgICAgKGhvdyBmYXIgYXdheSB0aGlzIGVsZW1lbnQgaXMgZnJvbSB0aGUgaW5pdGlhbCBjZW50ZXIgb2YgdGhlIHNjcmVlbilcbiAgICAgICAgLy8gICAgICBjdXJyZW50UG9zaXRpb24gOiAwICAgICAgICAgICAgICAgICAoaG93IGZhciB1cCB0aGUgdmlld3BvcnQgdGhpcyBlbGVtZW50IGN1cnJlbnRseSBpcyAoYmV0d2VlbiAtMSBhbmQgMSkpXG4gICAgICAgIC8vICAgICAgY2FsbGJhY2sgICAgICAgIDogJ2Z1bmN0aW9uLm5hbWUnICAgKHRoZSBuYW1lIG9mIGEgZnVuY3Rpb24geW91IGNhbiBjYWxsIHdoZW4gdGhpcyBtb3ZlcyB3aXRoaW4gdmlldylcbiAgICAgICAgLy8gfVxuICAgICAgICBTbW9vdGgudHJhY2tlZEVsZW1lbnRzT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoU21vb3RoLnRyYWNrVmlzaWJsZUVsZW1lbnRzLCB7cm9vdE1hcmdpbjogJzBweCcsdGhyZXNob2xkOiAwLjAxfSlcbiAgICAgICAgU21vb3RoLnNldFNjcm9sbEVsZW1lbnREYXRhKClcbiAgICAgIH1cblxuICAgICAgLy9TZXQgdXAgYSBtdXRhdGlvbiBvYnNlcnZlciB0byBsaXN0ZW4gb3V0IGZvciBjaGFuZ2VzIGluIGhlaWdodCxcbiAgICAgIC8vdG8gYWRqdXN0IG91ciBoZWlnaHQgb2YgZG9jdW1lbnQgYWNjb3JkaW5nbHlcbiAgICAgIFNtb290aC5pbml0TXV0YXRpb25PYnNlcnZlcigpXG5cbiAgICAgIC8vSWYgdGhlcmUncyBhIGZpeGVkIHRvcGJhciBvbiB0aGlzIHNpdGUsIHdlIGNhbiBzZXQgdGhlIGhlaWdodFxuICAgICAgLy9oZXJlLCBpbiBvcmRlciB0byBvZmZzZXQgYW55IHN0aWNreSBwb3NpdGlvbnMuIFxuICAgICAgU21vb3RoLnNldFRvcEJhckhlaWdodCgpXG5cbiAgICAgIC8vSWYgaXQncyBub3Qgc3RhbmRhcmQgc2Nyb2xsLCBzZXQgb3VyIGluaXRpYWwgc2Nyb2xsIGZyYW1lIHBvc2l0aW9uc1xuICAgICAgaWYoIVNtb290aC5zdGFuZGFyZFNjcm9sbCkge1xuICAgICAgICBTbW9vdGguc2V0UG9zaXRpb25PZkZyYW1lcygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgU21vb3RoLnN0YW5kYXJkU2Nyb2xsRnJhbWVzT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoU21vb3RoLnRyYWNrU3RhbmRhcmRTY3JvbGxGcmFtZXMsIHtyb290TWFyZ2luOiAnMHB4Jyx0aHJlc2hvbGQ6IDAuMDF9KVxuICAgICAgICAgZm9yKGxldCBmcmFtZSBvZiBTbW9vdGguZG9tLnNjcm9sbEZyYW1lcykge1xuICAgICAgICAgICAgU21vb3RoLnN0YW5kYXJkU2Nyb2xsRnJhbWVzT2JzZXJ2ZXIub2JzZXJ2ZShmcmFtZSlcbiAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy9TZXQgb3VyIHBvc2l0aW9uIG9mIGFueSBzY3JvbGwgZWxlbWVudHNcbiAgICAgIFNtb290aC5wb3NpdGlvblNjcm9sbEVsZW1lbnRzKClcblxuICAgIH0sXG5cbiAgICBzZXRTZXR0aW5ncyA6IHNldHRpbmdzID0+IHtcblxuICAgICAgaWYoIXNldHRpbmdzKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgICBpZih0eXBlb2Yoc2V0dGluZ3Mub25TY3JvbGwpID09ICdmdW5jdGlvbicpXG4gICAgICAgIFNtb290aC5vblNjcm9sbCA9IHNldHRpbmdzLm9uU2Nyb2xsXG4gICAgICBcbiAgICAgIGlmKHNldHRpbmdzLnN0YW5kYXJkU2Nyb2xsID09IHRydWUpXG4gICAgICAgIFNtb290aC5zdGFuZGFyZFNjcm9sbCA9IHRydWVcblxuICAgICAgaWYoc2V0dGluZ3MuZWFzZSkgXG4gICAgICAgIFNtb290aC5lYXNlID0gc2V0dGluZ3MuZWFzZVxuICAgICAgXG4gICAgfSxcblxuICAgIHJldHJpZ2dlcldpbmRvd1NpemVPbk11dGF0ZSA6IChtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikgPT4geyBcblxuICAgICAgaWYoIVNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UpIHtcblxuICAgICAgICBTbW9vdGgubXV0YXRpb25PYnNlcnZlckRlYm91bmNlID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlXG5cbiAgICAgICAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMuZm9yRWFjaChmcmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZnJhbWUuaGVpZ2h0ICE9IGZyYW1lLmVsZW1lbnQuY2xpZW50SGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmKGNoYW5nZWQgPT0gdHJ1ZSkgXG4gICAgICAgICAgICAgIFNtb290aC5yZWZyZXNoKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UpXG4gICAgICAgICAgICBTbW9vdGgubXV0YXRpb25PYnNlcnZlckRlYm91bmNlID0gbnVsbFxuXG4gICAgICAgIH0sMjAwKVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgaW5pdE11dGF0aW9uT2JzZXJ2ZXIgOiAoKSA9PiB7XG5cbiAgICAgIGZvcih2YXIgc2Nyb2xsRnJhbWUgb2YgU21vb3RoLmRvbS5zY3JvbGxGcmFtZXMpIHtcblxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKFNtb290aC5yZXRyaWdnZXJXaW5kb3dTaXplT25NdXRhdGUpXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoc2Nyb2xsRnJhbWUsIHtcbiAgICAgICAgICBjaGlsZExpc3QgICA6IHRydWUsXG4gICAgICAgICAgYXR0cmlidXRlcyAgOiB0cnVlLFxuICAgICAgICAgIHN1YnRyZWUgICAgIDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIGRlc3Ryb3kgOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50cy5mb3JFYWNoKGVudHJ5ID0+e1xuICAgICAgICBlbnRyeS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICAgICAgfSlcblxuICAgICAgU21vb3RoLnNjcm9sbEZyYW1lcy5mb3JFYWNoKGVudHJ5ID0+e1xuICAgICAgICBlbnRyeS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICAgICAgfSlcblxuICAgICAgU21vb3RoLnRyYWNrZWRFbGVtZW50c09ic2VydmVyID0gbnVsbFxuICAgICAgU21vb3RoLm1haW5TY3JvbGxBbmltYXRpb25GcmFtZSA9IG51bGxcbiAgICAgIFNtb290aC5jdXJyZW50UG9zaXRpb24gPSAwXG4gICAgICBTbW9vdGgubXV0YXRpb25PYnNlcnZlckRlYm91bmNlID0gbnVsbFxuICAgICAgU21vb3RoLm9uU2Nyb2xsQ2FsbGJhY2tUaHJvdHRsZXIgPSBudWxsXG4gICAgICBTbW9vdGguZWFzZSA9IDAuMDdcbiAgICAgIFNtb290aC5sYXN0UG9zaXRpb24gPSAwXG4gICAgICBTbW9vdGgub25TY3JvbGwgPSBudWxsXG4gICAgICBTbW9vdGguc3RhbmRhcmRTY3JvbGwgPSBmYWxzZVxuICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzID0gW11cbiAgICAgIFNtb290aC50b3BCYXJIZWlnaHQgPSAwXG4gICAgICBTbW9vdGguc2Nyb2xsRnJhbWVzID0gW11cbiAgICAgIFNtb290aC50aWNraW5nID0gZmFsc2VcbiAgICAgIFNtb290aC5kb20uc2Nyb2xsV2luZG93LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuXG4gICAgfSxcblxuICAgIGFkZEVsZW1lbnRzIDogKGVsZW1lbnRzKSA9PiB7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG5cbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goIGVsZW1lbnQgPT4geyAgICAgICBcbiAgICAgICAgICAgICAgICBTbW9vdGgudHJhY2tlZEVsZW1lbnRzT2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICAgIH0pXG5cbiAgICB9LFxuXG4gICAgc2Nyb2xsVG8gOiAoZWxlbWVudCkgPT4ge1xuICAgICAgXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCxTbW9vdGguZXhhY3RQb3NpdGlvbk9mRWxlbWVudChlbGVtZW50KSAtIDEwMClcblxuICAgICAgaWYoU21vb3RoLnN0YW5kYXJkU2Nyb2xsICE9IGZhbHNlKSB7XG4gICAgICAgIFNtb290aC50aWNraW5nID0gdHJ1ZVxuICAgICAgICBTbW9vdGgubWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFNtb290aC5ydW4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldFNjcm9sbEVsZW1lbnREYXRhIDogKCkgPT4ge1xuXG4gICAgICBTbW9vdGguZG9tLnNjcm9sbEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLWVsZW1lbnRdJylcbiAgICAgIFNtb290aC5hZGRFbGVtZW50cyhTbW9vdGguZG9tLnNjcm9sbEVsZW1lbnRzKSBcblxuICAgICAgaWYoIVNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMpXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHMgPSBbXVxuICAgIFxuICAgICAgU21vb3RoLmRvbS5zY3JvbGxFbGVtZW50cy5mb3JFYWNoKCAoZWxlbWVudCxpKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudFRvcCA9IFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQpXG5cbiAgICAgICAgdmFyIGhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0XG5cbiAgICAgICAgdmFyIGNhbGxiYWNrICA9IGZhbHNlLFxuICAgICAgICAgICAgZnJvbVZhbHVlID0gLTEsXG4gICAgICAgICAgICB0b1ZhbHVlICAgPSAxXG5cbiAgICAgICAgLy9JcyBhbnl0aGluZyBzZXQgb24gdGhpcyBlbGVtZW50IGFzIGEgY2FsbGJhY2s/XG4gICAgICAgIGlmKGVsZW1lbnQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudCkge1xuXG4gICAgICAgICAgbGV0IGMgPSBlbGVtZW50LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbEVsZW1lbnRcblxuICAgICAgICAgIC8vRmlyc3QgdXAgLSBoYXZlIHZhbHVlcyBiZWVuIHBhc3NlZCB0byB0aGlzIGNhbGxiYWNrIGluIHRoaXMgZm9ybTogY2FsbGJhY2soMiw1KVxuICAgICAgICAgIGxldCB2YWx1ZXMgPSBjLnN1YnN0cmluZyggYy5pbmRleE9mKCAnKCcgKSArIDEsIGMuaW5kZXhPZiggJyknICkgKVxuICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5zcGxpdCgnLCcpXG5cbiAgICAgICAgICAvL1ZhbGlkIGlmIHdlIGhhdmUgMiwgYW5kIGZyb20gaXMgbGVzcyB0aGF0IHRvIHZhbHVlXG4gICAgICAgICAgaWYodmFsdWVzLmxlbmd0aCA9PSAyICYmIHZhbHVlc1swXSA8IHZhbHVlc1sxXSkge1xuICAgICAgICAgICAgZnJvbVZhbHVlID0gTnVtYmVyKHZhbHVlc1swXSlcbiAgICAgICAgICAgIHRvVmFsdWUgPSBOdW1iZXIodmFsdWVzWzFdKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBwb3RlbnRpYWxGdW5jdGlvbiA9IHdpbmRvd1tjXVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBwb3RlbnRpYWxGdW5jdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cbiAgICAgICAgICAgIGNhbGxiYWNrID0gcG90ZW50aWFsRnVuY3Rpb24ucmVwbGFjZSgvXFxzKlxcKC4qP1xcKVxccyovZywgJycpXG5cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrU3BsaXQgPSBjLnJlcGxhY2UoL1xccypcXCguKj9cXClcXHMqL2csICcnKS5zcGxpdCgnLicpXG5cbiAgICAgICAgICAgIGlmKGNhbGxiYWNrU3BsaXQubGVuZ3RoID09IDIpIHtcblxuICAgICAgICAgICAgICBwb3RlbnRpYWxGdW5jdGlvbiA9IHdpbmRvd1tjYWxsYmFja1NwbGl0WzBdXVtjYWxsYmFja1NwbGl0WzFdXVxuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcG90ZW50aWFsRnVuY3Rpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcG90ZW50aWFsRnVuY3Rpb25cbiAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5pdGlhbE9mZnNldCA9IDBcblxuICAgICAgICBpZihlbGVtZW50VG9wIDwgU21vb3RoLndpbmRvd0hlaWdodClcbiAgICAgICAgICBpbml0aWFsT2Zmc2V0ID0gKGVsZW1lbnRUb3AgKyBoZWlnaHQpIC8gKFNtb290aC53aW5kb3dIZWlnaHQgKyBoZWlnaHQpICogKHRvVmFsdWUgLSBmcm9tVmFsdWUpICsgZnJvbVZhbHVlXG5cblxuICAgICAgICBcbiAgICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzW2ldID0ge1xuICAgICAgICAgICAgZWxlbWVudCAgICAgICAgIDogZWxlbWVudCxcbiAgICAgICAgICAgIHRvcCAgICAgICAgICAgICA6IGVsZW1lbnRUb3AsXG4gICAgICAgICAgICBoZWlnaHQgICAgICAgICAgOiBoZWlnaHQsXG4gICAgICAgICAgICBib3R0b20gICAgICAgICAgOiBlbGVtZW50VG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICBpc1Zpc2libGUgICAgICAgOiBlbGVtZW50VG9wIDwgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiArIFNtb290aC53aW5kb3dIZWlnaHQgJiYgZWxlbWVudFRvcCArIGhlaWdodCA+IFNtb290aC5jdXJyZW50UG9zaXRpb24sXG4gICAgICAgICAgICBpbml0aWFsT2Zmc2V0ICAgOiBpbml0aWFsT2Zmc2V0LFxuICAgICAgICAgICAgY2FsbGJhY2sgICAgICAgIDogY2FsbGJhY2ssXG4gICAgICAgICAgICBmcm9tVmFsdWUgICAgICAgOiBmcm9tVmFsdWUsXG4gICAgICAgICAgICB0b1ZhbHVlICAgICAgICAgOiB0b1ZhbHVlLFxuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uIDogMFxuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5kYXRhc2V0LnBsb3RTbW9vdGhTY3JvbGxFbGVtZW50SWQgPSBpXG5cbiAgICAgIH0pXG5cblxuICAgIH0sXG5cbiAgICBzZXRUb3BCYXJIZWlnaHQgOiAoKSA9PiB7XG5cbiAgICAgIGlmKFNtb290aC5kb20udG9wQmFyKVxuICAgICAgICBTbW9vdGgudG9wQmFySGVpZ2h0ID0gU21vb3RoLmRvbS50b3BCYXIuY2xpZW50SGVpZ2h0XG5cbiAgICB9LFxuXG4gICAgc2V0U2Nyb2xsRnJhbWVEYXRhIDogKCkgPT4ge1xuXG4gICAgICBTbW9vdGguZG9tLnNjcm9sbEZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbC1mcmFtZV0nKVxuXG4gICAgICBTbW9vdGguc2Nyb2xsRnJhbWVzID0gW11cbiAgICAgIHZhciBuZXdIZWlnaHQgPSAwXG5cbiAgICAgIFNtb290aC5kb20uc2Nyb2xsRnJhbWVzLmZvckVhY2goIGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRUb3AgPSBTbW9vdGguZXhhY3RQb3NpdGlvbk9mRWxlbWVudChlbGVtZW50KVxuXG4gICAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMucHVzaCh7XG4gICAgICAgICAgICBlbGVtZW50ICAgICAgICAgICA6IGVsZW1lbnQsXG4gICAgICAgICAgICB0b3AgICAgICAgICAgICAgICA6IGVsZW1lbnRUb3AsXG4gICAgICAgICAgICBoZWlnaHQgICAgICAgICAgICA6IGVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgYm90dG9tICAgICAgICAgICAgOiBlbGVtZW50VG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICBzdGlja3kgICAgICAgICAgICA6IHR5cGVvZihlbGVtZW50LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbFN0aWNreSkgIT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogZmFsc2UsIFxuICAgICAgICAgICAgcGFyZW50Qm90dG9tICAgICAgOiBlbGVtZW50LnBhcmVudEVsZW1lbnQgPyBTbW9vdGguZXhhY3RQb3NpdGlvbk9mRWxlbWVudChlbGVtZW50LnBhcmVudEVsZW1lbnQpICsgZWxlbWVudC5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA6IGZhbHNlXG4gICAgICAgIH0pXG5cbiAgICAgIH0pXG5cbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gYCR7U21vb3RoLmRvbS5zY3JvbGxXaW5kb3cuc2Nyb2xsSGVpZ2h0fXB4YFxuXG4gICAgfSxcblxuICAgIHRyYWNrVmlzaWJsZUVsZW1lbnRzIDogKGVudHJpZXMpID0+IHtcbiAgICAgICBcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKCBlbnRyeSA9PiB7XG5cbiAgICAgICAgICBpZihlbnRyeS5pc0ludGVyc2VjdGluZyAmJiBlbnRyeSkge1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3Bsb3RTbW9vdGhTY3JvbGxJblZpZXcnLCdwbG90U21vb3RoU2Nyb2xsU2Vlbk9uY2UnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdwbG90U21vb3RoU2Nyb2xsSW5WaWV3JylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZihTbW9vdGguc2Nyb2xsRWxlbWVudHNbZW50cnkudGFyZ2V0LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbEVsZW1lbnRJZF0pXG4gICAgICAgICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHNbZW50cnkudGFyZ2V0LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbEVsZW1lbnRJZF0uaXNWaXNpYmxlID0gZW50cnkuaXNJbnRlcnNlY3RpbmdcblxuXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHRyYWNrU3RhbmRhcmRTY3JvbGxGcmFtZXMgOiAoZW50cmllcykgPT4ge1xuICAgICAgIFxuICAgICAgICBlbnRyaWVzLmZvckVhY2goIGVudHJ5ID0+IHtcblxuICAgICAgICAgIGlmKGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIGVudHJ5KSB7XG4gICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgncGxvdFNtb290aFNjcm9sbEZyYW1lSW5WaWV3JywncGxvdFNtb290aFNjcm9sbEZyYW1lU2Vlbk9uY2UnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnKVxuICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICByZWZyZXNoIDogKCkgPT4ge1xuICAgICAgaWYoU21vb3RoLnN0YW5kYXJkU2Nyb2xsKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgXG4gICAgICBTbW9vdGgud2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICBTbW9vdGgud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgU21vb3RoLnNldFNjcm9sbEVsZW1lbnREYXRhKClcbiAgICAgIFNtb290aC5zZXRTY3JvbGxGcmFtZURhdGEoKVxuICAgICAgU21vb3RoLnNldFRvcEJhckhlaWdodCgpXG4gICAgICBTbW9vdGguc2Nyb2xsKClcbiAgICB9LFxuXG4gICAgcnVuIDogKCkgPT4ge1xuXG4gICAgICBTbW9vdGgubGFzdFBvc2l0aW9uID0gU21vb3RoLmxlcnAoU21vb3RoLmxhc3RQb3NpdGlvbiwgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiwgU21vb3RoLmVhc2UpXG5cbiAgICAgIGlmIChTbW9vdGgubGFzdFBvc2l0aW9uIDwgLjEpXG4gICAgICAgIFNtb290aC5sYXN0UG9zaXRpb24gPSAwXG4gICAgIFxuICAgICAgbGV0IGRpZmYgPSBTbW9vdGguY3VycmVudFBvc2l0aW9uIC0gU21vb3RoLmxhc3RQb3NpdGlvblxuXG4gICAgICBpZihNYXRoLmFicyhkaWZmKSA8IDAuNSkge1xuICAgICAgICBTbW9vdGgudGlja2luZyA9IGZhbHNlXG4gICAgICAgIGRpZmYgPSAwXG4gICAgICB9XG5cbiAgICAgIHZhciB2ZWxvY2l0eSA9IGRpZmYgLyBTbW9vdGgud2luZG93V2lkdGhcblxuICAgICAgU21vb3RoLnNldFBvc2l0aW9uT2ZGcmFtZXMoKVxuXG4gICAgICBTbW9vdGguZmlyZU9uU2Nyb2xsRXZlbnQodmVsb2NpdHkpXG5cbiAgICAgIFNtb290aC5wb3NpdGlvblNjcm9sbEVsZW1lbnRzKClcblxuICAgICAgaWYoU21vb3RoLnRpY2tpbmcgPT0gdHJ1ZSlcbiAgICAgICAgU21vb3RoLm1haW5TY3JvbGxBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShTbW9vdGgucnVuKVxuICAgICAgXG5cbiAgICB9LFxuXG4gICAgcG9zaXRpb25TY3JvbGxFbGVtZW50cyA6ICgpID0+IHtcblxuICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzLmZvckVhY2goZW50cnkgPT4ge1xuXG4gICAgICAgICAgaWYoZW50cnkuaXNWaXNpYmxlID09IHRydWUgJiYgZW50cnkuY2FsbGJhY2spIHtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gKGVudHJ5LnRvcCAtIFNtb290aC5sYXN0UG9zaXRpb24gKyBlbnRyeS5oZWlnaHQpIC8gKFNtb290aC53aW5kb3dIZWlnaHQgKyBlbnRyeS5oZWlnaHQpICogKGVudHJ5LnRvVmFsdWUgLSBlbnRyeS5mcm9tVmFsdWUpICsgZW50cnkuZnJvbVZhbHVlIC0gZW50cnkuaW5pdGlhbE9mZnNldFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihlbnRyeS5jdXJyZW50UG9zaXRpb24gIT0gY3VycmVudFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgICAgZW50cnkuY3VycmVudFBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uXG5cbiAgICAgICAgICAgICAgZW50cnkuY2FsbGJhY2soZW50cnkuZWxlbWVudCxjdXJyZW50UG9zaXRpb24pXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgfSlcblxuICAgIH0sXG5cbiAgICBmaXJlT25TY3JvbGxFdmVudCA6ICh2ZWxvY2l0eSkgPT4ge1xuXG4gICAgICBpZih0eXBlb2YoU21vb3RoLm9uU2Nyb2xsKSA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICBcbiAgICAgICAgaWYoU21vb3RoLm9uU2Nyb2xsQ2FsbGJhY2tUaHJvdHRsZXIgPT09IG51bGwpIHtcblxuICAgICAgICAgIFNtb290aC5vblNjcm9sbENhbGxiYWNrVGhyb3R0bGVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICBTbW9vdGgub25TY3JvbGwoU21vb3RoLmRvbS5zY3JvbGxGcmFtZXMsdmVsb2NpdHkpXG4gICAgICAgICAgICBTbW9vdGgub25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA9IG51bGxcblxuICAgICAgICAgIH0sNTApXG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHNldFBvc2l0aW9uT2ZGcmFtZXMgOiAoKSA9PiB7XG5cbiAgICAgIGZvcih2YXIgc2Nyb2xsRnJhbWUgb2YgU21vb3RoLnNjcm9sbEZyYW1lcykge1xuXG4gICAgICAgICAgdmFyIHdpbmRvd1Njcm9sbFBvc2l0aW9uID0gU21vb3RoLmxhc3RQb3NpdGlvblxuXG4gICAgICAgICAgaWYoc2Nyb2xsRnJhbWUuc3RpY2t5ICYmIHNjcm9sbEZyYW1lLnBhcmVudEJvdHRvbSkge1xuICAgICAgICAgICAgd2luZG93U2Nyb2xsUG9zaXRpb24gPSBTbW9vdGguY2FsY1Bvc2l0aW9uT2ZTdGlja3lFbGVtZW50KHNjcm9sbEZyYW1lLCB3aW5kb3dTY3JvbGxQb3NpdGlvbilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZih3aW5kb3dTY3JvbGxQb3NpdGlvbiA+IHNjcm9sbEZyYW1lLmJvdHRvbSB8fCB3aW5kb3dTY3JvbGxQb3NpdGlvbiArIFNtb290aC53aW5kb3dIZWlnaHQgPCBzY3JvbGxGcmFtZS50b3ApIHtcbiAgICAgICAgICAgIHNjcm9sbEZyYW1lLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncGxvdFNtb290aFNjcm9sbEZyYW1lSW5WaWV3JylcbiAgICAgICAgICAgIFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY3JvbGxGcmFtZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycsJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZVNlZW5PbmNlJylcbiAgICAgICAgICAgIHNjcm9sbEZyYW1lLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKDAsIC0ke3dpbmRvd1Njcm9sbFBvc2l0aW9ufXB4LCAwKWBcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHNjcm9sbCA6ICgpID0+IHtcbiAgICAgIFNtb290aC5jdXJyZW50UG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWVxuICAgICAgaWYoU21vb3RoLnRpY2tpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgU21vb3RoLnRpY2tpbmcgPSB0cnVlXG4gICAgICAgIFNtb290aC5tYWluU2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoU21vb3RoLnJ1bikgXG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldFN0eWxlcyA6ICgpID0+IHtcblxuICAgICAgT2JqZWN0LmFzc2lnbihTbW9vdGguZG9tLnNjcm9sbFdpbmRvdy5zdHlsZSx7XG4gICAgICAgIHBvc2l0aW9uICA6ICdmaXhlZCcsXG4gICAgICAgIHRvcCAgICAgICA6IDAsXG4gICAgICAgIGxlZnQgICAgICA6IDAsXG4gICAgICAgIGhlaWdodCAgICA6ICcxMDAlJyxcbiAgICAgICAgd2lkdGggICAgIDogJzEwMCUnLFxuICAgICAgICBvdmVyZmxvdyAgOiAnaGlkZGVuJ1xuICAgICAgfSlcblxuICAgIH0sXG5cbiAgICBjYWxjUG9zaXRpb25PZlN0aWNreUVsZW1lbnQgOiAoZW50cnksIHBvc2l0aW9uKSA9PiB7XG5cbiAgICAgIC8vSWYgdGhlIGl0ZW0gaXMgYmVsb3cgdGhlIGJvdHRvbSBvZiBpdCdzIHBhcmVudFxuICAgICAgaWYocG9zaXRpb24gKyBTbW9vdGgudG9wQmFySGVpZ2h0ID49IGVudHJ5LnBhcmVudEJvdHRvbSlcbiAgICAgICAgcmV0dXJuIHBvc2l0aW9uXG4gICAgICBcblxuICAgICAgaWYoZW50cnkucGFyZW50Qm90dG9tIC0gcG9zaXRpb24gLSBTbW9vdGgudG9wQmFySGVpZ2h0IDw9IGVudHJ5LmhlaWdodCkge1xuICAgICAgICByZXR1cm4gZW50cnkudG9wIC0gZW50cnkucGFyZW50Qm90dG9tICsgcG9zaXRpb24gKyBlbnRyeS5oZWlnaHRcbiAgICAgIH1cblxuICAgICAgaWYocG9zaXRpb24gKyBTbW9vdGgudG9wQmFySGVpZ2h0ID4gZW50cnkudG9wKSBcbiAgICAgICAgcmV0dXJuIGVudHJ5LnRvcCAtIFNtb290aC50b3BCYXJIZWlnaHQgICBcblxuXG4gICAgICByZXR1cm4gcG9zaXRpb25cblxuICAgIH0sXG5cbiAgICBsZXJwOiAoYSxiLG4pID0+ICB7XG5cbiAgICAgICAgcmV0dXJuICgxIC0gbikgKiBhICsgbiAqIGJcblxuICAgIH0sXG5cbiAgICBleGFjdFBvc2l0aW9uT2ZFbGVtZW50IDogKGVsZW1lbnQpID0+IHtcbiAgICAgIHZhciBlbCA9IGVsZW1lbnQsXG4gICAgICBvZmZzZXRUb3AgID0gMDtcblxuICAgICAgZG97XG4gICAgICAgICAgb2Zmc2V0VG9wICArPSBlbC5vZmZzZXRUb3A7XG5cbiAgICAgICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcbiAgICAgIH0gd2hpbGUoIGVsICk7XG5cbiAgICAgIHJldHVybiBvZmZzZXRUb3BcblxuICAgIH1cblxuICB9XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBTbW9vdGhcblxufSgpKSIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgQm9keVNjcm9sbExvY2sgICA9IHJlcXVpcmUoJ2JvZHktc2Nyb2xsLWxvY2snKSxcbiAgICAgICAgTGF6eUxvYWQgICAgICAgICA9IHJlcXVpcmUoJy4vbGF6eWxvYWQnKSxcbiAgICAgICAgU3luY1Njcm9sbCAgICAgICA9IHJlcXVpcmUoJy4vc3luY3Njcm9sbCcpLCBcbiAgICAgICAgUGxvdFxuXG4gICAgUGxvdCA9IHtcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIFBsb3QuY3JlYXRlTGlzdGVuZXJzKClcbiAgICAgICAgICAgIFN5bmNTY3JvbGwuaW5pdCgpIFxuICAgICAgICAgICAgUGxvdC5hbmltYXRlQmFubmVyTm90aWZpY2F0aW9ucygpIFxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlTGlzdGVuZXJzOiAoKSA9PiB7XG5cbiAgICAgICAgICAgXHRjb25zdCBidXJnZXJNZW51VHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLW1lbnVUcmlnZ2VyJylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoYnVyZ2VyTWVudVRyaWdnZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGJ1cmdlck1lbnVUcmlnZ2VyIG9mIGJ1cmdlck1lbnVUcmlnZ2Vycykge1xuICAgICAgICAgICAgICAgICAgICBidXJnZXJNZW51VHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsUGxvdC50b2dnbGVCdXJnZXIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzaWRlU3dpcGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsb3RTaWRlU3dpcGVzJylcblxuICAgICAgICAgICAgaWYoc2lkZVN3aXBlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgUGxvdC5zaWRlU3dpcGVzKHNpZGVTd2lwZXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBhbmltYXRlQmFubmVyTm90aWZpY2F0aW9ucyA6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tYmFubmVyTm90aWZpY2F0aW9uJylcblxuICAgICAgICAgICAgaWYoYmFubmVyKVxuICAgICAgICAgICAgICAgIGlmKGJhbm5lci5kYXRhc2V0LmFuaW1hdGlvblR5cGUgPT0gJ2Fsd2F5cycpIHtcbiAgICAgICAgICAgICAgICAgICAgUGxvdC5idWlsZEJhbm5lclJlcGVhdGluZ1RleHQoYmFubmVyKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBQbG90LmJ1aWxkQmFubmVyUmVwZWF0aW5nVGV4dChiYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgUGxvdC5jaGVja1RvU2VlSWZXZU5lZWRUb0FuaW1hdGlvbkJhbm5lcihiYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsb3QuY2hlY2tUb1NlZUlmV2VOZWVkVG9BbmltYXRpb25CYW5uZXIoYmFubmVyKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja1RvU2VlSWZXZU5lZWRUb0FuaW1hdGlvbkJhbm5lciA6IGJhbm5lciA9PiB7XG5cbiAgICAgICAgICAgIGJhbm5lci5pbm5lckhUTUwgPSBgPGRpdj4ke2Jhbm5lci5kYXRhc2V0Lm1lc3NhZ2V9PC9kaXY+YFxuICAgICAgICAgICAgY29uc3QgZGl2MSA9IGJhbm5lci5xdWVyeVNlbGVjdG9yKCdkaXY6bnRoLW9mLXR5cGUoMSknKVxuICAgICAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihkaXYxLnNjcm9sbFdpZHRoID4gd2luZG93V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBiYW5uZXIuY2xhc3NMaXN0LmFkZCgnd2l0aEFuaW1hdGlvbicpXG4gICAgICAgICAgICAgICAgUGxvdC5idWlsZEJhbm5lclJlcGVhdGluZ1RleHQoYmFubmVyKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgYmFubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3dpdGhBbmltYXRpb24nKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgYnVpbGRCYW5uZXJSZXBlYXRpbmdUZXh0IDogYmFubmVyID0+IHtcblxuICAgICAgICAgICAgYmFubmVyLmlubmVySFRNTCA9IGA8ZGl2PiR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX08L2Rpdj48ZGl2PiR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX08L2Rpdj5gXG4gICAgICAgICAgICBjb25zdCBkaXYxID0gYmFubmVyLnF1ZXJ5U2VsZWN0b3IoJ2RpdjpudGgtb2YtdHlwZSgxKScpXG4gICAgICAgICAgICBjb25zdCBkaXYyID0gYmFubmVyLnF1ZXJ5U2VsZWN0b3IoJ2RpdjpudGgtb2YtdHlwZSgyKScpXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG5cbiAgICAgICAgICAgIGRpdjEuc3R5bGUuYW5pbWF0aW9uRHVyYXRpb249KHdpbmRvd1dpZHRoLzIwKStcInNcIlxuICAgICAgICAgICAgZGl2Mi5zdHlsZS5hbmltYXRpb25EdXJhdGlvbj0od2luZG93V2lkdGgvMjApK1wic1wiXG5cbiAgICAgICAgICAgIHZhciBpICA9IDBcblxuICAgICAgICAgICAgd2hpbGUoZGl2MS5zY3JvbGxXaWR0aCA8IHdpbmRvd1dpZHRoICYmIGkgPCAxMDApIHtcbiAgICAgICAgICAgICAgICBkaXYxLmlubmVySFRNTCA9IGRpdjEuaW5uZXJIVE1MICsgYCAke2Jhbm5lci5kYXRhc2V0Lm1lc3NhZ2V9YFxuICAgICAgICAgICAgICAgIGRpdjIuaW5uZXJIVE1MID0gZGl2Mi5pbm5lckhUTUwgKyBgICR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX1gXG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2lkZVN3aXBlcyA6IChzaWRlU3dpcGVzKSA9PiB7XG5cbiAgICAgICAgICAgIGZvcih2YXIgc2lkZVN3aXBlIG9mIHNpZGVTd2lwZXMpIHtcblxuICAgICAgICAgICAgICAgICBpZihwYXJzZUludChzaWRlU3dpcGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpICsgMSA8IHBhcnNlSW50KHNpZGVTd2lwZS5zY3JvbGxXaWR0aCkpIHtcblxuXG4gICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9nZ2xlQnVyZ2VyIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBidXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1idXJnZXJNZW51JylcblxuICAgICAgICAgICAgaWYoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlck9wZW4nKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdidXJnZXJPcGVuJylcbiAgICAgICAgICAgICAgICBCb2R5U2Nyb2xsTG9jay5kaXNhYmxlQm9keVNjcm9sbChidXJnZXJNZW51KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYnVyZ2VyT3BlbicpXG4gICAgICAgICAgICAgICAgQm9keVNjcm9sbExvY2suZW5hYmxlQm9keVNjcm9sbChidXJnZXJNZW51KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNQYWdlIDogc2x1ZyA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygncGFnZS0nK3NsdWcpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBmaXhWaCA6ICgpID0+IHtcblxuICAgICAgICAgICAgLy8gRmlyc3Qgd2UgZ2V0IHRoZSB2aWV3cG9ydCBoZWlnaHQgYW5kIHdlIG11bHRpcGxlIGl0IGJ5IDElIHRvIGdldCBhIHZhbHVlIGZvciBhIHZoIHVuaXRcbiAgICAgICAgICAgIGxldCB2aCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMDFcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS12aCcsIGAke3ZofXB4YClcblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNUb3VjaERldmljZTogKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgcHJlZml4ZXMgPSAnIC13ZWJraXQtIC1tb3otIC1vLSAtbXMtICcuc3BsaXQoJyAnKVxuICAgICAgICAgICAgdmFyIG1xID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpIHtcbiAgICAgICAgICAgIFx0ZG9jdW1lbnQuYm9keS5hZGRDbGFzcygnaXNUb3VjaERldmljZScpICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBbJygnLCBwcmVmaXhlcy5qb2luKCd0b3VjaC1lbmFibGVkKSwoJyksICdwbG90JywgJyknXS5qb2luKCcnKVxuICAgICAgICAgICAgcmV0dXJuIG1xKHF1ZXJ5KVxuICAgICAgICB9LFxuXG4gICAgICAgIGFyZVdlQXRUaGVUb3AgOiBzY3JvbGxUb3AgPT4ge1xuXG4gICAgICAgICAgICBpZihzY3JvbGxUb3AgPiAwKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZCcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsZWQnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGxvYWRUZW1wbGF0ZVBhcnQgOiAoYXJncykgPT4geyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlUGFydCAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgYWN0aW9uICAgICAgICAgIDogJ3Bsb3RMb2FkVGVtcGxhdGVQYXJ0JywgLy9UaGlzIGlzIHRoZSBhY3Rpb24gZmlyZWQgaW50byBvdXIgUGxvdFNpdGUgUEhQIHNldHVwLnBocCBmaWxlXG4gICAgICAgICAgICAgICAgZGF0YSAgICAgICAgICAgIDoge30sXG4gICAgICAgICAgICAgICAgcmV0dXJuT3JXcml0ZSAgIDogJ3dyaXRlJywgLy8od3JpdGV8cmV0dXJuKSBlaXRoZXIgYWRkcyBjb250ZW50IHRvIGNvbnRlbnRBcmVhLCBvciByZXR1cm5zIG5ldyBIVE1MIGluIHRoZSBwcm9taXNlXG4gICAgICAgICAgICAgICAgY29udGVudEFyZWEgICAgIDogJy5KUy0tYWpheFRhcmdldEFyZWEnLCBcbiAgICAgICAgICAgICAgICBhcHBlbmQgICAgICAgICAgOiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgYXJncylcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB0cnkgeyBcbiAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5yZXR1cm5PcldyaXRlID09ICd3cml0ZScpXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2V0dGluZ3MuY29udGVudEFyZWEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb250ZW50QXJlYSBuZWVkcyB0byBiZSBhIHZhbGlkIHNlbGVjdG9yIScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGNvbnRlbnRBcmVhID09IG51bGwgJiYgc2V0dGluZ3MucmV0dXJuT3JXcml0ZSA9PSAnd3JpdGUnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvdWxkblxcJ3QgZmluZCBzZWxlY3RvciBmb3IgY29udGVudEFyZWEgb24gcGFnZS4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy50ZW1wbGF0ZVBhcnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb3VsZG5cXCd0IGZpbmQgdGVtcGxhdGUgcGFydC4gTWFrZSBzdXJlIHlvdSBzZXQgb25lIGFzIHRlbXBsYXRlUGFydCwgZm9yIGV4YW1wbGUgcGFydHMvYWpheC1jb250ZW50JylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodHlwZW9mKHNldHRpbmdzLmFwcGVuZCkgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1ZhbHVlIHBhc3NlZCB0byBhcHBlbmQgd2FzIG5vdCBhIGJvb2xlYW4uJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2V0dGluZ3MucmV0dXJuT3JXcml0ZSA9PSAnd3JpdGUnKVxuICAgICAgICAgICAgICAgIGNvbnRlbnRBcmVhLmNsYXNzTGlzdC5hZGQoJ3Bsb3RMb2FkaW5nJylcblxuICAgICAgICAgICAgc2V0dGluZ3MuZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBkYXRhICAgICAgICAgICAgOiBzZXR0aW5ncy5kYXRhLFxuICAgICAgICAgICAgICAgIGFjdGlvbiAgICAgICAgICA6IHNldHRpbmdzLmFjdGlvbixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiBzZXR0aW5ncy50ZW1wbGF0ZVBhcnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHF1ZXJ5U3RyaW5nID0gUGxvdC50b1F1ZXJ5U3RyaW5nKHNldHRpbmdzLmRhdGEpXG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKGF1LCB7XG5cbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogcXVlcnlTdHJpbmcsXG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbidcblxuICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmpzb24oKVxuXG4gICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5yZXR1cm5PcldyaXRlID09ICd3cml0ZScpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRBcmVhLmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RMb2FkaW5nJylcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQuc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnJldHVybk9yV3JpdGUgIT09ICd3cml0ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmh0bWxcblxuICAgICAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5hcHBlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRBcmVhLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgcmVzdWx0Lmh0bWwpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEuaW5uZXJIVE1MID0gcmVzdWx0Lmh0bWxcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRBcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tbGF6eUxvYWQnKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExhenlMb2FkLm9ic2VydmVyLm9ic2VydmUoZWwpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuaHRtbFxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InLGVycm9yKVxuXG4gICAgICAgICAgICB9KVxuXG5cblxuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGVGb3JtYXQgOiAoZGF0ZSxmb3JtYXQpID0+IHtcblxuICAgICAgICAgICAgaWYoZm9ybWF0ID09ICdkUyBNJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCkgKyBQbG90LmdldE9yZGluYWwoZGF0ZS5nZXREYXRlKCkpICsgJyAnICsgUGxvdC5nZXRNb250aChkYXRlKVxuXG4gICAgICAgICAgICBpZihmb3JtYXQgPT0gJ00gZFMnKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbG90LmdldE1vbnRoKGRhdGUpICsgJyAnICsgZGF0ZS5nZXREYXRlKCkgKyBQbG90LmdldE9yZGluYWwoZGF0ZS5nZXREYXRlKCkpIFxuXG4gICAgICAgICAgICBpZihmb3JtYXQgPT0gJ2QvbS95JylcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCkgKyAnLycgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLycgKyBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKS5zdWJzdHIoLTIpXG5cbiAgICAgICAgICAgIGlmKGZvcm1hdCA9PSAnbS9kL3knKVxuICAgICAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLycgKyBkYXRlLmdldERhdGUoKSArICcvJyArIGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLnN1YnN0cigtMilcblxuICAgICAgICAgICAgcmV0dXJuIFBsb3QuZ2V0RGF5T2ZXZWVrKGRhdGUpXG4gICAgICAgICB9LFxuXG4gICAgICAgIGdldERheU9mV2VlayA6IGRhdGUgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBkYXlzID0gW1xuICAgICAgICAgICAgICAgICdTdW5kYXknLFxuICAgICAgICAgICAgICAgICdNb25kYXknLFxuICAgICAgICAgICAgICAgICdUdWVzZGF5JyxcbiAgICAgICAgICAgICAgICAnV2VkbmVzZGF5JyxcbiAgICAgICAgICAgICAgICAnVGh1cnNkYXknLFxuICAgICAgICAgICAgICAgICdGcmlkYXknLFxuICAgICAgICAgICAgICAgICdTYXR1cmRheSdcbiAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgcmV0dXJuIGRheXNbZGF0ZS5nZXREYXkoKV1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGdldE9yZGluYWwgOiBudW1iZXIgPT4ge1xuXG4gICAgICAgICAgICAgIGlmIChudW1iZXIgPiAzICYmIG51bWJlciA8IDIxKSByZXR1cm4gJ3RoJztcbiAgICAgICAgICAgICAgc3dpdGNoIChudW1iZXIgJSAxMCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTogIHJldHVybiBcInN0XCI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOiAgcmV0dXJuIFwibmRcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDM6ICByZXR1cm4gXCJyZFwiO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcInRoXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG5cbiAgICAgICAgZ2V0TW9udGggOiBkYXRlID0+IHtcblxuICAgICAgICAgICAgY29uc3QgbW9udGhOYW1lcyA9IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLFxuICAgICAgICAgICAgICBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9udGhOYW1lc1tkYXRlLmdldE1vbnRoKCldXG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9RdWVyeVN0cmluZyA6IChvYmosIHByZWZpeCkgPT4ge1xuICAgICAgICAgICAgdmFyIHN0ciA9IFtdLCBrLCB2O1xuICAgICAgICAgICAgZm9yKHZhciBwIGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KHApKSB7Y29udGludWU7fSAvLyBza2lwIHRoaW5ncyBmcm9tIHRoZSBwcm90b3R5cGVcbiAgICAgICAgICAgICAgICBpZiAofnAuaW5kZXhPZignWycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGsgPSBwcmVmaXggPyBwcmVmaXggKyBcIltcIiArIHAuc3Vic3RyaW5nKDAsIHAuaW5kZXhPZignWycpKSArIFwiXVwiICsgcC5zdWJzdHJpbmcocC5pbmRleE9mKCdbJykpIDogcDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBrID0gcHJlZml4ID8gcHJlZml4ICsgXCJbXCIgKyBwICsgXCJdXCIgOiBwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2ID0gb2JqW3BdO1xuICAgICAgICAgICAgICAgIHN0ci5wdXNoKHR5cGVvZiB2ID09IFwib2JqZWN0XCIgP1xuICAgICAgICAgICAgICAgICAgUGxvdC50b1F1ZXJ5U3RyaW5nKHYsIGspIDpcbiAgICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHIuam9pbihcIiZcIik7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQbG90XG5cbn0oKSlcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgXG4gICAgU3luY3Njcm9sbFxuXG4gICAgU3luY3Njcm9sbCA9IHtcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBXaWR0aCAgICAgICAgICAgPSAnV2lkdGgnLFxuICAgICAgICAgICAgSGVpZ2h0ICAgICAgICAgICAgICA9ICdIZWlnaHQnLFxuICAgICAgICAgICAgVG9wICAgICAgICAgICAgICAgICA9ICdUb3AnLFxuICAgICAgICAgICAgTGVmdCAgICAgICAgICAgICAgICA9ICdMZWZ0JyxcbiAgICAgICAgICAgIHNjcm9sbCAgICAgICAgICAgICAgPSAnc2Nyb2xsJyxcbiAgICAgICAgICAgIGNsaWVudCAgICAgICAgICAgICAgPSAnY2xpZW50JyxcbiAgICAgICAgICAgIEV2ZW50TGlzdGVuZXIgICAgICAgPSAnRXZlbnRMaXN0ZW5lcicsXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyICAgID0gJ2FkZCcgKyBFdmVudExpc3RlbmVyLFxuICAgICAgICAgICAgbGVuZ3RoICAgICAgICAgICAgICA9ICdsZW5ndGgnLFxuICAgICAgICAgICAgTWF0aF9yb3VuZCAgICAgICAgICA9IE1hdGgucm91bmQsXG4gICAgICAgICAgICBuYW1lcyAgICAgICAgICAgICAgID0ge30sXG4gICAgICAgICAgICByZXNldCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3luYycrc2Nyb2xsKVxuXG4gICAgICAgICAgICAgICAgLy8gY2xlYXJpbmcgZXhpc3RpbmcgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgdmFyIGksIGosIGVsLCBmb3VuZCwgbmFtZVxuICAgICAgICAgICAgICAgIGZvciAobmFtZSBpbiBuYW1lcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBuYW1lc1tuYW1lXVtsZW5ndGhdOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lc1tuYW1lXVtpXVsncmVtb3ZlJytFdmVudExpc3RlbmVyXShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsLCBuYW1lc1tuYW1lXVtpXS5zeW4sIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBzZXR0aW5nLXVwIHRoZSBuZXcgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGVsZW1zW2xlbmd0aF07KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gaiA9IDBcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBlbGVtc1tpKytdXG4gICAgICAgICAgICAgICAgICAgIGlmICghKG5hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoJ25hbWUnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hbWUgYXR0cmlidXRlIGlzIG5vdCBzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsW3Njcm9sbCsnZXInXXx8ZWwgIC8vIG5lZWRlZCBmb3IgaW50ZW5jZVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlYXJjaGluZyBmb3IgZXhpc3RpbmcgZW50cnkgaW4gYXJyYXkgb2YgbmFtZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNlYXJjaGluZyBmb3IgdGhlIGVsZW1lbnQgaW4gdGhhdCBlbnRyeVxuICAgICAgICAgICAgICAgICAgICBmb3IgKDtqIDwgKG5hbWVzW25hbWVdID0gbmFtZXNbbmFtZV18fFtdKVtsZW5ndGhdOykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgfD0gbmFtZXNbbmFtZV1baisrXSA9PSBlbFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNbbmFtZV0ucHVzaChlbClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsLmVYID0gZWwuZVkgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihlbCwgbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxbYWRkRXZlbnRMaXN0ZW5lcl0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN5biA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbXMgPSBuYW1lc1tuYW1lXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxYID0gZWxbc2Nyb2xsK0xlZnRdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxZID0gZWxbc2Nyb2xsK1RvcF1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeFJhdGUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsWCAvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZWxbc2Nyb2xsK1dpZHRoXSAtIGVsW2NsaWVudCtXaWR0aF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5UmF0ZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxZIC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbFtzY3JvbGwrSGVpZ2h0XSAtIGVsW2NsaWVudCtIZWlnaHRdKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cGRhdGVYID0gc2Nyb2xsWCAhPSBlbC5lWFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlWSA9IHNjcm9sbFkgIT0gZWwuZVlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3RoZXJFbCwgaSA9IDBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5lWCA9IHNjcm9sbFhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuZVkgPSBzY3JvbGxZXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7aSA8IGVsZW1zW2xlbmd0aF07KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsID0gZWxlbXNbaSsrXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyRWwgIT0gZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlWCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoX3JvdW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbFtzY3JvbGwrTGVmdF0gLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNjcm9sbFggPSBvdGhlckVsLmVYID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoX3JvdW5kKHhSYXRlICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG90aGVyRWxbc2Nyb2xsK1dpZHRoXSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW2NsaWVudCtXaWR0aF0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbc2Nyb2xsK0xlZnRdID0gc2Nyb2xsWFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlWSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoX3JvdW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbFtzY3JvbGwrVG9wXSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc2Nyb2xsWSA9IG90aGVyRWwuZVkgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoeVJhdGUgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3RoZXJFbFtzY3JvbGwrSGVpZ2h0XSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW2NsaWVudCtIZWlnaHRdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW3Njcm9sbCtUb3BdID0gc2Nyb2xsWVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDBcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSkoZWwsIG5hbWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgIHJlc2V0KClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93W2FkZEV2ZW50TGlzdGVuZXJdKFwibG9hZFwiLCByZXNldCwgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gU3luY3Njcm9sbFxuXG59KCkpXG4iLCIvKipcbiAqIG1hdGNoZXNTZWxlY3RvciB2Mi4wLjJcbiAqIG1hdGNoZXNTZWxlY3RvciggZWxlbWVudCwgJy5zZWxlY3RvcicgKVxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlICovXG4gICd1c2Ugc3RyaWN0JztcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3IgPSBmYWN0b3J5KCk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1hdGNoZXNNZXRob2QgPSAoIGZ1bmN0aW9uKCkge1xuICAgIHZhciBFbGVtUHJvdG8gPSB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGU7XG4gICAgLy8gY2hlY2sgZm9yIHRoZSBzdGFuZGFyZCBtZXRob2QgbmFtZSBmaXJzdFxuICAgIGlmICggRWxlbVByb3RvLm1hdGNoZXMgKSB7XG4gICAgICByZXR1cm4gJ21hdGNoZXMnO1xuICAgIH1cbiAgICAvLyBjaGVjayB1bi1wcmVmaXhlZFxuICAgIGlmICggRWxlbVByb3RvLm1hdGNoZXNTZWxlY3RvciApIHtcbiAgICAgIHJldHVybiAnbWF0Y2hlc1NlbGVjdG9yJztcbiAgICB9XG4gICAgLy8gY2hlY2sgdmVuZG9yIHByZWZpeGVzXG4gICAgdmFyIHByZWZpeGVzID0gWyAnd2Via2l0JywgJ21veicsICdtcycsICdvJyBdO1xuXG4gICAgZm9yICggdmFyIGk9MDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIHByZWZpeCA9IHByZWZpeGVzW2ldO1xuICAgICAgdmFyIG1ldGhvZCA9IHByZWZpeCArICdNYXRjaGVzU2VsZWN0b3InO1xuICAgICAgaWYgKCBFbGVtUHJvdG9bIG1ldGhvZCBdICkge1xuICAgICAgICByZXR1cm4gbWV0aG9kO1xuICAgICAgfVxuICAgIH1cbiAgfSkoKTtcblxuICByZXR1cm4gZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBzZWxlY3RvciApIHtcbiAgICByZXR1cm4gZWxlbVsgbWF0Y2hlc01ldGhvZCBdKCBzZWxlY3RvciApO1xuICB9O1xuXG59KSk7XG4iLCIvKipcbiAqIEV2RW1pdHRlciB2MS4xLjBcbiAqIExpbCcgZXZlbnQgZW1pdHRlclxuICogTUlUIExpY2Vuc2VcbiAqL1xuXG4vKiBqc2hpbnQgdW51c2VkOiB0cnVlLCB1bmRlZjogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qIGdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHdpbmRvdyAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRCAtIFJlcXVpcmVKU1xuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTIC0gQnJvd3NlcmlmeSwgV2VicGFja1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIGdsb2JhbC5FdkVtaXR0ZXIgPSBmYWN0b3J5KCk7XG4gIH1cblxufSggdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gRXZFbWl0dGVyKCkge31cblxudmFyIHByb3RvID0gRXZFbWl0dGVyLnByb3RvdHlwZTtcblxucHJvdG8ub24gPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgaWYgKCAhZXZlbnROYW1lIHx8ICFsaXN0ZW5lciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gc2V0IGV2ZW50cyBoYXNoXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIC8vIHNldCBsaXN0ZW5lcnMgYXJyYXlcbiAgdmFyIGxpc3RlbmVycyA9IGV2ZW50c1sgZXZlbnROYW1lIF0gPSBldmVudHNbIGV2ZW50TmFtZSBdIHx8IFtdO1xuICAvLyBvbmx5IGFkZCBvbmNlXG4gIGlmICggbGlzdGVuZXJzLmluZGV4T2YoIGxpc3RlbmVyICkgPT0gLTEgKSB7XG4gICAgbGlzdGVuZXJzLnB1c2goIGxpc3RlbmVyICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLm9uY2UgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgaWYgKCAhZXZlbnROYW1lIHx8ICFsaXN0ZW5lciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gYWRkIGV2ZW50XG4gIHRoaXMub24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgLy8gc2V0IG9uY2UgZmxhZ1xuICAvLyBzZXQgb25jZUV2ZW50cyBoYXNoXG4gIHZhciBvbmNlRXZlbnRzID0gdGhpcy5fb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgfHwge307XG4gIC8vIHNldCBvbmNlTGlzdGVuZXJzIG9iamVjdFxuICB2YXIgb25jZUxpc3RlbmVycyA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdID0gb25jZUV2ZW50c1sgZXZlbnROYW1lIF0gfHwge307XG4gIC8vIHNldCBmbGFnXG4gIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF0gPSB0cnVlO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ub2ZmID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXTtcbiAgaWYgKCAhbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZiggbGlzdGVuZXIgKTtcbiAgaWYgKCBpbmRleCAhPSAtMSApIHtcbiAgICBsaXN0ZW5lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5lbWl0RXZlbnQgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBhcmdzICkge1xuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF07XG4gIGlmICggIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gY29weSBvdmVyIHRvIGF2b2lkIGludGVyZmVyZW5jZSBpZiAub2ZmKCkgaW4gbGlzdGVuZXJcbiAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKDApO1xuICBhcmdzID0gYXJncyB8fCBbXTtcbiAgLy8gb25jZSBzdHVmZlxuICB2YXIgb25jZUxpc3RlbmVycyA9IHRoaXMuX29uY2VFdmVudHMgJiYgdGhpcy5fb25jZUV2ZW50c1sgZXZlbnROYW1lIF07XG5cbiAgZm9yICggdmFyIGk9MDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV1cbiAgICB2YXIgaXNPbmNlID0gb25jZUxpc3RlbmVycyAmJiBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdO1xuICAgIGlmICggaXNPbmNlICkge1xuICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyXG4gICAgICAvLyByZW1vdmUgYmVmb3JlIHRyaWdnZXIgdG8gcHJldmVudCByZWN1cnNpb25cbiAgICAgIHRoaXMub2ZmKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gICAgICAvLyB1bnNldCBvbmNlIGZsYWdcbiAgICAgIGRlbGV0ZSBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdO1xuICAgIH1cbiAgICAvLyB0cmlnZ2VyIGxpc3RlbmVyXG4gICAgbGlzdGVuZXIuYXBwbHkoIHRoaXMsIGFyZ3MgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8uYWxsT2ZmID0gZnVuY3Rpb24oKSB7XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHM7XG4gIGRlbGV0ZSB0aGlzLl9vbmNlRXZlbnRzO1xufTtcblxucmV0dXJuIEV2RW1pdHRlcjtcblxufSkpO1xuIiwiLyoqXG4gKiBGaXp6eSBVSSB1dGlscyB2Mi4wLjdcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qanNoaW50IHN0cmljdDogZmFsc2UgKi8gLypnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCByZXF1aXJlICovXG5cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdkZXNhbmRyby1tYXRjaGVzLXNlbGVjdG9yL21hdGNoZXMtc2VsZWN0b3InXG4gICAgXSwgZnVuY3Rpb24oIG1hdGNoZXNTZWxlY3RvciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIG1hdGNoZXNTZWxlY3RvciApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3RvcicpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5maXp6eVVJVXRpbHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93Lm1hdGNoZXNTZWxlY3RvclxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIG1hdGNoZXNTZWxlY3RvciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSB7fTtcblxuLy8gLS0tLS0gZXh0ZW5kIC0tLS0tIC8vXG5cbi8vIGV4dGVuZHMgb2JqZWN0c1xudXRpbHMuZXh0ZW5kID0gZnVuY3Rpb24oIGEsIGIgKSB7XG4gIGZvciAoIHZhciBwcm9wIGluIGIgKSB7XG4gICAgYVsgcHJvcCBdID0gYlsgcHJvcCBdO1xuICB9XG4gIHJldHVybiBhO1xufTtcblxuLy8gLS0tLS0gbW9kdWxvIC0tLS0tIC8vXG5cbnV0aWxzLm1vZHVsbyA9IGZ1bmN0aW9uKCBudW0sIGRpdiApIHtcbiAgcmV0dXJuICggKCBudW0gJSBkaXYgKSArIGRpdiApICUgZGl2O1xufTtcblxuLy8gLS0tLS0gbWFrZUFycmF5IC0tLS0tIC8vXG5cbnZhciBhcnJheVNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4vLyB0dXJuIGVsZW1lbnQgb3Igbm9kZUxpc3QgaW50byBhbiBhcnJheVxudXRpbHMubWFrZUFycmF5ID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgaWYgKCBBcnJheS5pc0FycmF5KCBvYmogKSApIHtcbiAgICAvLyB1c2Ugb2JqZWN0IGlmIGFscmVhZHkgYW4gYXJyYXlcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIC8vIHJldHVybiBlbXB0eSBhcnJheSBpZiB1bmRlZmluZWQgb3IgbnVsbC4gIzZcbiAgaWYgKCBvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQgKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIGlzQXJyYXlMaWtlID0gdHlwZW9mIG9iaiA9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmxlbmd0aCA9PSAnbnVtYmVyJztcbiAgaWYgKCBpc0FycmF5TGlrZSApIHtcbiAgICAvLyBjb252ZXJ0IG5vZGVMaXN0IHRvIGFycmF5XG4gICAgcmV0dXJuIGFycmF5U2xpY2UuY2FsbCggb2JqICk7XG4gIH1cblxuICAvLyBhcnJheSBvZiBzaW5nbGUgaW5kZXhcbiAgcmV0dXJuIFsgb2JqIF07XG59O1xuXG4vLyAtLS0tLSByZW1vdmVGcm9tIC0tLS0tIC8vXG5cbnV0aWxzLnJlbW92ZUZyb20gPSBmdW5jdGlvbiggYXJ5LCBvYmogKSB7XG4gIHZhciBpbmRleCA9IGFyeS5pbmRleE9mKCBvYmogKTtcbiAgaWYgKCBpbmRleCAhPSAtMSApIHtcbiAgICBhcnkuc3BsaWNlKCBpbmRleCwgMSApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBnZXRQYXJlbnQgLS0tLS0gLy9cblxudXRpbHMuZ2V0UGFyZW50ID0gZnVuY3Rpb24oIGVsZW0sIHNlbGVjdG9yICkge1xuICB3aGlsZSAoIGVsZW0ucGFyZW50Tm9kZSAmJiBlbGVtICE9IGRvY3VtZW50LmJvZHkgKSB7XG4gICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICBpZiAoIG1hdGNoZXNTZWxlY3RvciggZWxlbSwgc2VsZWN0b3IgKSApIHtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0gZ2V0UXVlcnlFbGVtZW50IC0tLS0tIC8vXG5cbi8vIHVzZSBlbGVtZW50IGFzIHNlbGVjdG9yIHN0cmluZ1xudXRpbHMuZ2V0UXVlcnlFbGVtZW50ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIGlmICggdHlwZW9mIGVsZW0gPT0gJ3N0cmluZycgKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGVsZW0gKTtcbiAgfVxuICByZXR1cm4gZWxlbTtcbn07XG5cbi8vIC0tLS0tIGhhbmRsZUV2ZW50IC0tLS0tIC8vXG5cbi8vIGVuYWJsZSAub250eXBlIHRvIHRyaWdnZXIgZnJvbSAuYWRkRXZlbnRMaXN0ZW5lciggZWxlbSwgJ3R5cGUnIClcbnV0aWxzLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGZpbHRlckZpbmRFbGVtZW50cyAtLS0tLSAvL1xuXG51dGlscy5maWx0ZXJGaW5kRWxlbWVudHMgPSBmdW5jdGlvbiggZWxlbXMsIHNlbGVjdG9yICkge1xuICAvLyBtYWtlIGFycmF5IG9mIGVsZW1zXG4gIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBlbGVtcyApO1xuICB2YXIgZmZFbGVtcyA9IFtdO1xuXG4gIGVsZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIC8vIGNoZWNrIHRoYXQgZWxlbSBpcyBhbiBhY3R1YWwgZWxlbWVudFxuICAgIGlmICggISggZWxlbSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICkgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGFkZCBlbGVtIGlmIG5vIHNlbGVjdG9yXG4gICAgaWYgKCAhc2VsZWN0b3IgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGVsZW0gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gZmlsdGVyICYgZmluZCBpdGVtcyBpZiB3ZSBoYXZlIGEgc2VsZWN0b3JcbiAgICAvLyBmaWx0ZXJcbiAgICBpZiAoIG1hdGNoZXNTZWxlY3RvciggZWxlbSwgc2VsZWN0b3IgKSApIHtcbiAgICAgIGZmRWxlbXMucHVzaCggZWxlbSApO1xuICAgIH1cbiAgICAvLyBmaW5kIGNoaWxkcmVuXG4gICAgdmFyIGNoaWxkRWxlbXMgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIHNlbGVjdG9yICk7XG4gICAgLy8gY29uY2F0IGNoaWxkRWxlbXMgdG8gZmlsdGVyRm91bmQgYXJyYXlcbiAgICBmb3IgKCB2YXIgaT0wOyBpIDwgY2hpbGRFbGVtcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGZmRWxlbXMucHVzaCggY2hpbGRFbGVtc1tpXSApO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGZmRWxlbXM7XG59O1xuXG4vLyAtLS0tLSBkZWJvdW5jZU1ldGhvZCAtLS0tLSAvL1xuXG51dGlscy5kZWJvdW5jZU1ldGhvZCA9IGZ1bmN0aW9uKCBfY2xhc3MsIG1ldGhvZE5hbWUsIHRocmVzaG9sZCApIHtcbiAgdGhyZXNob2xkID0gdGhyZXNob2xkIHx8IDEwMDtcbiAgLy8gb3JpZ2luYWwgbWV0aG9kXG4gIHZhciBtZXRob2QgPSBfY2xhc3MucHJvdG90eXBlWyBtZXRob2ROYW1lIF07XG4gIHZhciB0aW1lb3V0TmFtZSA9IG1ldGhvZE5hbWUgKyAnVGltZW91dCc7XG5cbiAgX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpbWVvdXQgPSB0aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIGNsZWFyVGltZW91dCggdGltZW91dCApO1xuXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzWyB0aW1lb3V0TmFtZSBdID0gc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICBtZXRob2QuYXBwbHkoIF90aGlzLCBhcmdzICk7XG4gICAgICBkZWxldGUgX3RoaXNbIHRpbWVvdXROYW1lIF07XG4gICAgfSwgdGhyZXNob2xkICk7XG4gIH07XG59O1xuXG4vLyAtLS0tLSBkb2NSZWFkeSAtLS0tLSAvL1xuXG51dGlscy5kb2NSZWFkeSA9IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcbiAgdmFyIHJlYWR5U3RhdGUgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuICBpZiAoIHJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJyB8fCByZWFkeVN0YXRlID09ICdpbnRlcmFjdGl2ZScgKSB7XG4gICAgLy8gZG8gYXN5bmMgdG8gYWxsb3cgZm9yIG90aGVyIHNjcmlwdHMgdG8gcnVuLiBtZXRhZml6enkvZmxpY2tpdHkjNDQxXG4gICAgc2V0VGltZW91dCggY2FsbGJhY2sgKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnRE9NQ29udGVudExvYWRlZCcsIGNhbGxiYWNrICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGh0bWxJbml0IC0tLS0tIC8vXG5cbi8vIGh0dHA6Ly9qYW1lc3JvYmVydHMubmFtZS9ibG9nLzIwMTAvMDIvMjIvc3RyaW5nLWZ1bmN0aW9ucy1mb3ItamF2YXNjcmlwdC10cmltLXRvLWNhbWVsLWNhc2UtdG8tZGFzaGVkLWFuZC10by11bmRlcnNjb3JlL1xudXRpbHMudG9EYXNoZWQgPSBmdW5jdGlvbiggc3RyICkge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoIC8oLikoW0EtWl0pL2csIGZ1bmN0aW9uKCBtYXRjaCwgJDEsICQyICkge1xuICAgIHJldHVybiAkMSArICctJyArICQyO1xuICB9KS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbi8qKlxuICogYWxsb3cgdXNlciB0byBpbml0aWFsaXplIGNsYXNzZXMgdmlhIFtkYXRhLW5hbWVzcGFjZV0gb3IgLmpzLW5hbWVzcGFjZSBjbGFzc1xuICogaHRtbEluaXQoIFdpZGdldCwgJ3dpZGdldE5hbWUnIClcbiAqIG9wdGlvbnMgYXJlIHBhcnNlZCBmcm9tIGRhdGEtbmFtZXNwYWNlLW9wdGlvbnNcbiAqL1xudXRpbHMuaHRtbEluaXQgPSBmdW5jdGlvbiggV2lkZ2V0Q2xhc3MsIG5hbWVzcGFjZSApIHtcbiAgdXRpbHMuZG9jUmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXNoZWROYW1lc3BhY2UgPSB1dGlscy50b0Rhc2hlZCggbmFtZXNwYWNlICk7XG4gICAgdmFyIGRhdGFBdHRyID0gJ2RhdGEtJyArIGRhc2hlZE5hbWVzcGFjZTtcbiAgICB2YXIgZGF0YUF0dHJFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICdbJyArIGRhdGFBdHRyICsgJ10nICk7XG4gICAgdmFyIGpzRGFzaEVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5qcy0nICsgZGFzaGVkTmFtZXNwYWNlICk7XG4gICAgdmFyIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBkYXRhQXR0ckVsZW1zIClcbiAgICAgIC5jb25jYXQoIHV0aWxzLm1ha2VBcnJheSgganNEYXNoRWxlbXMgKSApO1xuICAgIHZhciBkYXRhT3B0aW9uc0F0dHIgPSBkYXRhQXR0ciArICctb3B0aW9ucyc7XG4gICAgdmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG5cbiAgICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHZhciBhdHRyID0gZWxlbS5nZXRBdHRyaWJ1dGUoIGRhdGFBdHRyICkgfHxcbiAgICAgICAgZWxlbS5nZXRBdHRyaWJ1dGUoIGRhdGFPcHRpb25zQXR0ciApO1xuICAgICAgdmFyIG9wdGlvbnM7XG4gICAgICB0cnkge1xuICAgICAgICBvcHRpb25zID0gYXR0ciAmJiBKU09OLnBhcnNlKCBhdHRyICk7XG4gICAgICB9IGNhdGNoICggZXJyb3IgKSB7XG4gICAgICAgIC8vIGxvZyBlcnJvciwgZG8gbm90IGluaXRpYWxpemVcbiAgICAgICAgaWYgKCBjb25zb2xlICkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoICdFcnJvciBwYXJzaW5nICcgKyBkYXRhQXR0ciArICcgb24gJyArIGVsZW0uY2xhc3NOYW1lICtcbiAgICAgICAgICAnOiAnICsgZXJyb3IgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBpbml0aWFsaXplXG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgV2lkZ2V0Q2xhc3MoIGVsZW0sIG9wdGlvbnMgKTtcbiAgICAgIC8vIG1ha2UgYXZhaWxhYmxlIHZpYSAkKCkuZGF0YSgnbmFtZXNwYWNlJylcbiAgICAgIGlmICggalF1ZXJ5ICkge1xuICAgICAgICBqUXVlcnkuZGF0YSggZWxlbSwgbmFtZXNwYWNlLCBpbnN0YW5jZSApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH0pO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiB1dGlscztcblxufSkpO1xuIiwiLyohXG4gKiBGbGlja2l0eSBpbWFnZXNMb2FkZWQgdjIuMC4wXG4gKiBlbmFibGVzIGltYWdlc0xvYWRlZCBvcHRpb24gZm9yIEZsaWNraXR5XG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qanNoaW50IHN0cmljdDogZmFsc2UgKi8gLypnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCByZXF1aXJlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZmxpY2tpdHkvanMvaW5kZXgnLFxuICAgICAgJ2ltYWdlc2xvYWRlZC9pbWFnZXNsb2FkZWQnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCBpbWFnZXNMb2FkZWQgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgaW1hZ2VzTG9hZGVkICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdmbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgnaW1hZ2VzbG9hZGVkJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkZsaWNraXR5ID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5pbWFnZXNMb2FkZWRcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgaW1hZ2VzTG9hZGVkICkge1xuJ3VzZSBzdHJpY3QnO1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVJbWFnZXNMb2FkZWQnKTtcblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG5wcm90by5fY3JlYXRlSW1hZ2VzTG9hZGVkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMuaW1hZ2VzTG9hZGVkICk7XG59O1xuXG5wcm90by5pbWFnZXNMb2FkZWQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmltYWdlc0xvYWRlZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIF90aGlzID0gdGhpcztcbiAgZnVuY3Rpb24gb25JbWFnZXNMb2FkZWRQcm9ncmVzcyggaW5zdGFuY2UsIGltYWdlICkge1xuICAgIHZhciBjZWxsID0gX3RoaXMuZ2V0UGFyZW50Q2VsbCggaW1hZ2UuaW1nICk7XG4gICAgX3RoaXMuY2VsbFNpemVDaGFuZ2UoIGNlbGwgJiYgY2VsbC5lbGVtZW50ICk7XG4gICAgaWYgKCAhX3RoaXMub3B0aW9ucy5mcmVlU2Nyb2xsICkge1xuICAgICAgX3RoaXMucG9zaXRpb25TbGlkZXJBdFNlbGVjdGVkKCk7XG4gICAgfVxuICB9XG4gIGltYWdlc0xvYWRlZCggdGhpcy5zbGlkZXIgKS5vbiggJ3Byb2dyZXNzJywgb25JbWFnZXNMb2FkZWRQcm9ncmVzcyApO1xufTtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBhZGQsIHJlbW92ZSBjZWxsXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgdXRpbHMgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gYXBwZW5kIGNlbGxzIHRvIGEgZG9jdW1lbnQgZnJhZ21lbnRcbmZ1bmN0aW9uIGdldENlbGxzRnJhZ21lbnQoIGNlbGxzICkge1xuICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCBjZWxsLmVsZW1lbnQgKTtcbiAgfSk7XG4gIHJldHVybiBmcmFnbWVudDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYWRkL3JlbW92ZSBjZWxsIHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbi8qKlxuICogSW5zZXJ0LCBwcmVwZW5kLCBvciBhcHBlbmQgY2VsbHNcbiAqIEBwYXJhbSB7RWxlbWVudCwgQXJyYXksIE5vZGVMaXN0fSBlbGVtc1xuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleFxuICovXG5wcm90by5pbnNlcnQgPSBmdW5jdGlvbiggZWxlbXMsIGluZGV4ICkge1xuICB2YXIgY2VsbHMgPSB0aGlzLl9tYWtlQ2VsbHMoIGVsZW1zICk7XG4gIGlmICggIWNlbGxzIHx8ICFjZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW4gPSB0aGlzLmNlbGxzLmxlbmd0aDtcbiAgLy8gZGVmYXVsdCB0byBhcHBlbmRcbiAgaW5kZXggPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gbGVuIDogaW5kZXg7XG4gIC8vIGFkZCBjZWxscyB3aXRoIGRvY3VtZW50IGZyYWdtZW50XG4gIHZhciBmcmFnbWVudCA9IGdldENlbGxzRnJhZ21lbnQoIGNlbGxzICk7XG4gIC8vIGFwcGVuZCB0byBzbGlkZXJcbiAgdmFyIGlzQXBwZW5kID0gaW5kZXggPT0gbGVuO1xuICBpZiAoIGlzQXBwZW5kICkge1xuICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKCBmcmFnbWVudCApO1xuICB9IGVsc2Uge1xuICAgIHZhciBpbnNlcnRDZWxsRWxlbWVudCA9IHRoaXMuY2VsbHNbIGluZGV4IF0uZWxlbWVudDtcbiAgICB0aGlzLnNsaWRlci5pbnNlcnRCZWZvcmUoIGZyYWdtZW50LCBpbnNlcnRDZWxsRWxlbWVudCApO1xuICB9XG4gIC8vIGFkZCB0byB0aGlzLmNlbGxzXG4gIGlmICggaW5kZXggPT09IDAgKSB7XG4gICAgLy8gcHJlcGVuZCwgYWRkIHRvIHN0YXJ0XG4gICAgdGhpcy5jZWxscyA9IGNlbGxzLmNvbmNhdCggdGhpcy5jZWxscyApO1xuICB9IGVsc2UgaWYgKCBpc0FwcGVuZCApIHtcbiAgICAvLyBhcHBlbmQsIGFkZCB0byBlbmRcbiAgICB0aGlzLmNlbGxzID0gdGhpcy5jZWxscy5jb25jYXQoIGNlbGxzICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gaW5zZXJ0IGluIHRoaXMuY2VsbHNcbiAgICB2YXIgZW5kQ2VsbHMgPSB0aGlzLmNlbGxzLnNwbGljZSggaW5kZXgsIGxlbiAtIGluZGV4ICk7XG4gICAgdGhpcy5jZWxscyA9IHRoaXMuY2VsbHMuY29uY2F0KCBjZWxscyApLmNvbmNhdCggZW5kQ2VsbHMgKTtcbiAgfVxuXG4gIHRoaXMuX3NpemVDZWxscyggY2VsbHMgKTtcbiAgdGhpcy5jZWxsQ2hhbmdlKCBpbmRleCwgdHJ1ZSApO1xufTtcblxucHJvdG8uYXBwZW5kID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB0aGlzLmluc2VydCggZWxlbXMsIHRoaXMuY2VsbHMubGVuZ3RoICk7XG59O1xuXG5wcm90by5wcmVwZW5kID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB0aGlzLmluc2VydCggZWxlbXMsIDAgKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGNlbGxzXG4gKiBAcGFyYW0ge0VsZW1lbnQsIEFycmF5LCBOb2RlTGlzdH0gZWxlbXNcbiAqL1xucHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB2YXIgY2VsbHMgPSB0aGlzLmdldENlbGxzKCBlbGVtcyApO1xuICBpZiAoICFjZWxscyB8fCAhY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBtaW5DZWxsSW5kZXggPSB0aGlzLmNlbGxzLmxlbmd0aCAtIDE7XG4gIC8vIHJlbW92ZSBjZWxscyBmcm9tIGNvbGxlY3Rpb24gJiBET01cbiAgY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC5yZW1vdmUoKTtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmNlbGxzLmluZGV4T2YoIGNlbGwgKTtcbiAgICBtaW5DZWxsSW5kZXggPSBNYXRoLm1pbiggaW5kZXgsIG1pbkNlbGxJbmRleCApO1xuICAgIHV0aWxzLnJlbW92ZUZyb20oIHRoaXMuY2VsbHMsIGNlbGwgKTtcbiAgfSwgdGhpcyApO1xuXG4gIHRoaXMuY2VsbENoYW5nZSggbWluQ2VsbEluZGV4LCB0cnVlICk7XG59O1xuXG4vKipcbiAqIGxvZ2ljIHRvIGJlIHJ1biBhZnRlciBhIGNlbGwncyBzaXplIGNoYW5nZXNcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbSAtIGNlbGwncyBlbGVtZW50XG4gKi9cbnByb3RvLmNlbGxTaXplQ2hhbmdlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKCBlbGVtICk7XG4gIGlmICggIWNlbGwgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNlbGwuZ2V0U2l6ZSgpO1xuXG4gIHZhciBpbmRleCA9IHRoaXMuY2VsbHMuaW5kZXhPZiggY2VsbCApO1xuICB0aGlzLmNlbGxDaGFuZ2UoIGluZGV4ICk7XG59O1xuXG4vKipcbiAqIGxvZ2ljIGFueSB0aW1lIGEgY2VsbCBpcyBjaGFuZ2VkOiBhZGRlZCwgcmVtb3ZlZCwgb3Igc2l6ZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGNoYW5nZWRDZWxsSW5kZXggLSBpbmRleCBvZiB0aGUgY2hhbmdlZCBjZWxsLCBvcHRpb25hbFxuICovXG5wcm90by5jZWxsQ2hhbmdlID0gZnVuY3Rpb24oIGNoYW5nZWRDZWxsSW5kZXgsIGlzUG9zaXRpb25pbmdTbGlkZXIgKSB7XG4gIHZhciBwcmV2U2VsZWN0ZWRFbGVtID0gdGhpcy5zZWxlY3RlZEVsZW1lbnQ7XG4gIHRoaXMuX3Bvc2l0aW9uQ2VsbHMoIGNoYW5nZWRDZWxsSW5kZXggKTtcbiAgdGhpcy5fZ2V0V3JhcFNoaWZ0Q2VsbHMoKTtcbiAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSgpO1xuICAvLyB1cGRhdGUgc2VsZWN0ZWRJbmRleFxuICAvLyB0cnkgdG8gbWFpbnRhaW4gcG9zaXRpb24gJiBzZWxlY3QgcHJldmlvdXMgc2VsZWN0ZWQgZWxlbWVudFxuICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbCggcHJldlNlbGVjdGVkRWxlbSApO1xuICBpZiAoIGNlbGwgKSB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5nZXRDZWxsU2xpZGVJbmRleCggY2VsbCApO1xuICB9XG4gIHRoaXMuc2VsZWN0ZWRJbmRleCA9IE1hdGgubWluKCB0aGlzLnNsaWRlcy5sZW5ndGggLSAxLCB0aGlzLnNlbGVjdGVkSW5kZXggKTtcblxuICB0aGlzLmVtaXRFdmVudCggJ2NlbGxDaGFuZ2UnLCBbIGNoYW5nZWRDZWxsSW5kZXggXSApO1xuICAvLyBwb3NpdGlvbiBzbGlkZXJcbiAgdGhpcy5zZWxlY3QoIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICAvLyBkbyBub3QgcG9zaXRpb24gc2xpZGVyIGFmdGVyIGxhenkgbG9hZFxuICBpZiAoIGlzUG9zaXRpb25pbmdTbGlkZXIgKSB7XG4gICAgdGhpcy5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gYW5pbWF0ZVxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRmxpY2tpdHkgPSB3aW5kb3cuRmxpY2tpdHkgfHwge307XG4gICAgd2luZG93LkZsaWNraXR5LmFuaW1hdGVQcm90b3R5cGUgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIHV0aWxzICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGFuaW1hdGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIHByb3RvID0ge307XG5cbnByb3RvLnN0YXJ0QW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5pc0FuaW1hdGluZyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcbiAgdGhpcy5yZXN0aW5nRnJhbWVzID0gMDtcbiAgdGhpcy5hbmltYXRlKCk7XG59O1xuXG5wcm90by5hbmltYXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXBwbHlEcmFnRm9yY2UoKTtcbiAgdGhpcy5hcHBseVNlbGVjdGVkQXR0cmFjdGlvbigpO1xuXG4gIHZhciBwcmV2aW91c1ggPSB0aGlzLng7XG5cbiAgdGhpcy5pbnRlZ3JhdGVQaHlzaWNzKCk7XG4gIHRoaXMucG9zaXRpb25TbGlkZXIoKTtcbiAgdGhpcy5zZXR0bGUoIHByZXZpb3VzWCApO1xuICAvLyBhbmltYXRlIG5leHQgZnJhbWVcbiAgaWYgKCB0aGlzLmlzQW5pbWF0aW5nICkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmdW5jdGlvbiBhbmltYXRlRnJhbWUoKSB7XG4gICAgICBfdGhpcy5hbmltYXRlKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbnByb3RvLnBvc2l0aW9uU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciB4ID0gdGhpcy54O1xuICAvLyB3cmFwIHBvc2l0aW9uIGFyb3VuZFxuICBpZiAoIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIHRoaXMuY2VsbHMubGVuZ3RoID4gMSApIHtcbiAgICB4ID0gdXRpbHMubW9kdWxvKCB4LCB0aGlzLnNsaWRlYWJsZVdpZHRoICk7XG4gICAgeCA9IHggLSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICAgIHRoaXMuc2hpZnRXcmFwQ2VsbHMoIHggKTtcbiAgfVxuXG4gIHRoaXMuc2V0VHJhbnNsYXRlWCggeCwgdGhpcy5pc0FuaW1hdGluZyApO1xuICB0aGlzLmRpc3BhdGNoU2Nyb2xsRXZlbnQoKTtcbn07XG5cbnByb3RvLnNldFRyYW5zbGF0ZVggPSBmdW5jdGlvbiggeCwgaXMzZCApIHtcbiAgeCArPSB0aGlzLmN1cnNvclBvc2l0aW9uO1xuICAvLyByZXZlcnNlIGlmIHJpZ2h0LXRvLWxlZnQgYW5kIHVzaW5nIHRyYW5zZm9ybVxuICB4ID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gLXggOiB4O1xuICB2YXIgdHJhbnNsYXRlWCA9IHRoaXMuZ2V0UG9zaXRpb25WYWx1ZSggeCApO1xuICAvLyB1c2UgM0QgdHJhbmZvcm1zIGZvciBoYXJkd2FyZSBhY2NlbGVyYXRpb24gb24gaU9TXG4gIC8vIGJ1dCB1c2UgMkQgd2hlbiBzZXR0bGVkLCBmb3IgYmV0dGVyIGZvbnQtcmVuZGVyaW5nXG4gIHRoaXMuc2xpZGVyLnN0eWxlLnRyYW5zZm9ybSA9IGlzM2QgP1xuICAgICd0cmFuc2xhdGUzZCgnICsgdHJhbnNsYXRlWCArICcsMCwwKScgOiAndHJhbnNsYXRlWCgnICsgdHJhbnNsYXRlWCArICcpJztcbn07XG5cbnByb3RvLmRpc3BhdGNoU2Nyb2xsRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGZpcnN0U2xpZGUgPSB0aGlzLnNsaWRlc1swXTtcbiAgaWYgKCAhZmlyc3RTbGlkZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHBvc2l0aW9uWCA9IC10aGlzLnggLSBmaXJzdFNsaWRlLnRhcmdldDtcbiAgdmFyIHByb2dyZXNzID0gcG9zaXRpb25YIC8gdGhpcy5zbGlkZXNXaWR0aDtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnc2Nyb2xsJywgbnVsbCwgWyBwcm9ncmVzcywgcG9zaXRpb25YIF0gKTtcbn07XG5cbnByb3RvLnBvc2l0aW9uU2xpZGVyQXRTZWxlY3RlZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy54ID0gLXRoaXMuc2VsZWN0ZWRTbGlkZS50YXJnZXQ7XG4gIHRoaXMudmVsb2NpdHkgPSAwOyAvLyBzdG9wIHdvYmJsZVxuICB0aGlzLnBvc2l0aW9uU2xpZGVyKCk7XG59O1xuXG5wcm90by5nZXRQb3NpdGlvblZhbHVlID0gZnVuY3Rpb24oIHBvc2l0aW9uICkge1xuICBpZiAoIHRoaXMub3B0aW9ucy5wZXJjZW50UG9zaXRpb24gKSB7XG4gICAgLy8gcGVyY2VudCBwb3NpdGlvbiwgcm91bmQgdG8gMiBkaWdpdHMsIGxpa2UgMTIuMzQlXG4gICAgcmV0dXJuICggTWF0aC5yb3VuZCggKCBwb3NpdGlvbiAvIHRoaXMuc2l6ZS5pbm5lcldpZHRoICkgKiAxMDAwMCApICogMC4wMSApKyAnJSc7XG4gIH0gZWxzZSB7XG4gICAgLy8gcGl4ZWwgcG9zaXRpb25pbmdcbiAgICByZXR1cm4gTWF0aC5yb3VuZCggcG9zaXRpb24gKSArICdweCc7XG4gIH1cbn07XG5cbnByb3RvLnNldHRsZSA9IGZ1bmN0aW9uKCBwcmV2aW91c1ggKSB7XG4gIC8vIGtlZXAgdHJhY2sgb2YgZnJhbWVzIHdoZXJlIHggaGFzbid0IG1vdmVkXG4gIGlmICggIXRoaXMuaXNQb2ludGVyRG93biAmJiBNYXRoLnJvdW5kKCB0aGlzLnggKiAxMDAgKSA9PSBNYXRoLnJvdW5kKCBwcmV2aW91c1ggKiAxMDAgKSApIHtcbiAgICB0aGlzLnJlc3RpbmdGcmFtZXMrKztcbiAgfVxuICAvLyBzdG9wIGFuaW1hdGluZyBpZiByZXN0aW5nIGZvciAzIG9yIG1vcmUgZnJhbWVzXG4gIGlmICggdGhpcy5yZXN0aW5nRnJhbWVzID4gMiApIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgZGVsZXRlIHRoaXMuaXNGcmVlU2Nyb2xsaW5nO1xuICAgIC8vIHJlbmRlciBwb3NpdGlvbiB3aXRoIHRyYW5zbGF0ZVggd2hlbiBzZXR0bGVkXG4gICAgdGhpcy5wb3NpdGlvblNsaWRlcigpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3NldHRsZScsIG51bGwsIFsgdGhpcy5zZWxlY3RlZEluZGV4IF0gKTtcbiAgfVxufTtcblxucHJvdG8uc2hpZnRXcmFwQ2VsbHMgPSBmdW5jdGlvbiggeCApIHtcbiAgLy8gc2hpZnQgYmVmb3JlIGNlbGxzXG4gIHZhciBiZWZvcmVHYXAgPSB0aGlzLmN1cnNvclBvc2l0aW9uICsgeDtcbiAgdGhpcy5fc2hpZnRDZWxscyggdGhpcy5iZWZvcmVTaGlmdENlbGxzLCBiZWZvcmVHYXAsIC0xICk7XG4gIC8vIHNoaWZ0IGFmdGVyIGNlbGxzXG4gIHZhciBhZnRlckdhcCA9IHRoaXMuc2l6ZS5pbm5lcldpZHRoIC0gKCB4ICsgdGhpcy5zbGlkZWFibGVXaWR0aCArIHRoaXMuY3Vyc29yUG9zaXRpb24gKTtcbiAgdGhpcy5fc2hpZnRDZWxscyggdGhpcy5hZnRlclNoaWZ0Q2VsbHMsIGFmdGVyR2FwLCAxICk7XG59O1xuXG5wcm90by5fc2hpZnRDZWxscyA9IGZ1bmN0aW9uKCBjZWxscywgZ2FwLCBzaGlmdCApIHtcbiAgZm9yICggdmFyIGk9MDsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBjZWxsID0gY2VsbHNbaV07XG4gICAgdmFyIGNlbGxTaGlmdCA9IGdhcCA+IDAgPyBzaGlmdCA6IDA7XG4gICAgY2VsbC53cmFwU2hpZnQoIGNlbGxTaGlmdCApO1xuICAgIGdhcCAtPSBjZWxsLnNpemUub3V0ZXJXaWR0aDtcbiAgfVxufTtcblxucHJvdG8uX3Vuc2hpZnRDZWxscyA9IGZ1bmN0aW9uKCBjZWxscyApIHtcbiAgaWYgKCAhY2VsbHMgfHwgIWNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yICggdmFyIGk9MDsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrICkge1xuICAgIGNlbGxzW2ldLndyYXBTaGlmdCggMCApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwaHlzaWNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLmludGVncmF0ZVBoeXNpY3MgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHk7XG4gIHRoaXMudmVsb2NpdHkgKj0gdGhpcy5nZXRGcmljdGlvbkZhY3RvcigpO1xufTtcblxucHJvdG8uYXBwbHlGb3JjZSA9IGZ1bmN0aW9uKCBmb3JjZSApIHtcbiAgdGhpcy52ZWxvY2l0eSArPSBmb3JjZTtcbn07XG5cbnByb3RvLmdldEZyaWN0aW9uRmFjdG9yID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAxIC0gdGhpcy5vcHRpb25zWyB0aGlzLmlzRnJlZVNjcm9sbGluZyA/ICdmcmVlU2Nyb2xsRnJpY3Rpb24nIDogJ2ZyaWN0aW9uJyBdO1xufTtcblxucHJvdG8uZ2V0UmVzdGluZ1Bvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIC8vIG15IHRoYW5rcyB0byBTdGV2ZW4gV2l0dGVucywgd2hvIHNpbXBsaWZpZWQgdGhpcyBtYXRoIGdyZWF0bHlcbiAgcmV0dXJuIHRoaXMueCArIHRoaXMudmVsb2NpdHkgLyAoIDEgLSB0aGlzLmdldEZyaWN0aW9uRmFjdG9yKCkgKTtcbn07XG5cbnByb3RvLmFwcGx5RHJhZ0ZvcmNlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnZ2FibGUgfHwgIXRoaXMuaXNQb2ludGVyRG93biApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gY2hhbmdlIHRoZSBwb3NpdGlvbiB0byBkcmFnIHBvc2l0aW9uIGJ5IGFwcGx5aW5nIGZvcmNlXG4gIHZhciBkcmFnVmVsb2NpdHkgPSB0aGlzLmRyYWdYIC0gdGhpcy54O1xuICB2YXIgZHJhZ0ZvcmNlID0gZHJhZ1ZlbG9jaXR5IC0gdGhpcy52ZWxvY2l0eTtcbiAgdGhpcy5hcHBseUZvcmNlKCBkcmFnRm9yY2UgKTtcbn07XG5cbnByb3RvLmFwcGx5U2VsZWN0ZWRBdHRyYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gIC8vIGRvIG5vdCBhdHRyYWN0IGlmIHBvaW50ZXIgZG93biBvciBubyBzbGlkZXNcbiAgdmFyIGRyYWdEb3duID0gdGhpcy5pc0RyYWdnYWJsZSAmJiB0aGlzLmlzUG9pbnRlckRvd247XG4gIGlmICggZHJhZ0Rvd24gfHwgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgfHwgIXRoaXMuc2xpZGVzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGRpc3RhbmNlID0gdGhpcy5zZWxlY3RlZFNsaWRlLnRhcmdldCAqIC0xIC0gdGhpcy54O1xuICB2YXIgZm9yY2UgPSBkaXN0YW5jZSAqIHRoaXMub3B0aW9ucy5zZWxlY3RlZEF0dHJhY3Rpb247XG4gIHRoaXMuYXBwbHlGb3JjZSggZm9yY2UgKTtcbn07XG5cbnJldHVybiBwcm90bztcblxufSkpO1xuIiwiLy8gRmxpY2tpdHkuQ2VsbFxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdnZXQtc2l6ZS9nZXQtc2l6ZSdcbiAgICBdLCBmdW5jdGlvbiggZ2V0U2l6ZSApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIGdldFNpemUgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2dldC1zaXplJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkZsaWNraXR5ID0gd2luZG93LkZsaWNraXR5IHx8IHt9O1xuICAgIHdpbmRvdy5GbGlja2l0eS5DZWxsID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5nZXRTaXplXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgZ2V0U2l6ZSApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBDZWxsKCBlbGVtLCBwYXJlbnQgKSB7XG4gIHRoaXMuZWxlbWVudCA9IGVsZW07XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuXG4gIHRoaXMuY3JlYXRlKCk7XG59XG5cbnZhciBwcm90byA9IENlbGwucHJvdG90eXBlO1xuXG5wcm90by5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSggJ2FyaWEtaGlkZGVuJywgJ3RydWUnICk7XG4gIHRoaXMueCA9IDA7XG4gIHRoaXMuc2hpZnQgPSAwO1xufTtcblxucHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAvLyByZXNldCBzdHlsZVxuICB0aGlzLnVuc2VsZWN0KCk7XG4gIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICcnO1xuICB2YXIgc2lkZSA9IHRoaXMucGFyZW50Lm9yaWdpblNpZGU7XG4gIHRoaXMuZWxlbWVudC5zdHlsZVsgc2lkZSBdID0gJyc7XG59O1xuXG5wcm90by5nZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2l6ZSA9IGdldFNpemUoIHRoaXMuZWxlbWVudCApO1xufTtcblxucHJvdG8uc2V0UG9zaXRpb24gPSBmdW5jdGlvbiggeCApIHtcbiAgdGhpcy54ID0geDtcbiAgdGhpcy51cGRhdGVUYXJnZXQoKTtcbiAgdGhpcy5yZW5kZXJQb3NpdGlvbiggeCApO1xufTtcblxuLy8gc2V0RGVmYXVsdFRhcmdldCB2MSBtZXRob2QsIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LCByZW1vdmUgaW4gdjNcbnByb3RvLnVwZGF0ZVRhcmdldCA9IHByb3RvLnNldERlZmF1bHRUYXJnZXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmdpblByb3BlcnR5ID0gdGhpcy5wYXJlbnQub3JpZ2luU2lkZSA9PSAnbGVmdCcgPyAnbWFyZ2luTGVmdCcgOiAnbWFyZ2luUmlnaHQnO1xuICB0aGlzLnRhcmdldCA9IHRoaXMueCArIHRoaXMuc2l6ZVsgbWFyZ2luUHJvcGVydHkgXSArXG4gICAgdGhpcy5zaXplLndpZHRoICogdGhpcy5wYXJlbnQuY2VsbEFsaWduO1xufTtcblxucHJvdG8ucmVuZGVyUG9zaXRpb24gPSBmdW5jdGlvbiggeCApIHtcbiAgLy8gcmVuZGVyIHBvc2l0aW9uIG9mIGNlbGwgd2l0aCBpbiBzbGlkZXJcbiAgdmFyIHNpZGUgPSB0aGlzLnBhcmVudC5vcmlnaW5TaWRlO1xuICB0aGlzLmVsZW1lbnQuc3R5bGVbIHNpZGUgXSA9IHRoaXMucGFyZW50LmdldFBvc2l0aW9uVmFsdWUoIHggKTtcbn07XG5cbnByb3RvLnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtc2VsZWN0ZWQnKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbn07XG5cbnByb3RvLnVuc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1zZWxlY3RlZCcpO1xuICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCAnYXJpYS1oaWRkZW4nLCAndHJ1ZScgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBmYWN0b3IgLSAwLCAxLCBvciAtMVxuKiovXG5wcm90by53cmFwU2hpZnQgPSBmdW5jdGlvbiggc2hpZnQgKSB7XG4gIHRoaXMuc2hpZnQgPSBzaGlmdDtcbiAgdGhpcy5yZW5kZXJQb3NpdGlvbiggdGhpcy54ICsgdGhpcy5wYXJlbnQuc2xpZGVhYmxlV2lkdGggKiBzaGlmdCApO1xufTtcblxucHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbn07XG5cbnJldHVybiBDZWxsO1xuXG59KSk7XG4iLCIvLyBkcmFnXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJ3VuaWRyYWdnZXIvdW5pZHJhZ2dlcicsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCBVbmlkcmFnZ2VyLCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlkcmFnZ2VyLCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgndW5pZHJhZ2dlcicpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRmxpY2tpdHkgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LlVuaWRyYWdnZXIsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaWRyYWdnZXIsIHV0aWxzICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tIGRlZmF1bHRzIC0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggRmxpY2tpdHkuZGVmYXVsdHMsIHtcbiAgZHJhZ2dhYmxlOiAnPjEnLFxuICBkcmFnVGhyZXNob2xkOiAzLFxufSk7XG5cbi8vIC0tLS0tIGNyZWF0ZSAtLS0tLSAvL1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVEcmFnJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYWcgcHJvdG90eXBlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcbnV0aWxzLmV4dGVuZCggcHJvdG8sIFVuaWRyYWdnZXIucHJvdG90eXBlICk7XG5wcm90by5fdG91Y2hBY3Rpb25WYWx1ZSA9ICdwYW4teSc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgaXNUb3VjaCA9ICdjcmVhdGVUb3VjaCcgaW4gZG9jdW1lbnQ7XG52YXIgaXNUb3VjaG1vdmVTY3JvbGxDYW5jZWxlZCA9IGZhbHNlO1xuXG5wcm90by5fY3JlYXRlRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9uKCAnYWN0aXZhdGUnLCB0aGlzLm9uQWN0aXZhdGVEcmFnICk7XG4gIHRoaXMub24oICd1aUNoYW5nZScsIHRoaXMuX3VpQ2hhbmdlRHJhZyApO1xuICB0aGlzLm9uKCAnZGVhY3RpdmF0ZScsIHRoaXMub25EZWFjdGl2YXRlRHJhZyApO1xuICB0aGlzLm9uKCAnY2VsbENoYW5nZScsIHRoaXMudXBkYXRlRHJhZ2dhYmxlICk7XG4gIC8vIFRPRE8gdXBkYXRlRHJhZ2dhYmxlIG9uIHJlc2l6ZT8gaWYgZ3JvdXBDZWxscyAmIHNsaWRlcyBjaGFuZ2VcbiAgLy8gSEFDSyAtIGFkZCBzZWVtaW5nbHkgaW5ub2N1b3VzIGhhbmRsZXIgdG8gZml4IGlPUyAxMCBzY3JvbGwgYmVoYXZpb3JcbiAgLy8gIzQ1NywgUnViYVhhL1NvcnRhYmxlIzk3M1xuICBpZiAoIGlzVG91Y2ggJiYgIWlzVG91Y2htb3ZlU2Nyb2xsQ2FuY2VsZWQgKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBmdW5jdGlvbigpIHt9KTtcbiAgICBpc1RvdWNobW92ZVNjcm9sbENhbmNlbGVkID0gdHJ1ZTtcbiAgfVxufTtcblxucHJvdG8ub25BY3RpdmF0ZURyYWcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5oYW5kbGVzID0gWyB0aGlzLnZpZXdwb3J0IF07XG4gIHRoaXMuYmluZEhhbmRsZXMoKTtcbiAgdGhpcy51cGRhdGVEcmFnZ2FibGUoKTtcbn07XG5cbnByb3RvLm9uRGVhY3RpdmF0ZURyYWcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy51bmJpbmRIYW5kbGVzKCk7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1kcmFnZ2FibGUnKTtcbn07XG5cbnByb3RvLnVwZGF0ZURyYWdnYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBkaXNhYmxlIGRyYWdnaW5nIGlmIGxlc3MgdGhhbiAyIHNsaWRlcy4gIzI3OFxuICBpZiAoIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUgPT0gJz4xJyApIHtcbiAgICB0aGlzLmlzRHJhZ2dhYmxlID0gdGhpcy5zbGlkZXMubGVuZ3RoID4gMTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlzRHJhZ2dhYmxlID0gdGhpcy5vcHRpb25zLmRyYWdnYWJsZTtcbiAgfVxuICBpZiAoIHRoaXMuaXNEcmFnZ2FibGUgKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWRyYWdnYWJsZScpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1kcmFnZ2FibGUnKTtcbiAgfVxufTtcblxuLy8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbnByb3RvLmJpbmREcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUgPSB0cnVlO1xuICB0aGlzLnVwZGF0ZURyYWdnYWJsZSgpO1xufTtcblxucHJvdG8udW5iaW5kRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlID0gZmFsc2U7XG4gIHRoaXMudXBkYXRlRHJhZ2dhYmxlKCk7XG59O1xuXG5wcm90by5fdWlDaGFuZ2VEcmFnID0gZnVuY3Rpb24oKSB7XG4gIGRlbGV0ZSB0aGlzLmlzRnJlZVNjcm9sbGluZztcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBvaW50ZXIgZXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLnBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBpZiAoICF0aGlzLmlzRHJhZ2dhYmxlICkge1xuICAgIHRoaXMuX3BvaW50ZXJEb3duRGVmYXVsdCggZXZlbnQsIHBvaW50ZXIgKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGlzT2theSA9IHRoaXMub2theVBvaW50ZXJEb3duKCBldmVudCApO1xuICBpZiAoICFpc09rYXkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5fcG9pbnRlckRvd25QcmV2ZW50RGVmYXVsdCggZXZlbnQgKTtcbiAgdGhpcy5wb2ludGVyRG93bkZvY3VzKCBldmVudCApO1xuICAvLyBibHVyXG4gIGlmICggZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSB0aGlzLmVsZW1lbnQgKSB7XG4gICAgLy8gZG8gbm90IGJsdXIgaWYgYWxyZWFkeSBmb2N1c2VkXG4gICAgdGhpcy5wb2ludGVyRG93bkJsdXIoKTtcbiAgfVxuXG4gIC8vIHN0b3AgaWYgaXQgd2FzIG1vdmluZ1xuICB0aGlzLmRyYWdYID0gdGhpcy54O1xuICB0aGlzLnZpZXdwb3J0LmNsYXNzTGlzdC5hZGQoJ2lzLXBvaW50ZXItZG93bicpO1xuICAvLyB0cmFjayBzY3JvbGxpbmdcbiAgdGhpcy5wb2ludGVyRG93blNjcm9sbCA9IGdldFNjcm9sbFBvc2l0aW9uKCk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgdGhpcyApO1xuXG4gIHRoaXMuX3BvaW50ZXJEb3duRGVmYXVsdCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIGRlZmF1bHQgcG9pbnRlckRvd24gbG9naWMsIHVzZWQgZm9yIHN0YXRpY0NsaWNrXG5wcm90by5fcG9pbnRlckRvd25EZWZhdWx0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyB0cmFjayBzdGFydCBldmVudCBwb3NpdGlvblxuICAvLyBTYWZhcmkgOSBvdmVycmlkZXMgcGFnZVggYW5kIHBhZ2VZLiBUaGVzZSB2YWx1ZXMgbmVlZHMgdG8gYmUgY29waWVkLiAjNzc5XG4gIHRoaXMucG9pbnRlckRvd25Qb2ludGVyID0ge1xuICAgIHBhZ2VYOiBwb2ludGVyLnBhZ2VYLFxuICAgIHBhZ2VZOiBwb2ludGVyLnBhZ2VZLFxuICB9O1xuICAvLyBiaW5kIG1vdmUgYW5kIGVuZCBldmVudHNcbiAgdGhpcy5fYmluZFBvc3RTdGFydEV2ZW50cyggZXZlbnQgKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAncG9pbnRlckRvd24nLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbn07XG5cbnZhciBmb2N1c05vZGVzID0ge1xuICBJTlBVVDogdHJ1ZSxcbiAgVEVYVEFSRUE6IHRydWUsXG4gIFNFTEVDVDogdHJ1ZSxcbn07XG5cbnByb3RvLnBvaW50ZXJEb3duRm9jdXMgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBpc0ZvY3VzTm9kZSA9IGZvY3VzTm9kZXNbIGV2ZW50LnRhcmdldC5ub2RlTmFtZSBdO1xuICBpZiAoICFpc0ZvY3VzTm9kZSApIHtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cbn07XG5cbnByb3RvLl9wb2ludGVyRG93blByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgaXNUb3VjaFN0YXJ0ID0gZXZlbnQudHlwZSA9PSAndG91Y2hzdGFydCc7XG4gIHZhciBpc1RvdWNoUG9pbnRlciA9IGV2ZW50LnBvaW50ZXJUeXBlID09ICd0b3VjaCc7XG4gIHZhciBpc0ZvY3VzTm9kZSA9IGZvY3VzTm9kZXNbIGV2ZW50LnRhcmdldC5ub2RlTmFtZSBdO1xuICBpZiAoICFpc1RvdWNoU3RhcnQgJiYgIWlzVG91Y2hQb2ludGVyICYmICFpc0ZvY3VzTm9kZSApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBtb3ZlIC0tLS0tIC8vXG5cbnByb3RvLmhhc0RyYWdTdGFydGVkID0gZnVuY3Rpb24oIG1vdmVWZWN0b3IgKSB7XG4gIHJldHVybiBNYXRoLmFicyggbW92ZVZlY3Rvci54ICkgPiB0aGlzLm9wdGlvbnMuZHJhZ1RocmVzaG9sZDtcbn07XG5cbi8vIC0tLS0tIHVwIC0tLS0tIC8vXG5cbnByb3RvLnBvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgZGVsZXRlIHRoaXMuaXNUb3VjaFNjcm9sbGluZztcbiAgdGhpcy52aWV3cG9ydC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1wb2ludGVyLWRvd24nKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAncG9pbnRlclVwJywgZXZlbnQsIFsgcG9pbnRlciBdICk7XG4gIHRoaXMuX2RyYWdQb2ludGVyVXAoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5wb2ludGVyRG9uZSA9IGZ1bmN0aW9uKCkge1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHRoaXMgKTtcbiAgZGVsZXRlIHRoaXMucG9pbnRlckRvd25TY3JvbGw7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkcmFnZ2luZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by5kcmFnU3RhcnQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnZ2FibGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gPSB0aGlzLng7XG4gIHRoaXMuc3RhcnRBbmltYXRpb24oKTtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB0aGlzICk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2RyYWdTdGFydCcsIGV2ZW50LCBbIHBvaW50ZXIgXSApO1xufTtcblxucHJvdG8ucG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHZhciBtb3ZlVmVjdG9yID0gdGhpcy5fZHJhZ1BvaW50ZXJNb3ZlKCBldmVudCwgcG9pbnRlciApO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdwb2ludGVyTW92ZScsIGV2ZW50LCBbIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xuICB0aGlzLl9kcmFnTW92ZSggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKTtcbn07XG5cbnByb3RvLmRyYWdNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICkge1xuICBpZiAoICF0aGlzLmlzRHJhZ2dhYmxlICkge1xuICAgIHJldHVybjtcbiAgfVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHRoaXMucHJldmlvdXNEcmFnWCA9IHRoaXMuZHJhZ1g7XG4gIC8vIHJldmVyc2UgaWYgcmlnaHQtdG8tbGVmdFxuICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gLTEgOiAxO1xuICBpZiAoIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICkge1xuICAgIC8vIHdyYXAgYXJvdW5kIG1vdmUuICM1ODlcbiAgICBtb3ZlVmVjdG9yLnggPSBtb3ZlVmVjdG9yLnggJSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICB9XG4gIHZhciBkcmFnWCA9IHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gKyBtb3ZlVmVjdG9yLnggKiBkaXJlY3Rpb247XG5cbiAgaWYgKCAhdGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgdGhpcy5zbGlkZXMubGVuZ3RoICkge1xuICAgIC8vIHNsb3cgZHJhZ1xuICAgIHZhciBvcmlnaW5Cb3VuZCA9IE1hdGgubWF4KCAtdGhpcy5zbGlkZXNbMF0udGFyZ2V0LCB0aGlzLmRyYWdTdGFydFBvc2l0aW9uICk7XG4gICAgZHJhZ1ggPSBkcmFnWCA+IG9yaWdpbkJvdW5kID8gKCBkcmFnWCArIG9yaWdpbkJvdW5kICkgKiAwLjUgOiBkcmFnWDtcbiAgICB2YXIgZW5kQm91bmQgPSBNYXRoLm1pbiggLXRoaXMuZ2V0TGFzdFNsaWRlKCkudGFyZ2V0LCB0aGlzLmRyYWdTdGFydFBvc2l0aW9uICk7XG4gICAgZHJhZ1ggPSBkcmFnWCA8IGVuZEJvdW5kID8gKCBkcmFnWCArIGVuZEJvdW5kICkgKiAwLjUgOiBkcmFnWDtcbiAgfVxuXG4gIHRoaXMuZHJhZ1ggPSBkcmFnWDtcblxuICB0aGlzLmRyYWdNb3ZlVGltZSA9IG5ldyBEYXRlKCk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2RyYWdNb3ZlJywgZXZlbnQsIFsgcG9pbnRlciwgbW92ZVZlY3RvciBdICk7XG59O1xuXG5wcm90by5kcmFnRW5kID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBpZiAoICF0aGlzLmlzRHJhZ2dhYmxlICkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIHRoaXMub3B0aW9ucy5mcmVlU2Nyb2xsICkge1xuICAgIHRoaXMuaXNGcmVlU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgfVxuICAvLyBzZXQgc2VsZWN0ZWRJbmRleCBiYXNlZCBvbiB3aGVyZSBmbGljayB3aWxsIGVuZCB1cFxuICB2YXIgaW5kZXggPSB0aGlzLmRyYWdFbmRSZXN0aW5nU2VsZWN0KCk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMuZnJlZVNjcm9sbCAmJiAhdGhpcy5vcHRpb25zLndyYXBBcm91bmQgKSB7XG4gICAgLy8gaWYgZnJlZS1zY3JvbGwgJiBub3Qgd3JhcCBhcm91bmRcbiAgICAvLyBkbyBub3QgZnJlZS1zY3JvbGwgaWYgZ29pbmcgb3V0c2lkZSBvZiBib3VuZGluZyBzbGlkZXNcbiAgICAvLyBzbyBib3VuZGluZyBzbGlkZXMgY2FuIGF0dHJhY3Qgc2xpZGVyLCBhbmQga2VlcCBpdCBpbiBib3VuZHNcbiAgICB2YXIgcmVzdGluZ1ggPSB0aGlzLmdldFJlc3RpbmdQb3NpdGlvbigpO1xuICAgIHRoaXMuaXNGcmVlU2Nyb2xsaW5nID0gLXJlc3RpbmdYID4gdGhpcy5zbGlkZXNbMF0udGFyZ2V0ICYmXG4gICAgICAtcmVzdGluZ1ggPCB0aGlzLmdldExhc3RTbGlkZSgpLnRhcmdldDtcbiAgfSBlbHNlIGlmICggIXRoaXMub3B0aW9ucy5mcmVlU2Nyb2xsICYmIGluZGV4ID09IHRoaXMuc2VsZWN0ZWRJbmRleCApIHtcbiAgICAvLyBib29zdCBzZWxlY3Rpb24gaWYgc2VsZWN0ZWQgaW5kZXggaGFzIG5vdCBjaGFuZ2VkXG4gICAgaW5kZXggKz0gdGhpcy5kcmFnRW5kQm9vc3RTZWxlY3QoKTtcbiAgfVxuICBkZWxldGUgdGhpcy5wcmV2aW91c0RyYWdYO1xuICAvLyBhcHBseSBzZWxlY3Rpb25cbiAgLy8gVE9ETyByZWZhY3RvciB0aGlzLCBzZWxlY3RpbmcgaGVyZSBmZWVscyB3ZWlyZFxuICAvLyBIQUNLLCBzZXQgZmxhZyBzbyBkcmFnZ2luZyBzdGF5cyBpbiBjb3JyZWN0IGRpcmVjdGlvblxuICB0aGlzLmlzRHJhZ1NlbGVjdCA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kO1xuICB0aGlzLnNlbGVjdCggaW5kZXggKTtcbiAgZGVsZXRlIHRoaXMuaXNEcmFnU2VsZWN0O1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdkcmFnRW5kJywgZXZlbnQsIFsgcG9pbnRlciBdICk7XG59O1xuXG5wcm90by5kcmFnRW5kUmVzdGluZ1NlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzdGluZ1ggPSB0aGlzLmdldFJlc3RpbmdQb3NpdGlvbigpO1xuICAvLyBob3cgZmFyIGF3YXkgZnJvbSBzZWxlY3RlZCBzbGlkZVxuICB2YXIgZGlzdGFuY2UgPSBNYXRoLmFicyggdGhpcy5nZXRTbGlkZURpc3RhbmNlKCAtcmVzdGluZ1gsIHRoaXMuc2VsZWN0ZWRJbmRleCApICk7XG4gIC8vIGdldCBjbG9zZXQgcmVzdGluZyBnb2luZyB1cCBhbmQgZ29pbmcgZG93blxuICB2YXIgcG9zaXRpdmVSZXN0aW5nID0gdGhpcy5fZ2V0Q2xvc2VzdFJlc3RpbmcoIHJlc3RpbmdYLCBkaXN0YW5jZSwgMSApO1xuICB2YXIgbmVnYXRpdmVSZXN0aW5nID0gdGhpcy5fZ2V0Q2xvc2VzdFJlc3RpbmcoIHJlc3RpbmdYLCBkaXN0YW5jZSwgLTEgKTtcbiAgLy8gdXNlIGNsb3NlciByZXN0aW5nIGZvciB3cmFwLWFyb3VuZFxuICB2YXIgaW5kZXggPSBwb3NpdGl2ZVJlc3RpbmcuZGlzdGFuY2UgPCBuZWdhdGl2ZVJlc3RpbmcuZGlzdGFuY2UgP1xuICAgIHBvc2l0aXZlUmVzdGluZy5pbmRleCA6IG5lZ2F0aXZlUmVzdGluZy5pbmRleDtcbiAgcmV0dXJuIGluZGV4O1xufTtcblxuLyoqXG4gKiBnaXZlbiByZXN0aW5nIFggYW5kIGRpc3RhbmNlIHRvIHNlbGVjdGVkIGNlbGxcbiAqIGdldCB0aGUgZGlzdGFuY2UgYW5kIGluZGV4IG9mIHRoZSBjbG9zZXN0IGNlbGxcbiAqIEBwYXJhbSB7TnVtYmVyfSByZXN0aW5nWCAtIGVzdGltYXRlZCBwb3N0LWZsaWNrIHJlc3RpbmcgcG9zaXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBkaXN0YW5jZSAtIGRpc3RhbmNlIHRvIHNlbGVjdGVkIGNlbGxcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5jcmVtZW50IC0gKzEgb3IgLTEsIGdvaW5nIHVwIG9yIGRvd25cbiAqIEByZXR1cm5zIHtPYmplY3R9IC0geyBkaXN0YW5jZToge051bWJlcn0sIGluZGV4OiB7SW50ZWdlcn0gfVxuICovXG5wcm90by5fZ2V0Q2xvc2VzdFJlc3RpbmcgPSBmdW5jdGlvbiggcmVzdGluZ1gsIGRpc3RhbmNlLCBpbmNyZW1lbnQgKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleDtcbiAgdmFyIG1pbkRpc3RhbmNlID0gSW5maW5pdHk7XG4gIHZhciBjb25kaXRpb24gPSB0aGlzLm9wdGlvbnMuY29udGFpbiAmJiAhdGhpcy5vcHRpb25zLndyYXBBcm91bmQgP1xuICAgIC8vIGlmIGNvbnRhaW4sIGtlZXAgZ29pbmcgaWYgZGlzdGFuY2UgaXMgZXF1YWwgdG8gbWluRGlzdGFuY2VcbiAgICBmdW5jdGlvbiggZCwgbWQgKSB7IHJldHVybiBkIDw9IG1kOyB9IDogZnVuY3Rpb24oIGQsIG1kICkgeyByZXR1cm4gZCA8IG1kOyB9O1xuICB3aGlsZSAoIGNvbmRpdGlvbiggZGlzdGFuY2UsIG1pbkRpc3RhbmNlICkgKSB7XG4gICAgLy8gbWVhc3VyZSBkaXN0YW5jZSB0byBuZXh0IGNlbGxcbiAgICBpbmRleCArPSBpbmNyZW1lbnQ7XG4gICAgbWluRGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICBkaXN0YW5jZSA9IHRoaXMuZ2V0U2xpZGVEaXN0YW5jZSggLXJlc3RpbmdYLCBpbmRleCApO1xuICAgIGlmICggZGlzdGFuY2UgPT09IG51bGwgKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGlzdGFuY2UgPSBNYXRoLmFicyggZGlzdGFuY2UgKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGRpc3RhbmNlOiBtaW5EaXN0YW5jZSxcbiAgICAvLyBzZWxlY3RlZCB3YXMgcHJldmlvdXMgaW5kZXhcbiAgICBpbmRleDogaW5kZXggLSBpbmNyZW1lbnRcbiAgfTtcbn07XG5cbi8qKlxuICogbWVhc3VyZSBkaXN0YW5jZSBiZXR3ZWVuIHggYW5kIGEgc2xpZGUgdGFyZ2V0XG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIHNsaWRlIGluZGV4XG4gKi9cbnByb3RvLmdldFNsaWRlRGlzdGFuY2UgPSBmdW5jdGlvbiggeCwgaW5kZXggKSB7XG4gIHZhciBsZW4gPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gIC8vIHdyYXAgYXJvdW5kIGlmIGF0IGxlYXN0IDIgc2xpZGVzXG4gIHZhciBpc1dyYXBBcm91bmQgPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiBsZW4gPiAxO1xuICB2YXIgc2xpZGVJbmRleCA9IGlzV3JhcEFyb3VuZCA/IHV0aWxzLm1vZHVsbyggaW5kZXgsIGxlbiApIDogaW5kZXg7XG4gIHZhciBzbGlkZSA9IHRoaXMuc2xpZGVzWyBzbGlkZUluZGV4IF07XG4gIGlmICggIXNsaWRlICkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGFkZCBkaXN0YW5jZSBmb3Igd3JhcC1hcm91bmQgc2xpZGVzXG4gIHZhciB3cmFwID0gaXNXcmFwQXJvdW5kID8gdGhpcy5zbGlkZWFibGVXaWR0aCAqIE1hdGguZmxvb3IoIGluZGV4IC8gbGVuICkgOiAwO1xuICByZXR1cm4geCAtICggc2xpZGUudGFyZ2V0ICsgd3JhcCApO1xufTtcblxucHJvdG8uZHJhZ0VuZEJvb3N0U2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIC8vIGRvIG5vdCBib29zdCBpZiBubyBwcmV2aW91c0RyYWdYIG9yIGRyYWdNb3ZlVGltZVxuICBpZiAoIHRoaXMucHJldmlvdXNEcmFnWCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLmRyYWdNb3ZlVGltZSB8fFxuICAgIC8vIG9yIGlmIGRyYWcgd2FzIGhlbGQgZm9yIDEwMCBtc1xuICAgIG5ldyBEYXRlKCkgLSB0aGlzLmRyYWdNb3ZlVGltZSA+IDEwMCApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciBkaXN0YW5jZSA9IHRoaXMuZ2V0U2xpZGVEaXN0YW5jZSggLXRoaXMuZHJhZ1gsIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICB2YXIgZGVsdGEgPSB0aGlzLnByZXZpb3VzRHJhZ1ggLSB0aGlzLmRyYWdYO1xuICBpZiAoIGRpc3RhbmNlID4gMCAmJiBkZWx0YSA+IDAgKSB7XG4gICAgLy8gYm9vc3QgdG8gbmV4dCBpZiBtb3ZpbmcgdG93YXJkcyB0aGUgcmlnaHQsIGFuZCBwb3NpdGl2ZSB2ZWxvY2l0eVxuICAgIHJldHVybiAxO1xuICB9IGVsc2UgaWYgKCBkaXN0YW5jZSA8IDAgJiYgZGVsdGEgPCAwICkge1xuICAgIC8vIGJvb3N0IHRvIHByZXZpb3VzIGlmIG1vdmluZyB0b3dhcmRzIHRoZSBsZWZ0LCBhbmQgbmVnYXRpdmUgdmVsb2NpdHlcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG4vLyAtLS0tLSBzdGF0aWNDbGljayAtLS0tLSAvL1xuXG5wcm90by5zdGF0aWNDbGljayA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gZ2V0IGNsaWNrZWRDZWxsLCBpZiBjZWxsIHdhcyBjbGlja2VkXG4gIHZhciBjbGlja2VkQ2VsbCA9IHRoaXMuZ2V0UGFyZW50Q2VsbCggZXZlbnQudGFyZ2V0ICk7XG4gIHZhciBjZWxsRWxlbSA9IGNsaWNrZWRDZWxsICYmIGNsaWNrZWRDZWxsLmVsZW1lbnQ7XG4gIHZhciBjZWxsSW5kZXggPSBjbGlja2VkQ2VsbCAmJiB0aGlzLmNlbGxzLmluZGV4T2YoIGNsaWNrZWRDZWxsICk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3N0YXRpY0NsaWNrJywgZXZlbnQsIFsgcG9pbnRlciwgY2VsbEVsZW0sIGNlbGxJbmRleCBdICk7XG59O1xuXG4vLyAtLS0tLSBzY3JvbGwgLS0tLS0gLy9cblxucHJvdG8ub25zY3JvbGwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNjcm9sbCA9IGdldFNjcm9sbFBvc2l0aW9uKCk7XG4gIHZhciBzY3JvbGxNb3ZlWCA9IHRoaXMucG9pbnRlckRvd25TY3JvbGwueCAtIHNjcm9sbC54O1xuICB2YXIgc2Nyb2xsTW92ZVkgPSB0aGlzLnBvaW50ZXJEb3duU2Nyb2xsLnkgLSBzY3JvbGwueTtcbiAgLy8gY2FuY2VsIGNsaWNrL3RhcCBpZiBzY3JvbGwgaXMgdG9vIG11Y2hcbiAgaWYgKCBNYXRoLmFicyggc2Nyb2xsTW92ZVggKSA+IDMgfHwgTWF0aC5hYnMoIHNjcm9sbE1vdmVZICkgPiAzICkge1xuICAgIHRoaXMuX3BvaW50ZXJEb25lKCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIHV0aWxzIC0tLS0tIC8vXG5cbmZ1bmN0aW9uIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHg6IHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICB5OiB3aW5kb3cucGFnZVlPZmZzZXRcbiAgfTtcbn1cblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gRmxpY2tpdHkgbWFpblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdldi1lbWl0dGVyL2V2LWVtaXR0ZXInLFxuICAgICAgJ2dldC1zaXplL2dldC1zaXplJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscycsXG4gICAgICAnLi9jZWxsJyxcbiAgICAgICcuL3NsaWRlJyxcbiAgICAgICcuL2FuaW1hdGUnXG4gICAgXSwgZnVuY3Rpb24oIEV2RW1pdHRlciwgZ2V0U2l6ZSwgdXRpbHMsIENlbGwsIFNsaWRlLCBhbmltYXRlUHJvdG90eXBlICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyLCBnZXRTaXplLCB1dGlscywgQ2VsbCwgU2xpZGUsIGFuaW1hdGVQcm90b3R5cGUgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2dldC1zaXplJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICAgcmVxdWlyZSgnLi9jZWxsJyksXG4gICAgICByZXF1aXJlKCcuL3NsaWRlJyksXG4gICAgICByZXF1aXJlKCcuL2FuaW1hdGUnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB2YXIgX0ZsaWNraXR5ID0gd2luZG93LkZsaWNraXR5O1xuXG4gICAgd2luZG93LkZsaWNraXR5ID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5FdkVtaXR0ZXIsXG4gICAgICB3aW5kb3cuZ2V0U2l6ZSxcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHMsXG4gICAgICBfRmxpY2tpdHkuQ2VsbCxcbiAgICAgIF9GbGlja2l0eS5TbGlkZSxcbiAgICAgIF9GbGlja2l0eS5hbmltYXRlUHJvdG90eXBlXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyLCBnZXRTaXplLFxuICB1dGlscywgQ2VsbCwgU2xpZGUsIGFuaW1hdGVQcm90b3R5cGUgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gdmFyc1xudmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG52YXIgZ2V0Q29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlO1xudmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcblxuZnVuY3Rpb24gbW92ZUVsZW1lbnRzKCBlbGVtcywgdG9FbGVtICkge1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgd2hpbGUgKCBlbGVtcy5sZW5ndGggKSB7XG4gICAgdG9FbGVtLmFwcGVuZENoaWxkKCBlbGVtcy5zaGlmdCgpICk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmxpY2tpdHkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZ2xvYmFsbHkgdW5pcXVlIGlkZW50aWZpZXJzXG52YXIgR1VJRCA9IDA7XG4vLyBpbnRlcm5hbCBzdG9yZSBvZiBhbGwgRmxpY2tpdHkgaW50YW5jZXNcbnZhciBpbnN0YW5jZXMgPSB7fTtcblxuZnVuY3Rpb24gRmxpY2tpdHkoIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG4gIHZhciBxdWVyeUVsZW1lbnQgPSB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIGVsZW1lbnQgKTtcbiAgaWYgKCAhcXVlcnlFbGVtZW50ICkge1xuICAgIGlmICggY29uc29sZSApIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoICdCYWQgZWxlbWVudCBmb3IgRmxpY2tpdHk6ICcgKyAoIHF1ZXJ5RWxlbWVudCB8fCBlbGVtZW50ICkgKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudCA9IHF1ZXJ5RWxlbWVudDtcbiAgLy8gZG8gbm90IGluaXRpYWxpemUgdHdpY2Ugb24gc2FtZSBlbGVtZW50XG4gIGlmICggdGhpcy5lbGVtZW50LmZsaWNraXR5R1VJRCApIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZXNbIHRoaXMuZWxlbWVudC5mbGlja2l0eUdVSUQgXTtcbiAgICBpbnN0YW5jZS5vcHRpb24oIG9wdGlvbnMgKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICAvLyBhZGQgalF1ZXJ5XG4gIGlmICggalF1ZXJ5ICkge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBqUXVlcnkoIHRoaXMuZWxlbWVudCApO1xuICB9XG4gIC8vIG9wdGlvbnNcbiAgdGhpcy5vcHRpb25zID0gdXRpbHMuZXh0ZW5kKCB7fSwgdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0cyApO1xuICB0aGlzLm9wdGlvbiggb3B0aW9ucyApO1xuXG4gIC8vIGtpY2sgdGhpbmdzIG9mZlxuICB0aGlzLl9jcmVhdGUoKTtcbn1cblxuRmxpY2tpdHkuZGVmYXVsdHMgPSB7XG4gIGFjY2Vzc2liaWxpdHk6IHRydWUsXG4gIC8vIGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSxcbiAgY2VsbEFsaWduOiAnY2VudGVyJyxcbiAgLy8gY2VsbFNlbGVjdG9yOiB1bmRlZmluZWQsXG4gIC8vIGNvbnRhaW46IGZhbHNlLFxuICBmcmVlU2Nyb2xsRnJpY3Rpb246IDAuMDc1LCAvLyBmcmljdGlvbiB3aGVuIGZyZWUtc2Nyb2xsaW5nXG4gIGZyaWN0aW9uOiAwLjI4LCAvLyBmcmljdGlvbiB3aGVuIHNlbGVjdGluZ1xuICBuYW1lc3BhY2VKUXVlcnlFdmVudHM6IHRydWUsXG4gIC8vIGluaXRpYWxJbmRleDogMCxcbiAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICByZXNpemU6IHRydWUsXG4gIHNlbGVjdGVkQXR0cmFjdGlvbjogMC4wMjUsXG4gIHNldEdhbGxlcnlTaXplOiB0cnVlXG4gIC8vIHdhdGNoQ1NTOiBmYWxzZSxcbiAgLy8gd3JhcEFyb3VuZDogZmFsc2Vcbn07XG5cbi8vIGhhc2ggb2YgbWV0aG9kcyB0cmlnZ2VyZWQgb24gX2NyZWF0ZSgpXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzID0gW107XG5cbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcbi8vIGluaGVyaXQgRXZlbnRFbWl0dGVyXG51dGlscy5leHRlbmQoIHByb3RvLCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbnByb3RvLl9jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gYWRkIGlkIGZvciBGbGlja2l0eS5kYXRhXG4gIHZhciBpZCA9IHRoaXMuZ3VpZCA9ICsrR1VJRDtcbiAgdGhpcy5lbGVtZW50LmZsaWNraXR5R1VJRCA9IGlkOyAvLyBleHBhbmRvXG4gIGluc3RhbmNlc1sgaWQgXSA9IHRoaXM7IC8vIGFzc29jaWF0ZSB2aWEgaWRcbiAgLy8gaW5pdGlhbCBwcm9wZXJ0aWVzXG4gIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG4gIC8vIGhvdyBtYW55IGZyYW1lcyBzbGlkZXIgaGFzIGJlZW4gaW4gc2FtZSBwb3NpdGlvblxuICB0aGlzLnJlc3RpbmdGcmFtZXMgPSAwO1xuICAvLyBpbml0aWFsIHBoeXNpY3MgcHJvcGVydGllc1xuICB0aGlzLnggPSAwO1xuICB0aGlzLnZlbG9jaXR5ID0gMDtcbiAgdGhpcy5vcmlnaW5TaWRlID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgLy8gY3JlYXRlIHZpZXdwb3J0ICYgc2xpZGVyXG4gIHRoaXMudmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGhpcy52aWV3cG9ydC5jbGFzc05hbWUgPSAnZmxpY2tpdHktdmlld3BvcnQnO1xuICB0aGlzLl9jcmVhdGVTbGlkZXIoKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy5yZXNpemUgfHwgdGhpcy5vcHRpb25zLndhdGNoQ1NTICkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgdGhpcyApO1xuICB9XG5cbiAgLy8gYWRkIGxpc3RlbmVycyBmcm9tIG9uIG9wdGlvblxuICBmb3IgKCB2YXIgZXZlbnROYW1lIGluIHRoaXMub3B0aW9ucy5vbiApIHtcbiAgICB2YXIgbGlzdGVuZXIgPSB0aGlzLm9wdGlvbnMub25bIGV2ZW50TmFtZSBdO1xuICAgIHRoaXMub24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgfVxuXG4gIEZsaWNraXR5LmNyZWF0ZU1ldGhvZHMuZm9yRWFjaCggZnVuY3Rpb24oIG1ldGhvZCApIHtcbiAgICB0aGlzWyBtZXRob2QgXSgpO1xuICB9LCB0aGlzICk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMud2F0Y2hDU1MgKSB7XG4gICAgdGhpcy53YXRjaENTUygpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgfVxuXG59O1xuXG4vKipcbiAqIHNldCBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5wcm90by5vcHRpb24gPSBmdW5jdGlvbiggb3B0cyApIHtcbiAgdXRpbHMuZXh0ZW5kKCB0aGlzLm9wdGlvbnMsIG9wdHMgKTtcbn07XG5cbnByb3RvLmFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5pc0FjdGl2ZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmbGlja2l0eS1lbmFibGVkJyk7XG4gIGlmICggdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ICkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmbGlja2l0eS1ydGwnKTtcbiAgfVxuXG4gIHRoaXMuZ2V0U2l6ZSgpO1xuICAvLyBtb3ZlIGluaXRpYWwgY2VsbCBlbGVtZW50cyBzbyB0aGV5IGNhbiBiZSBsb2FkZWQgYXMgY2VsbHNcbiAgdmFyIGNlbGxFbGVtcyA9IHRoaXMuX2ZpbHRlckZpbmRDZWxsRWxlbWVudHMoIHRoaXMuZWxlbWVudC5jaGlsZHJlbiApO1xuICBtb3ZlRWxlbWVudHMoIGNlbGxFbGVtcywgdGhpcy5zbGlkZXIgKTtcbiAgdGhpcy52aWV3cG9ydC5hcHBlbmRDaGlsZCggdGhpcy5zbGlkZXIgKTtcbiAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLnZpZXdwb3J0ICk7XG4gIC8vIGdldCBjZWxscyBmcm9tIGNoaWxkcmVuXG4gIHRoaXMucmVsb2FkQ2VsbHMoKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ICkge1xuICAgIC8vIGFsbG93IGVsZW1lbnQgdG8gZm9jdXNhYmxlXG4gICAgdGhpcy5lbGVtZW50LnRhYkluZGV4ID0gMDtcbiAgICAvLyBsaXN0ZW4gZm9yIGtleSBwcmVzc2VzXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgdGhpcyApO1xuICB9XG5cbiAgdGhpcy5lbWl0RXZlbnQoJ2FjdGl2YXRlJyk7XG4gIHRoaXMuc2VsZWN0SW5pdGlhbEluZGV4KCk7XG4gIC8vIGZsYWcgZm9yIGluaXRpYWwgYWN0aXZhdGlvbiwgZm9yIHVzaW5nIGluaXRpYWxJbmRleFxuICB0aGlzLmlzSW5pdEFjdGl2YXRlZCA9IHRydWU7XG4gIC8vIHJlYWR5IGV2ZW50LiAjNDkzXG4gIHRoaXMuZGlzcGF0Y2hFdmVudCgncmVhZHknKTtcbn07XG5cbi8vIHNsaWRlciBwb3NpdGlvbnMgdGhlIGNlbGxzXG5wcm90by5fY3JlYXRlU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gIC8vIHNsaWRlciBlbGVtZW50IGRvZXMgYWxsIHRoZSBwb3NpdGlvbmluZ1xuICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHNsaWRlci5jbGFzc05hbWUgPSAnZmxpY2tpdHktc2xpZGVyJztcbiAgc2xpZGVyLnN0eWxlWyB0aGlzLm9yaWdpblNpZGUgXSA9IDA7XG4gIHRoaXMuc2xpZGVyID0gc2xpZGVyO1xufTtcblxucHJvdG8uX2ZpbHRlckZpbmRDZWxsRWxlbWVudHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHJldHVybiB1dGlscy5maWx0ZXJGaW5kRWxlbWVudHMoIGVsZW1zLCB0aGlzLm9wdGlvbnMuY2VsbFNlbGVjdG9yICk7XG59O1xuXG4vLyBnb2VzIHRocm91Z2ggYWxsIGNoaWxkcmVuXG5wcm90by5yZWxvYWRDZWxscyA9IGZ1bmN0aW9uKCkge1xuICAvLyBjb2xsZWN0aW9uIG9mIGl0ZW0gZWxlbWVudHNcbiAgdGhpcy5jZWxscyA9IHRoaXMuX21ha2VDZWxscyggdGhpcy5zbGlkZXIuY2hpbGRyZW4gKTtcbiAgdGhpcy5wb3NpdGlvbkNlbGxzKCk7XG4gIHRoaXMuX2dldFdyYXBTaGlmdENlbGxzKCk7XG4gIHRoaXMuc2V0R2FsbGVyeVNpemUoKTtcbn07XG5cbi8qKlxuICogdHVybiBlbGVtZW50cyBpbnRvIEZsaWNraXR5LkNlbGxzXG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEhUTUxFbGVtZW50fSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBpdGVtcyAtIGNvbGxlY3Rpb24gb2YgbmV3IEZsaWNraXR5IENlbGxzXG4gKi9cbnByb3RvLl9tYWtlQ2VsbHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBjZWxsRWxlbXMgPSB0aGlzLl9maWx0ZXJGaW5kQ2VsbEVsZW1lbnRzKCBlbGVtcyApO1xuXG4gIC8vIGNyZWF0ZSBuZXcgRmxpY2tpdHkgZm9yIGNvbGxlY3Rpb25cbiAgdmFyIGNlbGxzID0gY2VsbEVsZW1zLm1hcCggZnVuY3Rpb24oIGNlbGxFbGVtICkge1xuICAgIHJldHVybiBuZXcgQ2VsbCggY2VsbEVsZW0sIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xuXG4gIHJldHVybiBjZWxscztcbn07XG5cbnByb3RvLmdldExhc3RDZWxsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbGxzWyB0aGlzLmNlbGxzLmxlbmd0aCAtIDEgXTtcbn07XG5cbnByb3RvLmdldExhc3RTbGlkZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zbGlkZXNbIHRoaXMuc2xpZGVzLmxlbmd0aCAtIDEgXTtcbn07XG5cbi8vIHBvc2l0aW9ucyBhbGwgY2VsbHNcbnByb3RvLnBvc2l0aW9uQ2VsbHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gc2l6ZSBhbGwgY2VsbHNcbiAgdGhpcy5fc2l6ZUNlbGxzKCB0aGlzLmNlbGxzICk7XG4gIC8vIHBvc2l0aW9uIGFsbCBjZWxsc1xuICB0aGlzLl9wb3NpdGlvbkNlbGxzKCAwICk7XG59O1xuXG4vKipcbiAqIHBvc2l0aW9uIGNlcnRhaW4gY2VsbHNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSB3aGljaCBjZWxsIHRvIHN0YXJ0IHdpdGhcbiAqL1xucHJvdG8uX3Bvc2l0aW9uQ2VsbHMgPSBmdW5jdGlvbiggaW5kZXggKSB7XG4gIGluZGV4ID0gaW5kZXggfHwgMDtcbiAgLy8gYWxzbyBtZWFzdXJlIG1heENlbGxIZWlnaHRcbiAgLy8gc3RhcnQgMCBpZiBwb3NpdGlvbmluZyBhbGwgY2VsbHNcbiAgdGhpcy5tYXhDZWxsSGVpZ2h0ID0gaW5kZXggPyB0aGlzLm1heENlbGxIZWlnaHQgfHwgMCA6IDA7XG4gIHZhciBjZWxsWCA9IDA7XG4gIC8vIGdldCBjZWxsWFxuICBpZiAoIGluZGV4ID4gMCApIHtcbiAgICB2YXIgc3RhcnRDZWxsID0gdGhpcy5jZWxsc1sgaW5kZXggLSAxIF07XG4gICAgY2VsbFggPSBzdGFydENlbGwueCArIHN0YXJ0Q2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIH1cbiAgdmFyIGxlbiA9IHRoaXMuY2VsbHMubGVuZ3RoO1xuICBmb3IgKCB2YXIgaT1pbmRleDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1tpXTtcbiAgICBjZWxsLnNldFBvc2l0aW9uKCBjZWxsWCApO1xuICAgIGNlbGxYICs9IGNlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICAgIHRoaXMubWF4Q2VsbEhlaWdodCA9IE1hdGgubWF4KCBjZWxsLnNpemUub3V0ZXJIZWlnaHQsIHRoaXMubWF4Q2VsbEhlaWdodCApO1xuICB9XG4gIC8vIGtlZXAgdHJhY2sgb2YgY2VsbFggZm9yIHdyYXAtYXJvdW5kXG4gIHRoaXMuc2xpZGVhYmxlV2lkdGggPSBjZWxsWDtcbiAgLy8gc2xpZGVzXG4gIHRoaXMudXBkYXRlU2xpZGVzKCk7XG4gIC8vIGNvbnRhaW4gc2xpZGVzIHRhcmdldFxuICB0aGlzLl9jb250YWluU2xpZGVzKCk7XG4gIC8vIHVwZGF0ZSBzbGlkZXNXaWR0aFxuICB0aGlzLnNsaWRlc1dpZHRoID0gbGVuID8gdGhpcy5nZXRMYXN0U2xpZGUoKS50YXJnZXQgLSB0aGlzLnNsaWRlc1swXS50YXJnZXQgOiAwO1xufTtcblxuLyoqXG4gKiBjZWxsLmdldFNpemUoKSBvbiBtdWx0aXBsZSBjZWxsc1xuICogQHBhcmFtIHtBcnJheX0gY2VsbHNcbiAqL1xucHJvdG8uX3NpemVDZWxscyA9IGZ1bmN0aW9uKCBjZWxscyApIHtcbiAgY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC5nZXRTaXplKCk7XG4gIH0pO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLnVwZGF0ZVNsaWRlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNsaWRlcyA9IFtdO1xuICBpZiAoICF0aGlzLmNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc2xpZGUgPSBuZXcgU2xpZGUoIHRoaXMgKTtcbiAgdGhpcy5zbGlkZXMucHVzaCggc2xpZGUgKTtcbiAgdmFyIGlzT3JpZ2luTGVmdCA9IHRoaXMub3JpZ2luU2lkZSA9PSAnbGVmdCc7XG4gIHZhciBuZXh0TWFyZ2luID0gaXNPcmlnaW5MZWZ0ID8gJ21hcmdpblJpZ2h0JyA6ICdtYXJnaW5MZWZ0JztcblxuICB2YXIgY2FuQ2VsbEZpdCA9IHRoaXMuX2dldENhbkNlbGxGaXQoKTtcblxuICB0aGlzLmNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsLCBpICkge1xuICAgIC8vIGp1c3QgYWRkIGNlbGwgaWYgZmlyc3QgY2VsbCBpbiBzbGlkZVxuICAgIGlmICggIXNsaWRlLmNlbGxzLmxlbmd0aCApIHtcbiAgICAgIHNsaWRlLmFkZENlbGwoIGNlbGwgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2xpZGVXaWR0aCA9ICggc2xpZGUub3V0ZXJXaWR0aCAtIHNsaWRlLmZpcnN0TWFyZ2luICkgK1xuICAgICAgKCBjZWxsLnNpemUub3V0ZXJXaWR0aCAtIGNlbGwuc2l6ZVsgbmV4dE1hcmdpbiBdICk7XG5cbiAgICBpZiAoIGNhbkNlbGxGaXQuY2FsbCggdGhpcywgaSwgc2xpZGVXaWR0aCApICkge1xuICAgICAgc2xpZGUuYWRkQ2VsbCggY2VsbCApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkb2Vzbid0IGZpdCwgbmV3IHNsaWRlXG4gICAgICBzbGlkZS51cGRhdGVUYXJnZXQoKTtcblxuICAgICAgc2xpZGUgPSBuZXcgU2xpZGUoIHRoaXMgKTtcbiAgICAgIHRoaXMuc2xpZGVzLnB1c2goIHNsaWRlICk7XG4gICAgICBzbGlkZS5hZGRDZWxsKCBjZWxsICk7XG4gICAgfVxuICB9LCB0aGlzICk7XG4gIC8vIGxhc3Qgc2xpZGVcbiAgc2xpZGUudXBkYXRlVGFyZ2V0KCk7XG4gIC8vIHVwZGF0ZSAuc2VsZWN0ZWRTbGlkZVxuICB0aGlzLnVwZGF0ZVNlbGVjdGVkU2xpZGUoKTtcbn07XG5cbnByb3RvLl9nZXRDYW5DZWxsRml0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBncm91cENlbGxzID0gdGhpcy5vcHRpb25zLmdyb3VwQ2VsbHM7XG4gIGlmICggIWdyb3VwQ2VsbHMgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBncm91cENlbGxzID09ICdudW1iZXInICkge1xuICAgIC8vIGdyb3VwIGJ5IG51bWJlci4gMyAtPiBbMCwxLDJdLCBbMyw0LDVdLCAuLi5cbiAgICB2YXIgbnVtYmVyID0gcGFyc2VJbnQoIGdyb3VwQ2VsbHMsIDEwICk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCBpICkge1xuICAgICAgcmV0dXJuICggaSAlIG51bWJlciApICE9PSAwO1xuICAgIH07XG4gIH1cbiAgLy8gZGVmYXVsdCwgZ3JvdXAgYnkgd2lkdGggb2Ygc2xpZGVcbiAgLy8gcGFyc2UgJzc1JVxuICB2YXIgcGVyY2VudE1hdGNoID0gdHlwZW9mIGdyb3VwQ2VsbHMgPT0gJ3N0cmluZycgJiZcbiAgICBncm91cENlbGxzLm1hdGNoKC9eKFxcZCspJSQvKTtcbiAgdmFyIHBlcmNlbnQgPSBwZXJjZW50TWF0Y2ggPyBwYXJzZUludCggcGVyY2VudE1hdGNoWzFdLCAxMCApIC8gMTAwIDogMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCBpLCBzbGlkZVdpZHRoICkge1xuICAgIHJldHVybiBzbGlkZVdpZHRoIDw9ICggdGhpcy5zaXplLmlubmVyV2lkdGggKyAxICkgKiBwZXJjZW50O1xuICB9O1xufTtcblxuLy8gYWxpYXMgX2luaXQgZm9yIGpRdWVyeSBwbHVnaW4gLmZsaWNraXR5KClcbnByb3RvLl9pbml0ID1cbnByb3RvLnJlcG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wb3NpdGlvbkNlbGxzKCk7XG4gIHRoaXMucG9zaXRpb25TbGlkZXJBdFNlbGVjdGVkKCk7XG59O1xuXG5wcm90by5nZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2l6ZSA9IGdldFNpemUoIHRoaXMuZWxlbWVudCApO1xuICB0aGlzLnNldENlbGxBbGlnbigpO1xuICB0aGlzLmN1cnNvclBvc2l0aW9uID0gdGhpcy5zaXplLmlubmVyV2lkdGggKiB0aGlzLmNlbGxBbGlnbjtcbn07XG5cbnZhciBjZWxsQWxpZ25TaG9ydGhhbmRzID0ge1xuICAvLyBjZWxsIGFsaWduLCB0aGVuIGJhc2VkIG9uIG9yaWdpbiBzaWRlXG4gIGNlbnRlcjoge1xuICAgIGxlZnQ6IDAuNSxcbiAgICByaWdodDogMC41XG4gIH0sXG4gIGxlZnQ6IHtcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAxXG4gIH0sXG4gIHJpZ2h0OiB7XG4gICAgcmlnaHQ6IDAsXG4gICAgbGVmdDogMVxuICB9XG59O1xuXG5wcm90by5zZXRDZWxsQWxpZ24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNob3J0aGFuZCA9IGNlbGxBbGlnblNob3J0aGFuZHNbIHRoaXMub3B0aW9ucy5jZWxsQWxpZ24gXTtcbiAgdGhpcy5jZWxsQWxpZ24gPSBzaG9ydGhhbmQgPyBzaG9ydGhhbmRbIHRoaXMub3JpZ2luU2lkZSBdIDogdGhpcy5vcHRpb25zLmNlbGxBbGlnbjtcbn07XG5cbnByb3RvLnNldEdhbGxlcnlTaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5vcHRpb25zLnNldEdhbGxlcnlTaXplICkge1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgJiYgdGhpcy5zZWxlY3RlZFNsaWRlID9cbiAgICAgIHRoaXMuc2VsZWN0ZWRTbGlkZS5oZWlnaHQgOiB0aGlzLm1heENlbGxIZWlnaHQ7XG4gICAgdGhpcy52aWV3cG9ydC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICB9XG59O1xuXG5wcm90by5fZ2V0V3JhcFNoaWZ0Q2VsbHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gb25seSBmb3Igd3JhcC1hcm91bmRcbiAgaWYgKCAhdGhpcy5vcHRpb25zLndyYXBBcm91bmQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHVuc2hpZnQgcHJldmlvdXMgY2VsbHNcbiAgdGhpcy5fdW5zaGlmdENlbGxzKCB0aGlzLmJlZm9yZVNoaWZ0Q2VsbHMgKTtcbiAgdGhpcy5fdW5zaGlmdENlbGxzKCB0aGlzLmFmdGVyU2hpZnRDZWxscyApO1xuICAvLyBnZXQgYmVmb3JlIGNlbGxzXG4gIC8vIGluaXRpYWwgZ2FwXG4gIHZhciBnYXBYID0gdGhpcy5jdXJzb3JQb3NpdGlvbjtcbiAgdmFyIGNlbGxJbmRleCA9IHRoaXMuY2VsbHMubGVuZ3RoIC0gMTtcbiAgdGhpcy5iZWZvcmVTaGlmdENlbGxzID0gdGhpcy5fZ2V0R2FwQ2VsbHMoIGdhcFgsIGNlbGxJbmRleCwgLTEgKTtcbiAgLy8gZ2V0IGFmdGVyIGNlbGxzXG4gIC8vIGVuZGluZyBnYXAgYmV0d2VlbiBsYXN0IGNlbGwgYW5kIGVuZCBvZiBnYWxsZXJ5IHZpZXdwb3J0XG4gIGdhcFggPSB0aGlzLnNpemUuaW5uZXJXaWR0aCAtIHRoaXMuY3Vyc29yUG9zaXRpb247XG4gIC8vIHN0YXJ0IGNsb25pbmcgYXQgZmlyc3QgY2VsbCwgd29ya2luZyBmb3J3YXJkc1xuICB0aGlzLmFmdGVyU2hpZnRDZWxscyA9IHRoaXMuX2dldEdhcENlbGxzKCBnYXBYLCAwLCAxICk7XG59O1xuXG5wcm90by5fZ2V0R2FwQ2VsbHMgPSBmdW5jdGlvbiggZ2FwWCwgY2VsbEluZGV4LCBpbmNyZW1lbnQgKSB7XG4gIC8vIGtlZXAgYWRkaW5nIGNlbGxzIHVudGlsIHRoZSBjb3ZlciB0aGUgaW5pdGlhbCBnYXBcbiAgdmFyIGNlbGxzID0gW107XG4gIHdoaWxlICggZ2FwWCA+IDAgKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxzWyBjZWxsSW5kZXggXTtcbiAgICBpZiAoICFjZWxsICkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNlbGxzLnB1c2goIGNlbGwgKTtcbiAgICBjZWxsSW5kZXggKz0gaW5jcmVtZW50O1xuICAgIGdhcFggLT0gY2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIH1cbiAgcmV0dXJuIGNlbGxzO1xufTtcblxuLy8gLS0tLS0gY29udGFpbiAtLS0tLSAvL1xuXG4vLyBjb250YWluIGNlbGwgdGFyZ2V0cyBzbyBubyBleGNlc3Mgc2xpZGluZ1xucHJvdG8uX2NvbnRhaW5TbGlkZXMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmNvbnRhaW4gfHwgdGhpcy5vcHRpb25zLndyYXBBcm91bmQgfHwgIXRoaXMuY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaXNSaWdodFRvTGVmdCA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdDtcbiAgdmFyIGJlZ2luTWFyZ2luID0gaXNSaWdodFRvTGVmdCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG4gIHZhciBlbmRNYXJnaW4gPSBpc1JpZ2h0VG9MZWZ0ID8gJ21hcmdpbkxlZnQnIDogJ21hcmdpblJpZ2h0JztcbiAgdmFyIGNvbnRlbnRXaWR0aCA9IHRoaXMuc2xpZGVhYmxlV2lkdGggLSB0aGlzLmdldExhc3RDZWxsKCkuc2l6ZVsgZW5kTWFyZ2luIF07XG4gIC8vIGNvbnRlbnQgaXMgbGVzcyB0aGFuIGdhbGxlcnkgc2l6ZVxuICB2YXIgaXNDb250ZW50U21hbGxlciA9IGNvbnRlbnRXaWR0aCA8IHRoaXMuc2l6ZS5pbm5lcldpZHRoO1xuICAvLyBib3VuZHNcbiAgdmFyIGJlZ2luQm91bmQgPSB0aGlzLmN1cnNvclBvc2l0aW9uICsgdGhpcy5jZWxsc1swXS5zaXplWyBiZWdpbk1hcmdpbiBdO1xuICB2YXIgZW5kQm91bmQgPSBjb250ZW50V2lkdGggLSB0aGlzLnNpemUuaW5uZXJXaWR0aCAqICggMSAtIHRoaXMuY2VsbEFsaWduICk7XG4gIC8vIGNvbnRhaW4gZWFjaCBjZWxsIHRhcmdldFxuICB0aGlzLnNsaWRlcy5mb3JFYWNoKCBmdW5jdGlvbiggc2xpZGUgKSB7XG4gICAgaWYgKCBpc0NvbnRlbnRTbWFsbGVyICkge1xuICAgICAgLy8gYWxsIGNlbGxzIGZpdCBpbnNpZGUgZ2FsbGVyeVxuICAgICAgc2xpZGUudGFyZ2V0ID0gY29udGVudFdpZHRoICogdGhpcy5jZWxsQWxpZ247XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnRhaW4gdG8gYm91bmRzXG4gICAgICBzbGlkZS50YXJnZXQgPSBNYXRoLm1heCggc2xpZGUudGFyZ2V0LCBiZWdpbkJvdW5kICk7XG4gICAgICBzbGlkZS50YXJnZXQgPSBNYXRoLm1pbiggc2xpZGUudGFyZ2V0LCBlbmRCb3VuZCApO1xuICAgIH1cbiAgfSwgdGhpcyApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbi8qKlxuICogZW1pdHMgZXZlbnRzIHZpYSBldmVudEVtaXR0ZXIgYW5kIGpRdWVyeSBldmVudHNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gbmFtZSBvZiBldmVudFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBvcmlnaW5hbCBldmVudFxuICogQHBhcmFtIHtBcnJheX0gYXJncyAtIGV4dHJhIGFyZ3VtZW50c1xuICovXG5wcm90by5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oIHR5cGUsIGV2ZW50LCBhcmdzICkge1xuICB2YXIgZW1pdEFyZ3MgPSBldmVudCA/IFsgZXZlbnQgXS5jb25jYXQoIGFyZ3MgKSA6IGFyZ3M7XG4gIHRoaXMuZW1pdEV2ZW50KCB0eXBlLCBlbWl0QXJncyApO1xuXG4gIGlmICggalF1ZXJ5ICYmIHRoaXMuJGVsZW1lbnQgKSB7XG4gICAgLy8gZGVmYXVsdCB0cmlnZ2VyIHdpdGggdHlwZSBpZiBubyBldmVudFxuICAgIHR5cGUgKz0gdGhpcy5vcHRpb25zLm5hbWVzcGFjZUpRdWVyeUV2ZW50cyA/ICcuZmxpY2tpdHknIDogJyc7XG4gICAgdmFyICRldmVudCA9IHR5cGU7XG4gICAgaWYgKCBldmVudCApIHtcbiAgICAgIC8vIGNyZWF0ZSBqUXVlcnkgZXZlbnRcbiAgICAgIHZhciBqUUV2ZW50ID0galF1ZXJ5LkV2ZW50KCBldmVudCApO1xuICAgICAgalFFdmVudC50eXBlID0gdHlwZTtcbiAgICAgICRldmVudCA9IGpRRXZlbnQ7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlciggJGV2ZW50LCBhcmdzICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNlbGVjdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBpbmRleCBvZiB0aGUgc2xpZGVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNXcmFwIC0gd2lsbCB3cmFwLWFyb3VuZCB0byBsYXN0L2ZpcnN0IGlmIGF0IHRoZSBlbmRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNJbnN0YW50IC0gd2lsbCBpbW1lZGlhdGVseSBzZXQgcG9zaXRpb24gYXQgc2VsZWN0ZWQgY2VsbFxuICovXG5wcm90by5zZWxlY3QgPSBmdW5jdGlvbiggaW5kZXgsIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICBpZiAoICF0aGlzLmlzQWN0aXZlICkge1xuICAgIHJldHVybjtcbiAgfVxuICBpbmRleCA9IHBhcnNlSW50KCBpbmRleCwgMTAgKTtcbiAgdGhpcy5fd3JhcFNlbGVjdCggaW5kZXggKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kIHx8IGlzV3JhcCApIHtcbiAgICBpbmRleCA9IHV0aWxzLm1vZHVsbyggaW5kZXgsIHRoaXMuc2xpZGVzLmxlbmd0aCApO1xuICB9XG4gIC8vIGJhaWwgaWYgaW52YWxpZCBpbmRleFxuICBpZiAoICF0aGlzLnNsaWRlc1sgaW5kZXggXSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHByZXZJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleDtcbiAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gIHRoaXMudXBkYXRlU2VsZWN0ZWRTbGlkZSgpO1xuICBpZiAoIGlzSW5zdGFudCApIHtcbiAgICB0aGlzLnBvc2l0aW9uU2xpZGVyQXRTZWxlY3RlZCgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhcnRBbmltYXRpb24oKTtcbiAgfVxuICBpZiAoIHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCApIHtcbiAgICB0aGlzLnNldEdhbGxlcnlTaXplKCk7XG4gIH1cbiAgLy8gZXZlbnRzXG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3NlbGVjdCcsIG51bGwsIFsgaW5kZXggXSApO1xuICAvLyBjaGFuZ2UgZXZlbnQgaWYgbmV3IGluZGV4XG4gIGlmICggaW5kZXggIT0gcHJldkluZGV4ICkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2NoYW5nZScsIG51bGwsIFsgaW5kZXggXSApO1xuICB9XG4gIC8vIG9sZCB2MSBldmVudCBuYW1lLCByZW1vdmUgaW4gdjNcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCdjZWxsU2VsZWN0Jyk7XG59O1xuXG4vLyB3cmFwcyBwb3NpdGlvbiBmb3Igd3JhcEFyb3VuZCwgdG8gbW92ZSB0byBjbG9zZXN0IHNsaWRlLiAjMTEzXG5wcm90by5fd3JhcFNlbGVjdCA9IGZ1bmN0aW9uKCBpbmRleCApIHtcbiAgdmFyIGxlbiA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgdmFyIGlzV3JhcHBpbmcgPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiBsZW4gPiAxO1xuICBpZiAoICFpc1dyYXBwaW5nICkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuICB2YXIgd3JhcEluZGV4ID0gdXRpbHMubW9kdWxvKCBpbmRleCwgbGVuICk7XG4gIC8vIGdvIHRvIHNob3J0ZXN0XG4gIHZhciBkZWx0YSA9IE1hdGguYWJzKCB3cmFwSW5kZXggLSB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgdmFyIGJhY2tXcmFwRGVsdGEgPSBNYXRoLmFicyggKCB3cmFwSW5kZXggKyBsZW4gKSAtIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICB2YXIgZm9yZXdhcmRXcmFwRGVsdGEgPSBNYXRoLmFicyggKCB3cmFwSW5kZXggLSBsZW4gKSAtIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICBpZiAoICF0aGlzLmlzRHJhZ1NlbGVjdCAmJiBiYWNrV3JhcERlbHRhIDwgZGVsdGEgKSB7XG4gICAgaW5kZXggKz0gbGVuO1xuICB9IGVsc2UgaWYgKCAhdGhpcy5pc0RyYWdTZWxlY3QgJiYgZm9yZXdhcmRXcmFwRGVsdGEgPCBkZWx0YSApIHtcbiAgICBpbmRleCAtPSBsZW47XG4gIH1cbiAgLy8gd3JhcCBwb3NpdGlvbiBzbyBzbGlkZXIgaXMgd2l0aGluIG5vcm1hbCBhcmVhXG4gIGlmICggaW5kZXggPCAwICkge1xuICAgIHRoaXMueCAtPSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICB9IGVsc2UgaWYgKCBpbmRleCA+PSBsZW4gKSB7XG4gICAgdGhpcy54ICs9IHRoaXMuc2xpZGVhYmxlV2lkdGg7XG4gIH1cbn07XG5cbnByb3RvLnByZXZpb3VzID0gZnVuY3Rpb24oIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICB0aGlzLnNlbGVjdCggdGhpcy5zZWxlY3RlZEluZGV4IC0gMSwgaXNXcmFwLCBpc0luc3RhbnQgKTtcbn07XG5cbnByb3RvLm5leHQgPSBmdW5jdGlvbiggaXNXcmFwLCBpc0luc3RhbnQgKSB7XG4gIHRoaXMuc2VsZWN0KCB0aGlzLnNlbGVjdGVkSW5kZXggKyAxLCBpc1dyYXAsIGlzSW5zdGFudCApO1xufTtcblxucHJvdG8udXBkYXRlU2VsZWN0ZWRTbGlkZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlc1sgdGhpcy5zZWxlY3RlZEluZGV4IF07XG4gIC8vIHNlbGVjdGVkSW5kZXggY291bGQgYmUgb3V0c2lkZSBvZiBzbGlkZXMsIGlmIHRyaWdnZXJlZCBiZWZvcmUgcmVzaXplKClcbiAgaWYgKCAhc2xpZGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHVuc2VsZWN0IHByZXZpb3VzIHNlbGVjdGVkIHNsaWRlXG4gIHRoaXMudW5zZWxlY3RTZWxlY3RlZFNsaWRlKCk7XG4gIC8vIHVwZGF0ZSBuZXcgc2VsZWN0ZWQgc2xpZGVcbiAgdGhpcy5zZWxlY3RlZFNsaWRlID0gc2xpZGU7XG4gIHNsaWRlLnNlbGVjdCgpO1xuICB0aGlzLnNlbGVjdGVkQ2VsbHMgPSBzbGlkZS5jZWxscztcbiAgdGhpcy5zZWxlY3RlZEVsZW1lbnRzID0gc2xpZGUuZ2V0Q2VsbEVsZW1lbnRzKCk7XG4gIC8vIEhBQ0s6IHNlbGVjdGVkQ2VsbCAmIHNlbGVjdGVkRWxlbWVudCBpcyBmaXJzdCBjZWxsIGluIHNsaWRlLCBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAvLyBSZW1vdmUgaW4gdjM/XG4gIHRoaXMuc2VsZWN0ZWRDZWxsID0gc2xpZGUuY2VsbHNbMF07XG4gIHRoaXMuc2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zZWxlY3RlZEVsZW1lbnRzWzBdO1xufTtcblxucHJvdG8udW5zZWxlY3RTZWxlY3RlZFNsaWRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5zZWxlY3RlZFNsaWRlICkge1xuICAgIHRoaXMuc2VsZWN0ZWRTbGlkZS51bnNlbGVjdCgpO1xuICB9XG59O1xuXG5wcm90by5zZWxlY3RJbml0aWFsSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgdmFyIGluaXRpYWxJbmRleCA9IHRoaXMub3B0aW9ucy5pbml0aWFsSW5kZXg7XG4gIC8vIGFscmVhZHkgYWN0aXZhdGVkLCBzZWxlY3QgcHJldmlvdXMgc2VsZWN0ZWRJbmRleFxuICBpZiAoIHRoaXMuaXNJbml0QWN0aXZhdGVkICkge1xuICAgIHRoaXMuc2VsZWN0KCB0aGlzLnNlbGVjdGVkSW5kZXgsIGZhbHNlLCB0cnVlICk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNlbGVjdCB3aXRoIHNlbGVjdG9yIHN0cmluZ1xuICBpZiAoIGluaXRpYWxJbmRleCAmJiB0eXBlb2YgaW5pdGlhbEluZGV4ID09ICdzdHJpbmcnICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5xdWVyeUNlbGwoIGluaXRpYWxJbmRleCApO1xuICAgIGlmICggY2VsbCApIHtcbiAgICAgIHRoaXMuc2VsZWN0Q2VsbCggaW5pdGlhbEluZGV4LCBmYWxzZSwgdHJ1ZSApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpbmRleCA9IDA7XG4gIC8vIHNlbGVjdCB3aXRoIG51bWJlclxuICBpZiAoIGluaXRpYWxJbmRleCAmJiB0aGlzLnNsaWRlc1sgaW5pdGlhbEluZGV4IF0gKSB7XG4gICAgaW5kZXggPSBpbml0aWFsSW5kZXg7XG4gIH1cbiAgLy8gc2VsZWN0IGluc3RhbnRseVxuICB0aGlzLnNlbGVjdCggaW5kZXgsIGZhbHNlLCB0cnVlICk7XG59O1xuXG4vKipcbiAqIHNlbGVjdCBzbGlkZSBmcm9tIG51bWJlciBvciBjZWxsIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudCBvciBOdW1iZXJ9IGVsZW1cbiAqL1xucHJvdG8uc2VsZWN0Q2VsbCA9IGZ1bmN0aW9uKCB2YWx1ZSwgaXNXcmFwLCBpc0luc3RhbnQgKSB7XG4gIC8vIGdldCBjZWxsXG4gIHZhciBjZWxsID0gdGhpcy5xdWVyeUNlbGwoIHZhbHVlICk7XG4gIGlmICggIWNlbGwgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGluZGV4ID0gdGhpcy5nZXRDZWxsU2xpZGVJbmRleCggY2VsbCApO1xuICB0aGlzLnNlbGVjdCggaW5kZXgsIGlzV3JhcCwgaXNJbnN0YW50ICk7XG59O1xuXG5wcm90by5nZXRDZWxsU2xpZGVJbmRleCA9IGZ1bmN0aW9uKCBjZWxsICkge1xuICAvLyBnZXQgaW5kZXggb2Ygc2xpZGVzIHRoYXQgaGFzIGNlbGxcbiAgZm9yICggdmFyIGk9MDsgaSA8IHRoaXMuc2xpZGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBzbGlkZSA9IHRoaXMuc2xpZGVzW2ldO1xuICAgIHZhciBpbmRleCA9IHNsaWRlLmNlbGxzLmluZGV4T2YoIGNlbGwgKTtcbiAgICBpZiAoIGluZGV4ICE9IC0xICkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBnZXQgY2VsbHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXQgRmxpY2tpdHkuQ2VsbCwgZ2l2ZW4gYW4gRWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcmV0dXJucyB7RmxpY2tpdHkuQ2VsbH0gaXRlbVxuICovXG5wcm90by5nZXRDZWxsID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIC8vIGxvb3AgdGhyb3VnaCBjZWxscyB0byBnZXQgdGhlIG9uZSB0aGF0IG1hdGNoZXNcbiAgZm9yICggdmFyIGk9MDsgaSA8IHRoaXMuY2VsbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxzW2ldO1xuICAgIGlmICggY2VsbC5lbGVtZW50ID09IGVsZW0gKSB7XG4gICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogZ2V0IGNvbGxlY3Rpb24gb2YgRmxpY2tpdHkuQ2VsbHMsIGdpdmVuIEVsZW1lbnRzXG4gKiBAcGFyYW0ge0VsZW1lbnQsIEFycmF5LCBOb2RlTGlzdH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gY2VsbHMgLSBGbGlja2l0eS5DZWxsc1xuICovXG5wcm90by5nZXRDZWxscyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHZhciBjZWxscyA9IFtdO1xuICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbCggZWxlbSApO1xuICAgIGlmICggY2VsbCApIHtcbiAgICAgIGNlbGxzLnB1c2goIGNlbGwgKTtcbiAgICB9XG4gIH0sIHRoaXMgKTtcbiAgcmV0dXJuIGNlbGxzO1xufTtcblxuLyoqXG4gKiBnZXQgY2VsbCBlbGVtZW50c1xuICogQHJldHVybnMge0FycmF5fSBjZWxsRWxlbXNcbiAqL1xucHJvdG8uZ2V0Q2VsbEVsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbGxzLm1hcCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgcmV0dXJuIGNlbGwuZWxlbWVudDtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGdldCBwYXJlbnQgY2VsbCBmcm9tIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHJldHVybnMge0ZsaWNraXQuQ2VsbH0gY2VsbFxuICovXG5wcm90by5nZXRQYXJlbnRDZWxsID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIC8vIGZpcnN0IGNoZWNrIGlmIGVsZW0gaXMgY2VsbFxuICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbCggZWxlbSApO1xuICBpZiAoIGNlbGwgKSB7XG4gICAgcmV0dXJuIGNlbGw7XG4gIH1cbiAgLy8gdHJ5IHRvIGdldCBwYXJlbnQgY2VsbCBlbGVtXG4gIGVsZW0gPSB1dGlscy5nZXRQYXJlbnQoIGVsZW0sICcuZmxpY2tpdHktc2xpZGVyID4gKicgKTtcbiAgcmV0dXJuIHRoaXMuZ2V0Q2VsbCggZWxlbSApO1xufTtcblxuLyoqXG4gKiBnZXQgY2VsbHMgYWRqYWNlbnQgdG8gYSBzbGlkZVxuICogQHBhcmFtIHtJbnRlZ2VyfSBhZGpDb3VudCAtIG51bWJlciBvZiBhZGphY2VudCBzbGlkZXNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBpbmRleCBvZiBzbGlkZSB0byBzdGFydFxuICogQHJldHVybnMge0FycmF5fSBjZWxscyAtIGFycmF5IG9mIEZsaWNraXR5LkNlbGxzXG4gKi9cbnByb3RvLmdldEFkamFjZW50Q2VsbEVsZW1lbnRzID0gZnVuY3Rpb24oIGFkakNvdW50LCBpbmRleCApIHtcbiAgaWYgKCAhYWRqQ291bnQgKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRTbGlkZS5nZXRDZWxsRWxlbWVudHMoKTtcbiAgfVxuICBpbmRleCA9IGluZGV4ID09PSB1bmRlZmluZWQgPyB0aGlzLnNlbGVjdGVkSW5kZXggOiBpbmRleDtcblxuICB2YXIgbGVuID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICBpZiAoIDEgKyAoIGFkakNvdW50ICogMiApID49IGxlbiApIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDZWxsRWxlbWVudHMoKTtcbiAgfVxuXG4gIHZhciBjZWxsRWxlbXMgPSBbXTtcbiAgZm9yICggdmFyIGkgPSBpbmRleCAtIGFkakNvdW50OyBpIDw9IGluZGV4ICsgYWRqQ291bnQgOyBpKysgKSB7XG4gICAgdmFyIHNsaWRlSW5kZXggPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCA/IHV0aWxzLm1vZHVsbyggaSwgbGVuICkgOiBpO1xuICAgIHZhciBzbGlkZSA9IHRoaXMuc2xpZGVzWyBzbGlkZUluZGV4IF07XG4gICAgaWYgKCBzbGlkZSApIHtcbiAgICAgIGNlbGxFbGVtcyA9IGNlbGxFbGVtcy5jb25jYXQoIHNsaWRlLmdldENlbGxFbGVtZW50cygpICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjZWxsRWxlbXM7XG59O1xuXG4vKipcbiAqIHNlbGVjdCBzbGlkZSBmcm9tIG51bWJlciBvciBjZWxsIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudCwgU2VsZWN0b3IgU3RyaW5nLCBvciBOdW1iZXJ9IHNlbGVjdG9yXG4gKi9cbnByb3RvLnF1ZXJ5Q2VsbCA9IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT0gJ251bWJlcicgKSB7XG4gICAgLy8gdXNlIG51bWJlciBhcyBpbmRleFxuICAgIHJldHVybiB0aGlzLmNlbGxzWyBzZWxlY3RvciBdO1xuICB9XG4gIGlmICggdHlwZW9mIHNlbGVjdG9yID09ICdzdHJpbmcnICkge1xuICAgIC8vIGRvIG5vdCBzZWxlY3QgaW52YWxpZCBzZWxlY3RvcnMgZnJvbSBoYXNoOiAjMTIzLCAjLy4gIzc5MVxuICAgIGlmICggc2VsZWN0b3IubWF0Y2goL15bI1xcLl0/W1xcZFxcL10vKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdXNlIHN0cmluZyBhcyBzZWxlY3RvciwgZ2V0IGVsZW1lbnRcbiAgICBzZWxlY3RvciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCBzZWxlY3RvciApO1xuICB9XG4gIC8vIGdldCBjZWxsIGZyb20gZWxlbWVudFxuICByZXR1cm4gdGhpcy5nZXRDZWxsKCBzZWxlY3RvciApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLnVpQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCd1aUNoYW5nZScpO1xufTtcblxuLy8ga2VlcCBmb2N1cyBvbiBlbGVtZW50IHdoZW4gY2hpbGQgVUkgZWxlbWVudHMgYXJlIGNsaWNrZWRcbnByb3RvLmNoaWxkVUlQb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgLy8gSEFDSyBpT1MgZG9lcyBub3QgYWxsb3cgdG91Y2ggZXZlbnRzIHRvIGJ1YmJsZSB1cD8hXG4gIGlmICggZXZlbnQudHlwZSAhPSAndG91Y2hzdGFydCcgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICB0aGlzLmZvY3VzKCk7XG59O1xuXG4vLyAtLS0tLSByZXNpemUgLS0tLS0gLy9cblxucHJvdG8ub25yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy53YXRjaENTUygpO1xuICB0aGlzLnJlc2l6ZSgpO1xufTtcblxudXRpbHMuZGVib3VuY2VNZXRob2QoIEZsaWNraXR5LCAnb25yZXNpemUnLCAxNTAgKTtcblxucHJvdG8ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNBY3RpdmUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZ2V0U2l6ZSgpO1xuICAvLyB3cmFwIHZhbHVlc1xuICBpZiAoIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICkge1xuICAgIHRoaXMueCA9IHV0aWxzLm1vZHVsbyggdGhpcy54LCB0aGlzLnNsaWRlYWJsZVdpZHRoICk7XG4gIH1cbiAgdGhpcy5wb3NpdGlvbkNlbGxzKCk7XG4gIHRoaXMuX2dldFdyYXBTaGlmdENlbGxzKCk7XG4gIHRoaXMuc2V0R2FsbGVyeVNpemUoKTtcbiAgdGhpcy5lbWl0RXZlbnQoJ3Jlc2l6ZScpO1xuICAvLyB1cGRhdGUgc2VsZWN0ZWQgaW5kZXggZm9yIGdyb3VwIHNsaWRlcywgaW5zdGFudFxuICAvLyBUT0RPOiBwb3NpdGlvbiBjYW4gYmUgbG9zdCBiZXR3ZWVuIGdyb3VwcyBvZiB2YXJpb3VzIG51bWJlcnNcbiAgdmFyIHNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc2VsZWN0ZWRFbGVtZW50cyAmJiB0aGlzLnNlbGVjdGVkRWxlbWVudHNbMF07XG4gIHRoaXMuc2VsZWN0Q2VsbCggc2VsZWN0ZWRFbGVtZW50LCBmYWxzZSwgdHJ1ZSApO1xufTtcblxuLy8gd2F0Y2hlcyB0aGUgOmFmdGVyIHByb3BlcnR5LCBhY3RpdmF0ZXMvZGVhY3RpdmF0ZXNcbnByb3RvLndhdGNoQ1NTID0gZnVuY3Rpb24oKSB7XG4gIHZhciB3YXRjaE9wdGlvbiA9IHRoaXMub3B0aW9ucy53YXRjaENTUztcbiAgaWYgKCAhd2F0Y2hPcHRpb24gKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGFmdGVyQ29udGVudCA9IGdldENvbXB1dGVkU3R5bGUoIHRoaXMuZWxlbWVudCwgJzphZnRlcicgKS5jb250ZW50O1xuICAvLyBhY3RpdmF0ZSBpZiA6YWZ0ZXIgeyBjb250ZW50OiAnZmxpY2tpdHknIH1cbiAgaWYgKCBhZnRlckNvbnRlbnQuaW5kZXhPZignZmxpY2tpdHknKSAhPSAtMSApIHtcbiAgICB0aGlzLmFjdGl2YXRlKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGtleWRvd24gLS0tLS0gLy9cblxuLy8gZ28gcHJldmlvdXMvbmV4dCBpZiBsZWZ0L3JpZ2h0IGtleXMgcHJlc3NlZFxucHJvdG8ub25rZXlkb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBvbmx5IHdvcmsgaWYgZWxlbWVudCBpcyBpbiBmb2N1c1xuICB2YXIgaXNOb3RGb2N1c2VkID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9IHRoaXMuZWxlbWVudDtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgfHxpc05vdEZvY3VzZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBGbGlja2l0eS5rZXlib2FyZEhhbmRsZXJzWyBldmVudC5rZXlDb2RlIF07XG4gIGlmICggaGFuZGxlciApIHtcbiAgICBoYW5kbGVyLmNhbGwoIHRoaXMgKTtcbiAgfVxufTtcblxuRmxpY2tpdHkua2V5Ym9hcmRIYW5kbGVycyA9IHtcbiAgLy8gbGVmdCBhcnJvd1xuICAzNzogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlZnRNZXRob2QgPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAnbmV4dCcgOiAncHJldmlvdXMnO1xuICAgIHRoaXMudWlDaGFuZ2UoKTtcbiAgICB0aGlzWyBsZWZ0TWV0aG9kIF0oKTtcbiAgfSxcbiAgLy8gcmlnaHQgYXJyb3dcbiAgMzk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciByaWdodE1ldGhvZCA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/ICdwcmV2aW91cycgOiAnbmV4dCc7XG4gICAgdGhpcy51aUNoYW5nZSgpO1xuICAgIHRoaXNbIHJpZ2h0TWV0aG9kIF0oKTtcbiAgfSxcbn07XG5cbi8vIC0tLS0tIGZvY3VzIC0tLS0tIC8vXG5cbnByb3RvLmZvY3VzID0gZnVuY3Rpb24oKSB7XG4gIC8vIFRPRE8gcmVtb3ZlIHNjcm9sbFRvIG9uY2UgZm9jdXMgb3B0aW9ucyBnZXRzIG1vcmUgc3VwcG9ydFxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTEVsZW1lbnQvZm9jdXMjQnJvd3Nlcl9jb21wYXRpYmlsaXR5XG4gIHZhciBwcmV2U2Nyb2xsWSA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgdGhpcy5lbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgLy8gaGFjayB0byBmaXggc2Nyb2xsIGp1bXAgYWZ0ZXIgZm9jdXMsICM3NlxuICBpZiAoIHdpbmRvdy5wYWdlWU9mZnNldCAhPSBwcmV2U2Nyb2xsWSApIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oIHdpbmRvdy5wYWdlWE9mZnNldCwgcHJldlNjcm9sbFkgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZGVzdHJveSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBkZWFjdGl2YXRlIGFsbCBGbGlja2l0eSBmdW5jdGlvbmFsaXR5LCBidXQga2VlcCBzdHVmZiBhdmFpbGFibGVcbnByb3RvLmRlYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0FjdGl2ZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaWNraXR5LWVuYWJsZWQnKTtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaWNraXR5LXJ0bCcpO1xuICB0aGlzLnVuc2VsZWN0U2VsZWN0ZWRTbGlkZSgpO1xuICAvLyBkZXN0cm95IGNlbGxzXG4gIHRoaXMuY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC5kZXN0cm95KCk7XG4gIH0pO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQoIHRoaXMudmlld3BvcnQgKTtcbiAgLy8gbW92ZSBjaGlsZCBlbGVtZW50cyBiYWNrIGludG8gZWxlbWVudFxuICBtb3ZlRWxlbWVudHMoIHRoaXMuc2xpZGVyLmNoaWxkcmVuLCB0aGlzLmVsZW1lbnQgKTtcbiAgaWYgKCB0aGlzLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSApIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd0YWJJbmRleCcpO1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIHRoaXMgKTtcbiAgfVxuICAvLyBzZXQgZmxhZ3NcbiAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLmVtaXRFdmVudCgnZGVhY3RpdmF0ZScpO1xufTtcblxucHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzICk7XG4gIHRoaXMuYWxsT2ZmKCk7XG4gIHRoaXMuZW1pdEV2ZW50KCdkZXN0cm95Jyk7XG4gIGlmICggalF1ZXJ5ICYmIHRoaXMuJGVsZW1lbnQgKSB7XG4gICAgalF1ZXJ5LnJlbW92ZURhdGEoIHRoaXMuZWxlbWVudCwgJ2ZsaWNraXR5JyApO1xuICB9XG4gIGRlbGV0ZSB0aGlzLmVsZW1lbnQuZmxpY2tpdHlHVUlEO1xuICBkZWxldGUgaW5zdGFuY2VzWyB0aGlzLmd1aWQgXTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIHByb3RvLCBhbmltYXRlUHJvdG90eXBlICk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGV4dHJhcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGdldCBGbGlja2l0eSBpbnN0YW5jZSBmcm9tIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHJldHVybnMge0ZsaWNraXR5fVxuICovXG5GbGlja2l0eS5kYXRhID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIGVsZW0gPSB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIGVsZW0gKTtcbiAgdmFyIGlkID0gZWxlbSAmJiBlbGVtLmZsaWNraXR5R1VJRDtcbiAgcmV0dXJuIGlkICYmIGluc3RhbmNlc1sgaWQgXTtcbn07XG5cbnV0aWxzLmh0bWxJbml0KCBGbGlja2l0eSwgJ2ZsaWNraXR5JyApO1xuXG5pZiAoIGpRdWVyeSAmJiBqUXVlcnkuYnJpZGdldCApIHtcbiAgalF1ZXJ5LmJyaWRnZXQoICdmbGlja2l0eScsIEZsaWNraXR5ICk7XG59XG5cbi8vIHNldCBpbnRlcm5hbCBqUXVlcnksIGZvciBXZWJwYWNrICsgalF1ZXJ5IHYzLCAjNDc4XG5GbGlja2l0eS5zZXRKUXVlcnkgPSBmdW5jdGlvbigganEgKSB7XG4gIGpRdWVyeSA9IGpxO1xufTtcblxuRmxpY2tpdHkuQ2VsbCA9IENlbGw7XG5GbGlja2l0eS5TbGlkZSA9IFNsaWRlO1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8qIVxuICogRmxpY2tpdHkgdjIuMi4xXG4gKiBUb3VjaCwgcmVzcG9uc2l2ZSwgZmxpY2thYmxlIGNhcm91c2Vsc1xuICpcbiAqIExpY2Vuc2VkIEdQTHYzIGZvciBvcGVuIHNvdXJjZSB1c2VcbiAqIG9yIEZsaWNraXR5IENvbW1lcmNpYWwgTGljZW5zZSBmb3IgY29tbWVyY2lhbCB1c2VcbiAqXG4gKiBodHRwczovL2ZsaWNraXR5Lm1ldGFmaXp6eS5jb1xuICogQ29weXJpZ2h0IDIwMTUtMjAxOSBNZXRhZml6enlcbiAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJy4vZHJhZycsXG4gICAgICAnLi9wcmV2LW5leHQtYnV0dG9uJyxcbiAgICAgICcuL3BhZ2UtZG90cycsXG4gICAgICAnLi9wbGF5ZXInLFxuICAgICAgJy4vYWRkLXJlbW92ZS1jZWxsJyxcbiAgICAgICcuL2xhenlsb2FkJ1xuICAgIF0sIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJy4vZHJhZycpLFxuICAgICAgcmVxdWlyZSgnLi9wcmV2LW5leHQtYnV0dG9uJyksXG4gICAgICByZXF1aXJlKCcuL3BhZ2UtZG90cycpLFxuICAgICAgcmVxdWlyZSgnLi9wbGF5ZXInKSxcbiAgICAgIHJlcXVpcmUoJy4vYWRkLXJlbW92ZS1jZWxsJyksXG4gICAgICByZXF1aXJlKCcuL2xhenlsb2FkJylcbiAgICApO1xuICB9XG5cbn0pKCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIEZsaWNraXR5ICkge1xuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlKi9cbiAgcmV0dXJuIEZsaWNraXR5O1xufSk7XG4iLCIvLyBsYXp5bG9hZFxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIHV0aWxzICkge1xuJ3VzZSBzdHJpY3QnO1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVMYXp5bG9hZCcpO1xudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG5wcm90by5fY3JlYXRlTGF6eWxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vbiggJ3NlbGVjdCcsIHRoaXMubGF6eUxvYWQgKTtcbn07XG5cbnByb3RvLmxhenlMb2FkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsYXp5TG9hZCA9IHRoaXMub3B0aW9ucy5sYXp5TG9hZDtcbiAgaWYgKCAhbGF6eUxvYWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGdldCBhZGphY2VudCBjZWxscywgdXNlIGxhenlMb2FkIG9wdGlvbiBmb3IgYWRqYWNlbnQgY291bnRcbiAgdmFyIGFkakNvdW50ID0gdHlwZW9mIGxhenlMb2FkID09ICdudW1iZXInID8gbGF6eUxvYWQgOiAwO1xuICB2YXIgY2VsbEVsZW1zID0gdGhpcy5nZXRBZGphY2VudENlbGxFbGVtZW50cyggYWRqQ291bnQgKTtcbiAgLy8gZ2V0IGxhenkgaW1hZ2VzIGluIHRob3NlIGNlbGxzXG4gIHZhciBsYXp5SW1hZ2VzID0gW107XG4gIGNlbGxFbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbEVsZW0gKSB7XG4gICAgdmFyIGxhenlDZWxsSW1hZ2VzID0gZ2V0Q2VsbExhenlJbWFnZXMoIGNlbGxFbGVtICk7XG4gICAgbGF6eUltYWdlcyA9IGxhenlJbWFnZXMuY29uY2F0KCBsYXp5Q2VsbEltYWdlcyApO1xuICB9KTtcbiAgLy8gbG9hZCBsYXp5IGltYWdlc1xuICBsYXp5SW1hZ2VzLmZvckVhY2goIGZ1bmN0aW9uKCBpbWcgKSB7XG4gICAgbmV3IExhenlMb2FkZXIoIGltZywgdGhpcyApO1xuICB9LCB0aGlzICk7XG59O1xuXG5mdW5jdGlvbiBnZXRDZWxsTGF6eUltYWdlcyggY2VsbEVsZW0gKSB7XG4gIC8vIGNoZWNrIGlmIGNlbGwgZWxlbWVudCBpcyBsYXp5IGltYWdlXG4gIGlmICggY2VsbEVsZW0ubm9kZU5hbWUgPT0gJ0lNRycgKSB7XG4gICAgdmFyIGxhenlsb2FkQXR0ciA9IGNlbGxFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZCcpO1xuICAgIHZhciBzcmNBdHRyID0gY2VsbEVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyYycpO1xuICAgIHZhciBzcmNzZXRBdHRyID0gY2VsbEVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyY3NldCcpO1xuICAgIGlmICggbGF6eWxvYWRBdHRyIHx8IHNyY0F0dHIgfHwgc3Jjc2V0QXR0ciApIHtcbiAgICAgIHJldHVybiBbIGNlbGxFbGVtIF07XG4gICAgfVxuICB9XG4gIC8vIHNlbGVjdCBsYXp5IGltYWdlcyBpbiBjZWxsXG4gIHZhciBsYXp5U2VsZWN0b3IgPSAnaW1nW2RhdGEtZmxpY2tpdHktbGF6eWxvYWRdLCAnICtcbiAgICAnaW1nW2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3JjXSwgaW1nW2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3Jjc2V0XSc7XG4gIHZhciBpbWdzID0gY2VsbEVsZW0ucXVlcnlTZWxlY3RvckFsbCggbGF6eVNlbGVjdG9yICk7XG4gIHJldHVybiB1dGlscy5tYWtlQXJyYXkoIGltZ3MgKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTGF6eUxvYWRlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGNsYXNzIHRvIGhhbmRsZSBsb2FkaW5nIGltYWdlc1xuICovXG5mdW5jdGlvbiBMYXp5TG9hZGVyKCBpbWcsIGZsaWNraXR5ICkge1xuICB0aGlzLmltZyA9IGltZztcbiAgdGhpcy5mbGlja2l0eSA9IGZsaWNraXR5O1xuICB0aGlzLmxvYWQoKTtcbn1cblxuTGF6eUxvYWRlci5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSB1dGlscy5oYW5kbGVFdmVudDtcblxuTGF6eUxvYWRlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuICAvLyBnZXQgc3JjICYgc3Jjc2V0XG4gIHZhciBzcmMgPSB0aGlzLmltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQnKSB8fFxuICAgIHRoaXMuaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmMnKTtcbiAgdmFyIHNyY3NldCA9IHRoaXMuaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmNzZXQnKTtcbiAgLy8gc2V0IHNyYyAmIHNlcnNldFxuICB0aGlzLmltZy5zcmMgPSBzcmM7XG4gIGlmICggc3Jjc2V0ICkge1xuICAgIHRoaXMuaW1nLnNldEF0dHJpYnV0ZSggJ3NyY3NldCcsIHNyY3NldCApO1xuICB9XG4gIC8vIHJlbW92ZSBhdHRyXG4gIHRoaXMuaW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZCcpO1xuICB0aGlzLmltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3JjJyk7XG4gIHRoaXMuaW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmNzZXQnKTtcbn07XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLm9ubG9hZCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5jb21wbGV0ZSggZXZlbnQsICdmbGlja2l0eS1sYXp5bG9hZGVkJyApO1xufTtcblxuTGF6eUxvYWRlci5wcm90b3R5cGUub25lcnJvciA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5jb21wbGV0ZSggZXZlbnQsICdmbGlja2l0eS1sYXp5ZXJyb3InICk7XG59O1xuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uKCBldmVudCwgY2xhc3NOYW1lICkge1xuICAvLyB1bmJpbmQgZXZlbnRzXG4gIHRoaXMuaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLmltZy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG5cbiAgdmFyIGNlbGwgPSB0aGlzLmZsaWNraXR5LmdldFBhcmVudENlbGwoIHRoaXMuaW1nICk7XG4gIHZhciBjZWxsRWxlbSA9IGNlbGwgJiYgY2VsbC5lbGVtZW50O1xuICB0aGlzLmZsaWNraXR5LmNlbGxTaXplQ2hhbmdlKCBjZWxsRWxlbSApO1xuXG4gIHRoaXMuaW1nLmNsYXNzTGlzdC5hZGQoIGNsYXNzTmFtZSApO1xuICB0aGlzLmZsaWNraXR5LmRpc3BhdGNoRXZlbnQoICdsYXp5TG9hZCcsIGV2ZW50LCBjZWxsRWxlbSApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbkZsaWNraXR5LkxhenlMb2FkZXIgPSBMYXp5TG9hZGVyO1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIHBhZ2UgZG90c1xuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICd1bmlwb2ludGVyL3VuaXBvaW50ZXInLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ3VuaXBvaW50ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5Vbmlwb2ludGVyLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApIHtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGFnZURvdHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBQYWdlRG90cyggcGFyZW50ICkge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5fY3JlYXRlKCk7XG59XG5cblBhZ2VEb3RzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVuaXBvaW50ZXIucHJvdG90eXBlICk7XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNyZWF0ZSBob2xkZXIgZWxlbWVudFxuICB0aGlzLmhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29sJyk7XG4gIHRoaXMuaG9sZGVyLmNsYXNzTmFtZSA9ICdmbGlja2l0eS1wYWdlLWRvdHMnO1xuICAvLyBjcmVhdGUgZG90cywgYXJyYXkgb2YgZWxlbWVudHNcbiAgdGhpcy5kb3RzID0gW107XG4gIC8vIGV2ZW50c1xuICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQoIHRoaXMgKTtcbiAgdGhpcy5vbiggJ3BvaW50ZXJEb3duJywgdGhpcy5wYXJlbnQuY2hpbGRVSVBvaW50ZXJEb3duLmJpbmQoIHRoaXMucGFyZW50ICkgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldERvdHMoKTtcbiAgdGhpcy5ob2xkZXIuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayApO1xuICB0aGlzLmJpbmRTdGFydEV2ZW50KCB0aGlzLmhvbGRlciApO1xuICAvLyBhZGQgdG8gRE9NXG4gIHRoaXMucGFyZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQoIHRoaXMuaG9sZGVyICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmhvbGRlci5yZW1vdmVFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrICk7XG4gIHRoaXMudW5iaW5kU3RhcnRFdmVudCggdGhpcy5ob2xkZXIgKTtcbiAgLy8gcmVtb3ZlIGZyb20gRE9NXG4gIHRoaXMucGFyZW50LmVsZW1lbnQucmVtb3ZlQ2hpbGQoIHRoaXMuaG9sZGVyICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuc2V0RG90cyA9IGZ1bmN0aW9uKCkge1xuICAvLyBnZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIG51bWJlciBvZiBzbGlkZXMgYW5kIG51bWJlciBvZiBkb3RzXG4gIHZhciBkZWx0YSA9IHRoaXMucGFyZW50LnNsaWRlcy5sZW5ndGggLSB0aGlzLmRvdHMubGVuZ3RoO1xuICBpZiAoIGRlbHRhID4gMCApIHtcbiAgICB0aGlzLmFkZERvdHMoIGRlbHRhICk7XG4gIH0gZWxzZSBpZiAoIGRlbHRhIDwgMCApIHtcbiAgICB0aGlzLnJlbW92ZURvdHMoIC1kZWx0YSApO1xuICB9XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuYWRkRG90cyA9IGZ1bmN0aW9uKCBjb3VudCApIHtcbiAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB2YXIgbmV3RG90cyA9IFtdO1xuICB2YXIgbGVuZ3RoID0gdGhpcy5kb3RzLmxlbmd0aDtcbiAgdmFyIG1heCA9IGxlbmd0aCArIGNvdW50O1xuXG4gIGZvciAoIHZhciBpID0gbGVuZ3RoOyBpIDwgbWF4OyBpKysgKSB7XG4gICAgdmFyIGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZG90LmNsYXNzTmFtZSA9ICdkb3QnO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGUoICdhcmlhLWxhYmVsJywgJ1BhZ2UgZG90ICcgKyAoIGkgKyAxICkgKTtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCggZG90ICk7XG4gICAgbmV3RG90cy5wdXNoKCBkb3QgKTtcbiAgfVxuXG4gIHRoaXMuaG9sZGVyLmFwcGVuZENoaWxkKCBmcmFnbWVudCApO1xuICB0aGlzLmRvdHMgPSB0aGlzLmRvdHMuY29uY2F0KCBuZXdEb3RzICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUucmVtb3ZlRG90cyA9IGZ1bmN0aW9uKCBjb3VudCApIHtcbiAgLy8gcmVtb3ZlIGZyb20gdGhpcy5kb3RzIGNvbGxlY3Rpb25cbiAgdmFyIHJlbW92ZURvdHMgPSB0aGlzLmRvdHMuc3BsaWNlKCB0aGlzLmRvdHMubGVuZ3RoIC0gY291bnQsIGNvdW50ICk7XG4gIC8vIHJlbW92ZSBmcm9tIERPTVxuICByZW1vdmVEb3RzLmZvckVhY2goIGZ1bmN0aW9uKCBkb3QgKSB7XG4gICAgdGhpcy5ob2xkZXIucmVtb3ZlQ2hpbGQoIGRvdCApO1xuICB9LCB0aGlzICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUudXBkYXRlU2VsZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVtb3ZlIHNlbGVjdGVkIGNsYXNzIG9uIHByZXZpb3VzXG4gIGlmICggdGhpcy5zZWxlY3RlZERvdCApIHtcbiAgICB0aGlzLnNlbGVjdGVkRG90LmNsYXNzTmFtZSA9ICdkb3QnO1xuICAgIHRoaXMuc2VsZWN0ZWREb3QucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnKTtcbiAgfVxuICAvLyBkb24ndCBwcm9jZWVkIGlmIG5vIGRvdHNcbiAgaWYgKCAhdGhpcy5kb3RzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5zZWxlY3RlZERvdCA9IHRoaXMuZG90c1sgdGhpcy5wYXJlbnQuc2VsZWN0ZWRJbmRleCBdO1xuICB0aGlzLnNlbGVjdGVkRG90LmNsYXNzTmFtZSA9ICdkb3QgaXMtc2VsZWN0ZWQnO1xuICB0aGlzLnNlbGVjdGVkRG90LnNldEF0dHJpYnV0ZSggJ2FyaWEtY3VycmVudCcsICdzdGVwJyApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLm9uVGFwID0gLy8gb2xkIG1ldGhvZCBuYW1lLCBiYWNrd2FyZHMtY29tcGF0aWJsZVxuUGFnZURvdHMucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gIC8vIG9ubHkgY2FyZSBhYm91dCBkb3QgY2xpY2tzXG4gIGlmICggdGFyZ2V0Lm5vZGVOYW1lICE9ICdMSScgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5wYXJlbnQudWlDaGFuZ2UoKTtcbiAgdmFyIGluZGV4ID0gdGhpcy5kb3RzLmluZGV4T2YoIHRhcmdldCApO1xuICB0aGlzLnBhcmVudC5zZWxlY3QoIGluZGV4ICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgdGhpcy5hbGxPZmYoKTtcbn07XG5cbkZsaWNraXR5LlBhZ2VEb3RzID0gUGFnZURvdHM7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZsaWNraXR5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggRmxpY2tpdHkuZGVmYXVsdHMsIHtcbiAgcGFnZURvdHM6IHRydWVcbn0pO1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVQYWdlRG90cycpO1xuXG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMucGFnZURvdHMgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucGFnZURvdHMgPSBuZXcgUGFnZURvdHMoIHRoaXMgKTtcbiAgLy8gZXZlbnRzXG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMuYWN0aXZhdGVQYWdlRG90cyApO1xuICB0aGlzLm9uKCAnc2VsZWN0JywgdGhpcy51cGRhdGVTZWxlY3RlZFBhZ2VEb3RzICk7XG4gIHRoaXMub24oICdjZWxsQ2hhbmdlJywgdGhpcy51cGRhdGVQYWdlRG90cyApO1xuICB0aGlzLm9uKCAncmVzaXplJywgdGhpcy51cGRhdGVQYWdlRG90cyApO1xuICB0aGlzLm9uKCAnZGVhY3RpdmF0ZScsIHRoaXMuZGVhY3RpdmF0ZVBhZ2VEb3RzICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZVBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFnZURvdHMuYWN0aXZhdGUoKTtcbn07XG5cbnByb3RvLnVwZGF0ZVNlbGVjdGVkUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy51cGRhdGVTZWxlY3RlZCgpO1xufTtcblxucHJvdG8udXBkYXRlUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy5zZXREb3RzKCk7XG59O1xuXG5wcm90by5kZWFjdGl2YXRlUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy5kZWFjdGl2YXRlKCk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuRmxpY2tpdHkuUGFnZURvdHMgPSBQYWdlRG90cztcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBwbGF5ZXIgJiBhdXRvUGxheVxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdldi1lbWl0dGVyL2V2LWVtaXR0ZXInLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJyxcbiAgICAgICcuL2ZsaWNraXR5J1xuICAgIF0sIGZ1bmN0aW9uKCBFdkVtaXR0ZXIsIHV0aWxzLCBGbGlja2l0eSApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCBFdkVtaXR0ZXIsIHV0aWxzLCBGbGlja2l0eSApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LkV2RW1pdHRlcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHMsXG4gICAgICB3aW5kb3cuRmxpY2tpdHlcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggRXZFbWl0dGVyLCB1dGlscywgRmxpY2tpdHkgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGxheWVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIFBsYXllciggcGFyZW50ICkge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5zdGF0ZSA9ICdzdG9wcGVkJztcbiAgLy8gdmlzaWJpbGl0eSBjaGFuZ2UgZXZlbnQgaGFuZGxlclxuICB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSA9IHRoaXMudmlzaWJpbGl0eUNoYW5nZS5iaW5kKCB0aGlzICk7XG4gIHRoaXMub25WaXNpYmlsaXR5UGxheSA9IHRoaXMudmlzaWJpbGl0eVBsYXkuYmluZCggdGhpcyApO1xufVxuXG5QbGF5ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG4vLyBzdGFydCBwbGF5XG5QbGF5ZXIucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLnN0YXRlID09ICdwbGF5aW5nJyApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZG8gbm90IHBsYXkgaWYgcGFnZSBpcyBoaWRkZW4sIHN0YXJ0IHBsYXlpbmcgd2hlbiBwYWdlIGlzIHZpc2libGVcbiAgdmFyIGlzUGFnZUhpZGRlbiA9IGRvY3VtZW50LmhpZGRlbjtcbiAgaWYgKCBpc1BhZ2VIaWRkZW4gKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3Zpc2liaWxpdHljaGFuZ2UnLCB0aGlzLm9uVmlzaWJpbGl0eVBsYXkgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnN0YXRlID0gJ3BsYXlpbmcnO1xuICAvLyBsaXN0ZW4gdG8gdmlzaWJpbGl0eSBjaGFuZ2VcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3Zpc2liaWxpdHljaGFuZ2UnLCB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSApO1xuICAvLyBzdGFydCB0aWNraW5nXG4gIHRoaXMudGljaygpO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24oKSB7XG4gIC8vIGRvIG5vdCB0aWNrIGlmIG5vdCBwbGF5aW5nXG4gIGlmICggdGhpcy5zdGF0ZSAhPSAncGxheWluZycgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRpbWUgPSB0aGlzLnBhcmVudC5vcHRpb25zLmF1dG9QbGF5O1xuICAvLyBkZWZhdWx0IHRvIDMgc2Vjb25kc1xuICB0aW1lID0gdHlwZW9mIHRpbWUgPT0gJ251bWJlcicgPyB0aW1lIDogMzAwMDtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgLy8gSEFDSzogcmVzZXQgdGlja3MgaWYgc3RvcHBlZCBhbmQgc3RhcnRlZCB3aXRoaW4gaW50ZXJ2YWxcbiAgdGhpcy5jbGVhcigpO1xuICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICBfdGhpcy5wYXJlbnQubmV4dCggdHJ1ZSApO1xuICAgIF90aGlzLnRpY2soKTtcbiAgfSwgdGltZSApO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc3RhdGUgPSAnc3RvcHBlZCc7XG4gIHRoaXMuY2xlYXIoKTtcbiAgLy8gcmVtb3ZlIHZpc2liaWxpdHkgY2hhbmdlIGV2ZW50XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UgKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgY2xlYXJUaW1lb3V0KCB0aGlzLnRpbWVvdXQgKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLnN0YXRlID09ICdwbGF5aW5nJyApIHtcbiAgICB0aGlzLnN0YXRlID0gJ3BhdXNlZCc7XG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnVucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmUtc3RhcnQgcGxheSBpZiBwYXVzZWRcbiAgaWYgKCB0aGlzLnN0YXRlID09ICdwYXVzZWQnICkge1xuICAgIHRoaXMucGxheSgpO1xuICB9XG59O1xuXG4vLyBwYXVzZSBpZiBwYWdlIHZpc2liaWxpdHkgaXMgaGlkZGVuLCB1bnBhdXNlIGlmIHZpc2libGVcblBsYXllci5wcm90b3R5cGUudmlzaWJpbGl0eUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXNQYWdlSGlkZGVuID0gZG9jdW1lbnQuaGlkZGVuO1xuICB0aGlzWyBpc1BhZ2VIaWRkZW4gPyAncGF1c2UnIDogJ3VucGF1c2UnIF0oKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUudmlzaWJpbGl0eVBsYXkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5KCk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy5vblZpc2liaWxpdHlQbGF5ICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGbGlja2l0eSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIEZsaWNraXR5LmRlZmF1bHRzLCB7XG4gIHBhdXNlQXV0b1BsYXlPbkhvdmVyOiB0cnVlXG59KTtcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlUGxheWVyJyk7XG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKCB0aGlzICk7XG5cbiAgdGhpcy5vbiggJ2FjdGl2YXRlJywgdGhpcy5hY3RpdmF0ZVBsYXllciApO1xuICB0aGlzLm9uKCAndWlDaGFuZ2UnLCB0aGlzLnN0b3BQbGF5ZXIgKTtcbiAgdGhpcy5vbiggJ3BvaW50ZXJEb3duJywgdGhpcy5zdG9wUGxheWVyICk7XG4gIHRoaXMub24oICdkZWFjdGl2YXRlJywgdGhpcy5kZWFjdGl2YXRlUGxheWVyICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuYXV0b1BsYXkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucGxheWVyLnBsYXkoKTtcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWVudGVyJywgdGhpcyApO1xufTtcblxuLy8gUGxheWVyIEFQSSwgZG9uJ3QgaGF0ZSB0aGUgLi4uIHRoYW5rcyBJIGtub3cgd2hlcmUgdGhlIGRvb3IgaXNcblxucHJvdG8ucGxheVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci5wbGF5KCk7XG59O1xuXG5wcm90by5zdG9wUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnN0b3AoKTtcbn07XG5cbnByb3RvLnBhdXNlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnBhdXNlKCk7XG59O1xuXG5wcm90by51bnBhdXNlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnVucGF1c2UoKTtcbn07XG5cbnByb3RvLmRlYWN0aXZhdGVQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlZW50ZXInLCB0aGlzICk7XG59O1xuXG4vLyAtLS0tLSBtb3VzZWVudGVyL2xlYXZlIC0tLS0tIC8vXG5cbi8vIHBhdXNlIGF1dG8tcGxheSBvbiBob3ZlclxucHJvdG8ub25tb3VzZWVudGVyID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5wYXVzZUF1dG9QbGF5T25Ib3ZlciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5wbGF5ZXIucGF1c2UoKTtcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWxlYXZlJywgdGhpcyApO1xufTtcblxuLy8gcmVzdW1lIGF1dG8tcGxheSBvbiBob3ZlciBvZmZcbnByb3RvLm9ubW91c2VsZWF2ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci51bnBhdXNlKCk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2VsZWF2ZScsIHRoaXMgKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5GbGlja2l0eS5QbGF5ZXIgPSBQbGF5ZXI7XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gcHJldi9uZXh0IGJ1dHRvbnNcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAndW5pcG9pbnRlci91bmlwb2ludGVyJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCd1bmlwb2ludGVyJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuVW5pcG9pbnRlcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdmdVUkkgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQcmV2TmV4dEJ1dHRvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBQcmV2TmV4dEJ1dHRvbiggZGlyZWN0aW9uLCBwYXJlbnQgKSB7XG4gIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5fY3JlYXRlKCk7XG59XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVuaXBvaW50ZXIucHJvdG90eXBlICk7XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHByb3BlcnRpZXNcbiAgdGhpcy5pc0VuYWJsZWQgPSB0cnVlO1xuICB0aGlzLmlzUHJldmlvdXMgPSB0aGlzLmRpcmVjdGlvbiA9PSAtMTtcbiAgdmFyIGxlZnREaXJlY3Rpb24gPSB0aGlzLnBhcmVudC5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gMSA6IC0xO1xuICB0aGlzLmlzTGVmdCA9IHRoaXMuZGlyZWN0aW9uID09IGxlZnREaXJlY3Rpb247XG5cbiAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmxpY2tpdHktYnV0dG9uIGZsaWNraXR5LXByZXYtbmV4dC1idXR0b24nO1xuICBlbGVtZW50LmNsYXNzTmFtZSArPSB0aGlzLmlzUHJldmlvdXMgPyAnIHByZXZpb3VzJyA6ICcgbmV4dCc7XG4gIC8vIHByZXZlbnQgYnV0dG9uIGZyb20gc3VibWl0dGluZyBmb3JtIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEwODM2MDc2LzE4MjE4M1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSggJ3R5cGUnLCAnYnV0dG9uJyApO1xuICAvLyBpbml0IGFzIGRpc2FibGVkXG4gIHRoaXMuZGlzYWJsZSgpO1xuXG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCAnYXJpYS1sYWJlbCcsIHRoaXMuaXNQcmV2aW91cyA/ICdQcmV2aW91cycgOiAnTmV4dCcgKTtcblxuICAvLyBjcmVhdGUgYXJyb3dcbiAgdmFyIHN2ZyA9IHRoaXMuY3JlYXRlU1ZHKCk7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoIHN2ZyApO1xuICAvLyBldmVudHNcbiAgdGhpcy5wYXJlbnQub24oICdzZWxlY3QnLCB0aGlzLnVwZGF0ZS5iaW5kKCB0aGlzICkgKTtcbiAgdGhpcy5vbiggJ3BvaW50ZXJEb3duJywgdGhpcy5wYXJlbnQuY2hpbGRVSVBvaW50ZXJEb3duLmJpbmQoIHRoaXMucGFyZW50ICkgKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmJpbmRTdGFydEV2ZW50KCB0aGlzLmVsZW1lbnQgKTtcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMgKTtcbiAgLy8gYWRkIHRvIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlbW92ZSBmcm9tIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbiAgLy8gY2xpY2sgZXZlbnRzXG4gIHRoaXMudW5iaW5kU3RhcnRFdmVudCggdGhpcy5lbGVtZW50ICk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzICk7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlU1ZHID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoIHN2Z1VSSSwgJ3N2ZycpO1xuICBzdmcuc2V0QXR0cmlidXRlKCAnY2xhc3MnLCAnZmxpY2tpdHktYnV0dG9uLWljb24nICk7XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoICd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyApO1xuICB2YXIgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyggc3ZnVVJJLCAncGF0aCcpO1xuICB2YXIgcGF0aE1vdmVtZW50cyA9IGdldEFycm93TW92ZW1lbnRzKCB0aGlzLnBhcmVudC5vcHRpb25zLmFycm93U2hhcGUgKTtcbiAgcGF0aC5zZXRBdHRyaWJ1dGUoICdkJywgcGF0aE1vdmVtZW50cyApO1xuICBwYXRoLnNldEF0dHJpYnV0ZSggJ2NsYXNzJywgJ2Fycm93JyApO1xuICAvLyByb3RhdGUgYXJyb3dcbiAgaWYgKCAhdGhpcy5pc0xlZnQgKSB7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDEwMCwgMTAwKSByb3RhdGUoMTgwKSAnICk7XG4gIH1cbiAgc3ZnLmFwcGVuZENoaWxkKCBwYXRoICk7XG4gIHJldHVybiBzdmc7XG59O1xuXG4vLyBnZXQgU1ZHIHBhdGggbW92bWVtZW50XG5mdW5jdGlvbiBnZXRBcnJvd01vdmVtZW50cyggc2hhcGUgKSB7XG4gIC8vIHVzZSBzaGFwZSBhcyBtb3ZlbWVudCBpZiBzdHJpbmdcbiAgaWYgKCB0eXBlb2Ygc2hhcGUgPT0gJ3N0cmluZycgKSB7XG4gICAgcmV0dXJuIHNoYXBlO1xuICB9XG4gIC8vIGNyZWF0ZSBtb3ZlbWVudCBzdHJpbmdcbiAgcmV0dXJuICdNICcgKyBzaGFwZS54MCArICcsNTAnICtcbiAgICAnIEwgJyArIHNoYXBlLngxICsgJywnICsgKCBzaGFwZS55MSArIDUwICkgK1xuICAgICcgTCAnICsgc2hhcGUueDIgKyAnLCcgKyAoIHNoYXBlLnkyICsgNTAgKSArXG4gICAgJyBMICcgKyBzaGFwZS54MyArICcsNTAgJyArXG4gICAgJyBMICcgKyBzaGFwZS54MiArICcsJyArICggNTAgLSBzaGFwZS55MiApICtcbiAgICAnIEwgJyArIHNoYXBlLngxICsgJywnICsgKCA1MCAtIHNoYXBlLnkxICkgK1xuICAgICcgWic7XG59XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IHV0aWxzLmhhbmRsZUV2ZW50O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzRW5hYmxlZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5wYXJlbnQudWlDaGFuZ2UoKTtcbiAgdmFyIG1ldGhvZCA9IHRoaXMuaXNQcmV2aW91cyA/ICdwcmV2aW91cycgOiAnbmV4dCc7XG4gIHRoaXMucGFyZW50WyBtZXRob2QgXSgpO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmlzRW5hYmxlZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5lbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gIHRoaXMuaXNFbmFibGVkID0gdHJ1ZTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNFbmFibGVkICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICB0aGlzLmlzRW5hYmxlZCA9IGZhbHNlO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBpbmRleCBvZiBmaXJzdCBvciBsYXN0IHNsaWRlLCBpZiBwcmV2aW91cyBvciBuZXh0XG4gIHZhciBzbGlkZXMgPSB0aGlzLnBhcmVudC5zbGlkZXM7XG4gIC8vIGVuYWJsZSBpcyB3cmFwQXJvdW5kIGFuZCBhdCBsZWFzdCAyIHNsaWRlc1xuICBpZiAoIHRoaXMucGFyZW50Lm9wdGlvbnMud3JhcEFyb3VuZCAmJiBzbGlkZXMubGVuZ3RoID4gMSApIHtcbiAgICB0aGlzLmVuYWJsZSgpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gc2xpZGVzLmxlbmd0aCA/IHNsaWRlcy5sZW5ndGggLSAxIDogMDtcbiAgdmFyIGJvdW5kSW5kZXggPSB0aGlzLmlzUHJldmlvdXMgPyAwIDogbGFzdEluZGV4O1xuICB2YXIgbWV0aG9kID0gdGhpcy5wYXJlbnQuc2VsZWN0ZWRJbmRleCA9PSBib3VuZEluZGV4ID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gIHRoaXNbIG1ldGhvZCBdKCk7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgdGhpcy5hbGxPZmYoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZsaWNraXR5IHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIEZsaWNraXR5LmRlZmF1bHRzLCB7XG4gIHByZXZOZXh0QnV0dG9uczogdHJ1ZSxcbiAgYXJyb3dTaGFwZToge1xuICAgIHgwOiAxMCxcbiAgICB4MTogNjAsIHkxOiA1MCxcbiAgICB4MjogNzAsIHkyOiA0MCxcbiAgICB4MzogMzBcbiAgfVxufSk7XG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZVByZXZOZXh0QnV0dG9ucycpO1xudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG5wcm90by5fY3JlYXRlUHJldk5leHRCdXR0b25zID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5wcmV2TmV4dEJ1dHRvbnMgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5wcmV2QnV0dG9uID0gbmV3IFByZXZOZXh0QnV0dG9uKCAtMSwgdGhpcyApO1xuICB0aGlzLm5leHRCdXR0b24gPSBuZXcgUHJldk5leHRCdXR0b24oIDEsIHRoaXMgKTtcblxuICB0aGlzLm9uKCAnYWN0aXZhdGUnLCB0aGlzLmFjdGl2YXRlUHJldk5leHRCdXR0b25zICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZVByZXZOZXh0QnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnByZXZCdXR0b24uYWN0aXZhdGUoKTtcbiAgdGhpcy5uZXh0QnV0dG9uLmFjdGl2YXRlKCk7XG4gIHRoaXMub24oICdkZWFjdGl2YXRlJywgdGhpcy5kZWFjdGl2YXRlUHJldk5leHRCdXR0b25zICk7XG59O1xuXG5wcm90by5kZWFjdGl2YXRlUHJldk5leHRCdXR0b25zID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucHJldkJ1dHRvbi5kZWFjdGl2YXRlKCk7XG4gIHRoaXMubmV4dEJ1dHRvbi5kZWFjdGl2YXRlKCk7XG4gIHRoaXMub2ZmKCAnZGVhY3RpdmF0ZScsIHRoaXMuZGVhY3RpdmF0ZVByZXZOZXh0QnV0dG9ucyApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbkZsaWNraXR5LlByZXZOZXh0QnV0dG9uID0gUHJldk5leHRCdXR0b247XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gc2xpZGVcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IHdpbmRvdy5GbGlja2l0eSB8fCB7fTtcbiAgICB3aW5kb3cuRmxpY2tpdHkuU2xpZGUgPSBmYWN0b3J5KCk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBTbGlkZSggcGFyZW50ICkge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5pc09yaWdpbkxlZnQgPSBwYXJlbnQub3JpZ2luU2lkZSA9PSAnbGVmdCc7XG4gIHRoaXMuY2VsbHMgPSBbXTtcbiAgdGhpcy5vdXRlcldpZHRoID0gMDtcbiAgdGhpcy5oZWlnaHQgPSAwO1xufVxuXG52YXIgcHJvdG8gPSBTbGlkZS5wcm90b3R5cGU7XG5cbnByb3RvLmFkZENlbGwgPSBmdW5jdGlvbiggY2VsbCApIHtcbiAgdGhpcy5jZWxscy5wdXNoKCBjZWxsICk7XG4gIHRoaXMub3V0ZXJXaWR0aCArPSBjZWxsLnNpemUub3V0ZXJXaWR0aDtcbiAgdGhpcy5oZWlnaHQgPSBNYXRoLm1heCggY2VsbC5zaXplLm91dGVySGVpZ2h0LCB0aGlzLmhlaWdodCApO1xuICAvLyBmaXJzdCBjZWxsIHN0dWZmXG4gIGlmICggdGhpcy5jZWxscy5sZW5ndGggPT0gMSApIHtcbiAgICB0aGlzLnggPSBjZWxsLng7IC8vIHggY29tZXMgZnJvbSBmaXJzdCBjZWxsXG4gICAgdmFyIGJlZ2luTWFyZ2luID0gdGhpcy5pc09yaWdpbkxlZnQgPyAnbWFyZ2luTGVmdCcgOiAnbWFyZ2luUmlnaHQnO1xuICAgIHRoaXMuZmlyc3RNYXJnaW4gPSBjZWxsLnNpemVbIGJlZ2luTWFyZ2luIF07XG4gIH1cbn07XG5cbnByb3RvLnVwZGF0ZVRhcmdldCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZW5kTWFyZ2luID0gdGhpcy5pc09yaWdpbkxlZnQgPyAnbWFyZ2luUmlnaHQnIDogJ21hcmdpbkxlZnQnO1xuICB2YXIgbGFzdENlbGwgPSB0aGlzLmdldExhc3RDZWxsKCk7XG4gIHZhciBsYXN0TWFyZ2luID0gbGFzdENlbGwgPyBsYXN0Q2VsbC5zaXplWyBlbmRNYXJnaW4gXSA6IDA7XG4gIHZhciBzbGlkZVdpZHRoID0gdGhpcy5vdXRlcldpZHRoIC0gKCB0aGlzLmZpcnN0TWFyZ2luICsgbGFzdE1hcmdpbiApO1xuICB0aGlzLnRhcmdldCA9IHRoaXMueCArIHRoaXMuZmlyc3RNYXJnaW4gKyBzbGlkZVdpZHRoICogdGhpcy5wYXJlbnQuY2VsbEFsaWduO1xufTtcblxucHJvdG8uZ2V0TGFzdENlbGwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VsbHNbIHRoaXMuY2VsbHMubGVuZ3RoIC0gMSBdO1xufTtcblxucHJvdG8uc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC5zZWxlY3QoKTtcbiAgfSk7XG59O1xuXG5wcm90by51bnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwudW5zZWxlY3QoKTtcbiAgfSk7XG59O1xuXG5wcm90by5nZXRDZWxsRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VsbHMubWFwKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICByZXR1cm4gY2VsbC5lbGVtZW50O1xuICB9KTtcbn07XG5cbnJldHVybiBTbGlkZTtcblxufSkpO1xuIiwiLyohXG4gKiBnZXRTaXplIHYyLjAuM1xuICogbWVhc3VyZSBzaXplIG9mIGVsZW1lbnRzXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qIGpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cbi8qIGdsb2JhbHMgY29uc29sZTogZmFsc2UgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKiBnbG9iYWxzIGRlZmluZSwgbW9kdWxlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5nZXRTaXplID0gZmFjdG9yeSgpO1xuICB9XG5cbn0pKCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGhlbHBlcnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZ2V0IGEgbnVtYmVyIGZyb20gYSBzdHJpbmcsIG5vdCBhIHBlcmNlbnRhZ2VcbmZ1bmN0aW9uIGdldFN0eWxlU2l6ZSggdmFsdWUgKSB7XG4gIHZhciBudW0gPSBwYXJzZUZsb2F0KCB2YWx1ZSApO1xuICAvLyBub3QgYSBwZXJjZW50IGxpa2UgJzEwMCUnLCBhbmQgYSBudW1iZXJcbiAgdmFyIGlzVmFsaWQgPSB2YWx1ZS5pbmRleE9mKCclJykgPT0gLTEgJiYgIWlzTmFOKCBudW0gKTtcbiAgcmV0dXJuIGlzVmFsaWQgJiYgbnVtO1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIGxvZ0Vycm9yID0gdHlwZW9mIGNvbnNvbGUgPT0gJ3VuZGVmaW5lZCcgPyBub29wIDpcbiAgZnVuY3Rpb24oIG1lc3NhZ2UgKSB7XG4gICAgY29uc29sZS5lcnJvciggbWVzc2FnZSApO1xuICB9O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtZWFzdXJlbWVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIG1lYXN1cmVtZW50cyA9IFtcbiAgJ3BhZGRpbmdMZWZ0JyxcbiAgJ3BhZGRpbmdSaWdodCcsXG4gICdwYWRkaW5nVG9wJyxcbiAgJ3BhZGRpbmdCb3R0b20nLFxuICAnbWFyZ2luTGVmdCcsXG4gICdtYXJnaW5SaWdodCcsXG4gICdtYXJnaW5Ub3AnLFxuICAnbWFyZ2luQm90dG9tJyxcbiAgJ2JvcmRlckxlZnRXaWR0aCcsXG4gICdib3JkZXJSaWdodFdpZHRoJyxcbiAgJ2JvcmRlclRvcFdpZHRoJyxcbiAgJ2JvcmRlckJvdHRvbVdpZHRoJ1xuXTtcblxudmFyIG1lYXN1cmVtZW50c0xlbmd0aCA9IG1lYXN1cmVtZW50cy5sZW5ndGg7XG5cbmZ1bmN0aW9uIGdldFplcm9TaXplKCkge1xuICB2YXIgc2l6ZSA9IHtcbiAgICB3aWR0aDogMCxcbiAgICBoZWlnaHQ6IDAsXG4gICAgaW5uZXJXaWR0aDogMCxcbiAgICBpbm5lckhlaWdodDogMCxcbiAgICBvdXRlcldpZHRoOiAwLFxuICAgIG91dGVySGVpZ2h0OiAwXG4gIH07XG4gIGZvciAoIHZhciBpPTA7IGkgPCBtZWFzdXJlbWVudHNMZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbWVhc3VyZW1lbnQgPSBtZWFzdXJlbWVudHNbaV07XG4gICAgc2l6ZVsgbWVhc3VyZW1lbnQgXSA9IDA7XG4gIH1cbiAgcmV0dXJuIHNpemU7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldFN0eWxlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogZ2V0U3R5bGUsIGdldCBzdHlsZSBvZiBlbGVtZW50LCBjaGVjayBmb3IgRmlyZWZveCBidWdcbiAqIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICovXG5mdW5jdGlvbiBnZXRTdHlsZSggZWxlbSApIHtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSApO1xuICBpZiAoICFzdHlsZSApIHtcbiAgICBsb2dFcnJvciggJ1N0eWxlIHJldHVybmVkICcgKyBzdHlsZSArXG4gICAgICAnLiBBcmUgeW91IHJ1bm5pbmcgdGhpcyBjb2RlIGluIGEgaGlkZGVuIGlmcmFtZSBvbiBGaXJlZm94PyAnICtcbiAgICAgICdTZWUgaHR0cHM6Ly9iaXQubHkvZ2V0c2l6ZWJ1ZzEnICk7XG4gIH1cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBzZXR1cCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgaXNTZXR1cCA9IGZhbHNlO1xuXG52YXIgaXNCb3hTaXplT3V0ZXI7XG5cbi8qKlxuICogc2V0dXBcbiAqIGNoZWNrIGlzQm94U2l6ZXJPdXRlclxuICogZG8gb24gZmlyc3QgZ2V0U2l6ZSgpIHJhdGhlciB0aGFuIG9uIHBhZ2UgbG9hZCBmb3IgRmlyZWZveCBidWdcbiAqL1xuZnVuY3Rpb24gc2V0dXAoKSB7XG4gIC8vIHNldHVwIG9uY2VcbiAgaWYgKCBpc1NldHVwICkge1xuICAgIHJldHVybjtcbiAgfVxuICBpc1NldHVwID0gdHJ1ZTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBib3ggc2l6aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbiAgLyoqXG4gICAqIENocm9tZSAmIFNhZmFyaSBtZWFzdXJlIHRoZSBvdXRlci13aWR0aCBvbiBzdHlsZS53aWR0aCBvbiBib3JkZXItYm94IGVsZW1zXG4gICAqIElFMTEgJiBGaXJlZm94PDI5IG1lYXN1cmVzIHRoZSBpbm5lci13aWR0aFxuICAgKi9cbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuc3R5bGUud2lkdGggPSAnMjAwcHgnO1xuICBkaXYuc3R5bGUucGFkZGluZyA9ICcxcHggMnB4IDNweCA0cHgnO1xuICBkaXYuc3R5bGUuYm9yZGVyU3R5bGUgPSAnc29saWQnO1xuICBkaXYuc3R5bGUuYm9yZGVyV2lkdGggPSAnMXB4IDJweCAzcHggNHB4JztcbiAgZGl2LnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcblxuICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICBib2R5LmFwcGVuZENoaWxkKCBkaXYgKTtcbiAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoIGRpdiApO1xuICAvLyByb3VuZCB2YWx1ZSBmb3IgYnJvd3NlciB6b29tLiBkZXNhbmRyby9tYXNvbnJ5IzkyOFxuICBpc0JveFNpemVPdXRlciA9IE1hdGgucm91bmQoIGdldFN0eWxlU2l6ZSggc3R5bGUud2lkdGggKSApID09IDIwMDtcbiAgZ2V0U2l6ZS5pc0JveFNpemVPdXRlciA9IGlzQm94U2l6ZU91dGVyO1xuXG4gIGJvZHkucmVtb3ZlQ2hpbGQoIGRpdiApO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBnZXRTaXplIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIGdldFNpemUoIGVsZW0gKSB7XG4gIHNldHVwKCk7XG5cbiAgLy8gdXNlIHF1ZXJ5U2VsZXRvciBpZiBlbGVtIGlzIHN0cmluZ1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cblxuICAvLyBkbyBub3QgcHJvY2VlZCBvbiBub24tb2JqZWN0c1xuICBpZiAoICFlbGVtIHx8IHR5cGVvZiBlbGVtICE9ICdvYmplY3QnIHx8ICFlbGVtLm5vZGVUeXBlICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzdHlsZSA9IGdldFN0eWxlKCBlbGVtICk7XG5cbiAgLy8gaWYgaGlkZGVuLCBldmVyeXRoaW5nIGlzIDBcbiAgaWYgKCBzdHlsZS5kaXNwbGF5ID09ICdub25lJyApIHtcbiAgICByZXR1cm4gZ2V0WmVyb1NpemUoKTtcbiAgfVxuXG4gIHZhciBzaXplID0ge307XG4gIHNpemUud2lkdGggPSBlbGVtLm9mZnNldFdpZHRoO1xuICBzaXplLmhlaWdodCA9IGVsZW0ub2Zmc2V0SGVpZ2h0O1xuXG4gIHZhciBpc0JvcmRlckJveCA9IHNpemUuaXNCb3JkZXJCb3ggPSBzdHlsZS5ib3hTaXppbmcgPT0gJ2JvcmRlci1ib3gnO1xuXG4gIC8vIGdldCBhbGwgbWVhc3VyZW1lbnRzXG4gIGZvciAoIHZhciBpPTA7IGkgPCBtZWFzdXJlbWVudHNMZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbWVhc3VyZW1lbnQgPSBtZWFzdXJlbWVudHNbaV07XG4gICAgdmFyIHZhbHVlID0gc3R5bGVbIG1lYXN1cmVtZW50IF07XG4gICAgdmFyIG51bSA9IHBhcnNlRmxvYXQoIHZhbHVlICk7XG4gICAgLy8gYW55ICdhdXRvJywgJ21lZGl1bScgdmFsdWUgd2lsbCBiZSAwXG4gICAgc2l6ZVsgbWVhc3VyZW1lbnQgXSA9ICFpc05hTiggbnVtICkgPyBudW0gOiAwO1xuICB9XG5cbiAgdmFyIHBhZGRpbmdXaWR0aCA9IHNpemUucGFkZGluZ0xlZnQgKyBzaXplLnBhZGRpbmdSaWdodDtcbiAgdmFyIHBhZGRpbmdIZWlnaHQgPSBzaXplLnBhZGRpbmdUb3AgKyBzaXplLnBhZGRpbmdCb3R0b207XG4gIHZhciBtYXJnaW5XaWR0aCA9IHNpemUubWFyZ2luTGVmdCArIHNpemUubWFyZ2luUmlnaHQ7XG4gIHZhciBtYXJnaW5IZWlnaHQgPSBzaXplLm1hcmdpblRvcCArIHNpemUubWFyZ2luQm90dG9tO1xuICB2YXIgYm9yZGVyV2lkdGggPSBzaXplLmJvcmRlckxlZnRXaWR0aCArIHNpemUuYm9yZGVyUmlnaHRXaWR0aDtcbiAgdmFyIGJvcmRlckhlaWdodCA9IHNpemUuYm9yZGVyVG9wV2lkdGggKyBzaXplLmJvcmRlckJvdHRvbVdpZHRoO1xuXG4gIHZhciBpc0JvcmRlckJveFNpemVPdXRlciA9IGlzQm9yZGVyQm94ICYmIGlzQm94U2l6ZU91dGVyO1xuXG4gIC8vIG92ZXJ3cml0ZSB3aWR0aCBhbmQgaGVpZ2h0IGlmIHdlIGNhbiBnZXQgaXQgZnJvbSBzdHlsZVxuICB2YXIgc3R5bGVXaWR0aCA9IGdldFN0eWxlU2l6ZSggc3R5bGUud2lkdGggKTtcbiAgaWYgKCBzdHlsZVdpZHRoICE9PSBmYWxzZSApIHtcbiAgICBzaXplLndpZHRoID0gc3R5bGVXaWR0aCArXG4gICAgICAvLyBhZGQgcGFkZGluZyBhbmQgYm9yZGVyIHVubGVzcyBpdCdzIGFscmVhZHkgaW5jbHVkaW5nIGl0XG4gICAgICAoIGlzQm9yZGVyQm94U2l6ZU91dGVyID8gMCA6IHBhZGRpbmdXaWR0aCArIGJvcmRlcldpZHRoICk7XG4gIH1cblxuICB2YXIgc3R5bGVIZWlnaHQgPSBnZXRTdHlsZVNpemUoIHN0eWxlLmhlaWdodCApO1xuICBpZiAoIHN0eWxlSGVpZ2h0ICE9PSBmYWxzZSApIHtcbiAgICBzaXplLmhlaWdodCA9IHN0eWxlSGVpZ2h0ICtcbiAgICAgIC8vIGFkZCBwYWRkaW5nIGFuZCBib3JkZXIgdW5sZXNzIGl0J3MgYWxyZWFkeSBpbmNsdWRpbmcgaXRcbiAgICAgICggaXNCb3JkZXJCb3hTaXplT3V0ZXIgPyAwIDogcGFkZGluZ0hlaWdodCArIGJvcmRlckhlaWdodCApO1xuICB9XG5cbiAgc2l6ZS5pbm5lcldpZHRoID0gc2l6ZS53aWR0aCAtICggcGFkZGluZ1dpZHRoICsgYm9yZGVyV2lkdGggKTtcbiAgc2l6ZS5pbm5lckhlaWdodCA9IHNpemUuaGVpZ2h0IC0gKCBwYWRkaW5nSGVpZ2h0ICsgYm9yZGVySGVpZ2h0ICk7XG5cbiAgc2l6ZS5vdXRlcldpZHRoID0gc2l6ZS53aWR0aCArIG1hcmdpbldpZHRoO1xuICBzaXplLm91dGVySGVpZ2h0ID0gc2l6ZS5oZWlnaHQgKyBtYXJnaW5IZWlnaHQ7XG5cbiAgcmV0dXJuIHNpemU7XG59XG5cbnJldHVybiBnZXRTaXplO1xuXG59KTtcbiIsIi8qIVxuICogaW1hZ2VzTG9hZGVkIHY0LjEuNFxuICogSmF2YVNjcmlwdCBpcyBhbGwgbGlrZSBcIllvdSBpbWFnZXMgYXJlIGRvbmUgeWV0IG9yIHdoYXQ/XCJcbiAqIE1JVCBMaWNlbnNlXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkgeyAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuXG4gIC8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UsIHJlcXVpcmU6IGZhbHNlICovXG5cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdldi1lbWl0dGVyL2V2LWVtaXR0ZXInXG4gICAgXSwgZnVuY3Rpb24oIEV2RW1pdHRlciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5pbWFnZXNMb2FkZWQgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkV2RW1pdHRlclxuICAgICk7XG4gIH1cblxufSkoIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdGhpcyxcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIGZhY3RvcnkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyICQgPSB3aW5kb3cualF1ZXJ5O1xudmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaGVscGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBleHRlbmQgb2JqZWN0c1xuZnVuY3Rpb24gZXh0ZW5kKCBhLCBiICkge1xuICBmb3IgKCB2YXIgcHJvcCBpbiBiICkge1xuICAgIGFbIHByb3AgXSA9IGJbIHByb3AgXTtcbiAgfVxuICByZXR1cm4gYTtcbn1cblxudmFyIGFycmF5U2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbi8vIHR1cm4gZWxlbWVudCBvciBub2RlTGlzdCBpbnRvIGFuIGFycmF5XG5mdW5jdGlvbiBtYWtlQXJyYXkoIG9iaiApIHtcbiAgaWYgKCBBcnJheS5pc0FycmF5KCBvYmogKSApIHtcbiAgICAvLyB1c2Ugb2JqZWN0IGlmIGFscmVhZHkgYW4gYXJyYXlcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIGlzQXJyYXlMaWtlID0gdHlwZW9mIG9iaiA9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmxlbmd0aCA9PSAnbnVtYmVyJztcbiAgaWYgKCBpc0FycmF5TGlrZSApIHtcbiAgICAvLyBjb252ZXJ0IG5vZGVMaXN0IHRvIGFycmF5XG4gICAgcmV0dXJuIGFycmF5U2xpY2UuY2FsbCggb2JqICk7XG4gIH1cblxuICAvLyBhcnJheSBvZiBzaW5nbGUgaW5kZXhcbiAgcmV0dXJuIFsgb2JqIF07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGltYWdlc0xvYWRlZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXksIEVsZW1lbnQsIE5vZGVMaXN0LCBTdHJpbmd9IGVsZW1cbiAqIEBwYXJhbSB7T2JqZWN0IG9yIEZ1bmN0aW9ufSBvcHRpb25zIC0gaWYgZnVuY3Rpb24sIHVzZSBhcyBjYWxsYmFja1xuICogQHBhcmFtIHtGdW5jdGlvbn0gb25BbHdheXMgLSBjYWxsYmFjayBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBJbWFnZXNMb2FkZWQoIGVsZW0sIG9wdGlvbnMsIG9uQWx3YXlzICkge1xuICAvLyBjb2VyY2UgSW1hZ2VzTG9hZGVkKCkgd2l0aG91dCBuZXcsIHRvIGJlIG5ldyBJbWFnZXNMb2FkZWQoKVxuICBpZiAoICEoIHRoaXMgaW5zdGFuY2VvZiBJbWFnZXNMb2FkZWQgKSApIHtcbiAgICByZXR1cm4gbmV3IEltYWdlc0xvYWRlZCggZWxlbSwgb3B0aW9ucywgb25BbHdheXMgKTtcbiAgfVxuICAvLyB1c2UgZWxlbSBhcyBzZWxlY3RvciBzdHJpbmdcbiAgdmFyIHF1ZXJ5RWxlbSA9IGVsZW07XG4gIGlmICggdHlwZW9mIGVsZW0gPT0gJ3N0cmluZycgKSB7XG4gICAgcXVlcnlFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggZWxlbSApO1xuICB9XG4gIC8vIGJhaWwgaWYgYmFkIGVsZW1lbnRcbiAgaWYgKCAhcXVlcnlFbGVtICkge1xuICAgIGNvbnNvbGUuZXJyb3IoICdCYWQgZWxlbWVudCBmb3IgaW1hZ2VzTG9hZGVkICcgKyAoIHF1ZXJ5RWxlbSB8fCBlbGVtICkgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmVsZW1lbnRzID0gbWFrZUFycmF5KCBxdWVyeUVsZW0gKTtcbiAgdGhpcy5vcHRpb25zID0gZXh0ZW5kKCB7fSwgdGhpcy5vcHRpb25zICk7XG4gIC8vIHNoaWZ0IGFyZ3VtZW50cyBpZiBubyBvcHRpb25zIHNldFxuICBpZiAoIHR5cGVvZiBvcHRpb25zID09ICdmdW5jdGlvbicgKSB7XG4gICAgb25BbHdheXMgPSBvcHRpb25zO1xuICB9IGVsc2Uge1xuICAgIGV4dGVuZCggdGhpcy5vcHRpb25zLCBvcHRpb25zICk7XG4gIH1cblxuICBpZiAoIG9uQWx3YXlzICkge1xuICAgIHRoaXMub24oICdhbHdheXMnLCBvbkFsd2F5cyApO1xuICB9XG5cbiAgdGhpcy5nZXRJbWFnZXMoKTtcblxuICBpZiAoICQgKSB7XG4gICAgLy8gYWRkIGpRdWVyeSBEZWZlcnJlZCBvYmplY3RcbiAgICB0aGlzLmpxRGVmZXJyZWQgPSBuZXcgJC5EZWZlcnJlZCgpO1xuICB9XG5cbiAgLy8gSEFDSyBjaGVjayBhc3luYyB0byBhbGxvdyB0aW1lIHRvIGJpbmQgbGlzdGVuZXJzXG4gIHNldFRpbWVvdXQoIHRoaXMuY2hlY2suYmluZCggdGhpcyApICk7XG59XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUub3B0aW9ucyA9IHt9O1xuXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlLmdldEltYWdlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmltYWdlcyA9IFtdO1xuXG4gIC8vIGZpbHRlciAmIGZpbmQgaXRlbXMgaWYgd2UgaGF2ZSBhbiBpdGVtIHNlbGVjdG9yXG4gIHRoaXMuZWxlbWVudHMuZm9yRWFjaCggdGhpcy5hZGRFbGVtZW50SW1hZ2VzLCB0aGlzICk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gZWxlbWVudFxuICovXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlLmFkZEVsZW1lbnRJbWFnZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgLy8gZmlsdGVyIHNpYmxpbmdzXG4gIGlmICggZWxlbS5ub2RlTmFtZSA9PSAnSU1HJyApIHtcbiAgICB0aGlzLmFkZEltYWdlKCBlbGVtICk7XG4gIH1cbiAgLy8gZ2V0IGJhY2tncm91bmQgaW1hZ2Ugb24gZWxlbWVudFxuICBpZiAoIHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kID09PSB0cnVlICkge1xuICAgIHRoaXMuYWRkRWxlbWVudEJhY2tncm91bmRJbWFnZXMoIGVsZW0gKTtcbiAgfVxuXG4gIC8vIGZpbmQgY2hpbGRyZW5cbiAgLy8gbm8gbm9uLWVsZW1lbnQgbm9kZXMsICMxNDNcbiAgdmFyIG5vZGVUeXBlID0gZWxlbS5ub2RlVHlwZTtcbiAgaWYgKCAhbm9kZVR5cGUgfHwgIWVsZW1lbnROb2RlVHlwZXNbIG5vZGVUeXBlIF0gKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjaGlsZEltZ3MgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpO1xuICAvLyBjb25jYXQgY2hpbGRFbGVtcyB0byBmaWx0ZXJGb3VuZCBhcnJheVxuICBmb3IgKCB2YXIgaT0wOyBpIDwgY2hpbGRJbWdzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpbWcgPSBjaGlsZEltZ3NbaV07XG4gICAgdGhpcy5hZGRJbWFnZSggaW1nICk7XG4gIH1cblxuICAvLyBnZXQgY2hpbGQgYmFja2dyb3VuZCBpbWFnZXNcbiAgaWYgKCB0eXBlb2YgdGhpcy5vcHRpb25zLmJhY2tncm91bmQgPT0gJ3N0cmluZycgKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZCApO1xuICAgIGZvciAoIGk9MDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICB0aGlzLmFkZEVsZW1lbnRCYWNrZ3JvdW5kSW1hZ2VzKCBjaGlsZCApO1xuICAgIH1cbiAgfVxufTtcblxudmFyIGVsZW1lbnROb2RlVHlwZXMgPSB7XG4gIDE6IHRydWUsXG4gIDk6IHRydWUsXG4gIDExOiB0cnVlXG59O1xuXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlLmFkZEVsZW1lbnRCYWNrZ3JvdW5kSW1hZ2VzID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoIGVsZW0gKTtcbiAgaWYgKCAhc3R5bGUgKSB7XG4gICAgLy8gRmlyZWZveCByZXR1cm5zIG51bGwgaWYgaW4gYSBoaWRkZW4gaWZyYW1lIGh0dHBzOi8vYnVnemlsLmxhLzU0ODM5N1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBnZXQgdXJsIGluc2lkZSB1cmwoXCIuLi5cIilcbiAgdmFyIHJlVVJMID0gL3VybFxcKChbJ1wiXSk/KC4qPylcXDFcXCkvZ2k7XG4gIHZhciBtYXRjaGVzID0gcmVVUkwuZXhlYyggc3R5bGUuYmFja2dyb3VuZEltYWdlICk7XG4gIHdoaWxlICggbWF0Y2hlcyAhPT0gbnVsbCApIHtcbiAgICB2YXIgdXJsID0gbWF0Y2hlcyAmJiBtYXRjaGVzWzJdO1xuICAgIGlmICggdXJsICkge1xuICAgICAgdGhpcy5hZGRCYWNrZ3JvdW5kKCB1cmwsIGVsZW0gKTtcbiAgICB9XG4gICAgbWF0Y2hlcyA9IHJlVVJMLmV4ZWMoIHN0eWxlLmJhY2tncm91bmRJbWFnZSApO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SW1hZ2V9IGltZ1xuICovXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlLmFkZEltYWdlID0gZnVuY3Rpb24oIGltZyApIHtcbiAgdmFyIGxvYWRpbmdJbWFnZSA9IG5ldyBMb2FkaW5nSW1hZ2UoIGltZyApO1xuICB0aGlzLmltYWdlcy5wdXNoKCBsb2FkaW5nSW1hZ2UgKTtcbn07XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUuYWRkQmFja2dyb3VuZCA9IGZ1bmN0aW9uKCB1cmwsIGVsZW0gKSB7XG4gIHZhciBiYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoIHVybCwgZWxlbSApO1xuICB0aGlzLmltYWdlcy5wdXNoKCBiYWNrZ3JvdW5kICk7XG59O1xuXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIHRoaXMucHJvZ3Jlc3NlZENvdW50ID0gMDtcbiAgdGhpcy5oYXNBbnlCcm9rZW4gPSBmYWxzZTtcbiAgLy8gY29tcGxldGUgaWYgbm8gaW1hZ2VzXG4gIGlmICggIXRoaXMuaW1hZ2VzLmxlbmd0aCApIHtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Qcm9ncmVzcyggaW1hZ2UsIGVsZW0sIG1lc3NhZ2UgKSB7XG4gICAgLy8gSEFDSyAtIENocm9tZSB0cmlnZ2VycyBldmVudCBiZWZvcmUgb2JqZWN0IHByb3BlcnRpZXMgaGF2ZSBjaGFuZ2VkLiAjODNcbiAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLnByb2dyZXNzKCBpbWFnZSwgZWxlbSwgbWVzc2FnZSApO1xuICAgIH0pO1xuICB9XG5cbiAgdGhpcy5pbWFnZXMuZm9yRWFjaCggZnVuY3Rpb24oIGxvYWRpbmdJbWFnZSApIHtcbiAgICBsb2FkaW5nSW1hZ2Uub25jZSggJ3Byb2dyZXNzJywgb25Qcm9ncmVzcyApO1xuICAgIGxvYWRpbmdJbWFnZS5jaGVjaygpO1xuICB9KTtcbn07XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUucHJvZ3Jlc3MgPSBmdW5jdGlvbiggaW1hZ2UsIGVsZW0sIG1lc3NhZ2UgKSB7XG4gIHRoaXMucHJvZ3Jlc3NlZENvdW50Kys7XG4gIHRoaXMuaGFzQW55QnJva2VuID0gdGhpcy5oYXNBbnlCcm9rZW4gfHwgIWltYWdlLmlzTG9hZGVkO1xuICAvLyBwcm9ncmVzcyBldmVudFxuICB0aGlzLmVtaXRFdmVudCggJ3Byb2dyZXNzJywgWyB0aGlzLCBpbWFnZSwgZWxlbSBdICk7XG4gIGlmICggdGhpcy5qcURlZmVycmVkICYmIHRoaXMuanFEZWZlcnJlZC5ub3RpZnkgKSB7XG4gICAgdGhpcy5qcURlZmVycmVkLm5vdGlmeSggdGhpcywgaW1hZ2UgKTtcbiAgfVxuICAvLyBjaGVjayBpZiBjb21wbGV0ZWRcbiAgaWYgKCB0aGlzLnByb2dyZXNzZWRDb3VudCA9PSB0aGlzLmltYWdlcy5sZW5ndGggKSB7XG4gICAgdGhpcy5jb21wbGV0ZSgpO1xuICB9XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMuZGVidWcgJiYgY29uc29sZSApIHtcbiAgICBjb25zb2xlLmxvZyggJ3Byb2dyZXNzOiAnICsgbWVzc2FnZSwgaW1hZ2UsIGVsZW0gKTtcbiAgfVxufTtcblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZXZlbnROYW1lID0gdGhpcy5oYXNBbnlCcm9rZW4gPyAnZmFpbCcgOiAnZG9uZSc7XG4gIHRoaXMuaXNDb21wbGV0ZSA9IHRydWU7XG4gIHRoaXMuZW1pdEV2ZW50KCBldmVudE5hbWUsIFsgdGhpcyBdICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAnYWx3YXlzJywgWyB0aGlzIF0gKTtcbiAgaWYgKCB0aGlzLmpxRGVmZXJyZWQgKSB7XG4gICAgdmFyIGpxTWV0aG9kID0gdGhpcy5oYXNBbnlCcm9rZW4gPyAncmVqZWN0JyA6ICdyZXNvbHZlJztcbiAgICB0aGlzLmpxRGVmZXJyZWRbIGpxTWV0aG9kIF0oIHRoaXMgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIExvYWRpbmdJbWFnZSggaW1nICkge1xuICB0aGlzLmltZyA9IGltZztcbn1cblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKCkge1xuICAvLyBJZiBjb21wbGV0ZSBpcyB0cnVlIGFuZCBicm93c2VyIHN1cHBvcnRzIG5hdHVyYWwgc2l6ZXMsXG4gIC8vIHRyeSB0byBjaGVjayBmb3IgaW1hZ2Ugc3RhdHVzIG1hbnVhbGx5LlxuICB2YXIgaXNDb21wbGV0ZSA9IHRoaXMuZ2V0SXNJbWFnZUNvbXBsZXRlKCk7XG4gIGlmICggaXNDb21wbGV0ZSApIHtcbiAgICAvLyByZXBvcnQgYmFzZWQgb24gbmF0dXJhbFdpZHRoXG4gICAgdGhpcy5jb25maXJtKCB0aGlzLmltZy5uYXR1cmFsV2lkdGggIT09IDAsICduYXR1cmFsV2lkdGgnICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gSWYgbm9uZSBvZiB0aGUgY2hlY2tzIGFib3ZlIG1hdGNoZWQsIHNpbXVsYXRlIGxvYWRpbmcgb24gZGV0YWNoZWQgZWxlbWVudC5cbiAgdGhpcy5wcm94eUltYWdlID0gbmV3IEltYWdlKCk7XG4gIHRoaXMucHJveHlJbWFnZS5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5wcm94eUltYWdlLmFkZEV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcbiAgLy8gYmluZCB0byBpbWFnZSBhcyB3ZWxsIGZvciBGaXJlZm94LiAjMTkxXG4gIHRoaXMuaW1nLmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG4gIHRoaXMucHJveHlJbWFnZS5zcmMgPSB0aGlzLmltZy5zcmM7XG59O1xuXG5Mb2FkaW5nSW1hZ2UucHJvdG90eXBlLmdldElzSW1hZ2VDb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBjaGVjayBmb3Igbm9uLXplcm8sIG5vbi11bmRlZmluZWQgbmF0dXJhbFdpZHRoXG4gIC8vIGZpeGVzIFNhZmFyaStJbmZpbml0ZVNjcm9sbCtNYXNvbnJ5IGJ1ZyBpbmZpbml0ZS1zY3JvbGwjNjcxXG4gIHJldHVybiB0aGlzLmltZy5jb21wbGV0ZSAmJiB0aGlzLmltZy5uYXR1cmFsV2lkdGg7XG59O1xuXG5Mb2FkaW5nSW1hZ2UucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbiggaXNMb2FkZWQsIG1lc3NhZ2UgKSB7XG4gIHRoaXMuaXNMb2FkZWQgPSBpc0xvYWRlZDtcbiAgdGhpcy5lbWl0RXZlbnQoICdwcm9ncmVzcycsIFsgdGhpcywgdGhpcy5pbWcsIG1lc3NhZ2UgXSApO1xufTtcblxuLy8gLS0tLS0gZXZlbnRzIC0tLS0tIC8vXG5cbi8vIHRyaWdnZXIgc3BlY2lmaWVkIGhhbmRsZXIgZm9yIGV2ZW50IHR5cGVcbkxvYWRpbmdJbWFnZS5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBtZXRob2QgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgaWYgKCB0aGlzWyBtZXRob2QgXSApIHtcbiAgICB0aGlzWyBtZXRob2QgXSggZXZlbnQgKTtcbiAgfVxufTtcblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jb25maXJtKCB0cnVlLCAnb25sb2FkJyApO1xuICB0aGlzLnVuYmluZEV2ZW50cygpO1xufTtcblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY29uZmlybSggZmFsc2UsICdvbmVycm9yJyApO1xuICB0aGlzLnVuYmluZEV2ZW50cygpO1xufTtcblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS51bmJpbmRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wcm94eUltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLnByb3h5SW1hZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuICB0aGlzLmltZy5yZW1vdmVFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQmFja2dyb3VuZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBCYWNrZ3JvdW5kKCB1cmwsIGVsZW1lbnQgKSB7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICB0aGlzLmltZyA9IG5ldyBJbWFnZSgpO1xufVxuXG4vLyBpbmhlcml0IExvYWRpbmdJbWFnZSBwcm90b3R5cGVcbkJhY2tncm91bmQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggTG9hZGluZ0ltYWdlLnByb3RvdHlwZSApO1xuXG5CYWNrZ3JvdW5kLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuICB0aGlzLmltZy5zcmMgPSB0aGlzLnVybDtcbiAgLy8gY2hlY2sgaWYgaW1hZ2UgaXMgYWxyZWFkeSBjb21wbGV0ZVxuICB2YXIgaXNDb21wbGV0ZSA9IHRoaXMuZ2V0SXNJbWFnZUNvbXBsZXRlKCk7XG4gIGlmICggaXNDb21wbGV0ZSApIHtcbiAgICB0aGlzLmNvbmZpcm0oIHRoaXMuaW1nLm5hdHVyYWxXaWR0aCAhPT0gMCwgJ25hdHVyYWxXaWR0aCcgKTtcbiAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuICB9XG59O1xuXG5CYWNrZ3JvdW5kLnByb3RvdHlwZS51bmJpbmRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMuaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcbn07XG5cbkJhY2tncm91bmQucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbiggaXNMb2FkZWQsIG1lc3NhZ2UgKSB7XG4gIHRoaXMuaXNMb2FkZWQgPSBpc0xvYWRlZDtcbiAgdGhpcy5lbWl0RXZlbnQoICdwcm9ncmVzcycsIFsgdGhpcywgdGhpcy5lbGVtZW50LCBtZXNzYWdlIF0gKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGpRdWVyeSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5JbWFnZXNMb2FkZWQubWFrZUpRdWVyeVBsdWdpbiA9IGZ1bmN0aW9uKCBqUXVlcnkgKSB7XG4gIGpRdWVyeSA9IGpRdWVyeSB8fCB3aW5kb3cualF1ZXJ5O1xuICBpZiAoICFqUXVlcnkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNldCBsb2NhbCB2YXJpYWJsZVxuICAkID0galF1ZXJ5O1xuICAvLyAkKCkuaW1hZ2VzTG9hZGVkKClcbiAgJC5mbi5pbWFnZXNMb2FkZWQgPSBmdW5jdGlvbiggb3B0aW9ucywgY2FsbGJhY2sgKSB7XG4gICAgdmFyIGluc3RhbmNlID0gbmV3IEltYWdlc0xvYWRlZCggdGhpcywgb3B0aW9ucywgY2FsbGJhY2sgKTtcbiAgICByZXR1cm4gaW5zdGFuY2UuanFEZWZlcnJlZC5wcm9taXNlKCAkKHRoaXMpICk7XG4gIH07XG59O1xuLy8gdHJ5IG1ha2luZyBwbHVnaW5cbkltYWdlc0xvYWRlZC5tYWtlSlF1ZXJ5UGx1Z2luKCk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5yZXR1cm4gSW1hZ2VzTG9hZGVkO1xuXG59KTtcbiIsIi8qIVxuICogVW5pZHJhZ2dlciB2Mi4zLjBcbiAqIERyYWdnYWJsZSBiYXNlIGNsYXNzXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVudXNlZDogdHJ1ZSwgdW5kZWY6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAndW5pcG9pbnRlci91bmlwb2ludGVyJ1xuICAgIF0sIGZ1bmN0aW9uKCBVbmlwb2ludGVyICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgVW5pcG9pbnRlciApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgndW5pcG9pbnRlcicpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5VbmlkcmFnZ2VyID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5Vbmlwb2ludGVyXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgVW5pcG9pbnRlciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBVbmlkcmFnZ2VyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIFVuaWRyYWdnZXIoKSB7fVxuXG4vLyBpbmhlcml0IFVuaXBvaW50ZXIgJiBFdkVtaXR0ZXJcbnZhciBwcm90byA9IFVuaWRyYWdnZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVW5pcG9pbnRlci5wcm90b3R5cGUgKTtcblxuLy8gLS0tLS0gYmluZCBzdGFydCAtLS0tLSAvL1xuXG5wcm90by5iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9iaW5kSGFuZGxlcyggdHJ1ZSApO1xufTtcblxucHJvdG8udW5iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9iaW5kSGFuZGxlcyggZmFsc2UgKTtcbn07XG5cbi8qKlxuICogQWRkIG9yIHJlbW92ZSBzdGFydCBldmVudFxuICogQHBhcmFtIHtCb29sZWFufSBpc0FkZFxuICovXG5wcm90by5fYmluZEhhbmRsZXMgPSBmdW5jdGlvbiggaXNBZGQgKSB7XG4gIC8vIG11bmdlIGlzQWRkLCBkZWZhdWx0IHRvIHRydWVcbiAgaXNBZGQgPSBpc0FkZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlzQWRkO1xuICAvLyBiaW5kIGVhY2ggaGFuZGxlXG4gIHZhciBiaW5kTWV0aG9kID0gaXNBZGQgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG4gIHZhciB0b3VjaEFjdGlvbiA9IGlzQWRkID8gdGhpcy5fdG91Y2hBY3Rpb25WYWx1ZSA6ICcnO1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5oYW5kbGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBoYW5kbGUgPSB0aGlzLmhhbmRsZXNbaV07XG4gICAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGhhbmRsZSwgaXNBZGQgKTtcbiAgICBoYW5kbGVbIGJpbmRNZXRob2QgXSggJ2NsaWNrJywgdGhpcyApO1xuICAgIC8vIHRvdWNoLWFjdGlvbjogbm9uZSB0byBvdmVycmlkZSBicm93c2VyIHRvdWNoIGdlc3R1cmVzLiBtZXRhZml6enkvZmxpY2tpdHkjNTQwXG4gICAgaWYgKCB3aW5kb3cuUG9pbnRlckV2ZW50ICkge1xuICAgICAgaGFuZGxlLnN0eWxlLnRvdWNoQWN0aW9uID0gdG91Y2hBY3Rpb247XG4gICAgfVxuICB9XG59O1xuXG4vLyBwcm90b3R5cGUgc28gaXQgY2FuIGJlIG92ZXJ3cml0ZWFibGUgYnkgRmxpY2tpdHlcbnByb3RvLl90b3VjaEFjdGlvblZhbHVlID0gJ25vbmUnO1xuXG4vLyAtLS0tLSBzdGFydCBldmVudCAtLS0tLSAvL1xuXG4vKipcbiAqIHBvaW50ZXIgc3RhcnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgaXNPa2F5ID0gdGhpcy5va2F5UG9pbnRlckRvd24oIGV2ZW50ICk7XG4gIGlmICggIWlzT2theSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gdHJhY2sgc3RhcnQgZXZlbnQgcG9zaXRpb25cbiAgdGhpcy5wb2ludGVyRG93blBvaW50ZXIgPSBwb2ludGVyO1xuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRoaXMucG9pbnRlckRvd25CbHVyKCk7XG4gIC8vIGJpbmQgbW92ZSBhbmQgZW5kIGV2ZW50c1xuICB0aGlzLl9iaW5kUG9zdFN0YXJ0RXZlbnRzKCBldmVudCApO1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJEb3duJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyBub2RlcyB0aGF0IGhhdmUgdGV4dCBmaWVsZHNcbnZhciBjdXJzb3JOb2RlcyA9IHtcbiAgVEVYVEFSRUE6IHRydWUsXG4gIElOUFVUOiB0cnVlLFxuICBTRUxFQ1Q6IHRydWUsXG4gIE9QVElPTjogdHJ1ZSxcbn07XG5cbi8vIGlucHV0IHR5cGVzIHRoYXQgZG8gbm90IGhhdmUgdGV4dCBmaWVsZHNcbnZhciBjbGlja1R5cGVzID0ge1xuICByYWRpbzogdHJ1ZSxcbiAgY2hlY2tib3g6IHRydWUsXG4gIGJ1dHRvbjogdHJ1ZSxcbiAgc3VibWl0OiB0cnVlLFxuICBpbWFnZTogdHJ1ZSxcbiAgZmlsZTogdHJ1ZSxcbn07XG5cbi8vIGRpc21pc3MgaW5wdXRzIHdpdGggdGV4dCBmaWVsZHMuIGZsaWNraXR5IzQwMywgZmxpY2tpdHkjNDA0XG5wcm90by5va2F5UG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBpc0N1cnNvck5vZGUgPSBjdXJzb3JOb2Rlc1sgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lIF07XG4gIHZhciBpc0NsaWNrVHlwZSA9IGNsaWNrVHlwZXNbIGV2ZW50LnRhcmdldC50eXBlIF07XG4gIHZhciBpc09rYXkgPSAhaXNDdXJzb3JOb2RlIHx8IGlzQ2xpY2tUeXBlO1xuICBpZiAoICFpc09rYXkgKSB7XG4gICAgdGhpcy5fcG9pbnRlclJlc2V0KCk7XG4gIH1cbiAgcmV0dXJuIGlzT2theTtcbn07XG5cbi8vIGtsdWRnZSB0byBibHVyIHByZXZpb3VzbHkgZm9jdXNlZCBpbnB1dFxucHJvdG8ucG9pbnRlckRvd25CbHVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmb2N1c2VkID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgLy8gZG8gbm90IGJsdXIgYm9keSBmb3IgSUUxMCwgbWV0YWZpenp5L2ZsaWNraXR5IzExN1xuICB2YXIgY2FuQmx1ciA9IGZvY3VzZWQgJiYgZm9jdXNlZC5ibHVyICYmIGZvY3VzZWQgIT0gZG9jdW1lbnQuYm9keTtcbiAgaWYgKCBjYW5CbHVyICkge1xuICAgIGZvY3VzZWQuYmx1cigpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBtb3ZlIGV2ZW50IC0tLS0tIC8vXG5cbi8qKlxuICogZHJhZyBtb3ZlXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIG1vdmVWZWN0b3IgPSB0aGlzLl9kcmFnUG9pbnRlck1vdmUoIGV2ZW50LCBwb2ludGVyICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlck1vdmUnLCBbIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbiAgdGhpcy5fZHJhZ01vdmUoIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICk7XG59O1xuXG4vLyBiYXNlIHBvaW50ZXIgbW92ZSBsb2dpY1xucHJvdG8uX2RyYWdQb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIG1vdmVWZWN0b3IgPSB7XG4gICAgeDogcG9pbnRlci5wYWdlWCAtIHRoaXMucG9pbnRlckRvd25Qb2ludGVyLnBhZ2VYLFxuICAgIHk6IHBvaW50ZXIucGFnZVkgLSB0aGlzLnBvaW50ZXJEb3duUG9pbnRlci5wYWdlWVxuICB9O1xuICAvLyBzdGFydCBkcmFnIGlmIHBvaW50ZXIgaGFzIG1vdmVkIGZhciBlbm91Z2ggdG8gc3RhcnQgZHJhZ1xuICBpZiAoICF0aGlzLmlzRHJhZ2dpbmcgJiYgdGhpcy5oYXNEcmFnU3RhcnRlZCggbW92ZVZlY3RvciApICkge1xuICAgIHRoaXMuX2RyYWdTdGFydCggZXZlbnQsIHBvaW50ZXIgKTtcbiAgfVxuICByZXR1cm4gbW92ZVZlY3Rvcjtcbn07XG5cbi8vIGNvbmRpdGlvbiBpZiBwb2ludGVyIGhhcyBtb3ZlZCBmYXIgZW5vdWdoIHRvIHN0YXJ0IGRyYWdcbnByb3RvLmhhc0RyYWdTdGFydGVkID0gZnVuY3Rpb24oIG1vdmVWZWN0b3IgKSB7XG4gIHJldHVybiBNYXRoLmFicyggbW92ZVZlY3Rvci54ICkgPiAzIHx8IE1hdGguYWJzKCBtb3ZlVmVjdG9yLnkgKSA+IDM7XG59O1xuXG4vLyAtLS0tLSBlbmQgZXZlbnQgLS0tLS0gLy9cblxuLyoqXG4gKiBwb2ludGVyIHVwXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5wb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlclVwJywgWyBldmVudCwgcG9pbnRlciBdICk7XG4gIHRoaXMuX2RyYWdQb2ludGVyVXAoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5fZHJhZ1BvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgaWYgKCB0aGlzLmlzRHJhZ2dpbmcgKSB7XG4gICAgdGhpcy5fZHJhZ0VuZCggZXZlbnQsIHBvaW50ZXIgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBwb2ludGVyIGRpZG4ndCBtb3ZlIGVub3VnaCBmb3IgZHJhZyB0byBzdGFydFxuICAgIHRoaXMuX3N0YXRpY0NsaWNrKCBldmVudCwgcG9pbnRlciApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkcmFnIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGRyYWdTdGFydFxucHJvdG8uX2RyYWdTdGFydCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgLy8gcHJldmVudCBjbGlja3NcbiAgdGhpcy5pc1ByZXZlbnRpbmdDbGlja3MgPSB0cnVlO1xuICB0aGlzLmRyYWdTdGFydCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLmRyYWdTdGFydCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdkcmFnU3RhcnQnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIGRyYWdNb3ZlXG5wcm90by5fZHJhZ01vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKSB7XG4gIC8vIGRvIG5vdCBkcmFnIGlmIG5vdCBkcmFnZ2luZyB5ZXRcbiAgaWYgKCAhdGhpcy5pc0RyYWdnaW5nICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuZHJhZ01vdmUoIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICk7XG59O1xuXG5wcm90by5kcmFnTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdkcmFnTW92ZScsIFsgZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xufTtcblxuLy8gZHJhZ0VuZFxucHJvdG8uX2RyYWdFbmQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIHNldCBmbGFnc1xuICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgLy8gcmUtZW5hYmxlIGNsaWNraW5nIGFzeW5jXG4gIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSB0aGlzLmlzUHJldmVudGluZ0NsaWNrcztcbiAgfS5iaW5kKCB0aGlzICkgKTtcblxuICB0aGlzLmRyYWdFbmQoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5kcmFnRW5kID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ2RyYWdFbmQnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIG9uY2xpY2sgLS0tLS0gLy9cblxuLy8gaGFuZGxlIGFsbCBjbGlja3MgYW5kIHByZXZlbnQgY2xpY2tzIHdoZW4gZHJhZ2dpbmdcbnByb3RvLm9uY2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggdGhpcy5pc1ByZXZlbnRpbmdDbGlja3MgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gc3RhdGljQ2xpY2sgLS0tLS0gLy9cblxuLy8gdHJpZ2dlcmVkIGFmdGVyIHBvaW50ZXIgZG93biAmIHVwIHdpdGggbm8vdGlueSBtb3ZlbWVudFxucHJvdG8uX3N0YXRpY0NsaWNrID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBpZ25vcmUgZW11bGF0ZWQgbW91c2UgdXAgY2xpY2tzXG4gIGlmICggdGhpcy5pc0lnbm9yaW5nTW91c2VVcCAmJiBldmVudC50eXBlID09ICdtb3VzZXVwJyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnN0YXRpY0NsaWNrKCBldmVudCwgcG9pbnRlciApO1xuXG4gIC8vIHNldCBmbGFnIGZvciBlbXVsYXRlZCBjbGlja3MgMzAwbXMgYWZ0ZXIgdG91Y2hlbmRcbiAgaWYgKCBldmVudC50eXBlICE9ICdtb3VzZXVwJyApIHtcbiAgICB0aGlzLmlzSWdub3JpbmdNb3VzZVVwID0gdHJ1ZTtcbiAgICAvLyByZXNldCBmbGFnIGFmdGVyIDMwMG1zXG4gICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICBkZWxldGUgdGhpcy5pc0lnbm9yaW5nTW91c2VVcDtcbiAgICB9LmJpbmQoIHRoaXMgKSwgNDAwICk7XG4gIH1cbn07XG5cbnByb3RvLnN0YXRpY0NsaWNrID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3N0YXRpY0NsaWNrJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSB1dGlscyAtLS0tLSAvL1xuXG5VbmlkcmFnZ2VyLmdldFBvaW50ZXJQb2ludCA9IFVuaXBvaW50ZXIuZ2V0UG9pbnRlclBvaW50O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIFVuaWRyYWdnZXI7XG5cbn0pKTtcbiIsIi8qIVxuICogVW5pcG9pbnRlciB2Mi4zLjBcbiAqIGJhc2UgY2xhc3MgZm9yIGRvaW5nIG9uZSB0aGluZyB3aXRoIHBvaW50ZXIgZXZlbnRcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFsIGRlZmluZSwgbW9kdWxlLCByZXF1aXJlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZXYtZW1pdHRlci9ldi1lbWl0dGVyJ1xuICAgIF0sIGZ1bmN0aW9uKCBFdkVtaXR0ZXIgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuVW5pcG9pbnRlciA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRXZFbWl0dGVyXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5mdW5jdGlvbiBVbmlwb2ludGVyKCkge31cblxuLy8gaW5oZXJpdCBFdkVtaXR0ZXJcbnZhciBwcm90byA9IFVuaXBvaW50ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG5wcm90by5iaW5kU3RhcnRFdmVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB0aGlzLl9iaW5kU3RhcnRFdmVudCggZWxlbSwgdHJ1ZSApO1xufTtcblxucHJvdG8udW5iaW5kU3RhcnRFdmVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB0aGlzLl9iaW5kU3RhcnRFdmVudCggZWxlbSwgZmFsc2UgKTtcbn07XG5cbi8qKlxuICogQWRkIG9yIHJlbW92ZSBzdGFydCBldmVudFxuICogQHBhcmFtIHtCb29sZWFufSBpc0FkZCAtIHJlbW92ZSBpZiBmYWxzZXlcbiAqL1xucHJvdG8uX2JpbmRTdGFydEV2ZW50ID0gZnVuY3Rpb24oIGVsZW0sIGlzQWRkICkge1xuICAvLyBtdW5nZSBpc0FkZCwgZGVmYXVsdCB0byB0cnVlXG4gIGlzQWRkID0gaXNBZGQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpc0FkZDtcbiAgdmFyIGJpbmRNZXRob2QgPSBpc0FkZCA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcblxuICAvLyBkZWZhdWx0IHRvIG1vdXNlIGV2ZW50c1xuICB2YXIgc3RhcnRFdmVudCA9ICdtb3VzZWRvd24nO1xuICBpZiAoIHdpbmRvdy5Qb2ludGVyRXZlbnQgKSB7XG4gICAgLy8gUG9pbnRlciBFdmVudHNcbiAgICBzdGFydEV2ZW50ID0gJ3BvaW50ZXJkb3duJztcbiAgfSBlbHNlIGlmICggJ29udG91Y2hzdGFydCcgaW4gd2luZG93ICkge1xuICAgIC8vIFRvdWNoIEV2ZW50cy4gaU9TIFNhZmFyaVxuICAgIHN0YXJ0RXZlbnQgPSAndG91Y2hzdGFydCc7XG4gIH1cbiAgZWxlbVsgYmluZE1ldGhvZCBdKCBzdGFydEV2ZW50LCB0aGlzICk7XG59O1xuXG4vLyB0cmlnZ2VyIGhhbmRsZXIgbWV0aG9kcyBmb3IgZXZlbnRzXG5wcm90by5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG4vLyByZXR1cm5zIHRoZSB0b3VjaCB0aGF0IHdlJ3JlIGtlZXBpbmcgdHJhY2sgb2ZcbnByb3RvLmdldFRvdWNoID0gZnVuY3Rpb24oIHRvdWNoZXMgKSB7XG4gIGZvciAoIHZhciBpPTA7IGkgPCB0b3VjaGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciB0b3VjaCA9IHRvdWNoZXNbaV07XG4gICAgaWYgKCB0b3VjaC5pZGVudGlmaWVyID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIgKSB7XG4gICAgICByZXR1cm4gdG91Y2g7XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLSBzdGFydCBldmVudCAtLS0tLSAvL1xuXG5wcm90by5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgLy8gZGlzbWlzcyBjbGlja3MgZnJvbSByaWdodCBvciBtaWRkbGUgYnV0dG9uc1xuICB2YXIgYnV0dG9uID0gZXZlbnQuYnV0dG9uO1xuICBpZiAoIGJ1dHRvbiAmJiAoIGJ1dHRvbiAhPT0gMCAmJiBidXR0b24gIT09IDEgKSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5fcG9pbnRlckRvd24oIGV2ZW50LCBldmVudCApO1xufTtcblxucHJvdG8ub250b3VjaHN0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLl9wb2ludGVyRG93biggZXZlbnQsIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdICk7XG59O1xuXG5wcm90by5vbnBvaW50ZXJkb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLl9wb2ludGVyRG93biggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgc3RhcnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLl9wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gZGlzbWlzcyByaWdodCBjbGljayBhbmQgb3RoZXIgcG9pbnRlcnNcbiAgLy8gYnV0dG9uID0gMCBpcyBva2F5LCAxLTQgbm90XG4gIGlmICggZXZlbnQuYnV0dG9uIHx8IHRoaXMuaXNQb2ludGVyRG93biApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmlzUG9pbnRlckRvd24gPSB0cnVlO1xuICAvLyBzYXZlIHBvaW50ZXIgaWRlbnRpZmllciB0byBtYXRjaCB1cCB0b3VjaCBldmVudHNcbiAgdGhpcy5wb2ludGVySWRlbnRpZmllciA9IHBvaW50ZXIucG9pbnRlcklkICE9PSB1bmRlZmluZWQgP1xuICAgIC8vIHBvaW50ZXJJZCBmb3IgcG9pbnRlciBldmVudHMsIHRvdWNoLmluZGVudGlmaWVyIGZvciB0b3VjaCBldmVudHNcbiAgICBwb2ludGVyLnBvaW50ZXJJZCA6IHBvaW50ZXIuaWRlbnRpZmllcjtcblxuICB0aGlzLnBvaW50ZXJEb3duKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8ucG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuX2JpbmRQb3N0U3RhcnRFdmVudHMoIGV2ZW50ICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlckRvd24nLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIGhhc2ggb2YgZXZlbnRzIHRvIGJlIGJvdW5kIGFmdGVyIHN0YXJ0IGV2ZW50XG52YXIgcG9zdFN0YXJ0RXZlbnRzID0ge1xuICBtb3VzZWRvd246IFsgJ21vdXNlbW92ZScsICdtb3VzZXVwJyBdLFxuICB0b3VjaHN0YXJ0OiBbICd0b3VjaG1vdmUnLCAndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnIF0sXG4gIHBvaW50ZXJkb3duOiBbICdwb2ludGVybW92ZScsICdwb2ludGVydXAnLCAncG9pbnRlcmNhbmNlbCcgXSxcbn07XG5cbnByb3RvLl9iaW5kUG9zdFN0YXJ0RXZlbnRzID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoICFldmVudCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZ2V0IHByb3BlciBldmVudHMgdG8gbWF0Y2ggc3RhcnQgZXZlbnRcbiAgdmFyIGV2ZW50cyA9IHBvc3RTdGFydEV2ZW50c1sgZXZlbnQudHlwZSBdO1xuICAvLyBiaW5kIGV2ZW50cyB0byBub2RlXG4gIGV2ZW50cy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnROYW1lICkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBldmVudE5hbWUsIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xuICAvLyBzYXZlIHRoZXNlIGFyZ3VtZW50c1xuICB0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHMgPSBldmVudHM7XG59O1xuXG5wcm90by5fdW5iaW5kUG9zdFN0YXJ0RXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNoZWNrIGZvciBfYm91bmRFdmVudHMsIGluIGNhc2UgZHJhZ0VuZCB0cmlnZ2VyZWQgdHdpY2UgKG9sZCBJRTggYnVnKVxuICBpZiAoICF0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHMgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnROYW1lICkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCBldmVudE5hbWUsIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xuXG4gIGRlbGV0ZSB0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHM7XG59O1xuXG4vLyAtLS0tLSBtb3ZlIGV2ZW50IC0tLS0tIC8vXG5cbnByb3RvLm9ubW91c2Vtb3ZlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLl9wb2ludGVyTW92ZSggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG5wcm90by5vbnBvaW50ZXJtb3ZlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIGV2ZW50LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgIHRoaXMuX3BvaW50ZXJNb3ZlKCBldmVudCwgZXZlbnQgKTtcbiAgfVxufTtcblxucHJvdG8ub250b3VjaG1vdmUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0b3VjaCA9IHRoaXMuZ2V0VG91Y2goIGV2ZW50LmNoYW5nZWRUb3VjaGVzICk7XG4gIGlmICggdG91Y2ggKSB7XG4gICAgdGhpcy5fcG9pbnRlck1vdmUoIGV2ZW50LCB0b3VjaCApO1xuICB9XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgbW92ZVxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqIEBwcml2YXRlXG4gKi9cbnByb3RvLl9wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5wb2ludGVyTW92ZSggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIHB1YmxpY1xucHJvdG8ucG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlck1vdmUnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIGVuZCBldmVudCAtLS0tLSAvL1xuXG5cbnByb3RvLm9ubW91c2V1cCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5fcG9pbnRlclVwKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbnByb3RvLm9ucG9pbnRlcnVwID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIGV2ZW50LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgIHRoaXMuX3BvaW50ZXJVcCggZXZlbnQsIGV2ZW50ICk7XG4gIH1cbn07XG5cbnByb3RvLm9udG91Y2hlbmQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0b3VjaCA9IHRoaXMuZ2V0VG91Y2goIGV2ZW50LmNoYW5nZWRUb3VjaGVzICk7XG4gIGlmICggdG91Y2ggKSB7XG4gICAgdGhpcy5fcG9pbnRlclVwKCBldmVudCwgdG91Y2ggKTtcbiAgfVxufTtcblxuLyoqXG4gKiBwb2ludGVyIHVwXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICogQHByaXZhdGVcbiAqL1xucHJvdG8uX3BvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5fcG9pbnRlckRvbmUoKTtcbiAgdGhpcy5wb2ludGVyVXAoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG4vLyBwdWJsaWNcbnByb3RvLnBvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyVXAnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIHBvaW50ZXIgZG9uZSAtLS0tLSAvL1xuXG4vLyB0cmlnZ2VyZWQgb24gcG9pbnRlciB1cCAmIHBvaW50ZXIgY2FuY2VsXG5wcm90by5fcG9pbnRlckRvbmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fcG9pbnRlclJlc2V0KCk7XG4gIHRoaXMuX3VuYmluZFBvc3RTdGFydEV2ZW50cygpO1xuICB0aGlzLnBvaW50ZXJEb25lKCk7XG59O1xuXG5wcm90by5fcG9pbnRlclJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlc2V0IHByb3BlcnRpZXNcbiAgdGhpcy5pc1BvaW50ZXJEb3duID0gZmFsc2U7XG4gIGRlbGV0ZSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyO1xufTtcblxucHJvdG8ucG9pbnRlckRvbmUgPSBub29wO1xuXG4vLyAtLS0tLSBwb2ludGVyIGNhbmNlbCAtLS0tLSAvL1xuXG5wcm90by5vbnBvaW50ZXJjYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggZXZlbnQucG9pbnRlcklkID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIgKSB7XG4gICAgdGhpcy5fcG9pbnRlckNhbmNlbCggZXZlbnQsIGV2ZW50ICk7XG4gIH1cbn07XG5cbnByb3RvLm9udG91Y2hjYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0b3VjaCA9IHRoaXMuZ2V0VG91Y2goIGV2ZW50LmNoYW5nZWRUb3VjaGVzICk7XG4gIGlmICggdG91Y2ggKSB7XG4gICAgdGhpcy5fcG9pbnRlckNhbmNlbCggZXZlbnQsIHRvdWNoICk7XG4gIH1cbn07XG5cbi8qKlxuICogcG9pbnRlciBjYW5jZWxcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKiBAcHJpdmF0ZVxuICovXG5wcm90by5fcG9pbnRlckNhbmNlbCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5fcG9pbnRlckRvbmUoKTtcbiAgdGhpcy5wb2ludGVyQ2FuY2VsKCBldmVudCwgcG9pbnRlciApO1xufTtcblxuLy8gcHVibGljXG5wcm90by5wb2ludGVyQ2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJDYW5jZWwnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG4vLyB1dGlsaXR5IGZ1bmN0aW9uIGZvciBnZXR0aW5nIHgveSBjb29yZHMgZnJvbSBldmVudFxuVW5pcG9pbnRlci5nZXRQb2ludGVyUG9pbnQgPSBmdW5jdGlvbiggcG9pbnRlciApIHtcbiAgcmV0dXJuIHtcbiAgICB4OiBwb2ludGVyLnBhZ2VYLFxuICAgIHk6IHBvaW50ZXIucGFnZVlcbiAgfTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gVW5pcG9pbnRlcjtcblxufSkpO1xuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBGbGlja2l0eSAgICAgICAgPSByZXF1aXJlKCdmbGlja2l0eScpLFxuICAgIExhenlMb2FkICAgXHQgXHQgICAgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL2xhenlsb2FkJyksXG4gICAgQ2Fyb3VzZWxzXG5cbiAgICByZXF1aXJlKCdmbGlja2l0eS1pbWFnZXNsb2FkZWQnKVxuXG4gICAgQ2Fyb3VzZWxzID0ge1xuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgQ2Fyb3VzZWxzLmluaXRpYWxpc2VDYXJvdXNlbCgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpbml0aWFsaXNlQ2Fyb3VzZWwgIDogKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgY2Fyb3VzZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1jYXJvdXNlbCcpXG5cbiAgICAgICAgICAgIGNhcm91c2Vscy5mb3JFYWNoKGNhcm91c2VsID0+IHsgXG5cbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVzID0gY2Fyb3VzZWwucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1jYXJvdXNlbF9fc2xpZGVXcmFwJylcblxuICAgICAgICAgICAgICAgIGlmKHNsaWRlcy5sZW5ndGggPiAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZsa3R5ID0gbmV3IEZsaWNraXR5KGNhcm91c2VsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsQWxpZ24gICA6ICdjZW50ZXInLCAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEFyb3VuZCAgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b1BsYXkgICAgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlc0xvYWRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VEb3RzICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQ6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYXJvdXNlbC5jbGFzc0xpc3QucmVtb3ZlKCdKUy0tY2Fyb3VzZWwtLWhpZGRlbicpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IENhcm91c2Vsc1xuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFJvbGxlclRleHRcblxuICAgIFJvbGxlclRleHQgPSB7XG4gICAgICAgIHBocmFzZXM6IFtcbiAgICAgICAgICAgICdtdWx0aS1kYXknLFxuICAgICAgICAgICAgJ3JvY2snLFxuICAgICAgICAgICAgJ3dlZWtlbmQnLFxuICAgICAgICAgICAgJ2JvdXRpcXVlJyxcbiAgICAgICAgICAgICdjb3VudHJ5JyxcbiAgICAgICAgICAgICdob2xpZGF5JyxcbiAgICAgICAgICAgICdjaXR5JyxcbiAgICAgICAgICAgICdkYW5jZScsXG4gICAgICAgICAgICAnZmFtaWx5JyxcbiAgICAgICAgICAgICdtZXRhbCcsXG4gICAgICAgICAgICAnamF6eicsXG4gICAgICAgICAgICAnd2VpcmQnLFxuICAgICAgICAgICAgJ3NwZWNpYWwnLFxuICAgICAgICAgICAgJ2NsYXNzaWNhbCcsXG4gICAgICAgICAgICAnd2ludGVyJ1xuICAgICAgICBdLFxuICAgICAgICBkb206IHtcbiAgICAgICAgICAgIHRleHRXcmFwOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm9sbGVyVGV4dCcpLFxuICAgICAgICAgICAgY3VycmVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGV4dC1jdXJyZW50XScpLFxuICAgICAgICAgICAgbmV4dDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGV4dC1uZXh0XScpLFxuICAgICAgICB9LFxuICAgICAgICBpbnRlcnZhbExlbmd0aCAgICAgICAgICA6IDE1MDAsXG4gICAgICAgIG5leHRQaHJhc2UgICAgICAgICAgOiAnd2ludGVyJyxcbiAgICAgICAgY291bnRlciAgICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICB0aWNrZXIgICAgICAgICAgICAgICAgICA6IGZhbHNlLFxuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoUm9sbGVyVGV4dC5kb20udGV4dFdyYXApXG4gICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5zdGFydGNvdW50ZXIoKVxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RhcnRjb3VudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFJvbGxlclRleHQuc2V0V2lkdGgoUm9sbGVyVGV4dC5kb20uY3VycmVudClcblxuICAgICAgICAgICAgbGV0IGkgPSAxXG4gICAgICAgICAgICBSb2xsZXJUZXh0LmNvdW50ZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7ICAgICAgIFxuXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFBocmFzZSA9IFJvbGxlclRleHQucGhyYXNlc1tpXVxuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRQaHJhc2UgPSBSb2xsZXJUZXh0LnBocmFzZXNbaSArIDFdID8gUm9sbGVyVGV4dC5waHJhc2VzW2kgKyAxXSA6IFJvbGxlclRleHQucGhyYXNlc1swXVxuXG4gICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20udGV4dFdyYXAuY2xhc3NMaXN0LmFkZCgndHVybicpXG5cbiAgICAgICAgICAgICAgICBSb2xsZXJUZXh0LnNldFdpZHRoKFJvbGxlclRleHQuZG9tLm5leHQpXG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBSb2xsZXJUZXh0LmRvbS50ZXh0V3JhcC5jbGFzc0xpc3QucmVtb3ZlKCd0dXJuJylcblxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgbW9iaWxlIHNjcmVlbiBpbWFnZVxuICAgICAgICAgICAgICAgICAgICBSb2xsZXJUZXh0LmRvbS5jdXJyZW50LnRleHRDb250ZW50ID0gY3VycmVudFBocmFzZVxuICAgICAgICAgICAgICAgICAgICBSb2xsZXJUZXh0LmRvbS5uZXh0LnRleHRDb250ZW50ID0gbmV4dFBocmFzZVxuXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcblxuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2ggdGhlIGVuZCBvZiB0aGUgdGhlbWVzLCByZXNldCB0byBmaXJzdCB0aGVtZVxuICAgICAgICAgICAgICAgIGkgPj0gUm9sbGVyVGV4dC5waHJhc2VzLmxlbmd0aCAtIDEgPyBpID0gMCA6IGkrK1xuXG4gICAgICAgICAgICB9LCBSb2xsZXJUZXh0LmludGVydmFsTGVuZ3RoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRXaWR0aDogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZXh0V2lkdGggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFJvbGxlclRleHQuZG9tLnRleHRXcmFwLnN0eWxlLndpZHRoID0gYCR7dGV4dFdpZHRofXB4YFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFJvbGxlclRleHRcblxufSgpKVxuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBUb2dnbGVQcmljZVxuXG4gICAgVG9nZ2xlUHJpY2UgPSB7XG4gICAgICAgIGRvbToge1xuICAgICAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLVRvZ2dsZVByaWNlJyksXG4gICAgICAgICAgICBhbm51YWxCdXR0b246IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxhblRvZ2dsZS0tYW5udWFsJyksXG4gICAgICAgICAgICBtb250aGx5QnV0dG9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsYW5Ub2dnbGUtLW1vbnRobHknKSxcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBkYXRhIHNldCB3aXRoIFxuICAgICAgICAgICAgVG9nZ2xlUHJpY2UuZG9tLmFubnVhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFRvZ2dsZVByaWNlLnNob3dBbm51YWwpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUb2dnbGVQcmljZS5kb20pIFxuICAgICAgICAgICAgVG9nZ2xlUHJpY2UuZG9tLm1vbnRobHlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBUb2dnbGVQcmljZS5zaG93TW9udGhseSlcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dBbm51YWw6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoVG9nZ2xlUHJpY2UuZG9tLmNvbnRhaW5lci5kYXRhc2V0LnBsYW4gPSBcImFubnVhbFwiKSBcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIFRvZ2dsZVByaWNlLmRvbS5jb250YWluZXIuZGF0YXNldC5wbGFuID0gXCJhbm5hdWxcIlxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dNb250aGx5OiAoKSA9PiB7XG4gICAgICAgICAgICBpZihUb2dnbGVQcmljZS5kb20uY29udGFpbmVyLmRhdGFzZXQucGxhbiA9IFwibW9udGhseVwiKSBcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBUb2dnbGVQcmljZS5kb20uY29udGFpbmVyLmRhdGFzZXQucGxhbiA9IFwibW9udGhseVwiXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBUb2dnbGVQcmljZVxuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCl7XG5cbiAgICAndXNlIHN0cmljdCdcblxuXHR2YXIgUGxvdCAgICBcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3QnKSwgIFxuXHRcdExhenlMb2FkICAgXHQgXHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbGF6eWxvYWQnKSxcblx0XHRNb2RhbHNcdFx0XHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbW9kYWxzJyksXG5cdFx0Q2Fyb3VzZWxzXHRcdD0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2Nhcm91c2VsJyksXG5cdFx0U21vb3RoIFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90LXNtb290aC1zY3JvbGwnKSxcblx0XHRGQVFzIFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9mYXFzJyksXG5cdFx0Ly8gQ3VzdG9tTW91c2UgXHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvY3VzdG9tLW1vdXNlJyksXG5cdFx0SG9tZVx0XHRcdD0gcmVxdWlyZSgnLi9wYWdlcy9ob21lJyksXG5cdFx0Um9sbGVyVGV4dCAgICAgID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3JvbGxlci10ZXh0JyksXG5cdFx0VG9nZ2xlUHJpY2UgICAgID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RvZ2dsZS1wcmljZScpLFxuXHRcdEFydGlzdHNcdFx0XHQ9IHJlcXVpcmUoJy4vcGFnZXMvYXJ0aXN0cycpLFxuXHRcdFNjaGVkdWxlXHRcdD0gcmVxdWlyZSgnLi9wYWdlcy9zY2hlZHVsZScpLFxuXHRcdE5ld3MgXHRcdFx0PSByZXF1aXJlKCcuL3BhZ2VzL25ld3MnKSxcblx0ICAgIE1haW5cblxuXHRNYWluID0ge1xuXG5cdFx0aW5pdDogKCkgPT4ge1x0XG5cblx0XHRcdE1haW4uaW5pdGFsaXplU21vb3RoKClcblxuXHRcdFx0UGxvdC5pbml0KCkgXG5cdFx0XHRMYXp5TG9hZC5pbml0KClcblx0XHRcdE1vZGFscy5pbml0KCkgIFxuXHRcdFx0Q2Fyb3VzZWxzLmluaXQoKVxuXHRcdFx0RkFRcy5pbml0KClcblx0XHRcdFJvbGxlclRleHQuaW5pdCgpXG5cdFx0XHQvLyBDdXN0b21Nb3VzZS5pbml0KHtcblx0XHRcdC8vIFx0J2EnIFx0XHRcdFx0OiAnYW5jaG9ySG92ZXInLFxuXHRcdFx0Ly8gXHQnLmFsdEhvdmVyVGFyZ2V0J1x0OiAnYWx0SG92ZXInXG5cdFx0XHQvLyB9KVxuXG5cdFx0XHQvL1BhZ2VzXG4gICAgICAgIFx0aWYoUGxvdC5pc1BhZ2UoJ2hvbWUnKSlcblx0XHRcdFx0SG9tZS5pbml0KClcblxuICAgICAgICBcdGlmKFBsb3QuaXNQYWdlKCdzY2hlZHVsZScpKVxuXHRcdFx0XHRTY2hlZHVsZS5pbml0KClcblxuICAgICAgICBcdGlmKFBsb3QuaXNQYWdlKCdhcnRpc3RzJykpXG5cdFx0XHRcdEFydGlzdHMuaW5pdCgpXG5cblx0XHRcdGlmKFBsb3QuaXNQYWdlKCdwcmljaW5nJykpXG5cdFx0XHRcdFRvZ2dsZVByaWNlLmluaXQoKVxuXG5cdFx0XHROZXdzLmluaXQoKVxuXHRcdFx0XG5cdFx0XHRNYWluLmRlbW9BamF4QnV0dG9uKCkgXG5cblx0XHR9LFxuXHRcdFxuXHRcdGluaXRhbGl6ZVNtb290aCA6ICgpID0+IHtcblxuICAgICAgICBcdGNvbnN0IGhhc1Ntb290aFNjcm9sbCA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5wbG90Q3VzdG9taXplclNtb290aFNjcm9sbFxuXG4gICAgICAgIFx0Y29uc3Qgc21vb3RoU2V0dGluZ3MgPSB7XG5cdFx0XHRcdHN0YW5kYXJkU2Nyb2xsICA6IGhhc1Ntb290aFNjcm9sbCAhPSAneWVzJ1xuXHRcdFx0fVxuXG4gICAgICAgIFx0U21vb3RoLmluaXQoc21vb3RoU2V0dGluZ3MpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBkZW1vQWpheEJ1dHRvbiA6ICgpID0+IHtcblxuXHRcdFx0dmFyIHBsb3REZW1vTG9hZENvbnRlbnQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TG9hZFRlbXBsYXRlUGFydERlbW8nKTtcblx0XHRcdFxuXG5cdFx0XHRpZihwbG90RGVtb0xvYWRDb250ZW50KVxuXG5cdFx0XHRcdHBsb3REZW1vTG9hZENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblxuXHRcdFx0XHRcdC8vIFRha2UgYSBsb29rIGF0IHdoYXQgeW91IGNhbiBwYXNzIHRvIHRoaXMgZnVuY3Rpb25cblx0XHRcdFx0XHQvLyB2YXIgYXJncyA9IHtcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiBudWxsLFxuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGFjdGlvbiAgICAgICAgICA6ICdwbG90TG9hZFRlbXBsYXRlUGFydCcsIC8vVGhpcyBpcyB0aGUgYWN0aW9uIGZpcmVkIGludG8gb3VyIFBsb3RTaXRlIFBIUCBzZXR1cC5waHAgZmlsZVxuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGRhdGEgICAgICAgICAgICA6IHt9LCAvL0FueSBkYXRhIHdlJ2QgbGlrZSB0byBwYXNzIHRvIHRoZSB0ZW1wbGF0ZSBwYXJ0LiBcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICBjb250ZW50QXJlYSAgICAgOiAnLkpTLS1hamF4VGFyZ2V0QXJlYScsIC8vV2hlcmUgdGhlIG5ldyBjb250ZW50IGdldHMgaW5zZXJ0c1xuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGFwcGVuZCAgICAgICAgICA6IGZhbHNlIC8vSWYgd2Ugd2FudCB0byBhcHBlbmQgdG8gdGhlIGFib3ZlIGFyZWEsIG9yIHJlcGxhY2UgdGhlIGNvbnRlbnRcblx0XHRcdFx0ICAgIC8vICAgICAgICAgIH1cblxuXHRcdFx0XHRcdGNvbnN0IGFyZ3MgPSB7XG5cblx0XHRcdFx0XHRcdHRlbXBsYXRlUGFydCA6ICdkZW1vcy9hamF4LWNvbnRlbnQnLCBcblx0XHRcdFx0XHRcdGRhdGEgOiB7XG5cdFx0XHRcdFx0XHRcdCdmb28nIFx0XHQ6ICdiYXInLFxuXHRcdFx0XHRcdFx0XHQnYmFuZ2VycydcdDogJ21hc2gnLFxuXHRcdFx0XHRcdFx0XHQnaGF2aW5nJ1x0OiAnaXQnXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cblx0XHRcdFx0XHRQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncylcblxuXHRcdFx0XHR9KVxuXG4gICAgICAgIH1cblxuXHR9XG5cblx0d2luZG93Lk1haW4gPSBNYWluXG5cbn0oKSk7XG4gIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBQbG90IFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90JyksXG4gICAgICAgIE1vZGFscyAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbW9kYWxzJyksXG4gICAgXHRBcnRpc3RzXG5cbiAgICAvL01heSB0aGlzIG9iamVjdCBhY3QgYXMgYSBndWlkZSB0byB1c2luZyBQbG90IGNvcmUgZnVuY3Rpb25zXG4gICAgLy9hbmQgaG93IHRvIHNldCB1cCBhamF4IGR5bmFtaWMgZGF0YSB3aXRoIG91ciBuZXcgcHJpbmNpcGxlcyB3aXRoIGVhc2VcbiAgICBBcnRpc3RzID0ge1xuXG4gICAgXHRtYXhQYWdlcyBcdFx0XHQ6IDEsXG4gICAgXHRjdXJyZW50UGFnZSBcdFx0OiAxLFxuICAgIFx0Y3VycmVudEFydGlzdFR5cGVcdDogZmFsc2UsXG4gICAgXHRsb2FkTW9yZUJ1dHRvbiAgXHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tYXJ0aXN0c0xvYWRNb3JlJyksXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgIFx0QXJ0aXN0cy5zaG93T3JIaWRlTG9hZE1vcmVCdXR0b24oKVxuXG4gICAgICAgICAgICBBcnRpc3RzLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICBcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblxuICAgICAgICBcdFx0Y29uc3QgbmV4dFBhZ2UgPSBwYXJzZUludChBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UpXG5cbiAgICAgICAgXHRcdEFydGlzdHMuY3VycmVudFBhZ2UgPSBuZXh0UGFnZVxuXG4gICAgICAgIFx0XHRBcnRpc3RzLmxvYWRBcnRpc3RzKHRydWUpXG5cbiAgICAgICAgXHRcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSA9IG5leHRQYWdlICsgMVxuXG4gICAgICAgIFx0fSlcblxuICAgICAgICBcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvL0hhdmUgd2UgY2xpY2tlZCBvbiBhbiBhcnRpc3QgdHlwZSBmaWx0ZXIgYnV0dG9uP1xuXHRcdFx0XHRpZiAoZS50YXJnZXQuY2xvc2VzdCgnLkpTLS1hcnRpc3RUeXBlQnV0dG9uJykpIHtcblx0XHRcdFx0XHRBcnRpc3RzLmN1cnJlbnRBcnRpc3RUeXBlID0gZS50YXJnZXQuZGF0YXNldC5hcnRpc3RUeXBlSWRcblx0XHRcdFx0XHRBcnRpc3RzLmN1cnJlbnRQYWdlID0gMVxuICAgICAgICAgICAgICAgICAgICBBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UgPSAyXG5cdFx0XHRcdFx0QXJ0aXN0cy5sb2FkQXJ0aXN0cyhmYWxzZSkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tYXJ0aXN0VHlwZUJ1dHRvbicpLmZvckVhY2goYXJ0aXN0VHlwZUJ1dHRvbiA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnRpc3RUeXBlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cdFx0XHRcdH0gXG5cblx0XHRcdH0sIGZhbHNlKVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkQXJ0aXN0cyA6IGFwcGVuZCA9PiB7XG5cbiAgICAgICAgXHRjb25zdCBhcmdzID0ge1xuXHRcdFx0XHR0ZW1wbGF0ZVBhcnQgOiAncGFydHMvYXJ0aXN0LWxpc3RpbmcnLCBcblx0XHRcdFx0ZGF0YSA6IHtcblx0XHRcdFx0XHQncGFnZScgXHRcdFx0OiBBcnRpc3RzLmN1cnJlbnRQYWdlLFxuXHRcdFx0XHRcdCdhcnRpc3RUeXBlJ1x0OiBBcnRpc3RzLmN1cnJlbnRBcnRpc3RUeXBlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFwcGVuZCA6IGFwcGVuZCBcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFBsb3QubG9hZFRlbXBsYXRlUGFydChhcmdzKS50aGVuKGh0bWwgPT4ge1xuXG5cdFx0XHRcdEFydGlzdHMuc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uKClcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cblx0XHRcdH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93T3JIaWRlTG9hZE1vcmVCdXR0b24gOiAoKSA9PiB7XG5cbiAgICAgICAgXHQvL0NoZWNrIGlmIG1heCBwYWdlcyBpcyAxLiBJZiBpdCBpcywgdGhlcmUncyBvbmx5IDEgcGFnZSBvZiBhcnRpc3RzXG4gICAgICAgIFx0Ly9zbyB3ZSBjYW4gaGlkZSBsb2FkIG1vcmUgYnV0dG9uXG4gICAgICAgIFx0QXJ0aXN0cy5tYXhQYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tbWF4UGFnZXMnKS5kYXRhc2V0Lm1heFBhZ2VzXG5cbiAgICAgICAgXHRpZihBcnRpc3RzLm1heFBhZ2VzID4gQXJ0aXN0cy5jdXJyZW50UGFnZSlcbiAgICAgICAgXHRcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgXHRlbHNlIFxuICAgICAgICBcdFx0QXJ0aXN0cy5sb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gQXJ0aXN0c1xuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBIb21lXG5cbiAgICBIb21lID0ge1xuICAgICAgICBkb20gOiB7XG4gICAgICAgICAgICBib2R5ICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICByb290ICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKSxcbiAgICAgICAgICAgIHBob25lICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZTNEX19waG9uZScpLFxuICAgICAgICAgICAgaG9tZUJhbm5lciAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZUJhbm5lcicpLFxuICAgICAgICAgICAgaGVhZGVyICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2l0ZU1haW5IZWFkZXInKSxcbiAgICAgICAgICAgIGNvbG91clNoYXBlcyAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgMSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvdXJTaGFwZS0tMScpLFxuICAgICAgICAgICAgICAgIDIgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3VyU2hhcGUtLTInKSxcbiAgICAgICAgICAgICAgICAzIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG91clNoYXBlLS0zJyksXG4gICAgICAgICAgICAgICAgNCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvdXJTaGFwZS0tNCcpLFxuICAgICAgICAgICAgICAgIDUgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3VyU2hhcGUtLTUnKSxcbiAgICAgICAgICAgICAgICA2IDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG91clNoYXBlLS02JyksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludGVydmFsTGVuZ3RoICAgICAgICAgIDogNTAwMCxcbiAgICAgICAgcHJldmlvdXNUaGVtZSAgICAgICAgICAgOiAnbm9uZScsXG4gICAgICAgIGNvdW50ZXIgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgdGlja2VyICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgY3VycmVudE1vdXNlUG9zaXRpb24gICAgOiB7XG4gICAgICAgICAgICBYOiB3aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAgICAgICAgICBZOiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzTW91c2VQb3NpdGlvbiAgIDoge1xuICAgICAgICAgICAgWDogd2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgICAgICAgICAgWTogd2luZG93LmlubmVySGVpZ2h0IC8gMlxuICAgICAgICB9LFxuICAgICAgICBtb3VzZU1vdmVBbmltYXRpb25GcmFtZSA6IG51bGwsXG4gICAgICAgIHRoZW1lczogW1xuICAgICAgICAgICAgJ3NvdW5kcycsXG4gICAgICAgICAgICAndXJiYW4nLFxuICAgICAgICAgICAgJ3RhZ291dCcsXG4gICAgICAgICAgICAnYm94JyxcbiAgICAgICAgICAgICdpbnRlcicsXG4gICAgICAgICAgICAnaGFsZnRvbmUnLFxuICAgICAgICAgICAgJ2RlZXAnLFxuICAgICAgICAgICAgJ2FydHMnXG4gICAgICAgICAgICBcbiAgICAgICAgXSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIEhvbWUuY3JlYXRlTGlzdGVuZXJzKClcblxuICAgICAgICAgICAgSG9tZS5zdGFydFRoZW1lQ291bnRlcigpXG5cbiAgICAgICAgICAgIEhvbWUuc2V0V2lkdGhPZlBob25lKClcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUxpc3RlbmVyczogKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBob21lQmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVCYW5uZXInKVxuXG4gICAgICAgICAgICAvLyBPYnNlcnZlIHRoZSBob21lYmFubmVyIHNlY3Rpb24gZm9yIGNsYXNzIGNoYW5nZXNcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoSG9tZS5iYW5uZXJNdXRhdGlvbilcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoaG9tZUJhbm5lciwge1xuICAgICAgICAgICAgICBhdHRyaWJ1dGVzICA6IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBidXJnZXJNZW51VHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLW1lbnVUcmlnZ2VyJylcblxuICAgICAgICAgICAgLy8gVG9nZ2xlIGJhbm5lciBhbmltYXRpb24gd2hlbiBtZW51IG9wZW5lZC9jbG9zZWRcbiAgICAgICAgICAgIGJ1cmdlck1lbnVUcmlnZ2Vycy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEhvbWUudG9nZ2xlVGhlbWVDb3VudGVyKVxuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJyxIb21lLnNldFdpZHRoT2ZQaG9uZSlcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IDY0MCkge1xuXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5jbGFzc0xpc3QuYWRkKCdzbWFsbFNjcmVlbicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIEhvbWUubW91c2VNb3ZlQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoSG9tZS5ydW5Nb3VzZU1vdmUpXG5cbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ob21lQmFubmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiBIb21lLnRyYWNrQ3Vyc29yUG9zaXRpb24oZSkpIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFdpZHRoT2ZQaG9uZSA6ICgpID0+IHtcblxuICAgICAgICAgICAgSG9tZS5kb20ucGhvbmUuc3R5bGUud2lkdGggPSBIb21lLmRvbS5waG9uZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgKiAuNTUgKyAncHgnXG5cbiAgICAgICAgfSxcblxuICAgICAgICBiYW5uZXJNdXRhdGlvbjogKG11dGF0aW9uc0xpc3QsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIElmIHRoZSBiYW5uZXIgZWxlbWVudCBpcyBpbiB2aWV3XG4gICAgICAgICAgICBpZihtdXRhdGlvbnNMaXN0WzBdLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycpICYmICFIb21lLmJhbm5lckluVmlldykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIEhvbWUuYmFubmVySW5WaWV3ID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgSG9tZS5zdGFydFRoZW1lQ291bnRlcigpXG5cbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGlmKCFtdXRhdGlvbnNMaXN0WzBdLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycpICYmIEhvbWUuYmFubmVySW5WaWV3KSB7XG5cbiAgICAgICAgICAgICAgICBIb21lLmJhbm5lckluVmlldyA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICBIb21lLnN0b3BUaGVtZUNvdW50ZXIoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIEhvbWUucmVtb3ZlVGhlbWUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHRyYWNrQ3Vyc29yUG9zaXRpb246IChlKSA9PiB7XG4gICAgXG4gICAgICAgICAgICBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIFg6IGUuY2xpZW50WCxcbiAgICAgICAgICAgICAgICBZOiBlLmNsaWVudFlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWlkZGxlUG9pbnRYID0gd2luZG93LmlubmVyV2lkdGggLyAyXG4gICAgICAgICAgICBjb25zdCBtaWRkbGVQb2ludFkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyXG5cbiAgICAgICAgICAgIGlmKEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWCAgLSAyMDAwID4gbWlkZGxlUG9pbnRYKVxuICAgICAgICAgICAgICAgIEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWCA9IG1pZGRsZVBvaW50WCArIDIwMDBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5YICArIDIwMDAgPCBtaWRkbGVQb2ludFgpXG4gICAgICAgICAgICAgICAgSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5YID0gbWlkZGxlUG9pbnRYIC0gMjAwMFxuXG4gICAgICAgICAgICBpZihIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlkgIC0gMjAwMCA+IG1pZGRsZVBvaW50WSlcbiAgICAgICAgICAgICAgICBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlkgPSBtaWRkbGVQb2ludFkgKyAyMDAwXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWSAgKyAyMDAwIDwgbWlkZGxlUG9pbnRZKVxuICAgICAgICAgICAgICAgIEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWSA9IG1pZGRsZVBvaW50WSAtIDIwMDBcblxuICAgICAgICAgICAgaWYoSG9tZS50aWNrZXIgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBIb21lLnRpY2tlciA9IHRydWVcbiAgICAgICAgICAgICAgICBIb21lLm1vdXNlTW92ZUFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKEhvbWUucnVuTW91c2VNb3ZlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICBzdGFydFRoZW1lQ291bnRlcjogKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBIb21lLmJhbm5lckluVmlldyA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIFNldCBoZWFkZXIgdG8gZGVmYXVsdCBzdHlsZVxuICAgICAgICAgICAgaWYoSG9tZS5kb20uaGVhZGVyLmNsYXNzTGlzdC5jb250YWlucygnZGVmYXVsdEhlYWRlcicpKVxuICAgICAgICAgICAgICAgIEhvbWUuZG9tLmhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWZhdWx0SGVhZGVyJykgXG4gICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaSA9IDBcbiAgICAgICAgICAgIEhvbWUuY291bnRlciA9IHNldEludGVydmFsKCgpID0+IHsgICAgIFxuXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93RmxvYXRlcnMnKVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEhvbWUuZG9tLmJvZHkuY2xhc3NMaXN0LmFkZCgnc2hvd0Zsb2F0ZXJzJylcbiAgICAgICAgICAgICAgICB9LDEwMCkgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBtb2JpbGUgc2NyZWVuIGltYWdlXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5kYXRhc2V0LmN1cnJlbnRUaGVtZSA9IEhvbWUudGhlbWVzW2ldXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5kYXRhc2V0LnByZXZpb3VzVGhlbWUgPSBIb21lLnByZXZpb3VzVGhlbWVcblxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzdGF0ZVxuICAgICAgICAgICAgICAgIEhvbWUucHJldmlvdXNUaGVtZSA9IEhvbWUudGhlbWVzW2ldXG5cbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmNsYXNzTGlzdC5hZGQoJ3NsaWRlTW9iaWxlU2NyZWVuJylcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlTW9iaWxlU2NyZWVuJykgICAgXG4gICAgICAgICAgICAgICAgfSwgMjAwMClcblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoIHRoZSBlbmQgb2YgdGhlIHRoZW1lcywgcmVzZXQgdG8gZmlyc3QgdGhlbWVcbiAgICAgICAgICAgICAgICBpID49IEhvbWUudGhlbWVzLmxlbmd0aCAtIDEgPyBpID0gMCA6IGkrK1xuXG4gICAgICAgICAgICB9LCA3MDAwKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RvcFRoZW1lQ291bnRlcjogKCkgPT4ge1xuXG4gICAgICAgICAgICBpZihIb21lLmNvdW50ZXIpXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChIb21lLmNvdW50ZXIpXG5cbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVUaGVtZTogKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihIb21lLnByZXZpb3VzVGhlbWUpXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5jbGFzc0xpc3QucmVtb3ZlKEhvbWUucHJldmlvdXNUaGVtZSlcblxuICAgICAgICAgICAgSG9tZS5wcmV2aW91c1RoZW1lID0gJydcblxuICAgICAgICAgICAgLy8gU2V0IGhlYWRlciB0byBkZWZhdWx0IHN0eWxlXG4gICAgICAgICAgICBIb21lLmRvbS5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnZGVmYXVsdEhlYWRlcicpIFxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9nZ2xlVGhlbWVDb3VudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBDYW5jZWwgYW5pbWF0aW9uIGlmIG1lbnUgaXMgb3BlblxuICAgICAgICAgICAgaWYoSG9tZS5kb20ucm9vdC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlck9wZW4nKSkge1xuXG4gICAgICAgICAgICAgICAgSG9tZS5zdG9wVGhlbWVDb3VudGVyKClcbiAgICAgICAgICAgICAgICBIb21lLnJlbW92ZVRoZW1lKClcblxuICAgICAgICAgICAgLy8gU3RhcnQgYW5pbWF0aW9uIGlmIG1lbnUgaXMgY2xvc2VkIGFuZCBiYW5uZXIgaXMgaW4gdmlldyAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZihIb21lLmJhbm5lckluVmlldykge1xuXG4gICAgICAgICAgICAgICAgSG9tZS5zdGFydFRoZW1lQ291bnRlcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcnVuTW91c2VNb3ZlIDogKCkgPT4ge1xuXG5cbiAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2VPZlBvc2l0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBZOiBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlkgLSBIb21lLnByZXZpb3VzTW91c2VQb3NpdGlvbi5ZLFxuICAgICAgICAgICAgICAgIFg6IEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWCAtIEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uLlhcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIFg6IEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uLlggKyAoZGlmZmVyZW5jZU9mUG9zaXRpb25zLlggKiAwLjEpLFxuICAgICAgICAgICAgICAgIFk6IEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uLlkgKyAoZGlmZmVyZW5jZU9mUG9zaXRpb25zLlkgKiAwLjEpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHhTaGlmdCA9IChIb21lLnByZXZpb3VzTW91c2VQb3NpdGlvbi5YIC0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikpIC8gKHdpbmRvdy5pbm5lcldpZHRoIC8gMiApXG4gICAgICAgICAgICBjb25zdCB5U2hpZnQgPSAoKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWSkgLyAod2luZG93LmlubmVySGVpZ2h0IC8gMiApXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEhvbWUuZG9tLnBob25lLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVYKCR7MTUgKyB5U2hpZnQqN31kZWcpIHJvdGF0ZVkoJHt4U2hpZnQqNjAgPiA1MCA/IDUwIDogeFNoaWZ0KjYwfWRlZylgXG5cbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSAxMFxuICAgICAgICAgICAgSG9tZS5kb20uY29sb3VyU2hhcGVzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7eFNoaWZ0ICogbXVsdGlwbGllciAqIDV9cHgpIHRyYW5zbGF0ZVkoJHstNSp5U2hpZnQqbXVsdGlwbGllcn1weCkgdHJhbnNsYXRlWig1cmVtKWAgXG4gICAgICAgICAgICBIb21lLmRvbS5jb2xvdXJTaGFwZXNbMl0uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt4U2hpZnQgKiBtdWx0aXBsaWVyICogM31weCkgdHJhbnNsYXRlWSgkey0zKnlTaGlmdCptdWx0aXBsaWVyfXB4KSB0cmFuc2xhdGVaKDVyZW0pYCBcbiAgICAgICAgICAgIEhvbWUuZG9tLmNvbG91clNoYXBlc1szXS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3hTaGlmdCAqIG11bHRpcGxpZXIgKiA5fXB4KSB0cmFuc2xhdGVZKCR7LTkqeVNoaWZ0Km11bHRpcGxpZXJ9cHgpIHRyYW5zbGF0ZVooNXJlbSlgIFxuICAgICAgICAgICAgSG9tZS5kb20uY29sb3VyU2hhcGVzWzRdLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7eFNoaWZ0ICogbXVsdGlwbGllciAqIDJ9cHgpIHRyYW5zbGF0ZVkoJHstMip5U2hpZnQqbXVsdGlwbGllcn1weCkgdHJhbnNsYXRlWig1cmVtKWAgXG4gICAgICAgICAgICBIb21lLmRvbS5jb2xvdXJTaGFwZXNbNV0uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt4U2hpZnQgKiBtdWx0aXBsaWVyICogNH1weCkgdHJhbnNsYXRlWSgkey00KnlTaGlmdCptdWx0aXBsaWVyfXB4KSB0cmFuc2xhdGVaKDVyZW0pYCBcbiAgICAgICAgICAgIEhvbWUuZG9tLmNvbG91clNoYXBlc1s2XS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3hTaGlmdCAqIG11bHRpcGxpZXIgKiA3fXB4KSB0cmFuc2xhdGVZKCR7LTcqeVNoaWZ0Km11bHRpcGxpZXJ9cHgpIHRyYW5zbGF0ZVooNXJlbSlgIFxuXG4gICAgICAgICAgICBpZihNYXRoLmFicyhkaWZmZXJlbmNlT2ZQb3NpdGlvbnMuWCArIGRpZmZlcmVuY2VPZlBvc2l0aW9ucy5ZKSA8IC4xKVxuICAgICAgICAgICAgICAgIEhvbWUudGlja2VyID0gZmFsc2VcblxuICAgICAgICAgICAgaWYoSG9tZS50aWNrZXIgPT0gdHJ1ZSkgXG4gICAgICAgICAgICAgICAgSG9tZS5tb3VzZU1vdmVBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShIb21lLnJ1bk1vdXNlTW92ZSlcblxuICAgICAgICB9LFxuXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IEhvbWVcblxufSgpKSIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgUGxvdCBcdFx0XHQ9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvcGxvdCcpLFxuICAgIFx0TmV3c1xuXG4gICAgLy9NYXkgdGhpcyBvYmplY3QgYWN0IGFzIGEgZ3VpZGUgdG8gdXNpbmcgUGxvdCBjb3JlIGZ1bmN0aW9uc1xuICAgIC8vYW5kIGhvdyB0byBzZXQgdXAgYWpheCBkeW5hbWljIGRhdGEgd2l0aCBvdXIgbmV3IHByaW5jaXBsZXMgd2l0aCBlYXNlXG4gICAgTmV3cyA9IHtcblxuICAgIFx0bWF4UGFnZXMgXHRcdFx0OiAxLFxuICAgICAgICBjdXJyZW50TmV3c0NhdGVnb3J5IDogMCxcbiAgICAgICAgY3VycmVudFBhZ2UgICAgICAgICA6IDEsXG4gICAgXHRsb2FkTW9yZUJ1dHRvbiAgXHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tbmV3c0xvYWRNb3JlJyksXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgICBpZihOZXdzLmxvYWRNb3JlQnV0dG9uKSB7XG5cbiAgICAgICAgICAgIFx0TmV3cy5zaG93T3JIaWRlTG9hZE1vcmVCdXR0b24oKVxuXG4gICAgICAgICAgICAgICAgTmV3cy5jcmVhdGVMaXN0ZW5lcnMoKVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICBcdE5ld3MubG9hZE1vcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblxuICAgICAgICBcdFx0Y29uc3QgbmV4dFBhZ2UgPSBwYXJzZUludChOZXdzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UpXG5cbiAgICAgICAgXHRcdE5ld3MuY3VycmVudFBhZ2UgPSBuZXh0UGFnZVxuXG4gICAgICAgIFx0XHROZXdzLmxvYWROZXdzKHRydWUpXG5cbiAgICAgICAgXHRcdE5ld3MubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSA9IG5leHRQYWdlICsgMVxuXG4gICAgICAgIFx0fSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIGxvYWROZXdzIDogYXBwZW5kID0+IHtcblxuICAgICAgICBcdGNvbnN0IGFyZ3MgPSB7XG5cdFx0XHRcdHRlbXBsYXRlUGFydCA6ICdwYXJ0cy9uZXdzLWxpc3RpbmcnLCBcblx0XHRcdFx0ZGF0YSA6IHtcblx0XHRcdFx0XHQncGFnZScgXHRcdFx0OiBOZXdzLmN1cnJlbnRQYWdlLFxuXHRcdFx0XHRcdCdhcnRpc3RUeXBlJ1x0OiBOZXdzLmN1cnJlbnROZXdzQ2F0ZWdvcnlcblx0XHRcdFx0fSxcblx0XHRcdFx0YXBwZW5kIDogYXBwZW5kIFxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gUGxvdC5sb2FkVGVtcGxhdGVQYXJ0KGFyZ3MpLnRoZW4oaHRtbCA9PiB7XG5cblx0XHRcdFx0TmV3cy5zaG93T3JIaWRlTG9hZE1vcmVCdXR0b24oKVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuXHRcdFx0fSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbiA6ICgpID0+IHtcblxuICAgICAgICBcdC8vQ2hlY2sgaWYgbWF4IHBhZ2VzIGlzIDEuIElmIGl0IGlzLCB0aGVyZSdzIG9ubHkgMSBwYWdlIG9mIE5ld3NcbiAgICAgICAgXHQvL3NvIHdlIGNhbiBoaWRlIGxvYWQgbW9yZSBidXR0b25cbiAgICAgICAgXHROZXdzLm1heFBhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1tYXhQYWdlcycpLmRhdGFzZXQubWF4UGFnZXNcblxuICAgICAgICAgICAgY29uc29sZS5sb2coTmV3cy5tYXhQYWdlcylcblxuICAgICAgICBcdGlmKE5ld3MubWF4UGFnZXMgPiBOZXdzLmN1cnJlbnRQYWdlKVxuICAgICAgICBcdFx0TmV3cy5sb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICBcdGVsc2UgXG4gICAgICAgIFx0XHROZXdzLmxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBOZXdzXG5cbn0oKSkiLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFNjaGVkdWxlXG5cbiAgICBTY2hlZHVsZSA9IHtcbiAgICAgIGRheUJ1dHRvbnMgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLXNjaGVkdWxlRGF5UGlja2VyQnV0dG9uJyksXG4gICAgICBjYWxlbmRhcnMgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjaGVkdWxlQ2FsZW5kYXJXcmFwJyksXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgU2NoZWR1bGUuY3JlYXRlTGlzdGVuZXJzKClcbiAgICAgICAgICBTY2hlZHVsZS5jaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQoKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlTGlzdGVuZXJzOiAoKSA9PiB7XG5cbiAgICAgICAgICBmb3IodmFyIGRheUJ1dHRvbiBvZiBTY2hlZHVsZS5kYXlCdXR0b25zKSB7XG5cbiAgICAgICAgICAgIGRheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgU2NoZWR1bGUubG9hZE5ld0RhdGUodGhpcykgXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCgpID0+IHtcblxuICAgICAgICAgICAgU2NoZWR1bGUuY2hlY2tUb1NlZUlmTmF2QXJyb3dzTmVlZGVkKClcblxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBmb3IodmFyIGNhbGVuZGFyIG9mIFNjaGVkdWxlLmNhbGVuZGFycykge1xuXG4gICAgICAgICAgICBjb25zdCByaWdodEJ1dHRvbiAgICAgID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZVJpZ2h0JyksXG4gICAgICAgICAgICBsZWZ0QnV0dG9uICAgICAgICAgICAgID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZUxlZnQnKSxcbiAgICAgICAgICAgIHRyYWNrcyAgICAgICAgICAgICAgICAgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuc2NoZWR1bGVDYWxlbmRhclRyYWNrcycpLFxuICAgICAgICAgICAgdHJhY2tzVyAgICAgICAgICAgICAgICA9IHRyYWNrcy5vZmZzZXRXaWR0aFxuXG4gICAgICAgICAgICByaWdodEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgdHJhY2tzLnNjcm9sbEJ5KHtcbiAgICAgICAgICAgICAgICBsZWZ0OiB0cmFja3NXIC8gMixcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxlZnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRyYWNrcy5zY3JvbGxCeSh7XG4gICAgICAgICAgICAgICAgbGVmdDogLXRyYWNrc1cgLyAyLFxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZE5ld0RhdGUgOiBlbGVtID0+IHtcblxuICAgICAgICAgIGZvcih2YXIgZEIgb2YgU2NoZWR1bGUuZGF5QnV0dG9ucykge1xuICAgICAgICAgICAgZEIuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuXG4gICAgICAgICAgbGV0IGRheSA9IGVsZW0uZGF0YXNldC5zY2hlZHVsZURheSBcblxuICAgICAgICAgIGZvcih2YXIgY2FsZW5kYXIgb2YgU2NoZWR1bGUuY2FsZW5kYXJzKSB7XG5cbiAgICAgICAgICAgIGlmKGNhbGVuZGFyLmRhdGFzZXQuc2NoZWR1bGVEYXkgPT0gZGF5KVxuICAgICAgICAgICAgICBjYWxlbmRhci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAgY2FsZW5kYXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBTY2hlZHVsZS5jaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQoKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tUb1NlZUlmTmF2QXJyb3dzTmVlZGVkIDogKCkgPT4geyBcblxuICAgICAgICAgIGZvcih2YXIgY2FsZW5kYXIgb2YgU2NoZWR1bGUuY2FsZW5kYXJzKSB7XG5cbiAgICAgICAgICAgIGlmKCFjYWxlbmRhci5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpKSB7XG5cbiAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrcyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5zY2hlZHVsZUNhbGVuZGFyVHJhY2tzJylcblxuICAgICAgICAgICAgICAgaWYodHJhY2tzLnNjcm9sbFdpZHRoID4gY2FsZW5kYXIuc2Nyb2xsV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5KUy0tc2NoZWR1bGVMZWZ0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5KUy0tc2NoZWR1bGVSaWdodCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZUxlZnQnKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZVJpZ2h0JykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gU2NoZWR1bGVcblxufSgpKVxuXG4iXX0=
