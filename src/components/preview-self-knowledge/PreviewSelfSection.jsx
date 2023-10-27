import { Input } from '@nextui-org/react';
import React, { useState } from 'react';

const PreviewSelfSection = ({
	data,
	answers,
	onAnswerChange,
	sectionIndex,
	render = false,
}) => {
	const { name, description, questions } = data;
	return (
		<section className='flex flex-col gap-6 w-full bg-primary-500 p-6'>
			<h5 className='text-xl text-center underline capitalize text-black'>
				{name.trim()}
			</h5>
			<p className=''>{description.trim()}</p>
			<span className='text-black'>Preguntas: </span>
			<ul className='flex flex-col'>
				{questions.map((quest, index) => {
					return (
						<React.Fragment key={index}>
							<li className='ml-4'>{quest}</li>
							{render && (
								<Input
									type='range'
									min={0}
									max={11}
									value={answers[index]}
									onChange={e =>
										onAnswerChange(sectionIndex, index, e.target.value)
									}
								/>
							)}
						</React.Fragment>
					);
				})}
			</ul>
		</section>
	);
};

export default PreviewSelfSection;
