"use client";

import { useCart } from "@/context/CartContext";
import { calculateCartTotals, groupItemsByCategory } from "@/lib/cart-utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import QuantitySelector from "./QuantitySelector";
import { toast } from "sonner";

const CATEGORY_ORDER = ["Cameras", "Sensors", "Accessories", "Plan"] as const;

const ReviewPanel = () => {
  const { cart, updateItemQuantity, saveCart } = useCart();

  // get cart items
  const cartEntries = Object.entries(cart).map(([cartKey, item]) => ({
    cartKey,
    ...item,
  }));

  // group items by category
  const groupedItems = groupItemsByCategory(cartEntries, CATEGORY_ORDER);

  // get cart totals
  const { totalPrice, totalOriginalPrice, totalSavings, monthlyEstimate } =
    calculateCartTotals(Object.values(cart));

  return (
    <div className="w-full xl:w-99.75 2xl:w-303.25 bg-surface rounded-lg pt-3.75 h-fit">
      <span className="2xl:hidden uppercase text-[10px] leading-[100%] tracking-[1.6px] text-surface-foreground font-medium px-3.75 mb-1.25">
        Review
      </span>
      <div className="flex flex-col 2xl:flex-row 2xl:justify-center gap-2.5 2xl:gap-13 p-5 pb-7.75">
        {/* left column */}
        <div className="flex flex-col gap-2.5 2xl:w-138">
          {/* header */}
          <div className="flex flex-col gap-1.25">
            <h2>Your security system</h2>
            <p>
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
          </div>
          {/* items */}
          <div className="flex flex-col gap-2.5">
            {groupedItems.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                Your system is empty. Add some items!
              </p>
            ) : (
              groupedItems.map((group) => (
                <div
                  key={group.category}
                  className="flex flex-col gap-2 pt-3.75 border-t border-border-light"
                >
                  <h3 className="uppercase text-xs leading-4 tracking-[3%] text-muted! font-normal">
                    {group.category}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <div
                        key={item.cartKey}
                        className="flex justify-between items-center gap-4"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {item.image === "/images/plan.png" ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={20}
                              height={24}
                              className="w-5 h-6 rounded-[5px] object-cover"
                            />
                          ) : (
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={41}
                              height={41}
                              className="size-10.25 rounded-[5px] object-cover"
                            />
                          )}
                          <h4
                            className={cn(
                              item.titleAccent &&
                                "font-bold text-base leading-[100%] tracking-[-0.2%]",
                            )}
                          >
                            {item.title}
                            {item.titleAccent && (
                              <span className="text-primary ms-1">
                                {item.titleAccent}
                              </span>
                            )}
                          </h4>
                          {item.adjustable && (
                            <QuantitySelector
                              variant="white"
                              className="ms-auto"
                              quantity={item.quantity}
                              onIncrement={() =>
                                updateItemQuantity(
                                  item.cartKey,
                                  item.quantity + 1,
                                )
                              }
                              onDecrement={() =>
                                updateItemQuantity(
                                  item.cartKey,
                                  item.quantity - 1,
                                )
                              }
                            />
                          )}
                        </div>
                        <div className="flex flex-col">
                          {item.compareAtPrice && (
                            <span className="line-through text-end text-[#6F7882] leading-4 tracking-[0.5%] font-medium">
                              $
                              {(item.compareAtPrice * item.quantity).toFixed(2)}
                              {item.billing}
                            </span>
                          )}
                          <span className="text-end text-primary leading-4 tracking-[0.5%] font-semibold">
                            {item.price === 0
                              ? "FREE"
                              : `$${(item.price * item.quantity).toFixed(2)}${item.billing}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* right column (footer) */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap 2xl:flex-col max-2xl:justify-between gap-4 2xl:w-121.5">
              <div className="flex items-center gap-6.25">
                <Image
                  src="/images/satisfaction-badge.png"
                  alt="satisfaction badge"
                  width={131}
                  height={131}
                  className="size-19.5 2xl:size-32.75"
                />
                <p className="hidden 2xl:flex flex-col gap-1.25 leading-[110.00000000000001%] text-card-foreground">
                  <span className="font-semibold">
                    30-day hassle-free returns
                  </span>
                  If you&apos;re not totally in love with the product, we will
                  refund you 100%.
                </p>
              </div>
              <div className="flex flex-col 2xl:flex-row justify-center 2xl:justify-between gap-2">
                <span className="p-2 bg-primary rounded-[3px] font-medium leading-[100%] tracking-[-5%] text-white">
                  as low as ${monthlyEstimate.toFixed(2)}/mo
                </span>
                <div className="flex items-end gap-2">
                  <span className="text-lg 2xl:text-[22px] text-[#6F7882] leading-5 tracking-[0.25%] font-medium mb-1">
                    ${totalOriginalPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl 2xl:text-[28px] text-primary leading-8 tracking-[-0.13%] font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 pt-2.5">
              <span className="element-center text-xs text-success leading-[100%] tracking-[-0.06px] font-semibold">
                Congrats! You’re saving ${totalSavings.toFixed(2)} on your
                security bundle!
              </span>
              <Button
                size="lg"
                className="font-norms font-bold text-[17px] leading-[100%]"
              >
                Checkout
              </Button>
            </div>
          </div>
          <Button
            onClick={() => {
              saveCart();
              toast.success("Your system has been saved!");
            }}
            variant="link"
            className="underline italic text-sm text-surface-foreground leading-[120%] tracking-[-0.02px]"
          >
            Save my system for later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPanel;
