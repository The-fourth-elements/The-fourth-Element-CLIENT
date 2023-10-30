"use client"
import { useState, useEffect } from "react";
import { useExcersices } from "@/zustand/store/ExcersicesStore";
import { Button, useDisclosure, Select, SelectItem, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import "./FormFrases.scss"
import { useModulesStore } from "@/zustand/store/modulesStore";
import CustomModal from "@/helpers/CustomModal";
import { useRouter, usePathname} from "next/navigation";


const FormFrases = ({isOpen, handleFrasesModal, ...props}) => {
	const {createExcersice, createOnlyExcersice} = useExcersices()
	const { onOpen, onOpenChange } = useDisclosure();
	const {modules, getModules} = useModulesStore()
    const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
    const [fraseData, setFraseData] = useState([""
    ])
	const [moduleId, setModuleId] = useState("")

	const router =useRouter()
	const pathname = usePathname()

	useEffect(() => {
		getModules()
	}, [])
    const handleTitleChange = e => {
		setTitle(e?.target?.value);
	};

	const handleDescriptionChange = e => {
		setDescription(e?.target?.value);
	}

	const handleSelect = (e) => {
		setModuleId(e?.target?.value)
	}
 
    const handleFraseChange = (text, fraseIndex) => {
		const newFraseData = [...fraseData];
		newFraseData[fraseIndex] = text;
		setFraseData(newFraseData);
	};

    const handleDeleteFrase = fraseIndex => {
		const newFraseData = [...fraseData];
		newFraseData.splice(fraseIndex, 1);
		setFraseData(newFraseData);
	};
    const handleAddFrase = () => {
		const newFraseData = [
			...fraseData,
			""
		];
		setFraseData(newFraseData);
	};

    const handleSaveForm = () => {
		
		const filteredFraseData = fraseData.filter((frase) => frase !== "" )
		const theFrasesData = {
			name: title,
			description,
			questions: filteredFraseData,
			moduleId
		};
        createExcersice(theFrasesData)
		// console.log(theFrasesData)

	};

	const handleSaveOnlyForm = () => {
		
		const filteredFraseData = fraseData.filter((frase) => frase !== "" )
		const theFrasesData = {
			name: title,
			description,
			questions: filteredFraseData,
			
		};
        createOnlyExcersice(theFrasesData)
		handleFrasesModal()
		// console.log(theFrasesData)

	};

	const handleRouteChange = () => {
		router.push('/dashboard/module/create');
	}

    return(
		// <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
		// <ModalContent>
		// 	{(handleFrasesModal) => (
		// 	<ModalBody>
		pathname === "/dashboard/create-excersice" ? (!Array.isArray(modules) || modules?.length === 0 ?
		(
			<CustomModal
				isOpen={true}
				title='No hay módulos creados'
				content='Rediríjase a la creación de modulos'
				actions={[
					<Button autoFocus onClick={handleRouteChange}>
						Confirmar
					</Button>,
				]}
			/>
		)
		:
			(<article className="mainFrasesRender">
				<h1>Crear Ejercicio</h1>
			<input className="titleInput" placeholder="Titulo pasa los ejercicios" value={title} onChange={handleTitleChange} type="text" />
			<input className="descriptionInput" type="text" placeholder="Description" value={description} onChange={handleDescriptionChange}/>
			<section className="sectionFrases" >
					{fraseData.map((frase, fraseIndex) => (
						<div className="divFrase" key={fraseIndex}>
							<label>Frase {fraseIndex + 1}</label>
							<input
								type='text'
								placeholder='Nueva frase'
								value={frase}
								onChange={e =>
									handleFraseChange(e?.target?.value, fraseIndex)
								}
							/>
							
								<Button
									onClick={() => handleDeleteFrase(fraseIndex)}
									className='bg-danger-400 deleteButton'>
									Eliminar Frase
								</Button>
						</div>
					))}
					<div className='createExcersice'>
					<Button className='p-7 mb-5 text-xl addFrase' onClick={handleAddFrase}>
					Agregar Frase
				</Button>
				<Select
					label='Modulos'
					placeholder='Seleccione un modulo'
					className='md:max-w-[12rem] max-w-xs '
					onChange={handleSelect}>
					{modules.length > 0 &&
						modules.map(modulo => (
							<SelectItem key={modulo._id} value={modulo._id}>
								{modulo.name}
							</SelectItem>
									))}
				</Select>
				</div>
				<Button
					className='p-7 bg-background text-xl saveExcersice'
					onClick={handleSaveForm}>
					Guardar Ejercicio
				</Button>
				</section> 
				
			</article>)
		//  	</ModalBody>)}
		// </ModalContent>
		// </Modal>
    )
	:
	<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'
	size='5xl'
	scrollBehavior="inside"
	>
		<ModalContent>
			{(onClose) => (
			<ModalBody className="mainFrasesRender">
		<article className="mainFrasesRender">
		<h1>Crear Ejercicio</h1>
	<input className="titleInput" placeholder="Titulo pasa los ejercicios" value={title} onChange={handleTitleChange} type="text" />
	<input className="descriptionInput" type="text" placeholder="Description" value={description} onChange={handleDescriptionChange}/>
	<section className="sectionFrases" >
			{fraseData.map((frase, fraseIndex) => (
				<div className="divFrase" key={fraseIndex}>
					<label>Frase {fraseIndex + 1}</label>
					<input
						type='text'
						placeholder='Nueva frase'
						value={frase}
						onChange={e =>
							handleFraseChange(e?.target?.value, fraseIndex)
						}
					/>
					
						<Button
							onClick={() => handleDeleteFrase(fraseIndex)}
							className='bg-danger-400 deleteButton'>
							Eliminar Frase
						</Button>
				</div>
			))}
			<Button className='p-7 mb-5 text-xl addFrase' onClick={handleAddFrase}>
			Agregar Frase
		</Button>
		<div>
		<Button
			className='p-7 bg-background text-xl saveExcersice'
			onClick={handleSaveOnlyForm}>
			Guardar Ejercicio
		</Button>
		<Button
		className='bg-danger-400 deleteButton'
		onClick={handleFrasesModal}>
			Cancelar
		</Button>
		</div>
		</section> 
		
	</article>
  	</ModalBody>)}
 </ModalContent>
 </Modal>
	)
}

export default FormFrases;