import { db } from '../../../lib/db.js';

// GET /api/users/:id
export async function GET({ params }) {
    const { id } = params;
    
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(JSON.stringify(rows[0]), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// DELETE /api/users/:id
export async function POST({ params }){    
    const id = params.id;

    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return new Response(null, {
        status: 302,
        headers: { 'Location': '/' },
    });
}