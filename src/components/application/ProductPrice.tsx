type Props = {
  price: number;
  compareAtPrice: number | null;
};

const ProductPrice = ({ price, compareAtPrice }: Props) => {
  return (
    <div className="flex flex-col gap-0.75">
      {compareAtPrice !== null && (
        <span className="line-through text-[#D8392B] text-end leading-[100%] tracking-[0.6px]">
          ${compareAtPrice.toFixed(2)}
        </span>
      )}
      <span className="text-[#575757] text-end leading-[100%] tracking-[0.6px]">
        ${price.toFixed(2)}
      </span>
    </div>
  );
};

export default ProductPrice;
