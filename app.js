/**
 * Squadify — Draft
 * Random formation; 11 clubs shown one at a time (one player per club).
 * Team rating = average of each player’s overall at that position (position column, else overall).
 */

(function () {
  'use strict';

  const FORMATIONS = [
    { id: '4-4-2', label: '4-4-2', shape: '4-4-2', slots: [
      { role: 'GK', positions: ['GK'] },
      { role: 'RB', positions: ['RB','RWB','LB','LWB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'LB', positions: ['LB','RWB','RB','LWB'] },
      { role: 'RM', positions: ['RM','RW','RAM','LAM','LM','LW'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'LM', positions: ['LM','LW','LAM','RAM','RM','RW'] },
      { role: 'ST', positions: ['ST', 'CF'] },
      { role: 'ST', positions: ['ST', 'CF'] },
    ]},
    { id: '4-3-3', label: '4-3-3', shape: '4-3-3', slots: [
      { role: 'GK', positions: ['GK'] },
      { role: 'RB', positions: ['RB','RWB','LB','LWB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'LB', positions: ['RB','RWB','LB','LWB'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'RW', positions: ['LM','LW','LAM','RAM','RM','RW','ST','CF'] },
      { role: 'ST', positions: ['LM','LW','LAM','RAM','RM','RW','ST','CF'] },
      { role: 'LW', positions: ['LM','LW','LAM','RAM','RM','RW','ST','CF'] },
    ]},
    { id: '3-5-2', label: '3-5-2', shape: '3-5-2', slots: [
      { role: 'GK', positions: ['GK'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'LWB', positions: ['LWB', 'LB'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'RWB', positions: ['RWB', 'RB'] },
      { role: 'ST', positions: ['ST', 'CF'] },
      { role: 'ST', positions: ['ST', 'CF'] },
    ]},
    { id: '3-4-3', label: '3-4-3', shape: '3-4-3', slots: [
      { role: 'GK', positions: ['GK'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'LM', positions: ['LM'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'RM', positions: ['RM'] },
      { role: 'LW', positions: ['LW', 'LF'] },
      { role: 'ST', positions: ['ST', 'CF'] },
      { role: 'RW', positions: ['RW', 'RF'] },
    ]},
    { id: '5-3-2', label: '5-3-2', shape: '5-3-2', slots: [
      { role: 'GK', positions: ['GK'] },
      { role: 'RWB', positions: ['RWB', 'RB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'CB', positions: ['CB', 'RCB', 'LCB'] },
      { role: 'LWB', positions: ['LWB', 'LB'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'CM', positions: ['CM', 'CAM', 'CDM', 'LDM', 'RDM', 'LCM', 'RCM', 'RAM', 'LAM'] },
      { role: 'ST', positions: ['ST', 'CF'] },
      { role: 'ST', positions: ['ST', 'CF'] },
    ]},
  ];

  const CSV_PATH = 'male_players3.csv';

  const POSITION_ORDER = { GK: 0, RB: 1, RWB: 2, CB: 3, RCB: 3, LCB: 3, LB: 4, LWB: 5, CDM: 6, LDM: 6, RDM: 6, CM: 7, LCM: 7, RCM: 7, CAM: 8, LAM: 8, RAM: 8, LM: 9, RM: 10, LW: 11, RW: 12, LF: 13, CF: 14, RF: 15, ST: 16 };

  const PAIRING_ATTRIBUTES = [
    'pace', 'shooting', 'passing', 'dribbling', 'defending', 'physic',
    'attacking_crossing', 'attacking_finishing', 'attacking_heading_accuracy', 'attacking_short_passing', 'attacking_volleys',
    'skill_dribbling', 'skill_curve', 'skill_fk_accuracy', 'skill_long_passing', 'skill_ball_control',
    'movement_acceleration', 'movement_sprint_speed', 'movement_agility', 'movement_reactions', 'movement_balance',
    'power_shot_power', 'power_jumping', 'power_stamina', 'power_strength', 'power_long_shots',
    'mentality_aggression', 'mentality_interceptions', 'mentality_positioning', 'mentality_vision', 'mentality_penalties', 'mentality_composure',
    'defending_marking_awareness', 'defending_standing_tackle', 'defending_sliding_tackle'
  ];

  const ALL_OUTFIELD = ['RB', 'RWB', 'LB', 'LWB', 'CB', 'RM', 'CM', 'LM', 'RW', 'LW', 'ST'];
  const ALL_MIDFIELD_AND_FORWARDS = ['RM', 'RW', 'CM', 'LM', 'LW', 'ST'];
  const ROLE_PAIRED_WITH = {
    GK: [],
    RB: ['RM', 'RW', 'CM', 'CB'],
    RWB: ['RM', 'RW', 'CM', 'CB'],
    LB: ['LM', 'LW', 'CM', 'CB'],
    LWB: ['LM', 'LW', 'CM', 'CB'],
    CB: ['RWB', 'RB', 'LWB', 'LB', 'CB', 'CM'],
    CM: ALL_OUTFIELD,
    RM: ['RM', 'RW', 'CM', 'LM', 'LW', 'ST', 'RB', 'RWB'],
    RW: ['RM', 'RW', 'CM', 'LM', 'LW', 'ST', 'RB', 'RWB'],
    LM: ['RM', 'CM', 'LM', 'RW', 'LW', 'ST', 'LB', 'LWB'],
    LW: ['RM', 'CM', 'LM', 'RW', 'LW', 'ST', 'LB', 'LWB'],
    ST: ALL_MIDFIELD_AND_FORWARDS,
  };

  let state = {
    formation: null,
    players: [],
    lineupPlayers: [],
    clubName: '',
    fifaVersion: '',
    selectedTeam: [],
    selectedLineupIndex: null,
    clubSequence: [],
    clubSequenceIndex: 0,
  };

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => el.querySelectorAll(sel);

  function getGMTDateKey() {
    const d = new Date();
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    return h >>> 0;
  }

  function seededRng(seed) {
    return function() {
      seed = (seed + 0x6D2B79F5) | 0;
      let t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      return ((t ^ (t >>> 15)) >>> 0) / 4294967296;
    };
  }

  function showStep(stepNum) {
    $$('.step-panel').forEach(p => p.classList.remove('active'));
    $$('.step').forEach(s => {
      s.classList.remove('active', 'done');
      const n = parseInt(s.dataset.step, 10);
      if (n === stepNum) s.classList.add('active');
      else if (n < stepNum) s.classList.add('done');
    });
    const id = ['formation', 'draft', 'team'][stepNum - 1];
    const panel = document.getElementById('step-' + id);
    if (panel) panel.classList.add('active');
  }

  function getClubVersionKey(p) {
    return (p.club_name || '').trim() + '\n' + String(p.fifa_version || '').trim();
  }

  function getClubVersionOptions(players) {
    const map = new Map();
    players.forEach(p => {
      const k = getClubVersionKey(p);
      if (!map.has(k)) map.set(k, { key: k, clubName: (p.club_name || '').trim(), fifaVersion: String(p.fifa_version || '').trim(), players: [] });
      map.get(k).players.push(p);
    });
    return Array.from(map.values()).map(g => {
      const overalls = g.players.map(p => parseFloat(p.overall)).filter(n => !Number.isNaN(n));
      g.avgOverall = overalls.length ? overalls.reduce((a, b) => a + b, 0) / overalls.length : 0;
      g.leagueName = (g.players[0] && g.players[0].league_name) ? String(g.players[0].league_name).trim() : '';
      return g;
    });
  }

  function getClubSequenceForDate(players, dateKey) {
    const allOptions = getClubVersionOptions(players).filter(g => g.players.length >= 1);
    if (allOptions.length === 0) return [];
    const rng = seededRng(hashString(dateKey + 'clubs'));
    const result = [];
    let options = allOptions.slice();
    for (let n = 0; n < 11 && options.length > 0; n++) {
      const baseWeights = options.map(g => Math.max(1, (g.avgOverall || 0) - 50));
      const leagueMultiplier = (g) => {
        const league = (g.leagueName || '').trim();
        if (league === 'Premier League') return 3;
        if (league === 'La Liga') return 2;
        return 1;
      };
      const weights = options.map((g, i) => baseWeights[i] * leagueMultiplier(g));
      const total = weights.reduce((a, b) => a + b, 0);
      if (total <= 0) {
        const picked = options[Math.floor(rng() * options.length)];
        result.push(picked);
        options = options.filter(o => o.clubName !== picked.clubName);
        continue;
      }
      let r = rng() * total;
      let picked = null;
      for (let i = 0; i < options.length; i++) {
        r -= weights[i];
        if (r <= 0) { picked = options[i]; break; }
      }
      if (!picked) picked = options[options.length - 1];
      result.push(picked);
      options = options.filter(o => o.clubName !== picked.clubName);
    }
    return result;
  }

  function positionSortOrder(player) {
    const raw = (player.player_positions || '').trim();
    if (!raw) return 999;
    const positions = raw.split(',').map(p => p.trim().toUpperCase());
    const order = Math.min(...positions.map(pos => (POSITION_ORDER[pos] !== undefined ? POSITION_ORDER[pos] : 99)));
    return order;
  }

  function sortLineupByPosition(players) {
    return players.slice().sort((a, b) => positionSortOrder(b) - positionSortOrder(a));
  }

  function parseCSVLine(line) {
    const out = [];
    let i = 0;
    while (i < line.length) {
      if (line[i] === '"') {
        i++;
        let field = '';
        while (i < line.length && line[i] !== '"') {
          field += line[i];
          i++;
        }
        if (line[i] === '"') i++;
        if (line[i] === ',') i++;
        out.push(field.trim());
      } else {
        let field = '';
        while (i < line.length && line[i] !== ',') {
          field += line[i];
          i++;
        }
        out.push(field.trim());
        if (i < line.length && line[i] === ',') i++;
      }
    }
    return out;
  }

  function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return [];
    const header = parseCSVLine(lines[0]);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row = {};
      header.forEach((h, j) => { row[h] = values[j] ?? ''; });
      rows.push(row);
    }
    return rows;
  }

  function loadPlayers() {
    return fetch(CSV_PATH)
      .then(r => {
        if (!r.ok) throw new Error('CSV not found: ' + CSV_PATH + '. Serve the folder with a local server (e.g. python -m http.server) and ensure ' + CSV_PATH + ' is in the same folder as index.html.');
        return r.text();
      })
      .then(parseCSV)
      .then(rows => {
        if (!rows.length) throw new Error('CSV is empty or has no data rows.');
        state.players = rows;
        return rows;
      })
      .catch(function(err) {
        state.players = [];
        alert(err.message || 'Failed to load ' + CSV_PATH + '. Check the file exists and you opened the app via a local server (e.g. http://localhost:8000), not by double-clicking index.html.');
        return Promise.reject(err);
      });
  }

  function getMockPlayers() {
    const clubs = ['Club A', 'Club B'];
    const names = ['Player One', 'Player Two', 'Player Three', 'Player Four', 'Player Five', 'Player Six', 'Player Seven', 'Player Eight', 'Player Nine', 'Player Ten', 'Player Eleven', 'Player Twelve', 'Player Thirteen', 'Player Fourteen', 'Player Fifteen', 'Player Sixteen', 'Player Seventeen'];
    const out = [];
    for (let i = 0; i < 40; i++) {
      out.push({
        short_name: names[i % names.length] + ' ' + (i + 1),
        player_positions: 'CM',
        preferred_foot: i % 2 ? 'Right' : 'Left',
        nationality_name: (['England', 'Spain', 'France'])[i % 3],
        club_name: clubs[i % clubs.length],
        fifa_version: '24.0',
        overall: String(65 + Math.floor(Math.random() * 30)),
      });
    }
    return out;
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function playerId(p) {
    return p.player_id != null && p.player_id !== '' ? String(p.player_id) : (p.short_name || '') + (p.long_name || '');
  }

  function startDraft() {
    state.formation = (window.selectedFormationId && FORMATIONS.find(f => f.id === window.selectedFormationId)) || state.formation;
    if (!state.formation) {
      alert('Please select a formation first.');
      return;
    }
    loadPlayers().then(() => {
      const dateKey = getGMTDateKey();
      state.clubSequence = getClubSequenceForDate(state.players, dateKey);
      if (state.clubSequence.length < 11) {
        alert('Not enough distinct clubs in the data. Need at least 11 different club names (any version).');
        return;
      }
      state.clubSequenceIndex = 0;
      state.selectedTeam = state.formation.slots.map(() => null);
      const chosen = state.clubSequence[0];
      state.clubName = chosen.clubName;
      state.fifaVersion = chosen.fifaVersion;
      state.lineupPlayers = sortLineupByPosition(chosen.players);
      showStep(2);
      renderDraftStep();
    }).catch(function(err) {
      console.error(err);
      alert('Could not load players. Make sure male_players3.csv is in the same folder.');
    });
  }

  function onPlayerDropped(slotIndex, lineupIndex) {
    const player = state.lineupPlayers[lineupIndex];
    if (!player) return;
    state.selectedTeam[slotIndex] = player;
    state.selectedLineupIndex = null;
    const filled = state.selectedTeam.filter(Boolean).length;
    if (filled >= 11) {
      const completeBtn = document.getElementById('btn-complete-team');
      if (completeBtn) completeBtn.style.display = 'inline-block';
      renderDraftStep();
      return;
    }
    state.clubSequenceIndex++;
    const chosen = state.clubSequence[state.clubSequenceIndex];
    state.clubName = chosen.clubName;
    state.fifaVersion = chosen.fifaVersion;
    state.lineupPlayers = sortLineupByPosition(chosen.players);
    renderDraftStep();
  }

  function renderDraftStep() {
    const filled = state.selectedTeam.filter(Boolean).length;

    const clubLabel = document.getElementById('club-version-label');
    if (clubLabel) {
      if (filled >= 11) clubLabel.textContent = 'All positions filled. Click View team below.';
      else clubLabel.textContent = state.clubName + ' · FIFA ' + (state.fifaVersion || '—') + ' — ' + filled + ' of 11 positions filled.';
    }

    const hintEl = document.getElementById('draft-hint');
    if (hintEl) {
      if (filled >= 11) hintEl.textContent = '';
      else if (state.selectedLineupIndex != null) hintEl.textContent = 'Now click an empty position to assign this player.';
      else hintEl.textContent = 'Click a player, then click an empty position to assign.';
    }

    const listEl = document.getElementById('lineup-list');
    if (listEl && filled < 11) {
      listEl.innerHTML = state.lineupPlayers.map((p, lineupIndex) => {
        const name = p.short_name || p.long_name || 'Unknown';
        const positions = (p.player_positions || '').trim() || '—';
        const foot = (p.preferred_foot || '').trim() || '—';
        const nationality = (p.nationality_name || '').trim() || '—';
        const selected = state.selectedLineupIndex === lineupIndex;
        return '<button type="button" class="player-card lineup-player' + (selected ? ' selected' : '') + '" data-lineup-index="' + lineupIndex + '">' +
          '<div class="name">' + escapeHtml(name) + '</div>' +
          '<div class="meta">' + escapeHtml(positions) + ' · ' + escapeHtml(foot) + ' · ' + escapeHtml(nationality) + '</div>' +
          '</button>';
      }).join('');

      listEl.querySelectorAll('.lineup-player').forEach(el => {
        el.addEventListener('click', function() {
          const idx = parseInt(el.getAttribute('data-lineup-index'), 10);
          state.selectedLineupIndex = state.selectedLineupIndex === idx ? null : idx;
          renderDraftStep();
        });
      });
    } else if (listEl) {
      listEl.innerHTML = '';
    }

    const pitchEl = document.getElementById('draft-pitch');
    if (pitchEl && state.formation) {
      const layout = { '4-4-2': [1, 4, 4, 2], '4-3-3': [1, 4, 3, 3], '3-5-2': [1, 3, 5, 2], '3-4-3': [1, 3, 4, 3], '5-3-2': [1, 5, 3, 2] };
      const counts = layout[state.formation.id] || [1, 4, 4, 2];
      const slots = state.formation.slots;
      let i = 0;
      const rows = counts.map(n => Array.from({ length: n }, () => ({ role: slots[i].role, slotIndex: i++ })));
      pitchEl.innerHTML = rows.map(row => `
        <div class="pitch-row">
          ${row.map(({ role: r, slotIndex: si }) => {
            const player = state.selectedTeam[si];
            const name = player ? (player.short_name || player.long_name || '—') : '—';
            const club = player ? (player.club_name || '').trim() : '';
            const version = player ? String(player.fifa_version || '').trim() : '';
            const parts = [];
            if (club) parts.push(escapeHtml(club));
            if (version) parts.push('FIFA ' + escapeHtml(version));
            const clubLine = player && parts.length ? '<div class="slot-club">' + parts.join(' · ') + '</div>' : '';
            const empty = !player;
            return '<button type="button" class="pitch-slot' + (empty ? ' empty slot-clickable' : '') + '"' + (empty ? ' data-slot-index="' + si + '"' : '') + '>' +
              '<div class="slot-position">' + escapeHtml(r) + '</div>' +
              '<div class="slot-name">' + escapeHtml(name) + '</div>' +
              clubLine +
              '</button>';
          }).join('')}
        </div>
      `).join('');

      pitchEl.querySelectorAll('.pitch-slot.slot-clickable').forEach(slotEl => {
        slotEl.addEventListener('click', function() {
          if (state.selectedLineupIndex == null) return;
          const slotIndex = parseInt(slotEl.getAttribute('data-slot-index'), 10);
          if (Number.isNaN(slotIndex)) return;
          onPlayerDropped(slotIndex, state.selectedLineupIndex);
        });
      });
    }

    const completeBtn = document.getElementById('btn-complete-team');
    if (completeBtn) completeBtn.style.display = filled >= 11 ? 'inline-block' : 'none';
  }

  function roleToColumn(role) {
    return (role || '').toLowerCase();
  }

  function parsePositionRating(val) {
    if (val == null || val === '') return NaN;
    val = String(val).trim();
    const num = parseFloat(val);
    if (!Number.isNaN(num)) return num;
    const m = val.match(/^(\d+)/);
    return m ? parseInt(m[1], 10) : NaN;
  }

  function getRatingAtPosition(player, role) {
    const col = roleToColumn(role);
    if (player[col] != null && player[col] !== '') {
      const n = parsePositionRating(player[col]);
      if (!Number.isNaN(n)) return n;
    }
    return parsePositionRating(player.overall);
  }

  function getAttributeValue(player, attr) {
    if (!player || player[attr] == null || player[attr] === '') return NaN;
    return parsePositionRating(player[attr]);
  }

  function parseWorkRate(val) {
    if (val == null || val === '') return { attack: NaN, defence: NaN };
    const s = String(val).trim();
    const i = s.indexOf('/');
    if (i < 0) return { attack: NaN, defence: NaN };
    const attackStr = s.slice(0, i).trim().toLowerCase();
    const defenceStr = s.slice(i + 1).trim().toLowerCase();
    const score = (x) => { if (x === 'low') return 1; if (x === 'medium') return 2; if (x === 'high') return 3; return NaN; };
    return { attack: score(attackStr), defence: score(defenceStr) };
  }

  function pairScore(playerA, playerB) {
    if (!playerA || !playerB) return NaN;
    let sum = 0;
    let count = 0;
    for (let i = 0; i < PAIRING_ATTRIBUTES.length; i++) {
      const a = getAttributeValue(playerA, PAIRING_ATTRIBUTES[i]);
      const b = getAttributeValue(playerB, PAIRING_ATTRIBUTES[i]);
      if (!Number.isNaN(a) && !Number.isNaN(b)) {
        sum += Math.max(a, b);
        count++;
      }
    }
    return count === 0 ? NaN : sum / count;
  }

  function getComplimentaryScores(selectedTeam, slots) {
    const pairedRoles = (role) => ROLE_PAIRED_WITH[role] || [];
    const scores = selectedTeam.map(() => []);
    for (let i = 0; i < 11; i++) {
      const roleI = slots[i].role;
      const allowed = new Set(pairedRoles(roleI));
      for (let j = 0; j < 11; j++) {
        if (i === j) continue;
        if (!allowed.has(slots[j].role)) continue;
        const pA = selectedTeam[i];
        const pB = selectedTeam[j];
        if (!pA || !pB) continue;
        const ps = pairScore(pA, pB);
        if (!Number.isNaN(ps)) scores[i].push(ps);
      }
    }
    return scores.map(arr => arr.length === 0 ? NaN : arr.reduce((a, b) => a + b, 0) / arr.length);
  }

  function showTeam() {
    showStep(3);
    const pitch = document.getElementById('formation-pitch');
    const slots = state.formation.slots;
    const complimentaryScores = getComplimentaryScores(state.selectedTeam, slots);
    const rows = getFormationRows(slots);
    const displayName = (p) => (p && (p.short_name || p.long_name)) ? escapeHtml(p.short_name || p.long_name) : '—';
    let slotIndex = 0;
    pitch.innerHTML = rows.map(row => `
      <div class="pitch-row">
        ${row.map(({ role, player }) => {
          const si = slotIndex++;
          const posRating = player ? getRatingAtPosition(player, role) : '';
          const showRating = posRating !== '' && !Number.isNaN(posRating);
          const compScore = complimentaryScores[si];
          const showComp = !Number.isNaN(compScore);
          const club = player ? (player.club_name || '').trim() : '';
          const year = player ? String(player.fifa_version || '').trim() : '';
          const clubYear = [club, year ? 'FIFA ' + year : ''].filter(Boolean).join(' · ');
          return '<div class="pitch-slot ' + (player ? '' : 'empty') + '">' +
            '<div class="slot-position">' + escapeHtml(role) + '</div>' +
            '<div class="slot-name">' + displayName(player) + '</div>' +
            (player && clubYear ? '<div class="slot-club">' + escapeHtml(clubYear) + '</div>' : '') +
            (showRating ? '<div class="slot-overall">' + (Number.isInteger(posRating) ? posRating : posRating.toFixed(1)) + '</div>' : '') +
            (showComp ? '<div class="slot-complimentary">Comp ' + compScore.toFixed(1) + '</div>' : '') +
            '</div>';
        }).join('')}
      </div>
    `).join('');

    const ratings = [];
    for (let i = 0; i < 11; i++) {
      const p = state.selectedTeam[i];
      const role = slots[i].role;
      if (p) {
        const r = getRatingAtPosition(p, role);
        if (!Number.isNaN(r)) ratings.push(r);
      }
    }
    const avgOverall = ratings.length === 11 ? ratings.reduce((a, b) => a + b, 0) / 11 : NaN;
    const compScoresValid = complimentaryScores.filter(c => !Number.isNaN(c));
    const avgComplimentary = compScoresValid.length > 0 ? compScoresValid.reduce((a, b) => a + b, 0) / compScoresValid.length : NaN;
    const mentalityValues = state.selectedTeam.map(p => p ? getAttributeValue(p, 'mentality_composure') : NaN).filter(v => !Number.isNaN(v));
    const avgMentality = mentalityValues.length > 0 ? mentalityValues.reduce((a, b) => a + b, 0) / mentalityValues.length : NaN;
    const workRates = state.selectedTeam.map(p => p && p.work_rate != null && p.work_rate !== '' ? parseWorkRate(p.work_rate) : { attack: NaN, defence: NaN });
    const attackWr = workRates.map(w => w.attack).filter(v => !Number.isNaN(v));
    const defenceWr = workRates.map(w => w.defence).filter(v => !Number.isNaN(v));
    const avgAttackWorkRate = attackWr.length > 0 ? attackWr.reduce((a, b) => a + b, 0) / attackWr.length : NaN;
    const avgDefenceWorkRate = defenceWr.length > 0 ? defenceWr.reduce((a, b) => a + b, 0) / defenceWr.length : NaN;
    let totalScore = Number.isNaN(avgOverall) ? NaN : avgOverall;
    if (!Number.isNaN(avgComplimentary)) totalScore += 0.2 * avgComplimentary;
    if (!Number.isNaN(avgMentality)) totalScore += 0.1 * avgMentality;
    if (!Number.isNaN(avgAttackWorkRate)) totalScore += 5 * avgAttackWorkRate;
    if (!Number.isNaN(avgDefenceWorkRate)) totalScore += 5 * avgDefenceWorkRate;
    const finalScore = totalScore;
    const teamRatingStr = Number.isNaN(avgOverall) ? '—' : avgOverall.toFixed(1);
    const compStr = Number.isNaN(avgComplimentary) ? '—' : avgComplimentary.toFixed(1);
    const mentalityStr = Number.isNaN(avgMentality) ? '—' : avgMentality.toFixed(1);
    const attackWrStr = Number.isNaN(avgAttackWorkRate) ? '—' : avgAttackWorkRate.toFixed(1);
    const defenceWrStr = Number.isNaN(avgDefenceWorkRate) ? '—' : avgDefenceWorkRate.toFixed(1);
    const finalStr = Number.isNaN(finalScore) ? '—' : finalScore.toFixed(1);
    const teamStatsEl = document.getElementById('team-stats');
    teamStatsEl.innerHTML = '<h3>Team rating</h3>' +
      '<p class="team-rating-value">' + finalStr + '</p>' +
      '<p class="score-note">Final = average overall + 0.2 × complimentary + 0.1 × mentality + 5 × attack work rate + 5 × defence work rate.</p>' +
      '<p class="score-breakdown">Average overall: <strong>' + teamRatingStr + '</strong> &nbsp;|&nbsp; Average complimentary: <strong>' + compStr + '</strong> &nbsp;|&nbsp; Average mentality: <strong>' + mentalityStr + '</strong> &nbsp;|&nbsp; Average attack work rate: <strong>' + attackWrStr + '</strong> &nbsp;|&nbsp; Average defence work rate: <strong>' + defenceWrStr + '</strong></p>';
  }

  function getFormationRows(slots) {
    const layout = { '4-4-2': [1, 4, 4, 2], '4-3-3': [1, 4, 3, 3], '3-5-2': [1, 3, 5, 2], '3-4-3': [1, 3, 4, 3], '5-3-2': [1, 5, 3, 2] };
    const counts = layout[state.formation.id] || [1, 4, 4, 2];
    let i = 0;
    return counts.map(n => Array.from({ length: n }, () => ({ role: slots[i].role, player: state.selectedTeam[i++] })));
  }

  function init() {
    window.squadifyStartDraft = startDraft;

    const completeBtn = document.getElementById('btn-complete-team');
    if (completeBtn) completeBtn.addEventListener('click', () => showTeam());

    const newDraftBtn = document.getElementById('btn-new-draft');
    if (newDraftBtn) {
      newDraftBtn.addEventListener('click', () => {
        state.formation = null;
        state.lineupPlayers = [];
        state.selectedTeam = [];
        state.clubSequence = [];
        state.clubSequenceIndex = 0;
        state.selectedLineupIndex = null;
        window.selectedFormationId = null;
        $$('.formation-card').forEach(c => c.classList.remove('selected'));
        const startBtn = document.getElementById('btn-start-draft');
        if (startBtn) startBtn.disabled = true;
        showStep(1);
      });
    }

    showStep(1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
