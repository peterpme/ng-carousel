(function () {
    angular.module('angular-carousel', [])
    .directive('angularCarousel', [function () {

        function Carousel (element, arrowThreshold) {
            this.element = element;
            this.arrowThreshold = arrowThreshold;

            this.currentIndex = 0;

            this.carouselBelt = this.element.find('.carousel-belt');
            this.carouselBelt.width((this.maxLength * 100) + '%');
            this.maxLength = this.carouselBelt.find('> div', this.carouselBelt).length;

            this.slides = this.carouselBelt.find('.carousel-item', this.carouselBelt);
            this.arrows = this.element.find('.arrow', this.element);

            this.calculateSlideHeight();
            this.requireArrows();
        }

        Carousel.prototype = {

            calculateSlideHeight: function () {
                var minHeight = 0;
                this.slides.each(function (index) {
                    if ( $(this).height() > minHeight ) {
                        minHeight = $(this).height();
                    }
                    console.log(minHeight);
                });
            },

            nextSlide: function () {
                if( this.currentIndex < this.maxLength ) {
                    ++this.currentIndex;
                    this.animateSlide();
                    console.log(this.currentIndex);
                }
            },

            previousSlide: function () {
                if ( this.currentIndex > 0) {
                    --this.currentIndex;
                    this.animateSlide();
                    console.log(this.currentIndex);
                }
            },

            animateSlide: function () {
                var _this = this;
                _this.carouselBelt.css({
                    'transform' : 'translateX(-' + this.currentIndex * this.slideWidth + '%);'
                });
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
