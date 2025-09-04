export default function TestPage() {
  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-4xl font-bold mb-4 text-black">Tailwind Test Page</h1>
      <p className="mb-6 text-gray-800">Testing basic CSS classes</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded bg-black text-white">Black background</div>
        <div className="p-4 rounded border border-black text-black bg-white">White background</div>
        <div className="p-4 rounded bg-cyan">Cyan background</div>
        <div className="p-4 rounded bg-gray-100">Gray background</div>
      </div>
      
      <div className="mt-8">
        <button className="px-4 py-2 rounded mr-2 bg-black text-white">
          Black Button
        </button>
        <button className="px-4 py-2 rounded border border-black text-black bg-white">
          White Button
        </button>
      </div>
    </div>
  );
} 