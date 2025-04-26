'use client'
import Layout from "@/components/layout/Layout"
import WhyBookRequest from "@/components/sections/WhyBookRequest";
import HowItHelpsCompanies from "@/components/sections/HowItHelpsCompanies";

import Testimonials7 from "@/components/sections/Testimonials7";

export default function About() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<section className="section-box box-about-1 background-body">
						<div className="container">
							<div className="row align-items-end">
								<div className="col-lg-7 wow fadeInUp">
									<h1 className="neutral-1000 mt-15 mb-15">
										Unleash<span> Your Wanderlust</span> with Request </h1>
									<p className="text-xl-medium neutral-500"> More than a trip — it’s your next unforgettable story</p>
								</div>
								<div className="col-lg-5">
									<div className="box-icon-flight"><img src="/assets/imgs/page/pages/flight.png" alt="Travile" />
										<h6 className="neutral-1000">Our mission is to make world-class travel accessible through transparent and affordable pricing</h6>
									</div>
								</div>
							</div>
						</div>
					</section>
					<HowItHelpsCompanies/>
					<WhyBookRequest/>
					<Testimonials7/>

				</div>

			</Layout>
		</>
	)
}