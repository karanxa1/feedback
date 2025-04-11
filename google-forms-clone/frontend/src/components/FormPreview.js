javascriptreact
import React from 'react';

const FormPreview = ({ form }) => {
  if (!form || !form.questions) {
    return <p>No form data available.</p>;
  }

  return (
    <div>
      <h2>{form.title}</h2>
      {form.description && <p>{form.description}</p>}

      {form.questions.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <label>{question.text}</label>
          {question.type === 'text' && (
            <input type="text" className="form-control" />
          )}
          {question.type === 'multiple_choice' && (
            <select className="form-control">
              {question.options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          )}
          {question.type === 'checkbox' && (
            <div>
              {question.options.map((option, i) => (
                <div key={i} className="form-check">
                  <input type="checkbox" className="form-check-input" value={option} />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>
          )}
          {/* Add other question types as needed */}
        </div>
      ))}
    </div>
  );
};

export default FormPreview;