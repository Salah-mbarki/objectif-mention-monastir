import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/categories";

export default function Categories() {
  return (
    <section id="univers" className="scroll-mt-24 mt-10 bg-white pb-20 pt-24 sm:pt-16">
      <Container>
        <SectionTitle title="Nos univers" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
