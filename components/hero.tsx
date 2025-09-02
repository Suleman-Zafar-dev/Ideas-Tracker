export default function Hero() {
  return (
    <section>
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28 flex flex-col-reverse lg:flex-row items-start gap-16">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-7">
          <h1 className="text-6xl font-extrabold leading-tight tracking-tight max-w-2xl">
            Never Lose a Brilliant Idea Again.
          </h1>
          <p className="text-2xl leading-relaxed max-w-xl">
            Capture, organize, and rediscover your thoughts effortlessly — 
            so your creativity flows without limits.
          </p>
          <div className="flex gap-4">
            <a
              href="/dashboard"
              className="rounded-lg px-8 py-4 text-lg font-semibold shadow-lg transition hover:scale-105"
            >
              Start Free Today
            </a>
            <a
              href="#"
              className="rounded-lg border px-8 py-4 text-lg font-semibold transition hover:bg-opacity-10"
            >
              Watch Demo
            </a>
          </div>
        </div>

        {/* Right Content (App Mockup Placeholder) */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="w-[24rem] h-[14rem] rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-lg opacity-70">[ App Mockup ]</span>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="text-5xl font-bold tracking-tight leading-tight max-w-3xl mb-16">
            Why Capture Ideas Instantly?
          </h2>

          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">
                Capture Anywhere, Anytime
              </h3>
              <p className="text-lg leading-relaxed">
                Don’t wait until you’re back at your desk. Jot down ideas instantly on your phone, tablet, or laptop.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">
                Organize Without Effort
              </h3>
              <p className="text-lg leading-relaxed">
                Smart tags and categories make sure every thought is easy to find later — no more lost notes.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">
                Spark Better Creativity
              </h3>
              <p className="text-lg leading-relaxed">
                Great ideas rarely come fully formed. By capturing the small sparks, you’ll connect them into powerful projects.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">
                Write on the Go
              </h3>
              <p className="text-lg leading-relaxed">
                Voice-to-text and quick input tools let you record thoughts even when you’re walking, commuting, or in between meetings.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">
                Never Lose Momentum
              </h3>
              <p className="text-lg leading-relaxed">
                Instead of relying on memory, let the app remember for you — freeing your mind to focus on creating.
              </p>
            </div>
          </div>

          {/* Closing CTA */}
          <div className="mt-20">
            <a
              href="/dashboard"
              className="inline-block rounded-lg px-10 py-5 text-lg font-semibold shadow-lg transition hover:scale-105"
            >
              Start Free Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
