import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { nombre, email, deporte, mensaje } = body;

    if (!nombre || !email || !deporte) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Campos requeridos incompletos.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Email no válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[EZTI] Nueva solicitud de prueba:', {
      nombre,
      email,
      deporte,
      mensaje: mensaje || '',
      ts: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ ok: true, message: '¡Gracias! Te contactaremos pronto.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (_) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
