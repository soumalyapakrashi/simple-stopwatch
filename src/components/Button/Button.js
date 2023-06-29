import "./Button.css";

export function Button({ 
    text,
    buttonCategory,
    onClick,
    iconUrl,
    displayChoice = "text",
    altText,
    width,
    height,
}) {
    return(
        <button className={ buttonCategory } onClick={ onClick } style={{ width, height }}>
            { displayChoice === 'text' ? text : <img src={ iconUrl } className="icon" alt={ altText }></img> }
        </button>
    );
}
