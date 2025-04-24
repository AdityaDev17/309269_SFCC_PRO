import React from "react";
import { render } from "@testing-library/react";
import MiniCart from "../src/components/organisms/MiniCart/MiniCart";

const cartItems = [
  {
    id: '1',
    name: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
    description: 'OZ',
    quantity: 2,
    price: 50,
    currency:'$'
  },

  {
    id: '2',
    name: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
    description: 'OZ',
    quantity: 1,
    price: 50,
     currency:'$'
  },
];
describe("MiniCart Component", () => {
  it("renders correctly with default props", () => {
    render(<MiniCart cartItems={[]}/>);
  });
  it("renders correctly with default props", () => {
    render(<MiniCart cartItems={cartItems}/>);
  });
});