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
    const status = data.status;

    await db.query('INSERT INTO users (name, status) VALUES (?, ?)', [name, status]);

    return new Response(
        JSON.stringify({ success: true }),{
            headers: { 'Content-Type': 'application/json' },
        }
    )
}

// funcion para actualizar los datos del usuario 
export async function PUT({ request }) {
    const body = await request.json()
    const { name  , id, status } = body

    try {

        await db.query('UPDATE users SET name = ?, status = ? WHERE id = ? ' , [name, status, id])
        return new Response(JSON.stringify({ ok: true, mensaje: "Usuario actualizado" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });

    }catch(e){

        return new Response(JSON.stringify({
            ok: false , message : e.message
        }) , {status : 500})
    }
    
}