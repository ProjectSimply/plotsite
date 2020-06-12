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
    phrases: ['multi-day', 'rock', 'summer', 'classical', 'winter'],
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
        }, 700); // If we reach the end of the themes, reset to first theme

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
    previousTheme: 'deep',
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
      Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove);
    },
    createListeners: function createListeners() {
      var homeBanner = document.querySelector('.homeBanner'); // Observe the homebanner section for class changes

      var observer = new MutationObserver(Home.bannerMutation);
      observer.observe(homeBanner, {
        attributes: true
      });
      var burgerMenuTriggers = document.querySelector('.JS--menuTrigger'); // Toggle banner animation when menu opened/closed

      burgerMenuTriggers.addEventListener('click', Home.toggleThemeCounter);
      Home.dom.homeBanner.addEventListener('mousemove', function (e) {
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
      });
    },
    bannerMutation: function bannerMutation(mutationsList, observer) {
      // If the banner element is in view
      if (mutationsList[0].target.classList.contains('plotSmoothScrollInView') && !Home.bannerInView) {
        Home.bannerInView = true;
        Home.startThemeCounter();
      }

      if (!mutationsList[0].target.classList.contains('plotSmoothScrollInView') && Home.bannerInView) {
        Home.bannerInView = false;
        Home.stopThemeCounter();
        Home.removeTheme();
      }
    },
    startThemeCounter: function startThemeCounter() {
      Home.bannerInView = true; // Set header to default style

      if (Home.dom.header.classList.contains('defaultHeader')) Home.dom.header.classList.remove('defaultHeader');
      var i = 0;
      Home.counter = setInterval(function () {
        // Update mobile screen image
        Home.dom.body.dataset.currentTheme = Home.themes[i];
        Home.dom.body.dataset.previousTheme = Home.previousTheme; // Update state

        Home.previousTheme = Home.themes[i];
        Home.dom.body.classList.add('slideMobileScreen');
        setTimeout(function () {
          Home.dom.body.classList.remove('slideMobileScreen');
        }, 500); // If we reach the end of the themes, reset to first theme

        i >= Home.themes.length - 1 ? i = 0 : i++;
      }, Home.intervalLength);
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
      Home.dom.phone.style.transform = "rotateX(".concat(10 + yShift * 10, "deg) rotateY(").concat(xShift * 60, "deg)");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2JvZHktc2Nyb2xsLWxvY2svbGliL2JvZHlTY3JvbGxMb2NrLm1pbi5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvZmFxcy5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvbGF6eWxvYWQuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL21vZGFscy5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvcGxvdC1zbW9vdGgtc2Nyb2xsLmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90LmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9zeW5jc2Nyb2xsLmpzIiwibm9kZV9tb2R1bGVzL2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9ldi1lbWl0dGVyL2V2LWVtaXR0ZXIuanMiLCJub2RlX21vZHVsZXMvZml6enktdWktdXRpbHMvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHktaW1hZ2VzbG9hZGVkL2ZsaWNraXR5LWltYWdlc2xvYWRlZC5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9hZGQtcmVtb3ZlLWNlbGwuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvYW5pbWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9jZWxsLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2RyYWcuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvZmxpY2tpdHkuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvbGF6eWxvYWQuanMiLCJub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvcGFnZS1kb3RzLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL3BsYXllci5qcyIsIm5vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9wcmV2LW5leHQtYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL3NsaWRlLmpzIiwibm9kZV9tb2R1bGVzL2dldC1zaXplL2dldC1zaXplLmpzIiwibm9kZV9tb2R1bGVzL2ltYWdlc2xvYWRlZC9pbWFnZXNsb2FkZWQuanMiLCJub2RlX21vZHVsZXMvdW5pZHJhZ2dlci91bmlkcmFnZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3VuaXBvaW50ZXIvdW5pcG9pbnRlci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvcm9sbGVyLXRleHQuanMiLCJzcmMvanMvY29tcG9uZW50cy90b2dnbGUtcHJpY2UuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYWdlcy9hcnRpc3RzLmpzIiwic3JjL2pzL3BhZ2VzL2hvbWUuanMiLCJzcmMvanMvcGFnZXMvbmV3cy5qcyIsInNyYy9qcy9wYWdlcy9zY2hlZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7Ozs7QUNEQyxhQUFZO0FBRVQsTUFBSSxJQUFKO0FBRUEsRUFBQSxJQUFJLEdBQUc7QUFDSCxJQUFBLFFBQVEsRUFBRSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FEUDtBQUdILElBQUEsSUFBSSxFQUFFLGdCQUFNO0FBRVIsVUFBRyxDQUFDLElBQUksQ0FBQyxRQUFULEVBQ0k7QUFFSixNQUFBLElBQUksQ0FBQyxRQUFMLENBQWMsT0FBZCxDQUFzQixVQUFBLE9BQU87QUFBQSxlQUFJLElBQUksQ0FBQyxtQkFBTCxDQUF5QixPQUF6QixDQUFKO0FBQUEsT0FBN0I7QUFFSCxLQVZFO0FBWUgsSUFBQSxtQkFBbUIsRUFBRSw2QkFBQyxPQUFELEVBQWE7QUFFOUIsVUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGdCQUFSLENBQXlCLE1BQXpCLENBQVg7QUFFQSxNQUFBLElBQUksQ0FBQyxPQUFMLENBQWEsVUFBQSxHQUFHLEVB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LENBcElBLEdBQUQ7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2o2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3U0MsYUFBWTtBQUVULE1BQUksUUFBUSxHQUFVLE9BQU8sQ0FBQyxVQUFELENBQTdCO0FBQUEsTUFDQSxRQUFRLEdBQVksT0FBTyxDQUFDLHVDQUFELENBRDNCO0FBQUEsTUFFQSxTQUZBOztBQUlBLEVBQUEsT0FBTyxDQUFDLHVCQUFELENBQVA7O0FBRUEsRUFBQSxTQUFTLEdBQUc7QUFFUixJQUFBLElBQUksRUFBRSxnQkFBTTtBQUVSLE1BQUEsU0FBUyxDQUFDLGtCQUFWO0FBRUgsS0FOTztBQVFSLElBQUEsa0JBQWtCLEVBQUksOEJBQU07QUFFeEIsVUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLGVBQTFCLENBQWhCO0FBRUEsTUFBQSxTQUFTLENBQUMsT0FBVixDQUFrQixVQUFBLFFBQVEsRUFBSTtBQUUxQixZQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsMEJBQTFCLENBQWI7O0FBRUEsWUFBRyxNQUFNLENBQUMsTUFBUCxHQUFnQixDQUFuQixFQUFzQjtBQUVsQixjQUFJLEtBQUssR0FBRyxJQUFJLFFBQUosQ0FBYSxRQUFiLEVBQXVCO0FBQy9CLFlBQUEsU0FBUyxFQUFLLFFBRGlCO0FBRS9CLFlBQUEsVUFBVSxFQUFJLElBRmlCO0FBRy9CLFlBQUEsUUFBUSxFQUFNLEtBSGlCO0FBSS9CLFlBQUEsWUFBWSxFQUFFLElBSmlCO0FBSy9CLFlBQUEsUUFBUSxFQUFNLEtBTGlCO0FBTS9CLFlBQUEsZUFBZSxFQUFFLEtBTmM7QUFPL0IsWUFBQSxRQUFRLEVBQUU7QUFQcUIsV0FBdkIsQ0FBWjtBQVNIOztBQUVELFFBQUEsUUFBUSxDQUFDLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsc0JBQTFCO0FBRUgsT0FuQkQ7QUFzQkg7QUFsQ08sR0FBWjtBQXNDQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQWpCO0FBRUgsQ0FoREEsR0FBRDs7Ozs7QUNBQyxhQUFZO0FBRVQsTUFBSSxVQUFKO0FBRUEsRUFBQSxVQUFVLEdBQUc7QUFDVCxJQUFBLE9BQU8sRUFBRSxDQUNMLFdBREssRUFFTCxNQUZLLEVBR0wsUUFISyxFQUlMLFdBSkssRUFLTCxRQUxLLENBREE7QUFRVCxJQUFBLEdBQUcsRUFBRTtBQUNELE1BQUEsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLENBRFQ7QUFFRCxNQUFBLE9BQU8sRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixxQkFBdkIsQ0FGUjtBQUdELE1BQUEsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QjtBQUhMLEtBUkk7QUFhVCxJQUFBLGNBQWMsRUFBWSxJQWJqQjtBQWNULElBQUEsVUFBVSxFQUFZLFFBZGI7QUFlVCxJQUFBLE9BQU8sRUFBbUIsSUFmakI7QUFnQlQsSUFBQSxNQUFNLEVBQW9CLEtBaEJqQjtBQWtCVCxJQUFBLElBQUksRUFBRSxnQkFBTTtBQUdSLFVBQUcsVUFBVSxDQUFDLEdBQVgsQ0FBZSxRQUFsQixFQUNJLFVBQVUsQ0FBQyxZQUFYO0FBRVAsS0F4QlE7QUEwQlQsSUFBQSxZQUFZLEVBQUUsd0JBQU07QUFFaEIsTUFBQSxVQUFVLENBQUMsUUFBWCxDQUFvQixVQUFVLENBQUMsR0FBWCxDQUFlLE9BQW5DO0FBRUEsVUFBSSxDQUFDLEdBQUcsQ0FBUjtBQUNBLE1BQUEsVUFBVSxDQUFDLE9BQVgsR0FBcUIsV0FBVyxDQUFDLFlBQU07QUFFbkMsWUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBdEI7QUFDQSxZQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBWCxDQUFtQixDQUFDLEdBQUcsQ0FBdkIsSUFBNEIsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsQ0FBQyxHQUFHLENBQXZCLENBQTVCLEdBQXdELFVBQVUsQ0FBQyxPQUFYLENBQW1CLENBQW5CLENBQTNFO0FBRUEsUUFBQSxVQUFVLENBQUMsR0FBWCxDQUFlLFFBQWYsQ0FBd0IsU0FBeEIsQ0FBa0MsR0FBbEMsQ0FBc0MsTUFBdEM7QUFFQSxRQUFBLFVBQVUsQ0FBQyxRQUFYLENBQW9CLFVBQVUsQ0FBQyxHQUFYLENBQWUsSUFBbkM7QUFFQSxRQUFBLFVBQVUsQ0FBQyxZQUFNO0FBRWIsVUFBQSxVQUFVLENBQUMsR0FBWCxDQUFlLFFBQWYsQ0FBd0IsU0FBeEIsQ0FBa0MsTUFBbEMsQ0FBeUMsTUFBekMsRUFGYSxDQUliOztBQUNBLFVBQUEsVUFBVSxDQUFDLEdBQVgsQ0FBZSxPQUFmLENBQXVCLFdBQXZCLEdBQXFDLGFBQXJDO0FBQ0EsVUFBQSxVQUFVLENBQUMsR0FBWCxDQUFlLElBQWYsQ0FBb0IsV0FBcEIsR0FBa0MsVUFBbEM7QUFFSCxTQVJTLEVBUVAsR0FSTyxDQUFWLENBVG1DLENBb0JuQzs7QUFDQSxRQUFBLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBWCxDQUFtQixNQUFuQixHQUE0QixDQUFqQyxHQUFxQyxDQUFDLEdBQUcsQ0FBekMsR0FBNkMsQ0FBQyxFQUE5QztBQUVILE9BdkIrQixFQXVCN0IsVUFBVSxDQUFDLGNBdkJrQixDQUFoQztBQXdCSCxLQXZEUTtBQXlEVCxJQUFBLFFBQVEsRUFBRSxrQkFBQyxPQUFELEVBQWE7QUFDbkIsVUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHFCQUFSLEdBQWdDLEtBQWhEO0FBRUEsTUFBQSxVQUFVLENBQUMsR0FBWCxDQUFlLFFBQWYsQ0FBd0IsS0FBeEIsQ0FBOEIsS0FBOUIsYUFBeUMsU0FBekM7QUFDSDtBQTdEUSxHQUFiO0FBaUVBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsVUFBakI7QUFFSCxDQXZFQSxHQUFEOzs7OztBQ0FDLGFBQVk7QUFFVCxNQUFJLFdBQUo7QUFFQSxFQUFBLFdBQVcsR0FBRztBQUNWLElBQUEsR0FBRyxFQUFFO0FBQ0QsTUFBQSxTQUFTLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLENBRFY7QUFFRCxNQUFBLFlBQVksRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1Qix5QkFBdkIsQ0FGYjtBQUdELE1BQUEsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLDBCQUF2QjtBQUhkLEtBREs7QUFPVixJQUFBLElBQUksRUFBRSxnQkFBTTtBQUVSO0FBQ0EsTUFBQSxXQUFXLENBQUMsR0FBWixDQUFnQixZQUFoQixDQUE2QixnQkFBN0IsQ0FBOEMsT0FBOUMsRUFBdUQsV0FBVyxDQUFDLFVBQW5FO0FBQ0EsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFdBQVcsQ0FBQyxHQUF4QjtBQUNBLE1BQUEsV0FBVyxDQUFDLEdBQVosQ0FBZ0IsYUFBaEIsQ0FBOEIsZ0JBQTlCLENBQStDLE9BQS9DLEVBQXdELFdBQVcsQ0FBQyxXQUFwRTtBQUVILEtBZFM7QUFnQlYsSUFBQSxVQUFVLEVBQUUsc0JBQU07QUFFZCxVQUFHLFdBQVcsQ0FBQyxHQUFaLENBQWdCLFNBQWhCLENBQTBCLE9BQTFCLENBQWtDLElBQWxDLEdBQXlDLFFBQTVDLEVBQ0k7QUFFSixNQUFBLFdBQVcsQ0FBQyxHQUFaLENBQWdCLFNBQWhCLENBQTBCLE9BQTFCLENBQWtDLElBQWxDLEdBQXlDLFFBQXpDO0FBQ0gsS0F0QlM7QUF3QlYsSUFBQSxXQUFXLEVBQUUsdUJBQU07QUFDZixVQUFHLFdBQVcsQ0FBQyxHQUFaLENBQWdCLFNBQWhCLENBQTBCLE9BQTFCLENBQWtDLElBQWxDLEdBQXlDLFNBQTVDLEVBQ0E7QUFFSixNQUFBLFdBQVcsQ0FBQyxHQUFaLENBQWdCLFNBQWhCLENBQTBCLE9BQTFCLENBQWtDLElBQWxDLEdBQXlDLFNBQXpDO0FBQ0M7QUE3QlMsR0FBZDtBQWtDQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFdBQWpCO0FBRUgsQ0F4Q0EsR0FBRDs7Ozs7QUNBQyxhQUFXO0FBRVI7O0FBRUgsTUFBSSxJQUFJLEdBQVEsT0FBTyxDQUFDLGdDQUFELENBQXZCO0FBQUEsTUFDQyxRQUFRLEdBQVEsT0FBTyxDQUFDLG9DQUFELENBRHhCO0FBQUEsTUFFQyxNQUFNLEdBQUssT0FBTyxDQUFDLGtDQUFELENBRm5CO0FBQUEsTUFHQyxTQUFTLEdBQUksT0FBTyxDQUFDLHVCQUFELENBSHJCO0FBQUEsTUFJQyxNQUFNLEdBQU0sT0FBTyxDQUFDLDhDQUFELENBSnBCO0FBQUEsTUFLQyxJQUFJLEdBQU0sT0FBTyxDQUFDLGdDQUFELENBTGxCO0FBQUEsTUFNQztBQUNBLEVBQUEsSUFBSSxHQUFLLE9BQU8sQ0FBQyxjQUFELENBUGpCO0FBQUEsTUFRQyxVQUFVLEdBQVEsT0FBTyxDQUFDLDBCQUFELENBUjFCO0FBQUEsTUFTQyxXQUFXLEdBQU8sT0FBTyxDQUFDLDJCQUFELENBVDFCO0FBQUEsTUFVQyxPQUFPLEdBQUssT0FBTyxDQUFDLGlCQUFELENBVnBCO0FBQUEsTUFXQyxRQUFRLEdBQUksT0FBTyxDQUFDLGtCQUFELENBWHBCO0FBQUEsTUFZQyxJQUFJLEdBQU0sT0FBTyxDQUFDLGNBQUQsQ0FabEI7QUFBQSxNQWFJLElBYko7O0FBZUEsRUFBQSxJQUFJLEdBQUc7QUFFTixJQUFBLElBQUksRUFBRSxnQkFBTTtBQUVYLE1BQUEsSUFBSSxDQUFDLGVBQUw7QUFFQSxNQUFBLElBQUksQ0FBQyxJQUFMO0FBQ0EsTUFBQSxRQUFRLENBQUMsSUFBVDtBQUNBLE1BQUEsTUFBTSxDQUFDLElBQVA7QUFDQSxNQUFBLFNBQVMsQ0FBQyxJQUFWO0FBQ0EsTUFBQSxJQUFJLENBQUMsSUFBTDtBQUNBLE1BQUEsVUFBVSxDQUFDLElBQVgsR0FUVyxDQVVYO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ00sVUFBRyxJQUFJLENBQUMsTUFBTCxDQUFZLE1BQVosQ0FBSCxFQUNMLElBQUksQ0FBQyxJQUFMO0FBRUssVUFBRyxJQUFJLENBQUMsTUFBTCxDQUFZLFVBQVosQ0FBSCxFQUNMLFFBQVEsQ0FBQyxJQUFUO0FBRUssVUFBRyxJQUFJLENBQUMsTUFBTCxDQUFZLFNBQVosQ0FBSCxFQUNMLE9BQU8sQ0FBQyxJQUFSO0FBRUQsVUFBRyxJQUFJLENBQUMsTUFBTCxDQUFZLFNBQVosQ0FBSCxFQUNDLFdBQVcsQ0FBQyxJQUFaO0FBRUQsTUFBQSxJQUFJLENBQUMsSUFBTDtBQUVBLE1BQUEsSUFBSSxDQUFDLGNBQUw7QUFFQSxLQWxDSztBQW9DTixJQUFBLGVBQWUsRUFBRywyQkFBTTtBQUVqQixVQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsSUFBVCxDQUFjLE9BQWQsQ0FBc0IsMEJBQTlDO0FBRUEsVUFBTSxjQUFjLEdBQUc7QUFDNUIsUUFBQSxjQUFjLEVBQUksZUFBZSxJQUFJO0FBRFQsT0FBdkI7QUFJQSxNQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksY0FBWjtBQUVBLEtBOUNEO0FBZ0RBLElBQUEsY0FBYyxFQUFHLDBCQUFNO0FBRTVCLFVBQUksbUJBQW1CLEdBQUksUUFBUSxDQUFDLGFBQVQsQ0FBdUIsK0JBQXZCLENBQTNCO0FBR0EsVUFBRyxtQkFBSCxFQUVDLG1CQUFtQixDQUFDLGdCQUFwQixDQUFxQyxPQUFyQyxFQUE4QyxVQUFBLENBQUMsRUFBSTtBQUVsRDtBQUNBO0FBQ0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUgsWUFBTSxJQUFJLEdBQUc7QUFFWixVQUFBLFlBQVksRUFBRyxvQkFGSDtBQUdaLFVBQUEsSUFBSSxFQUFHO0FBQ04sbUJBQVUsS0FESjtBQUVOLHVCQUFZLE1BRk47QUFHTixzQkFBVztBQUhMO0FBSEssU0FBYjtBQVdBLFFBQUEsSUFBSSxDQUFDLGdCQUFMLENBQXNCLElBQXRCO0FBRUEsT0F4QkQ7QUEwQks7QUFqRkQsR0FBUDtBQXFGQSxFQUFBLE1BQU0sQ0FBQyxJQUFQLEdBQWMsSUFBZDtBQUVBLENBMUdBLEdBQUQ7Ozs7O0FDQUMsYUFBWTtBQUVULE1BQUksSUFBSSxHQUFNLE9BQU8sQ0FBQyxtQ0FBRCxDQUFyQjtBQUFBLE1BQ0ksTUFBTSxHQUFZLE9BQU8sQ0FBQyxxQ0FBRCxDQUQ3QjtBQUFBLE1BRUMsT0FGRCxDQUZTLENBTVQ7QUFDQTs7O0FBQ0EsRUFBQSxPQUFPLEdBQUc7QUFFVCxJQUFBLFFBQVEsRUFBTSxDQUZMO0FBR1QsSUFBQSxXQUFXLEVBQUssQ0FIUDtBQUlULElBQUEsaUJBQWlCLEVBQUcsS0FKWDtBQUtULElBQUEsY0FBYyxFQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLHNCQUF2QixDQUxWO0FBT04sSUFBQSxJQUFJLEVBQUUsZ0JBQU07QUFFWCxNQUFBLE9BQU8sQ0FBQyx3QkFBUjtBQUVHLE1BQUEsT0FBTyxDQUFDLGVBQVI7QUFFSCxLQWJLO0FBZU4sSUFBQSxlQUFlLEVBQUUsMkJBQU07QUFFdEIsTUFBQSxPQUFPLENBQUMsY0FBUixDQUF1QixnQkFBdkIsQ0FBd0MsT0FBeEMsRUFBaUQsVUFBQSxDQUFDLEVBQUk7QUFFckQsWUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFSLENBQXVCLE9BQXZCLENBQStCLFFBQWhDLENBQXpCO0FBRUEsUUFBQSxPQUFPLENBQUMsV0FBUixHQUFzQixRQUF0QjtBQUVBLFFBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsSUFBcEI7QUFFQSxRQUFBLE9BQU8sQ0FBQyxjQUFSLENBQXVCLE9BQXZCLENBQStCLFFBQS9CLEdBQTBDLFFBQVEsR0FBRyxDQUFyRDtBQUVBLE9BVkQ7QUFZQSxNQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxVQUFBLENBQUMsRUFBSTtBQUVqQztBQUNaLFlBQUksQ0FBQyxDQUFDLE1BQUYsQ0FBUyxPQUFULENBQWlCLHVCQUFqQixDQUFKLEVBQStDO0FBQzlDLFVBQUEsT0FBTyxDQUFDLGlCQUFSLEdBQTRCLENBQUMsQ0FBQyxNQUFGLENBQVMsT0FBVCxDQUFpQixZQUE3QztBQUNBLFVBQUEsT0FBTyxDQUFDLFdBQVIsR0FBc0IsQ0FBdEI7QUFDZSxVQUFBLE9BQU8sQ0FBQyxjQUFSLENBQXVCLE9BQXZCLENBQStCLFFBQS9CLEdBQTBDLENBQTFDO0FBQ2YsVUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixLQUFwQixFQUEyQixJQUEzQixDQUFnQyxZQUFNO0FBRW5CLFlBQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLHVCQUExQixFQUFtRCxPQUFuRCxDQUEyRCxVQUFBLGdCQUFnQixFQUFJO0FBRTNFLGNBQUEsZ0JBQWdCLENBQUMsU0FBakIsQ0FBMkIsTUFBM0IsQ0FBa0MsVUFBbEM7QUFFSCxhQUpEO0FBTUEsWUFBQSxDQUFDLENBQUMsTUFBRixDQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsVUFBdkI7QUFFSCxXQVZoQjtBQVdBO0FBRUQsT0FwQkssRUFvQkgsS0FwQkc7QUF1QkEsS0FwREs7QUFzRE4sSUFBQSxXQUFXLEVBQUcscUJBQUEsTUFBTSxFQUFJO0FBRXZCLFVBQU0sSUFBSSxHQUFHO0FBQ2xCLFFBQUEsWUFBWSxFQUFHLHNCQURHO0FBRWxCLFFBQUEsSUFBSSxFQUFHO0FBQ04sa0JBQVksT0FBTyxDQUFDLFdBRGQ7QUFFTix3QkFBZSxPQUFPLENBQUM7QUFGakIsU0FGVztBQU1sQixRQUFBLE1BQU0sRUFBRztBQU5TLE9BQWI7QUFTTixhQUFPLElBQUksQ0FBQyxnQkFBTCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixDQUFpQyxVQUFBLElBQUksRUFBSTtBQUUvQyxRQUFBLE9BQU8sQ0FBQyx3QkFBUjtBQUVZLGVBQU8sSUFBUDtBQUVaLE9BTk0sQ0FBUDtBQVFNLEtBekVLO0FBMkVOLElBQUEsd0JBQXdCLEVBQUcsb0NBQU07QUFFaEM7QUFDQTtBQUNBLE1BQUEsT0FBTyxDQUFDLFFBQVIsR0FBbUIsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsT0FBeEMsQ0FBZ0QsUUFBbkU7QUFFQSxVQUFHLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLE9BQU8sQ0FBQyxXQUE5QixFQUNDLE9BQU8sQ0FBQyxjQUFSLENBQXVCLFNBQXZCLENBQWlDLE1BQWpDLENBQXdDLFFBQXhDLEVBREQsS0FHQyxPQUFPLENBQUMsY0FBUixDQUF1QixTQUF2QixDQUFpQyxHQUFqQyxDQUFxQyxRQUFyQztBQUVEO0FBdEZLLEdBQVY7QUEwRkEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixPQUFqQjtBQUVILENBcEdBLEdBQUQ7Ozs7O0FDQUMsYUFBWTtBQUVULE1BQUksSUFBSjtBQUVBLEVBQUEsSUFBSSxHQUFHO0FBQ0gsSUFBQSxHQUFHLEVBQUc7QUFDRixNQUFBLElBQUksRUFBc0IsUUFBUSxDQUFDLElBRGpDO0FBRUYsTUFBQSxJQUFJLEVBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCLENBRnhCO0FBR0YsTUFBQSxLQUFLLEVBQXFCLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixDQUh4QjtBQUlGLE1BQUEsVUFBVSxFQUFnQixRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixDQUp4QjtBQUtGLE1BQUEsTUFBTSxFQUFvQixRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsQ0FMeEI7QUFNRixNQUFBLFlBQVksRUFBVTtBQUNsQixXQUFJLFFBQVEsQ0FBQyxhQUFULENBQXVCLGlCQUF2QixDQURjO0FBRWxCLFdBQUksUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLENBRmM7QUFHbEIsV0FBSSxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsQ0FIYztBQUlsQixXQUFJLFFBQVEsQ0FBQyxhQUFULENBQXVCLGlCQUF2QixDQUpjO0FBS2xCLFdBQUksUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLENBTGM7QUFNbEIsV0FBSSxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkI7QUFOYztBQU5wQixLQURIO0FBZ0JILElBQUEsY0FBYyxFQUFZLElBaEJ2QjtBQWlCSCxJQUFBLGFBQWEsRUFBYSxNQWpCdkI7QUFrQkgsSUFBQSxPQUFPLEVBQW1CLElBbEJ2QjtBQW1CSCxJQUFBLE1BQU0sRUFBb0IsS0FuQnZCO0FBb0JILElBQUEsb0JBQW9CLEVBQU07QUFDdEIsTUFBQSxDQUFDLEVBQUUsTUFBTSxDQUFDLFVBQVAsR0FBb0IsQ0FERDtBQUV0QixNQUFBLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBUCxHQUFxQjtBQUZGLEtBcEJ2QjtBQXdCSCxJQUFBLHFCQUFxQixFQUFLO0FBQ3RCLE1BQUEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLENBREQ7QUFFdEIsTUFBQSxDQUFDLEVBQUUsTUFBTSxDQUFDLFdBQVAsR0FBcUI7QUFGRixLQXhCdkI7QUE0QkgsSUFBQSx1QkFBdUIsRUFBRyxJQTVCdkI7QUE2QkgsSUFBQSxNQUFNLEVBQUUsQ0FDSixRQURJLEVBRUosT0FGSSxFQUdKLFFBSEksRUFJSixLQUpJLEVBS0osT0FMSSxFQU1KLFVBTkksRUFPSixNQVBJLEVBUUosTUFSSSxDQTdCTDtBQXlDSCxJQUFBLElBQUksRUFBRSxnQkFBTTtBQUVSLE1BQUEsSUFBSSxDQUFDLGVBQUw7QUFFQSxNQUFBLElBQUksQ0FBQyxpQkFBTDtBQUVBLE1BQUEsSUFBSSxDQUFDLHVCQUFMLEdBQStCLHFCQUFxQixDQUFDLElBQUksQ0FBQyxZQUFOLENBQXBEO0FBRUgsS0FqREU7QUFtREgsSUFBQSxlQUFlLEVBQUUsMkJBQU07QUFFbkIsVUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbkIsQ0FGbUIsQ0FJbkI7O0FBQ0EsVUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBSixDQUFxQixJQUFJLENBQUMsY0FBMUIsQ0FBakI7QUFDQSxNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLFVBQWpCLEVBQTZCO0FBQzNCLFFBQUEsVUFBVSxFQUFJO0FBRGEsT0FBN0I7QUFJQSxVQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixDQUEzQixDQVZtQixDQVluQjs7QUFDQSxNQUFBLGtCQUFrQixDQUFDLGdCQUFuQixDQUFvQyxPQUFwQyxFQUE2QyxJQUFJLENBQUMsa0JBQWxEO0FBR0EsTUFBQSxJQUFJLENBQUMsR0FBTCxDQUFTLFVBQVQsQ0FBb0IsZ0JBQXBCLENBQXFDLFdBQXJDLEVBQWtELFVBQUEsQ0FBQyxFQUFJO0FBRW5ELFFBQUEsSUFBSSxDQUFDLG9CQUFMLEdBQTRCO0FBQ3hCLFVBQUEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQURtQjtBQUV4QixVQUFBLENBQUMsRUFBRSxDQUFDLENBQUM7QUFGbUIsU0FBNUI7QUFLQSxZQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsVUFBUCxHQUFvQixDQUF6QztBQUNBLFlBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLENBQTFDO0FBRUEsWUFBRyxJQUFJLENBQUMsb0JBQUwsQ0FBMEIsQ0FBMUIsR0FBK0IsSUFBL0IsR0FBc0MsWUFBekMsRUFDSSxJQUFJLENBQUMsb0JBQUwsQ0FBMEIsQ0FBMUIsR0FBOEIsWUFBWSxHQUFHLElBQTdDO0FBRUosWUFBRyxJQUFJLENBQUMsb0JBQUwsQ0FBMEIsQ0FBMUIsR0FBK0IsSUFBL0IsR0FBc0MsWUFBekMsRUFDSSxJQUFJLENBQUMsb0JBQUwsQ0FBMEIsQ0FBMUIsR0FBOEIsWUFBWSxHQUFHLElBQTdDO0FBRUosWUFBRyxJQUFJLENBQUMsb0JBQUwsQ0FBMEIsQ0FBMUIsR0FBK0IsSUFBL0IsR0FBc0MsWUFBekMsRUFDSSxJQUFJLENBQUMsb0JBQUwsQ0FBMEIsQ0FBMUIsR0FBOEIsWUFBWSxHQUFHLElBQTdDO0FBRUosWUFBRyxJQUFJLENBQUMsb0JBQUwsQ0FBMEIsQ0FBMUIsR0FBK0IsSUFBL0IsR0FBc0MsWUFBekMsRUFDSSxJQUFJLENBQUMsb0JBQUwsQ0FBMEIsQ0FBMUIsR0FBOEIsWUFBWSxHQUFHLElBQTdDOztBQUVKLFlBQUcsSUFBSSxDQUFDLE1BQUwsSUFBZSxLQUFsQixFQUF5QjtBQUNyQixVQUFBLElBQUksQ0FBQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFVBQUEsSUFBSSxDQUFDLHVCQUFMLEdBQStCLHFCQUFxQixDQUFDLElBQUksQ0FBQyxZQUFOLENBQXBEO0FBQ0g7QUFFSixPQTNCRDtBQTZCSCxLQWhHRTtBQWtHSCxJQUFBLGNBQWMsRUFBRSx3QkFBQyxhQUFELEVBQWdCLFFBQWhCLEVBQTZCO0FBRXpDO0FBQ0EsVUFBRyxhQUFhLENBQUMsQ0FBRCxDQUFiLENBQWlCLE1BQWpCLENBQXdCLFNBQXhCLENBQWtDLFFBQWxDLENBQTJDLHdCQUEzQyxLQUF3RSxDQUFDLElBQUksQ0FBQyxZQUFqRixFQUErRjtBQUUzRixRQUFBLElBQUksQ0FBQyxZQUFMLEdBQW9CLElBQXBCO0FBRUEsUUFBQSxJQUFJLENBQUMsaUJBQUw7QUFFSDs7QUFFRCxVQUFHLENBQUMsYUFBYSxDQUFDLENBQUQsQ0FBYixDQUFpQixNQUFqQixDQUF3QixTQUF4QixDQUFrQyxRQUFsQyxDQUEyQyx3QkFBM0MsQ0FBRCxJQUF5RSxJQUFJLENBQUMsWUFBakYsRUFBK0Y7QUFFM0YsUUFBQSxJQUFJLENBQUMsWUFBTCxHQUFvQixLQUFwQjtBQUVBLFFBQUEsSUFBSSxDQUFDLGdCQUFMO0FBRUEsUUFBQSxJQUFJLENBQUMsV0FBTDtBQUNIO0FBQ0osS0FySEU7QUF1SEgsSUFBQSxpQkFBaUIsRUFBRSw2QkFBTTtBQUVyQixNQUFBLElBQUksQ0FBQyxZQUFMLEdBQW9CLElBQXBCLENBRnFCLENBSXJCOztBQUNBLFVBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxNQUFULENBQWdCLFNBQWhCLENBQTBCLFFBQTFCLENBQW1DLGVBQW5DLENBQUgsRUFDSSxJQUFJLENBQUMsR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsU0FBaEIsQ0FBMEIsTUFBMUIsQ0FBaUMsZUFBakM7QUFHSixVQUFJLENBQUMsR0FBRyxDQUFSO0FBQ0EsTUFBQSxJQUFJLENBQUMsT0FBTCxHQUFlLFdBQVcsQ0FBQyxZQUFNO0FBRTdCO0FBQ0EsUUFBQSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQVQsQ0FBYyxPQUFkLENBQXNCLFlBQXRCLEdBQXFDLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBWixDQUFyQztBQUNBLFFBQUEsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFULENBQWMsT0FBZCxDQUFzQixhQUF0QixHQUFzQyxJQUFJLENBQUMsYUFBM0MsQ0FKNkIsQ0FNN0I7O0FBQ0EsUUFBQSxJQUFJLENBQUMsYUFBTCxHQUFxQixJQUFJLENBQUMsTUFBTCxDQUFZLENBQVosQ0FBckI7QUFFQSxRQUFBLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBVCxDQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsbUJBQTVCO0FBRUEsUUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFVBQUEsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFULENBQWMsU0FBZCxDQUF3QixNQUF4QixDQUErQixtQkFBL0I7QUFDSCxTQUZTLEVBRVAsR0FGTyxDQUFWLENBWDZCLENBZTdCOztBQUNBLFFBQUEsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFMLENBQVksTUFBWixHQUFxQixDQUExQixHQUE4QixDQUFDLEdBQUcsQ0FBbEMsR0FBc0MsQ0FBQyxFQUF2QztBQUVILE9BbEJ5QixFQWtCdkIsSUFBSSxDQUFDLGNBbEJrQixDQUExQjtBQW1CSCxLQXBKRTtBQXNKSCxJQUFBLGdCQUFnQixFQUFFLDRCQUFNO0FBRXBCLFVBQUcsSUFBSSxDQUFDLE9BQVIsRUFDSSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU4sQ0FBYjtBQUVQLEtBM0pFO0FBNkpILElBQUEsV0FBVyxFQUFFLHVCQUFNO0FBRWYsVUFBRyxJQUFJLENBQUMsYUFBUixFQUNJLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBVCxDQUFjLFNBQWQsQ0FBd0IsTUFBeEIsQ0FBK0IsSUFBSSxDQUFDLGFBQXBDO0FBRUosTUFBQSxJQUFJLENBQUMsYUFBTCxHQUFxQixFQUFyQixDQUxlLENBT2Y7O0FBQ0EsTUFBQSxJQUFJLENBQUMsR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEIsZUFBOUI7QUFFSCxLQXZLRTtBQXlLSCxJQUFBLGtCQUFrQixFQUFFLDhCQUFNO0FBQ3RCO0FBQ0EsVUFBRyxJQUFJLENBQUMsR0FBTCxDQUFTLElBQVQsQ0FBYyxTQUFkLENBQXdCLFFBQXhCLENBQWlDLFlBQWpDLENBQUgsRUFBbUQ7QUFFL0MsUUFBQSxJQUFJLENBQUMsZ0JBQUw7QUFDQSxRQUFBLElBQUksQ0FBQyxXQUFMLEdBSCtDLENBS25EO0FBQ0MsT0FORCxNQU1PLElBQUcsSUFBSSxDQUFDLFlBQVIsRUFBc0I7QUFFekIsUUFBQSxJQUFJLENBQUMsaUJBQUw7QUFDSDtBQUNKLEtBckxFO0FBdUxILElBQUEsWUFBWSxFQUFHLHdCQUFNO0FBR2pCLFVBQU0scUJBQXFCLEdBQUc7QUFDMUIsUUFBQSxDQUFDLEVBQUUsSUFBSSxDQUFDLG9CQUFMLENBQTBCLENBQTFCLEdBQThCLElBQUksQ0FBQyxxQkFBTCxDQUEyQixDQURsQztBQUUxQixRQUFBLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQUwsQ0FBMEIsQ0FBMUIsR0FBOEIsSUFBSSxDQUFDLHFCQUFMLENBQTJCO0FBRmxDLE9BQTlCO0FBS0EsTUFBQSxJQUFJLENBQUMscUJBQUwsR0FBNkI7QUFDekIsUUFBQSxDQUFDLEVBQUUsSUFBSSxDQUFDLHFCQUFMLENBQTJCLENBQTNCLEdBQWdDLHFCQUFxQixDQUFDLENBQXRCLEdBQTBCLEdBRHBDO0FBRXpCLFFBQUEsQ0FBQyxFQUFFLElBQUksQ0FBQyxxQkFBTCxDQUEyQixDQUEzQixHQUFnQyxxQkFBcUIsQ0FBQyxDQUF0QixHQUEwQjtBQUZwQyxPQUE3QjtBQUtBLFVBQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFMLENBQTJCLENBQTNCLEdBQWdDLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLENBQXJELEtBQTRELE1BQU0sQ0FBQyxVQUFQLEdBQW9CLENBQWhGLENBQWY7QUFDQSxVQUFNLE1BQU0sR0FBRyxDQUFFLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLENBQXRCLEdBQTJCLElBQUksQ0FBQyxxQkFBTCxDQUEyQixDQUF2RCxLQUE2RCxNQUFNLENBQUMsV0FBUCxHQUFxQixDQUFsRixDQUFmO0FBRUEsTUFBQSxJQUFJLENBQUMsR0FBTCxDQUFTLEtBQVQsQ0FBZSxLQUFmLENBQXFCLFNBQXJCLHFCQUE0QyxLQUFLLE1BQU0sR0FBQyxFQUF4RCwwQkFBMEUsTUFBTSxHQUFDLEVBQWpGO0FBRUEsVUFBTSxVQUFVLEdBQUcsRUFBbkI7QUFDQSxNQUFBLElBQUksQ0FBQyxHQUFMLENBQVMsWUFBVCxDQUFzQixDQUF0QixFQUF5QixLQUF6QixDQUErQixTQUEvQix3QkFBeUQsTUFBTSxHQUFHLFVBQVQsR0FBc0IsQ0FBL0UsNEJBQWtHLENBQUMsQ0FBRCxHQUFHLE1BQUgsR0FBVSxVQUE1RztBQUNBLE1BQUEsSUFBSSxDQUFDLEdBQUwsQ0FBUyxZQUFULENBQXNCLENBQXRCLEVBQXlCLEtBQXpCLENBQStCLFNBQS9CLHdCQUF5RCxNQUFNLEdBQUcsVUFBVCxHQUFzQixDQUEvRSw0QkFBa0csQ0FBQyxDQUFELEdBQUcsTUFBSCxHQUFVLFVBQTVHO0FBQ0EsTUFBQSxJQUFJLENBQUMsR0FBTCxDQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUIsS0FBekIsQ0FBK0IsU0FBL0Isd0JBQXlELE1BQU0sR0FBRyxVQUFULEdBQXNCLENBQS9FLDRCQUFrRyxDQUFDLENBQUQsR0FBRyxNQUFILEdBQVUsVUFBNUc7QUFDQSxNQUFBLElBQUksQ0FBQyxHQUFMLENBQVMsWUFBVCxDQUFzQixDQUF0QixFQUF5QixLQUF6QixDQUErQixTQUEvQix3QkFBeUQsTUFBTSxHQUFHLFVBQVQsR0FBc0IsQ0FBL0UsNEJBQWtHLENBQUMsQ0FBRCxHQUFHLE1BQUgsR0FBVSxVQUE1RztBQUNBLE1BQUEsSUFBSSxDQUFDLEdBQUwsQ0FBUyxZQUFULENBQXNCLENBQXRCLEVBQXlCLEtBQXpCLENBQStCLFNBQS9CLHdCQUF5RCxNQUFNLEdBQUcsVUFBVCxHQUFzQixDQUEvRSw0QkFBa0csQ0FBQyxDQUFELEdBQUcsTUFBSCxHQUFVLFVBQTVHO0FBQ0EsTUFBQSxJQUFJLENBQUMsR0FBTCxDQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUIsS0FBekIsQ0FBK0IsU0FBL0Isd0JBQXlELE1BQU0sR0FBRyxVQUFULEdBQXNCLENBQS9FLDRCQUFrRyxDQUFDLENBQUQsR0FBRyxNQUFILEdBQVUsVUFBNUc7QUFFQSxVQUFHLElBQUksQ0FBQyxHQUFMLENBQVMscUJBQXFCLENBQUMsQ0FBdEIsR0FBMEIscUJBQXFCLENBQUMsQ0FBekQsSUFBOEQsRUFBakUsRUFDSSxJQUFJLENBQUMsTUFBTCxHQUFjLEtBQWQ7QUFFSixVQUFHLElBQUksQ0FBQyxNQUFMLElBQWUsSUFBbEIsRUFDSSxJQUFJLENBQUMsdUJBQUwsR0FBK0IscUJBQXFCLENBQUMsSUFBSSxDQUFDLFlBQU4sQ0FBcEQ7QUFFUDtBQXZORSxHQUFQO0FBNE5BLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsSUFBakI7QUFFSCxDQWxPQSxHQUFEOzs7OztBQ0FDLGFBQVk7QUFFVCxNQUFJLElBQUksR0FBTSxPQUFPLENBQUMsbUNBQUQsQ0FBckI7QUFBQSxNQUNDLElBREQsQ0FGUyxDQUtUO0FBQ0E7OztBQUNBLEVBQUEsSUFBSSxHQUFHO0FBRU4sSUFBQSxRQUFRLEVBQU0sQ0FGUjtBQUdILElBQUEsbUJBQW1CLEVBQUcsQ0FIbkI7QUFJSCxJQUFBLFdBQVcsRUFBVyxDQUpuQjtBQUtOLElBQUEsY0FBYyxFQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixDQUxiO0FBT0gsSUFBQSxJQUFJLEVBQUUsZ0JBQU07QUFFUixVQUFHLElBQUksQ0FBQyxjQUFSLEVBQXdCO0FBRXZCLFFBQUEsSUFBSSxDQUFDLHdCQUFMO0FBRUcsUUFBQSxJQUFJLENBQUMsZUFBTDtBQUVIO0FBRUosS0FqQkU7QUFtQkgsSUFBQSxlQUFlLEVBQUUsMkJBQU07QUFFdEIsTUFBQSxJQUFJLENBQUMsY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsT0FBckMsRUFBOEMsVUFBQSxDQUFDLEVBQUk7QUFFbEQsWUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFMLENBQW9CLE9BQXBCLENBQTRCLFFBQTdCLENBQXpCO0FBRUEsUUFBQSxJQUFJLENBQUMsV0FBTCxHQUFtQixRQUFuQjtBQUVBLFFBQUEsSUFBSSxDQUFDLFFBQUwsQ0FBYyxJQUFkO0FBRUEsUUFBQSxJQUFJLENBQUMsY0FBTCxDQUFvQixPQUFwQixDQUE0QixRQUE1QixHQUF1QyxRQUFRLEdBQUcsQ0FBbEQ7QUFFQSxPQVZEO0FBWUEsS0FqQ0U7QUFtQ0gsSUFBQSxRQUFRLEVBQUcsa0JBQUEsTUFBTSxFQUFJO0FBRXBCLFVBQU0sSUFBSSxHQUFHO0FBQ2xCLFFBQUEsWUFBWSxFQUFHLG9CQURHO0FBRWxCLFFBQUEsSUFBSSxFQUFHO0FBQ04sa0JBQVksSUFBSSxDQUFDLFdBRFg7QUFFTix3QkFBZSxJQUFJLENBQUM7QUFGZCxTQUZXO0FBTWxCLFFBQUEsTUFBTSxFQUFHO0FBTlMsT0FBYjtBQVNOLGFBQU8sSUFBSSxDQUFDLGdCQUFMLENBQXNCLElBQXRCLEVBQTRCLElBQTVCLENBQWlDLFVBQUEsSUFBSSxFQUFJO0FBRS9DLFFBQUEsSUFBSSxDQUFDLHdCQUFMO0FBRVksZUFBTyxJQUFQO0FBRVosT0FOTSxDQUFQO0FBUU0sS0F0REU7QUF3REgsSUFBQSx3QkFBd0IsRUFBRyxvQ0FBTTtBQUVoQztBQUNBO0FBQ0EsTUFBQSxJQUFJLENBQUMsUUFBTCxHQUFnQixRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxPQUF4QyxDQUFnRCxRQUFoRTtBQUVHLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFJLENBQUMsUUFBakI7QUFFSCxVQUFHLElBQUksQ0FBQyxRQUFMLEdBQWdCLElBQUksQ0FBQyxXQUF4QixFQUNDLElBQUksQ0FBQyxjQUFMLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLFFBQXJDLEVBREQsS0FHQyxJQUFJLENBQUMsY0FBTCxDQUFvQixTQUFwQixDQUE4QixHQUE5QixDQUFrQyxRQUFsQztBQUVEO0FBckVFLEdBQVA7QUF5RUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixJQUFqQjtBQUVILENBbEZBLEdBQUQ7Ozs7O0FDQUMsYUFBWTtBQUVULE1BQUksUUFBSjtBQUVBLEVBQUEsUUFBUSxHQUFHO0FBQ1QsSUFBQSxVQUFVLEVBQVMsUUFBUSxDQUFDLGdCQUFULENBQTBCLDhCQUExQixDQURWO0FBRVQsSUFBQSxTQUFTLEVBQVUsUUFBUSxDQUFDLGdCQUFULENBQTBCLHVCQUExQixDQUZWO0FBSVAsSUFBQSxJQUFJLEVBQUUsZ0JBQU07QUFFVixNQUFBLFFBQVEsQ0FBQyxlQUFUO0FBQ0EsTUFBQSxRQUFRLENBQUMsMkJBQVQ7QUFFRCxLQVRNO0FBV1AsSUFBQSxlQUFlLEVBQUUsMkJBQU07QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFFckIsNkJBQXFCLFFBQVEsQ0FBQyxVQUE5Qiw4SEFBMEM7QUFBQSxjQUFsQyxTQUFrQztBQUV4QyxVQUFBLFNBQVMsQ0FBQyxnQkFBVixDQUEyQixPQUEzQixFQUFtQyxZQUFXO0FBRTVDLFlBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsSUFBckI7QUFFRCxXQUpEO0FBTUQ7QUFWb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFZckIsTUFBQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBaUMsWUFBTTtBQUVyQyxRQUFBLFFBQVEsQ0FBQywyQkFBVDtBQUVELE9BSkQ7QUFacUI7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFrQmIsVUFBQSxRQWxCYTtBQW9CbkIsY0FBTSxXQUFXLEdBQVEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLENBQXpCO0FBQUEsY0FDQSxVQUFVLEdBQWUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLENBRHpCO0FBQUEsY0FFQSxNQUFNLEdBQW1CLFFBQVEsQ0FBQyxhQUFULENBQXVCLHlCQUF2QixDQUZ6QjtBQUFBLGNBR0EsT0FBTyxHQUFrQixNQUFNLENBQUMsV0FIaEM7QUFLQSxVQUFBLFdBQVcsQ0FBQyxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFNO0FBQzFDLFlBQUEsTUFBTSxDQUFDLFFBQVAsQ0FBZ0I7QUFDZCxjQUFBLElBQUksRUFBRSxPQUFPLEdBQUcsQ0FERjtBQUVkLGNBQUEsUUFBUSxFQUFFO0FBRkksYUFBaEI7QUFJRCxXQUxEO0FBT0EsVUFBQSxVQUFVLENBQUMsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsWUFBTTtBQUN6QyxZQUFBLE1BQU0sQ0FBQyxRQUFQLENBQWdCO0FBQ2QsY0FBQSxJQUFJLEVBQUUsQ0FBQyxPQUFELEdBQVcsQ0FESDtBQUVkLGNBQUEsUUFBUSxFQUFFO0FBRkksYUFBaEI7QUFJRCxXQUxEO0FBaENtQjs7QUFrQnJCLDhCQUFvQixRQUFRLENBQUMsU0FBN0IsbUlBQXdDO0FBQUEsY0FBaEMsUUFBZ0M7O0FBQUE7QUFxQnZDO0FBdkNvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUN0QixLQXBETTtBQXNEUCxJQUFBLFdBQVcsRUFBRyxxQkFBQSxJQUFJLEVBQUk7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFFcEIsOEJBQWMsUUFBUSxDQUFDLFVBQXZCLG1JQUFtQztBQUFBLGNBQTNCLEVBQTJCO0FBQ2pDLFVBQUEsRUFBRSxDQUFDLFNBQUgsQ0FBYSxNQUFiLENBQW9CLFVBQXBCO0FBQ0Q7QUFKbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNcEIsTUFBQSxJQUFJLENBQUMsU0FBTCxDQUFlLEdBQWYsQ0FBbUIsVUFBbkI7QUFFQSxVQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTCxDQUFhLFdBQXZCO0FBUm9CO0FBQUE7QUFBQTs7QUFBQTtBQVVwQiw4QkFBb0IsUUFBUSxDQUFDLFNBQTdCLG1JQUF3QztBQUFBLGNBQWhDLFFBQWdDO0FBRXRDLGNBQUcsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsV0FBakIsSUFBZ0MsR0FBbkMsRUFDRSxRQUFRLENBQUMsU0FBVCxDQUFtQixNQUFuQixDQUEwQixRQUExQixFQURGLEtBR0UsUUFBUSxDQUFDLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsUUFBdkI7QUFDSDtBQWhCbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFrQnBCLE1BQUEsUUFBUSxDQUFDLDJCQUFUO0FBRUQsS0ExRU07QUE0RVAsSUFBQSwyQkFBMkIsRUFBRyx1Q0FBTTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUVsQyw4QkFBb0IsUUFBUSxDQUFDLFNBQTdCLG1JQUF3QztBQUFBLGNBQWhDLFFBQWdDOztBQUV0QyxjQUFHLENBQUMsUUFBUSxDQUFDLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsUUFBNUIsQ0FBSixFQUEyQztBQUV4QyxnQkFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIseUJBQXZCLENBQWY7O0FBRUEsZ0JBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsUUFBUSxDQUFDLFdBQWpDLEVBQThDO0FBQzNDLGNBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFNBQTVDLENBQXNELE1BQXRELENBQTZELFFBQTdEO0FBQ0EsY0FBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsU0FBN0MsQ0FBdUQsTUFBdkQsQ0FBOEQsUUFBOUQ7QUFDRixhQUhELE1BR087QUFDSixjQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxTQUE1QyxDQUFzRCxHQUF0RCxDQUEwRCxRQUExRDtBQUNBLGNBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLFNBQTdDLENBQXVELEdBQXZELENBQTJELFFBQTNEO0FBQ0Y7QUFFSDtBQUVGO0FBbEJpQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBb0JuQztBQWhHTSxHQUFYO0FBb0dBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsUUFBakI7QUFFSCxDQTFHQSxHQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiIWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJleHBvcnRzXCJdLHQpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpdChleHBvcnRzKTtlbHNle3ZhciBvPXt9O3QobyksZS5ib2R5U2Nyb2xsTG9jaz1vfX0odGhpcyxmdW5jdGlvbihleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLG89QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKW9bdF09ZVt0XTtyZXR1cm4gb31yZXR1cm4gQXJyYXkuZnJvbShlKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbD0hMTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXt2YXIgZT17Z2V0IHBhc3NpdmUoKXtsPSEwfX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSl9ZnVuY3Rpb24gZCh0KXtyZXR1cm4gdS5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiEoIWUub3B0aW9ucy5hbGxvd1RvdWNoTW92ZXx8IWUub3B0aW9ucy5hbGxvd1RvdWNoTW92ZSh0KSl9KX1mdW5jdGlvbiBjKGUpe3ZhciB0PWV8fHdpbmRvdy5ldmVudDtyZXR1cm4hIWQodC50YXJnZXQpfHwoMTx0LnRvdWNoZXMubGVuZ3RofHwodC5wcmV2ZW50RGVmYXVsdCYmdC5wcmV2ZW50RGVmYXVsdCgpLCExKSl9ZnVuY3Rpb24gbygpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt2b2lkIDAhPT1tJiYoZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9bSxtPXZvaWQgMCksdm9pZCAwIT09ZiYmKGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9ZixmPXZvaWQgMCl9KX12YXIgYT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cubmF2aWdhdG9yJiZ3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtJiYoL2lQKGFkfGhvbmV8b2QpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0pfHxcIk1hY0ludGVsXCI9PT13aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtJiYxPHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMpLHU9W10scz0hMSx2PS0xLGY9dm9pZCAwLG09dm9pZCAwO2V4cG9ydHMuZGlzYWJsZUJvZHlTY3JvbGw9ZnVuY3Rpb24ocixlKXtpZihhKXtpZighcilyZXR1cm4gdm9pZCBjb25zb2xlLmVycm9yKFwiZGlzYWJsZUJvZHlTY3JvbGwgdW5zdWNjZXNzZnVsIC0gdGFyZ2V0RWxlbWVudCBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gY2FsbGluZyBkaXNhYmxlQm9keVNjcm9sbCBvbiBJT1MgZGV2aWNlcy5cIik7aWYociYmIXUuc29tZShmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50PT09cn0pKXt2YXIgdD17dGFyZ2V0RWxlbWVudDpyLG9wdGlvbnM6ZXx8e319O3U9W10uY29uY2F0KGkodSksW3RdKSxyLm9udG91Y2hzdGFydD1mdW5jdGlvbihlKXsxPT09ZS50YXJnZXRUb3VjaGVzLmxlbmd0aCYmKHY9ZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkpfSxyLm9udG91Y2htb3ZlPWZ1bmN0aW9uKGUpe3ZhciB0LG8sbixpOzE9PT1lLnRhcmdldFRvdWNoZXMubGVuZ3RoJiYobz1yLGk9KHQ9ZSkudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZLXYsZCh0LnRhcmdldCl8fChvJiYwPT09by5zY3JvbGxUb3AmJjA8aXx8KG49bykmJm4uc2Nyb2xsSGVpZ2h0LW4uc2Nyb2xsVG9wPD1uLmNsaWVudEhlaWdodCYmaTwwP2ModCk6dC5zdG9wUHJvcGFnYXRpb24oKSkpfSxzfHwoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLGMsbD97cGFzc2l2ZTohMX06dm9pZCAwKSxzPSEwKX19ZWxzZXtuPWUsc2V0VGltZW91dChmdW5jdGlvbigpe2lmKHZvaWQgMD09PW0pe3ZhciBlPSEhbiYmITA9PT1uLnJlc2VydmVTY3JvbGxCYXJHYXAsdD13aW5kb3cuaW5uZXJXaWR0aC1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7ZSYmMDx0JiYobT1kb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCxkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodD10K1wicHhcIil9dm9pZCAwPT09ZiYmKGY9ZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyxkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIpfSk7dmFyIG89e3RhcmdldEVsZW1lbnQ6cixvcHRpb25zOmV8fHt9fTt1PVtdLmNvbmNhdChpKHUpLFtvXSl9dmFyIG59LGV4cG9ydHMuY2xlYXJBbGxCb2R5U2Nyb2xsTG9ja3M9ZnVuY3Rpb24oKXthPyh1LmZvckVhY2goZnVuY3Rpb24oZSl7ZS50YXJnZXRFbGVtZW50Lm9udG91Y2hzdGFydD1udWxsLGUudGFyZ2V0RWxlbWVudC5vbnRvdWNobW92ZT1udWxsfSkscyYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixjLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCkscz0hMSksdT1bXSx2PS0xKToobygpLHU9W10pfSxleHBvcnRzLmVuYWJsZUJvZHlTY3JvbGw9ZnVuY3Rpb24odCl7aWYoYSl7aWYoIXQpcmV0dXJuIHZvaWQgY29uc29sZS5lcnJvcihcImVuYWJsZUJvZHlTY3JvbGwgdW5zdWNjZXNzZnVsIC0gdGFyZ2V0RWxlbWVudCBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gY2FsbGluZyBlbmFibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTt0Lm9udG91Y2hzdGFydD1udWxsLHQub250b3VjaG1vdmU9bnVsbCx1PXUuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSkscyYmMD09PXUubGVuZ3RoJiYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLGMsbD97cGFzc2l2ZTohMX06dm9pZCAwKSxzPSExKX1lbHNlKHU9dS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudCE9PXR9KSkubGVuZ3RofHxvKCl9fSk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIEZBUXNcblxuICAgIEZBUXMgPSB7XG4gICAgICAgIHNlY3Rpb25zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmFxcycpLFxuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgaWYoIUZBUXMuc2VjdGlvbnMpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgIEZBUXMuc2VjdGlvbnMuZm9yRWFjaChzZWN0aW9uID0+IEZBUXMuaW5pdGlhbGlzZUxpc3RlbmVycyhzZWN0aW9uKSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXRpYWxpc2VMaXN0ZW5lcnM6IChzZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBmYXFzID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCcuZmFxJylcblxuICAgICAgICAgICAgZmFxcy5mb3JFYWNoKGZhcSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IHF1ZXN0aW9uID0gZmFxLnF1ZXJ5U2VsZWN0b3IoJy5mYXFfX3F1ZXN0aW9uJylcbiAgICAgICAgICAgICAgICBsZXQgYW5zd2VyICAgPSBmYXEucXVlcnlTZWxlY3RvcignLmZhcV9fYW5zd2VyJylcblxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGZhcS5jbGFzc0xpc3QudG9nZ2xlKCdmYXEtLW9wZW4nKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGZhcS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhcS0tb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXIuc3R5bGUubWF4SGVpZ2h0ID0gYW5zd2VyLnNjcm9sbEhlaWdodCArICdweCdcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlci5zdHlsZS5tYXhIZWlnaHQgPSAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IEZBUXNcblxufSgpKVxuIiwiLy8gTGF6eUxvYWQgZm9yIFBsb3QgYnkgSm9uIE1pbGxzLCBNYXR0eSBHbGVuICYgTWljaGFlbCBXYXRzb25cblxuLy8gVGhpcyBtb2R1bGUgbG9hZHMgaW4gaW1hZ2VzIGFzeW5jcm9ub3VzbHkuIEl0IHdpbGwgbG9vayBmb3IgdGhlIGNsYXNzXG4vLyBcIkpTLS1sYXp5TG9hZFwiIGFuZCB0aGVuIGxvb2sgZm9yIGEgZGF0YS1zcmMgb24gaW1hZ2Ugb3IgdmlkZW8gdGFncy4gXG4vLyBJdCB3aWxsIHRoZW4gcmVwbGFjZSB0aGUgc3JjIG9mIHRoYXQgZWxlbWVudCB3aXRoIHRoZSBpbWFnZSBsaW5rZWQgb25cbi8vIHRoZSBkYXRhIGF0dHJpYnV0ZS5cblxuLy8gSWYgdGhlIGVsZW1lbnQgaXMgbm90IGFuIGltYWdlIG9yIGEgdmlkZW8tIGl0IHdpbGwgYXNzaWduIHRoZSBkYXRhLXNyY1xuLy8gYXMgYSBiYWNrZ3JvdW5kIGltYWdlLiBcblxuLy8gSWYgdGhlIHNjcmVlbiBzaXplIGlzIGxlc3MgdGhhbiB0aGUgZGVmaW5lZCBtb2JpbGVCcmVha3BvaW50LCB3ZSBsb2FkXG4vLyB0aGUgc3JjIGZyb20gZGF0YS1zbWFsbC1zcmMgaW5zdGVhZC4gXG5cbi8vIENyZWF0aW9uIG9mIHRoZXNlIHZpZGVvIGFuZCBpbWFnZSBvYmplY3RzIGNhbiBiZSBtYWRlIHVzaW5nIHRoZSBQSFBcbi8vIGhlbHBlciBpbiBsaWIvaGVscGVycy5waHAgcGxvdExhenlMb2FkKClcblxuLy8gSWYgd2UgbmVlZCB0byBzdGlwdWxhdGUgdGhlIGhlaWdodCBvZiBhbiBpbWFnZSBiZWZvcmUgaXQgbG9hZHMsIHRvIGF2b2lkXG4vLyBhbnkganVtcGluZXNzLCB3ZSBjYW4gcGFzcyB0aHJvdWdoIGEgcmF0aW8gKHcvaCkgb2YgdGhlIGltYWdlIHNvIGl0J3Ncbi8vIHNldCBiZWZvcmUgdGhlIGltYWdlIGxvYWRzLlxuXG4vLyBXZSBhbHNvIGhhbmRsZSBhdXRvcGxheWluZyB2aWRlb3MsIGlmIHRoZSB2aWRlbyBoYXMgYW4gYXV0b3BsYXkgYXR0cmlidXRlLlxuLy8gSXQgd2lsbCBwYXVzZSBhbmQgcGxheSB2aWRlb3MgYXBwcm9wcmlhdGVseSBkZXBlbmRpbmcgb24gaWYgdGhleSdyZSBpblxuLy8gdmlldyBvciBub3QuXG5cbihmdW5jdGlvbigpe1xuXG4gICAgdmFyIExhenlMb2FkXG5cbiAgICBMYXp5TG9hZCA9IHtcbiAgICAgICAgbW9iaWxlQnJlYWtwb2ludCA6IDY0MCxcbiAgICAgICAgaW1hZ2VzIDogICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tbGF6eUxvYWQnKSxcbiAgICAgICAgY29uZmlnIDoge1xuICAgICAgICAgICAgcm9vdE1hcmdpbjogJzBweCcsXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuMDFcbiAgICAgICAgfSxcbiAgICAgICAgb2JzZXJ2ZXIgOiBudWxsLFxuICAgICAgICBpbml0IDogZnVuY3Rpb24oKXsgXG5cbiAgICAgICAgICAgIExhenlMb2FkLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKExhenlMb2FkLmhhbmRsZUltYWdlTG9hZCwgTGF6eUxvYWQuY29uZmlnKVxuXG4gICAgICAgICAgICBMYXp5TG9hZC5sb2FkSW1hZ2VzKClcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIGxvYWRJbWFnZXMgOiAoKSA9PiB7IFxuXG4gICAgICAgICAgICBMYXp5TG9hZC5pbWFnZXMuZm9yRWFjaCggaW1hZ2UgPT4geyAgXG5cbiAgICAgICAgICAgICAgICBMYXp5TG9hZC5vYnNlcnZlci5vYnNlcnZlKGltYWdlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICBhZGRFbGVtZW50cyA6IGVsZW1lbnRzID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goIGltYWdlID0+IHsgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIExhenlMb2FkLm9ic2VydmVyLm9ic2VydmUoaW1hZ2UpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZUltYWdlTG9hZCA6IGVudHJpZXMgPT4geyAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goIGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGVudHJ5LnRhcmdldFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKCFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbG9hZGVkJykgJiYgIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2FkaW5nJykpIHsgXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIWVudHJ5LmlzSW50ZXJzZWN0aW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWcgPSBlbnRyeS5pc0ludGVyc2VjdGluZyAmJiBlbGVtZW50LnRhZ05hbWVcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3JjID0gZWxlbWVudC5kYXRhc2V0LnNyY1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKExhenlMb2FkLmlzU21hbGxTY3JlZW4oKSAmJiBlbGVtZW50LmRhdGFzZXQuc21hbGxTcmMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjID0gZWxlbWVudC5kYXRhc2V0LnNtYWxsU3JjXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYodGFnID09IFwiVklERU9cIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihMYXp5TG9hZC5pc1NtYWxsU2NyZWVuKCkgJiYgZWxlbWVudC5kYXRhc2V0LnNtYWxsU3JjKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNyYyA9IGVsZW1lbnQuZGF0YXNldC5zbWFsbFNyY1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjID0gZWxlbWVudC5kYXRhc2V0LnNyY1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhdXRvcGxheScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5wbGF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIExhenlMb2FkLmdldEltYWdlKHNyYywgZWxlbWVudCkudGhlbiggZGF0YSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFnID0gZWxlbWVudC50YWdOYW1lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0YWcgPT0gXCJJTUdcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZWxlbWVudC5zcmMgPSBkYXRhLnNyY1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgZGF0YS5zcmMgKyAnKSdcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goIGVycm9yZWRTcmMgPT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcmVkU3JjLCAnaW1hZ2Ugbm90IGZvdW5kJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQudGFnTmFtZSA9PSBcIlZJREVPXCIpIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXV0b3BsYXknKSkgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighZW50cnkuaXNJbnRlcnNlY3RpbmcgJiYgZWxlbWVudC5wYXVzZWQgPT0gZmFsc2UpIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGF1c2UoKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGxheSgpXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0SW1hZ2U6IChzcmMsIGVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcblxuICAgICAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKVxuXG4gICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogc3JjLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogc3JjLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBzcmNcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpc1NtYWxsU2NyZWVuIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IExhenlMb2FkLm1vYmlsZUJyZWFrcG9pbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gTGF6eUxvYWRcblxufSkoKVxuXG4iLCIvLyBNb2RhbHMgZm9yIFBsb3QgYnkgTWljaGFlbCBXYXRzb25cbi8vIEEgc2ltcGxlIG1vZGFscyBzb2x1dGlvbiB0aGF0IGxvb2tzIGZvciB0aGUgY2xhc3MgXCJKUy0tcGxvdE1vZGFsQnV0dG9uXCJcbi8vIEFuZCB3aGVuIGNsaWNrZWQsIHJlYWRzIHRoZSB2YWx1ZSBzZXQgb24gZGF0YS1wbG90LW1vZGFsLiBpdCB0aGVuIGxvb2tzXG4vLyBmb3IgYW4gSFRNTCBlbGVtZW50IGNhbGxlZCBcIi5KUy0tcGxvdE1vZGFsQ29udGVudHNcIiB3aXRoIGEgY29ycmVzcG9uZGluZyB2YWx1ZS5cblxuLy8gRm9yIGV4YW1wbGUsIDxhIGNsYXNzPVwiSlMtLXBsb3RNb2RhbEJ1dHRvblwiIGRhdGEtcGxvdC1tb2RhbD1cIjFcIj5DbGljayBtZTwvYT5cbi8vIFdpbGwgZmluZCB0aGUgZm9sbG93aW5nIGVsZW1lbnQ6XG4vLyA8ZGl2IGNsYXNzPVwiSlMtLXBsb3RNb2RhbENvbnRlbnRzXCI+SSBhbSBzb21lIG1vZGFsIGNvbnRlbnQhPC9kaXY+XG4vLyBBbmQgd2lsbCB0YWtlIHRoZSBpbm5lckhUTUwgdG8gcHV0IGluc2lkZSBhIG1vZGFsIG9uIHRoZSBzY3JlZW4uXG5cbi8vIEdhbGxlcmllcyBjYW4gYmUgY3JlYXRlZCBieSBjb25uZWN0aW5nIG11bHRpcGxlIFBsb3QgTW9kYWwgQnV0dG9uc1xuLy8gYnkgZ2l2aW5nIHRoZW0gYSBkYXRhLXBsb3QtbW9kYWwtZ3JvdXAgb3B0aW9uLlxuLy8gVGhleSB3aWxsIHRoZW4gaGF2ZSB3b3JraW5nIGxlZnQgYW5kIHJpZ2h0IGFycm93cyB0byBuYXZpZ2F0ZSB0aHJvdWdoXG4vLyBDb250ZW50cyBpbiBhIGxvb3AuXG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgTGF6eUxvYWQgICAgICAgICA9IHJlcXVpcmUoJy4vbGF6eWxvYWQnKSwgIFxuICAgICAgICBQbG90ICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9wbG90JyksXG4gICAgICAgIEJvZHlTY3JvbGxMb2NrICAgPSByZXF1aXJlKCdib2R5LXNjcm9sbC1sb2NrJyksXG4gICAgICAgIE1vZGFsc1xuXG4gICAgTW9kYWxzID0ge1xuICAgICAgICBjdXJyZW50R3JvdXBJdGVtICAgIDogMCxcbiAgICAgICAgZ3JvdXBMaW5rcyAgICAgICAgICA6IFtdLCAgXG4gICAgICAgIGN1cnJlbnRNb2RhbElkICAgICAgOiBudWxsLFxuICAgICAgICBpc09wZW4gICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIGlzTG9hZGluZyAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgY29udHJvbHNUaW1lciAgICAgICA6IGZhbHNlLFxuICAgICAgICBtb2RhbENvbnRlbnQgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWxSZXBsYWNlQ29udGVudHMnKSxcbiAgICAgICAgbW9kYWxHcm91cENvbnRyb2xzICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsQ29udHJvbHMnKSxcbiAgICAgICAgbW9kYWxHcm91cE5leHQgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsQ29udHJvbHNfX25leHQnKSxcbiAgICAgICAgbW9kYWxHcm91cEJhY2sgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsQ29udHJvbHNfX2JhY2snKSxcbiAgICAgICAgcGxvdE1vZGFsICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsJyksXG5cblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIE1vZGFscy5jcmVhdGVMaXN0ZW5lcnMoKVxuICAgICAgICAgICAgTW9kYWxzLmNoZWNrRm9yTW9kYWxOb3RpZmljYXRpb24oKVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUxpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWNsb3NlUGxvdE1vZGFsJylcblxuICAgICAgICAgICAgZm9yKHZhciBjbG9zZUJ1dHRvbiBvZiBjbG9zZUJ1dHRvbnMpIHtcbiAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgIE1vZGFscy5jbG9zZVBsb3RNb2RhbCgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgICBpZihNb2RhbHMuY3VycmVudE1vZGFsSWQgJiYgIVBsb3QuaXNUb3VjaERldmljZSgpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoTW9kYWxzLmNvbnRyb2xzVGltZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoTW9kYWxzLmNvbnRyb2xzVGltZXIpXG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdC5jb250YWlucygnaGlkZUNvbnRyb2xzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGVDb250cm9scycpXG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLmNvbnRyb2xzVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGVDb250cm9scycpXG5cbiAgICAgICAgICAgICAgICAgICAgfSwyMjAwKVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGVXcmFwJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1wbG90LW1vZGFsXScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMub3BlblBsb3RNb2RhbChlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1wbG90LW1vZGFsXScpKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYoTW9kYWxzLm1vZGFsR3JvdXBCYWNrKSB7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMubW9kYWxHcm91cEJhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLE1vZGFscy50cmlnZ2VyQmFja0dyb3VwSXRlbSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoTW9kYWxzLm1vZGFsR3JvdXBOZXh0KSB7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMubW9kYWxHcm91cE5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLE1vZGFscy50cmlnZ2VyTmV4dEdyb3VwSXRlbSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZihlLndoaWNoID09IDM5ICYmIE1vZGFscy5ncm91cExpbmtzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMudHJpZ2dlck5leHRHcm91cEl0ZW0oKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGUud2hpY2ggPT0gMzcgJiYgTW9kYWxzLmdyb3VwTGlua3MubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy50cmlnZ2VyQmFja0dyb3VwSXRlbSgpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoTW9kYWxzLmlzT3BlbiAmJiBlLndoaWNoPT0yNykge1xuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5jbG9zZVBsb3RNb2RhbCgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG5cbiAgICAgICAgY2hlY2tGb3JNb2RhbE5vdGlmaWNhdGlvbiA6ICgpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uVHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tZmFrZUJ1dHRvbkZvck1vZGFsTm90aWZpY2F0aW9ucycpXG5cbiAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvblRyaWdnZXIpIHtcblxuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwbG90SGFzTm90aWZpY2F0aW9uRmlyZWQnKSAhPT0gXCIxXCIpIHsgXG5cbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncGxvdEhhc05vdGlmaWNhdGlvbkZpcmVkJywgJzEnKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RhbHMub3BlblBsb3RNb2RhbChub3RpZmljYXRpb25UcmlnZ2VyKVxuXG4gICAgICAgICAgICAgICAgICAgIH0sbm90aWZpY2F0aW9uVHJpZ2dlci5kYXRhc2V0LnBsb3ROb3RpZmljYXRpb25XYWl0KjEwMDApXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHRyaWdnZXJCYWNrR3JvdXBJdGVtIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbS0tXG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5jdXJyZW50R3JvdXBJdGVtIDwgMCkge1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPSBNb2RhbHMuZ3JvdXBMaW5rcy5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE1vZGFscy5vcGVuUGxvdE1vZGFsKE1vZGFscy5ncm91cExpbmtzW01vZGFscy5jdXJyZW50R3JvdXBJdGVtXSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIHRyaWdnZXJOZXh0R3JvdXBJdGVtIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbSsrXG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5jdXJyZW50R3JvdXBJdGVtID09IE1vZGFscy5ncm91cExpbmtzLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPSAwXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTW9kYWxzLm9wZW5QbG90TW9kYWwoTW9kYWxzLmdyb3VwTGlua3NbTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW1dKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgb3BlblBsb3RNb2RhbDogKGVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgaWYoTW9kYWxzLmlzTG9hZGluZyA9PSB0cnVlKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSAgICAgICAgICAgIDogJ2lubGluZScsIC8vIChpbmxpbmV8YWpheCkgaWYgdGhlIGNvbnRlbnQgaXMgYWxyZWFkeSBpbiB0aGUgZG9tIG9yIG5vdFxuICAgICAgICAgICAgICAgIGdyb3VwSWQgICAgICAgICA6ICcnLCAvL1RoZSBvcHRpb25hbCBJRCBvZiB0aGUgZ3JvdXAgb2YgbW9kYWxzIHVzZWQgZm9yIGdhbGxlcnkgdmlld3NcbiAgICAgICAgICAgICAgICBjb250ZW50c0lkICAgICAgOiAnJywgLy9UaGUgSUQgdGhhdCByZWZlcmVuY2VzIHdoZXJlLCBvbiB0aGUgcGFnZSwgdGhlIGNvbnRlbnQgdG8gdXNlIGxpdmVzXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQYXJ0ICAgIDogJycsIC8vVGhlIHRlbXBsYXRlIHBhcnQgdG8gbG9hZCwgaWYgQUpBWFxuICAgICAgICAgICAgICAgIGFqYXhEYXRhICAgICAgICA6IHt9LCAvL0RhdGEgdG8gc2VuZCB2aWEgQUpBWFxuICAgICAgICAgICAgICAgIG1vZGFsQ2xhc3MgICAgICA6ICcnIC8vQSBjdXN0b20gY2xhc3MgdG8gYWRkIHRvIG91ciBtb2RhbFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNb2RhbHMuaXNMb2FkaW5nID0gdHJ1ZVxuXG4gICAgICAgICAgICBpZihlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsVHlwZSA9PSAnYWpheCcpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy50eXBlID0gJ2FqYXgnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldHRpbmdzLmNvbnRlbnRzSWQgICAgID0gZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbENvbnRlbnRzXG4gICAgICAgICAgICBzZXR0aW5ncy5ncm91cElkICAgICAgICA9IGVsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxHcm91cFxuICAgICAgICAgICAgc2V0dGluZ3MudGVtcGxhdGVQYXJ0ICAgPSBlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsVGVtcGxhdGVQYXJ0XG4gICAgICAgICAgICBzZXR0aW5ncy5tb2RhbENsYXNzICAgICA9IGVsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxDbGFzc1xuXG4gICAgICAgICAgICBpZighc2V0dGluZ3MuY29udGVudHNJZCAmJiBzZXR0aW5ncy50eXBlID09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0lubGluZSBNb2RhbHMgbmVlZCBhIHBsb3QtbW9kYWwtY29udGVudHMgdmFyaWFibGUgYWRkZWQnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy50eXBlID09ICdhamF4JyAmJiAhc2V0dGluZ3MudGVtcGxhdGVQYXJ0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FqYXggbW9kYWxzIG5lZWQgYSBwbG90LW1vZGFsLXRlbXBsYXRlLXBhcnQgdmFyaWFibGUgYWRkZWQnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NoZWNrIHRvIHNlZSBpZiBpdCdzIHBhcnQgb2YgYSBncm91cFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihNb2RhbHMuZ3JvdXBMaW5rcy5sZW5ndGggPT0gMCAmJiBzZXR0aW5ncy5ncm91cElkKVxuICAgICAgICAgICAgICAgTW9kYWxzLmluaXRpYWxpc2VHcm91cChlbGVtZW50KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighc2V0dGluZ3MuZ3JvdXBJZClcbiAgICAgICAgICAgICAgICBNb2RhbHMubW9kYWxHcm91cENvbnRyb2xzLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG5cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLm1vZGFsQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdC5hZGQoc2V0dGluZ3MubW9kYWxDbGFzcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2V0dGluZ3MudHlwZSA9PSAnaW5saW5lJykge1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRNb2RhbElkID0gc2V0dGluZ3MuY29udGVudHNJZFxuXG4gICAgICAgICAgICAgICAgLy9GaW5kIGNvbnRlbnQgdG8gaW5zZXJ0IGluIG91ciBtb2RhbFxuICAgICAgICAgICAgICAgIHZhciBwbG90TW9kYWxDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsQ29udGVudHNbZGF0YS1wbG90LW1vZGFsLWNvbnRlbnRzPVwiJyArIE1vZGFscy5jdXJyZW50TW9kYWxJZCArICdcIl0nKVxuXG4gICAgICAgICAgICAgICAgaWYoIXBsb3RNb2RhbENvbnRlbnRzLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICAgICAgICAgIHBsb3RNb2RhbENvbnRlbnRzID0gcGxvdE1vZGFsQ29udGVudHMuaW5uZXJIVE1MO1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLnB1dENvbnRlbnRzSW50b01vZGFsKHBsb3RNb2RhbENvbnRlbnRzKVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vQUpBWCBsb2FkaW5nIGNvbnRlbnRcbiAgICAgICAgICAgICAgICB2YXIgYWpheERhdGEgPSB7fVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwbG90TW9kYWxMb2FkaW5nQWpheCcpXG5cbiAgICAgICAgICAgICAgICBmb3IoY29uc3Qga2V5IGluIGVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBpZihrZXkuc3Vic3RyaW5nKDAsMTMpID09ICdwbG90TW9kYWxEYXRhJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWpheERhdGFba2V5LmNoYXJBdCgxMykudG9Mb3dlckNhc2UoKSArIGtleS5zdWJzdHJpbmcoMTQpXSA9IGVsZW1lbnQuZGF0YXNldFtrZXldXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybk9yV3JpdGUgICA6ICdyZXR1cm4nLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiBzZXR0aW5ncy50ZW1wbGF0ZVBhcnQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgICAgICAgICAgICA6IGFqYXhEYXRhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFBsb3QubG9hZFRlbXBsYXRlUGFydChhcmdzKS50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNb2RhbHMucHV0Q29udGVudHNJbnRvTW9kYWwoaHRtbClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcHV0Q29udGVudHNJbnRvTW9kYWwgOiBjb250ZW50cyA9PiAge1xuXG5cbiAgICAgICAgICAgIE1vZGFscy5tb2RhbENvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gTW9kYWxzLm1vZGFsQ29udGVudC5jbGllbnRIZWlnaHQgKyAncHgnXG4gICAgICAgICAgICBNb2RhbHMubW9kYWxDb250ZW50LmlubmVySFRNTCA9IGNvbnRlbnRzXG5cbiAgICAgICAgICAgIEJvZHlTY3JvbGxMb2NrLmRpc2FibGVCb2R5U2Nyb2xsKE1vZGFscy5wbG90TW9kYWwpXG5cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxvdE1vZGFsSW5WaWV3JylcblxuICAgICAgICAgICAgY29uc3QgbmV3SW1hZ2VzID0gTW9kYWxzLm1vZGFsQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKVxuXG4gICAgICAgICAgICBMYXp5TG9hZC5hZGRFbGVtZW50cyhuZXdJbWFnZXMpLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMubW9kYWxDb250ZW50LnN0eWxlLm1pbkhlaWdodCA9IDBcblxuICAgICAgICAgICAgICAgIH0sNTApXG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1ZpZGVvcyA9IE1vZGFscy5tb2RhbENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKVxuXG5cblxuICAgICAgICAgICAgbmV3VmlkZW9zLmZvckVhY2godmlkZW8gPT57XG5cbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gbmV3IE1lZGlhRWxlbWVudFBsYXllcih2aWRlbywvKiBPcHRpb25zICovKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIucGxheSgpO1xuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBNb2RhbHMuaXNPcGVuID0gdHJ1ZVxuICAgICAgICAgICAgTW9kYWxzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RNb2RhbExvYWRpbmdBamF4JylcblxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXRpYWxpc2VHcm91cCA6IChlbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgIE1vZGFscy5ncm91cExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1tb2RhbC1ncm91cD1cIicrZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbEdyb3VwKydcIl0nKVxuXG4gICAgICAgICAgICB2YXIgaSA9IDBcblxuICAgICAgICAgICAgZm9yKHZhciBncm91cExpbmsgb2YgTW9kYWxzLmdyb3VwTGlua3MpIHtcblxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQgPT0gZ3JvdXBMaW5rKVxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA9IGk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaSsrXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoTW9kYWxzLmN1cnJlbnRNb2RhbElkICYmICFQbG90LmlzVG91Y2hEZXZpY2UoKSlcblxuICAgICAgICAgICAgICAgIE1vZGFscy5jb250cm9sc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGVDb250cm9scycpXG5cbiAgICAgICAgICAgICAgICB9LDMwMDApXG5cbiAgICAgICAgICAgIE1vZGFscy5tb2RhbEdyb3VwQ29udHJvbHMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNsb3NlUGxvdE1vZGFsOiAoKSA9PiB7XG4gICAgXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RNb2RhbEluVmlldycpXG5cbiAgICAgICAgICAgIE1vZGFscy5jdXJyZW50TW9kYWxJZCA9IG51bGxcblxuICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QgPSAnSlMtLXBsb3RNb2RhbCBwbG90TW9kYWwnXG5cbiAgICAgICAgICAgIE1vZGFscy5ncm91cExpbmtzID0gW11cblxuICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPSAwXG5cbiAgICAgICAgICAgIE1vZGFscy5tb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gJydcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQm9keVNjcm9sbExvY2suZW5hYmxlQm9keVNjcm9sbChNb2RhbHMucGxvdE1vZGFsKVxuXG4gICAgICAgICAgICBNb2RhbHMuaXNPcGVuID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBNb2RhbHNcblxufSgpKVxuIiwiKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgU21vb3RoO1xuXG4gIFNtb290aCA9IHtcblxuICAgIHRyYWNrZWRFbGVtZW50c09ic2VydmVyIDogbnVsbCxcbiAgICBzdGFuZGFyZFNjcm9sbEZyYW1lc09ic2VydmVyIDogbnVsbCxcblxuICAgIG1haW5TY3JvbGxBbmltYXRpb25GcmFtZSA6IG51bGwsXG5cbiAgICBjdXJyZW50UG9zaXRpb24gOiAwLFxuXG4gICAgbXV0YXRpb25PYnNlcnZlckRlYm91bmNlIDogbnVsbCxcblxuICAgIG9uU2Nyb2xsQ2FsbGJhY2tUaHJvdHRsZXIgOiBudWxsLFxuXG4gICAgZWFzZSA6IDAuMDcsXG5cbiAgICBsYXN0UG9zaXRpb24gOiAwLFxuXG4gICAgb25TY3JvbGwgOiBudWxsLFxuXG4gICAgc3RhbmRhcmRTY3JvbGwgOiBmYWxzZSxcblxuICAgIHNjcm9sbEVsZW1lbnRzIDogW10sXG5cbiAgICB0b3BCYXJIZWlnaHQgOiAwLFxuXG4gICAgc2Nyb2xsRnJhbWVzIDogW10sXG5cbiAgICB0aWNraW5nIDogZmFsc2UsXG5cbiAgICBkb20gOiB7XG4gICAgICAgICAgICBzY3JvbGxXaW5kb3cgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGxdJyksXG4gICAgICAgICAgICBzY3JvbGxGcmFtZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGwtZnJhbWVdJyksXG4gICAgICAgICAgICBzY3JvbGxFbGVtZW50cyAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGwtZWxlbWVudF0nKSxcbiAgICAgICAgICAgIHRvcEJhciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbC10b3BiYXInKVxuICAgICAgICAgIH0sXG5cbiAgICB3aW5kb3dIZWlnaHQgOiB3aW5kb3cuaW5uZXJIZWlnaHQsIFxuXG4gICAgd2luZG93V2lkdGggOiB3aW5kb3cuaW5uZXJXaWR0aCxcblxuICAgIGluaXQ6IHNldHRpbmdzID0+IHtcblxuICAgICAgLy9vdmVycmlkZSBhbnkgZGVmYXVsdCBzZXR0aW5ncyB3aXRoIHBhc3NlZCBwYXJhbWV0ZXJzXG4gICAgICBTbW9vdGguc2V0U2V0dGluZ3Moc2V0dGluZ3MpXG5cbiAgICAgIGlmKCFTbW9vdGguc3RhbmRhcmRTY3JvbGwpIHtcblxuICAgICAgICAvL1NldCBvdXIgY3VycmVudCBhbmQgbGFzdCBwb3NpdGlvbnMgXG4gICAgICAgIC8vdG8gdGhlIGN1cnJlbnQgc2Nyb2xsIFkgcG9zaXRpb24sIGluIGNhc2VcbiAgICAgICAgLy93ZSBhcmUgc2Nyb2xsZWQgZG93biB0aGUgcGFnZSBvbiBsb2FkXG4gICAgICAgIFNtb290aC5jdXJyZW50UG9zaXRpb24gICAgPSB3aW5kb3cuc2Nyb2xsWVxuICAgICAgICBTbW9vdGgubGFzdFBvc2l0aW9uICAgICAgID0gd2luZG93LnNjcm9sbFlcblxuICAgICAgICAvL1B1dCBmaXhlZCBvbnRvIHRoZSB3aG9sZSBzaXRlIHJlYWR5IHRvIFxuICAgICAgICAvL2ludGVyY2VwdCBzY3JvbGxpbmdcbiAgICAgICAgU21vb3RoLnNldFN0eWxlcygpXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIFNtb290aC5yZWZyZXNoLCB7IHBhc3NpdmU6IHRydWUgfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIFNtb290aC5zY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KVxuXG4gICAgICAgIC8vUmVhZCB0aHJvdWdoIGVhY2ggc2Nyb2xsIGZyYW1lIGFuZCBzZXQgZGF0YVxuICAgICAgICAvL2ludG8gYSBzaW5nbGUgYXJyYXkgZm9yIHByb2Nlc3NpbmcgbGF0ZXJcbiAgICAgICAgLy97XG4gICAgICAgIC8vICAgICAgZWxlbWVudCAgICAgICAgICAgOiBlbGVtZW50LCAgICAgICh0aGUgZG9tIGVsZW1lbnQpXG4gICAgICAgIC8vICAgICAgdG9wICAgICAgICAgICAgICAgOiAxMDAsICAgICAgICAgICh0aGUgb2Zmc2V0IHRvcCB2YWx1ZSB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBoZWlnaHQgICAgICAgICAgICA6IDMwMCwgICAgICAgICAgKHRoZSBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgYm90dG9tICAgICAgICAgICAgOiA0MDAsICAgICAgICAgICh0aGUgb2Zmc2V0IGJvdHRvbSBwb3NpdGlvbiB2YWx1ZSB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBzdGlja3kgICAgICAgICAgICA6IGZhbHNlLCAgICAgICAgKGlmIHRoZSBlbGVtZW50IHNob3VsZCBiZWhhdmUgbGlrZSBDU1Mgc3RpY2t5IG9yIG5vdClcbiAgICAgICAgLy8gICAgICBwYXJlbnRCb3R0b20gICAgICA6IGZhbHNlIHx8IDUwMCAgKGlmIHRoZSBlbGVtZW50IGlzIHN0aWNreSwgcmV0dXJuIHRoZSBib3R0b20gcG9zaXRpb24gb2YgaXRzIHBhcmVudCBpbiBwaXhlbHMgKHdoZW4gaXQgc2hvdWxkIHVuc3RpY2spKVxuICAgICAgICAvLyAgfVxuICAgICAgICBTbW9vdGguc2V0U2Nyb2xsRnJhbWVEYXRhKClcblxuICAgICAgfVxuXG4gICAgICAvL0lmIGFueSBzY3JvbGwgZWxlbWVudHMgZXhpc3QsIHdlIGNhbiBhZGQgdGhlbSBhbmQgbW9uaXRvciB0aGVtXG4gICAgICBpZihTbW9vdGguZG9tLnNjcm9sbEVsZW1lbnRzKSB7XG4gICAgICAgIC8vUmVhZCB0aHJvdWdoIGVhY2ggc2Nyb2xsIGVsZW1lbnQgYW5kIHNldCBkYXRhXG4gICAgICAgIC8vaW50byBhIHNpbmdsZSBhcnJheSBmb3IgcHJvY2Vzc2luZyBsYXRlclxuICAgICAgICAvL3tcbiAgICAgICAgLy8gICAgICBlbGVtZW50ICAgICAgICAgOiBlbGVtZW50LCAgICAgICAgICAodGhlIGRvbSBlbGVtZW50KVxuICAgICAgICAvLyAgICAgIHRvcCAgICAgICAgICAgICA6IDEwMCwgICAgICAgICAgICAgICh0aGUgb2Zmc2V0IHRvcCB2YWx1ZSB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBoZWlnaHQgICAgICAgICAgOiAzMDAsICAgICAgICAgICAgICAodGhlIGhlaWdodCBvZiB0aGUgZWxlbWVudCB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBib3R0b20gICAgICAgICAgOiA0MDAsICAgICAgICAgICAgICAodGhlIG9mZnNldCBib3R0b20gcG9zaXRpb24gdmFsdWUgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgaXNWaXNpYmxlICAgICAgIDogZmFsc2UsICAgICAgICAgICAgKGlmIHRoZSBlbGVtZW50IGlzIGN1cnJlbnRseSBpbiB0aGUgd2luZG93IGZyYW1lIG9yIG5vdClcbiAgICAgICAgLy8gICAgICBpbml0aWFsT2Zmc2V0ICAgOiAuMiwgICAgICAgICAgICAgICAoaG93IGZhciBhd2F5IHRoaXMgZWxlbWVudCBpcyBmcm9tIHRoZSBpbml0aWFsIGNlbnRlciBvZiB0aGUgc2NyZWVuKVxuICAgICAgICAvLyAgICAgIGN1cnJlbnRQb3NpdGlvbiA6IDAgICAgICAgICAgICAgICAgIChob3cgZmFyIHVwIHRoZSB2aWV3cG9ydCB0aGlzIGVsZW1lbnQgY3VycmVudGx5IGlzIChiZXR3ZWVuIC0xIGFuZCAxKSlcbiAgICAgICAgLy8gICAgICBjYWxsYmFjayAgICAgICAgOiAnZnVuY3Rpb24ubmFtZScgICAodGhlIG5hbWUgb2YgYSBmdW5jdGlvbiB5b3UgY2FuIGNhbGwgd2hlbiB0aGlzIG1vdmVzIHdpdGhpbiB2aWV3KVxuICAgICAgICAvLyB9XG4gICAgICAgIFNtb290aC50cmFja2VkRWxlbWVudHNPYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihTbW9vdGgudHJhY2tWaXNpYmxlRWxlbWVudHMsIHtyb290TWFyZ2luOiAnMHB4Jyx0aHJlc2hvbGQ6IDAuMDF9KVxuICAgICAgICBTbW9vdGguc2V0U2Nyb2xsRWxlbWVudERhdGEoKVxuICAgICAgfVxuXG4gICAgICAvL1NldCB1cCBhIG11dGF0aW9uIG9ic2VydmVyIHRvIGxpc3RlbiBvdXQgZm9yIGNoYW5nZXMgaW4gaGVpZ2h0LFxuICAgICAgLy90byBhZGp1c3Qgb3VyIGhlaWdodCBvZiBkb2N1bWVudCBhY2NvcmRpbmdseVxuICAgICAgU21vb3RoLmluaXRNdXRhdGlvbk9ic2VydmVyKClcblxuICAgICAgLy9JZiB0aGVyZSdzIGEgZml4ZWQgdG9wYmFyIG9uIHRoaXMgc2l0ZSwgd2UgY2FuIHNldCB0aGUgaGVpZ2h0XG4gICAgICAvL2hlcmUsIGluIG9yZGVyIHRvIG9mZnNldCBhbnkgc3RpY2t5IHBvc2l0aW9ucy4gXG4gICAgICBTbW9vdGguc2V0VG9wQmFySGVpZ2h0KClcblxuICAgICAgLy9JZiBpdCdzIG5vdCBzdGFuZGFyZCBzY3JvbGwsIHNldCBvdXIgaW5pdGlhbCBzY3JvbGwgZnJhbWUgcG9zaXRpb25zXG4gICAgICBpZighU21vb3RoLnN0YW5kYXJkU2Nyb2xsKSB7XG4gICAgICAgIFNtb290aC5zZXRQb3NpdGlvbk9mRnJhbWVzKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBTbW9vdGguc3RhbmRhcmRTY3JvbGxGcmFtZXNPYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihTbW9vdGgudHJhY2tTdGFuZGFyZFNjcm9sbEZyYW1lcywge3Jvb3RNYXJnaW46ICcwcHgnLHRocmVzaG9sZDogMC4wMX0pXG4gICAgICAgICBmb3IobGV0IGZyYW1lIG9mIFNtb290aC5kb20uc2Nyb2xsRnJhbWVzKSB7XG4gICAgICAgICAgICBTbW9vdGguc3RhbmRhcmRTY3JvbGxGcmFtZXNPYnNlcnZlci5vYnNlcnZlKGZyYW1lKVxuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL1NldCBvdXIgcG9zaXRpb24gb2YgYW55IHNjcm9sbCBlbGVtZW50c1xuICAgICAgU21vb3RoLnBvc2l0aW9uU2Nyb2xsRWxlbWVudHMoKVxuXG4gICAgfSxcblxuICAgIHNldFNldHRpbmdzIDogc2V0dGluZ3MgPT4ge1xuXG4gICAgICBpZighc2V0dGluZ3MpXG4gICAgICAgIHJldHVybiB0cnVlXG5cbiAgICAgIGlmKHR5cGVvZihzZXR0aW5ncy5vblNjcm9sbCkgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgU21vb3RoLm9uU2Nyb2xsID0gc2V0dGluZ3Mub25TY3JvbGxcbiAgICAgIFxuICAgICAgaWYoc2V0dGluZ3Muc3RhbmRhcmRTY3JvbGwgPT0gdHJ1ZSlcbiAgICAgICAgU21vb3RoLnN0YW5kYXJkU2Nyb2xsID0gdHJ1ZVxuXG4gICAgICBpZihzZXR0aW5ncy5lYXNlKSBcbiAgICAgICAgU21vb3RoLmVhc2UgPSBzZXR0aW5ncy5lYXNlXG4gICAgICBcbiAgICB9LFxuXG4gICAgcmV0cmlnZ2VyV2luZG93U2l6ZU9uTXV0YXRlIDogKG11dGF0aW9uc0xpc3QsIG9ic2VydmVyKSA9PiB7IFxuXG4gICAgICBpZighU21vb3RoLm11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSkge1xuXG4gICAgICAgIFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2VcblxuICAgICAgICAgICAgU21vb3RoLnNjcm9sbEZyYW1lcy5mb3JFYWNoKGZyYW1lID0+IHtcbiAgICAgICAgICAgICAgICBpZihmcmFtZS5oZWlnaHQgIT0gZnJhbWUuZWxlbWVudC5jbGllbnRIZWlnaHQpXG4gICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYoY2hhbmdlZCA9PSB0cnVlKSBcbiAgICAgICAgICAgICAgU21vb3RoLnJlZnJlc2goKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoU21vb3RoLm11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSlcbiAgICAgICAgICAgIFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgPSBudWxsXG5cbiAgICAgICAgfSwyMDApXG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBpbml0TXV0YXRpb25PYnNlcnZlciA6ICgpID0+IHtcblxuICAgICAgZm9yKHZhciBzY3JvbGxGcmFtZSBvZiBTbW9vdGguZG9tLnNjcm9sbEZyYW1lcykge1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoU21vb3RoLnJldHJpZ2dlcldpbmRvd1NpemVPbk11dGF0ZSlcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShzY3JvbGxGcmFtZSwge1xuICAgICAgICAgIGNoaWxkTGlzdCAgIDogdHJ1ZSxcbiAgICAgICAgICBhdHRyaWJ1dGVzICA6IHRydWUsXG4gICAgICAgICAgc3VidHJlZSAgICAgOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgZGVzdHJveSA6ICgpID0+IHtcblxuICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzLmZvckVhY2goZW50cnkgPT57XG4gICAgICAgIGVudHJ5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gICAgICB9KVxuXG4gICAgICBTbW9vdGguc2Nyb2xsRnJhbWVzLmZvckVhY2goZW50cnkgPT57XG4gICAgICAgIGVudHJ5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gICAgICB9KVxuXG4gICAgICBTbW9vdGgudHJhY2tlZEVsZW1lbnRzT2JzZXJ2ZXIgPSBudWxsXG4gICAgICBTbW9vdGgubWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lID0gbnVsbFxuICAgICAgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiA9IDBcbiAgICAgIFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgPSBudWxsXG4gICAgICBTbW9vdGgub25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA9IG51bGxcbiAgICAgIFNtb290aC5lYXNlID0gMC4wN1xuICAgICAgU21vb3RoLmxhc3RQb3NpdGlvbiA9IDBcbiAgICAgIFNtb290aC5vblNjcm9sbCA9IG51bGxcbiAgICAgIFNtb290aC5zdGFuZGFyZFNjcm9sbCA9IGZhbHNlXG4gICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHMgPSBbXVxuICAgICAgU21vb3RoLnRvcEJhckhlaWdodCA9IDBcbiAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMgPSBbXVxuICAgICAgU21vb3RoLnRpY2tpbmcgPSBmYWxzZVxuICAgICAgU21vb3RoLmRvbS5zY3JvbGxXaW5kb3cucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG5cbiAgICB9LFxuXG4gICAgYWRkRWxlbWVudHMgOiAoZWxlbWVudHMpID0+IHtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcblxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaCggZWxlbWVudCA9PiB7ICAgICAgIFxuICAgICAgICAgICAgICAgIFNtb290aC50cmFja2VkRWxlbWVudHNPYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXNvbHZlKClcblxuICAgICAgfSlcblxuICAgIH0sXG5cbiAgICBzY3JvbGxUbyA6IChlbGVtZW50KSA9PiB7XG4gICAgICBcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQpIC0gMTAwKVxuXG4gICAgICBpZihTbW9vdGguc3RhbmRhcmRTY3JvbGwgIT0gZmFsc2UpIHtcbiAgICAgICAgU21vb3RoLnRpY2tpbmcgPSB0cnVlXG4gICAgICAgIFNtb290aC5tYWluU2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoU21vb3RoLnJ1bilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U2Nyb2xsRWxlbWVudERhdGEgOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGwtZWxlbWVudF0nKVxuICAgICAgU21vb3RoLmFkZEVsZW1lbnRzKFNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMpIFxuXG4gICAgICBpZighU21vb3RoLmRvbS5zY3JvbGxFbGVtZW50cylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50cyA9IFtdXG4gICAgXG4gICAgICBTbW9vdGguZG9tLnNjcm9sbEVsZW1lbnRzLmZvckVhY2goIChlbGVtZW50LGkpID0+IHtcblxuICAgICAgICBjb25zdCBlbGVtZW50VG9wID0gU21vb3RoLmV4YWN0UG9zaXRpb25PZkVsZW1lbnQoZWxlbWVudClcblxuICAgICAgICB2YXIgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgICAgICB2YXIgY2FsbGJhY2sgID0gZmFsc2UsXG4gICAgICAgICAgICBmcm9tVmFsdWUgPSAtMSxcbiAgICAgICAgICAgIHRvVmFsdWUgICA9IDFcblxuICAgICAgICAvL0lzIGFueXRoaW5nIHNldCBvbiB0aGlzIGVsZW1lbnQgYXMgYSBjYWxsYmFjaz9cbiAgICAgICAgaWYoZWxlbWVudC5kYXRhc2V0LnBsb3RTbW9vdGhTY3JvbGxFbGVtZW50KSB7XG5cbiAgICAgICAgICBsZXQgYyA9IGVsZW1lbnQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudFxuXG4gICAgICAgICAgLy9GaXJzdCB1cCAtIGhhdmUgdmFsdWVzIGJlZW4gcGFzc2VkIHRvIHRoaXMgY2FsbGJhY2sgaW4gdGhpcyBmb3JtOiBjYWxsYmFjaygyLDUpXG4gICAgICAgICAgbGV0IHZhbHVlcyA9IGMuc3Vic3RyaW5nKCBjLmluZGV4T2YoICcoJyApICsgMSwgYy5pbmRleE9mKCAnKScgKSApXG4gICAgICAgICAgdmFsdWVzID0gdmFsdWVzLnNwbGl0KCcsJylcblxuICAgICAgICAgIC8vVmFsaWQgaWYgd2UgaGF2ZSAyLCBhbmQgZnJvbSBpcyBsZXNzIHRoYXQgdG8gdmFsdWVcbiAgICAgICAgICBpZih2YWx1ZXMubGVuZ3RoID09IDIgJiYgdmFsdWVzWzBdIDwgdmFsdWVzWzFdKSB7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBOdW1iZXIodmFsdWVzWzBdKVxuICAgICAgICAgICAgdG9WYWx1ZSA9IE51bWJlcih2YWx1ZXNbMV0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHBvdGVudGlhbEZ1bmN0aW9uID0gd2luZG93W2NdXG5cbiAgICAgICAgICBpZiAodHlwZW9mIHBvdGVudGlhbEZ1bmN0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcblxuICAgICAgICAgICAgY2FsbGJhY2sgPSBwb3RlbnRpYWxGdW5jdGlvbi5yZXBsYWNlKC9cXHMqXFwoLio/XFwpXFxzKi9nLCAnJylcblxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tTcGxpdCA9IGMucmVwbGFjZSgvXFxzKlxcKC4qP1xcKVxccyovZywgJycpLnNwbGl0KCcuJylcblxuICAgICAgICAgICAgaWYoY2FsbGJhY2tTcGxpdC5sZW5ndGggPT0gMikge1xuXG4gICAgICAgICAgICAgIHBvdGVudGlhbEZ1bmN0aW9uID0gd2luZG93W2NhbGxiYWNrU3BsaXRbMF1dW2NhbGxiYWNrU3BsaXRbMV1dXG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3RlbnRpYWxGdW5jdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBwb3RlbnRpYWxGdW5jdGlvblxuICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbml0aWFsT2Zmc2V0ID0gMFxuXG4gICAgICAgIGlmKGVsZW1lbnRUb3AgPCBTbW9vdGgud2luZG93SGVpZ2h0KVxuICAgICAgICAgIGluaXRpYWxPZmZzZXQgPSAoZWxlbWVudFRvcCArIGhlaWdodCkgLyAoU21vb3RoLndpbmRvd0hlaWdodCArIGhlaWdodCkgKiAodG9WYWx1ZSAtIGZyb21WYWx1ZSkgKyBmcm9tVmFsdWVcblxuXG4gICAgICAgIFxuICAgICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHNbaV0gPSB7XG4gICAgICAgICAgICBlbGVtZW50ICAgICAgICAgOiBlbGVtZW50LFxuICAgICAgICAgICAgdG9wICAgICAgICAgICAgIDogZWxlbWVudFRvcCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgICAgICA6IGhlaWdodCxcbiAgICAgICAgICAgIGJvdHRvbSAgICAgICAgICA6IGVsZW1lbnRUb3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgIGlzVmlzaWJsZSAgICAgICA6IGVsZW1lbnRUb3AgPCBTbW9vdGguY3VycmVudFBvc2l0aW9uICsgU21vb3RoLndpbmRvd0hlaWdodCAmJiBlbGVtZW50VG9wICsgaGVpZ2h0ID4gU21vb3RoLmN1cnJlbnRQb3NpdGlvbixcbiAgICAgICAgICAgIGluaXRpYWxPZmZzZXQgICA6IGluaXRpYWxPZmZzZXQsXG4gICAgICAgICAgICBjYWxsYmFjayAgICAgICAgOiBjYWxsYmFjayxcbiAgICAgICAgICAgIGZyb21WYWx1ZSAgICAgICA6IGZyb21WYWx1ZSxcbiAgICAgICAgICAgIHRvVmFsdWUgICAgICAgICA6IHRvVmFsdWUsXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gOiAwXG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbEVsZW1lbnRJZCA9IGlcblxuICAgICAgfSlcblxuXG4gICAgfSxcblxuICAgIHNldFRvcEJhckhlaWdodCA6ICgpID0+IHtcblxuICAgICAgaWYoU21vb3RoLmRvbS50b3BCYXIpXG4gICAgICAgIFNtb290aC50b3BCYXJIZWlnaHQgPSBTbW9vdGguZG9tLnRvcEJhci5jbGllbnRIZWlnaHRcblxuICAgIH0sXG5cbiAgICBzZXRTY3JvbGxGcmFtZURhdGEgOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5kb20uc2Nyb2xsRnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLWZyYW1lXScpXG5cbiAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMgPSBbXVxuICAgICAgdmFyIG5ld0hlaWdodCA9IDBcblxuICAgICAgU21vb3RoLmRvbS5zY3JvbGxGcmFtZXMuZm9yRWFjaCggZWxlbWVudCA9PiB7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudFRvcCA9IFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQpXG5cbiAgICAgICAgU21vb3RoLnNjcm9sbEZyYW1lcy5wdXNoKHtcbiAgICAgICAgICAgIGVsZW1lbnQgICAgICAgICAgIDogZWxlbWVudCxcbiAgICAgICAgICAgIHRvcCAgICAgICAgICAgICAgIDogZWxlbWVudFRvcCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgICAgICAgIDogZWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICBib3R0b20gICAgICAgICAgICA6IGVsZW1lbnRUb3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgIHN0aWNreSAgICAgICAgICAgIDogdHlwZW9mKGVsZW1lbnQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsU3RpY2t5KSAhPSAndW5kZWZpbmVkJyA/IHRydWUgOiBmYWxzZSwgXG4gICAgICAgICAgICBwYXJlbnRCb3R0b20gICAgICA6IGVsZW1lbnQucGFyZW50RWxlbWVudCA/IFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQucGFyZW50RWxlbWVudCkgKyBlbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IDogZmFsc2VcbiAgICAgICAgfSlcblxuICAgICAgfSlcblxuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSBgJHtTbW9vdGguZG9tLnNjcm9sbFdpbmRvdy5zY3JvbGxIZWlnaHR9cHhgXG5cbiAgICB9LFxuXG4gICAgdHJhY2tWaXNpYmxlRWxlbWVudHMgOiAoZW50cmllcykgPT4ge1xuICAgICAgIFxuICAgICAgICBlbnRyaWVzLmZvckVhY2goIGVudHJ5ID0+IHtcblxuICAgICAgICAgIGlmKGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIGVudHJ5KSB7XG4gICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgncGxvdFNtb290aFNjcm9sbEluVmlldycsJ3Bsb3RTbW9vdGhTY3JvbGxTZWVuT25jZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RTbW9vdGhTY3JvbGxJblZpZXcnKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKFNtb290aC5zY3JvbGxFbGVtZW50c1tlbnRyeS50YXJnZXQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudElkXSlcbiAgICAgICAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50c1tlbnRyeS50YXJnZXQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudElkXS5pc1Zpc2libGUgPSBlbnRyeS5pc0ludGVyc2VjdGluZ1xuXG5cbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgdHJhY2tTdGFuZGFyZFNjcm9sbEZyYW1lcyA6IChlbnRyaWVzKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCggZW50cnkgPT4ge1xuXG4gICAgICAgICAgaWYoZW50cnkuaXNJbnRlcnNlY3RpbmcgJiYgZW50cnkpIHtcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnLCdwbG90U21vb3RoU2Nyb2xsRnJhbWVTZWVuT25jZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycpXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHJlZnJlc2ggOiAoKSA9PiB7XG4gICAgICBpZihTbW9vdGguc3RhbmRhcmRTY3JvbGwpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICBcbiAgICAgIFNtb290aC53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgIFNtb290aC53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICBTbW9vdGguc2V0U2Nyb2xsRWxlbWVudERhdGEoKVxuICAgICAgU21vb3RoLnNldFNjcm9sbEZyYW1lRGF0YSgpXG4gICAgICBTbW9vdGguc2V0VG9wQmFySGVpZ2h0KClcbiAgICAgIFNtb290aC5zY3JvbGwoKVxuICAgIH0sXG5cbiAgICBydW4gOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5sYXN0UG9zaXRpb24gPSBTbW9vdGgubGVycChTbW9vdGgubGFzdFBvc2l0aW9uLCBTbW9vdGguY3VycmVudFBvc2l0aW9uLCBTbW9vdGguZWFzZSlcblxuICAgICAgaWYgKFNtb290aC5sYXN0UG9zaXRpb24gPCAuMSlcbiAgICAgICAgU21vb3RoLmxhc3RQb3NpdGlvbiA9IDBcbiAgICAgXG4gICAgICBsZXQgZGlmZiA9IFNtb290aC5jdXJyZW50UG9zaXRpb24gLSBTbW9vdGgubGFzdFBvc2l0aW9uXG5cbiAgICAgIGlmKE1hdGguYWJzKGRpZmYpIDwgMC41KSB7XG4gICAgICAgIFNtb290aC50aWNraW5nID0gZmFsc2VcbiAgICAgICAgZGlmZiA9IDBcbiAgICAgIH1cblxuICAgICAgdmFyIHZlbG9jaXR5ID0gZGlmZiAvIFNtb290aC53aW5kb3dXaWR0aFxuXG4gICAgICBTbW9vdGguc2V0UG9zaXRpb25PZkZyYW1lcygpXG5cbiAgICAgIFNtb290aC5maXJlT25TY3JvbGxFdmVudCh2ZWxvY2l0eSlcblxuICAgICAgU21vb3RoLnBvc2l0aW9uU2Nyb2xsRWxlbWVudHMoKVxuXG4gICAgICBpZihTbW9vdGgudGlja2luZyA9PSB0cnVlKVxuICAgICAgICBTbW9vdGgubWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFNtb290aC5ydW4pXG4gICAgICBcblxuICAgIH0sXG5cbiAgICBwb3NpdGlvblNjcm9sbEVsZW1lbnRzIDogKCkgPT4ge1xuXG4gICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHMuZm9yRWFjaChlbnRyeSA9PiB7XG5cbiAgICAgICAgICBpZihlbnRyeS5pc1Zpc2libGUgPT0gdHJ1ZSAmJiBlbnRyeS5jYWxsYmFjaykge1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSAoZW50cnkudG9wIC0gU21vb3RoLmxhc3RQb3NpdGlvbiArIGVudHJ5LmhlaWdodCkgLyAoU21vb3RoLndpbmRvd0hlaWdodCArIGVudHJ5LmhlaWdodCkgKiAoZW50cnkudG9WYWx1ZSAtIGVudHJ5LmZyb21WYWx1ZSkgKyBlbnRyeS5mcm9tVmFsdWUgLSBlbnRyeS5pbml0aWFsT2Zmc2V0XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGVudHJ5LmN1cnJlbnRQb3NpdGlvbiAhPSBjdXJyZW50UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgICBlbnRyeS5jdXJyZW50UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb25cblxuICAgICAgICAgICAgICBlbnRyeS5jYWxsYmFjayhlbnRyeS5lbGVtZW50LGN1cnJlbnRQb3NpdGlvbilcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICB9KVxuXG4gICAgfSxcblxuICAgIGZpcmVPblNjcm9sbEV2ZW50IDogKHZlbG9jaXR5KSA9PiB7XG5cbiAgICAgIGlmKHR5cGVvZihTbW9vdGgub25TY3JvbGwpID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgIFxuICAgICAgICBpZihTbW9vdGgub25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgU21vb3RoLm9uU2Nyb2xsQ2FsbGJhY2tUaHJvdHRsZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIFNtb290aC5vblNjcm9sbChTbW9vdGguZG9tLnNjcm9sbEZyYW1lcyx2ZWxvY2l0eSlcbiAgICAgICAgICAgIFNtb290aC5vblNjcm9sbENhbGxiYWNrVGhyb3R0bGVyID0gbnVsbFxuXG4gICAgICAgICAgfSw1MClcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgc2V0UG9zaXRpb25PZkZyYW1lcyA6ICgpID0+IHtcblxuICAgICAgZm9yKHZhciBzY3JvbGxGcmFtZSBvZiBTbW9vdGguc2Nyb2xsRnJhbWVzKSB7XG5cbiAgICAgICAgICB2YXIgd2luZG93U2Nyb2xsUG9zaXRpb24gPSBTbW9vdGgubGFzdFBvc2l0aW9uXG5cbiAgICAgICAgICBpZihzY3JvbGxGcmFtZS5zdGlja3kgJiYgc2Nyb2xsRnJhbWUucGFyZW50Qm90dG9tKSB7XG4gICAgICAgICAgICB3aW5kb3dTY3JvbGxQb3NpdGlvbiA9IFNtb290aC5jYWxjUG9zaXRpb25PZlN0aWNreUVsZW1lbnQoc2Nyb2xsRnJhbWUsIHdpbmRvd1Njcm9sbFBvc2l0aW9uKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKHdpbmRvd1Njcm9sbFBvc2l0aW9uID4gc2Nyb2xsRnJhbWUuYm90dG9tIHx8IHdpbmRvd1Njcm9sbFBvc2l0aW9uICsgU21vb3RoLndpbmRvd0hlaWdodCA8IHNjcm9sbEZyYW1lLnRvcCkge1xuICAgICAgICAgICAgc2Nyb2xsRnJhbWUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnKVxuICAgICAgICAgICAgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbEZyYW1lLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGxvdFNtb290aFNjcm9sbEZyYW1lSW5WaWV3JywncGxvdFNtb290aFNjcm9sbEZyYW1lU2Vlbk9uY2UnKVxuICAgICAgICAgICAgc2Nyb2xsRnJhbWUuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwgLSR7d2luZG93U2Nyb2xsUG9zaXRpb259cHgsIDApYFxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgc2Nyb2xsIDogKCkgPT4ge1xuICAgICAgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICBpZihTbW9vdGgudGlja2luZyA9PSBmYWxzZSkge1xuICAgICAgICBTbW9vdGgudGlja2luZyA9IHRydWVcbiAgICAgICAgU21vb3RoLm1haW5TY3JvbGxBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShTbW9vdGgucnVuKSBcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U3R5bGVzIDogKCkgPT4ge1xuXG4gICAgICBPYmplY3QuYXNzaWduKFNtb290aC5kb20uc2Nyb2xsV2luZG93LnN0eWxlLHtcbiAgICAgICAgcG9zaXRpb24gIDogJ2ZpeGVkJyxcbiAgICAgICAgdG9wICAgICAgIDogMCxcbiAgICAgICAgbGVmdCAgICAgIDogMCxcbiAgICAgICAgaGVpZ2h0ICAgIDogJzEwMCUnLFxuICAgICAgICB3aWR0aCAgICAgOiAnMTAwJScsXG4gICAgICAgIG92ZXJmbG93ICA6ICdoaWRkZW4nXG4gICAgICB9KVxuXG4gICAgfSxcblxuICAgIGNhbGNQb3NpdGlvbk9mU3RpY2t5RWxlbWVudCA6IChlbnRyeSwgcG9zaXRpb24pID0+IHtcblxuICAgICAgLy9JZiB0aGUgaXRlbSBpcyBiZWxvdyB0aGUgYm90dG9tIG9mIGl0J3MgcGFyZW50XG4gICAgICBpZihwb3NpdGlvbiArIFNtb290aC50b3BCYXJIZWlnaHQgPj0gZW50cnkucGFyZW50Qm90dG9tKVxuICAgICAgICByZXR1cm4gcG9zaXRpb25cbiAgICAgIFxuXG4gICAgICBpZihlbnRyeS5wYXJlbnRCb3R0b20gLSBwb3NpdGlvbiAtIFNtb290aC50b3BCYXJIZWlnaHQgPD0gZW50cnkuaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBlbnRyeS50b3AgLSBlbnRyeS5wYXJlbnRCb3R0b20gKyBwb3NpdGlvbiArIGVudHJ5LmhlaWdodFxuICAgICAgfVxuXG4gICAgICBpZihwb3NpdGlvbiArIFNtb290aC50b3BCYXJIZWlnaHQgPiBlbnRyeS50b3ApIFxuICAgICAgICByZXR1cm4gZW50cnkudG9wIC0gU21vb3RoLnRvcEJhckhlaWdodCAgIFxuXG5cbiAgICAgIHJldHVybiBwb3NpdGlvblxuXG4gICAgfSxcblxuICAgIGxlcnA6IChhLGIsbikgPT4gIHtcblxuICAgICAgICByZXR1cm4gKDEgLSBuKSAqIGEgKyBuICogYlxuXG4gICAgfSxcblxuICAgIGV4YWN0UG9zaXRpb25PZkVsZW1lbnQgOiAoZWxlbWVudCkgPT4ge1xuICAgICAgdmFyIGVsID0gZWxlbWVudCxcbiAgICAgIG9mZnNldFRvcCAgPSAwO1xuXG4gICAgICBkb3tcbiAgICAgICAgICBvZmZzZXRUb3AgICs9IGVsLm9mZnNldFRvcDtcblxuICAgICAgICAgIGVsID0gZWwub2Zmc2V0UGFyZW50O1xuICAgICAgfSB3aGlsZSggZWwgKTtcblxuICAgICAgcmV0dXJuIG9mZnNldFRvcFxuXG4gICAgfVxuXG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IFNtb290aFxuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBCb2R5U2Nyb2xsTG9jayAgID0gcmVxdWlyZSgnYm9keS1zY3JvbGwtbG9jaycpLFxuICAgICAgICBMYXp5TG9hZCAgICAgICAgID0gcmVxdWlyZSgnLi9sYXp5bG9hZCcpLFxuICAgICAgICBTeW5jU2Nyb2xsICAgICAgID0gcmVxdWlyZSgnLi9zeW5jc2Nyb2xsJyksIFxuICAgICAgICBQbG90XG5cbiAgICBQbG90ID0ge1xuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgUGxvdC5jcmVhdGVMaXN0ZW5lcnMoKVxuICAgICAgICAgICAgU3luY1Njcm9sbC5pbml0KCkgXG4gICAgICAgICAgICBQbG90LmFuaW1hdGVCYW5uZXJOb3RpZmljYXRpb25zKCkgXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICAgICBcdGNvbnN0IGJ1cmdlck1lbnVUcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tbWVudVRyaWdnZXInKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihidXJnZXJNZW51VHJpZ2dlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgYnVyZ2VyTWVudVRyaWdnZXIgb2YgYnVyZ2VyTWVudVRyaWdnZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1cmdlck1lbnVUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxQbG90LnRvZ2dsZUJ1cmdlcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNpZGVTd2lwZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxvdFNpZGVTd2lwZXMnKVxuXG4gICAgICAgICAgICBpZihzaWRlU3dpcGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBQbG90LnNpZGVTd2lwZXMoc2lkZVN3aXBlcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGFuaW1hdGVCYW5uZXJOb3RpZmljYXRpb25zIDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1iYW5uZXJOb3RpZmljYXRpb24nKVxuXG4gICAgICAgICAgICBpZihiYW5uZXIpXG4gICAgICAgICAgICAgICAgaWYoYmFubmVyLmRhdGFzZXQuYW5pbWF0aW9uVHlwZSA9PSAnYWx3YXlzJykge1xuICAgICAgICAgICAgICAgICAgICBQbG90LmJ1aWxkQmFubmVyUmVwZWF0aW5nVGV4dChiYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsb3QuYnVpbGRCYW5uZXJSZXBlYXRpbmdUZXh0KGJhbm5lcilcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBQbG90LmNoZWNrVG9TZWVJZldlTmVlZFRvQW5pbWF0aW9uQmFubmVyKGJhbm5lcilcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgUGxvdC5jaGVja1RvU2VlSWZXZU5lZWRUb0FuaW1hdGlvbkJhbm5lcihiYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNoZWNrVG9TZWVJZldlTmVlZFRvQW5pbWF0aW9uQmFubmVyIDogYmFubmVyID0+IHtcblxuICAgICAgICAgICAgYmFubmVyLmlubmVySFRNTCA9IGA8ZGl2PiR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX08L2Rpdj5gXG4gICAgICAgICAgICBjb25zdCBkaXYxID0gYmFubmVyLnF1ZXJ5U2VsZWN0b3IoJ2RpdjpudGgtb2YtdHlwZSgxKScpXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGRpdjEuc2Nyb2xsV2lkdGggPiB3aW5kb3dXaWR0aCkge1xuICAgICAgICAgICAgICAgIGJhbm5lci5jbGFzc0xpc3QuYWRkKCd3aXRoQW5pbWF0aW9uJylcbiAgICAgICAgICAgICAgICBQbG90LmJ1aWxkQmFubmVyUmVwZWF0aW5nVGV4dChiYW5uZXIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICBiYW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnd2l0aEFuaW1hdGlvbicpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBidWlsZEJhbm5lclJlcGVhdGluZ1RleHQgOiBiYW5uZXIgPT4ge1xuXG4gICAgICAgICAgICBiYW5uZXIuaW5uZXJIVE1MID0gYDxkaXY+JHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfTwvZGl2PjxkaXY+JHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfTwvZGl2PmBcbiAgICAgICAgICAgIGNvbnN0IGRpdjEgPSBiYW5uZXIucXVlcnlTZWxlY3RvcignZGl2Om50aC1vZi10eXBlKDEpJylcbiAgICAgICAgICAgIGNvbnN0IGRpdjIgPSBiYW5uZXIucXVlcnlTZWxlY3RvcignZGl2Om50aC1vZi10eXBlKDIpJylcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcblxuICAgICAgICAgICAgZGl2MS5zdHlsZS5hbmltYXRpb25EdXJhdGlvbj0od2luZG93V2lkdGgvMjApK1wic1wiXG4gICAgICAgICAgICBkaXYyLnN0eWxlLmFuaW1hdGlvbkR1cmF0aW9uPSh3aW5kb3dXaWR0aC8yMCkrXCJzXCJcblxuICAgICAgICAgICAgdmFyIGkgID0gMFxuXG4gICAgICAgICAgICB3aGlsZShkaXYxLnNjcm9sbFdpZHRoIDwgd2luZG93V2lkdGggJiYgaSA8IDEwMCkge1xuICAgICAgICAgICAgICAgIGRpdjEuaW5uZXJIVE1MID0gZGl2MS5pbm5lckhUTUwgKyBgICR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX1gXG4gICAgICAgICAgICAgICAgZGl2Mi5pbm5lckhUTUwgPSBkaXYyLmlubmVySFRNTCArIGAgJHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfWBcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaWRlU3dpcGVzIDogKHNpZGVTd2lwZXMpID0+IHtcblxuICAgICAgICAgICAgZm9yKHZhciBzaWRlU3dpcGUgb2Ygc2lkZVN3aXBlcykge1xuXG4gICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KHNpZGVTd2lwZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkgKyAxIDwgcGFyc2VJbnQoc2lkZVN3aXBlLnNjcm9sbFdpZHRoKSkge1xuXG5cbiAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB0b2dnbGVCdXJnZXIgOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLWJ1cmdlck1lbnUnKVxuXG4gICAgICAgICAgICBpZighZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYnVyZ2VyT3BlbicpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2J1cmdlck9wZW4nKVxuICAgICAgICAgICAgICAgIEJvZHlTY3JvbGxMb2NrLmRpc2FibGVCb2R5U2Nyb2xsKGJ1cmdlck1lbnUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdidXJnZXJPcGVuJylcbiAgICAgICAgICAgICAgICBCb2R5U2Nyb2xsTG9jay5lbmFibGVCb2R5U2Nyb2xsKGJ1cmdlck1lbnUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBpc1BhZ2UgOiBzbHVnID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYWdlLScrc2x1ZylcblxuICAgICAgICB9LFxuXG4gICAgICAgIGZpeFZoIDogKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBGaXJzdCB3ZSBnZXQgdGhlIHZpZXdwb3J0IGhlaWdodCBhbmQgd2UgbXVsdGlwbGUgaXQgYnkgMSUgdG8gZ2V0IGEgdmFsdWUgZm9yIGEgdmggdW5pdFxuICAgICAgICAgICAgbGV0IHZoID0gd2luZG93LmlubmVySGVpZ2h0ICogMC4wMVxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXZoJywgYCR7dmh9cHhgKVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpc1RvdWNoRGV2aWNlOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBwcmVmaXhlcyA9ICcgLXdlYmtpdC0gLW1vei0gLW8tIC1tcy0gJy5zcGxpdCgnICcpXG4gICAgICAgICAgICB2YXIgbXEgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEocXVlcnkpLm1hdGNoZXNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCkge1xuICAgICAgICAgICAgXHRkb2N1bWVudC5ib2R5LmFkZENsYXNzKCdpc1RvdWNoRGV2aWNlJykgIFxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBxdWVyeSA9IFsnKCcsIHByZWZpeGVzLmpvaW4oJ3RvdWNoLWVuYWJsZWQpLCgnKSwgJ3Bsb3QnLCAnKSddLmpvaW4oJycpXG4gICAgICAgICAgICByZXR1cm4gbXEocXVlcnkpXG4gICAgICAgIH0sXG5cbiAgICAgICAgYXJlV2VBdFRoZVRvcCA6IHNjcm9sbFRvcCA9PiB7XG5cbiAgICAgICAgICAgIGlmKHNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbGVkJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxlZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZFRlbXBsYXRlUGFydCA6IChhcmdzKSA9PiB7IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQYXJ0ICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBhY3Rpb24gICAgICAgICAgOiAncGxvdExvYWRUZW1wbGF0ZVBhcnQnLCAvL1RoaXMgaXMgdGhlIGFjdGlvbiBmaXJlZCBpbnRvIG91ciBQbG90U2l0ZSBQSFAgc2V0dXAucGhwIGZpbGVcbiAgICAgICAgICAgICAgICBkYXRhICAgICAgICAgICAgOiB7fSxcbiAgICAgICAgICAgICAgICByZXR1cm5PcldyaXRlICAgOiAnd3JpdGUnLCAvLyh3cml0ZXxyZXR1cm4pIGVpdGhlciBhZGRzIGNvbnRlbnQgdG8gY29udGVudEFyZWEsIG9yIHJldHVybnMgbmV3IEhUTUwgaW4gdGhlIHByb21pc2VcbiAgICAgICAgICAgICAgICBjb250ZW50QXJlYSAgICAgOiAnLkpTLS1hamF4VGFyZ2V0QXJlYScsIFxuICAgICAgICAgICAgICAgIGFwcGVuZCAgICAgICAgICA6IGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBhcmdzKVxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIHRyeSB7IFxuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnJldHVybk9yV3JpdGUgPT0gJ3dyaXRlJylcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZXR0aW5ncy5jb250ZW50QXJlYSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRlbnRBcmVhIG5lZWRzIHRvIGJlIGEgdmFsaWQgc2VsZWN0b3IhJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoY29udGVudEFyZWEgPT0gbnVsbCAmJiBzZXR0aW5ncy5yZXR1cm5PcldyaXRlID09ICd3cml0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ291bGRuXFwndCBmaW5kIHNlbGVjdG9yIGZvciBjb250ZW50QXJlYSBvbiBwYWdlLicpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnRlbXBsYXRlUGFydCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvdWxkblxcJ3QgZmluZCB0ZW1wbGF0ZSBwYXJ0LiBNYWtlIHN1cmUgeW91IHNldCBvbmUgYXMgdGVtcGxhdGVQYXJ0LCBmb3IgZXhhbXBsZSBwYXJ0cy9hamF4LWNvbnRlbnQnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0eXBlb2Yoc2V0dGluZ3MuYXBwZW5kKSAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVmFsdWUgcGFzc2VkIHRvIGFwcGVuZCB3YXMgbm90IGEgYm9vbGVhbi4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5yZXR1cm5PcldyaXRlID09ICd3cml0ZScpXG4gICAgICAgICAgICAgICAgY29udGVudEFyZWEuY2xhc3NMaXN0LmFkZCgncGxvdExvYWRpbmcnKVxuXG4gICAgICAgICAgICBzZXR0aW5ncy5kYXRhID0ge1xuICAgICAgICAgICAgICAgIGRhdGEgICAgICAgICAgICA6IHNldHRpbmdzLmRhdGEsXG4gICAgICAgICAgICAgICAgYWN0aW9uICAgICAgICAgIDogc2V0dGluZ3MuYWN0aW9uLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUGFydCAgICA6IHNldHRpbmdzLnRlbXBsYXRlUGFydFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcXVlcnlTdHJpbmcgPSBQbG90LnRvUXVlcnlTdHJpbmcoc2V0dGluZ3MuZGF0YSlcbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2goYXUsIHtcblxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBxdWVyeVN0cmluZyxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ1xuXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuanNvbigpXG5cbiAgICAgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnJldHVybk9yV3JpdGUgPT0gJ3dyaXRlJylcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEuY2xhc3NMaXN0LnJlbW92ZSgncGxvdExvYWRpbmcnKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MucmV0dXJuT3JXcml0ZSAhPT0gJ3dyaXRlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuaHRtbFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLmFwcGVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCByZXN1bHQuaHRtbClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50QXJlYS5pbm5lckhUTUwgPSByZXN1bHQuaHRtbFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1sYXp5TG9hZCcpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTGF6eUxvYWQub2JzZXJ2ZXIub2JzZXJ2ZShlbClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5odG1sXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsZXJyb3IpXG5cbiAgICAgICAgICAgIH0pXG5cblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0ZUZvcm1hdCA6IChkYXRlLGZvcm1hdCkgPT4ge1xuXG4gICAgICAgICAgICBpZihmb3JtYXQgPT0gJ2RTIE0nKVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldERhdGUoKSArIFBsb3QuZ2V0T3JkaW5hbChkYXRlLmdldERhdGUoKSkgKyAnICcgKyBQbG90LmdldE1vbnRoKGRhdGUpXG5cbiAgICAgICAgICAgIGlmKGZvcm1hdCA9PSAnTSBkUycpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsb3QuZ2V0TW9udGgoZGF0ZSkgKyAnICcgKyBkYXRlLmdldERhdGUoKSArIFBsb3QuZ2V0T3JkaW5hbChkYXRlLmdldERhdGUoKSkgXG5cbiAgICAgICAgICAgIGlmKGZvcm1hdCA9PSAnZC9tL3knKVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldERhdGUoKSArICcvJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICcvJyArIGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLnN1YnN0cigtMilcblxuICAgICAgICAgICAgaWYoZm9ybWF0ID09ICdtL2QveScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICcvJyArIGRhdGUuZ2V0RGF0ZSgpICsgJy8nICsgZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkuc3Vic3RyKC0yKVxuXG4gICAgICAgICAgICByZXR1cm4gUGxvdC5nZXREYXlPZldlZWsoZGF0ZSlcbiAgICAgICAgIH0sXG5cbiAgICAgICAgZ2V0RGF5T2ZXZWVrIDogZGF0ZSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRheXMgPSBbXG4gICAgICAgICAgICAgICAgJ1N1bmRheScsXG4gICAgICAgICAgICAgICAgJ01vbmRheScsXG4gICAgICAgICAgICAgICAgJ1R1ZXNkYXknLFxuICAgICAgICAgICAgICAgICdXZWRuZXNkYXknLFxuICAgICAgICAgICAgICAgICdUaHVyc2RheScsXG4gICAgICAgICAgICAgICAgJ0ZyaWRheScsXG4gICAgICAgICAgICAgICAgJ1NhdHVyZGF5J1xuICAgICAgICAgICAgXVxuXG4gICAgICAgICAgICByZXR1cm4gZGF5c1tkYXRlLmdldERheSgpXVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0T3JkaW5hbCA6IG51bWJlciA9PiB7XG5cbiAgICAgICAgICAgICAgaWYgKG51bWJlciA+IDMgJiYgbnVtYmVyIDwgMjEpIHJldHVybiAndGgnO1xuICAgICAgICAgICAgICBzd2l0Y2ggKG51bWJlciAlIDEwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOiAgcmV0dXJuIFwic3RcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDI6ICByZXR1cm4gXCJuZFwiO1xuICAgICAgICAgICAgICAgIGNhc2UgMzogIHJldHVybiBcInJkXCI7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwidGhcIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cblxuICAgICAgICBnZXRNb250aCA6IGRhdGUgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBtb250aE5hbWVzID0gW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsXG4gICAgICAgICAgICAgIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHJldHVybiBtb250aE5hbWVzW2RhdGUuZ2V0TW9udGgoKV1cbiAgICAgICAgfSxcblxuICAgICAgICB0b1F1ZXJ5U3RyaW5nIDogKG9iaiwgcHJlZml4KSA9PiB7XG4gICAgICAgICAgICB2YXIgc3RyID0gW10sIGssIHY7XG4gICAgICAgICAgICBmb3IodmFyIHAgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkocCkpIHtjb250aW51ZTt9IC8vIHNraXAgdGhpbmdzIGZyb20gdGhlIHByb3RvdHlwZVxuICAgICAgICAgICAgICAgIGlmICh+cC5pbmRleE9mKCdbJykpIHtcbiAgICAgICAgICAgICAgICAgICAgayA9IHByZWZpeCA/IHByZWZpeCArIFwiW1wiICsgcC5zdWJzdHJpbmcoMCwgcC5pbmRleE9mKCdbJykpICsgXCJdXCIgKyBwLnN1YnN0cmluZyhwLmluZGV4T2YoJ1snKSkgOiBwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGsgPSBwcmVmaXggPyBwcmVmaXggKyBcIltcIiArIHAgKyBcIl1cIiA6IHA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHYgPSBvYmpbcF07XG4gICAgICAgICAgICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT0gXCJvYmplY3RcIiA/XG4gICAgICAgICAgICAgICAgICBQbG90LnRvUXVlcnlTdHJpbmcodiwgaykgOlxuICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFBsb3RcblxufSgpKVxuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBcbiAgICBTeW5jc2Nyb2xsXG5cbiAgICBTeW5jc2Nyb2xsID0ge1xuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgdmFyIFdpZHRoICAgICAgICAgICA9ICdXaWR0aCcsXG4gICAgICAgICAgICBIZWlnaHQgICAgICAgICAgICAgID0gJ0hlaWdodCcsXG4gICAgICAgICAgICBUb3AgICAgICAgICAgICAgICAgID0gJ1RvcCcsXG4gICAgICAgICAgICBMZWZ0ICAgICAgICAgICAgICAgID0gJ0xlZnQnLFxuICAgICAgICAgICAgc2Nyb2xsICAgICAgICAgICAgICA9ICdzY3JvbGwnLFxuICAgICAgICAgICAgY2xpZW50ICAgICAgICAgICAgICA9ICdjbGllbnQnLFxuICAgICAgICAgICAgRXZlbnRMaXN0ZW5lciAgICAgICA9ICdFdmVudExpc3RlbmVyJyxcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIgICAgPSAnYWRkJyArIEV2ZW50TGlzdGVuZXIsXG4gICAgICAgICAgICBsZW5ndGggICAgICAgICAgICAgID0gJ2xlbmd0aCcsXG4gICAgICAgICAgICBNYXRoX3JvdW5kICAgICAgICAgID0gTWF0aC5yb3VuZCxcbiAgICAgICAgICAgIG5hbWVzICAgICAgICAgICAgICAgPSB7fSxcbiAgICAgICAgICAgIHJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzeW5jJytzY3JvbGwpXG5cbiAgICAgICAgICAgICAgICAvLyBjbGVhcmluZyBleGlzdGluZyBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICB2YXIgaSwgaiwgZWwsIGZvdW5kLCBuYW1lXG4gICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIG5hbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hbWVzW25hbWVdW2xlbmd0aF07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzW25hbWVdW2ldWydyZW1vdmUnK0V2ZW50TGlzdGVuZXJdKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwsIG5hbWVzW25hbWVdW2ldLnN5biwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHNldHRpbmctdXAgdGhlIG5ldyBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWxlbXNbbGVuZ3RoXTspIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBqID0gMFxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsZW1zW2krK11cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobmFtZSA9IGVsLmdldEF0dHJpYnV0ZSgnbmFtZScpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFtZSBhdHRyaWJ1dGUgaXMgbm90IHNldFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsID0gZWxbc2Nyb2xsKydlciddfHxlbCAgLy8gbmVlZGVkIGZvciBpbnRlbmNlXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2VhcmNoaW5nIGZvciBleGlzdGluZyBlbnRyeSBpbiBhcnJheSBvZiBuYW1lcztcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VhcmNoaW5nIGZvciB0aGUgZWxlbWVudCBpbiB0aGF0IGVudHJ5XG4gICAgICAgICAgICAgICAgICAgIGZvciAoO2ogPCAobmFtZXNbbmFtZV0gPSBuYW1lc1tuYW1lXXx8W10pW2xlbmd0aF07KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCB8PSBuYW1lc1tuYW1lXVtqKytdID09IGVsXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc1tuYW1lXS5wdXNoKGVsKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWwuZVggPSBlbC5lWSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKGVsLCBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbFthZGRFdmVudExpc3RlbmVyXShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtcyA9IG5hbWVzW25hbWVdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFggPSBlbFtzY3JvbGwrTGVmdF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFkgPSBlbFtzY3JvbGwrVG9wXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4UmF0ZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxYIC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbFtzY3JvbGwrV2lkdGhdIC0gZWxbY2xpZW50K1dpZHRoXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHlSYXRlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVsW3Njcm9sbCtIZWlnaHRdIC0gZWxbY2xpZW50K0hlaWdodF0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZVggPSBzY3JvbGxYICE9IGVsLmVYXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cGRhdGVZID0gc2Nyb2xsWSAhPSBlbC5lWVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdGhlckVsLCBpID0gMFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmVYID0gc2Nyb2xsWFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5lWSA9IHNjcm9sbFlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDtpIDwgZWxlbXNbbGVuZ3RoXTspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWwgPSBlbGVtc1tpKytdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJFbCAhPSBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVYICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW3Njcm9sbCtMZWZ0XSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc2Nyb2xsWCA9IG90aGVyRWwuZVggPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoeFJhdGUgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3RoZXJFbFtzY3JvbGwrV2lkdGhdIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbY2xpZW50K1dpZHRoXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbFtzY3JvbGwrTGVmdF0gPSBzY3JvbGxYXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVZICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW3Njcm9sbCtUb3BdIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzY3JvbGxZID0gb3RoZXJFbC5lWSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aF9yb3VuZCh5UmF0ZSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvdGhlckVsW3Njcm9sbCtIZWlnaHRdIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbY2xpZW50K0hlaWdodF0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbc2Nyb2xsK1RvcF0gPSBzY3JvbGxZXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KShlbCwgbmFtZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgcmVzZXQoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbYWRkRXZlbnRMaXN0ZW5lcl0oXCJsb2FkXCIsIHJlc2V0LCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTeW5jc2Nyb2xsXG5cbn0oKSlcbiIsIi8qKlxuICogbWF0Y2hlc1NlbGVjdG9yIHYyLjAuMlxuICogbWF0Y2hlc1NlbGVjdG9yKCBlbGVtZW50LCAnLnNlbGVjdG9yJyApXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UgKi9cbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93Lm1hdGNoZXNTZWxlY3RvciA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbWF0Y2hlc01ldGhvZCA9ICggZnVuY3Rpb24oKSB7XG4gICAgdmFyIEVsZW1Qcm90byA9IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZTtcbiAgICAvLyBjaGVjayBmb3IgdGhlIHN0YW5kYXJkIG1ldGhvZCBuYW1lIGZpcnN0XG4gICAgaWYgKCBFbGVtUHJvdG8ubWF0Y2hlcyApIHtcbiAgICAgIHJldHVybiAnbWF0Y2hlcyc7XG4gICAgfVxuICAgIC8vIGNoZWNrIHVuLXByZWZpeGVkXG4gICAgaWYgKCBFbGVtUHJvdG8ubWF0Y2hlc1NlbGVjdG9yICkge1xuICAgICAgcmV0dXJuICdtYXRjaGVzU2VsZWN0b3InO1xuICAgIH1cbiAgICAvLyBjaGVjayB2ZW5kb3IgcHJlZml4ZXNcbiAgICB2YXIgcHJlZml4ZXMgPSBbICd3ZWJraXQnLCAnbW96JywgJ21zJywgJ28nIF07XG5cbiAgICBmb3IgKCB2YXIgaT0wOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICB2YXIgbWV0aG9kID0gcHJlZml4ICsgJ01hdGNoZXNTZWxlY3Rvcic7XG4gICAgICBpZiAoIEVsZW1Qcm90b1sgbWV0aG9kIF0gKSB7XG4gICAgICAgIHJldHVybiBtZXRob2Q7XG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuXG4gIHJldHVybiBmdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkge1xuICAgIHJldHVybiBlbGVtWyBtYXRjaGVzTWV0aG9kIF0oIHNlbGVjdG9yICk7XG4gIH07XG5cbn0pKTtcbiIsIi8qKlxuICogRXZFbWl0dGVyIHYxLjEuMFxuICogTGlsJyBldmVudCBlbWl0dGVyXG4gKiBNSVQgTGljZW5zZVxuICovXG5cbi8qIGpzaGludCB1bnVzZWQ6IHRydWUsIHVuZGVmOiB0cnVlLCBzdHJpY3Q6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggZ2xvYmFsLCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgd2luZG93ICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EIC0gUmVxdWlyZUpTXG4gICAgZGVmaW5lKCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlMgLSBCcm93c2VyaWZ5LCBXZWJwYWNrXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgZ2xvYmFsLkV2RW1pdHRlciA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KCB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBFdkVtaXR0ZXIoKSB7fVxuXG52YXIgcHJvdG8gPSBFdkVtaXR0ZXIucHJvdG90eXBlO1xuXG5wcm90by5vbiA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICBpZiAoICFldmVudE5hbWUgfHwgIWxpc3RlbmVyICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBzZXQgZXZlbnRzIGhhc2hcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgLy8gc2V0IGxpc3RlbmVycyBhcnJheVxuICB2YXIgbGlzdGVuZXJzID0gZXZlbnRzWyBldmVudE5hbWUgXSA9IGV2ZW50c1sgZXZlbnROYW1lIF0gfHwgW107XG4gIC8vIG9ubHkgYWRkIG9uY2VcbiAgaWYgKCBsaXN0ZW5lcnMuaW5kZXhPZiggbGlzdGVuZXIgKSA9PSAtMSApIHtcbiAgICBsaXN0ZW5lcnMucHVzaCggbGlzdGVuZXIgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ub25jZSA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICBpZiAoICFldmVudE5hbWUgfHwgIWxpc3RlbmVyICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBhZGQgZXZlbnRcbiAgdGhpcy5vbiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICAvLyBzZXQgb25jZSBmbGFnXG4gIC8vIHNldCBvbmNlRXZlbnRzIGhhc2hcbiAgdmFyIG9uY2VFdmVudHMgPSB0aGlzLl9vbmNlRXZlbnRzID0gdGhpcy5fb25jZUV2ZW50cyB8fCB7fTtcbiAgLy8gc2V0IG9uY2VMaXN0ZW5lcnMgb2JqZWN0XG4gIHZhciBvbmNlTGlzdGVuZXJzID0gb25jZUV2ZW50c1sgZXZlbnROYW1lIF0gPSBvbmNlRXZlbnRzWyBldmVudE5hbWUgXSB8fCB7fTtcbiAgLy8gc2V0IGZsYWdcbiAgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXSA9IHRydWU7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5vZmYgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbIGV2ZW50TmFtZSBdO1xuICBpZiAoICFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKCBsaXN0ZW5lciApO1xuICBpZiAoIGluZGV4ICE9IC0xICkge1xuICAgIGxpc3RlbmVycy5zcGxpY2UoIGluZGV4LCAxICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLmVtaXRFdmVudCA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGFyZ3MgKSB7XG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXTtcbiAgaWYgKCAhbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBjb3B5IG92ZXIgdG8gYXZvaWQgaW50ZXJmZXJlbmNlIGlmIC5vZmYoKSBpbiBsaXN0ZW5lclxuICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoMCk7XG4gIGFyZ3MgPSBhcmdzIHx8IFtdO1xuICAvLyBvbmNlIHN0dWZmXG4gIHZhciBvbmNlTGlzdGVuZXJzID0gdGhpcy5fb25jZUV2ZW50cyAmJiB0aGlzLl9vbmNlRXZlbnRzWyBldmVudE5hbWUgXTtcblxuICBmb3IgKCB2YXIgaT0wOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXVxuICAgIHZhciBpc09uY2UgPSBvbmNlTGlzdGVuZXJzICYmIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF07XG4gICAgaWYgKCBpc09uY2UgKSB7XG4gICAgICAvLyByZW1vdmUgbGlzdGVuZXJcbiAgICAgIC8vIHJlbW92ZSBiZWZvcmUgdHJpZ2dlciB0byBwcmV2ZW50IHJlY3Vyc2lvblxuICAgICAgdGhpcy5vZmYoIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgICAgIC8vIHVuc2V0IG9uY2UgZmxhZ1xuICAgICAgZGVsZXRlIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF07XG4gICAgfVxuICAgIC8vIHRyaWdnZXIgbGlzdGVuZXJcbiAgICBsaXN0ZW5lci5hcHBseSggdGhpcywgYXJncyApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5hbGxPZmYgPSBmdW5jdGlvbigpIHtcbiAgZGVsZXRlIHRoaXMuX2V2ZW50cztcbiAgZGVsZXRlIHRoaXMuX29uY2VFdmVudHM7XG59O1xuXG5yZXR1cm4gRXZFbWl0dGVyO1xuXG59KSk7XG4iLCIvKipcbiAqIEZpenp5IFVJIHV0aWxzIHYyLjAuN1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlLCBzdHJpY3Q6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLypqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKmdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3RvcidcbiAgICBdLCBmdW5jdGlvbiggbWF0Y2hlc1NlbGVjdG9yICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgbWF0Y2hlc1NlbGVjdG9yICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdkZXNhbmRyby1tYXRjaGVzLXNlbGVjdG9yJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LmZpenp5VUlVdGlscyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cubWF0Y2hlc1NlbGVjdG9yXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgbWF0Y2hlc1NlbGVjdG9yICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHt9O1xuXG4vLyAtLS0tLSBleHRlbmQgLS0tLS0gLy9cblxuLy8gZXh0ZW5kcyBvYmplY3RzXG51dGlscy5leHRlbmQgPSBmdW5jdGlvbiggYSwgYiApIHtcbiAgZm9yICggdmFyIHByb3AgaW4gYiApIHtcbiAgICBhWyBwcm9wIF0gPSBiWyBwcm9wIF07XG4gIH1cbiAgcmV0dXJuIGE7XG59O1xuXG4vLyAtLS0tLSBtb2R1bG8gLS0tLS0gLy9cblxudXRpbHMubW9kdWxvID0gZnVuY3Rpb24oIG51bSwgZGl2ICkge1xuICByZXR1cm4gKCAoIG51bSAlIGRpdiApICsgZGl2ICkgJSBkaXY7XG59O1xuXG4vLyAtLS0tLSBtYWtlQXJyYXkgLS0tLS0gLy9cblxudmFyIGFycmF5U2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbi8vIHR1cm4gZWxlbWVudCBvciBub2RlTGlzdCBpbnRvIGFuIGFycmF5XG51dGlscy5tYWtlQXJyYXkgPSBmdW5jdGlvbiggb2JqICkge1xuICBpZiAoIEFycmF5LmlzQXJyYXkoIG9iaiApICkge1xuICAgIC8vIHVzZSBvYmplY3QgaWYgYWxyZWFkeSBhbiBhcnJheVxuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgLy8gcmV0dXJuIGVtcHR5IGFycmF5IGlmIHVuZGVmaW5lZCBvciBudWxsLiAjNlxuICBpZiAoIG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgaXNBcnJheUxpa2UgPSB0eXBlb2Ygb2JqID09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoubGVuZ3RoID09ICdudW1iZXInO1xuICBpZiAoIGlzQXJyYXlMaWtlICkge1xuICAgIC8vIGNvbnZlcnQgbm9kZUxpc3QgdG8gYXJyYXlcbiAgICByZXR1cm4gYXJyYXlTbGljZS5jYWxsKCBvYmogKTtcbiAgfVxuXG4gIC8vIGFycmF5IG9mIHNpbmdsZSBpbmRleFxuICByZXR1cm4gWyBvYmogXTtcbn07XG5cbi8vIC0tLS0tIHJlbW92ZUZyb20gLS0tLS0gLy9cblxudXRpbHMucmVtb3ZlRnJvbSA9IGZ1bmN0aW9uKCBhcnksIG9iaiApIHtcbiAgdmFyIGluZGV4ID0gYXJ5LmluZGV4T2YoIG9iaiApO1xuICBpZiAoIGluZGV4ICE9IC0xICkge1xuICAgIGFyeS5zcGxpY2UoIGluZGV4LCAxICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFBhcmVudCAtLS0tLSAvL1xuXG51dGlscy5nZXRQYXJlbnQgPSBmdW5jdGlvbiggZWxlbSwgc2VsZWN0b3IgKSB7XG4gIHdoaWxlICggZWxlbS5wYXJlbnROb2RlICYmIGVsZW0gIT0gZG9jdW1lbnQuYm9keSApIHtcbiAgICBlbGVtID0gZWxlbS5wYXJlbnROb2RlO1xuICAgIGlmICggbWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBzZWxlY3RvciApICkge1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLSBnZXRRdWVyeUVsZW1lbnQgLS0tLS0gLy9cblxuLy8gdXNlIGVsZW1lbnQgYXMgc2VsZWN0b3Igc3RyaW5nXG51dGlscy5nZXRRdWVyeUVsZW1lbnQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgaWYgKCB0eXBlb2YgZWxlbSA9PSAnc3RyaW5nJyApIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggZWxlbSApO1xuICB9XG4gIHJldHVybiBlbGVtO1xufTtcblxuLy8gLS0tLS0gaGFuZGxlRXZlbnQgLS0tLS0gLy9cblxuLy8gZW5hYmxlIC5vbnR5cGUgdG8gdHJpZ2dlciBmcm9tIC5hZGRFdmVudExpc3RlbmVyKCBlbGVtLCAndHlwZScgKVxudXRpbHMuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBtZXRob2QgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgaWYgKCB0aGlzWyBtZXRob2QgXSApIHtcbiAgICB0aGlzWyBtZXRob2QgXSggZXZlbnQgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gZmlsdGVyRmluZEVsZW1lbnRzIC0tLS0tIC8vXG5cbnV0aWxzLmZpbHRlckZpbmRFbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcywgc2VsZWN0b3IgKSB7XG4gIC8vIG1ha2UgYXJyYXkgb2YgZWxlbXNcbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHZhciBmZkVsZW1zID0gW107XG5cbiAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgLy8gY2hlY2sgdGhhdCBlbGVtIGlzIGFuIGFjdHVhbCBlbGVtZW50XG4gICAgaWYgKCAhKCBlbGVtIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gYWRkIGVsZW0gaWYgbm8gc2VsZWN0b3JcbiAgICBpZiAoICFzZWxlY3RvciApIHtcbiAgICAgIGZmRWxlbXMucHVzaCggZWxlbSApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBmaWx0ZXIgJiBmaW5kIGl0ZW1zIGlmIHdlIGhhdmUgYSBzZWxlY3RvclxuICAgIC8vIGZpbHRlclxuICAgIGlmICggbWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBzZWxlY3RvciApICkge1xuICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgfVxuICAgIC8vIGZpbmQgY2hpbGRyZW5cbiAgICB2YXIgY2hpbGRFbGVtcyA9IGVsZW0ucXVlcnlTZWxlY3RvckFsbCggc2VsZWN0b3IgKTtcbiAgICAvLyBjb25jYXQgY2hpbGRFbGVtcyB0byBmaWx0ZXJGb3VuZCBhcnJheVxuICAgIGZvciAoIHZhciBpPTA7IGkgPCBjaGlsZEVsZW1zLmxlbmd0aDsgaSsrICkge1xuICAgICAgZmZFbGVtcy5wdXNoKCBjaGlsZEVsZW1zW2ldICk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZmZFbGVtcztcbn07XG5cbi8vIC0tLS0tIGRlYm91bmNlTWV0aG9kIC0tLS0tIC8vXG5cbnV0aWxzLmRlYm91bmNlTWV0aG9kID0gZnVuY3Rpb24oIF9jbGFzcywgbWV0aG9kTmFtZSwgdGhyZXNob2xkICkge1xuICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgMTAwO1xuICAvLyBvcmlnaW5hbCBtZXRob2RcbiAgdmFyIG1ldGhvZCA9IF9jbGFzcy5wcm90b3R5cGVbIG1ldGhvZE5hbWUgXTtcbiAgdmFyIHRpbWVvdXROYW1lID0gbWV0aG9kTmFtZSArICdUaW1lb3V0JztcblxuICBfY2xhc3MucHJvdG90eXBlWyBtZXRob2ROYW1lIF0gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGltZW91dCA9IHRoaXNbIHRpbWVvdXROYW1lIF07XG4gICAgY2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG5cbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXNbIHRpbWVvdXROYW1lIF0gPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgIG1ldGhvZC5hcHBseSggX3RoaXMsIGFyZ3MgKTtcbiAgICAgIGRlbGV0ZSBfdGhpc1sgdGltZW91dE5hbWUgXTtcbiAgICB9LCB0aHJlc2hvbGQgKTtcbiAgfTtcbn07XG5cbi8vIC0tLS0tIGRvY1JlYWR5IC0tLS0tIC8vXG5cbnV0aWxzLmRvY1JlYWR5ID0gZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuICB2YXIgcmVhZHlTdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG4gIGlmICggcmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnIHx8IHJlYWR5U3RhdGUgPT0gJ2ludGVyYWN0aXZlJyApIHtcbiAgICAvLyBkbyBhc3luYyB0byBhbGxvdyBmb3Igb3RoZXIgc2NyaXB0cyB0byBydW4uIG1ldGFmaXp6eS9mbGlja2l0eSM0NDFcbiAgICBzZXRUaW1lb3V0KCBjYWxsYmFjayApO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdET01Db250ZW50TG9hZGVkJywgY2FsbGJhY2sgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gaHRtbEluaXQgLS0tLS0gLy9cblxuLy8gaHR0cDovL2phbWVzcm9iZXJ0cy5uYW1lL2Jsb2cvMjAxMC8wMi8yMi9zdHJpbmctZnVuY3Rpb25zLWZvci1qYXZhc2NyaXB0LXRyaW0tdG8tY2FtZWwtY2FzZS10by1kYXNoZWQtYW5kLXRvLXVuZGVyc2NvcmUvXG51dGlscy50b0Rhc2hlZCA9IGZ1bmN0aW9uKCBzdHIgKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSggLyguKShbQS1aXSkvZywgZnVuY3Rpb24oIG1hdGNoLCAkMSwgJDIgKSB7XG4gICAgcmV0dXJuICQxICsgJy0nICsgJDI7XG4gIH0pLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuLyoqXG4gKiBhbGxvdyB1c2VyIHRvIGluaXRpYWxpemUgY2xhc3NlcyB2aWEgW2RhdGEtbmFtZXNwYWNlXSBvciAuanMtbmFtZXNwYWNlIGNsYXNzXG4gKiBodG1sSW5pdCggV2lkZ2V0LCAnd2lkZ2V0TmFtZScgKVxuICogb3B0aW9ucyBhcmUgcGFyc2VkIGZyb20gZGF0YS1uYW1lc3BhY2Utb3B0aW9uc1xuICovXG51dGlscy5odG1sSW5pdCA9IGZ1bmN0aW9uKCBXaWRnZXRDbGFzcywgbmFtZXNwYWNlICkge1xuICB1dGlscy5kb2NSZWFkeSggZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhc2hlZE5hbWVzcGFjZSA9IHV0aWxzLnRvRGFzaGVkKCBuYW1lc3BhY2UgKTtcbiAgICB2YXIgZGF0YUF0dHIgPSAnZGF0YS0nICsgZGFzaGVkTmFtZXNwYWNlO1xuICAgIHZhciBkYXRhQXR0ckVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJ1snICsgZGF0YUF0dHIgKyAnXScgKTtcbiAgICB2YXIganNEYXNoRWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLmpzLScgKyBkYXNoZWROYW1lc3BhY2UgKTtcbiAgICB2YXIgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGRhdGFBdHRyRWxlbXMgKVxuICAgICAgLmNvbmNhdCggdXRpbHMubWFrZUFycmF5KCBqc0Rhc2hFbGVtcyApICk7XG4gICAgdmFyIGRhdGFPcHRpb25zQXR0ciA9IGRhdGFBdHRyICsgJy1vcHRpb25zJztcbiAgICB2YXIgalF1ZXJ5ID0gd2luZG93LmpRdWVyeTtcblxuICAgIGVsZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgdmFyIGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZSggZGF0YUF0dHIgKSB8fFxuICAgICAgICBlbGVtLmdldEF0dHJpYnV0ZSggZGF0YU9wdGlvbnNBdHRyICk7XG4gICAgICB2YXIgb3B0aW9ucztcbiAgICAgIHRyeSB7XG4gICAgICAgIG9wdGlvbnMgPSBhdHRyICYmIEpTT04ucGFyc2UoIGF0dHIgKTtcbiAgICAgIH0gY2F0Y2ggKCBlcnJvciApIHtcbiAgICAgICAgLy8gbG9nIGVycm9yLCBkbyBub3QgaW5pdGlhbGl6ZVxuICAgICAgICBpZiAoIGNvbnNvbGUgKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvciggJ0Vycm9yIHBhcnNpbmcgJyArIGRhdGFBdHRyICsgJyBvbiAnICsgZWxlbS5jbGFzc05hbWUgK1xuICAgICAgICAgICc6ICcgKyBlcnJvciApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBXaWRnZXRDbGFzcyggZWxlbSwgb3B0aW9ucyApO1xuICAgICAgLy8gbWFrZSBhdmFpbGFibGUgdmlhICQoKS5kYXRhKCduYW1lc3BhY2UnKVxuICAgICAgaWYgKCBqUXVlcnkgKSB7XG4gICAgICAgIGpRdWVyeS5kYXRhKCBlbGVtLCBuYW1lc3BhY2UsIGluc3RhbmNlICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIHV0aWxzO1xuXG59KSk7XG4iLCIvKiFcbiAqIEZsaWNraXR5IGltYWdlc0xvYWRlZCB2Mi4wLjBcbiAqIGVuYWJsZXMgaW1hZ2VzTG9hZGVkIG9wdGlvbiBmb3IgRmxpY2tpdHlcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLypqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKmdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdmbGlja2l0eS9qcy9pbmRleCcsXG4gICAgICAnaW1hZ2VzbG9hZGVkL2ltYWdlc2xvYWRlZCdcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIGltYWdlc0xvYWRlZCApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBpbWFnZXNMb2FkZWQgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCdpbWFnZXNsb2FkZWQnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRmxpY2tpdHkgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LmltYWdlc0xvYWRlZFxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBpbWFnZXNMb2FkZWQgKSB7XG4ndXNlIHN0cmljdCc7XG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZUltYWdlc0xvYWRlZCcpO1xuXG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVJbWFnZXNMb2FkZWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vbiggJ2FjdGl2YXRlJywgdGhpcy5pbWFnZXNMb2FkZWQgKTtcbn07XG5cbnByb3RvLmltYWdlc0xvYWRlZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuaW1hZ2VzTG9hZGVkICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgX3RoaXMgPSB0aGlzO1xuICBmdW5jdGlvbiBvbkltYWdlc0xvYWRlZFByb2dyZXNzKCBpbnN0YW5jZSwgaW1hZ2UgKSB7XG4gICAgdmFyIGNlbGwgPSBfdGhpcy5nZXRQYXJlbnRDZWxsKCBpbWFnZS5pbWcgKTtcbiAgICBfdGhpcy5jZWxsU2l6ZUNoYW5nZSggY2VsbCAmJiBjZWxsLmVsZW1lbnQgKTtcbiAgICBpZiAoICFfdGhpcy5vcHRpb25zLmZyZWVTY3JvbGwgKSB7XG4gICAgICBfdGhpcy5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQoKTtcbiAgICB9XG4gIH1cbiAgaW1hZ2VzTG9hZGVkKCB0aGlzLnNsaWRlciApLm9uKCAncHJvZ3Jlc3MnLCBvbkltYWdlc0xvYWRlZFByb2dyZXNzICk7XG59O1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIGFkZCwgcmVtb3ZlIGNlbGxcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCB1dGlscyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBhcHBlbmQgY2VsbHMgdG8gYSBkb2N1bWVudCBmcmFnbWVudFxuZnVuY3Rpb24gZ2V0Q2VsbHNGcmFnbWVudCggY2VsbHMgKSB7XG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGNlbGwuZWxlbWVudCApO1xuICB9KTtcbiAgcmV0dXJuIGZyYWdtZW50O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBhZGQvcmVtb3ZlIGNlbGwgcHJvdG90eXBlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxuLyoqXG4gKiBJbnNlcnQsIHByZXBlbmQsIG9yIGFwcGVuZCBjZWxsc1xuICogQHBhcmFtIHtFbGVtZW50LCBBcnJheSwgTm9kZUxpc3R9IGVsZW1zXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4XG4gKi9cbnByb3RvLmluc2VydCA9IGZ1bmN0aW9uKCBlbGVtcywgaW5kZXggKSB7XG4gIHZhciBjZWxscyA9IHRoaXMuX21ha2VDZWxscyggZWxlbXMgKTtcbiAgaWYgKCAhY2VsbHMgfHwgIWNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbiA9IHRoaXMuY2VsbHMubGVuZ3RoO1xuICAvLyBkZWZhdWx0IHRvIGFwcGVuZFxuICBpbmRleCA9IGluZGV4ID09PSB1bmRlZmluZWQgPyBsZW4gOiBpbmRleDtcbiAgLy8gYWRkIGNlbGxzIHdpdGggZG9jdW1lbnQgZnJhZ21lbnRcbiAgdmFyIGZyYWdtZW50ID0gZ2V0Q2VsbHNGcmFnbWVudCggY2VsbHMgKTtcbiAgLy8gYXBwZW5kIHRvIHNsaWRlclxuICB2YXIgaXNBcHBlbmQgPSBpbmRleCA9PSBsZW47XG4gIGlmICggaXNBcHBlbmQgKSB7XG4gICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQoIGZyYWdtZW50ICk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGluc2VydENlbGxFbGVtZW50ID0gdGhpcy5jZWxsc1sgaW5kZXggXS5lbGVtZW50O1xuICAgIHRoaXMuc2xpZGVyLmluc2VydEJlZm9yZSggZnJhZ21lbnQsIGluc2VydENlbGxFbGVtZW50ICk7XG4gIH1cbiAgLy8gYWRkIHRvIHRoaXMuY2VsbHNcbiAgaWYgKCBpbmRleCA9PT0gMCApIHtcbiAgICAvLyBwcmVwZW5kLCBhZGQgdG8gc3RhcnRcbiAgICB0aGlzLmNlbGxzID0gY2VsbHMuY29uY2F0KCB0aGlzLmNlbGxzICk7XG4gIH0gZWxzZSBpZiAoIGlzQXBwZW5kICkge1xuICAgIC8vIGFwcGVuZCwgYWRkIHRvIGVuZFxuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmNlbGxzLmNvbmNhdCggY2VsbHMgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBpbnNlcnQgaW4gdGhpcy5jZWxsc1xuICAgIHZhciBlbmRDZWxscyA9IHRoaXMuY2VsbHMuc3BsaWNlKCBpbmRleCwgbGVuIC0gaW5kZXggKTtcbiAgICB0aGlzLmNlbGxzID0gdGhpcy5jZWxscy5jb25jYXQoIGNlbGxzICkuY29uY2F0KCBlbmRDZWxscyApO1xuICB9XG5cbiAgdGhpcy5fc2l6ZUNlbGxzKCBjZWxscyApO1xuICB0aGlzLmNlbGxDaGFuZ2UoIGluZGV4LCB0cnVlICk7XG59O1xuXG5wcm90by5hcHBlbmQgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHRoaXMuaW5zZXJ0KCBlbGVtcywgdGhpcy5jZWxscy5sZW5ndGggKTtcbn07XG5cbnByb3RvLnByZXBlbmQgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHRoaXMuaW5zZXJ0KCBlbGVtcywgMCApO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgY2VsbHNcbiAqIEBwYXJhbSB7RWxlbWVudCwgQXJyYXksIE5vZGVMaXN0fSBlbGVtc1xuICovXG5wcm90by5yZW1vdmUgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBjZWxscyA9IHRoaXMuZ2V0Q2VsbHMoIGVsZW1zICk7XG4gIGlmICggIWNlbGxzIHx8ICFjZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG1pbkNlbGxJbmRleCA9IHRoaXMuY2VsbHMubGVuZ3RoIC0gMTtcbiAgLy8gcmVtb3ZlIGNlbGxzIGZyb20gY29sbGVjdGlvbiAmIERPTVxuICBjZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLnJlbW92ZSgpO1xuICAgIHZhciBpbmRleCA9IHRoaXMuY2VsbHMuaW5kZXhPZiggY2VsbCApO1xuICAgIG1pbkNlbGxJbmRleCA9IE1hdGgubWluKCBpbmRleCwgbWluQ2VsbEluZGV4ICk7XG4gICAgdXRpbHMucmVtb3ZlRnJvbSggdGhpcy5jZWxscywgY2VsbCApO1xuICB9LCB0aGlzICk7XG5cbiAgdGhpcy5jZWxsQ2hhbmdlKCBtaW5DZWxsSW5kZXgsIHRydWUgKTtcbn07XG5cbi8qKlxuICogbG9naWMgdG8gYmUgcnVuIGFmdGVyIGEgY2VsbCdzIHNpemUgY2hhbmdlc1xuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtIC0gY2VsbCdzIGVsZW1lbnRcbiAqL1xucHJvdG8uY2VsbFNpemVDaGFuZ2UgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoIGVsZW0gKTtcbiAgaWYgKCAhY2VsbCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY2VsbC5nZXRTaXplKCk7XG5cbiAgdmFyIGluZGV4ID0gdGhpcy5jZWxscy5pbmRleE9mKCBjZWxsICk7XG4gIHRoaXMuY2VsbENoYW5nZSggaW5kZXggKTtcbn07XG5cbi8qKlxuICogbG9naWMgYW55IHRpbWUgYSBjZWxsIGlzIGNoYW5nZWQ6IGFkZGVkLCByZW1vdmVkLCBvciBzaXplIGNoYW5nZWRcbiAqIEBwYXJhbSB7SW50ZWdlcn0gY2hhbmdlZENlbGxJbmRleCAtIGluZGV4IG9mIHRoZSBjaGFuZ2VkIGNlbGwsIG9wdGlvbmFsXG4gKi9cbnByb3RvLmNlbGxDaGFuZ2UgPSBmdW5jdGlvbiggY2hhbmdlZENlbGxJbmRleCwgaXNQb3NpdGlvbmluZ1NsaWRlciApIHtcbiAgdmFyIHByZXZTZWxlY3RlZEVsZW0gPSB0aGlzLnNlbGVjdGVkRWxlbWVudDtcbiAgdGhpcy5fcG9zaXRpb25DZWxscyggY2hhbmdlZENlbGxJbmRleCApO1xuICB0aGlzLl9nZXRXcmFwU2hpZnRDZWxscygpO1xuICB0aGlzLnNldEdhbGxlcnlTaXplKCk7XG4gIC8vIHVwZGF0ZSBzZWxlY3RlZEluZGV4XG4gIC8vIHRyeSB0byBtYWludGFpbiBwb3NpdGlvbiAmIHNlbGVjdCBwcmV2aW91cyBzZWxlY3RlZCBlbGVtZW50XG4gIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKCBwcmV2U2VsZWN0ZWRFbGVtICk7XG4gIGlmICggY2VsbCApIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmdldENlbGxTbGlkZUluZGV4KCBjZWxsICk7XG4gIH1cbiAgdGhpcy5zZWxlY3RlZEluZGV4ID0gTWF0aC5taW4oIHRoaXMuc2xpZGVzLmxlbmd0aCAtIDEsIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuXG4gIHRoaXMuZW1pdEV2ZW50KCAnY2VsbENoYW5nZScsIFsgY2hhbmdlZENlbGxJbmRleCBdICk7XG4gIC8vIHBvc2l0aW9uIHNsaWRlclxuICB0aGlzLnNlbGVjdCggdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIC8vIGRvIG5vdCBwb3NpdGlvbiBzbGlkZXIgYWZ0ZXIgbGF6eSBsb2FkXG4gIGlmICggaXNQb3NpdGlvbmluZ1NsaWRlciApIHtcbiAgICB0aGlzLnBvc2l0aW9uU2xpZGVyQXRTZWxlY3RlZCgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBhbmltYXRlXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IHdpbmRvdy5GbGlja2l0eSB8fCB7fTtcbiAgICB3aW5kb3cuRmxpY2tpdHkuYW5pbWF0ZVByb3RvdHlwZSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgdXRpbHMgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYW5pbWF0ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgcHJvdG8gPSB7fTtcblxucHJvdG8uc3RhcnRBbmltYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmlzQW5pbWF0aW5nICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuICB0aGlzLnJlc3RpbmdGcmFtZXMgPSAwO1xuICB0aGlzLmFuaW1hdGUoKTtcbn07XG5cbnByb3RvLmFuaW1hdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hcHBseURyYWdGb3JjZSgpO1xuICB0aGlzLmFwcGx5U2VsZWN0ZWRBdHRyYWN0aW9uKCk7XG5cbiAgdmFyIHByZXZpb3VzWCA9IHRoaXMueDtcblxuICB0aGlzLmludGVncmF0ZVBoeXNpY3MoKTtcbiAgdGhpcy5wb3NpdGlvblNsaWRlcigpO1xuICB0aGlzLnNldHRsZSggcHJldmlvdXNYICk7XG4gIC8vIGFuaW1hdGUgbmV4dCBmcmFtZVxuICBpZiAoIHRoaXMuaXNBbmltYXRpbmcgKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZ1bmN0aW9uIGFuaW1hdGVGcmFtZSgpIHtcbiAgICAgIF90aGlzLmFuaW1hdGUoKTtcbiAgICB9KTtcbiAgfVxufTtcblxucHJvdG8ucG9zaXRpb25TbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHggPSB0aGlzLng7XG4gIC8vIHdyYXAgcG9zaXRpb24gYXJvdW5kXG4gIGlmICggdGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgdGhpcy5jZWxscy5sZW5ndGggPiAxICkge1xuICAgIHggPSB1dGlscy5tb2R1bG8oIHgsIHRoaXMuc2xpZGVhYmxlV2lkdGggKTtcbiAgICB4ID0geCAtIHRoaXMuc2xpZGVhYmxlV2lkdGg7XG4gICAgdGhpcy5zaGlmdFdyYXBDZWxscyggeCApO1xuICB9XG5cbiAgdGhpcy5zZXRUcmFuc2xhdGVYKCB4LCB0aGlzLmlzQW5pbWF0aW5nICk7XG4gIHRoaXMuZGlzcGF0Y2hTY3JvbGxFdmVudCgpO1xufTtcblxucHJvdG8uc2V0VHJhbnNsYXRlWCA9IGZ1bmN0aW9uKCB4LCBpczNkICkge1xuICB4ICs9IHRoaXMuY3Vyc29yUG9zaXRpb247XG4gIC8vIHJldmVyc2UgaWYgcmlnaHQtdG8tbGVmdCBhbmQgdXNpbmcgdHJhbnNmb3JtXG4gIHggPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAteCA6IHg7XG4gIHZhciB0cmFuc2xhdGVYID0gdGhpcy5nZXRQb3NpdGlvblZhbHVlKCB4ICk7XG4gIC8vIHVzZSAzRCB0cmFuZm9ybXMgZm9yIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiBvbiBpT1NcbiAgLy8gYnV0IHVzZSAyRCB3aGVuIHNldHRsZWQsIGZvciBiZXR0ZXIgZm9udC1yZW5kZXJpbmdcbiAgdGhpcy5zbGlkZXIuc3R5bGUudHJhbnNmb3JtID0gaXMzZCA/XG4gICAgJ3RyYW5zbGF0ZTNkKCcgKyB0cmFuc2xhdGVYICsgJywwLDApJyA6ICd0cmFuc2xhdGVYKCcgKyB0cmFuc2xhdGVYICsgJyknO1xufTtcblxucHJvdG8uZGlzcGF0Y2hTY3JvbGxFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZmlyc3RTbGlkZSA9IHRoaXMuc2xpZGVzWzBdO1xuICBpZiAoICFmaXJzdFNsaWRlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcG9zaXRpb25YID0gLXRoaXMueCAtIGZpcnN0U2xpZGUudGFyZ2V0O1xuICB2YXIgcHJvZ3Jlc3MgPSBwb3NpdGlvblggLyB0aGlzLnNsaWRlc1dpZHRoO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdzY3JvbGwnLCBudWxsLCBbIHByb2dyZXNzLCBwb3NpdGlvblggXSApO1xufTtcblxucHJvdG8ucG9zaXRpb25TbGlkZXJBdFNlbGVjdGVkID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnggPSAtdGhpcy5zZWxlY3RlZFNsaWRlLnRhcmdldDtcbiAgdGhpcy52ZWxvY2l0eSA9IDA7IC8vIHN0b3Agd29iYmxlXG4gIHRoaXMucG9zaXRpb25TbGlkZXIoKTtcbn07XG5cbnByb3RvLmdldFBvc2l0aW9uVmFsdWUgPSBmdW5jdGlvbiggcG9zaXRpb24gKSB7XG4gIGlmICggdGhpcy5vcHRpb25zLnBlcmNlbnRQb3NpdGlvbiApIHtcbiAgICAvLyBwZXJjZW50IHBvc2l0aW9uLCByb3VuZCB0byAyIGRpZ2l0cywgbGlrZSAxMi4zNCVcbiAgICByZXR1cm4gKCBNYXRoLnJvdW5kKCAoIHBvc2l0aW9uIC8gdGhpcy5zaXplLmlubmVyV2lkdGggKSAqIDEwMDAwICkgKiAwLjAxICkrICclJztcbiAgfSBlbHNlIHtcbiAgICAvLyBwaXhlbCBwb3NpdGlvbmluZ1xuICAgIHJldHVybiBNYXRoLnJvdW5kKCBwb3NpdGlvbiApICsgJ3B4JztcbiAgfVxufTtcblxucHJvdG8uc2V0dGxlID0gZnVuY3Rpb24oIHByZXZpb3VzWCApIHtcbiAgLy8ga2VlcCB0cmFjayBvZiBmcmFtZXMgd2hlcmUgeCBoYXNuJ3QgbW92ZWRcbiAgaWYgKCAhdGhpcy5pc1BvaW50ZXJEb3duICYmIE1hdGgucm91bmQoIHRoaXMueCAqIDEwMCApID09IE1hdGgucm91bmQoIHByZXZpb3VzWCAqIDEwMCApICkge1xuICAgIHRoaXMucmVzdGluZ0ZyYW1lcysrO1xuICB9XG4gIC8vIHN0b3AgYW5pbWF0aW5nIGlmIHJlc3RpbmcgZm9yIDMgb3IgbW9yZSBmcmFtZXNcbiAgaWYgKCB0aGlzLnJlc3RpbmdGcmFtZXMgPiAyICkge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICBkZWxldGUgdGhpcy5pc0ZyZWVTY3JvbGxpbmc7XG4gICAgLy8gcmVuZGVyIHBvc2l0aW9uIHdpdGggdHJhbnNsYXRlWCB3aGVuIHNldHRsZWRcbiAgICB0aGlzLnBvc2l0aW9uU2xpZGVyKCk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnc2V0dGxlJywgbnVsbCwgWyB0aGlzLnNlbGVjdGVkSW5kZXggXSApO1xuICB9XG59O1xuXG5wcm90by5zaGlmdFdyYXBDZWxscyA9IGZ1bmN0aW9uKCB4ICkge1xuICAvLyBzaGlmdCBiZWZvcmUgY2VsbHNcbiAgdmFyIGJlZm9yZUdhcCA9IHRoaXMuY3Vyc29yUG9zaXRpb24gKyB4O1xuICB0aGlzLl9zaGlmdENlbGxzKCB0aGlzLmJlZm9yZVNoaWZ0Q2VsbHMsIGJlZm9yZUdhcCwgLTEgKTtcbiAgLy8gc2hpZnQgYWZ0ZXIgY2VsbHNcbiAgdmFyIGFmdGVyR2FwID0gdGhpcy5zaXplLmlubmVyV2lkdGggLSAoIHggKyB0aGlzLnNsaWRlYWJsZVdpZHRoICsgdGhpcy5jdXJzb3JQb3NpdGlvbiApO1xuICB0aGlzLl9zaGlmdENlbGxzKCB0aGlzLmFmdGVyU2hpZnRDZWxscywgYWZ0ZXJHYXAsIDEgKTtcbn07XG5cbnByb3RvLl9zaGlmdENlbGxzID0gZnVuY3Rpb24oIGNlbGxzLCBnYXAsIHNoaWZ0ICkge1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgY2VsbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGNlbGwgPSBjZWxsc1tpXTtcbiAgICB2YXIgY2VsbFNoaWZ0ID0gZ2FwID4gMCA/IHNoaWZ0IDogMDtcbiAgICBjZWxsLndyYXBTaGlmdCggY2VsbFNoaWZ0ICk7XG4gICAgZ2FwIC09IGNlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICB9XG59O1xuXG5wcm90by5fdW5zaGlmdENlbGxzID0gZnVuY3Rpb24oIGNlbGxzICkge1xuICBpZiAoICFjZWxscyB8fCAhY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKCB2YXIgaT0wOyBpIDwgY2VsbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgY2VsbHNbaV0ud3JhcFNoaWZ0KCAwICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBoeXNpY3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8uaW50ZWdyYXRlUGh5c2ljcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eTtcbiAgdGhpcy52ZWxvY2l0eSAqPSB0aGlzLmdldEZyaWN0aW9uRmFjdG9yKCk7XG59O1xuXG5wcm90by5hcHBseUZvcmNlID0gZnVuY3Rpb24oIGZvcmNlICkge1xuICB0aGlzLnZlbG9jaXR5ICs9IGZvcmNlO1xufTtcblxucHJvdG8uZ2V0RnJpY3Rpb25GYWN0b3IgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIDEgLSB0aGlzLm9wdGlvbnNbIHRoaXMuaXNGcmVlU2Nyb2xsaW5nID8gJ2ZyZWVTY3JvbGxGcmljdGlvbicgOiAnZnJpY3Rpb24nIF07XG59O1xuXG5wcm90by5nZXRSZXN0aW5nUG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgLy8gbXkgdGhhbmtzIHRvIFN0ZXZlbiBXaXR0ZW5zLCB3aG8gc2ltcGxpZmllZCB0aGlzIG1hdGggZ3JlYXRseVxuICByZXR1cm4gdGhpcy54ICsgdGhpcy52ZWxvY2l0eSAvICggMSAtIHRoaXMuZ2V0RnJpY3Rpb25GYWN0b3IoKSApO1xufTtcblxucHJvdG8uYXBwbHlEcmFnRm9yY2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0RyYWdnYWJsZSB8fCAhdGhpcy5pc1BvaW50ZXJEb3duICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBjaGFuZ2UgdGhlIHBvc2l0aW9uIHRvIGRyYWcgcG9zaXRpb24gYnkgYXBwbHlpbmcgZm9yY2VcbiAgdmFyIGRyYWdWZWxvY2l0eSA9IHRoaXMuZHJhZ1ggLSB0aGlzLng7XG4gIHZhciBkcmFnRm9yY2UgPSBkcmFnVmVsb2NpdHkgLSB0aGlzLnZlbG9jaXR5O1xuICB0aGlzLmFwcGx5Rm9yY2UoIGRyYWdGb3JjZSApO1xufTtcblxucHJvdG8uYXBwbHlTZWxlY3RlZEF0dHJhY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgLy8gZG8gbm90IGF0dHJhY3QgaWYgcG9pbnRlciBkb3duIG9yIG5vIHNsaWRlc1xuICB2YXIgZHJhZ0Rvd24gPSB0aGlzLmlzRHJhZ2dhYmxlICYmIHRoaXMuaXNQb2ludGVyRG93bjtcbiAgaWYgKCBkcmFnRG93biB8fCB0aGlzLmlzRnJlZVNjcm9sbGluZyB8fCAhdGhpcy5zbGlkZXMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgZGlzdGFuY2UgPSB0aGlzLnNlbGVjdGVkU2xpZGUudGFyZ2V0ICogLTEgLSB0aGlzLng7XG4gIHZhciBmb3JjZSA9IGRpc3RhbmNlICogdGhpcy5vcHRpb25zLnNlbGVjdGVkQXR0cmFjdGlvbjtcbiAgdGhpcy5hcHBseUZvcmNlKCBmb3JjZSApO1xufTtcblxucmV0dXJuIHByb3RvO1xuXG59KSk7XG4iLCIvLyBGbGlja2l0eS5DZWxsXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2dldC1zaXplL2dldC1zaXplJ1xuICAgIF0sIGZ1bmN0aW9uKCBnZXRTaXplICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgZ2V0U2l6ZSApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRmxpY2tpdHkgPSB3aW5kb3cuRmxpY2tpdHkgfHwge307XG4gICAgd2luZG93LkZsaWNraXR5LkNlbGwgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LmdldFNpemVcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBnZXRTaXplICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIENlbGwoIGVsZW0sIHBhcmVudCApIHtcbiAgdGhpcy5lbGVtZW50ID0gZWxlbTtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgdGhpcy5jcmVhdGUoKTtcbn1cblxudmFyIHByb3RvID0gQ2VsbC5wcm90b3R5cGU7XG5cbnByb3RvLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCAnYXJpYS1oaWRkZW4nLCAndHJ1ZScgKTtcbiAgdGhpcy54ID0gMDtcbiAgdGhpcy5zaGlmdCA9IDA7XG59O1xuXG5wcm90by5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlc2V0IHN0eWxlXG4gIHRoaXMudW5zZWxlY3QoKTtcbiAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gIHZhciBzaWRlID0gdGhpcy5wYXJlbnQub3JpZ2luU2lkZTtcbiAgdGhpcy5lbGVtZW50LnN0eWxlWyBzaWRlIF0gPSAnJztcbn07XG5cbnByb3RvLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG59O1xuXG5wcm90by5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCB4ICkge1xuICB0aGlzLnggPSB4O1xuICB0aGlzLnVwZGF0ZVRhcmdldCgpO1xuICB0aGlzLnJlbmRlclBvc2l0aW9uKCB4ICk7XG59O1xuXG4vLyBzZXREZWZhdWx0VGFyZ2V0IHYxIG1ldGhvZCwgYmFja3dhcmRzIGNvbXBhdGliaWxpdHksIHJlbW92ZSBpbiB2M1xucHJvdG8udXBkYXRlVGFyZ2V0ID0gcHJvdG8uc2V0RGVmYXVsdFRhcmdldCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFyZ2luUHJvcGVydHkgPSB0aGlzLnBhcmVudC5vcmlnaW5TaWRlID09ICdsZWZ0JyA/ICdtYXJnaW5MZWZ0JyA6ICdtYXJnaW5SaWdodCc7XG4gIHRoaXMudGFyZ2V0ID0gdGhpcy54ICsgdGhpcy5zaXplWyBtYXJnaW5Qcm9wZXJ0eSBdICtcbiAgICB0aGlzLnNpemUud2lkdGggKiB0aGlzLnBhcmVudC5jZWxsQWxpZ247XG59O1xuXG5wcm90by5yZW5kZXJQb3NpdGlvbiA9IGZ1bmN0aW9uKCB4ICkge1xuICAvLyByZW5kZXIgcG9zaXRpb24gb2YgY2VsbCB3aXRoIGluIHNsaWRlclxuICB2YXIgc2lkZSA9IHRoaXMucGFyZW50Lm9yaWdpblNpZGU7XG4gIHRoaXMuZWxlbWVudC5zdHlsZVsgc2lkZSBdID0gdGhpcy5wYXJlbnQuZ2V0UG9zaXRpb25WYWx1ZSggeCApO1xufTtcblxucHJvdG8uc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1zZWxlY3RlZCcpO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xufTtcblxucHJvdG8udW5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXNlbGVjdGVkJyk7XG4gIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoICdhcmlhLWhpZGRlbicsICd0cnVlJyApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGZhY3RvciAtIDAsIDEsIG9yIC0xXG4qKi9cbnByb3RvLndyYXBTaGlmdCA9IGZ1bmN0aW9uKCBzaGlmdCApIHtcbiAgdGhpcy5zaGlmdCA9IHNoaWZ0O1xuICB0aGlzLnJlbmRlclBvc2l0aW9uKCB0aGlzLnggKyB0aGlzLnBhcmVudC5zbGlkZWFibGVXaWR0aCAqIHNoaWZ0ICk7XG59O1xuXG5wcm90by5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xufTtcblxucmV0dXJuIENlbGw7XG5cbn0pKTtcbiIsIi8vIGRyYWdcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAndW5pZHJhZ2dlci91bmlkcmFnZ2VyJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIFVuaWRyYWdnZXIsIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaWRyYWdnZXIsIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCd1bmlkcmFnZ2VyJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuVW5pZHJhZ2dlcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pZHJhZ2dlciwgdXRpbHMgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0gZGVmYXVsdHMgLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBGbGlja2l0eS5kZWZhdWx0cywge1xuICBkcmFnZ2FibGU6ICc+MScsXG4gIGRyYWdUaHJlc2hvbGQ6IDMsXG59KTtcblxuLy8gLS0tLS0gY3JlYXRlIC0tLS0tIC8vXG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZURyYWcnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZyBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xudXRpbHMuZXh0ZW5kKCBwcm90bywgVW5pZHJhZ2dlci5wcm90b3R5cGUgKTtcbnByb3RvLl90b3VjaEFjdGlvblZhbHVlID0gJ3Bhbi15JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBpc1RvdWNoID0gJ2NyZWF0ZVRvdWNoJyBpbiBkb2N1bWVudDtcbnZhciBpc1RvdWNobW92ZVNjcm9sbENhbmNlbGVkID0gZmFsc2U7XG5cbnByb3RvLl9jcmVhdGVEcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMub25BY3RpdmF0ZURyYWcgKTtcbiAgdGhpcy5vbiggJ3VpQ2hhbmdlJywgdGhpcy5fdWlDaGFuZ2VEcmFnICk7XG4gIHRoaXMub24oICdkZWFjdGl2YXRlJywgdGhpcy5vbkRlYWN0aXZhdGVEcmFnICk7XG4gIHRoaXMub24oICdjZWxsQ2hhbmdlJywgdGhpcy51cGRhdGVEcmFnZ2FibGUgKTtcbiAgLy8gVE9ETyB1cGRhdGVEcmFnZ2FibGUgb24gcmVzaXplPyBpZiBncm91cENlbGxzICYgc2xpZGVzIGNoYW5nZVxuICAvLyBIQUNLIC0gYWRkIHNlZW1pbmdseSBpbm5vY3VvdXMgaGFuZGxlciB0byBmaXggaU9TIDEwIHNjcm9sbCBiZWhhdmlvclxuICAvLyAjNDU3LCBSdWJhWGEvU29ydGFibGUjOTczXG4gIGlmICggaXNUb3VjaCAmJiAhaXNUb3VjaG1vdmVTY3JvbGxDYW5jZWxlZCApIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIGZ1bmN0aW9uKCkge30pO1xuICAgIGlzVG91Y2htb3ZlU2Nyb2xsQ2FuY2VsZWQgPSB0cnVlO1xuICB9XG59O1xuXG5wcm90by5vbkFjdGl2YXRlRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmhhbmRsZXMgPSBbIHRoaXMudmlld3BvcnQgXTtcbiAgdGhpcy5iaW5kSGFuZGxlcygpO1xuICB0aGlzLnVwZGF0ZURyYWdnYWJsZSgpO1xufTtcblxucHJvdG8ub25EZWFjdGl2YXRlRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnVuYmluZEhhbmRsZXMoKTtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWRyYWdnYWJsZScpO1xufTtcblxucHJvdG8udXBkYXRlRHJhZ2dhYmxlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGRpc2FibGUgZHJhZ2dpbmcgaWYgbGVzcyB0aGFuIDIgc2xpZGVzLiAjMjc4XG4gIGlmICggdGhpcy5vcHRpb25zLmRyYWdnYWJsZSA9PSAnPjEnICkge1xuICAgIHRoaXMuaXNEcmFnZ2FibGUgPSB0aGlzLnNsaWRlcy5sZW5ndGggPiAxO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNEcmFnZ2FibGUgPSB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlO1xuICB9XG4gIGlmICggdGhpcy5pc0RyYWdnYWJsZSApIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtZHJhZ2dhYmxlJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWRyYWdnYWJsZScpO1xuICB9XG59O1xuXG4vLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxucHJvdG8uYmluZERyYWcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSA9IHRydWU7XG4gIHRoaXMudXBkYXRlRHJhZ2dhYmxlKCk7XG59O1xuXG5wcm90by51bmJpbmREcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgdGhpcy51cGRhdGVEcmFnZ2FibGUoKTtcbn07XG5cbnByb3RvLl91aUNoYW5nZURyYWcgPSBmdW5jdGlvbigpIHtcbiAgZGVsZXRlIHRoaXMuaXNGcmVlU2Nyb2xsaW5nO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcG9pbnRlciBldmVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8ucG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnZ2FibGUgKSB7XG4gICAgdGhpcy5fcG9pbnRlckRvd25EZWZhdWx0KCBldmVudCwgcG9pbnRlciApO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaXNPa2F5ID0gdGhpcy5va2F5UG9pbnRlckRvd24oIGV2ZW50ICk7XG4gIGlmICggIWlzT2theSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLl9wb2ludGVyRG93blByZXZlbnREZWZhdWx0KCBldmVudCApO1xuICB0aGlzLnBvaW50ZXJEb3duRm9jdXMoIGV2ZW50ICk7XG4gIC8vIGJsdXJcbiAgaWYgKCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9IHRoaXMuZWxlbWVudCApIHtcbiAgICAvLyBkbyBub3QgYmx1ciBpZiBhbHJlYWR5IGZvY3VzZWRcbiAgICB0aGlzLnBvaW50ZXJEb3duQmx1cigpO1xuICB9XG5cbiAgLy8gc3RvcCBpZiBpdCB3YXMgbW92aW5nXG4gIHRoaXMuZHJhZ1ggPSB0aGlzLng7XG4gIHRoaXMudmlld3BvcnQuY2xhc3NMaXN0LmFkZCgnaXMtcG9pbnRlci1kb3duJyk7XG4gIC8vIHRyYWNrIHNjcm9sbGluZ1xuICB0aGlzLnBvaW50ZXJEb3duU2Nyb2xsID0gZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB0aGlzICk7XG5cbiAgdGhpcy5fcG9pbnRlckRvd25EZWZhdWx0KCBldmVudCwgcG9pbnRlciApO1xufTtcblxuLy8gZGVmYXVsdCBwb2ludGVyRG93biBsb2dpYywgdXNlZCBmb3Igc3RhdGljQ2xpY2tcbnByb3RvLl9wb2ludGVyRG93bkRlZmF1bHQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIHRyYWNrIHN0YXJ0IGV2ZW50IHBvc2l0aW9uXG4gIC8vIFNhZmFyaSA5IG92ZXJyaWRlcyBwYWdlWCBhbmQgcGFnZVkuIFRoZXNlIHZhbHVlcyBuZWVkcyB0byBiZSBjb3BpZWQuICM3NzlcbiAgdGhpcy5wb2ludGVyRG93blBvaW50ZXIgPSB7XG4gICAgcGFnZVg6IHBvaW50ZXIucGFnZVgsXG4gICAgcGFnZVk6IHBvaW50ZXIucGFnZVksXG4gIH07XG4gIC8vIGJpbmQgbW92ZSBhbmQgZW5kIGV2ZW50c1xuICB0aGlzLl9iaW5kUG9zdFN0YXJ0RXZlbnRzKCBldmVudCApO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdwb2ludGVyRG93bicsIGV2ZW50LCBbIHBvaW50ZXIgXSApO1xufTtcblxudmFyIGZvY3VzTm9kZXMgPSB7XG4gIElOUFVUOiB0cnVlLFxuICBURVhUQVJFQTogdHJ1ZSxcbiAgU0VMRUNUOiB0cnVlLFxufTtcblxucHJvdG8ucG9pbnRlckRvd25Gb2N1cyA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIGlzRm9jdXNOb2RlID0gZm9jdXNOb2Rlc1sgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lIF07XG4gIGlmICggIWlzRm9jdXNOb2RlICkge1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgfVxufTtcblxucHJvdG8uX3BvaW50ZXJEb3duUHJldmVudERlZmF1bHQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBpc1RvdWNoU3RhcnQgPSBldmVudC50eXBlID09ICd0b3VjaHN0YXJ0JztcbiAgdmFyIGlzVG91Y2hQb2ludGVyID0gZXZlbnQucG9pbnRlclR5cGUgPT0gJ3RvdWNoJztcbiAgdmFyIGlzRm9jdXNOb2RlID0gZm9jdXNOb2Rlc1sgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lIF07XG4gIGlmICggIWlzVG91Y2hTdGFydCAmJiAhaXNUb3VjaFBvaW50ZXIgJiYgIWlzRm9jdXNOb2RlICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIG1vdmUgLS0tLS0gLy9cblxucHJvdG8uaGFzRHJhZ1N0YXJ0ZWQgPSBmdW5jdGlvbiggbW92ZVZlY3RvciApIHtcbiAgcmV0dXJuIE1hdGguYWJzKCBtb3ZlVmVjdG9yLnggKSA+IHRoaXMub3B0aW9ucy5kcmFnVGhyZXNob2xkO1xufTtcblxuLy8gLS0tLS0gdXAgLS0tLS0gLy9cblxucHJvdG8ucG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBkZWxldGUgdGhpcy5pc1RvdWNoU2Nyb2xsaW5nO1xuICB0aGlzLnZpZXdwb3J0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXBvaW50ZXItZG93bicpO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdwb2ludGVyVXAnLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbiAgdGhpcy5fZHJhZ1BvaW50ZXJVcCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLnBvaW50ZXJEb25lID0gZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgdGhpcyApO1xuICBkZWxldGUgdGhpcy5wb2ludGVyRG93blNjcm9sbDtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYWdnaW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLmRyYWdTdGFydCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgaWYgKCAhdGhpcy5pc0RyYWdnYWJsZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiA9IHRoaXMueDtcbiAgdGhpcy5zdGFydEFuaW1hdGlvbigpO1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHRoaXMgKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnZHJhZ1N0YXJ0JywgZXZlbnQsIFsgcG9pbnRlciBdICk7XG59O1xuXG5wcm90by5wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIG1vdmVWZWN0b3IgPSB0aGlzLl9kcmFnUG9pbnRlck1vdmUoIGV2ZW50LCBwb2ludGVyICk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3BvaW50ZXJNb3ZlJywgZXZlbnQsIFsgcG9pbnRlciwgbW92ZVZlY3RvciBdICk7XG4gIHRoaXMuX2RyYWdNb3ZlKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApO1xufTtcblxucHJvdG8uZHJhZ01vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnZ2FibGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdGhpcy5wcmV2aW91c0RyYWdYID0gdGhpcy5kcmFnWDtcbiAgLy8gcmV2ZXJzZSBpZiByaWdodC10by1sZWZ0XG4gIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAtMSA6IDE7XG4gIGlmICggdGhpcy5vcHRpb25zLndyYXBBcm91bmQgKSB7XG4gICAgLy8gd3JhcCBhcm91bmQgbW92ZS4gIzU4OVxuICAgIG1vdmVWZWN0b3IueCA9IG1vdmVWZWN0b3IueCAlIHRoaXMuc2xpZGVhYmxlV2lkdGg7XG4gIH1cbiAgdmFyIGRyYWdYID0gdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiArIG1vdmVWZWN0b3IueCAqIGRpcmVjdGlvbjtcblxuICBpZiAoICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiB0aGlzLnNsaWRlcy5sZW5ndGggKSB7XG4gICAgLy8gc2xvdyBkcmFnXG4gICAgdmFyIG9yaWdpbkJvdW5kID0gTWF0aC5tYXgoIC10aGlzLnNsaWRlc1swXS50YXJnZXQsIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gKTtcbiAgICBkcmFnWCA9IGRyYWdYID4gb3JpZ2luQm91bmQgPyAoIGRyYWdYICsgb3JpZ2luQm91bmQgKSAqIDAuNSA6IGRyYWdYO1xuICAgIHZhciBlbmRCb3VuZCA9IE1hdGgubWluKCAtdGhpcy5nZXRMYXN0U2xpZGUoKS50YXJnZXQsIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gKTtcbiAgICBkcmFnWCA9IGRyYWdYIDwgZW5kQm91bmQgPyAoIGRyYWdYICsgZW5kQm91bmQgKSAqIDAuNSA6IGRyYWdYO1xuICB9XG5cbiAgdGhpcy5kcmFnWCA9IGRyYWdYO1xuXG4gIHRoaXMuZHJhZ01vdmVUaW1lID0gbmV3IERhdGUoKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnZHJhZ01vdmUnLCBldmVudCwgWyBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbn07XG5cbnByb3RvLmRyYWdFbmQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnZ2FibGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICggdGhpcy5vcHRpb25zLmZyZWVTY3JvbGwgKSB7XG4gICAgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgPSB0cnVlO1xuICB9XG4gIC8vIHNldCBzZWxlY3RlZEluZGV4IGJhc2VkIG9uIHdoZXJlIGZsaWNrIHdpbGwgZW5kIHVwXG4gIHZhciBpbmRleCA9IHRoaXMuZHJhZ0VuZFJlc3RpbmdTZWxlY3QoKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy5mcmVlU2Nyb2xsICYmICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCApIHtcbiAgICAvLyBpZiBmcmVlLXNjcm9sbCAmIG5vdCB3cmFwIGFyb3VuZFxuICAgIC8vIGRvIG5vdCBmcmVlLXNjcm9sbCBpZiBnb2luZyBvdXRzaWRlIG9mIGJvdW5kaW5nIHNsaWRlc1xuICAgIC8vIHNvIGJvdW5kaW5nIHNsaWRlcyBjYW4gYXR0cmFjdCBzbGlkZXIsIGFuZCBrZWVwIGl0IGluIGJvdW5kc1xuICAgIHZhciByZXN0aW5nWCA9IHRoaXMuZ2V0UmVzdGluZ1Bvc2l0aW9uKCk7XG4gICAgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgPSAtcmVzdGluZ1ggPiB0aGlzLnNsaWRlc1swXS50YXJnZXQgJiZcbiAgICAgIC1yZXN0aW5nWCA8IHRoaXMuZ2V0TGFzdFNsaWRlKCkudGFyZ2V0O1xuICB9IGVsc2UgaWYgKCAhdGhpcy5vcHRpb25zLmZyZWVTY3JvbGwgJiYgaW5kZXggPT0gdGhpcy5zZWxlY3RlZEluZGV4ICkge1xuICAgIC8vIGJvb3N0IHNlbGVjdGlvbiBpZiBzZWxlY3RlZCBpbmRleCBoYXMgbm90IGNoYW5nZWRcbiAgICBpbmRleCArPSB0aGlzLmRyYWdFbmRCb29zdFNlbGVjdCgpO1xuICB9XG4gIGRlbGV0ZSB0aGlzLnByZXZpb3VzRHJhZ1g7XG4gIC8vIGFwcGx5IHNlbGVjdGlvblxuICAvLyBUT0RPIHJlZmFjdG9yIHRoaXMsIHNlbGVjdGluZyBoZXJlIGZlZWxzIHdlaXJkXG4gIC8vIEhBQ0ssIHNldCBmbGFnIHNvIGRyYWdnaW5nIHN0YXlzIGluIGNvcnJlY3QgZGlyZWN0aW9uXG4gIHRoaXMuaXNEcmFnU2VsZWN0ID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQ7XG4gIHRoaXMuc2VsZWN0KCBpbmRleCApO1xuICBkZWxldGUgdGhpcy5pc0RyYWdTZWxlY3Q7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2RyYWdFbmQnLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbn07XG5cbnByb3RvLmRyYWdFbmRSZXN0aW5nU2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXN0aW5nWCA9IHRoaXMuZ2V0UmVzdGluZ1Bvc2l0aW9uKCk7XG4gIC8vIGhvdyBmYXIgYXdheSBmcm9tIHNlbGVjdGVkIHNsaWRlXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKCB0aGlzLmdldFNsaWRlRGlzdGFuY2UoIC1yZXN0aW5nWCwgdGhpcy5zZWxlY3RlZEluZGV4ICkgKTtcbiAgLy8gZ2V0IGNsb3NldCByZXN0aW5nIGdvaW5nIHVwIGFuZCBnb2luZyBkb3duXG4gIHZhciBwb3NpdGl2ZVJlc3RpbmcgPSB0aGlzLl9nZXRDbG9zZXN0UmVzdGluZyggcmVzdGluZ1gsIGRpc3RhbmNlLCAxICk7XG4gIHZhciBuZWdhdGl2ZVJlc3RpbmcgPSB0aGlzLl9nZXRDbG9zZXN0UmVzdGluZyggcmVzdGluZ1gsIGRpc3RhbmNlLCAtMSApO1xuICAvLyB1c2UgY2xvc2VyIHJlc3RpbmcgZm9yIHdyYXAtYXJvdW5kXG4gIHZhciBpbmRleCA9IHBvc2l0aXZlUmVzdGluZy5kaXN0YW5jZSA8IG5lZ2F0aXZlUmVzdGluZy5kaXN0YW5jZSA/XG4gICAgcG9zaXRpdmVSZXN0aW5nLmluZGV4IDogbmVnYXRpdmVSZXN0aW5nLmluZGV4O1xuICByZXR1cm4gaW5kZXg7XG59O1xuXG4vKipcbiAqIGdpdmVuIHJlc3RpbmcgWCBhbmQgZGlzdGFuY2UgdG8gc2VsZWN0ZWQgY2VsbFxuICogZ2V0IHRoZSBkaXN0YW5jZSBhbmQgaW5kZXggb2YgdGhlIGNsb3Nlc3QgY2VsbFxuICogQHBhcmFtIHtOdW1iZXJ9IHJlc3RpbmdYIC0gZXN0aW1hdGVkIHBvc3QtZmxpY2sgcmVzdGluZyBwb3NpdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGRpc3RhbmNlIC0gZGlzdGFuY2UgdG8gc2VsZWN0ZWQgY2VsbFxuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmNyZW1lbnQgLSArMSBvciAtMSwgZ29pbmcgdXAgb3IgZG93blxuICogQHJldHVybnMge09iamVjdH0gLSB7IGRpc3RhbmNlOiB7TnVtYmVyfSwgaW5kZXg6IHtJbnRlZ2VyfSB9XG4gKi9cbnByb3RvLl9nZXRDbG9zZXN0UmVzdGluZyA9IGZ1bmN0aW9uKCByZXN0aW5nWCwgZGlzdGFuY2UsIGluY3JlbWVudCApIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4O1xuICB2YXIgbWluRGlzdGFuY2UgPSBJbmZpbml0eTtcbiAgdmFyIGNvbmRpdGlvbiA9IHRoaXMub3B0aW9ucy5jb250YWluICYmICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCA/XG4gICAgLy8gaWYgY29udGFpbiwga2VlcCBnb2luZyBpZiBkaXN0YW5jZSBpcyBlcXVhbCB0byBtaW5EaXN0YW5jZVxuICAgIGZ1bmN0aW9uKCBkLCBtZCApIHsgcmV0dXJuIGQgPD0gbWQ7IH0gOiBmdW5jdGlvbiggZCwgbWQgKSB7IHJldHVybiBkIDwgbWQ7IH07XG4gIHdoaWxlICggY29uZGl0aW9uKCBkaXN0YW5jZSwgbWluRGlzdGFuY2UgKSApIHtcbiAgICAvLyBtZWFzdXJlIGRpc3RhbmNlIHRvIG5leHQgY2VsbFxuICAgIGluZGV4ICs9IGluY3JlbWVudDtcbiAgICBtaW5EaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgIGRpc3RhbmNlID0gdGhpcy5nZXRTbGlkZURpc3RhbmNlKCAtcmVzdGluZ1gsIGluZGV4ICk7XG4gICAgaWYgKCBkaXN0YW5jZSA9PT0gbnVsbCApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkaXN0YW5jZSA9IE1hdGguYWJzKCBkaXN0YW5jZSApO1xuICB9XG4gIHJldHVybiB7XG4gICAgZGlzdGFuY2U6IG1pbkRpc3RhbmNlLFxuICAgIC8vIHNlbGVjdGVkIHdhcyBwcmV2aW91cyBpbmRleFxuICAgIGluZGV4OiBpbmRleCAtIGluY3JlbWVudFxuICB9O1xufTtcblxuLyoqXG4gKiBtZWFzdXJlIGRpc3RhbmNlIGJldHdlZW4geCBhbmQgYSBzbGlkZSB0YXJnZXRcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gc2xpZGUgaW5kZXhcbiAqL1xucHJvdG8uZ2V0U2xpZGVEaXN0YW5jZSA9IGZ1bmN0aW9uKCB4LCBpbmRleCApIHtcbiAgdmFyIGxlbiA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgLy8gd3JhcCBhcm91bmQgaWYgYXQgbGVhc3QgMiBzbGlkZXNcbiAgdmFyIGlzV3JhcEFyb3VuZCA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIGxlbiA+IDE7XG4gIHZhciBzbGlkZUluZGV4ID0gaXNXcmFwQXJvdW5kID8gdXRpbHMubW9kdWxvKCBpbmRleCwgbGVuICkgOiBpbmRleDtcbiAgdmFyIHNsaWRlID0gdGhpcy5zbGlkZXNbIHNsaWRlSW5kZXggXTtcbiAgaWYgKCAhc2xpZGUgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gYWRkIGRpc3RhbmNlIGZvciB3cmFwLWFyb3VuZCBzbGlkZXNcbiAgdmFyIHdyYXAgPSBpc1dyYXBBcm91bmQgPyB0aGlzLnNsaWRlYWJsZVdpZHRoICogTWF0aC5mbG9vciggaW5kZXggLyBsZW4gKSA6IDA7XG4gIHJldHVybiB4IC0gKCBzbGlkZS50YXJnZXQgKyB3cmFwICk7XG59O1xuXG5wcm90by5kcmFnRW5kQm9vc3RTZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG8gbm90IGJvb3N0IGlmIG5vIHByZXZpb3VzRHJhZ1ggb3IgZHJhZ01vdmVUaW1lXG4gIGlmICggdGhpcy5wcmV2aW91c0RyYWdYID09PSB1bmRlZmluZWQgfHwgIXRoaXMuZHJhZ01vdmVUaW1lIHx8XG4gICAgLy8gb3IgaWYgZHJhZyB3YXMgaGVsZCBmb3IgMTAwIG1zXG4gICAgbmV3IERhdGUoKSAtIHRoaXMuZHJhZ01vdmVUaW1lID4gMTAwICkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIGRpc3RhbmNlID0gdGhpcy5nZXRTbGlkZURpc3RhbmNlKCAtdGhpcy5kcmFnWCwgdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIHZhciBkZWx0YSA9IHRoaXMucHJldmlvdXNEcmFnWCAtIHRoaXMuZHJhZ1g7XG4gIGlmICggZGlzdGFuY2UgPiAwICYmIGRlbHRhID4gMCApIHtcbiAgICAvLyBib29zdCB0byBuZXh0IGlmIG1vdmluZyB0b3dhcmRzIHRoZSByaWdodCwgYW5kIHBvc2l0aXZlIHZlbG9jaXR5XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoIGRpc3RhbmNlIDwgMCAmJiBkZWx0YSA8IDAgKSB7XG4gICAgLy8gYm9vc3QgdG8gcHJldmlvdXMgaWYgbW92aW5nIHRvd2FyZHMgdGhlIGxlZnQsIGFuZCBuZWdhdGl2ZSB2ZWxvY2l0eVxuICAgIHJldHVybiAtMTtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbi8vIC0tLS0tIHN0YXRpY0NsaWNrIC0tLS0tIC8vXG5cbnByb3RvLnN0YXRpY0NsaWNrID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBnZXQgY2xpY2tlZENlbGwsIGlmIGNlbGwgd2FzIGNsaWNrZWRcbiAgdmFyIGNsaWNrZWRDZWxsID0gdGhpcy5nZXRQYXJlbnRDZWxsKCBldmVudC50YXJnZXQgKTtcbiAgdmFyIGNlbGxFbGVtID0gY2xpY2tlZENlbGwgJiYgY2xpY2tlZENlbGwuZWxlbWVudDtcbiAgdmFyIGNlbGxJbmRleCA9IGNsaWNrZWRDZWxsICYmIHRoaXMuY2VsbHMuaW5kZXhPZiggY2xpY2tlZENlbGwgKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnc3RhdGljQ2xpY2snLCBldmVudCwgWyBwb2ludGVyLCBjZWxsRWxlbSwgY2VsbEluZGV4IF0gKTtcbn07XG5cbi8vIC0tLS0tIHNjcm9sbCAtLS0tLSAvL1xuXG5wcm90by5vbnNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2Nyb2xsID0gZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgdmFyIHNjcm9sbE1vdmVYID0gdGhpcy5wb2ludGVyRG93blNjcm9sbC54IC0gc2Nyb2xsLng7XG4gIHZhciBzY3JvbGxNb3ZlWSA9IHRoaXMucG9pbnRlckRvd25TY3JvbGwueSAtIHNjcm9sbC55O1xuICAvLyBjYW5jZWwgY2xpY2svdGFwIGlmIHNjcm9sbCBpcyB0b28gbXVjaFxuICBpZiAoIE1hdGguYWJzKCBzY3JvbGxNb3ZlWCApID4gMyB8fCBNYXRoLmFicyggc2Nyb2xsTW92ZVkgKSA+IDMgKSB7XG4gICAgdGhpcy5fcG9pbnRlckRvbmUoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gdXRpbHMgLS0tLS0gLy9cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XG4gIHJldHVybiB7XG4gICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgIHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuICB9O1xufVxuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBGbGlja2l0eSBtYWluXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcicsXG4gICAgICAnZ2V0LXNpemUvZ2V0LXNpemUnLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJyxcbiAgICAgICcuL2NlbGwnLFxuICAgICAgJy4vc2xpZGUnLFxuICAgICAgJy4vYW5pbWF0ZSdcbiAgICBdLCBmdW5jdGlvbiggRXZFbWl0dGVyLCBnZXRTaXplLCB1dGlscywgQ2VsbCwgU2xpZGUsIGFuaW1hdGVQcm90b3R5cGUgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIsIGdldFNpemUsIHV0aWxzLCBDZWxsLCBTbGlkZSwgYW5pbWF0ZVByb3RvdHlwZSApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpLFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgICByZXF1aXJlKCcuL2NlbGwnKSxcbiAgICAgIHJlcXVpcmUoJy4vc2xpZGUnKSxcbiAgICAgIHJlcXVpcmUoJy4vYW5pbWF0ZScpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHZhciBfRmxpY2tpdHkgPSB3aW5kb3cuRmxpY2tpdHk7XG5cbiAgICB3aW5kb3cuRmxpY2tpdHkgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkV2RW1pdHRlcixcbiAgICAgIHdpbmRvdy5nZXRTaXplLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICAgIF9GbGlja2l0eS5DZWxsLFxuICAgICAgX0ZsaWNraXR5LlNsaWRlLFxuICAgICAgX0ZsaWNraXR5LmFuaW1hdGVQcm90b3R5cGVcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIsIGdldFNpemUsXG4gIHV0aWxzLCBDZWxsLCBTbGlkZSwgYW5pbWF0ZVByb3RvdHlwZSApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyB2YXJzXG52YXIgalF1ZXJ5ID0gd2luZG93LmpRdWVyeTtcbnZhciBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XG52YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuXG5mdW5jdGlvbiBtb3ZlRWxlbWVudHMoIGVsZW1zLCB0b0VsZW0gKSB7XG4gIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBlbGVtcyApO1xuICB3aGlsZSAoIGVsZW1zLmxlbmd0aCApIHtcbiAgICB0b0VsZW0uYXBwZW5kQ2hpbGQoIGVsZW1zLnNoaWZ0KCkgKTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGbGlja2l0eSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnbG9iYWxseSB1bmlxdWUgaWRlbnRpZmllcnNcbnZhciBHVUlEID0gMDtcbi8vIGludGVybmFsIHN0b3JlIG9mIGFsbCBGbGlja2l0eSBpbnRhbmNlc1xudmFyIGluc3RhbmNlcyA9IHt9O1xuXG5mdW5jdGlvbiBGbGlja2l0eSggZWxlbWVudCwgb3B0aW9ucyApIHtcbiAgdmFyIHF1ZXJ5RWxlbWVudCA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbWVudCApO1xuICBpZiAoICFxdWVyeUVsZW1lbnQgKSB7XG4gICAgaWYgKCBjb25zb2xlICkge1xuICAgICAgY29uc29sZS5lcnJvciggJ0JhZCBlbGVtZW50IGZvciBGbGlja2l0eTogJyArICggcXVlcnlFbGVtZW50IHx8IGVsZW1lbnQgKSApO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5lbGVtZW50ID0gcXVlcnlFbGVtZW50O1xuICAvLyBkbyBub3QgaW5pdGlhbGl6ZSB0d2ljZSBvbiBzYW1lIGVsZW1lbnRcbiAgaWYgKCB0aGlzLmVsZW1lbnQuZmxpY2tpdHlHVUlEICkge1xuICAgIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlc1sgdGhpcy5lbGVtZW50LmZsaWNraXR5R1VJRCBdO1xuICAgIGluc3RhbmNlLm9wdGlvbiggb3B0aW9ucyApO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIC8vIGFkZCBqUXVlcnlcbiAgaWYgKCBqUXVlcnkgKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGpRdWVyeSggdGhpcy5lbGVtZW50ICk7XG4gIH1cbiAgLy8gb3B0aW9uc1xuICB0aGlzLm9wdGlvbnMgPSB1dGlscy5leHRlbmQoIHt9LCB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRzICk7XG4gIHRoaXMub3B0aW9uKCBvcHRpb25zICk7XG5cbiAgLy8ga2ljayB0aGluZ3Mgb2ZmXG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG5GbGlja2l0eS5kZWZhdWx0cyA9IHtcbiAgYWNjZXNzaWJpbGl0eTogdHJ1ZSxcbiAgLy8gYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICBjZWxsQWxpZ246ICdjZW50ZXInLFxuICAvLyBjZWxsU2VsZWN0b3I6IHVuZGVmaW5lZCxcbiAgLy8gY29udGFpbjogZmFsc2UsXG4gIGZyZWVTY3JvbGxGcmljdGlvbjogMC4wNzUsIC8vIGZyaWN0aW9uIHdoZW4gZnJlZS1zY3JvbGxpbmdcbiAgZnJpY3Rpb246IDAuMjgsIC8vIGZyaWN0aW9uIHdoZW4gc2VsZWN0aW5nXG4gIG5hbWVzcGFjZUpRdWVyeUV2ZW50czogdHJ1ZSxcbiAgLy8gaW5pdGlhbEluZGV4OiAwLFxuICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gIHJlc2l6ZTogdHJ1ZSxcbiAgc2VsZWN0ZWRBdHRyYWN0aW9uOiAwLjAyNSxcbiAgc2V0R2FsbGVyeVNpemU6IHRydWVcbiAgLy8gd2F0Y2hDU1M6IGZhbHNlLFxuICAvLyB3cmFwQXJvdW5kOiBmYWxzZVxufTtcblxuLy8gaGFzaCBvZiBtZXRob2RzIHRyaWdnZXJlZCBvbiBfY3JlYXRlKClcbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMgPSBbXTtcblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuLy8gaW5oZXJpdCBFdmVudEVtaXR0ZXJcbnV0aWxzLmV4dGVuZCggcHJvdG8sIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxucHJvdG8uX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBhZGQgaWQgZm9yIEZsaWNraXR5LmRhdGFcbiAgdmFyIGlkID0gdGhpcy5ndWlkID0gKytHVUlEO1xuICB0aGlzLmVsZW1lbnQuZmxpY2tpdHlHVUlEID0gaWQ7IC8vIGV4cGFuZG9cbiAgaW5zdGFuY2VzWyBpZCBdID0gdGhpczsgLy8gYXNzb2NpYXRlIHZpYSBpZFxuICAvLyBpbml0aWFsIHByb3BlcnRpZXNcbiAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgLy8gaG93IG1hbnkgZnJhbWVzIHNsaWRlciBoYXMgYmVlbiBpbiBzYW1lIHBvc2l0aW9uXG4gIHRoaXMucmVzdGluZ0ZyYW1lcyA9IDA7XG4gIC8vIGluaXRpYWwgcGh5c2ljcyBwcm9wZXJ0aWVzXG4gIHRoaXMueCA9IDA7XG4gIHRoaXMudmVsb2NpdHkgPSAwO1xuICB0aGlzLm9yaWdpblNpZGUgPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAvLyBjcmVhdGUgdmlld3BvcnQgJiBzbGlkZXJcbiAgdGhpcy52aWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0aGlzLnZpZXdwb3J0LmNsYXNzTmFtZSA9ICdmbGlja2l0eS12aWV3cG9ydCc7XG4gIHRoaXMuX2NyZWF0ZVNsaWRlcigpO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLnJlc2l6ZSB8fCB0aGlzLm9wdGlvbnMud2F0Y2hDU1MgKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzICk7XG4gIH1cblxuICAvLyBhZGQgbGlzdGVuZXJzIGZyb20gb24gb3B0aW9uXG4gIGZvciAoIHZhciBldmVudE5hbWUgaW4gdGhpcy5vcHRpb25zLm9uICkge1xuICAgIHZhciBsaXN0ZW5lciA9IHRoaXMub3B0aW9ucy5vblsgZXZlbnROYW1lIF07XG4gICAgdGhpcy5vbiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICB9XG5cbiAgRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5mb3JFYWNoKCBmdW5jdGlvbiggbWV0aG9kICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCk7XG4gIH0sIHRoaXMgKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy53YXRjaENTUyApIHtcbiAgICB0aGlzLndhdGNoQ1NTKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hY3RpdmF0ZSgpO1xuICB9XG5cbn07XG5cbi8qKlxuICogc2V0IG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKi9cbnByb3RvLm9wdGlvbiA9IGZ1bmN0aW9uKCBvcHRzICkge1xuICB1dGlscy5leHRlbmQoIHRoaXMub3B0aW9ucywgb3B0cyApO1xufTtcblxucHJvdG8uYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmlzQWN0aXZlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZsaWNraXR5LWVuYWJsZWQnKTtcbiAgaWYgKCB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZsaWNraXR5LXJ0bCcpO1xuICB9XG5cbiAgdGhpcy5nZXRTaXplKCk7XG4gIC8vIG1vdmUgaW5pdGlhbCBjZWxsIGVsZW1lbnRzIHNvIHRoZXkgY2FuIGJlIGxvYWRlZCBhcyBjZWxsc1xuICB2YXIgY2VsbEVsZW1zID0gdGhpcy5fZmlsdGVyRmluZENlbGxFbGVtZW50cyggdGhpcy5lbGVtZW50LmNoaWxkcmVuICk7XG4gIG1vdmVFbGVtZW50cyggY2VsbEVsZW1zLCB0aGlzLnNsaWRlciApO1xuICB0aGlzLnZpZXdwb3J0LmFwcGVuZENoaWxkKCB0aGlzLnNsaWRlciApO1xuICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoIHRoaXMudmlld3BvcnQgKTtcbiAgLy8gZ2V0IGNlbGxzIGZyb20gY2hpbGRyZW5cbiAgdGhpcy5yZWxvYWRDZWxscygpO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgKSB7XG4gICAgLy8gYWxsb3cgZWxlbWVudCB0byBmb2N1c2FibGVcbiAgICB0aGlzLmVsZW1lbnQudGFiSW5kZXggPSAwO1xuICAgIC8vIGxpc3RlbiBmb3Iga2V5IHByZXNzZXNcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCB0aGlzICk7XG4gIH1cblxuICB0aGlzLmVtaXRFdmVudCgnYWN0aXZhdGUnKTtcbiAgdGhpcy5zZWxlY3RJbml0aWFsSW5kZXgoKTtcbiAgLy8gZmxhZyBmb3IgaW5pdGlhbCBhY3RpdmF0aW9uLCBmb3IgdXNpbmcgaW5pdGlhbEluZGV4XG4gIHRoaXMuaXNJbml0QWN0aXZhdGVkID0gdHJ1ZTtcbiAgLy8gcmVhZHkgZXZlbnQuICM0OTNcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCdyZWFkeScpO1xufTtcblxuLy8gc2xpZGVyIHBvc2l0aW9ucyB0aGUgY2VsbHNcbnByb3RvLl9jcmVhdGVTbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgLy8gc2xpZGVyIGVsZW1lbnQgZG9lcyBhbGwgdGhlIHBvc2l0aW9uaW5nXG4gIHZhciBzbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc2xpZGVyLmNsYXNzTmFtZSA9ICdmbGlja2l0eS1zbGlkZXInO1xuICBzbGlkZXIuc3R5bGVbIHRoaXMub3JpZ2luU2lkZSBdID0gMDtcbiAgdGhpcy5zbGlkZXIgPSBzbGlkZXI7XG59O1xuXG5wcm90by5fZmlsdGVyRmluZENlbGxFbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgcmV0dXJuIHV0aWxzLmZpbHRlckZpbmRFbGVtZW50cyggZWxlbXMsIHRoaXMub3B0aW9ucy5jZWxsU2VsZWN0b3IgKTtcbn07XG5cbi8vIGdvZXMgdGhyb3VnaCBhbGwgY2hpbGRyZW5cbnByb3RvLnJlbG9hZENlbGxzID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNvbGxlY3Rpb24gb2YgaXRlbSBlbGVtZW50c1xuICB0aGlzLmNlbGxzID0gdGhpcy5fbWFrZUNlbGxzKCB0aGlzLnNsaWRlci5jaGlsZHJlbiApO1xuICB0aGlzLnBvc2l0aW9uQ2VsbHMoKTtcbiAgdGhpcy5fZ2V0V3JhcFNoaWZ0Q2VsbHMoKTtcbiAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSgpO1xufTtcblxuLyoqXG4gKiB0dXJuIGVsZW1lbnRzIGludG8gRmxpY2tpdHkuQ2VsbHNcbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgSFRNTEVsZW1lbnR9IGVsZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGl0ZW1zIC0gY29sbGVjdGlvbiBvZiBuZXcgRmxpY2tpdHkgQ2VsbHNcbiAqL1xucHJvdG8uX21ha2VDZWxscyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGNlbGxFbGVtcyA9IHRoaXMuX2ZpbHRlckZpbmRDZWxsRWxlbWVudHMoIGVsZW1zICk7XG5cbiAgLy8gY3JlYXRlIG5ldyBGbGlja2l0eSBmb3IgY29sbGVjdGlvblxuICB2YXIgY2VsbHMgPSBjZWxsRWxlbXMubWFwKCBmdW5jdGlvbiggY2VsbEVsZW0gKSB7XG4gICAgcmV0dXJuIG5ldyBDZWxsKCBjZWxsRWxlbSwgdGhpcyApO1xuICB9LCB0aGlzICk7XG5cbiAgcmV0dXJuIGNlbGxzO1xufTtcblxucHJvdG8uZ2V0TGFzdENlbGwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VsbHNbIHRoaXMuY2VsbHMubGVuZ3RoIC0gMSBdO1xufTtcblxucHJvdG8uZ2V0TGFzdFNsaWRlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNsaWRlc1sgdGhpcy5zbGlkZXMubGVuZ3RoIC0gMSBdO1xufTtcblxuLy8gcG9zaXRpb25zIGFsbCBjZWxsc1xucHJvdG8ucG9zaXRpb25DZWxscyA9IGZ1bmN0aW9uKCkge1xuICAvLyBzaXplIGFsbCBjZWxsc1xuICB0aGlzLl9zaXplQ2VsbHMoIHRoaXMuY2VsbHMgKTtcbiAgLy8gcG9zaXRpb24gYWxsIGNlbGxzXG4gIHRoaXMuX3Bvc2l0aW9uQ2VsbHMoIDAgKTtcbn07XG5cbi8qKlxuICogcG9zaXRpb24gY2VydGFpbiBjZWxsc1xuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIHdoaWNoIGNlbGwgdG8gc3RhcnQgd2l0aFxuICovXG5wcm90by5fcG9zaXRpb25DZWxscyA9IGZ1bmN0aW9uKCBpbmRleCApIHtcbiAgaW5kZXggPSBpbmRleCB8fCAwO1xuICAvLyBhbHNvIG1lYXN1cmUgbWF4Q2VsbEhlaWdodFxuICAvLyBzdGFydCAwIGlmIHBvc2l0aW9uaW5nIGFsbCBjZWxsc1xuICB0aGlzLm1heENlbGxIZWlnaHQgPSBpbmRleCA/IHRoaXMubWF4Q2VsbEhlaWdodCB8fCAwIDogMDtcbiAgdmFyIGNlbGxYID0gMDtcbiAgLy8gZ2V0IGNlbGxYXG4gIGlmICggaW5kZXggPiAwICkge1xuICAgIHZhciBzdGFydENlbGwgPSB0aGlzLmNlbGxzWyBpbmRleCAtIDEgXTtcbiAgICBjZWxsWCA9IHN0YXJ0Q2VsbC54ICsgc3RhcnRDZWxsLnNpemUub3V0ZXJXaWR0aDtcbiAgfVxuICB2YXIgbGVuID0gdGhpcy5jZWxscy5sZW5ndGg7XG4gIGZvciAoIHZhciBpPWluZGV4OyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxzW2ldO1xuICAgIGNlbGwuc2V0UG9zaXRpb24oIGNlbGxYICk7XG4gICAgY2VsbFggKz0gY2VsbC5zaXplLm91dGVyV2lkdGg7XG4gICAgdGhpcy5tYXhDZWxsSGVpZ2h0ID0gTWF0aC5tYXgoIGNlbGwuc2l6ZS5vdXRlckhlaWdodCwgdGhpcy5tYXhDZWxsSGVpZ2h0ICk7XG4gIH1cbiAgLy8ga2VlcCB0cmFjayBvZiBjZWxsWCBmb3Igd3JhcC1hcm91bmRcbiAgdGhpcy5zbGlkZWFibGVXaWR0aCA9IGNlbGxYO1xuICAvLyBzbGlkZXNcbiAgdGhpcy51cGRhdGVTbGlkZXMoKTtcbiAgLy8gY29udGFpbiBzbGlkZXMgdGFyZ2V0XG4gIHRoaXMuX2NvbnRhaW5TbGlkZXMoKTtcbiAgLy8gdXBkYXRlIHNsaWRlc1dpZHRoXG4gIHRoaXMuc2xpZGVzV2lkdGggPSBsZW4gPyB0aGlzLmdldExhc3RTbGlkZSgpLnRhcmdldCAtIHRoaXMuc2xpZGVzWzBdLnRhcmdldCA6IDA7XG59O1xuXG4vKipcbiAqIGNlbGwuZ2V0U2l6ZSgpIG9uIG11bHRpcGxlIGNlbGxzXG4gKiBAcGFyYW0ge0FycmF5fSBjZWxsc1xuICovXG5wcm90by5fc2l6ZUNlbGxzID0gZnVuY3Rpb24oIGNlbGxzICkge1xuICBjZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLmdldFNpemUoKTtcbiAgfSk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8udXBkYXRlU2xpZGVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2xpZGVzID0gW107XG4gIGlmICggIXRoaXMuY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzbGlkZSA9IG5ldyBTbGlkZSggdGhpcyApO1xuICB0aGlzLnNsaWRlcy5wdXNoKCBzbGlkZSApO1xuICB2YXIgaXNPcmlnaW5MZWZ0ID0gdGhpcy5vcmlnaW5TaWRlID09ICdsZWZ0JztcbiAgdmFyIG5leHRNYXJnaW4gPSBpc09yaWdpbkxlZnQgPyAnbWFyZ2luUmlnaHQnIDogJ21hcmdpbkxlZnQnO1xuXG4gIHZhciBjYW5DZWxsRml0ID0gdGhpcy5fZ2V0Q2FuQ2VsbEZpdCgpO1xuXG4gIHRoaXMuY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwsIGkgKSB7XG4gICAgLy8ganVzdCBhZGQgY2VsbCBpZiBmaXJzdCBjZWxsIGluIHNsaWRlXG4gICAgaWYgKCAhc2xpZGUuY2VsbHMubGVuZ3RoICkge1xuICAgICAgc2xpZGUuYWRkQ2VsbCggY2VsbCApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzbGlkZVdpZHRoID0gKCBzbGlkZS5vdXRlcldpZHRoIC0gc2xpZGUuZmlyc3RNYXJnaW4gKSArXG4gICAgICAoIGNlbGwuc2l6ZS5vdXRlcldpZHRoIC0gY2VsbC5zaXplWyBuZXh0TWFyZ2luIF0gKTtcblxuICAgIGlmICggY2FuQ2VsbEZpdC5jYWxsKCB0aGlzLCBpLCBzbGlkZVdpZHRoICkgKSB7XG4gICAgICBzbGlkZS5hZGRDZWxsKCBjZWxsICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRvZXNuJ3QgZml0LCBuZXcgc2xpZGVcbiAgICAgIHNsaWRlLnVwZGF0ZVRhcmdldCgpO1xuXG4gICAgICBzbGlkZSA9IG5ldyBTbGlkZSggdGhpcyApO1xuICAgICAgdGhpcy5zbGlkZXMucHVzaCggc2xpZGUgKTtcbiAgICAgIHNsaWRlLmFkZENlbGwoIGNlbGwgKTtcbiAgICB9XG4gIH0sIHRoaXMgKTtcbiAgLy8gbGFzdCBzbGlkZVxuICBzbGlkZS51cGRhdGVUYXJnZXQoKTtcbiAgLy8gdXBkYXRlIC5zZWxlY3RlZFNsaWRlXG4gIHRoaXMudXBkYXRlU2VsZWN0ZWRTbGlkZSgpO1xufTtcblxucHJvdG8uX2dldENhbkNlbGxGaXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGdyb3VwQ2VsbHMgPSB0aGlzLm9wdGlvbnMuZ3JvdXBDZWxscztcbiAgaWYgKCAhZ3JvdXBDZWxscyApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIGdyb3VwQ2VsbHMgPT0gJ251bWJlcicgKSB7XG4gICAgLy8gZ3JvdXAgYnkgbnVtYmVyLiAzIC0+IFswLDEsMl0sIFszLDQsNV0sIC4uLlxuICAgIHZhciBudW1iZXIgPSBwYXJzZUludCggZ3JvdXBDZWxscywgMTAgKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oIGkgKSB7XG4gICAgICByZXR1cm4gKCBpICUgbnVtYmVyICkgIT09IDA7XG4gICAgfTtcbiAgfVxuICAvLyBkZWZhdWx0LCBncm91cCBieSB3aWR0aCBvZiBzbGlkZVxuICAvLyBwYXJzZSAnNzUlXG4gIHZhciBwZXJjZW50TWF0Y2ggPSB0eXBlb2YgZ3JvdXBDZWxscyA9PSAnc3RyaW5nJyAmJlxuICAgIGdyb3VwQ2VsbHMubWF0Y2goL14oXFxkKyklJC8pO1xuICB2YXIgcGVyY2VudCA9IHBlcmNlbnRNYXRjaCA/IHBhcnNlSW50KCBwZXJjZW50TWF0Y2hbMV0sIDEwICkgLyAxMDAgOiAxO1xuICByZXR1cm4gZnVuY3Rpb24oIGksIHNsaWRlV2lkdGggKSB7XG4gICAgcmV0dXJuIHNsaWRlV2lkdGggPD0gKCB0aGlzLnNpemUuaW5uZXJXaWR0aCArIDEgKSAqIHBlcmNlbnQ7XG4gIH07XG59O1xuXG4vLyBhbGlhcyBfaW5pdCBmb3IgalF1ZXJ5IHBsdWdpbiAuZmxpY2tpdHkoKVxucHJvdG8uX2luaXQgPVxucHJvdG8ucmVwb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBvc2l0aW9uQ2VsbHMoKTtcbiAgdGhpcy5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQoKTtcbn07XG5cbnByb3RvLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG4gIHRoaXMuc2V0Q2VsbEFsaWduKCk7XG4gIHRoaXMuY3Vyc29yUG9zaXRpb24gPSB0aGlzLnNpemUuaW5uZXJXaWR0aCAqIHRoaXMuY2VsbEFsaWduO1xufTtcblxudmFyIGNlbGxBbGlnblNob3J0aGFuZHMgPSB7XG4gIC8vIGNlbGwgYWxpZ24sIHRoZW4gYmFzZWQgb24gb3JpZ2luIHNpZGVcbiAgY2VudGVyOiB7XG4gICAgbGVmdDogMC41LFxuICAgIHJpZ2h0OiAwLjVcbiAgfSxcbiAgbGVmdDoge1xuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDFcbiAgfSxcbiAgcmlnaHQ6IHtcbiAgICByaWdodDogMCxcbiAgICBsZWZ0OiAxXG4gIH1cbn07XG5cbnByb3RvLnNldENlbGxBbGlnbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2hvcnRoYW5kID0gY2VsbEFsaWduU2hvcnRoYW5kc1sgdGhpcy5vcHRpb25zLmNlbGxBbGlnbiBdO1xuICB0aGlzLmNlbGxBbGlnbiA9IHNob3J0aGFuZCA/IHNob3J0aGFuZFsgdGhpcy5vcmlnaW5TaWRlIF0gOiB0aGlzLm9wdGlvbnMuY2VsbEFsaWduO1xufTtcblxucHJvdG8uc2V0R2FsbGVyeVNpemUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLm9wdGlvbnMuc2V0R2FsbGVyeVNpemUgKSB7XG4gICAgdmFyIGhlaWdodCA9IHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCAmJiB0aGlzLnNlbGVjdGVkU2xpZGUgP1xuICAgICAgdGhpcy5zZWxlY3RlZFNsaWRlLmhlaWdodCA6IHRoaXMubWF4Q2VsbEhlaWdodDtcbiAgICB0aGlzLnZpZXdwb3J0LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gIH1cbn07XG5cbnByb3RvLl9nZXRXcmFwU2hpZnRDZWxscyA9IGZ1bmN0aW9uKCkge1xuICAvLyBvbmx5IGZvciB3cmFwLWFyb3VuZFxuICBpZiAoICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gdW5zaGlmdCBwcmV2aW91cyBjZWxsc1xuICB0aGlzLl91bnNoaWZ0Q2VsbHMoIHRoaXMuYmVmb3JlU2hpZnRDZWxscyApO1xuICB0aGlzLl91bnNoaWZ0Q2VsbHMoIHRoaXMuYWZ0ZXJTaGlmdENlbGxzICk7XG4gIC8vIGdldCBiZWZvcmUgY2VsbHNcbiAgLy8gaW5pdGlhbCBnYXBcbiAgdmFyIGdhcFggPSB0aGlzLmN1cnNvclBvc2l0aW9uO1xuICB2YXIgY2VsbEluZGV4ID0gdGhpcy5jZWxscy5sZW5ndGggLSAxO1xuICB0aGlzLmJlZm9yZVNoaWZ0Q2VsbHMgPSB0aGlzLl9nZXRHYXBDZWxscyggZ2FwWCwgY2VsbEluZGV4LCAtMSApO1xuICAvLyBnZXQgYWZ0ZXIgY2VsbHNcbiAgLy8gZW5kaW5nIGdhcCBiZXR3ZWVuIGxhc3QgY2VsbCBhbmQgZW5kIG9mIGdhbGxlcnkgdmlld3BvcnRcbiAgZ2FwWCA9IHRoaXMuc2l6ZS5pbm5lcldpZHRoIC0gdGhpcy5jdXJzb3JQb3NpdGlvbjtcbiAgLy8gc3RhcnQgY2xvbmluZyBhdCBmaXJzdCBjZWxsLCB3b3JraW5nIGZvcndhcmRzXG4gIHRoaXMuYWZ0ZXJTaGlmdENlbGxzID0gdGhpcy5fZ2V0R2FwQ2VsbHMoIGdhcFgsIDAsIDEgKTtcbn07XG5cbnByb3RvLl9nZXRHYXBDZWxscyA9IGZ1bmN0aW9uKCBnYXBYLCBjZWxsSW5kZXgsIGluY3JlbWVudCApIHtcbiAgLy8ga2VlcCBhZGRpbmcgY2VsbHMgdW50aWwgdGhlIGNvdmVyIHRoZSBpbml0aWFsIGdhcFxuICB2YXIgY2VsbHMgPSBbXTtcbiAgd2hpbGUgKCBnYXBYID4gMCApIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMuY2VsbHNbIGNlbGxJbmRleCBdO1xuICAgIGlmICggIWNlbGwgKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2VsbHMucHVzaCggY2VsbCApO1xuICAgIGNlbGxJbmRleCArPSBpbmNyZW1lbnQ7XG4gICAgZ2FwWCAtPSBjZWxsLnNpemUub3V0ZXJXaWR0aDtcbiAgfVxuICByZXR1cm4gY2VsbHM7XG59O1xuXG4vLyAtLS0tLSBjb250YWluIC0tLS0tIC8vXG5cbi8vIGNvbnRhaW4gY2VsbCB0YXJnZXRzIHNvIG5vIGV4Y2VzcyBzbGlkaW5nXG5wcm90by5fY29udGFpblNsaWRlcyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuY29udGFpbiB8fCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCB8fCAhdGhpcy5jZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpc1JpZ2h0VG9MZWZ0ID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0O1xuICB2YXIgYmVnaW5NYXJnaW4gPSBpc1JpZ2h0VG9MZWZ0ID8gJ21hcmdpblJpZ2h0JyA6ICdtYXJnaW5MZWZ0JztcbiAgdmFyIGVuZE1hcmdpbiA9IGlzUmlnaHRUb0xlZnQgPyAnbWFyZ2luTGVmdCcgOiAnbWFyZ2luUmlnaHQnO1xuICB2YXIgY29udGVudFdpZHRoID0gdGhpcy5zbGlkZWFibGVXaWR0aCAtIHRoaXMuZ2V0TGFzdENlbGwoKS5zaXplWyBlbmRNYXJnaW4gXTtcbiAgLy8gY29udGVudCBpcyBsZXNzIHRoYW4gZ2FsbGVyeSBzaXplXG4gIHZhciBpc0NvbnRlbnRTbWFsbGVyID0gY29udGVudFdpZHRoIDwgdGhpcy5zaXplLmlubmVyV2lkdGg7XG4gIC8vIGJvdW5kc1xuICB2YXIgYmVnaW5Cb3VuZCA9IHRoaXMuY3Vyc29yUG9zaXRpb24gKyB0aGlzLmNlbGxzWzBdLnNpemVbIGJlZ2luTWFyZ2luIF07XG4gIHZhciBlbmRCb3VuZCA9IGNvbnRlbnRXaWR0aCAtIHRoaXMuc2l6ZS5pbm5lcldpZHRoICogKCAxIC0gdGhpcy5jZWxsQWxpZ24gKTtcbiAgLy8gY29udGFpbiBlYWNoIGNlbGwgdGFyZ2V0XG4gIHRoaXMuc2xpZGVzLmZvckVhY2goIGZ1bmN0aW9uKCBzbGlkZSApIHtcbiAgICBpZiAoIGlzQ29udGVudFNtYWxsZXIgKSB7XG4gICAgICAvLyBhbGwgY2VsbHMgZml0IGluc2lkZSBnYWxsZXJ5XG4gICAgICBzbGlkZS50YXJnZXQgPSBjb250ZW50V2lkdGggKiB0aGlzLmNlbGxBbGlnbjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29udGFpbiB0byBib3VuZHNcbiAgICAgIHNsaWRlLnRhcmdldCA9IE1hdGgubWF4KCBzbGlkZS50YXJnZXQsIGJlZ2luQm91bmQgKTtcbiAgICAgIHNsaWRlLnRhcmdldCA9IE1hdGgubWluKCBzbGlkZS50YXJnZXQsIGVuZEJvdW5kICk7XG4gICAgfVxuICB9LCB0aGlzICk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuLyoqXG4gKiBlbWl0cyBldmVudHMgdmlhIGV2ZW50RW1pdHRlciBhbmQgalF1ZXJ5IGV2ZW50c1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBuYW1lIG9mIGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIG9yaWdpbmFsIGV2ZW50XG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIC0gZXh0cmEgYXJndW1lbnRzXG4gKi9cbnByb3RvLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiggdHlwZSwgZXZlbnQsIGFyZ3MgKSB7XG4gIHZhciBlbWl0QXJncyA9IGV2ZW50ID8gWyBldmVudCBdLmNvbmNhdCggYXJncyApIDogYXJncztcbiAgdGhpcy5lbWl0RXZlbnQoIHR5cGUsIGVtaXRBcmdzICk7XG5cbiAgaWYgKCBqUXVlcnkgJiYgdGhpcy4kZWxlbWVudCApIHtcbiAgICAvLyBkZWZhdWx0IHRyaWdnZXIgd2l0aCB0eXBlIGlmIG5vIGV2ZW50XG4gICAgdHlwZSArPSB0aGlzLm9wdGlvbnMubmFtZXNwYWNlSlF1ZXJ5RXZlbnRzID8gJy5mbGlja2l0eScgOiAnJztcbiAgICB2YXIgJGV2ZW50ID0gdHlwZTtcbiAgICBpZiAoIGV2ZW50ICkge1xuICAgICAgLy8gY3JlYXRlIGpRdWVyeSBldmVudFxuICAgICAgdmFyIGpRRXZlbnQgPSBqUXVlcnkuRXZlbnQoIGV2ZW50ICk7XG4gICAgICBqUUV2ZW50LnR5cGUgPSB0eXBlO1xuICAgICAgJGV2ZW50ID0galFFdmVudDtcbiAgICB9XG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCAkZXZlbnQsIGFyZ3MgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2VsZWN0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIGluZGV4IG9mIHRoZSBzbGlkZVxuICogQHBhcmFtIHtCb29sZWFufSBpc1dyYXAgLSB3aWxsIHdyYXAtYXJvdW5kIHRvIGxhc3QvZmlyc3QgaWYgYXQgdGhlIGVuZFxuICogQHBhcmFtIHtCb29sZWFufSBpc0luc3RhbnQgLSB3aWxsIGltbWVkaWF0ZWx5IHNldCBwb3NpdGlvbiBhdCBzZWxlY3RlZCBjZWxsXG4gKi9cbnByb3RvLnNlbGVjdCA9IGZ1bmN0aW9uKCBpbmRleCwgaXNXcmFwLCBpc0luc3RhbnQgKSB7XG4gIGlmICggIXRoaXMuaXNBY3RpdmUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGluZGV4ID0gcGFyc2VJbnQoIGluZGV4LCAxMCApO1xuICB0aGlzLl93cmFwU2VsZWN0KCBpbmRleCApO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLndyYXBBcm91bmQgfHwgaXNXcmFwICkge1xuICAgIGluZGV4ID0gdXRpbHMubW9kdWxvKCBpbmRleCwgdGhpcy5zbGlkZXMubGVuZ3RoICk7XG4gIH1cbiAgLy8gYmFpbCBpZiBpbnZhbGlkIGluZGV4XG4gIGlmICggIXRoaXMuc2xpZGVzWyBpbmRleCBdICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcHJldkluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4O1xuICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgdGhpcy51cGRhdGVTZWxlY3RlZFNsaWRlKCk7XG4gIGlmICggaXNJbnN0YW50ICkge1xuICAgIHRoaXMucG9zaXRpb25TbGlkZXJBdFNlbGVjdGVkKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zdGFydEFuaW1hdGlvbigpO1xuICB9XG4gIGlmICggdGhpcy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ICkge1xuICAgIHRoaXMuc2V0R2FsbGVyeVNpemUoKTtcbiAgfVxuICAvLyBldmVudHNcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnc2VsZWN0JywgbnVsbCwgWyBpbmRleCBdICk7XG4gIC8vIGNoYW5nZSBldmVudCBpZiBuZXcgaW5kZXhcbiAgaWYgKCBpbmRleCAhPSBwcmV2SW5kZXggKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnY2hhbmdlJywgbnVsbCwgWyBpbmRleCBdICk7XG4gIH1cbiAgLy8gb2xkIHYxIGV2ZW50IG5hbWUsIHJlbW92ZSBpbiB2M1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2NlbGxTZWxlY3QnKTtcbn07XG5cbi8vIHdyYXBzIHBvc2l0aW9uIGZvciB3cmFwQXJvdW5kLCB0byBtb3ZlIHRvIGNsb3Nlc3Qgc2xpZGUuICMxMTNcbnByb3RvLl93cmFwU2VsZWN0ID0gZnVuY3Rpb24oIGluZGV4ICkge1xuICB2YXIgbGVuID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICB2YXIgaXNXcmFwcGluZyA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIGxlbiA+IDE7XG4gIGlmICggIWlzV3JhcHBpbmcgKSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG4gIHZhciB3cmFwSW5kZXggPSB1dGlscy5tb2R1bG8oIGluZGV4LCBsZW4gKTtcbiAgLy8gZ28gdG8gc2hvcnRlc3RcbiAgdmFyIGRlbHRhID0gTWF0aC5hYnMoIHdyYXBJbmRleCAtIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICB2YXIgYmFja1dyYXBEZWx0YSA9IE1hdGguYWJzKCAoIHdyYXBJbmRleCArIGxlbiApIC0gdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIHZhciBmb3Jld2FyZFdyYXBEZWx0YSA9IE1hdGguYWJzKCAoIHdyYXBJbmRleCAtIGxlbiApIC0gdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIGlmICggIXRoaXMuaXNEcmFnU2VsZWN0ICYmIGJhY2tXcmFwRGVsdGEgPCBkZWx0YSApIHtcbiAgICBpbmRleCArPSBsZW47XG4gIH0gZWxzZSBpZiAoICF0aGlzLmlzRHJhZ1NlbGVjdCAmJiBmb3Jld2FyZFdyYXBEZWx0YSA8IGRlbHRhICkge1xuICAgIGluZGV4IC09IGxlbjtcbiAgfVxuICAvLyB3cmFwIHBvc2l0aW9uIHNvIHNsaWRlciBpcyB3aXRoaW4gbm9ybWFsIGFyZWFcbiAgaWYgKCBpbmRleCA8IDAgKSB7XG4gICAgdGhpcy54IC09IHRoaXMuc2xpZGVhYmxlV2lkdGg7XG4gIH0gZWxzZSBpZiAoIGluZGV4ID49IGxlbiApIHtcbiAgICB0aGlzLnggKz0gdGhpcy5zbGlkZWFibGVXaWR0aDtcbiAgfVxufTtcblxucHJvdG8ucHJldmlvdXMgPSBmdW5jdGlvbiggaXNXcmFwLCBpc0luc3RhbnQgKSB7XG4gIHRoaXMuc2VsZWN0KCB0aGlzLnNlbGVjdGVkSW5kZXggLSAxLCBpc1dyYXAsIGlzSW5zdGFudCApO1xufTtcblxucHJvdG8ubmV4dCA9IGZ1bmN0aW9uKCBpc1dyYXAsIGlzSW5zdGFudCApIHtcbiAgdGhpcy5zZWxlY3QoIHRoaXMuc2VsZWN0ZWRJbmRleCArIDEsIGlzV3JhcCwgaXNJbnN0YW50ICk7XG59O1xuXG5wcm90by51cGRhdGVTZWxlY3RlZFNsaWRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzbGlkZSA9IHRoaXMuc2xpZGVzWyB0aGlzLnNlbGVjdGVkSW5kZXggXTtcbiAgLy8gc2VsZWN0ZWRJbmRleCBjb3VsZCBiZSBvdXRzaWRlIG9mIHNsaWRlcywgaWYgdHJpZ2dlcmVkIGJlZm9yZSByZXNpemUoKVxuICBpZiAoICFzbGlkZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gdW5zZWxlY3QgcHJldmlvdXMgc2VsZWN0ZWQgc2xpZGVcbiAgdGhpcy51bnNlbGVjdFNlbGVjdGVkU2xpZGUoKTtcbiAgLy8gdXBkYXRlIG5ldyBzZWxlY3RlZCBzbGlkZVxuICB0aGlzLnNlbGVjdGVkU2xpZGUgPSBzbGlkZTtcbiAgc2xpZGUuc2VsZWN0KCk7XG4gIHRoaXMuc2VsZWN0ZWRDZWxscyA9IHNsaWRlLmNlbGxzO1xuICB0aGlzLnNlbGVjdGVkRWxlbWVudHMgPSBzbGlkZS5nZXRDZWxsRWxlbWVudHMoKTtcbiAgLy8gSEFDSzogc2VsZWN0ZWRDZWxsICYgc2VsZWN0ZWRFbGVtZW50IGlzIGZpcnN0IGNlbGwgaW4gc2xpZGUsIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gIC8vIFJlbW92ZSBpbiB2Mz9cbiAgdGhpcy5zZWxlY3RlZENlbGwgPSBzbGlkZS5jZWxsc1swXTtcbiAgdGhpcy5zZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnNlbGVjdGVkRWxlbWVudHNbMF07XG59O1xuXG5wcm90by51bnNlbGVjdFNlbGVjdGVkU2xpZGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLnNlbGVjdGVkU2xpZGUgKSB7XG4gICAgdGhpcy5zZWxlY3RlZFNsaWRlLnVuc2VsZWN0KCk7XG4gIH1cbn07XG5cbnByb3RvLnNlbGVjdEluaXRpYWxJbmRleCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaW5pdGlhbEluZGV4ID0gdGhpcy5vcHRpb25zLmluaXRpYWxJbmRleDtcbiAgLy8gYWxyZWFkeSBhY3RpdmF0ZWQsIHNlbGVjdCBwcmV2aW91cyBzZWxlY3RlZEluZGV4XG4gIGlmICggdGhpcy5pc0luaXRBY3RpdmF0ZWQgKSB7XG4gICAgdGhpcy5zZWxlY3QoIHRoaXMuc2VsZWN0ZWRJbmRleCwgZmFsc2UsIHRydWUgKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gc2VsZWN0IHdpdGggc2VsZWN0b3Igc3RyaW5nXG4gIGlmICggaW5pdGlhbEluZGV4ICYmIHR5cGVvZiBpbml0aWFsSW5kZXggPT0gJ3N0cmluZycgKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLnF1ZXJ5Q2VsbCggaW5pdGlhbEluZGV4ICk7XG4gICAgaWYgKCBjZWxsICkge1xuICAgICAgdGhpcy5zZWxlY3RDZWxsKCBpbml0aWFsSW5kZXgsIGZhbHNlLCB0cnVlICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgdmFyIGluZGV4ID0gMDtcbiAgLy8gc2VsZWN0IHdpdGggbnVtYmVyXG4gIGlmICggaW5pdGlhbEluZGV4ICYmIHRoaXMuc2xpZGVzWyBpbml0aWFsSW5kZXggXSApIHtcbiAgICBpbmRleCA9IGluaXRpYWxJbmRleDtcbiAgfVxuICAvLyBzZWxlY3QgaW5zdGFudGx5XG4gIHRoaXMuc2VsZWN0KCBpbmRleCwgZmFsc2UsIHRydWUgKTtcbn07XG5cbi8qKlxuICogc2VsZWN0IHNsaWRlIGZyb20gbnVtYmVyIG9yIGNlbGwgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50IG9yIE51bWJlcn0gZWxlbVxuICovXG5wcm90by5zZWxlY3RDZWxsID0gZnVuY3Rpb24oIHZhbHVlLCBpc1dyYXAsIGlzSW5zdGFudCApIHtcbiAgLy8gZ2V0IGNlbGxcbiAgdmFyIGNlbGwgPSB0aGlzLnF1ZXJ5Q2VsbCggdmFsdWUgKTtcbiAgaWYgKCAhY2VsbCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaW5kZXggPSB0aGlzLmdldENlbGxTbGlkZUluZGV4KCBjZWxsICk7XG4gIHRoaXMuc2VsZWN0KCBpbmRleCwgaXNXcmFwLCBpc0luc3RhbnQgKTtcbn07XG5cbnByb3RvLmdldENlbGxTbGlkZUluZGV4ID0gZnVuY3Rpb24oIGNlbGwgKSB7XG4gIC8vIGdldCBpbmRleCBvZiBzbGlkZXMgdGhhdCBoYXMgY2VsbFxuICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5zbGlkZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIHNsaWRlID0gdGhpcy5zbGlkZXNbaV07XG4gICAgdmFyIGluZGV4ID0gc2xpZGUuY2VsbHMuaW5kZXhPZiggY2VsbCApO1xuICAgIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldCBjZWxscyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGdldCBGbGlja2l0eS5DZWxsLCBnaXZlbiBhbiBFbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtGbGlja2l0eS5DZWxsfSBpdGVtXG4gKi9cbnByb3RvLmdldENlbGwgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgLy8gbG9vcCB0aHJvdWdoIGNlbGxzIHRvIGdldCB0aGUgb25lIHRoYXQgbWF0Y2hlc1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5jZWxscy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMuY2VsbHNbaV07XG4gICAgaWYgKCBjZWxsLmVsZW1lbnQgPT0gZWxlbSApIHtcbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBnZXQgY29sbGVjdGlvbiBvZiBGbGlja2l0eS5DZWxscywgZ2l2ZW4gRWxlbWVudHNcbiAqIEBwYXJhbSB7RWxlbWVudCwgQXJyYXksIE5vZGVMaXN0fSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBjZWxscyAtIEZsaWNraXR5LkNlbGxzXG4gKi9cbnByb3RvLmdldENlbGxzID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgdmFyIGNlbGxzID0gW107XG4gIGVsZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKCBlbGVtICk7XG4gICAgaWYgKCBjZWxsICkge1xuICAgICAgY2VsbHMucHVzaCggY2VsbCApO1xuICAgIH1cbiAgfSwgdGhpcyApO1xuICByZXR1cm4gY2VsbHM7XG59O1xuXG4vKipcbiAqIGdldCBjZWxsIGVsZW1lbnRzXG4gKiBAcmV0dXJucyB7QXJyYXl9IGNlbGxFbGVtc1xuICovXG5wcm90by5nZXRDZWxsRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VsbHMubWFwKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICByZXR1cm4gY2VsbC5lbGVtZW50O1xuICB9KTtcbn07XG5cbi8qKlxuICogZ2V0IHBhcmVudCBjZWxsIGZyb20gYW4gZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcmV0dXJucyB7RmxpY2tpdC5DZWxsfSBjZWxsXG4gKi9cbnByb3RvLmdldFBhcmVudENlbGwgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgLy8gZmlyc3QgY2hlY2sgaWYgZWxlbSBpcyBjZWxsXG4gIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKCBlbGVtICk7XG4gIGlmICggY2VsbCApIHtcbiAgICByZXR1cm4gY2VsbDtcbiAgfVxuICAvLyB0cnkgdG8gZ2V0IHBhcmVudCBjZWxsIGVsZW1cbiAgZWxlbSA9IHV0aWxzLmdldFBhcmVudCggZWxlbSwgJy5mbGlja2l0eS1zbGlkZXIgPiAqJyApO1xuICByZXR1cm4gdGhpcy5nZXRDZWxsKCBlbGVtICk7XG59O1xuXG4vKipcbiAqIGdldCBjZWxscyBhZGphY2VudCB0byBhIHNsaWRlXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGFkakNvdW50IC0gbnVtYmVyIG9mIGFkamFjZW50IHNsaWRlc1xuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIGluZGV4IG9mIHNsaWRlIHRvIHN0YXJ0XG4gKiBAcmV0dXJucyB7QXJyYXl9IGNlbGxzIC0gYXJyYXkgb2YgRmxpY2tpdHkuQ2VsbHNcbiAqL1xucHJvdG8uZ2V0QWRqYWNlbnRDZWxsRWxlbWVudHMgPSBmdW5jdGlvbiggYWRqQ291bnQsIGluZGV4ICkge1xuICBpZiAoICFhZGpDb3VudCApIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFNsaWRlLmdldENlbGxFbGVtZW50cygpO1xuICB9XG4gIGluZGV4ID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRoaXMuc2VsZWN0ZWRJbmRleCA6IGluZGV4O1xuXG4gIHZhciBsZW4gPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gIGlmICggMSArICggYWRqQ291bnQgKiAyICkgPj0gbGVuICkge1xuICAgIHJldHVybiB0aGlzLmdldENlbGxFbGVtZW50cygpO1xuICB9XG5cbiAgdmFyIGNlbGxFbGVtcyA9IFtdO1xuICBmb3IgKCB2YXIgaSA9IGluZGV4IC0gYWRqQ291bnQ7IGkgPD0gaW5kZXggKyBhZGpDb3VudCA7IGkrKyApIHtcbiAgICB2YXIgc2xpZGVJbmRleCA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kID8gdXRpbHMubW9kdWxvKCBpLCBsZW4gKSA6IGk7XG4gICAgdmFyIHNsaWRlID0gdGhpcy5zbGlkZXNbIHNsaWRlSW5kZXggXTtcbiAgICBpZiAoIHNsaWRlICkge1xuICAgICAgY2VsbEVsZW1zID0gY2VsbEVsZW1zLmNvbmNhdCggc2xpZGUuZ2V0Q2VsbEVsZW1lbnRzKCkgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNlbGxFbGVtcztcbn07XG5cbi8qKlxuICogc2VsZWN0IHNsaWRlIGZyb20gbnVtYmVyIG9yIGNlbGwgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50LCBTZWxlY3RvciBTdHJpbmcsIG9yIE51bWJlcn0gc2VsZWN0b3JcbiAqL1xucHJvdG8ucXVlcnlDZWxsID0gZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICBpZiAoIHR5cGVvZiBzZWxlY3RvciA9PSAnbnVtYmVyJyApIHtcbiAgICAvLyB1c2UgbnVtYmVyIGFzIGluZGV4XG4gICAgcmV0dXJuIHRoaXMuY2VsbHNbIHNlbGVjdG9yIF07XG4gIH1cbiAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT0gJ3N0cmluZycgKSB7XG4gICAgLy8gZG8gbm90IHNlbGVjdCBpbnZhbGlkIHNlbGVjdG9ycyBmcm9tIGhhc2g6ICMxMjMsICMvLiAjNzkxXG4gICAgaWYgKCBzZWxlY3Rvci5tYXRjaCgvXlsjXFwuXT9bXFxkXFwvXS8pICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyB1c2Ugc3RyaW5nIGFzIHNlbGVjdG9yLCBnZXQgZWxlbWVudFxuICAgIHNlbGVjdG9yID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoIHNlbGVjdG9yICk7XG4gIH1cbiAgLy8gZ2V0IGNlbGwgZnJvbSBlbGVtZW50XG4gIHJldHVybiB0aGlzLmdldENlbGwoIHNlbGVjdG9yICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBldmVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8udWlDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbWl0RXZlbnQoJ3VpQ2hhbmdlJyk7XG59O1xuXG4vLyBrZWVwIGZvY3VzIG9uIGVsZW1lbnQgd2hlbiBjaGlsZCBVSSBlbGVtZW50cyBhcmUgY2xpY2tlZFxucHJvdG8uY2hpbGRVSVBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBIQUNLIGlPUyBkb2VzIG5vdCBhbGxvdyB0b3VjaCBldmVudHMgdG8gYnViYmxlIHVwPyFcbiAgaWYgKCBldmVudC50eXBlICE9ICd0b3VjaHN0YXJ0JyApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIHRoaXMuZm9jdXMoKTtcbn07XG5cbi8vIC0tLS0tIHJlc2l6ZSAtLS0tLSAvL1xuXG5wcm90by5vbnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLndhdGNoQ1NTKCk7XG4gIHRoaXMucmVzaXplKCk7XG59O1xuXG51dGlscy5kZWJvdW5jZU1ldGhvZCggRmxpY2tpdHksICdvbnJlc2l6ZScsIDE1MCApO1xuXG5wcm90by5yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0FjdGl2ZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5nZXRTaXplKCk7XG4gIC8vIHdyYXAgdmFsdWVzXG4gIGlmICggdGhpcy5vcHRpb25zLndyYXBBcm91bmQgKSB7XG4gICAgdGhpcy54ID0gdXRpbHMubW9kdWxvKCB0aGlzLngsIHRoaXMuc2xpZGVhYmxlV2lkdGggKTtcbiAgfVxuICB0aGlzLnBvc2l0aW9uQ2VsbHMoKTtcbiAgdGhpcy5fZ2V0V3JhcFNoaWZ0Q2VsbHMoKTtcbiAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSgpO1xuICB0aGlzLmVtaXRFdmVudCgncmVzaXplJyk7XG4gIC8vIHVwZGF0ZSBzZWxlY3RlZCBpbmRleCBmb3IgZ3JvdXAgc2xpZGVzLCBpbnN0YW50XG4gIC8vIFRPRE86IHBvc2l0aW9uIGNhbiBiZSBsb3N0IGJldHdlZW4gZ3JvdXBzIG9mIHZhcmlvdXMgbnVtYmVyc1xuICB2YXIgc2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zZWxlY3RlZEVsZW1lbnRzICYmIHRoaXMuc2VsZWN0ZWRFbGVtZW50c1swXTtcbiAgdGhpcy5zZWxlY3RDZWxsKCBzZWxlY3RlZEVsZW1lbnQsIGZhbHNlLCB0cnVlICk7XG59O1xuXG4vLyB3YXRjaGVzIHRoZSA6YWZ0ZXIgcHJvcGVydHksIGFjdGl2YXRlcy9kZWFjdGl2YXRlc1xucHJvdG8ud2F0Y2hDU1MgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHdhdGNoT3B0aW9uID0gdGhpcy5vcHRpb25zLndhdGNoQ1NTO1xuICBpZiAoICF3YXRjaE9wdGlvbiApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgYWZ0ZXJDb250ZW50ID0gZ2V0Q29tcHV0ZWRTdHlsZSggdGhpcy5lbGVtZW50LCAnOmFmdGVyJyApLmNvbnRlbnQ7XG4gIC8vIGFjdGl2YXRlIGlmIDphZnRlciB7IGNvbnRlbnQ6ICdmbGlja2l0eScgfVxuICBpZiAoIGFmdGVyQ29udGVudC5pbmRleE9mKCdmbGlja2l0eScpICE9IC0xICkge1xuICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0ga2V5ZG93biAtLS0tLSAvL1xuXG4vLyBnbyBwcmV2aW91cy9uZXh0IGlmIGxlZnQvcmlnaHQga2V5cyBwcmVzc2VkXG5wcm90by5vbmtleWRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIC8vIG9ubHkgd29yayBpZiBlbGVtZW50IGlzIGluIGZvY3VzXG4gIHZhciBpc05vdEZvY3VzZWQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT0gdGhpcy5lbGVtZW50O1xuICBpZiAoICF0aGlzLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSB8fGlzTm90Rm9jdXNlZCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IEZsaWNraXR5LmtleWJvYXJkSGFuZGxlcnNbIGV2ZW50LmtleUNvZGUgXTtcbiAgaWYgKCBoYW5kbGVyICkge1xuICAgIGhhbmRsZXIuY2FsbCggdGhpcyApO1xuICB9XG59O1xuXG5GbGlja2l0eS5rZXlib2FyZEhhbmRsZXJzID0ge1xuICAvLyBsZWZ0IGFycm93XG4gIDM3OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGVmdE1ldGhvZCA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/ICduZXh0JyA6ICdwcmV2aW91cyc7XG4gICAgdGhpcy51aUNoYW5nZSgpO1xuICAgIHRoaXNbIGxlZnRNZXRob2QgXSgpO1xuICB9LFxuICAvLyByaWdodCBhcnJvd1xuICAzOTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJpZ2h0TWV0aG9kID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gJ3ByZXZpb3VzJyA6ICduZXh0JztcbiAgICB0aGlzLnVpQ2hhbmdlKCk7XG4gICAgdGhpc1sgcmlnaHRNZXRob2QgXSgpO1xuICB9LFxufTtcblxuLy8gLS0tLS0gZm9jdXMgLS0tLS0gLy9cblxucHJvdG8uZm9jdXMgPSBmdW5jdGlvbigpIHtcbiAgLy8gVE9ETyByZW1vdmUgc2Nyb2xsVG8gb25jZSBmb2N1cyBvcHRpb25zIGdldHMgbW9yZSBzdXBwb3J0XG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MRWxlbWVudC9mb2N1cyNCcm93c2VyX2NvbXBhdGliaWxpdHlcbiAgdmFyIHByZXZTY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB0aGlzLmVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAvLyBoYWNrIHRvIGZpeCBzY3JvbGwganVtcCBhZnRlciBmb2N1cywgIzc2XG4gIGlmICggd2luZG93LnBhZ2VZT2Zmc2V0ICE9IHByZXZTY3JvbGxZICkge1xuICAgIHdpbmRvdy5zY3JvbGxUbyggd2luZG93LnBhZ2VYT2Zmc2V0LCBwcmV2U2Nyb2xsWSApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkZXN0cm95IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGRlYWN0aXZhdGUgYWxsIEZsaWNraXR5IGZ1bmN0aW9uYWxpdHksIGJ1dCBrZWVwIHN0dWZmIGF2YWlsYWJsZVxucHJvdG8uZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzQWN0aXZlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmxpY2tpdHktZW5hYmxlZCcpO1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmxpY2tpdHktcnRsJyk7XG4gIHRoaXMudW5zZWxlY3RTZWxlY3RlZFNsaWRlKCk7XG4gIC8vIGRlc3Ryb3kgY2VsbHNcbiAgdGhpcy5jZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLmRlc3Ryb3koKTtcbiAgfSk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZCggdGhpcy52aWV3cG9ydCApO1xuICAvLyBtb3ZlIGNoaWxkIGVsZW1lbnRzIGJhY2sgaW50byBlbGVtZW50XG4gIG1vdmVFbGVtZW50cyggdGhpcy5zbGlkZXIuY2hpbGRyZW4sIHRoaXMuZWxlbWVudCApO1xuICBpZiAoIHRoaXMub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ICkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYkluZGV4Jyk7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgdGhpcyApO1xuICB9XG4gIC8vIHNldCBmbGFnc1xuICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gIHRoaXMuZW1pdEV2ZW50KCdkZWFjdGl2YXRlJyk7XG59O1xuXG5wcm90by5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMgKTtcbiAgdGhpcy5hbGxPZmYoKTtcbiAgdGhpcy5lbWl0RXZlbnQoJ2Rlc3Ryb3knKTtcbiAgaWYgKCBqUXVlcnkgJiYgdGhpcy4kZWxlbWVudCApIHtcbiAgICBqUXVlcnkucmVtb3ZlRGF0YSggdGhpcy5lbGVtZW50LCAnZmxpY2tpdHknICk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuZWxlbWVudC5mbGlja2l0eUdVSUQ7XG4gIGRlbGV0ZSBpbnN0YW5jZXNbIHRoaXMuZ3VpZCBdO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcHJvdG90eXBlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggcHJvdG8sIGFuaW1hdGVQcm90b3R5cGUgKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZXh0cmFzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogZ2V0IEZsaWNraXR5IGluc3RhbmNlIGZyb20gZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcmV0dXJucyB7RmxpY2tpdHl9XG4gKi9cbkZsaWNraXR5LmRhdGEgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgZWxlbSA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbSApO1xuICB2YXIgaWQgPSBlbGVtICYmIGVsZW0uZmxpY2tpdHlHVUlEO1xuICByZXR1cm4gaWQgJiYgaW5zdGFuY2VzWyBpZCBdO1xufTtcblxudXRpbHMuaHRtbEluaXQoIEZsaWNraXR5LCAnZmxpY2tpdHknICk7XG5cbmlmICggalF1ZXJ5ICYmIGpRdWVyeS5icmlkZ2V0ICkge1xuICBqUXVlcnkuYnJpZGdldCggJ2ZsaWNraXR5JywgRmxpY2tpdHkgKTtcbn1cblxuLy8gc2V0IGludGVybmFsIGpRdWVyeSwgZm9yIFdlYnBhY2sgKyBqUXVlcnkgdjMsICM0NzhcbkZsaWNraXR5LnNldEpRdWVyeSA9IGZ1bmN0aW9uKCBqcSApIHtcbiAgalF1ZXJ5ID0ganE7XG59O1xuXG5GbGlja2l0eS5DZWxsID0gQ2VsbDtcbkZsaWNraXR5LlNsaWRlID0gU2xpZGU7XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLyohXG4gKiBGbGlja2l0eSB2Mi4yLjFcbiAqIFRvdWNoLCByZXNwb25zaXZlLCBmbGlja2FibGUgY2Fyb3VzZWxzXG4gKlxuICogTGljZW5zZWQgR1BMdjMgZm9yIG9wZW4gc291cmNlIHVzZVxuICogb3IgRmxpY2tpdHkgQ29tbWVyY2lhbCBMaWNlbnNlIGZvciBjb21tZXJjaWFsIHVzZVxuICpcbiAqIGh0dHBzOi8vZmxpY2tpdHkubWV0YWZpenp5LmNvXG4gKiBDb3B5cmlnaHQgMjAxNS0yMDE5IE1ldGFmaXp6eVxuICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAnLi9kcmFnJyxcbiAgICAgICcuL3ByZXYtbmV4dC1idXR0b24nLFxuICAgICAgJy4vcGFnZS1kb3RzJyxcbiAgICAgICcuL3BsYXllcicsXG4gICAgICAnLi9hZGQtcmVtb3ZlLWNlbGwnLFxuICAgICAgJy4vbGF6eWxvYWQnXG4gICAgXSwgZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgnLi9kcmFnJyksXG4gICAgICByZXF1aXJlKCcuL3ByZXYtbmV4dC1idXR0b24nKSxcbiAgICAgIHJlcXVpcmUoJy4vcGFnZS1kb3RzJyksXG4gICAgICByZXF1aXJlKCcuL3BsYXllcicpLFxuICAgICAgcmVxdWlyZSgnLi9hZGQtcmVtb3ZlLWNlbGwnKSxcbiAgICAgIHJlcXVpcmUoJy4vbGF6eWxvYWQnKVxuICAgICk7XG4gIH1cblxufSkoIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggRmxpY2tpdHkgKSB7XG4gIC8qanNoaW50IHN0cmljdDogZmFsc2UqL1xuICByZXR1cm4gRmxpY2tpdHk7XG59KTtcbiIsIi8vIGxhenlsb2FkXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgdXRpbHMgKSB7XG4ndXNlIHN0cmljdCc7XG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZUxhenlsb2FkJyk7XG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVMYXp5bG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9uKCAnc2VsZWN0JywgdGhpcy5sYXp5TG9hZCApO1xufTtcblxucHJvdG8ubGF6eUxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxhenlMb2FkID0gdGhpcy5vcHRpb25zLmxhenlMb2FkO1xuICBpZiAoICFsYXp5TG9hZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZ2V0IGFkamFjZW50IGNlbGxzLCB1c2UgbGF6eUxvYWQgb3B0aW9uIGZvciBhZGphY2VudCBjb3VudFxuICB2YXIgYWRqQ291bnQgPSB0eXBlb2YgbGF6eUxvYWQgPT0gJ251bWJlcicgPyBsYXp5TG9hZCA6IDA7XG4gIHZhciBjZWxsRWxlbXMgPSB0aGlzLmdldEFkamFjZW50Q2VsbEVsZW1lbnRzKCBhZGpDb3VudCApO1xuICAvLyBnZXQgbGF6eSBpbWFnZXMgaW4gdGhvc2UgY2VsbHNcbiAgdmFyIGxhenlJbWFnZXMgPSBbXTtcbiAgY2VsbEVsZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsRWxlbSApIHtcbiAgICB2YXIgbGF6eUNlbGxJbWFnZXMgPSBnZXRDZWxsTGF6eUltYWdlcyggY2VsbEVsZW0gKTtcbiAgICBsYXp5SW1hZ2VzID0gbGF6eUltYWdlcy5jb25jYXQoIGxhenlDZWxsSW1hZ2VzICk7XG4gIH0pO1xuICAvLyBsb2FkIGxhenkgaW1hZ2VzXG4gIGxhenlJbWFnZXMuZm9yRWFjaCggZnVuY3Rpb24oIGltZyApIHtcbiAgICBuZXcgTGF6eUxvYWRlciggaW1nLCB0aGlzICk7XG4gIH0sIHRoaXMgKTtcbn07XG5cbmZ1bmN0aW9uIGdldENlbGxMYXp5SW1hZ2VzKCBjZWxsRWxlbSApIHtcbiAgLy8gY2hlY2sgaWYgY2VsbCBlbGVtZW50IGlzIGxhenkgaW1hZ2VcbiAgaWYgKCBjZWxsRWxlbS5ub2RlTmFtZSA9PSAnSU1HJyApIHtcbiAgICB2YXIgbGF6eWxvYWRBdHRyID0gY2VsbEVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkJyk7XG4gICAgdmFyIHNyY0F0dHIgPSBjZWxsRWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3JjJyk7XG4gICAgdmFyIHNyY3NldEF0dHIgPSBjZWxsRWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3Jjc2V0Jyk7XG4gICAgaWYgKCBsYXp5bG9hZEF0dHIgfHwgc3JjQXR0ciB8fCBzcmNzZXRBdHRyICkge1xuICAgICAgcmV0dXJuIFsgY2VsbEVsZW0gXTtcbiAgICB9XG4gIH1cbiAgLy8gc2VsZWN0IGxhenkgaW1hZ2VzIGluIGNlbGxcbiAgdmFyIGxhenlTZWxlY3RvciA9ICdpbWdbZGF0YS1mbGlja2l0eS1sYXp5bG9hZF0sICcgK1xuICAgICdpbWdbZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmNdLCBpbWdbZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmNzZXRdJztcbiAgdmFyIGltZ3MgPSBjZWxsRWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBsYXp5U2VsZWN0b3IgKTtcbiAgcmV0dXJuIHV0aWxzLm1ha2VBcnJheSggaW1ncyApO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBMYXp5TG9hZGVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogY2xhc3MgdG8gaGFuZGxlIGxvYWRpbmcgaW1hZ2VzXG4gKi9cbmZ1bmN0aW9uIExhenlMb2FkZXIoIGltZywgZmxpY2tpdHkgKSB7XG4gIHRoaXMuaW1nID0gaW1nO1xuICB0aGlzLmZsaWNraXR5ID0gZmxpY2tpdHk7XG4gIHRoaXMubG9hZCgpO1xufVxuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IHV0aWxzLmhhbmRsZUV2ZW50O1xuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaW1nLmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG4gIC8vIGdldCBzcmMgJiBzcmNzZXRcbiAgdmFyIHNyYyA9IHRoaXMuaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZCcpIHx8XG4gICAgdGhpcy5pbWcuZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyYycpO1xuICB2YXIgc3Jjc2V0ID0gdGhpcy5pbWcuZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyY3NldCcpO1xuICAvLyBzZXQgc3JjICYgc2Vyc2V0XG4gIHRoaXMuaW1nLnNyYyA9IHNyYztcbiAgaWYgKCBzcmNzZXQgKSB7XG4gICAgdGhpcy5pbWcuc2V0QXR0cmlidXRlKCAnc3Jjc2V0Jywgc3Jjc2V0ICk7XG4gIH1cbiAgLy8gcmVtb3ZlIGF0dHJcbiAgdGhpcy5pbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkJyk7XG4gIHRoaXMuaW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmMnKTtcbiAgdGhpcy5pbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyY3NldCcpO1xufTtcblxuTGF6eUxvYWRlci5wcm90b3R5cGUub25sb2FkID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLmNvbXBsZXRlKCBldmVudCwgJ2ZsaWNraXR5LWxhenlsb2FkZWQnICk7XG59O1xuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLmNvbXBsZXRlKCBldmVudCwgJ2ZsaWNraXR5LWxhenllcnJvcicgKTtcbn07XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24oIGV2ZW50LCBjbGFzc05hbWUgKSB7XG4gIC8vIHVuYmluZCBldmVudHNcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMuaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcblxuICB2YXIgY2VsbCA9IHRoaXMuZmxpY2tpdHkuZ2V0UGFyZW50Q2VsbCggdGhpcy5pbWcgKTtcbiAgdmFyIGNlbGxFbGVtID0gY2VsbCAmJiBjZWxsLmVsZW1lbnQ7XG4gIHRoaXMuZmxpY2tpdHkuY2VsbFNpemVDaGFuZ2UoIGNlbGxFbGVtICk7XG5cbiAgdGhpcy5pbWcuY2xhc3NMaXN0LmFkZCggY2xhc3NOYW1lICk7XG4gIHRoaXMuZmxpY2tpdHkuZGlzcGF0Y2hFdmVudCggJ2xhenlMb2FkJywgZXZlbnQsIGNlbGxFbGVtICk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuRmxpY2tpdHkuTGF6eUxvYWRlciA9IExhenlMb2FkZXI7XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gcGFnZSBkb3RzXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJ3VuaXBvaW50ZXIvdW5pcG9pbnRlcicsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgndW5pcG9pbnRlcicpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LlVuaXBvaW50ZXIsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICkge1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQYWdlRG90cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFBhZ2VEb3RzKCBwYXJlbnQgKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLl9jcmVhdGUoKTtcbn1cblxuUGFnZURvdHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVW5pcG9pbnRlci5wcm90b3R5cGUgKTtcblxuUGFnZURvdHMucHJvdG90eXBlLl9jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gY3JlYXRlIGhvbGRlciBlbGVtZW50XG4gIHRoaXMuaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKTtcbiAgdGhpcy5ob2xkZXIuY2xhc3NOYW1lID0gJ2ZsaWNraXR5LXBhZ2UtZG90cyc7XG4gIC8vIGNyZWF0ZSBkb3RzLCBhcnJheSBvZiBlbGVtZW50c1xuICB0aGlzLmRvdHMgPSBbXTtcbiAgLy8gZXZlbnRzXG4gIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCggdGhpcyApO1xuICB0aGlzLm9uKCAncG9pbnRlckRvd24nLCB0aGlzLnBhcmVudC5jaGlsZFVJUG9pbnRlckRvd24uYmluZCggdGhpcy5wYXJlbnQgKSApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0RG90cygpO1xuICB0aGlzLmhvbGRlci5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrICk7XG4gIHRoaXMuYmluZFN0YXJ0RXZlbnQoIHRoaXMuaG9sZGVyICk7XG4gIC8vIGFkZCB0byBET01cbiAgdGhpcy5wYXJlbnQuZWxlbWVudC5hcHBlbmRDaGlsZCggdGhpcy5ob2xkZXIgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaG9sZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2sgKTtcbiAgdGhpcy51bmJpbmRTdGFydEV2ZW50KCB0aGlzLmhvbGRlciApO1xuICAvLyByZW1vdmUgZnJvbSBET01cbiAgdGhpcy5wYXJlbnQuZWxlbWVudC5yZW1vdmVDaGlsZCggdGhpcy5ob2xkZXIgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5zZXREb3RzID0gZnVuY3Rpb24oKSB7XG4gIC8vIGdldCBkaWZmZXJlbmNlIGJldHdlZW4gbnVtYmVyIG9mIHNsaWRlcyBhbmQgbnVtYmVyIG9mIGRvdHNcbiAgdmFyIGRlbHRhID0gdGhpcy5wYXJlbnQuc2xpZGVzLmxlbmd0aCAtIHRoaXMuZG90cy5sZW5ndGg7XG4gIGlmICggZGVsdGEgPiAwICkge1xuICAgIHRoaXMuYWRkRG90cyggZGVsdGEgKTtcbiAgfSBlbHNlIGlmICggZGVsdGEgPCAwICkge1xuICAgIHRoaXMucmVtb3ZlRG90cyggLWRlbHRhICk7XG4gIH1cbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5hZGREb3RzID0gZnVuY3Rpb24oIGNvdW50ICkge1xuICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIHZhciBuZXdEb3RzID0gW107XG4gIHZhciBsZW5ndGggPSB0aGlzLmRvdHMubGVuZ3RoO1xuICB2YXIgbWF4ID0gbGVuZ3RoICsgY291bnQ7XG5cbiAgZm9yICggdmFyIGkgPSBsZW5ndGg7IGkgPCBtYXg7IGkrKyApIHtcbiAgICB2YXIgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBkb3QuY2xhc3NOYW1lID0gJ2RvdCc7XG4gICAgZG90LnNldEF0dHJpYnV0ZSggJ2FyaWEtbGFiZWwnLCAnUGFnZSBkb3QgJyArICggaSArIDEgKSApO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCBkb3QgKTtcbiAgICBuZXdEb3RzLnB1c2goIGRvdCApO1xuICB9XG5cbiAgdGhpcy5ob2xkZXIuYXBwZW5kQ2hpbGQoIGZyYWdtZW50ICk7XG4gIHRoaXMuZG90cyA9IHRoaXMuZG90cy5jb25jYXQoIG5ld0RvdHMgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5yZW1vdmVEb3RzID0gZnVuY3Rpb24oIGNvdW50ICkge1xuICAvLyByZW1vdmUgZnJvbSB0aGlzLmRvdHMgY29sbGVjdGlvblxuICB2YXIgcmVtb3ZlRG90cyA9IHRoaXMuZG90cy5zcGxpY2UoIHRoaXMuZG90cy5sZW5ndGggLSBjb3VudCwgY291bnQgKTtcbiAgLy8gcmVtb3ZlIGZyb20gRE9NXG4gIHJlbW92ZURvdHMuZm9yRWFjaCggZnVuY3Rpb24oIGRvdCApIHtcbiAgICB0aGlzLmhvbGRlci5yZW1vdmVDaGlsZCggZG90ICk7XG4gIH0sIHRoaXMgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS51cGRhdGVTZWxlY3RlZCA9IGZ1bmN0aW9uKCkge1xuICAvLyByZW1vdmUgc2VsZWN0ZWQgY2xhc3Mgb24gcHJldmlvdXNcbiAgaWYgKCB0aGlzLnNlbGVjdGVkRG90ICkge1xuICAgIHRoaXMuc2VsZWN0ZWREb3QuY2xhc3NOYW1lID0gJ2RvdCc7XG4gICAgdGhpcy5zZWxlY3RlZERvdC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcpO1xuICB9XG4gIC8vIGRvbid0IHByb2NlZWQgaWYgbm8gZG90c1xuICBpZiAoICF0aGlzLmRvdHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnNlbGVjdGVkRG90ID0gdGhpcy5kb3RzWyB0aGlzLnBhcmVudC5zZWxlY3RlZEluZGV4IF07XG4gIHRoaXMuc2VsZWN0ZWREb3QuY2xhc3NOYW1lID0gJ2RvdCBpcy1zZWxlY3RlZCc7XG4gIHRoaXMuc2VsZWN0ZWREb3Quc2V0QXR0cmlidXRlKCAnYXJpYS1jdXJyZW50JywgJ3N0ZXAnICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUub25UYXAgPSAvLyBvbGQgbWV0aG9kIG5hbWUsIGJhY2t3YXJkcy1jb21wYXRpYmxlXG5QYWdlRG90cy5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgLy8gb25seSBjYXJlIGFib3V0IGRvdCBjbGlja3NcbiAgaWYgKCB0YXJnZXQubm9kZU5hbWUgIT0gJ0xJJyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnBhcmVudC51aUNoYW5nZSgpO1xuICB2YXIgaW5kZXggPSB0aGlzLmRvdHMuaW5kZXhPZiggdGFyZ2V0ICk7XG4gIHRoaXMucGFyZW50LnNlbGVjdCggaW5kZXggKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICB0aGlzLmFsbE9mZigpO1xufTtcblxuRmxpY2tpdHkuUGFnZURvdHMgPSBQYWdlRG90cztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmxpY2tpdHkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBGbGlja2l0eS5kZWZhdWx0cywge1xuICBwYWdlRG90czogdHJ1ZVxufSk7XG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZVBhZ2VEb3RzJyk7XG5cbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxucHJvdG8uX2NyZWF0ZVBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5wYWdlRG90cyApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5wYWdlRG90cyA9IG5ldyBQYWdlRG90cyggdGhpcyApO1xuICAvLyBldmVudHNcbiAgdGhpcy5vbiggJ2FjdGl2YXRlJywgdGhpcy5hY3RpdmF0ZVBhZ2VEb3RzICk7XG4gIHRoaXMub24oICdzZWxlY3QnLCB0aGlzLnVwZGF0ZVNlbGVjdGVkUGFnZURvdHMgKTtcbiAgdGhpcy5vbiggJ2NlbGxDaGFuZ2UnLCB0aGlzLnVwZGF0ZVBhZ2VEb3RzICk7XG4gIHRoaXMub24oICdyZXNpemUnLCB0aGlzLnVwZGF0ZVBhZ2VEb3RzICk7XG4gIHRoaXMub24oICdkZWFjdGl2YXRlJywgdGhpcy5kZWFjdGl2YXRlUGFnZURvdHMgKTtcbn07XG5cbnByb3RvLmFjdGl2YXRlUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy5hY3RpdmF0ZSgpO1xufTtcblxucHJvdG8udXBkYXRlU2VsZWN0ZWRQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBhZ2VEb3RzLnVwZGF0ZVNlbGVjdGVkKCk7XG59O1xuXG5wcm90by51cGRhdGVQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBhZ2VEb3RzLnNldERvdHMoKTtcbn07XG5cbnByb3RvLmRlYWN0aXZhdGVQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBhZ2VEb3RzLmRlYWN0aXZhdGUoKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5GbGlja2l0eS5QYWdlRG90cyA9IFBhZ2VEb3RzO1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIHBsYXllciAmIGF1dG9QbGF5XG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcicsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnLFxuICAgICAgJy4vZmxpY2tpdHknXG4gICAgXSwgZnVuY3Rpb24oIEV2RW1pdHRlciwgdXRpbHMsIEZsaWNraXR5ICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIEV2RW1pdHRlciwgdXRpbHMsIEZsaWNraXR5ICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICByZXF1aXJlKCdldi1lbWl0dGVyJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3cuRXZFbWl0dGVyLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eVxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBFdkVtaXR0ZXIsIHV0aWxzLCBGbGlja2l0eSApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQbGF5ZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gUGxheWVyKCBwYXJlbnQgKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLnN0YXRlID0gJ3N0b3BwZWQnO1xuICAvLyB2aXNpYmlsaXR5IGNoYW5nZSBldmVudCBoYW5kbGVyXG4gIHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlID0gdGhpcy52aXNpYmlsaXR5Q2hhbmdlLmJpbmQoIHRoaXMgKTtcbiAgdGhpcy5vblZpc2liaWxpdHlQbGF5ID0gdGhpcy52aXNpYmlsaXR5UGxheS5iaW5kKCB0aGlzICk7XG59XG5cblBsYXllci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbi8vIHN0YXJ0IHBsYXlcblBsYXllci5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuc3RhdGUgPT0gJ3BsYXlpbmcnICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBkbyBub3QgcGxheSBpZiBwYWdlIGlzIGhpZGRlbiwgc3RhcnQgcGxheWluZyB3aGVuIHBhZ2UgaXMgdmlzaWJsZVxuICB2YXIgaXNQYWdlSGlkZGVuID0gZG9jdW1lbnQuaGlkZGVuO1xuICBpZiAoIGlzUGFnZUhpZGRlbiApIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAndmlzaWJpbGl0eWNoYW5nZScsIHRoaXMub25WaXNpYmlsaXR5UGxheSApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuc3RhdGUgPSAncGxheWluZyc7XG4gIC8vIGxpc3RlbiB0byB2aXNpYmlsaXR5IGNoYW5nZVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAndmlzaWJpbGl0eWNoYW5nZScsIHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlICk7XG4gIC8vIHN0YXJ0IHRpY2tpbmdcbiAgdGhpcy50aWNrKCk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG8gbm90IHRpY2sgaWYgbm90IHBsYXlpbmdcbiAgaWYgKCB0aGlzLnN0YXRlICE9ICdwbGF5aW5nJyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdGltZSA9IHRoaXMucGFyZW50Lm9wdGlvbnMuYXV0b1BsYXk7XG4gIC8vIGRlZmF1bHQgdG8gMyBzZWNvbmRzXG4gIHRpbWUgPSB0eXBlb2YgdGltZSA9PSAnbnVtYmVyJyA/IHRpbWUgOiAzMDAwO1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICAvLyBIQUNLOiByZXNldCB0aWNrcyBpZiBzdG9wcGVkIGFuZCBzdGFydGVkIHdpdGhpbiBpbnRlcnZhbFxuICB0aGlzLmNsZWFyKCk7XG4gIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgIF90aGlzLnBhcmVudC5uZXh0KCB0cnVlICk7XG4gICAgX3RoaXMudGljaygpO1xuICB9LCB0aW1lICk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zdGF0ZSA9ICdzdG9wcGVkJztcbiAgdGhpcy5jbGVhcigpO1xuICAvLyByZW1vdmUgdmlzaWJpbGl0eSBjaGFuZ2UgZXZlbnRcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Zpc2liaWxpdHljaGFuZ2UnLCB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSApO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICBjbGVhclRpbWVvdXQoIHRoaXMudGltZW91dCApO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuc3RhdGUgPT0gJ3BsYXlpbmcnICkge1xuICAgIHRoaXMuc3RhdGUgPSAncGF1c2VkJztcbiAgICB0aGlzLmNsZWFyKCk7XG4gIH1cbn07XG5cblBsYXllci5wcm90b3R5cGUudW5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAvLyByZS1zdGFydCBwbGF5IGlmIHBhdXNlZFxuICBpZiAoIHRoaXMuc3RhdGUgPT0gJ3BhdXNlZCcgKSB7XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cbn07XG5cbi8vIHBhdXNlIGlmIHBhZ2UgdmlzaWJpbGl0eSBpcyBoaWRkZW4sIHVucGF1c2UgaWYgdmlzaWJsZVxuUGxheWVyLnByb3RvdHlwZS52aXNpYmlsaXR5Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpc1BhZ2VIaWRkZW4gPSBkb2N1bWVudC5oaWRkZW47XG4gIHRoaXNbIGlzUGFnZUhpZGRlbiA/ICdwYXVzZScgOiAndW5wYXVzZScgXSgpO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS52aXNpYmlsaXR5UGxheSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXkoKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Zpc2liaWxpdHljaGFuZ2UnLCB0aGlzLm9uVmlzaWJpbGl0eVBsYXkgKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZsaWNraXR5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggRmxpY2tpdHkuZGVmYXVsdHMsIHtcbiAgcGF1c2VBdXRvUGxheU9uSG92ZXI6IHRydWVcbn0pO1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVQbGF5ZXInKTtcbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxucHJvdG8uX2NyZWF0ZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoIHRoaXMgKTtcblxuICB0aGlzLm9uKCAnYWN0aXZhdGUnLCB0aGlzLmFjdGl2YXRlUGxheWVyICk7XG4gIHRoaXMub24oICd1aUNoYW5nZScsIHRoaXMuc3RvcFBsYXllciApO1xuICB0aGlzLm9uKCAncG9pbnRlckRvd24nLCB0aGlzLnN0b3BQbGF5ZXIgKTtcbiAgdGhpcy5vbiggJ2RlYWN0aXZhdGUnLCB0aGlzLmRlYWN0aXZhdGVQbGF5ZXIgKTtcbn07XG5cbnByb3RvLmFjdGl2YXRlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5hdXRvUGxheSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5wbGF5ZXIucGxheSgpO1xuICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZW50ZXInLCB0aGlzICk7XG59O1xuXG4vLyBQbGF5ZXIgQVBJLCBkb24ndCBoYXRlIHRoZSAuLi4gdGhhbmtzIEkga25vdyB3aGVyZSB0aGUgZG9vciBpc1xuXG5wcm90by5wbGF5UGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnBsYXkoKTtcbn07XG5cbnByb3RvLnN0b3BQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xufTtcblxucHJvdG8ucGF1c2VQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIucGF1c2UoKTtcbn07XG5cbnByb3RvLnVucGF1c2VQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIudW5wYXVzZSgpO1xufTtcblxucHJvdG8uZGVhY3RpdmF0ZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci5zdG9wKCk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2VlbnRlcicsIHRoaXMgKTtcbn07XG5cbi8vIC0tLS0tIG1vdXNlZW50ZXIvbGVhdmUgLS0tLS0gLy9cblxuLy8gcGF1c2UgYXV0by1wbGF5IG9uIGhvdmVyXG5wcm90by5vbm1vdXNlZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLnBhdXNlQXV0b1BsYXlPbkhvdmVyICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnBsYXllci5wYXVzZSgpO1xuICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbGVhdmUnLCB0aGlzICk7XG59O1xuXG4vLyByZXN1bWUgYXV0by1wbGF5IG9uIGhvdmVyIG9mZlxucHJvdG8ub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnVucGF1c2UoKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZWxlYXZlJywgdGhpcyApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbkZsaWNraXR5LlBsYXllciA9IFBsYXllcjtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBwcmV2L25leHQgYnV0dG9uc1xuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICd1bmlwb2ludGVyL3VuaXBvaW50ZXInLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ3VuaXBvaW50ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5Vbmlwb2ludGVyLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIHN2Z1VSSSA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFByZXZOZXh0QnV0dG9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIFByZXZOZXh0QnV0dG9uKCBkaXJlY3Rpb24sIHBhcmVudCApIHtcbiAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLl9jcmVhdGUoKTtcbn1cblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVW5pcG9pbnRlci5wcm90b3R5cGUgKTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLl9jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gcHJvcGVydGllc1xuICB0aGlzLmlzRW5hYmxlZCA9IHRydWU7XG4gIHRoaXMuaXNQcmV2aW91cyA9IHRoaXMuZGlyZWN0aW9uID09IC0xO1xuICB2YXIgbGVmdERpcmVjdGlvbiA9IHRoaXMucGFyZW50Lm9wdGlvbnMucmlnaHRUb0xlZnQgPyAxIDogLTE7XG4gIHRoaXMuaXNMZWZ0ID0gdGhpcy5kaXJlY3Rpb24gPT0gbGVmdERpcmVjdGlvbjtcblxuICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBlbGVtZW50LmNsYXNzTmFtZSA9ICdmbGlja2l0eS1idXR0b24gZmxpY2tpdHktcHJldi1uZXh0LWJ1dHRvbic7XG4gIGVsZW1lbnQuY2xhc3NOYW1lICs9IHRoaXMuaXNQcmV2aW91cyA/ICcgcHJldmlvdXMnIDogJyBuZXh0JztcbiAgLy8gcHJldmVudCBidXR0b24gZnJvbSBzdWJtaXR0aW5nIGZvcm0gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTA4MzYwNzYvMTgyMTgzXG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCAndHlwZScsICdidXR0b24nICk7XG4gIC8vIGluaXQgYXMgZGlzYWJsZWRcbiAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoICdhcmlhLWxhYmVsJywgdGhpcy5pc1ByZXZpb3VzID8gJ1ByZXZpb3VzJyA6ICdOZXh0JyApO1xuXG4gIC8vIGNyZWF0ZSBhcnJvd1xuICB2YXIgc3ZnID0gdGhpcy5jcmVhdGVTVkcoKTtcbiAgZWxlbWVudC5hcHBlbmRDaGlsZCggc3ZnICk7XG4gIC8vIGV2ZW50c1xuICB0aGlzLnBhcmVudC5vbiggJ3NlbGVjdCcsIHRoaXMudXBkYXRlLmJpbmQoIHRoaXMgKSApO1xuICB0aGlzLm9uKCAncG9pbnRlckRvd24nLCB0aGlzLnBhcmVudC5jaGlsZFVJUG9pbnRlckRvd24uYmluZCggdGhpcy5wYXJlbnQgKSApO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYmluZFN0YXJ0RXZlbnQoIHRoaXMuZWxlbWVudCApO1xuICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcyApO1xuICAvLyBhZGQgdG8gRE9NXG4gIHRoaXMucGFyZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmRlYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVtb3ZlIGZyb20gRE9NXG4gIHRoaXMucGFyZW50LmVsZW1lbnQucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xuICAvLyBjbGljayBldmVudHNcbiAgdGhpcy51bmJpbmRTdGFydEV2ZW50KCB0aGlzLmVsZW1lbnQgKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMgKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVTVkcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyggc3ZnVVJJLCAnc3ZnJyk7XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoICdjbGFzcycsICdmbGlja2l0eS1idXR0b24taWNvbicgKTtcbiAgc3ZnLnNldEF0dHJpYnV0ZSggJ3ZpZXdCb3gnLCAnMCAwIDEwMCAxMDAnICk7XG4gIHZhciBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCBzdmdVUkksICdwYXRoJyk7XG4gIHZhciBwYXRoTW92ZW1lbnRzID0gZ2V0QXJyb3dNb3ZlbWVudHMoIHRoaXMucGFyZW50Lm9wdGlvbnMuYXJyb3dTaGFwZSApO1xuICBwYXRoLnNldEF0dHJpYnV0ZSggJ2QnLCBwYXRoTW92ZW1lbnRzICk7XG4gIHBhdGguc2V0QXR0cmlidXRlKCAnY2xhc3MnLCAnYXJyb3cnICk7XG4gIC8vIHJvdGF0ZSBhcnJvd1xuICBpZiAoICF0aGlzLmlzTGVmdCApIHtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZSggJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMTAwLCAxMDApIHJvdGF0ZSgxODApICcgKTtcbiAgfVxuICBzdmcuYXBwZW5kQ2hpbGQoIHBhdGggKTtcbiAgcmV0dXJuIHN2Zztcbn07XG5cbi8vIGdldCBTVkcgcGF0aCBtb3ZtZW1lbnRcbmZ1bmN0aW9uIGdldEFycm93TW92ZW1lbnRzKCBzaGFwZSApIHtcbiAgLy8gdXNlIHNoYXBlIGFzIG1vdmVtZW50IGlmIHN0cmluZ1xuICBpZiAoIHR5cGVvZiBzaGFwZSA9PSAnc3RyaW5nJyApIHtcbiAgICByZXR1cm4gc2hhcGU7XG4gIH1cbiAgLy8gY3JlYXRlIG1vdmVtZW50IHN0cmluZ1xuICByZXR1cm4gJ00gJyArIHNoYXBlLngwICsgJyw1MCcgK1xuICAgICcgTCAnICsgc2hhcGUueDEgKyAnLCcgKyAoIHNoYXBlLnkxICsgNTAgKSArXG4gICAgJyBMICcgKyBzaGFwZS54MiArICcsJyArICggc2hhcGUueTIgKyA1MCApICtcbiAgICAnIEwgJyArIHNoYXBlLngzICsgJyw1MCAnICtcbiAgICAnIEwgJyArIHNoYXBlLngyICsgJywnICsgKCA1MCAtIHNoYXBlLnkyICkgK1xuICAgICcgTCAnICsgc2hhcGUueDEgKyAnLCcgKyAoIDUwIC0gc2hhcGUueTEgKSArXG4gICAgJyBaJztcbn1cblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gdXRpbHMuaGFuZGxlRXZlbnQ7XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNFbmFibGVkICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnBhcmVudC51aUNoYW5nZSgpO1xuICB2YXIgbWV0aG9kID0gdGhpcy5pc1ByZXZpb3VzID8gJ3ByZXZpb3VzJyA6ICduZXh0JztcbiAgdGhpcy5wYXJlbnRbIG1ldGhvZCBdKCk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuaXNFbmFibGVkICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgdGhpcy5pc0VuYWJsZWQgPSB0cnVlO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0VuYWJsZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gIHRoaXMuaXNFbmFibGVkID0gZmFsc2U7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGluZGV4IG9mIGZpcnN0IG9yIGxhc3Qgc2xpZGUsIGlmIHByZXZpb3VzIG9yIG5leHRcbiAgdmFyIHNsaWRlcyA9IHRoaXMucGFyZW50LnNsaWRlcztcbiAgLy8gZW5hYmxlIGlzIHdyYXBBcm91bmQgYW5kIGF0IGxlYXN0IDIgc2xpZGVzXG4gIGlmICggdGhpcy5wYXJlbnQub3B0aW9ucy53cmFwQXJvdW5kICYmIHNsaWRlcy5sZW5ndGggPiAxICkge1xuICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBzbGlkZXMubGVuZ3RoID8gc2xpZGVzLmxlbmd0aCAtIDEgOiAwO1xuICB2YXIgYm91bmRJbmRleCA9IHRoaXMuaXNQcmV2aW91cyA/IDAgOiBsYXN0SW5kZXg7XG4gIHZhciBtZXRob2QgPSB0aGlzLnBhcmVudC5zZWxlY3RlZEluZGV4ID09IGJvdW5kSW5kZXggPyAnZGlzYWJsZScgOiAnZW5hYmxlJztcbiAgdGhpc1sgbWV0aG9kIF0oKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICB0aGlzLmFsbE9mZigpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmxpY2tpdHkgcHJvdG90eXBlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggRmxpY2tpdHkuZGVmYXVsdHMsIHtcbiAgcHJldk5leHRCdXR0b25zOiB0cnVlLFxuICBhcnJvd1NoYXBlOiB7XG4gICAgeDA6IDEwLFxuICAgIHgxOiA2MCwgeTE6IDUwLFxuICAgIHgyOiA3MCwgeTI6IDQwLFxuICAgIHgzOiAzMFxuICB9XG59KTtcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlUHJldk5leHRCdXR0b25zJyk7XG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVQcmV2TmV4dEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLnByZXZOZXh0QnV0dG9ucyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnByZXZCdXR0b24gPSBuZXcgUHJldk5leHRCdXR0b24oIC0xLCB0aGlzICk7XG4gIHRoaXMubmV4dEJ1dHRvbiA9IG5ldyBQcmV2TmV4dEJ1dHRvbiggMSwgdGhpcyApO1xuXG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMuYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgKTtcbn07XG5cbnByb3RvLmFjdGl2YXRlUHJldk5leHRCdXR0b25zID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucHJldkJ1dHRvbi5hY3RpdmF0ZSgpO1xuICB0aGlzLm5leHRCdXR0b24uYWN0aXZhdGUoKTtcbiAgdGhpcy5vbiggJ2RlYWN0aXZhdGUnLCB0aGlzLmRlYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgKTtcbn07XG5cbnByb3RvLmRlYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wcmV2QnV0dG9uLmRlYWN0aXZhdGUoKTtcbiAgdGhpcy5uZXh0QnV0dG9uLmRlYWN0aXZhdGUoKTtcbiAgdGhpcy5vZmYoICdkZWFjdGl2YXRlJywgdGhpcy5kZWFjdGl2YXRlUHJldk5leHRCdXR0b25zICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuRmxpY2tpdHkuUHJldk5leHRCdXR0b24gPSBQcmV2TmV4dEJ1dHRvbjtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBzbGlkZVxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkZsaWNraXR5ID0gd2luZG93LkZsaWNraXR5IHx8IHt9O1xuICAgIHdpbmRvdy5GbGlja2l0eS5TbGlkZSA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFNsaWRlKCBwYXJlbnQgKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLmlzT3JpZ2luTGVmdCA9IHBhcmVudC5vcmlnaW5TaWRlID09ICdsZWZ0JztcbiAgdGhpcy5jZWxscyA9IFtdO1xuICB0aGlzLm91dGVyV2lkdGggPSAwO1xuICB0aGlzLmhlaWdodCA9IDA7XG59XG5cbnZhciBwcm90byA9IFNsaWRlLnByb3RvdHlwZTtcblxucHJvdG8uYWRkQ2VsbCA9IGZ1bmN0aW9uKCBjZWxsICkge1xuICB0aGlzLmNlbGxzLnB1c2goIGNlbGwgKTtcbiAgdGhpcy5vdXRlcldpZHRoICs9IGNlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICB0aGlzLmhlaWdodCA9IE1hdGgubWF4KCBjZWxsLnNpemUub3V0ZXJIZWlnaHQsIHRoaXMuaGVpZ2h0ICk7XG4gIC8vIGZpcnN0IGNlbGwgc3R1ZmZcbiAgaWYgKCB0aGlzLmNlbGxzLmxlbmd0aCA9PSAxICkge1xuICAgIHRoaXMueCA9IGNlbGwueDsgLy8geCBjb21lcyBmcm9tIGZpcnN0IGNlbGxcbiAgICB2YXIgYmVnaW5NYXJnaW4gPSB0aGlzLmlzT3JpZ2luTGVmdCA/ICdtYXJnaW5MZWZ0JyA6ICdtYXJnaW5SaWdodCc7XG4gICAgdGhpcy5maXJzdE1hcmdpbiA9IGNlbGwuc2l6ZVsgYmVnaW5NYXJnaW4gXTtcbiAgfVxufTtcblxucHJvdG8udXBkYXRlVGFyZ2V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBlbmRNYXJnaW4gPSB0aGlzLmlzT3JpZ2luTGVmdCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG4gIHZhciBsYXN0Q2VsbCA9IHRoaXMuZ2V0TGFzdENlbGwoKTtcbiAgdmFyIGxhc3RNYXJnaW4gPSBsYXN0Q2VsbCA/IGxhc3RDZWxsLnNpemVbIGVuZE1hcmdpbiBdIDogMDtcbiAgdmFyIHNsaWRlV2lkdGggPSB0aGlzLm91dGVyV2lkdGggLSAoIHRoaXMuZmlyc3RNYXJnaW4gKyBsYXN0TWFyZ2luICk7XG4gIHRoaXMudGFyZ2V0ID0gdGhpcy54ICsgdGhpcy5maXJzdE1hcmdpbiArIHNsaWRlV2lkdGggKiB0aGlzLnBhcmVudC5jZWxsQWxpZ247XG59O1xuXG5wcm90by5nZXRMYXN0Q2VsbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZWxsc1sgdGhpcy5jZWxscy5sZW5ndGggLSAxIF07XG59O1xuXG5wcm90by5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLnNlbGVjdCgpO1xuICB9KTtcbn07XG5cbnByb3RvLnVuc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC51bnNlbGVjdCgpO1xuICB9KTtcbn07XG5cbnByb3RvLmdldENlbGxFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZWxscy5tYXAoIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIHJldHVybiBjZWxsLmVsZW1lbnQ7XG4gIH0pO1xufTtcblxucmV0dXJuIFNsaWRlO1xuXG59KSk7XG4iLCIvKiFcbiAqIGdldFNpemUgdjIuMC4zXG4gKiBtZWFzdXJlIHNpemUgb2YgZWxlbWVudHNcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLyoganNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuLyogZ2xvYmFscyBjb25zb2xlOiBmYWxzZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qIGdsb2JhbHMgZGVmaW5lLCBtb2R1bGUgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LmdldFNpemUgPSBmYWN0b3J5KCk7XG4gIH1cblxufSkoIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaGVscGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnZXQgYSBudW1iZXIgZnJvbSBhIHN0cmluZywgbm90IGEgcGVyY2VudGFnZVxuZnVuY3Rpb24gZ2V0U3R5bGVTaXplKCB2YWx1ZSApIHtcbiAgdmFyIG51bSA9IHBhcnNlRmxvYXQoIHZhbHVlICk7XG4gIC8vIG5vdCBhIHBlcmNlbnQgbGlrZSAnMTAwJScsIGFuZCBhIG51bWJlclxuICB2YXIgaXNWYWxpZCA9IHZhbHVlLmluZGV4T2YoJyUnKSA9PSAtMSAmJiAhaXNOYU4oIG51bSApO1xuICByZXR1cm4gaXNWYWxpZCAmJiBudW07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgbG9nRXJyb3IgPSB0eXBlb2YgY29uc29sZSA9PSAndW5kZWZpbmVkJyA/IG5vb3AgOlxuICBmdW5jdGlvbiggbWVzc2FnZSApIHtcbiAgICBjb25zb2xlLmVycm9yKCBtZXNzYWdlICk7XG4gIH07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1lYXN1cmVtZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgbWVhc3VyZW1lbnRzID0gW1xuICAncGFkZGluZ0xlZnQnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdtYXJnaW5MZWZ0JyxcbiAgJ21hcmdpblJpZ2h0JyxcbiAgJ21hcmdpblRvcCcsXG4gICdtYXJnaW5Cb3R0b20nLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnXG5dO1xuXG52YXIgbWVhc3VyZW1lbnRzTGVuZ3RoID0gbWVhc3VyZW1lbnRzLmxlbmd0aDtcblxuZnVuY3Rpb24gZ2V0WmVyb1NpemUoKSB7XG4gIHZhciBzaXplID0ge1xuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICBpbm5lcldpZHRoOiAwLFxuICAgIGlubmVySGVpZ2h0OiAwLFxuICAgIG91dGVyV2lkdGg6IDAsXG4gICAgb3V0ZXJIZWlnaHQ6IDBcbiAgfTtcbiAgZm9yICggdmFyIGk9MDsgaSA8IG1lYXN1cmVtZW50c0xlbmd0aDsgaSsrICkge1xuICAgIHZhciBtZWFzdXJlbWVudCA9IG1lYXN1cmVtZW50c1tpXTtcbiAgICBzaXplWyBtZWFzdXJlbWVudCBdID0gMDtcbiAgfVxuICByZXR1cm4gc2l6ZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0U3R5bGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXRTdHlsZSwgZ2V0IHN0eWxlIG9mIGVsZW1lbnQsIGNoZWNrIGZvciBGaXJlZm94IGJ1Z1xuICogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gKi9cbmZ1bmN0aW9uIGdldFN0eWxlKCBlbGVtICkge1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKCBlbGVtICk7XG4gIGlmICggIXN0eWxlICkge1xuICAgIGxvZ0Vycm9yKCAnU3R5bGUgcmV0dXJuZWQgJyArIHN0eWxlICtcbiAgICAgICcuIEFyZSB5b3UgcnVubmluZyB0aGlzIGNvZGUgaW4gYSBoaWRkZW4gaWZyYW1lIG9uIEZpcmVmb3g/ICcgK1xuICAgICAgJ1NlZSBodHRwczovL2JpdC5seS9nZXRzaXplYnVnMScgKTtcbiAgfVxuICByZXR1cm4gc3R5bGU7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNldHVwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBpc1NldHVwID0gZmFsc2U7XG5cbnZhciBpc0JveFNpemVPdXRlcjtcblxuLyoqXG4gKiBzZXR1cFxuICogY2hlY2sgaXNCb3hTaXplck91dGVyXG4gKiBkbyBvbiBmaXJzdCBnZXRTaXplKCkgcmF0aGVyIHRoYW4gb24gcGFnZSBsb2FkIGZvciBGaXJlZm94IGJ1Z1xuICovXG5mdW5jdGlvbiBzZXR1cCgpIHtcbiAgLy8gc2V0dXAgb25jZVxuICBpZiAoIGlzU2V0dXAgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlzU2V0dXAgPSB0cnVlO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGJveCBzaXppbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuICAvKipcbiAgICogQ2hyb21lICYgU2FmYXJpIG1lYXN1cmUgdGhlIG91dGVyLXdpZHRoIG9uIHN0eWxlLndpZHRoIG9uIGJvcmRlci1ib3ggZWxlbXNcbiAgICogSUUxMSAmIEZpcmVmb3g8MjkgbWVhc3VyZXMgdGhlIGlubmVyLXdpZHRoXG4gICAqL1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5zdHlsZS53aWR0aCA9ICcyMDBweCc7XG4gIGRpdi5zdHlsZS5wYWRkaW5nID0gJzFweCAycHggM3B4IDRweCc7XG4gIGRpdi5zdHlsZS5ib3JkZXJTdHlsZSA9ICdzb2xpZCc7XG4gIGRpdi5zdHlsZS5ib3JkZXJXaWR0aCA9ICcxcHggMnB4IDNweCA0cHgnO1xuICBkaXYuc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuXG4gIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoIGRpdiApO1xuICB2YXIgc3R5bGUgPSBnZXRTdHlsZSggZGl2ICk7XG4gIC8vIHJvdW5kIHZhbHVlIGZvciBicm93c2VyIHpvb20uIGRlc2FuZHJvL21hc29ucnkjOTI4XG4gIGlzQm94U2l6ZU91dGVyID0gTWF0aC5yb3VuZCggZ2V0U3R5bGVTaXplKCBzdHlsZS53aWR0aCApICkgPT0gMjAwO1xuICBnZXRTaXplLmlzQm94U2l6ZU91dGVyID0gaXNCb3hTaXplT3V0ZXI7XG5cbiAgYm9keS5yZW1vdmVDaGlsZCggZGl2ICk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldFNpemUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gZ2V0U2l6ZSggZWxlbSApIHtcbiAgc2V0dXAoKTtcblxuICAvLyB1c2UgcXVlcnlTZWxldG9yIGlmIGVsZW0gaXMgc3RyaW5nXG4gIGlmICggdHlwZW9mIGVsZW0gPT0gJ3N0cmluZycgKSB7XG4gICAgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGVsZW0gKTtcbiAgfVxuXG4gIC8vIGRvIG5vdCBwcm9jZWVkIG9uIG5vbi1vYmplY3RzXG4gIGlmICggIWVsZW0gfHwgdHlwZW9mIGVsZW0gIT0gJ29iamVjdCcgfHwgIWVsZW0ubm9kZVR5cGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoIGVsZW0gKTtcblxuICAvLyBpZiBoaWRkZW4sIGV2ZXJ5dGhpbmcgaXMgMFxuICBpZiAoIHN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnICkge1xuICAgIHJldHVybiBnZXRaZXJvU2l6ZSgpO1xuICB9XG5cbiAgdmFyIHNpemUgPSB7fTtcbiAgc2l6ZS53aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGg7XG4gIHNpemUuaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQ7XG5cbiAgdmFyIGlzQm9yZGVyQm94ID0gc2l6ZS5pc0JvcmRlckJveCA9IHN0eWxlLmJveFNpemluZyA9PSAnYm9yZGVyLWJveCc7XG5cbiAgLy8gZ2V0IGFsbCBtZWFzdXJlbWVudHNcbiAgZm9yICggdmFyIGk9MDsgaSA8IG1lYXN1cmVtZW50c0xlbmd0aDsgaSsrICkge1xuICAgIHZhciBtZWFzdXJlbWVudCA9IG1lYXN1cmVtZW50c1tpXTtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZVsgbWVhc3VyZW1lbnQgXTtcbiAgICB2YXIgbnVtID0gcGFyc2VGbG9hdCggdmFsdWUgKTtcbiAgICAvLyBhbnkgJ2F1dG8nLCAnbWVkaXVtJyB2YWx1ZSB3aWxsIGJlIDBcbiAgICBzaXplWyBtZWFzdXJlbWVudCBdID0gIWlzTmFOKCBudW0gKSA/IG51bSA6IDA7XG4gIH1cblxuICB2YXIgcGFkZGluZ1dpZHRoID0gc2l6ZS5wYWRkaW5nTGVmdCArIHNpemUucGFkZGluZ1JpZ2h0O1xuICB2YXIgcGFkZGluZ0hlaWdodCA9IHNpemUucGFkZGluZ1RvcCArIHNpemUucGFkZGluZ0JvdHRvbTtcbiAgdmFyIG1hcmdpbldpZHRoID0gc2l6ZS5tYXJnaW5MZWZ0ICsgc2l6ZS5tYXJnaW5SaWdodDtcbiAgdmFyIG1hcmdpbkhlaWdodCA9IHNpemUubWFyZ2luVG9wICsgc2l6ZS5tYXJnaW5Cb3R0b207XG4gIHZhciBib3JkZXJXaWR0aCA9IHNpemUuYm9yZGVyTGVmdFdpZHRoICsgc2l6ZS5ib3JkZXJSaWdodFdpZHRoO1xuICB2YXIgYm9yZGVySGVpZ2h0ID0gc2l6ZS5ib3JkZXJUb3BXaWR0aCArIHNpemUuYm9yZGVyQm90dG9tV2lkdGg7XG5cbiAgdmFyIGlzQm9yZGVyQm94U2l6ZU91dGVyID0gaXNCb3JkZXJCb3ggJiYgaXNCb3hTaXplT3V0ZXI7XG5cbiAgLy8gb3ZlcndyaXRlIHdpZHRoIGFuZCBoZWlnaHQgaWYgd2UgY2FuIGdldCBpdCBmcm9tIHN0eWxlXG4gIHZhciBzdHlsZVdpZHRoID0gZ2V0U3R5bGVTaXplKCBzdHlsZS53aWR0aCApO1xuICBpZiAoIHN0eWxlV2lkdGggIT09IGZhbHNlICkge1xuICAgIHNpemUud2lkdGggPSBzdHlsZVdpZHRoICtcbiAgICAgIC8vIGFkZCBwYWRkaW5nIGFuZCBib3JkZXIgdW5sZXNzIGl0J3MgYWxyZWFkeSBpbmNsdWRpbmcgaXRcbiAgICAgICggaXNCb3JkZXJCb3hTaXplT3V0ZXIgPyAwIDogcGFkZGluZ1dpZHRoICsgYm9yZGVyV2lkdGggKTtcbiAgfVxuXG4gIHZhciBzdHlsZUhlaWdodCA9IGdldFN0eWxlU2l6ZSggc3R5bGUuaGVpZ2h0ICk7XG4gIGlmICggc3R5bGVIZWlnaHQgIT09IGZhbHNlICkge1xuICAgIHNpemUuaGVpZ2h0ID0gc3R5bGVIZWlnaHQgK1xuICAgICAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB1bmxlc3MgaXQncyBhbHJlYWR5IGluY2x1ZGluZyBpdFxuICAgICAgKCBpc0JvcmRlckJveFNpemVPdXRlciA/IDAgOiBwYWRkaW5nSGVpZ2h0ICsgYm9yZGVySGVpZ2h0ICk7XG4gIH1cblxuICBzaXplLmlubmVyV2lkdGggPSBzaXplLndpZHRoIC0gKCBwYWRkaW5nV2lkdGggKyBib3JkZXJXaWR0aCApO1xuICBzaXplLmlubmVySGVpZ2h0ID0gc2l6ZS5oZWlnaHQgLSAoIHBhZGRpbmdIZWlnaHQgKyBib3JkZXJIZWlnaHQgKTtcblxuICBzaXplLm91dGVyV2lkdGggPSBzaXplLndpZHRoICsgbWFyZ2luV2lkdGg7XG4gIHNpemUub3V0ZXJIZWlnaHQgPSBzaXplLmhlaWdodCArIG1hcmdpbkhlaWdodDtcblxuICByZXR1cm4gc2l6ZTtcbn1cblxucmV0dXJuIGdldFNpemU7XG5cbn0pO1xuIiwiLyohXG4gKiBpbWFnZXNMb2FkZWQgdjQuMS40XG4gKiBKYXZhU2NyaXB0IGlzIGFsbCBsaWtlIFwiWW91IGltYWdlcyBhcmUgZG9uZSB5ZXQgb3Igd2hhdD9cIlxuICogTUlUIExpY2Vuc2VcbiAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7ICd1c2Ugc3RyaWN0JztcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG5cbiAgLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSwgcmVxdWlyZTogZmFsc2UgKi9cblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcidcbiAgICBdLCBmdW5jdGlvbiggRXZFbWl0dGVyICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdldi1lbWl0dGVyJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LmltYWdlc0xvYWRlZCA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRXZFbWl0dGVyXG4gICAgKTtcbiAgfVxuXG59KSggdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzLFxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgZmFjdG9yeSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgJCA9IHdpbmRvdy5qUXVlcnk7XG52YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBoZWxwZXJzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGV4dGVuZCBvYmplY3RzXG5mdW5jdGlvbiBleHRlbmQoIGEsIGIgKSB7XG4gIGZvciAoIHZhciBwcm9wIGluIGIgKSB7XG4gICAgYVsgcHJvcCBdID0gYlsgcHJvcCBdO1xuICB9XG4gIHJldHVybiBhO1xufVxuXG52YXIgYXJyYXlTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLy8gdHVybiBlbGVtZW50IG9yIG5vZGVMaXN0IGludG8gYW4gYXJyYXlcbmZ1bmN0aW9uIG1ha2VBcnJheSggb2JqICkge1xuICBpZiAoIEFycmF5LmlzQXJyYXkoIG9iaiApICkge1xuICAgIC8vIHVzZSBvYmplY3QgaWYgYWxyZWFkeSBhbiBhcnJheVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgaXNBcnJheUxpa2UgPSB0eXBlb2Ygb2JqID09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoubGVuZ3RoID09ICdudW1iZXInO1xuICBpZiAoIGlzQXJyYXlMaWtlICkge1xuICAgIC8vIGNvbnZlcnQgbm9kZUxpc3QgdG8gYXJyYXlcbiAgICByZXR1cm4gYXJyYXlTbGljZS5jYWxsKCBvYmogKTtcbiAgfVxuXG4gIC8vIGFycmF5IG9mIHNpbmdsZSBpbmRleFxuICByZXR1cm4gWyBvYmogXTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaW1hZ2VzTG9hZGVkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogQHBhcmFtIHtBcnJheSwgRWxlbWVudCwgTm9kZUxpc3QsIFN0cmluZ30gZWxlbVxuICogQHBhcmFtIHtPYmplY3Qgb3IgRnVuY3Rpb259IG9wdGlvbnMgLSBpZiBmdW5jdGlvbiwgdXNlIGFzIGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkFsd2F5cyAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIEltYWdlc0xvYWRlZCggZWxlbSwgb3B0aW9ucywgb25BbHdheXMgKSB7XG4gIC8vIGNvZXJjZSBJbWFnZXNMb2FkZWQoKSB3aXRob3V0IG5ldywgdG8gYmUgbmV3IEltYWdlc0xvYWRlZCgpXG4gIGlmICggISggdGhpcyBpbnN0YW5jZW9mIEltYWdlc0xvYWRlZCApICkge1xuICAgIHJldHVybiBuZXcgSW1hZ2VzTG9hZGVkKCBlbGVtLCBvcHRpb25zLCBvbkFsd2F5cyApO1xuICB9XG4gIC8vIHVzZSBlbGVtIGFzIHNlbGVjdG9yIHN0cmluZ1xuICB2YXIgcXVlcnlFbGVtID0gZWxlbTtcbiAgaWYgKCB0eXBlb2YgZWxlbSA9PSAnc3RyaW5nJyApIHtcbiAgICBxdWVyeUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCBlbGVtICk7XG4gIH1cbiAgLy8gYmFpbCBpZiBiYWQgZWxlbWVudFxuICBpZiAoICFxdWVyeUVsZW0gKSB7XG4gICAgY29uc29sZS5lcnJvciggJ0JhZCBlbGVtZW50IGZvciBpbWFnZXNMb2FkZWQgJyArICggcXVlcnlFbGVtIHx8IGVsZW0gKSApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuZWxlbWVudHMgPSBtYWtlQXJyYXkoIHF1ZXJ5RWxlbSApO1xuICB0aGlzLm9wdGlvbnMgPSBleHRlbmQoIHt9LCB0aGlzLm9wdGlvbnMgKTtcbiAgLy8gc2hpZnQgYXJndW1lbnRzIGlmIG5vIG9wdGlvbnMgc2V0XG4gIGlmICggdHlwZW9mIG9wdGlvbnMgPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICBvbkFsd2F5cyA9IG9wdGlvbnM7XG4gIH0gZWxzZSB7XG4gICAgZXh0ZW5kKCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMgKTtcbiAgfVxuXG4gIGlmICggb25BbHdheXMgKSB7XG4gICAgdGhpcy5vbiggJ2Fsd2F5cycsIG9uQWx3YXlzICk7XG4gIH1cblxuICB0aGlzLmdldEltYWdlcygpO1xuXG4gIGlmICggJCApIHtcbiAgICAvLyBhZGQgalF1ZXJ5IERlZmVycmVkIG9iamVjdFxuICAgIHRoaXMuanFEZWZlcnJlZCA9IG5ldyAkLkRlZmVycmVkKCk7XG4gIH1cblxuICAvLyBIQUNLIGNoZWNrIGFzeW5jIHRvIGFsbG93IHRpbWUgdG8gYmluZCBsaXN0ZW5lcnNcbiAgc2V0VGltZW91dCggdGhpcy5jaGVjay5iaW5kKCB0aGlzICkgKTtcbn1cblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5vcHRpb25zID0ge307XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUuZ2V0SW1hZ2VzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaW1hZ2VzID0gW107XG5cbiAgLy8gZmlsdGVyICYgZmluZCBpdGVtcyBpZiB3ZSBoYXZlIGFuIGl0ZW0gc2VsZWN0b3JcbiAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKCB0aGlzLmFkZEVsZW1lbnRJbWFnZXMsIHRoaXMgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBlbGVtZW50XG4gKi9cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUuYWRkRWxlbWVudEltYWdlcyA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAvLyBmaWx0ZXIgc2libGluZ3NcbiAgaWYgKCBlbGVtLm5vZGVOYW1lID09ICdJTUcnICkge1xuICAgIHRoaXMuYWRkSW1hZ2UoIGVsZW0gKTtcbiAgfVxuICAvLyBnZXQgYmFja2dyb3VuZCBpbWFnZSBvbiBlbGVtZW50XG4gIGlmICggdGhpcy5vcHRpb25zLmJhY2tncm91bmQgPT09IHRydWUgKSB7XG4gICAgdGhpcy5hZGRFbGVtZW50QmFja2dyb3VuZEltYWdlcyggZWxlbSApO1xuICB9XG5cbiAgLy8gZmluZCBjaGlsZHJlblxuICAvLyBubyBub24tZWxlbWVudCBub2RlcywgIzE0M1xuICB2YXIgbm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuICBpZiAoICFub2RlVHlwZSB8fCAhZWxlbWVudE5vZGVUeXBlc1sgbm9kZVR5cGUgXSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGNoaWxkSW1ncyA9IGVsZW0ucXVlcnlTZWxlY3RvckFsbCgnaW1nJyk7XG4gIC8vIGNvbmNhdCBjaGlsZEVsZW1zIHRvIGZpbHRlckZvdW5kIGFycmF5XG4gIGZvciAoIHZhciBpPTA7IGkgPCBjaGlsZEltZ3MubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGltZyA9IGNoaWxkSW1nc1tpXTtcbiAgICB0aGlzLmFkZEltYWdlKCBpbWcgKTtcbiAgfVxuXG4gIC8vIGdldCBjaGlsZCBiYWNrZ3JvdW5kIGltYWdlc1xuICBpZiAoIHR5cGVvZiB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZCA9PSAnc3RyaW5nJyApIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kICk7XG4gICAgZm9yICggaT0wOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIHRoaXMuYWRkRWxlbWVudEJhY2tncm91bmRJbWFnZXMoIGNoaWxkICk7XG4gICAgfVxuICB9XG59O1xuXG52YXIgZWxlbWVudE5vZGVUeXBlcyA9IHtcbiAgMTogdHJ1ZSxcbiAgOTogdHJ1ZSxcbiAgMTE6IHRydWVcbn07XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUuYWRkRWxlbWVudEJhY2tncm91bmRJbWFnZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSApO1xuICBpZiAoICFzdHlsZSApIHtcbiAgICAvLyBGaXJlZm94IHJldHVybnMgbnVsbCBpZiBpbiBhIGhpZGRlbiBpZnJhbWUgaHR0cHM6Ly9idWd6aWwubGEvNTQ4Mzk3XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGdldCB1cmwgaW5zaWRlIHVybChcIi4uLlwiKVxuICB2YXIgcmVVUkwgPSAvdXJsXFwoKFsnXCJdKT8oLio/KVxcMVxcKS9naTtcbiAgdmFyIG1hdGNoZXMgPSByZVVSTC5leGVjKCBzdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgKTtcbiAgd2hpbGUgKCBtYXRjaGVzICE9PSBudWxsICkge1xuICAgIHZhciB1cmwgPSBtYXRjaGVzICYmIG1hdGNoZXNbMl07XG4gICAgaWYgKCB1cmwgKSB7XG4gICAgICB0aGlzLmFkZEJhY2tncm91bmQoIHVybCwgZWxlbSApO1xuICAgIH1cbiAgICBtYXRjaGVzID0gcmVVUkwuZXhlYyggc3R5bGUuYmFja2dyb3VuZEltYWdlICk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtJbWFnZX0gaW1nXG4gKi9cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUuYWRkSW1hZ2UgPSBmdW5jdGlvbiggaW1nICkge1xuICB2YXIgbG9hZGluZ0ltYWdlID0gbmV3IExvYWRpbmdJbWFnZSggaW1nICk7XG4gIHRoaXMuaW1hZ2VzLnB1c2goIGxvYWRpbmdJbWFnZSApO1xufTtcblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5hZGRCYWNrZ3JvdW5kID0gZnVuY3Rpb24oIHVybCwgZWxlbSApIHtcbiAgdmFyIGJhY2tncm91bmQgPSBuZXcgQmFja2dyb3VuZCggdXJsLCBlbGVtICk7XG4gIHRoaXMuaW1hZ2VzLnB1c2goIGJhY2tncm91bmQgKTtcbn07XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdGhpcy5wcm9ncmVzc2VkQ291bnQgPSAwO1xuICB0aGlzLmhhc0FueUJyb2tlbiA9IGZhbHNlO1xuICAvLyBjb21wbGV0ZSBpZiBubyBpbWFnZXNcbiAgaWYgKCAhdGhpcy5pbWFnZXMubGVuZ3RoICkge1xuICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBmdW5jdGlvbiBvblByb2dyZXNzKCBpbWFnZSwgZWxlbSwgbWVzc2FnZSApIHtcbiAgICAvLyBIQUNLIC0gQ2hyb21lIHRyaWdnZXJzIGV2ZW50IGJlZm9yZSBvYmplY3QgcHJvcGVydGllcyBoYXZlIGNoYW5nZWQuICM4M1xuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMucHJvZ3Jlc3MoIGltYWdlLCBlbGVtLCBtZXNzYWdlICk7XG4gICAgfSk7XG4gIH1cblxuICB0aGlzLmltYWdlcy5mb3JFYWNoKCBmdW5jdGlvbiggbG9hZGluZ0ltYWdlICkge1xuICAgIGxvYWRpbmdJbWFnZS5vbmNlKCAncHJvZ3Jlc3MnLCBvblByb2dyZXNzICk7XG4gICAgbG9hZGluZ0ltYWdlLmNoZWNrKCk7XG4gIH0pO1xufTtcblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5wcm9ncmVzcyA9IGZ1bmN0aW9uKCBpbWFnZSwgZWxlbSwgbWVzc2FnZSApIHtcbiAgdGhpcy5wcm9ncmVzc2VkQ291bnQrKztcbiAgdGhpcy5oYXNBbnlCcm9rZW4gPSB0aGlzLmhhc0FueUJyb2tlbiB8fCAhaW1hZ2UuaXNMb2FkZWQ7XG4gIC8vIHByb2dyZXNzIGV2ZW50XG4gIHRoaXMuZW1pdEV2ZW50KCAncHJvZ3Jlc3MnLCBbIHRoaXMsIGltYWdlLCBlbGVtIF0gKTtcbiAgaWYgKCB0aGlzLmpxRGVmZXJyZWQgJiYgdGhpcy5qcURlZmVycmVkLm5vdGlmeSApIHtcbiAgICB0aGlzLmpxRGVmZXJyZWQubm90aWZ5KCB0aGlzLCBpbWFnZSApO1xuICB9XG4gIC8vIGNoZWNrIGlmIGNvbXBsZXRlZFxuICBpZiAoIHRoaXMucHJvZ3Jlc3NlZENvdW50ID09IHRoaXMuaW1hZ2VzLmxlbmd0aCApIHtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cblxuICBpZiAoIHRoaXMub3B0aW9ucy5kZWJ1ZyAmJiBjb25zb2xlICkge1xuICAgIGNvbnNvbGUubG9nKCAncHJvZ3Jlc3M6ICcgKyBtZXNzYWdlLCBpbWFnZSwgZWxlbSApO1xuICB9XG59O1xuXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBldmVudE5hbWUgPSB0aGlzLmhhc0FueUJyb2tlbiA/ICdmYWlsJyA6ICdkb25lJztcbiAgdGhpcy5pc0NvbXBsZXRlID0gdHJ1ZTtcbiAgdGhpcy5lbWl0RXZlbnQoIGV2ZW50TmFtZSwgWyB0aGlzIF0gKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdhbHdheXMnLCBbIHRoaXMgXSApO1xuICBpZiAoIHRoaXMuanFEZWZlcnJlZCApIHtcbiAgICB2YXIganFNZXRob2QgPSB0aGlzLmhhc0FueUJyb2tlbiA/ICdyZWplY3QnIDogJ3Jlc29sdmUnO1xuICAgIHRoaXMuanFEZWZlcnJlZFsganFNZXRob2QgXSggdGhpcyApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gTG9hZGluZ0ltYWdlKCBpbWcgKSB7XG4gIHRoaXMuaW1nID0gaW1nO1xufVxuXG5Mb2FkaW5nSW1hZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG5Mb2FkaW5nSW1hZ2UucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oKSB7XG4gIC8vIElmIGNvbXBsZXRlIGlzIHRydWUgYW5kIGJyb3dzZXIgc3VwcG9ydHMgbmF0dXJhbCBzaXplcyxcbiAgLy8gdHJ5IHRvIGNoZWNrIGZvciBpbWFnZSBzdGF0dXMgbWFudWFsbHkuXG4gIHZhciBpc0NvbXBsZXRlID0gdGhpcy5nZXRJc0ltYWdlQ29tcGxldGUoKTtcbiAgaWYgKCBpc0NvbXBsZXRlICkge1xuICAgIC8vIHJlcG9ydCBiYXNlZCBvbiBuYXR1cmFsV2lkdGhcbiAgICB0aGlzLmNvbmZpcm0oIHRoaXMuaW1nLm5hdHVyYWxXaWR0aCAhPT0gMCwgJ25hdHVyYWxXaWR0aCcgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBJZiBub25lIG9mIHRoZSBjaGVja3MgYWJvdmUgbWF0Y2hlZCwgc2ltdWxhdGUgbG9hZGluZyBvbiBkZXRhY2hlZCBlbGVtZW50LlxuICB0aGlzLnByb3h5SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgdGhpcy5wcm94eUltYWdlLmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLnByb3h5SW1hZ2UuYWRkRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuICAvLyBiaW5kIHRvIGltYWdlIGFzIHdlbGwgZm9yIEZpcmVmb3guICMxOTFcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMuaW1nLmFkZEV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcbiAgdGhpcy5wcm94eUltYWdlLnNyYyA9IHRoaXMuaW1nLnNyYztcbn07XG5cbkxvYWRpbmdJbWFnZS5wcm90b3R5cGUuZ2V0SXNJbWFnZUNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNoZWNrIGZvciBub24temVybywgbm9uLXVuZGVmaW5lZCBuYXR1cmFsV2lkdGhcbiAgLy8gZml4ZXMgU2FmYXJpK0luZmluaXRlU2Nyb2xsK01hc29ucnkgYnVnIGluZmluaXRlLXNjcm9sbCM2NzFcbiAgcmV0dXJuIHRoaXMuaW1nLmNvbXBsZXRlICYmIHRoaXMuaW1nLm5hdHVyYWxXaWR0aDtcbn07XG5cbkxvYWRpbmdJbWFnZS5wcm90b3R5cGUuY29uZmlybSA9IGZ1bmN0aW9uKCBpc0xvYWRlZCwgbWVzc2FnZSApIHtcbiAgdGhpcy5pc0xvYWRlZCA9IGlzTG9hZGVkO1xuICB0aGlzLmVtaXRFdmVudCggJ3Byb2dyZXNzJywgWyB0aGlzLCB0aGlzLmltZywgbWVzc2FnZSBdICk7XG59O1xuXG4vLyAtLS0tLSBldmVudHMgLS0tLS0gLy9cblxuLy8gdHJpZ2dlciBzcGVjaWZpZWQgaGFuZGxlciBmb3IgZXZlbnQgdHlwZVxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG5Mb2FkaW5nSW1hZ2UucHJvdG90eXBlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNvbmZpcm0oIHRydWUsICdvbmxvYWQnICk7XG4gIHRoaXMudW5iaW5kRXZlbnRzKCk7XG59O1xuXG5Mb2FkaW5nSW1hZ2UucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jb25maXJtKCBmYWxzZSwgJ29uZXJyb3InICk7XG4gIHRoaXMudW5iaW5kRXZlbnRzKCk7XG59O1xuXG5Mb2FkaW5nSW1hZ2UucHJvdG90eXBlLnVuYmluZEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnByb3h5SW1hZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMucHJveHlJbWFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG4gIHRoaXMuaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLmltZy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBCYWNrZ3JvdW5kIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIEJhY2tncm91bmQoIHVybCwgZWxlbWVudCApIHtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XG59XG5cbi8vIGluaGVyaXQgTG9hZGluZ0ltYWdlIHByb3RvdHlwZVxuQmFja2dyb3VuZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBMb2FkaW5nSW1hZ2UucHJvdG90eXBlICk7XG5cbkJhY2tncm91bmQucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaW1nLmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG4gIHRoaXMuaW1nLnNyYyA9IHRoaXMudXJsO1xuICAvLyBjaGVjayBpZiBpbWFnZSBpcyBhbHJlYWR5IGNvbXBsZXRlXG4gIHZhciBpc0NvbXBsZXRlID0gdGhpcy5nZXRJc0ltYWdlQ29tcGxldGUoKTtcbiAgaWYgKCBpc0NvbXBsZXRlICkge1xuICAgIHRoaXMuY29uZmlybSggdGhpcy5pbWcubmF0dXJhbFdpZHRoICE9PSAwLCAnbmF0dXJhbFdpZHRoJyApO1xuICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG4gIH1cbn07XG5cbkJhY2tncm91bmQucHJvdG90eXBlLnVuYmluZEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmltZy5yZW1vdmVFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xufTtcblxuQmFja2dyb3VuZC5wcm90b3R5cGUuY29uZmlybSA9IGZ1bmN0aW9uKCBpc0xvYWRlZCwgbWVzc2FnZSApIHtcbiAgdGhpcy5pc0xvYWRlZCA9IGlzTG9hZGVkO1xuICB0aGlzLmVtaXRFdmVudCggJ3Byb2dyZXNzJywgWyB0aGlzLCB0aGlzLmVsZW1lbnQsIG1lc3NhZ2UgXSApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0galF1ZXJ5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbkltYWdlc0xvYWRlZC5tYWtlSlF1ZXJ5UGx1Z2luID0gZnVuY3Rpb24oIGpRdWVyeSApIHtcbiAgalF1ZXJ5ID0galF1ZXJ5IHx8IHdpbmRvdy5qUXVlcnk7XG4gIGlmICggIWpRdWVyeSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gc2V0IGxvY2FsIHZhcmlhYmxlXG4gICQgPSBqUXVlcnk7XG4gIC8vICQoKS5pbWFnZXNMb2FkZWQoKVxuICAkLmZuLmltYWdlc0xvYWRlZCA9IGZ1bmN0aW9uKCBvcHRpb25zLCBjYWxsYmFjayApIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBuZXcgSW1hZ2VzTG9hZGVkKCB0aGlzLCBvcHRpb25zLCBjYWxsYmFjayApO1xuICAgIHJldHVybiBpbnN0YW5jZS5qcURlZmVycmVkLnByb21pc2UoICQodGhpcykgKTtcbiAgfTtcbn07XG4vLyB0cnkgbWFraW5nIHBsdWdpblxuSW1hZ2VzTG9hZGVkLm1ha2VKUXVlcnlQbHVnaW4oKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnJldHVybiBJbWFnZXNMb2FkZWQ7XG5cbn0pO1xuIiwiLyohXG4gKiBVbmlkcmFnZ2VyIHYyLjMuMFxuICogRHJhZ2dhYmxlIGJhc2UgY2xhc3NcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgdW51c2VkOiB0cnVlLCB1bmRlZjogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qanNoaW50IHN0cmljdDogZmFsc2UgKi8gLypnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCByZXF1aXJlICovXG5cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICd1bmlwb2ludGVyL3VuaXBvaW50ZXInXG4gICAgXSwgZnVuY3Rpb24oIFVuaXBvaW50ZXIgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBVbmlwb2ludGVyICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCd1bmlwb2ludGVyJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LlVuaWRyYWdnZXIgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LlVuaXBvaW50ZXJcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBVbmlwb2ludGVyICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFVuaWRyYWdnZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gVW5pZHJhZ2dlcigpIHt9XG5cbi8vIGluaGVyaXQgVW5pcG9pbnRlciAmIEV2RW1pdHRlclxudmFyIHByb3RvID0gVW5pZHJhZ2dlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVbmlwb2ludGVyLnByb3RvdHlwZSApO1xuXG4vLyAtLS0tLSBiaW5kIHN0YXJ0IC0tLS0tIC8vXG5cbnByb3RvLmJpbmRIYW5kbGVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2JpbmRIYW5kbGVzKCB0cnVlICk7XG59O1xuXG5wcm90by51bmJpbmRIYW5kbGVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2JpbmRIYW5kbGVzKCBmYWxzZSApO1xufTtcblxuLyoqXG4gKiBBZGQgb3IgcmVtb3ZlIHN0YXJ0IGV2ZW50XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzQWRkXG4gKi9cbnByb3RvLl9iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCBpc0FkZCApIHtcbiAgLy8gbXVuZ2UgaXNBZGQsIGRlZmF1bHQgdG8gdHJ1ZVxuICBpc0FkZCA9IGlzQWRkID09PSB1bmRlZmluZWQgPyB0cnVlIDogaXNBZGQ7XG4gIC8vIGJpbmQgZWFjaCBoYW5kbGVcbiAgdmFyIGJpbmRNZXRob2QgPSBpc0FkZCA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcbiAgdmFyIHRvdWNoQWN0aW9uID0gaXNBZGQgPyB0aGlzLl90b3VjaEFjdGlvblZhbHVlIDogJyc7XG4gIGZvciAoIHZhciBpPTA7IGkgPCB0aGlzLmhhbmRsZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGhhbmRsZSA9IHRoaXMuaGFuZGxlc1tpXTtcbiAgICB0aGlzLl9iaW5kU3RhcnRFdmVudCggaGFuZGxlLCBpc0FkZCApO1xuICAgIGhhbmRsZVsgYmluZE1ldGhvZCBdKCAnY2xpY2snLCB0aGlzICk7XG4gICAgLy8gdG91Y2gtYWN0aW9uOiBub25lIHRvIG92ZXJyaWRlIGJyb3dzZXIgdG91Y2ggZ2VzdHVyZXMuIG1ldGFmaXp6eS9mbGlja2l0eSM1NDBcbiAgICBpZiAoIHdpbmRvdy5Qb2ludGVyRXZlbnQgKSB7XG4gICAgICBoYW5kbGUuc3R5bGUudG91Y2hBY3Rpb24gPSB0b3VjaEFjdGlvbjtcbiAgICB9XG4gIH1cbn07XG5cbi8vIHByb3RvdHlwZSBzbyBpdCBjYW4gYmUgb3ZlcndyaXRlYWJsZSBieSBGbGlja2l0eVxucHJvdG8uX3RvdWNoQWN0aW9uVmFsdWUgPSAnbm9uZSc7XG5cbi8vIC0tLS0tIHN0YXJ0IGV2ZW50IC0tLS0tIC8vXG5cbi8qKlxuICogcG9pbnRlciBzdGFydFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8ucG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHZhciBpc09rYXkgPSB0aGlzLm9rYXlQb2ludGVyRG93biggZXZlbnQgKTtcbiAgaWYgKCAhaXNPa2F5ICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB0cmFjayBzdGFydCBldmVudCBwb3NpdGlvblxuICB0aGlzLnBvaW50ZXJEb3duUG9pbnRlciA9IHBvaW50ZXI7XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5wb2ludGVyRG93bkJsdXIoKTtcbiAgLy8gYmluZCBtb3ZlIGFuZCBlbmQgZXZlbnRzXG4gIHRoaXMuX2JpbmRQb3N0U3RhcnRFdmVudHMoIGV2ZW50ICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlckRvd24nLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIG5vZGVzIHRoYXQgaGF2ZSB0ZXh0IGZpZWxkc1xudmFyIGN1cnNvck5vZGVzID0ge1xuICBURVhUQVJFQTogdHJ1ZSxcbiAgSU5QVVQ6IHRydWUsXG4gIFNFTEVDVDogdHJ1ZSxcbiAgT1BUSU9OOiB0cnVlLFxufTtcblxuLy8gaW5wdXQgdHlwZXMgdGhhdCBkbyBub3QgaGF2ZSB0ZXh0IGZpZWxkc1xudmFyIGNsaWNrVHlwZXMgPSB7XG4gIHJhZGlvOiB0cnVlLFxuICBjaGVja2JveDogdHJ1ZSxcbiAgYnV0dG9uOiB0cnVlLFxuICBzdWJtaXQ6IHRydWUsXG4gIGltYWdlOiB0cnVlLFxuICBmaWxlOiB0cnVlLFxufTtcblxuLy8gZGlzbWlzcyBpbnB1dHMgd2l0aCB0ZXh0IGZpZWxkcy4gZmxpY2tpdHkjNDAzLCBmbGlja2l0eSM0MDRcbnByb3RvLm9rYXlQb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIGlzQ3Vyc29yTm9kZSA9IGN1cnNvck5vZGVzWyBldmVudC50YXJnZXQubm9kZU5hbWUgXTtcbiAgdmFyIGlzQ2xpY2tUeXBlID0gY2xpY2tUeXBlc1sgZXZlbnQudGFyZ2V0LnR5cGUgXTtcbiAgdmFyIGlzT2theSA9ICFpc0N1cnNvck5vZGUgfHwgaXNDbGlja1R5cGU7XG4gIGlmICggIWlzT2theSApIHtcbiAgICB0aGlzLl9wb2ludGVyUmVzZXQoKTtcbiAgfVxuICByZXR1cm4gaXNPa2F5O1xufTtcblxuLy8ga2x1ZGdlIHRvIGJsdXIgcHJldmlvdXNseSBmb2N1c2VkIGlucHV0XG5wcm90by5wb2ludGVyRG93bkJsdXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGZvY3VzZWQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAvLyBkbyBub3QgYmx1ciBib2R5IGZvciBJRTEwLCBtZXRhZml6enkvZmxpY2tpdHkjMTE3XG4gIHZhciBjYW5CbHVyID0gZm9jdXNlZCAmJiBmb2N1c2VkLmJsdXIgJiYgZm9jdXNlZCAhPSBkb2N1bWVudC5ib2R5O1xuICBpZiAoIGNhbkJsdXIgKSB7XG4gICAgZm9jdXNlZC5ibHVyKCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIG1vdmUgZXZlbnQgLS0tLS0gLy9cblxuLyoqXG4gKiBkcmFnIG1vdmVcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgbW92ZVZlY3RvciA9IHRoaXMuX2RyYWdQb2ludGVyTW92ZSggZXZlbnQsIHBvaW50ZXIgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyTW92ZScsIFsgZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xuICB0aGlzLl9kcmFnTW92ZSggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKTtcbn07XG5cbi8vIGJhc2UgcG9pbnRlciBtb3ZlIGxvZ2ljXG5wcm90by5fZHJhZ1BvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgbW92ZVZlY3RvciA9IHtcbiAgICB4OiBwb2ludGVyLnBhZ2VYIC0gdGhpcy5wb2ludGVyRG93blBvaW50ZXIucGFnZVgsXG4gICAgeTogcG9pbnRlci5wYWdlWSAtIHRoaXMucG9pbnRlckRvd25Qb2ludGVyLnBhZ2VZXG4gIH07XG4gIC8vIHN0YXJ0IGRyYWcgaWYgcG9pbnRlciBoYXMgbW92ZWQgZmFyIGVub3VnaCB0byBzdGFydCBkcmFnXG4gIGlmICggIXRoaXMuaXNEcmFnZ2luZyAmJiB0aGlzLmhhc0RyYWdTdGFydGVkKCBtb3ZlVmVjdG9yICkgKSB7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0KCBldmVudCwgcG9pbnRlciApO1xuICB9XG4gIHJldHVybiBtb3ZlVmVjdG9yO1xufTtcblxuLy8gY29uZGl0aW9uIGlmIHBvaW50ZXIgaGFzIG1vdmVkIGZhciBlbm91Z2ggdG8gc3RhcnQgZHJhZ1xucHJvdG8uaGFzRHJhZ1N0YXJ0ZWQgPSBmdW5jdGlvbiggbW92ZVZlY3RvciApIHtcbiAgcmV0dXJuIE1hdGguYWJzKCBtb3ZlVmVjdG9yLnggKSA+IDMgfHwgTWF0aC5hYnMoIG1vdmVWZWN0b3IueSApID4gMztcbn07XG5cbi8vIC0tLS0tIGVuZCBldmVudCAtLS0tLSAvL1xuXG4vKipcbiAqIHBvaW50ZXIgdXBcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyVXAnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbiAgdGhpcy5fZHJhZ1BvaW50ZXJVcCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLl9kcmFnUG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBpZiAoIHRoaXMuaXNEcmFnZ2luZyApIHtcbiAgICB0aGlzLl9kcmFnRW5kKCBldmVudCwgcG9pbnRlciApO1xuICB9IGVsc2Uge1xuICAgIC8vIHBvaW50ZXIgZGlkbid0IG1vdmUgZW5vdWdoIGZvciBkcmFnIHRvIHN0YXJ0XG4gICAgdGhpcy5fc3RhdGljQ2xpY2soIGV2ZW50LCBwb2ludGVyICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYWcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZHJhZ1N0YXJ0XG5wcm90by5fZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAvLyBwcmV2ZW50IGNsaWNrc1xuICB0aGlzLmlzUHJldmVudGluZ0NsaWNrcyA9IHRydWU7XG4gIHRoaXMuZHJhZ1N0YXJ0KCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8uZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ2RyYWdTdGFydCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gZHJhZ01vdmVcbnByb3RvLl9kcmFnTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApIHtcbiAgLy8gZG8gbm90IGRyYWcgaWYgbm90IGRyYWdnaW5nIHlldFxuICBpZiAoICF0aGlzLmlzRHJhZ2dpbmcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5kcmFnTW92ZSggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKTtcbn07XG5cbnByb3RvLmRyYWdNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0aGlzLmVtaXRFdmVudCggJ2RyYWdNb3ZlJywgWyBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciBdICk7XG59O1xuXG4vLyBkcmFnRW5kXG5wcm90by5fZHJhZ0VuZCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gc2V0IGZsYWdzXG4gIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAvLyByZS1lbmFibGUgY2xpY2tpbmcgYXN5bmNcbiAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgZGVsZXRlIHRoaXMuaXNQcmV2ZW50aW5nQ2xpY2tzO1xuICB9LmJpbmQoIHRoaXMgKSApO1xuXG4gIHRoaXMuZHJhZ0VuZCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLmRyYWdFbmQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAnZHJhZ0VuZCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gb25jbGljayAtLS0tLSAvL1xuXG4vLyBoYW5kbGUgYWxsIGNsaWNrcyBhbmQgcHJldmVudCBjbGlja3Mgd2hlbiBkcmFnZ2luZ1xucHJvdG8ub25jbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCB0aGlzLmlzUHJldmVudGluZ0NsaWNrcyApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBzdGF0aWNDbGljayAtLS0tLSAvL1xuXG4vLyB0cmlnZ2VyZWQgYWZ0ZXIgcG9pbnRlciBkb3duICYgdXAgd2l0aCBuby90aW55IG1vdmVtZW50XG5wcm90by5fc3RhdGljQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIGlnbm9yZSBlbXVsYXRlZCBtb3VzZSB1cCBjbGlja3NcbiAgaWYgKCB0aGlzLmlzSWdub3JpbmdNb3VzZVVwICYmIGV2ZW50LnR5cGUgPT0gJ21vdXNldXAnICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuc3RhdGljQ2xpY2soIGV2ZW50LCBwb2ludGVyICk7XG5cbiAgLy8gc2V0IGZsYWcgZm9yIGVtdWxhdGVkIGNsaWNrcyAzMDBtcyBhZnRlciB0b3VjaGVuZFxuICBpZiAoIGV2ZW50LnR5cGUgIT0gJ21vdXNldXAnICkge1xuICAgIHRoaXMuaXNJZ25vcmluZ01vdXNlVXAgPSB0cnVlO1xuICAgIC8vIHJlc2V0IGZsYWcgYWZ0ZXIgMzAwbXNcbiAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmlzSWdub3JpbmdNb3VzZVVwO1xuICAgIH0uYmluZCggdGhpcyApLCA0MDAgKTtcbiAgfVxufTtcblxucHJvdG8uc3RhdGljQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAnc3RhdGljQ2xpY2snLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIHV0aWxzIC0tLS0tIC8vXG5cblVuaWRyYWdnZXIuZ2V0UG9pbnRlclBvaW50ID0gVW5pcG9pbnRlci5nZXRQb2ludGVyUG9pbnQ7XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gVW5pZHJhZ2dlcjtcblxufSkpO1xuIiwiLyohXG4gKiBVbmlwb2ludGVyIHYyLjMuMFxuICogYmFzZSBjbGFzcyBmb3IgZG9pbmcgb25lIHRoaW5nIHdpdGggcG9pbnRlciBldmVudFxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlLCBzdHJpY3Q6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLypnbG9iYWwgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdldi1lbWl0dGVyL2V2LWVtaXR0ZXInXG4gICAgXSwgZnVuY3Rpb24oIEV2RW1pdHRlciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5Vbmlwb2ludGVyID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5FdkVtaXR0ZXJcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIFVuaXBvaW50ZXIoKSB7fVxuXG4vLyBpbmhlcml0IEV2RW1pdHRlclxudmFyIHByb3RvID0gVW5pcG9pbnRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbnByb3RvLmJpbmRTdGFydEV2ZW50ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHRoaXMuX2JpbmRTdGFydEV2ZW50KCBlbGVtLCB0cnVlICk7XG59O1xuXG5wcm90by51bmJpbmRTdGFydEV2ZW50ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHRoaXMuX2JpbmRTdGFydEV2ZW50KCBlbGVtLCBmYWxzZSApO1xufTtcblxuLyoqXG4gKiBBZGQgb3IgcmVtb3ZlIHN0YXJ0IGV2ZW50XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzQWRkIC0gcmVtb3ZlIGlmIGZhbHNleVxuICovXG5wcm90by5fYmluZFN0YXJ0RXZlbnQgPSBmdW5jdGlvbiggZWxlbSwgaXNBZGQgKSB7XG4gIC8vIG11bmdlIGlzQWRkLCBkZWZhdWx0IHRvIHRydWVcbiAgaXNBZGQgPSBpc0FkZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlzQWRkO1xuICB2YXIgYmluZE1ldGhvZCA9IGlzQWRkID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuXG4gIC8vIGRlZmF1bHQgdG8gbW91c2UgZXZlbnRzXG4gIHZhciBzdGFydEV2ZW50ID0gJ21vdXNlZG93bic7XG4gIGlmICggd2luZG93LlBvaW50ZXJFdmVudCApIHtcbiAgICAvLyBQb2ludGVyIEV2ZW50c1xuICAgIHN0YXJ0RXZlbnQgPSAncG9pbnRlcmRvd24nO1xuICB9IGVsc2UgaWYgKCAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgKSB7XG4gICAgLy8gVG91Y2ggRXZlbnRzLiBpT1MgU2FmYXJpXG4gICAgc3RhcnRFdmVudCA9ICd0b3VjaHN0YXJ0JztcbiAgfVxuICBlbGVtWyBiaW5kTWV0aG9kIF0oIHN0YXJ0RXZlbnQsIHRoaXMgKTtcbn07XG5cbi8vIHRyaWdnZXIgaGFuZGxlciBtZXRob2RzIGZvciBldmVudHNcbnByb3RvLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbi8vIHJldHVybnMgdGhlIHRvdWNoIHRoYXQgd2UncmUga2VlcGluZyB0cmFjayBvZlxucHJvdG8uZ2V0VG91Y2ggPSBmdW5jdGlvbiggdG91Y2hlcyApIHtcbiAgZm9yICggdmFyIGk9MDsgaSA8IHRvdWNoZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIHRvdWNoID0gdG91Y2hlc1tpXTtcbiAgICBpZiAoIHRvdWNoLmlkZW50aWZpZXIgPT0gdGhpcy5wb2ludGVySWRlbnRpZmllciApIHtcbiAgICAgIHJldHVybiB0b3VjaDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tIHN0YXJ0IGV2ZW50IC0tLS0tIC8vXG5cbnByb3RvLm9ubW91c2Vkb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBkaXNtaXNzIGNsaWNrcyBmcm9tIHJpZ2h0IG9yIG1pZGRsZSBidXR0b25zXG4gIHZhciBidXR0b24gPSBldmVudC5idXR0b247XG4gIGlmICggYnV0dG9uICYmICggYnV0dG9uICE9PSAwICYmIGJ1dHRvbiAhPT0gMSApICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLl9wb2ludGVyRG93biggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG5wcm90by5vbnRvdWNoc3RhcnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb3duKCBldmVudCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gKTtcbn07XG5cbnByb3RvLm9ucG9pbnRlcmRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb3duKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbi8qKlxuICogcG9pbnRlciBzdGFydFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8uX3BvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBkaXNtaXNzIHJpZ2h0IGNsaWNrIGFuZCBvdGhlciBwb2ludGVyc1xuICAvLyBidXR0b24gPSAwIGlzIG9rYXksIDEtNCBub3RcbiAgaWYgKCBldmVudC5idXR0b24gfHwgdGhpcy5pc1BvaW50ZXJEb3duICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuaXNQb2ludGVyRG93biA9IHRydWU7XG4gIC8vIHNhdmUgcG9pbnRlciBpZGVudGlmaWVyIHRvIG1hdGNoIHVwIHRvdWNoIGV2ZW50c1xuICB0aGlzLnBvaW50ZXJJZGVudGlmaWVyID0gcG9pbnRlci5wb2ludGVySWQgIT09IHVuZGVmaW5lZCA/XG4gICAgLy8gcG9pbnRlcklkIGZvciBwb2ludGVyIGV2ZW50cywgdG91Y2guaW5kZW50aWZpZXIgZm9yIHRvdWNoIGV2ZW50c1xuICAgIHBvaW50ZXIucG9pbnRlcklkIDogcG9pbnRlci5pZGVudGlmaWVyO1xuXG4gIHRoaXMucG9pbnRlckRvd24oIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5fYmluZFBvc3RTdGFydEV2ZW50cyggZXZlbnQgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyRG93bicsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gaGFzaCBvZiBldmVudHMgdG8gYmUgYm91bmQgYWZ0ZXIgc3RhcnQgZXZlbnRcbnZhciBwb3N0U3RhcnRFdmVudHMgPSB7XG4gIG1vdXNlZG93bjogWyAnbW91c2Vtb3ZlJywgJ21vdXNldXAnIF0sXG4gIHRvdWNoc3RhcnQ6IFsgJ3RvdWNobW92ZScsICd0b3VjaGVuZCcsICd0b3VjaGNhbmNlbCcgXSxcbiAgcG9pbnRlcmRvd246IFsgJ3BvaW50ZXJtb3ZlJywgJ3BvaW50ZXJ1cCcsICdwb2ludGVyY2FuY2VsJyBdLFxufTtcblxucHJvdG8uX2JpbmRQb3N0U3RhcnRFdmVudHMgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggIWV2ZW50ICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBnZXQgcHJvcGVyIGV2ZW50cyB0byBtYXRjaCBzdGFydCBldmVudFxuICB2YXIgZXZlbnRzID0gcG9zdFN0YXJ0RXZlbnRzWyBldmVudC50eXBlIF07XG4gIC8vIGJpbmQgZXZlbnRzIHRvIG5vZGVcbiAgZXZlbnRzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudE5hbWUgKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIGV2ZW50TmFtZSwgdGhpcyApO1xuICB9LCB0aGlzICk7XG4gIC8vIHNhdmUgdGhlc2UgYXJndW1lbnRzXG4gIHRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cyA9IGV2ZW50cztcbn07XG5cbnByb3RvLl91bmJpbmRQb3N0U3RhcnRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2hlY2sgZm9yIF9ib3VuZEV2ZW50cywgaW4gY2FzZSBkcmFnRW5kIHRyaWdnZXJlZCB0d2ljZSAob2xkIElFOCBidWcpXG4gIGlmICggIXRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cyApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5fYm91bmRQb2ludGVyRXZlbnRzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudE5hbWUgKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoIGV2ZW50TmFtZSwgdGhpcyApO1xuICB9LCB0aGlzICk7XG5cbiAgZGVsZXRlIHRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cztcbn07XG5cbi8vIC0tLS0tIG1vdmUgZXZlbnQgLS0tLS0gLy9cblxucHJvdG8ub25tb3VzZW1vdmUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJNb3ZlKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbnByb3RvLm9ucG9pbnRlcm1vdmUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggZXZlbnQucG9pbnRlcklkID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIgKSB7XG4gICAgdGhpcy5fcG9pbnRlck1vdmUoIGV2ZW50LCBldmVudCApO1xuICB9XG59O1xuXG5wcm90by5vbnRvdWNobW92ZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIHRvdWNoID0gdGhpcy5nZXRUb3VjaCggZXZlbnQuY2hhbmdlZFRvdWNoZXMgKTtcbiAgaWYgKCB0b3VjaCApIHtcbiAgICB0aGlzLl9wb2ludGVyTW92ZSggZXZlbnQsIHRvdWNoICk7XG4gIH1cbn07XG5cbi8qKlxuICogcG9pbnRlciBtb3ZlXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICogQHByaXZhdGVcbiAqL1xucHJvdG8uX3BvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLnBvaW50ZXJNb3ZlKCBldmVudCwgcG9pbnRlciApO1xufTtcblxuLy8gcHVibGljXG5wcm90by5wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyTW92ZScsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gZW5kIGV2ZW50IC0tLS0tIC8vXG5cblxucHJvdG8ub25tb3VzZXVwID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLl9wb2ludGVyVXAoIGV2ZW50LCBldmVudCApO1xufTtcblxucHJvdG8ub25wb2ludGVydXAgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggZXZlbnQucG9pbnRlcklkID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIgKSB7XG4gICAgdGhpcy5fcG9pbnRlclVwKCBldmVudCwgZXZlbnQgKTtcbiAgfVxufTtcblxucHJvdG8ub250b3VjaGVuZCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIHRvdWNoID0gdGhpcy5nZXRUb3VjaCggZXZlbnQuY2hhbmdlZFRvdWNoZXMgKTtcbiAgaWYgKCB0b3VjaCApIHtcbiAgICB0aGlzLl9wb2ludGVyVXAoIGV2ZW50LCB0b3VjaCApO1xuICB9XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgdXBcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKiBAcHJpdmF0ZVxuICovXG5wcm90by5fcG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLl9wb2ludGVyRG9uZSgpO1xuICB0aGlzLnBvaW50ZXJVcCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIHB1YmxpY1xucHJvdG8ucG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJVcCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gcG9pbnRlciBkb25lIC0tLS0tIC8vXG5cbi8vIHRyaWdnZXJlZCBvbiBwb2ludGVyIHVwICYgcG9pbnRlciBjYW5jZWxcbnByb3RvLl9wb2ludGVyRG9uZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9wb2ludGVyUmVzZXQoKTtcbiAgdGhpcy5fdW5iaW5kUG9zdFN0YXJ0RXZlbnRzKCk7XG4gIHRoaXMucG9pbnRlckRvbmUoKTtcbn07XG5cbnByb3RvLl9wb2ludGVyUmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVzZXQgcHJvcGVydGllc1xuICB0aGlzLmlzUG9pbnRlckRvd24gPSBmYWxzZTtcbiAgZGVsZXRlIHRoaXMucG9pbnRlcklkZW50aWZpZXI7XG59O1xuXG5wcm90by5wb2ludGVyRG9uZSA9IG5vb3A7XG5cbi8vIC0tLS0tIHBvaW50ZXIgY2FuY2VsIC0tLS0tIC8vXG5cbnByb3RvLm9ucG9pbnRlcmNhbmNlbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCBldmVudC5wb2ludGVySWQgPT0gdGhpcy5wb2ludGVySWRlbnRpZmllciApIHtcbiAgICB0aGlzLl9wb2ludGVyQ2FuY2VsKCBldmVudCwgZXZlbnQgKTtcbiAgfVxufTtcblxucHJvdG8ub250b3VjaGNhbmNlbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIHRvdWNoID0gdGhpcy5nZXRUb3VjaCggZXZlbnQuY2hhbmdlZFRvdWNoZXMgKTtcbiAgaWYgKCB0b3VjaCApIHtcbiAgICB0aGlzLl9wb2ludGVyQ2FuY2VsKCBldmVudCwgdG91Y2ggKTtcbiAgfVxufTtcblxuLyoqXG4gKiBwb2ludGVyIGNhbmNlbFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqIEBwcml2YXRlXG4gKi9cbnByb3RvLl9wb2ludGVyQ2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLl9wb2ludGVyRG9uZSgpO1xuICB0aGlzLnBvaW50ZXJDYW5jZWwoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG4vLyBwdWJsaWNcbnByb3RvLnBvaW50ZXJDYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlckNhbmNlbCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbi8vIHV0aWxpdHkgZnVuY3Rpb24gZm9yIGdldHRpbmcgeC95IGNvb3JkcyBmcm9tIGV2ZW50XG5Vbmlwb2ludGVyLmdldFBvaW50ZXJQb2ludCA9IGZ1bmN0aW9uKCBwb2ludGVyICkge1xuICByZXR1cm4ge1xuICAgIHg6IHBvaW50ZXIucGFnZVgsXG4gICAgeTogcG9pbnRlci5wYWdlWVxuICB9O1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBVbmlwb2ludGVyO1xuXG59KSk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIEZsaWNraXR5ICAgICAgICA9IHJlcXVpcmUoJ2ZsaWNraXR5JyksXG4gICAgTGF6eUxvYWQgICBcdCBcdCAgICA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbGF6eWxvYWQnKSxcbiAgICBDYXJvdXNlbHNcblxuICAgIHJlcXVpcmUoJ2ZsaWNraXR5LWltYWdlc2xvYWRlZCcpXG5cbiAgICBDYXJvdXNlbHMgPSB7XG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgICBDYXJvdXNlbHMuaW5pdGlhbGlzZUNhcm91c2VsKClcblxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXRpYWxpc2VDYXJvdXNlbCAgOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBjYXJvdXNlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWNhcm91c2VsJylcblxuICAgICAgICAgICAgY2Fyb3VzZWxzLmZvckVhY2goY2Fyb3VzZWwgPT4geyBcblxuICAgICAgICAgICAgICAgIHZhciBzbGlkZXMgPSBjYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWNhcm91c2VsX19zbGlkZVdyYXAnKVxuXG4gICAgICAgICAgICAgICAgaWYoc2xpZGVzLmxlbmd0aCA+IDEpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZmxrdHkgPSBuZXcgRmxpY2tpdHkoY2Fyb3VzZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxBbGlnbiAgIDogJ2NlbnRlcicsICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB3cmFwQXJvdW5kICA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvUGxheSAgICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzTG9hZGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZURvdHMgICAgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXp5TG9hZDogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNhcm91c2VsLmNsYXNzTGlzdC5yZW1vdmUoJ0pTLS1jYXJvdXNlbC0taGlkZGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gQ2Fyb3VzZWxzXG5cbn0oKSlcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgUm9sbGVyVGV4dFxuXG4gICAgUm9sbGVyVGV4dCA9IHtcbiAgICAgICAgcGhyYXNlczogW1xuICAgICAgICAgICAgJ211bHRpLWRheScsXG4gICAgICAgICAgICAncm9jaycsXG4gICAgICAgICAgICAnc3VtbWVyJyxcbiAgICAgICAgICAgICdjbGFzc2ljYWwnLFxuICAgICAgICAgICAgJ3dpbnRlcidcbiAgICAgICAgXSxcbiAgICAgICAgZG9tOiB7XG4gICAgICAgICAgICB0ZXh0V3JhcDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGxlclRleHQnKSxcbiAgICAgICAgICAgIGN1cnJlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHQtY3VycmVudF0nKSxcbiAgICAgICAgICAgIG5leHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHQtbmV4dF0nKSxcbiAgICAgICAgfSxcbiAgICAgICAgaW50ZXJ2YWxMZW5ndGggICAgICAgICAgOiAxNTAwLFxuICAgICAgICBuZXh0UGhyYXNlICAgICAgICAgIDogJ3dpbnRlcicsXG4gICAgICAgIGNvdW50ZXIgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgdGlja2VyICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKFJvbGxlclRleHQuZG9tLnRleHRXcmFwKVxuICAgICAgICAgICAgICAgIFJvbGxlclRleHQuc3RhcnRjb3VudGVyKClcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIHN0YXJ0Y291bnRlcjogKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBSb2xsZXJUZXh0LnNldFdpZHRoKFJvbGxlclRleHQuZG9tLmN1cnJlbnQpXG5cbiAgICAgICAgICAgIGxldCBpID0gMVxuICAgICAgICAgICAgUm9sbGVyVGV4dC5jb3VudGVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyAgICAgICBcblxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQaHJhc2UgPSBSb2xsZXJUZXh0LnBocmFzZXNbaV1cbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0UGhyYXNlID0gUm9sbGVyVGV4dC5waHJhc2VzW2kgKyAxXSA/IFJvbGxlclRleHQucGhyYXNlc1tpICsgMV0gOiBSb2xsZXJUZXh0LnBocmFzZXNbMF1cblxuICAgICAgICAgICAgICAgIFJvbGxlclRleHQuZG9tLnRleHRXcmFwLmNsYXNzTGlzdC5hZGQoJ3R1cm4nKVxuXG4gICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5zZXRXaWR0aChSb2xsZXJUZXh0LmRvbS5uZXh0KVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20udGV4dFdyYXAuY2xhc3NMaXN0LnJlbW92ZSgndHVybicpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIG1vYmlsZSBzY3JlZW4gaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20uY3VycmVudC50ZXh0Q29udGVudCA9IGN1cnJlbnRQaHJhc2VcbiAgICAgICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20ubmV4dC50ZXh0Q29udGVudCA9IG5leHRQaHJhc2VcblxuICAgICAgICAgICAgICAgIH0sIDcwMClcblxuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2ggdGhlIGVuZCBvZiB0aGUgdGhlbWVzLCByZXNldCB0byBmaXJzdCB0aGVtZVxuICAgICAgICAgICAgICAgIGkgPj0gUm9sbGVyVGV4dC5waHJhc2VzLmxlbmd0aCAtIDEgPyBpID0gMCA6IGkrK1xuXG4gICAgICAgICAgICB9LCBSb2xsZXJUZXh0LmludGVydmFsTGVuZ3RoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRXaWR0aDogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZXh0V2lkdGggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFJvbGxlclRleHQuZG9tLnRleHRXcmFwLnN0eWxlLndpZHRoID0gYCR7dGV4dFdpZHRofXB4YFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFJvbGxlclRleHRcblxufSgpKVxuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBUb2dnbGVQcmljZVxuXG4gICAgVG9nZ2xlUHJpY2UgPSB7XG4gICAgICAgIGRvbToge1xuICAgICAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLVRvZ2dsZVByaWNlJyksXG4gICAgICAgICAgICBhbm51YWxCdXR0b246IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxhblRvZ2dsZS0tYW5udWFsJyksXG4gICAgICAgICAgICBtb250aGx5QnV0dG9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsYW5Ub2dnbGUtLW1vbnRobHknKSxcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBkYXRhIHNldCB3aXRoIFxuICAgICAgICAgICAgVG9nZ2xlUHJpY2UuZG9tLmFubnVhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFRvZ2dsZVByaWNlLnNob3dBbm51YWwpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUb2dnbGVQcmljZS5kb20pIFxuICAgICAgICAgICAgVG9nZ2xlUHJpY2UuZG9tLm1vbnRobHlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBUb2dnbGVQcmljZS5zaG93TW9udGhseSlcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dBbm51YWw6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoVG9nZ2xlUHJpY2UuZG9tLmNvbnRhaW5lci5kYXRhc2V0LnBsYW4gPSBcImFubnVhbFwiKSBcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIFRvZ2dsZVByaWNlLmRvbS5jb250YWluZXIuZGF0YXNldC5wbGFuID0gXCJhbm5hdWxcIlxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dNb250aGx5OiAoKSA9PiB7XG4gICAgICAgICAgICBpZihUb2dnbGVQcmljZS5kb20uY29udGFpbmVyLmRhdGFzZXQucGxhbiA9IFwibW9udGhseVwiKSBcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBUb2dnbGVQcmljZS5kb20uY29udGFpbmVyLmRhdGFzZXQucGxhbiA9IFwibW9udGhseVwiXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBUb2dnbGVQcmljZVxuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCl7XG5cbiAgICAndXNlIHN0cmljdCdcblxuXHR2YXIgUGxvdCAgICBcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3QnKSwgIFxuXHRcdExhenlMb2FkICAgXHQgXHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbGF6eWxvYWQnKSxcblx0XHRNb2RhbHNcdFx0XHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbW9kYWxzJyksXG5cdFx0Q2Fyb3VzZWxzXHRcdD0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2Nhcm91c2VsJyksXG5cdFx0U21vb3RoIFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90LXNtb290aC1zY3JvbGwnKSxcblx0XHRGQVFzIFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9mYXFzJyksXG5cdFx0Ly8gQ3VzdG9tTW91c2UgXHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvY3VzdG9tLW1vdXNlJyksXG5cdFx0SG9tZVx0XHRcdD0gcmVxdWlyZSgnLi9wYWdlcy9ob21lJyksXG5cdFx0Um9sbGVyVGV4dCAgICAgID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3JvbGxlci10ZXh0JyksXG5cdFx0VG9nZ2xlUHJpY2UgICAgID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RvZ2dsZS1wcmljZScpLFxuXHRcdEFydGlzdHNcdFx0XHQ9IHJlcXVpcmUoJy4vcGFnZXMvYXJ0aXN0cycpLFxuXHRcdFNjaGVkdWxlXHRcdD0gcmVxdWlyZSgnLi9wYWdlcy9zY2hlZHVsZScpLFxuXHRcdE5ld3MgXHRcdFx0PSByZXF1aXJlKCcuL3BhZ2VzL25ld3MnKSxcblx0ICAgIE1haW5cblxuXHRNYWluID0ge1xuXG5cdFx0aW5pdDogKCkgPT4ge1x0XG5cblx0XHRcdE1haW4uaW5pdGFsaXplU21vb3RoKClcblxuXHRcdFx0UGxvdC5pbml0KCkgXG5cdFx0XHRMYXp5TG9hZC5pbml0KClcblx0XHRcdE1vZGFscy5pbml0KCkgIFxuXHRcdFx0Q2Fyb3VzZWxzLmluaXQoKVxuXHRcdFx0RkFRcy5pbml0KClcblx0XHRcdFJvbGxlclRleHQuaW5pdCgpXG5cdFx0XHQvLyBDdXN0b21Nb3VzZS5pbml0KHtcblx0XHRcdC8vIFx0J2EnIFx0XHRcdFx0OiAnYW5jaG9ySG92ZXInLFxuXHRcdFx0Ly8gXHQnLmFsdEhvdmVyVGFyZ2V0J1x0OiAnYWx0SG92ZXInXG5cdFx0XHQvLyB9KVxuXG5cdFx0XHQvL1BhZ2VzXG4gICAgICAgIFx0aWYoUGxvdC5pc1BhZ2UoJ2hvbWUnKSlcblx0XHRcdFx0SG9tZS5pbml0KClcblxuICAgICAgICBcdGlmKFBsb3QuaXNQYWdlKCdzY2hlZHVsZScpKVxuXHRcdFx0XHRTY2hlZHVsZS5pbml0KClcblxuICAgICAgICBcdGlmKFBsb3QuaXNQYWdlKCdhcnRpc3RzJykpXG5cdFx0XHRcdEFydGlzdHMuaW5pdCgpXG5cblx0XHRcdGlmKFBsb3QuaXNQYWdlKCdwcmljaW5nJykpXG5cdFx0XHRcdFRvZ2dsZVByaWNlLmluaXQoKVxuXG5cdFx0XHROZXdzLmluaXQoKVxuXHRcdFx0XG5cdFx0XHRNYWluLmRlbW9BamF4QnV0dG9uKCkgXG5cblx0XHR9LFxuXHRcdFxuXHRcdGluaXRhbGl6ZVNtb290aCA6ICgpID0+IHtcblxuICAgICAgICBcdGNvbnN0IGhhc1Ntb290aFNjcm9sbCA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5wbG90Q3VzdG9taXplclNtb290aFNjcm9sbFxuXG4gICAgICAgIFx0Y29uc3Qgc21vb3RoU2V0dGluZ3MgPSB7XG5cdFx0XHRcdHN0YW5kYXJkU2Nyb2xsICA6IGhhc1Ntb290aFNjcm9sbCAhPSAneWVzJ1xuXHRcdFx0fVxuXG4gICAgICAgIFx0U21vb3RoLmluaXQoc21vb3RoU2V0dGluZ3MpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBkZW1vQWpheEJ1dHRvbiA6ICgpID0+IHtcblxuXHRcdFx0dmFyIHBsb3REZW1vTG9hZENvbnRlbnQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TG9hZFRlbXBsYXRlUGFydERlbW8nKTtcblx0XHRcdFxuXG5cdFx0XHRpZihwbG90RGVtb0xvYWRDb250ZW50KVxuXG5cdFx0XHRcdHBsb3REZW1vTG9hZENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblxuXHRcdFx0XHRcdC8vIFRha2UgYSBsb29rIGF0IHdoYXQgeW91IGNhbiBwYXNzIHRvIHRoaXMgZnVuY3Rpb25cblx0XHRcdFx0XHQvLyB2YXIgYXJncyA9IHtcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiBudWxsLFxuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGFjdGlvbiAgICAgICAgICA6ICdwbG90TG9hZFRlbXBsYXRlUGFydCcsIC8vVGhpcyBpcyB0aGUgYWN0aW9uIGZpcmVkIGludG8gb3VyIFBsb3RTaXRlIFBIUCBzZXR1cC5waHAgZmlsZVxuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGRhdGEgICAgICAgICAgICA6IHt9LCAvL0FueSBkYXRhIHdlJ2QgbGlrZSB0byBwYXNzIHRvIHRoZSB0ZW1wbGF0ZSBwYXJ0LiBcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICBjb250ZW50QXJlYSAgICAgOiAnLkpTLS1hamF4VGFyZ2V0QXJlYScsIC8vV2hlcmUgdGhlIG5ldyBjb250ZW50IGdldHMgaW5zZXJ0c1xuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGFwcGVuZCAgICAgICAgICA6IGZhbHNlIC8vSWYgd2Ugd2FudCB0byBhcHBlbmQgdG8gdGhlIGFib3ZlIGFyZWEsIG9yIHJlcGxhY2UgdGhlIGNvbnRlbnRcblx0XHRcdFx0ICAgIC8vICAgICAgICAgIH1cblxuXHRcdFx0XHRcdGNvbnN0IGFyZ3MgPSB7XG5cblx0XHRcdFx0XHRcdHRlbXBsYXRlUGFydCA6ICdkZW1vcy9hamF4LWNvbnRlbnQnLCBcblx0XHRcdFx0XHRcdGRhdGEgOiB7XG5cdFx0XHRcdFx0XHRcdCdmb28nIFx0XHQ6ICdiYXInLFxuXHRcdFx0XHRcdFx0XHQnYmFuZ2VycydcdDogJ21hc2gnLFxuXHRcdFx0XHRcdFx0XHQnaGF2aW5nJ1x0OiAnaXQnXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cblx0XHRcdFx0XHRQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncylcblxuXHRcdFx0XHR9KVxuXG4gICAgICAgIH1cblxuXHR9XG5cblx0d2luZG93Lk1haW4gPSBNYWluXG5cbn0oKSk7XG4gIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBQbG90IFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90JyksXG4gICAgICAgIE1vZGFscyAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbW9kYWxzJyksXG4gICAgXHRBcnRpc3RzXG5cbiAgICAvL01heSB0aGlzIG9iamVjdCBhY3QgYXMgYSBndWlkZSB0byB1c2luZyBQbG90IGNvcmUgZnVuY3Rpb25zXG4gICAgLy9hbmQgaG93IHRvIHNldCB1cCBhamF4IGR5bmFtaWMgZGF0YSB3aXRoIG91ciBuZXcgcHJpbmNpcGxlcyB3aXRoIGVhc2VcbiAgICBBcnRpc3RzID0ge1xuXG4gICAgXHRtYXhQYWdlcyBcdFx0XHQ6IDEsXG4gICAgXHRjdXJyZW50UGFnZSBcdFx0OiAxLFxuICAgIFx0Y3VycmVudEFydGlzdFR5cGVcdDogZmFsc2UsXG4gICAgXHRsb2FkTW9yZUJ1dHRvbiAgXHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tYXJ0aXN0c0xvYWRNb3JlJyksXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgIFx0QXJ0aXN0cy5zaG93T3JIaWRlTG9hZE1vcmVCdXR0b24oKVxuXG4gICAgICAgICAgICBBcnRpc3RzLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICBcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblxuICAgICAgICBcdFx0Y29uc3QgbmV4dFBhZ2UgPSBwYXJzZUludChBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UpXG5cbiAgICAgICAgXHRcdEFydGlzdHMuY3VycmVudFBhZ2UgPSBuZXh0UGFnZVxuXG4gICAgICAgIFx0XHRBcnRpc3RzLmxvYWRBcnRpc3RzKHRydWUpXG5cbiAgICAgICAgXHRcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSA9IG5leHRQYWdlICsgMVxuXG4gICAgICAgIFx0fSlcblxuICAgICAgICBcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvL0hhdmUgd2UgY2xpY2tlZCBvbiBhbiBhcnRpc3QgdHlwZSBmaWx0ZXIgYnV0dG9uP1xuXHRcdFx0XHRpZiAoZS50YXJnZXQuY2xvc2VzdCgnLkpTLS1hcnRpc3RUeXBlQnV0dG9uJykpIHtcblx0XHRcdFx0XHRBcnRpc3RzLmN1cnJlbnRBcnRpc3RUeXBlID0gZS50YXJnZXQuZGF0YXNldC5hcnRpc3RUeXBlSWRcblx0XHRcdFx0XHRBcnRpc3RzLmN1cnJlbnRQYWdlID0gMVxuICAgICAgICAgICAgICAgICAgICBBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UgPSAyXG5cdFx0XHRcdFx0QXJ0aXN0cy5sb2FkQXJ0aXN0cyhmYWxzZSkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tYXJ0aXN0VHlwZUJ1dHRvbicpLmZvckVhY2goYXJ0aXN0VHlwZUJ1dHRvbiA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnRpc3RUeXBlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cdFx0XHRcdH0gXG5cblx0XHRcdH0sIGZhbHNlKVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkQXJ0aXN0cyA6IGFwcGVuZCA9PiB7XG5cbiAgICAgICAgXHRjb25zdCBhcmdzID0ge1xuXHRcdFx0XHR0ZW1wbGF0ZVBhcnQgOiAncGFydHMvYXJ0aXN0LWxpc3RpbmcnLCBcblx0XHRcdFx0ZGF0YSA6IHtcblx0XHRcdFx0XHQncGFnZScgXHRcdFx0OiBBcnRpc3RzLmN1cnJlbnRQYWdlLFxuXHRcdFx0XHRcdCdhcnRpc3RUeXBlJ1x0OiBBcnRpc3RzLmN1cnJlbnRBcnRpc3RUeXBlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFwcGVuZCA6IGFwcGVuZCBcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFBsb3QubG9hZFRlbXBsYXRlUGFydChhcmdzKS50aGVuKGh0bWwgPT4ge1xuXG5cdFx0XHRcdEFydGlzdHMuc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uKClcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cblx0XHRcdH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93T3JIaWRlTG9hZE1vcmVCdXR0b24gOiAoKSA9PiB7XG5cbiAgICAgICAgXHQvL0NoZWNrIGlmIG1heCBwYWdlcyBpcyAxLiBJZiBpdCBpcywgdGhlcmUncyBvbmx5IDEgcGFnZSBvZiBhcnRpc3RzXG4gICAgICAgIFx0Ly9zbyB3ZSBjYW4gaGlkZSBsb2FkIG1vcmUgYnV0dG9uXG4gICAgICAgIFx0QXJ0aXN0cy5tYXhQYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tbWF4UGFnZXMnKS5kYXRhc2V0Lm1heFBhZ2VzXG5cbiAgICAgICAgXHRpZihBcnRpc3RzLm1heFBhZ2VzID4gQXJ0aXN0cy5jdXJyZW50UGFnZSlcbiAgICAgICAgXHRcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgXHRlbHNlIFxuICAgICAgICBcdFx0QXJ0aXN0cy5sb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gQXJ0aXN0c1xuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBIb21lXG5cbiAgICBIb21lID0ge1xuICAgICAgICBkb20gOiB7XG4gICAgICAgICAgICBib2R5ICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICByb290ICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKSxcbiAgICAgICAgICAgIHBob25lICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZTNEX19waG9uZScpLFxuICAgICAgICAgICAgaG9tZUJhbm5lciAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZUJhbm5lcicpLFxuICAgICAgICAgICAgaGVhZGVyICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2l0ZU1haW5IZWFkZXInKSxcbiAgICAgICAgICAgIGNvbG91clNoYXBlcyAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgMSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvdXJTaGFwZS0tMScpLFxuICAgICAgICAgICAgICAgIDIgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3VyU2hhcGUtLTInKSxcbiAgICAgICAgICAgICAgICAzIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG91clNoYXBlLS0zJyksXG4gICAgICAgICAgICAgICAgNCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvdXJTaGFwZS0tNCcpLFxuICAgICAgICAgICAgICAgIDUgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3VyU2hhcGUtLTUnKSxcbiAgICAgICAgICAgICAgICA2IDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG91clNoYXBlLS02JyksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludGVydmFsTGVuZ3RoICAgICAgICAgIDogNTAwMCxcbiAgICAgICAgcHJldmlvdXNUaGVtZSAgICAgICAgICAgOiAnZGVlcCcsXG4gICAgICAgIGNvdW50ZXIgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgdGlja2VyICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgY3VycmVudE1vdXNlUG9zaXRpb24gICAgOiB7XG4gICAgICAgICAgICBYOiB3aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAgICAgICAgICBZOiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzTW91c2VQb3NpdGlvbiAgIDoge1xuICAgICAgICAgICAgWDogd2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgICAgICAgICAgWTogd2luZG93LmlubmVySGVpZ2h0IC8gMlxuICAgICAgICB9LFxuICAgICAgICBtb3VzZU1vdmVBbmltYXRpb25GcmFtZSA6IG51bGwsXG4gICAgICAgIHRoZW1lczogW1xuICAgICAgICAgICAgJ3NvdW5kcycsXG4gICAgICAgICAgICAndXJiYW4nLFxuICAgICAgICAgICAgJ3RhZ291dCcsXG4gICAgICAgICAgICAnYm94JyxcbiAgICAgICAgICAgICdpbnRlcicsXG4gICAgICAgICAgICAnaGFsZnRvbmUnLFxuICAgICAgICAgICAgJ2RlZXAnLFxuICAgICAgICAgICAgJ2FydHMnXG4gICAgICAgICAgICBcbiAgICAgICAgXSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIEhvbWUuY3JlYXRlTGlzdGVuZXJzKClcblxuICAgICAgICAgICAgSG9tZS5zdGFydFRoZW1lQ291bnRlcigpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEhvbWUubW91c2VNb3ZlQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoSG9tZS5ydW5Nb3VzZU1vdmUpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgaG9tZUJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lQmFubmVyJylcblxuICAgICAgICAgICAgLy8gT2JzZXJ2ZSB0aGUgaG9tZWJhbm5lciBzZWN0aW9uIGZvciBjbGFzcyBjaGFuZ2VzXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKEhvbWUuYmFubmVyTXV0YXRpb24pXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGhvbWVCYW5uZXIsIHtcbiAgICAgICAgICAgICAgYXR0cmlidXRlcyAgOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgYnVyZ2VyTWVudVRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1tZW51VHJpZ2dlcicpXG5cbiAgICAgICAgICAgIC8vIFRvZ2dsZSBiYW5uZXIgYW5pbWF0aW9uIHdoZW4gbWVudSBvcGVuZWQvY2xvc2VkXG4gICAgICAgICAgICBidXJnZXJNZW51VHJpZ2dlcnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBIb21lLnRvZ2dsZVRoZW1lQ291bnRlcilcblxuXG4gICAgICAgICAgICBIb21lLmRvbS5ob21lQmFubmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xuXG4gICAgICAgICAgICAgICAgSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgWDogZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBZOiBlLmNsaWVudFlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtaWRkbGVQb2ludFggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDJcbiAgICAgICAgICAgICAgICBjb25zdCBtaWRkbGVQb2ludFkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyXG5cbiAgICAgICAgICAgICAgICBpZihIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlggIC0gMjAwMCA+IG1pZGRsZVBvaW50WClcbiAgICAgICAgICAgICAgICAgICAgSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5YID0gbWlkZGxlUG9pbnRYICsgMjAwMFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWCAgKyAyMDAwIDwgbWlkZGxlUG9pbnRYKVxuICAgICAgICAgICAgICAgICAgICBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlggPSBtaWRkbGVQb2ludFggLSAyMDAwXG5cbiAgICAgICAgICAgICAgICBpZihIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlkgIC0gMjAwMCA+IG1pZGRsZVBvaW50WSlcbiAgICAgICAgICAgICAgICAgICAgSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5ZID0gbWlkZGxlUG9pbnRZICsgMjAwMFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWSAgKyAyMDAwIDwgbWlkZGxlUG9pbnRZKVxuICAgICAgICAgICAgICAgICAgICBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlkgPSBtaWRkbGVQb2ludFkgLSAyMDAwXG5cbiAgICAgICAgICAgICAgICBpZihIb21lLnRpY2tlciA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBIb21lLnRpY2tlciA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgSG9tZS5tb3VzZU1vdmVBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShIb21lLnJ1bk1vdXNlTW92ZSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgYmFubmVyTXV0YXRpb246IChtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiB0aGUgYmFubmVyIGVsZW1lbnQgaXMgaW4gdmlld1xuICAgICAgICAgICAgaWYobXV0YXRpb25zTGlzdFswXS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbG90U21vb3RoU2Nyb2xsSW5WaWV3JykgJiYgIUhvbWUuYmFubmVySW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgSG9tZS5iYW5uZXJJblZpZXcgPSB0cnVlXG5cbiAgICAgICAgICAgICAgICBIb21lLnN0YXJ0VGhlbWVDb3VudGVyKClcblxuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYoIW11dGF0aW9uc0xpc3RbMF0udGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxvdFNtb290aFNjcm9sbEluVmlldycpICYmIEhvbWUuYmFubmVySW5WaWV3KSB7XG5cbiAgICAgICAgICAgICAgICBIb21lLmJhbm5lckluVmlldyA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICBIb21lLnN0b3BUaGVtZUNvdW50ZXIoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIEhvbWUucmVtb3ZlVGhlbWUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHN0YXJ0VGhlbWVDb3VudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEhvbWUuYmFubmVySW5WaWV3ID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gU2V0IGhlYWRlciB0byBkZWZhdWx0IHN0eWxlXG4gICAgICAgICAgICBpZihIb21lLmRvbS5oZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWZhdWx0SGVhZGVyJykpXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmF1bHRIZWFkZXInKSBcbiAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBpID0gMFxuICAgICAgICAgICAgSG9tZS5jb3VudGVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgbW9iaWxlIHNjcmVlbiBpbWFnZVxuICAgICAgICAgICAgICAgIEhvbWUuZG9tLmJvZHkuZGF0YXNldC5jdXJyZW50VGhlbWUgPSBIb21lLnRoZW1lc1tpXVxuICAgICAgICAgICAgICAgIEhvbWUuZG9tLmJvZHkuZGF0YXNldC5wcmV2aW91c1RoZW1lID0gSG9tZS5wcmV2aW91c1RoZW1lXG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc3RhdGVcbiAgICAgICAgICAgICAgICBIb21lLnByZXZpb3VzVGhlbWUgPSBIb21lLnRoZW1lc1tpXVxuXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5jbGFzc0xpc3QuYWRkKCdzbGlkZU1vYmlsZVNjcmVlbicpXG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZU1vYmlsZVNjcmVlbicpICAgIFxuICAgICAgICAgICAgICAgIH0sIDUwMClcblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoIHRoZSBlbmQgb2YgdGhlIHRoZW1lcywgcmVzZXQgdG8gZmlyc3QgdGhlbWVcbiAgICAgICAgICAgICAgICBpID49IEhvbWUudGhlbWVzLmxlbmd0aCAtIDEgPyBpID0gMCA6IGkrK1xuXG4gICAgICAgICAgICB9LCBIb21lLmludGVydmFsTGVuZ3RoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzdG9wVGhlbWVDb3VudGVyOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKEhvbWUuY291bnRlcilcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKEhvbWUuY291bnRlcilcblxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZVRoZW1lOiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKEhvbWUucHJldmlvdXNUaGVtZSlcbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoSG9tZS5wcmV2aW91c1RoZW1lKVxuXG4gICAgICAgICAgICBIb21lLnByZXZpb3VzVGhlbWUgPSAnJ1xuXG4gICAgICAgICAgICAvLyBTZXQgaGVhZGVyIHRvIGRlZmF1bHQgc3R5bGVcbiAgICAgICAgICAgIEhvbWUuZG9tLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdkZWZhdWx0SGVhZGVyJykgXG4gICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICB0b2dnbGVUaGVtZUNvdW50ZXI6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIENhbmNlbCBhbmltYXRpb24gaWYgbWVudSBpcyBvcGVuXG4gICAgICAgICAgICBpZihIb21lLmRvbS5yb290LmNsYXNzTGlzdC5jb250YWlucygnYnVyZ2VyT3BlbicpKSB7XG5cbiAgICAgICAgICAgICAgICBIb21lLnN0b3BUaGVtZUNvdW50ZXIoKVxuICAgICAgICAgICAgICAgIEhvbWUucmVtb3ZlVGhlbWUoKVxuXG4gICAgICAgICAgICAvLyBTdGFydCBhbmltYXRpb24gaWYgbWVudSBpcyBjbG9zZWQgYW5kIGJhbm5lciBpcyBpbiB2aWV3ICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmKEhvbWUuYmFubmVySW5WaWV3KSB7XG5cbiAgICAgICAgICAgICAgICBIb21lLnN0YXJ0VGhlbWVDb3VudGVyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBydW5Nb3VzZU1vdmUgOiAoKSA9PiB7XG5cblxuICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZU9mUG9zaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIFk6IEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWSAtIEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uLlksXG4gICAgICAgICAgICAgICAgWDogSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5YIC0gSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgWDogSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWCArIChkaWZmZXJlbmNlT2ZQb3NpdGlvbnMuWCAqIDAuMSksXG4gICAgICAgICAgICAgICAgWTogSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWSArIChkaWZmZXJlbmNlT2ZQb3NpdGlvbnMuWSAqIDAuMSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgeFNoaWZ0ID0gKEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uLlggLSAod2luZG93LmlubmVyV2lkdGggLyAyKSkgLyAod2luZG93LmlubmVyV2lkdGggLyAyIClcbiAgICAgICAgICAgIGNvbnN0IHlTaGlmdCA9ICgod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBIb21lLnByZXZpb3VzTW91c2VQb3NpdGlvbi5ZKSAvICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgSG9tZS5kb20ucGhvbmUuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVgoJHsxMCArIHlTaGlmdCoxMH1kZWcpIHJvdGF0ZVkoJHt4U2hpZnQqNjB9ZGVnKWBcblxuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGllciA9IDEwXG4gICAgICAgICAgICBIb21lLmRvbS5jb2xvdXJTaGFwZXNbMV0uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt4U2hpZnQgKiBtdWx0aXBsaWVyICogNX1weCkgdHJhbnNsYXRlWSgkey01KnlTaGlmdCptdWx0aXBsaWVyfXB4KSB0cmFuc2xhdGVaKDVyZW0pYCBcbiAgICAgICAgICAgIEhvbWUuZG9tLmNvbG91clNoYXBlc1syXS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3hTaGlmdCAqIG11bHRpcGxpZXIgKiAzfXB4KSB0cmFuc2xhdGVZKCR7LTMqeVNoaWZ0Km11bHRpcGxpZXJ9cHgpIHRyYW5zbGF0ZVooNXJlbSlgIFxuICAgICAgICAgICAgSG9tZS5kb20uY29sb3VyU2hhcGVzWzNdLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7eFNoaWZ0ICogbXVsdGlwbGllciAqIDl9cHgpIHRyYW5zbGF0ZVkoJHstOSp5U2hpZnQqbXVsdGlwbGllcn1weCkgdHJhbnNsYXRlWig1cmVtKWAgXG4gICAgICAgICAgICBIb21lLmRvbS5jb2xvdXJTaGFwZXNbNF0uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt4U2hpZnQgKiBtdWx0aXBsaWVyICogMn1weCkgdHJhbnNsYXRlWSgkey0yKnlTaGlmdCptdWx0aXBsaWVyfXB4KSB0cmFuc2xhdGVaKDVyZW0pYCBcbiAgICAgICAgICAgIEhvbWUuZG9tLmNvbG91clNoYXBlc1s1XS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3hTaGlmdCAqIG11bHRpcGxpZXIgKiA0fXB4KSB0cmFuc2xhdGVZKCR7LTQqeVNoaWZ0Km11bHRpcGxpZXJ9cHgpIHRyYW5zbGF0ZVooNXJlbSlgIFxuICAgICAgICAgICAgSG9tZS5kb20uY29sb3VyU2hhcGVzWzZdLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7eFNoaWZ0ICogbXVsdGlwbGllciAqIDd9cHgpIHRyYW5zbGF0ZVkoJHstNyp5U2hpZnQqbXVsdGlwbGllcn1weCkgdHJhbnNsYXRlWig1cmVtKWAgXG5cbiAgICAgICAgICAgIGlmKE1hdGguYWJzKGRpZmZlcmVuY2VPZlBvc2l0aW9ucy5YICsgZGlmZmVyZW5jZU9mUG9zaXRpb25zLlkpIDwgLjEpXG4gICAgICAgICAgICAgICAgSG9tZS50aWNrZXIgPSBmYWxzZVxuXG4gICAgICAgICAgICBpZihIb21lLnRpY2tlciA9PSB0cnVlKSBcbiAgICAgICAgICAgICAgICBIb21lLm1vdXNlTW92ZUFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKEhvbWUucnVuTW91c2VNb3ZlKVxuXG4gICAgICAgIH0sXG5cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gSG9tZVxuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBQbG90IFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90JyksXG4gICAgXHROZXdzXG5cbiAgICAvL01heSB0aGlzIG9iamVjdCBhY3QgYXMgYSBndWlkZSB0byB1c2luZyBQbG90IGNvcmUgZnVuY3Rpb25zXG4gICAgLy9hbmQgaG93IHRvIHNldCB1cCBhamF4IGR5bmFtaWMgZGF0YSB3aXRoIG91ciBuZXcgcHJpbmNpcGxlcyB3aXRoIGVhc2VcbiAgICBOZXdzID0ge1xuXG4gICAgXHRtYXhQYWdlcyBcdFx0XHQ6IDEsXG4gICAgICAgIGN1cnJlbnROZXdzQ2F0ZWdvcnkgOiAwLFxuICAgICAgICBjdXJyZW50UGFnZSAgICAgICAgIDogMSxcbiAgICBcdGxvYWRNb3JlQnV0dG9uICBcdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1uZXdzTG9hZE1vcmUnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKE5ld3MubG9hZE1vcmVCdXR0b24pIHtcblxuICAgICAgICAgICAgXHROZXdzLnNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbigpXG5cbiAgICAgICAgICAgICAgICBOZXdzLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUxpc3RlbmVyczogKCkgPT4ge1xuXG4gICAgICAgIFx0TmV3cy5sb2FkTW9yZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG4gICAgICAgIFx0XHRjb25zdCBuZXh0UGFnZSA9IHBhcnNlSW50KE5ld3MubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSlcblxuICAgICAgICBcdFx0TmV3cy5jdXJyZW50UGFnZSA9IG5leHRQYWdlXG5cbiAgICAgICAgXHRcdE5ld3MubG9hZE5ld3ModHJ1ZSlcblxuICAgICAgICBcdFx0TmV3cy5sb2FkTW9yZUJ1dHRvbi5kYXRhc2V0Lm5leHRQYWdlID0gbmV4dFBhZ2UgKyAxXG5cbiAgICAgICAgXHR9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZE5ld3MgOiBhcHBlbmQgPT4ge1xuXG4gICAgICAgIFx0Y29uc3QgYXJncyA9IHtcblx0XHRcdFx0dGVtcGxhdGVQYXJ0IDogJ3BhcnRzL25ld3MtbGlzdGluZycsIFxuXHRcdFx0XHRkYXRhIDoge1xuXHRcdFx0XHRcdCdwYWdlJyBcdFx0XHQ6IE5ld3MuY3VycmVudFBhZ2UsXG5cdFx0XHRcdFx0J2FydGlzdFR5cGUnXHQ6IE5ld3MuY3VycmVudE5ld3NDYXRlZ29yeVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBlbmQgOiBhcHBlbmQgXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncykudGhlbihodG1sID0+IHtcblxuXHRcdFx0XHROZXdzLnNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbigpXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cdFx0XHR9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uIDogKCkgPT4ge1xuXG4gICAgICAgIFx0Ly9DaGVjayBpZiBtYXggcGFnZXMgaXMgMS4gSWYgaXQgaXMsIHRoZXJlJ3Mgb25seSAxIHBhZ2Ugb2YgTmV3c1xuICAgICAgICBcdC8vc28gd2UgY2FuIGhpZGUgbG9hZCBtb3JlIGJ1dHRvblxuICAgICAgICBcdE5ld3MubWF4UGFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLW1heFBhZ2VzJykuZGF0YXNldC5tYXhQYWdlc1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhOZXdzLm1heFBhZ2VzKVxuXG4gICAgICAgIFx0aWYoTmV3cy5tYXhQYWdlcyA+IE5ld3MuY3VycmVudFBhZ2UpXG4gICAgICAgIFx0XHROZXdzLmxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIFx0ZWxzZSBcbiAgICAgICAgXHRcdE5ld3MubG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IE5ld3NcblxufSgpKSIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgU2NoZWR1bGVcblxuICAgIFNjaGVkdWxlID0ge1xuICAgICAgZGF5QnV0dG9ucyAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tc2NoZWR1bGVEYXlQaWNrZXJCdXR0b24nKSxcbiAgICAgIGNhbGVuZGFycyAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NoZWR1bGVDYWxlbmRhcldyYXAnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICBTY2hlZHVsZS5jcmVhdGVMaXN0ZW5lcnMoKVxuICAgICAgICAgIFNjaGVkdWxlLmNoZWNrVG9TZWVJZk5hdkFycm93c05lZWRlZCgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICAgIGZvcih2YXIgZGF5QnV0dG9uIG9mIFNjaGVkdWxlLmRheUJ1dHRvbnMpIHtcblxuICAgICAgICAgICAgZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICBTY2hlZHVsZS5sb2FkTmV3RGF0ZSh0aGlzKSBcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsKCkgPT4ge1xuXG4gICAgICAgICAgICBTY2hlZHVsZS5jaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQoKVxuXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGZvcih2YXIgY2FsZW5kYXIgb2YgU2NoZWR1bGUuY2FsZW5kYXJzKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0QnV0dG9uICAgICAgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlUmlnaHQnKSxcbiAgICAgICAgICAgIGxlZnRCdXR0b24gICAgICAgICAgICAgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlTGVmdCcpLFxuICAgICAgICAgICAgdHJhY2tzICAgICAgICAgICAgICAgICA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5zY2hlZHVsZUNhbGVuZGFyVHJhY2tzJyksXG4gICAgICAgICAgICB0cmFja3NXICAgICAgICAgICAgICAgID0gdHJhY2tzLm9mZnNldFdpZHRoXG5cbiAgICAgICAgICAgIHJpZ2h0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICB0cmFja3Muc2Nyb2xsQnkoe1xuICAgICAgICAgICAgICAgIGxlZnQ6IHRyYWNrc1cgLyAyLFxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGVmdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgdHJhY2tzLnNjcm9sbEJ5KHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAtdHJhY2tzVyAvIDIsXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkTmV3RGF0ZSA6IGVsZW0gPT4ge1xuXG4gICAgICAgICAgZm9yKHZhciBkQiBvZiBTY2hlZHVsZS5kYXlCdXR0b25zKSB7XG4gICAgICAgICAgICBkQi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG5cbiAgICAgICAgICBsZXQgZGF5ID0gZWxlbS5kYXRhc2V0LnNjaGVkdWxlRGF5IFxuXG4gICAgICAgICAgZm9yKHZhciBjYWxlbmRhciBvZiBTY2hlZHVsZS5jYWxlbmRhcnMpIHtcblxuICAgICAgICAgICAgaWYoY2FsZW5kYXIuZGF0YXNldC5zY2hlZHVsZURheSA9PSBkYXkpXG4gICAgICAgICAgICAgIGNhbGVuZGFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgICAgICBlbHNlIFxuICAgICAgICAgICAgICBjYWxlbmRhci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIFNjaGVkdWxlLmNoZWNrVG9TZWVJZk5hdkFycm93c05lZWRlZCgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQgOiAoKSA9PiB7IFxuXG4gICAgICAgICAgZm9yKHZhciBjYWxlbmRhciBvZiBTY2hlZHVsZS5jYWxlbmRhcnMpIHtcblxuICAgICAgICAgICAgaWYoIWNhbGVuZGFyLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcblxuICAgICAgICAgICAgICAgY29uc3QgdHJhY2tzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLnNjaGVkdWxlQ2FsZW5kYXJUcmFja3MnKVxuXG4gICAgICAgICAgICAgICBpZih0cmFja3Muc2Nyb2xsV2lkdGggPiBjYWxlbmRhci5zY3JvbGxXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZUxlZnQnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZVJpZ2h0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlTGVmdCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlUmlnaHQnKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTY2hlZHVsZVxuXG59KCkpXG5cbiJdfQ==
