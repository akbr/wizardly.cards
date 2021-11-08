import type { WizardShape } from "./types";
export const reducer = (state: WizardShape["states"]) => {
  //!!!
  if (state.type === "deal") {
    return state;
  }

  /**
   * Stop rollin'
   */
  return state;
};
