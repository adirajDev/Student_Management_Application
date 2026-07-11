import { UserButton, useUser } from "@clerk/react";

export default function Header() {
  const { user } = useUser();
  const displayName = user?.firstName || user?.primaryEmailAddress?.emailAddress || 'your workspace';

  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 pb-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Student Management
        </h1>
      </div>
      <div className="flex items-center justify-center gap-3">
        <span className="text-sm font-medium text-gray-500">{displayName}</span>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
