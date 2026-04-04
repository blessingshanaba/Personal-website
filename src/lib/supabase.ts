import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://kicevgxcadxxpsavtlqt.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImE1MGE5NjhiLTlkYWMtNGQ1MC1iNzAzLTI3ZGUzYWUyZjJmYSJ9.eyJwcm9qZWN0SWQiOiJraWNldmd4Y2FkeHhwc2F2dGxxdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc1MTMyMzE0LCJleHAiOjIwOTA0OTIzMTQsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.nbsBevR5SlGVuLUsuITx6Hp8J6D5I-4OgiDgLFBW-cY';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };