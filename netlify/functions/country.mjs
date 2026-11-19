export default async (request) => {
  try {
    const apiKey = process.env.REST_COUNTRIES_API_KEY;
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return new Response("Country code is required", {
        status: 400,
      });
    }

    const response = await fetch(
      `https://api.restcountries.com/countries/v5/codes.alpha_3/${encodeURIComponent(code)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (!response.ok) {
      return new Response("Country not found", {
        status: response.status,
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Server error", {
      status: 500,
    });
  }
};
