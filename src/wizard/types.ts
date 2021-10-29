import { Engine } from "../lib/server/types";
import { StoreShape } from "../lib/appInterfaces/types";
import { Actions as ViewActions } from "./actions";

export type Options = { canadian: boolean };
export type Msgs = { type: "err"; data: string };
export type States = SelectTrump | Bid | Play | End;
export type Actions = SelectTrumpAction | BidAction | PlayAction;

export type UIStates = Deal | TrickWin | TurnOver;

type Deal = { type: "deal"; turn: number; scores: number[][] };
type TrickWin = { type: "trickWin"; winner: number } & Core;
type TurnOver = { type: "turnOver" } & Core;

export type WizardShape = {
  states: States;
  uiStates: UIStates;
  actions: Actions;
  msgs: Msgs;
  options: Options;
  botOptions: void;
};

export type WizardEngine = Engine<WizardShape>;

/**
 * Core
 */
export type Core = {
  options: Options;
  activePlayer: number;
  numPlayers: number;
  turn: number;
  dealer: number;
  bids: (number | false)[];
  actuals: number[];
  scores: number[][];
  trumpCard: string | false;
  trumpSuit: string | undefined;
  hands: string[][];
  trick: {
    cards: string[];
    leader: number;
  };
  prevTrick?: {
    cards: string[];
    leader: number;
    winner: number;
  };
};

/**
 * States
 */

export type Seed = {
  numPlayers: number;
  options: Options;
};

export type SelectTrump = { type: "selectTrump" } & Core;
export type Bid = { type: "bid" } & Core;
export type Play = { type: "play" } & Core;
export type End = { type: "end"; scores: number[][] };

/**
 * Actions
 */
export type SelectTrumpAction = {
  type: "selectTrump";
  data: string;
};

export type BidAction = {
  type: "bid";
  data: number;
};

export type PlayAction = {
  type: "play";
  data: string;
};

export type ViewProps = StoreShape<WizardShape> & { actions: ViewActions };
