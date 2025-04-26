
'use client'
import { useEffect, useState } from "react"
import BackToTop from '../elements/BackToTop'
import ButtonClick from '../elements/ButtonClick'
import ItemCollapse from '../elements/ItemCollapse'
import TestimonialBlock from '../elements/TestimonialBlock'
import Breadcrumb from './Breadcrumb'
import MobileMenu from './MobileMenu'
import PopupSignin from './PopupSignin'
import PopupSignup from './PopupSignup'
import Sidebar from './Sidebar'
import Footer1 from './footer/Footer1'

import Header1 from "./header/Header1"
import PopupResetPassword from "@/components/layout/PopupResetPassword";
import Header2 from "@/components/layout/header/Header2";


interface LayoutProps {
	headerStyle?: Number
	footerStyle?: Number
	children?: React.ReactNode
	breadcrumbTitle?: string
}


export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children }: LayoutProps) {
	const [scroll, setScroll] = useState<boolean>(false)
	// MobileMenu
	const [isMobileMenu, setMobileMenu] = useState<boolean>(false)
	const handleMobileMenu = (): void => {
		setMobileMenu(!isMobileMenu)
		!isMobileMenu ? document.body.classList.add("mobile-menu-active") : document.body.classList.remove("mobile-menu-active")
	}
	// Sidebar
	const [isSidebar, setSidebar] = useState<boolean>(false)
	const handleSidebar = (): void => {
		setSidebar(!isSidebar)
		!isSidebar ? document.body.classList.add("canvas-menu-active") : document.body.classList.remove("canvas-menu-active")
	}
	// Login
	const [isLogin, setLogin] = useState<boolean>(false)
	const handleLogin = (): void => setLogin(!isLogin)
	// Register
	const [isRegister, setRegister] = useState<boolean>(false)
	const handleRegister = (): void => setRegister(!isRegister)
	const [ isResetPassword, setResetPassword] = useState<boolean>(false)
	const handleResetPassword = (): void => setResetPassword(!isResetPassword)
	useEffect(() => {
		const WOW: any = require('wowjs');
		(window as any).wow = new WOW.WOW({
			live: false
		});

		// Initialize WOW.js
		(window as any).wow.init()

		const handleScroll = (): void => {
			const scrollCheck: boolean = window.scrollY > 100
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck)
			}
		}

		document.addEventListener("scroll", handleScroll)

		return () => {
			document.removeEventListener("scroll", handleScroll)
		}
	}, [scroll])
	return (
		<><div id="top" />
			<ItemCollapse />
			<ButtonClick />
			<TestimonialBlock />
			{isMobileMenu &&
				<div className="body-overlay-1" onClick={handleMobileMenu} />
			}
			{isSidebar &&
				<div className="body-overlay-1" onClick={handleSidebar} />
			}

			{headerStyle === 1 && <Header1
				scroll={scroll}
				isMobileMenu={isMobileMenu}
				handleMobileMenu={handleMobileMenu}
				isSidebar={isSidebar}
				handleSidebar={handleSidebar}
				isLogin={isLogin}
				handleLogin={handleLogin}
				isRegister={isRegister}
				handleRegister={handleRegister}
				isResetPassword={isResetPassword}
				handleResetPassword={handleResetPassword}
			/>}
			{headerStyle === 2 && <Header2
				scroll={scroll}
				isMobileMenu={isMobileMenu}
				handleMobileMenu={handleMobileMenu}
				isLogin={isLogin}
				handleLogin={handleLogin}
				isRegister={isRegister}
				handleRegister={handleRegister}
				isResetPassword={isResetPassword}
				handleResetPassword={handleResetPassword}
			/>}
			<MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} handleLogin={handleLogin} />
			<Sidebar isSidebar={isSidebar} handleSidebar={handleSidebar} />

			<main className="main">
				{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

				{children}
			</main>

			{!footerStyle && < Footer1 />}
			{footerStyle == 1 ? < Footer1 /> : null}


			{/* <PopupFirstLoad /> */}
			<PopupSignin
				isLogin={isLogin}
				handleLogin={handleLogin}
				isRegister={isRegister}
				handleRegister={handleRegister}
				isResetPassword={isResetPassword}
				handleResetPassword={handleResetPassword}
			/>
			<PopupSignup
				isRegister={isRegister}
				handleRegister={handleRegister}
				isLogin={isLogin}
				handleLogin={handleLogin}
			/>
			<PopupResetPassword
				isResetPassword={isResetPassword}
				handleResetPassword={handleResetPassword}
				isLogin={isLogin}
				handleLogin={handleLogin}
			/>



			<BackToTop target="top" />
		</>
	)
}
