import './Number.css';

/**
 * @component Number
 */

/**
 * Component which renders characters in large font format.
 * @function Number
 * @memberof component:Number
 * @param {string} text - Text to display on screen. Usually this is a single digit.
 * @param {boolean} darkSeparator - Applies a darker version of the existing color on the characters.
 * @param {string} className - The string of CSS classes to be applied on the HTML element.
 * 
 * @author Soumalya Pakrashi
 * @since v1.0.0
 * @version v1.0.0
 * 
 * @example
 * <Number
 *      text = '0'
 *      className = 'number lightRed'
 * />
 */
export function Number({ text, darkSeparator = false, className }) {
    return(
        <div>
            <h1 className={ className }>{ text }</h1>
        </div>
    );
}
