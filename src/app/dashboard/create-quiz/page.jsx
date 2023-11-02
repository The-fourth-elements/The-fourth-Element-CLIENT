import QuizForm from "@/components/QuizForm/QuizForm";
import QuizRender from "@/components/QuizRender/QuizRender";
import AutoRegistro from "@/components/AutoRegistro/AutoRegistro";


const CreateQuiz = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <QuizForm update={false}/> */}
            {/* <QuizRender/> */}
            <AutoRegistro/>
        </div>
    )
}

export default CreateQuiz;