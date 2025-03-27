'use client';

import LoginComponent from "@/app/components/Auth/LoginComponent";

export default function Login() {
    const handleOnLogin = (status) => {
        window.location.href = '/user/dashboard';
    }

    return (
        <main className="main__content_wrapper">
        <section className="auth-page-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-xl-6 col-md-6 col-12">
                        <LoginComponent onLogin={handleOnLogin}/>
                    </div>
                </div>
            </div>
        </section>
    </main>
    );
}
