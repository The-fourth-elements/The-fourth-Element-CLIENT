import QuizForm from "@/components/QuizForm/QuizForm";
import QuizRender from "@/components/QuizRender/QuizRender";

const CreateQuiz = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <QuizForm/>
            {/* <QuizRender/> */}
        </div>
    )
}

export default CreateQuiz;