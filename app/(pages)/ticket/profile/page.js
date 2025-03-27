"use client";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Image, UserData, NetworkCaller, Urls, TitleWithBackBtn } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { SkeletonLoader } from '@/app/components/ClientLink';

export default function Profile() {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(true);
    const [formProcessing, setProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        photo: '',
    });
    const networkCaller = new NetworkCaller();
    
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);

    const handleFormChange = (e) => {
        const { id, value, type, files } = e.target;
        
        if (type === 'file') {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                    setFormData((prevData) => ({
                        ...prevData,
                        photo: file,
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    const getProfileData = async () => {
        const response = await networkCaller.getRequest(Urls.authProfile());
        
        if (response.status === 401) {
            await UserData.clearToken();
            await UserData.clearUserData();
            router.push('/login');
        }

        if (response && response.isSuccess) {
            setFormData({
                name: response.responseData.name,
                email: response.responseData.email,
                gender: response.responseData.gender,
                photo: response.responseData.photo || '',
            });
           
            if(response.responseData.photo != '') {
                setImagePreview((Urls.getStorageUrl()+response.responseData.photo) || '/assets/img/user.webp');
            } else {
                setImagePreview('/assets/img/user.webp');
            }
        }

        setPageLoading(false);
    };

    const updateProfileData = async (e) => {
        e.preventDefault();
        setProcessing(true);
    
        const formDataN = new FormData(e.currentTarget);
        const response = await networkCaller.postRequest(Urls.updateProfile(), formDataN);

        if (response && response.isSuccess) {
            const { ...userData } = response.responseData;
            await UserData.storeUserData(userData);
            //SidebarProfile();
            toast.success('Profile updated successfully!');
            window.location.reload();
        } else {
            toast.error('Failed to update profile.');
        }
        
        setProcessing(false);
    };
    

    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <>
            <div className="dashboard-mange-profile">
                <div className="dashboard-head-widget style-2 m-0 mt-2 shadow rounded">
                    <TitleWithBackBtn title={`Manage profile`} textColor="text-dark"/>
                </div>
                {pageLoading ? (
                    <SkeletonLoader />
                ) : (
                    <form className="manage-profile-form" onSubmit={updateProfileData} method="post">
                        <div className="dashboard-mange-profile-inner">
                            <div className="row justify-content-center">
                                <div className="col-lg-12 col-md-12 col-12">
                                    <div className="manage-profile-card my-3 mx-0 border shadow">
                                        <div className="manage-profile-img">
                                            <Image alt="Profile" src={imagePreview || '/assets/img/user.webp'} loading="lazy" width={100} height={100} />
                                            <div className="manage-profile-img-btn">
                                                <button
                                                    type="button"
                                                    className="theme-btn secondary-btn icon-right btn btn-primary"
                                                    onClick={() => fileInputRef.current.click()}
                                                >
                                                    <i className="fi-rr-camera" />
                                                    Change photo
                                                </button>
                                                <input
                                                    name="photo"
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="form-control"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFormChange}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-12">
                                                <div className="form-group">
                                                    <label className="form-label ms-1" htmlFor="name">Full Name</label>
                                                    <input
                                                        name="name"
                                                        placeholder="Enter Your Name"
                                                        type="text"
                                                        id="name"
                                                        className="form-control"
                                                        value={formData.name || ''}
                                                        required
                                                        onChange={handleFormChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label className="form-label ms-1" htmlFor="email">Email Address</label>
                                                    <input
                                                        name="email"
                                                        placeholder="your-email@mail.com"
                                                        type="email"
                                                        id="email"
                                                        className="form-control"
                                                        value={formData.email || ''}
                                                        onChange={handleFormChange}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="gender ms-1">Gender*</label>
                                                    <select
                                                        className="form-control form-select cursor-pointer"
                                                        id="gender"
                                                        name="gender"
                                                        onChange={handleFormChange}
                                                        value={formData.gender || ''}
                                                        required
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="others">Others</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="manage-profile-form-button">
                                            <button
                                                type="submit"
                                                className="theme-btn btn btn-primary"
                                                disabled={formProcessing}
                                            >
                                                {formProcessing ? (
                                                    <div className="spinner-border spinner-border-sm" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                ) : (
                                                    'Update Profile'
                                                )}
                                            </button>
                                        </div>
                                        
      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </>
    );
}
