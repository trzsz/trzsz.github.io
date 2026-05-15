(function (window, document) {
  "use strict";

  // =============================
  // classie (compat helper)
  // =============================

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  var hasClass, addClass, removeClass;

  if ("classList" in document.documentElement) {
    hasClass = (el, c) => el.classList.contains(c);
    addClass = (el, c) => el.classList.add(c);
    removeClass = (el, c) => el.classList.remove(c);
  } else {
    hasClass = (el, c) => classReg(c).test(el.className);

    addClass = (el, c) => {
      if (!hasClass(el, c)) {
        el.className += " " + c;
      }
    };

    removeClass = (el, c) => {
      el.className = el.className.replace(classReg(c), " ");
    };
  }

  function toggleClass(el, c) {
    const fn = hasClass(el, c) ? removeClass : addClass;
    fn(el, c);
  }

  window.classie = {
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass,
  };

  // =============================
  // MENU
  // =============================

  const body = document.body;
  const openBtn = document.getElementById("open-button");

  let menuOpen = false;

  function toggleMenu() {
    toggleClass(body, "show-menu");
    menuOpen = !menuOpen;
  }

  function initMenu() {
    if (!openBtn) return;

    const menuWrap = document.querySelector(".menu-wrap");

    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    document.addEventListener("click", (e) => {
      if (menuOpen && menuWrap && !menuWrap.contains(e.target) && e.target !== openBtn) {
        toggleMenu();
      }
    });
  }

  // =============================
  // ACCORDION
  // =============================
  function initAccordion() {
    let defaultKey = "en";
    if (window.location.pathname.startsWith("/cn/")) {
      defaultKey = "cn";
    }
    const groups = document.querySelectorAll(".menu-group");
    groups.forEach((g) => {
      if (g.classList.contains(`menu-group-${defaultKey}`)) {
        addClass(g, "expanded");
      } else {
        removeClass(g, "expanded");
      }
    });

    const titles = document.querySelectorAll(".menu-group-title");
    titles.forEach((title) => {
      title.addEventListener("click", (e) => {
        e.stopPropagation();
        const group = title.closest(".menu-group");
        const isExpanded = hasClass(group, "expanded");
        const allGroups = document.querySelectorAll(".menu-group");

        allGroups.forEach((g) => {
          removeClass(g, "expanded");
        });
        if (!isExpanded) {
          addClass(group, "expanded");
        }
      });
    });
  }

  // =============================
  // TOC
  // =============================

  function initTOC() {
    const content = document.querySelector(".main-content");
    const tocRoot = document.getElementById("toc");

    if (!content || !tocRoot) return;

    const wrapper = document.createElement("div");
    wrapper.className = "toc-wrapper expanded";

    const toggle = document.createElement("button");
    toggle.className = "toc-toggle";
    toggle.textContent = "";
    toggle.title = "Table of contents";

    const panel = document.createElement("div");
    panel.className = "toc-panel";

    wrapper.appendChild(toggle);
    wrapper.appendChild(panel);
    tocRoot.appendChild(wrapper);

    const headers = Array.from(content.querySelectorAll("h1, h2, h3, h4, h5, h6"));

    if (!headers.length) return;

    const minLevel = Math.min(...headers.map((h) => parseInt(h.tagName.substring(1))));

    const ul = document.createElement("ul");

    headers.forEach((h) => {
      const level = parseInt(h.tagName.substring(1));

      // hide top-level heading
      if (level === minLevel) return;

      // normalize level
      const displayLevel = level - minLevel;

      if (!h.id) {
        h.id = slugify(h.textContent);
      }

      const li = document.createElement("li");
      li.className = "toc-level-" + displayLevel;

      const a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;

      li.appendChild(a);
      ul.appendChild(li);
    });

    panel.appendChild(ul);

    // =============================
    // auto collapse if too wide
    // =============================

    requestAnimationFrame(() => {
      const contentWidth = content.offsetWidth;
      const tocWidth = wrapper.offsetWidth;

      const space = window.innerWidth - contentWidth - tocWidth;

      if (space < 120) {
        wrapper.classList.remove("expanded");
        wrapper.classList.add("collapsed");
      }
    });

    // =============================
    // toggle open / close
    // =============================

    toggle.addEventListener("click", () => {
      wrapper.classList.toggle("collapsed");
      wrapper.classList.toggle("expanded");
    });
  }

  // =============================
  // utils
  // =============================

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-+/g, "-");
  }

  // =============================
  // init
  // =============================

  function init() {
    initMenu();
    initAccordion();
    initTOC();
  }

  document.addEventListener("DOMContentLoaded", init);
})(window, document);
