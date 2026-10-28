import "./CollectionCredits.css";

// The credit band is the one place the home page speaks about the program rather than the work, so
// NXTWAVE carries the widest card and the largest type, the mentor card sits next to it, and the
// maker credit closes the row.
export default function CollectionCredits({ copy }) {
  if (!copy) return null;
  const program = copy.highlight || {};
  const mentor = copy.thanks || {};
  const maker = copy.madeWith || {};

  return (
    <div className="home-credits-grid">
      <article className="home-credit-card is-program">
        <span className="home-credit-label">{copy.highlightLabel || "Program"}</span>
        <p className="home-credit-wordmark">{program.name}</p>
        <p className="home-credit-sub">
          {[program.label, program.program].filter(Boolean).join(" · ")}
        </p>
        {program.note && <p className="home-credit-note">{program.note}</p>}
        <span className="home-credit-rule" aria-hidden="true" />
      </article>

      <article className="home-credit-card is-mentor">
        <span className="home-credit-label">{copy.thanksLabel || "Special thanks"}</span>
        <h3>{mentor.name}</h3>
        <p className="home-credit-sub">
          {[mentor.honorific, mentor.role].filter(Boolean).join(" · ")}
        </p>
        {mentor.quote && (
          <blockquote>
            <span className="home-credit-telugu">{mentor.quote}</span>
            {mentor.quoteTranslation && <cite>{mentor.quoteTranslation}</cite>}
          </blockquote>
        )}
      </article>

      <article className="home-credit-card is-maker">
        <span className="home-credit-label">{copy.madeWithLabel || "Made with"}</span>
        <p className="home-credit-maker home-credit-telugu">{maker.name}</p>
        {maker.transliteration && <p className="home-credit-sub">{maker.transliteration}</p>}
        {maker.note && <p className="home-credit-note">{maker.note}</p>}
      </article>
    </div>
  );
}
