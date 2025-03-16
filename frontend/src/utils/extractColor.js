// extract-colors.js
import fs from 'node:fs/promises';

import { aliases, baseColors } from '../configs/theme.config.mjs';

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

async function extractColorToFile() {
	const opFile = process.argv[2] || 'src/styles/color.style.mjs';
	try {
		const cssVariables = ExtractCSSColorVar();

		const fileContent = `/**
  * Extract CSS Color Variables
  * Generated on ${new Date().toLocaleString()}
	* Note: DO NOT CHANGE ON THIS MODIFY ON THE CONFIG THEME INSTEAD
**/

export const colorVars = \`
  ${cssVariables}
\`;
`;
		await fs.writeFile(opFile, fileContent);
		console.log(`Successfully extracted color variables to ${opFile}`);
	} catch (error) {
		console.error('Error extracting color variables:', error);
	}
}

extractColorToFile();
