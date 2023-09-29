'use client';

import { LoginForm } from '../../components/loginForm/LoginForm';
import Register from '../../components/Register/Register';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { setCookie } from 'cookies-next';

const page = () => {
	const { data: session } = useSession();
	const id = session?.token?.user?.id;
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
	}
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
