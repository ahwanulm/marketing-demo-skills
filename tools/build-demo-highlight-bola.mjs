import fs from 'node:fs';
import path from 'node:path';

const logoB64 = `data:image/png;base64,${fs.readFileSync('marketing/_shared/logo-klipers.png').toString('base64')}`;

// SVGs for match graphics
function svgB64(svgStr) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgStr.trim())}`;
}

// 1. Stadium Wide Shot (Match Wide)
const svgMatchWide = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 506" width="900" height="506">
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#07111e"/>
      <stop offset="40%" stop-color="#0c2340"/>
      <stop offset="100%" stop-color="#143a60"/>
    </linearGradient>
    <radialGradient id="lightBeam1" cx="0.1" cy="0.1" r="0.6">
      <stop offset="0%" stop-color="rgba(255,255,255,0.7)"/>
      <stop offset="50%" stop-color="rgba(190,225,255,0.2)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <radialGradient id="lightBeam2" cx="0.9" cy="0.1" r="0.6">
      <stop offset="0%" stop-color="rgba(255,255,255,0.7)"/>
      <stop offset="50%" stop-color="rgba(190,225,255,0.2)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <linearGradient id="pitchGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1f7a36"/>
      <stop offset="25%" stop-color="#156429"/>
      <stop offset="50%" stop-color="#1c7833"/>
      <stop offset="75%" stop-color="#145d26"/>
      <stop offset="100%" stop-color="#1a6e2f"/>
    </linearGradient>
    <radialGradient id="stadiumGlow" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0%" stop-color="rgba(255,255,255,0.15)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>

  <!-- Stadium Night Sky -->
  <rect width="900" height="506" fill="url(#skyGrad)"/>
  
  <!-- Stadium Stands & Roof Silhouette -->
  <path d="M0,180 Q450,110 900,180 L900,260 L0,260 Z" fill="#0b1726"/>
  <!-- Crowd texture / Dots -->
  <path d="M0,195 Q450,135 900,195 L900,260 L0,260 Z" fill="#112238" opacity="0.8"/>
  <circle cx="120" cy="190" r="2" fill="#fff" opacity="0.6"/>
  <circle cx="280" cy="180" r="1.5" fill="#facc15" opacity="0.7"/>
  <circle cx="450" cy="170" r="2" fill="#fff" opacity="0.8"/>
  <circle cx="620" cy="180" r="1.5" fill="#facc15" opacity="0.7"/>
  <circle cx="780" cy="190" r="2" fill="#fff" opacity="0.6"/>

  <!-- Stadium Floodlights -->
  <g transform="translate(60, 50)">
    <polygon points="0,40 10,-20 40,-20 50,40" fill="#cbd5e1" opacity="0.7"/>
    <circle cx="25" cy="-10" r="18" fill="#fff" filter="drop-shadow(0 0 16px #60a5fa)"/>
  </g>
  <g transform="translate(790, 50)">
    <polygon points="0,40 10,-20 40,-20 50,40" fill="#cbd5e1" opacity="0.7"/>
    <circle cx="25" cy="-10" r="18" fill="#fff" filter="drop-shadow(0 0 16px #60a5fa)"/>
  </g>
  <rect width="900" height="506" fill="url(#lightBeam1)"/>
  <rect width="900" height="506" fill="url(#lightBeam2)"/>

  <!-- Football Pitch Perspective -->
  <polygon points="0,250 900,250 900,506 0,506" fill="url(#pitchGrad)"/>
  <polygon points="0,250 900,250 900,506 0,506" fill="url(#stadiumGlow)"/>

  <!-- White Pitch Markings -->
  <line x1="450" y1="250" x2="450" y2="506" stroke="#ffffff" stroke-width="4" opacity="0.75"/>
  <ellipse cx="450" cy="378" rx="140" ry="60" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.75"/>
  <circle cx="450" cy="378" r="4" fill="#ffffff" opacity="0.9"/>
  <!-- Penalty box left perspective -->
  <path d="M0,320 L160,335 L160,450 L0,480" fill="none" stroke="#ffffff" stroke-width="3.5" opacity="0.7"/>
  <!-- Penalty box right perspective -->
  <path d="M900,320 L740,335 L740,450 L900,480" fill="none" stroke="#ffffff" stroke-width="3.5" opacity="0.7"/>

  <!-- Players Silhouette & Actions -->
  <!-- Player 1 (Blue) -->
  <g transform="translate(420, 320)">
    <ellipse cx="14" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.35)"/>
    <circle cx="14" cy="12" r="7" fill="#fbcfe8"/>
    <path d="M6,19 L22,19 L18,38 L10,38 Z" fill="#2563eb"/>
    <path d="M10,38 L7,50 M18,38 L22,49" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
  </g>
  <!-- Player 2 (Red) defending -->
  <g transform="translate(470, 310)">
    <ellipse cx="14" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.35)"/>
    <circle cx="14" cy="12" r="7" fill="#fbcfe8"/>
    <path d="M6,19 L22,19 L18,38 L10,38 Z" fill="#dc2626"/>
    <path d="M10,38 L5,48 M18,38 L19,51" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
  </g>
  <!-- Football in play -->
  <circle cx="446" cy="365" r="7" fill="#ffffff" stroke="#111" stroke-width="1.5"/>

  <!-- Official Broadcast Scorebug (Top Left) -->
  <g transform="translate(40, 30)">
    <rect width="280" height="36" rx="6" fill="#0c192e" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="36" rx="2" fill="#2563eb"/>
    <text x="18" y="23" font-family="Montserrat, Inter, sans-serif" font-weight="900" font-size="14" fill="#ffffff">PER</text>
    <rect x="62" y="5" width="46" height="26" rx="4" fill="#ffffff"/>
    <text x="85" y="23" font-family="Montserrat, Inter, sans-serif" font-weight="900" font-size="14" fill="#0c192e" text-anchor="middle">0 - 0</text>
    <text x="120" y="23" font-family="Montserrat, Inter, sans-serif" font-weight="900" font-size="14" fill="#ffffff">PSJ</text>
    <rect x="160" y="0" width="6" height="36" rx="2" fill="#f97316"/>
    <text x="195" y="23" font-family="Inter, sans-serif" font-weight="800" font-size="13" fill="#facc15">14:28</text>
    <rect x="246" y="8" width="22" height="20" rx="3" fill="#ef4444"/>
    <text x="257" y="22" font-family="Inter, sans-serif" font-weight="900" font-size="9" fill="#ffffff" text-anchor="middle">LIVE</text>
  </g>
</svg>
`;

