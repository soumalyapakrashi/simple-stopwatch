import './App.css';
import { useState } from 'react';
import Number from './components/Number/Number';

function App() {
    const [ seconds, setSeconds ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);

    if(seconds === 60) {
        setMinutes(minutes + 1);
        setSeconds(0);
    }

    setTimeout(() => {
        setSeconds(seconds + 1);
    }, 1000);

    return (
        <div className="App">
            <section className='stopwatch-section'>
                <Number text = { minutes } />
                <Number text = { ":" } />
                <Number text = { seconds } />
            </section>
        </div>
    );
}

export default App;
