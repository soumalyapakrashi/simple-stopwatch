import "./Button.css";

export function Button({ text, buttonCategory, onClick }) {
    return(
        <button className={ buttonCategory } onClick={ onClick }>{ text }</button>
    );
}
