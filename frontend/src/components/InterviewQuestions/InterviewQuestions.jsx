import "./InterviewQuestions.css";

function InterviewQuestions({ questions }) {
  return (
    <div className="questions">

      <h2>Interview Questions</h2>

      {questions.map((question, index) => (
        <div
          className="question"
          key={index}
        >
          <span>Q{index + 1}</span>

          <p>{question}</p>

        </div>
      ))}

    </div>
  );
}

export default InterviewQuestions;