import React from "react";

function Loader() {
  return (
    <div className="text-center spinner">
      <div className="spinner-border spinner-border-xl" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
