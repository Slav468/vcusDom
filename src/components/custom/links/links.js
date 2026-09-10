
import { addTouchAttr, addLoadedAttr, isMobile, FLS } from "@js/common/functions.js"

import "./links.scss"

// Фільтрація списку брендів за буквою (делегування кліків)
function initLinksFilter() {
	const block = document.querySelector('[data-fls-links]');
	if (!block) return;

	const items = Array.from(block.querySelectorAll('.links-system__item'));
	const title = block.querySelector('.links-system__title h2');
	const list = block.querySelector('.links-system__list');
	if (!items.length || !title || !list) return;

	// Зберігаємо початковий список (буква «А» з розмітки)
	const initialLetter = title.textContent.trim();
	const initialLinks = Array.from(list.querySelectorAll('li')).map((li) => li.innerHTML);

	// Генеруємо заглушку списку для інших букв
	const makeLinks = (letter) => {
		return initialLinks.map(
			(html) => `<li>${html.replace(/^([^<]*)/, `${letter}$1`)}</li>`
		).join('');
	};

	block.addEventListener('click', (e) => {
		const item = e.target.closest('.links-system__item');
		if (!item || !block.contains(item)) return;
		e.preventDefault();

		if (item.classList.contains('active')) return;
		items.forEach((el) => el.classList.remove('active'));
		item.classList.add('active');

		const link = item.querySelector('a');
		const letter = link ? link.textContent.trim() : '';
		title.textContent = letter;

		// Плавна зміна списку: згасання → заміна → поява
		list.classList.add('links-system__list--fade');
		setTimeout(() => {
			list.innerHTML = initialLetter === letter
				? initialLinks.map((html) => `<li>${html}</li>`).join('')
				: makeLinks(letter);
			list.classList.remove('links-system__list--fade');
		}, 150);
	});
}

initLinksFilter();