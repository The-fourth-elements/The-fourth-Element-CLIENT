'use client';
import React, { useEffect, useState } from 'react';
import './AboutStyles.scss';
import EditableContent from './EditableContent';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import addIcon from '@/assets/svg/add-icon.svg';
import { useDisclosure } from '@nextui-org/react';
import AboutContent from '../about-content/AboutContent';
import useFetch from '@/hooks/useFetch';
import { useContent } from '@/zustand/store/updateContent';

export default function About() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const { data: session } = useSession();
	const { abouts, getAllAbouts } = useContent()

	const handleCreateContent = () => {
	  onOpen();
	};
  
	const { data, error, isLoading } = useFetch(`${process.env.API_BACKEND}about`);
  
	useEffect(() => {
		getAllAbouts()
	}, []);
  
	return (
		<div className='Container'>
			{!isLoading ? (
        <>
          <h1>About us</h1>
          <div className='Container-row'>
            {abouts?.map(({ _id, content, title }) => (
              <React.Fragment key={_id}>
                <EditableContent content={content} title={title} id={_id} update={getAllAbouts}/>
              </React.Fragment>
            ))}
            {abouts?.length < 10 && session?.token?.user?.role >= 2 && (
              <>
                <div className='Container-row-column' onClick={handleCreateContent}>
                  <h3>Agregar más contenido</h3>
                  <Image src={addIcon} alt='addIcon' width={50} height={50} />
                </div>
                <AboutContent isOpen={isOpen} onOpenChange={onOpenChange} />
              </>
            )}
          </div>

          <h1>Testimonios</h1>
          <div className='Container-row'>
            <div className='Container-row-column'>
              <h3>Testimonio 1:</h3>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </p>
            </div>

            <div className='Container-row-column'>
              <h3>Testimonio 2:</h3>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </p>
            </div>

            <div className='Container-row-column'>
              <h3>Testimonio 3:</h3>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Cargando datos</h1>
        </>
      )}
    </div>
  );
}

