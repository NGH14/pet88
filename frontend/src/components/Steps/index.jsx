import React, { useState } from 'react';

import { Button, Steps, message } from 'antd';

import './steps.css';

const { Step } = Steps;

const steps = [
	{
		title: 'First',
		content: 'First-content',
	},
	{
		title: 'Second',
		content: 'Second-content',
	},
	{
		title: 'Last',
		content: 'Last-content',
	},
];

export const CustomSteps = () => {
	const [current, setCurrent] = useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	return (
		<>
			<Steps current={current}>
				{steps.map(item => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>
			<section className="steps-content">{steps[current].content}</section>
			<section className="steps-action">
				{current < steps.length - 1 && (
					<Button type="primary" onClick={() => next()}>
						Next
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type="primary" onClick={() => message.success('Processing complete!')}>
						Done
					</Button>
				)}
				{current > 0 && (
					<Button
						style={{
							margin: '0 8px',
						}}
						onClick={() => prev()}
					>
						Previous
					</Button>
				)}
			</section>
		</>
	);
};
