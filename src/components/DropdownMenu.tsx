import { cn } from "@/lib/utils";
import Link from "next/link";

interface DropdownMenuProps {
  isOpen: boolean;
}

const DropdownMenu = ({ isOpen }: DropdownMenuProps) => {
  return (
    <div
      className={cn(
        `bg-background pl-16 py-12 fixed top-20 text-heading text-2xl 
       w-screen -ml-8 box-content transition-all duration-300 ease-in-out transform`,
        {
          "opacity-100 translate-y-0": isOpen,
          "opacity-0 -translate-y-4 pointer-events-none": !isOpen,
        }
      )}
    >
      <ul className="flex flex-col gap-4">
        <li>
          <Link className="hover:opacity-80" href={"/shop"}>
            Все продукты
          </Link>
        </li>
        <li>
          {" "}
          <Link className="hover:opacity-80" href={"/shop"}>
            Моти
          </Link>
        </li>
        <li>
          {" "}
          <Link className="hover:opacity-80" href={"/shop"}>
            Матча
          </Link>
        </li>
        <li>
          {" "}
          <Link className="hover:opacity-80" href={"/shop"}>
            Новинки
          </Link>
        </li>
        <li>
          {" "}
          <Link className="hover:opacity-80" href={"/shop"}>
            Наборы
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
