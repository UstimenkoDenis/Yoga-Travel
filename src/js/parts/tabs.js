function tabs(infoHeader, infoHeaderTab, infoTabContent) {

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

module.exports = tabs; // экспортируем наш модуль