import React from 'react';

export default function ResultNav({ onPrev, onEdit, onNext }){
    return(
        <nav id="listNav" className=" bg-white-80">
            <div className="flex flex-auto justify-between">
                <button
                    className="ph3 pv2 bg-transparent ttu tracked bn black-60 fw9"
                    onClick={ onPrev }
                >
                    Prev
                </button>
                <button
                    className="ph3 pv2 bg-transparent ttu tracked bn black-60 fw9"
                    onClick={ onEdit }
                >
                    Edit
                </button>
                <button 
                    className="ph3 pv2 bg-transparent ttu tracked bn black-60 fw9"
                    onClick={ onNext }
                >
                    Next
                </button>
            </div>
        </nav>
    )
}
