/**
 * retroPlasma.ts
 *
 * Vendored from github.com/Tapawingo/retro-plasma (own project, MIT licensed).
 * Dependency-free WebGL plasma/dither renderer, used as this site's hero
 * background. Started out as a CPU canvas-2d renderer computing every pixel
 * in a JS loop, which couldn't hold 60fps no matter how much the JS side
 * got optimized. A fragment shader does the same per-pixel math on the GPU
 * instead, off the main thread, basically for free.
 */

export interface DitherConfig {
	/** Enable / disable ordered dithering */
	enabled: boolean;
	/** Number of brightness levels to quantize into (2-32 is reasonable) */
	levels: number;
	/** How strong the dithering pattern is (0 = none, 1 = full Bayer pattern) */
	strength: number;
}

export interface PlasmaConfig {
	/** Base hue (degrees) */
	baseHue: number;
	/** Range of hue variation (degrees) */
	hueRange: number;
	/** Saturation (0-1) for the blobs' colors */
	saturation: number;
	/** Max lightness (0-1) for bright parts of the blobs */
	lightness: number;
	/** Speed of the plasma animation. */
	speed: number;
	/** Pixel scaling factor for resolution: <1 = higher res, >1 = lower res */
	pixelScale: number;
	/** Scale of the plasma pattern: <1 = bigger blobs, >1 = smaller blobs */
	plasmaScale: number;
	/** Value where blobs "start". Lower = larger blobs. 0-1. */
	blobThreshold: number;
	/** How soft the falloff is: >1 = softer centers, <1 = sharper/needle. */
	blobSoftness: number;
	/** Overall brightness of the blobs (after shaping), 0-1+. */
	intensity: number;
	/** Enable / disable hue shifting over time. */
	hueShiftEnabled: boolean;
	/** Speed of hue shift (degrees per second). */
	hueShiftSpeed: number;
	/** Dithering configuration */
	dither: DitherConfig;
}

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
	gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uPulse;
uniform float uPlasmaScale;
uniform float uBlobThreshold;
uniform float uBlobSoftness;
uniform float uIntensity;
uniform float uBaseHue;
uniform float uHueRange;
uniform float uHueShiftAngle;
uniform float uSaturation;
uniform float uMaxLightness;
uniform float uDitherEnabled;
uniform float uDitherLevels;
uniform float uDitherStrength;

/* Same 4x4 ordered-dither matrix as the original CPU version. Written as a
 * branch table since dynamic array indexing isn't reliable across WebGL1
 * implementations. */
float bayerValue(vec2 fragCoord) {
	int ix = int(mod(fragCoord.x, 4.0));
	int iy = int(mod(fragCoord.y, 4.0));
	int idx = iy * 4 + ix;
	if (idx == 0) return 0.0;
	if (idx == 1) return 8.0;
	if (idx == 2) return 2.0;
	if (idx == 3) return 10.0;
	if (idx == 4) return 12.0;
	if (idx == 5) return 4.0;
	if (idx == 6) return 14.0;
	if (idx == 7) return 6.0;
	if (idx == 8) return 3.0;
	if (idx == 9) return 11.0;
	if (idx == 10) return 1.0;
	if (idx == 11) return 9.0;
	if (idx == 12) return 15.0;
	if (idx == 13) return 7.0;
	if (idx == 14) return 13.0;
	return 5.0;
}

float hue2rgb(float p, float q, float tIn) {
	float t = tIn;
	if (t < 0.0) t += 1.0;
	if (t > 1.0) t -= 1.0;
	if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t;
	if (t < 0.5) return q;
	if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
	return p;
}

vec3 hslToRgb(float h, float s, float l) {
	if (s <= 0.0) return vec3(l);
	float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
	float p = 2.0 * l - q;
	return vec3(
		hue2rgb(p, q, h + 1.0 / 3.0),
		hue2rgb(p, q, h),
		hue2rgb(p, q, h - 1.0 / 3.0)
	);
}

float plasmaValue(vec2 fragCoord) {
	float nx = fragCoord.x / uResolution.x;
	float ny = fragCoord.y / uResolution.y;

	float cx = nx - 0.5;
	float cy = ny - 0.5;
	float dist = sqrt(cx * cx + cy * cy);

	float s = uPlasmaScale;

	float v = 0.0;
	v += sin(nx * 10.0 * s + uTime * 1.3);
	v += sin(ny * 10.0 * s - uTime * 1.7);
	v += sin((nx + ny) * 8.0 * s + uTime * 0.7);
	v += sin(dist * 20.0 * s - uTime * 1.1);

	v = v * 0.125 + 0.5;
	v = v * 0.7 + uPulse * 0.3;

	return clamp(v, 0.0, 1.0);
}

