import React, { useState } from 'react';

// Simple demo of the golf scorecard app
const GolfScorecardApp = () => {
  // Game selection state
  const [activeGame, setActiveGame] = useState(null);
  
  // Demo players
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  
  // Simple score tracking for Nassau game
  const [scores, setScores] = useState({
    player1: Array(18).fill(''),
    player2: Array(18).fill('')
  });
  
  // Vegas players
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [teamC, setTeamC] = useState('');
  const [teamD, setTeamD] = useState('');
  
  // Helper function to format currency
  const formatCurrency = (amount) => {
    return '$' + parseFloat(amount).toFixed(2);
  };
  
  // Return to game selection
  const handleBackToMenu = () => {
    setActiveGame(null);
  };
  
  // Handle score updates
  const handleScoreChange = (player, hole, value) => {
    const newScores = {...scores};
    newScores[player][hole] = value;
    setScores(newScores);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="bg-blue-800 text-white p-4 mb-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Peel & Eat Golf Scorecards</h1>
      </header>
      
      {!activeGame ? (
        // Game Selection Screen
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Select Your Game</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => setActiveGame('nassau')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
            >
              Nassau
            </button>
            <button 
              onClick={() => setActiveGame('vegas')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
            >
              Vegas
            </button>
            <button 
              disabled
              className="bg-gray-400 text-white font-bold py-3 px-4 rounded-lg opacity-50 cursor-not-allowed"
            >
              Skins (Coming Soon)
            </button>
            <button 
              disabled
              className="bg-gray-400 text-white font-bold py-3 px-4 rounded-lg opacity-50 cursor-not-allowed"
            >
              Wolf (Coming Soon)
            </button>
          </div>
        </div>
      ) : (
        // Active Game Screen
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <button 
              onClick={handleBackToMenu}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              ← Back to Menu
            </button>
          </div>
          
          {activeGame === 'nassau' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">Nassau Match</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Player 1:</label>
                  <input
                    type="text"
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Player 2:</label>
                  <input
                    type="text"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter name"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-sm">Hole</th>
                      <th className="border border-gray-300 p-2 text-sm">{player1 || 'Player 1'}</th>
                      <th className="border border-gray-300 p-2 text-sm">{player2 || 'Player 2'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((holeIndex) => (
                      <tr key={holeIndex}>
                        <td className="border border-gray-300 p-2 text-center font-medium">
                          {holeIndex + 1}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={scores.player1[holeIndex]}
                            onChange={(e) => handleScoreChange('player1', holeIndex, e.target.value)}
                            className="w-16 p-1 border border-gray-300 rounded text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={scores.player2[holeIndex]}
                            onChange={(e) => handleScoreChange('player2', holeIndex, e.target.value)}
                            className="w-16 p-1 border border-gray-300 rounded text-center"
                          />
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 font-semibold">
                      <td className="border border-gray-300 p-2 text-center">OUT</td>
                      <td className="border border-gray-300 p-2 text-center">
                        {scores.player1.slice(0, 9).filter(s => s !== '').length > 0 ? 
                          scores.player1.slice(0, 9).reduce((sum, score) => sum + (parseInt(score) || 0), 0) : ''}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {scores.player2.slice(0, 9).filter(s => s !== '').length > 0 ? 
                          scores.player2.slice(0, 9).reduce((sum, score) => sum + (parseInt(score) || 0), 0) : ''}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 border-t border-gray-300">
                <h3 className="font-semibold text-lg mb-2">Nassau Settlement</h3>
                <p className="text-center text-gray-600 text-sm">
                  Enter scores to calculate match results
                </p>
              </div>
            </div>
          )}
          
          {activeGame === 'vegas' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">Vegas Game</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-medium mb-2">Team 1</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={teamA}
                      onChange={(e) => setTeamA(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Player A"
                    />
                    <input
                      type="text"
                      value={teamB}
                      onChange={(e) => setTeamB(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Player B"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Team 2</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={teamC}
                      onChange={(e) => setTeamC(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Player C"
                    />
                    <input
                      type="text"
                      value={teamD}
                      onChange={(e) => setTeamD(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Player D"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border p-4 rounded-lg bg-gray-50 my-4">
                <p className="text-center">
                  Enter player names and scores to calculate Vegas numbers and settlements
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Peel & Eat Scorecards
      </footer>
    </div>
  );
};

export default GolfScorecardApp;
