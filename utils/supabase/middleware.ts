import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

// Inisialisasi Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Mengambil cookies dari request
  const cookies = request.cookies;

  // Mengelola cookies untuk Supabase
  const cookieOptions = {
    get(name: string) {
      return cookies.get(name)?.value;
    },
    set(name: string, value: string, options: { path?: string; maxAge?: number; expires?: Date }) {
      response.cookies.set(name, value, options);
    },
    remove(name: string, options: { path?: string }) {
      response.cookies.set(name, "", {
        ...options,
        maxAge: -1, // Menghapus cookie
      });
    },
  };

  // Mengambil user dari Supabase
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return response;
  }

  // Logika tambahan untuk session dapat ditambahkan di sini

  return response;
}
