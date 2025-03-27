'use client';
import { Link, Image, NetworkCaller, routes, Urls } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserData from '@/app/lib/data/utility/UserData';
import RegisterComponent from '@/app/components/Auth/RegisterComponent';

export default function Register() {

  const handleOnRegister = (status) => {
      if(status == false) {
          window.location.href = '/user/mess-system/my-mess-list';
      } else {
          window.location.href = '/user/dashboard';
      }
  }


  /*
  const router = useRouter();
  const networkCaller = new NetworkCaller();

  // States
  const [formData, setFormData] = useState({ name: '', phone: '', otp: '', password: '' });
  const [step, setStep] = useState('phoneInput'); // 'phoneInput' | 'otpInput' | 'formInputs'
  const [loading, setLoading] = useState({ phone: false, otp: false, register: false });
  const [timer, setTimer] = useState(300);
  const [otpSent, setOtpSent] = useState(false);

  // Update state based on input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Timer logic
  const startTimer = () => {
    setTimer(300);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
  };

  // API Call Handlers
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

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const formDataN = new FormData();
    formDataN.append('phone', formData.phone);

    handleApiCall(
      Urls.authRegGetOTP(),
      formDataN,
      () => {
        setStep('otpInput');
        setOtpSent(true);
        startTimer();
        toast.success('An OTP has been sent to your phone.');
      },
      null,
      'phone'
    );
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const formDataN = new FormData();
    formDataN.append('phone', formData.phone);
    formDataN.append('otp', formData.otp);

    handleApiCall(
      Urls.authVerifyOTP(),
      formDataN,
      () => {
        setStep('formInputs');
        toast.success('OTP verified!');
      },
      null,
      'otp'
    );
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const formDataN = new FormData();
    Object.keys(formData).forEach((key) => formDataN.append(key, formData[key]));

    handleApiCall(
      Urls.authRegister(),
      formDataN,
      async (response) => {
        const { _token, ...userData } = response.responseData;
        await UserData.storeToken(_token);
        await UserData.storeUserData(userData);
        toast.success('Registration successful!');
        window.location.href = '/user/dashboard';
      },
      null,
      'register'
    );
  };

  const handleResendOtp = () => {
    setOtpSent(false);
    setTimer(0);
    handlePhoneSubmit(new Event('submit'));
  };

  // Render Form Sections
  const renderPhoneInput = () => (
    <form className="auth-card-form" onSubmit={handlePhoneSubmit}>
      <div className="form-group">
        <input
          name="phone"
          placeholder="Ex. 01627...."
          required
          type="number"
          id="phone"
          className="form-control"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="auth-card-form-btn primary__btn" disabled={loading.phone}>
        {loading.phone ? <Spinner /> : 'Send OTP'}
      </button>
    </form>
  );

  const renderOtpInput = () => (
    <form className="auth-card-form" onSubmit={handleOtpSubmit}>
      <div className="form-group">
        <input
          name="otp"
          placeholder="Enter OTP"
          required
          type="number"
          id="otp"
          className="form-control"
          value={formData.otp}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="auth-card-form-btn primary__btn" disabled={loading.otp}>
        {loading.otp ? <Spinner /> : 'Verify OTP'}
      </button>
      {otpSent && (
        <div className="mt-3">
          <span>{timer > 0 ? `OTP expires in ${formatTimer(timer)}` : 'Resend OTP'}</span>
          <button type="button" className="btn btn-link text-danger" disabled={timer > 0} onClick={handleResendOtp}>
            Resend OTP
          </button>
        </div>
      )}
    </form>
  );

  const renderFormInputs = () => (
    <form className="auth-card-form" onSubmit={handleFinalSubmit}>
      <div className="form-group">
        <input
          name="name"
          placeholder="Full name"
          required
          type="text"
          id="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          name="password"
          placeholder="Password"
          required
          type="password"
          id="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="auth-card-form-btn primary__btn" disabled={loading.register}>
        {loading.register ? <Spinner /> : 'Register Account'}
      </button>
    </form>
  );
  */

  return (
    <main className="main__content_wrapper">
      <section className="auth-page-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-xl-4 col-md-8 col-12">

              <RegisterComponent onRegister={handleOnRegister} />

              {/* <div className="auth-card">
                <div className="auth-card-head">
                  <Image
                    className="rounded-pill shadow border"
                    src="/assets/img/register.gif"
                    alt="Register Icon"
                    width={100}
                    height={100}
                    loading="lazy"
                  />
                  <h4 className="auth-card-title">Register an Account</h4>
                </div>
                <div className="auth-card-form-body">
                  {step === 'phoneInput' && renderPhoneInput()}
                  {step === 'otpInput' && renderOtpInput()}
                  {step === 'formInputs' && renderFormInputs()}
                  <div className="auth-card-bottom">
                    <p className="auth-card-bottom-link">
                      Already have an account? <Link href={routes.login}>Login</Link>
                    </p>
                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const Spinner = () => (
  <div className="spinner-border spinner-border-sm" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);
