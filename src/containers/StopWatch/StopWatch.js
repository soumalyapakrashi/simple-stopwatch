import "./StopWatch.css";
import { useState } from 'react';
import { Number } from '../../components';

export function StopWatch() {
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
        <section className='stopwatch-section'>
            <Number 
                text = { Math.floor(minutes / 10) }
                className = "number lightRed"
            />
            <Number 
                text = { minutes % 10 }
                className = "number lightRed"
            />
            <Number 
                text = { ":" }
                darkSeparator = { darkSeparator }
                className = { darkSeparator ? "number separator darkRed" : "number separator lightRed" }
            />
            <Number 
                text = { Math.floor(seconds / 10) }
                className = "number lightRed"
            />
            <Number 
                text = { seconds % 10 }
                className = "number lightRed"
            />
        </section>
    );
}