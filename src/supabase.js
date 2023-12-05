import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nnnsdsaadbfszmgdbclp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubnNkc2FhZGJmc3ptZ2RiY2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1NDg1ODMsImV4cCI6MjAxNzEyNDU4M30.Ixizo_-z4v5yr8E2K6aWxkDuD3A92n5jBMdLSTPLLXg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
