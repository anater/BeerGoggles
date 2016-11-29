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
        let isLoading = this.props.isLoading;
        return (
            <label className={`border-box db relative w-100 pa3 ttu tracked b fw9 ${ isLoading ? 'bg-gray white' : 'bg-gold'}`}>
    			{ isLoading ? 'Loading...' : 'Scan a menu'}
                <input
                    type="file"
                    className="absolute absolute--fill o-0"
                    onChange={ this.handleInputChange }
                    disabled={ isLoading }
                />
    		</label>
        )
    }
}

export default ScanButton;
