import React from 'react';

export default function Marker({ number, title, top, left, height, width, active, disabled, onClick }){
    return(
        <button
            className={"c-marker bg-yellow black-60 fw7" + (active && ' active')}
            disabled={ disabled }
            title={ title }
            onClick={ (disabled || active) ? null : () => onClick(number, title, { top: top, left: left }) }
            style={ {
                top: `${ top }%`,
                left: `${ left }%`,
                width: `${ width }%`,
                height: `${ height }%`
            } }
        ></button>
    )
}
