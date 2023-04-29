import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zhpjsvystjtqimamvrhy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGpzdnlzdGp0cWltYW12cmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI3NTE1NjIsImV4cCI6MTk5ODMyNzU2Mn0._d1CvJLFOu5wXFLigt5ROYVwELXRoWK4QqW9DwAHvRk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)