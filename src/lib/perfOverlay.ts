/**
 * Dev-only FPS / frame-time / long-task overlay, for narrowing down where
 * jank is coming from. Never shipped to production (see PerfOverlay.astro,
 * gated on import.meta.env.DEV).
 */
export function initPerfOverlay(): void {
	const el = document.createElement('div');
	el.id = 'perf-overlay';
	el.style.cssText = `
		position: fixed;
		bottom: 12px;
		right: 12px;
		z-index: 99999;
		font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
		font-size: 11px;
		line-height: 1.6;
		color: #baffcf;
		background: rgba(4, 10, 7, 0.88);
		border: 1px solid rgba(61, 220, 132, 0.4);
		border-radius: 4px;
		padding: 6px 10px;
		pointer-events: none;
		white-space: pre;
		backdrop-filter: blur(4px);
	`;
	document.body.appendChild(el);

	let framesSinceUpdate = 0;
	let lastFpsUpdate = performance.now();
	let fps = 0;
	let lastFrameTime = performance.now();
	let frameTimeMs = 0;
	let longTaskCount = 0;
	let longTaskTotalMs = 0;
	let longTaskSupported = false;

	if ('PerformanceObserver' in window) {
		try {
			const po = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					longTaskCount++;
					longTaskTotalMs += entry.duration;
				}
			});
			po.observe({ entryTypes: ['longtask'] });
			longTaskSupported = true;
		} catch {
			/* 'longtask' entries aren't supported everywhere (e.g. Firefox/Safari). */
		}
	}

	const render = () => {
		const color = fps >= 50 ? '#6bffb0' : fps >= 30 ? '#ffb454' : '#ff6b6b';
		const lines = [
			`<span style="color:${color}">FPS ${fps}</span>  frame ${frameTimeMs.toFixed(1)}ms`,
		];
		lines.push(
			longTaskSupported
				? `longtasks ${longTaskCount} (${longTaskTotalMs.toFixed(0)}ms total, >50ms each)`
				: 'longtasks: unsupported in this browser',
		);
		el.innerHTML = lines.join('\n');
	};

	const tick = (now: number) => {
		frameTimeMs = now - lastFrameTime;
		lastFrameTime = now;
		framesSinceUpdate++;

		if (now - lastFpsUpdate >= 250) {
			fps = Math.round((framesSinceUpdate * 1000) / (now - lastFpsUpdate));
			framesSinceUpdate = 0;
			lastFpsUpdate = now;
			render();
		}

		requestAnimationFrame(tick);
	};

	requestAnimationFrame(tick);
}
