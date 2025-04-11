import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const QuestionTypes = {
  TEXT_INPUT: 'text_input',
  MULTIPLE_CHOICE: 'multiple_choice',
  // Add more types as needed
};

const initialQuestions = [];

const FormBuilder = () => {
  const [questions, setQuestions] = useState(initialQuestions);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now().toString(), // Unique ID
      type,
      label: `New ${type.replace('_', ' ')} Question`,
      // Add more properties specific to the question type if needed.
    };
    setQuestions([...questions, newQuestion]);
  };

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case QuestionTypes.TEXT_INPUT:
        return (
          <div>
            <label>{question.label}:</label>
            <input type="text" />
          </div>
        );
      case QuestionTypes.MULTIPLE_CHOICE:
        return (
          <div>
            <label>{question.label}:</label>
            {/* Add multiple choice options here */}
          </div>
        );
      default:
        return <div>Unknown Question Type</div>;
    }
  };

  return (
    <div>
      <h2>Form Builder</h2>

      <div className="question-palette">
        <button onClick={() => addQuestion(QuestionTypes.TEXT_INPUT)}>Add Text Input</button>
        <button onClick={() => addQuestion(QuestionTypes.MULTIPLE_CHOICE)}>Add Multiple Choice</button>
        {/* Add buttons for other question types */}
      </div>

      <DragDropContext  onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable key={question.id} draggableId={question.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: 16,
                        margin: '0 0 8px 0',
                        minHeight: '50px',
                        backgroundColor: 'lightblue',
                        ...provided.draggableProps.style,
                      }}
                    >
                      {renderQuestion(question, index)}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FormBuilder;