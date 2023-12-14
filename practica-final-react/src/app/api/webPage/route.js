"use server"
import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export async function POST(request) {
  const data = await request.json();
  const filePath = resolve('data', 'webPage.txt');
  console.log(data);
  try {
    // Read webPage.txt from disk and concatenate with data from request
    const webPageData = JSON.parse(readFileSync(filePath, 'utf-8'));
    writeFileSync(filePath, JSON.stringify([...webPageData, data]));

    // Return a JSON response with success message
    return NextResponse.json({ message: 'Guardando datos...' });
  } catch (e) {
    // If webPage.txt file does not exist, create it with data from request
    writeFileSync(filePath, JSON.stringify([data]));

    // Return a JSON response with success message
    return NextResponse.json({ message: 'Guardando datos...' });
  }
}

export async function GET() {
  try {
    const webPage = JSON.parse(readFileSync("data/webPage.txt"));
    // Return the entire array of webPages
    return NextResponse.json({ webPage });
  } catch (e) {
    return NextResponse.json({ message: "WebPage no existente...", status: 400 });
  }
}

export async function DELETE(request) {
  const data = await request.json();

  try {
    const webPage = JSON.parse(readFileSync("data/webPage.txt"));
    
    const webPageFilter = webPage.filter(webPage => webPage.id !== data.id);

    writeFileSync("data/webPage.txt", JSON.stringify(webPageFilter));
    return NextResponse.json({ webPageFilter, message: "WebPage eliminada...", status: 200 });
  } catch (e) {
    console.log(e);
  }
}
export async function PUT(request) {
  const { id } = request.params; // Captura el id de la URL

  const data = await request.json();

  try {
    let webPage = JSON.parse(readFileSync("data/webPage.txt"));
    const updatedWebPage = webPage.map((page) => {
      if (page.id === id) {
        if (data.likes !== undefined) {
          page.likes = page.likes + 1;
        }
        if (data.dislikes !== undefined) {
          page.dislikes = page.dislikes + 1;
        }
        if (data.reviews !== undefined) {
          page.reviews = [...page.reviews, data.reviews];
        }
      }
      return page;
    });

    writeFileSync("data/webPage.txt", JSON.stringify(updatedWebPage));
    return NextResponse.json({ updatedWebPage, message: "Valores actualizados...", status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error al actualizar valores...", status: 500 });
  }
}
