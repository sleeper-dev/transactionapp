async function fetchCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    const countries = await response.json();

    return countries.map((country) => ({
      name: country.name.common,
      code: country.cca2,
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

export default fetchCountries;
