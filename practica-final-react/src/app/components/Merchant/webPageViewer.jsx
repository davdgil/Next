// WebPageViewer.jsx
import React, { useState } from "react";

const WebPageViewer = ({ webPageData }) => {
  const { commerceName, title, description, city, photos, addres, likes, dislikes, reviews } = webPageData;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = async () => {
    if (!liked) {
        try {
            const requestBody = { likes: webPageData.likes + 1 };
            console.log('Request Body:', requestBody); // Agrega este log para verificar el cuerpo de la solicitud
            const response = await fetch(`http://localhost:3000/api/webPage/${webPageData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setLiked(true);
                setDisliked(false);
                console.log('+1');
            } else {
                console.error('Error al actualizar los likes');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }
};
  

  const handleDislike = async () => {
    if (!disliked) {
      try {
        // Realiza la solicitud al servidor para actualizar los dislikes utilizando el método PUT
        const response = await fetch(`http://localhost:3000/api/webPage/${webPageData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'dislike' }), // Puedes enviar la acción (like o dislike) al servidor
        });

        if (response.ok) {
          setDisliked(true);
          setLiked(false);
        } else {
          console.error('Error al actualizar los dislikes');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-gray-300 mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {commerceName}
        </span>
      </h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <p className="text-gray-300 mb-4">
          Encuéntranos:{" "}
          <a
            href={`https://www.google.com/maps/place/${encodeURIComponent(addres)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {addres}
          </a>
        </p>

        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
        <p className="text-gray-300 mb-4">Ciudad: {city}</p>

        <hr className="border-t-2 border-gray-700 my-6" />

        {photos && photos.length > 0 && (
          <div className="flex flex-wrap justify-center mb-8">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={`data:image/png;base64, ${photo}`} // Asegúrate de tener la URL o cadena base64 correcta
                alt={`Photo ${index + 1}`}
                className="w-32 h-32 object-cover rounded mb-4 mx-4"
              />
            ))}
          </div>
        )}

        <div className="mb-8">
          <div className="flex space-x-4 mb-4">
            <div>
              <span className="text-green-500">{likes}</span> Likes
            </div>
            <div>
              <span className="text-red-500">{dislikes}</span> Dislikes
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex flex-col items-center mt-4">
              <button
                onClick={handleLike}
                className={`text-green-500 focus:outline-none ${liked ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                👍 Me gusta
              </button>
              
            </div>
            <div className="flex flex-col items-center mt-4">
              <button
                onClick={handleDislike}
                className={`text-red-500 focus:outline-none ${disliked ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                👎 No me gusta
              </button>
              
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg mt-8">
        <h3 className="text-3xl font-semibold mb-4">Reseñas</h3>
        {reviews && reviews.length > 0 ? (
          <ul className="text-left mb-4">
            {reviews.map((review, index) => (
              <li key={index} className="mb-2">
                {review}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">Aún no se han creado reseñas.</p>
        )}
      </div>
    </div>
  );
};

export default WebPageViewer;
