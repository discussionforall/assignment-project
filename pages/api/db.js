import mongoose from 'mongoose';

const uri = 'mongodb+srv://lmsparkle077:lmsparkle2001@assignment01.s2czmgf.mongodb.net/Movies?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default mongoose.connection;
