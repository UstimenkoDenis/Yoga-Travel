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

module.exports = sendForm;