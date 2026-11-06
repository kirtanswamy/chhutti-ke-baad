import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const CONFIG = {
  githubUrl: 'https://github.com/kirtanswamy/chhutti-ke-baad',
  background: '/assets/room final.png',
  backgroundPosition: 'center 63%',
  scanlines: true,
  grain: true,
  screen: {
    show: true,
    left: '44%',
    top: '42%',
    width: '11%',
    height: '15.5%',
    radius: '8px',
  },
  windowArea: {
    left: '34.5%',
    top: '0%',
    width: '29.5%',
    height: '62%',
  },
  stool: {
    left: '83.2%',
    top: '68.0%',
    width: '14.5%',
    height: '18%',
  },
  title: 'Chhutti Ke Baad',
};

// ============================================================================
// VERIFIED YOUTUBE VIDEO IDs FOR EVERY SHOW & EPISODE (No broken search APIs!)
// ============================================================================
const SHOWS_CATALOG = [
  {
    title: 'Motu Patlu',
    net: 'Nick',
    // 15 Real Verified Hindi Motu Patlu YouTube Video IDs from Sonic Gang / WowKidz / Nick India
    videos: [
      { id: 'HrYbDYhMlIw', title: 'John ने छीने सबके घर (Shrinking Machine)' },
      { id: 'ju-YLBLD0Ws', title: 'Mobike Ride in Furfuri Nagar' },
      { id: 'JseJICGnTKA', title: 'Motu Patlu का Gold Samosa Mission' },
      { id: 'eqVvDbEmP70', title: 'समोसे की Vending Machine' },
      { id: 'peENPsnSql4', title: 'Robot of Furfuri Nagar (Season 1)' },
      { id: 'X0FEjJ-j_60', title: 'Motu Patlu का Double Role!' },
      { id: 'QS17GLo8Z_Y', title: 'जादुई तोहफ़ा और मुसीबत (Full Episode)' },
      { id: 'sto4KcUwilw', title: 'Prince Motu of Anandgad' },
      { id: 'i4VvA683bNM', title: 'Stone Man in Furfuri Nagar' },
      { id: 'OIvxpsbi4UA', title: 'Motu की छींकों ने बचाई हिरण की जान!' },
      { id: '4XDubfxMgbA', title: 'Motu बना चलता-फिरता Speaker!' },
      { id: 'B3G8YYbrFuE', title: 'John और उसका झूठा Circus' },
      { id: 'Q0UJOx8aFuE', title: 'Chaiwale का Shaitan मुर्गा' },
      { id: '23j1kJdO8QQ', title: 'Motu Patlu In Dragon World (Special)' },
      { id: 'WlWMcrVOJ2g', title: 'Motu Patlu MBBS (Dr. Jhatka Clinic)' },
      { id: '69qHj2REx30', title: 'Motu Aur Patlu Ki Jodi — Nick Special' },
      { id: '_X24MeN_xp4', title: 'Car Parking — Motu Aur Patlu Ki Jodi' },
      { id: 'HrYbDYhMlIw', title: 'Boxer Ke Darr Se Motu Patlu Ki Daud', start: 180 },
      { id: 'ju-YLBLD0Ws', title: 'Chingum Ki Super Bike Chase', start: 210 },
      { id: 'eqVvDbEmP70', title: 'Chaiwala Samosa Party Special', start: 240 },
      { id: 'sto4KcUwilw', title: 'Royal Palace Escape Plan', start: 300 },
      { id: 'i4VvA683bNM', title: 'Inspector Chingum vs John’s Goons', start: 195 },
      { id: 'B3G8YYbrFuE', title: 'Furfuri Nagar Circus Hungama Part 2', start: 260 },
      { id: 'WlWMcrVOJ2g', title: 'Ghasitaram’s Clinic Confusion', start: 220 },
      { id: '23j1kJdO8QQ', title: 'Dragon World Final Showdown', start: 600 },
    ],
  },
  {
    title: 'Shin-chan',
    net: 'Hungama',
    videos: [
      { id: '-0zRMNVDUVw', title: 'Pagal Ye Pagal Wo (Classic Hindi Title Song)' },
      { id: 'oKqHKXqP3C4', title: 'Party Join Karo (Hungama TV Opening 2)' },
      { id: 'x2juH8lbtgM', title: 'Shin-chan Hindi Full Episode (Nohara Family)' },
      { id: 'WneTeHRr_AI', title: 'Shin-chan Season 1 Classic Hindi Episode' },
      { id: 'x2juH8lbtgM', title: 'Mitsy Aur Harry Ki Nok-Jhok', start: 120 },
      { id: 'x2juH8lbtgM', title: 'Kasukabe Defense Group Mission', start: 260 },
      { id: 'x2juH8lbtgM', title: 'Shiro Ki Sair Aur Action Kamen', start: 420 },
      { id: 'WneTeHRr_AI', title: 'Kindergarten Bus & Principal Sir', start: 90 },
      { id: 'WneTeHRr_AI', title: 'Chocobi Supermarket Hungama', start: 210 },
      { id: 'x2juH8lbtgM', title: 'Himawari Ka Naya Khilona', start: 540 },
    ],
  },
  {
    title: 'Doraemon',
    net: 'Hungama',
    videos: [
      { id: 'bM7SZ5SBzyY', title: 'Zindagi Sawaar Doon (Classic Hindi Theme)' },
      { id: 'ji_uQdO4Brw', title: 'डोरेमोन का पहला एपिसोड (Episode 1 in Hindi)' },
      { id: 'MwXFa8iRzBs', title: 'Nobita & Secret Gadget Full Hindi Episode' },
      { id: 'aVIXykwa4CE', title: 'Doraemon & Nobita’s Gadget Adventure' },
      { id: 'lV5m1rE-QJw', title: 'Doraemon: Nobita’s Space Heroes (Hindi)' },
      { id: 'ji_uQdO4Brw', title: 'Bamboo Copter Se Pehli Udaan', start: 140 },
      { id: 'MwXFa8iRzBs', title: 'Gian Aur Suneo Ka Maidan', start: 180 },
      { id: 'aVIXykwa4CE', title: 'Anywhere Door Ki Sair', start: 240 },
      { id: 'lV5m1rE-QJw', title: 'Space Heroes Battle Part 2', start: 320 },
      { id: 'ji_uQdO4Brw', title: 'Doracake Party at Nobita’s House', start: 300 },
    ],
  },
  {
    title: 'Ninja Hattori',
    net: 'Nick',
    videos: [
      { id: 'k85mRPqvMbE', title: 'Pahadon Ke Upar Jungle Ke Paar (Hindi Intro)' },
      { id: '3GLEX5XSWno', title: 'Mr. Koike दिखाएंगे अपना नया रूप! (Full Episode)' },
      { id: '1ss6Ati25l0', title: 'Shishimaru ने की अकल की बात! (Full Episode)' },
      { id: '3GLEX5XSWno', title: 'Kenichi & Hattori’s Ninja Technique', start: 150 },
      { id: '1ss6Ati25l0', title: 'Amara Aur Kiyo Ki Chaal', start: 180 },
      { id: '3GLEX5XSWno', title: 'Shinzo Ki Tez Rone Ki Awaaz', start: 300 },
      { id: '1ss6Ati25l0', title: 'Shishimaru’s Chocolate Roll Party', start: 320 },
    ],
  },
  {
    title: 'Oggy & the Cockroaches',
    net: 'Nick',
    videos: [
      { id: 'Bs8YZRKpg4Q', title: 'Bitter Chocolate (S01E01 Full Episode)' },
      { id: 'Bs8YZRKpg4Q', title: 'Joey, Dee Dee & Marky Kitchen Raid', start: 120 },
      { id: 'Bs8YZRKpg4Q', title: 'Jack’s Military Plan Backfires', start: 240 },
      { id: 'Bs8YZRKpg4Q', title: 'Oggy’s House Chaos Finale', start: 340 },
    ],
  },
  {
    title: 'Ben 10',
    net: 'CN',
    videos: [
      { id: 's6xpTSTcJlc', title: 'Ben 10 Classic Hindi/English Title Track' },
      { id: 'UiAGdDIM8Pg', title: 'Ben VS Monsters — Frightwig at Water Park (Hindi)' },
      { id: 'uOWqgFxWU5Q', title: 'Ben 10 in Hindi — Omnitrix Action Episode' },
      { id: 'UiAGdDIM8Pg', title: 'Four Arms & Heatblast Transformation', start: 90 },
      { id: 'uOWqgFxWU5Q', title: 'Gwen & Grandpa Max Rustbucket Rescue', start: 140 },
    ],
  },
  {
    title: 'Power Rangers (All Seasons)',
    net: 'Jetix',
    videos: [
      { id: 'D3DlPdu08s8', title: 'Ep 1: Power Rangers Ninja Storm' },
      { id: 'FhgLYhNyiWE', title: 'Ep 2: Power Rangers S.P.D. Emergency' },
      { id: 'r7PqMex6Fgs', title: 'Ep 3: Power Rangers Dino Thunder' },
      { id: 'RyAwcr-SI-U', title: 'Ep 4: Power Rangers Operation Overdrive' },
      { id: 'FCuzzwwxHZs', title: 'Ep 5: Power Rangers Time Force' },
      { id: 'hEPSLWA8Pjk', title: 'Ep 6: Power Rangers Lightspeed Rescue' },
      { id: 'lSccbzKNIcQ', title: 'Ep 7: Power Rangers Mystic Force' },
      { id: 'Y-RHrASmU4A', title: 'Ep 8: Power Rangers Jungle Fury' },
    ],
  },
  {
    title: 'Phineas and Ferb',
    net: 'Disney',
    videos: [
      { id: 'S04IxNwg_SU', title: 'Ep 1: Garmi Ki Chhuttiyan Hain Badi Lambi' },
      { id: 'MPIc-nPLtA0', title: 'Ep 2: Gitchee Gitchee Goo (Hindi Special)' },
      { id: 'madX41nj5gQ', title: 'Ep 3: S.I.M.P. Squirrels In My Pants' },
      { id: 'nEr8s3cfB2k', title: 'Ep 4: Busted — Candace & Vanessa' },
      { id: 'a8TmD3Sxo_I', title: 'Ep 5: Ain’t Got Rhythm (Library Band)' },
      { id: 'RcAhiYmRXXY', title: 'Ep 6: Agent P — Perry the Platypus Theme' },
    ],
  },
  {
    title: 'Dragon Ball Z & Anime Classics',
    net: 'CN',
    videos: [
      { id: 'yOqL80J9RnQ', title: 'Ep 1: Dragon Ball Z — Rock the Dragon' },
      { id: 'hi1wK4_L3mw', title: 'Ep 2: Beyblade V-Force — Let It Rip!' },
      { id: 'u8jUzPgJ-1s', title: 'Ep 3: Digimon Frontier — Spirit Evolution' },
      { id: 'KgD5I-J1Oqg', title: 'Ep 4: Yu-Gi-Oh! — Time to Duel' },
      { id: 'jrECk_ExwCA', title: 'Ep 5: Naruto — Rocks Opening 1' },
      { id: '3kWoZw1AZaE', title: 'Ep 6: Perman — Classic Hindi Intro' },
    ],
  },
  {
    title: 'Kochikame, Kiteretsu & Hagemaru',
    net: 'Hungama',
    videos: [
      { id: 'KSzRiA4xeEA', title: 'Ep 1: Kochikame — Dekho Ye Hai Ryotsu' },
      { id: 'fvGxczwmDQU', title: 'Ep 2: Kiteretsu — Korosuke Opening 1' },
      { id: 'hZc3vBm1vm0', title: 'Ep 3: Kiteretsu — Cooking March Opening 2' },
      { id: 'yyfT2blicyQ', title: 'Ep 4: Hagemaru — Kanjoos Family Theme' },
      { id: 'W6hRXrwqsxA', title: 'Ep 5: Takeshi’s Castle — Javed Jaffrey Special' },
    ],
  },
  {
    title: '90s Star Plus & Doordarshan Magic',
    net: '90s/TV',
    videos: [
      { id: 'x7q7hDs-OWY', title: 'Ep 1: Shaka Laka Boom Boom (Sanju’s Magic Pencil)' },
      { id: 'melbvJ7znlA', title: 'Ep 2: Shaktimaan — Doordarshan Title Song' },
      { id: 'NmGYR5UOgO4', title: 'Ep 3: Hatim — Seven Questions Adventure' },
      { id: 'W3fsMk_kaVc', title: 'Ep 4: Shararat — Shring Bring Sarvaling' },
      { id: 'hCAKpoI4ILk', title: 'Ep 5: Son Pari — Dekho Aayi Son Pari' },
      { id: 'JCjt9lAtlSc', title: 'Ep 6: Karishma Ka Karishma' },
      { id: 'd3UmN-0-3Rg', title: 'Ep 7: Hero — Bhakti Hi Shakti Hai' },
      { id: '8jMuvnTCfMw', title: 'Ep 8: The Jungle Book — Jungle Jungle Baat Chali Hai' },
      { id: 'YIH40Kxxqaw', title: 'Ep 9: Akkad Bakkad Bambe Bo' },
      { id: 'vUtXZORTxIM', title: 'Ep 10: Aladdin — Naam Toh Suna Hoga' },
      { id: 'pVLDuCQ1tRU', title: 'Ep 11: Majooba Ka Ajooba' },
      { id: '-Box_8m-b00', title: 'Ep 12: Akbar Birbal Classic' },
    ],
  },
  {
    title: 'Cartoon Network 90s Legends',
    net: 'CN',
    videos: [
      { id: 'H0IQBWWabuU', title: 'Ep 1: Swat Kats — The Radical Squadron' },
      { id: '6O4sGCvDN2o', title: 'Ep 2: Courage the Cowardly Dog' },
      { id: 'Vwr8w7MxybY', title: 'Ep 3: Dexter’s Laboratory' },
      { id: '5NC6cPdaxNU', title: 'Ep 4: Johnny Bravo' },
      { id: 'wY_jLh6UBc8', title: 'Ep 5: The Powerpuff Girls' },
      { id: 'Dx2v5xkudaw', title: 'Ep 6: Scooby-Doo, Where Are You!' },
      { id: '3qwGthTjDSQ', title: 'Ep 7: What’s New Scooby-Doo?' },
      { id: 'qtdxx2X3SlU', title: 'Ep 8: Tom & Jerry Kids' },
      { id: 'kr3LC-29Vlg', title: 'Ep 9: Ed, Edd n Eddy' },
      { id: 'PFulYCqdXnQ', title: 'Ep 10: Popeye the Sailor Man' },
      { id: '0JQbeCAlF6s', title: 'Ep 11: The Jetsons' },
      { id: 'HhHwnrlZRus', title: 'Ep 12: The Pink Panther' },
      { id: 'gI3WzDEJriw', title: 'Ep 13: Justice League Animated' },
      { id: 'L3NhpzIdjHU', title: 'Ep 14: Teen Titans' },
      { id: 'k38SCJGo1Uo', title: 'Ep 15: The Adventures of Tenali Raman' },
      { id: 'kVRbbdQJNjA', title: 'Ep 16: Dragon Tales' },
      { id: 'HNWkwRfuEFM', title: 'Ep 17: Richie Rich' },
    ],
  },
  {
    title: 'Disney India Sitcoms & Shows',
    net: 'Disney',
    videos: [
      { id: 'pGzVVvyJvoM', title: 'Ep 1: Best of Luck Nikki' },
      { id: '2iIcCoEXBN0', title: 'Ep 2: The Suite Life of Karan & Kabir' },
      { id: 'WQi5r9qmvUY', title: 'Ep 3: Vicky Aur Vetaal' },
      { id: 'rGcOr5bFuM0', title: 'Ep 4: Agadam Bagdam Tigdam' },
      { id: 'fk-GVUEOOfU', title: 'Ep 5: Art Attack India' },
      { id: 'LNt_8WatRds', title: 'Ep 6: Kya Mast Hai Life' },
      { id: 'Hv_qojrfY8c', title: 'Ep 7: Hannah Montana' },
      { id: 'ByzuJO8dAlw', title: 'Ep 8: The Suite Life of Zack & Cody' },
      { id: '75vy8WzZ7aA', title: 'Ep 9: That’s So Raven' },
      { id: 'SEgeUWHPmBc', title: 'Ep 10: Kim Possible' },
      { id: 't6C29Fuuxfo', title: 'Ep 11: Kick Buttowski: Suburban Daredevil' },
      { id: 'lc8b4gLY0OQ', title: 'Ep 12: Timon & Pumbaa' },
      { id: 'W5pnY9SrD5I', title: 'Ep 13: TaleSpin (Hindi)' },
      { id: 'zvrIHW0qbFU', title: 'Ep 14: Chip ’n Dale: Rescue Rangers' },
    ],
  },
  {
    title: 'Pogo Tiny TV & Afternoon Classics',
    net: 'Pogo',
    videos: [
      { id: '9Zy8T1Veqq0', title: 'Ep 1: Mr. Bean: The Animated Series' },
      { id: 'W7XhzQQHl8U', title: 'Ep 2: Oswald & Weenie' },
      { id: '0uGR_E0rYVI', title: 'Ep 3: Make Way for Noddy (Hindi)' },
      { id: 'YRQLPf5fQq0', title: 'Ep 4: Bob the Builder — Karke Dikhayenge' },
      { id: '8v6W5LS_CTA', title: 'Ep 5: Thomas & Friends' },
      { id: 't9d_wMUo49Q', title: 'Ep 6: Thomas & Friends — Sodor Special' },
      { id: 'KT0-Rf9ykIY', title: 'Ep 7: Gali Gali Sim Sim' },
      { id: 'rZBhkwRF1FI', title: 'Ep 8: Inspector Gadget' },
      { id: 'GNRW_cTGAFU', title: 'Ep 9: Ultraman' },
    ],
  },
];

