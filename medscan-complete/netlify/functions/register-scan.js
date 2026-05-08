const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const store = getStore('medscan');

  if (event.httpMethod === 'POST') {
    const data = JSON.parse(event.body);
    await store.setJSON(`scan-${data.deviceId || 'MED001'}`, {
      rfid: data.rfid, deviceId: data.deviceId || 'MED001', timestamp: new Date().toISOString()
    });
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  }

  const deviceId = event.queryStringParameters?.deviceId || 'MED001';
  const scan = await store.get(`scan-${deviceId}`, { type: 'json' }).catch(() => null);
  return { statusCode: 200, headers, body: JSON.stringify(scan || { rfid: null }) };
};