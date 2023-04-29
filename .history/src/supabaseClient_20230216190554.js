import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://inyxfjfjxzdevxwzukie.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlueXhmamZqeHpkZXZ4d3p1a2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIyNDUzMTYsImV4cCI6MTk4NzgyMTMxNn0.eg_vLYQmFvtaNK1n55R675sP9gcmyhCQt_KdTh0wKmQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)