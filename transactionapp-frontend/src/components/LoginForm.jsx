import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <main className="flex h-screen items-center justify-center bg-slate-50">
      <div className="w-[30rem]">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign In to your account
        </h2>
        <form className="mt-10 flex flex-col space-y-6 rounded-xl bg-white p-10 shadow-md">
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
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