void main() {
	float v = plasmaValue(gl_FragCoord.xy);

	float blob = 0.0;
	if (v > uBlobThreshold) {
		blob = (v - uBlobThreshold) / (1.0 - uBlobThreshold);
	}
	float softness = max(0.01, uBlobSoftness);
	blob = pow(blob, softness);

	float brightness = clamp(blob * uIntensity, 0.0, 1.0);

	if (uDitherEnabled > 0.5 && uDitherLevels > 1.0) {
		float levels = max(2.0, floor(uDitherLevels));
		float scaled = brightness * levels;
		float baseLevel = floor(scaled);
		if (baseLevel >= levels) baseLevel = levels - 1.0;
		float frac = scaled - baseLevel;
		float matrixThreshold = bayerValue(gl_FragCoord.xy) / 15.0;
		float strength = clamp(uDitherStrength, 0.0, 1.0);
		float threshold = 0.5 * (1.0 - strength) + matrixThreshold * strength;
		float level = baseLevel;
		if (frac > threshold && level < levels - 1.0) level += 1.0;
		brightness = level / (levels - 1.0);
	}

	float hue = mod(uBaseHue + uHueRange * (brightness - 0.5) * 2.0 + uHueShiftAngle, 360.0);
	if (hue < 0.0) hue += 360.0;

	float lightness = brightness * uMaxLightness;

	vec3 rgb = hslToRgb(hue / 360.0, uSaturation, lightness);
	gl_FragColor = vec4(rgb, 1.0);
}
`;

interface UniformLocations {
	resolution: WebGLUniformLocation | null;
	time: WebGLUniformLocation | null;
	pulse: WebGLUniformLocation | null;
	plasmaScale: WebGLUniformLocation | null;
	blobThreshold: WebGLUniformLocation | null;
	blobSoftness: WebGLUniformLocation | null;
	intensity: WebGLUniformLocation | null;
	baseHue: WebGLUniformLocation | null;
	hueRange: WebGLUniformLocation | null;
	hueShiftAngle: WebGLUniformLocation | null;
	saturation: WebGLUniformLocation | null;
	maxLightness: WebGLUniformLocation | null;
	ditherEnabled: WebGLUniformLocation | null;
	ditherLevels: WebGLUniformLocation | null;
	ditherStrength: WebGLUniformLocation | null;
}

function compileShader(
	gl: WebGLRenderingContext,
	type: number,
	source: string,
): WebGLShader {
	const shader = gl.createShader(type);
	if (!shader) throw new Error('Failed to create shader.');
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		const info = gl.getShaderInfoLog(shader);
		gl.deleteShader(shader);
		throw new Error(`retroPlasma shader compile error: ${info}`);
	}
	return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram {
	const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
	const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
	const program = gl.createProgram();
	if (!program) throw new Error('Failed to create WebGL program.');
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		const info = gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		throw new Error(`retroPlasma program link error: ${info}`);
	}
	gl.deleteShader(vs);
	gl.deleteShader(fs);
	return program;
}

export class RetroPlasma {
	private static readonly DEFAULT_CONFIG: PlasmaConfig = {
		baseHue: 220,
		hueRange: 120,
		saturation: 0.9,
		lightness: 0.8,
		speed: 0.15,
		pixelScale: 1.0,

		plasmaScale: 1.0,
		blobThreshold: 0.35,
		blobSoftness: 2.0,
		intensity: 1.0,

		hueShiftEnabled: false,
		hueShiftSpeed: 40,
		dither: {
			enabled: true,
			levels: 6,
			strength: 1.0,
		},
	};

	private canvas: HTMLCanvasElement;
	private gl: WebGLRenderingContext;
	private program: WebGLProgram;
	private uniforms: UniformLocations;
	private config: PlasmaConfig;

	private animationId: number | null = null;
	private started = false;

	constructor(
		canvas: HTMLCanvasElement,
		config?: Partial<PlasmaConfig> & { dither?: Partial<DitherConfig> },
	) {
		const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
		if (!gl) {
			throw new Error('WebGL context not supported.');
		}

		this.canvas = canvas;
		this.gl = gl;
		this.config = RetroPlasma.mergeConfig(config);

		this.canvas.style.display = 'block';
		this.canvas.style.width = '100%';
		this.canvas.style.height = '100%';

		this.program = createProgram(gl);
		gl.useProgram(this.program);

		/* Two triangles covering the full clip-space quad, the standard way
		 * to fill the viewport for a WebGL1 full-screen shader. */
		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
			gl.STATIC_DRAW,
		);

		const positionLoc = gl.getAttribLocation(this.program, 'aPosition');
		gl.enableVertexAttribArray(positionLoc);
		gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

		this.uniforms = {
			resolution: gl.getUniformLocation(this.program, 'uResolution'),
			time: gl.getUniformLocation(this.program, 'uTime'),
			pulse: gl.getUniformLocation(this.program, 'uPulse'),
			plasmaScale: gl.getUniformLocation(this.program, 'uPlasmaScale'),
			blobThreshold: gl.getUniformLocation(this.program, 'uBlobThreshold'),
			blobSoftness: gl.getUniformLocation(this.program, 'uBlobSoftness'),
			intensity: gl.getUniformLocation(this.program, 'uIntensity'),
			baseHue: gl.getUniformLocation(this.program, 'uBaseHue'),
			hueRange: gl.getUniformLocation(this.program, 'uHueRange'),
			hueShiftAngle: gl.getUniformLocation(this.program, 'uHueShiftAngle'),
			saturation: gl.getUniformLocation(this.program, 'uSaturation'),
			maxLightness: gl.getUniformLocation(this.program, 'uMaxLightness'),
			ditherEnabled: gl.getUniformLocation(this.program, 'uDitherEnabled'),
			ditherLevels: gl.getUniformLocation(this.program, 'uDitherLevels'),
			ditherStrength: gl.getUniformLocation(this.program, 'uDitherStrength'),
		};

		this.handleResize = this.handleResize.bind(this);
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	}

	/** Start the animation loop. */
	public start(): void {
		if (this.started) return;
		this.started = true;
		const loop = (timestamp: number) => {
			if (!this.started) return;
			this.renderFrame(timestamp);
			this.animationId = window.requestAnimationFrame(loop);
		};
		this.animationId = window.requestAnimationFrame(loop);
	}

	/** Stop the animation loop and detach listeners. */
	public stop(): void {
		this.started = false;
		if (this.animationId !== null) {
			window.cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}
		window.removeEventListener('resize', this.handleResize);
	}

	/**
	 * Render exactly one static frame without starting the animation loop.
	 * Used for the prefers-reduced-motion fallback.
	 */
	public renderStaticFrame(timestamp = 0): void {
		this.renderFrame(timestamp);
	}

	/**
	 * Update configuration at runtime.
	 * Example:
	 *   plasma.updateConfig({ baseHue: 300, dither: { strength: 0.2 } });
	 */
	public updateConfig(
		config: Partial<PlasmaConfig> & { dither?: Partial<DitherConfig> },
	): void {
		if (config.dither) {
			this.config.dither = {
				...this.config.dither,
				...config.dither,
			};
		}

		const { dither, ...rest } = config;
		this.config = {
			...this.config,
			...rest,
			dither: this.config.dither,
		};

		this.handleResize();
	}

	private static mergeConfig(
		config?: Partial<PlasmaConfig> & { dither?: Partial<DitherConfig> },
	): PlasmaConfig {
		const base = { ...this.DEFAULT_CONFIG };
		if (!config) return base;

		const mergedDither: DitherConfig = {
			...base.dither,
			...(config.dither ?? {}),
		};

		const { dither, ...rest } = config;
		return {
			...base,
			...rest,
			dither: mergedDither,
		};
	}

	private handleResize(): void {
		const rect = this.canvas.getBoundingClientRect();
		if (rect.width === 0 || rect.height === 0) {
			return;
		}

		const scale = this.config.pixelScale <= 0 ? 1 : this.config.pixelScale;

		const internalWidth = Math.max(1, Math.floor(rect.width / scale));
		const internalHeight = Math.max(1, Math.floor(rect.height / scale));

		if (
			this.canvas.width !== internalWidth ||
			this.canvas.height !== internalHeight
		) {
			this.canvas.width = internalWidth;
			this.canvas.height = internalHeight;
			this.gl.viewport(0, 0, internalWidth, internalHeight);
		}
	}

	private renderFrame(timestamp: number): void {
		const gl = this.gl;
		const width = this.canvas.width;
		const height = this.canvas.height;
		if (width === 0 || height === 0) return;

		const time = timestamp * 0.001 * this.config.speed;
		const pulse = (Math.sin(time * 2.0) + 1) * 0.5;
		const hueShiftAngle = this.config.hueShiftEnabled
			? time * this.config.hueShiftSpeed
			: 0;

		gl.uniform2f(this.uniforms.resolution, width, height);
		gl.uniform1f(this.uniforms.time, time);
		gl.uniform1f(this.uniforms.pulse, pulse);
		gl.uniform1f(this.uniforms.plasmaScale, this.config.plasmaScale);
		gl.uniform1f(this.uniforms.blobThreshold, this.config.blobThreshold);
		gl.uniform1f(this.uniforms.blobSoftness, this.config.blobSoftness);
		gl.uniform1f(this.uniforms.intensity, this.config.intensity);
		gl.uniform1f(this.uniforms.baseHue, this.config.baseHue);
		gl.uniform1f(this.uniforms.hueRange, this.config.hueRange);
		gl.uniform1f(this.uniforms.hueShiftAngle, hueShiftAngle);
		gl.uniform1f(this.uniforms.saturation, this.config.saturation);
		gl.uniform1f(this.uniforms.maxLightness, this.config.lightness);
		gl.uniform1f(
			this.uniforms.ditherEnabled,
			this.config.dither.enabled ? 1 : 0,
		);
		gl.uniform1f(this.uniforms.ditherLevels, this.config.dither.levels);
		gl.uniform1f(this.uniforms.ditherStrength, this.config.dither.strength);

		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}
}

/** Convenience helper. */
export function createRetroPlasma(
	canvas: HTMLCanvasElement,
	config?: Partial<PlasmaConfig> & { dither?: Partial<DitherConfig> },
): RetroPlasma {
	return new RetroPlasma(canvas, config);
}
