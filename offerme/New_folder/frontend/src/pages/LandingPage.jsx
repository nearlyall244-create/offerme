import Navbar from '@/components/navbar/Navbar'
import HeroSection from '@/components/hero/HeroSection'
import CategoriesSection from '@/components/categories/CategoriesSection'
import Footer from '@/pages/footer/Footer'

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  )
}
