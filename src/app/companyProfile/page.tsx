'use client';

import React from 'react';
import { Button, Card, Table, Row, Col } from 'react-bootstrap';
import Layout from "@/components/layout/Layout";
import {swiperGroup1} from "@/util/swiperOption";
import {Swiper, SwiperSlide} from "swiper/react";
import Link from "next/link";

// Sample data for subscription and active devices
const subscription = {
    tier: 'Pro',
    allowedDevices: 5,
    price: '$49.99/month',
    renewalDate: 'July 12, 2025',
};

const activeDevices = [
    { id: 'Device-001', timestamp: '2025-04-23 14:32', ip: '192.168.0.2' },
    { id: 'Device-002', timestamp: '2025-04-22 09:15', ip: '192.168.0.3' },
    { id: 'Device-003', timestamp: '2025-04-21 17:48', ip: '192.168.0.4' },
];

export default function CompanyProfilePage() {
    const handleSignOut = (deviceId: string) => {
        alert(`Signing out device: ${deviceId}`);
    };

    const handleRemoveDevice = (deviceId: string) => {
        alert(`Removing device: ${deviceId}`);
    };

    return (


        <>

            <Layout headerStyle={2} footerStyle={1}>
                <main className="main">
                    <section className="box-section  background-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* Company Profile */}
                                <section className="section-box box-banner-home3 box-banner-hotel-detail background-body">
                                    <div className="container">
                                        <div className="box-swiper mt-0">
                                            <div className="swiper-container swiper-group-1">
                                                <div className="item-banner-box " style={{ backgroundImage: 'url(/assets/imgs/Request/request_icon_blue.png)' }}>
                                                </div>

                                                <div className="swiper-pagination swiper-pagination-group-1 swiper-pagination-style-1" />
                                            </div>
                                        </div>
                                        <div className="box-search-advance background-card wow fadeInUp">
                                            <div className="box-top-search">
                                                <h4>Awesome Tech Inc.</h4>
                                            </div>
                                            <p className="text-muted">Innovating the future with smart software solutions.</p>
                                            <div >
                                                <p><strong>Email:</strong> lorem@awesometech.com</p>
                                                <p><strong>Phone:</strong> +123 456 7890</p>
                                                <p><strong>Secondary Phone:</strong> +123 456 7890</p>
                                            </div>
                                            <div >
                                                <p><strong>Address:</strong> 123 Lorem Ipsum Street, Dolor Sit, Amet</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Subscription Details */}
                                <Card className="mb-4 shadow-sm">
                                    <Card.Header className="py-2 px-3">
                                        <h6 className="mb-0">Subscription Details</h6>
                                    </Card.Header>
                                    <Card.Body className="py-2 px-3">
                                        <Row>
                                            <Col><strong>Plan:</strong> {subscription.tier}</Col>
                                            <Col><strong>Devices:</strong> {subscription.allowedDevices}</Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col><strong>Renewal:</strong> {subscription.renewalDate}</Col>
                                            <Col><strong>Price:</strong> {subscription.price}</Col>
                                        </Row>
                                        <div className="mt-3">
                                            <Button size="sm" className="btn btn-Request">Upgrade Subscription</Button>
                                        </div>
                                    </Card.Body>
                                </Card>

                                {/* Active Devices Table */}
                                <Card className="shadow-sm">
                                    <Card.Header className="py-2 px-3">
                                        <h6 className="mb-0">Active Devices</h6>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <Table striped hover responsive className="mb-0">
                                            <thead className="table-light">
                                            <tr>
                                                <th>Device ID</th>
                                                <th>Login Time</th>
                                                <th>IP Address</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {activeDevices.map((device, idx) => (
                                                <tr key={idx}>
                                                    <td>{device.id}</td>
                                                    <td>{device.timestamp}</td>
                                                    <td>{device.ip}</td>
                                                    <td>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-secondary"
                                                            className="me-2"
                                                            onClick={() => handleSignOut(device.id)}
                                                        >
                                                            Sign Out
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            onClick={() => handleRemoveDevice(device.id)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                    </section>
                </main>

            </Layout>
        </>
    );
}
