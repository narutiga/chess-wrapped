import type { WrappedData } from "@/types/wrapped";

/** Every scene receives the prepared model and nothing else (DEVELOPMENT.md). */
export interface SceneProps {
  data: WrappedData;
}

export interface SceneDef {
  id: string;
  /** Hold time in ms before auto-advancing (SCENES.md timing). */
  duration: number;
  component: React.ComponentType<SceneProps>;
}
