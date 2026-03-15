import Areas from '@/components/Home/Areas'
import Brands from '@/components/Home/Brands'
import Contact from '@/components/Home/Contact'
import Discount from '@/components/Home/Discount'
import Gallery from '@/components/Home/Gallery'
import Hero from '@/components/Home/Hero'
import Services from '@/components/Home/Services'
import Testimonials from '@/components/Home/Testimonials'
import Videos from '@/components/Home/Videos'
import Why from '@/components/Home/Why'
import React from 'react'

function Home() {
  return (
    <>
    <Hero/>
    <Services/>
    <Why/>
    <Discount/>
    <Testimonials/>
    <Areas/>
    <Gallery/>
    <Videos/>
    <Brands/>
    <Contact/>
    </>
  )
}

export default Home