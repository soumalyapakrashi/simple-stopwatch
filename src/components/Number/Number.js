import './Number.css';

export function Number({ text, darkSeparator = false, className }) {
    return(
        <div>
            <h1 className={ className }>{ text }</h1>
        </div>
    );
}
