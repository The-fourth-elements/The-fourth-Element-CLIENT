'use client';
import React from 'react';
import './AboutStyles.scss';
import '@/components/about-content/AboutContent';

export default function About() {
	let values = [
		{
			id: 1,
			content: 'Este es el contenido del primer objeto.',
			title: 'Título del primer objeto',
		},
		{
			id: 2,
			content: 'Este es el contenido del segundo objeto.',
			title: 'Título del segundo objeto',
		},
		{
			id: 3,
			content: 'Este es el contenido del tercer objeto.',
			title: 'Título del tercer objeto',
		},
		{
			id: 4,
			content: 'Este es el contenido del cuarto objeto.',
			title: 'Título del cuarto objeto',
		},
		{
			id: 5,
			content: 'Este es el contenido del quinto objeto.',
			title: 'Título del quinto objeto',
		},
	];
	if (values.length < 1) {
	}
	return (
		<div className='Container'>
			<h1>About us</h1>
			<div className='Container-row'>
				{values.map(({ id, content, title }) => {
					return (
						<React.Fragment key={id}>
							<div className='Container-row-column'>
								<h3>{title}</h3>
								<p>{content}</p>
							</div>
						</React.Fragment>
					);
				})}
			</div>

			<div className='Container-row'>
				<div className='Container-row-column'>
					<h3>Historia:</h3>
					<p>
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>

				<div className='Container-row-column'>
					<h3>Método:</h3>
					<p>
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>

				<div className='Container-row-column'>
					<h3>Metas:</h3>
					<p>
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>
			</div>

			<h1>Testimonios</h1>
			<div className='Container-row'>
				<div className='Container-row-column'>
					<h3>Testimonio 1:</h3>
					<p>
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>

				<div className='Container-row-column'>
					<h3>Testimonio 2:</h3>
					<p>
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>

				<div className='Container-row-column'>
					<h3>Testimonio 3:</h3>
					<p>
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>
			</div>

			{/* <Image src={aboutImg2} alt='imagen about'></Image> */}
		</div>
	);
}
