import Image from "next/image";
import Link from "next/link";
import { Users, FileText, HeartHandshake, Megaphone } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative mb-32">
      <section className="relative w-full bg-[#E8F4F8] pt-16 pb-40 md:pt-24 md:pb-56 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem] shadow-sm">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#7A6330]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#7A6330]/20 blur-3xl" />

        {/* Container */}
        <div className="relative max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 xl:gap-20">
          {/* Text Content */}
          <div className="flex-1 space-y-8 text-center md:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15]">
              Seamless Masjid Management: <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A6330] to-blue-700">
                Connect with Your Community,
              </span>{" "}
              <span className="text-slate-800">Effortlessly.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto md:mx-0 font-medium">
              A complete digital solution for your mosque. Manage members, accounts, services, and events all in one secure platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-2 hover:-translate-y-1 transition-all rounded-full border-2 border-blue-600/40 text-blue-700 font-bold hover:bg-blue-50 transition-colors text-center text-lg"
              >
                Explore more
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-2 hover:-translate-y-1 transition-all rounded-full bg-[#7A6330] text-white font-bold hover:bg-[#7A6330]/80 shadow-xl shadow-[#7A6330]/30 transition-all hover:-translate-y-1 text-center text-lg"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Image / Illustration */}
          <div className="flex-1 w-full max-w-lg md:max-w-xl xl:max-w-2xl z-10">
            <Image
              src="/img/banner.png"
              alt="Mosque Illustration"
              width={800}
              height={600}
              className="w-full h-auto object-contain drop-shadow-2xl animate-in fade-in zoom-in duration-1000"
              priority
            />
          </div>
        </div>
      </section>

      {/* Overlapping Cards Container */}
      <div className="hidden md:block absolute left-0 right-0 -bottom-24 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Card 1 */}
          <div className="bg-[#0f2c4a] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border border-[#1a426b] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-green-900/20 hover:border-green-500/50 group">
            <div className="bg-green-500/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-white font-bold text-lg leading-snug">
              Handle<br />Masjid Members
            </h3>
          </div>
          {/* Card 2 */}
          <div className="bg-[#0f2c4a] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border border-[#1a426b] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-900/20 hover:border-blue-500/50 group">
            <div className="bg-blue-500/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-white font-bold text-lg leading-snug">
              Keep Accounts<br />and Reports
            </h3>
          </div>
          {/* Card 3 */}
          <div className="bg-[#0f2c4a] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border border-[#1a426b] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-green-900/20 hover:border-green-500/50 group">
            <div className="bg-green-500/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-white font-bold text-lg leading-snug">
              Offer Member<br />Services
            </h3>
          </div>
          {/* Card 4 */}
          <div className="bg-[#0f2c4a] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border border-[#1a426b] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-900/20 hover:border-blue-500/50 group">
            <div className="bg-blue-500/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Megaphone className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-white font-bold text-lg leading-snug">
              Notify Members<br />About Events
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
