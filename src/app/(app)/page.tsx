'use client'

import AboutSection from '@/components/AboutSection'
import FeaturedSection from '@/components/FeaturedSection'
import IntroSection from '@/components/IntroSection'
import MatchaSection from '@/components/MatchaSection'
import ReviewsSection from '@/components/ReviewsSection'
import { useUserStore } from '../zustand/use-user'
import { useEffect } from 'react'
// import ScrollButton from "@/components/ScrollButton";

export default function Home() {
  return (
    <div>
      <IntroSection />
      <FeaturedSection />
      <AboutSection />
      <ReviewsSection />
      <MatchaSection />

      {/* <ScrollButton /> */}
    </div>
  )
}
