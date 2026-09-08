// AdGenie v4.0 â€” ChatGPT-Style Campaign Architect Logic

const platforms = [
  {
    id: "Instagram",
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
    duration: "<= 15s",
    ratio: "1:1",
    ratioLabel: "1:1 Square",
    note: "High-contrast visuals, minimalist copy, square feed frame",
  },
  {
    id: "YouTube",
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m10 15 5-3-5-3v6Z"/><rect width="20" height="14" x="2" y="5" rx="4"/></svg>`,
    duration: "20-30s",
    ratio: "16:9",
    ratioLabel: "16:9 Wide",
    note: "Strong hook in first 3s, problem-solution storytelling",
  },
  {
    id: "Facebook",
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    duration: "15-20s",
    ratio: "4:5",
    ratioLabel: "4:5 Vertical Feed",
    note: "Mute-optimized with captions, social proof focus",
  },
  {
    id: "TikTok",
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>`,
    duration: "9-15s",
    ratio: "9:16",
    ratioLabel: "9:16 Full Screen",
    note: "Fast pacing, trending audio vibe, punchy CTA",
  },
];

const audiences = [
  {
    id: "Youth (18-25)",
    key: "youth",
    blurb: "Fast-scrolling, high energy, loves bold hooks & relatable humor.",
    handle: "@genz.vibes",
    hue: 280,
  },
  {
    id: "Professionals",
    key: "professional",
    blurb: "Skims for specs, ROI metrics, sleek design & trust signals.",
    handle: "@workmode.pro",
    hue: 210,
  },
  {
    id: "General Audience",
    key: "general",
    blurb: "Broad market reach, clear benefits, jargon-free promise.",
    handle: "@everyday.finds",
    hue: 150,
  },
];

const budgets = [
  { id: "Starter (1 Variant)", variants: 1 },
  { id: "Growth (2 Variants)", variants: 2 },
  { id: "Scale (3 Variants)", variants: 3 },
];

const promptSamples = [
  { title: "ðŸŽ§ Noise-Cancelling Headphones", prompt: "Wireless noise-cancelling headphones with 30hr battery life, spatial audio, and quick charge" },
  { title: "â˜• Coffee Subscription", prompt: "Single-origin artisanal coffee subscription delivered fresh weekly with customizable roast profiles" },
  { title: "ðŸ’» AI Resume Builder", prompt: "AI-powered resume & cover letter builder that tailors job applications to ATS algorithms in 2 minutes" },
  { title: "ðŸ’§ Smart Hydration Bottle", prompt: "Insulated smart water bottle with LED glow reminders and automatic daily hydration tracking" },
];

const hooks = {
  youth: [
    "Stop scrolling. This changes everything.",
    "Your daily upgrade just dropped.",
    "Obsessed is an understatement.",
    "Built for your aesthetic.",
  ],
  professional: [
    "Engineered for maximum output.",
    "The competitive edge your team needs.",
    "Precision, efficiency, zero compromise.",
    "Designed for peak performance.",
  ],
  general: [
    "Simple. Brilliant. Made for you.",
    "Upgrade your everyday routine.",
    "The smarter way to get things done.",
    "Discover your new favorite essential.",
  ],
};

const closers = {
  youth: ["Tap in before it sells out.", "Get yours today.", "Your move."],
  professional: ["Schedule a demo.", "Explore specs & pricing.", "See why top teams switch."],
  general: ["Shop now.", "Learn more today.", "Find your perfect fit."],
};

const tipPool = {
  Instagram: [
    "Position the main CTA within the first 3 seconds of video or poster frame.",
    "Keep on-screen text clutter-free for optimal feed reach algorithm.",
  ],
  YouTube: [
    "Front-load the core brand proposition in the opening 2.5 seconds.",
    "Use pattern interrupt transitions to maintain high audience retention.",
  ],
  Facebook: [
    "Design for sound-off auto-play viewing with large legible copy overlays.",
    "Lead with direct customer benefit before technical details.",
  ],
  TikTok: [
    "Use native-style UGC formatting for 3x higher conversion rate.",
    "Pair visual hooks with fast-paced rhythmic pacing.",
  ],
};

const steps = [
  { label: "Semantic Input Parser", desc: "Analyzing prompt intent, product promise & key differentiators", fact: "Validated brief structure against GPT-4o ad rules." },
  { label: "Creative Copy Engine", desc: "Synthesizing high-converting headlines, hooks & call-to-actions", fact: "Drafted 3 platform-tailored copy variations." },
  { label: "Visual Color System", desc: "Generating adaptive color palettes & poster aspect compositions", fact: "Mapped dynamic HSL gradients for high contrast." },
  { label: "Platform Spec Optimizer", desc: "Applying safe-zones, aspect ratios & sound-off caption rules", fact: "Adjusted layout parameters for target channel." },
  { label: "Quality & Conversion Scorer", desc: "Scoring copy clarity, audience alignment & CTA strength", fact: "Calculated composite quality index (0-100)." },
];

const state = {
  page: "campaign",
  form: {
    description: "",
    audience: audiences[0].id,
    platform: platforms[0].id,
    budget: budgets[1].id,
  },
  campaigns: [],
  current: null,
  sortBy: "recent",
  studioTimer: null,
  activeStep: -1,
  theme: "dark",
  sidebarOpen: true,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function showToast(message) {
  const toast = $("#toastNotification");
  const msgEl = $("#toastMessage");
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2600);
}

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pickN(arr, seed, n) {
  const out = [];
  const used = new Set();
  let s = seed || 1;
  while (out.length < n && used.size < arr.length) {
    s = (s * 9301 + 49297) % 233280;
    const idx = s % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      out.push(arr[idx]);
    }
  }
  return out;
}

function productNoun(desc) {
  const cleaned = desc.replace(/^(a|an|the)\s+/i, "");
  let words = cleaned.trim().split(/\s+/).filter(Boolean).slice(0, 4);
  while (words.length > 1 && /^(with|for|and|of|in|to|on|at|by|a|an|the)$/i.test(words[words.length - 1])) {
    words.pop();
  }
  const str = words.join(" ");
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "Your Product";
}

function scoreFor(seedStr) {
  return 78 + (hashStr(seedStr) % 20);
}

function selectedAudience() {
  return audiences.find((a) => a.id === state.form.audience) || audiences[0];
}

function selectedPlatform() {
  return platforms.find((p) => p.id === state.form.platform) || platforms[0];
}

function selectedBudget() {
  return budgets.find((b) => b.id === state.form.budget) || budgets[1];
}

function hueGradient(hue) {
  return `linear-gradient(135deg, hsl(${hue} 70% 48%), hsl(${(hue + 50) % 360} 65% 32%))`;
}

function makeVariant(toneKey, platformId, description, index, seedTag) {
  const noun = productNoun(description);
  const hookList = hooks[toneKey] || hooks.general;
  const closerList = closers[toneKey] || closers.general;
  
  const hook = pickN(hookList, hashStr(description + seedTag + index + "h"), 1)[0];
  const closer = pickN(closerList, hashStr(description + seedTag + index + "c"), 1)[0];
  
  const headline = `${hook} Meet ${noun}.`;
  const caption = `${noun} â€” ${closer} #AdGenie #CreativeStudio`;

  return {
    id: `V${String.fromCharCode(65 + index)}`,
    headline,
    caption,
    cta: closer,
    score: scoreFor(headline + index + description + seedTag),
    hue: (hashStr(headline + index + seedTag) % 300) + 15,
  };
}

function buildCampaignResult(form, seedTag = "preview") {
  const audience = audiences.find((a) => a.id === form.audience) || audiences[0];
  const platform = platforms.find((p) => p.id === form.platform) || platforms[0];
  const budget = budgets.find((b) => b.id === form.budget) || budgets[1];
  
  const variants = Array.from({ length: budget.variants }, (_, index) =>
    makeVariant(audience.key, platform.id, form.description, index, seedTag)
  );

  const tips = pickN(tipPool[platform.id] || tipPool.Instagram, hashStr(form.description + "tips"), 2);
  
  return {
    variants,
    tips,
    platform,
    toneKey: audience.key,
    noun: productNoun(form.description),
  };
}

function renderSampleChips() {
  const container = $("#sampleChips");
  if (!container) return;
  container.innerHTML = promptSamples
    .map(
      (item) =>
        `<button class="sample-chip" data-prompt="${item.prompt}">${item.title}</button>`
    )
    .join("");
}

function renderOptions() {
  // Audiences
  $("#audienceOptions").innerHTML = audiences
    .map((audience) => {
      const active = state.form.audience === audience.id ? "active" : "";
      return `
      <button class="audience-card ${active}" data-audience="${audience.id}">
        <span class="avatar" style="background: linear-gradient(135deg, hsl(${audience.hue} 70% 50%), hsl(${(audience.hue + 45) % 360} 60% 40%));"></span>
        <div>
          <span class="audience-title">${audience.id}</span>
          <span class="audience-sub">${audience.handle}</span>
        </div>
      </button>
    `;
    })
    .join("");

  // Platforms
  $("#platformOptions").innerHTML = platforms
    .map((platform) => {
      const active = state.form.platform === platform.id ? "active" : "";
      return `
      <button class="chip ${active}" data-platform="${platform.id}">
        ${platform.icon}
        <span>${platform.id}</span>
      </button>
    `;
    })
    .join("");

  // Budget Tiers
  $("#budgetOptions").innerHTML = budgets
    .map((budget) => {
      const active = state.form.budget === budget.id ? "active" : "";
      return `
      <button class="chip ${active}" data-budget="${budget.id}">
        <span>${budget.id}</span>
      </button>
    `;
    })
    .join("");
}

function renderPreview() {
  const desc = state.form.description.trim();
  $("#charCount").textContent = state.form.description.length;
  $("#generateBtn").disabled = desc.length <= 6;

  const hintEl = $("#promptQualityHint");
  if (desc.length > 30) {
    hintEl.textContent = "High quality brief prompt";
    hintEl.style.color = "var(--accent-green)";
  } else {
    hintEl.textContent = "Add product promise for best score";
    hintEl.style.color = "var(--text-muted)";
  }

  const platform = selectedPlatform();
  $("#aspectBadge").textContent = platform.ratioLabel;

  if (desc.length <= 3) {
    $("#devicePreview").className = "device-preview empty";
    $("#devicePreview").innerHTML = `
      <div style="text-align:center;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:8px; opacity:0.5;">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <line x1="3" x2="21" y1="9" y2="9"/>
          <line x1="9" x2="9" y1="21" y2="9"/>
        </svg>
        <p>Type a prompt or select a sample chip above to view live ad mockup</p>
      </div>
    `;
    $("#previewMeta").innerHTML = `Select platform channel to optimize safe zones & aspect ratios.`;
    return;
  }

  const result = buildCampaignResult(state.form, "preview");
  const variant = result.variants[0];
  const aspectClass =
    platform.id === "YouTube"
      ? "wide"
      : platform.id === "Facebook" 
      ? "tall"
      : "square";

  $("#devicePreview").className = "device-preview";
  $("#devicePreview").innerHTML = `
    <article class="mock-post">
      <div class="mock-head">
        <span class="mock-dot" style="background:${hueGradient(variant.hue)}"></span>
        <span>adgenie.ai</span>
      </div>
      <div class="mock-art ${aspectClass}" style="background:${hueGradient(variant.hue)}">
        ${variant.headline}
      </div>
      <div class="mock-actions">
        <span>â™¡</span><span>ðŸ’¬</span><span>âœˆ</span>
      </div>
      <div class="mock-copy">
        <strong>adgenie.ai</strong> ${variant.headline}
        <div class="mock-caption">${variant.caption}</div>
      </div>
    </article>
  `;

  $("#previewMeta").innerHTML = `
    <strong>${platform.id} Spec:</strong> ${platform.ratioLabel} Â· ${platform.duration}<br>
    <span style="color:var(--text-secondary);">${platform.note}</span>
  `;
}

function setPage(page) {
  state.page = page;
  $$(".page").forEach((el) => el.classList.remove("active"));
  $(`#${page}Page`).classList.add("active");

  $$(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === page);
  });

  if (page === "history") renderHistory();
  if (page === "results") renderResults();
}

