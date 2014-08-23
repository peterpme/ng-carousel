# Angular Carousel

An AngularJS directive for a creating a simple carousel running in your application.

## Browser Support
- IE9+ (no transitions)
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
  'angular-carousel-directive'
]);
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


### Example


### TODO

-Modernizr for jQuery-fallback transitions
