import { useState } from 'react';
import { Button, Label } from '../../components';
import './Calculator.css';

export function Calculator() {
    const [ expression, setExpression ] = useState('');

    const buttons = [ 'AC', 'C', '%', '÷', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=' ];

    const button_categories = {
        '%': 'operator',
        '÷': 'operator',
        'x': 'operator',
        '-': 'operator',
        '+': 'operator',
        '.': 'operator'
    }

    const buttons_map = {
        'AC': () => {
            setExpression('');
        },
        'C': () => {
            setExpression(previousExpression => previousExpression.substring(0, previousExpression.length - 1));
        },
        '%': () => {
            setExpression(previousExpression => {
                if(button_categories[previousExpression.at(previousExpression.length - 1)] === 'operator') {
                    return `${previousExpression}`;
                }
                else if(expression === '') {
                    return '';
                }
                else {
                    return `${previousExpression}%`;
                }
            });
        },
        '÷': () => {
            setExpression(previousExpression => {
                if(button_categories[previousExpression.at(previousExpression.length - 1)] === 'operator') {
                    return `${previousExpression}`;
                }
                else if(expression === '') {
                    return '';
                }
                else {
                    return `${previousExpression}÷`;
                }
            });
        },
        '7': () => {
            setExpression(previousExpression => `${previousExpression}7`);
        },
        '8': () => {
            setExpression(previousExpression => `${previousExpression}8`);
        },
        '9': () => {
            setExpression(previousExpression => `${previousExpression}9`);
        },
        'X': () => {
            setExpression(previousExpression => {
                if(button_categories[previousExpression.at(previousExpression.length - 1)] === 'operator') {
                    return `${previousExpression}`;
                }
                else if(expression === '') {
                    return '';
                }
                else {
                    return `${previousExpression}x`;
                }
            });
        },
        '4': () => {
            setExpression(previousExpression => `${previousExpression}4`);
        },
        '5': () => {
            setExpression(previousExpression => `${previousExpression}5`);
        },
        '6': () => {
            setExpression(previousExpression => `${previousExpression}6`);
        },
        '-': () => {
            setExpression(previousExpression => {
                if(previousExpression.at(previousExpression.length - 1) === '-') {
                    return `${previousExpression}`;
                }
                else {
                    return `${previousExpression}-`;
                }
            });
        },
        '1': () => {
            setExpression(previousExpression => `${previousExpression}1`);
        },
        '2': () => {
            setExpression(previousExpression => `${previousExpression}2`);
        },
        '3': () => {
            setExpression(previousExpression => `${previousExpression}3`);
        },
        '+': () => {
            setExpression(previousExpression => {
                if(button_categories[previousExpression.at(previousExpression.length - 1)] === 'operator') {
                    return `${previousExpression}`;
                }
                else if(expression === '') {
                    return '';
                }
                else {
                    return `${previousExpression}+`;
                }
            });
        },
        '0': () => {
            setExpression(previousExpression => `${previousExpression}0`);
        },
        '.': () => {
            setExpression(previousExpression => {
                if(button_categories[previousExpression.at(previousExpression.length - 1)] === 'operator') {
                    return `${previousExpression}`;
                }
                else {
                    return `${previousExpression}.`;
                }
            });
        },
        '=': () => {
            try {
                let eval_expression = expression.replace('x', '*');
                eval_expression = eval_expression.replace('÷', '/');

                // When no input is given and = button is pressed, we get NaN.
                // This fixes this issue and does not produce any result.
                if(expression !== '') {
                    let result = eval(eval_expression);
    
                    // Convert a fractional number to 4 decimal places
                    if(result !== Math.floor(result)) {
                        result = Math.round(result * 10000) / 10000;
                    }

                    // The result produced by eval is a number (in this case).
                    // But we want a string so that the other functionalities can work.
                    // This is a blocker if omitted.
                    result = result.toString();
    
                    setExpression(result);
                }
            } catch(error) {
                setExpression('Invalid');
            }
        }
    }

    // Handler function to handle keyboard events
    const handleKeyboardEvents = event => {
        switch(event.key) {
            case '1': 
                setExpression(previousExpression => `${previousExpression}1`);
                break;
            case '2': 
                setExpression(previousExpression => `${previousExpression}2`);
                break;
            case '3':
                setExpression(previousExpression => `${previousExpression}3`);
                break;
            case '4':
                setExpression(previousExpression => `${previousExpression}4`);
                break;
            case '5':
                setExpression(previousExpression => `${previousExpression}5`);
                break;
            case '6':
                setExpression(previousExpression => `${previousExpression}6`);
                break;
            case '7':
                setExpression(previousExpression => `${previousExpression}7`);
                break;
            case '8':
                setExpression(previousExpression => `${previousExpression}8`);
                break;
            case '9':
                setExpression(previousExpression => `${previousExpression}9`);
                break;
            case '0':
                setExpression(previousExpression => `${previousExpression}0`);
                break;
            case '%':
                setExpression(previousExpression => `${previousExpression}%`);
                break;
            case '/':
                setExpression(previousExpression => `${previousExpression}÷`);
                break;
            case '*':
                setExpression(previousExpression => `${previousExpression}x`);
                break;
            case '-':
                setExpression(previousExpression => `${previousExpression}-`);
                break;
            case '+':
                setExpression(previousExpression => `${previousExpression}+`);
                break;
            case '=':
                buttons_map['=']();
                break;
            case 'Delete':
                setExpression('');
                break;
            case 'Backspace':
                setExpression(previousExpression => previousExpression.substring(0, previousExpression.length - 1));
                break;
            case '.':
                setExpression(previousExpression => `${previousExpression}.`);
                break;
            default: break;
        }
    }

    return(
        <div className="calculator" onKeyDown={event => { handleKeyboardEvents(event) }} tabIndex='-1'>
            <section className="output-section">
                <Label
                    text={ expression.toString() }
                    type='header'
                    width='100%'
                    height='100%'
                    fontSize='2.3rem'
                    color='white'
                    alignment='right'
                />
            </section>
            <section className="controls-section">
                { buttons.map(key => {
                    let button_class = 'btn';
                    if(key === '÷' || key === 'X' || key === '-' || key === '+' || key === '=') {
                        button_class += ' btn-orange';
                    }
                    else {
                        button_class += ' btn-white';
                    }

                    return(
                        <div className={ key === '0' ? 'grid-button-long' : '' } key={key}>
                            <Button
                                text={ key }
                                displayChoice='text'
                                buttonCategory={ button_class }
                                width='100%'
                                height='100%'
                                onClick={ buttons_map[key] }
                            />
                        </div>
                    );
                }) }
            </section>
        </div>
    )
}
