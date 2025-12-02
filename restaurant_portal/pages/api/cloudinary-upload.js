import nextConnect from 'next-connect'
import multer from 'multer'
import cloudinary from '../../lib/cloudinary'
import streamifier from 'streamifier'

const upload = multer()
const handler = nextConnect()
handler.use(upload.single('file'))

handler.post(async (req, res) => {
  try {
    const buffer = req.file.buffer
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'video', folder: 'restaurant_videos' },
      (error, result) => {
        if (error) return res.status(500).json({ error })
        return res.status(200).json({ result })
      }
    )
    streamifier.createReadStream(buffer).pipe(stream)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export const config = { api: { bodyParser: false } }
export default handler
