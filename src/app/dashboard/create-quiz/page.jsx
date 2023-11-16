import QuizForm from "@/components/QuizForm/QuizForm";

const CreateQuiz = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <QuizForm update={false}/>
        </div>
    )
}

export default CreateQuiz;