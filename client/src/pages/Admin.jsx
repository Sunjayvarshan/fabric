import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  async function shoot() {
    const req = await fetch("http://localhost:8000/api/admin", {
      headers: {
        "x-acess-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    console.log(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        shoot();
      }
    }
  }, [navigate]);

  return (
    <div>
      <p>HEloo</p>
    </div>
  );
}

export default Admin;
