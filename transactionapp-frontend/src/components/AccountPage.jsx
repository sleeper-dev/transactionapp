import { useEffect, useState } from "react";
import { BASE_API_URL } from "../utils/constants";
import Spinner from "./Spinner";
import { format } from "date-fns";
import AddressForm from "./AddressForm";

function AccountPage() {
  const [userData, setUserData] = useState(null);

  const fetchTransaction = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(`${BASE_API_URL}/account`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  if (!userData) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="mb-5 rounded-lg bg-white p-5 shadow-md">
        <h1 className="mb-5 text-lg font-semibold">Personal information</h1>
        <div className="grid grid-cols-[2fr,2fr] grid-rows-[auto,auto] gap-y-7">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Firstname</span>
            <span className="font-medium">{userData.firstname}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Lastname</span>
            <span className="font-medium">{userData.lastname}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Email</span>
            <span className="font-medium">{userData.email}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Joined date</span>
            <span className="font-medium">
              {format(new Date(userData.dateCreated), "dd.MM.yyyy")}
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white p-5 shadow-md">
        <h1 className="mb-5 text-lg font-semibold">Address information</h1>
        <AddressForm data={userData.address} />
      </div>
    </div>
  );
}

export default AccountPage;
