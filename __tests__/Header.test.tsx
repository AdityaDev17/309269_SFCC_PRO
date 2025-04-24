import React from "react";
import { render } from "@testing-library/react";
import Header from "../src/components/organisms/Header/Header";

jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(), 
    }),
  }));
  const exampleCategories = [
    {
      name: 'MAKEUP',
      image: [
        {
            productImageUrl: '/images/menuImage1.svg',
            productName: 'Lipstick'
        },
      ],
      subcategory: [
        {
          subCategoryName: 'LIPS',
          subcategory: ['Lipstick', 'Liquid Lipstick', 'Lip Liner', 'Lip Balm']
        },
        {
            subCategoryName: 'EYE',
            subcategory: ['Eyeliner', 'Eyebrow', 'Eye Shadow', 'Mascara']
        },
        {
            subCategoryName: 'COMPLEXION',
            subcategory: ['Blush', 'Foundation', 'Highlighter']
        }
      ]
    },
    {
      name: 'SKINCARE',
      image: [
        {
            productImageUrl: '/images/menuImage1.svg',
            productName: 'Lipstick'
        },
      ],
      subcategory: [
        {
          subCategoryName: 'CLEANSER',
          subcategory: ['Face Wash', 'Peels & Scrubs', 'Toner']
        },
        {
          subCategoryName: 'MOISTURIZERS',
          subcategory: ['Face Moisturizer', 'Face Oil', 'Lotion', 'Night Cream']
        },
        {
          subCategoryName: 'SERUMS',
          subcategory: ['Face Serum']
        },
        {
          subCategoryName: 'UV PROTECTION',
          subcategory: ['Sunscreen']
        }
      ]    
    },
    {
      name: 'FRAGRANCE',
      image: [
        {
            productImageUrl: '/images/menuImage1.svg',
            productName: 'Lipstick'
        },{
          productImageUrl: '/images/menuImage1.svg',
          productName: 'Lipstick'
      },
      ],
      subcategory: [
        {
          subCategoryName: 'COLLECTIONS',
          subcategory: ['For Men', 'For Women']
        }
      ],
      },
      {
        name: 'SUSTAINABILITY',
      },
      {
        name: 'SUBSCRIPTION',
      },
      {
        name: 'GLAM GUIDE',
      },
      {
        name: 'MORE',
      image: [
        {
            productImageUrl: '/images/menuImage1.svg',
            productName: 'Lipstick'
        },
        {
          productImageUrl: '/images/menuImage1.svg',
          productName: 'Lipstick'
        },
        {
          productImageUrl: '/images/menuImage1.svg',
          productName: 'Lipstick'
        },
      ],
      subcategory: [
        {
          subCategoryName: 'HANDBAGS',
          subcategory: ['Top Handles', 'Totes', 'Mini Bags']
        },
        {
          subCategoryName: 'JEWELLERY',
          subcategory: ['Necklaces', 'Rings', 'Earrings', 'Bracelets']
        },
        {
          subCategoryName: 'GIFT',
          subcategory: ['Festive Hampers', 'Pink Teddy', 'Earrings']
        }
      ]
    }
  ];
  
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
describe("Header Component", () => {
  it("renders correctly with default props", () => {
    render(<Header logoImages={logoImages} categories={exampleCategories} headerIcons={exampleIcons} headerWhiteIcons={exampleWhiteIcons}/>);
  });
  it("renders correctly with default props", () => {
    render(<Header isHome={true} logoImages={logoImages} categories={exampleCategories} headerIcons={exampleIcons} headerWhiteIcons={exampleWhiteIcons}/>);
  });
});
