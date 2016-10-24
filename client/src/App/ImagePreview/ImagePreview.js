import React, { Component } from 'react';
import testImg from '../img/vespr-menu.jpg';

class ImagePreview extends Component {
    imgStyle = {
        pointerEvents: 'none'
    };

    resultStyles = [
        {
            top: '140px',
            left: '30px'
        },
        {
            top: '140px',
            left: '160px'
        }
    ];

    render() {
        return (
            <div className="relative">
                <img className="mw-100" src={ testImg } id="beerMenuImg" style={ this.imgStyle } alt=""/>
                <button href="#result1" className="c-marker active bg-yellow black-60 fw7" style={ this.resultStyles[0] }>1</button>
                <button href="#result2" className="c-marker bg-yellow black-60 fw7" style={ this.resultStyles[1] }>2</button>
            </div>
        );
    }
}

export default ImagePreview;
