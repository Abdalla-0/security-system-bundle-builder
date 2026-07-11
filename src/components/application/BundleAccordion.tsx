"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { bundleSteps } from "@/data/bundle-steps";
import ProductCard from "./ProductCard";
import { Button } from "../ui/button";
import products from "@/data/products.json";
import { TProduct } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useMemo } from "react";
type Props = {
  className?: string;
};
export function BundleAccordion({ className }: Props) {
  const { cart } = useCart();

  // لكل step، هات عدد المنتجات المختلفة (distinct) اللي كميتها أكبر من صفر
  const selectedCountsByStep = useMemo(() => {
    const counts: Record<number, Set<string>> = {};

    Object.values(cart).forEach((item) => {
      const product = (products as TProduct[]).find((p) => p.id === item.id);
      if (!product) return;

      if (!counts[product.step]) {
        counts[product.step] = new Set();
      }
      counts[product.step].add(item.id);
    });

    return counts;
  }, [cart]);
  return (
    <Accordion defaultValue={["cameras"]} className={className}>
      {bundleSteps.map((step) => {
        const stepProducts = products.filter(
          (product) => product.step === step.step,
        );
        const selectedCount = selectedCountsByStep[step.step]?.size ?? 0;
        return (
          <AccordionItem key={step.id} value={step.value}>
            <span className="uppercase text-[10px] leading-[100%] tracking-[1.6px] text-surface-foreground font-medium px-3.75 mb-1.25">
              Step {step.step} of {step.totalSteps}
            </span>

            <AccordionTrigger selectedCount={selectedCount}>
              <Image
                src={step.icon}
                alt={step.title}
                width={24}
                height={24}
                className="size-6"
              />
              {step.title}
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex max-2xl:flex-wrap justify-center gap-3.75">
                {stepProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    priority={step.step === 1 && index === 0}
                    product={product as TProduct}
                    className={
                      "w-full sm:w-[calc(50%-7.5px)] lg:max-w-90 lg:basis-90 xl:basis-auto"
                    }
                  />
                ))}
              </div>
              {step.nextStep && (
                <div className="flex justify-center w-full mt-3.75">
                  <Button variant="outline">{step.nextStep}</Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
