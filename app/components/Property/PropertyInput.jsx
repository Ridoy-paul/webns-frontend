"use client";
import PropertyImage from './PropertyImage';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Urls, UserData } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/app/lib/axios';


export default function PropertyInput({property = null}) {

    const router = useRouter();
    const [authToken, setAuthToken] = useState(null);
    const [formProcessing, setFormProcessing] = useState(false);

    
    const [formData, setFormData] = useState({
        property_id: property?.id,
        name: property?.name,
        address: property?.address,
        cost_per_night: property?.costPerNight,
        available_rooms: property?.availableRooms,
        image: property?.image,
        average_rating: property?.averageRating,
        property_description: property?.descriptions,
        is_active: property?.isActive,
    });

    const [images, setImages] = useState([
        property?.image
    ]);

    const handleImageChange = (newImages) => {
        if (JSON.stringify(newImages) !== JSON.stringify(images)) {
            setImages(newImages);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };


    useEffect(() => {
        const fetchAuthToken = async () => {
            const token = await UserData.getToken();
            setAuthToken(token);
        };

        fetchAuthToken();
    }, []);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormProcessing(true);
    
        const formData = new FormData(e.currentTarget);


        try {
            const response = await axiosInstance.post(Urls.saveProperty(), formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${authToken}`,
              },
            });

            const data = response.data;
            if (data?.isSuccess) {
                toast.success('Property saved successfully!');
                router.push('/user/all-properties');
            } else {
                toast.error('Failed to Add Property.');
            }

          } 
          catch (error) {

            if(error?.response?.status == 401) {
                await UserData.clearToken();
                await UserData.clearUserData();
                window.location.href = '/login';
                }
            
                // This is for validation error
                if(error?.response?.status == 422) {
                try {
                    const errorMessages = JSON.parse(error.response.data.errorMessage);
                    Object.values(errorMessages).forEach(messages => {
                        messages.forEach(msg => toast.error(msg));
                    });
                } catch (e) {
                    toast.error('Validation error occurred, but the message could not be parsed.');
                }
                return;
                }
                
                toast.error(error?.response?.data?.errorMessage || 'Network error! Please try again.');
        } finally {
            setFormProcessing(false);
        }

    };

    //console.log("Property Info: "+property);

    return (

        <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
            <input type="hidden" name="property_id" value={formData.property_id} />
            <div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <label className="form-label" htmlFor="name">Property Name<span className='text-danger'>*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-12 mt-3">
                        <label className="form-label" htmlFor="address">Address<span className='text-danger'>*</span></label>
                        <textarea
                            id="address"
                            name="address"
                            className="form-control"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3 mt-4">
                    <div className="col-md-3">
                        <label className="form-label" htmlFor="cost_per_night">Cost per Night<span className='text-danger'>*</span></label>
                        <input
                            type="number"
                            id="cost_per_night"
                            name="cost_per_night"
                            className="form-control"
                            value={formData.cost_per_night}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label" htmlFor="available_rooms">Available Rooms<span className='text-danger'>*</span></label>
                        <input
                            type="number"
                            id="available_rooms"
                            name="available_rooms"
                            className="form-control"
                            value={formData.available_rooms}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label" htmlFor="average_rating">Average Rating (Min: 0, Max: 5)</label>
                        <input
                            type="number"
                            id="average_rating"
                            name="average_rating"
                            className="form-control"
                            value={formData.average_rating}
                            onChange={handleInputChange}
                            step="0.01"
                            max="5"
                            min="0"
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label" htmlFor="image">Image</label>
                        <PropertyImage imageData={images} onImageChange={handleImageChange} />
                    </div>
                    
                </div>

                <div className="row mb-3">
                    <div className="col-md-12">
                        <label className="form-label" htmlFor="property_description">Property Description</label>
                        <textarea
                            id="property_description"
                            name="property_description"
                            className="form-control"
                            value={formData.property_description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                className="form-check-input"
                                checked={formData.is_active}
                                onChange={() => setFormData({ ...formData, is_active: !formData.is_active })}
                            />
                            <label className="form-check-label" htmlFor="is_active">Active Status</label>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                type="submit" 
                className="btn btn-success"
                disabled={formProcessing}
            >
                {formProcessing ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only"></span>
                    </div>
                ) : (
                    'Save Property'
                )}
            </button>
        </form>
        
    );
}
