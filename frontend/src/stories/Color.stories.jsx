import React, { useEffect, useState } from 'react';

import { colorVars } from 'styles/color.style.mjs';

export default {
	title: 'Design System/Colors',
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		componentSubtitle: 'Color palette used in Pet88',
	},
};

// Parse colorVars string into a usable object
const parseColorVars = varsString => {
	const colors = {};
	const lines = varsString.split('\n');

	lines.forEach(line => {
		const match = line.trim().match(/--([^:]+):\s*([^;]+);/);
		if (match) {
			const [, name, value] = match;
			colors[name] = value.trim();
		}
	});

	return colors;
};

// Group colors by categories (primary, secondary, etc.)
const groupColorsByCategory = colors => {
	const grouped = {};

	Object.entries(colors).forEach(([key, value]) => {
		const parts = key.split('-');
		if (parts.length > 1) {
			const category = parts[0];
			if (!grouped[category]) {
				grouped[category] = {};
			}
			grouped[category][key] = value;
		} else {
			// Handle aliases
			if (!grouped['aliases']) {
				grouped['aliases'] = {};
			}
			grouped['aliases'][key] = value;
		}
	});

	return grouped;
};

export const ColorPalette = () => {
	const [groupedColors, setGroupedColors] = useState({});

	useEffect(() => {
		const parsedColors = parseColorVars(colorVars);
		const grouped = groupColorsByCategory(parsedColors);
		setGroupedColors(grouped);
	}, []);

	return (
		<div>
			<h1>Color System</h1>

			{Object.entries(groupedColors).map(([category, colors]) => (
				<div key={category} style={{ marginBottom: '2rem' }}>
					<h2 style={{ textTransform: 'capitalize' }}>{category}</h2>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
						{Object.entries(colors).map(([colorName, colorValue]) => (
							<div
								key={colorName}
								style={{
									width: '180px',
									marginBottom: '1rem',
									borderRadius: '4px',
									overflow: 'hidden',
									boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
								}}
							>
								<div
									style={{
										height: '100px',
										backgroundColor: colorValue.startsWith('var')
											? `var(${colorValue})`
											: colorValue,
									}}
								/>
								<div style={{ padding: '8px' }}>
									<div style={{ fontWeight: 'bold' }}>--{colorName}</div>
									<div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{colorValue}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

// Add a story showing usage examples
export const Usage = () => (
	<div>
		<h1>How to Use Colors</h1>

		<h2>CSS Usage</h2>
		<pre>
			{`.button {
  background-color: var(--primary-200);
  color: var(--alias-color);
}`}
		</pre>

		<h2>React Inline Style Usage</h2>
		<pre>
			{`<button
  style={{
    backgroundColor: 'var(--primary-200)',
    color: 'var(--alias-color)'
  }}
>
  Click Me
</button>`}
		</pre>
	</div>
);
