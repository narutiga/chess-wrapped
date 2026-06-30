import type { WrappedData } from "@/types/wrapped";

/** Every scene receives the prepared model (DEVELOPMENT.md). The poster also
 *  gets a way back to the start; other scenes ignore it. */
export interface SceneProps {
  data: WrappedData;
  /** Return to the username entry screen (used by the final poster scene). */
  onRestart?: () => void;
}

export interface SceneDef {
  id: string;
  /** Hold time in ms before auto-advancing (SCENES.md timing). */
  duration: number;
  component: React.ComponentType<SceneProps>;
}
