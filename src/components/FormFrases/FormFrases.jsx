"use client"
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";

const FormFrases = () => {
    const [title, setTitle] = useState("")
    const [fraseData, setFraseData] = useState([
        {
            frase: "",
            answer: ""
        }
    ])

    const handleTitleChange = e => {
		setTitle(e?.target?.value);
	};

    const handleFraseChange = (text, fraseIndex) => {
		const newFraseData = [...fraseData];
		newFraseData[fraseIndex].frase = text;
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
			{ frase: '', answer: ""},
		];
		setFraseData(newFraseData);
	};

    const handleSaveForm = () => {
		const theFrasesData = {
			name: title,
			frases: fraseData,
		};

		// update
		// 	? updateQuiz(questionnaireData, idQuiz)
		// 	: createQuiz(questionnaireData);
		// onClose();
        console.log(theFrasesData)
	};

    return(
        <div>
           <input placeholder="Titulo pasa los ejercicios" value={title} onChange={handleTitleChange} type="text" />
           <div  >
				{fraseData.map((frase, fraseIndex) => (
					<div key={fraseIndex}>
						<label>Frase {fraseIndex + 1}</label>
						<input
							type='text'
							placeholder='Nueva frase'
							value={frase?.frase}
							onChange={e =>
								handleFraseChange(e?.target?.value, fraseIndex)
							}
						/>
						
						<div>
							<Button
								onClick={() => handleDeleteFrase(fraseIndex)}
								className='bg-danger-400'>
								Eliminar Frase
							</Button>
						</div>
					</div>
				))}
                <Button className='p-7 mb-5 text-xl' onClick={handleAddFrase}>
				Agregar Frase
			</Button>

			<Button
				className='p-7 bg-background text-xl'
				onClick={handleSaveForm}>
				Guardar Cuestionario
			</Button>
			</div> 
            
        </div>
    )
}

export default FormFrases;