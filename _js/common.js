// ====================================================================
// Common - js
// 
// Scripts for the entire app
// ====================================================================

(function() {

  // ============================================
  // Window on load - hide page loader animation
  // ============================================
  $(window).on('load', function() {
    setTimeout(function() {
      $( ".page-loader-cover" ).fadeOut(500, function() {
        $( ".page-loader-cover" ).remove();
      });  
    }, 2000);
  });

})();