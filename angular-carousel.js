(function () {
    angular.module('angular-carousel', [])
    .directive('angularCarousel', [function () {

        function Carousel (element) {
            this.element = element;

            this.currentIndex = 0;

            this.arrows = this.element.find('.arrow', this.element);
            this.carouselBelt = this.element.find('.carousel-belt');

            this.maxLength = this.carouselBelt.find('> div', this.carouselBelt).length;
            this.slides = this.carouselBelt.find('.carousel-item', this.carouselBelt);
            this.carouselBelt.width((this.maxLength * 100) + '%');

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
                if (this.maxLength <= this.arrowLimit) {
                    this.arrows.hide();
                }
            }

        }

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
              console.log('[ng-carousel] init');

                var belt = angular.element('.carousel-belt', element),
                    leftArrow = angular.element('> .arrow-left', element),
                    rightArrow = angular.element('> .arrow-right', element);

                    var carousel = new Carousel(element);

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
