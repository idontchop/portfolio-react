import ReactDOM from 'react-dom';
import React, { useImperativeHandle } from 'react';
import ReactCrop from 'react-image-crop';
import Dropzone from 'react-dropzone';
import 'react-image-crop/dist/ReactCrop.css';
import styled from 'styled-components';
import no_profile_pic from '../images/no-profile-pic.svg'

const PortfolioImageWrapperDiv = styled.div`
    padding: ;
`;

const DragWrapperDiv = styled.div`
    padding: ${props => props.inside ? "0": "0.8em"};
    /*box-shadow: ${props => props.inside ? "1px 1px 8px 5px rgba(0,0,0,0.61)":""};*/
    border: ${props => props.inside ? "solid 1px black" : ""}
    color: white;
    margin: 4px;
    text-align: center;
    
    border-radius: ${props => props.inside ? "6px":"9px"};;
    background-color: rgb(134,136,139,${props => dragOpacity(props)});
`;

const DragP = styled.p`
    color: #A68181;
    margin: 1px 1px;
    padding: 3px 1px;
`;

const NoProfileImage = styled.img`
    
    background-color: rgba(255,255,255,0.2);
    border-radius: 9px;
    width: 80%;
    height: auto;
    padding: 1.5em;
`;

const cropImageStyle = {
    width: "80%",
};

const dragOpacity = (props) => {
    if ( props.isDragActive ) {
        return '1';
    }

    return '0';
}

const initialCropSettings = {
    width: 96,
    height: 96,
    x: 2,
    y: 2,
    unit: '%',                
    aspect: 4 / 4,
};

/**
 * Uses react plugin: https://www.npmjs.com/package/react-image-crop
 * 
 * TODO: load profile pic at highest level so guestbook entry changes upon crop
 * 
 * bug: ok, this will have to be refactored to pull the profile image in here no matter what
 * instead of pulling it from showuser
 */
class PortfolioImageCrop extends React.Component {

    constructor (props) {
        super(props);
 
        this.state = {            
            crop: initialCropSettings,
        };     
        
        this.postImageUrl = this.props.portfolioUrl + '/uploadImage';
        this.imageUploadHeaderArgs = { method: 'POST', credentials: 'include' };
        this.imageGetHeaderArgs = { credentials: 'include'};

        this.loadProfilePic();
    }

    
    onCropChange (crop, percentCrop) {

        this.setState({crop: percentCrop})
        
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
        let response = await fetch ( this.postImageUrl, {
            method: 'POST',
            credentials: 'include',
            headers: this.imageUploadHeaderArgs,
            body: formData
        });

        
        if ( response.status !== 200 ) {
            // error here

        } else {

            let responseData = await response.json();
            

        }

        // Tell parent to pull the new portfolio image which will now be cropped
        if ( typeof this.props.reload !== 'undefined' ) {
            await this.props.reload();
        }
        this.loadProfilePic();
        this.setState({crop: initialCropSettings});

    }

    /**
     * Loads the portfolio image and copies it to a variable.
     * Loads on startup and after the image has been sent for a crop.
     * 
     */
    async loadProfilePic () {

        let response = await fetch ( this.props.profilePicUrl, this.imageGetHeaderArgs );
        
        if ( response.status !== 200 ) {
            // user doesn't have a profile pic
            // this is ok, just leave blank
            this.setState({portfolioImage: {}});
        } else {

            let responseData = await response.blob();
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

        return (
            <PortfolioImageWrapperDiv>
                <Dropzone onDrop= { (e) => this.onDrop(e)}>
                {( {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} ) => (
                    <DragWrapperDiv {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
                        {!! this.state.portfolioUrl ? 
                        <ReactCrop
                            src={this.state.portfolioUrl}
                            crop={this.state.crop}
                            
                            onChange={ (c, cp) => this.onCropChange(c,cp) }
                            /> : <NoProfileImage src={no_profile_pic} alt="profile pic" />} 
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
            <button onClick={ () => this.handleSubmit() } 
                className={"btn btn-info"}
                >Crop & Save</button>
            </PortfolioImageWrapperDiv>
        )
    }

}

export default PortfolioImageCrop;