const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);
    
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    
    await sheet.addRow({
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Address: data.address,
      PropertyType: data.type,
      OwnershipLength: data.length,
      SellTimeframe: data.sellby,
      Price: data.price,
      Message: data.message,
      UserType: data.userType,
      PropertyStatus: data.propertyStatus,
      SubmittedAt: new Date().toISOString()
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted' })
    };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
