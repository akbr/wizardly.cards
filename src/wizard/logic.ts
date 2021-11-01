import { indexOfMax, shuffle } from "../lib/array";

const SEPERATOR = "|";
const split = (cardId: string) => cardId.split(SEPERATOR);
const getValue = (cardId: string) => parseInt(split(cardId)[0], 10);
const getSuit = (cardId: string) => split(cardId)[1];
const getTuple = (cardId: string): [number, string] => [
  getValue(cardId),
  getSuit(cardId),
];

const combineAll = <T1, T2>(
  suits: T1[],
  values: T2[],
  seperator?: string
): string[] =>
  suits
    .map((s) => values.map((v) => [v, s].join(seperator || SEPERATOR)))
    .flat(1);

// ---

const getStandardDeck = () =>
  combineAll(
    ["c", "h", "s", "d"],
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  );

const getWizardDeck = () => combineAll(["w", "j"], [1, 2, 3, 4]);

// ---

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
    sortedHand.push(
      ...combineAll(
        [suit],
        bySuit[suit].sort((a, b) => a - b)
      )
    );
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
    trumpSuit: trumpSuit,
  } as const;
};

const winnerWithinSuit = (cards: string[], suit: string) => {
  let suits = cards.map(getSuit);
  let values = cards.map(getValue);
  let modValues = values.map((v, i) => (suits[i] === suit ? v : -1));
  return indexOfMax(modValues);
};

const getLeadSuit = (trick: string[]) =>
  trick.map(getSuit).find((suit) => suit !== "j" && suit !== "w");

export const getWinningIndex = (
  trick: string[],
  trumpSuit: string | undefined
) => {
  const suits = trick.map(getSuit);

  // First wizard wins
  const firstWizardIndex = suits.indexOf("w");
  if (firstWizardIndex !== -1) return firstWizardIndex;

  // Highest trump wins
  const trumpSuitPlayed = trumpSuit && suits.includes(trumpSuit);
  if (trumpSuitPlayed) return winnerWithinSuit(trick, trumpSuit);

  // Highest of led suit wins
  const leadSuit = getLeadSuit(trick);
  if (leadSuit) return winnerWithinSuit(trick, leadSuit);

  // All jesters; lead card wins
  return 0;
};

export const getPlayableCards = (hand: string[], trick: string[]) => {
  if (trick.length === 0) return hand;

  let leadSuit = getLeadSuit(trick);
  if (!leadSuit) return hand;

  let suits = hand.map(getSuit);

  if (!suits.includes(leadSuit)) return hand;

  let playableSuits = [leadSuit, "w", "j"];
  return hand.filter((_, i) => playableSuits.includes(suits[i]));
};

export const isValidBid = (
  bid: number,
  {
    canadian = false,
    bids,
    numPlayers,
    turn,
  }: {
    canadian?: boolean;
    bids: (number | false)[];
    numPlayers: number;
    turn: number;
  }
) => {
  if (!canadian) return true;
  const nummedBids = bids.map((x) => (x === false ? 0 : x));
  const totalBids = nummedBids.reduce((prev, curr) => prev + curr, 0) + bid;
  const isLastBid = numPlayers === bids.length + 1;
  return !(isLastBid && totalBids === turn);
};
