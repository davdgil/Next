"use client"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import WebPageEditor from "@/app/components/Merchant/webPageEditor";
import WebPageViewer from "@/app/components/Merchant/webPageViewer";

export default function WebPage() {
  const [webPage, setWebPage] = useState({});
  const [editing, setEditing] = useState(false);
  const [existPage, setExistPage] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleDeleteClick = async () => {
    try {
      // Envía la solicitud de eliminación al servidor
      const response = await fetch("/api/webPage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: webPage.id }), // Puedes ajustar según la estructura de tus datos
      });

      if (response.ok) {
        // Si la respuesta es exitosa, actualiza el estado para indicar que no hay página web
        setWebPage({});
        setExistPage(false); // Asegura que existPage sea false después de borrar
      } else {
        // Maneja errores si la respuesta no es exitosa
        console.error("Error al eliminar la página web:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };

  useEffect(() => {
    const getWebPages = async () => {
      try {
        const response = await fetch("/api/webPage"); // Asegúrate de que la ruta sea correcta
        const data = await response.json();

        // Verifica si hay alguna webPage almacenada en cookies
        const webPageCookie = Cookies.get("webPage");
        const parsedWebPageData = webPageCookie ? JSON.parse(webPageCookie) : null;

        if (parsedWebPageData) {
          setWebPage(parsedWebPageData);
        }

        const page = data.commerce.find((u) => u.id === webPage.id);
        setExistPage(!!page); // Convierte a boolean para asignar a existPage
      } catch (error) {
        console.error("Error al obtener datos de la webPage:", error);
      }
    };

    getWebPages();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez, después del montaje inicial

  return (
    <div>
      {editing ? (
        <WebPageEditor
          onSave={handleSave}
          onCancel={handleCancel}
          initialData={webPage}
        />
      ) : (
        <div>
          {existPage ? (
            // Verifica si hay una página web existente
            <>
              <WebPageViewer webPageData={webPage} />
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={handleEditClick}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleDeleteClick}
                >
                  Borrar
                </button>
              </div>
            </>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleEditClick}
            >
              Crear Nueva Página Web
            </button>
          )}
        </div>
      )}
    </div>
  );
}


