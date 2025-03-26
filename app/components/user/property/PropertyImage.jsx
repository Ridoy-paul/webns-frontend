'use client';
import { useEffect, useState } from 'react';

export default function PropertyImage({ imageData, onImageChange }) {
    const [isLoading, setLoading] = useState(true);
    const [images, setImages] = useState(Array(4).fill(null));

    useEffect(() => {
        // Initialize images from imageData prop only once
        if (imageData) {
            setImages(imageData);
        }
        setLoading(false);
    }, [imageData]); // Only run this when imageData changes

    useEffect(() => {
        // Call onImageChange only if images change
        //onImageChange(images);
    }, [images, onImageChange]); // Only run this when images change

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = URL.createObjectURL(file);
            // Only set images if the new image is different
            if (newImages[index] !== images[index]) {
                setImages(newImages);
            }
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        // Only set images if the new image is different
        if (newImages[index] !== images[index]) {
            setImages(newImages);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="spinner-border spinner-border-sm ms-2" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <h5 className="card-header">Property Image Upload</h5>
            <div className="card-body">
                <div className="row">
                    {images.map((image, index) => (
                        <div key={index} className="col-md-3 col-sm-3 col-6 mb-3">
                            <div
                                className="upload-area"
                                onClick={() => document.getElementById(`file-upload-${index}`).click()}
                                style={{
                                    border: '2px dashed #007bff',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: image ? 'transparent' : '#f9f9f9',
                                }}
                            >
                                {image ? (
                                    <>
                                        <img
                                            src={image}
                                            alt={`Property ${index + 1}`}
                                            className="img-thumbnail"
                                            style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                                        />
                                        <button
                                            className="btn btn-danger mt-2"
                                            onClick={(e) => { e.stopPropagation(); handleRemoveImage(index); }}
                                        >
                                            Remove
                                        </button>
                                    </>
                                ) : (
                                    <p>Upload Image</p>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(index, e)}
                                    className="d-none"
                                    id={`file-upload-${index}`}
                                    name={`property_image${index}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
