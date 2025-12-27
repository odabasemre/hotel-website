import pool from './db.js';

const migrations = `
-- Settings tablosu
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings tablosu
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    booking_id VARCHAR(50) UNIQUE NOT NULL,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255),
    guest_phone VARCHAR(50) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INTEGER DEFAULT 1,
    room_type VARCHAR(100),
    total_price DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT 'TRY',
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site images tablosu
CREATE TABLE IF NOT EXISTS site_images (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    image_key VARCHAR(100) NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section, image_key)
);

-- Gallery images tablosu
CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    image_path VARCHAR(500) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Property info tablosu
CREATE TABLE IF NOT EXISTS property_info (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site texts tablosu
CREATE TABLE IF NOT EXISTS site_texts (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    lang VARCHAR(10) DEFAULT 'tr',
    content JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section, lang)
);

-- Pricing tablosu
CREATE TABLE IF NOT EXISTS pricing (
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Promos tablosu
CREATE TABLE IF NOT EXISTS promos (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    valid_from DATE,
    valid_until DATE,
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin users tablosu
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_settings_updated_at') THEN
        CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_bookings_updated_at') THEN
        CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_site_images_updated_at') THEN
        CREATE TRIGGER update_site_images_updated_at BEFORE UPDATE ON site_images
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Varsayılan ayarları ekle
INSERT INTO settings (key, value) VALUES 
    ('general', '{"nightlyPrice": 5000, "totalRooms": 2, "currency": "TRY"}'),
    ('contact', '{"phone": "+90 555 123 4567", "email": "info@ayderkuzeyhouses.com", "address": "Ayder Yaylası, Çamlıhemşin, Rize"}')
ON CONFLICT (key) DO NOTHING;

-- Varsayılan admin kullanıcı (şifre: admin123)
INSERT INTO admin_users (username, password_hash) VALUES 
    ('admin', '$2a$10$XQxBtL1R6z5V5Z5Z5Z5Z5O5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5')
ON CONFLICT (username) DO NOTHING;
`;

async function migrate() {
    try {
        console.log('🔄 Running migrations...');
        await pool.query(migrations);
        console.log('✅ Migrations completed successfully');
        
        // Varsayılan site resimlerini ekle
        const defaultImages = [
            { section: 'hero', image_key: 'background', image_path: '/images/hero/hero-background.jpg' },
            { section: 'services', image_key: 'image1', image_path: '/images/services/service-1.jpg' },
            { section: 'services', image_key: 'image2', image_path: '/images/services/service-2.jpg' },
            { section: 'rooms', image_key: 'main', image_path: '/images/room/room-main.jpg' },
            { section: 'about', image_key: 'image1', image_path: '/images/about/about-1.jpg' },
            { section: 'about', image_key: 'image2', image_path: '/images/about/about-2.jpg' },
        ];

        for (const img of defaultImages) {
            await pool.query(
                `INSERT INTO site_images (section, image_key, image_path) 
                 VALUES ($1, $2, $3) ON CONFLICT (section, image_key) DO NOTHING`,
                [img.section, img.image_key, img.image_path]
            );
        }

        console.log('✅ Default data inserted');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrate();
