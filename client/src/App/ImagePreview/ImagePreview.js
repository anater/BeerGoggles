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
        // console.log('ImagePreview State:', this.state);
        return (
            <div className="relative">
                <img className="mw-100" src={ this.props.img } role="presentation" id="previewImg" />
                { (this.props.markers && this.state.imgWidth && this.state.imgHeight)
                    && this.props.markers.map(
                        (marker, i) => {
                            // console.log(marker);
                            if(marker.boundingPoly){
                                let position = marker.boundingPoly.vertices[0],
                                    description = marker.description,
                                    imgWidth = this.state.imgWidth,
                                    imgHeight = this.state.imgHeight;
                                return (
                                    <Marker
                                        key={ i }
                                        number={ i }
                                        title={ description }
                                        top={ (position.y / imgHeight) * 100  }
                                        left={ (position.x / imgWidth) * 100 }
                                    />
                                )
                            }
                        }
                    )}
            </div>
        );
    }
}

export default ImagePreview;
