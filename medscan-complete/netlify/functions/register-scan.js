const { getData, setData } = require('./db');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body);
      await setData(`scan-${data.deviceId || 'MED001'}`, {
        rfid: data.rfid, deviceId: data.deviceId || 'MED001', timestamp: new Date().toISOString()
      });
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }
    const deviceId = event.queryStringParameters?.deviceId || 'MED001';
    const scan = await getData(`scan-${deviceId}`);
    return { statusCode: 200, headers, body: JSON.stringify(scan || { rfid: null }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
