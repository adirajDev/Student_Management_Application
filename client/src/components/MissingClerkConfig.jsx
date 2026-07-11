const MissingClerkConfig = () => {
  return (
    <main className="min-h-[calc(100vh-3rem)] grid place-items-center">
      <section className="w-full max-w-xl rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-950 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          Clerk setup needed
        </p>
        <h1 className="mt-3 text-2xl font-bold text-amber-950">
          Add your Clerk publishable key
        </h1>
        <p className="mt-3 leading-7 text-amber-900">
          Create `client/.env` and set `VITE_CLERK_PUBLISHABLE_KEY` from the Clerk Dashboard. Restart Vite after adding it.
        </p>
      </section>
    </main>
  );
};

export default MissingClerkConfig;