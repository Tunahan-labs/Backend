interface product {
  id: number;
  name: string;
}

const products: product[] = [
  {
    id: 1,
    name: "ipad",
  },
  {
    id: 2,
    name: "macbook",
  },
];

export const getAllProducts = async (): Promise<product[]> => {
  return new Promise((resolve) => {
    resolve(products);
  });
};

export const createdProduct = async (name: string): Promise<product> => {
  return new Promise((resolve, reject) => {
    const existingProduct = products.find((product) => product.name === name);

    if (existingProduct) {
      reject(new Error("product already exists in this system"));
      return;
    }

    const newProduct: product = {
      id: products.length + 1,
      name,
    };

    products.push(newProduct);
    resolve(newProduct);
  });
};
