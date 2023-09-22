import "./Button.css";

/**
 * @component Button
 */

/**
 * A Button component which displays a customizable button.
 * @function Button
 * @memberof component:Button
 * @param {string} text - The text which Button will display.
 * @param {string} buttonCategory - The class which will get assigned to the Button.
 * @param {Function} onClick - Callback function which is executed when button is clicked.
 * @param {string} iconUrl - The path in which the icon to be displayed is saved.
 * @param {string} displayChoice - Choose whether a Text is to be displayed on the Button or an Icon.
 * @param {string} altText - Alternative text for Icon if it is displayed.
 * @param {number} width - The width of the Button (can be any unit accepted by CSS).
 * @param {number} height - The height of the Button (can be any unit accepted by CSS).
 * 
 * @author Soumalya Pakrashi, Montu Pakrashi
 * @since v1.0.0
 * @version v1.1.0
 * 
 * @example
 * <Button
 *      text = 'Submit'
 *      displayChoice = 'text'
 *      buttonCategory = 'btn btn-orange'
 *      width = '100%'
 *      height = '100%'
 *      onClick = () => {}
 * />
 */
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
