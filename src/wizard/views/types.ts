import { WizardShape } from "../wizard/types";
import { Actions } from "../wizard/actions";
import { Frame } from "../lib/appHarness/types";

export type WizardProps = {
  frame: Frame<WizardShape>;
  prevFrame: Frame<WizardShape> | undefined;
  actions: Actions;
};

export type Player = { avatar: string; active: boolean };
