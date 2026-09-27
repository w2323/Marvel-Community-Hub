document.addEventListener('DOMContentLoaded', () => {
  // --- 0. SAFE STORAGE & UTILS ---
  const storage = {
    get: (key, def) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : def;
      } catch (e) { return def; }
    },
    set: (key, val) => {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { }
    }
  };

  const qs = (sel) => document.querySelector(sel);
  const qsa = (sel) => document.querySelectorAll(sel);

  // --- 1. THEME MANAGER ---
  const themeToggle = qs('#theme-toggle');
  const sunIcon = qs('.sun-icon');
  const moonIcon = qs('.moon-icon');

  let currentTheme = storage.get('mch_theme', 'dark');
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  };

  applyTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    storage.set('mch_theme', currentTheme);
    applyTheme(currentTheme);
  });

  // --- 2. XP & BADGE SYSTEM ---
  let xp = storage.get('mch_xp', 0);
  const xpValEl = qs('#xp-value');
  const toastContainer = qs('#toast-container');

  const badgesDef = [
    { id: 'b1', name: 'Scout', cost: 50, class: 'bronze' },
    { id: 'b2', name: 'Agent', cost: 150, class: 'silver' },
    { id: 'b3', name: 'Avenger', cost: 300, class: 'gold' },
    { id: 'b4', name: 'Hero', cost: 500, class: 'plat' }
  ];

  const renderBadges = () => {
    const container = qs('#xp-badges-container');
    container.innerHTML = '';
    badgesDef.forEach(b => {
      const isUnlocked = xp >= b.cost;
      const el = document.createElement('div');
      el.className = `badge ${b.class} ${isUnlocked ? 'unlocked' : ''}`;
      el.textContent = isUnlocked ? b.name.charAt(0) : '?';
      el.title = `${b.name} (${b.cost} XP)`;
      container.appendChild(el);
    });
  };

  const showToast = (msg) => {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    toastContainer.appendChild(t);
    setTimeout(() => {
      t.classList.add('fade-out');
      t.addEventListener('animationend', () => t.remove());
    }, 3000);
  };

  const addXP = (amount, reason) => {
    const oldXp = xp;
    xp += amount;
    storage.set('mch_xp', xp);

    // Animate counter
    let current = oldXp;
    const inc = amount / 20;
    const iv = setInterval(() => {
      current += inc;
      if (current >= xp) {
        current = xp;
        clearInterval(iv);
      }
      xpValEl.textContent = Math.floor(current);
    }, 20);

    showToast(`+${amount} XP: ${reason}`);

    // Check unlocks
    badgesDef.forEach((b, i) => {
      if (oldXp < b.cost && xp >= b.cost) {
        setTimeout(() => {
          showToast(`Badge Unlocked: ${b.name}!`);
          renderBadges();
          const badgeEls = qsa('.badge');
          if (badgeEls[i]) badgeEls[i].classList.add('badge-pop');
        }, 500);
      }
    });
  };

  xpValEl.textContent = xp;
  renderBadges();

  // --- 3. MOBILE NAV OVERHAUL ---
  const mobileToggle = qs('#mobile-nav-toggle');
  const navOverlay = qs('#nav-overlay');

  const toggleNav = () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    document.body.classList.toggle('nav-open');
  };

  mobileToggle.addEventListener('click', toggleNav);
  navOverlay.addEventListener('click', toggleNav);
  qsa('#main-nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = a.getAttribute('href');
      const targetEl = qs(targetId);
      if (document.body.classList.contains('nav-open')) toggleNav();
      if (targetEl) {
        window.scrollTo({ top: targetEl.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // --- 4. SCROLL REVEAL (IntersectionObserver) ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // observer.unobserve(entry.target); // keep observing or not? usually yes to only animate once, but let's let it re-animate if scrolled far away? No, standard is once.
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  qsa('.reveal').forEach(el => observer.observe(el));

  // --- 5. RESOURCE TRACKER UPGRADE ---
  const tabBtns = qsa('.tab-btn');

  // Tab logic
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('.tab-btn').forEach(b => b.classList.remove('active'));
      qsa('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      qs(`#${btn.getAttribute('data-target')}`).classList.add('active');
      addXP(5, 'Explored Resources');
    });
  });

  // --- 7. HERO VS STAT ARENA ---
  const charData = {
    'ironman': { name: 'Iron Man', img: 'iron.png', stats: [70, 85, 80, 100, 75, 85] },
    'cap': { name: 'Captain America', img: 'captain.png', stats: [65, 75, 65, 80, 95, 60] },
    'thor': { name: 'Thor', img: 'thor.png', stats: [95, 95, 85, 60, 85, 100] },
    'spidey': { name: 'Spider-Man', img: 'spider.png', stats: [75, 70, 90, 85, 80, 75] },
    'thanos': { name: 'Thanos', img: 'thanos.png', stats: [100, 100, 75, 95, 95, 100] },
    'loki': { name: 'Loki', img: 'loki.jpg', stats: [65, 70, 75, 90, 85, 80] },
    'redskull': { name: 'Red Skull', img: 'redskull.png', stats: [65, 65, 60, 85, 85, 60] }
  };

  const hSelect = qs('#hero-select');
  const vSelect = qs('#villain-select');

  if (hSelect && vSelect) {
    const heroes = ['ironman', 'cap', 'thor', 'spidey'];
    const villains = ['thanos', 'loki', 'redskull'];

    heroes.forEach(id => hSelect.add(new Option(charData[id].name, id)));
    villains.forEach(id => vSelect.add(new Option(charData[id].name, id)));

    const drawRadar = (svgId, stats) => {
      const svg = qs(`#${svgId}`);
      svg.innerHTML = ''; // clear
      const cx = 100, cy = 100, r = 80;
      const numAxes = 6;
      const angle = (Math.PI * 2) / numAxes;
      const labels = ['STR', 'DUR', 'SPD', 'INT', 'CMB', 'PWR'];

      // Draw Grid & Axes
      for (let level = 1; level <= 4; level++) {
        let pts = '';
        for (let i = 0; i < numAxes; i++) {
          const lR = (r / 4) * level;
          const x = cx + lR * Math.cos(angle * i - Math.PI / 2);
          const y = cy + lR * Math.sin(angle * i - Math.PI / 2);
          pts += `${x},${y} `;
        }
        svg.innerHTML += `<polygon points="${pts}" class="radar-grid" />`;
      }
      for (let i = 0; i < numAxes; i++) {
        const x = cx + r * Math.cos(angle * i - Math.PI / 2);
        const y = cy + r * Math.sin(angle * i - Math.PI / 2);
        svg.innerHTML += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="radar-axis"/>`;
        // Label
        const lx = cx + (r + 15) * Math.cos(angle * i - Math.PI / 2);
        const ly = cy + (r + 10) * Math.sin(angle * i - Math.PI / 2);
        svg.innerHTML += `<text x="${lx}" y="${ly}" class="radar-label">${labels[i]}</text>`;
      }

      // Draw Data Path
      let dataPts = '';
      stats.forEach((val, i) => {
        const valR = r * (val / 100);
        const x = cx + valR * Math.cos(angle * i - Math.PI / 2);
        const y = cy + valR * Math.sin(angle * i - Math.PI / 2);
        dataPts += `${x},${y} `;
      });
      svg.innerHTML += `<polygon points="${dataPts}" class="radar-path" />`;
    };

    const updatePanel = (selectEl, role) => {
      const id = selectEl.value;
      const data = charData[id];
      qs(`#${role}-img`).src = data.img;
      qs(`#${role}-name`).textContent = data.name;
      drawRadar(`${role}-radar`, data.stats);
      qs(`#vote-${role}-label`).textContent = data.name.split(' ')[0];
    };

    hSelect.addEventListener('change', () => updatePanel(hSelect, 'hero'));
    vSelect.addEventListener('change', () => updatePanel(vSelect, 'villain'));

    // Init
    updatePanel(hSelect, 'hero');
    updatePanel(vSelect, 'villain');

    // Verdict Logic
    const slider = qs('#verdict-slider');
    const submitVote = qs('#submit-vote-btn');
    const resultDiv = qs('#verdict-result');
    const arenaVotes = storage.get('mch_arena_votes', {});

    submitVote.addEventListener('click', () => {
      const h = hSelect.value;
      const v = vSelect.value;
      const matchupKey = `${h}_vs_${v}`;
      const userVote = parseInt(slider.value);

      arenaVotes[matchupKey] = userVote;
      storage.set('mch_arena_votes', arenaVotes);

      // Fake aggregate logic
      // Hash string to get a deterministic base seed
      let seed = 0;
      for (let i = 0; i < matchupKey.length; i++) seed += matchupKey.charCodeAt(i);
      const baseHeroWin = (seed % 60) + 20; // 20-80%
      const blended = Math.round((baseHeroWin * 0.8) + (userVote * 0.2));

      resultDiv.innerHTML = `Vote Registered! <strong class="text-cyan">${blended}%</strong> of fans back ${charData[h].name}.`;
      addXP(15, 'Voted in Arena');
    });
  }

  // --- 8. MCU TRIVIA CHALLENGE ---
  const tQs = [
    { q: "What year was the first Iron Man movie released?", opts: ["2005", "2008", "2010", "2012"], a: 1, exp: "Iron Man kicked off the MCU in 2008." },
    { q: "What is the name of Thor's hammer?", opts: ["Stormbreaker", "Mjolnir", "Gungnir", "Aesir"], a: 1, exp: "Whosoever holds this hammer, if he be worthy..." },
    { q: "Who is the Winter Soldier?", opts: ["Steve Rogers", "Sam Wilson", "Bucky Barnes", "Clint Barton"], a: 2, exp: "Bucky was brainwashed by Hydra." },
    { q: "What species is Groot?", opts: ["Flora colossus", "Ent", "Kree", "Sakaaran"], a: 0, exp: "He is a Flora colossus from Planet X." },
    { q: "How many Infinity Stones are there?", opts: ["4", "5", "6", "7"], a: 2, exp: "Space, Reality, Power, Soul, Mind, Time." }
  ];

  let currQ = 0;
  let score = 0;

  const qContainer = qs('#trivia-question-container');
  const resContainer = qs('#trivia-result-container');
  const qTitle = qs('#trivia-question');
  const optsDiv = qs('#trivia-options');
  const feedbackDiv = qs('#trivia-feedback');
  const nextBtn = qs('#trivia-next-btn');
  const progBar = qs('#trivia-progress');
  const countTxt = qs('#trivia-count');

  const loadQ = () => {
    if (!qTitle) return;
    const qData = tQs[currQ];
    qTitle.textContent = qData.q;
    optsDiv.innerHTML = '';
    feedbackDiv.textContent = '';
    nextBtn.style.display = 'none';
    progBar.style.width = `${(currQ / tQs.length) * 100}%`;
    countTxt.textContent = `Question ${currQ + 1}/${tQs.length}`;

    qData.opts.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'trivia-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAns(idx, btn));
      optsDiv.appendChild(btn);
    });
  };

  const handleAns = (idx, btn) => {
    const qData = tQs[currQ];
    const btns = optsDiv.querySelectorAll('.trivia-btn');
    btns.forEach(b => b.disabled = true);

    if (idx === qData.a) {
      btn.classList.add('correct');
      score++;
      feedbackDiv.innerHTML = `<span style="color:#2ecc71">Correct!</span> ${qData.exp}`;
    } else {
      btn.classList.add('wrong');
      btns[qData.a].classList.add('correct');
      feedbackDiv.innerHTML = `<span style="color:#e74c3c">Incorrect.</span> ${qData.exp}`;
    }

    nextBtn.style.display = 'inline-block';
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currQ++;
      if (currQ < tQs.length) {
        loadQ();
      } else {
        showTriviaResult();
      }
    });

    qs('#trivia-restart-btn').addEventListener('click', () => {
      currQ = 0;
      score = 0;
      qContainer.style.display = 'block';
      resContainer.style.display = 'none';
      loadQ();
    });
  }

  const showTriviaResult = () => {
    qContainer.style.display = 'none';
    resContainer.style.display = 'block';
    progBar.style.width = '100%';

    let rank = 'Casual Viewer';
    if (score === tQs.length) rank = 'Multiversal Sage';
    else if (score >= tQs.length - 1) rank = 'True Believer';
    else if (score >= 2) rank = 'S.H.I.E.L.D. Agent';

    qs('#trivia-final-score').textContent = `Score: ${score}/${tQs.length}`;
    qs('#trivia-rank-title').textContent = rank;

    const best = storage.get('mch_trivia_best', 0);
    if (score > best) storage.set('mch_trivia_best', score);
    qs('#trivia-best-score').textContent = `Your best: ${Math.max(score, best)}/${tQs.length}`;

    addXP(score * 10, 'Trivia Completed');
  };

  loadQ();

  // --- 9. COSPLAY SHOWCASE & LIGHTBOX ---
  const cosplayData = [
    { id: 'c1', img: 'suit1.png', ts: 1000 },
    { id: 'c2', img: 'suit2.png', ts: 1005 },
    { id: 'c3', img: 'suit3.png', ts: 900 },
    { id: 'c4', img: 'suit4.png', ts: 1100 },
    { id: 'c5', img: 'suit5.png', ts: 1050 }
  ];
  const cosplayVotes = storage.get('mch_cosplay_votes', {}); // { c1: 0 }

  const cGrid = qs('#cosplay-grid');
  const cSort = qs('#cosplay-sort');
  const lightbox = qs('#lightbox');
  const lbImg = qs('#lightbox-img');
  let currentLbIndex = 0;

  const renderCosplay = () => {
    if (!cGrid) return;
    const sortMode = cSort.value;

    const sorted = [...cosplayData].sort((a, b) => {
      const aV = cosplayVotes[a.id] || 0;
      const bV = cosplayVotes[b.id] || 0;
      if (sortMode === 'loved') return bV - aV;
      return b.ts - a.ts;
    });

    cGrid.innerHTML = '';
    sorted.forEach((item, index) => {
      const v = cosplayVotes[item.id] || 0;
      const hasVotedLocally = storage.get(`mch_voted_${item.id}`, false);

      const card = document.createElement('div');
      card.className = 'cosplay-card';
      card.innerHTML = `
        <img src="${item.img}" class="cosplay-img" alt="Cosplay ${item.id}" loading="lazy">
        <div class="cosplay-overlay">
          <div class="cosplay-title">Fan Submission</div>
          <button class="vote-btn ${hasVotedLocally ? 'voted' : ''}" data-id="${item.id}" aria-label="Love this">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span class="v-count">${v}</span>
          </button>
        </div>
      `;

      // Lightbox trigger
      card.querySelector('.cosplay-img').addEventListener('click', () => {
        currentLbIndex = index;
        openLightbox(sorted);
      });

      // Vote trigger
      const vBtn = card.querySelector('.vote-btn');
      vBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!storage.get(`mch_voted_${item.id}`, false)) {
          cosplayVotes[item.id] = (cosplayVotes[item.id] || 0) + 1;
          storage.set('mch_cosplay_votes', cosplayVotes);
          storage.set(`mch_voted_${item.id}`, true);
          vBtn.classList.add('voted');
          vBtn.querySelector('.v-count').textContent = cosplayVotes[item.id];
          addXP(2, 'Loved a Cosplay');
        }
      });

      cGrid.appendChild(card);
    });
  };

  if (cSort) {
    cSort.addEventListener('change', renderCosplay);
    renderCosplay();
  }

  const openLightbox = (sortedData) => {
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    updateLightboxImg(sortedData);

    const handleKey = (e) => {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') nextLb(sortedData);
      if (e.key === 'ArrowLeft') prevLb(sortedData);
    };
    document.addEventListener('keydown', handleKey);
    lightbox.dataset.boundKey = 'true'; // hacky tracker
  };

  const updateLightboxImg = (data) => {
    lbImg.src = data[currentLbIndex].img;
  };

  const closeLb = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  };
  const nextLb = (data) => { currentLbIndex = (currentLbIndex + 1) % data.length; updateLightboxImg(data); };
  const prevLb = (data) => { currentLbIndex = (currentLbIndex - 1 + data.length) % data.length; updateLightboxImg(data); };

  if (lightbox) {
    qs('#lightbox-close').addEventListener('click', closeLb);
    qs('#lightbox-next').addEventListener('click', () => nextLb(cosplayData));
    qs('#lightbox-prev').addEventListener('click', () => prevLb(cosplayData));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
  }

  // --- 9. WEAPON VAULT DRAG & DROP ---
  const weaponsData = {
    'mjolnir': { name: 'Mjolnir', desc: 'Forged from Uru in the heart of a dying star.', pow: 95, dur: 100, org: 'Nidavellir' },
    'stormbreaker': { name: 'Stormbreaker', desc: 'A king\'s weapon. Meant to be the greatest in Asgard.', pow: 100, dur: 100, org: 'Nidavellir' },
    'shield': { name: 'Vibranium Shield', desc: 'Made from a rare Wakandan alloy. Defies the laws of physics.', pow: 60, dur: 100, org: 'Wakanda' },
    'rings': { name: 'Ten Rings', desc: 'Ancient mystical artifacts granting god-like martial prowess.', pow: 90, dur: 95, org: 'Unknown' }
  };

  const weapons = qsa('.weapon-item');
  const scanner = qs('#weapon-scanner');
  const dropzoneTxt = qs('.scanner-dropzone');
  const statsPanel = qs('#scanner-stats');
  const worthAlert = qs('#worth-alert');

  let currentDragId = null;

  weapons.forEach(w => {
    w.addEventListener('dragstart', (e) => {
      const req = parseInt(w.getAttribute('data-req'));
      if (xp < req) {
        e.preventDefault();
        qs('#worth-req').textContent = req;
        worthAlert.style.display = 'block';
        statsPanel.style.display = 'none';
        dropzoneTxt.style.display = 'none';
        setTimeout(() => {
          worthAlert.style.display = 'none';
          dropzoneTxt.style.display = 'block';
        }, 3000);
        return false;
      }
      w.classList.add('dragging');
      currentDragId = w.getAttribute('data-weapon');
      e.dataTransfer.setData('text/plain', currentDragId);
    });
    w.addEventListener('dragend', () => {
      w.classList.remove('dragging');
    });
  });

  if (scanner) {
    scanner.addEventListener('dragover', (e) => {
      e.preventDefault();
      scanner.classList.add('drag-over');
    });
    scanner.addEventListener('dragleave', () => {
      scanner.classList.remove('drag-over');
    });
    scanner.addEventListener('drop', (e) => {
      e.preventDefault();
      scanner.classList.remove('drag-over');
      const weaponId = e.dataTransfer.getData('text/plain');
      if (weaponsData[weaponId]) {
        const d = weaponsData[weaponId];
        qs('#w-name').textContent = d.name;
        qs('#w-desc').textContent = d.desc;
        qs('#w-pow').textContent = d.pow;
        qs('#w-dur').textContent = d.dur;
        qs('#w-org').textContent = d.org;

        dropzoneTxt.style.display = 'none';
        worthAlert.style.display = 'none';
        statsPanel.style.display = 'block';

        addXP(5, 'Inspected Weapon');
      }
    });
  }

  // --- 10. SHIELD TERMINAL (BTM) ---
  const btmSidebar = qs('#btm-sidebar');
  const tName = qs('#term-name');
  const tThreat = qs('#term-threat');
  const tDesc = qs('#term-desc');
  const tImg = qs('#term-img');

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  const decryptEffect = (element, finalTxt) => {
    let iter = 0;
    const iv = setInterval(() => {
      element.textContent = finalTxt.split('').map((c, i) => {
        if (i < iter) return c;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      iter += 1 / 3;
      if (iter >= finalTxt.length) {
        clearInterval(iv);
        element.textContent = finalTxt;
      }
    }, 30);
  };

  if (btmSidebar && typeof CHARACTERS_DB !== 'undefined') {
    btmSidebar.innerHTML = CHARACTERS_DB.map((c, idx) => `
      <button class="term-btn ${idx === 0 ? 'active' : ''}" data-id="${c.id}">Codename: ${c.alias.toUpperCase()}</button>
    `).join('');

    const termBtns = qsa('.term-btn', btmSidebar);

    termBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;
        termBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cId = btn.getAttribute('data-id');
        const data = CHARACTERS_DB.find(c => c.id === cId);
        if (!data) return;

        let imgSrc = typeof CHAR_IMAGES !== 'undefined' ? CHAR_IMAGES[cId] : null;

        tImg.style.opacity = '0.1';
        setTimeout(() => {
          if (imgSrc) {
            tImg.src = imgSrc;
            tImg.style.display = 'block';
          } else {
            // Hide image if none available
            tImg.style.display = 'none';
          }
          tImg.style.opacity = '1';
        }, 300);

        decryptEffect(tName, data.name.toUpperCase());
        decryptEffect(tThreat, data.power.toUpperCase());
        
        let desc = `AFFILIATION: ${data.team} | ORIGIN: ${data.origin} | STATUS: ${data.status}\nABILITIES: ${data.abilities}`;
        if (data.weapons && data.weapons.length > 0 && typeof WEAPONS_DB !== 'undefined') {
          const wNames = data.weapons.map(w => {
            const wo = WEAPONS_DB.find(x => x.id === w);
            return wo ? wo.name : w;
          }).join(', ');
          desc += `\nASSOCIATED ARTIFACTS: ${wNames}`;
        }
        tDesc.textContent = desc;

        addXP(5, 'Decrypted SHIELD File');
      });
    });

    // Initialize first one
    if (termBtns.length > 0) {
      termBtns[0].click();
      termBtns[0].classList.add('active');
    }
  }

  // --- 11. CONTACT FORM ---
  const cForm = qs('#contact-form');
  if (cForm) {
    cForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = cForm.querySelector('button');
      btn.textContent = 'TRANSMITTING...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'TRANSMIT';
        btn.disabled = false;
        cForm.reset();
        qs('#contact-success').style.display = 'block';
        addXP(20, 'Transmitted Intel');
        setTimeout(() => qs('#contact-success').style.display = 'none', 4000);
      }, 1500);
    });
  }

  // --- 12. WEAPON ARSENAL (New) ---
  const aGrid = qs('#arsenal-grid');
  const aSearch = qs('#arsenal-search');
  const aCatFilter = qs('#arsenal-cat-filter');
  const aRarFilter = qs('#arsenal-rarity-filter');
  const eqTarget = qs('#equip-target');
  const eqDrop = qs('#equip-drop');
  const eqResult = qs('#equip-result');
  const eqWorth = qs('#equip-worth');
  const eqFill = qs('#worth-fill');
  const eqLabel = qs('#worth-label');
  const wDetailModal = qs('#weapon-detail-modal');
  const wModalBody = qs('#wmodal-body');
  const eqMobileBtn = qs('#equip-mobile-btn');

  let selectedWeaponId = null; // for mobile equip

  if (aGrid && typeof WEAPONS_DB !== 'undefined') {
    // Populate hero select
    const heroChars = CHARACTERS_DB.filter(c => c.team !== 'Villain');
    eqTarget.innerHTML = heroChars.map(c => `<option value="${c.id}">${c.alias} (${c.name})</option>`).join('');

    const rarityIcons = { Mythic:'⚡', Legendary:'🔶', Epic:'🔮', Rare:'🔹' };

    const renderArsenal = () => {
      const s = aSearch.value.toLowerCase();
      const cf = aCatFilter.value;
      const rf = aRarFilter.value;
      const filtered = WEAPONS_DB.filter(w => {
        const matchSearch = w.name.toLowerCase().includes(s) || w.owner.toLowerCase().includes(s) || w.category.toLowerCase().includes(s);
        const matchCat = cf === 'all' || w.category === cf;
        const matchRar = rf === 'all' || w.rarity === rf;
        return matchSearch && matchCat && matchRar;
      });

      aGrid.innerHTML = filtered.map(w => {
        const isLocked = xp < w.xpReq;
        const borderClass = w.rarity === 'Mythic' ? 'mythic-border' : w.rarity === 'Legendary' ? 'legendary-border' : '';
        return `
          <div class="wcard ${isLocked ? 'locked-card' : ''} ${borderClass}" draggable="true" data-wid="${w.id}">
            <span class="wcard-rarity rarity-${w.rarity.toLowerCase()}">${w.rarity}</span>
            <span class="wcard-icon">${rarityIcons[w.rarity] || '🔹'}</span>
            <h4>${w.name}</h4>
            <p class="wcard-owner">${w.owner}</p>
            <div class="wcard-mini-stats">
              <span>POW ${w.pow}</span>
              <span>DUR ${w.dur}</span>
              <span>NRG ${w.nrg}</span>
            </div>
          </div>`;
      }).join('');

      // Bind events
      aGrid.querySelectorAll('.wcard').forEach(card => {
        card.addEventListener('click', () => {
          openWeaponDetail(card.dataset.wid);
          addXP(2, 'Scanned Artifact');
        });
        card.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', card.dataset.wid);
          card.classList.add('dragging');
          selectedWeaponId = card.dataset.wid;
        });
        card.addEventListener('dragend', () => card.classList.remove('dragging'));
      });
    };

    aSearch.addEventListener('input', renderArsenal);
    aCatFilter.addEventListener('change', renderArsenal);
    aRarFilter.addEventListener('change', renderArsenal);

    // Equip drop zone
    eqDrop.addEventListener('dragenter', e => { e.preventDefault(); });
    eqDrop.addEventListener('dragover', e => { e.preventDefault(); eqDrop.classList.add('drag-over'); });
    eqDrop.addEventListener('dragleave', () => eqDrop.classList.remove('drag-over'));
    eqDrop.addEventListener('drop', e => {
      e.preventDefault();
      eqDrop.classList.remove('drag-over');
      const wid = e.dataTransfer.getData('text/plain');
      handleEquip(wid);
    });

    // Mobile equip
    if (eqMobileBtn) {
      eqMobileBtn.addEventListener('click', () => {
        if (selectedWeaponId) handleEquip(selectedWeaponId);
      });
    }

    const handleEquip = (wid) => {
      const w = WEAPONS_DB.find(x => x.id === wid);
      const cid = eqTarget.value;
      const c = CHARACTERS_DB.find(x => x.id === cid);
      if (!w || !c) return;

      if (xp < w.xpReq) {
        eqResult.textContent = w.worthiness ? 'YOU ARE NOT WORTHY' : 'INSUFFICIENT XP';
        eqResult.className = 'equip-result eq-error';
        eqWorth.style.display = 'block';
        eqFill.style.width = Math.min((xp / w.xpReq) * 100, 100) + '%';
        eqLabel.textContent = `${xp.toLocaleString()} / ${w.xpReq.toLocaleString()} XP`;
        return;
      }

      // Check synergy
      const synergyWeapons = SYNERGIES[cid] || [];
      const hasSynergy = synergyWeapons.includes(wid);

      eqWorth.style.display = 'none';
      if (hasSynergy) {
        eqResult.textContent = `SYNERGY: ${w.name} ↔ ${c.alias}`;
        eqResult.className = 'equip-result eq-synergy';
        addXP(25, `Synergy: ${w.name} + ${c.alias}`);
      } else {
        eqResult.textContent = `${w.name} EQUIPPED → ${c.alias}`;
        eqResult.className = 'equip-result eq-success';
        addXP(10, `Equipped ${w.name}`);
      }
    };

    // Weapon Detail Modal
    const openWeaponDetail = (wid) => {
      const w = WEAPONS_DB.find(x => x.id === wid);
      if (!w) return;
      const isLocked = xp < w.xpReq;
      const worthinessClass = w.worthiness ? (isLocked ? 'locked' : 'unlocked') : '';

      wModalBody.innerHTML = `
        <div class="scan-header">${w.name}</div>
        <div class="scan-sub">${w.owner} — ${w.category}</div>
        <div class="scan-line"><span class="scan-label">RARITY: </span><span class="scan-value rarity-${w.rarity.toLowerCase()}" style="padding:2px 8px;border-radius:4px;">${w.rarity}</span></div>
        <div class="scan-line"><span class="scan-label">TYPE: </span><span class="scan-value">${w.type || 'Artifact'}</span></div>
        <div class="scan-line"><span class="scan-label">RANGE: </span><span class="scan-value">${w.range}</span></div>

        <div class="scan-stats">
          <div class="scan-stat-row"><label>Power</label><div class="sbar"><div class="sfill" style="width:0%" data-w="${w.pow}"></div></div><span class="sval">${w.pow}</span></div>
          <div class="scan-stat-row"><label>Durability</label><div class="sbar"><div class="sfill" style="width:0%" data-w="${w.dur}"></div></div><span class="sval">${w.dur}</span></div>
          <div class="scan-stat-row"><label>Energy</label><div class="sbar"><div class="sfill" style="width:0%" data-w="${w.nrg}"></div></div><span class="sval">${w.nrg}</span></div>
        </div>

        <div class="scan-section">
          <h4>Special Ability</h4>
          <p>${w.special}</p>
        </div>

        <div class="scan-section">
          <h4>Origin</h4>
          <p>${w.origin}</p>
        </div>

        <div class="scan-section">
          <h4>Lore</h4>
          <p>${isLocked ? '<em style="color:var(--text-muted);">[ CLASSIFIED — Earn ' + w.xpReq.toLocaleString() + ' XP to decrypt ]</em>' : w.lore}</p>
        </div>

        <div class="scan-section">
          <h4>Known Wielders</h4>
          <div class="scan-wielders">
            ${(w.wielders || []).map(name => `<span class="scan-wielder">${name}</span>`).join('')}
          </div>
        </div>

        ${w.worthiness ? `
        <div class="scan-worthiness ${worthinessClass}">
          <h4>${isLocked ? '⚠ WORTHINESS LOCKED' : '✓ WORTHINESS UNLOCKED'}</h4>
          <p style="font-size:0.9rem;color:var(--text-muted);">XP Required: ${w.xpReq.toLocaleString()}</p>
          <div class="scan-worth-bar"><div class="scan-worth-fill" style="width:0%" data-w="${Math.min((xp/w.xpReq)*100,100)}"></div></div>
          <p style="font-size:0.85rem;color:${isLocked ? 'var(--marvel-red)' : 'var(--accent-cyan)'};">${xp.toLocaleString()} / ${w.xpReq.toLocaleString()} XP</p>
        </div>` : `
        <div class="scan-line" style="margin-top:15px;"><span class="scan-label">XP REQUIRED: </span><span class="scan-value">${w.xpReq.toLocaleString()}</span></div>
        `}

        <div class="scan-section" style="margin-top:20px;">
          <h4>Compatibility</h4>
          <div class="scan-wielders">
            ${CHARACTERS_DB.filter(c => {
              const sw = SYNERGIES[c.id] || [];
              return sw.includes(wid);
            }).map(c => `<span class="scan-wielder" style="background:rgba(0,230,255,0.1);border-color:var(--accent-cyan);">${c.alias} — COMPATIBLE</span>`).join('') || '<span style="color:var(--text-muted);">No specific synergies detected</span>'}
          </div>
        </div>
      `;

      wDetailModal.hidden = false;
      // Animate stat bars
      setTimeout(() => {
        wModalBody.querySelectorAll('.sfill[data-w], .scan-worth-fill[data-w]').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
      }, 50);
    };

    // Close modals
    wDetailModal.querySelector('.wmodal-close').addEventListener('click', () => wDetailModal.hidden = true);
    wDetailModal.addEventListener('click', e => { if (e.target === wDetailModal) wDetailModal.hidden = true; });

    // Expose for cross-section navigation
    window.openWeaponDetail = openWeaponDetail;

    renderArsenal();
  }

});

