import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Platform: [
    { name: "Home", href: "/" },
    { name: "Mosque", href: "/mosque" },
    { name: "Prayers", href: "/prayers" },
    { name: "Donations", href: "/donations" },
    { name: "About", href: "/about" },
  ],
  Account: [
    { name: "Register", href: "/register" },
    { name: "Sign In", href: "/login" },
    { name: "Dashboard", href: "/dashboard" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white hidden sm:block border-t border-gray-100 mt-auto">
      {/* Top gradient accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-green-500" />

      <div className="max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <Image
                src="/img/logo.png"
                alt="Musulli Track Logo"
                width={40}
                height={40}
                className="w-10 rounded-md"
              />
              <div>
                <p className="text-xl font-semibold text-gray-700 leading-tight">
                  Musulli <span className="text-blue-800">Track</span>
                </p>
                <p className="text-xs text-gray-500">Digital Mosjid Management System</p>
              </div>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Empowering mosques with modern digital tools — manage musullis,
              track donations, and stay connected with your community.
            </p>

            {/* Quran Quote */}
            <div className="mt-2 pl-3 border-l-2 border-blue-600/40">
              <p className="text-xs italic text-gray-500 leading-relaxed">
                &ldquo;Those who give in charity… it will be multiplied for them.&rdquo;
              </p>
              <p className="text-xs text-blue-700 font-semibold mt-1">— Quran 2:261</p>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            &copy; {currentYear} Musulli Track. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Built with</span>
            <span className="text-green-600 font-semibold">barakah</span>
            <span>for the Ummah</span>
            {/* Crescent icon */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5 text-blue-600 ml-0.5"
            >
              <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
