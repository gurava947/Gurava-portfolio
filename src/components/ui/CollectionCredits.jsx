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
        {program.community && <p className="home-credit-community">{program.community}</p>}
        {program.note && <p className="home-credit-note">{program.note}</p>}
        <span className="home-credit-rule" aria-hidden="true" />
      </article>

      {/* The thanks band is written in the builder's voice, never in his. The message is set as an
       * epigraph with its own label and signature so nothing here reads as a quote he gave. */}
      <article className="home-credit-card is-mentor">
        <span className="home-credit-label">{copy.thanksLabel || "Special thanks"}</span>
        <h3>{mentor.name}</h3>
        <p className="home-credit-sub">
          {[mentor.honorific, mentor.role].filter(Boolean).join(" · ")}
        </p>
        {(mentor.message || mentor.quote) && (
          <p className="home-credit-message">
            <span className="home-credit-message-label">{mentor.messageLabel || "A note of thanks"}</span>
            <span className="home-credit-epigraph home-credit-telugu" aria-hidden="true">
              {mentor.message || mentor.quote}
            </span>
            {(mentor.messageTranslation || mentor.quoteTranslation) && (
              <span className="home-credit-translated">{mentor.messageTranslation || mentor.quoteTranslation}</span>
            )}
            <span className="home-credit-signature">
              — {mentor.messageBy || copy.madeWith?.transliteration || "the builder"}
            </span>
          </p>
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
