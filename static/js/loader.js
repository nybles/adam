$(window).load(function() { // makes sure the whole site is loaded
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
})

// Animated CSS preloader from http://tobiasahlin.com/spinkit/
// Excellent preloader example found here: http://ismet.me/index.html
