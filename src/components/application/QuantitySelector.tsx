import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

type Props = {
  variant?: "white" | "gray";
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
};

const QuantitySelector = ({
  variant = "gray",
  quantity,
  onIncrement,
  onDecrement,
  className,
}: Props) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={onDecrement}
        className={cn(
          "element-center rounded-sm size-5 border-2",
          variant === "white"
            ? "border-white text-[#575757] bg-white"
            : "border-[#E6EBF0] text-[#CED6DE]",
        )}
      >
        <Minus className="size-3" />
      </button>
      <span className="text-[#0B0D10] font-medium leading-5 w-2.25">{quantity}</span>
      <button
        onClick={onIncrement}
        className={cn(
          "element-center rounded-sm size-5",
          variant === "white"
            ? "border-white text-[#575757] bg-white"
            : "bg-[#F0F4F7] text-[#525963]",
        )}
      >
        <Plus className="size-3" />
      </button>
    </div>
  );
};

export default QuantitySelector;
