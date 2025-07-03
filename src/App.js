//import logo from './logo.svg';
import React from 'react';
import RateCalculator from './components/RateCalculator';
import EMICalculator from './components/EMICalculator';
import ScenarioComparison from './components/ScenarioComparison';

import './App.css';


function App(){
  return(
    <div>
      <h1>Personal Loan Portal</h1>
      <RateCalculator/>
      <EMICalculator/>
      <ScenarioComparison/>
    </div>
  );
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
