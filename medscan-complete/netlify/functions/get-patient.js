const { getData } = require('./db');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    const deviceId = event.queryStringParameters?.deviceId;
    const patient = await getData(`patient-${deviceId}`);
    return { statusCode: 200, headers, body: JSON.stringify({ patient: patient || null }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
