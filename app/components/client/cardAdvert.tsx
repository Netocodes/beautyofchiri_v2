import Image from 'next/image';
import Link from 'next/link';

export default function FullWidthBanners() {
    return (
        <div className="flex flex-col md:flex-row justify-between gap-x-8 w-11/12 mx-auto">
            {/* Banner 1 */}
            <Link href="/browse/?category=skincare" className="w-full md:w-1/2">
                <Image
                    src="/ui/image1.jpg"
                    alt="Advert Image 1"
                    width={500}
                    height={800}
                    className="w-full h-auto object-cover"
                    priority
                />
            </Link>

            {/* Banner 2 */}
            <Link href={'/browse/?category=skincare'} className="w-full md:w-1/2">
                <Image
                    src="/ui/image2.jpg"
                    alt="Advert Image 2"
                    width={500}
                    height={800}
                    className="w-full h-auto object-cover"
                />
            </Link>
        </div>
    );
}