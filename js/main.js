// Функция смены класca className у элемента element
const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
};

// Функция, устанавливающая вертикальные отступы margin между элементами групп elementsTop и elementsBottom
const setMargin = (elementsTop, elementsBottom, margin) => {
    let elementsTopMaxHeight = 0,
        elementsTopHeights = [];

    if (elementsTop.length === undefined) {
        const elementsTopHeight = elementsTop.getBoundingClientRect().height;

        elementsTopMaxHeight = (elementsTopHeight > elementsTopMaxHeight) ? elementsTopHeight : elementsTopMaxHeight;

        elementsBottom.style.marginTop = `${elementsTopMaxHeight - elementsTopHeight + margin}px`;
    } else {
        elementsTop.forEach((element, index) => {
            const elementsTopHeight = element.getBoundingClientRect().height;
    
            elementsTopMaxHeight = (elementsTopHeight > elementsTopMaxHeight) ? elementsTopHeight : elementsTopMaxHeight;
            elementsTopHeights[index] = elementsTopHeight;
        });

        elementsBottom.forEach((element, index) => {
            element.style.marginTop = `${elementsTopMaxHeight - elementsTopHeights[index] + margin}px`;
        });
    };
};

// Функция, устанавливающая вертикальные отступы между заголовком и текстом в карточках блока Блог
const setBlogMargin = (margin) => {
    const blogTitles = document.querySelectorAll('.blog__block-title'),
        blogTexts = document.querySelectorAll('.blog__block-text');

    setMargin(blogTitles, blogTexts, margin);
};

// Функция для прокрутки экрана к секции по клику на ссылки в меню menu
const scrollScreen = (menu) => {
    const menuLinks = menu.querySelectorAll('a');

    menu.addEventListener('click', event => {
        event.preventDefault();

        const target = event.target;

        menuLinks.forEach(link => {
            if (target === link) {
                lightScroll(document.querySelector(link.getAttribute('href')));
            }
        });
    });
};

// Функция плавной прокрутки к элементу element
const lightScroll = (element) => {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};


document.addEventListener('DOMContentLoaded', () => {

    // Выпадающие меню и кнопка выпадающего меню
    const menuBtn = document.querySelector('.header__menu-btn'),
        menu = document.querySelector('.header__menu');

    menuBtn.addEventListener('click', () => {
        toggleClass(menu, 'header__menu_active');
        toggleClass(menuBtn, 'header__menu-btn_active');
    });

    // Отступы текста в блоге
    setBlogMargin(20);

    // Плавная прокрутка по клику на ссылки в меню в шапке, подвале, на кнопку Заказа консультации на заглавном баннере
    const headerNavMenu = document.querySelector('.header-nav__menu'),
        headerMenuList = document.querySelector('.header__menu-list'),
        footerNavMenu = document.querySelector('.footer__nav-menu'),
        consultBtnBlock = document.querySelector('.hero .content');

    scrollScreen(headerNavMenu);
    scrollScreen(headerMenuList);
    scrollScreen(footerNavMenu);
    scrollScreen(consultBtnBlock);

    // Плавная прокрутка к следующей секции mainSections при клике на кнопки sideTitleBtns в боковой панели (последняя кнопка ведет к шапке сайта)
    const sideTitleBtns = document.querySelectorAll('.side-title__btn'),
        mainSections = document.querySelectorAll('section');

    document.addEventListener('click', event => {
        const target = event.target;

        sideTitleBtns.forEach((btn, index) => {
            if (target === btn) {
                if ( index !== (sideTitleBtns.length - 1) ) {
                    lightScroll(mainSections[index + 1]);
                } else {
                    lightScroll(document.querySelector('header'));
                }
            }
        });
    });   
    
    // Действия при изменении размеров экрана
    window.addEventListener('resize', () => {
        // Удаление активного класса у кнопки выпадающего меню и меню
        const menuBtn = document.querySelector('.header__menu-btn'),
            menu = document.querySelector('.header__menu');
        
        if (menu.classList.contains('header__menu_active')) {
            menu.classList.remove('header__menu_active');
            menuBtn.classList.remove('header__menu-btn_active');
        };
    
        // Отступы текста от заголовка в блоге
        setBlogMargin(20);
    });

});

