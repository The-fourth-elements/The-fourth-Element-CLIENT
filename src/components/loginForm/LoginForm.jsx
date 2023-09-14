import React from 'react';

export const LoginForm = () => {
	return (
		<main className='Main'>
			<form className='Main__Form'>
				<label htmlFor='email'>Email:</label>
				<input type='text' name='email' id='email' className='Main__Form--input' />
                <label htmlFor="password">Password:</label>
				<input type='text' name='password' id='password' className='Main__Form--input' />
				<button type='submit' className='Main__Form--button'>
					Submit
				</button>
			</form>
		</main>
	);
};
