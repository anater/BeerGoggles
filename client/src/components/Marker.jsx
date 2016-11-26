import React from 'react';

export default function Marker({ number, title, top, left, active, onClick }){
    return(
        <button
            className={"c-marker bg-yellow black-60 fw7" + (active && ' active')}
            title={ title }
            onClick={ () => onClick(number, title, `${left}% ${top}%`) }
            style={ {
                top: `${ top - 3 }%`,
                left: `${ left - 5 }%`
            } }
        >
            { number }
        </button>
    )
}
