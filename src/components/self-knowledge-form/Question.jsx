import Image from 'next/image';
import React from 'react';
import xMark from '@/assets/svg/x-mark.svg'

const Question = ({ form, setForm }) => {
	const { id, name, description, questions } = form;
  
  const deleteQuestion = (quest)=>{
    const o = form.questions.filter((question)=>{
      return quest !== question
    })
    setForm({
      ...form,
      questions: o
    })
  }
	return (
		<>
			<section className='border-large border-primary-700 rounded-sm p-6 my-5'>
				<h2>{name}</h2>
				<p>{description}</p>
				<ul className='flex flex-col gap-4 p-6 text-'>
					{questions.map((quest, index) => {
						return (
							<React.Fragment key={index}>
								<li className='bg-primary-500 p-2 cursor-pointer hover:opacity-70 flex justify-between'>{quest} <Image src={xMark} width={30} height={30} alt='x-mark' className='rounded-full hover:opacity-50' onClick={()=>{deleteQuestion(quest, id)}}  /></li>
							</React.Fragment>
						);
					})}
				</ul>
			</section>
		</>
	);
};

export default Question;
