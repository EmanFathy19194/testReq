'use client'

import Layout from "@/components/layout/Layout";
import FilterSearch from "@/components/sections/FilterSearch";



export default function HomePage() {
    return (
        <>

            <Layout headerStyle={2} footerStyle={1}>
                <FilterSearch />

            </Layout>
        </>
    )
}
