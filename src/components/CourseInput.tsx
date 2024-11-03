import React from 'react';
import { BookOpen, Brain, GraduationCap } from 'lucide-react';
import { Level } from '../types';

interface CourseInputProps {
  courseTitle: string;
  setCourseTitle: (title: string) => void;
  level: Level;
  setLevel: (level: Level) => void;
  onGetTopics: () => void;
  loading: boolean;
}

export function CourseInput({
  courseTitle,
  setCourseTitle,
  level,
  setLevel,
  onGetTopics,
  loading,
}: CourseInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Course Title</label>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter course title..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Level</label>
        <div className="grid grid-cols-3 gap-4">
          {(['Beginner', 'Intermediate', 'Advanced'] as Level[]).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                level === l
                  ? 'bg-indigo-500 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {l === 'Beginner' && <BookOpen className="w-5 h-5" />}
              {l === 'Intermediate' && <Brain className="w-5 h-5" />}
              {l === 'Advanced' && <GraduationCap className="w-5 h-5" />}
              {l}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGetTopics}
        disabled={!courseTitle || loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? 'Generating Topics...' : 'Get Topics'}
      </button>
    </div>
  );
}