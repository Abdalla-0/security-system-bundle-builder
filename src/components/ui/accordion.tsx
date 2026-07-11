import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import ChevronDown from "@/assets/svg/carrot-down.svg";
import ChevronUp from "@/assets/svg/carrot-up.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";

type AccordionTriggerProps = AccordionPrimitive.Trigger.Props & {
  selectedCount?: number;
};

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-3.25", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "flex flex-col data-open:pt-3.75 transition-all duration-300 data-open:bg-surface rounded-lg",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  selectedCount,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "text-[#0B0D10] text-lg lg:text-[22px] 2xl:text-[28px] leading-[100%] tracking-normal pt-5 pb-3.75 px-3.75 group/accordion-trigger relative flex flex-1 items-center justify-between border-y-[0.5px] border-border-dark text-left font-semibold transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          "data-open:[&_.chevron-down]:hidden data-open:[&_.chevron-up]:block",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2">{children}</div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium leading-4 text-primary">
            {selectedCount} selected
          </span>
          <Image
            data-slot="accordion-trigger-icon"
            src={ChevronDown}
            alt=""
            width={12}
            height={12}
            className="size-3! pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
          />
          <Image
            data-slot="accordion-trigger-icon"
            src={ChevronUp}
            alt=""
            width={12}
            height={12}
            className="size-3! pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
          />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) p-3.75 pb-5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
