import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.POSTGRES_URL!);
await sql`CREATE TABLE IF NOT EXISTS file_history (timestamp BIGINT, file_path TEXT, entropy_score DOUBLE PRECISION, is_anomaly BOOLEAN)`;
console.log('Table created successfully');
