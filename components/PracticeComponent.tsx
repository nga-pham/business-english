
import React, { useState } from 'react';
import { Practice } from '../types';

interface Props {
  practice: Practice;
  correctAnswers?: string[];
}

const PracticeComponent: React.FC<Props> = ({ practice, correctAnswers = [] }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const hasAnswers = correctAnswers.length > 0;

  const handleInputChange = (index: number, value: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setUserAnswers({});
  };

  const isCorrect = (index: number) => {
    if (!hasAnswers) return null;
    const userVal = userAnswers[index]?.trim().toLowerCase();
    const rawCorrectVal = correctAnswers[index];
    
    if (!rawCorrectVal) return false;

    // If there are multiple valid answers separated by '/', split and check against each
    const possibleAnswers = rawCorrectVal.split('/').map(ans => ans.trim().toLowerCase());
    
    return possibleAnswers.includes(userVal);
  };

  // Track the global index of placeholders across all lines
  let globalPlaceholderIndex = 0;

  const renderContentLine = (line: string) => {
    const placeholderRegex = /(\d+\.\.\.(?:\s*\(.*?\))?|\.\.\.(?:\s*\(.*?\))?)/g;
    const parts = line.split(placeholderRegex);
    
    return parts.map((part, i) => {
      const matchExplicit = part.match(/(\d+)\.\.\.(?:\s*\((.*?)\))?/);
      const matchImplicit = part.match(/\.\.\.(?:\s*\((.*?)\))?/);
      
      const match = matchExplicit || matchImplicit;
      
      if (match) {
        const explicitNum = matchExplicit ? parseInt(matchExplicit[1]) : null;
        const currentIndex = explicitNum !== null ? explicitNum - 1 : globalPlaceholderIndex;
        const hint = matchExplicit ? matchExplicit[2] : matchImplicit?.[1];

        if (explicitNum === null) {
          globalPlaceholderIndex++;
        } else {
          globalPlaceholderIndex = Math.max(globalPlaceholderIndex, explicitNum);
        }

        const inputStatus = isCorrect(currentIndex);

        if (practice.options) {
          // Check if options have long text to decide on width
          const hasLongOptions = Object.values(practice.options).some(opt => opt.length > 30);

          return (
            <span key={i} className={`inline-flex flex-col items-start mx-1 my-1 ${hasLongOptions ? 'w-full' : ''}`}>
              {explicitNum !== null && <span className="text-xs font-bold text-slate-400 mb-1">Turn {explicitNum}</span>}
              <select
                disabled={submitted}
                value={userAnswers[currentIndex] || ""}
                onChange={(e) => handleInputChange(currentIndex, e.target.value)}
                className={`border rounded px-2 py-2 text-sm outline-none transition-all w-full
                  ${submitted && hasAnswers
                    ? (inputStatus ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800')
                    : 'bg-white border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  } ${submitted && !hasAnswers ? 'bg-slate-50 border-slate-200 text-slate-500' : ''}`}
              >
                <option value="">-- Choose a sentence --</option>
                {Object.entries(practice.options).map(([key, label]) => (
                  <option key={key} value={key}>
                    {key.toUpperCase()}: {label}
                  </option>
                ))}
              </select>
              {submitted && hasAnswers && !inputStatus && (
                <span className="text-[10px] font-bold text-green-700 mt-1 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                  Correct: {correctAnswers[currentIndex]?.toUpperCase()}
                </span>
              )}
            </span>
          );
        } else {
          return (
            <span key={i} className="inline-flex flex-col items-start mx-1 my-1 min-w-[150px] flex-grow max-w-md">
              <input
                type="text"
                disabled={submitted}
                placeholder={hint ? `(${hint})` : "Type answer..."}
                value={userAnswers[currentIndex] || ""}
                onChange={(e) => handleInputChange(currentIndex, e.target.value)}
                className={`border rounded px-2 py-1 text-sm w-full outline-none transition-all
                  ${submitted && hasAnswers
                    ? (inputStatus ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800')
                    : 'bg-white border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  } ${submitted && !hasAnswers ? 'bg-slate-50 border-slate-200 text-slate-500' : ''}`}
              />
              {submitted && hasAnswers && !inputStatus && (
                <span className="text-[10px] font-bold text-green-700 mt-0.5">Ans: {correctAnswers[currentIndex]}</span>
              )}
            </span>
          );
        }
      }
      return <span key={i}>{part}</span>;
    });
  };

  const calculateScore = () => {
    let score = 0;
    correctAnswers.forEach((_, idx) => {
      if (isCorrect(idx)) score++;
    });
    return score;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Instructions</h3>
        <p className="text-slate-600 italic">{practice.instruction}</p>
      </div>

      {/* Sentence Bank moved here, BEFORE the content questions */}
      {practice.options && (
        <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-inner">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center">
            <span className="mr-2">🗂️</span> Sentence Bank
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(practice.options).map(([key, label]) => (
              <div key={key} className="text-sm text-slate-600 flex items-start bg-white p-3 rounded border border-slate-100 shadow-sm">
                <span className="font-bold text-blue-600 w-6 flex-shrink-0">{key.toUpperCase()}.</span> 
                <span className="flex-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 mb-10 text-slate-700 leading-relaxed text-lg">
        {practice.content.map((line, idx) => (
          <div key={idx} className="flex flex-wrap items-center">
            {renderContentLine(line)}
          </div>
        ))}
      </div>

      {submitted && hasAnswers && (
        <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between animate-fadeIn">
          <div>
            <span className="text-blue-800 font-bold text-lg">Your Score: {calculateScore()} / {correctAnswers.length}</span>
            <p className="text-blue-600 text-sm">
              {calculateScore() === correctAnswers.length 
                ? "Perfect score! Well done!" 
                : "Good attempt! Review the correct answers above."}
            </p>
          </div>
          <button 
            onClick={handleRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            Retry
          </button>
        </div>
      )}

      {submitted && !hasAnswers && (
        <div className="mb-6 p-6 rounded-xl bg-green-50 border border-green-200 text-center animate-fadeIn">
          <span className="text-2xl mb-2 block">🎉</span>
          <h4 className="text-green-800 font-bold text-xl">Congratulation!</h4>
          <p className="text-green-600 font-medium">You have finished the test</p>
          <button 
            onClick={handleRetry}
            className="mt-4 px-4 py-1.5 text-sm text-green-700 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {!submitted && (
        <div className="flex justify-end">
          <button 
            onClick={handleSubmit}
            className={`px-8 py-3 text-white rounded-lg transition-all font-bold shadow-lg transform active:scale-95 ${
              hasAnswers ? 'bg-slate-800 hover:bg-slate-900' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {hasAnswers ? "Submit Answers" : "Finish"}
          </button>
        </div>
      )}

      {submitted && hasAnswers && (
        <div className="mt-8 border-t border-slate-100 pt-6 animate-fadeIn">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center">
            <span className="mr-2">📝</span> Answer Key
          </h4>
          <div className="flex flex-wrap gap-3">
            {correctAnswers.map((ans, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 px-3 py-1 rounded text-sm">
                <span className="font-bold text-slate-400 mr-1">{idx + 1}.</span>
                <span className="text-slate-800 font-medium">{practice.options ? ans.toUpperCase() : ans}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeComponent;
