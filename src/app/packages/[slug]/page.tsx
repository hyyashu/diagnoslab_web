import data from "@/data/packages.json";
import DetailCard, {
  DetailEntity,
} from "../../components/detailCard";
import SimilarPackages from "../components/similarPackages";

export function generateStaticParams() {
  return data.packages.map((pkg) => ({
    slug: pkg.Slug,
  }));
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pkg = data.packages.find(
    (p) => p.Slug === slug
  );

  if (!pkg) return <div>Package not found</div>;
  const entity: DetailEntity = {
    id: pkg.Id,
    name: pkg.PackageName,
    slug: pkg.Slug,
    description: pkg.Description,
    price: Number(pkg.Price),
    discountedPrice: pkg.DiscountedPrice,
    categories: pkg.Categories?.split(", ") ?? [],
    fasting: pkg.Fasting,
    reporting: pkg.Reporting,
    whoShouldTake: "A comprehensive full-body health check-up designed to assess your wellness.",
    parametersCovered: pkg.ParametersCovered,
  };

  return <>
    <DetailCard kind="package" data={entity} />
    <SimilarPackages currentSlug={slug} />
  </>;
}