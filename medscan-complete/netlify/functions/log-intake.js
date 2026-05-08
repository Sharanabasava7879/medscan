const { getData, setData } = require('./db');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    if (event.httpMethod === 'POST') {
      const log = JSON.parse(event.body);
      const deviceId = log.deviceId || 'MED001';
      const logs = await getData(`logs-${deviceId}`) || [];
      logs.unshift(log);
      await setData(`logs-${deviceId}`, logs.slice(0, 100));
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }
    const deviceId = event.queryStringParameters?.deviceId || 'MED001';
    const logs = await getData(`logs-${deviceId}`) || [];
    return { statusCode: 200, headers, body: JSON.stringify({ logs }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
