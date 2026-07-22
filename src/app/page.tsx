export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-white">
      <span
        className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]"
        style={{ color: "var(--brand-accent)" }}
      >
        Navanta
      </span>
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
        The Supply Chain Intelligence Layer
        <br />
        for Industrial Enterprises
      </h1>
      <p className="mt-6 max-w-xl text-base text-white/50 sm:text-lg">
        Project scaffolded and ready. Section-by-section build starts next.
      </p>
    </main>
  );
}
