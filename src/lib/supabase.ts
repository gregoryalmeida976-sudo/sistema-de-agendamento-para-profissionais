import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wkllqbldvwcxcsryqmfj.supabase.co';
const supabaseKey = 'sb_publishable_jYm2iKw3RfwW3-_nDO6uSA_sdHw7U6J';

export const supabase = createClient(supabaseUrl, supabaseKey);
