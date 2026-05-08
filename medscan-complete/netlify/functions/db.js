const fetch = require('node-fetch');

const SUPABASE_URL = 'https://klcmbojujytpqezyfzne.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY21ib2p1anl0cHFlenlmem5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTg2MTksImV4cCI6MjA5Mzc5NDYxOX0.G2DuGFOMZ948-chPBa6KkdkAWerFcv9KstX9uehUHR4';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal'
};

async function getData(key) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/medscan_data?key=eq.${encodeURIComponent(key)}&select=value`, { headers });
  const rows = await res.json();
  if (rows && rows.length > 0) return rows[0].value;
  return null;
}

async function setData(key, value) {
  await fetch(`${SUPABASE_URL}/rest/v1/medscan_data`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'resolution=merge-duplicates' },
    body: JSON.stringify({ key, value, updated_at: new Date().toISOString() })
  });
}

module.exports = { getData, setData };
