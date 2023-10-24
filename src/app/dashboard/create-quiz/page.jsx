import QuizForm from "@/components/QuizForm/QuizForm";
import QuizRender from "@/components/QuizRender/QuizRender";
import FormFrases from "@/components/FormFrases/FormFrases";

const CreateQuiz = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <QuizForm update={false}/>
        {/* <FormFrases/> */}
            {/* <QuizRender/> */}
        </div>
    )
}

export default CreateQuiz;