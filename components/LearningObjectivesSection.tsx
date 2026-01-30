
import React from 'react';
import { LearningObjectives } from '../types';

interface Props {
  objectives: LearningObjectives;
}

const LearningObjectivesSection: React.FC<Props> = ({ objectives }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Learning Objectives</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center">
            <span className="mr-2">🎯</span> Goals
          </h3>
          <ul className="space-y-2">
            {objectives.goals.map((goal, idx) => (
              <li key={idx} className="text-slate-600 flex items-start">
                <span className="mr-2 text-blue-400">•</span> {goal}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center">
            <span className="mr-2">⚡</span> Skill Booster
          </h3>
          <p className="text-slate-600 bg-purple-50 p-3 rounded-lg border border-purple-100">
            {objectives.skill_booster}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-emerald-600 mb-3 flex items-center">
            <span className="mr-2">📚</span> Vocabulary
          </h3>
          <ul className="space-y-2">
            {objectives.vocabulary.map((item, idx) => (
              <li key={idx} className="text-slate-600 flex items-start">
                <span className="mr-2 text-emerald-400">•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-amber-600 mb-3 flex items-center">
            <span className="mr-2">✍️</span> Grammar
          </h3>
          <ul className="space-y-2">
            {objectives.grammar.map((item, idx) => (
              <li key={idx} className="text-slate-600 flex items-start">
                <span className="mr-2 text-amber-400">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LearningObjectivesSection;
