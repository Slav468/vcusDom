import './header.scss'

const HEADER_SCROLLED_CLASS = 'header--scrolled';
const SCROLL_THRESHOLD = 8;

function initHeaderScrolled() {
	const header = document.querySelector('[data-fls-header]');
	if (!header) return;

	const toggleScrolled = () => {
		header.classList.toggle(HEADER_SCROLLED_CLASS, window.scrollY > SCROLL_THRESHOLD);
	};

	toggleScrolled();

	window.addEventListener('scroll', toggleScrolled, { passive: true });
}

initHeaderScrolled();