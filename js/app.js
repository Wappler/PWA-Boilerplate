// Check for browser service worker support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err));
}

// collapse mobile naviagtion on click
$('.navbar-nav>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
});
