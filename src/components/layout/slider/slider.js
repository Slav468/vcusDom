/*
Документація по роботі у шаблоні:
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Підключення базових стилів
import './slider.scss';
// Повний набір стилів з node_modules
// import 'swiper/css/bundle';

const simpleSlider = [];
const popularSlider = [];

// Ініціалізація слайдерів
function initSimpleSliders() {
	const sliders = document.querySelectorAll('[data-fls-slider="simple"]');
	if (!sliders.length) return;

	sliders.forEach((slider) => {
		const sliderParent = slider.closest('[data-slider-parent]');
		let navigation = {};

		if (sliderParent) {
			navigation = {
				prevEl: sliderParent.querySelector('.swiper-button-prev'),
				nextEl: sliderParent.querySelector('.swiper-button-next'),
			};
		} else {
			navigation = {
				prevEl: slider.querySelector('.swiper-button-prev'),
				nextEl: slider.querySelector('.swiper-button-next'),
			};
		}
		const swiper = new Swiper(slider, {
			modules: [Navigation],
			speed: 500,
			slidesPerView: 'auto',
			spaceBetween: 25,
			navigation: {
				...navigation,
			},
			pagination: {
				el: slider.querySelector('.swiper-pagination'),
				clickable: true,
			},
			on: {
				autoplayTimeLeft(swiper, timeLeft, percentage) {
					let widthPrc = `${(percentage * 100).toFixed()}%`;
					sliderTimer.style.setProperty('--progress', widthPrc);
				},
			},
		});
		simpleSlider.push(swiper);
	});
}
function initPopularSliders() {
	const sliders = document.querySelectorAll('[data-fls-slider="popular"]');
	if (!sliders.length) return;

	sliders.forEach((slider) => {
		const sliderParent = slider.closest('[data-slider-parent]');
		let navigation = {};

		if (sliderParent) {
			navigation = {
				prevEl: sliderParent.querySelector('.swiper-button-prev'),
				nextEl: sliderParent.querySelector('.swiper-button-next'),
			};
		} else {
			navigation = {
				prevEl: slider.querySelector('.swiper-button-prev'),
				nextEl: slider.querySelector('.swiper-button-next'),
			};
		}
		const swiper = new Swiper(slider, {
			modules: [Navigation],
			speed: 500,
			slidesPerView: 'auto',
			spaceBetween: 10,
			navigation: {
				...navigation,
			},
			pagination: {
				el: slider.querySelector('.swiper-pagination'),
				clickable: true,
			},
			on: {
				autoplayTimeLeft(swiper, timeLeft, percentage) {
					let widthPrc = `${(percentage * 100).toFixed()}%`;
					sliderTimer.style.setProperty('--progress', widthPrc);
				},
			},
		});
		popularSlider.push(swiper);
	});
}

export function slidersDestroy(array) {
	array.forEach((slider) => {
		slider.destroy(true, true);
	});
	array = [];
}

document.querySelector('[data-fls-slider]')
	? window.addEventListener('load', (e) => {
			initSimpleSliders();
			initPopularSliders();
		})
	: null;
