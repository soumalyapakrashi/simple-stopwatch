import { StopWatch } from './containers/StopWatch';
import { Calculator } from './containers/Calculator';
import { CalculatorDriver } from './containers/Calculator/CalculatorDriver';
import './App.css';

function App() {
    return(
        <div className="App">
            {/* <StopWatch /> */}
            <CalculatorDriver />
        </div>
    )
}

export default App;
