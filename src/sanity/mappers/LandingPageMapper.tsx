import HeroSection from "../../components/landingSections/HeroSection";
import TwoColumnSection from "../../components/landingSections/TwoColumnTextSection";

export default function LandingPageMapper({ sections }) {
  return (
    <div>
      {sections.map((section) => {
        switch (section._type) {
          case "hero":
            return (
              <HeroSection
                key={section._key}
                heading={section.heading}
                subheading={section.subheading}
                backgroundImage={section.backgroundImage}
              />
            );
          case "twoColumnText":
            return (
              <TwoColumnSection
                key={section._key}
                leftText={section.leftText}
                rightText={section.rightText}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
