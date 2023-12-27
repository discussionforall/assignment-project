import db from '../../db';
import Movie from '../../../../models/Movie';

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default async function handler(req, res) {
 
  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
console.log("api",id);
      const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        req.body, 
        { new: true }
      );

      res.status(200).json({ success: true, data: updatedMovie });
    } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
