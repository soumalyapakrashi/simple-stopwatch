import './Label.css';

export function Label({
    text,
    type,
    width,
    height,
    fontSize,
    color,
    alignment
}) {
    return(
        <div className='label' style={{ width, height, justifyContent: alignment }}>
            {(() => {
                switch(type) {
                    case 'paragraph':
                        return <p style={{ fontSize, color }}>{ text }</p>
                    case 'header':
                        return <h1 style={{ fontSize, color }}>{ text }</h1>
                    default:
                        return <p style={{ fontSize, color }}>{ text }</p>
                }
            })()}
        </div>
    )
}
