//Normal Array
// export function getCardSizeByIndex(index: number): "large" | "medium" {

//   const basePattern = [
//     ...Array(8).fill("medium"),
//     "large",
//     ...Array(4).fill("medium"),
//     "large",
//     ...Array(12).fill("medium"),
//     "large",
//   ];
//   const pattern = Array.from({ length: 100 }, () => basePattern).flat();
//   return pattern[index % pattern.length];
// }

//Normal Code
// export const isLargeCard = (index: number): boolean => {
//   const patternCycle = 27;
//   const positionInCycle = index % patternCycle;

//   return (
//     positionInCycle === 6 || positionInCycle === 13 || positionInCycle === 24
//   );
// };

//using Config
import config from "./layoutPattern.config.json";

const patternCycle = config.patternCycle;
const largeCardPositions = config.largeCardPositions;

export const isLargeCard = (index: number): boolean => {
  const positionInCycle = index % patternCycle;
  return largeCardPositions.includes(positionInCycle);
};

//Using Sanity
// export const isLargeCard = (
//   index: number,
//   patternCycle: number,
//   largeCardPositions: number[]
// ): boolean => {
//   const positionInCycle = index % patternCycle;
//   return largeCardPositions.includes(positionInCycle);
// };
