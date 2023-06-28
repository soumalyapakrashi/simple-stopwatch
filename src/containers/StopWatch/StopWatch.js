import "./StopWatch.css";
import { useEffect, useState } from 'react';
import { Button, Number } from '../../components';

export function StopWatch() {
    const [ seconds, setSeconds ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);
    const [ darkSeparator, setDarkSepartor ] = useState(true);
    const [ enableStopWatch, setEnableStopWatch ] = useState(false);

    useEffect(() => {
        if(enableStopWatch) {
            if(seconds === 60) {
                setMinutes(previousMinutes => previousMinutes + 1);
                setSeconds(0);
            }
    
            const interval = setInterval(() => {
                if(!darkSeparator) {
                    setDarkSepartor(true);
                    setSeconds(previousSeconds => previousSeconds + 1);
                }
                else {
                    setDarkSepartor(false);
                }
            }, 500);
    
            return () => clearInterval(interval);
        }
    }, [ darkSeparator, enableStopWatch, seconds ]);

    // Handler function to start the counter
    const startStopWatch = () => {
        setEnableStopWatch(true);
    }

    // Handler function to pause the counter
    const pauseStopWatch = () => {
        setEnableStopWatch(false);
    }

    // Handler function to stop the counter
    const stopStopWatch = () => {
        setEnableStopWatch(false);
        setSeconds(0);
        setMinutes(0);
        setDarkSepartor(true);
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