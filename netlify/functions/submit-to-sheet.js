const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);
    //console.log('Received form data:', data);

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    //console.log('Document loaded successfully');

    const sheet = doc.sheetsByIndex[0];
    //console.log('Sheet accessed:', sheet.title);

    await sheet.addRow({
      'Client Name': data.name,
      'Client Email': data.email,
      'Client Phone': data.phone,
      'Property Address': data.address,
      'Property Length': data.time,
      'Currently Listed': data.currentlyListed,
      'Type of Home': data.homeType,
      'Occupied': data.occupied,
      'Repairs': data.repairs,
      'Sell By': data.sellby,
      'Ideal Asking Price': data.price,
      'Investor Buy Box': data.investorMessage,
      'Most Important': data.message,
      'Who': data.userType,
      'Status': data.status,
      'Agreed': data.agreed,
      'Submitted At': new Date().toISOString(),
    });

    //console.log('Row added successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' }),
    };
  } catch (error) {
    //console.error('❌ Detailed error:', error.message);
    //console.error('Stack trace:', error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
