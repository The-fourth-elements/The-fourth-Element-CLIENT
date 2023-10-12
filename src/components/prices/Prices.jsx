'use client'

import React from 'react';
import Image from 'next/image';
import Submarca5 from '@/assets/img/TFE-Submarca5.png';
import Submarca10 from '@/assets/img/TFE-Submarca10.png';
import GreenCheckmark from '@/assets/img/greenCheckmark.png';

import MercadoPago from '@/components/MercadoPago/MercadoPago';
import { Button } from '@nextui-org/react';

const PrecioCard = () => {
	return (
		<div>
			<div className='bg-gradient-to-b from-primary to-primary-600 h-full'>
				<div className='container m-auto px-6 py-20 md:px-12 lg:px-20'>
					<div className='m-auto text-center lg:w-8/12 xl:w-7/12'>
						<h2 className='text-2xl text-foreground font-bold md:text-4xl'>
							Compra el curso de The Fourth Element
						</h2>
					</div>
					<div className='mt-12 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12'>
						<div className='relative z-10 -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12'>
							<div
								aria-hidden='true'
								className='absolute top-0 w-full h-full rounded-2xl bg-white shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110'></div>
							<div className='relative p-6 space-y-6 lg:p-8'>
								<h2 className='text-3xl text-gray-700  text-center'>
									Curso completo
								</h2>
								<div>
									<div className='relative flex justify-around'>
										<div className='flex items-end'>
											<span className='text-8xl text-gray-800 font-bold leading-0'>
												9.99
											</span>
											<div className='pb-2'>
												<span className='block text-xl text-gray-800 font-bold'>
													USD
												</span>
											</div>
										</div>
									</div>
								</div>
								<ul
									role='list'
									className='w-max space-y-4 py-6 m-auto text-gray-600'>
									<li className='space-x-2 flex'>
										<span className='text-purple-500 font-semibold'>
											<Image
												src={GreenCheckmark}
												alt='green checkmark'
												className='w-5'
											/>
										</span>
										<p>10 Módulos</p>
									</li>
									<li className='space-x-2 flex'>
										<span className='text-purple-500 font-semibold'>
											<Image
												src={GreenCheckmark}
												alt='green checkmark'
												className='w-5'
											/>
										</span>
										<p>Clases On-Demand</p>
									</li>
									<li className='space-x-2 flex'>
										<span className='text-purple-500 font-semibold'>
											<Image
												src={GreenCheckmark}
												alt='green checkmark'
												className='w-5'
											/>
										</span>
										<p>Cuestionarios Autoevaluativos</p>
									</li>
								</ul>

								<button
									type='submit'
									title='Submit'
									className='block w-full py-3 px-6 text-center rounded-xl transition bg-primary hover:bg-gray-800'>
									<span className='text-white font-semibold'>
										Envíanos un email
									</span>
								</button>
							</div>
						</div>

						<div className='relative group md:w-6/12 lg:w-7/12'>
							<div
								aria-hidden='true'
								className='absolute top-0 w-full h-full rounded-2xl bg-white shadow-lg transition duration-500 group-hover:scale-105'></div>
							<div className='relative p-6 pt-16 md:p-8 md:pl-12 md:rounded-r-2xl lg:pl-20 lg:p-16'>
								<ul
									role='list'
									className='w-max space-y-4 py-6 m-auto text-gray-600'>
									<li className='space-x-2 flex'>
										<Image
											src={GreenCheckmark}
											alt='green checkmark'
											className='w-5'
										/>
										<span>First premium advantage</span>
									</li>
									<li className='space-x-2 flex'>
										<Image
											src={GreenCheckmark}
											alt='green checkmark'
											className='w-5'
										/>
										<span>First premium advantage</span>
									</li>
									<li className='space-x-2 flex'>
										<Image
											src={GreenCheckmark}
											alt='green checkmark'
											className='w-5'
										/>
										<span>First premium advantage</span>
									</li>
								</ul>
								<p className='text-gray-700'></p>
								<MercadoPago className='block w-full py-3 px-6 text-center rounded-xl transition bg-primary hover:bg-gray-800'></MercadoPago>
								<div className='mt-6 flex justify-between gap-6'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrecioCard;
