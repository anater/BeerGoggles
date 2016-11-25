import React, { Component } from 'react';
// components
import ImagePreview from './ImagePreview/ImagePreview';
import Result from '../components/Result';
import ResultNav from '../components/ResultNav';
import ScanButton from '../components/ScanButton';
// services
import GoogleVision from '../services/GoogleVision';

function splitByLineBreak(text){
	//console.log(text);
	var regexp = /\r?\n|\r/g,
		splitText;

	splitText = text.split(regexp);
	return splitText;
}

function alphaNum(text){
    var noPrice = text.replace(/\$\S+/g, ''),
        nothingElse = noPrice.replace(/[^\w\s]/gi, '');
    return nothingElse;
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            // currentBeer: {
            //     brewery: 'North Coast Brewing Company',
            //     name: 'Acme California Brown Ale',
            //     abv: '5.6%',
            //     style: 'Brown Ale - American',
            //     rating: '3.4'
            // },
            currentBeer: null,
            currentImg: null,
            imgMarkers: null
        };
    }

    handlePrev = () => console.log('handlePrev')

    handleNext = () => console.log('handleNext')

    handleEdit = () => console.log('handleEdit')
    // updates state with image (URI) and sends to GoogleVision to recieve annotations
    handleScan = (imgURI) => {
        // update state with currentImg
        this.setState({ currentImg: imgURI });
        // send imgURI to GoogleVision and update state markers with annotations in response
        GoogleVision(imgURI, res => {
            var annotations = res.responses[0].textAnnotations,
                text = annotations[0].description, // first item is always the entire text
                textByLine = splitByLineBreak(alphaNum(text)), // TODO: consider another way of breaking the text
                finalText = []; // gets loaded with lines with 4 - 50 characters
            // loop through textByLine...
            for(var i = 0; i < textByLine.length; i++){
                // grab trimmed line
                var line = textByLine[i].trim();
                // if the character length is between 4 & 5 characters...
                if(line.length >= 4 && line.length <= 50){
                    // add it to finalText
                    finalText.push(line);
                }
            }
            // loop through finalText
            let finalAnnotations = finalText.map(line => {
                let newAnnotation = { description: line };
                // go through every annotation
                annotations.forEach(({description, boundingPoly}) => {
                    let indexOfDescription = line.indexOf(description);
                    // if there's a match
                    if(indexOfDescription > 0){
                        newAnnotation.boundingPoly = boundingPoly
                        // console.log(description);
                        console.log('MATCH:', indexOfDescription, line);
                        // check if there are any coordinates
                            // update coordinates
                        // push object with text and coordinates to finalAnnotations ( { description: "", boundingPoly: {} } )
                    }
                });
                return newAnnotation
            });

            console.log('finalAnnotations', finalAnnotations);
            this.setState({ imgMarkers: finalAnnotations })
        });
    }

    render() {
        return (
        	<main className="center tc measure flex flex-column">
                { this.state.currentImg
                    // if we have an image in state...
                    ? <ImagePreview
                        img={ this.state.currentImg }
                        markers={ this.state.imgMarkers }
                    />
                    // otherwise, intro text
                    : (
                        <div className="white">
                            <h1 className="f1 tracked-tight mt5 gold">
                                Beer Goggles
                            </h1>
                            <p className="f4 lh-copy mt5">
                                Snap a photo of a beer menu.<br/>
                                Scan to learn more about its beers.<br/>
                                Enjoy an informed beer choice.
                            </p>
                            <p className="f6 lh-copy mt5">
                                <span className="db fw9">
                                    For best results:
                                </span>
                                Try to fit 10 beers (max) per photo.<br/>
                                Make sure the menu is well-lit.<br/>
                                Drink responsibly.
                            </p>
                        </div>
                    )
                }
                <div className="fixed bottom-0 left-0 right-0 shadow-2">
                    { this.state.currentBeer && (
                        <div>
                            <ResultNav
                                onPrev={ this.handlePrev }
                                onNext={ this.handleNext }
                                onEdit={ this.handleEdit }
                            />
                            <Result
                                brewery={ this.state.currentBeer.brewery }
                                name={ this.state.currentBeer.name }
                                abv={ this.state.currentBeer.abv }
                                style={ this.state.currentBeer.style }
                                rating={ this.state.currentBeer.rating }
                            />
                        </div>
                    )}
                    <ScanButton onChange={ this.handleScan } />
                </div>
        	</main>
        );
    }
}

export default App;
