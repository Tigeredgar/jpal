const query = `
  query getProducts {
    products(first: 10) {
      edges {
        node {
          title
          handle
          productType
          availableForSale
          options { name values }
          variants(first: 5) {
            edges { node { id title price { amount } } }
          }
        }
      }
    }
  }
`;

async function run() {
  const result = await fetch(`https://jpal-2.myshopify.com/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "c8d1c8cc864d46b793fcbdc2c3d3b6d5"
      },
      body: JSON.stringify({ query }),
  });
  console.log(JSON.stringify(await result.json(), null, 2));
}

run();
