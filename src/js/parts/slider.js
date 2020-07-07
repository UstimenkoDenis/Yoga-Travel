  // Slider
function slider() {

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
}
  
module.exports = slider;