import { Link } from "react-router-dom";
import useLogin from "../lib/useLogin";

function LoginForm() {
  const { login, isLoading } = useLogin();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email");
    const password = formData.get("password");

    login(email, password);
  }

  return (
    <main className="flex h-screen items-center justify-center bg-slate-50 px-3 lg:px-0">
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
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-gray-400">
              Not a member?
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
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
