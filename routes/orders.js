const express = require('express');

const router = express.Router();

const { Order } = require('../models/orders.js');
const { sendNodeMail } = require('../services/nodemailer.js');

router.get('/', async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const orders = await Order.findById(req.params.id);
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/user/:id', async (req, res) => {
	try {
		const orders = await Order.find({ userID: req.params.id });
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json('Order has been deleted.');
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updateOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);
		res.status(200).json(updateOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/status/:id', async (req, res) => {
	try {
		const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
			paid: req.body.paid,
			confirm: req.body.confirm,
		});
		res.status(200).json(updateOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/cash', async (req, res) => {
	try {
		const order = await Order.create({
			userID: req.body.userID || 'guest',
			products: req.body.roomList,
			paid: 'unpaid',
			email: req.body.email,
			price: req.body.price,
			name: req.body.name,
			phone: req.body.phone,
			days: req.body.days,
			paymentMethod: req.body.paymentMethod,
			confirm: 'unconfimred',
			start: req.body.start,
			end: req.body.end,
			service: req.body.service,
		});
		const link = `http://localhost:3000/confirm/${order?.id}`;

		const templateEN = `<div style="box-sizing: border-box;	
		font-size: 14px;
		line-height: 1.5;
		padding: 15px;
		color: #24292e;
		background-color: #fff;
		margin: 0;">
			<div style='background-color:white;width:600px;margin:0 auto;color:black'>
				<img
					src='https://lh3.googleusercontent.com/49shb7GunRaPq4RZPQiv1MfUbe2pSjHF2DCloGNt8npjVBl6GCFAPMnCNIZmLOCChDG5sKQji7-9tlqZ8uesuc0XsaDk7k2YSKZ-2UtP_ShpCIUNFgSeEi1r58zHhIc2_AkYH-76=w300'
					alt='Pet88'
					style='display:block;max-width:100%;max-height:30px;'
					class='CToWUd'
					data-bit='iit'></img>
					
					<div style='line-height:1.8;'>
						<p style="box-sizing: border-box;
						margin-top: 8px!important;
						margin-bottom: 8px;
						font-size: 20px;
						font-weight: 400!important;
						line-height: 1.25!important;">Hi <strong>
							${order?.name}
						</strong>,</p>
						<div style='line-height:1.8;padding: 15px 0px;'> 
					<p>	
					Let's verify your booking in ${
						order.days
					} days with total cost is ${new Intl.NumberFormat('vi-VI', {
			style: 'currency',
			currency: 'VND',
		}).format(order.price)}
		</p>
		<a href="${link}" target='_blank ' style="background-color: #28a745!important;box-sizing:border-box;
		color: #fff;text-decoration: none;
		display: inline-block;
		font-size: inherit;
		font-weight: 500;
		line-height: 1.5;
		white-space: nowrap;
		vertical-align: middle;
		border-radius: .5em;
		padding: .75em 1.5em;
		border: 1px solid #28a745;">
		Confirm Booking.
 </a> 
		</div>
		<hr style="box-sizing:content-box;height:0;overflow:hidden;background-color:transparent;border-bottom-color:#dfe2e5;border-bottom-style:solid;;border-width:0 0 1px">
		<p>			
			or copy this url to your browser 
			<p> [
				<a href="${link}" target='_blank' style="font-size: 13px;">
				${link}	</a> ]
			</p>
		
			</p>
					<span   style="text-align: center;">
						If you are not booking the service, please ignore this
						email.
					</span>
				</div>
			</div>
		</div>
		`;

		sendNodeMail(
			{
				subject: `Pet88: Booking Confirmation`,
				recipient: order.email,
			},
			templateEN,
		);
		res.status(200).json(order);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/admin/grooming', async (req, res) => {
	try {
		const order = await Order.create({
			userID: req.body.userID || 'guest',
			products: req.body.roomList,
			paid: 'unpaid',
			email: req.body.email,
			price: req.body.price,
			name: req.body.name,
			phone: req.body.phone,
			days: req.body.days,
			paymentMethod: 'cash',
			confirm: 'confimred',
			start: req.body.start,
			end: req.body.end,
			service: req.body.service,
		});

		res.status(200).json(order);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/confirm/success/:id', async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(req.params.id, {
			confirm: 'confimred',
		});
		res.status(200).json(order);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/success/:id', async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(req.params.id, {
			paid: 'success',
			confirm: 'confimred',
		});

		const orderData = order.products
			.map((ord) => {
				return `<tr>
	<td
		style="
			border: 0;
			border-collapse: collapse;
			margin: 0;
			padding: 0;
			font-family: -apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				Roboto,
				'Helvetica Neue',
				Ubuntu,
				sans-serif;
			vertical-align: middle;
			color: #525f7f;
			font-size: 15px;
			line-height: 24px;
			width: 100%;
		"
	>
	 ${ord.roomNumber}
	</td>
	<td
		width="8"
		style="
			border: 0;
			border-collapse: collapse;
			margin: 0;
			padding: 0;
			color: #ffffff;
			font-size: 1px;
			line-height: 1px;
		"
	>
		&nbsp;
	</td>
	<td
		align="right"
		valign="top"
		style="
			border: 0;
			border-collapse: collapse;
			margin: 0;
			padding: 0;
			font-family: -apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				Roboto,
				'Helvetica Neue',
				Ubuntu,
				sans-serif;
			vertical-align: middle;
			color: #525f7f;
			font-size: 15px;
			line-height: 24px;
		"
	>
	 ${new Intl.NumberFormat('vi-Vi', {
			style: 'currency',
			currency: 'VND',
		}).format(ord.price)}</td>
	 </tr>`;
			})
			.toString()
			.replace(/,/g, '');

		const templateEN = `
	<div class="">
		<div class="aHl"></div>
		<div id=":1bt" tabindex="-1"></div>
		<div
			id=":1c4"
			class="ii gt"
			jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."
		>
			<div id=":1c5" class="a3s aiL msg-6583894312104824909">
				<u></u>
	
				<div
					bgcolor="#f6f9fc"
					style="
						border: 0;
						margin: 0;
						padding: 0;
						min-width: 100%;
						width: 100%;
					"
				>
					<table
						bgcolor="#f6f9fc"
						border="0"
						cellpadding="0"
						cellspacing="0"
						width="100%"
						style="border: 0; margin: 0; padding: 0"
					>
						<tbody>
							<tr>
								<td
									class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--kill m_-6583894312104824909st-Spacer--height"
									height="64"
								>
									<div
										class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--kill"
									>
										&nbsp;
									</div>
								</td>
							</tr>
	
							<tr>
								<td style="border: 0; margin: 0; padding: 0">
									<table
										class="m_-6583894312104824909st-Wrapper"
										align="center"
										bgcolor="#ffffff"
										border="0"
										cellpadding="0"
										cellspacing="0"
										width="600"
										style="
											border-top-left-radius: 16px;
											border-top-right-radius: 16px;
											margin: 0 auto;
											min-width: 600px;
										"
									>
										<tbody>
											<tr>
												<td
													style="
														border: 0;
														margin: 0;
														padding: 0;
													"
												>
													<table
														class="m_-6583894312104824909st-Width m_-6583894312104824909st-Width--mobile"
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="600"
														style="min-width: 600px"
													>
														<tbody>
															<tr>
																<td
																	align="center"
																	height="0"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		display: none !important;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 0;
																		max-width: 0;
																		opacity: 0;
																		overflow: hidden;
																	"
																>
																	<span
																		class="m_-6583894312104824909st-Delink m_-6583894312104824909st-Delink--preheader"
																		style="
																			color: #ffffff;
																			text-decoration: none;
																		"
																	>
																		Receipt from
																		<span
																			class="il"
																			>Pet88</span
																		>
																		[#${order._id}]
																		Amount paid
																		${new Intl.NumberFormat('vi-Vi', {
																			style: 'currency',
																			currency:
																				'VND',
																		}).format(
																			order.price,
																		)}
																		Date paid
																		${new Date(order.createdAt).toLocaleString()}
																		‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr />&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
																	</span>
																</td>
															</tr>
														</tbody>
													</table>
	
													<div
														style="
															background-color: #f6f9fc;
															padding-top: 20px;
														"
													>
														<table
															dir="ltr"
															width="100%"
															style="
																border: 0;
																border-collapse: collapse;
																margin: 0;
																padding: 0;
																background-color: #ffffff;
															"
														>
															<tbody>
																<tr>
																	<td
																		style="
																			background-color: #525f7f;
																			border: 0;
																			border-collapse: collapse;
																			margin: 0;
																			padding: 0;
																			font-size: 0;
																			line-height: 0px;
																			background-size: 100%
																				100%;
																			border-top-left-radius: 5px;
																		"
																		align="right"
																		height="156"
																		valign="bottom"
																		width="252"
																	>
																		<a
																			style="
																				outline: 0;
																				text-decoration: none;
																			"
																		>
																			<img
																				alt=""
																				height="156"
																				width="252"
																				src="https://ci4.googleusercontent.com/proxy/9-vzO6oIjzdWLz5vxJipUa48-_jdteSGmZPi_jXjI1P9gfsxKXGx5ZC6HCp7gEsdL6c6qVHcVmPrfRVxxz7Yw1GWRX10g1zsI66f3vStuGoBVesH24A0bVJsUdvql3xAbjPcKaA_8g=s0-d-e1-ft#https://stripe-images.s3.amazonaws.com/notifications/hosted/20180110/Header/Left.png"
																				style="
																					display: block;
																					border: 0;
																					line-height: 100%;
																					width: 100%;
																				"
																				class="CToWUd a6T"
																				data-bit="iit"
																				tabindex="0"
																			/>
																			<div
																				class="a6S"
																				dir="ltr"
																				style="
																					opacity: 0.01;
																					left: 419.6px;
																					top: 206px;
																				"
																			>
																				<div
																					id=":315"
																					class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
																					title="Download"
																					role="button"
																					tabindex="0"
																					aria-label="Download attachment "
																					data-tooltip-class="a1V"
																				>
																					<div
																						class="akn"
																					>
																						<div
																							class="aSK J-J5-Ji aYr"
																						></div>
																					</div>
																				</div>
																			</div>
																		</a>
																	</td>
																	<td
																		style="
																			background-color: #525f7f;
																			border: 0;
																			border-collapse: collapse;
																			margin: 0;
																			padding: 0;
																			font-size: 0;
																			line-height: 0px;
																			background-size: 100%
																				100%;
																			width: 96px !important;
																		"
																		align="center"
																		height="156"
																		valign="bottom"
																	>
																		<a
																			style="
																				outline: 0;
																				text-decoration: none;
																			"
																		>
																			<img
																				alt=""
																				height="156"
																				width="96"
																				src="https://ci5.googleusercontent.com/proxy/qVcMwFdTxaPrLtb6P4p5RrJTgKn7VQ7beAtuaYlivyy9UeHxe-Zw4VZCRTMELti76wUlRZoqsOKPyvBmoUHfhrFwdmzrutV-XWZ_3YAY1A-BnJMHZ2WdlDWWQI3gVHQ-HT_70Ty_zXbTI2n-5iwBMSNw=s0-d-e1-ft#https://stripe-images.s3.amazonaws.com/emails/acct_1LOJYrFnFZlEnf8r/1/twelve_degree_icon@2x.png"
																				style="
																					display: block;
																					border: 0;
																					line-height: 100%;
																				"
																				class="CToWUd"
																				data-bit="iit"
																			/>
																		</a>
																	</td>
																	<td
																		style="
																			background-color: #525f7f;
																			border: 0;
																			border-collapse: collapse;
																			margin: 0;
																			padding: 0;
																			font-size: 0;
																			line-height: 0px;
																			background-size: 100%
																				100%;
																			border-top-right-radius: 5px;
																		"
																		align="left"
																		height="156"
																		valign="bottom"
																		width="252"
																	>
																		<a
																			style="
																				outline: 0;
																				text-decoration: none;
																			"
																		>
																			<img
																				alt=""
																				height="156"
																				width="252"
																				src="https://ci5.googleusercontent.com/proxy/agqjJXCE9UqmeYtipoZMl4NQ5plhy-TKT_WsqxR18QMhNXU7t-dJPtqpaqwtjzrOslBvOe18-HlXRVknnUuUTIhtrECzchPqX06DXBwznI7p5hMwQb0pIl-d9gWCXjLTWHpQSf0rxKo=s0-d-e1-ft#https://stripe-images.s3.amazonaws.com/notifications/hosted/20180110/Header/Right.png"
																				style="
																					display: block;
																					border: 0;
																					line-height: 100%;
																					width: 100%;
																				"
																				class="CToWUd a6T"
																				data-bit="iit"
																				tabindex="0"
																			/>
																			<div
																				class="a6S"
																				dir="ltr"
																				style="
																					opacity: 0.01;
																					left: 767.6px;
																					top: 206px;
																				"
																			>
																				<div
																					id=":316"
																					class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
																					title="Download"
																					role="button"
																					tabindex="0"
																					aria-label="Download attachment "
																					data-tooltip-class="a1V"
																				>
																					<div
																						class="akn"
																					>
																						<div
																							class="aSK J-J5-Ji aYr"
																						></div>
																					</div>
																				</div>
																			</div>
																		</a>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
													<table
														class="m_-6583894312104824909st-Width m_-6583894312104824909st-Width--mobile"
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="600"
														style="min-width: 600px"
													>
														<tbody>
															<tr>
																<td
																	align="center"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		width: 472px;
																		font-family: -apple-system,
																			BlinkMacSystemFont,
																			'Segoe UI',
																			Roboto,
																			'Helvetica Neue',
																			Ubuntu,
																			sans-serif;
																		vertical-align: middle;
																		color: #32325d;
																		font-size: 24px;
																		line-height: 32px;
																	"
																>
																	Receipt from
																	<span class="il"
																		>Pet88</span
																	>
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer"
																	colspan="3"
																	height="12"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
	
													<table
														class="m_-6583894312104824909st-Width m_-6583894312104824909st-Width--mobile"
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="600"
														style="min-width: 600px"
													>
														<tbody>
															<tr>
																<td
																	align="center"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		width: 472px;
																		font-family: -apple-system,
																			BlinkMacSystemFont,
																			'Segoe UI',
																			Roboto,
																			'Helvetica Neue',
																			Ubuntu,
																			sans-serif;
																		vertical-align: middle;
																		color: #8898aa;
																		font-size: 15px;
																		line-height: 18px;
																	"
																>
																	Receipt
																	#${order._id}
														
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer"
																	colspan="3"
																	height="12"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
	
													<table
														class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Width m_-6583894312104824909st-Width--mobile"
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="100%"
													>
														<tbody>
															<tr>
																<td
																	height="20"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
	
													<table
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="100%"
													>
														<tbody>
															<tr>
																<td
																	class="m_-6583894312104824909st-Font m_-6583894312104824909st-Font--caption"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		color: #687385;
																		font-family: -apple-system,
																			'SF Pro Display',
																			'SF Pro Text',
																			'Helvetica',
																			sans-serif;
																		font-size: 12px;
																		font-weight: bold;
																		line-height: 16px;
																		text-transform: uppercase;
																	"
																></td>
																<td
																	width="64"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	&nbsp;
																</td>
																<td
																	valign="top"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																	"
																>
																	<table
																		style="
																			border: 0;
																			border-collapse: collapse;
																			margin: 0;
																			padding: 0;
																		"
																	>
																		<tbody>
																			<tr>
																				<td
																					style="
																						border: 0;
																						border-collapse: collapse;
																						margin: 0;
																						padding: 0;
																						font-family: -apple-system,
																							BlinkMacSystemFont,
																							'Segoe UI',
																							Roboto,
																							'Helvetica Neue',
																							Ubuntu,
																							sans-serif;
																						vertical-align: middle;
																						color: #8898aa;
																						font-size: 12px;
																						line-height: 16px;
																						white-space: nowrap;
																						font-weight: bold;
																						text-transform: uppercase;
																					"
																				>
																					Amount
																					paid
																				</td>
																			</tr>
																			<tr>
																				<td
																					style="
																						border: 0;
																						border-collapse: collapse;
																						margin: 0;
																						padding: 0;
																						font-family: -apple-system,
																							BlinkMacSystemFont,
																							'Segoe UI',
																							Roboto,
																							'Helvetica Neue',
																							Ubuntu,
																							sans-serif;
																						vertical-align: middle;
																						color: #525f7f;
																						font-size: 15px;
																						line-height: 24px;
																						white-space: nowrap;
																					"
																				>
																				${new Intl.NumberFormat('vi-Vi', {
																					style: 'currency',
																					currency:
																						'VND',
																				}).format(
																					order.price,
																				)}
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
																<td
																	width="20"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	&nbsp;
																</td>
																<td
																	valign="top"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																	"
																>
																	<table
																		style="
																			border: 0;
																			border-collapse: collapse;
																			margin: 0;
																			padding: 0;
																		"
																	>
																		<tbody>
																			<tr>
																				<td
																					style="
																						border: 0;
																						border-collapse: collapse;
																						margin: 0;
																						padding: 0;
																						font-family: -apple-system,
																							BlinkMacSystemFont,
																							'Segoe UI',
																							Roboto,
																							'Helvetica Neue',
																							Ubuntu,
																							sans-serif;
																						vertical-align: middle;
																						color: #8898aa;
																						font-size: 12px;
																						line-height: 16px;
																						white-space: nowrap;
																						font-weight: bold;
																						text-transform: uppercase;
																					"
																				>
																					Date
																					paid
																				</td>
																			</tr>
																			<tr>
																				<td
																					style="
																						border: 0;
																						border-collapse: collapse;
																						margin: 0;
																						padding: 0;
																						font-family: -apple-system,
																							BlinkMacSystemFont,
																							'Segoe UI',
																							Roboto,
																							'Helvetica Neue',
																							Ubuntu,
																							sans-serif;
																						vertical-align: middle;
																						color: #525f7f;
																						font-size: 15px;
																						line-height: 24px;
																						white-space: nowrap;
																					"
																				>
																				${new Date(order.createdAt).toLocaleString()}
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
																<td
																	width="20"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	&nbsp;
																</td>
																<td
																	valign="top"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																	"
																>
																	<table
																		style="
																			border: 0;
																			border-collapse: collapse;
																			margin: 0;
																			padding: 0;
																		"
																	>
																		<tbody>
																			<tr>
																				<td
																					style="
																						border: 0;
																						border-collapse: collapse;
																						margin: 0;
																						padding: 0;
																						font-family: -apple-system,
																							BlinkMacSystemFont,
																							'Segoe UI',
																							Roboto,
																							'Helvetica Neue',
																							Ubuntu,
																							sans-serif;
																						vertical-align: middle;
																						color: #8898aa;
																						font-size: 12px;
																						line-height: 16px;
																						white-space: nowrap;
																						font-weight: bold;
																						text-transform: uppercase;
																					"
																				>
																					Payment
																					method
																				</td>
																			</tr>
																			<tr>
																				<td
																					style="
																						border: 0;
																						border-collapse: collapse;
																						margin: 0;
																						padding: 0;
																						font-family: -apple-system,
																							BlinkMacSystemFont,
																							'Segoe UI',
																							Roboto,
																							'Helvetica Neue',
																							Ubuntu,
																							sans-serif;
																						vertical-align: middle;
																						color: #525f7f;
																						font-size: 15px;
																						line-height: 24px;
																						white-space: nowrap;
																					"
																				>
																					<span>
																						<img
																							alt="Visa"
																							height="16"
																							src="https://ci6.googleusercontent.com/proxy/sArGgfjFitta_yD9TD9j3RCM9ZqkGaM-NpEgFy0O68_yNFMEHJES4Qi1Wf0Evj4eHJshAgdkX291tZt8sQkYzz3eZPWamyk7WJYzSWGZ_0oJ65NsUe_b9M65Zcr4MLvurPmt9HQ=s0-d-e1-ft#https://stripe-images.s3.amazonaws.com/emails/receipt_assets/card/visa-dark@2x.png"
																							style="
																								border: 0;
																								margin: 0;
																								padding: 0;
																								vertical-align: text-bottom;
																							"
																							width="36"
																							class="CToWUd"
																							data-bit="iit"
																						/>
																					</span>
																					<span>
																						-
																						4242
																					</span>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
																<td
																	width="64"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	&nbsp;
																</td>
															</tr>
														</tbody>
													</table>
	
													<table
														class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Width m_-6583894312104824909st-Width--mobile"
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="100%"
													>
														<tbody>
															<tr>
																<td
																	height="32"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
	
													<table
														class="m_-6583894312104824909st-Width m_-6583894312104824909st-Width--mobile"
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="600"
														style="min-width: 600px"
													>
														<tbody>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer"
																	colspan="3"
																	height="8"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--gutter"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																	width="48"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
																<td
																	class="m_-6583894312104824909st-Font m_-6583894312104824909st-Font--caption"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		color: #687385;
																		font-family: -apple-system,
																			'SF Pro Display',
																			'SF Pro Text',
																			'Helvetica',
																			sans-serif;
																		font-weight: 400;
																		font-size: 12px;
																		line-height: 16px;
																		text-transform: uppercase;
																	"
																>
																	<span
																		class="m_-6583894312104824909st-Delink"
																		style="
																			border: 0;
																			margin: 0;
																			padding: 0;
																			font-weight: bold;
																		"
																	>
																		Summary
																	</span>
																</td>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--gutter"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																	width="48"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>

															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer"
																	colspan="3"
																	height="8"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
													<table
														class="m_-6583894312104824909st-Blocks m_-6583894312104824909st-Width m_-6583894312104824909st-Width--mobile"
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="600"
														style="min-width: 600px"
													>
														<tbody>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer"
																	colspan="3"
																	height="24"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--kill"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																	width="48"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
																<td
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																	"
																>
																	<table
																		class="m_-6583894312104824909st-Blocks-inner"
																		bgcolor="#f6f9fc"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		style="
																			border-radius: 8px;
																		"
																		width="100%"
																	>
																		<tbody>
																			<tr>
																				<td
																					style="
																						border: 0;
																						margin: 0;
																						padding: 0;
																					"
																				>
																					<table
																						class="m_-6583894312104824909st-Blocks-item"
																						border="0"
																						cellpadding="0"
																						cellspacing="0"
																						width="100%"
																					>
																						<tbody>
																							<tr>
																								<td
																									class="m_-6583894312104824909st-Spacer"
																									colspan="3"
																									height="12"
																									style="
																										border: 0;
																										margin: 0;
																										padding: 0;
																										font-size: 1px;
																										line-height: 1px;
																									"
																								>
																									<div
																										class="m_-6583894312104824909st-Spacer"
																									>
																										&nbsp;
																									</div>
																								</td>
																							</tr>
																							<tr>
																								<td
																									class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--gutter"
																									style="
																										border: 0;
																										margin: 0;
																										padding: 0;
																										font-size: 1px;
																										line-height: 1px;
																									"
																									width="16"
																								>
																									<div
																										class="m_-6583894312104824909st-Spacer"
																									>
																										&nbsp;
																									</div>
																								</td>
																								<td
																									class="m_-6583894312104824909st-Blocks-item-cell m_-6583894312104824909st-Font m_-6583894312104824909st-Font--body"
																									style="
																										border: 0;
																										margin: 0;
																										padding: 0;
																										color: #414552;
																										font-family: -apple-system,
																											'SF Pro Display',
																											'SF Pro Text',
																											'Helvetica',
																											sans-serif;
																										font-size: 16px;
																										line-height: 24px;
																									"
																								>
																									<table
																										style="
																											padding-left: 5px;
																											padding-right: 5px;
																										"
																										width="100%"
																									>
																										<tbody>
																										<tr>
																										<td
																											style="
																												border: 0;
																												border-collapse: collapse;
																												margin: 0;
																												padding: 0;
																												font-family: -apple-system,
																													BlinkMacSystemFont,
																													'Segoe UI',
																													Roboto,
																													'Helvetica Neue',
																													Ubuntu,
																													sans-serif;
																												vertical-align: middle;
																												color: #999;
																												font-size: 13px;
																												line-height: 24px;
																												width: 100%;
																											"
																										>
Room Number																										</td>
																										<td
																											width="8"
																											style="
																												border: 0;
																												border-collapse: collapse;
																												margin: 0;
																												padding: 0;
																												color: #ffffff;
																												font-size: 1px;
																												line-height: 1px;
																											"
																										>
																											&nbsp;
																										</td>
																										<td
																											align="right"
																											valign="top"
																											style="
																												border: 0;
																												border-collapse: collapse;
																												margin: 0;
																												padding: 0;
																												font-family: -apple-system,
																													BlinkMacSystemFont,
																													'Segoe UI',
																													Roboto,
																													'Helvetica Neue',
																													Ubuntu,
																													sans-serif;
																												vertical-align: middle;
																												color: #999;
																												font-size: 13px;
																												line-height: 24px;
																											"
																										>PRICE

																											
																										</td>
																									</tr>							
																										
																											<tr>
																												<td></td>
																											</tr>
																											${orderData}
																											<tr>
																											<td
																												style="
																													border: 0;
																													border-collapse: collapse;
																													margin: 0;
																													padding: 0;
																													font-family: -apple-system,
																														BlinkMacSystemFont,
																														'Segoe UI',
																														Roboto,
																														'Helvetica Neue',
																														Ubuntu,
																														sans-serif;
																													vertical-align: middle;
																													color: #525f7f;
																													font-size: 13px;
																													line-height: 24px;
																													width: 100%;
																												"
																											>
	VAT(8%)
																											</td>
																											<td
																												width="8"
																												style="
																													border: 0;
																													border-collapse: collapse;
																													margin: 0;
																													padding: 0;
																													color: #ffffff;
																													font-size: 1px;
																													line-height: 1px;
																												"
																											>
																												&nbsp;
																											</td>
																											<td
																												align="right"
																												valign="top"
																												style="
																													border: 0;
																													border-collapse: collapse;
																													margin: 0;
																													padding: 0;
																													font-family: -apple-system,
																														BlinkMacSystemFont,
																														'Segoe UI',
																														Roboto,
																														'Helvetica Neue',
																														Ubuntu,
																														sans-serif;
																													vertical-align: middle;
																													color: #525f7f;
																													font-size: 15px;
																													line-height: 24px;
																												"
																											>${new Intl.NumberFormat('vi-Vi', {
																												style: 'currency',
																												currency:
																													'VND',
																											}).format(
																												(order.price *
																													8) /
																													100,
																											)}
																												
																											</td>
																										</tr>
																											<tr>
																												<td
																													colspan="3"
																													height="6"
																													style="
																														border: 0;
																														border-collapse: collapse;
																														margin: 0;
																														padding: 0;
																														color: #ffffff;
																														font-size: 1px;
																														line-height: 1px;
																													"
																												>
																													&nbsp;
																												</td>
																											</tr>
																											<tr>
																												<td
																													colspan="3"
																													height="6"
																													style="
																														border: 0;
																														border-collapse: collapse;
																														margin: 0;
																														padding: 0;
																														color: #ffffff;
																														font-size: 1px;
																														line-height: 1px;
																													"
																												>
																													&nbsp;
																												</td>
																											</tr>
	
																											<tr>
																												<td
																													bgcolor="e6ebf1"
																													colspan="3"
																													height="1"
																													style="
																														border: 0;
																														border-collapse: collapse;
																														margin: 0;
																														padding: 0;
																														color: #ffffff;
																														font-size: 1px;
																														line-height: 1px;
																													"
																												>
																													&nbsp;
																												</td>
																											</tr>
	
																											<tr>
																												<td
																													colspan="3"
																													height="8"
																													style="
																														border: 0;
																														border-collapse: collapse;
																														margin: 0;
																														padding: 0;
																														color: #ffffff;
																														font-size: 1px;
																														line-height: 1px;
																													"
																												>
																													&nbsp;
																												</td>
																											</tr>
	
																											<tr>
																												<td
																													style="
																														border: 0;
																														border-collapse: collapse;
																														margin: 0;
																														padding: 0;
																														font-family: -apple-system,
																															BlinkMacSystemFont,
																															'Segoe UI',
																															Roboto,
																															'Helvetica Neue',
																															Ubuntu,
																															sans-serif;
																														vertical-align: middle;
																														color: #525f7f;
																														font-size: 15px;
																														line-height: 24px;
																														width: 100%;
																													"
																												>
																													<strong
																														>Amount
																														charged</strong
																													>
																												</td>
																												<td
																													width="8"
																													style="
																														border: 0;
																														border-collapse: collapse;
																														margin: 0;
																														padding: 0;
																														color: #ffffff;
																														font-size: 1px;
																														line-height: 1px;
																													"
																												>
																													&nbsp;
																												</td>
																												<td
																													align="right"
																													valign="top"
																													style="
																														border: 0;
																														border-collapse: collapse;
																														margin: 0;
																														padding: 0;
																														font-family: -apple-system,
																															BlinkMacSystemFont,
																															'Segoe UI',
																															Roboto,
																															'Helvetica Neue',
																															Ubuntu,
																															sans-serif;
																														vertical-align: middle;
																														color: #525f7f;
																														font-size: 15px;
																														line-height: 24px;
																													"
																												>
																													<strong
																														>${new Intl.NumberFormat('vi-Vi', {
																															style: 'currency',
																															currency:
																																'VND',
																														}).format(
																															order.price,
																														)}</strong
																													>
																												</td>
																											</tr>
																											<tr>
																												<td
																													colspan="3"
																													height="6"
																													style="
																														border: 0;
																														border-collapse: collapse;
																														margin: 0;
																														padding: 0;
																														color: #ffffff;
																														font-size: 1px;
																														line-height: 1px;
																													"
																												>
																													&nbsp;
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																								<td
																									class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--gutter"
																									style="
																										border: 0;
																										margin: 0;
																										padding: 0;
																										font-size: 1px;
																										line-height: 1px;
																									"
																									width="16"
																								>
																									<div
																										class="m_-6583894312104824909st-Spacer"
																									>
																										&nbsp;
																									</div>
																								</td>
																							</tr>
																							<tr>
																								<td
																									class="m_-6583894312104824909st-Spacer"
																									colspan="3"
																									height="12"
																									style="
																										border: 0;
																										margin: 0;
																										padding: 0;
																										font-size: 1px;
																										line-height: 1px;
																									"
																								>
																									<div
																										class="m_-6583894312104824909st-Spacer"
																									>
																										&nbsp;
																									</div>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--kill"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																	width="48"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer"
																	colspan="3"
																	height="24"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
	
													<table
														class="m_-6583894312104824909st-Divider m_-6583894312104824909st-Width m_-6583894312104824909st-Width--mobile"
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="600"
														style="min-width: 600px"
													>
														<tbody>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--divider"
																	colspan="3"
																	height="24"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--gutter"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																	width="48"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
																<td
																	bgcolor="#e6ebf1"
																	height="1"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--gutter"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																	width="48"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--divider"
																	colspan="3"
																	height="24"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
	
													<table
														class="m_-6583894312104824909st-Width m_-6583894312104824909st-Width--mobile"
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="600"
														style="min-width: 600px"
													>
														<tbody>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer"
																	colspan="3"
																	height="8"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--gutter"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																	width="48"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
																<td
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		color: #414552 !important;
																		font-family: -apple-system,
																			'SF Pro Display',
																			'SF Pro Text',
																			'Helvetica',
																			sans-serif;
																		font-weight: 400;
																		font-size: 16px;
																		line-height: 24px;
																	"
																>
																	If you have any
																	questions,
																	contact us at
																	<a
																		style="
																			border: 0;
																			margin: 0;
																			padding: 0;
																			color: #625afa !important;
																			font-weight: bold;
																			text-decoration: none;
																		"
																		href="mailto:servicepet88@gmail.com"
																		target="_blank"
																		>servicepet88@gmail.com</a
																	>.
																</td>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--gutter"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																	width="48"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer"
																	colspan="3"
																	height="8"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
													<table
														class="m_-6583894312104824909st-Divider m_-6583894312104824909st-Width m_-6583894312104824909st-Width--mobile"
														border="0"
														cellpadding="0"
														cellspacing="0"
														width="600"
														style="min-width: 600px"
													>
														<tbody>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--divider"
																	colspan="3"
																	height="24"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--gutter"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																	width="48"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
																<td
																	bgcolor="#e6ebf1"
																	height="1"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--gutter"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																	width="48"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
															<tr>
																<td
																	class="m_-6583894312104824909st-Spacer m_-6583894312104824909st-Spacer--divider"
																	colspan="3"
																	height="24"
																	style="
																		border: 0;
																		margin: 0;
																		padding: 0;
																		font-size: 1px;
																		line-height: 1px;
																		max-height: 1px;
																	"
																>
																	<div
																		class="m_-6583894312104824909st-Spacer"
																	>
																		&nbsp;
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
													<table
														style="
															border: 0;
															border-collapse: collapse;
															margin: 0;
															padding: 0;
															background-color: #ffffff;
														"
													>
														<tbody>
															<tr>
																<td
																	width="64"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	&nbsp;
																</td>
																<td
																	width="64"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	&nbsp;
																</td>
															</tr>
														</tbody>
													</table>
	
													<table
														width="100%"
														style="
															border: 0;
															border-collapse: collapse;
															margin: 0;
															padding: 0;
															background-color: #ffffff;
														"
													>
														<tbody>
															<tr>
																<td
																	height="20"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	&nbsp;
																</td>
															</tr>
														</tbody>
													</table>
	
													<table
														style="
															border: 0;
															border-collapse: collapse;
															margin: 0;
															padding: 0;
															background-color: #ffffff;
														"
													>
														<tbody>
															<tr>
																<td
																	width="64"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	&nbsp;
																</td>
																<td
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		width: 472px;
																		font-family: -apple-system,
																			BlinkMacSystemFont,
																			'Segoe UI',
																			Roboto,
																			'Helvetica Neue',
																			Ubuntu,
																			sans-serif;
																		vertical-align: middle;
																		color: #8898aa;
																		font-size: 12px;
																		line-height: 16px;
																	"
																>
																	You're receiving
																	this email
																	because you made
																	a purchase at
																	<span class="il"
																		>Pet88</span
																	>
																</td>
															</tr>
														</tbody>
													</table>
													<table
														width="100%"
														style="
															border: 0;
															border-collapse: collapse;
															margin: 0;
															padding: 0;
															background-color: #ffffff;
														"
													>
														<tbody>
															<tr>
																<td
																	height="20"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	&nbsp;
																</td>
															</tr>
														</tbody>
													</table>
	
													<table
														width="100%"
														style="
															border: 0;
															border-collapse: collapse;
															margin: 0;
															padding: 0;
															background-color: #ffffff;
															border-bottom-left-radius: 5px;
															border-bottom-right-radius: 5px;
														"
													>
														<tbody>
															<tr>
																<td
																	height="64"
																	style="
																		border: 0;
																		border-collapse: collapse;
																		margin: 0;
																		padding: 0;
																		color: #ffffff;
																		font-size: 1px;
																		line-height: 1px;
																	"
																>
																	&nbsp;
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
	
					<img
						alt=""
						src="https://ci3.googleusercontent.com/proxy/Or3ZXxuwPTiLpGslRvwwqqmx256jvevKr2JbScVyJ_W9eK8lwAZpQXu9M7QdIxKVK82XRruekaoeqshS4_gfyuh-uSdkPj27k8jIcbnSR1EzbzZ6nYabMHPy_DDkaPGm0vyvg-jQeVddGfBaEHiDknoMYeHAqEixPdqpWLuMao5QiPKsuQeMSume16IbzDjGS8qJFh58tIyYAurIABA6=s0-d-e1-ft#http://59.email.stripe.com/CI0/0101018474eb9832-addbd926-0ff3-47e0-a651-17f3e00cc2d7-000000/EbPbrQLPldniVFg1Di6k8nttRkE-9URk2SywUeAddg4=274"
						style="display: none; width: 1px; height: 1px"
						class="CToWUd"
						data-bit="iit"
					/>
					<div class="yj6qo"></div>
					<div class="adL"></div>
				</div>
			</div>
		</div>
	
		<div class="hi"></div>
	</div>
	
	`;
		sendNodeMail(
			{
				subject: `Pet88: Booking Success`,
				recipient: order.email,
			},
			templateEN,
		);
		res.status(200).json(order);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/cancel/:id', async (req, res) => {
	try {
		const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
			paid: 'cancel',
		});
		res.status(200).json(updateOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
