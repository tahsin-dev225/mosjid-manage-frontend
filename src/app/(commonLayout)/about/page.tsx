"use client"
import { Users, HeartHandshake, Award, Target, Clock, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-white to-[#F9F6F0]">
      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 -ml-32 -mt-32 w-[28rem] h-[28rem] rounded-full bg-[#7A6330]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 -mr-32 -mb-32 w-[32rem] h-[32rem] rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#7A6330]/10 border border-[#7A6330]/20 rounded-full text-[#7A6330] font-semibold mb-8 hover:scale-105 transition-all cursor-default">
            <HeartHandshake className="w-5 h-5" />
            <span>Our Mission</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Empowering Mosques
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A6330] to-blue-700">
              Connecting Communities
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            We believe every mosque deserves modern tools to serve their community. From managing members to collecting donations, our platform simplifies mosque administration so you can focus on what matters most.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/70">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "1000+", label: "Mosques Served", icon: Globe },
            { number: "50,000+", label: "Active Members", icon: Users },
            { number: "5+", label: "Years Experience", icon: Clock },
            { number: "99%", label: "Happy Users", icon: HeartHandshake },
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-3xl bg-gradient-to-br from-white to-[#fdf8ed] border border-[#E8D99A]/40 shadow-xl hover:-translate-y-2 transition-all duration-300">
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-[#7A6330]" />
              <div className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#7A6330] to-blue-700 mb-2">
                {stat.number}
              </div>
              <p className="text-slate-600 font-semibold text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our core values drive everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Simplicity",
                description: "Easy to use interface for anyone, regardless of technical skills.",
                icon: Target,
                color: "text-blue-500",
                bg: "bg-blue-50",
                gradient: "from-blue-600 to-blue-500",
              },
              {
                title: "Trust & Security",
                description: "Your mosque's data is protected with enterprise-grade security.",
                icon: Award,
                color: "text-green-500",
                bg: "bg-green-50",
                gradient: "from-green-600 to-green-500",
              },
              {
                title: "Community First",
                description: "Built by mosque administrators, for mosque administrators.",
                icon: HeartHandshake,
                color: "text-[#7A6330]",
                bg: "bg-[#fdf8ed]",
                gradient: "from-[#7A6330] to-[#c8a84b]",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className={`w-16 h-1.5 bg-gradient-to-r ${item.gradient} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F2C4A]/5 to-[#F9F6F0]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Our Story
            </h2>

            <p className="text-slate-700 text-lg leading-relaxed">
              It all started in 2020 when a small group of mosque volunteers realized how much time was being spent on paperwork instead of serving the community. Managing donations, tracking memberships, and handling communication was a time-consuming mess.
            </p>

            <p className="text-slate-700 text-lg leading-relaxed">
              That&apos;s when we decided to build a simple, intuitive platform for mosque management. What started as a small project for one mosque has now grown to serve thousands of communities worldwide.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-700">
                <div className="w-3 h-3 rounded-full bg-[#7A6330]" />
                <span className="font-semibold">Free for small mosques</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="font-semibold">Dedicated support team</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#7A6330] to-blue-700 p-8 shadow-2xl">
              <div className="w-full h-full bg-white/95 rounded-2xl flex items-center justify-center p-8">
                <div className="text-center space-y-6">
                  <HeartHandshake className="w-20 h-20 mx-auto text-[#7A6330]" />
                  <h3 className="text-3xl font-extrabold text-slate-900">
                    Together We Build
                  </h3>
                  <p className="text-slate-600 text-lg max-w-sm mx-auto">
                    Join our growing community of modern mosques today!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#0F2C4A] to-[#1a426b] rounded-3xl p-10 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to Transform Your Mosque?
            </h2>

            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of mosques already using our platform. Get started today with a free trial.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-gradient-to-r from-[#7A6330] to-[#c8a84b] hover:from-[#c8a84b] hover:to-[#7A6330] text-white px-10 py-4 rounded-full font-bold text-xl shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all">
                Get Started Free
              </button>
              <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold text-xl border border-white/30 transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
