'use strict';

angular.module('core').directive('sliderIndex', [

    function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/core/views/slider.html',
            link: function postLink(scope, element, attrs) {
                // Slider index directive logic
                // ...
                console.log(element[0]);
                jQuery('.autoplay').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 4000
                    //centerMode: true,
                    //centerPadding: '100px',
                    //dots: true
                });
                //element.text('this is the sliderIndex directive');
            }
        };
    }
]);
