
const CHAR_IMAGES = {
  'iron-man':       'iron.png',
  'captain-america':'captain.png',
  'thor':           'thor.png',
  'spider-man':     'spider.png',
  'thanos':         'thanos.png',
  'loki':           'loki.jpg',
  'red-skull':      'redskull.png',
  'black-panther':  'suit2.png',
  'doctor-strange': 'movie4.jpg',
  'moon-knight':    'series1.jpg',
  'daredevil':      'series2.jpg',
  'punisher':       'series3.jpg',
  'peter-parker':   'peter.png',
  'tony-stark':     'tony.png',
  'steve-rogers':   'steve.png',
};

// --- WEAPONS DATABASE ---
const WEAPONS_DB = [
  // === ASGARD ===
  { id:'mjolnir', name:'Mjolnir', owner:'Thor', category:'Asgard', rarity:'Mythic', pow:95, dur:100, nrg:80, range:'Melee / Thrown', special:'Worthiness Enchantment — only the worthy may lift', lore:'Forged from Uru metal in the heart of a dying star by Eitri and the Dwarves of Nidavellir. Enchanted by Odin with a worthiness spell.', wielders:['Thor','Captain America','Vision','Jane Foster','Beta Ray Bill'], xpReq:5000, worthiness:true, origin:'Nidavellir' },
  { id:'stormbreaker', name:'Stormbreaker', owner:'Thor', category:'Asgard', rarity:'Mythic', pow:100, dur:100, nrg:95, range:'Melee / Thrown / Bifrost', special:'Bifrost Summoning — opens portals across realms', lore:'A king\'s weapon. Forged by Eitri at the cost of a dying star\'s output. Capable of channeling the Bifrost Bridge.', wielders:['Thor','Groot'], xpReq:7500, worthiness:true, origin:'Nidavellir' },
  { id:'gungnir', name:'Gungnir', owner:'Odin', category:'Asgard', rarity:'Legendary', pow:90, dur:95, nrg:85, range:'Melee / Ranged', special:'Energy projection, ruler\'s authority', lore:'The spear of Odin, symbol of the Allfather\'s dominion over the Nine Realms.', wielders:['Odin','Loki'], xpReq:4000, worthiness:false, origin:'Asgard' },
  { id:'hofund', name:'Hofund', owner:'Heimdall', category:'Asgard', rarity:'Legendary', pow:80, dur:90, nrg:90, range:'Melee / Bifrost Key', special:'Activates and controls the Bifrost Bridge', lore:'The sword of the all-seeing guardian, key to the Bifrost.', wielders:['Heimdall'], xpReq:3000, worthiness:false, origin:'Asgard' },
  { id:'destroyer-armor', name:'Destroyer Armor', owner:'Odin', category:'Asgard', rarity:'Legendary', pow:95, dur:98, nrg:90, range:'Ranged / Area', special:'Devastating energy blasts from visor', lore:'An enchanted Asgardian suit of armor, animated by the Odinforce to defend Asgard.', wielders:['Odin','Loki (controller)'], xpReq:5000, worthiness:false, origin:'Asgard' },
  { id:'odin-spear', name:'Odin\'s Spear', owner:'Odin', category:'Asgard', rarity:'Epic', pow:85, dur:90, nrg:80, range:'Melee', special:'Odinforce channeling', lore:'A ceremonial weapon of the Allfather, distinct from Gungnir in its older design.', wielders:['Odin'], xpReq:3500, worthiness:false, origin:'Asgard' },
  { id:'necrosword', name:'Necrosword (All-Black)', owner:'Gorr', category:'Asgard', rarity:'Mythic', pow:98, dur:95, nrg:100, range:'Variable — extends and reshapes', special:'God-killing — fatal to divine beings', lore:'The first symbiote, forged from the shadow of the god Knull. Wielded by Gorr the God Butcher.', wielders:['Knull','Gorr','Thor'], xpReq:8000, worthiness:false, origin:'Primordial Darkness' },
  { id:'eternal-flame', name:'Eternal Flame', owner:'Odin / Surtur', category:'Asgard', rarity:'Mythic', pow:100, dur:100, nrg:100, range:'Realm-wide', special:'Ragnarök initiation — resurrects Surtur', lore:'The Eternal Flame of Muspelheim, capable of resurrecting Surtur at full power and triggering Ragnarök.', wielders:['Surtur','Odin','Hela'], xpReq:9000, worthiness:false, origin:'Muspelheim' },

  // === AVENGERS ===
  { id:'cap-shield', name:'Captain America\'s Shield', owner:'Captain America', category:'Avengers', rarity:'Legendary', pow:60, dur:100, nrg:10, range:'Melee / Thrown', special:'Vibranium shock absorption — virtually indestructible', lore:'Created by Howard Stark from a unique Vibranium alloy during WWII. Defies the laws of physics.', wielders:['Steve Rogers','Sam Wilson','Bucky Barnes'], xpReq:1500, worthiness:false, origin:'Wakanda / USA' },
  { id:'arc-reactor', name:'Arc Reactor', owner:'Iron Man', category:'Avengers', rarity:'Epic', pow:80, dur:70, nrg:100, range:'Self / Suit Power', special:'Clean energy generation — powers all Iron Man tech', lore:'Miniaturized arc reactor, initially built in a cave with a box of scraps. Later refined with Vibranium.', wielders:['Tony Stark'], xpReq:1000, worthiness:false, origin:'Stark Industries' },
  { id:'repulsors', name:'Repulsors', owner:'Iron Man', category:'Avengers', rarity:'Epic', pow:75, dur:65, nrg:80, range:'Ranged', special:'Concussive energy blasts from palms', lore:'Standard weapon system integrated into every Iron Man suit.', wielders:['Tony Stark','War Machine','Rescue'], xpReq:800, worthiness:false, origin:'Stark Industries' },
  { id:'iron-man-armor', name:'Iron Man Armor (Mark L)', owner:'Iron Man', category:'Avengers', rarity:'Legendary', pow:90, dur:85, nrg:95, range:'Variable', special:'Nanotech morphing — forms any weapon on demand', lore:'Bleeding-edge nanoparticle suit stored in a housing unit on Tony\'s chest.', wielders:['Tony Stark'], xpReq:3000, worthiness:false, origin:'Stark Industries' },
  { id:'hulkbuster', name:'Hulkbuster Armor (Veronica)', owner:'Iron Man', category:'Avengers', rarity:'Legendary', pow:95, dur:95, nrg:90, range:'Melee / Heavy', special:'Designed specifically to contain the Hulk', lore:'Deployed from an orbital satellite (Veronica), designed jointly by Stark and Banner.', wielders:['Tony Stark','Bruce Banner'], xpReq:4000, worthiness:false, origin:'Stark Industries' },
  { id:'nano-gauntlet', name:'Nano Gauntlet', owner:'Iron Man / Hulk', category:'Avengers', rarity:'Mythic', pow:100, dur:50, nrg:100, range:'Universal', special:'Channels the Infinity Stones safely', lore:'Built by Tony Stark to harness the Infinity Stones without the original Gauntlet.', wielders:['Bruce Banner','Tony Stark'], xpReq:9500, worthiness:false, origin:'Stark Industries' },
  { id:'hawkeye-bow', name:'Hawkeye\'s Bow', owner:'Hawkeye', category:'Avengers', rarity:'Rare', pow:55, dur:60, nrg:10, range:'Ranged', special:'Precision targeting — never misses', lore:'Custom-built compound and recurve bows used by Clint Barton.', wielders:['Clint Barton','Kate Bishop'], xpReq:500, worthiness:false, origin:'S.H.I.E.L.D.' },
  { id:'trick-arrows', name:'Trick Arrows', owner:'Hawkeye', category:'Avengers', rarity:'Rare', pow:65, dur:40, nrg:30, range:'Ranged', special:'Explosive, EMP, grapple, sonic, Pym-tech variants', lore:'Specialized arrowheads designed for every tactical scenario.', wielders:['Clint Barton','Kate Bishop'], xpReq:600, worthiness:false, origin:'S.H.I.E.L.D. / Stark Tech' },
  { id:'widow-batons', name:'Black Widow\'s Batons', owner:'Black Widow', category:'Avengers', rarity:'Rare', pow:50, dur:65, nrg:30, range:'Melee', special:'Electrified close-quarters combat', lore:'Collapsible electrified batons, standard issue Red Room equipment upgraded by Stark.', wielders:['Natasha Romanoff','Yelena Belova'], xpReq:400, worthiness:false, origin:'Red Room / Stark Tech' },
  { id:'widow-bite', name:'Widow\'s Bite', owner:'Black Widow', category:'Avengers', rarity:'Rare', pow:55, dur:60, nrg:45, range:'Short Ranged', special:'Electroshock projectiles', lore:'Wrist-mounted electroshock weapon. Modified multiple times with Stark technology.', wielders:['Natasha Romanoff','Yelena Belova'], xpReq:400, worthiness:false, origin:'Red Room' },
  { id:'ant-man-suit', name:'Ant-Man Suit', owner:'Ant-Man', category:'Avengers', rarity:'Epic', pow:70, dur:65, nrg:80, range:'Variable', special:'Pym Particle size manipulation', lore:'Utilizes Pym Particles to shrink to subatomic size or grow to giant proportions.', wielders:['Hank Pym','Scott Lang'], xpReq:2000, worthiness:false, origin:'Pym Technologies' },
  { id:'wasp-suit', name:'Wasp Suit', owner:'Wasp', category:'Avengers', rarity:'Epic', pow:70, dur:65, nrg:85, range:'Variable / Flight', special:'Pym Particles + bio-electric stingers + flight', lore:'Advanced version of the Ant-Man suit with integrated wings and energy blasters.', wielders:['Janet van Dyne','Hope van Dyne'], xpReq:2000, worthiness:false, origin:'Pym Technologies' },

  // === WAKANDA ===
  { id:'bp-suit', name:'Black Panther Vibranium Suit', owner:'Black Panther', category:'Wakanda', rarity:'Legendary', pow:80, dur:95, nrg:75, range:'Melee', special:'Kinetic energy absorption and redistribution', lore:'Vibranium-weave suit that absorbs kinetic energy and can release it as a shockwave.', wielders:['T\'Challa','Shuri','Killmonger'], xpReq:2500, worthiness:false, origin:'Wakanda' },
  { id:'golden-jaguar', name:'Golden Jaguar Suit', owner:'Killmonger', category:'Wakanda', rarity:'Epic', pow:80, dur:90, nrg:70, range:'Melee', special:'Kinetic redistribution — gold Vibranium variant', lore:'Killmonger\'s variant of the Panther Habit, with gold Vibranium accents.', wielders:['Erik Killmonger'], xpReq:2500, worthiness:false, origin:'Wakanda' },
  { id:'kimoyo-beads', name:'Kimoyo Beads', owner:'Wakanda', category:'Wakanda', rarity:'Rare', pow:30, dur:80, nrg:90, range:'Communication / Utility', special:'Holographic interface, communication, medical scanning', lore:'Advanced Vibranium-powered communication and utility technology, standard issue in Wakanda.', wielders:['T\'Challa','Shuri','Okoye'], xpReq:500, worthiness:false, origin:'Wakanda' },
  { id:'vibranium-spear', name:'Vibranium Weapons', owner:'Dora Milaje', category:'Wakanda', rarity:'Epic', pow:70, dur:95, nrg:50, range:'Melee / Thrown', special:'Sonic disruption and energy channeling', lore:'Spears and weapons forged from Vibranium by Wakandan weapon-smiths.', wielders:['Okoye','Dora Milaje'], xpReq:1500, worthiness:false, origin:'Wakanda' },

  // === SHANG-CHI ===
  { id:'ten-rings', name:'Ten Rings', owner:'Shang-Chi', category:'Mystic', rarity:'Legendary', pow:90, dur:95, nrg:95, range:'Variable', special:'Immortality, energy manipulation, concussive force', lore:'Ten mystical rings of unknown origin, granting their wielder immortality and devastating power.', wielders:['Xu Wenwu','Shang-Chi'], xpReq:3500, worthiness:false, origin:'Unknown — pre-history' },

  // === DOCTOR STRANGE ===
  { id:'eye-agamotto', name:'Eye of Agamotto', owner:'Doctor Strange', category:'Mystic', rarity:'Mythic', pow:90, dur:90, nrg:100, range:'Variable', special:'Time manipulation — housed the Time Stone', lore:'Ancient relic that housed the Time Stone for centuries, allowing its wearer to manipulate time.', wielders:['Agamotto','Ancient One','Doctor Strange'], xpReq:6000, worthiness:false, origin:'Kamar-Taj' },
  { id:'cloak-levitation', name:'Cloak of Levitation', owner:'Doctor Strange', category:'Mystic', rarity:'Epic', pow:30, dur:80, nrg:50, range:'Self / Flight', special:'Sentient flight and defensive wrapping', lore:'A sentient relic that chose Stephen Strange. Provides flight and has a mind of its own.', wielders:['Doctor Strange'], xpReq:1500, worthiness:false, origin:'Kamar-Taj' },
  { id:'sling-ring', name:'Sling Ring', owner:'Masters of the Mystic Arts', category:'Mystic', rarity:'Rare', pow:20, dur:50, nrg:70, range:'Interdimensional', special:'Opens dimensional portals', lore:'A ring used by sorcerers to open gateways between locations and dimensions.', wielders:['Doctor Strange','Wong','Ancient One','America Chavez'], xpReq:500, worthiness:false, origin:'Kamar-Taj' },

  // === INFINITY ===
  { id:'infinity-gauntlet', name:'Infinity Gauntlet', owner:'Thanos', category:'Infinity', rarity:'Mythic', pow:100, dur:100, nrg:100, range:'Universal', special:'Channels all six Infinity Stones — omnipotence', lore:'Forged by Eitri under duress to channel the combined power of all six Infinity Stones.', wielders:['Thanos','Hulk','Iron Man'], xpReq:10000, worthiness:false, origin:'Nidavellir' },
  { id:'space-stone', name:'Space Stone', owner:'—', category:'Infinity', rarity:'Mythic', pow:95, dur:100, nrg:100, range:'Universal', special:'Teleportation, portal creation, spatial manipulation', lore:'One of six Infinity Stones. Housed in the Tesseract. Controls all of space.', wielders:['Red Skull','Loki','Thanos'], xpReq:8000, worthiness:false, origin:'Big Bang' },
  { id:'mind-stone', name:'Mind Stone', owner:'—', category:'Infinity', rarity:'Mythic', pow:90, dur:100, nrg:100, range:'Psychic / Universal', special:'Mind control, consciousness creation, telepathy', lore:'Gave sentience to Vision. Housed in Loki\'s Scepter and later Vision\'s forehead.', wielders:['Loki','Vision','Thanos'], xpReq:8000, worthiness:false, origin:'Big Bang' },
  { id:'reality-stone', name:'Reality Stone', owner:'—', category:'Infinity', rarity:'Mythic', pow:95, dur:100, nrg:100, range:'Universal', special:'Reality warping — converts matter and energy at will', lore:'Also known as the Aether. Turns matter into dark matter. Used by Malekith and Thanos.', wielders:['Malekith','The Collector','Thanos'], xpReq:8000, worthiness:false, origin:'Big Bang' },
  { id:'power-stone', name:'Power Stone', owner:'—', category:'Infinity', rarity:'Mythic', pow:100, dur:100, nrg:100, range:'Planetary', special:'Destructive energy — can annihilate planets', lore:'Housed in the Orb. Its raw power can destroy anything it touches without a container.', wielders:['Eson the Searcher','Ronan','Star-Lord','Thanos'], xpReq:8000, worthiness:false, origin:'Big Bang' },
  { id:'time-stone', name:'Time Stone', owner:'—', category:'Infinity', rarity:'Mythic', pow:90, dur:100, nrg:100, range:'Temporal / Universal', special:'Time manipulation — loops, reversal, aging', lore:'Housed in the Eye of Agamotto. Controls the flow of time itself.', wielders:['Agamotto','Doctor Strange','Thanos'], xpReq:8000, worthiness:false, origin:'Big Bang' },
  { id:'soul-stone', name:'Soul Stone', owner:'—', category:'Infinity', rarity:'Mythic', pow:85, dur:100, nrg:100, range:'Metaphysical', special:'Controls souls — access to the Soul World', lore:'Requires the sacrifice of a loved one on Vormir to obtain. Controls the essence of living beings.', wielders:['Thanos','Hawkeye/Black Widow (sacrifice)'], xpReq:8000, worthiness:false, origin:'Big Bang / Vormir' },

  // === GUARDIANS ===
  { id:'element-guns', name:'Star-Lord\'s Element Guns', owner:'Star-Lord', category:'Guardians', rarity:'Rare', pow:60, dur:55, nrg:65, range:'Ranged', special:'Dual blasters with elemental ammunition', lore:'Quad Blasters customized by Peter Quill. Versatile ranged weaponry.', wielders:['Star-Lord'], xpReq:600, worthiness:false, origin:'Ravager Tech' },
  { id:'yaka-arrow', name:'Yondu\'s Yaka Arrow', owner:'Yondu', category:'Guardians', rarity:'Legendary', pow:85, dur:70, nrg:50, range:'Long Range', special:'Whistle-controlled — lethal precision via sound', lore:'Forged from Yaka metal on Centauri-IV. Controlled entirely by whistling.', wielders:['Yondu Udonta'], xpReq:2500, worthiness:false, origin:'Centauri-IV' },
  { id:'rocket-weapons', name:'Rocket\'s Arsenal', owner:'Rocket', category:'Guardians', rarity:'Rare', pow:70, dur:50, nrg:60, range:'Ranged / Heavy', special:'Improvised heavy ordnance and gadgets', lore:'Rocket builds devastating weapons from salvaged parts, including hadron enforcers.', wielders:['Rocket Raccoon'], xpReq:700, worthiness:false, origin:'Various / Improvised' },
  { id:'groot-abilities', name:'Groot\'s Biological Weapons', owner:'Groot', category:'Guardians', rarity:'Epic', pow:75, dur:80, nrg:40, range:'Melee / Variable', special:'Limb extension, shield generation, regeneration', lore:'As a Flora Colossus, Groot can extend and reshape his body into weapons and shields.', wielders:['Groot'], xpReq:1000, worthiness:false, origin:'Planet X' },

  // === SPIDER-MAN ===
  { id:'web-shooters', name:'Web Shooters', owner:'Spider-Man', category:'Spider-Man', rarity:'Rare', pow:40, dur:50, nrg:10, range:'Ranged', special:'Synthetic webbing — swing, trap, bind', lore:'Designed by Peter Parker in his bedroom. Later upgraded with Stark tech.', wielders:['Peter Parker','Miles Morales'], xpReq:500, worthiness:false, origin:'Peter Parker\'s Lab' },
  { id:'iron-spider', name:'Iron Spider Suit', owner:'Spider-Man', category:'Spider-Man', rarity:'Epic', pow:75, dur:80, nrg:70, range:'Melee / Ranged', special:'Nanotech waldoes (spider-legs), instant kill mode', lore:'Nanotech suit designed by Tony Stark. Features four mechanical spider-legs.', wielders:['Peter Parker'], xpReq:2000, worthiness:false, origin:'Stark Industries' },
  { id:'spidey-suit', name:'Spider-Man Suit', owner:'Spider-Man', category:'Spider-Man', rarity:'Rare', pow:45, dur:50, nrg:15, range:'Melee', special:'Enhanced mobility, web-wings, Karen AI', lore:'Advanced suit designed by Tony Stark with AI assistant and 576 web-shooter combinations.', wielders:['Peter Parker'], xpReq:300, worthiness:false, origin:'Stark Industries' },
  { id:'spider-tracer', name:'Spider-Tracer', owner:'Spider-Man', category:'Spider-Man', rarity:'Rare', pow:10, dur:30, nrg:20, range:'Tracking', special:'GPS tracking tied to Spider-Sense frequency', lore:'Miniature tracking devices that Spider-Man can sense through his Spider-Sense.', wielders:['Peter Parker'], xpReq:200, worthiness:false, origin:'Peter Parker\'s Lab' },

  // === X-MEN ===
  { id:'adamantium-claws', name:'Wolverine\'s Adamantium Claws', owner:'Wolverine', category:'X-Men', rarity:'Legendary', pow:85, dur:100, nrg:0, range:'Melee', special:'Indestructible — cuts through virtually anything', lore:'Grafted to Logan\'s skeleton by the Weapon X program. Can cut through almost any material.', wielders:['Wolverine','X-23'], xpReq:2000, worthiness:false, origin:'Weapon X' },
  { id:'cerebro', name:'Cerebro', owner:'Professor X', category:'X-Men', rarity:'Legendary', pow:60, dur:70, nrg:95, range:'Global / Psychic', special:'Amplifies telepathy to detect every mutant on Earth', lore:'Designed by Charles Xavier and Magneto to amplify psychic abilities.', wielders:['Professor X','Jean Grey'], xpReq:4000, worthiness:false, origin:'Xavier\'s School' },
  { id:'dp-katanas', name:'Deadpool\'s Katanas', owner:'Deadpool', category:'X-Men', rarity:'Rare', pow:55, dur:60, nrg:0, range:'Melee', special:'Maximum effort slicing', lore:'Twin katanas. Nothing special about them except who wields them.', wielders:['Deadpool'], xpReq:300, worthiness:false, origin:'Various' },
  { id:'dp-pistols', name:'Deadpool\'s Dual Pistols', owner:'Deadpool', category:'X-Men', rarity:'Rare', pow:50, dur:50, nrg:10, range:'Ranged', special:'Unlimited ammo (fourth wall privileges)', lore:'Standard firearms wielded with superhuman accuracy and comedic timing.', wielders:['Deadpool'], xpReq:300, worthiness:false, origin:'Various' },
  { id:'magneto-helmet', name:'Magneto\'s Helmet', owner:'Magneto', category:'X-Men', rarity:'Epic', pow:20, dur:90, nrg:60, range:'Self / Psychic Defense', special:'Blocks all telepathic intrusion', lore:'Helmet designed to block Xavier\'s telepathy. Forged from a non-metallic psychic-dampening alloy.', wielders:['Magneto'], xpReq:2500, worthiness:false, origin:'Unknown' },

  // === STREET-LEVEL ===
  { id:'dd-batons', name:'Daredevil\'s Billy Clubs', owner:'Daredevil', category:'Street', rarity:'Rare', pow:45, dur:60, nrg:5, range:'Melee / Thrown', special:'Grappling line, thrown projectile, blunt weapons', lore:'Custom billy clubs that split, combine, and feature a grappling cable.', wielders:['Matt Murdock'], xpReq:300, worthiness:false, origin:'Matt Murdock' },
  { id:'punisher-arsenal', name:'Punisher\'s Arsenal', owner:'Punisher', category:'Street', rarity:'Rare', pow:70, dur:50, nrg:10, range:'Ranged / Heavy', special:'Military-grade tactical weapons loadout', lore:'Frank Castle\'s extensive armory of military-grade firearms and explosives.', wielders:['Frank Castle'], xpReq:400, worthiness:false, origin:'Military' },
  { id:'moon-darts', name:'Crescent Darts', owner:'Moon Knight', category:'Street', rarity:'Rare', pow:50, dur:55, nrg:10, range:'Thrown', special:'Crescent-shaped throwing weapons', lore:'Moon-shaped projectiles used by the Fist of Khonshu.', wielders:['Marc Spector'], xpReq:300, worthiness:false, origin:'Khonshu' },
  { id:'moon-staff', name:'Moon Knight\'s Staff', owner:'Moon Knight', category:'Street', rarity:'Rare', pow:55, dur:60, nrg:15, range:'Melee', special:'Collapsible trident-staff', lore:'A ceremonial weapon channeling Khonshu\'s power.', wielders:['Marc Spector'], xpReq:400, worthiness:false, origin:'Khonshu' },

  // === OTHER MARVEL ===
  { id:'ghost-chain', name:'Ghost Rider\'s Chain', owner:'Ghost Rider', category:'Supernatural', rarity:'Legendary', pow:85, dur:80, nrg:90, range:'Melee / Ranged', special:'Hellfire-infused — burns the soul', lore:'A chain imbued with hellfire that can extend to any length and burns through any material.', wielders:['Johnny Blaze','Robbie Reyes'], xpReq:3000, worthiness:false, origin:'Hell / Spirit of Vengeance' },
  { id:'blade-sword', name:'Blade\'s Sword', owner:'Blade', category:'Supernatural', rarity:'Epic', pow:70, dur:75, nrg:30, range:'Melee', special:'Silver-titanium alloy — lethal to vampires', lore:'A daywalker\'s primary weapon, designed to destroy the undead.', wielders:['Blade'], xpReq:1500, worthiness:false, origin:'Blade' },
  { id:'loki-scepter', name:'Loki\'s Scepter', owner:'Loki', category:'Asgard', rarity:'Legendary', pow:80, dur:75, nrg:90, range:'Melee / Ranged', special:'Mind control via Mind Stone', lore:'Given to Loki by Thanos. Housed the Mind Stone and allowed Loki to control minds.', wielders:['Loki','Baron Strucker'], xpReq:3000, worthiness:false, origin:'Thanos / Mind Stone' },
  { id:'darkhold', name:'Darkhold', owner:'—', category:'Mystic', rarity:'Mythic', pow:95, dur:50, nrg:100, range:'Metaphysical / Universal', special:'Dark magic — corrupts the reader absolutely', lore:'The Book of the Damned, inscribed by Chthon. Contains the darkest spells in existence.', wielders:['Scarlet Witch','Agatha Harkness','Morgan le Fay'], xpReq:7000, worthiness:false, origin:'Chthon / Mount Wundagore' },
  { id:'ebony-blade', name:'Ebony Blade', owner:'Black Knight', category:'Mystic', rarity:'Legendary', pow:85, dur:95, nrg:60, range:'Melee', special:'Cuts through any substance, absorbs energy — but curses wielder with bloodlust', lore:'Forged from a meteorite by Merlin. Cursed to drive its wielder to violence.', wielders:['Dane Whitman','Black Knight lineage'], xpReq:3500, worthiness:false, origin:'Camelot / Merlin' },
  { id:'surfer-board', name:'Silver Surfer\'s Board', owner:'Silver Surfer', category:'Cosmic', rarity:'Mythic', pow:90, dur:100, nrg:100, range:'Cosmic / FTL Travel', special:'Faster-than-light travel, cosmic energy channeling', lore:'A construct of the Power Cosmic, mentally linked to Norrin Radd.', wielders:['Silver Surfer'], xpReq:6000, worthiness:false, origin:'Power Cosmic / Galactus' },
  { id:'mysterio-tech', name:'Mysterio\'s Illusion Tech (B.A.R.F.)', owner:'Mysterio', category:'Tech', rarity:'Epic', pow:50, dur:40, nrg:80, range:'Area / City-wide', special:'Holographic illusion projection, drone army', lore:'Modified B.A.R.F. tech from Stark Industries combined with combat drones.', wielders:['Quentin Beck'], xpReq:1200, worthiness:false, origin:'Stark Industries (stolen)' },
  { id:'chitauri-scepter', name:'Chitauri Scepter', owner:'Thanos Army', category:'Alien', rarity:'Epic', pow:65, dur:55, nrg:70, range:'Ranged', special:'Energy blasts, Chitauri army command', lore:'Weapon technology used by the Chitauri invasion force during the Battle of New York.', wielders:['Chitauri'], xpReq:800, worthiness:false, origin:'Chitauri Homeworld' },
  { id:'ff-tech', name:'Fantastic Four Technology', owner:'Reed Richards', category:'Tech', rarity:'Epic', pow:60, dur:70, nrg:90, range:'Variable', special:'Unstable molecule suits, dimensional tech', lore:'Advanced technology developed by Reed Richards including unstable molecule uniforms.', wielders:['Fantastic Four'], xpReq:2000, worthiness:false, origin:'Baxter Building' },
];

