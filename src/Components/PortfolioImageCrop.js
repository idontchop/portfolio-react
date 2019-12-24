import ReactDOM from 'react-dom';
import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

/**
 * Uses react plugin: https://www.npmjs.com/package/react-image-crop
 */
class PortfolioImageCrop extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            src: props.src,
            crop: {
                unit: '%',
                width: 50,
                aspect: 4 / 4,
            },
        };        
    }


    onCropChange (e) {

        this.setState({crop: e})
        console.log(this.state)
    }

    onCropComplete ( c ) {
        this.setState()
    }

    render () {
        return (
            <ReactCrop
                src={this.state.src}
                crop={this.state.crop}
                onChange={ e => this.onCropChange(e) }
                />
        )
    }

}

export default PortfolioImageCrop;