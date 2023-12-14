import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export async function PUT(request) {
    const { id } = request.body; // Extrae el id del cuerpo de la solicitud

    try {
        let webPage = JSON.parse(readFileSync("data/webPage.txt"));
        const updatedWebPage = webPage.map((page) => {
            if (page.id === id) {
                if (page.likes !== undefined) {
                    page.likes = page.likes + 1;
                }
                if (page.dislikes !== undefined) {
                    page.dislikes = page.dislikes + 1;
                }
                if (page.reviews !== undefined) {
                    page.reviews = [...page.reviews, request.body.reviews];
                }
                writeFileSync("data/webPage.txt", JSON.stringify(updatedWebPage));
        return NextResponse.json({ updatedWebPage, message: "Valores actualizados...", status: 200 });
            }
            return page;
        });

        
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Error al actualizar valores...", status: 500 });
    }
}
