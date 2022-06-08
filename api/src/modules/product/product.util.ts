export function getMinMaxPrice(product) {
  return product.variants.reduce(
    (acc, cur) => {
      acc[0] = cur.sale_price
        ? Math.min(cur.sale_price, acc[0])
        : cur.price
        ? Math.min(cur.price, acc[0])
        : acc[0];
      acc[1] = cur.price ? Math.max(acc[1], cur.price) : acc[1];

      acc[0] = Math.ceil(acc[0]);
      acc[1] = Math.ceil(acc[1]);
      return acc;
    },
    [
      product.sale_price
        ? product.sale_price
        : product.price
        ? product.price
        : Infinity,
      product.price ? product.price : 0,
    ],
  );
}

export function getDiscount(product) {
  return product.variants.reduce(
    (acc, cur: any) => {
      acc = cur.sale_price
        ? Math.round((cur.price - cur.sale_price) * 100) / cur.price
        : acc;
      return acc;
    },
    product.sale_price
      ? Math.ceil(((product.price - product.sale_price) * 100) / product.price)
      : 0,
  );
}

export function generateSlug(title: string) {
  return title;
}
