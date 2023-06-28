import "./Button.css";

export function Button({ text, buttonCategory, onClick, iconUrl, displayChoice = "text", altText }) {
    return(
        <button className={ buttonCategory } onClick={ onClick }>
            { displayChoice === 'text' ? text : <img src={ iconUrl } className="icon" alt={ altText }></img> }
        </button>
    );
}
