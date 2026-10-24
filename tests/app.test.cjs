const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

function app(window = {}) {
  const elements = new Map();
  function element() {
    return { textContent: '', innerHTML: '', children: [], dataset: {}, style: {},
      classList: { toggle() {}, add() {}, remove() {} },
      setAttribute() {}, addEventListener() {}, append(child) { this.children.push(child); } };
  }
  const document = {
    getElementById(id) { if (!elements.has(id)) elements.set(id, element()); return elements.get(id); },
    querySelectorAll() { return []; }, createElement: element, createElementNS: element,
    createTextNode(textContent) { return {textContent}; }
  };
  const timers=new Map(); let timerId=0;
  const context = vm.createContext({ document, window, console,
    speechSynthesis: window.speechSynthesis,
    SpeechSynthesisUtterance: function(text) { this.text=text; },
    setTimeout(fn,delay) { timers.set(++timerId,{fn,delay}); return timerId; },
    clearTimeout(id) { timers.delete(id); } });
  vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], context);
  return { run: code => vm.runInContext(code, context), document, timers };
}

test('wijzerconversie behoudt koppeling en minuten', () => {
  const a = app();
  a.run('setTime(3,0); for(let angle=6; angle<=180; angle+=6) setTimeFromMinuteAngle(angle)');
  assert.equal(a.run('totalMinutes'), 210);
  a.run('setTimeFromHourAngle(105)');
  assert.equal(a.run('totalMinutes'), 210);
  assert.equal(a.run('currentHour()'), 3);
  assert.equal(a.run('currentMinute()'), 30);
});
test('hele en halve uren in alle twaalf uren', () => {
  const a = app();
  for (let h = 1; h <= 12; h++) for (const m of [0, 30]) {
    a.run(`setTime(${h},${m}); goalHour=${h}; goalMinute=${m}`);
    assert.equal(a.run('isCorrect()'), true);
    assert.equal(a.run('currentHour()'), h);
    assert.equal(a.run('currentMinute()'), m);
    a.run('totalMinutes=mod(totalMinutes+10,720)');
    assert.equal(a.run('isCorrect()'), false);
  }
  assert.equal(a.run('phrase(12,30)'), 'half één');
  assert.equal(a.run('phrase(12,0)'), 'twaalf uur');
});
test('beide wijzers draaien vooruit en achteruit over twaalf', () => {
  const a = app();
  a.run('setTime(11,59); setTimeFromMinuteAngle(6)');
  assert.equal(a.run('totalMinutes'), 1);
  a.run('setTimeFromMinuteAngle(354)');
  assert.equal(a.run('totalMinutes'), 719);
  a.run('setTimeFromHourAngle(0.5)');
  assert.equal(a.run('totalMinutes'), 1);
  a.run('setTimeFromHourAngle(359.5)');
  assert.equal(a.run('totalMinutes'), 719);
});
test('spelmodi, speelwijzen, antwoorden en sterren', () => {
  const a = app();
  for (const play of ['together', 'solo']) for (const level of ['whole', 'half']) {
    for (const mode of ['discover', 'set', 'read']) {
      a.run(`play='${play}'; level='${level}'; mode='${mode}'; setup()`);
      const prompt=a.document.getElementById('prompt');
      assert.ok(prompt.textContent || prompt.children.length);
      assert.ok([0, 30].includes(a.run('currentMinute()')));
      if (mode === 'set') {
        a.run('setTime(goalHour,goalMinute)');
        a.document.getElementById('check').onclick();
        assert.equal(a.run('done'), true);
      }
      if (mode === 'read') {
        a.run('answer("onjuist")');
        assert.equal(a.run('done'), false);
        a.run('answer(timeValue(currentHour(),currentMinute()))');
        assert.equal(a.run('done'), true);
        const stars = a.run('stars');
        a.run('answer(timeValue(currentHour(),currentMinute()))');
        assert.equal(a.run('stars'), stars);
      }
    }
  }
});
test('centrale versie en veilig vernieuwen met behoud van URL', () => {
  let click, replaced;
  const label = {};
  const context = {
    document: { getElementById: id => id === 'app-version' ? label : { addEventListener: (_, fn) => { click = fn; } } },
    window: { location: { href: 'https://example.org/game/?refresh=old&x=1#clock', replace: url => { replaced = url; } } },
    URL, Date
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'src/version.js'), 'utf8'), context);
  assert.equal(label.textContent, 'v0.8.0');
  assert.match(html, /src="src\/version.js"/);
  click();
  const url = new URL(replaced);
  assert.equal(url.origin, 'https://example.org');
  assert.equal(url.pathname, '/game/');
  assert.equal(url.searchParams.get('x'), '1');
  assert.notEqual(url.searchParams.get('refresh'), 'old');
  assert.equal(url.searchParams.getAll('refresh').length, 1);
  assert.equal(url.hash, '#clock');
});

