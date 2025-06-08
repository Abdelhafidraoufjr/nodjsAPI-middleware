const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const swaggerSetup = require('./swagger/swagger');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
swaggerSetup(app);

app.listen(process.env.PORT, () =>{
    console.log('Server Connected !!'); 
});