import { useEffect, useState } from "react";
import fetchCountries from "../lib/fetchCountries";
import { updateAddress } from "../lib/updateAddress";
import toast from "react-hot-toast";

function AddressForm({ data }) {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState({
    street: data.street || "",
    city: data.city || "",
    country: data.country || "",
    postalCode: data.postalCode || "",
  });

  useEffect(() => {
    setAddress(data);
  }, [data]);

  useEffect(() => {
    const getCountries = async () => {
      const countryData = await fetchCountries();
      setCountries(countryData);
    };

    getCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updateData = {
      street: formData.get("street"),
      city: formData.get("city"),
      country: formData.get("country"),
      postalCode: formData.get("postalCode"),
    };

    setIsLoading(true);
    try {
      const updatedAddress = await updateAddress(updateData);
      toast.success("Address updated successfully");
      console.log("Address updated successfully:", updatedAddress);
      setAddress(updatedAddress);
    } catch (error) {
      toast.error("Failed to update address");
    } finally {
      setIsLoading(false);
    }

    console.log(updateData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-[2fr,2fr] grid-rows-[auto,auto] gap-x-7 gap-y-7">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="street"
            className="text-sm font-medium leading-6 text-gray-900"
          >
            Address
          </label>
          <input
            id="street"
            name="street"
            type="text"
            value={address.street}
            onChange={handleChange}
            required
            className="w-[full] rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="city"
            className="text-sm font-medium leading-6 text-gray-900"
          >
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={handleChange}
            value={address.city}
            required
            className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="country"
            className="text-sm font-medium leading-6 text-gray-900"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            required
            className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="postalCode"
            className="text-sm font-medium leading-6 text-gray-900"
          >
            Postal code
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            value={address.postalCode}
            onChange={handleChange}
            required
            className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-5 flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Update address
      </button>
    </form>
  );
}

export default AddressForm;
