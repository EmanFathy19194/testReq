import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { login, setEmail, setPassword } from '@/redux/slices/AuthSlices/loginSlice';
import { useAppSelector } from "@/lib/hooks";
import { v4 as uuidv4 } from 'uuid';
import {registerUser, verifyOtp} from "@/redux/slices/AuthSlices/registerSlice";

interface PopupSigninProps {
	isLogin: boolean;
	handleLogin: () => void;
	isRegister: boolean;
	handleRegister: () => void;
	isResetPassword: boolean;
	handleResetPassword: () => void;
}

const PopupSignin: React.FC<PopupSigninProps> = ({
													 isLogin,
													 handleLogin,
													 handleRegister,
													 isResetPassword,
													 handleResetPassword,

												 }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { email, password, loading } = useSelector((state: RootState) => state.login);

	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [showOtpSection, setShowOtpSection] = useState(false);
	const [otp, setOtp] = useState('');


	// Device ID state (initialized as a string)
	const [deviceId, setDeviceId] = useState<string>('');
	// useEffect(() => {
	// 	let localDeviceId = localStorage.getItem('deviceId');
	// 	const sessionDeviceId = sessionStorage.getItem('sessionDeviceId');
	//
	// 	if (!localDeviceId) {
	// 		// New browser (or cleared localStorage)
	// 		localDeviceId = uuidv4();
	// 		localStorage.setItem('deviceId', localDeviceId);
	// 		console.log('🆕 New browser detected — device ID generated');
	// 	} else {
	// 		console.log('🌐 Existing browser detected — device ID reused');
	// 	}
	//
	// 	if (!sessionDeviceId) {
	// 		// New tab or first load in this tab
	// 		sessionStorage.setItem('sessionDeviceId', localDeviceId);
	// 		console.log('🪟 New tab detected');
	// 	} else {
	// 		console.log('🔁 Reload in same tab');
	// 	}
	//
	// 	setDeviceId(localDeviceId);
	// }, []);

	useEffect(() => {
		setDeviceId(uuidv4());
		console.log("DDD>>>>>",deviceId)
	}, []);


	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setEmail(e.target.value));
		setEmailError(null);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPassword(e.target.value));
		setPasswordError(null);
	};
	const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOtp(e.target.value);
	};
	const handleVerifyOtp = async () => {
		try {
			const resultAction = await dispatch(verifyOtp({ email, otp }));

			if (verifyOtp.fulfilled.match(resultAction)) {
				const SuccessResponse = resultAction.payload as { message: string };
				const SuccessMessage = SuccessResponse.message || "Account Confirmed successfully.";

				setSuccessMessage(SuccessMessage);
				setErrorMessage(null);

				setTimeout(() => {
					setShowOtpSection(false);
				}, 1000);
			} else if (verifyOtp.rejected.match(resultAction)) {
				const errorMessage = resultAction.payload || "Invalid OTP.";
				setErrorMessage(errorMessage);
				setSuccessMessage(null);
			}
		} catch (err) {
			setErrorMessage("An unexpected error occurred.");
			setSuccessMessage(null);
		}
	};




	const validateForm = () => {
		let isValid = true;
		if (!email) {
			setEmailError('Email is required');
			isValid = false;
		}
		if (!password) {
			setPasswordError('Password is required');
			isValid = false;
		}
		return isValid;
	};

	const error = useAppSelector((state) => state.login.error);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			if (deviceId) {
				const resultAction = await dispatch(login({ deviceId, email, password }));

				if (login.fulfilled.match(resultAction)) {
					setSuccessMessage("Login successful!");
					setErrorMessage(null);
					localStorage.setItem('token',resultAction.payload.token);
					handleLogin();
				} else if (login.rejected.match(resultAction)) {
					const errorResponse = resultAction.payload as { message: string };
					const errorMessage = errorResponse?.message || "Login failed.";

					if (errorMessage.includes("Email not confirmed")) {
						setShowOtpSection(true); // Show OTP input
						setErrorMessage(null);
						setSuccessMessage(null);
					} else {
						setErrorMessage(errorMessage);
						setSuccessMessage(null);
					}
					return errorMessage;
				}

			}
		} catch (error) {
			setErrorMessage("An unexpected error occurred.");
			setSuccessMessage(null);
			return "An unexpected error occurred.";
		}
	};

	return (
		<div className={`popup-signin ${isLogin ? 'd-block' : 'd-none'}`}>
			<div className="popup-container">
				<div className="popup-content">
					<a className="close-popup-signin" onClick={handleLogin} />
					<div className="d-flex align-items-center mb-4 mt-10">
						<Link href="#">
							<img
								src="/assets/imgs/Request/request_icon_blue.png"
								alt="Request"
								className="mr-10"
								style={{ width: '5em', height: 'auto' }}
							/>
						</Link>
						<h5 className="neutral-1000 mb-0">Hello there !</h5>
					</div>


					{/* Login Form */}
					<div className="form-login">
						{/* Success/Error messages on top */}
						{errorMessage && (
							<div className="alert alert-danger text-center">
								{errorMessage}
							</div>
						)}
						{successMessage && (
							<div className="alert alert-success text-center">
								{successMessage}
							</div>
						)}
						{showOtpSection ? (
							<div className="form-group">
								<label className="text-sm-medium">Enter OTP</label>
								<input
									className="form-control"
									type="text"
									placeholder="Enter OTP"
									value={otp}
									onChange={handleOtpChange}
									maxLength={6}
								/>
								<div className="text-danger">
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
							<div className="form-group">
								<label className="text-sm-medium text-start">Username</label>
								<input
									className="form-control text-start"
									type="text"
									placeholder="Email / Username"
									value={email}
									onChange={handleEmailChange}
								/>
								{emailError && <div className="text-danger">{emailError}</div>}
							</div>

							<div className="form-group">
								<label className="text-sm-medium text-start">Password</label>
								<input
									className="form-control text-start"
									type="password"
									placeholder="Enter password"
									value={password}
									onChange={handlePasswordChange}
								/>
								{passwordError && <div className="text-danger">{passwordError}</div>}
							</div>

							<div className="form-group">
								<div className="box-remember-forgot">
									<div className="forgotpass">

										<Link className="text-xs-medium neutral-500" href="#" onClick={(e) => {
											e.preventDefault(); // Prevent default anchor behavior
											handleResetPassword();
											handleLogin();
										}}>
											Forgot password?
										</Link>
									</div>
								</div>
							</div>

							<div className="form-group mt-45 mb-30 d-flex flex-column  text-center">
								<button
									type="submit"
									className="btn btn-Request"
									disabled={loading}
								>
									{loading ? 'Logging in...' : 'Log in'}
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

								<p className="text-sm-medium neutral-500 mt-3">
									Don't have an account?
									<a
										className="neutral-1000 btn-signup"
										onClick={() => {
											handleRegister();
											handleLogin();
										}}
									>
										<span className="text-request"> Register here!</span>
									</a>
								</p>
							</div>
						</form>)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopupSignin;
