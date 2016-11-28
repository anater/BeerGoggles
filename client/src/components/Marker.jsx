import React from 'react';

export default function Marker({ number, title, top, left, active, onClick }){
    return(
        <button
            className={"c-marker bg-yellow black-60 fw7" + (active && ' active')}
            title={ title }
            onClick={ () => onClick(number, title, `${left}% ${top}%`) }
            style={ {
                top: `${ (top >= 3) ? top - 3 : top }%`,
                left: `${ (left >= 5) ? left - 5 : left }%`
            } }
        >
            { number }
        </button>
    )
}
