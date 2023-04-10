import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
import dotenv from 'dotenv';
dotenv.config();

export const dbConnection = async () => {
  const url = process.env.MONGO_URL;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Base de datos (atlas) : \x1b[32m%s\x1b[0m', 'Online');
  } catch (error) {
    throw new Error('Error a la hora de iniciar la base de datos');
  }
};


