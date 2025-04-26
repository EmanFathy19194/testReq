import React, { useState } from 'react';
import {verifyOtp} from "@/redux/slices/AuthSlices/registerSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";
import {
    resetPasswordTH,
    sendOtpPasswordResetTH,
    verifyResetPasswordOtpTH
} from "@/redux/slices/AuthSlices/resstPasswordSlice";

interface PopupResetPasswordProps {
    isResetPassword: boolean;
    handleResetPassword: () => void;
    isLogin: boolean;
    handleLogin: () => void;
}

const PopupResetPassword: React.FC<PopupResetPasswordProps> = ({
                                                                   isResetPassword,
                                                                   handleResetPassword,
                                                                   isLogin,
                                                                   handleLogin,
                                                               }) => {
    const [step, setStep] = useState(1); // 1 = Email, 2 = OTP, 3 = New Password
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [otp, setOTP] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // New error state

    const dispatch = useDispatch<AppDispatch>();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(null);
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOTP(e.target.value);
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    const handlesendOtpPasswordReset = async () => {
        if (!email) {
            setEmailError('Email is required');
            return;
        }

        try {
            const resultAction = await dispatch(sendOtpPasswordResetTH({ email }));

            if (sendOtpPasswordResetTH.fulfilled.match(resultAction)) {
                const SuccessResponse = resultAction.payload as { message: string };
                setSuccessMessage(SuccessResponse?.message || ".");
                setErrorMessage(null);
                setStep(2); // Move to OTP step
            } else {
                setSuccessMessage(null);
                setErrorMessage(resultAction.payload?.message || "Failed to send reset link.");
            }
        } catch {
            setSuccessMessage(null);
            setErrorMessage("Something went wrong while sending the reset link.");
        }
    };

    const verifyResetPassword = async () => {
        try {
            const resultAction = await dispatch(verifyResetPasswordOtpTH({ email, otp }));

            if (verifyResetPasswordOtpTH.fulfilled.match(resultAction)) {
                const SuccessResponse = resultAction.payload as { message: string };
                setSuccessMessage(SuccessResponse?.message || "OTP Verified.");
                setErrorMessage(null);
                setStep(3); // Move to password reset step
            } else {
                setSuccessMessage(null);
                setErrorMessage(resultAction.payload?.message || "Invalid OTP.");
            }
        } catch {
            setSuccessMessage(null);
            setErrorMessage("Something went wrong while verifying the OTP.");
        }
    };

    const handleresetPassword = async () => {
        try {
            const resultAction = await dispatch(resetPasswordTH({ email, newPassword, otp }));

            if (resetPasswordTH.fulfilled.match(resultAction)) {
                const SuccessResponse = resultAction.payload as { message: string };
                setSuccessMessage(SuccessResponse?.message || "Password Reset Successfully.");
                setErrorMessage(null);
                setTimeout(() => {
                    handleResetPassword();
                    handleLogin();
                }, 1000);
            } else {
                setSuccessMessage(null);
                setErrorMessage(resultAction.payload?.message ?? "Failed to reset password.");
            }
        } catch {
            setSuccessMessage(null);
            setErrorMessage("Something went wrong while resetting the password.");
        }
    };

    return (
        <div className={`popup-signin ${isResetPassword ? 'd-block' : 'd-none'}`}>
            <div className="popup-container">
                <div className="popup-content">
                    <a className="close-popup-signin" onClick={handleResetPassword} />
                    <div className="d-flex align-items-center mb-4 mt-10">
                        <img
                            src="/assets/imgs/Request/request_icon_blue.png"
                            alt="Reset"
                            className="mr-10"
                            style={{ width: '5em', height: 'auto' }}
                        />
                        <h5 className="neutral-1000 mb-0">Reset Your Password</h5>
                    </div>

                    <div className="form-login">
                        {emailError && <div className="alert alert-danger text-center">{emailError}</div>}
                        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

                        {step === 1 && (
                            <div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="form-group mt-4 mb-3 text-center">
                                    <button type="button" className="btn btn-Request" onClick={handlesendOtpPasswordReset}>
                                        Send OTP Code
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <div className="form-group">
                                    <label>Enter OTP</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={handleOtpChange}
                                    />
                                </div>
                                <div className="form-group mt-4 mb-3 text-center">
                                    <button type="button" className="btn btn-Request" onClick={verifyResetPassword}>
                                        Verify OTP
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                    />
                                </div>
                                <div className="form-group mt-4 mb-3 text-center">
                                    <button type="button" className="btn btn-Request" onClick={handleresetPassword}>
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupResetPassword;
