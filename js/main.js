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

// Функция плавной прокрутки к элементу element
const lightScroll = (element) => {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

// Функция для прокрутки экрана к секции по клику на ссылки в меню menu
const scrollScreen = menu => {
    const menuLinks = menu.querySelectorAll('a');

    menu.addEventListener('click', event => {
        event.preventDefault();

        const target = event.target;

        menuLinks.forEach(link => {
            if (target === link) {
                // Закрытие выпадающего меню по клику на любую из его ссылок
                
                // Вариант последовательных действий: сначала закрывается меню (задержка обусловлена наличием transition: .1s), потом происходит переход
                // const getMoveScreen = () => {
                //     return new Promise(resolve => {
                //         if (menu.classList.contains('header__menu-list')) {
                //             const menu = document.querySelector('.header__menu'),
                //                 menuBtn = document.querySelector('.header__menu-btn');
        
                //             if (menu.classList.contains('header__menu_active')) {
                //                 toggleClass(menu, 'header__menu_active');
                //                 toggleClass(menuBtn, 'header__menu-btn_active');
                //             };
                //         };
                //         resolve();
                //     });
                // };

                // const waitTimeout = (timeout) => {
                //     return new Promise(resolve => {
                //         setTimeout(resolve, timeout);
                //     });
                // };

                // getMoveScreen()
                //     .then(() => {
                //         waitTimeout(1000)
                //             .then(() => {
                //                 lightScroll(document.querySelector(link.getAttribute('href')));
                //             });  
                //     });
                    
                if (menu.classList.contains('header__menu-list')) {
                    const menu = document.querySelector('.header__menu'),
                        menuBtn = document.querySelector('.header__menu-btn');

                    if (menu.classList.contains('header__menu_active')) {
                        toggleClass(menu, 'header__menu_active');
                        toggleClass(menuBtn, 'header__menu-btn_active');
                    };
                };
                
                lightScroll(document.querySelector(link.getAttribute('href')));
            };
        });
    });
};

// Функция установки масок masks для формы form на основании библиотеки masksLibrary
const masksLibrary = {
    string: (value, maskValue, errorMessage) => {
            const error = errorMessage || "only letters, '-' and ' '"
            if ( !/[^A-Za-zА-Яа-яЁё\- ]/.test(value) ) {
                return [true, '']
            } else return [false, error]
        },
    length: (value, maskValue, errorMessage) => {
            let min = [true, ''],
                max = [true, ''];

            const error = (typeof errorMessage === 'string') ? errorMessage || 'need another length' : {
                    min: errorMessage.min || 'too short',
                    max: errorMessage.max || 'too long'
                },
                errorMin = error.min || error,
                errorMax = error.max || error;

            if (maskValue.min) {
                min = (`${value}`.length >= +maskValue.min) ? [true, ''] : [false, errorMin];
            } else {
                min = [true, '']
            };

            if (maskValue.max) {
                max = (`${value}`.length <= +maskValue.max) ? [true, ''] : [false, errorMax];
            } else {
                max = [true, '']
            };

            if (maskValue.eq) {
                min = (`${value}`.length >= +maskValue.eq) ? [true, ''] : [false, errorMin];
                max = (`${value}`.length <= +maskValue.eq) ? [true, ''] : [false, errorMax];
            };

            if (!min[0]) {
                return min
            } else if (!max[0]) {
                return max
            } else {
                return [true, '']
            }
        }
};

const viewMaskedField = (field, className, message) => {
    toggleClass(field, className);

    const oldMessage = field.querySelector('.error-message');
    if (oldMessage) {
        field.removeChild(oldMessage);
    };

    if (message) {
        const mes = document.createElement('div');
        mes.classList.add('error-message');
        mes.innerHTML = `${message}`;
        field.appendChild(mes);
    };
};

const errorMask = (field, errorClass, successClass, errorMessage) => {
    field.classList.remove(errorClass);
    field.classList.remove(successClass);
    viewMaskedField(field, errorClass, errorMessage)
};

const successMask = (field, errorClass, successClass) => {
    field.classList.remove(errorClass);
    field.classList.remove(successClass);
    viewMaskedField(field, successClass, null)
};

// Функция проверки объекта на пустоту
const isEmptyObj = (obj) => {
    for (let key in obj)
    {
        return false;
    }
    return true;
};

const setMasks = (form, masks, classes) => {
    let fields = form.querySelectorAll('.form__group'),
        errors = masks.errorMessages ? masks.errorMessages : {};

    const {errorClass, successClass} = classes;

    form.addEventListener('change', event => {
        const target = event.target;

        for (let i = 0; i < fields.length; i++) {
            const input = fields[i].querySelector('input'),
                maskName = input.getAttribute('name'),
                mask = masks[maskName];
                
            if (!errors.hasOwnProperty(maskName)) {
                errors[maskName] = {}
            };

            if (target === input) {
                if (mask && !isEmptyObj(mask)) {
                    for (let key in mask) {
                        if (!errors[maskName].hasOwnProperty(key)) {
                            errors[maskName][key] = ''
                        };

                        const ans = masksLibrary[key](input.value, mask[key], errors[maskName][key]);

                        if ( !ans[0] ) {
                            errorMask(fields[i], errorClass, successClass, ans[1]);
                            break;
                        };
                        successMask(fields[i], errorClass, successClass);
                    }
                } else {
                    successMask(fields[i], errorClass, successClass);
                }
                break;
            };
        };
    });
};


// Сервис

// Адрес api (json-server)
const _apiBase = 'http://localhost:3000';
// Контент модального окна в зависимости от состояния выполнения запроса
const statusMessages = {
    loading: `
        <div class="spinner">
            <div class="lds-spin"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
        </div>
    `,
    success: `
        <h4 class="modal__title">Спасибо</h4>
        <p class="modal__text">Ваша заявка отправлена</p>
        <button class="btn btn__primary modal__btn">Закрыть</button>
    `,
    error: `
        <img class="modal__img" src="./img/error.png" alt="error">
        <p class="modal__text">Что-то пошло не так. Повторите попытку позже</p>
        <button class="btn btn__primary modal__btn">Закрыть</button>
    `
};

// Функция отображения результата отправки формы
const getStatusForm = (modal, modalContent, content) => {
    modal.classList.add('modal__active');
    modalContent.innerHTML = '';
    document.body.style.overflow = 'hidden';

    const status = document.createElement('div');

    status.innerHTML = `
        ${content}
    `;
    status.classList.add('modal__message');
    modalContent.appendChild(status);
};

// Функция закрытия модального окна
const closeModal = () => {
    const modalBtn = document.querySelector('.modal__btn');

    modalBtn.addEventListener('click', () => {
        toggleClass(modal, 'modal__active');
        document.body.style.overflow = '';
    })
};

// Отображение результатов отправки формы
const modal = document.querySelector('.modal'),
    modalContent = document.querySelector('.modal__content');

// Функция загрузки при отправке формы
const getLoading = () => getStatusForm(modal, modalContent, statusMessages.loading);

// Функция успешной отправки формы
const getSuccess = () => {
    getStatusForm(modal, modalContent, statusMessages.success);
    closeModal();
};

// Функция ошибки при отправке формы
const getError = () => {
    getStatusForm(modal, modalContent, statusMessages.error)
    closeModal();
};

// Функция отправки POST запроса
const postData = async (url, data) => {
    getLoading();

    try {
        const res = await fetch(`${_apiBase + url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            getSuccess();
        }
    } catch {
        getError();
        throw new Error(`Could not fetch ${_apiBase + url}`);
    }
};

// Функция очистки полей для ввода при отправке формы
const clearInputs = (form) => {
    let inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
        input.value = '';
    })
};

// Функция отправки формы
const sendForm = (form, url) => {
    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form),
            obj = {};

        formData.forEach((value, key) => {
            obj[key] = value;
        });

        postData(url, obj);

        clearInputs(form);
    });
};


// Работа скриптов при загрузке элементов страницы
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
    
    // Установка масок masks для полей ввода форм
    const formConsult = document.querySelector('.consult__form'),
        formContacts = document.querySelector('.contacts__form');
    const masks = {
        name: {
            string: true,
            length: {
                min: 2,
                max: 20
                }
            },
        phone: {},
        // email: {},
        errorMessages : {
            name: {
                string: 'Имя должно состоять из букв и символов "-" и " "',
                length: {
                    min: 'Слишком короткое имя',
                    max: 'Слишком длинное имя'
                    }
                }
            }
    };
    const classes = {
        errorClass: 'form__group_error',
        successClass: 'form__group_success'
    }

    setMasks(formConsult, masks, classes);
    setMasks(formContacts, masks, classes)
    
    // Отправка форм из блоков Консультация и Контакты на url
    const url = '/contacts';

    sendForm(formConsult, url);
    sendForm(formContacts, url);

    // Действия при изменении размеров экрана
    window.addEventListener('resize', () => {
        // Удаление активного класса у кнопки выпадающего меню и меню
        const menuBtn = document.querySelector('.header__menu-btn'),
            menu = document.querySelector('.header__menu');
        
        if (menu.classList.contains('header__menu_active')) {
            toggleClass(menu, 'header__menu_active');
            toggleClass(menuBtn, 'header__menu-btn_active');
        };
    
        // Отступы текста от заголовка в блоге
        setBlogMargin(20);
    });

});