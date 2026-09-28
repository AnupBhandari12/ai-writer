import AIWriterForm from "./components/AIWriterForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl p-6 mx-auto">
        <h1 className="font-bold text-3xl">
          AI Writer
        </h1>
        <p className="mt-2 text-gray-600">
          Generate useful text using AI
        </p>

        <div className="mt-8">
          <AIWriterForm />
        </div>
      </div>
    </main>
  )
}