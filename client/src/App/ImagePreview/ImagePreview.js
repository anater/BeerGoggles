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
    }

    render() {
        return (
            <div
                className="relative"
                style={{
                    transformOrigin: this.props.zoomOrigin,
                    transform: this.props.zoomOrigin ? 'scale(1.5)' : 'scale(1)',
                    transition: 'transform, transform-origin 0.3s ease-out'
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
                        ({coordinates, description}, i) => {
                            // get proportional distances (as percentage)
                            let top = (coordinates.y / this.state.imgHeight) * 100,
                                left = (coordinates.x / this.state.imgWidth) * 100,
                                isActive = (this.props.activeMarker === i);
                            // return marker with position and description
                            return (
                                <Marker
                                    key={ i }
                                    number={ i }
                                    title={ description }
                                    top={ top }
                                    left={ left }
                                    active={ isActive }
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
