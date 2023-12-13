import React from "react";

const WebPageViewer = ({ webPageData }) => {
  return (
    <div>
      <h1>{webPageData.title}</h1>
      {/* Otros campos de visualización aquí */}
    </div>
  );
};

export default WebPageViewer;
