import './Number.css';

function Number({ text }) {
    return(
        <div>
            <h1 className='number'>{ text < 10 ? '0' : '' }{ text }</h1>
        </div>
    );
}

export default Number;