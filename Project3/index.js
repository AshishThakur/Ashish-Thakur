 const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      const icon = menuBtn.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    });



document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert("Right-click is disabled on this site!");
});


document.addEventListener('keydown', function(e) {
    // F12 key
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+U
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
});


  // ============ ADD YOUR PROJECTS HERE ============
  // type: used for the filter tabs (WordPress, React, Node.js ...)
  // embed: false  -> opens the site in a new tab (for sites that block iframes)
  // image: optional. Leave "" for a styled placeholder,
  // or use a screenshot like "images/projects/my-site.jpg"
  const projects = [
    {
      title: "TERRAX Offroad",
      type: "WordPress",
      category: "Landing Page",
      description: "Dark green and lime themed 4x4 offroad website with a gallery and sticky navbar.",
      url: "https://mynewdesign.42web.io/?i=1",
      embed: false,
      image: "",
      tech: ["WordPress", "Elementor", "JavaScript"],
    },
    {
      title: "FLORIA",
      type: "React",
      category: "Editorial Design",
      description: "Black editorial design with a cursor-reveal hero and scroll story animations.",
      url: "https://hg-design.vercel.app/",
      image: "",
      tech: ["React", "Vite", "JavaScript"],
    },
    {
      title: "Manali Taxi Service",
      type: "Tailwind CSS",
      category: "Taxi Service",
      description: "Responsive taxi booking website for Manali with tour packages and quick enquiry.",
      url: "https://manali-taxi-service.vercel.app/",
      image: "",
      tech: ["Tailwind CSS", "HTML", "JavaScript"],
    },
    {
      title: "Pro Service",
      type: "React",
      category: "Services Website",
      description: "Modern services website with a fast, component-based interface.",
      url: "https://vite-project-tau-ashy.vercel.app/",
      image: "",
      tech: ["React", "Vite", "JavaScript"],
    },
    {
      title: "Bhuntar Taxi Service",
      type: "HTML/CSS/JS",
      category: "Taxi Service",
      description: "Lightweight taxi service website for Bhuntar, built with pure HTML, CSS and JavaScript.",
      url: "https://ashishthakur.github.io/Bhuntar-taxi/",
      image: "",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Sysware Infotech",
      type: "Node.js",
      category: "Web App",
      description: "Node.js and Express company website deployed on Vercel with multiple pages.",
      url: "https://syswareinfotechparttw.vercel.app/",
      image: "",
      tech: ["Node.js", "Express", "Vercel"],
    },
  ];
  // =================================================

  const grid = document.getElementById("projectsGrid");
  const filtersEl = document.getElementById("projectFilters");
  const modal = document.getElementById("previewModal");
  const frame = document.getElementById("previewFrame");
  const loader = document.getElementById("frameLoader");

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const host = (u) => { try { return new URL(u).hostname.replace("www.", ""); } catch (e) { return u; } };

  let activeFilter = "All";

  // ---- Scroll reveal ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.remove("opacity-0", "translate-y-6");
        en.target.classList.add("opacity-100", "translate-y-0");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });

  // ---- Filters ----
  function renderFilters() {
    const types = ["All", ...new Set(projects.map((p) => p.type))];
    filtersEl.innerHTML = types.map((t) => {
      const on = t === activeFilter;
      return `<button data-filter="${esc(t)}" class="rounded-full px-4 py-2 text-sm font-medium transition ${
        on
          ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-purple-500/20"
          : "border border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
      }">${esc(t)}</button>`;
    }).join("");
  }

  // ---- Cards ----
  function renderCards() {
    const list = projects
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => activeFilter === "All" || p.type === activeFilter);

    grid.innerHTML = list.map(({ p, i }, n) => `
      <article class="reveal group relative translate-y-6 opacity-0 transition duration-700 ease-out" style="transition-delay:${n * 80}ms">
        <div class="rounded-3xl bg-gradient-to-b from-white/15 to-white/0 p-px transition duration-500 group-hover:-translate-y-1.5 group-hover:from-cyan-400/60 group-hover:to-purple-500/60 group-hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.45)]">
          <div class="spot relative overflow-hidden rounded-[23px] bg-[#05070d]">

            <!-- cursor spotlight -->
            <div class="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(450px_circle_at_var(--x,50%)_var(--y,50%),rgba(139,92,246,0.16),transparent_45%)]"></div>

            <!-- browser mockup -->
            <div class="p-3 pb-0">
              <button type="button" data-index="${i}" aria-label="Preview ${esc(p.title)}"
                      class="open-preview block w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b1020] text-left">
                <div class="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2">
                  <span class="h-2 w-2 rounded-full bg-red-400/70"></span>
                  <span class="h-2 w-2 rounded-full bg-yellow-400/70"></span>
                  <span class="h-2 w-2 rounded-full bg-green-400/70"></span>
                  <span class="ml-2 flex-1 truncate rounded-full bg-black/40 px-3 py-0.5 text-[10px] text-slate-500">${esc(host(p.url))}</span>
                </div>

                <div class="relative aspect-[16/10] overflow-hidden">
                  ${p.image
                    ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy"
                            class="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />`
                    : `<div class="absolute inset-0 bg-gradient-to-br from-cyan-500/25 via-[#0b1020] to-purple-600/30 transition duration-700 group-hover:scale-105">
                         <div class="absolute inset-x-6 top-6 space-y-3">
                           <div class="h-2 w-16 rounded-full bg-white/20"></div>
                           <div class="h-5 w-3/4 rounded bg-white/30"></div>
                           <div class="h-5 w-1/2 rounded bg-white/20"></div>
                           <div class="h-2 w-2/3 rounded-full bg-white/10"></div>
                           <div class="h-7 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"></div>
                         </div>
                         <span class="absolute bottom-3 right-5 text-5xl font-black text-white/10">${esc(p.title.split(" ")[0])}</span>
                       </div>`}

                  <!-- hover overlay -->
                  <div class="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition duration-300 group-hover:opacity-100">
                    <span class="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">
                      View Live
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <!-- content -->
            <div class="relative z-20 p-6">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold uppercase tracking-widest text-cyan-400">${esc(p.category)}</span>
                <span class="text-sm font-bold text-white/20">${String(n + 1).padStart(2, "0")}</span>
              </div>

              <h3 class="mt-3 text-2xl font-bold text-white">${esc(p.title)}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-400">${esc(p.description)}</p>

              <div class="mt-5 flex flex-wrap gap-2">
                ${p.tech.map((t) => `<span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">${esc(t)}</span>`).join("")}
              </div>

              <div class="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                <button type="button" data-index="${i}" class="open-preview inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-cyan-300">
                  Live Preview
                  <svg class="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>
                <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(p.title)} in new tab"
                   class="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  // ---- Filter click ----
  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (!b) return;
    activeFilter = b.dataset.filter;
    renderFilters();
    renderCards();
  });

  // ---- Cursor spotlight ----
  grid.addEventListener("mousemove", (e) => {
    const s = e.target.closest(".spot");
    if (!s) return;
    const r = s.getBoundingClientRect();
    s.style.setProperty("--x", e.clientX - r.left + "px");
    s.style.setProperty("--y", e.clientY - r.top + "px");
  });

  // ---- Modal ----
  const widths = { desktop: "100%", tablet: "768px", mobile: "390px" };

  function setDevice(d) {
    frame.style.maxWidth = widths[d];
    document.querySelectorAll(".device-btn").forEach((b) => {
      const on = b.dataset.device === d;
      b.classList.toggle("bg-gradient-to-r", on);
      b.classList.toggle("from-cyan-400", on);
      b.classList.toggle("to-purple-500", on);
      b.classList.toggle("text-white", on);
      b.classList.toggle("text-slate-400", !on);
    });
  }

  function openPreview(i) {
    const p = projects[i];

    // Sites that block iframes open directly in a new tab
    if (p.embed === false) {
      window.open(p.url, "_blank", "noopener,noreferrer");
      return;
    }

    document.getElementById("modalUrl").textContent = host(p.url);
    document.getElementById("modalOpen").href = p.url;
    loader.style.display = "grid";
    frame.src = p.url;
    setDevice("desktop");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closePreview() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    frame.src = "about:blank";
    document.body.style.overflow = "";
  }

  frame.addEventListener("load", () => { loader.style.display = "none"; });
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".open-preview");
    if (btn) openPreview(Number(btn.dataset.index));
  });
  document.querySelectorAll(".device-btn").forEach((b) => b.addEventListener("click", () => setDevice(b.dataset.device)));
  document.getElementById("modalClose").addEventListener("click", closePreview);
  modal.addEventListener("click", (e) => { if (e.target === modal) closePreview(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePreview(); });

  // ---- Init ----
  renderFilters();
  renderCards();