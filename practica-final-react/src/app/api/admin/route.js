"use server"
import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export async function POST(request) {
  const data = await request.json();
  const filePath = resolve(process.cwd(), 'data', 'commerce.txt');
  console.log(data);

  try {
    // Leer commerce.txt del disco y concatenar con los datos de la solicitud
    const commerceData = JSON.parse(readFileSync(filePath, 'utf-8'));
    writeFileSync(filePath, JSON.stringify([...commerceData, data]));
  } catch (e) {
    console.error('Error en la función POST:', e);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Guardando datos...' });
}

