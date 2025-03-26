'use client';
import { NetworkCaller, Urls } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { useState } from 'react';
import UserData from '@/app/lib/data/utility/UserData';
import { setBearerToken } from '@/app/lib/axios';
import { AuthenticationSystem } from '@/hooks/Authentication';

const LoginComponent = () => {
    const { mutate } = AuthenticationSystem();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const body = {
            email: email,
            password: password,
        };

        const networkCaller = new NetworkCaller();
        const response = await networkCaller.postRequest(Urls.authLogin(), body);

        if (response.isSuccess) {

            mutate();
            const { _token, userData } = response.responseData;
            await UserData.storeToken(_token);
            await UserData.storeUserData(userData);
            setBearerToken(_token);

            toast.success('Login successful!');
            window.location.href = '/user/dashboard';
        } else {
            toast.error('Login failed. Please check your credentials.');
        }

        setLoading(false);
    };

    return (
        <div className="align-middle">
            <div className="card">
                <div className="card-body">
                    <div className="m-sm-3">
                        <form onSubmit={handleSubmit}>
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

                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-lg btn-primary" disabled={loading}>
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm" role="status">
                                            <span className="sr-only"></span>
                                        </span>
                                    ) : (
                                        "Sign In"
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

export default LoginComponent;
