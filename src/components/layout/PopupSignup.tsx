import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import {registerUser, uploadFileThunk, verifyOtp} from '@/redux/slices/AuthSlices/registerSlice';



export default function PopupSignup({ handleLogin, isRegister, handleRegister }: any) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        phoneNumber: '',
        secondaryPhoneNumber: '',
        password: '',
        confirmPassword: '',
        profilePicture: ''
    });


    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.register);
    const token = useSelector((state: RootState) => state.login.token ?? "");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        address: '',
        phoneNumber: '',
        secondaryPhoneNumber: '',
        password: '',
        confirmPassword: '',
        profilePicture: '' // New error for the profile picture
    });

    const [isOtpVisible, setIsOtpVisible] = useState(false);
    const [otp, setOtp] = useState<string>('');
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Ensure only numbers are entered
            setOtp(value);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const resultAction = await dispatch(verifyOtp({ email: formData.email, otp }));

            if (verifyOtp.fulfilled.match(resultAction)) {
                const SuccessResponse = resultAction.payload as { message: string };
                const SuccessMessage = SuccessResponse?.message || "Account Confirmed successfully.";
                setSuccessMessage(SuccessMessage);
                setErrorMessage(null);
                setTimeout(() => {
                    handleRegister(); // Hide the registration popup
                    handleLogin();    // Show the login popup
                }, 1000);

            } else if (verifyOtp.rejected.match(resultAction)) {
                const errorMessage = "Invalid OTP.";
                setErrorMessage(errorMessage);
                setSuccessMessage(null);
            }
        } catch (err) {
            setErrorMessage("An unexpected error occurred.");
            setSuccessMessage(null);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let formIsValid = true;
        const newErrors: any = {};

        Object.keys(formData).forEach((field) => {
            if (
                !formData[field as keyof typeof formData] &&
                field !== 'profilePicture' &&
                field !== 'secondaryPhoneNumber' // ✅ optional
            ) {
                newErrors[field] = `Please enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
                formIsValid = false;
            }
        });

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            formIsValid = false;
        }
        if (formData.phoneNumber.length !== 11 || !/^\d{11}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be exactly 11 digits';
            formIsValid = false;
        }

        setErrors(newErrors);
        if (!formIsValid) return;

        try {
            const resultAction = await dispatch(registerUser({
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                address: formData.address,
                phoneNumber: formData.phoneNumber,
                secondaryPhoneNumber: formData.secondaryPhoneNumber,
                profilePicture: formData.profilePicture, // Send profile picture in the payload
            }));

            if (registerUser.fulfilled.match(resultAction)) {
                const SuccessResponse = resultAction.payload as { message: string };
                const SuccessMessage = SuccessResponse?.message || "Account created successfully.";
                setSuccessMessage(SuccessMessage);
                setErrorMessage(null);
                setIsOtpVisible(true); // Show OTP field on success
            } else if (registerUser.rejected.match(resultAction)) {
                const errorResponse = resultAction.payload as { message: string };
                const errorMessage = errorResponse?.message || "Failed to create account.";
                setErrorMessage(errorMessage);
                setSuccessMessage(null);
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred.");
            setSuccessMessage(null);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const resultAction = await dispatch(uploadFileThunk({ file, token }));

        if (uploadFileThunk.fulfilled.match(resultAction)) {

            const url = resultAction.payload.data.data; // Access the nested `data` property
            setFormData(prev => ({ ...prev, profilePicture: url }));
            setErrors(prev => ({ ...prev, profilePicture: '' }));
        } else {
            setErrorMessage((resultAction.payload as any)?.message || 'Failed to upload image.');
            setErrors(prev => ({ ...prev, profilePicture: 'Failed to upload profile picture' }));
        }
    };

    const errorStyle = {
        color: 'red',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
        display: 'block'
    };

    return (
        <div className="popup-signup" style={{ display: `${isRegister ? "block" : "none"}` }}>
            <div className="popup-container">
                <div className="popup-content" style={{ maxHeight: '92vh', overflowY: 'auto', overflowX: 'hidden' }}>
                    <a className="close-popup-signup" onClick={handleRegister} />
                    <div className="d-flex align-items-center mt-10 mb-20">
                        <Link href="#">
                            <img
                                src="/assets/imgs/Request/request_icon_blue.png"
                                alt="Request"
                                className="mr-10"
                                style={{ width: '5em', height: 'auto' }}
                            />
                        </Link>
                        <h5 className="neutral-1000 mb-0">Register</h5>
                    </div>

                    {errorMessage && (
                        <div className="alert alert-danger text-center" dir="rtl">
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className="alert alert-success text-center" dir="rtl">
                            {successMessage}
                        </div>
                    )}

                    {/* Show OTP field on successful registration */}
                    {isOtpVisible ? (
                        <div className="form-group">
                            <label className="text-sm-medium">Enter OTP</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={handleOtpChange}
                                maxLength={6} // Ensure OTP is 6 digits long
                            />
                            <div style={errorStyle}>
                                {otp.length !== 6 ? "OTP must be 6 digits long" : ""}
                            </div>
                            <button
                                type="button"
                                className="btn btn-Request mt-3"
                                onClick={handleVerifyOtp}
                            >
                                Verify OTP
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {[{ name: 'fullName', label: 'Full Name', type: 'text' },
                                { name: 'email', label: 'Email', type: 'email' },
                                { name: 'address', label: 'Address', type: 'text' },
                                { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
                                { name: 'secondaryPhoneNumber', label: 'Secondary Phone Number', type: 'text' },
                            ].map(({ name, label, type }) => (
                                <div className="form-group" key={name}>
                                    <label className="text-sm-medium"> {label}{name !== 'secondaryPhoneNumber' ? ' *' : ''}</label>
                                    <input
                                        className="form-control"
                                        type={type}
                                        placeholder={label}
                                        name={name}
                                        value={formData[name as keyof typeof formData]}
                                        onChange={handleChange}
                                    />
                                    {errors[name as keyof typeof formData] && <div style={errorStyle}>{errors[name as keyof typeof formData]}</div>}
                                </div>
                            ))}

                            <div className="row">
                                {[{ name: 'password', label: 'Password' },
                                    { name: 'confirmPassword', label: 'Confirm Password' }
                                ].map(({ name, label }) => (
                                    <div className="col-6" key={name}>
                                        <div className="form-group">
                                            <label className="text-sm-medium">{label} *</label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                placeholder="***********"
                                                name={name}
                                                value={formData[name as keyof typeof formData]}
                                                onChange={handleChange}
                                            />
                                            {errors[name as keyof typeof formData] && <div style={errorStyle}>{errors[name as keyof typeof formData]}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Profile Picture Field */}
                            <div className="form-group">
                                <label className="text-sm-medium">Profile Picture</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    accept="image/*"
                                    name="profilePicture"
                                    onChange={handleFileChange}
                                />
                                {errors.profilePicture && <div style={errorStyle}>{errors.profilePicture}</div>}
                            </div>
                            <div className="form-group mt-45 mb-30 d-flex flex-column  text-center">
                                <button
                                    type="submit"
                                    className="btn btn-Request"
                                    disabled={loading}
                                >
                                    {loading ? 'Register...' : 'Register Account'}
                                    {loading && (
                                        <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8 15L15 8L8 1M15 8L1 8"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
