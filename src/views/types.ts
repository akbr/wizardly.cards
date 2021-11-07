import { WizardShape } from "../wizard/types";
import { Actions } from "../wizard/actions";
import { Frame } from "../lib/appHarness/types";
import { GameFrame } from "../lib/appHarness/types";

export type WizardFrame = Frame<WizardShape> & { actions: Actions };
export type WizardGameFrame = GameFrame<WizardShape> & { actions: Actions };

export type Player = { avatar: string; active: boolean };
