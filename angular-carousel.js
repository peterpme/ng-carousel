(function () {
    angular.module('angular-carousel', [])
    .directive('angularCarousel', [function () {

        function Carousel (element, arrowThreshold) {
            this.element = element;
            this.arrowThreshold = arrowThreshold;

            this.currentIndex = 0;

            this.carouselBelt = this.element.find('.carousel-belt');
            this.slides = this.carouselBelt.find('.carousel-item', this.carouselBelt);
            this.arrows = this.element.find('.arrow', this.element);

            this.beltLength = this.carouselBelt.find('> div', this.carouselBelt).length;
            this.carouselBelt.width((this.beltLength * 100) + '%');
            this.slides.width(100 / this.beltLength + '%');

            this.calculateSlideHeight();
            this.requireArrows();
        }

        Carousel.prototype = {

            calculateSlideHeight: function () {
                var minHeight = 0;

                this.slides.each(function () {

                    if ($(this).height() > minHeight ) {
                        minHeight = $(this).height();
                    }

                });

                this.carouselBelt.height(minHeight);
            },

            nextSlide: function () {
                if(this.currentIndex < this.beltLength - 1 ) {
                    ++this.currentIndex;
                    this.animateSlide();
                }
            },

            previousSlide: function () {
                if ( this.currentIndex > 0) {
                    --this.currentIndex;
                    this.animateSlide();
                }
            },

            animateSlide: function () {
                this.carouselBelt.css({
                    'transform': 'translateX(-' + this.currentIndex * this.slides.width() + 'px)'
                })
            },

            requireArrows: function () {
                if (this.maxLength <= this.arrowThreshold) {
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
                    rightArrow = angular.element('> .arrow-right', element),
                    arrowThreshold = attrs.arrowThreshold;

                    var carousel = new Carousel(element, arrowThreshold);

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
