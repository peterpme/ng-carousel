# Angular Carousel

An AngularJS directive for a creating a simple carousel running in your application.

## Browser Support
- IE7+ (no transitions)
- IE10+ with transitions
- Chrome, Safari, Opera, FireFox

## Install

Clone the repository and include directly into your project. You can also use bower and install as a dependency:

```
bower install angular-carousel
```

Add the dependency in your Angular's project dependency arguments:

```js
var app = angular.module('MyApp', [
  'angular-carousel'
]);
```

### Dependencies

- jQuery (for transitions)
- I use Font-Awesome in the example, but this is not included in the project.

Make sure you reference the script in your javascript:

```js
<script src="bower_components/ng-carousel/angular-carousel.js"></script>
```

## Usage

Make sure your `carousel-container` includes:
```
data-angular-carousel
```


### Html Structure

```html
<div class='carousel-container' data-angular-carousel>
  
  <div class='carousel-belt'>
    <div class='carousel-item'>ONE</div>
    <div class='carousel-item'>TWO</div>
    <div class='carousel-item'>THREE</div>
  </div>

  <a class='arrow arrow-left'><i class='fa fa-angle-left'></i></a>
  <a class='arrow arrow-right'><i class='fa fa-angle-right'></i></a>
</div>
```

### TODO

-Modernizr for jQuery-fallback transitions
