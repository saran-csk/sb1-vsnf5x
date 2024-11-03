import React from 'react';
import { Level } from '../types';

interface CourseFormProps {
  title: string;
  level: Level;
  loading: boolean;
  onTitleChange: (title: string) => void;
  onLevelChange: (level: Level) => void;
  onSubmit: () => void;
}

export function CourseForm({ 
  title, 
  level, 
  loading, 
  onTitleChange, 
  onLevelChange, 
  onSubmit 
}: CourseFormProps) {
  const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">
          Course Title
        </label>
        <input
          id="courseTitle"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter course title"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="level" className="block text-sm font-medium text-gray-700">
          Level
        </label>
        <select
          id="level"
          value={level}
          onChange={(e) => onLevelChange(e.target.value as Level)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={loading}
        >
          {levels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onSubmit}
        disabled={!title || loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Get Topics'}
      </button>
    </div>
  );
}