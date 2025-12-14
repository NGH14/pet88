import { useState } from 'react';

import { Avatar } from 'antd';
import axios from 'axios';

const UploadAvatarUser = ({ inputs, title }) => {
	const [file, setFile] = useState('');
	const [info, setInfo] = useState({});

	const handleChange = e => {
		setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleClick = async e => {
		e.preventDefault();
		const data = new FormData();
		data.append('file', file);
		data.append('upload_preset', 'upload');
		try {
			const uploadRes = await axios.post(
				'https://api.cloudinary.com/v1_1/lamadev/image/upload',
				data
			);

			const { url } = uploadRes.data;

			const newUser = {
				...info,
				img: url,
			};

			await axios.post('/auth/register', newUser);
		} catch (err) {
			console.log(err);
		}
	};

	console.log(info);
	return (
		<section className="new">
			<section className="newContainer">
				<section className="bottom">
					<section className="left">
						<Avatar
							src={
								file
									? URL.createObjectURL(file)
									: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
							}
							alt=""
						/>
					</section>
					<section className="right">
						<form>
							<section className="formInput">
								<label htmlFor="file">Image: </label>
								<input
									type="file"
									id="file"
									onChange={e => setFile(e.target.files[0])}
									// style={{ display: 'none' }}
								/>
							</section>

							{/* {inputs.map((input) => (
								<section className='formInput' key={input.id}>
									<label>{input.label}</label>
									<input
										onChange={handleChange}
										type={input.type}
										placeholder={input.placeholder}
										id={input.id}
									/>
								</section>
							))} */}
						</form>
					</section>
				</section>
			</section>
		</section>
	);
};

export default UploadAvatarUser;
