let leftSwiper = null;
let rightSwiper = null;
function initSideSwiper() {
    var leftSide = document.querySelector('.todays-offer-side.left');
    var rightSide = document.querySelector('.todays-offer-side.right');

    // Khi reset: xóa slider, show lại sản phẩm gốc
    if (leftSide && leftSide.classList.contains('swiper-initialized')) {
        var slider = leftSide.querySelector('.todays-offer-side-slider');
        if (slider) slider.remove();
        leftSide.classList.remove('swiper-initialized');
        leftSide.querySelectorAll('.todays-offer-side-item').forEach(function (item) {
            item.style.display = '';
        });
    }
    if (rightSide && rightSide.classList.contains('swiper-initialized')) {
        var slider = rightSide.querySelector('.todays-offer-side-slider');
        if (slider) slider.remove();
        rightSide.classList.remove('swiper-initialized');
        rightSide.querySelectorAll('.todays-offer-side-item').forEach(function (item) {
            item.style.display = '';
        });
    }

    // Tablet: 1 cột 2 hàng (grid)
    if (window.innerWidth <= 991 && window.innerWidth >= 768) {
        // Left
        if (leftSide && !leftSide.classList.contains('swiper-initialized')) {
            var leftProducts = leftSide.querySelectorAll('.todays-offer-side-item');
            // Ẩn sản phẩm gốc
            leftProducts.forEach(function (item) { item.style.display = 'none'; });
            var leftSlider = document.createElement('div');
            leftSlider.className = 'swiper todays-offer-side-slider';
            var wrapper = document.createElement('div');
            wrapper.className = 'swiper-wrapper';
            for (var i = 0; i < leftProducts.length; i++) {
                var slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.appendChild(leftProducts[i].cloneNode(true));
                wrapper.appendChild(slide);
            }
            leftSlider.appendChild(wrapper);
            leftSide.appendChild(leftSlider);
            leftSide.classList.add('swiper-initialized');
            new Swiper(leftSlider, {
                direction: 'horizontal',
                slidesPerView: 1,
                spaceBetween: 8,
                grid: { rows: 2, fill: 'row' },
                navigation: true,
            });
        }
        // Right
        if (rightSide && !rightSide.classList.contains('swiper-initialized')) {
            var rightProducts = rightSide.querySelectorAll('.todays-offer-side-item');
            rightProducts.forEach(function (item) { item.style.display = 'none'; });
            var rightSlider = document.createElement('div');
            rightSlider.className = 'swiper todays-offer-side-slider';
            var wrapper = document.createElement('div');
            wrapper.className = 'swiper-wrapper';
            for (var i = 0; i < rightProducts.length; i++) {
                var slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.appendChild(rightProducts[i].cloneNode(true));
                wrapper.appendChild(slide);
            }
            rightSlider.appendChild(wrapper);
            rightSide.appendChild(rightSlider);
            rightSide.classList.add('swiper-initialized');
            new Swiper(rightSlider, {
                direction: 'horizontal',
                slidesPerView: 1,
                spaceBetween: 8,
                grid: { rows: 2, fill: 'row' },
                navigation: true,
            });
        }
    } else if (window.innerWidth <= 767 && window.innerWidth >= 577) {
        // Mobile lớn: 2 sản phẩm/slide
        if (leftSide && !leftSide.classList.contains('swiper-initialized')) {
            var leftProducts = leftSide.querySelectorAll('.todays-offer-side-item');
            leftProducts.forEach(function (item) { item.style.display = 'none'; });
            var leftSlider = document.createElement('div');
            leftSlider.className = 'swiper todays-offer-side-slider';
            var wrapper = document.createElement('div');
            wrapper.className = 'swiper-wrapper';
            for (var i = 0; i < leftProducts.length; i += 2) {
                var slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.appendChild(leftProducts[i].cloneNode(true));
                if (leftProducts[i + 1]) {
                    slide.appendChild(leftProducts[i + 1].cloneNode(true));
                }
                wrapper.appendChild(slide);
            }
            leftSlider.appendChild(wrapper);
            leftSide.appendChild(leftSlider);
            leftSide.classList.add('swiper-initialized');
            new Swiper(leftSlider, {
                direction: 'horizontal',
                slidesPerView: 1,
                spaceBetween: 8,
                navigation: true,
            });
        }
        if (rightSide && !rightSide.classList.contains('swiper-initialized')) {
            var rightProducts = rightSide.querySelectorAll('.todays-offer-side-item');
            rightProducts.forEach(function (item) { item.style.display = 'none'; });
            var rightSlider = document.createElement('div');
            rightSlider.className = 'swiper todays-offer-side-slider';
            var wrapper2 = document.createElement('div');
            wrapper2.className = 'swiper-wrapper';
            for (var j = 0; j < rightProducts.length; j += 2) {
                var slide2 = document.createElement('div');
                slide2.className = 'swiper-slide';
                slide2.appendChild(rightProducts[j].cloneNode(true));
                if (rightProducts[j + 1]) {
                    slide2.appendChild(rightProducts[j + 1].cloneNode(true));
                }
                wrapper2.appendChild(slide2);
            }
            rightSlider.appendChild(wrapper2);
            rightSide.appendChild(rightSlider);
            rightSide.classList.add('swiper-initialized');
            new Swiper(rightSlider, {
                direction: 'horizontal',
                slidesPerView: 1,
                spaceBetween: 8,
                navigation: true,
            });
        }
    } else if (window.innerWidth <= 576) {
        // Mobile nhỏ: mỗi sản phẩm là 1 slide
        if (leftSide && !leftSide.classList.contains('swiper-initialized')) {
            var leftProducts = leftSide.querySelectorAll('.todays-offer-side-item');
            leftProducts.forEach(function (item) { item.style.display = 'none'; });
            var leftSlider = document.createElement('div');
            leftSlider.className = 'swiper todays-offer-side-slider';
            var wrapper = document.createElement('div');
            wrapper.className = 'swiper-wrapper';
            for (var i = 0; i < leftProducts.length; i++) {
                var slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.appendChild(leftProducts[i].cloneNode(true));
                wrapper.appendChild(slide);
            }
            leftSlider.appendChild(wrapper);
            leftSide.appendChild(leftSlider);
            leftSide.classList.add('swiper-initialized');
            new Swiper(leftSlider, {
                direction: 'horizontal',
                slidesPerView: 1,
                spaceBetween: 8,
                navigation: true,
            });
        }
        if (rightSide && !rightSide.classList.contains('swiper-initialized')) {
            var rightProducts = rightSide.querySelectorAll('.todays-offer-side-item');
            rightProducts.forEach(function (item) { item.style.display = 'none'; });
            var rightSlider = document.createElement('div');
            rightSlider.className = 'swiper todays-offer-side-slider';
            var wrapper2 = document.createElement('div');
            wrapper2.className = 'swiper-wrapper';
            for (var j = 0; j < rightProducts.length; j++) {
                var slide2 = document.createElement('div');
                slide2.className = 'swiper-slide';
                slide2.appendChild(rightProducts[j].cloneNode(true));
                wrapper2.appendChild(slide2);
            }
            rightSlider.appendChild(wrapper2);
            rightSide.appendChild(rightSlider);
            rightSide.classList.add('swiper-initialized');
            new Swiper(rightSlider, {
                direction: 'horizontal',
                slidesPerView: 1,
                spaceBetween: 8,
                navigation: true,
            });
        }
    }
}
window.addEventListener('DOMContentLoaded', initSideSwiper);
window.addEventListener('resize', function () {
    setTimeout(initSideSwiper, 200);
});