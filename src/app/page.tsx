import Layout from "@/components/layout/Layout"

import Category from "@/components/sections/Category"
import OurFeatured1 from "@/components/sections/OurFeatured1";

import PopularDestinations4 from "@/components/sections/PopularDestinations4";
import BannerHome3 from "@/components/sections/BannerHome3";
import HowItWork1 from "@/components/sections/HowItWork1";
import Pricing from "@/app/Pricing/page";


export default function Home() {

    return (
        <>

            <Layout headerStyle={1} footerStyle={1}>
                <BannerHome3/>
                <PopularDestinations4 />
                <OurFeatured1/>
                <Pricing/>
                <Category />
                <HowItWork1/>
            </Layout>
        </>
    )
}