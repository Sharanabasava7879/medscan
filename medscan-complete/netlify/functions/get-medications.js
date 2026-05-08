const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const store = getStore('medscan');
  const deviceId = event.queryStringParameters?.deviceId || 'MED001';
  const medications = await store.get(`meds-${deviceId}`, { type: 'json' }).catch(() => []) || [];

  return { statusCode: 200, headers, body: JSON.stringify({ medications }) };
};