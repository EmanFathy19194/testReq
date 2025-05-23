import Link from "next/link"

export default function HowItWork1() {
    return (
        <>
            <section className="section-box box-how-it-work background-body">
                <div className="container">
                    <div className="text-center wow fadeInUp">
                        <h2 className="neutral-1000">How It Works</h2>
                        <p className="text-xl-medium neutral-500">Helping tourism companies optimize their booking process with real-time price comparison.</p>
                    </div>
                    <div className="row mt-60 align-items-center">
                        <div className="col-lg-6 wow fadeInUp">
                            <div className="box-image-how">
                                <div className="image-top-how">
                                    <img src="/assets/imgs/page/homepage4/img-how.png" alt="TRavila" />
                                </div>
                                <div className="image-bottom-how">
                                    <img src="/assets/imgs/page/homepage4/img-how2.png" alt="TRavila" />
                                    <img src="/assets/imgs/page/homepage4/img-how3.png" alt="TRavila" />
                                    <div className="shape">
                                        <img className="light-mode" src="/assets/imgs/page/homepage4/wave.png" alt="TRavila" />
                                        <img className="dark-mode" src="/assets/imgs/page/homepage4/wave-dark.png" alt="TRavila" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card-why-travel card-why-travel-2 background-1 wow fadeInUp">
                                <div className="card-image">
                                    <img src="/assets/imgs/page/homepage2/security.svg" alt="Travila" />
                                </div>
                                <div className="card-info">
                                    <Link className="text-xl-bold card-title" href="#">Service Search & Price Comparison</Link>
                                    <p className="text-sm-medium neutral-500 card-desc">
                                        Tourism companies can log in, search for travel services, and compare real-time prices to make better booking decisions. The system connects to external APIs for accurate and up-to-date pricing."
                                    </p>
                                    <Link className="text-sm-medium card-link" href="#">Learn More
                                        <svg width={11} height={10} viewBox="0 0 11 10" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.50011 9.08347L9.58347 5.00011L5.50011 0.916748M9.58347 5.00011L1.41675 5.00011" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="card-why-travel card-why-travel-2 background-2 wow fadeInUp">
                                <div className="card-image">
                                    <img src="/assets/imgs/page/homepage2/policy.svg" alt="Travila" />
                                </div>
                                <div className="card-info">
                                    <Link className="text-xl-bold card-title" href="#">Subscription Tiers & Device Access</Link>
                                    <p className="text-sm-medium neutral-500 card-desc">
                                        The platform has three subscription plans with different service access and device limits, allowing businesses to choose the plan that suits their needs.
                                    </p>
                                    <Link className="text-sm-medium card-link" href="#">Learn More
                                        <svg width={11} height={10} viewBox="0 0 11 10" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.50011 9.08347L9.58347 5.00011L5.50011 0.916748M9.58347 5.00011L1.41675 5.00011" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="card-why-travel card-why-travel-2 background-3 wow fadeInUp">
                                <div className="card-image">
                                    <img src="/assets/imgs/page/homepage2/support.svg" alt="Travila" />
                                </div>
                                <div className="card-info">
                                    <Link className="text-xl-bold card-title" href="#">Platform Management & Support</Link>
                                    <p className="text-sm-medium neutral-500 card-desc">
                                        The platform offers simple tools for tourism companies to manage users, monitor subscriptions, track devices, and provide customer support, ensuring smooth operations and better performance.
                                    </p>
                                    <Link className="text-sm-medium card-link" href="#">Learn More
                                        <svg width={11} height={10} viewBox="0 0 11 10" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.50011 9.08347L9.58347 5.00011L5.50011 0.916748M9.58347 5.00011L1.41675 5.00011" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
