// ====================================================================
// Home - js
// 
// Scripts for the home page
// ====================================================================

(function() {

  // ============================================
  // Document ready
  // ============================================
  $(function() {

    




    // =====================================================
    // STARTUP METHODS

    initMap();
    setMapHeight()
    setPhotTileHeight()
    


    // =====================================================
    // TILE TILT INIT

    $('.js-tilt').tilt({
      glare: true,
      maxGlare: .2,
      maxTilt: 1
    })
    


    // =====================================================
    // SMOOTHSCROLL ANCHORS

    $('a.smoothscroll').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('id=' + this.hash.slice(1));
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });



    // =====================================================
    // ABOUT SECTION TABS

    $('#about .tile .icon').each(function(i,v) {
      $button = $(v);
      $button.click(function() {
        var tab = $(this).attr("tab-button")
        $('.tab').hide()
        $('.tab-'+tab).show();
        $('#about .tile .icon').removeClass('selected')
        $("[tab-button='"+tab+"']").addClass('selected')
      })
    })

    

    // =====================================================
    // QUOTES SLIDER

    $('.quote-slider').owlCarousel({
      center: true,
      items: $(document).width() < 415 ? 1 : 2 ,
      loop: true,
      margin: $(document).width() < 415 ? 30 : 600 ,
      dots: $(document).width() < 415 ? true : false,
      nav: true,
      navText: ['<img src="/assets/images/slider-left.svg">','<img src="/assets/images/slider-right.svg">'],
      responsive:{
        1200:{
          items: 3
        },
        1000: {
          items: 2
        }
      }
    });



    // =====================================================
    // IMAGE SLIDER

    if ($(document).width() < 415) {
      $('.image-slider').addClass('owl-carousel');
      $('.image-slider').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        nav: true,
        navText: ['<img src="res/circle_arrow_left.svg">','<img src="res/circle_arrow_right.svg">'],
      });
    }
    


    // =====================================================
    // PHOTO MODAL LIGHTBOX

    lightbox.option({
      albumLabel: "%1/%2",
      fadeDuration: 200,
      imageFadeDuration: 200,
      resizeDuration: 200
    })

    

    // =====================================================
    // BUTTON CLICKS

    // nav menu
    $('.menu-toggle').click(function() {
      if ($('.float-nav').hasClass('menu-open')) {
        $('.float-nav').removeClass('menu-open');
        $('.float-nav-overlay').fadeOut()
      } else {
        $('.float-nav').addClass('menu-open');
        $('.float-nav-overlay').fadeIn()
      }
    });
    
    // nav menu overlay
    $('.float-nav-overlay').click(function() {
      $('.float-nav').removeClass('menu-open');
      $('.float-nav-overlay').fadeOut()
    })
    
    // nav links
    $('.menu-links a').click(function() {
      $('.float-nav').removeClass('menu-open');
      $('.float-nav-overlay').fadeOut()
    })
    
    // scroll to top
    $('.scroll-top').click(function() {
      $('.float-nav-overlay').fadeOut()
      $('.float-nav').removeClass('menu-open');
    })





  });// end document ready


    // resize document
    $(window).resize(function() {
      setMapHeight()
      setPhotTileHeight()
    });
  
    // scroll document
    $(window).scroll(function(){
      if($(window).scrollTop() > $(window).height() -1) {
        $('.float-nav').addClass('visible')
        $('.scroll-top').addClass('visible')
      }
      else {
        $('.float-nav').removeClass('visible')
        $('.scroll-top').removeClass('visible')
      }
    });



  // ============================================
  // Example function
  // ============================================
  function example() {}

    // dynamic map height
    function setMapHeight() {
      var height;
      if ($(document).width() < 415) {
        height = 180;
      } else {
        height = $('#info').height()
      }
      $('#map').height(height)
    }
    
    // dynamic image height in gallery
    function setPhotTileHeight() {
      if ($(document).width() > 414) {
        $('#photo .item').height($('#photo .item').width()/1.6)
      } 
    }
    
    // initilize the google map
    function initMap() {
      var isDraggable = $(document).width() > 800 ? true : false;
      var loc = {lat: 43.689385, lng: -1.357868};
      var map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        zoom: 14,
        streetViewControl: false,
        scrollwheel: false,
        draggable: isDraggable,
      });
      var marker = new google.maps.Marker({
        position: loc,
        map: map,
      });
      var service = new google.maps.places.PlacesService(map);
      service.getDetails({
        placeId: 'ChIJ-4W6UKJQUQ0Ry7mzoRb1bSI',
      }, function(place, status) {
        place.opening_hours.weekday_text.forEach(function(value, index) {
          $('#google-hours li:nth-child('+(index+1)+')')
            .html(place.opening_hours.weekday_text[index]
            .split(': ')[1].replace(/:00/g, ''))
        })
      });
    }

})();
