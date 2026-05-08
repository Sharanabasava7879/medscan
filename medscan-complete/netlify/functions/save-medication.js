const { getData, setData } = require('./db');

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    const medication = JSON.parse(event.body);
    const deviceId = medication.deviceId || 'MED001';
    const existing = await getData(`meds-${deviceId}`) || [];
    const idx = existing.findIndex(m => m.rfid === medication.rfid);
    if (idx >= 0) existing[idx] = medication;
    else existing.push(medication);
    await setData(`meds-${deviceId}`, existing);
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
