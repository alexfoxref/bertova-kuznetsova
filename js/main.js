document.addEventListener('DOMContentLoaded', () => {

    // Функция смены класca className у элемента element
    const toggleClass = (element, className) => {
        if (element.classList.contains(className)) {
            element.classList.remove(className)
        } else {
            element.classList.add(className)
        }
    };

    // Выпадающие меню и кнопка выпадающего меню
    const menuBtn = document.querySelector('.header__menu-btn'),
        menu = document.querySelector('.header__menu');

    menuBtn.addEventListener('click', () => {
        toggleClass(menu, 'header__menu_active');
        toggleClass(menuBtn, 'header__menu-btn_active')
    });

    // Отступы текста в блоге
    const blogTitles = document.querySelectorAll('.blog__block-title'),
        blogTexts = document.querySelectorAll('.blog__block-text'),
        marginText = 20;
    let titleMaxHeight = 0,
        blogTitlesHeights = [];

    blogTitles.forEach((title, index) => {
        const titleHeight = title.getBoundingClientRect().height;
        titleMaxHeight = (titleHeight > titleMaxHeight) ? titleHeight : titleMaxHeight;
        blogTitlesHeights[index] = titleHeight;
    });

    blogTexts.forEach((text, index) => {
        text.style.marginTop = `${titleMaxHeight + marginText - blogTitlesHeights[index]}px`
    });

    // Функция для прокрутки экрана к секции по клику на ссылки в меню menu
    const scrollScreen = (menu) => {
        const menuLinks = menu.querySelectorAll('a');

        menu.addEventListener('click', event => {
            event.preventDefault();
    
            const target = event.target;
    
            menuLinks.forEach(link => {
                if (target === link) {
                    document.querySelector(link.getAttribute('href')).scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                }
            });
        });
    };

    // Плавная прокрутка по клику на ссылки в меню в шапке и в подвале
    const headerNavMenu = document.querySelector('.header-nav__menu'),
        headerMenuList = document.querySelector('.header__menu-list'),
        footerNavMenu = document.querySelector('.footer__nav-menu');

    scrollScreen(headerNavMenu);
    scrollScreen(headerMenuList);
    scrollScreen(footerNavMenu);
    

});