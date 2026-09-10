import './navigation.scss';

// Активний пункт навігації при кліку (делегування кліків)
function initNavigationActive() {
	const nav = document.querySelector('[data-fls-navigation]');
	if (!nav) return;

	nav.addEventListener('click', (e) => {
		const link = e.target.closest('.navigation__link');
		if (!link || !nav.contains(link)) return;
		e.preventDefault();

		nav.querySelectorAll('.navigation__link--active').forEach((el) => el.classList.remove('navigation__link--active'));
		link.classList.add('navigation__link--active');

		// Прокручуємо активний слайд до видимої області слайдера
		const slide = link.closest('.swiper-slide');
		if (slide && slide.scrollIntoView) {
			slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		}
	});
}

initNavigationActive();
