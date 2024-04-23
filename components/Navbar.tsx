"use client"

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname()

    const navigateToSeasonPage = () => {
        const pathParts = pathname.split('/');
        const seasonPath = `/${pathParts[1]}`;
        router.push(seasonPath);
    };

    return (
        <nav className="fixed w-full h-16 top-0 bg-background/30 shadow-2xl backdrop-blur-lg border-b z-50 flex items-center justify-center">
            <div onClick={navigateToSeasonPage} className="text-3xl font-bold text-primary cursor-pointer">NHL Dashboard</div>
        </nav>
    );
}