'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import CurrencyDropdown from "@/components/elements/CurrencyDropdown";
import LanguageDropdown from "@/components/elements/LanguageDropdown";

const ThemeSwitch = dynamic(() => import('@/components/elements/ThemeSwitch'), {
    ssr: false,
})

export default function Header2({ scroll, handleLogin, handleMobileMenu, handleRegister, handleSidebar }: any) {
    return (
        <>
            <header className={`header sticky-bar ${scroll ? "stick" : ""}`}>
                <div className="container-fluid background-body">
                    <div className="main-header p-15">
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

                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="d-none d-xxl-inline-block align-middle mr-15">
                                <LanguageDropdown />
                                <CurrencyDropdown />
                                <ThemeSwitch />
                            </div>
                            <div className="profile-icon ml-3 mr-5">
                                <Link href="/companyProfile">
                                    <img src="/assets/imgs/Request/request_icon_blue.png"
                                        alt="Profile"
                                        className="rounded-circle"
                                        width="40"
                                        height="40"
                                        style={{ cursor: 'pointer', objectFit: 'cover' }}
                                    />
                                </Link>
                            </div>
                            <a className="btn btn-default btn-signin" onClick={handleLogin}>Signin</a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
