import { indexOfMax } from "../lib/array";

const SEPERATOR = "|";
const split = (cardId: string) => cardId.split(SEPERATOR);
const getValue = (cardId: string) => parseInt(split(cardId)[0], 10);
const getSuit = (cardId: string) => split(cardId)[1];
const getTuple = (cardId: string): [number, string] => [
  getValue(cardId),
  getSuit(cardId)
];

const combineAll = <T1, T2>(
  suits: T1[],
  values: T2[],
  seperator?: string
): string[] =>
  suits
    .map((s) => values.map((v) => [v, s].join(seperator || SEPERATOR)))
    .flat(1);

const shuffle = <T>(arr: T[]) => {
  let m = arr.length;
  let t: T;
  let i: number;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
};

const getStandardDeck = () =>
  combineAll(
    ["c", "h", "s", "d"],
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  );

const getWizardDeck = () => combineAll(["w", "j"], [1, 2, 3, 4]);

const sortDeck = (hand: string[], order = ["c", "d", "h", "s"]) => {
  const bySuit: { [key: string]: number[] } = {};
  const sortedHand: string[] = [];
  hand.forEach((cardId) => {
    let [value, suit] = getTuple(cardId);
    bySuit[suit] = bySuit[suit] || [];
    bySuit[suit].push(value);
  });
  order.forEach((suit) => {
    if (!bySuit[suit]) return;
    sortedHand.push(...combineAll([suit], bySuit[suit].sort()));
  });
  return sortedHand;
};

export const getDealtCards = (numPlayers: number, numCards: number) => {
  const deck = shuffle([...getStandardDeck(), ...getWizardDeck()]);

  const hands = Array.from({ length: numPlayers })
    .map(() => {
      let hand = [];
      let i = 0;
      while (i < numCards) {
        hand.push(deck.pop() as string);
        i++;
      }
      return hand;
    })
    .map((hand) => sortDeck(hand, ["j", "c", "d", "h", "s", "w"]));

  const trumpCard = deck.pop() || false;

  const trumpSuit =
    typeof trumpCard === "string" ? getSuit(trumpCard) : undefined;

  return {
    hands,
    trumpCard: trumpCard,
    trumpSuit: trumpSuit
  } as const;
};

const winnerWithinSuit = (cards: string[], suit: string) => {
  let suits = cards.map(getSuit);
  let values = cards.map(getValue);
  let modValues = values.map((v, i) => (suits[i] === suit ? v : -1));
  return indexOfMax(modValues);
};

/**
 * Returns the first non-jester suit in the trick _or_ the jester suit if only jesters are present.
 * REMEMBER: Wizards count as a "suit.""
 */
const getLeadSuit = (trick: string[]) => {
  let suits = trick.map(getSuit);
  let firstNonJesterIndex = suits.findIndex((s) => s !== "j");
  return firstNonJesterIndex === -1 ? "j" : suits[firstNonJesterIndex];
};

export const getWinningIndex = (
  trick: string[],
  trumpSuit: string | undefined
) => {
  let suits = trick.map(getSuit);
  // First wizard wins
  let firstWizard = suits.indexOf("w");
  if (firstWizard !== -1) return firstWizard;

  // Highest trump wins
  if (trumpSuit && suits.indexOf(trumpSuit) !== -1) {
    return winnerWithinSuit(trick, trumpSuit);
  }

  let leadSuit = getLeadSuit(trick);

  // If all jesters, first jester wins
  if (leadSuit === "j") return 0;

  // Highest lead suit wins
  return winnerWithinSuit(trick, leadSuit);
};

export const getPlayableCards = (hand: string[], trick: string[]) => {
  if (trick.length === 0) return hand;

  let leadSuit = getLeadSuit(trick);

  if (leadSuit === "w" || leadSuit === "j") return hand;

  let suits = hand.map(getSuit);
  let leadSuitInHand = suits.indexOf(leadSuit) !== -1;

  if (!leadSuitInHand) return hand;

  let playableCardsWithLeadSuit = (_: unknown, i: number) =>
    suits[i] === "w" || suits[i] === "j" || suits[i] === leadSuit;

  return hand.filter(playableCardsWithLeadSuit);
};

export const isValidBid = (
  bid: number,
  {
    canadian = false,
    bids,
    numPlayers,
    turn
  }: {
    canadian?: boolean;
    bids: (number | false)[];
    numPlayers: number;
    turn: number;
  }
) => {
  const nummedBids = bids.map((x) => (x === false ? 0 : x));
  const totalBids = nummedBids.reduce((prev, curr) => prev + curr, 0) + bid;
  return !(canadian && numPlayers === bids.length + 1 && totalBids === turn);
};
