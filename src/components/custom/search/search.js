import './search.scss';

// Інтерактив пошуку: shake при порожньому сабміті, clear-кнопка
function initSearch() {
	const block = document.querySelector('[data-fls-search]');
	if (!block) return;

	const form = block.querySelector('form');
	const input = block.querySelector('[data-fls-search-input]');
	if (!form || !input) return;

	// Shake при спробі відправки порожнього запиту
	form.addEventListener('submit', (e) => {
		if (!input.value.trim()) {
			e.preventDefault();
			block.classList.remove('search--error');
			// Перезапуск анімації
			void block.offsetWidth;
			block.classList.add('search--error');
			input.focus();
		}
	});

	input.addEventListener('input', () => {
		if (input.value.trim()) {
			block.classList.remove('search--error');
		}
	});

	block.addEventListener('animationend', (e) => {
		if (e.animationName === 'search-shake') {
			block.classList.remove('search--error');
		}
	});
}

initSearch();
