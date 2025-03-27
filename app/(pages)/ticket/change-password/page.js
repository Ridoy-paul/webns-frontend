'use client';
import { NetworkCaller, Urls, TitleWithBackBtn } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function Messages() {
    const networkCaller = new NetworkCaller();
    const [formProcessing, setfProcessing] = useState(false);

    const [allPasswordsVisible, setAllPasswordsVisible] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setfProcessing(true);

        const formDataN = new FormData(e.currentTarget);
        const response = await networkCaller.postRequest(Urls.authChangePassword(), formDataN);

        if (response && response.isSuccess) {
            toast.success('New Password has been reset.');
            window.location.href = '/user/dashboard';
        } else {
            toast.error(response.errorMessage);
        }

        setfProcessing(false);
    };

    const toggleAllPasswordsVisibility = () => {
        setAllPasswordsVisible(!allPasswordsVisible);
    };

    return (
        <>
            <div className="wishlist-page-area mgTop24">
                <div className="dashboard-head-widget style-2">
                    <TitleWithBackBtn title={`Change Password`} textColor="text-dark" />
                </div>
                <div className="wishlist-items-area" style={{ marginTop: 32 }}>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <div className="change-password-card">
                                <form
                                    onSubmit={handleChangePassword}
                                    method="post"
                                    id="changePasswordForm"
                                    className="change-password-form"
                                >
                                    <div className="form-group">
                                        <label className="ms-0" htmlFor="oldPassword">Type old password</label>
                                        <div className="form-group-password">
                                            <input
                                                type={allPasswordsVisible ? 'text' : 'password'}
                                                className="form-control"
                                                id="oldPassword"
                                                required=""
                                                name='old_password'
                                            />
                                            <div className="input-group-append">
                                                <div onClick={toggleAllPasswordsVisibility}>
                                                    <i
                                                        id="oldPasswordIcon"
                                                        className={allPasswordsVisible ? "fi-rr-eye" : "fi-rr-eye-crossed"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="ms-0" htmlFor="newPassword">Set a new password</label>
                                        <div className="form-group-password">
                                            <input
                                                type={allPasswordsVisible ? 'text' : 'password'}
                                                className="form-control"
                                                id="newPassword"
                                                required=""
                                                name='password'
                                            />
                                            <div className="input-group-append">
                                                <div onClick={toggleAllPasswordsVisibility}>
                                                    <i
                                                        id="newPasswordIcon"
                                                        className={allPasswordsVisible ? "fi-rr-eye" : "fi-rr-eye-crossed"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="ms-0" htmlFor="confirmPassword">Confirm password</label>
                                        <div className="form-group-password">
                                            <input
                                                type={allPasswordsVisible ? 'text' : 'password'}
                                                className="form-control"
                                                id="confirmPassword"
                                                required=""
                                                name='password_confirmation'
                                            />
                                            <div className="input-group-append">
                                                <div onClick={toggleAllPasswordsVisibility}>
                                                    <i
                                                        id="confirmPasswordIcon"
                                                        className={allPasswordsVisible ? "fi-rr-eye" : "fi-rr-eye-crossed"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="theme-btn btn btn-primary mb-5"
                                            disabled={formProcessing}
                                        >
                                            {formProcessing ? (
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            ) : (
                                                'Change Password'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </>
    );
}
