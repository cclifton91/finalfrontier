const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async function(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body)
    console.log('SERVICE ACCOUNT:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log('PRIVATE KEY START:', process.env.GOOGLE_PRIVATE_KEY.slice(0, 30)); // DON'T log the whole key!

    // Updated auth method
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, {
      auth: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      'Client Name': data.name,
      'Client Email': data.email,
      'Client Phone': data.phone,
      'Property Address': data.address,
      'Property Length': data.length,
      'Sell By': data.sellby,
      'Ideal Asking Price': data.price,
      'Most Important': data.message,
      'Who': data.userType,
      'Status': data.status,
      'Submitted At': new Date().toISOString()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted' }),
    };
  } catch (error) {
    console.error('❌ Google Sheets Submission Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};