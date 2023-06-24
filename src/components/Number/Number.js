import './Number.css';

function Number({ text, darkSeparator }) {
    let classNameOfNumber = "number";
    if(text === ':')  classNameOfNumber += " separator";
    if(darkSeparator === true)  classNameOfNumber += " darkRed";
    else  classNameOfNumber += " lightRed";

    return(
        <div>
            <h1 className={ classNameOfNumber }>{ text }</h1>
        </div>
    );
}

export default Number;