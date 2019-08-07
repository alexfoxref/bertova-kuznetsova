$(document).ready( () => {
    
    // Выпадающие меню
    const menuBtn = $('.header__menu-btn'),
        menu = $('.header__menu');

    menuBtn.on('click', event => {
        event.preventDefault();
        menu.toggleClass('header__menu_active');
    });

    // Нажатие на кнопку выпадающего меню
    menuBtn.on('click', () => {
        menuBtn.toggleClass('header__menu-btn_active')
    });

});