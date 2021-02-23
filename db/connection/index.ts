import mongoose from 'mongoose'

mongoose.set("useCreateIndex", true);

mongoose.connect('mongodb://localhost/blogdb', { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', () => console.log('数据库连接成功'));