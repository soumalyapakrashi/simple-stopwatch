import { useEffect, useState } from 'react';

import { Button, Number } from '../../components';

import "./StopWatch.css";
import playLogo from '../../assets/svg/play-solid.svg';
import pauseLogo from '../../assets/svg/pause-solid.svg';
import stopLogo from '../../assets/svg/stop-solid.svg';

export function StopWatch() {
    // Counter to count seconds in the stopwatch
    const [ seconds, setSeconds ] = useState(0);
    // Counter to count the minutes in the stopwatch
    const [ minutes, setMinutes ] = useState(0);
    // The separator in the middle has 2 colors. One lighter red and one darker red.
    // These colors alternate every half second. This flag determines which color the
    // separator will be taking.
    const [ darkSeparator, setDarkSepartor ] = useState(true);
    // This enables or disables the counter of the stopwatch
    const [ enableStopWatch, setEnableStopWatch ] = useState("Stopped");

    useEffect(() => {
        if(enableStopWatch === "Started") {
            // Increment minutes by 1 and reset seconds to 0 if 60 seconds is reached
            if(seconds === 60) {
                setMinutes(previousMinutes => previousMinutes + 1);
                setSeconds(0);
            }

            // Reset the stopwatch if 60 seconds is reached
            if(minutes === 60) {
                setMinutes(0);
                setSeconds(0);
            }
    
            // Update the stopwatch every 500 milliseconds (half second).
            // Every half second, the color of the separator alternates between lighter
            // and darker red. And every second (1000 milliseconds), the seconds is incremented by 1.
            const interval = setInterval(() => {
                if(!darkSeparator) {
                    setDarkSepartor(true);
                    setSeconds(previousSeconds => previousSeconds + 1);
                }
                else {
                    setDarkSepartor(false);
                }
            }, 500);
    
            // When component unmounts, clear the interval.
            return () => clearInterval(interval);
        }
    }, [ darkSeparator, enableStopWatch, seconds, minutes ]);

    // Handler function to start the counter
    const startStopWatch = () => {
        setEnableStopWatch("Started");
    }

    // Handler function to pause the counter
    const pauseStopWatch = () => {
        setEnableStopWatch("Paused");
    }

    // Handler function to stop the counter
    const stopStopWatch = () => {
        setEnableStopWatch("Stopped");
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
                    buttonCategory={ enableStopWatch === "Started" ? "btn-icon btn-secondary" : "btn-icon btn-success" }
                    onClick={ enableStopWatch !== "Started" ? startStopWatch : pauseStopWatch }
                    iconUrl={ enableStopWatch === "Started" ? pauseLogo : playLogo }
                    displayChoice="icon"
                    altText={ enableStopWatch === "Started" ? "Pause Button" : "Start Button" }
                    width='110px'
                    height='55px'
                />
                <Button
                    buttonCategory="btn-icon btn-alert"
                    onClick={ stopStopWatch }
                    iconUrl={ stopLogo }
                    displayChoice='icon'
                    altText="Stop Button"
                    width='110px'
                    height='55px'
                />
            </div>
        </section>
    );
}
