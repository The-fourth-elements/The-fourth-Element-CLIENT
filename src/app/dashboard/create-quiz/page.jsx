import QuizForm from "@/components/QuizForm/QuizForm";
import RenderAutoRegistro from "@/components/AutoRegistroRender/AutoRegistroRender";

const CreateQuiz = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <QuizForm update={false}/> */}
        <RenderAutoRegistro/>
        </div>
    )
}

export default CreateQuiz;