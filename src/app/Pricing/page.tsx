'use client'
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchPlansThunk} from "@/redux/slices/subscriptionPlansSlice";
import {deactivateDeviceThunk, login} from "@/redux/slices/AuthSlices/loginSlice";
import {addSubPlanThunk} from "@/redux/slices/addSubPlanSlice";
export default function Pricing() {
    const dispatch = useDispatch<AppDispatch>();
    var planId=1;
    const { plans, loading } = useSelector((state: RootState) => state.subscriptionPlans);
    const { companyId, token } = useSelector((state: RootState) => ({
        companyId: state.login.user?.id ?? "",
        token: state.login.token ?? ""
    }));
    const deviceID = useSelector((state: RootState) => state.login.deviceId ?? "");
    useEffect(() => {
        dispatch(fetchPlansThunk());
    }, [dispatch]);


    const [isAccordion, setIsAccordion] = useState<number>(0);
    const handleAccordion = (key: any) => {
        setIsAccordion(prevState => prevState === key ? null : key);
    };
    const [subscriptionPlanId, setSubscriptionPlanId] = useState<number>(4);
    const [subscriptionDuration, setSubscriptionDuration] = useState<number>(1);
    const [clientKey, setclientKey] = useState<String>("");
    const url = "http://localhost:3001/paymentPage";
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const handleDeactivateDevice = async (deviceId: string) => {
        try {
            // Dispatch the async thunk action to deactivate the device
            const resultAction = await dispatch(deactivateDeviceThunk({ deviceId }));

            // Handle fulfilled response
            if (deactivateDeviceThunk.fulfilled.match(resultAction)) {
                const data = resultAction.payload;
                console.log("Device deactivated successfully:", data);
            }
            // Handle rejected response
            else if (deactivateDeviceThunk.rejected.match(resultAction)) {
                const errorResponse = resultAction.payload as { message: string; status: number };
                console.log("Failed to deactivate device:", errorResponse);

            }
        } catch (error) {
            console.error("Unexpected error during device deactivation:", error);
        }
    };
    const handleAddSubPlan = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Dispatch the async thunk action to add the subscription plan
            const resultAction = await dispatch(addSubPlanThunk({ companyId,subscriptionPlanId: planId, url, subscriptionDuration, token }));

            // Check if the action was fulfilled and handle the response
            if ( resultAction.payload?.status==200) {
                const data = resultAction.payload?.data;
                if (data && data.clientKey) {
                    const clientKey = data.clientKey;
                    const companySubscriptionId = data.companySubscriptionId;
                    console.log("subbb>>>>>>>>",companySubscriptionId)
                    localStorage.setItem('companySubscriptionId', String(companySubscriptionId));
                    setclientKey(clientKey);
                    const baseUrlPayment = `https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_qrM7arVmhSTvOQ6495rUQIbjuquTZ4hc&clientSecret=${clientKey}`;
                    window.location.href = baseUrlPayment;
                    console.log("clientKey Handellll>>>>", clientKey); // Ensure clientKey is logged
                } else {
                    console.log("clientKey is missing or undefined in the response");
                }

                // Set the modal message from the response's message
                setModalMessage(resultAction.payload?.message || "Subscription plan added successfully!");

            } else if ( resultAction.payload?.status!==200) {
                const errorResponse = resultAction.payload as { message: string };
                let errorMessage = errorResponse?.message || "Add subscription failed.";
                if(resultAction.payload?.status==401){
                    handleDeactivateDevice(deviceID);
                    errorMessage="Please Sign In or Register to subscribe";
                }
                // Handle failed action and set error message

                console.log("Failure message>>>>>>", errorResponse);
                setModalMessage(errorMessage);
                setShowModal(true);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            setModalMessage("An unexpected error occurred.");
            setShowModal(true);
        }
    };

    return (
        <>
                    <section className="box-section  background-body ">
                        <div className="container">
                            <div className="row align-items-center d-flex justify-content-center align-items-center">
                                <div className="col-lg-8 wow fadeInUp">
                                    <h3 className="neutral-1000 text-center mt-75">Find Your Perfect Plan</h3>
                                    <p className="text-xl-medium neutral-500 text-center">
                                        Unlock your potential with a subscription plan that evolves with you — intuitive, flexible, and crafted for your success
                                    </p>
                                </div>
                            </div>

                            <div className="row mt-60">
                                {plans.map((plan, index) => (
                                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                                        <div className="card-contact h-100 p-4 border rounded-4 shadow-sm d-flex flex-column justify-content-between pricing-card-hover">
                                            {index === 1 && (
                                                <div className="recommended-label" >
                                                    Recommended
                                                </div>
                                            )}
                                            <div>
                                                <h2 className=" mb-5 text-lg-bold pb-10 text-dark neutral-1000" style={{ fontSize: '2rem' }}>
                                                    {plan.name}
                                                </h2>

                                                {/* Price */}
                                                <h2 className=" text-request mb-3">
                                                    {plan.price} <span className=" text-request mb-2 fs-3" >EGP</span><span className="text-sm text-muted">/month</span>
                                                </h2>

                                                <div className="text-sm mb-2">
                                                    {Number(plan.yearlyDiscountPrecentage) > 0 ? (
                                                        <p>
                                                            <del className="text-muted me-2">{plan.yearlyPriceBeforeDiscount} EGP</del>
                                                            <span className="fw-bold text-request me-1">{plan.yearlyPriceAfterDiscount} EGP</span>
                                                            <span className="text-muted">({plan.yearlyDiscountPrecentage}% off yearly)</span>
                                                        </p>
                                                    ) : (
                                                        <p className="text-muted">Yearly: {plan.yearlyPriceAfterDiscount}EGP</p>
                                                    )}
                                                </div>

                                                <p className=" text-muted mb-3">
                                                    Devices: <strong>{plan.deviceLimt}</strong>
                                                </p>

                                                <hr className="my-3 neutral-1000" />

                                                {/* Features Title - Dark Mode Fix */}
                                                <strong className="mb-3 text-dark neutral-1000">Features</strong>

                                                {/* Features List - Dark Mode Fix */}
                                                <ul className="list-unstyled ps-3" style={{ fontSize: '0.85rem' }}>
                                                    {plan.features.map((feature, i) => (
                                                        <li key={i} className="mb-2 text-sm text-dark neutral-1000">
                                                            <span className="me-2">•</span>{feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="text-center mt-4">
                                                <button
                                                    onClick={() => {
                                                        if (!token) {
                                                            setModalMessage("Please Sign In or Register to subscribe.");
                                                            setShowModal(true);
                                                        } else {
                                                            setSubscriptionPlanId(plan.id);
                                                            setSubscriptionDuration(plan.subscriptionDuration);
                                                            planId=plan.id;

                                                            const handleClick = async () => {
                                                                const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                                                                await handleAddSubPlan(fakeEvent);
                                                            };
                                                            handleClick();
                                                        }
                                                    }}
                                                    className="btn btn-Request w-100"
                                                >
                                                    Subscribe
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} id="responseModal" tabIndex={-1} aria-labelledby="responseModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg rounded-4">
                            <div className="modal-body text-center" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
                                <p className="modal-message" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                    {modalMessage}
                                </p>
                            </div>
                            <div className="modal-footer" style={{ justifyContent: 'center' }}>
                                <button type="button" className="btn btn-Request" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}
