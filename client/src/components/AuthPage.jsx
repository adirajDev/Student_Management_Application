import { useEffect, useState } from 'react';
import { SignIn, SignUp } from '@clerk/react';
import heroImage from '../assets/hero.png';

const clerkAppearance = {
  elements: {
    rootBox: 'w-full',
    cardBox: 'w-full shadow-none border border-gray-200 rounded-lg',
    card: 'shadow-none',
    headerTitle: 'text-gray-950',
    headerSubtitle: 'text-gray-500',
    formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-sm normal-case',
    footerActionLink: 'text-indigo-600 hover:text-indigo-700',
  },
};

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('sign-in');
  const isSignIn = authMode === 'sign-in';
  const setMode = (mode) => {
    setAuthMode(mode);
    window.location.hash = mode;
  };

  useEffect(() => {
    const syncModeWithHash = () => {
      setAuthMode(window.location.hash.includes('sign-up') ? 'sign-up' : 'sign-in');
    };

    syncModeWithHash();
    window.addEventListener('hashchange', syncModeWithHash);

    return () => window.removeEventListener('hashchange', syncModeWithHash);
  }, []);

  return (
    <main className="min-h-[calc(100vh-3rem)] grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="space-y-8">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Student Management
          </p>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-gray-950 md:text-5xl">
              Get started with Student Management.
            </h1>
            <p className="max-w-xl text-base leading-7 text-gray-600">
              Sign in to manage enrollments, courses, and student details in a private workspace tied to your account.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 grid grid-cols-2 rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setMode('sign-in')}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              isSignIn ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-600 hover:text-gray-950'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode('sign-up')}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              !isSignIn ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-600 hover:text-gray-950'
            }`}
          >
            Sign up
          </button>
        </div>

        {isSignIn ? (
          <SignIn appearance={clerkAppearance} routing="hash" signUpUrl="#/sign-up" />
        ) : (
          <SignUp appearance={clerkAppearance} routing="hash" signInUrl="#/sign-in" />
        )}
      </section>
    </main>
  );
};

export default AuthPage;
