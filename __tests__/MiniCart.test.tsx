import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import MiniCart from "../src/components/organisms/MiniCart/MiniCart";

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));
 const cartItems = [
  {
    id: "1",
    name: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
    description: "OZ",
    quantity: 2,
    price: 50,
    currency: "$",
    productImage: "/images/product.svg",
  },

  {
    id: "2",
    name: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
    description: "OZ",
    quantity: 1,
    price: 50,
    currency: "$",
    productImage: "/images/product.svg",
  },
];
describe("MiniCart Component", () => {
  it("renders correctly with default props", () => {
    render(<MiniCart cartItems={[]} triggerType="button"/>);
  });
  it("calls router.push  when clicking VIEW BAG", async () => {
    const { getByRole, getByText, queryByText } = render(
      <MiniCart cartItems={cartItems} triggerType="icon" bagIcon={"/images/cartBag.svg"} />
    );

    const trigger = getByRole("img", { name: /open cart/i });
    fireEvent.click(trigger);

    const viewBagButton = getByText(/view bag/i);
    fireEvent.click(viewBagButton);

    expect(pushMock).toHaveBeenCalledWith("/cart");

    await waitFor(() => {
      expect(queryByText(/view bag/i)).toBeVisible();
    });
  });
});