import express from 'express';
import path from 'path';
import { handleApiRequest } from './server/apiMiddleware';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// API routes handled via handleApiRequest middleware
app.use('/api', (req, res) => {
  req.url = '/api' + req.url;
  handleApiRequest(req as any, res as any);
});

// Serve Vite production build static assets
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));

// Fallback all frontend routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ZS Fashion Hub server running on port ${PORT}`);
});
