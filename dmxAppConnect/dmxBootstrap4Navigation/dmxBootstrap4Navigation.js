jQuery(document).ready(function($) {
  $(window).on('popstate pushstate', _update);

  _update();

  function _update() {
  	var url = window.location.href;

  	$('a.nav-link:not([data-toggle]), a.dropdown-item').map(function() {
   		$(this).toggleClass('active', this.href == url || this.href == url.split("?")[0].split("#")[0]);
  	});

    $('a.dropdown-item.active').map(function() {
      $(this).closest('.nav-item.dropdown').find('.dropdown-toggle').toggleClass('active');
  	});
  }
});




