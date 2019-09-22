import multer from 'multer';
import crypto from 'crypto'; // Provided by node.js
import { extname, resolve } from 'path'; // Provided by node.js

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // will upload to /tmp/uploads a random filename like uu12u3uu657.png
        // Don't use the file.originalname (use only the extention name) because
        // the use uploading this file could be using strange special characters
        // so it's preferable to generate a random filename and only use the
        // the uploaded file extension
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
