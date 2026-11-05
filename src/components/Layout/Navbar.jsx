import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <a href="#surface" className="navbar__mark" aria-label="Mahmoud Hany — back to the surface">
          MH
        </a>

        <ul className="navbar__links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`navbar__toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Rendered as a sibling of <nav>, not a child — <nav> has its own
          backdrop-filter (for the scroll-blur effect), and backdrop-filter
          on an ancestor creates a new containing block for any
          position:fixed descendant. Nested inside <nav>, this menu's
          inset:0 was resolving against the navbar's own ~60px box instead
          of the viewport. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="navbar-mobile-menu"
            className="navbar__mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul>
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                >
                  <a href={l.href} onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
