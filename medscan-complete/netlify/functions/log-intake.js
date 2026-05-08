const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const store = getStore('medscan');

  if (event.httpMethod === 'POST') {
    const log = JSON.parse(event.body);
    const deviceId = log.deviceId || 'MED001';
    const logs = await store.get(`logs-${deviceId}`, { type: 'json' }).catch(() => []) || [];
    logs.unshift(log);
    await store.setJSON(`logs-${deviceId}`, logs.slice(0, 100));
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  }

  const deviceId = event.queryStringParameters?.deviceId || 'MED001';
  const logs = await store.get(`logs-${deviceId}`, { type: 'json' }).catch(() => []) || [];
  return { statusCode: 200, headers, body: JSON.stringify({ logs }) };
};