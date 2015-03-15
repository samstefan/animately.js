/*
 * Animately
 * Animately allows you to chain CSS3 animations.
 * @author: Sam Stefan | samstefan.co.uk
 */

var Animately = (function() {

  /*
   * Private methods
   */

  function asyncForEach (array, fn, callback) {
    array = array.slice(0)

    function processOne() {
      var item = array.pop()
      fn(item, function() {
          if (array.length > 0) {
            setTimeout(processOne, 0)
          } else {
            callback()
          }
        })
    }

    if (array.length > 0) {
      setTimeout(processOne, 0)
    } else {
      callback()
    }
  }

  /*
   * Animately Animation
   * Animately Animation is a single instance of an animation that runs
   * animateIn, hold and then animateOut before returning it's callback.
   * @prama: {Object} the settings for the animation
   * @prama: {Integer} the stage in the animation to pause at
   */

  function AnimatelyAnimation (settings, holdOn) {
    holdOn = holdOn || false

    var transitionInClass = settings.transitionIn
      , transitionOutClass = settings.transitionOut
      , slideElement = settings.slideElement
      , holdFor = settings.holdFor

    /*
     * Start
     * Calls animateIn then hold followed by animateOut then returns a callback on complete
     * @return: {Function} when animation complete
     */

    this.start = function (callback) {
      animateIn(slideElement, transitionInClass, function () {
        hold(slideElement, transitionInClass, holdOn, holdFor, function () {
          animateOut(slideElement, transitionOutClass, function () {
            callback()
          })
        })
      })
    }

    /*
     * Remove Class
     * Removes class from element
     * @prama: {Object} the element
     * @prama: {String} The class to remove
     */

    function removeClass (elem, className) {
      if (elem.classList) {
        elem.classList.remove(className)
      } else {
        elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
      }
    }

    /*
     * Add Class
     * Adds a class to the element
     * @prama: {Object} the element
     * @prama: {String} The class to add
     */

    function addClass (elem, className) {
      if (elem.classList) {
        elem.classList.add(className)
      } else {
        elem.className += ' ' + className
      }
    }

    /*
     * Animate In
     * Adds the animate in class to the element and listen for the animation end callback
     * @prama: {Object} the element to animate out
     * @prama: {String} the class name for the transition in
     * @prama: {Function} the callback when complete
     */

    function animateIn (slideElement, transitionInClass, callback) {
      addClass(slideElement, transitionInClass)

      function animate (listener) {
        if (listener.animationName === transitionInClass) {
          slideElement.removeEventListener('webkitAnimationEnd', animate)
          slideElement.removeEventListener('mozAnimationEnd', animate)
          slideElement.removeEventListener('MSAnimationEnd', animate)
          slideElement.removeEventListener('oanimationend', animate)
          slideElement.removeEventListener('animationend', animate)
          callback()
        }
      }

      slideElement.addEventListener('webkitAnimationEnd', animate)
      slideElement.addEventListener('mozAnimationEnd', animate)
      slideElement.addEventListener('MSAnimationEnd', animate)
      slideElement.addEventListener('oanimationend', animate)
      slideElement.addEventListener('animationend', animate)
    }

    /*
     * Hold
     * After the hold time it removes the transition in class.
     * @prama: {Object} the element to animate out
     * @prama: {String} the class name for the transition in
     * @prama: {Boolean} if it should hold in this state in-defiantly
     * @prama: {Integer} a hold time in ms
     * @prama: {Function} the callback when complete
     */

    function hold (slideElement, transitionInClass, holdOn, holdFor, callback) {
      if (!holdOn) {
        setTimeout(function () {
          removeClass(slideElement, transitionInClass)
          callback()
        }, holdFor)
      }
    }

    /*
     * Animate Out
     * Adds the animate out class to the element and listen for the animation end callback
     * @prama: {Object} the element to animate out
     * @prama: {String} the class name for the transition out
     * @prama: {Function} the callback when complete
     */

    function animateOut (slideElement, transitionOutClass, callback) {
      addClass(slideElement, transitionOutClass)

      function animate (listener) {
        if (listener.animationName === transitionOutClass) {
          slideElement.removeEventListener('webkitAnimationEnd', animate)
          slideElement.removeEventListener('mozAnimationEnd', animate)
          slideElement.removeEventListener('MSAnimationEnd', animate)
          slideElement.removeEventListener('oanimationend', animate)
          slideElement.removeEventListener('animationend', animate)
          removeClass(slideElement, transitionOutClass)
          callback()
        }
      }

      slideElement.addEventListener('webkitAnimationEnd', animate)
      slideElement.addEventListener('mozAnimationEnd', animate)
      slideElement.addEventListener('MSAnimationEnd', animate)
      slideElement.addEventListener('oanimationend', animate)
      slideElement.addEventListener('animationend', animate)
    }

  }

  /*
   * Constructor
   * @prama: {Object} options to pass to Animately
   */

  return function (options) {
    this.currentSlide = 1

    var holdSlideOn = options.hold || -1
      , slides = options.slides.reverse()
      , loop = options.loop

    /*
     * Animation Loop
     * Does one loop over all the slides
     * @prama: {Intger} the slide to pause the animation on
     * @prama: {Array} the array of element to animate
     * @prama: {Boolean} if the animation should loop
     */

    function animationLoop(holdSlideOn, slides, loop) {
      var self = this

      asyncForEach(slides, function(slide, callback) {

        var holdOn = false

        if (self.currentSlide === holdSlideOn) {
          holdOn = true
        }

        var animatelyAnimation = new AnimatelyAnimation(slide, holdOn)

        animatelyAnimation.start(function() {
          self.currentSlide++
          callback()
        })

        // Destroy the animation class instance
        animatelyAnimation = null

      }, function() {
        if (loop) {
          animationLoop(holdSlideOn, slides, loop)
        }
      })
    }

    animationLoop(holdSlideOn, slides, loop)
  }

})()
