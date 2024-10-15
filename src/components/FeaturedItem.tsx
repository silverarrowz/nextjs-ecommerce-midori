interface FeaturedItemProps {
  title: string;
  price: number;
  image: string;
  amount?: string;
}

const FeaturedItem = ({ image, price, title, amount }: FeaturedItemProps) => {
  return (
    <div
      className="flex flex-col
      bg-white shadow-md rounded-3xl
        mx-10 xs:mx-16 sm:mx-2 md:mx-4 lg:mx-2
        p-4 sm:px-2
        lg:py-8
        my-4
        text-heading-dark gap-6 
        items-center z-10
        h-[22rem] xs:h-[24rem] lg:h-[30rem]"
    >
      <div
        className="max-w-[14rem] h-32 xs:h-40 sm:max-w-none
         sm:h-32 lg:h-48
         transition-transform duration-300 hover:scale-105"
      >
        <img
          src={image}
          alt={title}
          className="object-cover max-h-full w-full
              transition-transform duration-300 
              hover:scale-105 cursor-pointer"
        />
      </div>

      <div
        className="flex flex-col items-center 
      justify-between flex-grow"
      >
        <h3
          className="text-2xl sm:text-xl md:text-2xl xl:text-3xl 
          leading-none
           tracking-widest font-serif line-clamp-2"
        >
          {title}
        </h3>
        {amount && <p className="font-light text-sm opacity-70">{amount}</p>}
        <p className="font-light">{price} руб.</p>
        <button
          className="rounded-3xl border border-heading
          bg-button hover:bg-button/70 transition-all duration-300
          hover:shadow-[inset_0_0_4px_2px_rgba(215,89,161,0.36),0_0_6px_2px_rgba(215,89,161,0.36)]
          px-9 sm:px-6 md:px-12 py-2 mb-2 tracking-widest"
        >
          В корзину
        </button>
      </div>
    </div>
  );
};

export default FeaturedItem;
