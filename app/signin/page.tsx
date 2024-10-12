import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { signin } from "@/actions/auth/actions";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

export default async function SignInPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-4xl font-extrabold text-gray-800">To-Do APPS</h1>
            <p className="text-gray-600">
              Log in to your account below
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
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button formAction={signin} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-blue-600 hover:to-purple-600">
              Sign In
            </Button>
          </form>
          <Separator />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 px-6 pb-6">
          <Link href="/signup" className="text-center text-sm text-gray-600 hover:text-blue-500 underline">
            Don&apos;t have an account? <span className="font-semibold">Sign up here</span>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
