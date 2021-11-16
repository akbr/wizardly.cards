const U200D = String.fromCharCode(0x200d);
const UFE0Fg = /\uFE0F/g;

function toCodePoint(unicodeSurrogates: string) {
  var r = [],
    c = 0,
    p = 0,
    i = 0;
  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16));
      p = 0;
    } else if (0xd800 <= c && c <= 0xdbff) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join("-");
}
function getEmojiCode(rawText: string) {
  return toCodePoint(
    rawText.indexOf(U200D) < 0 ? rawText.replace(UFE0Fg, "") : rawText
  );
}
const getCDNUrl = (emoji: string) =>
  `https://twemoji.maxcdn.com/v/13.1.0/svg/${getEmojiCode(emoji)}.svg`;

export const Twemoji = ({
  char,
  size = 72,
}: {
  char: string;
  size?: number;
}) => {
  return (
    <img src={getCDNUrl(char)} height={size} width={size} alt={char}></img>
  );
};
