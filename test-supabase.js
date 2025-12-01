import { supabase } from './src/lib/supabase';

async function testConnection() {
    try {
        const { data, error } = await supabase.from('test_connection').select('*').limit(1);
        // It doesn't matter if the table exists, we just want to see if we can connect.
        // A "relation does not exist" error means we connected but the table is missing, which is fine.
        // A connection error would be different.

        if (error && error.code !== '42P01') { // 42P01 is undefined_table
            console.error('Connection failed:', error);
        } else {
            console.log('Connection successful (or at least reachable)!');
            if (error) console.log('Note: Table not found, but connection established.');
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testConnection();
