import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import useSound from './hooks/useSound';

// Typing texts organized by mode
type Mode = 'english' | 'vietnamese';
type GameMode = 'precision' | 'speed';

const TEXTS: Record<Mode, string[]> = {
  english: [
  // Classic quotes
  "The quick brown fox jumps over the lazy dog while the sun shines brightly in the clear blue sky",
  "To be or not to be, that is the question whether it is nobler in the mind to suffer the slings and arrows",
  "In three words I can sum up everything I have learned about life: it goes on, no matter what happens",
  "The only way to do great work is to love what you do and put your heart into every single detail",
  "Success is not final, failure is not fatal, it is the courage to continue that counts in this journey",
  "The future belongs to those who believe in the beauty of their dreams and work hard to achieve them",
  "Be yourself because everyone else is already taken and your uniqueness is what makes you special",
  "Life is what happens when you are busy making other plans, so enjoy every moment while you can",
  
  // Programming and technology
  "Programming is not about what you know, it is about what you can figure out and create with determination",
  "Technology has revolutionized the way we live, work, and communicate with each other across the globe",
  "The art of writing code is similar to composing music, both require creativity, precision, and passion",
  "Every expert was once a beginner who never gave up on their dreams and continued to learn every day",
  "Debugging is like being a detective in a mystery story, piecing clues together until the problem is solved",
  "Code is poetry written in a language that machines can understand and execute with perfect precision",
  "The best error message is the one that never shows up because the code was written correctly from the start",
  "Good programmers write code that humans can understand, not just machines, making maintenance much easier",
  "Testing leads to failure, and failure leads to understanding, which ultimately leads to better software",
  "There are only two hard things in computer science: cache invalidation and naming things properly",
  
  // Wisdom and motivation
  "The journey of a thousand miles begins with a single step, so start today and never look back",
  "In the world of possibilities, your imagination is the only limitation to what you can achieve today",
  "Success is the sum of small efforts repeated day in and day out without fail or hesitation",
  "Your time is limited so don't waste it living someone else's life, make your own path instead",
  "The only impossible journey is the one you never start, so take that first step right now",
  "Believe you can and you are halfway there because confidence is the foundation of all achievement",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us",
  "The difference between ordinary and extraordinary is that little extra effort you put into everything",
  "Don't watch the clock, do what it does and keep going forward without stopping or looking back",
  "Opportunities don't happen, you create them through hard work, dedication, and perseverance",
  
  // Literature and famous works
  "It was the best of times, it was the worst of times, it was the age of wisdom and foolishness",
  "Call me Ishmael, some years ago never mind how long precisely having little money in my purse",
  "All happy families are alike but each unhappy family is unhappy in its own unique way",
  "It is a truth universally acknowledged that a single man in possession of good fortune must want a wife",
  "The past is never dead, it is not even past, it lives with us in every moment of our lives",
  "In a hole in the ground there lived a hobbit not a nasty dirty wet hole filled with worms",
  "Whether I shall turn out to be the hero of my own life these pages must show to the reader",
  "Happy families are all alike but every unhappy family is unhappy in its own special way",
  
  // Science and nature
  "The universe is under no obligation to make sense to you but that should not stop us from trying to understand",
  "Science is not only a disciple of reason but also one of romance and passion for discovery",
  "The most beautiful thing we can experience is the mysterious because it is the source of all true art",
  "Look deep into nature and then you will understand everything better through careful observation",
  "Two things are infinite: the universe and human stupidity, and I am not sure about the universe",
  "The important thing is not to stop questioning because curiosity has its own reason for existence",
  "Somewhere something incredible is waiting to be known if we just keep searching and never give up",
  "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood were made in collapsing stars",
  "We are all connected to each other biologically, to the earth chemically, and to the universe atomically",
  "For every action there is an equal and opposite reaction as described by Newton's third law of motion",
  
  // Philosophy and deep thoughts
  "I think therefore I am, the fundamental principle that proves our own existence through thought",
  "The unexamined life is not worth living according to Socrates who valued wisdom above all else",
  "We are what we repeatedly do and excellence then is not an act but a habit we cultivate daily",
  "To know that we know what we know and to know that we do not know what we do not know is wisdom",
  "The only true wisdom is in knowing you know nothing, a paradox that reveals the limits of knowledge",
  "Man is condemned to be free because once thrown into the world he is responsible for everything he does",
  "The cave you fear to enter holds the treasure you seek, so face your fears with courage and determination",
  "Everything flows and nothing stays still, you cannot step into the same river twice in life",
  
  // Business and success
  "Your work is going to fill a large part of your life and the only way to be satisfied is to do great work",
  "The best time to plant a tree was twenty years ago and the second best time is right now",
  "Innovation distinguishes between a leader and a follower in any industry or field of work",
  "The way to get started is to quit talking and begin doing what you have been planning all along",
  "If you are not willing to risk the usual you will have to settle for the ordinary life forever",
  "Success is walking from failure to failure with no loss of enthusiasm or determination to succeed",
  "The secret of change is to focus all of your energy not on fighting the old but building the new",
  "Do not be afraid to give up the good to go for the great opportunities that come your way",
  
  // Modern life and social commentary
  "We live in a society exquisitely dependent on science and technology in which hardly anyone knows anything about them",
  "The Internet is becoming the town square for the global village of tomorrow where everyone can meet",
  "Social media has given us the amazing power to be heard but also the responsibility to listen carefully",
  "In the digital age information is abundant but attention is scarce, so we must choose wisely what to focus on",
  "The pace of change has never been this fast yet it will never be this slow again in our lifetimes",
  "We shape our tools and thereafter our tools shape us in ways we cannot always predict or control",
  "The real problem of humanity is we have paleolithic emotions, medieval institutions, and godlike technology",
  "Technology is best when it brings people together and helps us connect in meaningful ways",
  
  // Education and learning
  "Education is the most powerful weapon which you can use to change the world for the better",
  "The beautiful thing about learning is that no one can take it away from you once you have it",
  "Learning is not attained by chance it must be sought for with ardor and diligence throughout life",
  "The more that you read the more things you will know and the more you learn the more places you will go",
  "An investment in knowledge pays the best interest of all possible investments you can make",
  "Live as if you were to die tomorrow and learn as if you were to live forever with endless curiosity",
  "Tell me and I forget, teach me and I may remember, involve me and I learn the lesson well",
  "The capacity to learn is a gift, the ability to learn is a skill, and the willingness to learn is a choice",
  
  // Creativity and art
  "Creativity is intelligence having fun and expressing itself in unique and interesting ways",
  "Every artist was first an amateur who dared to start and kept practicing until mastery was achieved",
  "Art is not what you see but what you make others see through your unique vision and perspective",
  "The purpose of art is washing the dust of daily life off our souls and refreshing our spirits",
  "Imagination is more important than knowledge because knowledge is limited while imagination embraces the entire world",
  "Creativity takes courage to express yourself authentically and share your vision with the world",
  "The artist is nothing without the gift but the gift is nothing without work, dedication, and practice",
  "To practice any art no matter how well or badly is a way to make your soul grow for heaven's sake",
  
  // Time and life perspective
  "Time is what we want most but what we use worst because we often waste it on trivial matters",
  "Yesterday is history, tomorrow is a mystery, but today is a gift which is why we call it the present",
  "Lost time is never found again so make the most of every moment you are given in this life",
  "The two most important days in your life are the day you are born and the day you find out why",
  "Life is not measured by the number of breaths we take but by the moments that take our breath away",
  "Time flies over us but leaves its shadow behind in the form of memories and experiences we cherish",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment always",
  "Life can only be understood backwards but it must be lived forwards with hope and determination",
  
  // Perseverance and resilience
  "Fall seven times and stand up eight because resilience is the key to overcoming any obstacle in life",
  "It does not matter how slowly you go as long as you do not stop moving forward toward your goals",
  "Our greatest weakness lies in giving up and the most certain way to succeed is always to try one more time",
  "Perseverance is not a long race but many short races one after another without ever giving up",
  "The oak fought the wind and was broken while the willow bent and survived the strongest storms",
  "Courage does not always roar, sometimes it is the quiet voice at the end of the day saying I will try again",
  "A river cuts through rock not because of its power but because of its persistence over time",
  "The gem cannot be polished without friction nor the person perfected without trials and challenges",
  ],
  vietnamese: [
    // Câu tiếng Việt đơn giản và an toàn
    "Hôm nay là một ngày đẹp trời, mặt trời chiếu sáng khắp nơi.",
    "Tôi thích uống cà phê vào buổi sáng và đọc sách vào buổi tối.",
    "Công nghệ đã thay đổi cách chúng ta làm việc và học tập mỗi ngày.",
    "Việc học một ngôn ngữ mới luôn mang lại nhiều trải nghiệm thú vị.",
    "Máy tính giúp chúng ta giải quyết nhiều vấn đề một cách nhanh chóng.",
    "Internet kết nối mọi người trên khắp thế giới với nhau dễ dàng.",
    "Việc đánh máy nhanh là một kỹ năng rất hữu ích trong công việc.",
    "Phần mềm này giúp bạn cải thiện tốc độ gõ phím một cách hiệu quả.",
    "Lập trình viên cần có sự kiên nhẫn và tư duy logic để giải quyết vấn đề.",
    "Ứng dụng di động ngày càng trở nên phổ biến và tiện lợi hơn.",
    "Việc sao lưu dữ liệu quan trọng giúp bảo vệ thông tin của bạn.",
    "Trí tuệ nhân tạo đang phát triển mạnh mẽ trong nhiều lĩnh vực.",
    "Bàn phím cơ học mang lại cảm giác gõ tốt hơn bàn phím thường.",
    "Thiết kế giao diện người dùng cần phải đơn giản và dễ sử dụng.",
    "Cơ sở dữ liệu lưu trữ thông tin một cách có tổ chức và hiệu quả.",
    "Mạng xã hội giúp mọi người chia sẻ thông tin và kết nối với nhau.",
    "Bảo mật thông tin cá nhân là điều rất quan trọng trên internet.",
    "Học lập trình giúp phát triển tư duy giải quyết vấn đề sáng tạo.",
    "Công cụ tìm kiếm giúp chúng ta tìm thấy thông tin cần thiết nhanh chóng.",
    "Điện toán đám mây cho phép truy cập dữ liệu từ mọi nơi có internet.",
  ],
};

