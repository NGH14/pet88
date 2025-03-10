export const baseColors = {
	primary: {
		100: '#fff4e8',
		200: '#ffdfbf',
		300: '#ffc796',
		400: '#ffad6e',
		500: '#ff8f45',
		600: '#f76a1a',
		700: '#d14e0d',
		800: '#ab3402',
		900: '#852300',
	},
	yellow: {
		100: '#fdf4d9',
		200: '#fae9b3',
		300: '#f1d16d',
		400: '#edc32f',
		500: '#ebb512',
		600: '#d49e0f',
		700: '#bd870c',
		800: '#a57009',
		900: '#8c5a06',
	},
	black: {
		500: '#342c29',
		600: '#2a221d',
		700: '#171111',
		800: '#0f0a09',
		900: '#070403',
	},
	gray: {
		100: '#f5f5f5',
		200: '#e9e9e9',
		300: '#d3d3d3',
		400: '#bebebe',
		500: '#a9a9a9',
		600: '#919191',
		700: '#7f7f7f',
		800: '#666666',
		900: '#333333',
	},
	green: {
		100: '#88e788',
		200: '#64e064',
		300: '#00b300',
		400: '#009a00',
		500: '#008000',
		600: '#006600',
		700: '#004c00',
		800: '#003300',
		900: '#001a00',
	},
	white: {
		100: '#fdfcfa',
		200: '#f8f3ee',
		300: '#fafafa',
		400: '#f7f6f1',
		500: '#f2f2f2',
		600: '#e9e9e9',
		700: '#ffffff',
		800: '#e5e5e5',
	},
};

export const aliases = {
	'gold-color': baseColors.yellow[500],
	'primary-color': baseColors.primary[500],
	'disabled-color': baseColors.gray[400],
};

export const styledTheme = {
	colors: {
		...baseColors,
		...aliases,
	},
};
