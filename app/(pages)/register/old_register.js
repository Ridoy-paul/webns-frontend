'use client';
import { Link, Image, NetworkCaller, routes, Urls } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserData from '@/app/lib/data/utility/UserData';

export default function Register() {
  const router = useRouter();
  //console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd');

  const networkCaller = new NetworkCaller();

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: '',
    password: ''
  });

  // State for OTP
  const [otp, setOtp] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showFormInputs, setShowFormInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(300);
  const [otpSent, setOtpSent] = useState(false);
  const [formProcessing, setFormProcessing] = useState(false);

  // Update state based on input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle phone number submission
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      phone: formData.phone
    }

    const formDataN = new FormData(e.currentTarget);

    const response = await networkCaller.postRequest(Urls.authRegGetOTP(), formDataN);
    //console.log(response);
   // console.log(response.responseData.original.sms.sent_status);
    if (response && response.isSuccess) {
      //console.log('dddddddddddddddddddd');
      setShowOtpInput(true);
      setOtpSent(true);
      startTimer();
      toast.success('An OTP sent to your phone.');
      setShowPhoneInput(false);
    } else {
      toast.error(response.errorMessage);
    }

    setLoading(false);
  };
  

  // Start the OTP timer
  const startTimer = () => {
    setTimer(300);
    const interval = setInterval(() => {
      //console.log('aaaaaaaaa')
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Format timer in mm:ss
  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpLoading(true);

    const formDataN = new FormData();
    formDataN.append('phone', formData.phone);
    formDataN.append('otp', otp);

    formData.otp = otp;

    const response = await networkCaller.postRequest(Urls.authVerifyOTP(), formDataN);

    if (response && response.isSuccess) {
      toast.success('OTP verified!');
      setShowOtpInput(false);
      setShowFormInputs(true);
      setOtp('');
    } else{
      toast.error(response.errorMessage);
    }
    setOtpLoading(false);
  };

  // Resend OTP
  const handleResendOtp = () => {
    setOtpSent(false);
    setShowOtpInput(false);
    setOtp('');
    handlePhoneSubmit(); // Resend OTP
  };

  // Handle final registration submission
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setFormProcessing(true);

    const body = {
      name: formData.name,
      phone: formData.phone,
      password: formData.password,
      otp: formData.otp
    }

    const formDataN = new FormData();
    formDataN.append('name', formData.name);
    formDataN.append('password', formData.password);
    formDataN.append('phone', formData.phone);
    formDataN.append('otp', formData.otp);

    //console.log(formDataN);

    const response = await networkCaller.postRequest(Urls.authRegister(), formDataN);
    if (response && response.isSuccess) {
      const { _token, ...userData } = response.responseData;

      await UserData.storeToken(_token);
      await UserData.storeUserData(userData);

      toast.success('Registration successful!');
      window.location.href = '/user/dashboard';
    } else {
      toast.error(response.errorMessage);
    }
    setFormProcessing(false);
  };

  return (
    <main className="main__content_wrapper">
      <section className="auth-page-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-xl-4 col-md-8 col-12">
              <div className="auth-card">
                <div className="auth-card-head">
                  <div className="auth-card-head-icon">
                    <Image 
                      className="rounded-pill shadow border"
                      src="/assets/img/register.gif" 
                      alt="Register Icon" 
                      width={100} 
                      height={100} 
                      loading="lazy"
                    />
                  </div>
                  <h4 className="auth-card-title">Register an Account</h4>
                </div>
                <div className="auth-card-form-body">

                  {showPhoneInput && (
                    <form className="auth-card-form" onSubmit={handlePhoneSubmit}>
                      <div className="form-group">
                        <div className="form-group-icon">
                          <i className="fi fi-ss-user" />
                        </div>
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
                      <button
                        type="submit"
                        className="auth-card-form-btn primary__btn"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          'Send OTP'
                        )}
                      </button>
                    </form>
                  )}

                  {showOtpInput && (
                    <form className="auth-card-form" onSubmit={handleOtpSubmit}>
                      <div className="form-group">
                        <input
                          name="otp"
                          placeholder="Enter OTP"
                          required
                          type="number"
                          id="otp"
                          className="form-control"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="auth-card-form-btn primary__btn"
                        disabled={otpLoading}
                      >
                        {otpLoading ? (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          'Verify OTP'
                        )}
                      </button>
                      {otpSent && (
                        <div className="mt-3">
                          <span>{timer > 0 ? `OTP expire in ${formatTimer(timer)}` : 'Resend OTP'}</span>
                          <button
                            type="button"
                            className="btn btn-link text-danger"
                            disabled={timer > 0}
                            onClick={handleResendOtp}
                          >
                            Resend OTP
                          </button>
                        </div>
                      )}
                    </form>
                  )}

                  {showFormInputs && (
                    <form className="auth-card-form" onSubmit={handleFinalSubmit}>
                      <div className="form-group">
                        <div className="form-group-icon">
                          <i className="fi fi-ss-user" />
                        </div>
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
                        <div className="form-group-icon">
                          <i className="fi fi-ss-lock" />
                        </div>
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
                      <button
                          type="submit"
                          className="auth-card-form-btn primary__btn"
                          disabled={formProcessing}
                      >
                          {formProcessing ? (
                          <div className="spinner-border spinner-border-sm" role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                          ) : (
                          'Register Account'
                          )}
                      </button>
                    </form>
                  )}
                  <div className="auth-card-bottom">
                    <p className="auth-card-bottom-link">
                      Already have an account?<Link href={routes.login}>Login</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
