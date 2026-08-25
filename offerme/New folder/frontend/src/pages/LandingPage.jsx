import Navbar from '@/components/navbar/Navbar'
import HeroSection from '@/components/hero/HeroSection'
import CategoriesSection from '@/components/categories/CategoriesSection'
import FeaturedSection from '@/components/featured/FeaturedSection'
import Footer from '@/components/footer/Footer'

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedSection />
      </main>
      <Footer />
    </div>
  )
}
