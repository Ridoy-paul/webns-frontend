'use client';
import RegisterComponent from '@/app/components/Auth/RegisterComponent';

export default function Register() {
  
  return (
    <main className="main__content_wrapper">
      <section className="auth-page-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-xl-6 col-md-8 col-12">
              <RegisterComponent />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
