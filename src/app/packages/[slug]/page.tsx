import data from "@/data/packages.json";
import PackageDetails from "../components/packageDetails";
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

  return <>
    <PackageDetails pkg={pkg} />
    <SimilarPackages currentSlug={slug} />
  </>;
}