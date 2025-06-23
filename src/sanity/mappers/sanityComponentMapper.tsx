import HeroBanner from "@/components/molecules/Banner/Banner";
import ProductBanner from "@/components/molecules/ProductCardBanner/ProductCardBanner";
import StatementBanner from "@/components/molecules/StatementBanner/StatementBanner";

interface BaseSanityBlock {
	_type: string;
	variant?: string;
	[key: string]: unknown;
}

export function sanityComponentMapper(block: BaseSanityBlock) {
	if (!block._type) return null;

	switch (block._type) {
		case "banner":
			switch (block.variant) {
				case "hero":
					return <HeroBanner {...block} />;
				case "promo":
					return <ProductBanner {...block} />;
				case "statement":
					return <StatementBanner {...block} />;
				default:
					return null;
			}

		default:
			return null;
	}
}
