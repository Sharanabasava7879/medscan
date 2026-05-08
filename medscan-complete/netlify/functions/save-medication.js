const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const store = getStore('medscan');
  const medication = JSON.parse(event.body);
  const deviceId = medication.deviceId || 'MED001';

  const existing = await store.get(`meds-${deviceId}`, { type: 'json' }).catch(() => []) || [];
  const idx = existing.findIndex(m => m.rfid === medication.rfid);
  if (idx >= 0) existing[idx] = medication;
  else existing.push(medication);

  await store.setJSON(`meds-${deviceId}`, existing);
  return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
};