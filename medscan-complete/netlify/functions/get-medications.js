const { getData } = require('./db');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    const deviceId = event.queryStringParameters?.deviceId || 'MED001';
    const medications = await getData(`meds-${deviceId}`) || [];
    return { statusCode: 200, headers, body: JSON.stringify({ medications }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
