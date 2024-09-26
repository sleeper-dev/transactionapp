import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../utils/constants";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

function LoginForm() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.jwt;

        localStorage.setItem("jwtToken", token);
        setIsAuthenticated(true);

        navigate("/");
        toast.success("Login successful");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex h-screen items-center justify-center bg-slate-50">
      <div className="w-[30rem]">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign In to your account
        </h2>
        <form
          className="mt-10 flex flex-col space-y-6 rounded-xl bg-white p-10 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            Sign In
          </button>
          <div class="relative flex items-center py-5">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="mx-4 flex-shrink text-gray-400">Not a member?</span>
            <div class="flex-grow border-t border-gray-400"></div>
          </div>
          <Link
            to="/register"
            className="border- flex w-full justify-center rounded-md border-2 border-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-green-600 shadow-sm hover:bg-green-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Register now
          </Link>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
