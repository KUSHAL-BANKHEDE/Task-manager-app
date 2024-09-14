import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      console.log(res);
      const { user, token } = res.data;

      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);

      navigate("/dashboard");
    //   if (res.status === 200) {
    //   }
    } catch (err) {
      setError("Invalid credentials");
    }
  };


  function nave(url){
    window.location.href = url;
  }
  async function auth(){
    const response =await fetch('http://localhost:3000/request',{method:'post'});
  
    const data = await response.json();
    console.log(data);
    nave(data.url);
  
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          className="border p-2 w-full mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-blue-500 w-full py-2 text-white"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a className="text-blue-500" href="/signup">
            Signup
          </a>
        </p>
        <button className="bg-red-500 w-full py-2 text-white mt-4"
              onClick={()=> auth()}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
