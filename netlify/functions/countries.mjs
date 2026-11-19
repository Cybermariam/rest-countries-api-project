export default async (request) => {
  try {
    const apiKey = process.env.REST_COUNTRIES_API_KEY;

    let allCountries = [];
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.restcountries.com/countries/v5?limit=100&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      if (!response.ok) {
        return new Response("Failed to fetch countries", {
          status: response.status,
        });
      }

      const result = await response.json();

      allCountries.push(...result.data.objects);

      hasMore = result.data.meta.more;
      offset += result.data.meta.count;
    }

    return new Response(
      JSON.stringify({
        data: {
          objects: allCountries,
          meta: {
            total: allCountries.length,
            count: allCountries.length,
            more: false,
          },
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response("Server error", {
      status: 500,
    });
  }
};
