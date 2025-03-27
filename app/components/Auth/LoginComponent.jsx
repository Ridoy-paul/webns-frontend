'use client';
import { NetworkCaller, Urls } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserData from '@/app/lib/data/utility/UserData';
import { setBearerToken } from '@/app/lib/axios';
import { AuthenticationSystem } from '@/hooks/Authentication';

const LoginComponent = ({ onLogin}) => {
    const { csrf, mutate } = AuthenticationSystem();
    const router = useRouter();
    const networkCaller = new NetworkCaller();

    const searchParams = useSearchParams();
    const redirected = searchParams.get('r');

    useEffect(() => {
        if (redirected) {
            toast.warning('Please log in to access this.');
        }
    }, [redirected]);

    const [formProcessing, setFormProcessing] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormProcessing(true);

        const body = {
            email: formData.email,
            password: formData.password,
        }

        const formDataN = new FormData();
        formDataN.append('email', formData.email);
        formDataN.append('password', formData.password);
        
        const response = await networkCaller.postRequest(Urls.authLogin(), formDataN);

        if (response && response.isSuccess) {
            mutate();
            const { _token, ...userData } = response.responseData;

            await UserData.storeToken(_token);
            await UserData.storeUserData(userData);
            setBearerToken(_token);

            toast.success('Login successful!');
            onLogin(true);
        }
        if(!response.isSuccess) {
            toast.warning(response.errorMessage);
        }
        setFormProcessing(false);
    }

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

                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-lg btn-primary" disabled={formProcessing}>
                                    {formProcessing ? (
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
