require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// Connect DB
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hcvu7.mongodb.net/myDB?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )
        console.log(`DB is connected`);
    } catch (error) {
        console.log(error.message);
    }
}
connectDB();

// API
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

// Unhandle Route
const { errorHandler } = require('./middlewares/errorHandler');
app.all('*', (req, res, next) => {
    const err = new Error('The route can not be found');
    err.statusCode = 404;
    next(err);
})
app.use(errorHandler);

app.listen(process.env.PORT, () => { console.log(`Server is running on port ${process.env.PORT}`); });