// 2. Goal Moment (Rocket Goal 85')
const svgClipGoal = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 568" width="320" height="568">
  <defs>
    <linearGradient id="goalSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a192f"/>
      <stop offset="40%" stop-color="#112d4e"/>
      <stop offset="100%" stop-color="#1b4d3e"/>
    </linearGradient>
    <radialGradient id="burstGlow" cx="0.8" cy="0.35" r="0.5">
      <stop offset="0%" stop-color="rgba(250,204,21,0.85)"/>
      <stop offset="40%" stop-color="rgba(239,68,68,0.4)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  <rect width="320" height="568" fill="url(#goalSky)"/>
  
  <!-- Goal Net Geometry in Background -->
  <polygon points="180,80 320,120 320,380 180,320" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
  <line x1="180" y1="80" x2="320" y2="380" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <line x1="320" y1="120" x2="180" y2="320" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <line x1="210" y1="90" x2="210" y2="330" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
  <line x1="250" y1="100" x2="250" y2="350" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
  <line x1="290" y1="110" x2="290" y2="370" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>

  <!-- Goal Post (White Frame) -->
  <line x1="180" y1="80" x2="180" y2="320" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
  <line x1="180" y1="80" x2="320" y2="120" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>

  <!-- Energy Burst & Ball in Net -->
  <circle cx="255" cy="180" r="110" fill="url(#burstGlow)"/>
  <!-- Speed lines -->
  <line x1="60" y1="360" x2="245" y2="190" stroke="#facc15" stroke-width="4" stroke-dasharray="8 6" opacity="0.8"/>
  <line x1="70" y1="380" x2="248" y2="196" stroke="#ffffff" stroke-width="3" stroke-dasharray="12 8" opacity="0.9"/>
  <!-- Ball -->
  <circle cx="255" cy="180" r="22" fill="#ffffff" stroke="#111" stroke-width="3"/>
  <polygon points="255,166 268,175 264,190 246,190 242,175" fill="#111"/>

  <!-- Goalkeeper Diving (Desperate Save Attempt) -->
  <g transform="translate(140, 200) rotate(-35)">
    <rect x="-10" y="-30" width="24" height="65" rx="10" fill="#f59e0b"/>
    <circle cx="2" cy="-45" r="15" fill="#fbcfe8"/>
    <!-- Gloved Hand Reaching Out -->
    <rect x="-12" y="-75" width="12" height="30" rx="5" fill="#10b981"/>
    <circle cx="-6" cy="-80" r="9" fill="#10b981"/>
  </g>

  <!-- Striker in Foreground Celebrating -->
  <g transform="translate(60, 360)">
    <circle cx="35" cy="20" r="18" fill="#fbcfe8"/>
    <path d="M15,40 L55,40 L45,100 L25,100 Z" fill="#2563eb"/>
    <text x="35" y="70" font-family="Montserrat, Inter" font-weight="900" font-size="18" fill="#ffffff" text-anchor="middle">10</text>
    <!-- Arms raised in triumph -->
    <line x1="15" y1="50" x2="-10" y2="15" stroke="#2563eb" stroke-width="9" stroke-linecap="round"/>
    <line x1="55" y1="50" x2="80" y2="15" stroke="#2563eb" stroke-width="9" stroke-linecap="round"/>
  </g>

  <!-- Dark Vignette Bottom -->
  <rect y="440" width="320" height="128" fill="linear-gradient(to top, rgba(0,0,0,0.9), transparent)"/>
</svg>
`;

// 3. Save Moment (Goalkeeper Diving Reflex)
const svgClipSave = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 568" width="320" height="568">
  <defs>
    <linearGradient id="saveSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#061a29"/>
      <stop offset="50%" stop-color="#0c324c"/>
      <stop offset="100%" stop-color="#0f5132"/>
    </linearGradient>
    <radialGradient id="deflectGlow" cx="0.45" cy="0.35" r="0.4">
      <stop offset="0%" stop-color="rgba(56,189,248,0.9)"/>
      <stop offset="50%" stop-color="rgba(14,165,233,0.3)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  <rect width="320" height="568" fill="url(#saveSky)"/>

  <!-- Crossbar & Post -->
  <line x1="20" y1="120" x2="300" y2="120" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
  <line x1="295" y1="120" x2="295" y2="480" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
  
  <!-- Ball Deflection Shockwave -->
  <circle cx="150" cy="105" r="70" fill="url(#deflectGlow)"/>
  <!-- Ball tipped over bar -->
  <circle cx="145" cy="98" r="20" fill="#ffffff" stroke="#111" stroke-width="2.5"/>
  <polygon points="145,86 156,94 152,107 138,107 134,94" fill="#111"/>

  <!-- Goalkeeper in Air (Full Stretch Tip Over Bar) -->
  <g transform="translate(160, 220) rotate(42)">
    <!-- Yellow GK Jersey -->
    <rect x="-20" y="-40" width="38" height="85" rx="12" fill="#eab308"/>
    <text x="-1" y="8" font-family="Montserrat, Inter" font-weight="900" font-size="20" fill="#000" text-anchor="middle">14</text>
    <circle cx="-1" cy="-60" r="18" fill="#fbcfe8"/>
    <!-- Outstretched Arms & Keeper Glove -->
    <line x1="-15" y1="-30" x2="-75" y2="-120" stroke="#eab308" stroke-width="12" stroke-linecap="round"/>
    <!-- Huge Cyan/Green Goalkeeper Glove touching ball -->
    <ellipse cx="-82" cy="-128" rx="14" ry="18" fill="#06b6d4" stroke="#ffffff" stroke-width="2.5" transform="rotate(-25 -82 -128)"/>
  </g>

  <!-- Green Pitch Turf Below -->
  <polygon points="0,420 320,390 320,568 0,568" fill="#14532d"/>
  <line x1="0" y1="450" x2="320" y2="420" stroke="#ffffff" stroke-width="4" opacity="0.7"/>

  <!-- Dark Vignette Bottom -->
  <rect y="440" width="320" height="128" fill="linear-gradient(to top, rgba(0,0,0,0.9), transparent)"/>
</svg>
`;

// 4. Red Card Moment
const svgClipCard = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 568" width="320" height="568">
  <defs>
    <linearGradient id="cardSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#18070b"/>
      <stop offset="45%" stop-color="#3b1118"/>
      <stop offset="100%" stop-color="#14532d"/>
    </linearGradient>
    <radialGradient id="redGlow" cx="0.5" cy="0.32" r="0.45">
      <stop offset="0%" stop-color="rgba(239,68,68,0.85)"/>
      <stop offset="60%" stop-color="rgba(220,38,38,0.25)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  <rect width="320" height="568" fill="url(#cardSky)"/>

  <!-- Red Card Glow & Giant Red Card Hand -->
  <circle cx="160" cy="180" r="120" fill="url(#redGlow)"/>

  <!-- Referee Hand holding Red Card High -->
  <g transform="translate(160, 190)">
    <!-- Arm -->
    <line x1="0" y1="120" x2="0" y2="0" stroke="#fbcfe8" stroke-width="26" stroke-linecap="round"/>
    <rect x="-18" y="100" width="36" height="60" rx="8" fill="#facc15"/>
    <!-- Closed Fist -->
    <circle cx="0" cy="0" r="18" fill="#fbcfe8"/>
    <!-- Red Card in Hand -->
    <rect x="-24" y="-80" width="48" height="74" rx="6" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5" filter="drop-shadow(0 8px 24px rgba(239,68,68,0.7))"/>
  </g>

  <!-- Player Protesting in Silhouette -->
  <g transform="translate(60, 310)">
    <circle cx="30" cy="20" r="16" fill="#fbcfe8"/>
    <path d="M12,40 L48,40 L40,95 L20,95 Z" fill="#dc2626"/>
    <!-- Hands on Head / Disbelief -->
    <line x1="12" y1="50" x2="16" y2="15" stroke="#fbcfe8" stroke-width="8" stroke-linecap="round"/>
    <line x1="48" y1="50" x2="44" y2="15" stroke="#fbcfe8" stroke-width="8" stroke-linecap="round"/>
  </g>

  <!-- Referee Body Below -->
  <g transform="translate(180, 360)">
    <circle cx="30" cy="20" r="16" fill="#fbcfe8"/>
    <path d="M10,40 L50,40 L42,110 L18,110 Z" fill="#facc15"/>
    <rect x="25" y="40" width="10" height="70" fill="#000"/>
  </g>

  <!-- Dark Vignette Bottom -->
  <rect y="440" width="320" height="128" fill="linear-gradient(to top, rgba(0,0,0,0.9), transparent)"/>
</svg>
`;

// 5. YouTube Match Thumbnail
const svgYtThumb = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" width="480" height="270">
  <defs>
    <linearGradient id="ytGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
  </defs>
  <rect width="480" height="270" fill="url(#ytGrad)"/>

  <!-- Left Club Badge Shield (PERSIB) -->
  <g transform="translate(70, 75)">
    <path d="M0,0 L60,0 L60,50 Q60,90 30,110 Q0,90 0,50 Z" fill="#2563eb" stroke="#ffffff" stroke-width="3"/>
    <text x="30" y="55" font-family="Montserrat, Inter" font-weight="900" font-size="13" fill="#ffffff" text-anchor="middle">PERSIB</text>
  </g>

  <!-- VS in center -->
  <circle cx="240" cy="120" r="28" fill="#facc15" stroke="#000" stroke-width="3"/>
  <text x="240" y="128" font-family="Montserrat, Inter" font-weight="900" font-size="22" fill="#000" text-anchor="middle">VS</text>

  <!-- Right Club Badge Shield (PERSIJA) -->
  <g transform="translate(350, 75)">
    <path d="M0,0 L60,0 L60,50 Q60,90 30,110 Q0,90 0,50 Z" fill="#ea580c" stroke="#ffffff" stroke-width="3"/>
    <text x="30" y="55" font-family="Montserrat, Inter" font-weight="900" font-size="12" fill="#ffffff" text-anchor="middle">PERSIJA</text>
  </g>

  <!-- Banner Bottom -->
  <rect y="200" width="480" height="70" fill="rgba(0,0,0,0.85)"/>
  <text x="240" y="228" font-family="Montserrat, Inter" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">FULL HIGHLIGHT: DERBI INDONESIA</text>
  <text x="240" y="250" font-family="Inter" font-weight="700" font-size="12" fill="#facc15" text-anchor="middle">PEKAN 28 BRI LIGA 1 • 18:42 DURATION</text>

  <!-- HD badge -->
  <rect x="424" y="12" width="42" height="22" rx="4" fill="#ef4444"/>
  <text x="445" y="27" font-family="Inter" font-weight="900" font-size="11" fill="#fff" text-anchor="middle">1080p</text>
</svg>
`;

// 6. Master Reel Frame (Vertical 9:16 Center Action)
const svgReelCenter = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 694" width="390" height="694">
  <defs>
    <linearGradient id="turfBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b1726"/>
      <stop offset="35%" stop-color="#14532d"/>
      <stop offset="70%" stop-color="#15803d"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </linearGradient>
    <radialGradient id="flashGlow" cx="0.5" cy="0.5" r="0.6">
      <stop offset="0%" stop-color="rgba(255,255,255,0.2)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>

  <!-- Blurred Stadium Turf Background -->
  <rect width="390" height="694" fill="url(#turfBg)"/>
  <rect width="390" height="694" fill="url(#flashGlow)"/>

  <!-- 16:9 Central Sharp Match Window -->
  <g transform="translate(0, 180)">
    <rect width="390" height="220" fill="#15803d"/>
    <ellipse cx="195" cy="290" rx="280" ry="120" fill="#16a34a"/>
    <line x1="195" y1="0" x2="195" y2="220" stroke="#ffffff" stroke-width="3" opacity="0.7"/>
    <ellipse cx="195" cy="110" rx="90" ry="45" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.7"/>

    <!-- Striker Running to Corner Flag Knee Slide Celebration -->
    <g transform="translate(210, 80)">
      <circle cx="25" cy="14" r="12" fill="#fbcfe8"/>
      <!-- Kneeling body -->
      <path d="M10,28 L40,28 L32,60 L5,60 Z" fill="#2563eb"/>
      <text x="25" y="48" font-family="Montserrat, Inter" font-weight="900" font-size="13" fill="#ffffff" text-anchor="middle">10</text>
      <!-- Arms spread wide in glory -->
      <line x1="10" y1="36" x2="-14" y2="22" stroke="#2563eb" stroke-width="7" stroke-linecap="round"/>
      <line x1="40" y1="36" x2="64" y2="22" stroke="#2563eb" stroke-width="7" stroke-linecap="round"/>
      <!-- Turf spray particles behind -->
      <circle cx="-5" cy="64" r="3" fill="#86efac"/>
      <circle cx="-16" cy="58" r="2.5" fill="#86efac"/>
      <circle cx="-28" cy="62" r="2" fill="#86efac"/>
    </g>

    <!-- Mini Scorebug Inside Reel -->
    <g transform="translate(16, 16)">
      <rect width="145" height="26" rx="5" fill="rgba(12,25,46,0.92)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <rect x="0" y="0" width="4" height="26" rx="2" fill="#2563eb"/>
      <text x="12" y="17" font-family="Montserrat, Inter" font-weight="900" font-size="11" fill="#ffffff">PER</text>
      <rect x="42" y="4" width="28" height="18" rx="3" fill="#ffffff"/>
      <text x="56" y="17" font-family="Montserrat, Inter" font-weight="900" font-size="11" fill="#0c192e" text-anchor="middle">2-1</text>
      <text x="76" y="17" font-family="Montserrat, Inter" font-weight="900" font-size="11" fill="#ffffff">PSJ</text>
      <text x="110" y="17" font-family="Inter" font-weight="800" font-size="10" fill="#facc15">85:12</text>
    </g>
  </g>
</svg>
`;

console.log('Generating demo-highlight-bola-portrait assets and template...');

const replacements = {
  '__MATCH_WIDE__': svgB64(svgMatchWide),
  '__CLIP_GOAL__': svgB64(svgClipGoal),
  '__CLIP_SAVE__': svgB64(svgClipSave),
  '__CLIP_CARD__': svgB64(svgClipCard),
  '__YT_THUMB__': svgB64(svgYtThumb),
  '__REEL_CENTER__': svgB64(svgReelCenter),
  '__LOGO__': logoB64
};

const adDir = 'marketing/iklan/demo-highlight-bola-portrait';
const templatePath = path.join(adDir, 'template.html');
let content = fs.readFileSync(templatePath, 'utf8');

for (const [k, v] of Object.entries(replacements)) {
  content = content.replaceAll(k, v);
}

const outPath = path.join(adDir, 'index.html');
fs.writeFileSync(outPath, content, 'utf8');
console.log(`Successfully built ${outPath} (${(content.length / 1024).toFixed(1)} KB)`);

