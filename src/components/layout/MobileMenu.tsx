'use client'
import Link from 'next/link'
import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

export default function MobileMenu({ isMobileMenu, handleMobileMenu, handleLogin}: any) {
	const [isAccordion, setIsAccordion] = useState(0)

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>
			<div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${isMobileMenu ? "sidebar-visible" : ""}`}>
				<PerfectScrollbar className="mobile-header-wrapper-inner">
					<div className="mobile-header-logo"> <Link className="d-flex" href="/"><img className="light-mode w-75" alt="Request" src="/assets/imgs/Request/request_blue.png" /><img className="dark-mode w-75" alt="Request" src="/assets/imgs/Request/request_blue.png" /></Link>
						<div className="burger-icon burger-icon-white" onClick={handleMobileMenu} />
					</div>
					<div className="mobile-header-top">
						<div className="box-author-profile">
							<div className="card-author">
								<div className="card-image"> <img src="/assets/imgs/Request/request_icon_blue.png" alt="Request" /></div>
								<div className="card-info">
									<p className="text-md-bold neutral-1000">Request.com</p>
								</div>
							</div><a className="btn btn-default btn-signin" onClick={handleLogin}>Signin</a>
						</div>
					</div>
					<div className="mobile-header-content-area">
						<div className="perfect-scroll">
							<div className="mobile-menu-wrap mobile-header-border">
								<nav>
									<ul className="mobile-menu font-heading">
										<ul className="main-menu">
											<li><Link href="/">Home</Link></li>
											<li><Link href="/about">About</Link></li>
											<li><Link href="/contact">Contact</Link></li>
											<li><Link href="/pricing">Pricing</Link></li>


										</ul>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</PerfectScrollbar>
			</div>
		</>
	)
}
