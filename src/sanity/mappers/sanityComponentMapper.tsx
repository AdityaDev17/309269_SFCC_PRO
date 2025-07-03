// const componentMapper = {
// 	hero: HeroComponent,
// 	productHero: ProductHeroComponent,
// 	twoColumnText: TwoColumnTextComponent,
// 	// more mappings
//   }
//   {page.content.map((block, idx) => {
// 	const Component = componentMapper[block._type]
// 	return Component ? <Component key={idx} {...block} /> : null
//   })}

// sanityComponentMapper.tsx

import HeroSection from "../../../studio-C4force/schemaTypes/modules/hero";
import TwoColumnText from "../../../studio-C4force/schemaTypes/modules/twoColumn";

export const sanityComponentMapper = {
	heroSection: HeroSection,
	twoColumnTextSection: TwoColumnText,
};

// PageRenderer.tsx

// import { sanityComponentMapper } from './sanityComponentMapper'

// export default function PageRenderer({ sections }: { sections: any[] }) {
//   return (
//     <div>
//       {sections.map((section, index) => {
//         const Component = sanityComponentMapper[section._type]
//         if (!Component) return null
//         return <Component key={index} {...section} />
//       })}
//     </div>
//   )
// }
