(function () {
    angular.module('angular-carousel-directive', [])
    .directive('angular-carousel', ['$log', function ($log) {

        function Carousel (carouselBelt) {
            this.carouselBelt = carouselBelt;

            this.currentIndex = 0;
            this.arrows = element.find('.arrow', element);

            thix.maxLength = this.belt.find('> div', belt).length;
            this.slides = belt.find('.carousel-item', belt);
            this.belt.width((this.maxLength * 100) + '%');

            this.requireArrows();
        }

        Carousel.prototype = {
            nextSlide: function () {
                if( this.currentIndex < this.maxLength ) {
                    ++this.currentIndex;
                    this.animate();
                }
            },

            previousSlide: function () {
                if ( this.currentIndex > 0) {
                    --this.currentIndex;
                    this.animate();
                }
            },

            animateSlide: function () {
                var _this = this;
                _this.carouselBelt.css({
                    'transform' : 'translateX(-' + this.currentIndex * this.slideWidth + '%);'
                });
            },

            requireArrows: function () {
                if (thix.maxLength <= this.arrowLimit) {
                    this.arrows.hide();
                }
            }

        }

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $log.info('[ng-carousel] init');

                var belt = angular.element('.carousel-belt', element),
                    leftArrow = angular.element('> .arrow-left', element),
                    rightArrow = angular.element('> .arrow-right', element);

                    var carousel = new Carousel(belt);

                    rightArrow.on('click', element, function (e) {
                        e.preventDefault();
                        carousel.nextSlide();
                    });

                    leftArrow.on('click', element, function (e) {
                        e.preventDefault();
                        carousel.previousSlide();
                    });
            }
        }
    }]);
}());
