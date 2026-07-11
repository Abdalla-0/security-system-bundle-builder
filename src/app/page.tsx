import { BundleAccordion } from "@/components/application/BundleAccordion";
import ReviewPanel from "@/components/application/ReviewPanel";
export default function Home() {
  return (
    <main className="py-7.75 md:pt-12.5">
      <div className="container">
        <h1 className="text-center sm:hidden! mb-5">Let’s get started!</h1>
        <div className="flex flex-wrap gap-7.25 lg:justify-center">
          <BundleAccordion className="w-full xl:min-w-3xl xl:max-w-3xl 2xl:max-w-303.25" />
          <ReviewPanel />
        </div>
      </div>
    </main>
  );
}
