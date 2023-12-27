import db from '../db';
import Movie from '../../../models/Movie';

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default async function handler(req, res) {
  if (req.method === 'GET') {
    
    try {
      const { id } = req.query;
      const { title, publishYear, image } = req.body;

      const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        { title, publishYear, image },
        { new: true }
      );

      res.status(200).json({ success: true, data: updatedMovie });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

}
