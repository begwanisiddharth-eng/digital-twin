import { resume } from "@/lib/resume-data";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold">{resume.name}</h1>
      <p className="mt-4 text-lg">{resume.headline}</p>
    </main>
  );
}
