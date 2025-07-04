import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bgqjrqsjllwyvjyjcnju.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJncWpycXNqbGx3eXZqeWpjbmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2Mjg4NDYsImV4cCI6MjA2NzIwNDg0Nn0.7SoViyMr9XpDSR_Dk1dRMkwqDbVW6LaXsRo40navuWo"
);
