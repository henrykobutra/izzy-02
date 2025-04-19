import Link from "next/link";
import Image from "next/image";

export default function MarketingFooter() {
  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* Logo left */}
          <div className="flex justify-center md:justify-start md:w-1/3">
            <Image src="/logo.png" alt="Izzy Logo" width={40} height={40} />
          </div>
          {/* Center copyright */}
          <div className="text-gray-600 text-center md:w-1/3 text-sm">
            {new Date().getFullYear()} Izzy AI. All rights reserved.
          </div>
          {/* Links right */}
          <div className="flex gap-6 text-sm text-gray-400 justify-center md:justify-end md:w-1/3">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
