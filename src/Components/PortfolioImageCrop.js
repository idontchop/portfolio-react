import ReactDOM from 'react-dom';
import React, { useImperativeHandle } from 'react';
import ReactCrop from 'react-image-crop';
import Dropzone from 'react-dropzone';
import 'react-image-crop/dist/ReactCrop.css';
import styled from 'styled-components';

const PortfolioImageWrapperDiv = styled.div`
    max-width: 40%;
    height: auto;
    padding: 1.2em;
`;

const DragWrapperDiv = styled.div`
    padding: ${props => props.inside ? "0": "0.8em"};
    box-shadow: ${props => props.inside ? "1px 1px 8px 5px rgba(0,0,0,0.61)":""};
    color: white;
    margin: 4px;
    text-align: center;
    border-radius: 9px;
    background-color: rgb(134,136,139,${props => dragOpacity(props)});
`;

const DragP = styled.p`
    color: white;
    margin: 1px;
`;

const dragOpacity = (props) => {
    if ( props.isDragActive ) {
        return '1';
    }

    return '0';
}

/**
 * Uses react plugin: https://www.npmjs.com/package/react-image-crop
 * 
 * bug: ok, this will have to be refactored to pull the profile image in here no matter what
 * instead of pulling it from showuser
 */
class PortfolioImageCrop extends React.Component {

    constructor (props) {
        super(props);
        console.log(props)
        this.state = {            
            crop: {
                unit: '%',
                width: 150,
                aspect: 4 / 4,
            },
        };     
        
        this.postImageUrl = '/portfolio/uploadImage';
        this.imageUploadHeaderArgs = { method: 'POST', credentials: 'include' };

        this.loadProfilePic();
    }

    
    onCropChange (crop, percentCrop) {

        this.setState({crop: percentCrop})
        console.log(this.state)
    }

    onCropComplete ( c ) {
        this.setState()
    }

    async handleSubmit () {

        const formData = new FormData();

        console.log(this.state)
        // append the uploaded pic
        formData.append (
            'file',
            new Blob([this.state.portfolioImage], {type: 'image/jpeg'}),
            'profile_pic'
        )

        // append the cropped data info
        formData.append (
            'crop',
            JSON.stringify(this.state.crop)
        )
        console.log (JSON.stringify(this.state.crop))

        // upload via post
        let response = await fetch ( '/portfolio/uploadImage', {
            method: 'POST',
            headers: this.imageUploadHeaderArgs,
            body: formData
        });

        console.log(response)
        if ( response.status !== 200 ) {
            // error here
        } else {

            let responseData = response.json();
            console.log ( responseData );
        }

        // Tell parent to pull the new portfolio image which will now be cropped
        if ( typeof this.props.reload !== 'undefined' ) {
            this.props.reload();
        }

    }

    /**
     * Loads the portfolio image and copies it to a variable.
     * Loads on startup and after the image has been sent for a crop.
     * 
     */
    async loadProfilePic () {

        let response = await fetch (this.props.profileUrl);

        if ( response.status !== 200 ) {
            // user doesn't have a profile pic
            // this is ok, just leave blank
            this.setState({portfolioImage: {}});
        } else {

            let responseData = await response.blob();
            console.log(responseData);
            this.setProfileImageState (responseData);

        }
    }

    /**
     * Accepts the dropped images. If the user drops a bunch, he'll end up with
     * the last image.
     * @param {profile pic} acceptedFiles 
     */
    async onDrop ( acceptedFiles ) {
        
        this.setProfileImageState (acceptedFiles[0]);
        /* why does this not work???
        acceptedFiles.foreach (  async (file) => {
            this.setProfileImageState (file);
        }) */

    }

    /**
     * Accepts the current working file as an arguement,
     * Sets two state elements for easy access:
     * portfolioImage - blob, for transfering
     * portfolioUrl - Url for displaying
     * 
     * @param {} file 
     */
    setProfileImageState ( file ) {
        this.setState( { portfolioImage: file, portfolioUrl: URL.createObjectURL(file) } );
    }

    render () {
        console.log(!!this.state.src)
        console.log(this.state)
        console.log(this.props)
        return (
            <PortfolioImageWrapperDiv>
                <Dropzone onDrop= { (e) => this.onDrop(e)}>
                {( {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} ) => (
                    <DragWrapperDiv {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
                        <ReactCrop
                            src={this.state.portfolioUrl}
                            crop={this.state.crop}
                            onChange={ (c, cp) => this.onCropChange(c,cp) }
                            />
                        <Dropzone onDrop= { (e) => this.onDrop(e)}>
                        {( {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} ) => (
                            <DragWrapperDiv {...getRootProps({isDragActive, isDragAccept, isDragReject})} inside={true}>
                                <input {...getInputProps()} />
                                <DragP>Drop or click to upload</DragP>
                            </DragWrapperDiv>
                        )}
                        </Dropzone>
                    </DragWrapperDiv>
                )}
                </Dropzone>
            <button onClick={ () => this.handleSubmit() } >Save Profile Pic</button>
            </PortfolioImageWrapperDiv>
        )
    }

}

export default PortfolioImageCrop;