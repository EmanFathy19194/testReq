import Link from "next/link"

export default function OurFeatured1() {
    return (
        <section className="section-box box-our-featured background-2 background-body">
            <div className="container">
                {/* Centered Heading */}
                <div className="row justify-content-center">
                    <div className="col-12 mb-4 text-center mt-60">
                        <h2 className="neutral-1000">Our Key Services</h2>
                        <p className="text-xl-medium neutral-500">
                            Empowering tourism companies with real-time insights
                        </p>
                    </div>
                </div>

                {/* Featured Cards */}
                <div className="box-list-featured">
                    <div className="row">
                        {/* Hotel Pricing Service */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card-journey-small background-card">
                                <div className="card-image">
                                    <Link className="label" href="#">Live Rates</Link>
                                    <img src="/assets/imgs/page/homepage1/journey3.png" alt="Hotel Pricing" />
                                </div>
                                <div className="card-info background-card">
                                    <div className="card-title">
                                        <Link className="heading-6 neutral-1000" href="#">
                                            Real-Time Hotel Pricing
                                        </Link>
                                    </div>
                                    <p className="text-md-medium neutral-500 mb-3">
                                        Instantly access and compare hotel rates from multiple providers through API integrations.
                                    </p>
                                    <div className="card-button">
                                        <Link className="btn btn-gray" href="#">Explore</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tour Packages Service */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card-journey-small background-card">
                                <div className="card-image">
                                    <Link className="label bestsale" href="#">Top Picks</Link>
                                    <img src="/assets/imgs/page/homepage1/journey4.png" alt="Tour Packages" />
                                </div>
                                <div className="card-info background-card">
                                    <div className="card-title">
                                        <Link className="heading-6 neutral-1000" href="#">
                                            Internal Tour Packages
                                        </Link>
                                    </div>
                                    <p className="text-md-medium neutral-500 mb-3">
                                        Discover curated tour offerings with dynamic pricing, duration, and guest capacity.
                                    </p>
                                    <div className="card-button">
                                        <Link className="btn btn-gray" href="#">Explore</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card-journey-small background-card">
                                <div className="card-image">
                                    <Link className="label bestsale" href="#">Best Value</Link>
                                    <img src="/assets/imgs/page/homepage1/journey2.png" alt="Tour Packages" />
                                </div>
                                <div className="card-info background-card">
                                    <div className="card-title">
                                        <Link className="heading-6 neutral-1000" href="#">
                                            Transportation Options
                                        </Link>
                                    </div>
                                    <p className="text-md-medium neutral-500 mb-3">
                                        Evaluate and local transport options, including cost estimates and availability details, for efficient travel arrangements.
                                    </p>
                                    <div className="card-button">
                                        <Link className="btn btn-gray" href="#">Explore</Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}
