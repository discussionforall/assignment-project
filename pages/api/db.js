import mongoose from 'mongoose';

const uri = 'mongodb+srv://lmsparkle077:lmsparkle2001@movieproject.xwees2x.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default mongoose.connection;
