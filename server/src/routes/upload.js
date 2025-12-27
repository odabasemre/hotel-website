import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import pool from '../database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Upload klasörünü oluştur
const uploadDir = path.join(__dirname, '../../../uploads');
const sectionsDir = {
    hero: path.join(uploadDir, 'hero'),
    services: path.join(uploadDir, 'services'),
    rooms: path.join(uploadDir, 'rooms'),
    about: path.join(uploadDir, 'about'),
    gallery: path.join(uploadDir, 'gallery'),
    general: path.join(uploadDir, 'general')
};

// Klasörleri oluştur
Object.values(sectionsDir).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Multer konfigürasyonu
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const section = req.body.section || req.query.section || 'general';
        const dir = sectionsDir[section] || sectionsDir.general;
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${uuidv4().substring(0, 8)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
});

// Tek dosya yükle
router.post('/single', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const section = req.body.section || 'general';
        const imageKey = req.body.imageKey;
        const relativePath = `/uploads/${section}/${req.file.filename}`;

        // Veritabanına kaydet
        if (imageKey) {
            await pool.query(
                `INSERT INTO site_images (section, image_key, image_path) 
                 VALUES ($1, $2, $3)
                 ON CONFLICT (section, image_key) DO UPDATE SET image_path = $3, updated_at = CURRENT_TIMESTAMP`,
                [section, imageKey, relativePath]
            );
        }

        res.json({
            success: true,
            path: relativePath,
            filename: req.file.filename,
            section,
            imageKey
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

// Çoklu dosya yükle (galeri için)
router.post('/multiple', upload.array('images', 20), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const section = req.body.section || 'gallery';
        const uploadedFiles = [];

        for (const file of req.files) {
            const relativePath = `/uploads/${section}/${file.filename}`;
            
            // Galeriye ekle
            const result = await pool.query(
                `INSERT INTO gallery_images (image_path, display_order) 
                 VALUES ($1, (SELECT COALESCE(MAX(display_order), 0) + 1 FROM gallery_images))
                 RETURNING *`,
                [relativePath]
            );

            uploadedFiles.push({
                path: relativePath,
                filename: file.filename,
                id: result.rows[0].id
            });
        }

        res.json({
            success: true,
            files: uploadedFiles,
            count: uploadedFiles.length
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Failed to upload files' });
    }
});

// Base64 olarak yükle
router.post('/base64', async (req, res) => {
    try {
        const { image, section = 'general', imageKey, filename } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'No image data provided' });
        }

        // Base64 data'sını çöz
        const matches = image.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!matches) {
            return res.status(400).json({ error: 'Invalid base64 image format' });
        }

        const ext = matches[1];
        const data = matches[2];
        const buffer = Buffer.from(data, 'base64');

        // Dosya adı oluştur
        const uniqueSuffix = `${Date.now()}-${uuidv4().substring(0, 8)}`;
        const finalFilename = filename || `${uniqueSuffix}.${ext}`;
        
        // Klasörü kontrol et
        const dir = sectionsDir[section] || sectionsDir.general;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Dosyayı kaydet
        const filePath = path.join(dir, finalFilename);
        fs.writeFileSync(filePath, buffer);

        const relativePath = `/uploads/${section}/${finalFilename}`;

        // Veritabanına kaydet
        if (imageKey) {
            await pool.query(
                `INSERT INTO site_images (section, image_key, image_path) 
                 VALUES ($1, $2, $3)
                 ON CONFLICT (section, image_key) DO UPDATE SET image_path = $3, updated_at = CURRENT_TIMESTAMP`,
                [section, imageKey, relativePath]
            );
        }

        res.json({
            success: true,
            path: relativePath,
            filename: finalFilename,
            section,
            imageKey
        });
    } catch (error) {
        console.error('Error uploading base64 image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Dosya sil
router.delete('/:section/:filename', async (req, res) => {
    try {
        const { section, filename } = req.params;
        const dir = sectionsDir[section] || sectionsDir.general;
        const filePath = path.join(dir, filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Veritabanından da sil
        const relativePath = `/uploads/${section}/${filename}`;
        await pool.query(
            'DELETE FROM site_images WHERE image_path = $1',
            [relativePath]
        );
        await pool.query(
            'UPDATE gallery_images SET is_active = false WHERE image_path = $1',
            [relativePath]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

// Yüklü dosyaları listele
router.get('/list/:section?', async (req, res) => {
    try {
        const { section } = req.params;

        if (section) {
            const dir = sectionsDir[section] || sectionsDir.general;
            if (!fs.existsSync(dir)) {
                return res.json({ files: [] });
            }

            const files = fs.readdirSync(dir).map(filename => ({
                filename,
                path: `/uploads/${section}/${filename}`,
                section
            }));

            return res.json({ files });
        }

        // Tüm sectionları listele
        const allFiles = [];
        for (const [sectionName, dir] of Object.entries(sectionsDir)) {
            if (fs.existsSync(dir)) {
                const files = fs.readdirSync(dir).map(filename => ({
                    filename,
                    path: `/uploads/${sectionName}/${filename}`,
                    section: sectionName
                }));
                allFiles.push(...files);
            }
        }

        res.json({ files: allFiles });
    } catch (error) {
        console.error('Error listing files:', error);
        res.status(500).json({ error: 'Failed to list files' });
    }
});

export default router;
