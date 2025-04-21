'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';

const HeaderWrapper = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const categories = [
  'MAKEUP',
  'SKINCARE',
  'FRAGRANCE',
  'SUSTAINABILITY',
  'SUBSCRIPTION',
  'GLAM GUIDE',
  'MORE',
];

const headerIcons = [
  { label: 'Search', icon: '/images/search.svg' },
  { label: 'Whishlist', icon: '/images/whishlist.svg' },
  { label: 'CartBag', icon: '/images/cartBag.svg' },
  { label: 'Profile', icon: '/images/profile.svg' },
];

const headerWhiteIcons = [
  { label: 'Search', icon: '/images/search-white.svg' },
  { label: 'Whishlist', icon: '/images/whishlist-white.svg' },
  { label: 'CartBag', icon: '/images/cartBag_white.svg' },
  { label: 'Profile', icon: '/images/profile-white.svg' },
];

  return <Header isHome={isHome} logoImages={{
    default:  '/images/Elenor.svg',
    white: '/images/Elenor-white.svg'
  }} categories={categories} headerIcons={headerIcons} headerWhiteIcons={headerWhiteIcons} />;
};

export default HeaderWrapper;
