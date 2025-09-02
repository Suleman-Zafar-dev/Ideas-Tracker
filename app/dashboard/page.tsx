import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow mx-auto w-full max-w-4xl px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold mb-10">What’s On Your Mind?</h1>

        {/* Idea Capture Box */}
        <div className="rounded-2xl shadow-lg p-8 space-y-6">
          <textarea
            rows={6}
            placeholder="Type your idea here..."
            className="w-full resize-none text-lg leading-relaxed border rounded-xl p-6 focus:outline-none focus:ring-2"
          />

          {/* Helpers / Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-lg px-6 py-3 font-semibold shadow-sm">
              Save Idea
            </button>
            <button className="rounded-lg px-6 py-3 font-semibold border">
              Clear
            </button>
            <button className="rounded-lg px-6 py-3 font-semibold border">
              🎤 Voice to Text
            </button>
            <button className="rounded-lg px-6 py-3 font-semibold border">
              ⚡ AI Assist
            </button>
          </div>

          {/* Tags / Organization Helpers */}
          <div className="border-t pt-6 space-y-3">
            <h2 className="text-lg font-semibold">Organize</h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 text-sm rounded-full cursor-pointer">
                💡 Idea
              </span>
              <span className="px-4 py-2 text-sm rounded-full cursor-pointer">
                🚀 Project
              </span>
              <span className="px-4 py-2 text-sm rounded-full cursor-pointer">
                📝 Note
              </span>
              <span className="px-4 py-2 text-sm rounded-full cursor-pointer">
                🔖 Tag
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default page