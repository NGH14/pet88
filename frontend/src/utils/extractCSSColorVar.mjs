import { aliases, baseColors } from 'configs/theme.config.mjs';

/**
 * Generates a string containing CSS variable definitions for colors.
 *
 * This function extracts color values from `baseColors` and `aliases` objects,
 * then formats them into CSS variable declarations.
 *
 * @returns {string} A formatted string of CSS variable definitions.
 *
 * @example
 * const cssVars = ExtractCSSColorVar();
 * console.log(cssVars);
 * // Output:
 * // --primary-100: #fde8db;
 * // --primary-200: #fbd1b7;
 * // --alias-color: var(--primary-100);
 */
export const ExtractCSSColorVar = () => {
	let colorVar = '';

	Object.entries(baseColors).forEach(([category, shades]) => {
		Object.entries(shades).forEach(([shade, hexCode]) => {
			colorVar += `--${category}-${shade}: ${hexCode};\n  `;
		});
	});

	Object.entries(aliases).forEach(([name, value]) => {
		colorVar += `--${name}: ${value};\n  `;
	});

	return colorVar;
};
