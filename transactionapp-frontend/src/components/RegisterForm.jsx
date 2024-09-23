function RegisterForm() {
  return (
    <main className="flex h-screen items-center justify-center bg-slate-50">
      <div className="w-[34rem]">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
        <form className="mt-10 flex flex-col space-y-6 rounded-xl bg-white p-10 shadow-md">
          <div className="flex gap-5">
            <div className="flex w-full flex-col gap-3">
              <label
                htmlFor="firstname"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                required
                className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex w-full flex-col gap-3">
              <label
                htmlFor="lastname"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                required
                className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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

          <div className="flex flex-col gap-3">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Create an account
          </button>
        </form>
      </div>
    </main>
  );
}

export default RegisterForm;
