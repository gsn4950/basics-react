// test-scripts/testMembersAPI.js
const BASE_URL = "http://localhost:5000";
const TOKEN = "mysecrettoken";
const ENDPOINT = "/api/members";

const criteria = {
  benefitList: ["A", "B", "C"],
  limit: 10,
  page: 1,
};

async function testAPI() {
  const fetch = await import("node-fetch").then((mod) => mod.default);

  try {
    const url = new URL(`${BASE_URL}${ENDPOINT}`);
    Object.entries(criteria).forEach(([key, val]) =>
      url.searchParams.append(key, val)
    );

    const response = await fetch(url.href, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await response.json();

    console.log("✅ API response:\n", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ API test failed:", err.message);
  }
}

testAPI();
