import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Search() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="form-control"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Search;
