'use client'
import Image from "next/image"
import Marquee from "react-fast-marquee";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, User, X } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { useProfileStore } from "@/app/store/profile";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import Link from "next/link";
import { CartSidebar } from "./cartSidebar";
import { useRouter } from "next/navigation";
import { useDebounce } from "./debounceSearch";
const currencies = [
    { code: "NGN", label: "Naira", flag: "/nigerian.jpg" },
    { code: "TL", label: "Turkish Lira", flag: "/turkey.svg" },
    { code: "USD", label: "Dollar", flag: "/uk.png" },
];
const NavBar = () => {
    const router = useRouter()
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [currency, setCurrency] = useState("NGN");
    const inputRef = useRef<HTMLInputElement>(null);

    console.log(searchQuery)
    const debouncedSearch = useDebounce(searchQuery, 50);
    const user = useProfileStore((state) => state.user)
    console.log(user)

    useEffect(() => {
        if (searchOpen) {
            inputRef.current?.focus();
        }
    }, [searchOpen]);

    const handleSearch = () => {
        const query = debouncedSearch.trim();
        if (query) {
            router.push(`/browse?search=${encodeURIComponent(query)}`);
        } else {
            alert("what do u want me to search")
        }
        setSearchQuery('')
    }

    // const filteredProducts = useMemo(() => {
    //     if (!searchQuery) return products;

    //     return products.filter((product) =>
    //         product.name.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    // }, [products, searchQuery]);

    return (
        <header className="w-full h-fit sticky top-0 z-50">
            <div className="py-3 px-2 bg-bg-color">
                <Marquee>
                    <span className="text-white font-semi-bold leading-1.5">Beauty Of Chiri ✨ — Glow Naturally. Radiant skin, every day. Hydrate, brighten, and shine.
                    </span>
                </Marquee>
            </div>
            <div className=" w-full h-23 backdrop-blur-md bg-white/30 shadow-sm border-b border-white/20">
                <nav className="w-full h-20 shadow-md flex items-center justify-between px-4">
                    {!searchOpen ? (
                        <header className="flex items-center w-full">
                            {/* LEFT: Logo */}
                            <Link href={'/'} className="relative w-12 md:w-22 h-14">
                                <Image
                                    src="/mainlogo.png"
                                    alt="Beauty Of Chiri Logo"
                                    className="object-contain"
                                    fill
                                />
                            </Link>

                            {/* CENTER: Search */}
                            <div className="hidden md:flex flex-1 justify-end px-6">
                                <div className="w-full max-w-xl">
                                    <InputGroup className="w-full bg-input border rounded-2xl h-11 text-gray-900">
                                        <InputGroupInput
                                            type="text"
                                            placeholder="Search"
                                            value={debouncedSearch}
                                            readOnly
                                            onClick={() => setSearchOpen(true)}

                                        />
                                        <InputGroupAddon className="cursor-pointer" align="inline-end" onClick={() => (
                                            // router.push(`/search?q=${searchQuery}`),
                                            handleSearch()

                                        )}>
                                            <Search size={20} />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </div>

                            {/* RIGHT: Others */}
                            <div className="flex items-center gap-x-2 ml-auto">
                                {/* Currency */}
                                <Select value={currency} onValueChange={setCurrency}>
                                    <SelectTrigger className="flex items-center gap-2 border-none  text-lg px-2 py-1">
                                        <Image
                                            src={currencies.find(c => c.code === currency)?.flag || ""}
                                            alt={currency}
                                            width={24}
                                            height={24}
                                        />
                                        <span className="font-bold">{currency}</span>
                                    </SelectTrigger>

                                    <SelectContent position="popper" >
                                        {currencies.map((curr) => (
                                            <SelectItem key={curr.code} value={curr.code} className="flex items-center gap-2">
                                                {curr.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Mobile Search */}
                                <Search
                                    className="md:hidden cursor-pointer"
                                    onClick={() => setSearchOpen(true)}
                                />

                                {/* Account */}
                                {user ? (
                                    <span className="font-semibold text-gray-800">
                                        Hi, {user.full_name}
                                    </span>
                                ) : (
                                    <Link href="/login">
                                        <User className="bg-bg-color text-white rounded-full size-8 p-1" />
                                    </Link>
                                )}

                                {/* Cart */}
                                <CartSidebar />
                            </div>
                        </header>)
                        :
                        // now the search bar is open, we want to show the search input and a close button
                        <div className="w-11/12 md:w-10/12 flex items-center gap-x-4 md:px-3 ml-auto">
                            <InputGroup className="w-full bg-input placeholder:text-black border rounded-2xl h-11 border-[#c91d79] text-gray-800  font-semibold focus:outline-none focus:ring-2 focus:ring-[#c91d79]">
                                <InputGroupInput
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search"
                                    className="text-lg!"
                                    value={debouncedSearch}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}

                                />
                                <InputGroupAddon className="cursor-pointer" align={'inline-end'} onClick={() => handleSearch()}>
                                    <Search className="size-6" size={30} />
                                </InputGroupAddon>
                            </InputGroup>
                            <button
                                className="cursor-pointer"
                                onClick={() => setSearchOpen(false)}>
                                <X />
                            </button>
                        </div>
                    }
                </nav>
            </div>
        </header>
    )
}

export default NavBar