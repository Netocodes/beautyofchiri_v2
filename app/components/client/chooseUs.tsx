import { CheckCircle2, Truck, ShieldCheck, Tag } from "lucide-react";

const features = [
    {
        icon: CheckCircle2,
        title: "Original beauty & skincare products",
    },
    {
        icon: Truck,
        title: "Fast delivery across Nigeria and Turkey",
    },
    {
        icon: ShieldCheck,
        title: "Licensed and certified beauty store",
    },
    {
        icon: Tag,
        title: "Affordable prices & promotions",
    },
    {
        icon: ShieldCheck,
        title: "Trusted beauty store in Nigeria, Turkey, and Worldwide 🌍",
    },
    {
        icon: Tag,
        title: "Affordable prices & promotions",
    },
    {
        icon: ShieldCheck,
        title: "Trusted beauty store in Lagos, Nigeria",
    },
    {
        icon: Tag,
        title: "Affordable prices & promotions",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-100">
            <div className="max-w-7xl mx-auto">
                {/* Section Heading */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
                    Why Choose Us?
                </h2>

                {/* Features Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50"
                            >
                                <div className="flex-shrink-0 text-black">
                                    <Icon className="w-6 h-6 stroke-[2]" />
                                </div>
                                <p className="text-sm md:text-base font-semibold text-gray-800 leading-snug">
                                    {feature.title}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}