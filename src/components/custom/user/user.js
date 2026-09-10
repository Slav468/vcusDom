import './user.scss';

// Лічильник обраного: клік по серцю + / − бейдж, pop-анімація перезапускається
function initUserFavorites() {
	const block = document.querySelector('[data-fls-user]');
	if (!block) return;

	const items = block.querySelectorAll('.user__item');
	if (!items.length) return;

	// Шукаємо картку з іконкою серця
	let favItem = null;
	let favCount = null;
	items.forEach((item) => {
		const use = item.querySelector('use');
		const href = use ? (use.getAttribute('href') || use.getAttribute('xlink:href') || '') : '';
		if (href.includes('heart')) {
			favItem = item;
			favCount = item.querySelector('.user__count');
		}
	});
	if (!favItem) return;

	let count = favCount ? parseInt(favCount.textContent.trim(), 10) || 0 : 0;

	const render = () => {
		if (!favCount) return;
		favCount.textContent = String(count);
		favCount.classList.toggle('active', count > 0);
		// Перезапуск pop-анімації
		favCount.style.animation = 'none';
		void favCount.offsetWidth;
		favCount.style.animation = '';
	};

	const link = favItem.querySelector('.user__link');
	if (link) {
		link.setAttribute('role', 'button');
		link.setAttribute('aria-pressed', 'false');
		link.setAttribute('tabindex', '0');
		link.setAttribute('aria-label', 'Додати в обране');

		const toggle = (e) => {
			e.preventDefault();
			count = count > 0 ? 0 : 1;
			link.setAttribute('aria-pressed', count > 0 ? 'true' : 'false');
			render();
		};

		link.addEventListener('click', toggle);
		link.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				toggle(e);
			}
		});
	}

	render();
}

initUserFavorites();