// Synergy map: character_id -> weapon_id pairs that trigger "SYNERGY DETECTED"
const SYNERGIES = {
  'thor':       ['mjolnir','stormbreaker','gungnir'],
  'iron-man':   ['arc-reactor','iron-man-armor','repulsors','nano-gauntlet','hulkbuster'],
  'captain-america': ['cap-shield'],
  'black-panther':   ['bp-suit','kimoyo-beads','vibranium-spear'],
  'doctor-strange':  ['eye-agamotto','cloak-levitation','sling-ring'],
  'spider-man':      ['web-shooters','iron-spider','spidey-suit','spider-tracer'],
  'shang-chi':       ['ten-rings'],
  'thanos':          ['infinity-gauntlet','space-stone','mind-stone','reality-stone','power-stone','time-stone','soul-stone'],
  'wolverine':       ['adamantium-claws'],
  'deadpool':        ['dp-katanas','dp-pistols'],
  'daredevil':       ['dd-batons'],
  'punisher':        ['punisher-arsenal'],
  'moon-knight':     ['moon-darts','moon-staff'],
  'ghost-rider':     ['ghost-chain'],
  'blade':           ['blade-sword'],
  'loki':            ['loki-scepter','gungnir'],
  'star-lord':       ['element-guns'],
  'hawkeye':         ['hawkeye-bow','trick-arrows'],
  'black-widow':     ['widow-batons','widow-bite'],
  'ant-man':         ['ant-man-suit'],
  'wasp':            ['wasp-suit'],
  'scarlet-witch':   ['darkhold'],
  'black-knight':    ['ebony-blade'],
  'silver-surfer':   ['surfer-board'],
};

