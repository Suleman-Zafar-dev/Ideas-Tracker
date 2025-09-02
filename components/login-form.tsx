
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:gap-x-12">
        {/* Left content */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Turn Ideas Into Action, Faster 🚀
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Capture, organize, and track ideas from brainstorm to execution. Empower your team
            with a simple, collaborative workspace built for innovation.
          </p>
          <div className="mt-8 flex gap-x-4">
            <Link
              href="/signup"
              className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo"
              className="rounded-md border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100"
            >
              Book a Demo
            </Link>
          </div>
          {/* Social proof */}
          <div className="mt-10 flex items-center gap-x-6 text-sm text-gray-500">
            <span>Trusted by teams at</span>
            <Image src="/logos/google.svg" alt="Google" width={80} height={20} />
            <Image src="/logos/slack.svg" alt="Slack" width={80} height={20} />
          </div>
        </div>

        {/* Right visual */}
        <div className="mt-16 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          <Image
            src="/images/dashboard.png"
            alt="App dashboard preview"
            width={800}
            height={500}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
