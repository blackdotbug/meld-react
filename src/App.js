import React from 'react';
import MELDChart from './meld.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MELD Score Chart</h1>
      </header>
      <div id="graph"><MELDChart /></div>
      <footer className="App-footer">
        <p>formula source: <a href="https://www.mdcalc.com/meld-score-model-end-stage-liver-disease-12-older#evidence">mdcalc</a> | raw data: <a href="https://docs.google.com/spreadsheets/d/1nA16yuLtUrdpZFpPzz-HUm-WlpPW2axHhidMOnC1TTQ">google sheet</a>
        <br />MELD(i) = 0.957 × ln(Cr) + 0.378 × ln(bilirubin) + 1.120 × ln(INR) + 0.643 then, round to the tenth decimal place and multiply by 10. 
        <br />If MELD(i) > 11, perform additional MELD calculation as follows: MELD = MELD(i) + 1.32 × (137 – Na) –  [ 0.033 × MELD(i) × (137 – Na) ]
        <br />Cr, bilirubin and INR values floored to 1; Na floored to 125 and ceilinged to 137.
        </p>
      </footer>
    </div>
  );
}

export default App;
