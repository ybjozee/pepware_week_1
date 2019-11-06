import React from 'react';
import { useDropzone } from 'react-dropzone';
import '../App.css';

const Dropzone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept });

  const getClassName = (className, isActive) => {
    return `${className} ${isActive ? `${className}-active` : ''}`;
  };

  return (
    <div className={getClassName('dropzone', isDragActive)} {...getRootProps()}>
      <input className='dropzone-input' {...getInputProps()} />
      <div className='text-center'>
        {isDragActive ? (
          <p className='dropzone-content'>Release to drop the files here</p>
        ) : (
            <div>
              <p className='dropzone-content'>
                Drag and drop some files here, or click to select files
                 </p>
              <p><b>Only txt files accepted</b></p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dropzone;