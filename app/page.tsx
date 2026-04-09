'use client'
import { toProductFormData } from "@/lib/convertToFormData";
import Image from "next/image";
import { useProfileStore } from "./store/profile";
import ProductswithFilter from "./components/client/products";

export default function Home() {
  const user = useProfileStore((state) => state.user)
  console.log(user)
  const productPayload = {
    name: "Brightening Face Cream",
    slug: "brightening-face-cream",
    description: "Glow up your skin.",
    category: "skincare",

    base_price: 15000, // number, not string

    tags: ["glow", "cream"],
    cover_image: "https://example.com/images/brightening-face-cream.jpg",

    instructions: [
      "Use daily",
      "Apply on clean face"
    ],

    variants: [
      {
        variant_code: "20",
        size_label: "500ml",
        price_kobo: 15000,
        quantity_remaining: 20
      },
      {
        variant_code: "80",
        size_label: "150ml",
        price_kobo: 4500,
        quantity_remaining: 10
      },
      {
        variant_code: "30",
        size_label: "4000ml",
        price_kobo: 11000,
        quantity_remaining: 5
      }
    ],


  }
  const payload = toProductFormData(productPayload)
  console.log(payload.get('data'))

  return (
    <div>
      Skincare Store
    </div>
  );
}
