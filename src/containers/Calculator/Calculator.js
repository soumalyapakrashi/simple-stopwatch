import { useState } from 'react';
import { Button, Label } from '../../components';
import './Calculator.css';

export function Calculator() {
    const [ expression, setExpression ] = useState('');
    const [ symbolStack, setSymbolStack ] = useState(['Start']);
    const [ errorButton, setErrorButton ] = useState('');

    const buttons = [ 'AC', 'C', '%', '÷', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=' ];

    // Handler function for numbers
    const numbersHandler = number => {
        const lastStackElement = symbolStack[symbolStack.length - 1];
        if(lastStackElement === 'Clear') {
            setExpression(number);
        }
        else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
            setExpression(previousExpression => {
                if(previousExpression.at(previousExpression.length - 1) === '0') {
                    return `${previousExpression.substring(0, previousExpression.length - 1)}${number}`;
                }
                else {
                    return `${previousExpression}${number}`;
                }
            });
        }
        else {
            setExpression(previousExpression => `${previousExpression}${number}`);
        }
        setSymbolStack(stack => {
            if(lastStackElement === 'Clear') {
                stack = ['Start'];
            }
            stack = [...stack, 'Number'];
            return stack;
        });
        setErrorButton('');
    }

    // Handler function for operators
    const operatorsHandler = operator => {
        const lastStackElement = symbolStack[symbolStack.length - 1];
        setExpression(previousExpression => {
            if(lastStackElement === 'Operator' || lastStackElement === 'Clear') {
                return `${previousExpression}`;
            }
            else if(expression === '') {
                return '';
            }
            else {
                return `${previousExpression}${operator}`;
            }
        });

        setSymbolStack(stack => {
            if(lastStackElement !== 'Operator' && lastStackElement !== 'Clear' && expression !== '') {
                stack = [...stack, 'Operator'];
            }
            return stack;
        });

        if(lastStackElement === 'Operator' || lastStackElement === 'Clear' || expression === '') {
            if(operator === 'x') {
                setErrorButton('X');
            }
            else {
                setErrorButton(operator);
            }
        }
        else {
            setErrorButton('');
        }
    }

    const buttons_map = {
        'AC': () => {
            setExpression('');
            setSymbolStack(['Start']);
            setErrorButton('');
        },
        'C': () => {
            if(symbolStack[symbolStack.length - 1] === 'Clear') {
                setExpression('');
                setSymbolStack(['Start']);
            }
            else if(expression.at(expression.length - 1) === '0') {
                setExpression(previousExpression => previousExpression.substring(0, previousExpression.length - 1));
            }
            else if(expression !== '') {
                setExpression(previousExpression => previousExpression.substring(0, previousExpression.length - 1));
                setSymbolStack(stack => stack.slice(0, stack.length - 1));
            }
            setErrorButton('');
        },
        '%': () => {
            operatorsHandler('%');
        },
        '÷': () => {
            operatorsHandler('÷');
        },
        '7': () => {
            numbersHandler('7');
        },
        '8': () => {
            numbersHandler('8');
        },
        '9': () => {
            numbersHandler('9');
        },
        'X': () => {
            operatorsHandler('x');
        },
        '4': () => {
            numbersHandler('4');
        },
        '5': () => {
            numbersHandler('5');
        },
        '6': () => {
            numbersHandler('6');
        },
        '-': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('-');
                setSymbolStack(['Start', 'Operator']);
                setErrorButton('');
            }
            else {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '-') {
                        return `${previousExpression}`;
                    }
                    else {
                        return `${previousExpression}-`;
                    }
                });

                if(expression.at(expression.length - 1) !== '-') {
                    setSymbolStack(stack => {
                        stack = [...stack, 'Operator'];
                        return stack;
                    });
                    setErrorButton('');
                }
                else {
                    setErrorButton('-');
                }
            }
        },
        '1': () => {
            numbersHandler('1');
        },
        '2': () => {
            numbersHandler('2');
        },
        '3': () => {
            numbersHandler('3');
        },
        '+': () => {
            operatorsHandler('+');
        },
        '0': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('0');
                setSymbolStack(['Start']);
                setErrorButton('');
            }
            else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '0') {
                        return `${previousExpression}`;
                    }
                    else {
                        return `${previousExpression}0`;
                    }
                });

                if(expression.at(expression.length - 1) === '0') {
                    setErrorButton('0');
                }
                else {
                    setErrorButton('');
                }
            }
            else if(lastStackElement === 'Number' || lastStackElement === 'Point') {
                setExpression(previousExpression => `${previousExpression}0`);
                setErrorButton('');
            }
        },
        '.': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            let pointPresent = false;
            for(let symbolIndex = symbolStack.length - 1; symbolIndex >= 0; symbolIndex--) {
                if(symbolStack[symbolIndex] === 'Point') {
                    pointPresent = true;
                }
                else if(symbolStack[symbolIndex] === 'Operator' || symbolStack[symbolIndex] === 'Start') {
                    break;
                }
            }
            if(lastStackElement === 'Clear') {
                setExpression('.');
                setSymbolStack(['Start', 'Point']);
                setErrorButton('');
            }
            else if(!pointPresent) {
                setExpression(previousExpression => {
                    if(lastStackElement === 'Point') {
                        return `${previousExpression}`;
                    }
                    else {
                        return `${previousExpression}.`;
                    }
                });

                setSymbolStack(stack => [...stack, 'Point']);
                setErrorButton('');
            }
            else if(pointPresent) {
                setErrorButton('.');
            }
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

                    if(result === 'Infinity' || result === 'NaN') {
                        setSymbolStack(stack => {
                            stack = [...stack, 'Clear'];
                            return stack;
                        });
                    }
                    
                    if(result === 'NaN') {
                        setExpression('Invalid');
                    }
                    else {
                        setExpression(result);
                        setSymbolStack(stack => {
                            stack = [...stack, 'Clear'];
                            return stack;
                        });
                    }
                }
            } catch(error) {
                setExpression('Invalid');
                setSymbolStack(stack => {
                    stack = [...stack, 'Clear'];
                    return stack;
                });
            }

            setErrorButton('');
        }
    }

    // Handler function to handle keyboard events
    const handleKeyboardEvents = event => {
        switch(event.key) {
            case '1': 
                buttons_map['1']();
                break;
            case '2': 
                buttons_map['2']();
                break;
            case '3':
                buttons_map['3']();
                break;
            case '4':
                buttons_map['4']();
                break;
            case '5':
                buttons_map['5']();
                break;
            case '6':
                buttons_map['6']();
                break;
            case '7':
                buttons_map['7']();
                break;
            case '8':
                buttons_map['8']();
                break;
            case '9':
                buttons_map['9']();
                break;
            case '0':
                buttons_map['0']();
                break;
            case '%':
                buttons_map['%']();
                break;
            case '/':
                buttons_map['÷']();
                break;
            case '*':
                buttons_map['X']();
                break;
            case '-':
                buttons_map['-']();
                break;
            case '+':
                buttons_map['+']();
                break;
            case '=':
                buttons_map['=']();
                break;
            case 'Delete':
                buttons_map['AC']();
                break;
            case 'Backspace':
                buttons_map['C']();
                break;
            case '.':
                buttons_map['.']();
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
                        if(key === errorButton) {
                            button_class += ' btn-orange-error';
                        }
                        else {
                            button_class += ' btn-orange'
                        }
                    }
                    else {
                        if(key === errorButton) {
                            button_class += ' btn-white-error';
                        }
                        else {
                            button_class += ' btn-white';
                        }
                    }

                    return(
                        <div className={ key === '0' ? 'grid-button-long' : '' } key={ key }>
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
