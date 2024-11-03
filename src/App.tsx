import React, { useState } from 'react';
import { CourseForm } from './components/CourseForm';
import { TopicList } from './components/TopicList';
import { getTopicsFromAI, getQuestionsFromAI, getAnswersFromAI } from './services/api';
import { CourseState, Level, Topic } from './types';

function App() {
  const [state, setState] = useState<CourseState>({
    title: '',
    level: 'Beginner',
    topics: [],
    loading: false,
    error: null,
  });

  const handleGetTopics = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const topics = await getTopicsFromAI(state.title, state.level);
      setState(prev => ({
        ...prev,
        topics: topics.map(name => ({ name, questions: [] })),
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  const handleStartTest = async (topicIndex: number) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const questions = await getQuestionsFromAI(state.topics[topicIndex].name);
      
      setState(prev => {
        const newTopics = [...prev.topics];
        newTopics[topicIndex] = {
          ...newTopics[topicIndex],
          questions,
        };
        return { ...prev, topics: newTopics, loading: false };
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  const handleAnswerChange = (topicIndex: number, questionIndex: number, answer: string) => {
    setState(prev => {
      const newTopics = [...prev.topics];
      newTopics[topicIndex].questions[questionIndex].userAnswer = answer;
      return { ...prev, topics: newTopics };
    });
  };

  const handleSubmitTest = async (topicIndex: number) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const topic = state.topics[topicIndex];
      const answers = await getAnswersFromAI(topic.questions);
      
      const score = topic.questions.reduce((acc, q, idx) => 
        q.userAnswer === answers[idx] ? acc + 1 : acc, 0);

      setState(prev => {
        const newTopics = [...prev.topics];
        newTopics[topicIndex] = {
          ...newTopics[topicIndex],
          answers,
          score,
        };
        return { ...prev, topics: newTopics, loading: false };
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Course Topic and Mock Test Generator
        </h1>

        {state.error && (
          <div className="max-w-md mx-auto mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{state.error}</p>
          </div>
        )}

        <CourseForm
          title={state.title}
          level={state.level}
          loading={state.loading}
          onTitleChange={(title) => setState(prev => ({ ...prev, title }))}
          onLevelChange={(level) => setState(prev => ({ ...prev, level }))}
          onSubmit={handleGetTopics}
        />

        <TopicList
          topics={state.topics}
          loading={state.loading}
          onStartTest={handleStartTest}
          onSubmitTest={handleSubmitTest}
          onAnswerChange={handleAnswerChange}
        />
      </div>
    </div>
  );
}

export default App;