import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdtckwjxsnlwiyphqbww.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdGNrd2p4c25sd2l5cGhxYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDg5NzMsImV4cCI6MjA1ODQ4NDk3M30.f4T2P3xsvrA6brZYnFlBsWXKBQqSzfgTi7LYjJ5oH5E';

export const supabase = createClient(supabaseUrl, supabaseKey);
