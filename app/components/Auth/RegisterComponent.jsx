'use client';
import { NetworkCaller, Urls } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { useState } from 'react';
import UserData from '@/app/lib/data/utility/UserData';
import { setBearerToken } from '@/app/lib/axios';
import { AuthenticationSystem } from '@/hooks/Authentication';

const RegisterComponent = ({ onRegister, isShowOtherInfo = true }) => {
    const { mutate } = AuthenticationSystem();
    const networkCaller = new NetworkCaller();

    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [loading, setLoading] = useState({ register: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleApiCall = async (url, data, onSuccess, onFailure, key) => {
        setLoading((prev) => ({ ...prev, [key]: true }));
        const response = await networkCaller.postRequest(url, data);
        if (response?.isSuccess) {
            onSuccess(response);
        } else {
            toast.error(response?.errorMessage || 'Something went wrong!');
            onFailure?.();
        }
        setLoading((prev) => ({ ...prev, [key]: false }));
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        const formDataN = new FormData();
        Object.keys(formData).forEach((key) => formDataN.append(key, formData[key]));

        handleApiCall(
            Urls.authRegister(),
            formDataN,
            async (response) => {
                mutate();
                const { _token, ...userData } = response.responseData;
                await UserData.storeToken(_token);
                await UserData.storeUserData(userData);
                setBearerToken(_token);

                toast.success('Registration successful!');
                onRegister(true);
            },
            null,
            'register'
        );
    };

    return (
        <div className="align-middle">
            <div className="card">
                <div className="card-body">
                    <div className="m-sm-3">
                        <form onSubmit={handleFinalSubmit}>
                            <div className="mb-3">
                                <label className="form-label mb-1">Full name<span className='text-danger'>*</span></label>
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label mb-1">Email<span className='text-danger'>*</span></label>
                                <input
                                    className="form-control form-control-lg"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label mb-1">Password<span className='text-danger'>*</span></label>
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    minLength={8}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label mb-1">Confirm Password<span className='text-danger'>*</span></label>
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    minLength={8}
                                    required
                                />
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-lg btn-primary" disabled={loading.register}>
                                    {loading.register ? <Spinner /> : 'Register Account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Spinner = () => (
    <div className="spinner-border spinner-border-sm" role="status">
        <span className="sr-only"></span>
    </div>
);

export default RegisterComponent;
