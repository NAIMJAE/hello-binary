import Link from "next/link";
import { languages } from "@/data/languages";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12">
        <header className="space-y-2">
          <p className="text-4xl font-bold tracking-tight text-amber-600 sm:text-5xl">
            hello-binary
          </p>
          <h1 className="text-3xl font-bold text-slate-900">정보처리기사 실기 준비</h1>
          <p className="max-w-2xl text-slate-600">
            한 줄도 건너뛰지 않고, 코드가 실행되는 흐름을 단계별로 보여 줍니다.
            직접 따라가며 이해하세요.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold tracking-wide text-slate-500">
            언어 선택
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {languages.map((lang) => (
              <li key={lang.id}>
                <Link
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white px-4 py-5 shadow-sm transition hover:border-amber-300 hover:shadow-md"
                  href={lang.href}
                >
                  <p className="text-lg font-semibold text-slate-900">{lang.name}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {lang.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
