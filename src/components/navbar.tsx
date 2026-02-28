import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingDockNav } from "@/components/ui/floating-dock-nav";

export function Navbar() {
    return (
        <>
            <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <nav className="flex items-center justify-between lg:justify-around overflow-hidden">
                        <Link href="/">
                            <Image src="/logo.png" width={125} height={125} alt="logo" className="cursor-pointer" />
                        </Link>
                        <Link href="/" className="text-lg hover:text-white hidden md:block">
                            Home
                        </Link>
                        <Link href="/about" className="text-lg hover:text-white hidden md:block">
                            About
                        </Link>
                        <Link href="/services" className="text-lg hover:text-white hidden md:block">
                            Our Services
                        </Link>
                        <Link href="/products" className="text-lg hover:text-white hidden md:block">
                            Products
                        </Link>
                        <Link href="/more" className="text-lg hover:text-white hidden md:block">
                            More
                        </Link>
                        <Link href="/contact" className="hidden md:block">
                            <Button
                                variant="default"
                                className="text-black border-white bg-white hover:bg-gray-200 rounded-full"
                            >
                                Contact us
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Mobile Floating Navigation */}
            <FloatingDockNav />
        </>
    );
}
