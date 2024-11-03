import React from 'react';
import { Topic } from '../types';

interface MockTestProps {
  topic: Topic;
  onAnswerChange: (questionIndex: number, answer: string) => void;
  onSubmit: () => void;
}

export function MockTest({ topic, onAnswerChange, onSubmit }: MockTestProps) {
  return (
    <div className="space-y-8">
      {topic.questions.map((question, index) => (
        <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="font-medium text-lg">{`${index + 1}. ${question.text}`}</div>
          <div className="grid grid-cols-1 gap-2">
            {question.options.map((option) => (
              <button
                key={option.label}
                onClick={() => onAnswerChange(index, option.label)}
                className={`p-3 rounded-md text-left ${
                  question.userAnswer === option.label
                    ? 'bg-indigo-100 border-2 border-indigo-500'
                    : 'bg-white border border-gray-300 hover:border-indigo-500'
                }`}
              >
                <span className="font-medium mr-2">{option.label})</span>
                {option.text}
              </button>
            ))}
          </div>
          {topic.answers && (
            <div className={`mt-2 p-2 rounded ${
              topic.answers[index] === question.userAnswer
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {topic.answers[index] === question.userAnswer
                ? '✓ Correct!'
                : `✗ Incorrect. The correct answer was ${topic.answers[index]}`}
            </div>
          )}
        </div>
      ))}

      {!topic.answers && (
        <button
          onClick={onSubmit}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Submit Answers
        </button>
      )}
    </div>
  );
}