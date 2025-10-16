import React from 'react'
import { HeroSection } from './HeroSection'
import { KeyFeaturesSection } from './KeyFeaturesSection'
import { Ready_to_take } from './Ready_to_take'
import {FooterHome} from './footerHome'
import LogoSection from './logo_section'
import Service from './service'
import Testimonial from './testimonial'
function Home () {
  return(<>
  <HeroSection />
  <KeyFeaturesSection/>
  <LogoSection/>
  <Service/>
  <Testimonial/>
  <Ready_to_take/>
  </> )
}

export default Home
