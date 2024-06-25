export default interface Product {
  name: string;
  price: number;
  images: string;
  description: string;
  category: {
    id: string;
    name: string;
    description: string;
  };
}
