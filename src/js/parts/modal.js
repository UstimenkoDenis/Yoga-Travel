function modal(button, modalBlock, popupClose) { // кнопка на которую будет наложен обработчик события, класс модального окна, 
    //класс блока с крестиком закрывающего модальное окно
    let btn = document.querySelectorAll(button),
        mdBlock = document.querySelector(modalBlock), //наше модальное окно
        closeModal = document.querySelector(popupClose); // окно с крестиком
    console.log(btn);
    btn.forEach((item) => { // перебираем все элементы этого класса

        item.addEventListener('click', () => { // ставим обработчик на каждый элемент
            mdBlock.style.display = 'block';
            //this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        })

    })
    closeModal.addEventListener('click', () => { // обработчик на закрывающий блок он всегда один в данный момент
        mdBlock.style.display = 'none';
        //this.classList.remove('more-splash');
        document.body.style.overflow = '';
    })


}

module.exports = modal;