interface GameStats {
  wpm: number;
  accuracy: number;
  time: number;
  progress: number;
}

type GameState = 'idle' | 'playing' | 'finished';

function App() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stats, setStats] = useState<GameStats>({
    wpm: 0,
    accuracy: 100,
    time: 0,
    progress: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<Mode>('english');
  const [gameMode, setGameMode] = useState<GameMode>('precision'); // New state for game mode
  const [incorrectWords, setIncorrectWords] = useState<Set<number>>(new Set());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Unlock audio after user interaction
  const unlockAudio = () => {
    if (!audioUnlocked) {
      setAudioUnlocked(true);
    }
  };

  // Sound effects
  const keystrokeSound = useSound('/sounds/keystroke.mp3', { volume: 0.2 });
  const errorSound = useSound('/sounds/error.mp3', { volume: 0.3 });
  const buttonSound = useSound('/sounds/button-click.mp3', { volume: 0.3 });
  const completeSound = useSound('/sounds/complete.mp3', { volume: 0.5 });
  const bgMusic = useSound('/sounds/lofi-bg.mp3', { volume: 0.2, loop: true });

  // Background music control
  useEffect(() => {
    if (musicEnabled && gameState === 'playing') {
      bgMusic.play();
    } else {
      bgMusic.pause();
    }
  }, [musicEnabled, gameState]);

  // Initialize game with random text
  const startGame = () => {
    unlockAudio();
    if (soundEnabled) buttonSound.play();
    const pool = TEXTS[mode];
    const randomText = pool[Math.floor(Math.random() * pool.length)];
    // Remove any trailing period and spaces so players don't have to type '.' at the end
    const processedText = randomText.replace(/\.\s*$/, '');
    setCurrentText(processedText);
    setUserInput('');
    setGameState('playing');
    setStartTime(Date.now());
    setStats({ wpm: 0, accuracy: 100, time: 0, progress: 0 });
    setIncorrectWords(new Set());
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const resetGame = () => {
    unlockAudio();
    if (soundEnabled) buttonSound.play();
    setGameState('idle');
    setUserInput('');
    setStartTime(null);
    setIncorrectWords(new Set());
    bgMusic.stop();
  };

  // Calculate stats
  useEffect(() => {
    if (gameState !== 'playing' || !startTime) return;

    const interval = setInterval(() => {
      const currentWords = currentText.split(' ');
      const typedWords = userInput.split(' ');
      
      // Check if finished based on game mode
      if (gameMode === 'precision') {
        // Precision mode: finish when all words are typed correctly (word-level precision)
        const allWordsTyped = typedWords.length >= currentWords.length;
        const allWordsCorrect = currentWords.every((word, idx) => {
          const typedWord = (typedWords[idx] || '').trim();
          return typedWord === word;
        });
        
        if (allWordsTyped && allWordsCorrect) {
          setGameState('finished');
          bgMusic.stop();
          if (soundEnabled) completeSound.play();
          return;
        }
      } else {
        // Speed mode: finish when user reaches the end of the text regardless of accuracy
        if (userInput.length >= currentText.length) {
          setGameState('finished');
          bgMusic.stop();
          if (soundEnabled) completeSound.play();
          return; // Stop this interval callback immediately
        }
      }

      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      const wordsTyped = userInput.trim().split(/\s+/).length;
      const wpm = Math.round(wordsTyped / timeElapsed) || 0;
      const progress = (userInput.length / currentText.length) * 100;
      
      // Calculate accuracy based on incorrect words
      const totalWordsTyped = Math.min(typedWords.length, currentWords.length);
      const correctWords = totalWordsTyped - incorrectWords.size;
      const accuracy = totalWordsTyped > 0 
        ? Math.round((correctWords / totalWordsTyped) * 100)
        : 100;
      
      const time = Math.floor((Date.now() - startTime) / 1000);

      setStats({ wpm, accuracy, time, progress });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState, startTime, userInput, currentText, incorrectWords, gameMode, soundEnabled, completeSound, bgMusic]);

  // Handle typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Unlock audio on first user interaction
    unlockAudio();

    if (gameState !== 'playing') return;

    // Word-level validation for highlighting (applies to all modes)
    const currentWords = currentText.split(' ');
    const typedWords = value.split(' ');

    // On space, evaluate the completed word
    if (value.endsWith(' ')) {
      const completedIndex = typedWords.length - 2; // last non-empty word index
      if (completedIndex >= 0 && completedIndex < currentWords.length) {
        const typedWord = (typedWords[completedIndex] || '').trim();
        const expectedWord = currentWords[completedIndex];
        if (typedWord !== expectedWord) {
          setIncorrectWords(prev => new Set(prev).add(completedIndex));
          if (soundEnabled && value.length > userInput.length) errorSound.play();
        } else {
          setIncorrectWords(prev => {
            const next = new Set(prev);
            next.delete(completedIndex);
            return next;
          });
          if (soundEnabled && value.length > userInput.length) keystrokeSound.play();
        }
      }
    } else if (value.length > userInput.length) {
      // Regular typing keystroke (not space)
      if (soundEnabled) keystrokeSound.play();
    }

    setUserInput(value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            TypingVelocity
          </h1>
          <p className="text-xl text-gray-300">Test your typing speed and accuracy!</p>
          <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <label className="text-gray-300 font-medium">Typing Mode:</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
                disabled={gameState !== 'idle'}
                className="px-4 py-2 bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none text-gray-200"
              >
                <option value="english">English</option>
                <option value="vietnamese">Tiếng Việt</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-gray-300 font-medium">Game Mode:</label>
              <select
                value={gameMode}
                onChange={(e) => setGameMode(e.target.value as GameMode)}
                disabled={gameState !== 'idle'}
                className="px-4 py-2 bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none text-gray-200"
              >
                <option value="precision">Precision (100% accuracy)</option>
                <option value="speed">Speed (any accuracy)</option>
              </select>
            </div>
            
            {/* Sound Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  unlockAudio();
                  setSoundEnabled(!soundEnabled);
                  if (!soundEnabled) buttonSound.play();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 hover:border-purple-500 transition-all text-gray-200"
                title={soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
              >
                <span className="text-xl">{soundEnabled ? '🔊' : '🔇'}</span>
                <span className="text-sm">SFX</span>
              </button>
              
              <button
                onClick={() => {
                  unlockAudio();
                  setMusicEnabled(!musicEnabled);
                  if (soundEnabled) buttonSound.play();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 hover:border-purple-500 transition-all text-gray-200"
                title={musicEnabled ? 'Disable background music' : 'Enable background music'}
              >
                <span className="text-xl">{musicEnabled ? '🎵' : '🎶'}</span>
                <span className="text-sm">Music</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Game Area */}
        <AnimatePresence mode="wait">
          {gameState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
              >
                🏁 Start Racing
              </motion.button>
            </motion.div>
          )}

          {(gameState === 'playing' || gameState === 'finished') && (
            <motion.div
              key="playing"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-4 border border-purple-500/30"
                >
                  <div className="text-sm text-gray-400 mb-1">WPM</div>
                  <div className="text-3xl font-bold text-purple-400">{stats.wpm}</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-4 border border-pink-500/30"
                >
                  <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                  <div className="text-3xl font-bold text-pink-400">{stats.accuracy}%</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-4 border border-blue-500/30"
                >
                  <div className="text-sm text-gray-400 mb-1">Time</div>
                  <div className="text-3xl font-bold text-blue-400">{stats.time}s</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-xl p-4 border border-green-500/30"
                >
                  <div className="text-sm text-gray-400 mb-1">Progress</div>
                  <div className="text-3xl font-bold text-green-400">{Math.round(stats.progress)}%</div>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6 bg-gray-800/50 rounded-full h-3 overflow-hidden backdrop-blur">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Enhanced Racing Track Visualization */}
              <div className="mb-8 relative">
                {/* Racing Track */}
                <div className="relative h-24 bg-gradient-to-b from-gray-700 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-600">
                  {/* Road Markings - Animated Dashed Lines */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-1 border-t-4 border-dashed border-yellow-400/50"></div>
                  </div>
                  
                  {/* Starting Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-green-400 to-green-500"></div>
                  
                  {/* Finish Line with Flag */}
                  <div className="absolute right-0 top-0 bottom-0 w-3">
                    <div className="h-full w-full bg-gradient-to-r from-white via-gray-300 to-white opacity-80"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-2 text-5xl">
                      🏁
                    </div>
                  </div>
                  
                  {/* Racing Car with Shadow and Effects */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 z-10"
                    animate={{ 
                      left: `calc(${Math.min(stats.progress, 100)}% - 32px)`,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 25,
                      mass: 0.5 
                    }}
                  >
                    {/* Speed lines/smoke effect when moving */}
                    {stats.progress > 0 && stats.progress < 100 && (
                      <motion.div
                        className="absolute right-14 top-1/2 -translate-y-1/2 flex gap-2"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <div className="text-2xl">💨</div>
                      </motion.div>
                    )}
                    
                    {/* Car with driving animation */}
                    <div style={{ transform: 'scaleX(-1)' }}>
                      <motion.div
                        className="text-5xl filter drop-shadow-xl"
                        animate={stats.progress > 0 && stats.progress < 100 ? {
                          y: [0, -1, 0, 1, 0],
                          rotate: [0, 0.5, 0, -0.5, 0]
                        } : {}}
                        transition={{
                          duration: 0.2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        🏎️
                      </motion.div>
                    </div>
                    
                    {/* Car shadow */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/30 rounded-full blur-sm"></div>
                  </motion.div>
                  
                  {/* Victory confetti when finished */}
                  {gameState === 'finished' && (
                    <motion.div
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      🎉✨🎊
                    </motion.div>
                  )}
                </div>
                
                {/* Progress Percentage Display */}
                <div className="mt-2 text-center">
                  <span className="text-sm font-semibold text-gray-400">
                    Race Progress: <span className="text-green-400">{Math.round(stats.progress)}%</span>
                  </span>
                </div>
              </div>

              {/* Text Display - Word-based highlighting for all modes */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-gray-700/50 shadow-2xl">
                <div className="typing-text text-2xl leading-relaxed font-mono tracking-wide whitespace-pre-wrap min-h-[120px] flex flex-wrap items-start content-start">
                  {currentText.split(' ').map((word, wordIndex) => {
                    const typedWords = userInput.split(' ');
                    const currentWordIndex = typedWords.length - 1;
                    const isCurrentWord = wordIndex === currentWordIndex;
                    const isCompleted = wordIndex < currentWordIndex;
                    const isIncorrect = incorrectWords.has(wordIndex);

                    // For completed words, show entire word in color
                    if (isCompleted) {
                      return (
                        <span
                          key={wordIndex}
                          className={`inline-block mr-2 ${!isIncorrect ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {word}
                        </span>
                      );
                    }

                    // For current word in precision mode, show character-level highlighting
                    if (isCurrentWord && gameMode === 'precision') {
                      const typedWord = typedWords[currentWordIndex] || '';
                      const wordChars = word.split('');
                      const typedChars = typedWord.split('');

                      return (
                        <span key={wordIndex} className="inline-block mr-2">
                          {wordChars.map((char, charIndex) => {
                            const typedChar = typedChars[charIndex];
                            let charClass = '';

                            if (typedChar === undefined) {
                              // Not yet typed - yellow for upcoming characters
                              charClass = 'text-yellow-400';
                            } else if (typedChar === char) {
                              // Correctly typed - green
                              charClass = 'text-green-400';
                            } else {
                              // Incorrectly typed - red
                              charClass = 'text-red-400';
                            }

                            return (
                              <span key={charIndex} className={charClass}>
                                {char}
                              </span>
                            );
                          })}
                        </span>
                      );
                    }

                    // For current word in speed mode or upcoming words, show entire word in appropriate color
                    return (
                      <span
                        key={wordIndex}
                        className={`inline-block mr-2
                          ${isCurrentWord ? 'text-yellow-400' : 'text-gray-500'}
                        `}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                disabled={gameState === 'finished'}
                className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur rounded-xl border-2 border-gray-700 focus:border-purple-500 focus:outline-none text-xl font-mono transition-all duration-300 disabled:opacity-50"
                placeholder={gameState === 'finished' ? 'Race Complete!' : 'Start typing here...'}
                autoFocus
              />

              {/* Finished State */}
              {gameState === 'finished' && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/50 text-center"
                >
                  <h2 className="text-4xl font-bold mb-4">🎉 Race Complete!</h2>
                  <p className="text-xl text-gray-300 mb-6">
                    You typed at <span className="text-purple-400 font-bold">{stats.wpm} WPM</span> with{' '}
                    <span className="text-pink-400 font-bold">{stats.accuracy}% accuracy</span>!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-xl font-bold shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    🔄 Race Again
                  </motion.button>
                </motion.div>
              )}

              {/* Reset Button */}
              {gameState === 'playing' && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className="mt-6 px-6 py-3 bg-gray-700/50 backdrop-blur rounded-xl font-semibold hover:bg-gray-600/50 transition-all duration-300 w-full"
                >
                  ↻ Reset
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 text-gray-400"
        >
          <p>💡 Tip: Focus on accuracy first, speed will come naturally!</p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;