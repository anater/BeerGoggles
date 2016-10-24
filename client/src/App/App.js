import React, { Component } from 'react';
// components
import ImagePreview from './ImagePreview/ImagePreview';
import Result from '../components/Result.jsx';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        return (
        	<main className="center tc measure flex flex-column">
                <ImagePreview />
                <div className="fixed bottom-0 left-0 right-0 shadow-2">
                    <nav id="listNav" className=" bg-white-80">
                        <div className="flex flex-auto justify-between">
                            <button className="ph3 pv2 bg-transparent ttu tracked bn black-60 fw9">Prev</button>
                            <button className="ph3 pv2 bg-transparent ttu tracked bn black-60 fw9">Edit</button>
                            <button className="ph3 pv2 bg-transparent ttu tracked bn black-60 fw9">Next</button>
                        </div>
                    </nav>
                    <Result />
                    <button className="db w-100 pa3 bg-yellow black-60 fw9 tracked ttu bn">Scan a Menu</button>
                </div>
        	</main>
        );
    }
}

export default App;
