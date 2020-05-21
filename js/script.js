// Заменил все callback функции стрелочными 

window.addEventListener('DOMContentLoaded', function () {

    'use strict'; // переходим в строгий режим


    function myTab(infoHeader, infoHeaderTab, infoTabContent) {

        let tab = document.querySelectorAll('.' + infoHeaderTab),
            info = document.querySelector('.' + infoHeader),
            tabContent = document.querySelectorAll('.' + infoTabContent);

        // функция которая будет скрывать наши табы
        function hideTabContent(a) {
            for (let i = a; i < tabContent.length; i++) {

                tabContent[i].classList.remove('show'); // удаляем с каждого таба класс show
                tabContent[i].classList.add('hide'); // и полностью скроем со страницы

            }
        }

        hideTabContent(1); // скроются все табконтенты кроме первого

        // функция которая будет показывать табконтент
        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) { // если содежит класс hide
                tabContent[b].classList.remove('hide'); // удаляем с каждого таба класс hide
                tabContent[b].classList.add('show'); // показываем
            }
        }

        // ставим обработчик событий на info 
        info.addEventListener('click', (event) => {
            let target = event.target;

            if (target && target.classList.contains(infoHeaderTab)) {

                for (let i = 0; i < tab.length; i++) {
                    if (target == tab[i]) {
                        hideTabContent(0); // скрываем все табы
                        showTabContent(i); // показываем нужный таб
                        break;
                    }
                }
            }
        });
    }
    // Вызов нашей функции
    myTab('info-header', 'info-header-tab', 'info-tabcontent');







    //////////// Timer

    let deadline = '2020-02-29';
    // Узнаем промежуток времени который лежит между сейчас и deadline

    function getTimeRemaining(endtime) {
        // Любую дату можно превратить в количество миллисекунд которые прошли с первого января 1970 г методом parse
        let t = Date.parse(endtime) - Date.parse(new Date()), // в t - лежит количество миллисекунд которые лежат в промежутке
            // теперь мы располагаем количеством миллисикунд, но нам надо получить три параметра часы минуты секунды
            seconds = Math.floor((t / 1000) % 60), // получим  целое число методом floor  // делим на 1000 получаем из миллисекунд секунды
        // %60 получим остаток от деления секунд на 60
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
            // days = Math.floor((t/(1000*60*60*24)))
//..Здесь мы создаем объект и возвращаем его
        return {
            'total': t,
            'hours': hours,
            "minutes": minutes,
            "seconds": seconds
        };
        
    }
    // напишем функцию которая превращает нашу статичную верстку в динамичную

    // создадим функцию которая создает различные переменные и привязывает к ним элементы страницы
    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock , 1000);

        // следующая функция сначала получает разницу между временем gettimeRemaining, которая возвращает объект с данными 
        // для нашего таймера и записываем все эти данные в верстку

        function updateClock(){
                let t = getTimeRemaining(endtime);
              
               // добавляем нолик если число от 0 до 9
                if (t.hours >= 0 && t.hours <=9){
                    hours.textContent = '0' + t.hours;
                } else hours.textContent = t.hours;
                if (t.minutes >=0 && t.minutes <=9){
                    minutes.textContent = '0' + t.minutes;
                } else minutes.textContent = t.minutes;
                if (t.seconds >= 0 && t.seconds <= 9){
                    seconds.textContent = '0' + t.seconds; 
                } else seconds.textContent = t.seconds;

                if (t.total <= 0 ){

                    clearInterval(timeInterval);
                    // выставляем нули если deadline был раньше чем сейчас
                    hours.textContent = '00';
                    minutes.textContent = '00';
                    seconds.textContent = '00'; 
                } 
               
        }
    }

    setClock('timer', deadline);





    // Модальное окно


    function modal(button, modalBlock, popupClose) { // кнопка на которую будет наложен обработчик события, класс модального окна, 
                                                    //класс блока с крестиком закрывающего модальное окно
        let btn = document.querySelectorAll(button),
            mdBlock = document.querySelector(modalBlock), //наше модальное окно
            closeModal = document.querySelector(popupClose); // окно с крестиком
            console.log(btn);
        btn.forEach ((item) => { // перебираем все элементы этого класса

            item.addEventListener('click',() => { // ставим обработчик на каждый элемент
                mdBlock.style.display = 'block';
                //this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            })

        })
                closeModal.addEventListener('click',() => { // обработчик на закрывающий блок он всегда один в данный момент
                mdBlock.style.display = 'none';
                //this.classList.remove('more-splash');
                document.body.style.overflow = '';
                })
        
        
    }
    modal('.more', '.overlay', '.popup-close'); //вызываем функцию для кнопок с классом more
    modal('.description-btn', '.overlay', '.popup-close'); //вызываем функцию для кнопок с классом description-btn
    
  

   // Форма 
   // Первым делом создадим объект в котором будут содержаться различные состояния нашего запроса
    
   
    // делаю функцию и Вставляю промис

   
    function sendForm(formID) {
       
        

        let message = {
            loading: ' Загрузка...', // эта строка будет показываться пользователю пока наш запрос еще не обработался
            success: ' Спасибо! Скоро мы с вами свяжемся!',
            failure: ' Что-то пошло не так...'
        }
        
    
        let statusMessage = document.createElement('div'); // создаем новый элемент
        statusMessage.classList.add('status'); // стилизуем его добавляя ему класс
    
        statusMessage.innerHTML = '';

        let contactForm = document.getElementById(formID),
        input = document.getElementsByTagName('input');
        contactForm.appendChild(statusMessage);

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let formData = new FormData(contactForm); // переносим данные из формы в объект
            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            })
            let json = JSON.stringify(obj); // формируем из нашего объекта JSON объект 

                function postData(data) {
                    return  new Promise(function (resolve, reject) {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                        
                        request.onreadystatechange = function () { 
                            
                            if (request.readyState < 4) { //..пока еще грузится
                                //resolve();
                               
                            } else if (request.readyState === 4) {
                                if (request.status == 200 && request.status < 300) {

                                    resolve();
                                } else {
                                      reject(request.status);

                                 }
                            }
                        }
                        request.send(data);   
                    });
                    
                } // end postData

                function clearInput() {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }  
                postData(json)    
                    .then(() => {statusMessage.innerHTML = message.loading;})
                    .then(() => {statusMessage.innerHTML = message.success;})
                    .catch(err => {statusMessage.innerHTML = message.failure + 'Ошибка  ' + err ;})
                    .then(clearInput())        // выполнится в любом случае

        })

        

    }  
    sendForm('main-form'); //..подключаю отправку формы к модальному окну
    sendForm('form'); // подключаю отправку формы к контактной форме
               
    

    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

        showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');
    }
    
    function plusSlides(n) { // изменяет наш slideIndex и сразу вызывает showSlides()
        showSlides(slideIndex += n);
    }

    function currentSlide(n) { //функция которая будет определять текущий слайд и устанавливать его
        showSlides(slideIndex = n); // когда  мы кликаем на 4 точку n будет равняться 4 и наш slideIndex = 4
    }
    prev.addEventListener('click', function () {
        plusSlides(-1);
    })
    next.addEventListener('click', function () {
        plusSlides(1);
    })

    // Теперь сделаем чтобы можно было нажимать на кружки, применим делегирование
    dotsWrap.addEventListener('click', function(event) {
        for(let i=0; i < dots.length + 1; i++) {
            if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }

    })


     // Калькулятор

     let persons = document.querySelectorAll('.counter-block-input')[0],
         restDays = document.querySelectorAll('.counter-block-input')[1],
         place = document.getElementById('select'),
         totalValue = document.getElementById('total'),
         personsSum = 0,
         daysSum = 0,
         total = 0;
         totalValue.innerHTML = 0;

         persons.addEventListener('change', function() {
              // здесь нельзя использовать стрелочные функции тк будем использовать контекст вызова this 
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
         });

         restDays.addEventListener('change', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;
            if (persons.value == '' || restDays.value == '' ) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
         });
         place.addEventListener('change', function () {
             if(restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
             } else {
                 let a = total;
                 totalValue.innerHTML = a * this.options[this.selectedIndex].value;
             }
         })
});
