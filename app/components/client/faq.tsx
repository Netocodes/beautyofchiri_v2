"use client";

import { useState } from "react";
import { Send, MessageCircle, ChevronDown, CheckCircle2 } from "lucide-react";

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        id: 1,
        question: "How do I track my beauty order across Nigeria?",
        answer: "Once your order is dispatched, you will receive an SMS and email with a direct tracking link from our delivery partner. Deliveries within Lagos usually take 1–2 days, and outside Lagos 3–5 business days.",
    },
    {
        id: 2,
        question: "Are all your skincare products 100% authentic?",
        answer: "Yes! We source directly from official manufacturers and authorized brand distributors. Every item comes with a batch code and authenticity guarantee.",
    },
    {
        id: 3,
        question: "What payment methods do you accept?",
        answer: "We accept all major debit cards, bank transfers, and USSD via Paystack/Flutterwave. Cash on delivery is available for selected Lagos locations.",
    },
    {
        id: 4,
        question: "What is your return policy?",
        answer: "We accept returns within 7 days of delivery for unopened, sealed products in their original packaging. Contact our support team to initiate a return.",
    },
];

const SupportAndFAQ = () => {
    const [emailInput, setEmailInput] = useState("");
    const [openId, setOpenId] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(true);

    // Toggle FAQ dropdowns
    const toggleAccordion = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    // Handle Email Support Submission
    const handleSupportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailInput) return;

        // Simulate sending email to technical support
        console.log("Sending email support request for:", emailInput);
        setIsSubmitted(true);
        setEmailInput("");

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <section className="w-full bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* SECTION 1: EMAIL SUPPORT INPUT + WHATSAPP LINK */}
                <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Have a direct question?
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm md:text-base">
                        Send a message straight to our technical support team, or message us live on WhatsApp.
                    </p>

                    {/* Big Input Form for Email Support */}
                    <form onSubmit={handleSupportSubmit} className="space-y-3 max-w-2xl mx-auto my-5 text-left">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                                Your Email
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-black outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                                What do you need help with?
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., Wrong item delivered, Payment issue..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-black outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-bg-color text-white font-semibold rounded-xl text-sm hover:bg-gray-800 transition-colors"
                        >
                            Submit Support Request
                        </button>
                    </form>

                    {/* Follow-up / Status Message */}
                    <div className="mt-3 min-h-[24px]">
                        {isSubmitted ? (
                            <p className="text-emerald-600 text-sm font-medium flex items-center justify-center gap-1.5 animate-fade-in">
                                <CheckCircle2 className="w-4 h-4" /> Message sent! Technical support will reach out to your email shortly.
                            </p>
                        ) : (
                            <p className="text-xs md:text-sm text-gray-500">
                                Response time: usually within 1–2 hours during business operating times.
                            </p>
                        )}
                    </div>

                    {/* WhatsApp Action Button */}
                    <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <span className="text-sm text-gray-500 font-medium">Talk to The Guru for Recomendation?</span>
                        <a
                            href="https://wa.me/234XXXXXXXXXX?text=Hi,%20I%20have%20a%20question%20about%20my%20order"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-xl transition-all shadow-sm"
                        >
                            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>

                {/* SECTION 2: FAQ ACCORDION DROPDOWNS */}
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6">
                        Frequently Asked Questions
                    </h3>

                    <div className="space-y-4">
                        {faqs.map((faq) => {
                            const isOpen = openId === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:border-gray-300"
                                >
                                    <button
                                        onClick={() => toggleAccordion(faq.id)}
                                        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                                    >
                                        <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Accordion Content */}
                                    {isOpen && (
                                        <div className="px-5 pb-6 md:px-6 pt-0 text-gray-600 text-sm md:text-base border-t border-gray-100 mt-1 leading-relaxed">
                                            <p className="pt-3">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default SupportAndFAQ;