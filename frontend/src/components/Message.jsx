import React from "react";

function Message({ message }) {
  return (
    <div>
      <p className="alert alert-info text-center">{message}</p>
    </div>
  );
}

export default Message;
