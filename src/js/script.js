// Заменил все callback функции стрелочными 

// require('es6-promise').polyfill(); // вставили  - теперь когда webpack будет собирать всю модульную структуру

// он также подключит и полифил для промисов (эта строка не нужна при 2 способе подключения )

require('nodelist-foreach-polyfill'); // подключаем foreach полифил
require('formdata-polyfill')



window.addEventListener('DOMContentLoaded', function () {

    'use strict'; // переходим в строгий режим

    let calc = require('./parts/calc.js'),
        sendForm = require('./parts/form.js'),
        modal = require('./parts/modal.js'),
        slider = require('./parts/slider.js'),
        tabs = require('./parts/tabs.js'),
        timer = require('./parts/timer.js');
    

    // Вызываем импортированные функции
    calc();
    tabs('info-header', 'info-header-tab', 'info-tabcontent');
    slider();
    timer('timer', '2020-03-29');
   
    modal('.more', '.overlay', '.popup-close'); //вызываем функцию для кнопок с классом more
    modal('.description-btn', '.overlay', '.popup-close'); //вызываем функцию для кнопок с классом description-btn
    
    sendForm('main-form'); //..подключаю отправку формы к модальному окну
    sendForm('form'); // подключаю отправку формы к контактной форме
    
    
 
});
// заходим на сайт  https://www.npmjs.com/package/es6-promise
// установим promisы
// npm i es6-promise --save-dev - устанавливаем (--save-dev для того чтобы записался наш пакет в package.json)
// 
// теперь нам необходимо его подключить 
// вставляем в script.js  -  require('es6-promise').polyfill(); перед всем кодом
// чтобы запустить webpack в terminal пишем npx webpack
//  - это был способ подключить полифил в ручную 

// 2й способ подключить плагин полифил
// babel-plugin-es6-promise - плагин который включается вовнутрь babel loader и также подключает es6 промис полифил

// npm i babel-plugin-es6-promise --save-dev

// в bwebpack.config.js добавляем наш плагин - строка plugins: ["es6-promise"] 






// теперь подключим полифил для метода foreach 

// 1й способ помещаем в наш script.js этот код

// if ('NodeList' in window && !NodeList.prototype.forEach) {
//     console.info('polyfill for IE11');
//     NodeList.prototype.forEach = function (callBack, thisArg) {
//         thisArg = thisArg || window;
//         for (var i = 0; i< this.length; i++){
//             callBack.call(thisArg, this[i], i, this);
//         }
//     };


// } если подключаем полифил по 2 способу то заремарим

// 2й способ - также этот полифил можно подключить при помощи обычного npm пакета npm i nodelist-foreach-polyfill --save-dev
// после этого нужно его импортировать в наш проект в файле script.js в начале пишем require('nodelist-foreach-polyfill');



// Подключение FormData polyfill 
// конструкцию formdata мы использовали чтобы правильно и красиво собрать все данные с формы и отправить
// пишем 
// npm i formdata-polyfill --save-dev
// после этого нужно его импортировать в наш проект в файле script.js в начале пишем require('formdata-polyfill')
// Теперь когда мы установили все поли филы мы можем сохранить и запустить npx webpack 

// Теперь наш код будет правильно работать в старых браузерах
