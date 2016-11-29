import React, { Component } from 'react';
import Marker from '../../components/Marker';

class ImagePreview extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgWidth: null,
            imgHeight: null
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(!prevState.imgWidth || !prevState.imgHeight){
            // grab img from DOM
            let img = document.querySelector('#previewImg');
            // update state with dimensions
            this.setState({
                imgWidth: img.naturalWidth,
                imgHeight: img.naturalHeight
            })
        }
        if(prevProps.img !== this.props.img){
            this.setState({
                imgWidth: null,
                imgHeight: null
            })
        }
        // TODO: add check for misplaced markers to update dimensions
    }

    render() {
        // console.log('ImagePreview:', this.state.imgWidth, this.state.imgHeight);
        let zoomOrigin = this.props.zoomOrigin;

        return (
            <div
                className="relative"
                style={{
                    transformOrigin: zoomOrigin ? `${zoomOrigin.left}% ${zoomOrigin.top}%` : '50% 50%',
                    // transform: zoomOrigin ? 'scale(1.5)' : 'scale(1)',
                    transition: 'transform, transform-origin 0.3s ease-out',
                    // TODO: move the next few lines to the img tag and constrain this container so the styles work
                    // top: zoomOrigin && ((zoomOrigin.top < 50) ? 0 : 'auto'),
                    // bottom: zoomOrigin && ((zoomOrigin.top > 50) ? 0 : 'auto'),
                    // left: zoomOrigin && ((zoomOrigin.left < 50) ? 0 : 'auto'),
                    // right: zoomOrigin && ((zoomOrigin.left > 50) ? 0 : 'auto')
                }}
            >
                <img
                    className="mw-100"
                    src={ this.props.img }
                    role="presentation"
                    id="previewImg"
                />
                { (this.props.markers && this.state.imgWidth && this.state.imgHeight)
                    // if we recieved markers and have imgWidth and imgHeight in state...
                    && this.props.markers.map(
                        ({coordinates, description, disabled}, i) => {
                            // get size and position for the marker
                            let top = (coordinates[0].y / this.state.imgHeight) * 100,
                                left = (coordinates[0].x / this.state.imgWidth) * 100,
                                width = ((coordinates[1].x - coordinates[0].x) / this.state.imgWidth) * 100,
                                height = ((coordinates[1].y - coordinates[0].y) / this.state.imgHeight) * 100,
                                isActive = (this.props.activeMarker === i);
                            // return marker with position and description
                            return (
                                <Marker
                                    key={ i }
                                    number={ i }
                                    title={ description }
                                    top={ top }
                                    left={ left }
                                    width={ width }
                                    height={ height }
                                    active={ isActive }
                                    disabled={ disabled ? disabled : false }
                                    onClick={ this.props.onMarkerClick }
                                />
                            )
                        }
                    )}
            </div>
        );
    }
}

export default ImagePreview;
