import dotenv from 'dotenv';

dotenv.config();

export const config = {
  kiotviet: {
    clientId: process.env.KIOTVIET_CLIENT_ID || '',
    clientSecret: process.env.KIOTVIET_CLIENT_SECRET || '',
    retailer: process.env.KIOTVIET_RETAILER || ''
  },
  server: {
    port: parseInt(process.env.PORT || '3000')
  }
};
