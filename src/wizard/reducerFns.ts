import type {
  // Meta
  Msgs,
  // States
  Seed,
  SelectTrump,
  Bid,
  Play,
  End,
  // Actions
  SelectTrumpAction,
  BidAction,
  PlayAction,
} from "./types";

import { rotateIndex } from "../lib/array";
import {
  getDealtCards,
  getWinningIndex,
  getPlayableCards,
  isValidBid,
} from "./logic";

export const err = (data: string): Msgs => ({
  type: "err",
  data,
});

export const toNextTurn = (s: Seed | Play): SelectTrump | Bid => {
  const turn = "turn" in s ? s.turn + 1 : 1;
  const dealer = "dealer" in s ? rotateIndex(s.numPlayers, s.dealer) : 0;

  const { hands, trumpCard, trumpSuit } = getDealtCards(s.numPlayers, turn);

  const trumpCardIsWizard = trumpSuit === "w";

  return {
    type: trumpCardIsWizard ? "selectTrump" : "bid",
    turn,
    dealer,
    hands,
    trumpCard,
    trumpSuit,
    trick: {
      cards: [],
      leader: rotateIndex(s.numPlayers, dealer),
    },
    bids: Array.from({ length: s.numPlayers }, () => false) as (
      | number
      | false
    )[],
    actuals: Array.from({ length: s.numPlayers }, () => 0),
    activePlayer: trumpCardIsWizard
      ? dealer
      : rotateIndex(s.numPlayers, dealer),
    scores:
      "scores" in s ? ([...s.scores, s.bids, s.actuals] as number[][]) : [],
    // Carry over
    options: s.options,
    numPlayers: s.numPlayers,
    prevTrick: "prevTrick" in s ? s.prevTrick : undefined,
  };
};

export const onSelectTrump = (
  s: SelectTrump,
  suit: SelectTrumpAction["data"]
): Bid | Msgs => {
  const isValidSuit = ["c", "d", "h", "s"].indexOf(suit) !== -1;

  return isValidSuit
    ? {
        ...s,
        type: "bid",
        trumpSuit: suit,
        activePlayer: rotateIndex(s.numPlayers, s.dealer),
      }
    : err("Invalid suit.");
};

export const onBid = (
  s: Bid,
  bidInput: BidAction["data"]
): Bid | Play | Msgs => {
  if (!Number.isInteger(bidInput)) {
    return err("Bid must be an integer.");
  }

  if (
    !isValidBid(bidInput, {
      canadian: s.options.canadian,
      numPlayers: s.numPlayers,
      bids: s.bids,
      turn: s.turn,
    })
  ) {
    return err("Invalid bid.");
  }

  let bids = s.bids.map((bid, i) => (i === s.activePlayer ? bidInput : bid));
  let bidsRemain = bids.includes(false);

  return {
    ...s,
    type: bidsRemain ? "bid" : "play",
    bids,
    activePlayer: bidsRemain
      ? rotateIndex(s.numPlayers, s.activePlayer)
      : rotateIndex(s.numPlayers, s.dealer),
  };
};

export const onPlay = (
  s: Bid | Play,
  cardId: PlayAction["data"]
): Play | SelectTrump | Bid | End | Msgs => {
  const cardIsInHand = s.hands[s.activePlayer].indexOf(cardId) !== -1;
  if (!cardIsInHand) return err("You don't have that card.");

  const cardIsPlayable =
    getPlayableCards(s.hands[s.activePlayer], s.trick.cards).indexOf(cardId) !==
    -1;
  if (!cardIsPlayable) return err("This card is not playable.");

  const nextTrickCards = [...s.trick.cards, cardId];

  const nextTrick = {
    ...s.trick,
    cards: nextTrickCards,
  };

  const nextHands = s.hands.map((hand, i) => {
    if (i !== s.activePlayer) return hand;
    return hand.filter((card) => card !== cardId);
  });

  const MoreTrickToGo = nextTrickCards.length !== s.numPlayers;
  if (MoreTrickToGo) {
    return {
      ...s,
      activePlayer: rotateIndex(s.numPlayers, s.activePlayer),
      hands: nextHands,
      trick: nextTrick,
    };
  }

  const winningTrickIndex = getWinningIndex(nextTrickCards, s.trumpSuit);
  const winner = rotateIndex(s.numPlayers, winningTrickIndex, s.trick.leader);

  const actuals = s.actuals.map((actual, i) =>
    i === winner ? actual + 1 : actual
  );
  const scores = [...s.scores, s.bids, actuals] as number[][];

  const turnIsOver = nextHands[0].length === 0;
  const gameIsOver = turnIsOver && s.turn * s.numPlayers === 60;

  if (gameIsOver) {
    return { type: "end", scores };
  }

  const prevTrick = {
    ...nextTrick,
    winner,
  };

  return turnIsOver
    ? toNextTurn({
        ...s,
        prevTrick,
        actuals,
      })
    : {
        ...s,
        activePlayer: winner,
        actuals,
        hands: nextHands,
        trick: {
          cards: [],
          leader: winner,
        },
        prevTrick,
      };
};
