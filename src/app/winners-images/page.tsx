"use client";
import React, { useState, useEffect } from 'react';

// Declare a global interface to tell TypeScript about the domtoimage library
declare global {
  interface Window {
    domtoimage: any;
  }
}

// Define the types for our state to make the application type-safe
interface Scores {
  team1: number | null;
  team2: number | null;
}

interface GameScores {
  q1: Scores;
  q2: Scores;
  q3: Scores;
  q4: Scores;
}

// This is the main component for our application.
// It handles all the state, logic, and rendering.
const App = () => {
  // State for team names
  const [team1Name, setTeam1Name] = useState('Cowboys');
  const [team2Name, setTeam2Name] = useState('Eagles');

  // State for scores for each quarter
  const [scores, setScores] = useState<GameScores>({
    q1: { team1: 7, team2: 7 },
    q2: { team1: 20, team2: 21 },
    q3: { team1: 0, team2: 4 },
    q4: { team1: 0, team2: 4 }, // Based on your description
  });

  // State for winning numbers (last digits of the scores)
  const [winners, setWinners] = useState<GameScores>({
    q1: { team1: null, team2: null },
    q2: { team1: null, team2: null },
    q3: { team1: null, team2: null },
    q4: { team1: null, team2: null },
  });

  // Function to calculate and update the winning numbers
  // This effect runs whenever the scores state changes.
  useEffect(() => {
    const calculateWinners = () => {
      const newWinners: GameScores = {
        q1: {
          team1: scores.q1.team1 !== null ? scores.q1.team1 % 10 : null,
          team2: scores.q1.team2 !== null ? scores.q1.team2 % 10 : null,
        },
        q2: {
          team1: scores.q2.team1 !== null ? scores.q2.team1 % 10 : null,
          team2: scores.q2.team2 !== null ? scores.q2.team2 % 10 : null,
        },
        q3: {
          team1: scores.q3.team1 !== null ? scores.q3.team1 % 10 : null,
          team2: scores.q3.team2 !== null ? scores.q3.team2 % 10 : null,
        },
        q4: {
          team1: scores.q4.team1 !== null ? scores.q4.team1 % 10 : null,
          team2: scores.q4.team2 !== null ? scores.q4.team2 % 10 : null,
        },
      };
      setWinners(newWinners);
    };
    calculateWinners();
  }, [scores]);

  // Function to handle score input changes
  const handleScoreChange = (quarter: keyof GameScores, team: keyof Scores, value: string) => {
    // Only allow numbers and empty string
    const sanitizedValue = value === '' ? null : parseInt(value, 10);
    setScores((prevScores) => ({
      ...prevScores,
      [quarter]: {
        ...prevScores[quarter],
        [team]: sanitizedValue,
      },
    }));
  };

  // Function to capture the content of a div and download it as a PNG image
  const captureAndDownload = () => {
    // Get the DOM element to capture
    const node = document.getElementById('winner-card');
    
    // Check if node exists before proceeding
    if (!node) {
      console.error('Could not find winner-card element to capture.');
      return;
    }

    // Use a try/catch block to handle potential errors
    try {
      // Use dom-to-image-more to convert the node to a data URL
      window.domtoimage.toPng(node, {
        // Increase the scale for a higher resolution image
        quality: 1,
        width: 1080,
        height: 1080,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      })
        .then(function (dataUrl: string) {
          // Create a temporary link element
          const link = document.createElement('a');
          link.download = 'superbowl-winners.png';
          link.href = dataUrl;
          // Trigger the download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(function (error: any) {
          console.error('oops, something went wrong!', error);
        });
    } catch (error: any) {
      console.error('dom-to-image library not loaded.', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex items-center justify-center p-4">
      <script src="https://cdn.jsdelivr.net/npm/dom-to-image-more@2.12.0/dist/dom-to-image-more.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* Main container for the app */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        {/* User input controls */}
        <div className="w-full lg:w-1/3 p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
          <h1 className="text-3xl font-bold mb-2 text-white">Super Bowl Pool Winners</h1>
          <p className="text-gray-400 mb-6">Generate a winners image for Instagram.</p>

          <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="team1" className="text-sm font-semibold text-gray-300">Team 1</label>
              <input
                id="team1"
                type="text"
                className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="team2" className="text-sm font-semibold text-gray-300">Team 2</label>
              <input
                id="team2"
                type="text"
                className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">Quarter Scores</h2>

            {/* Quarter 1 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">First Quarter</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  className="w-1/2 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${team1Name} score`}
                  value={scores.q1.team1 ?? ''}
                  onChange={(e) => handleScoreChange('q1', 'team1', e.target.value)}
                />
                <input
                  type="number"
                  className="w-1/2 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${team2Name} score`}
                  value={scores.q1.team2 ?? ''}
                  onChange={(e) => handleScoreChange('q1', 'team2', e.target.value)}
                />
              </div>
            </div>

            {/* Quarter 2 (Halftime) */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Halftime</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  className="w-1/2 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${team1Name} score`}
                  value={scores.q2.team1 ?? ''}
                  onChange={(e) => handleScoreChange('q2', 'team1', e.target.value)}
                />
                <input
                  type="number"
                  className="w-1/2 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${team2Name} score`}
                  value={scores.q2.team2 ?? ''}
                  onChange={(e) => handleScoreChange('q2', 'team2', e.target.value)}
                />
              </div>
            </div>

            {/* Quarter 3 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Third Quarter</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  className="w-1/2 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${team1Name} score`}
                  value={scores.q3.team1 ?? ''}
                  onChange={(e) => handleScoreChange('q3', 'team1', e.target.value)}
                />
                <input
                  type="number"
                  className="w-1/2 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${team2Name} score`}
                  value={scores.q3.team2 ?? ''}
                  onChange={(e) => handleScoreChange('q3', 'team2', e.target.value)}
                />
              </div>
            </div>

            {/* End of Game (Final) */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">End of Game</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  className="w-1/2 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${team1Name} score`}
                  value={scores.q4.team1 ?? ''}
                  onChange={(e) => handleScoreChange('q4', 'team1', e.target.value)}
                />
                <input
                  type="number"
                  className="w-1/2 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${team2Name} score`}
                  value={scores.q4.team2 ?? ''}
                  onChange={(e) => handleScoreChange('q4', 'team2', e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition transform duration-200 hover:scale-105"
            onClick={captureAndDownload}
          >
            Download Image
          </button>
        </div>

        {/* Live Preview Area */}
        <div className="flex-1 w-full flex justify-center items-center">
          <div
            id="winner-card"
            className="w-[1080px] h-[1080px] bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 rounded-3xl p-24 shadow-2xl flex flex-col justify-center items-center font-inter"
            style={{
              fontFamily: 'Inter, sans-serif'
            }}
          >
            <div className="text-center mb-16">
              <h1 className="text-6xl sm:text-7xl font-extrabold text-white mb-4 leading-tight">
                Super Bowl <span className="text-green-400">Pool</span> Winners
              </h1>
              <p className="text-3xl font-medium text-gray-300">
                {team1Name} vs {team2Name}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-16 w-full max-w-4xl">
              {/* First Quarter */}
              <div className="flex flex-col items-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border-4 border-white/40 shadow-md transform transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3 text-gray-200">First Quarter</h3>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-extrabold text-white">{winners.q1.team1}</p>
                    <p className="text-base uppercase tracking-wider text-gray-400 mt-1 font-semibold">{team1Name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-extrabold text-white">{winners.q1.team2}</p>
                    <p className="text-base uppercase tracking-wider text-gray-400 mt-1 font-semibold">{team2Name}</p>
                  </div>
                </div>
              </div>

              {/* Halftime */}
              <div className="flex flex-col items-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border-4 border-white/40 shadow-md transform transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3 text-gray-200">Halftime</h3>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-extrabold text-white">{winners.q2.team1}</p>
                    <p className="text-base uppercase tracking-wider text-gray-400 mt-1 font-semibold">{team1Name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-extrabold text-white">{winners.q2.team2}</p>
                    <p className="text-base uppercase tracking-wider text-gray-400 mt-1 font-semibold">{team2Name}</p>
                  </div>
                </div>
              </div>

              {/* Third Quarter */}
              <div className="flex flex-col items-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border-4 border-white/40 shadow-md transform transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3 text-gray-200">Third Quarter</h3>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-extrabold text-white">{winners.q3.team1}</p>
                    <p className="text-base uppercase tracking-wider text-gray-400 mt-1 font-semibold">{team1Name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-extrabold text-white">{winners.q3.team2}</p>
                    <p className="text-base uppercase tracking-wider text-gray-400 mt-1 font-semibold">{team2Name}</p>
                  </div>
                </div>
              </div>

              {/* End of Game */}
              <div className="flex flex-col items-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border-4 border-white/40 shadow-md transform transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3 text-gray-200">Final</h3>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-extrabold text-white">{winners.q4.team1}</p>
                    <p className="text-base uppercase tracking-wider text-gray-400 mt-1 font-semibold">{team1Name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-extrabold text-white">{winners.q4.team2}</p>
                    <p className="text-base uppercase tracking-wider text-gray-400 mt-1 font-semibold">{team2Name}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-16 text-2xl text-gray-400 font-semibold tracking-wide">
              superbowlpoolsite.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
