import React from 'react';

export default function Marker({ number, title, top, left }){
    function handleClick({target}){
        console.log(target.title);
    }
    return(
        <button
            className="c-marker bg-yellow black-60 fw7"
            title={ title }
            onClick={ handleClick }
            style={ {
                top: `calc(${ top }% - 2%)`,
                left: `calc(${ left }% - 2%)`
            } }
        ></button>
    )
}
