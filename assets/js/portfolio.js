// Section links remain usable without JavaScript; observation only adds location cues.
document.addEventListener("DOMContentLoaded", () => {
  const links = [...document.querySelectorAll('.portfolio-navigation a[href^="#"]')];
  if (!links.length || !("IntersectionObserver" in window)) return;
  const sections = links.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean);
  const visible = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      const active = sections.find((section) => visible.has(section));
      if (!active) return;
      links.forEach((link) => {
        if (link.hash === `#${active.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-10% 0px -40% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));
});
