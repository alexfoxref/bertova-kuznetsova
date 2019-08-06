$(document).ready(function() {
    
    // Выпадающие меню
    var menuBtn = $('.header__menu-btn');
    var menu = $('.header__menu');

    menuBtn.on('click', function(event) {
        event.preventDefault();
        menu.toggleClass('header__menu_active');
    });

})