test('gedeelde tijdnotatie, kwartieren en afronding bij twaalf', () => {
  const a=app();
  for(const [h,m,text] of [[3,0,'3:00 (drie uur)'],[3,30,'3:30 (half vier)'],[5,15,'5:15 (kwart over vijf)'],[5,45,'5:45 (kwart voor zes)'],[12,30,'12:30 (half één)']]) {
    assert.equal(a.run(`timeText(${h},${m})`),text);
    a.run(`renderTime($('prompt'),${h},${m})`);
    const children=a.document.getElementById('prompt').children.slice(-4);
    assert.equal(children.map(c=>c.textContent).join(''),text);
    assert.equal(children[1].className,'time-digital');
    assert.equal(children[2].className,'time-written');
  }
  a.run('totalMinutes=719.8');
  assert.equal(a.run('currentHour()'),12);
  assert.equal(a.run('currentMinute()'),0);
});

test('antwoorden gebruiken tijdwaarden en alle antwoordknoppen werken', () => {
  const a=app();
  for(const level of ['whole','half']) {
    a.run(`level='${level}'; mode='read'; setup()`);
    const buttons=a.document.getElementById('answers').children.slice(-3);
    assert.equal(buttons.length,3);
    for(const b of buttons) {
      const digital=b.children[1].textContent;
      assert.match(digital,/^\d{1,2}:(00|30)$/);
      a.run('done=false');
      b.onclick();
      const [h,m]=digital.split(':').map(Number);
      assert.equal(a.run('done'),a.run(`timeValue(${h},${m})===timeValue(currentHour(),currentMinute())`));
    }
  }
  a.run('done=false; setTime(3,30); answer("half vier")');
  assert.equal(a.run('done'),false);
});

test('feest alleen op tientallen, eenmaal per drempel en overslaan werkt', () => {
  const a=app();
  a.run('globalThis.parties=0; const originalParty=startParty; startParty=()=>{parties++;originalParty();}');
  for(let i=1;i<=31;i++) {
    a.run('mode="set"; done=false; goalHour=3; goalMinute=0; setTime(3,0)');
    a.document.getElementById('check').onclick();
    a.document.getElementById('check').onclick();
    assert.equal(a.run('stars'),i);
    assert.equal(a.run('parties'),Math.floor(i/10));
    if(i%10===0) {
      assert.equal(a.document.getElementById('party').hidden,false);
      assert.equal(a.document.getElementById('balloons').children.slice(-12).length,12);
      assert.ok(a.document.getElementById('feedback').textContent);
      a.document.getElementById('skip-party').onclick();
      assert.equal(a.document.getElementById('party').hidden,true);
    }
  }
  a.run('stars=29; done=false; celebrate()');
  assert.equal(a.run('parties'),3);
});

test('feest sluit automatisch en volgende opdracht ruimt het feest op', () => {
  const a=app();
  a.run('stars=9; celebrate()');
  const timer=[...a.timers.values()][0];
  assert.equal(timer.delay,3800);
  timer.fn();
  assert.equal(a.document.getElementById('party').hidden,true);
  a.run('stars=19; done=false; celebrate(); setup()');
  assert.equal(a.document.getElementById('party').hidden,true);
  assert.equal(a.timers.size,0);
});

test('spraak gebruikt natuurlijk Nederlands zonder dubbele tijdnotatie', () => {
  let spoken;
  const a=app({speechSynthesis:{cancel(){},speak(u){spoken=u;}}});
  a.run('mode="set"; goalHour=3; goalMinute=30; speakPrompt()');
  assert.equal(spoken.text,'Maak: half vier!');
  assert.equal(spoken.lang,'nl-NL');
  a.run('mode="discover"; setTime(5,15); speakPrompt()');
  assert.equal(spoken.text,'Het is kwart over vijf!');
  a.run('mode="read"; speakPrompt()');
  assert.equal(spoken.text,'Hoe laat is het?');
});

