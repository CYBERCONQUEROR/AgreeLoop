import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ybaitxmnsxfhejdinkmw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYWl0eG1uc3hmaGVqZGlua213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NDc0MDEsImV4cCI6MjA2NDAyMzQwMX0.Q78NN6So1mOvwQecrboa0wRxDxZlzqBgvhXFSH5cnEk';

export const supabase = createClient(supabaseUrl, supabaseKey);