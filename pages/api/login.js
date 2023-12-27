import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); 
  }

  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
}
