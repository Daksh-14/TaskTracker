import pg from 'pg';
export const db = new pg.Client({
    connectionString: "postgresql://neondb_owner:beosSO2Y7UpW@ep-lingering-fire-a5nw7bn6-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
});