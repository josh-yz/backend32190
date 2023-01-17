const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dbConnection = async () => {
    const url = 'mongodb+srv://joshua:0ksRGFwgJfMPHa4P@coderhouse.y8y8lnq.mongodb.net/chat'
    try {
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,        
        });
        console.log('Base de datos (atlas)    : \x1b[32m%s\x1b[0m', 'Online')
        
    } catch (error) {
        throw new Error('Error a la hora de iniciar la base de datos');
        
    }
}
module.exports = {
    dbConnection
}