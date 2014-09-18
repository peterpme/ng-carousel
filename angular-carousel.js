(function () {
    angular.module('angular-carousel', [])
    .directive('angularCarousel', [function () {

        function Carousel (element, arrowThreshold, css3Support, buttons, slideContent) {
            this.element = element;
            this.arrowThreshold = arrowThreshold;
            this.buttons = buttons;
            this.slideContent = slideContent;

            //boolean variable
            this.css3Support = css3Support;

            this.currentIndex = 0;

            this.carouselBelt = this.element.find('.carousel-belt');
            this.slides = this.carouselBelt.find('.carousel-item', this.carouselBelt);
            this.arrows = this.element.find('.arrow', this.element);

            this.beltLength = this.carouselBelt.find('> div', this.carouselBelt).length;
            this.carouselBelt.width((this.beltLength * 100) + '%');
            this.slides.width(100 / this.beltLength + '%');

            this.calculateSlideHeight();
            this.requireArrows();

            this.goToSlide();
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

            goToSlide: function () {
                var _this = this;

                console.log(this.buttons);

                console.log(this.slideContent);

                this.buttons.each(function(button){

                    $(this).on('click', function() {

                        if (!_this.currentIndex !== button) {

                            _this.removeActiveClass();
                            _this.currentIndex = button;
                            _this.animateSlide();
                            _this.updateActiveClass();
                        }    
                    });
                });
            },

            nextSlide: function () {
                
                if (this.currentIndex < this.beltLength - 1 ) {
                    //remove the active class from the current navigation and slide content
                    this.removeActiveClass();

                    ++this.currentIndex;
                    this.animateSlide();

                    //add the active class for the next tab
                    this.updateActiveClass();
                }
            },

            previousSlide: function () {
                
                if ( this.currentIndex > 0) {
                    //remove the active class from the current navigation and slide content
                    this.removeActiveClass();

                    --this.currentIndex;
                    this.animateSlide();

                    //add the active class for the next tab
                    this.updateActiveClass();
                }
            },

            removeActiveClass: function () {
                this.buttons.eq(this.currentIndex).removeClass('is-active');
                this.slideContent.eq(this.currentIndex).removeClass('is-active');
            },

            updateActiveClass: function () {
                this.buttons.eq(this.currentIndex).addClass('is-active');
                this.slideContent.eq(this.currentIndex).addClass('is-active');
            },

            animateSlide: function () {

                if (this.css3Support) {
                    this.carouselBelt.css({
                        'transform': 'translateX(-' + this.currentIndex * this.slides.width() + 'px'
                    });
                }

                else {
                    this.carouselBelt.animate({left: - this.currentIndex * this.slides.width() + 'px' })
                }  
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
                    leftArrow = angular.element('.arrow-left', element),
                    rightArrow = angular.element('.arrow-right', element),
                    buttons = angular.element('.carousel-nav__slide', element),
                    slideContent = angular.element('.carousel__detail-item', element),
                    css3Support = Modernizr.csstransforms3d,
                    arrowThreshold = attrs.arrowThreshold;
                    
                var carousel = new Carousel(element, arrowThreshold, css3Support, buttons, slideContent);

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
