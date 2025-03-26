'use client';

import { useState } from 'react';
import { axiosInstance } from '@/app/lib/axios';
import { toast } from 'react-toastify';
import { AuthenticationSystem } from '@/hooks/Authentication';
import { setBearerToken } from '@/app/lib/axios';
import { UserData } from '@/app/components/Link';

const RegisterComponent = () => {
    const { csrf, mutate } = AuthenticationSystem();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await axiosInstance.post('/register', {
                name,
                email,
                password
            });

            const responseData = response?.data;
            
            if (responseData.isSuccess == true) {
                mutate()
                const { _token, userData } = responseData.responseData;
                await UserData.storeToken(_token);
                await UserData.storeUserData(userData);
                setBearerToken(_token);
                toast.success('Registration successful!');
                window.location.href = '/user/dashboard';
            } 
            else {
                toast.error(response.errorMessage);
            }
        } catch (error) {
            //console.error(error);
            toast.error(error?.response?.data?.errorMessage || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="align-middle">
            <div className="card">
                <div className="card-body">
                    <div className="m-sm-3">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label mb-1">Full name<span className='text-danger'>*</span></label>
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    minLength={8}
                                    required
                                />
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-lg btn-primary" disabled={loading}>
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm" role="status">
                                            <span className="sr-only"></span>
                                        </span>
                                    ) : (
                                        "Sign Up"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
