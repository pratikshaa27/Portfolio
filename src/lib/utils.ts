/**
 * Card data for the StackedCards glass-cards component.
 * Each card represents a content section with a unique color scheme.
 */
export interface CardDataItem {
  id: number;
  title: string;
  description: string;
  color: string;
}

export const cardData: CardDataItem[] = [
  {
    id: 1,
    title: "Design Engineering",
    description:
      "Bridging the gap between design and development with pixel-perfect implementations and seamless interactions.",
    color: "rgba(139, 92, 246, 0.8)",
  },
  {
    id: 2,
    title: "Motion & Animation",
    description:
      "Creating fluid, purposeful animations that guide users and bring interfaces to life with subtle delight.",
    color: "rgba(59, 130, 246, 0.8)",
  },
  {
    id: 3,
    title: "Frontend Architecture",
    description:
      "Building scalable, maintainable component systems with modern frameworks and best practices.",
    color: "rgba(16, 185, 129, 0.8)",
  },
  {
    id: 4,
    title: "Creative Development",
    description:
      "Pushing the boundaries of web experiences with WebGL, shaders, and experimental interfaces.",
    color: "rgba(236, 72, 153, 0.8)",
  },
  {
    id: 5,
    title: "Performance Optimization",
    description:
      "Ensuring buttery-smooth 60fps experiences through careful profiling, lazy loading, and render optimization.",
    color: "rgba(245, 158, 11, 0.8)",
  },
];
