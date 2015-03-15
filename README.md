Animately.js
============

A lightweight (doesn't require jQuery) JavaScript animation library for chaining CSS3 animations and looping.

## Example

### JavaScript
```
var slideOne = document.getElementsByClassName('shape-1')[0]
  , slideTwo = document.getElementsByClassName('shape-2')[0]
  , slideThree = document.getElementsByClassName('shape-3')[0]
  , options =
    { loop: true
    , slides:
      [ { slideElement: slideOne
        , transitionIn: 'slide-right-in'
        , transitionOut: 'slide-right-out'
        }
      , { slideElement: slideTwo
        , transitionIn: 'slide-right-in'
        , transitionOut: 'slide-right-out'
        }
      , { slideElement: slideThree
        , transitionIn: 'slide-right-in'
        , transitionOut: 'slide-right-out'
        }
      ]
    }

  var animately = new Animately(options)
```

### HTML
```
<div>
  <div class="shape-1"></div>
  <div class="shape-2"></div>
  <div class="shape-3"></div>
</div>
```

### CSS
```
.slide-right-in {
  animation: slide-right-in 0.7s forwards;
}

.slide-right-out {
  animation: slide-right-out 0.7s forwards;
}

@keyframes slide-right-out {
  0% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
  20% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
  }
}

@keyframes slide-right-in {
  0% {
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
}
```