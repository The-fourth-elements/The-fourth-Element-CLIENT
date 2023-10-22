'use client'

import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ModuleClasses from '../moduleClasses/ModuleClasses';


function Categories({idModule}) {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState(false);
	const [content, setContent] = useState(false);



	function handleGoToClasses() {
		setContent(<ModuleClasses idModule={idModule}/>);
		setSelectedCategory(true)
	}

	function handleGoToExercises() {
		setContent(<div>ejercicios</div>);
		setSelectedCategory(true)

	}

	function handleGoToMeditation() {
		setContent(<div>meditacion</div>);

		setSelectedCategory(true)

	}

	// Renderizado condicional de componentes basado en la categoría seleccionada

	return (
		<div>
			{!selectedCategory ? (
				<div>
					<Button onClick={handleGoToClasses}>Clases</Button>
					<Button onClick={handleGoToExercises}>Ejercicios</Button>
					<Button onClick={handleGoToMeditation}>Meditaciónaaaaaa</Button>
				</div>
			) : (
				content
			)}
		</div>
	);
}

export default Categories;
