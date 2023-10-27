export const addQuestion = (sectionName, question, form, setForm) => {
    const updatedForm = { ...form };
    const sectionIndex = form.questions.findIndex(
        section => section.name === sectionName
    );
    if (sectionIndex === -1) {
        updatedForm.questions.push(question);
    } else {
        updatedForm.questions[sectionIndex].questions.push(question);
    }
    setForm(updatedForm);
};

export const saveQuestion = (form, newQuestion, setIsAddingQuestion, setNewQuestion, setForm) => {
    if (form.name && form.description && newQuestion.length !== 0) {
        addQuestion(form.name, newQuestion, form, setForm);
        setIsAddingQuestion(false);
        setNewQuestion('');
    }
};