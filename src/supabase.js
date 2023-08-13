import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  'https://lplbtjnlgcsyyeqbffwv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwbGJ0am5sZ2NzeXllcWJmZnd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwNzYzNzMsImV4cCI6MjAwNjY1MjM3M30.aOPK7Kk17MjI5Zl4zm8573ar4WKL0zhApCcZ_L_D3Fk'
);

export { supabase };
