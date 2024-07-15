const mongoose = require('mongoose')

const MONGODB_URL= 'mongodb://localhost:27017/mydb'

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB Connected!')).catch(err => {
    console.log("DB Connection Error: ");
    });


// mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true,  useNewUrlParser: true })