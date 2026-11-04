"use client"

import Areas from '@/components/Home/Areas'
import Blog from '@/components/Home/Blog'
import Brands from '@/components/Home/Brands'
import Contact from '@/components/Home/Contact'
import Discount from '@/components/Home/Discount'
import Faq from '@/components/Home/Faq'
import Hero from '@/components/Home/Hero'
import Services from '@/components/Home/Services'
import Testimonials from '@/components/Home/Testimonials'
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
    <Blog/>
    <Faq/>
    <Brands/>
    <Contact/>
    </>
  )
}

export default Home