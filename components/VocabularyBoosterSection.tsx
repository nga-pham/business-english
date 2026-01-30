
import React from 'react';
import { VocabularyItem } from '../types';

interface Props {
  vocabulary: VocabularyItem[];
}

const VocabularyBoosterSection: React.FC<Props> = ({ vocabulary }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <span className="mr-3 text-blue-600">🚀</span> Vocabulary Booster
      </h2>
      <p className="text-slate-500 mb-8">Master these key terms and phrases commonly used in professional contexts.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vocabulary.map((item, idx) => (
          <div 
            key={idx} 
            className="p-5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-1">{item.word}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{item.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabularyBoosterSection;
