import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Todos from "@/components/todos/todos";
import ClearActions from "@/components/todos/clear-actions";
import SignOutButton from "@/components/auth/signout-button";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <div className="flex flex-col max-w-2xl w-full border rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6">
        <div className="flex items-center gap-4 pb-6">
          <CheckCircleIcon className="h-10 w-10 text-green-500" />
          <h1 className="font-extrabold text-3xl text-gray-900 dark:text-white">
            Your Todos
          </h1>
        </div>
        <Todos />
        <ClearActions />
      </div>

      {/* Menambahkan margin-top untuk memberi jarak */}
      <div className="mt-8">
        <SignOutButton />
      </div>
    </main>
  );
}

function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
