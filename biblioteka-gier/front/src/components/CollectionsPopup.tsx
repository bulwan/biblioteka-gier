import React, { useState } from "react";
import "./collectionsPopup.css";

const CollectionPopup = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="collectionpopup">
      <div className="collectionpopup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>To jest treść okienka.</p>
      </div>
    </div>
  );
};

export default CollectionPopup;
