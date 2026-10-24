import { useState } from "react";
import "./index.css";

function QuizQuestion({ data, device = "small" }) {
  const [selectedOption, setSelectedOption] = useState(
    data.selectedOption || ""
  );
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className={`quiz-page quiz-${device} py-3 py-md-4`}>
      <div className="container-fluid px-3">
        <div className="row justify-content-center">
          <div className="col-12 quiz-container">
            {/* Score */}
            <p className="score-text text-end text-white fw-bold mb-2">
              {data.scoreLabel}
            </p>

            {/* Question Card */}
            <div className="question-card bg-white rounded-3 p-3 p-md-4 mb-3 mb-md-4 text-center shadow-sm">
              <h1 className="question-number h5 text-dark mb-2">
                {data.questionNumber}
              </h1>

              <p className="question-text text-dark mb-3">
                {data.question}
              </p>

              <img
                src={data.questionImage}
                alt="HTML code question"
                className="question-image img-fluid w-100 rounded-3"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Options Card */}
            <div className="options-card bg-white rounded-3 p-3 p-md-4 shadow-sm">
              <div className="d-flex flex-column gap-2">
                {data.options.map((option) => {
                  const isSelected = selectedOption === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`option-button w-100 text-start ${
                        isSelected ? "selected-option" : ""
                      }`}
                      onClick={() => {
                        setSelectedOption(option.id);
                        setSubmitted(false);
                      }}
                      aria-pressed={isSelected}
                    >
                      {option.id}. {option.text}
                    </button>
                  );
                })}
              </div>

              <div className="text-center mt-3 mt-md-4">
                <button
                  type="button"
                  className="btn submit-button px-4 py-2 rounded-3 shadow-sm"
                  onClick={() => setSubmitted(true)}
                >
                  {data.submitText}
                </button>
                {submitted && (
                  <p className={`quiz-feedback small fw-semibold mt-3 mb-0 ${selectedOption === (data.correctOption || "C") ? "text-success" : "text-danger"}`} role="status" aria-live="polite">
                    {selectedOption === (data.correctOption || "C")
                      ? (data.correctFeedback || "Correct!")
                      : (data.incorrectFeedback || "Try again.")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default QuizQuestion;
