import { cn } from "@/lib/utils";
import Image from "next/image";
interface Variant {
  id: string;
  label: string;
  thumbSrc: string;
}

type Props = {
  variants: Variant[];
  activeColor: string | null;
  onChange: (id: string, label: string) => void;
};
export default function VariantSelector({
  variants,
  activeColor,
  onChange,
}: Props) {


  return (
    <div className="flex items-center gap-1.5 mt-3">
      {variants.map((variant) => {
        const isActive = activeColor === variant.id;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onChange(variant.id, variant.label)}
            className={cn(
              "flex items-center w-16.25 h-6.5 px-0.75 py-px rounded-xs border-[0.5px] border-border text-[10px] font-medium transition-all",
              isActive && "border-[#0AA288] bg-[#1DF0BB0A]/4",
            )}
          >
            <Image
              src={variant.thumbSrc}
              alt={variant.label}
              width={22}
              height={22}
              className="w-5.5 h-5.5 object-cover"
            />
            <span>{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
