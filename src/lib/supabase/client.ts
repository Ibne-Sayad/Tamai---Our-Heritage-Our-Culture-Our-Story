"use client";
import {createBrowserClient} from "@supabase/ssr";
import type {Database} from "@/types/database";
import {supabaseConfig} from "./config";
export function browserSupabase(){const config=supabaseConfig();return config?createBrowserClient<Database>(config.url,config.key):null;}
