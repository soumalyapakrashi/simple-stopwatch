import { Button } from '../../components';
import './Calculator.css';

export function Calculator({ buttons, expression, errorButton }) {
    return(
        <div
            className="calculator"
            onKeyDown={event => {
                const keyboard = Object.keys(buttons).find(key => buttons[key].keyboardShortcut === event.key);
                if(keyboard !== undefined) {
                    buttons[keyboard].clickHandler();
                }
            }}
            tabIndex='-1'
        >
            <section className="output-section">
                <h1 className='calculator-display'>{ expression.toString() }</h1>
            </section>
            <section className="controls-section">
                { Object.keys(buttons).map(key => {
                    return(
                        <div 
                            className={ key === '0' ? 'grid-button-long' : '' } 
                            key={ key }
                            style={{ order: buttons[key].order }}
                        >
                            <Button
                                text={ key }
                                displayChoice='text'
                                buttonCategory={ `btn ${buttons[key].color} ${key === errorButton ? buttons[key].color + '-error' : ''}` }
                                width='100%'
                                height='100%'
                                onClick={ buttons[key].clickHandler }
                            />
                        </div>
                    );
                }) }
            </section>
        </div>
    )
}
