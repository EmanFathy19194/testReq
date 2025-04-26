
import Link from "next/link"

export default function BannerHome3() {
	return (
		<>

			<section className="section-box box-banner-home4 background-body">
				<div className="banner-marker wow fadeInUp"> <img className="mr-10 light-mode" src="/assets/imgs/page/homepage4/marker.svg" alt="Travile" /><img className="mr-10 dark-mode" src="/assets/imgs/page/homepage4/marker.svg" alt="Travile" /></div>
				<div className="banner-plus wow fadeInUp"> <img className="mr-10 light-mode" src="/assets/imgs/page/homepage4/plus.svg" alt="Travile" /><img className="mr-10 dark-mode" src="/assets/imgs/page/homepage4/plus-dark.svg" alt="Travile" /></div>
				<div className="banner-fly wow fadeInUp"><img className="mr-10 light-mode" src="/assets/imgs/page/homepage4/fly.svg" alt="Travile" /><img className="mr-10 dark-mode" src="/assets/imgs/page/homepage4/fly-dark.svg" alt="Travile" /></div>
				<div className="container">
					<div className="row align-items-center mt-25">
						<h1 className="neutral-1000 mt-100 ">
							Welcome <span>to Request</span> <br/>Discover <span>Travel Prices <br/>Instantly</span></h1>
					<p className="text-xl-medium neutral-500">Make it easier for everyone to experience the world
						<br />
						Discover curated adventures, handpicked for dreamers like you.</p>
						<div className="col-lg-8 wow fadeInUp"><span className="btn btn-brand-secondary mt-30"> <img className="mr-10" src="/assets/imgs/page/homepage4/earth.svg" alt="Request" />Explore the World</span>
						</div>
					</div>
					<div className="box-image-banner-home4"><img src="/assets/imgs/page/homepage4/banner.png" alt="Travila" />

					</div>
				</div>
			</section>
		</>
	)
}
