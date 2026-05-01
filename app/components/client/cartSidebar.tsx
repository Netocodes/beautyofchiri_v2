
import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export const CartSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="cursor-pointer">
                    <ShoppingCart />
                </button>
            </SheetTrigger>

            <SheetContent side="right" className="">
                <h2 className="text-lg font-bold mb-4">Your Cart</h2>

                {/* Cart Items */}
                <div className="space-y-4">
                    <p>No items yet</p>
                </div>
            </SheetContent>
        </Sheet>
    );
}