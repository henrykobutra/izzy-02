import Link from "next/link";

export default function MarketingFooter() {
  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold tracking-tighter mb-4 md:mb-0">IZZY</div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms
            </Link>
            <Link href="#" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
        <p className="text-center text-gray-600 text-sm mt-6">
          {new Date().getFullYear()} IZZY. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
