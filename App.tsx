
import React, { useState } from 'react';
import { LESSONS } from './data';
import { Lesson } from './types';
import LearningObjectivesSection from './components/LearningObjectivesSection';
import PracticeComponent from './components/PracticeComponent';
import VocabularyBoosterSection from './components/VocabularyBoosterSection';

const App: React.FC = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0); // 0 = Objectives, 1 = Vocab, 2...n = Practices  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const navigateToHome = () => {
    setCurrentLessonIndex(null);
    setActiveTab(0);
  };

  const navigateToLesson = (index: number) => {
    setCurrentLessonIndex(index);
    setActiveTab(0);
  };

  if (currentLessonIndex !== null) {
    const lesson = LESSONS[currentLessonIndex];
     const hasAudio = !!lesson.audio;
    const tabs = [
      'Learning Objectives', 
      'Vocabulary Booster',
      ...(hasAudio ? ['Audio'] : []),
      ...lesson.practices.map((_, i) => `Practice ${i + 1}`)
    ];

    return (
      <div className="min-h-screen flex flex-col">
        {/* Navigation Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <button 
              onClick={navigateToHome}
              className="flex items-center text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              <span className="mr-2">←</span> Back to Lessons
            </button>
            <h1 className="text-xl font-bold text-slate-800 truncate px-4">{lesson.lesson_title}</h1>
            <div className="w-24"></div> {/* Spacer */}
          </div>
        </header>

        <main className="flex-1 py-8 px-4 max-w-6xl mx-auto w-full">
          {/* Tabs UI */}
          <div className="flex border-b border-slate-200 mb-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === idx 
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

{/*           <div className="animate-fadeIn">
            {activeTab === 0 && (
              <LearningObjectivesSection objectives={lesson.learning_objectives} />
            )}
            {activeTab === 1 && (
              <VocabularyBoosterSection vocabulary={lesson.vocabulary_booster} />
            )}
            {activeTab > 1 && (
              <PracticeComponent 
                practice={lesson.practices[activeTab - 2]} 
                correctAnswers={lesson.practices[activeTab - 2].answers}
              />
            )}
          </div> */}
          <div className="animate-fadeIn">
            {tabs[activeTab] === 'Learning Objectives' && (
              <LearningObjectivesSection objectives={lesson.learning_objectives} />
            )}
            {tabs[activeTab] === 'Vocabulary Booster' && (
              <VocabularyBoosterSection vocabulary={lesson.vocabulary_booster} />
            )}
            {hasAudio && tabs[activeTab] === 'Audio' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <span className="bg-blue-600 w-2 h-8 rounded-full mr-3"></span>
                  Lesson Audio
                </h2>
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner">
                   <iframe 
                     src={lesson.audio} 
                     className="w-full h-full" 
                     allow="autoplay"
                     title="Lesson Audio"
                   ></iframe>
                </div>
                <div className="mt-8 flex flex-col items-center text-center">
                  <p className="text-slate-500 mb-6 max-w-md">
                    Listen to the audio recording for this lesson. You can also open it in a new tab for a better experience.
                  </p>
                  <a 
                    href={lesson.audio?.replace('/preview', '/view')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95"
                  >
                    <span className="mr-2">🔊</span> Open Audio in New Tab
                  </a>
                </div>
              </div>
            )}
            {tabs[activeTab].startsWith('Practice') && (
              <PracticeComponent 
                practice={lesson.practices[parseInt(tabs[activeTab].split(' ')[1]) - 1]} 
                correctAnswers={lesson.practices[parseInt(tabs[activeTab].split(' ')[1]) - 1].answers}
              />
            )}
          </div>
        </main>

        <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Nancy English Services. Professional English Learning Platform.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Landing Header */}
      <div className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Master Business English</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Practical skills for global professionals. Improve your vocabulary, grammar, and 
            business manners with our interactive real-world simulations.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Course Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LESSONS.map((lesson, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group flex flex-col"
              onClick={() => navigateToLesson(idx)}
            >
              <div className="h-40 bg-slate-100 relative overflow-hidden">
                <img 
                  src={lesson.imageSrc || `https://picsum.photos/seed/${idx + 10}/800/400`} 
                  alt={lesson.lesson_title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded uppercase tracking-wider">
                    Lesson {idx + 1}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {lesson.lesson_title}
                </h3>
                <div className="space-y-2 mb-6">
                  <p className="text-slate-500 text-sm line-clamp-2">
                    {lesson.learning_objectives.goals[0]} and more...
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between text-slate-400 text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center"><span className="mr-1">📚</span> {lesson.practices.length} Tasks</span>
                    <span className="flex items-center"><span className="mr-1">🎓</span> {lesson.learning_objectives.skill_booster}</span>
                  </div>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
