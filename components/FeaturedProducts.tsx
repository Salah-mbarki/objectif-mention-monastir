import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";

export default function FeaturedProducts() {
  return (
    <section id="produits-phares" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <Container>
        <SectionTitle title="Nos produits phares" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/produits" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
            Voir tous les produits
          </Button>
        </div>
      </Container>
    </section>
  );
}
