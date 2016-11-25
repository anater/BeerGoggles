import React, { Component } from 'react';

class ScanButton extends Component {
    handleInputChange = ({ target }) => {
        // loop through files...
        for (var i = 0; i < target.files.length; i++) {
            // grab file, create new FileReader
            let file = target.files[i],
                reader = new FileReader();
            // configure FileReader
		    reader.onload = ({ target }) => this.props.onChange( target.result )
		    reader.readAsDataURL(file);
        }
    }

    render() {
        return (
            <label className="border-box db relative w-100 bg-gold pa3 ttu tracked b fw9">
    			Scan a menu
                <input
                    type="file"
                    className="absolute absolute--fill o-0"
                    onChange={ this.handleInputChange }
                />
    		</label>
        )
    }
}

export default ScanButton;
