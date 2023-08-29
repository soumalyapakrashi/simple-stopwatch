import { useState } from "react";
import { Calculator } from "./Calculator";

export function CalculatorDriver() {
    const [ expression, setExpression ] = useState('');
    const [ symbolStack, setSymbolStack ] = useState(['Start']);
    const [ errorButton, setErrorButton ] = useState('');

    const buttons = {
        'AC': {
            order: 1,
            color: 'btn-white',
            keyboardShortcut: 'Delete',
            clickHandler() { acHandler() }
        },
        'C': {
            order: 2,
            color: 'btn-white',
            keyboardShortcut: 'Backspace',
            clickHandler() {
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
            }
        },
        '%': {
            order: 3,
            color: 'btn-white',
            keyboardShortcut: '%',
            clickHandler() { operatorsHandler('%'); }
        },
        '÷': {
            order: 4,
            color: 'btn-orange',
            keyboardShortcut: '/',
            clickHandler() { operatorsHandler('÷'); }
        },
        '7': {
            order: 5,
            color: 'btn-white',
            keyboardShortcut: '7',
            clickHandler() { numbersHandler('7'); }
        },
        '8': {
            order: 6,
            color: 'btn-white',
            keyboardShortcut: '8',
            clickHandler() { numbersHandler('8'); }
        },
        '9': {
            order: 7,
            color: 'btn-white',
            keyboardShortcut: '9',
            clickHandler() { numbersHandler('9'); }
        },
        'X': {
            order: 8,
            color: 'btn-orange',
            keyboardShortcut: '*',
            clickHandler() { operatorsHandler('x'); }
        },
        '4': {
            order: 9,
            color: 'btn-white',
            keyboardShortcut: '4',
            clickHandler() { numbersHandler('4'); }
        },
        '5': {
            order: 10,
            color: 'btn-white',
            keyboardShortcut: '5',
            clickHandler() { numbersHandler('5'); }
        },
        '6': {
            order: 11,
            color: 'btn-white',
            keyboardShortcut: '6',
            clickHandler() { numbersHandler('6'); }
        },
        '-': {
            order: 12,
            color: 'btn-orange',
            keyboardShortcut: '-',
            clickHandler() {
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
            }
        },
        '1': {
            order: 13,
            color: 'btn-white',
            keyboardShortcut: '1',
            clickHandler() { numbersHandler('1'); }
        },
        '2': {
            order: 14,
            color: 'btn-white',
            keyboardShortcut: '2',
            clickHandler() { numbersHandler('2'); }
        },
        '3': {
            order: 15,
            color: 'btn-white',
            keyboardShortcut: '3',
            clickHandler() { numbersHandler('3'); }
        },
        '+': {
            order: 16,
            color: 'btn-orange',
            keyboardShortcut: '+',
            clickHandler() { operatorsHandler('+'); }
        },
        '0': {
            order: 17,
            color: 'btn-white',
            keyboardShortcut: '0',
            clickHandler() {
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
            }
        },
        '.': {
            order: 18,
            color: 'btn-white',
            keyboardShortcut: '.',
            clickHandler() {
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
            }
        },
        '=': {
            order: 19,
            color: 'btn-orange',
            keyboardShortcut: '=',
            clickHandler() {
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
    };

    // Handler for AC
    const acHandler = () => {
        setExpression('');
        setSymbolStack(['Start']);
        setErrorButton('');
    };

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

    return(
        <Calculator
            buttons={ buttons }
            expression={ expression }
            errorButton={ errorButton }
        />
    )
}