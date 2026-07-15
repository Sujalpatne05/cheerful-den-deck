import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function fixPassword() {
  try {
    // Correct bcrypt hash for 'admin123'
    const correctHash = '$2a$10$Xswl93WXggxtz2z/5NvoquMK60YcJyET9j9.3vg40.5cws.ZaAWHG';
    
    const result = await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2 RETURNING email',
      [correctHash, 'admin@hotel.com']
    );
    
    if (result.rows.length > 0) {
      console.log('✅ Password updated successfully for admin@hotel.com');
      console.log('You can now login with:');
      console.log('  Email: admin@hotel.com');
      console.log('  Password: admin123');
    } else {
      console.log('❌ User not found. Creating new user...');
      
      await pool.query(
        'INSERT INTO users (email, password, full_name, role) VALUES ($1, $2, $3, $4)',
        ['admin@hotel.com', correctHash, 'Admin User', 'admin']
      );
      
      console.log('✅ Admin user created successfully!');
      console.log('  Email: admin@hotel.com');
      console.log('  Password: admin123');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixPassword();
