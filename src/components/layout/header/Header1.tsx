'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import PaymentStatusPage from "@/app/paymentPage/page";

const ThemeSwitch = dynamic(() => import('@/components/elements/ThemeSwitch'), {
	ssr: false,
})

export default function Header1({ scroll, handleLogin, handleMobileMenu, handleRegister, handleSidebar }: any) {
	return (
		<>
			<header className={`header sticky-bar ${scroll ? "stick" : ""}`}>
				<div className="container-fluid background-body">
					<div className="main-header p-15">
						{/* Moved burger icon to the top */}
						<div className="header-left">
							<div className="burger-icon burger-icon-white mt-1" onClick={handleMobileMenu}>
								<span className="burger-icon-top" />
								<span className="burger-icon-mid" />
								<span className="burger-icon-bottom" />
							</div>
							<div className="header-logo">
								<Link className="d-flex" href="/">
									<img
										className="light-mode w-15 ml-20"
										alt="Request"
										src="/assets/imgs/Request/request_blue.png"
										width="250"
									/>
									<img
										className="dark-mode w-15 ml-20"
										alt="Request"
										src="/assets/imgs/Request/request_blue.png"
										width="250"
									/>
								</Link>
							</div>
							<div className="header-nav">
								<nav className="nav-main-menu">
									<ul className="main-menu">
										<li><Link href="/">Home</Link></li>
										<li><Link href="/about">About</Link></li>
										<li><Link href="/contact">Contact</Link></li>

									</ul>
								</nav>
							</div>
						</div>
						<div className="header-right">
							<div className="d-none d-xxl-inline-block align-middle mr-15">
								<ThemeSwitch />
								<a className="btn btn-default btn-signin" onClick={handleLogin}>Signin</a>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
