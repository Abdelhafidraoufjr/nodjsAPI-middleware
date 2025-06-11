const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const swaggerSetup = require('./swagger/swagger');
const cors = require('cors')

dotenv.config();
connectDB();



const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api', userRoutes);
app.use('/api/blogs', blogRoutes);

swaggerSetup(app);

app.listen(process.env.PORT, () =>{
    console.log('Server Connected !!'); 
});