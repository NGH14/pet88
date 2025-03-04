import { aliases, baseColors } from 'configs/theme.config.mjs';

export const ExtractCSSColorVar = () => {
	let colorVar = '';

	Object.entries(baseColors).forEach(([category, shades]) => {
		// Process each shade
		Object.entries(shades).forEach(([shade, hexCode]) => {
			colorVar += `--${category}-${shade}: ${hexCode};\n  `;
		});
	});

	Object.entries(aliases).forEach(([name, value]) => {
		colorVar += `--${name}: ${value};\n  `;
	});

	return colorVar;
};
