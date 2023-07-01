import { useState } from 'react';
import { Button, Label } from '../../components';
import './Calculator.css';

export function Calculator() {
    const [ expression, setExpression ] = useState('');
    const [ symbolStack, setSymbolStack ] = useState(['Start']);

    const buttons = [ 'AC', 'C', '%', '÷', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=' ];

    const buttons_map = {
        'AC': () => {
            setExpression('');
            setSymbolStack(['Start']);
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
                setSymbolStack(stack => {
                    stack.pop();
                    return stack;
                })
            }
        },
        '%': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            setExpression(previousExpression => {
                if(lastStackElement === 'Operator' || lastStackElement === 'Clear') {
                    return `${previousExpression}`;
                }
                else if(expression === '') {
                    return '';
                }
                else {
                    return `${previousExpression}%`;
                }
            });

            setSymbolStack(stack => {
                if(lastStackElement !== 'Operator' && lastStackElement !== 'Clear' && expression !== '') {
                    stack.push('Operator');
                }
                return stack;
            });
        },
        '÷': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            setExpression(previousExpression => {
                if(lastStackElement === 'Operator' || lastStackElement === 'Clear') {
                    return `${previousExpression}`;
                }
                else if(expression === '') {
                    return '';
                }
                else {
                    return `${previousExpression}÷`;
                }
            });

            setSymbolStack(stack => {
                if(lastStackElement !== 'Operator' && lastStackElement !== 'Clear' && expression !== '') {
                    stack.push('Operator');
                }
                return stack;
            });
        },
        '7': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('7');
            }
            else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '0') {
                        return `${previousExpression.substring(0, previousExpression.length - 1)}7`;
                    }
                    else {
                        return `${previousExpression}7`;
                    }
                });
            }
            else {
                setExpression(previousExpression => `${previousExpression}7`);
            }
            setSymbolStack(stack => {
                if(lastStackElement === 'Start') {
                    stack = ['Start'];
                }
                stack.push('Number');
                return stack;
            });
        },
        '8': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('8');
            }
            else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '0') {
                        return `${previousExpression.substring(0, previousExpression.length - 1)}8`;
                    }
                    else {
                        return `${previousExpression}8`;
                    }
                });
            }
            else {
                setExpression(previousExpression => `${previousExpression}8`);
            }
            setSymbolStack(stack => {
                if(lastStackElement === 'Clear') {
                    stack = ['Start'];
                }
                stack.push('Number');
                return stack;
            });
        },
        '9': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('9');
            }
            else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '0') {
                        return `${previousExpression.substring(0, previousExpression.length - 1)}9`;
                    }
                    else {
                        return `${previousExpression}9`;
                    }
                });
            }
            else {
                setExpression(previousExpression => `${previousExpression}9`);
            }
            setSymbolStack(stack => {
                if(lastStackElement === 'Clear') {
                    stack = ['Start'];
                }
                stack.push('Number');
                return stack;
            });
        },
        'X': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            setExpression(previousExpression => {
                if(lastStackElement === 'Operator' || lastStackElement === 'Clear') {
                    return `${previousExpression}`;
                }
                else if(expression === '') {
                    return '';
                }
                else {
                    return `${previousExpression}x`;
                }
            });

            setSymbolStack(stack => {
                if(lastStackElement !== 'Operator' && lastStackElement !== 'Clear' && expression !== '') {
                    stack.push('Operator');
                }
                return stack;
            })
        },
        '4': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('4');
            }
            else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '0') {
                        return `${previousExpression.substring(0, previousExpression.length - 1)}4`;
                    }
                    else {
                        return `${previousExpression}4`;
                    }
                });
            }
            else {
                setExpression(previousExpression => `${previousExpression}4`);
            }
            setSymbolStack(stack => {
                if(lastStackElement === 'Clear') {
                    stack = ['Start'];
                }
                stack.push('Number');
                return stack;
            });
        },
        '5': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('5');
            }
            else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '0') {
                        return `${previousExpression.substring(0, previousExpression.length - 1)}5`;
                    }
                    else {
                        return `${previousExpression}5`;
                    }
                });
            }
            else {
                setExpression(previousExpression => `${previousExpression}5`);
            }

            setSymbolStack(stack => {
                if(lastStackElement === 'Clear') {
                    stack = ['Start'];
                }
                stack.push('Number');
                return stack;
            });
        },
        '6': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('6');
            }
            else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '0') {
                        return `${previousExpression.substring(0, previousExpression.length - 1)}6`;
                    }
                    else {
                        return `${previousExpression}6`;
                    }
                });
            }
            else {
                setExpression(previousExpression => `${previousExpression}6`);
            }

            setSymbolStack(stack => {
                if(lastStackElement === 'Clear') {
                    stack = ['Start'];
                }
                stack.push('Number');
                return stack;
            });
        },
        '-': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('-');
                setSymbolStack(['Start']);
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
            }

            setSymbolStack(stack => {
                stack.push('Operator');
                return stack;
            })
        },
        '1': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('1');
            }
            else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '0') {
                        return `${previousExpression.substring(0, previousExpression.length - 1)}1`;
                    }
                    else {
                        return `${previousExpression}1`;
                    }
                });
            }
            else {
                setExpression(previousExpression => `${previousExpression}1`);
            }

            setSymbolStack(stack => {
                if(lastStackElement === 'Clear') {
                    stack = ['Start'];
                }
                stack.push('Number');
                return stack;
            });
        },
        '2': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('2');
            }
            else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '0') {
                        return `${previousExpression.substring(0, previousExpression.length - 1)}2`;
                    }
                    else {
                        return `${previousExpression}2`;
                    }
                });
            }
            else {
                setExpression(previousExpression => `${previousExpression}2`);
            }
            setSymbolStack(stack => {
                if(lastStackElement === 'Clear') {
                    stack = ['Start'];
                }
                stack.push('Number');
                return stack;
            });
        },
        '3': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('3');
            }
            else if(lastStackElement === 'Start' || lastStackElement === 'Operator') {
                setExpression(previousExpression => {
                    if(previousExpression.at(previousExpression.length - 1) === '0') {
                        return `${previousExpression.substring(0, previousExpression.length - 1)}3`;
                    }
                    else {
                        return `${previousExpression}3`;
                    }
                });
            }
            else {
                setExpression(previousExpression => `${previousExpression}3`);
            }
            setSymbolStack(stack => {
                if(lastStackElement === 'Clear') {
                    stack = ['Start'];
                }
                stack.push('Number');
                return stack;
            });
        },
        '+': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            setExpression(previousExpression => {
                if(lastStackElement === 'Operator' || lastStackElement === 'Clear') {
                    return `${previousExpression}`;
                }
                else if(expression === '') {
                    return '';
                }
                else {
                    return `${previousExpression}+`;
                }
            });

            setSymbolStack(stack => {
                if(lastStackElement !== 'Operator' && lastStackElement !== 'Clear' && expression !== '') {
                    stack.push('Operator');
                }
                return stack;
            })
        },
        '0': () => {
            const lastStackElement = symbolStack[symbolStack.length - 1];
            if(lastStackElement === 'Clear') {
                setExpression('0');
                setSymbolStack(['Start']);
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
            }
            else if(lastStackElement === 'Number' || lastStackElement === 'Point') {
                setExpression(previousExpression => `${previousExpression}0`);
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
            }

            setSymbolStack(stack => {
                if(lastStackElement === 'Clear') {
                    stack = ['Start'];
                }
                stack.push('Point');
                return stack;
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

                    if(result === 'Infinity' || result === 'NaN') {
                        setSymbolStack(stack => {
                            stack.push('Clear');
                            return stack;
                        });
                    }
                    
                    if(result === 'NaN') {
                        setExpression('Invalid');
                    }
                    else {
                        setExpression(result);
                        setSymbolStack(stack => {
                            stack.push('Clear');
                            return stack;
                        });
                    }
                }
            } catch(error) {
                setExpression('Invalid');
                setSymbolStack(stack => {
                    stack.push('Clear');
                    return stack;
                });
            }
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
