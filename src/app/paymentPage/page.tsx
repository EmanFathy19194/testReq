// app/payment-status/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Spinner, Button, Card } from 'react-bootstrap';
import Link from "next/link";
import {SubscriptionStatusTh} from "@/redux/slices/CompenySubSlice";

import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";



type PaymentStatus = 'loading' | 'success' | 'fail';

const PaymentStatusPage = () => {
    const [status, setStatus] = useState<PaymentStatus>('loading');
    var companySubscriptionId=0;
    const token: string = localStorage.getItem('token') || '';
    const storedCompanySubscriptionId = localStorage.getItem('companySubscriptionId');
    const dispatch = useDispatch<AppDispatch>();
    // SubscriptionStatusTh
    useEffect(() => {
        if (storedCompanySubscriptionId) {
            companySubscriptionId = Number(storedCompanySubscriptionId); // Convert it to a number

            console.log("Retrieved companySubscriptionId:", companySubscriptionId);
        } else {
            console.log("companySubscriptionId not found in localStorage.");
        }

        const checkSubscription = async () => {
            try {
                const resultAction = await dispatch(
                    SubscriptionStatusTh({ id: companySubscriptionId, token:token })
                );

                if (SubscriptionStatusTh.fulfilled.match(resultAction)) {
                    const isActive = resultAction.payload?.isActive;
                    setStatus(isActive ? "success" : "fail");
                } else if (SubscriptionStatusTh.rejected.match(resultAction)) {
                    const isActive = resultAction.payload?.data;
                    setStatus(isActive ? "success" : "fail");
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                setStatus("fail");
            }
        };

        checkSubscription();
    }, [dispatch, companySubscriptionId, token || ""]);



    const renderContent = () => {
        if (status === 'loading') {
            return (
                <div className="text-center">
                    <Spinner animation="border" role="status" />
                    <p className="mt-4 fs-5">Checking payment status...</p>
                </div>
            );
        }

        if (status === 'success') {
            return (
                <>
                    <h2 className="text-success mb-3">🎉 Payment Successful!</h2>
                    <p className="fs-5 mb-4">Your subscription has been activated.</p>
                    <Link href="/homeAfterSubscription" passHref legacyBehavior>
                        <Button variant="success" size="lg" onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('companySubscriptionId');
                        }}>
                            Go to Home
                        </Button>
                    </Link>
                </>
            );
        }

        return (
            <>
                <h2 className="text-danger mb-3">❌ Payment Failed</h2>
                <p className="fs-5 mb-4">Something went wrong with your payment.</p>
                <Link href="/Pricing" passHref legacyBehavior>
                    <Button variant="danger" size="lg" onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('companySubscriptionId');
                    }}>
                        Retry Subscription
                    </Button>
                </Link>
            </>
        );
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Card
                className="text-center p-5 shadow-lg"
                style={{ width: '100%', maxWidth: '600px', borderRadius: '1.5rem' }}
            >
                <Card.Body>{renderContent()}</Card.Body>
            </Card>
        </div>
    );
};

export default PaymentStatusPage;