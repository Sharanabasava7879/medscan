const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const store = getStore('medscan');
  const patient = JSON.parse(event.body);
  await store.setJSON(`patient-${patient.deviceId}`, patient);

  return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
};