import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import About from "@/components/About";
import FeaturedProducts from "@/components/FeaturedProducts";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Bloc 2 + Bloc 3 (hero and the straddling advantages bar live together) */}
        <Hero />
        {/* Bloc 4 */}
        <Categories />
        {/* Bloc 5 */}
        <About />
        {/* Bloc 6 */}
        <FeaturedProducts />
        {/* Bloc 7 */}
        <CTA />
      </main>
      {/* Bloc 8 */}
      <Footer />
    </>
  );
}
