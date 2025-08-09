import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

export default function ProductList() {
  const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
  {
    id: 2,
    name: "Phone",
    price: 800,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 3,
    name: "Headphones",
    price: 150,
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
  },
];


  const searchTerm = useSelector((state) => state.search.term.toLowerCase());

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {filteredProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
