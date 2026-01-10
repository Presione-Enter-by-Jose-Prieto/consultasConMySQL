import { db } from '../../../lib/db.js';

// DELETE /api/users/:id
export async function POST({ params }){    
    const id = params.id;

    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return new Response(null, {
        status: 302,
        headers: { 'Location': '/' },
    });
}