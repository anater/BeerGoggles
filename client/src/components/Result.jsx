import React from 'react'

export default function Result({ brewery, name, abv, style, rating, tastes }){
    return(
        <div id="result1" className="c-beerResult db w-100 pa3 lh-solid bg-dark-gray white tl">
            <div className="cf">
                <div className="fl w-80">
                    <span className="db o-70">
                        { brewery }
                    </span>
                    <h4 className="ma0 f4 mv2 lh-title fwnode6">
                        { name }
                    </h4>
                    <div className="o-70">
                        <span className="br pr2 mr2 b--white-50">
                            { `${abv}%` }
                        </span>
                        <span>
                            { style }
                        </span>
                    </div>
                </div>
                <div className="fr tr w-20">
                    <span className="db o-70">Rating</span>
                    <span className="db ma0 f4 mv2 lh-title fw9 tracked">
                        { rating }
                    </span>
                </div>
            </div>
            { tastes && (
                <ul className="list pa0 ma0 mt3">
                    <li className="pa2 mr1 bg-white-80 black-80 dib fw5">
                        Hoppy
                    </li>
                    <li className="pa2 mr1 bg-white-80 black-80 dib fw5">
                        Dry
                    </li>
                </ul>
            )}
        </div>
    );
};
