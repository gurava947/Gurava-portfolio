// Splits a headline into word spans so the Look studio's hero animation can stagger them.
// `offset` keeps the delay sequence continuous when a title and its accent line are
// rendered as two separate HeroWords.

export default function HeroWords({ text, offset = 0 }) {
  return text.split(" ").map((word, index) => (
    <span className="hero-word" style={{ "--word-index": offset + index }} key={`${word}-${offset + index}`}>
      {`${word} `}
    </span>
  ));
}
