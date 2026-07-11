"use client";
import { useCart } from "@/context/CartContext";
import { TProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import ProductPrice from "./ProductPrice";
import QuantitySelector from "./QuantitySelector";
import VariantSelector from "./VariantSelector";

type Props = {
  className?: string;
  product: TProduct;
  priority?: boolean;
};
const ProductCard = ({ className, product, priority }: Props) => {
  const { cart, updateCart } = useCart();
  const hasVariants = product.variants && product.variants.length > 0;

  // variants state
  const [activeColor, setActiveColor] = useState<string | null>(
    hasVariants ? product.variants![0].id : null,
  );
  const [activeColorLabel, setActiveColorLabel] = useState<string | null>(
    hasVariants ? product.variants![0].label : null,
  );

  // get current item quantity from context
  const cartKey = activeColor ? `${product.id}-${activeColor}` : product.id;
  const currentQuantity = cart[cartKey] ? cart[cartKey].quantity : 0;

  const sharedProductData = {
    title: product.title,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    billing: product.billing ?? "",
    image: product.image,
    adjustable: product.adjustable ?? true,
    category: product.category,
    colorName: activeColorLabel || undefined,
  };

  // quantity increment (+) handler
  const handleIncrement = () => {
    updateCart(product.id, activeColor, currentQuantity + 1, sharedProductData);
  };

  // quantity decrement (-) handler
  const handleDecrement = () => {
    if (currentQuantity > 0) {
      updateCart(
        product.id,
        activeColor,
        currentQuantity - 1,
        sharedProductData,
      );
    }
  };
  return (
    <div
      className={cn(
        "flex 2xl:flex-col gap-2.75 border-2 border-transparent rounded-lg p-2.75 bg-card",
        currentQuantity > 0 && "border-primary",
        className,
      )}
    >
      <div className="flex items-center relative">
        <Image
          src={product.image}
          priority={priority}
          alt={product.title}
          width={101}
          height={137}
          className="w-25.25 h-auto object-cover 2xl:mx-auto"
        />
        {product.badge && (
          <span className="absolute element-center top-0 inset-s-0 min-h-4.75 px-1.5 py-0.5 rounded-full text-xs leading-[100%] bg-primary text-primary-foreground font-semibold">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2.5 flex-1">
        <div className="flex flex-col gap-2">
          <h3 className="text-card-foreground">{product.title}</h3>
          <p className="text-xs">
            {product.description} <a href={product.learnMoreUrl}>Learn More</a>
          </p>
        </div>
        {/* variant picker */}
        {hasVariants && (
          <VariantSelector
            variants={product.variants || []}
            activeColor={activeColor}
            onChange={(id, label) => {
              setActiveColor(id);
              setActiveColorLabel(label);
            }}
          />
        )}
        <div className="flex items-center justify-between gap-4">
          {/* quantity selector */}
          <QuantitySelector
            quantity={currentQuantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          {/* product price */}
          <ProductPrice
            price={product.price}
            compareAtPrice={product.compareAtPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
