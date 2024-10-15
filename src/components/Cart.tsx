import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { GrShop } from "react-icons/gr";

const Cart = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <GrShop className="size-5 transition-all duration-300 -mb-1" />
        </SheetTrigger>
        <SheetContent className="w-[80%] sm:w-[30rem] sm:max-w-[30rem]">
          Cart!
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
