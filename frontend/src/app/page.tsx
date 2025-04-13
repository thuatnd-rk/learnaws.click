import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">DevOps AI Assistant</h1>
      <textarea className="w-full border rounded p-2" placeholder="Hỏi gì đó về DevOps..." />
    </main>
  );
}
