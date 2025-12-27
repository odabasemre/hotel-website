import express from 'express';
import pool from '../database/db.js';

const router = express.Router();

// Tüm ayarları getir
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT key, value FROM settings');
        const settings = {};
        result.rows.forEach(row => {
            settings[row.key] = row.value;
        });
        res.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

// Belirli bir ayarı getir
router.get('/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const result = await pool.query('SELECT value FROM settings WHERE key = $1', [key]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Setting not found' });
        }
        
        res.json(result.rows[0].value);
    } catch (error) {
        console.error('Error fetching setting:', error);
        res.status(500).json({ error: 'Failed to fetch setting' });
    }
});

// Ayar güncelle veya oluştur
router.put('/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const value = req.body;
        
        const result = await pool.query(
            `INSERT INTO settings (key, value) VALUES ($1, $2)
             ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [key, JSON.stringify(value)]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating setting:', error);
        res.status(500).json({ error: 'Failed to update setting' });
    }
});

// Site images
router.get('/images/all', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT section, image_key, image_path FROM site_images ORDER BY section, display_order'
        );
        
        const images = {};
        result.rows.forEach(row => {
            if (!images[row.section]) {
                images[row.section] = {};
            }
            images[row.section][row.image_key] = row.image_path;
        });
        
        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});

// Site image güncelle
router.put('/images/:section/:imageKey', async (req, res) => {
    try {
        const { section, imageKey } = req.params;
        const { imagePath } = req.body;
        
        const result = await pool.query(
            `INSERT INTO site_images (section, image_key, image_path) VALUES ($1, $2, $3)
             ON CONFLICT (section, image_key) DO UPDATE SET image_path = $3, updated_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [section, imageKey, imagePath]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating image:', error);
        res.status(500).json({ error: 'Failed to update image' });
    }
});

// Gallery images
router.get('/gallery/images', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM gallery_images WHERE is_active = true ORDER BY display_order'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching gallery:', error);
        res.status(500).json({ error: 'Failed to fetch gallery' });
    }
});

router.post('/gallery/images', async (req, res) => {
    try {
        const { imagePath, title, description, displayOrder } = req.body;
        
        const result = await pool.query(
            `INSERT INTO gallery_images (image_path, title, description, display_order)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [imagePath, title, description, displayOrder || 0]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding gallery image:', error);
        res.status(500).json({ error: 'Failed to add gallery image' });
    }
});

router.delete('/gallery/images/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE gallery_images SET is_active = false WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting gallery image:', error);
        res.status(500).json({ error: 'Failed to delete gallery image' });
    }
});

// Property info
router.get('/property/info', async (req, res) => {
    try {
        const result = await pool.query('SELECT key, value FROM property_info');
        const info = {};
        result.rows.forEach(row => {
            info[row.key] = row.value;
        });
        res.json(info);
    } catch (error) {
        console.error('Error fetching property info:', error);
        res.status(500).json({ error: 'Failed to fetch property info' });
    }
});

router.put('/property/info/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const value = req.body;
        
        const result = await pool.query(
            `INSERT INTO property_info (key, value) VALUES ($1, $2)
             ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [key, JSON.stringify(value)]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating property info:', error);
        res.status(500).json({ error: 'Failed to update property info' });
    }
});

// Pricing
router.get('/pricing', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let query = 'SELECT * FROM pricing';
        const params = [];
        
        if (startDate && endDate) {
            query += ' WHERE date BETWEEN $1 AND $2';
            params.push(startDate, endDate);
        }
        
        query += ' ORDER BY date';
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching pricing:', error);
        res.status(500).json({ error: 'Failed to fetch pricing' });
    }
});

router.put('/pricing/:date', async (req, res) => {
    try {
        const { date } = req.params;
        const { price, isAvailable, notes } = req.body;
        
        const result = await pool.query(
            `INSERT INTO pricing (date, price, is_available, notes) VALUES ($1, $2, $3, $4)
             ON CONFLICT (date) DO UPDATE SET price = $2, is_available = $3, notes = $4
             RETURNING *`,
            [date, price, isAvailable !== false, notes]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating pricing:', error);
        res.status(500).json({ error: 'Failed to update pricing' });
    }
});

// Site texts
router.get('/texts', async (req, res) => {
    try {
        const { lang = 'tr' } = req.query;
        const result = await pool.query(
            'SELECT section, content FROM site_texts WHERE lang = $1',
            [lang]
        );
        
        const texts = {};
        result.rows.forEach(row => {
            texts[row.section] = row.content;
        });
        
        res.json(texts);
    } catch (error) {
        console.error('Error fetching texts:', error);
        res.status(500).json({ error: 'Failed to fetch texts' });
    }
});

router.put('/texts/:section', async (req, res) => {
    try {
        const { section } = req.params;
        const { lang = 'tr', content } = req.body;
        
        const result = await pool.query(
            `INSERT INTO site_texts (section, lang, content) VALUES ($1, $2, $3)
             ON CONFLICT (section, lang) DO UPDATE SET content = $3, updated_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [section, lang, JSON.stringify(content)]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating texts:', error);
        res.status(500).json({ error: 'Failed to update texts' });
    }
});

export default router;
