const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const store = getStore('medscan');
  const deviceId = event.queryStringParameters?.deviceId;
  const patient = await store.get(`patient-${deviceId}`, { type: 'json' }).catch(() => null);

  return { statusCode: 200, headers, body: JSON.stringify({ patient: patient || null }) };
};