import React, { useState } from "react";

const WebPageEditor = ({ onSave, onCancel, initialData }) => {
  const [editedData, setEditedData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div>
      <label>
        Título:
        <input
          type="text"
          name="title"
          value={editedData.title}
          onChange={handleInputChange}
        />
      </label>
      {/* Otros campos de edición aquí */}

      <button onClick={handleSave}>Guardar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default WebPageEditor;
