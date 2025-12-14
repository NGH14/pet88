const ToVND = num => {
	if (isNaN(num) || num === null || num === undefined) {
		num = 0;
	}
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(num);
};

const ToUSD = num => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(num);
};

export { ToVND, ToUSD };
