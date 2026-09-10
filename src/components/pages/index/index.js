import './index.scss';

// Scroll-triggered visibility for sections on index
function initIndexScrollAnimations() {
	const sections = document.querySelectorAll('[data-fls-section]');

	if (!('IntersectionObserver' in window)) {
		sections.forEach((section) => section.classList.add('visible'));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{
			rootMargin: '0px 0px -60px 0px',
			threshold: 0.1,
		},
	);

	sections.forEach((section) => observer.observe(section));
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initIndexScrollAnimations, {
		once: true,
	});
} else {
	initIndexScrollAnimations();
}
