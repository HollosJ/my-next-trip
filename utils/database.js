import mongoose from 'mongoose';

// Track connection status
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.warn('MDB Already Connected.');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'trips',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log('MDB Connected.');
  } catch (error) {
    console.error(error);
  }
};