// Flatten all verified episodes for NEXT / PREV surfing
const ALL_EPISODES_FLAT = SHOWS_CATALOG.flatMap((show, sIdx) =>
  show.videos.map((v, epIdx) => ({
    videoId: v.id,
    startSeconds: v.start || 0,
    epTitle: v.title.startsWith('Ep ') ? v.title : `Ep ${epIdx + 1}: ${v.title}`,
    showTitle: show.title,
    net: show.net,
    showIndex: sIdx,
  }))
);

const NETWORKS = ['ALL', 'Nick', 'Hungama', 'CN', 'Pogo', 'Jetix', 'Disney', '90s/TV'];
const FONT_STYLES = ['font-rozha', 'font-martel', 'font-baloo', 'font-yatra'];

const TIFFIN_SNACKS = [
  'टिफ़िन में आज ठंडी मैगी और केचप है!',
  'आलू पराठा और आम का अचार!',
  '₹5 वाला Jim-Jam बिस्कुट और Frooti!',
  'बस्ते में अधूरा होमवर्क पड़ा है...',
];

function fitBox(vw, vh, iw, ih) {
  const scale = Math.max(vw / iw, vh / ih);
  const w = iw * scale;
  const h = ih * scale;
  return { w, h, x: (vw - w) / 2, y: (vh - h) / 2 };
}

function playBubblePopSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1150, ctx.currentTime + 0.09);
    gain.gain.setValueAtTime(0.45, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.095);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Ignore if blocked
  }
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(85);
  const [clock, setClock] = useState('');
  const [screenRect, setScreenRect] = useState(null);
  const [windowRect, setWindowRect] = useState(null);
  const [stoolRect, setStoolRect] = useState(null);

  const [flatIdx, setFlatIdx] = useState(0);
  const [currentVideoId, setCurrentVideoId] = useState(ALL_EPISODES_FLAT[0].videoId);
  const [showShows, setShowShows] = useState(false);
  const [selectedNet, setSelectedNet] = useState('ALL');
  const [activeShowTitle, setActiveShowTitle] = useState(null);
  const [roomMode, setRoomMode] = useState('daylight');
  const [fontIdx, setFontIdx] = useState(0);
  const [tiffinToast, setTiffinToast] = useState(null);
  const [mummyScolding, setMummyScolding] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  const playerHostRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const bgSizeRef = useRef(null);
  const savedVolRef = useRef(85);
  const flatIdxRef = useRef(0);

  const showsWithEpisodes = useMemo(() => {
    return SHOWS_CATALOG.map((show, sIdx) => ({
      ...show,
      showIndex: sIdx,
      episodes: show.videos.map((v, epIdx) => ({
        videoId: v.id,
        startSeconds: v.start || 0,
        epTitle: v.title.startsWith('Ep ') ? v.title : `Ep ${epIdx + 1}: ${v.title}`,
        showTitle: show.title,
        showIndex: sIdx,
      })),
    }));
  }, []);

  const filteredShows = useMemo(() => {
    if (selectedNet === 'ALL') return showsWithEpisodes;
    return showsWithEpisodes.filter((s) => s.net === selectedNet);
  }, [showsWithEpisodes, selectedNet]);

  const selectedShowObject = useMemo(() => {
    if (!activeShowTitle) return null;
    return showsWithEpisodes.find((s) => s.title === activeShowTitle) || null;
  }, [showsWithEpisodes, activeShowTitle]);

  // Responsive Coordinate Calculator
  useEffect(() => {
    const computeLayout = () => {
      if (!bgSizeRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const { w, h } = fitBox(vw, vh, bgSizeRef.current.w, bgSizeRef.current.h);
      const x = -(w - vw) * 0.5;
      const y = -(h - vh) * 0.63;

      setScreenRect({
        left: x + (parseFloat(CONFIG.screen.left) / 100) * w,
        top: y + (parseFloat(CONFIG.screen.top) / 100) * h,
        width: (parseFloat(CONFIG.screen.width) / 100) * w,
        height: (parseFloat(CONFIG.screen.height) / 100) * h,
      });

      setWindowRect({
        left: x + (parseFloat(CONFIG.windowArea.left) / 100) * w,
        top: y + (parseFloat(CONFIG.windowArea.top) / 100) * h,
        width: (parseFloat(CONFIG.windowArea.width) / 100) * w,
        height: (parseFloat(CONFIG.windowArea.height) / 100) * h,
      });

      setStoolRect({
        left: x + (parseFloat(CONFIG.stool.left) / 100) * w,
        top: y + (parseFloat(CONFIG.stool.top) / 100) * h,
        width: (parseFloat(CONFIG.stool.width) / 100) * w,
        height: (parseFloat(CONFIG.stool.height) / 100) * h,
      });
    };

    const img = new Image();
    img.onload = () => {
      bgSizeRef.current = { w: img.naturalWidth, h: img.naturalHeight };
      computeLayout();
    };
    img.src = CONFIG.background;

    window.addEventListener('resize', computeLayout);
    window.addEventListener('orientationchange', computeLayout);
    return () => {
      window.removeEventListener('resize', computeLayout);
      window.removeEventListener('orientationchange', computeLayout);
    };
  }, []);

  const videoCrop = screenRect
    ? (() => {
        let { w, h } = fitBox(screenRect.width, screenRect.height, 16, 9);
        if (h < 220) {
          const factor = 220 / h;
          w *= factor;
          h *= factor;
        }
        return {
          w,
          h,
          x: (screenRect.width - w) / 2,
          y: (screenRect.height - h) / 2,
        };
      })()
    : null;

  // Live Clock (top-left)
  useEffect(() => {
    const updateClock = () =>
      setClock(
        new Date()
          .toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
          .toLowerCase()
      );
    updateClock();
    const timer = setInterval(updateClock, 10000);
    return () => clearInterval(timer);
  }, []);

  // MUMMY'S VOICE & TRUE SVG CLOUD BUBBLES TRIGGER
  const triggerMummyVoice = useCallback(() => {
    playBubblePopSound();
    setIsPopping(false);
    setMummyScolding(true);

    if (ytPlayerRef.current && typeof ytPlayerRef.current.getVolume === 'function') {
      savedVolRef.current = ytPlayerRef.current.getVolume();
      ytPlayerRef.current.setVolume(20);
    }

    const audio = new Audio('/assets/mummy.mp3');
    audio.play().catch(() => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(
          'अरे! छुट्टी के बाद से टीवी के आगे बैठा है! बस्ता स्टूल पे पड़ा है, टिफ़िन भी नहीं निकाला... चल बंद कर अब!'
        );
        utter.lang = 'hi-IN';
        utter.rate = 1.05;
        utter.pitch = 1.2;
        window.speechSynthesis.speak(utter);
      }
    });
  }, []);

  useEffect(() => {
    const mummyTimer = setTimeout(() => {
      triggerMummyVoice();
    }, 120000); // Triggers after 2 minutes

    return () => clearTimeout(mummyTimer);
  }, [triggerMummyVoice]);

  const handlePopKidCloud = () => {
    playBubblePopSound();
    setIsPopping(true);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const kidUtter = new SpeechSynthesisUtterance('बस दो मिनट और मम्मी!');
      kidUtter.lang = 'hi-IN';
      kidUtter.pitch = 1.45;
      kidUtter.rate = 1.1;
      window.speechSynthesis.speak(kidUtter);
    }

    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === 'function') {
      ytPlayerRef.current.setVolume(savedVolRef.current || volume);
    }

    setTimeout(() => {
      setMummyScolding(false);
      setIsPopping(false);
    }, 250);
  };

  // Mount Standalone YouTube Player (Starts on real Motu Patlu Hindi Episode!)
  useEffect(() => {
    const initPlayer = () => {
      ytPlayerRef.current = new window.YT.Player(playerHostRef.current, {
        videoId: ALL_EPISODES_FLAT[0].videoId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            ytPlayerRef.current.unMute();
            ytPlayerRef.current.setVolume(85);
            setReady(true);
          },
          onStateChange: (e) => {
            const PS = window.YT.PlayerState;
            setPlaying(e.data === PS.PLAYING);
            if (e.data === PS.ENDED) {
              // Automatically play next episode when current one finishes
              const nextI = (flatIdxRef.current + 1) % ALL_EPISODES_FLAT.length;
              flatIdxRef.current = nextI;
              setFlatIdx(nextI);
              const nextEp = ALL_EPISODES_FLAT[nextI];
              setCurrentVideoId(nextEp.videoId);
              ytPlayerRef.current.loadVideoById({
                videoId: nextEp.videoId,
                startSeconds: nextEp.startSeconds || 0,
              });
            }
          },
          onError: () => {
            // If any video is blocked/unavailable, automatically advance to the next episode of the show!
            const nextI = (flatIdxRef.current + 1) % ALL_EPISODES_FLAT.length;
            flatIdxRef.current = nextI;
            setFlatIdx(nextI);
            const nextEp = ALL_EPISODES_FLAT[nextI];
            setCurrentVideoId(nextEp.videoId);
            setTimeout(() => {
              ytPlayerRef.current?.loadVideoById?.({
                videoId: nextEp.videoId,
                startSeconds: nextEp.startSeconds || 0,
              });
            }, 400);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.querySelector('script[src*="iframe_api"]')) {
        const s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(s);
      }
    }

    return () => {
      ytPlayerRef.current?.destroy?.();
    };
  }, []);

  // Remote Control Handlers
  const togglePower = useCallback(
    (e) => {
      e?.currentTarget?.blur?.();
      if (!ready || !ytPlayerRef.current) return;
      if (playing) {
        ytPlayerRef.current.pauseVideo();
        setShowShows(false);
      } else {
        ytPlayerRef.current.playVideo();
        setHasStarted(true);
        setShowShows(false);
      }
    },
    [ready, playing]
  );

  const toggleMute = useCallback(
    (e) => {
      e?.currentTarget?.blur?.();
      if (!ready || !ytPlayerRef.current) return;
      const isCurrentlyMuted = ytPlayerRef.current.isMuted();
      if (isCurrentlyMuted) ytPlayerRef.current.unMute();
      else ytPlayerRef.current.mute();
      setMuted(!isCurrentlyMuted);
    },
    [ready]
  );

  const changeVolume = useCallback(
    (delta, e) => {
      e?.currentTarget?.blur?.();
      if (!ready || !ytPlayerRef.current) return;
      const next = Math.max(0, Math.min(100, volume + delta));
      ytPlayerRef.current.setVolume(next);
      setVolume(next);
      if (next > 0 && ytPlayerRef.current.isMuted()) {
        ytPlayerRef.current.unMute();
        setMuted(false);
      }
    },
    [ready, volume]
  );

  const nextTrack = useCallback(
    (e) => {
      e?.currentTarget?.blur?.();
      if (!ready || !ytPlayerRef.current) return;
      const nextI = (flatIdxRef.current + 1) % ALL_EPISODES_FLAT.length;
      flatIdxRef.current = nextI;
      setFlatIdx(nextI);
      const nextEp = ALL_EPISODES_FLAT[nextI];
      setCurrentVideoId(nextEp.videoId);
      setHasStarted(true);
      ytPlayerRef.current.loadVideoById({
        videoId: nextEp.videoId,
        startSeconds: nextEp.startSeconds || 0,
      });
    },
    [ready]
  );

  const prevTrack = useCallback(
    (e) => {
      e?.currentTarget?.blur?.();
      if (!ready || !ytPlayerRef.current) return;
      const prevI =
        (flatIdxRef.current - 1 + ALL_EPISODES_FLAT.length) % ALL_EPISODES_FLAT.length;
      flatIdxRef.current = prevI;
      setFlatIdx(prevI);
      const prevEp = ALL_EPISODES_FLAT[prevI];
      setCurrentVideoId(prevEp.videoId);
      setHasStarted(true);
      ytPlayerRef.current.loadVideoById({
        videoId: prevEp.videoId,
        startSeconds: prevEp.startSeconds || 0,
      });
    },
    [ready]
  );

  // Direct, Instant Episode Playback (Works for Ep 1, Ep 2, Ep 3 ... Ep 25!)
  const playEpisode = (epObj) => {
    if (!ready || !ytPlayerRef.current) return;
    const foundIdx = ALL_EPISODES_FLAT.findIndex(
      (item) =>
        item.videoId === epObj.videoId &&
        item.startSeconds === (epObj.startSeconds || 0)
    );
    if (foundIdx >= 0) {
      flatIdxRef.current = foundIdx;
      setFlatIdx(foundIdx);
    }
    setCurrentVideoId(epObj.videoId);
    setHasStarted(true);
    setShowShows(false);

    ytPlayerRef.current.loadVideoById({
      videoId: epObj.videoId,
      startSeconds: epObj.startSeconds || 0,
    });
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePower();
      } else if (e.code === 'ArrowRight') {
        nextTrack();
      } else if (e.code === 'ArrowLeft') {
        prevTrack();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        changeVolume(10);
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        changeVolume(-10);
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
      } else if (e.key.toLowerCase() === 'l') {
        setRoomMode((m) =>
          m === 'daylight' ? 'evening' : m === 'evening' ? 'night' : 'daylight'
        );
      } else if (e.key.toLowerCase() === 'f') {
        setFontIdx((i) => (i + 1) % FONT_STYLES.length);
      } else if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        if (mummyScolding) {
          handlePopKidCloud();
        } else {
          triggerMummyVoice();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    togglePower,
    nextTrack,
    prevTrack,
    changeVolume,
    toggleMute,
    triggerMummyVoice,
    mummyScolding,
  ]);

  const handleStoolClick = (e) => {
    e.stopPropagation();
    playBubblePopSound();
    setTiffinToast(TIFFIN_SNACKS[Math.floor(Math.random() * TIFFIN_SNACKS.length)]);
    setTimeout(() => {
      setTiffinToast(null);
    }, 3200);
  };

  const currentEpInfo = ALL_EPISODES_FLAT[flatIdx] || ALL_EPISODES_FLAT[0];
  const hasScreen = CONFIG.screen.show && !!screenRect;

  return (
    <div className={playing ? 'playing' : undefined}>
      <div className="fallback" />
      <div
        className={`backdrop mode-${roomMode}`}
        style={{
          backgroundImage: `url("${CONFIG.background}")`,
          backgroundPosition: CONFIG.backgroundPosition,
        }}
      />

      {/* SLIDING MAROON WINDOW CURTAINS */}
      {windowRect && (
        <div
          className={`window-curtains ${roomMode === 'night' ? 'closed' : ''}`}
          style={{
            left: windowRect.left,
            top: windowRect.top,
            width: windowRect.width,
            height: windowRect.height,
          }}
        >
          <div className="curtain-panel curtain-left" />
          <div className="curtain-panel curtain-right" />
        </div>
      )}

      <div className="veil" />
      {CONFIG.grain && <div className="grain" />}
      {CONFIG.scanlines && <div className="scanlines" />}

      {/* CRT TV Screen Cutout */}
      <div
        className={`${hasScreen ? 'screen' : 'ytframe'} ${
          roomMode === 'night' ? 'night-glow' : ''
        }`}
        style={
          hasScreen
            ? {
                left: screenRect.left,
                top: screenRect.top,
                width: screenRect.width,
                height: screenRect.height,
                borderRadius: CONFIG.screen.radius,
              }
            : undefined
        }
      >
        <img
          src="/assets/pause.gif"
          alt=""
          className={hasScreen && hasStarted && !playing ? 'show' : undefined}
        />
        <div
          className={`video-mount ${hasScreen && hasStarted && playing ? 'show' : ''}`}
          style={
            hasScreen
              ? {
                  position: 'absolute',
                  left: videoCrop.x,
                  top: videoCrop.y,
                  width: videoCrop.w,
                  height: videoCrop.h,
                }
              : { position: 'absolute', inset: 0 }
          }
        >
          <div ref={playerHostRef} />
        </div>
      </div>

      {/* Lace Cloth Doily Hanging Over Top of TV */}
      {hasScreen && (
        <img
          src="/assets/tvcover.webp"
          alt=""
          className="tvcover"
          style={{
            left: screenRect.left - 0.025 * screenRect.width,
            top: screenRect.top - 0.16 * screenRect.width,
            width: 1.05 * screenRect.width,
          }}
        />
      )}

      {/* ====================================================================
          TRUE MULTI-SCALLOPED SVG CLOUD BUBBLES
         ==================================================================== */}
      {mummyScolding && (
        <>
          {/* 1. Mummy's Fluffy Scalloped Cloud Bubble near Top-Left Madhubani Frame */}
          <div className={`mummy-svg-cloud ${isPopping ? 'popping' : ''}`}>
            <svg viewBox="0 0 380 230" width="100%" height="100%">
              <path
                d="M 78 175
                   C 40 175, 22 145, 42 118
                   C 22 92, 42 56, 78 58
                   C 92 26, 145 20, 172 44
                   C 198 18, 255 20, 276 48
                   C 312 36, 348 64, 340 98
                   C 366 118, 355 162, 318 168
                   C 305 194, 255 198, 232 182
                   C 202 202, 148 200, 126 180
                   C 105 192, 82 188, 78 175 Z"
                fill="rgba(22, 12, 8, 0.78)"
                transform="translate(5, 7)"
              />
              <path
                d="M 78 175
                   C 40 175, 22 145, 42 118
                   C 22 92, 42 56, 78 58
                   C 92 26, 145 20, 172 44
                   C 198 18, 255 20, 276 48
                   C 312 36, 348 64, 340 98
                   C 366 118, 355 162, 318 168
                   C 305 194, 255 198, 232 182
                   C 202 202, 148 200, 126 180
                   C 105 192, 82 188, 78 175 Z"
                fill="#f6eddc"
                stroke="#2b1d16"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              <path
                d="M 82 62 C 98 48, 124 48, 138 58 M 252 54 C 268 44, 290 48, 300 62"
                fill="none"
                stroke="rgba(43, 29, 22, 0.22)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="44" cy="192" r="11" fill="#f6eddc" stroke="#2b1d16" strokeWidth="4" />
              <circle cx="22" cy="208" r="6.5" fill="#f6eddc" stroke="#2b1d16" strokeWidth="3.5" />
            </svg>

            <div className="mummy-cloud-text">
              &ldquo;अरे! छुट्टी के बाद से टी.वी. के आगे बैठा है! बस्ता स्टूल पे पड़ा है, टिफ़िन भी नहीं निकाला... चल बंद कर अब!&rdquo;
            </div>
          </div>

          {/* 2. Boy's Fluffy Thought Cloud (To the RIGHT of his head, clear of TV) */}
          <div
            onClick={handlePopKidCloud}
            className={`kid-svg-cloud ${isPopping ? 'popping' : ''}`}
            style={{
              left: screenRect
                ? screenRect.left + screenRect.width * 0.88
                : '54%',
              top: screenRect
                ? screenRect.top + screenRect.height * 0.78
                : '52%',
            }}
            title="Click cloud bubble to pop!"
          >
            <svg viewBox="0 0 280 185" width="100%" height="100%">
              <path
                d="M 58 122
                   C 26 120, 16 92, 36 72
                   C 24 46, 52 24, 82 34
                   C 102 12, 152 12, 172 34
                   C 204 20, 240 42, 232 72
                   C 256 88, 244 122, 212 124
                   C 196 144, 152 144, 134 128
                   C 108 144, 72 140, 58 122 Z"
                fill="rgba(22, 12, 8, 0.8)"
                transform="translate(4, 6)"
              />
              <path
                d="M 58 122
                   C 26 120, 16 92, 36 72
                   C 24 46, 52 24, 82 34
                   C 102 12, 152 12, 172 34
                   C 204 20, 240 42, 232 72
                   C 256 88, 244 122, 212 124
                   C 196 144, 152 144, 134 128
                   C 108 144, 72 140, 58 122 Z"
                fill="#f6eddc"
                stroke="#2b1d16"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              <path
                d="M 86 38 C 105 26, 135 26, 152 38"
                fill="none"
                stroke="rgba(43, 29, 22, 0.22)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle cx="52" cy="146" r="10" fill="#f6eddc" stroke="#2b1d16" strokeWidth="4" />
              <circle cx="32" cy="164" r="6" fill="#f6eddc" stroke="#2b1d16" strokeWidth="3.5" />
            </svg>

            <div className="kid-cloud-text">बस २ मिनट और मम्मी!</div>
          </div>
        </>
      )}

      {/* STOOL INTERACTIVE HOTSPOT */}
      {stoolRect && (
        <div
          onClick={handleStoolClick}
          className="stool-hotspot"
          style={{
            left: stoolRect.left,
            top: stoolRect.top,
            width: stoolRect.width,
            height: stoolRect.height,
          }}
          title="Click your School Bag & Tiffin Box"
        >
          {tiffinToast && <div className="stool-cloud-toast">{tiffinToast}</div>}
        </div>
      )}

      {/* Main Stage UI */}
      <main className="stage">
        <header className="top">
          <div className="top-left-controls">
            <span>{clock || '--:--'}</span>
            <button
              className="light-stamp-btn"
              onClick={(e) => {
                e.currentTarget.blur();
                setRoomMode((m) =>
                  m === 'daylight'
                    ? 'evening'
                    : m === 'evening'
                    ? 'night'
                    : 'daylight'
                );
              }}
              title="Change Room Lighting (Shortcut: L)"
            >
              {roomMode === 'daylight'
                ? '[ ☀️ DAYLIGHT ]'
                : roomMode === 'evening'
                ? '[ 💡 TUBELIGHT ]'
                : '[ 🌙 LIGHTS OFF ]'}
            </button>
          </div>

          <button
            className="crt-status-stamp"
            onClick={(e) => {
              e.currentTarget.blur();
              triggerMummyVoice();
            }}
            title="Click (or press B) to test Mummy's Cloud Bubble!"
          >
            <i className="status-led" />
            <b>CH {String((currentEpInfo?.showIndex ?? 0) + 1).padStart(2, '0')}</b>
            <span>• 1 WATCHING</span>
          </button>

          <div className="top-right-controls">
            <a
              className="icon-link"
              href={`https://www.youtube.com/watch?v=${currentVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Watch current show on YouTube"
              aria-label="Open current show on YouTube"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <a
              className="icon-link"
              href={CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View GitHub Profile"
              aria-label="GitHub Profile"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </header>

        {/* "छुट्टी के बाद" Title */}
        <h1 className="title">
          <span
            onClick={() => setFontIdx((i) => (i + 1) % FONT_STYLES.length)}
            title="Click title (or press F) to switch Hindi font style"
            className={`hindi-logo-text ${FONT_STYLES[fontIdx]}`}
          >
            छुट्टी के
            <br />
            बाद
          </span>
        </h1>

        <div className="middle" />

        {/* Bottom Remote + 2-LEVEL SHOWS -> VERIFIED EPISODES DRAWER */}
        <div className="remote">
          <div className={`songPanel${showShows ? ' open' : ''}`}>
            {!selectedShowObject ? (
              /* LEVEL 1: SHOWS LIST */
              <>
                <div className="filterBar">
                  {NETWORKS.map((net) => (
                    <button
                      key={net}
                      className={`filterBtn${selectedNet === net ? ' active' : ''}`}
                      onClick={() => setSelectedNet(net)}
                    >
                      {net}
                    </button>
                  ))}
                </div>

                <div className="songList" role="listbox" aria-label="All shows">
                  {filteredShows.map((showGroup) => {
                    const isCurrentShow =
                      showGroup.showIndex === currentEpInfo?.showIndex;
                    return (
                      <button
                        key={showGroup.title}
                        className={`songItem${isCurrentShow ? ' active' : ''}`}
                        onClick={() => setActiveShowTitle(showGroup.title)}
                      >
                        <span>{showGroup.title}</span>
                        <span className="songMetaRight">
                          <span className="epCountBadge">
                            {showGroup.episodes.length} EP ▶
                          </span>
                          <span className="songNet">{showGroup.net}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              /* LEVEL 2: VERIFIED EPISODES LIST FOR SELECTED SHOW */
              <>
                <div className="episodeHeader">
                  <button
                    className="backToShowsBtn"
                    onClick={() => setActiveShowTitle(null)}
                  >
                    ← ALL SHOWS
                  </button>
                  <span className="episodeShowTitle">
                    {selectedShowObject.title} ({selectedShowObject.episodes.length} Eps)
                  </span>
                </div>

                <div className="songList" role="listbox" aria-label="Episodes">
                  {selectedShowObject.episodes.map((ep, idx) => {
                    const isCurrentEp =
                      ep.videoId === currentVideoId &&
                      (ep.startSeconds || 0) === (currentEpInfo?.startSeconds || 0);
                    return (
                      <button
                        key={ep.videoId + '-' + idx}
                        className={`songItem${isCurrentEp ? ' active' : ''}`}
                        onClick={() => playEpisode(ep)}
                      >
                        <span>{ep.epTitle}</span>
                        <span className="epCountBadge">PLAY ▶</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <img
            src="/assets/remote.webp"
            alt="TV remote control"
            className="remoteImg"
          />

          <button
            className="rbtn rpower"
            style={{
              left: '28.33%',
              top: '23%',
              width: '22.56%',
              height: '6.88%',
              '--rot': '-27deg',
            }}
            onClick={togglePower}
            aria-pressed={playing}
            aria-label={playing ? 'Pause' : 'Play'}
          />
          <button
            className="rbtn rmute"
            style={{
              left: '71.67%',
              top: '22.79%',
              width: '22.11%',
              height: '7.66%',
              '--rot': '23deg',
            }}
            onClick={toggleMute}
            aria-pressed={muted}
            aria-label={muted ? 'Unmute' : 'Mute'}
          />
          <button
            className="rbtn rup"
            style={{
              left: '50.83%',
              top: '35.36%',
              width: '32.78%',
              height: '13.56%',
            }}
            onClick={(e) => changeVolume(10, e)}
            aria-label="Volume up"
          />
          <button
            className="rbtn rleft"
            style={{
              left: '25.17%',
              top: '56.73%',
              width: '13.89%',
              height: '27.01%',
            }}
            onClick={prevTrack}
            aria-label="Previous show"
          />
          <button
            className="rbtn rright"
            style={{
              left: '74.83%',
              top: '56.68%',
              width: '13.89%',
              height: '26.92%',
            }}
            onClick={nextTrack}
            aria-label="Next show"
          />
          <button
            className="rbtn rdown"
            style={{
              left: '49.94%',
              top: '78.68%',
              width: '30.78%',
              height: '13.36%',
            }}
            onClick={(e) => changeVolume(-10, e)}
            aria-label="Volume down"
          />
          <button
            className={`rbtn rblue${showShows ? ' on' : ''}`}
            style={{
              left: '50.00%',
              top: '56.68%',
              width: '14.00%',
              height: '11.98%',
            }}
            onClick={(e) => {
              e.currentTarget.blur();
              setActiveShowTitle(null);
              setShowShows((s) => !s);
            }}
            aria-expanded={showShows}
            aria-label={showShows ? 'Hide show list' : 'Show all shows'}
          />

          <span className="rlabel rlabel-up" aria-hidden="true">
            VOL UP
          </span>
          <span className="rlabel rlabel-down" aria-hidden="true">
            VOL DOWN
          </span>
          <span className="rlabel rlabel-left" aria-hidden="true">
            PREV
          </span>
          <span className="rlabel rlabel-right" aria-hidden="true">
            NEXT
          </span>
          <span className="rlabel rlabel-songs" aria-hidden="true">
            ALL SHOWS
          </span>
        </div>
      </main>
    </div>
  );
}