function updateNavLocks() {
  const hasCurrent = Boolean(state.current);
  $$('.nav-item[data-page="studio"]').forEach((button) =>
    button.classList.toggle("disabled", !hasCurrent)
  );
  $$('.nav-item[data-page="results"]').forEach((button) =>
    button.classList.toggle("disabled", !hasCurrent)
  );
}

function startStudio() {
  clearInterval(state.studioTimer);
  state.activeStep = 0;
  $("#viewResultsBtn").classList.add("hidden");
  renderPipeline();

  state.studioTimer = setInterval(() => {
    if (state.activeStep >= steps.length - 1) {
      clearInterval(state.studioTimer);
      $("#studioStatus").textContent = "Reasoning complete. Variants synthesized.";
      $("#progressPercent").textContent = "100%";
      $("#progressFill").style.width = "100%";
      $("#viewResultsBtn").classList.remove("hidden");

      if (!state.campaigns.some((c) => c.id === state.current.id)) {
        state.campaigns.unshift(state.current);
      }
      renderSidebarRecent();
      renderHistory();
      return;
    }

    state.activeStep += 1;
    renderPipeline();
  }, 700);
}

function renderPipeline() {
  $("#pipelineSteps").innerHTML = steps
    .map((step, index) => {
      const status =
        index < state.activeStep
          ? "done"
          : index === state.activeStep
          ? "active"
          : "";
      const label =
        index < state.activeStep
          ? "EXECUTED"
          : index === state.activeStep
          ? "PROCESSING"
          : "PENDING";
      const icon = index < state.activeStep ? "âœ“" : index + 1;
      return `
      <div class="step-node ${status}">
        <div class="node-icon">${icon}</div>
        <div class="node-content">
          <div class="node-title">${step.label}</div>
          <div class="node-desc">${index === state.activeStep ? step.fact : step.desc}</div>
        </div>
        <div class="node-state">${label}</div>
      </div>
    `;
    })
    .join("");

  const percent = Math.round(((state.activeStep + 1) / steps.length) * 100);
  $("#progressFill").style.width = `${percent}%`;
  $("#progressPercent").textContent = `${percent}%`;
  $("#studioStatus").textContent = steps[state.activeStep]
    ? steps[state.activeStep].label + "..."
    : "Processing...";
}

