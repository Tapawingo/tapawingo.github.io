/**
 * Continuous scroll-linked reveal plus a subtle parallax drift on the
 * plasma background. Read-only: it never calls scrollTo or preventDefault,
 * so real scrolling stays native. Opacity/offset are a direct function of
 * scroll position rather than a one-shot toggle, so content eases back out
 * if you scroll past it in either direction.
 */
export function initScrollReveal(): void {
	const items = Array.from(
		document.querySelectorAll<HTMLElement>('[data-reveal]'),
	);
	const canvas = document.getElementById('plasma-canvas');
	if (!items.length && !canvas) return;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		items.forEach((el) => {
			el.style.opacity = '1';
			el.style.transform = 'none';
		});
		return;
	}

	const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

	let ticking = false;

	const apply = () => {
		ticking = false;
		const vh = window.innerHeight || 1;

		if (canvas) {
			/* Capped so the drift never scrolls far enough to expose a bare edge
			 * of the viewport-sized canvas. */
			canvas.style.transform = `translate3d(0, ${Math.min(60, window.scrollY * 0.06)}px, 0)`;
		}

		for (const el of items) {
			const rect = el.getBoundingClientRect();
			const progress = clamp01((vh - rect.top) / (vh * 0.65));
			el.style.opacity = String(progress);
			/* Custom property, not `transform` directly, so it composes with the
			 * hover-lift offset (see .lift in global.css) instead of clobbering it. */
			el.style.setProperty('--reveal-y', `${(1 - progress) * 24}px`);
		}
	};

	const onScroll = () => {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(apply);
		}
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	apply();
}

/** Highlights the nav link matching whichever section is currently in view. */
export function initActiveNav(): void {
	/* #top (the hero) isn't a .section, but it still needs to be observed
	 * so the nav clears back to nothing highlighted while it's in view. */
	const sections = document.querySelectorAll<HTMLElement>('.section[id], #top');
	const navLinks =
		document.querySelectorAll<HTMLAnchorElement>('.nav a[href*="#"]');
	if (!sections.length || !navLinks.length) return;

	/* Compare via the resolved `.href` property's hash, not the raw attribute,
	 * so this works whether a link is written as "#about" or "/#about". */
	const linkFor = (id: string) =>
		Array.from(navLinks).find((a) => new URL(a.href).hash === `#${id}`);

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const link = linkFor(entry.target.id);
				if (!link) continue;
				navLinks.forEach((a) => a.classList.remove('active'));
				link.classList.add('active');
			}
		},
		{ rootMargin: '-40% 0px -55% 0px', threshold: 0 },
	);

	sections.forEach((s) => io.observe(s));
}
