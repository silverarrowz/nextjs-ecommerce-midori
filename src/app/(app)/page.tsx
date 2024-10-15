import AboutSection from '@/components/AboutSection'
import FeaturedSection from '@/components/FeaturedSection'
import IntroSection from '@/components/IntroSection'
import MatchaSection from '@/components/MatchaSection'
import ReviewsSection from '@/components/ReviewsSection'
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
