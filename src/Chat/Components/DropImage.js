import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styled from 'styled-components'
import PortfolioChatApi from '../lib/PortfolioChatApi';

const UploadBox = styled.div`
    background-color: white;
    margin: 0;
    padding: 0;
    border: 1px white solid;
`;

/**
 * This uploads an image to a message thread. It works... but lots to do
 * 
 * 1. Preview images
 * 2. Better indication upload successful
 * 3. Better styling
 * 4. file size checks / image checks
 * 
 * @param {threadId} props 
 */
function DropImage(props) {



    const {getRootProps, getInputProps, isDragActive, open, acceptedFiles}
     = useDropzone({accept: 'image/jpeg, image/png'})

    const files = acceptedFiles.map(file => (
    <li key={file.path}>
        {file.path} - {file.size} {file.status}
    </li>
    ));

    const unsentFiles = acceptedFiles.reduce 
        ( (num, file) => num += file.status === 'sent' ? 0 : 1, []);

    const handleSubmit = () => {

        acceptedFiles.forEach ( (file) => {
            let formData = new FormData();

            // append the uploaded pic
            formData.append (
                'file',
                new Blob([file], {type: 'image/jpeg'}),
                'message_image'
            )

            formData.append (
                'content', ""
            )

            PortfolioChatApi.postForm(`newImageMessage/${props.threadId}`, formData)
                .then ( console.log("uploadsuccessful"), file['status'] = 'sent')
        });
    }


  return (
      <>
    <UploadBox {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }

      <aside>
        <h4>Files - temp view</h4>
        <ul>{files}</ul>
      </aside>
      
    </UploadBox>
    {unsentFiles > 0 ? <button onClick={handleSubmit}>upload</button> : <></>}
    </>
  )
}

export default DropImage;