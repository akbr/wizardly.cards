import { mkAlea } from "./alea";

const stock = { random: () => Math.random() };

export function randomBetween(n1: number, n2: number, seed?: number | string) {
  const { random } = seed ? mkAlea(String(seed)) : stock;
  let max = n1 > n2 ? n1 : n2;
  let min = n1 === max ? n2 : n1;
  return random() * (max - min) + min;
}

export function randomIntBetween(
  n1: number,
  n2: number,
  seed?: number | string
) {
  const { random } = seed ? mkAlea(String(seed)) : stock;
  let max = n1 > n2 ? n1 : n2;
  let min = n1 === max ? n2 : n1;
  return Math.floor(random() * (max - min + 1) + min);
}
