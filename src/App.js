import './App.css';
import { useState } from 'react';
import Number from './components/Number/Number';

function App() {
    const [ seconds, setSeconds ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);
    const [ darkSeparator, setDarkSepartor ] = useState(true);
    const [ halfSecond, setHalfSecond ] = useState(true);

    if(seconds === 60) {
        setMinutes(minutes + 1);
        setSeconds(0);
    }

    setTimeout(() => {
        if(!halfSecond) {
            setSeconds(seconds + 1);
        }
        
        setDarkSepartor(!darkSeparator);
        setHalfSecond(!halfSecond);
    }, 500);

    return (
        <div className="App">
            <section className='stopwatch-section'>
                <Number 
                    text = { Math.floor(minutes / 10) }
                    darkSeparator = { false }
                />
                <Number 
                    text = { minutes % 10 }
                    darkSeparator = { false }
                />
                <Number 
                    text = { ":" }
                    darkSeparator = { darkSeparator }
                />
                <Number 
                    text = { Math.floor(seconds / 10) }
                    darkSeparator = { false }
                />
                <Number 
                    text = { seconds % 10 }
                    darkSeparator = { false }
                />
            </section>
        </div>
    );
}

export default App;
