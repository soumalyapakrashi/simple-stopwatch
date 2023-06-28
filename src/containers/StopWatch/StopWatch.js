import "./StopWatch.css";
import { useState } from 'react';
import { Button, Number } from '../../components';

export function StopWatch() {
    const [ seconds, setSeconds ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);
    const [ darkSeparator, setDarkSepartor ] = useState(true);
    const [ halfSecond, setHalfSecond ] = useState(true);
    const [ enableStopWatch, setEnableStopWatch ] = useState(false);


    // Timeout function to update the counter every 500 milliseconds
    const timeoutVar = setTimeout(() => {
        if(enableStopWatch) {
            if(!halfSecond) {
                if(seconds === 59) {
                    setMinutes(minutes + 1);
                    setSeconds(0);
                }
                else {
                    setSeconds(seconds + 1, () => {
                        if(!enableStopWatch) {
                            seconds = 0;
                        }
                    });
                }
            }
            
            setDarkSepartor(!darkSeparator);
            setHalfSecond(!halfSecond);
        }
    }, 500);

    // Handler function to start the counter
    const startStopWatch = () => {
        setEnableStopWatch(true);
    }

    // Handler function to pause the counter
    const pauseStopWatch = () => {
        setEnableStopWatch(false);
        setHalfSecond(true);
    }

    // Handler function to stop the counter
    const stopStopWatch = () => {
        setEnableStopWatch(false);
        setHalfSecond(true);
        setSeconds(0);
        setMinutes(0);
        setDarkSepartor(true);
        clearTimeout(timeoutVar);
    }

    return (
        <section className='stopwatch-section'>
            <div className="watch-face">
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
            </div>

            <div className="buttons">
                <Button 
                    text="Start"
                    buttonCategory="btn-success"
                    onClick={ startStopWatch }
                />
                <Button
                    text="Pause"
                    buttonCategory="btn-secondary"
                    onClick={ pauseStopWatch }
                />
                <Button
                    text="Stop"
                    buttonCategory="btn-alert"
                    onClick={ stopStopWatch }
                />
            </div>
        </section>
    );
}