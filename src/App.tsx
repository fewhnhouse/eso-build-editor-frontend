import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <h1>FIST BUILD EDITOR</h1>
        </header>
        <div className="raidSetup">
          <div className="raidRole">
            <h2>Stamwarden</h2>
          </div>
          <div className="raidRole">
            <h2>Stamnecro</h2>
          </div>
          <div className="raidRole">
            <h2>Bombblade</h2>
          </div>
          <div className="raidRole">
            <h2>Dragonknight</h2>
          </div>
          <div className="raidRole">
            <h2>Purgeblade</h2>
          </div>
        </div>
        <div className="raidDetails">
          <h2>Role specific details</h2>
          <p>DD role wears pants</p>
        </div>
      </div>
    </div>
  );
}

export default App;
