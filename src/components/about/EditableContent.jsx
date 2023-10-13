'use client';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import { useState } from 'react';
import FormAbout from '@/components/about-content/AboutContent';
import { useSession } from 'next-auth/react';
import xMark from '@/assets/svg/x-mark.svg'
import Image from 'next/image';
import { toastError, toastInfo } from '@/helpers/toast';

const EditableContent = ({ title, content, id, update}) => {
	const { data: session } = useSession();
    const [open, setOpen] = useState(false)
	const handleEditClick = () => {
        setOpen(true)
    };
	const handleRemoveClick = async()=>{
		try {
			const response = await fetch(`${process.env.API_BACKEND}about/${id}`, {
				method: "DELETE",
				mode: "cors",
				cache: "no-cache",
				credentials: "include",
				header: {"Content-Type": "application/json",},
				referrerPolicy: "no-referrer",
			})
			update()
			const message = await response.json();
			toastInfo(message.message);
		} catch (error) {
			toastError(error)
		}
	}
	return (
		<div className='Container-row-column'>
			{session?.token?.user?.role > 1 && (
				<>
					<EditIcon
						className='text-zinc-700 absolute top-1 right-1 rounded-full hover:bg-slate-400 cursor-pointer text-2xl'
						onClick={handleEditClick}
					/>
					<Image src={xMark} alt='remove' width={50} height={50} className={`absolute left-1 top-1 cursor-pointer`} onClick={handleRemoveClick}/>
					<FormAbout
						isOpen={open}
						onOpenChange={() => setOpen(false)}
						content={{ title, content, id }}
					/>
				</>
			)}
			<h3>{title}</h3>
			<p>{content}</p>
		</div>
	);
};

export default EditableContent;
