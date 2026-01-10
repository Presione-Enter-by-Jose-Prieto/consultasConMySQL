import { db } from '../../lib/db.js';

// GET /api/users
export async function GET(){
    const [rows] = await db.query('SELECT * FROM users');
    return new Response(JSON.stringify(rows), {
        headers: { 'Content-Type': 'application/json' },
    });
}

// POST /api/users
export async function POST({ request }){
    const data = await request.json();
    const name = data.name;

    await db.query('INSERT INTO users (name) VALUES (?)', [name]);
    
    return new Response(
        JSON.stringify({ success: true }),{
            headers: { 'Content-Type': 'application/json' },
        }
    )
}