test('alle 720 minuutposities hebben juiste Nederlandse tekst en één tijdpaar', () => {
  const a=app();
  const hours=['twaalf','één','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf'];
  // Onafhankelijke volledige minutentabel: H is huidig uur, N het volgende uur.
  const expected=[
    'H uur','één over H','twee over H','drie over H','vier over H','vijf over H',
    'zes over H','zeven over H','acht over H','negen over H','tien over H',
    'elf over H','twaalf over H','dertien over H','veertien over H','kwart over H',
    'zestien over H','zeventien over H','achttien over H','negentien over H',
    'tien voor half N','negen voor half N','acht voor half N','zeven voor half N',
    'zes voor half N','vijf voor half N','vier voor half N','drie voor half N',
    'twee voor half N','één voor half N','half N','één over half N',
    'twee over half N','drie over half N','vier over half N','vijf over half N',
    'zes over half N','zeven over half N','acht over half N','negen over half N',
    'tien over half N','negentien voor N','achttien voor N','zeventien voor N',
    'zestien voor N','kwart voor N','veertien voor N','dertien voor N',
    'twaalf voor N','elf voor N','tien voor N','negen voor N','acht voor N',
    'zeven voor N','zes voor N','vijf voor N','vier voor N','drie voor N','twee voor N','één voor N'
  ];
  assert.equal(expected.length,60);
  for(let h=1;h<=12;h++) for(let m=0;m<60;m++) {
    const words=expected[m].replace('H',hours[h%12]).replace('N',hours[(h+1)%12]);
    const digital=`${h}:${String(m).padStart(2,'0')}`;
    const text=`${digital} (${words})`;
    assert.equal(a.run(`phrase(${h},${m})`),words,`${h}:${m}`);
    assert.equal(a.run(`timeText(${h},${m})`),text);
    a.run(`setTime(${h},${m}); globalThis.sample=document.createElement('div'); renderTime(sample,${h},${m})`);
    assert.equal(a.run('currentHour()'),h);
    assert.equal(a.run('currentMinute()'),m);
    assert.equal(a.run('sample.children.length'),4);
    assert.equal(a.run('sample.children.map(c=>c.textContent).join("")'),text);
    a.run('mode="discover"; updateDiscoverPrompt()');
    assert.equal(a.document.getElementById('prompt').children.slice(-4).map(c=>c.textContent).join(''),`Het is ${text}!`);
  }
});

test('expliciete afstand en reduced-motion blijven aanwezig', () => {
  assert.match(html,/\.time-written\{[^}]*margin-inline-start:\.35em/);
  assert.match(html,/@media\(prefers-reduced-motion:reduce\)\{\.balloon\{animation:none;bottom:35%\}\}/);
  assert.match(html,/\.time-digital\{font-size:1\.2em;font-weight:850\}/);
});

test('halfuurconstructies worden ook natuurlijk uitgesproken rond twaalf', () => {
  let spoken;
  const a=app({speechSynthesis:{cancel(){},speak(u){spoken=u;}}});
  for(const [m,words] of [[19,'negentien over twaalf'],[20,'tien voor half één'],[25,'vijf voor half één'],[29,'één voor half één'],[30,'half één'],[31,'één over half één'],[35,'vijf over half één'],[40,'tien over half één'],[41,'negentien voor één']]) {
    a.run(`mode='discover'; setTime(12,${m}); speakPrompt()`);
    assert.equal(spoken.text,`Het is ${words}!`);
  }
});

test('alle modi en niveaus gebruiken hetzelfde digitale en geschreven tijdpaar', () => {
  const a=app();
  for(const level of ['whole','half']) for(const mode of ['discover','set','read']) {
    a.run(`level='${level}'; mode='${mode}'; setup()`);
    if(mode==='read') {
      assert.equal(a.document.getElementById('prompt').textContent,'Hoe laat is het?');
      for(const button of a.document.getElementById('answers').children.slice(-3)) {
        const [h,m]=button.children[1].textContent.split(':').map(Number);
        assert.equal(button.children.map(c=>c.textContent).join(''),a.run(`timeText(${h},${m})`));
      }
    } else {
      const expected=mode==='set' ? a.run('"Maak: "+timeText(goalHour,goalMinute)+"!"') : a.run('"Het is "+timeText(currentHour(),currentMinute())+"!"');
      assert.equal(a.document.getElementById('prompt').children.slice(-4).map(c=>c.textContent).join(''),expected);
    }
  }
});