// --- CHARACTERS DATABASE ---
const CHARACTERS_DB = [
  // === AVENGERS ===
  { id:'iron-man', name:'Tony Stark', alias:'Iron Man', team:'Avengers', power:'High', abilities:'Genius intellect, Powered armor, Engineering', origin:'Earth', status:'Deceased', weapons:['arc-reactor','iron-man-armor','repulsors','hulkbuster','nano-gauntlet'] },
  { id:'captain-america', name:'Steve Rogers', alias:'Captain America', team:'Avengers', power:'Enhanced', abilities:'Super soldier serum, Master tactician, Shield combat', origin:'Earth', status:'Retired', weapons:['cap-shield'] },
  { id:'cap-sam', name:'Sam Wilson', alias:'Captain America', team:'Avengers', power:'Enhanced', abilities:'Flight, Shield combat, Military training', origin:'Earth', status:'Active', weapons:['cap-shield'] },
  { id:'thor', name:'Thor Odinson', alias:'God of Thunder', team:'Avengers', power:'Omega', abilities:'Lightning manipulation, Super strength, Longevity', origin:'Asgard', status:'Active', weapons:['mjolnir','stormbreaker'] },
  { id:'hulk', name:'Bruce Banner', alias:'Hulk', team:'Avengers', power:'Omega', abilities:'Unlimited strength, Gamma radiation, Regeneration', origin:'Earth', status:'Active', weapons:['nano-gauntlet'] },
  { id:'she-hulk', name:'Jennifer Walters', alias:'She-Hulk', team:'Avengers', power:'High', abilities:'Super strength, Legal expertise, Fourth wall awareness', origin:'Earth', status:'Active', weapons:[] },
  { id:'black-widow', name:'Natasha Romanoff', alias:'Black Widow', team:'Avengers', power:'Normal', abilities:'Master spy, Martial artist, Infiltration', origin:'Earth', status:'Deceased', weapons:['widow-batons','widow-bite'] },
  { id:'hawkeye', name:'Clint Barton', alias:'Hawkeye', team:'Avengers', power:'Normal', abilities:'Master archer, Swordsmanship, Marksmanship', origin:'Earth', status:'Retired', weapons:['hawkeye-bow','trick-arrows'] },
  { id:'kate-bishop', name:'Kate Bishop', alias:'Hawkeye', team:'Avengers', power:'Normal', abilities:'Archery, Martial arts, Detective skills', origin:'Earth', status:'Active', weapons:['hawkeye-bow','trick-arrows'] },
  { id:'spider-man', name:'Peter Parker', alias:'Spider-Man', team:'Avengers', power:'High', abilities:'Wall-crawling, Spider-sense, Super strength', origin:'Earth', status:'Active', weapons:['web-shooters','iron-spider','spidey-suit'] },
  { id:'miles-morales', name:'Miles Morales', alias:'Spider-Man', team:'Avengers', power:'High', abilities:'Wall-crawling, Venom blast, Invisibility', origin:'Earth', status:'Active', weapons:['web-shooters'] },
  { id:'scarlet-witch', name:'Wanda Maximoff', alias:'Scarlet Witch', team:'Avengers', power:'Omega', abilities:'Chaos magic, Reality warping, Telepathy', origin:'Sokovia', status:'Unknown', weapons:['darkhold'] },
  { id:'vision', name:'Vision', alias:'Vision', team:'Avengers', power:'High', abilities:'Density manipulation, Mind Stone energy, Flight', origin:'Synthetic', status:'Deceased', weapons:['mind-stone'] },
  { id:'war-machine', name:'James Rhodes', alias:'War Machine', team:'Avengers', power:'High', abilities:'Powered armor, Military combat, Heavy ordnance', origin:'Earth', status:'Active', weapons:['repulsors'] },
  { id:'falcon', name:'Sam Wilson', alias:'Falcon', team:'Avengers', power:'Normal', abilities:'Flight, Redwing drone, Military training', origin:'Earth', status:'Active', weapons:[] },
  { id:'winter-soldier', name:'Bucky Barnes', alias:'Winter Soldier', team:'Avengers', power:'Enhanced', abilities:'Vibranium arm, Enhanced strength, Assassin training', origin:'Earth', status:'Active', weapons:[] },
  { id:'ant-man', name:'Scott Lang', alias:'Ant-Man', team:'Avengers', power:'Variable', abilities:'Size manipulation, Engineering', origin:'Earth', status:'Active', weapons:['ant-man-suit'] },
  { id:'wasp', name:'Hope van Dyne', alias:'Wasp', team:'Avengers', power:'Variable', abilities:'Size manipulation, Flight, Stingers', origin:'Earth', status:'Active', weapons:['wasp-suit'] },
  { id:'captain-marvel', name:'Carol Danvers', alias:'Captain Marvel', team:'Avengers', power:'Omega', abilities:'Energy absorption/projection, Flight, Super strength', origin:'Earth/Kree', status:'Active', weapons:[] },
  { id:'quicksilver', name:'Pietro Maximoff', alias:'Quicksilver', team:'Avengers', power:'High', abilities:'Superhuman speed', origin:'Sokovia', status:'Deceased', weapons:[] },
  { id:'valkyrie', name:'Brunnhilde', alias:'Valkyrie', team:'Avengers', power:'Enhanced', abilities:'Asgardian strength, Sword combat, Flight', origin:'Asgard', status:'Active', weapons:[] },
  { id:'black-knight', name:'Dane Whitman', alias:'Black Knight', team:'Avengers', power:'Enhanced', abilities:'Expert swordsman, Genius intellect', origin:'Earth', status:'Active', weapons:['ebony-blade'] },
  { id:'monica-rambeau', name:'Monica Rambeau', alias:'Photon', team:'Avengers', power:'High', abilities:'Energy absorption, Light spectrum manipulation', origin:'Earth', status:'Active', weapons:[] },

  // === GUARDIANS / COSMIC ===
  { id:'star-lord', name:'Peter Quill', alias:'Star-Lord', team:'Guardians', power:'Normal', abilities:'Expert marksman, Celestial heritage', origin:'Earth/Ego', status:'Active', weapons:['element-guns'] },
  { id:'gamora', name:'Gamora', alias:'Deadliest Woman', team:'Guardians', power:'Enhanced', abilities:'Master assassin, Super strength', origin:'Zen-Whoberi', status:'Active', weapons:[] },
  { id:'drax', name:'Drax', alias:'The Destroyer', team:'Guardians', power:'Enhanced', abilities:'Super strength, Enhanced durability', origin:'Earth', status:'Active', weapons:[] },
  { id:'rocket', name:'Rocket', alias:'Rocket Raccoon', team:'Guardians', power:'Normal', abilities:'Weapons expert, Tactical genius, Engineering', origin:'Halfworld', status:'Active', weapons:['rocket-weapons'] },
  { id:'groot', name:'Groot', alias:'Groot', team:'Guardians', power:'High', abilities:'Regeneration, Super strength, Limb manipulation', origin:'Planet X', status:'Active', weapons:['groot-abilities'] },
  { id:'nebula', name:'Nebula', alias:'Nebula', team:'Guardians', power:'Enhanced', abilities:'Cybernetic enhancement, Combat skills', origin:'Luphom', status:'Active', weapons:[] },
  { id:'mantis', name:'Mantis', alias:'Mantis', team:'Guardians', power:'High', abilities:'Empathy, Sleep inducement, Emotion sensing', origin:'Ego\'s Planet', status:'Active', weapons:[] },
  { id:'yondu', name:'Yondu Udonta', alias:'Yondu', team:'Guardians', power:'Normal', abilities:'Yaka Arrow control, Ravager leadership', origin:'Centauri-IV', status:'Deceased', weapons:['yaka-arrow'] },
  { id:'adam-warlock', name:'Adam Warlock', alias:'Adam Warlock', team:'Guardians', power:'Omega', abilities:'Cosmic energy, Quantum magic, Regeneration', origin:'The Sovereign', status:'Active', weapons:[] },
  { id:'nova', name:'Richard Rider', alias:'Nova', team:'Guardians', power:'Omega', abilities:'Nova Force, Flight, Super strength', origin:'Earth', status:'Active', weapons:[] },
  { id:'silver-surfer', name:'Norrin Radd', alias:'Silver Surfer', team:'Cosmic', power:'Omega', abilities:'Power Cosmic, FTL travel, Energy manipulation', origin:'Zenn-La', status:'Active', weapons:['surfer-board'] },
  { id:'beta-ray-bill', name:'Beta Ray Bill', alias:'Beta Ray Bill', team:'Cosmic', power:'Omega', abilities:'Asgardian-level strength, Stormbreaker wielder', origin:'Korbin', status:'Active', weapons:['stormbreaker'] },

  // === WAKANDA ===
  { id:'black-panther', name:'T\'Challa', alias:'Black Panther', team:'Wakanda', power:'Enhanced', abilities:'Heart-Shaped Herb, Vibranium tech, Genius intellect', origin:'Wakanda', status:'Deceased', weapons:['bp-suit','kimoyo-beads'] },
  { id:'shuri', name:'Shuri', alias:'Black Panther', team:'Wakanda', power:'Enhanced', abilities:'Genius inventor, Vibranium tech, Heart-Shaped Herb', origin:'Wakanda', status:'Active', weapons:['bp-suit','kimoyo-beads'] },
  { id:'okoye', name:'Okoye', alias:'General Okoye', team:'Wakanda', power:'Normal', abilities:'Master combatant, Dora Milaje leader', origin:'Wakanda', status:'Active', weapons:['vibranium-spear'] },
  { id:'killmonger', name:'Erik Killmonger', alias:'Killmonger', team:'Villain', power:'Enhanced', abilities:'Military training, Heart-Shaped Herb, Tactical genius', origin:'Wakanda/USA', status:'Deceased', weapons:['golden-jaguar'] },

  // === MYSTIC / SUPERNATURAL ===
  { id:'doctor-strange', name:'Stephen Strange', alias:'Doctor Strange', team:'Mystic', power:'Omega', abilities:'Master of Mystic Arts, Time manipulation', origin:'Earth', status:'Active', weapons:['eye-agamotto','cloak-levitation','sling-ring'] },
  { id:'wong', name:'Wong', alias:'Sorcerer Supreme', team:'Mystic', power:'High', abilities:'Mystic Arts, Martial arts', origin:'Earth', status:'Active', weapons:['sling-ring'] },
  { id:'moon-knight', name:'Marc Spector', alias:'Moon Knight', team:'Defenders', power:'Enhanced', abilities:'Fist of Khonshu, Multiple alters, Enhanced strength', origin:'Earth', status:'Active', weapons:['moon-darts','moon-staff'] },
  { id:'ghost-rider-jb', name:'Johnny Blaze', alias:'Ghost Rider', team:'Supernatural', power:'Omega', abilities:'Hellfire, Penance Stare, Invulnerability', origin:'Earth', status:'Active', weapons:['ghost-chain'] },
  { id:'ghost-rider-rr', name:'Robbie Reyes', alias:'Ghost Rider', team:'Supernatural', power:'Omega', abilities:'Hellfire, Hell Charger, Invulnerability', origin:'Earth', status:'Active', weapons:['ghost-chain'] },
  { id:'blade', name:'Eric Brooks', alias:'Blade', team:'Supernatural', power:'Enhanced', abilities:'Daywalker, Super strength, Regeneration', origin:'Earth', status:'Active', weapons:['blade-sword'] },

  // === SPIDER-VERSE ===
  { id:'gwen-stacy', name:'Gwen Stacy', alias:'Ghost-Spider', team:'Avengers', power:'High', abilities:'Wall-crawling, Spider-sense', origin:'Earth-65', status:'Active', weapons:['web-shooters'] },
  { id:'spider-2099', name:'Miguel O\'Hara', alias:'Spider-Man 2099', team:'Avengers', power:'High', abilities:'Talons, Enhanced vision, Organic webbing', origin:'Earth-2099', status:'Active', weapons:[] },

  // === X-MEN ===
  { id:'professor-x', name:'Charles Xavier', alias:'Professor X', team:'X-Men', power:'Omega', abilities:'Telepathy, Astral projection', origin:'Earth', status:'Active', weapons:['cerebro'] },
  { id:'wolverine', name:'James Howlett', alias:'Wolverine', team:'X-Men', power:'High', abilities:'Healing factor, Adamantium skeleton, Berserker rage', origin:'Earth', status:'Active', weapons:['adamantium-claws'] },
  { id:'cyclops', name:'Scott Summers', alias:'Cyclops', team:'X-Men', power:'High', abilities:'Optic blasts, Tactical leadership', origin:'Earth', status:'Active', weapons:[] },
  { id:'jean-grey', name:'Jean Grey', alias:'Phoenix', team:'X-Men', power:'Omega', abilities:'Telekinesis, Telepathy, Phoenix Force', origin:'Earth', status:'Active', weapons:[] },
  { id:'storm', name:'Ororo Munroe', alias:'Storm', team:'X-Men', power:'Omega', abilities:'Weather manipulation, Flight', origin:'Earth', status:'Active', weapons:[] },
  { id:'beast', name:'Hank McCoy', alias:'Beast', team:'X-Men', power:'Enhanced', abilities:'Super strength, Agility, Genius intellect', origin:'Earth', status:'Active', weapons:[] },
  { id:'rogue', name:'Rogue', alias:'Rogue', team:'X-Men', power:'Omega', abilities:'Power absorption through touch', origin:'Earth', status:'Active', weapons:[] },
  { id:'gambit', name:'Remy LeBeau', alias:'Gambit', team:'X-Men', power:'High', abilities:'Kinetic energy charging, Card throwing, Bo staff', origin:'Earth', status:'Active', weapons:[] },
  { id:'nightcrawler', name:'Kurt Wagner', alias:'Nightcrawler', team:'X-Men', power:'High', abilities:'Teleportation, Acrobatics, Prehensile tail', origin:'Earth', status:'Active', weapons:[] },
  { id:'magneto', name:'Erik Lehnsherr', alias:'Magneto', team:'Villain', power:'Omega', abilities:'Magnetism, Metal manipulation', origin:'Earth', status:'Active', weapons:['magneto-helmet'] },
  { id:'deadpool', name:'Wade Wilson', alias:'Deadpool', team:'X-Men', power:'High', abilities:'Regeneration, Fourth wall awareness, Martial arts', origin:'Earth', status:'Active', weapons:['dp-katanas','dp-pistols'] },
  { id:'x-23', name:'Laura Kinney', alias:'X-23 / Wolverine', team:'X-Men', power:'High', abilities:'Healing factor, Adamantium claws, Assassin training', origin:'Earth', status:'Active', weapons:['adamantium-claws'] },
  { id:'emma-frost', name:'Emma Frost', alias:'White Queen', team:'X-Men', power:'Omega', abilities:'Telepathy, Diamond form', origin:'Earth', status:'Active', weapons:[] },
  { id:'colossus', name:'Piotr Rasputin', alias:'Colossus', team:'X-Men', power:'High', abilities:'Organic steel transformation, Super strength', origin:'Russia', status:'Active', weapons:[] },
  { id:'kitty-pryde', name:'Kitty Pryde', alias:'Shadowcat', team:'X-Men', power:'High', abilities:'Phasing through matter', origin:'Earth', status:'Active', weapons:[] },
  { id:'mystique', name:'Raven Darkholme', alias:'Mystique', team:'Villain', power:'High', abilities:'Shapeshifting, Espionage', origin:'Earth', status:'Active', weapons:[] },
  { id:'cable', name:'Nathan Summers', alias:'Cable', team:'X-Men', power:'Omega', abilities:'Telepathy, Telekinesis, Cybernetic enhancements', origin:'Earth (future)', status:'Active', weapons:[] },
  { id:'psylocke', name:'Betsy Braddock', alias:'Psylocke', team:'X-Men', power:'High', abilities:'Psychic blade, Telepathy, Martial arts', origin:'Earth', status:'Active', weapons:[] },
  { id:'bishop', name:'Lucas Bishop', alias:'Bishop', team:'X-Men', power:'High', abilities:'Energy absorption and redirection', origin:'Earth (future)', status:'Active', weapons:[] },
  { id:'iceman', name:'Bobby Drake', alias:'Iceman', team:'X-Men', power:'Omega', abilities:'Cryokinesis, Ice form', origin:'Earth', status:'Active', weapons:[] },
  { id:'magik', name:'Illyana Rasputin', alias:'Magik', team:'X-Men', power:'Omega', abilities:'Teleportation, Soulsword, Sorcery', origin:'Russia', status:'Active', weapons:[] },

  // === FANTASTIC FOUR ===
  { id:'mr-fantastic', name:'Reed Richards', alias:'Mr. Fantastic', team:'Fantastic Four', power:'High', abilities:'Elasticity, Genius-level intellect', origin:'Earth', status:'Active', weapons:['ff-tech'] },
  { id:'invisible-woman', name:'Sue Storm', alias:'Invisible Woman', team:'Fantastic Four', power:'High', abilities:'Invisibility, Force fields', origin:'Earth', status:'Active', weapons:[] },
  { id:'human-torch', name:'Johnny Storm', alias:'Human Torch', team:'Fantastic Four', power:'High', abilities:'Pyrokinesis, Flight, Supernova', origin:'Earth', status:'Active', weapons:[] },
  { id:'thing', name:'Ben Grimm', alias:'The Thing', team:'Fantastic Four', power:'High', abilities:'Super strength, Rock-like durability', origin:'Earth', status:'Active', weapons:[] },

  // === STREET-LEVEL ===
  { id:'daredevil', name:'Matt Murdock', alias:'Daredevil', team:'Defenders', power:'Enhanced', abilities:'Radar sense, Martial arts, Legal expertise', origin:'Earth', status:'Active', weapons:['dd-batons'] },
  { id:'punisher', name:'Frank Castle', alias:'Punisher', team:'Defenders', power:'Normal', abilities:'Weapons expert, Tactician, Military training', origin:'Earth', status:'Active', weapons:['punisher-arsenal'] },
  { id:'jessica-jones', name:'Jessica Jones', alias:'Jewel', team:'Defenders', power:'Enhanced', abilities:'Super strength, Flight, Durability', origin:'Earth', status:'Active', weapons:[] },
  { id:'luke-cage', name:'Luke Cage', alias:'Power Man', team:'Defenders', power:'Enhanced', abilities:'Bulletproof skin, Super strength', origin:'Earth', status:'Active', weapons:[] },
  { id:'iron-fist', name:'Danny Rand', alias:'Iron Fist', team:'Defenders', power:'High', abilities:'Chi-enhanced fist, Martial arts mastery', origin:'Earth/K\'un-Lun', status:'Active', weapons:[] },
  { id:'elektra', name:'Elektra Natchios', alias:'Elektra', team:'Defenders', power:'Enhanced', abilities:'Master assassin, Sai combat, Ninja training', origin:'Earth', status:'Active', weapons:[] },
  { id:'echo', name:'Maya Lopez', alias:'Echo', team:'Defenders', power:'Enhanced', abilities:'Photographic reflexes, Phoenix Force host', origin:'Earth', status:'Active', weapons:[] },
  { id:'shang-chi', name:'Shang-Chi', alias:'Master of Kung Fu', team:'Avengers', power:'High', abilities:'Martial arts mastery, Ten Rings wielder', origin:'Earth', status:'Active', weapons:['ten-rings'] },

  // === YOUNG / NEXT GEN ===
  { id:'ms-marvel', name:'Kamala Khan', alias:'Ms. Marvel', team:'Avengers', power:'High', abilities:'Embiggen, Light constructs, Noor energy', origin:'Earth', status:'Active', weapons:[] },
  { id:'ironheart', name:'Riri Williams', alias:'Ironheart', team:'Avengers', power:'High', abilities:'Genius intellect, Powered armor', origin:'Earth', status:'Active', weapons:[] },
  { id:'america-chavez', name:'America Chavez', alias:'Miss America', team:'Mystic', power:'Omega', abilities:'Multiverse portal creation, Super strength, Flight', origin:'Utopian Parallel', status:'Active', weapons:[] },

  // === ETERNALS ===
  { id:'sersi', name:'Sersi', alias:'Sersi', team:'Eternals', power:'High', abilities:'Matter transmutation', origin:'Earth (Eternal)', status:'Active', weapons:[] },
  { id:'ikaris', name:'Ikaris', alias:'Ikaris', team:'Eternals', power:'Omega', abilities:'Flight, Cosmic energy beams, Super strength', origin:'Earth (Eternal)', status:'Deceased', weapons:[] },
  { id:'thena', name:'Thena', alias:'Thena', team:'Eternals', power:'High', abilities:'Cosmic energy weapon construction, Combat', origin:'Earth (Eternal)', status:'Active', weapons:[] },

  // === ASGARDIANS ===
  { id:'loki', name:'Loki Laufeyson', alias:'God of Mischief', team:'Villain', power:'High', abilities:'Illusion casting, Shapeshifting, Sorcery', origin:'Jotunheim', status:'Active', weapons:['loki-scepter'] },
  { id:'odin', name:'Odin Borson', alias:'Allfather', team:'Asgardian', power:'Omega', abilities:'Odinforce, Cosmic awareness, Magic', origin:'Asgard', status:'Deceased', weapons:['gungnir','destroyer-armor'] },
  { id:'hela', name:'Hela Odinsdottir', alias:'Goddess of Death', team:'Villain', power:'Omega', abilities:'Weapon conjuration, Necromancy, Super strength', origin:'Asgard', status:'Deceased', weapons:['necrosword','eternal-flame'] },
  { id:'heimdall', name:'Heimdall', alias:'All-Seer', team:'Asgardian', power:'High', abilities:'Omniscient sight, Bifrost control', origin:'Asgard', status:'Deceased', weapons:['hofund'] },
  { id:'sif', name:'Lady Sif', alias:'Lady Sif', team:'Asgardian', power:'Enhanced', abilities:'Asgardian warrior, Sword combat', origin:'Asgard', status:'Active', weapons:[] },

  // === VILLAINS ===
  { id:'thanos', name:'Thanos', alias:'The Mad Titan', team:'Villain', power:'Universal', abilities:'Immense strength, Intellect, Infinity Stones', origin:'Titan', status:'Deceased', weapons:['infinity-gauntlet'] },
  { id:'ultron', name:'Ultron', alias:'Ultron', team:'Villain', power:'Omega', abilities:'AI consciousness, Vibranium body, Self-replication', origin:'Stark/Banner AI', status:'Destroyed', weapons:[] },
  { id:'kang', name:'Kang', alias:'The Conqueror', team:'Villain', power:'High', abilities:'Time travel, Genius intellect, Advanced tech', origin:'Earth-6311', status:'Active', weapons:[] },
  { id:'doctor-doom', name:'Victor Von Doom', alias:'Doctor Doom', team:'Villain', power:'Omega', abilities:'Sorcery, Genius intellect, Powered armor', origin:'Latveria', status:'Active', weapons:[] },
  { id:'green-goblin', name:'Norman Osborn', alias:'Green Goblin', team:'Villain', power:'Enhanced', abilities:'Super strength, Goblin Glider, Pumpkin bombs', origin:'Earth', status:'Active', weapons:[] },
  { id:'doc-ock', name:'Otto Octavius', alias:'Doctor Octopus', team:'Villain', power:'Enhanced', abilities:'Mechanical tentacles, Genius intellect', origin:'Earth', status:'Active', weapons:[] },
  { id:'venom', name:'Eddie Brock', alias:'Venom', team:'Villain', power:'High', abilities:'Symbiote powers, Shape-shifting, Super strength', origin:'Klyntar', status:'Active', weapons:[] },
  { id:'carnage', name:'Cletus Kasady', alias:'Carnage', team:'Villain', power:'Omega', abilities:'Symbiote powers, Superior to Venom', origin:'Klyntar', status:'Active', weapons:[] },
  { id:'kingpin', name:'Wilson Fisk', alias:'Kingpin', team:'Villain', power:'Normal', abilities:'Criminal mastermind, Immense physical strength', origin:'Earth', status:'Active', weapons:[] },
  { id:'red-skull', name:'Johann Schmidt', alias:'Red Skull', team:'Villain', power:'Enhanced', abilities:'Super soldier serum, Strategic genius', origin:'Germany', status:'Active', weapons:[] },
  { id:'apocalypse', name:'En Sabah Nur', alias:'Apocalypse', team:'Villain', power:'Omega', abilities:'Molecular manipulation, Immortality', origin:'Earth (ancient)', status:'Active', weapons:[] },
  { id:'dormammu', name:'Dormammu', alias:'Dread Dormammu', team:'Villain', power:'Universal', abilities:'Dark Dimension ruler, Reality warping', origin:'Dark Dimension', status:'Active', weapons:[] },
];
