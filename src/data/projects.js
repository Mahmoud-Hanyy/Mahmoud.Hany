// `image` = static thumbnail shown by default.
//   - Balady Cafe uses the site's own official OG preview image (found live
//     on the site at /assets/images/og-image.jpg) rather than a local file,
//     since no screenshot has been captured yet — this avoids a broken
//     image icon while still being a real, accurate preview.
//   - Nova's live site has no OG image of its own, so this points at a
//     local screenshot checked into /public/images/projects/nova.jpg
//     instead.
// `url`   = live deployed site, loaded into the iframe on hover.
// `repo`  = GitHub source. Note: GitHub itself blocks iframing (it sends
// X-Frame-Options: deny), which is exactly why `url` points at the live
// Vercel deployment instead of the repo page — the repo link is only used
// for the "View Code" link on the card.
const projects = [
  {
    id: "balady-cafe",
    title: "Balady Cafe",
    tagline:
      "Official website for Balady Cafe in Sharm El Sheikh — a modern digital experience inspired by authentic Egyptian heritage.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    image: "https://balady-cafe.vercel.app/assets/images/og-image.jpg",
    url: "https://balady-cafe.vercel.app/",
    repo: "https://github.com/Mahmoud-Hanyy/Balady-Cafe",
  },
  {
    id: "nova",
    title: "Nova",
    tagline:
      "A cinematic 3D product reveal experience, animated on scroll.",
    stack: ["React", "React Three Fiber", "GSAP"],
    image: "/images/projects/nova.jpg",
    url: "https://nova-woad-gamma.vercel.app/",
    repo: "https://github.com/Mahmoud-Hanyy/Nova",
  },

  // Add the rest here as you're ready — same shape as above.
];

export default projects;