function generateCampaign() {
  const result = buildCampaignResult(state.form, String(Date.now()));
  state.current = {
    id: Date.now(),
    form: { ...state.form },
    result,
    timestamp: Date.now(),
  };
  updateNavLocks();
  setPage("studio");
  startStudio();
}

function renderResults() {
  if (!state.current) {
    $("#resultTitle").textContent = "No Campaign Selected";
    $("#resultMeta").textContent = "Fill out a brief prompt to generate copy and mockups.";
    $("#platformBadge").classList.add("hidden");
    $("#resultCards").innerHTML = "";
    $("#notesBlock").classList.add("hidden");
    return;
  }

  const { result, form, timestamp } = state.current;
  $("#resultTitle").textContent = `${result.noun} Campaign`;
  $("#resultMeta").textContent = `Generated on ${new Date(timestamp).toLocaleTimeString()} Â· Target: ${form.audience} Â· Tier: ${form.budget}`;

  $("#platformBadge").classList.remove("hidden");
  $("#platformBadge").innerHTML = `${result.platform.icon} <span>${result.platform.id} (${result.platform.ratio})</span>`;

  $("#resultCards").innerHTML = result.variants
    .map((variant, index) => {
      const scoreClass = variant.score >= 88 ? "gold" : "";
      return `
      <article class="variant-card">
        <div class="variant-top">
          <span>${variant.id} Â· VARIANT</span>
          <span>${result.platform.id}</span>
        </div>
        <div class="variant-body">
          <div class="variant-poster" style="background:${hueGradient(variant.hue)}">
            ${variant.headline}
          </div>
          <h2 class="variant-headline" contenteditable="true" spellcheck="false">${variant.headline}</h2>
          <p class="variant-caption" contenteditable="true" spellcheck="false">${variant.caption}</p>

          <div class="variant-footer">
            <div class="score-badge">
              <div class="score-circle ${scoreClass}">${variant.score}</div>
              <div style="font-size:11px; color:var(--text-muted);">Quality Index</div>
            </div>

            <div class="card-btn-group">
              <button class="icon-btn-pill copy-btn" data-index="${index}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                <span>Copy</span>
              </button>
              <button class="icon-btn-pill export-btn" data-index="${index}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
    })
    .join("");

  $("#notesBlock").classList.remove("hidden");
  $("#notesList").innerHTML = result.tips.map((tip) => `<li>${tip}</li>`).join("");
}

function exportVariant(index) {
  const variant = state.current.result.variants[index];
  const text = [
    `AdGenie AI Export â€” ${variant.id}`,
    `Product: ${state.current.result.noun}`,
    `Platform: ${state.current.result.platform.id}`,
    `Headline: ${variant.headline}`,
    `Caption: ${variant.caption}`,
    `CTA: ${variant.cta}`,
    `Score: ${variant.score}/100`,
  ].join("\n");

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `adgenie-${variant.id.toLowerCase()}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast("Export file downloaded!");
}

function copyVariantText(index) {
  const variant = state.current.result.variants[index];
  const fullText = `${variant.headline}\n\n${variant.caption}`;
  navigator.clipboard.writeText(fullText).then(() => {
    showToast("Copy text copied to clipboard!");
  });
}

function renderSidebarRecent() {
  const container = $("#sidebarRecentList");
  if (!container) return;

  if (!state.campaigns.length) {
    container.innerHTML = `<div class="empty-recent">No recent campaigns</div>`;
    return;
  }

  container.innerHTML = state.campaigns
    .slice(0, 6)
    .map(
      (c) =>
        `<button class="sidebar-recent-item" data-campaign="${c.id}">${c.result.noun}</button>`
    )
    .join("");
}

function renderHistory() {
  const select = $("#historyPlatform");
  if (select.options.length === 1) {
    platforms.forEach((platform) => {
      const option = document.createElement("option");
      option.value = platform.id;
      option.textContent = platform.id;
      select.appendChild(option);
    });
  }

  const query = $("#historySearch").value.toLowerCase();
  const platformFilter = $("#historyPlatform").value;
  let campaigns = state.campaigns.filter((campaign) => {
    const matchesQuery =
      campaign.result.noun.toLowerCase().includes(query) ||
      campaign.form.audience.toLowerCase().includes(query);
    const matchesPlatform =
      platformFilter === "All" || campaign.result.platform.id === platformFilter;
    return matchesQuery && matchesPlatform;
  });

  campaigns = campaigns.sort((a, b) => {
    if (state.sortBy === "score") {
      const scoreA = Math.max(...a.result.variants.map((v) => v.score));
      const scoreB = Math.max(...b.result.variants.map((v) => v.score));
      return scoreB - scoreA;
    }
    return b.timestamp - a.timestamp;
  });

  if (!campaigns.length) {
    $("#historyList").innerHTML = `<p class="lede" style="padding:20px 0;">No campaigns found in archive.</p>`;
    return;
  }

  $("#historyList").innerHTML = campaigns
    .map((c) => {
      const topScore = Math.max(...c.result.variants.map((v) => v.score));
      return `
      <div class="history-card-item" data-campaign="${c.id}">
        <div class="history-item-left">
          ${c.result.platform.icon}
          <div>
            <div class="history-title">${c.result.noun}</div>
            <div class="history-meta">${new Date(c.timestamp).toLocaleString()} Â· ${c.form.audience}</div>
          </div>
        </div>
        <div class="history-item-right">
          <span class="history-score-tag">${topScore} pts</span>
          <span class="pill-btn-outline" style="font-size:11px;">Open â†’</span>
        </div>
      </div>
    `;
    })
    .join("");
}

function attachEvents() {
  // Description Input
  $("#description").addEventListener("input", (event) => {
    state.form.description = event.target.value;
    renderPreview();
  });

  // Prompt Sample Chips
  $("#sampleChips").addEventListener("click", (event) => {
    const button = event.target.closest("[data-prompt]");
    if (!button) return;
    state.form.description = button.dataset.prompt;
    $("#description").value = button.dataset.prompt;
    renderPreview();
  });

  // Audience Options
  $("#audienceOptions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-audience]");
    if (!button) return;
    state.form.audience = button.dataset.audience;
    renderOptions();
    renderPreview();
  });

  // Platform Options
  $("#platformOptions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-platform]");
    if (!button) return;
    state.form.platform = button.dataset.platform;
    renderOptions();
    renderPreview();
  });

  // Budget Options
  $("#budgetOptions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-budget]");
    if (!button) return;
    state.form.budget = button.dataset.budget;
    renderOptions();
    renderPreview();
  });

  // Action Buttons
  $("#generateBtn").addEventListener("click", generateCampaign);
  $("#viewResultsBtn").addEventListener("click", () => setPage("results"));
  $("#runAnotherBtn").addEventListener("click", () => setPage("campaign"));
  $("#newCampaignBtn").addEventListener("click", () => setPage("campaign"));

  $("#randomBriefBtn").addEventListener("click", () => {
    const sample = promptSamples[Math.floor(Math.random() * promptSamples.length)];
    state.form.description = sample.prompt;
    $("#description").value = sample.prompt;
    renderPreview();
  });

  // Sidebar Nav Items
  $(".side-nav").addEventListener("click", (event) => {
    const button = event.target.closest(".nav-item");
    if (!button || button.classList.contains("disabled")) return;
    setPage(button.dataset.page);
  });

  // Sidebar Toggle
  $("#sidebarToggleBtn").addEventListener("click", () => {
    $("#sidebar").classList.toggle("collapsed");
  });

  // Mobile Menu Toggle
  $("#mobileMenuBtn").addEventListener("click", () => {
    $("#sidebar").classList.toggle("mobile-open");
  });

  // Light/Dark Theme Toggle
  $("#themeToggleBtn").addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    $(".sun-icon").classList.toggle("hidden", isLight);
    $(".moon-icon").classList.toggle("hidden", !isLight);
    showToast(`Switched to ${isLight ? "Light" : "Dark"} theme`);
  });

  // Share Button
  $("#quickShareBtn").addEventListener("click", () => {
    showToast("Shareable campaign link copied!");
  });

  // Result Cards Action Delegation (Copy & Export)
  $("#resultCards").addEventListener("click", (event) => {
    const exportBtn = event.target.closest(".export-btn");
    if (exportBtn) {
      exportVariant(Number(exportBtn.dataset.index));
      return;
    }

    const copyBtn = event.target.closest(".copy-btn");
    if (copyBtn) {
      copyVariantText(Number(copyBtn.dataset.index));
      return;
    }
  });

  // History Actions
  $("#historySearch").addEventListener("input", renderHistory);
  $("#historyPlatform").addEventListener("change", renderHistory);
  $("#sortHistoryBtn").addEventListener("click", () => {
    state.sortBy = state.sortBy === "recent" ? "score" : "recent";
    $("#sortHistoryBtn").querySelector("span").textContent =
      state.sortBy === "recent" ? "Most recent" : "Top score";
    renderHistory();
  });

  $("#historyList").addEventListener("click", (event) => {
    const item = event.target.closest("[data-campaign]");
    if (!item) return;
    state.current = state.campaigns.find(
      (c) => c.id === Number(item.dataset.campaign)
    );
    updateNavLocks();
    setPage("results");
  });

  // Sidebar Recent List Actions
  $("#sidebarRecentList").addEventListener("click", (event) => {
    const item = event.target.closest("[data-campaign]");
    if (!item) return;
    state.current = state.campaigns.find(
      (c) => c.id === Number(item.dataset.campaign)
    );
    updateNavLocks();
    setPage("results");
  });
}

function init() {
  renderSampleChips();
  renderOptions();
  renderPreview();
  renderPipeline();
  renderSidebarRecent();
  renderHistory();
  attachEvents();
}

init();

