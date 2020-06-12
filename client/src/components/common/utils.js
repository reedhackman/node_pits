export const fetchGraphQL = async (query) => {
  const res = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  });
  const json = await res.json();
  return json.data;
};
