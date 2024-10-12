import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { signup } from "@/actions/auth/actions";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

export default async function SignUpPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-4xl font-extrabold text-gray-800">Create Account</h1>
            <p className="text-gray-600 text-center">
              Sign up with your email and password to get started.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 px-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="email" className="text-gray-700 font-semibold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
                className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="password" className="text-gray-700 font-semibold">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Your password"
                required
                type="password"
                className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <Button formAction={signup} className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-blue-600">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 px-6 pb-6">
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-500 hover:text-blue-600 underline font-semibold">
              Sign In here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
