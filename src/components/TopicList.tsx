import React from 'react';
import { Topic } from '../types';
import { MockTest } from './MockTest';

interface TopicListProps {
  topics: Topic[];
  loading: boolean;
  onStartTest: (topicIndex: number) => void;
  onSubmitTest: (topicIndex: number) => void;
  onAnswerChange: (topicIndex: number, questionIndex: number, answer: string) => void;
}

export function TopicList({
  topics,
  loading,
  onStartTest,
  onSubmitTest,
  onAnswerChange,
}: TopicListProps) {
  if (loading) {
    return <div className="text-center py-4">Loading topics...</div>;
  }

  if (!topics.length) {
    return null;
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6">
      {topics.map((topic, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">{topic.name}</h3>
          
          {topic.questions.length > 0 ? (
            <MockTest
              topic={topic}
              onAnswerChange={(questionIndex, answer) => 
                onAnswerChange(index, questionIndex, answer)
              }
              onSubmit={() => onSubmitTest(index)}
            />
          ) : (
            <button
              onClick={() => onStartTest(index)}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Start Mock Test
            </button>
          )}

          {topic.score !== undefined && (
            <div className="mt-4 p-4 bg-green-50 rounded-md">
              <p className="text-green-800">
                Score: {topic.score} out of {topic.questions.length} correct!
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}