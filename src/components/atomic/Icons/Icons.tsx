import React from "react";
const IconsCollection = {
    Wishlist :(<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M11.8021 13.4584C9.85763 15.4029 9.85763 18.5555 11.8021 20.5L20.3022 29L28.8021 20.5C30.7465 18.5555 30.7465 15.4029 28.8021 13.4584C26.8576 11.5139 23.705 11.5139 21.7604 13.4584L20.3022 14.9168L18.8437 13.4584C16.8992 11.5139 13.7466 11.5139 11.8021 13.4584Z" stroke="#3B3944" strokeWidth="1.24479" stroke-linecap="round" stroke-linejoin="round"/>
  </svg> ),
  Search : (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M18.6999 25.4583C22.3818 25.4583 25.3665 22.4736 25.3665 18.7917C25.3665 15.1098 22.3818 12.125 18.6999 12.125C15.018 12.125 12.0332 15.1098 12.0332 18.7917C12.0332 22.4736 15.018 25.4583 18.6999 25.4583Z" stroke="#3B3944" strokeWidth="1.30664" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28.2832 28.7891L23.2832 23.7891" stroke="#3B3944" strokeWidth="1.30664" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>),
  Cart : (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
    <path d="M12.668 9.5V5.5C12.668 3.29086 10.8771 1.5 8.66797 1.5C6.45883 1.5 4.66797 3.29086 4.66797 5.5V9.5M1.66797 7.5H15.668L16.668 19.5H0.667969L1.66797 7.5Z" stroke="#4F4B53" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>),
  User : (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20.5" cy="20.5" r="8.88" stroke="#3B3944" strokeWidth="1.24"/>
    <circle cx="20.5008" cy="18.1219" r="2.705" stroke="#3B3944" strokeWidth="1.24"/>
    <path d="M13.7637 26.8419C13.7637 26.8419 17.0244 24.3672 20.5662 24.3672C24.108 24.3672 27.3687 26.8419 27.3687 26.8419" stroke="#3B3944" strokeWidth="1.24"/>
  </svg>),
  
}
type IconProps = {
    name : keyof typeof IconsCollection
}
export const Icon= ({name}: IconProps)=> {
   
    return (
        <>{IconsCollection[name]}</>
    )

}