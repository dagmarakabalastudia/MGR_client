import React from "react";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1> Hello</h1>
      <Link to="/login"> Zaloguj</Link>
    </div>
  );
}
