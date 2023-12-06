"use server";
import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export async function POST(request) {
  const data = await request.json();
  const filePath = resolve('data', 'commerce.txt');
  console.log(data);
  try {
    // Read commerce.txt from disk and concatenate with data from request
    const commerceData = JSON.parse(readFileSync(filePath, 'utf-8'));
    writeFileSync(filePath, JSON.stringify([...commerceData, data]));

    // Return a JSON response with success message
    return NextResponse.json({ message: 'Guardando datos...' });
  } catch (e) {
    // If commerce.txt file does not exist, create it with data from request
    writeFileSync(filePath, JSON.stringify([data]));

    // Return a JSON response with success message
    return NextResponse.json({ message: 'Guardando datos...' });
  }
}
