import React from "react";
import { render } from "@testing-library/react";
import Header from "@/components/organisms/Header/Header";

jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(), 
    }),
  }));
  const exampleCategories = ['Home', 'Shop', 'About Us', 'Contact'];
 const exampleIcons = [
   { label: 'Cart', icon: 'images/cart.svg' },
    { label: 'Profile', icon: 'images/profile.svg' }
  ];
  const exampleWhiteIcons = [
      { label: 'Cart', icon: 'images/cart_white.svg' },
      { label: 'Profile', icon: 'images/profile_white.svg' }
    ];
    const logoImages = {
        default: 'images/logo.svg',
        white: 'images/logo_white.svg'
       };
describe("TypographyBlock Component", () => {
  it("renders correctly with default props", () => {
    render(<Header logoImages={logoImages} categories={exampleCategories} headerIcons={exampleIcons} headerWhiteIcons={exampleWhiteIcons}/>);
  });
  it("renders correctly with default props", () => {
    render(<Header isHome={true} logoImages={logoImages} categories={exampleCategories} headerIcons={exampleIcons} headerWhiteIcons={exampleWhiteIcons}/>);
  });
});
