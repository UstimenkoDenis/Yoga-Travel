window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function myTab(infoHeader, infoHeaderTab, infoTabContent) {
        let tab = document.querySelectorAll('.' + infoHeaderTab),
            info = document.querySelector('.' + infoHeader),
            tabContent = document.querySelectorAll('.' + infoTabContent);
        
        function hideTabContent(a) {
            for (let i = a; i < tabContent.length; i++) {

                tabContent[i].classList.remove('show'); 
                tabContent[i].classList.add('hide'); 
            }
        }

        hideTabContent(1); 
     
        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) { 
                tabContent[b].classList.remove('hide'); 
                tabContent[b].classList.add('show'); 
            }
        }
        
        info.addEventListener('click', (event) => {
            let target = event.target;

            if (target && target.classList.contains(infoHeaderTab)) {

                for (let i = 0; i < tab.length; i++) {
                    if (target == tab[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });
    }
    
    myTab('info-header', 'info-header-tab', 'info-tabcontent');

    //////////// Timer
    let deadline = '2020-02-29';
   
    function getTimeRemaining(endtime) {       
        let t = Date.parse(endtime) - Date.parse(new Date()), 
            seconds = Math.floor((t / 1000) % 60), 
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
           
        return {
            'total': t,
            'hours': hours,
            "minutes": minutes,
            "seconds": seconds
        };
        
    }

    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock , 1000);
       
        function updateClock(){
                let t = getTimeRemaining(endtime);              
              
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
                   
                    hours.textContent = '00';
                    minutes.textContent = '00';
                    seconds.textContent = '00'; 
                } 
               
        }
    }

    setClock('timer', deadline);

    // Модальное окно
    function modal(button, modalBlock, popupClose) {                                                    
        let btn = document.querySelectorAll(button),
            mdBlock = document.querySelector(modalBlock), 
            closeModal = document.querySelector(popupClose); 
            console.log(btn);
        btn.forEach ((item) => { 
            item.addEventListener('click',() => { 
                mdBlock.style.display = 'block';
                //this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            })

        })
                closeModal.addEventListener('click',() => {
                mdBlock.style.display = 'none';
                //this.classList.remove('more-splash');
                document.body.style.overflow = '';
                })        
    }
    modal('.more', '.overlay', '.popup-close');
    modal('.description-btn', '.overlay', '.popup-close');  

   // Форма       
    function sendForm(formID) {
       
        

        let message = {
            loading: ' Загрузка...',
            success: ' Спасибо! Скоро мы с вами свяжемся!',
            failure: ' Что-то пошло не так...'
        }    
        let statusMessage = document.createElement('div'); 
        statusMessage.classList.add('status');     
        statusMessage.innerHTML = '';

        let contactForm = document.getElementById(formID),
        input = document.getElementsByTagName('input');
        contactForm.appendChild(statusMessage);

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let formData = new FormData(contactForm); 
            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            })
            let json = JSON.stringify(obj);

                function postData(data) {
                    return  new Promise(function (resolve, reject) {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                        
                        request.onreadystatechange = function () { 
                            
                            if (request.readyState < 4) { 
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
                    
                } 
                function clearInput() {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }  
                postData(json)    
                    .then(() => {statusMessage.innerHTML = message.loading;})
                    .then(() => {statusMessage.innerHTML = message.success;})
                    .catch(err => {statusMessage.innerHTML = message.failure + 'Ошибка  ' + err ;})
                    .then(clearInput())       

        })
    }  
    sendForm('main-form');
    sendForm('form');   

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
    
    function plusSlides(n) { 
        showSlides(slideIndex += n);
    }

    function currentSlide(n) { 
        showSlides(slideIndex = n); 
    }
    prev.addEventListener('click', function () {
        plusSlides(-1);
    })
    next.addEventListener('click', function () {
        plusSlides(1);
    })
   
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
