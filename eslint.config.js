// @ts-check
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig(
	{ ignores: ['dist/', '.astro/'] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs.recommended,
	eslintConfigPrettier,
	{
		rules: {
			// retroPlasma.ts destructures `dither` out of `config` on purpose,
			// just to build `rest` without it.
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ ignoreRestSiblings: true },
			],
		},
	},
);
