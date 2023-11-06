'use client';

import { LoginForm } from '../../components/loginForm/LoginForm';
import Register from '../../components/Register/Register';
import { useState } from 'react';
const page = () => {
	const [display, setDisplay] = useState(true);
	const toogleDisplay = () => {
		setDisplay(!display);
	};

	return (
		<>
			{!display && <Register toogleDisplay={toogleDisplay}></Register>}
			{display && <LoginForm toogleDisplay={toogleDisplay}></LoginForm>}
		</>
	);
};

export default page;
