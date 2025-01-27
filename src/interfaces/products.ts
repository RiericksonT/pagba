export default interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: {
    id: string;
    name: string;
    description: string;
  };
}
