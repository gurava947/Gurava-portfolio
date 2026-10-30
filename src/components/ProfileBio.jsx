import { memo, useEffect, useState } from "react";
import { fillBioTokens } from "../utils/profileBio";

const BIO_LINE_ROTATE_MS = 5200;

/* The debugging line rotates because the profile was asked to open with something alive rather than a
   static list. It is not a carousel of information: every line stays in the same <ul>, so a reader who
   never waits for the next swap still gets the whole set from the accessibility tree, and a pointer
   held over the block stops the clock for whoever wants to finish reading one.

   The swap is opacity-only and the lines share a single grid cell, which reserves the height of the
   longest rule before the first frame — rotation that cannot move the layout below it. */
export default memo(function ProfileBio({ bio, figures, reducedMotion = false, paused = false }) {
  const lines = bio?.debugging?.lines || [];
  const skills = bio?.skills?.items || [];
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const rotating = !reducedMotion && lines.length > 1;

  useEffect(() => {
    if (!rotating || held || paused) return undefined;
    const timer = window.setInterval(() => {
      setActive((line) => (line + 1) % lines.length);
    }, BIO_LINE_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [rotating, held, paused, lines.length]);

  if (!bio) return null;

  return (
    <div
      className="profile-bio"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      <p className="profile-bio-eyebrow">{bio.eyebrow}</p>
      <p className="profile-bio-lead">{fillBioTokens(bio.lead, figures)}</p>
      {lines.length > 0 && (
        <div className="profile-bio-block">
          <h3 className="profile-bio-label">{bio.debugging.label}</h3>
          <ul className={`profile-bio-lines${reducedMotion ? " is-static" : ""}`}>
            {lines.map((line, index) => (
              <li key={line} className={rotating && index === active ? "is-active" : undefined}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
      {skills.length > 0 && (
        <div className="profile-bio-block">
          <h3 className="profile-bio-label">{bio.skills.label}</h3>
          {bio.skills.note && <p className="profile-bio-note">{bio.skills.note}</p>}
          <dl className="profile-bio-skills">
            {skills.map(({ name, detail }) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{fillBioTokens(detail, figures)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
});
