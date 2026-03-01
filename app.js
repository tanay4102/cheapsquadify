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

  const CSV_PATH = 'male_players2.csv';

  const POSITION_ORDER = { GK: 0, RB: 1, RWB: 2, CB: 3, RCB: 3, LCB: 3, LB: 4, LWB: 5, CDM: 6, LDM: 6, RDM: 6, CM: 7, LCM: 7, RCM: 7, CAM: 8, LAM: 8, RAM: 8, LM: 9, RM: 10, LW: 11, RW: 12, LF: 13, CF: 14, RF: 15, ST: 16 };

  let state = {
    formation: null,
    players: [],
    lineupPlayers: [],
    clubName: '',
    fifaVersion: '',
    selectedTeam: [],
    usedClubKeys: new Set(),
    selectedLineupIndex: null,
  };

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => el.querySelectorAll(sel);

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
    return Array.from(map.values());
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

  function pickRandomFormation() {
    return FORMATIONS[Math.floor(Math.random() * FORMATIONS.length)];
  }

  function pickRandomClubVersion(players, excludeKeys) {
    const options = getClubVersionOptions(players).filter(g => g.players.length >= 1 && !excludeKeys.has(g.key));
    if (options.length === 0) return null;
    return options[Math.floor(Math.random() * options.length)];
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
      .then(r => r.ok ? r.text() : Promise.reject(new Error('CSV not found')))
      .then(parseCSV)
      .then(rows => { state.players = rows; return rows; })
      .catch(() => {
        state.players = getMockPlayers();
        return state.players;
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
    loadPlayers().then(() => {
      state.formation = pickRandomFormation();
      state.selectedTeam = state.formation.slots.map(() => null);
      state.usedClubKeys = new Set();
      const chosen = pickRandomClubVersion(state.players, state.usedClubKeys);
      if (!chosen) {
        alert('Not enough clubs in the data. Need at least 11 different club/version combinations.');
        return;
      }
      state.clubName = chosen.clubName;
      state.fifaVersion = chosen.fifaVersion;
      state.lineupPlayers = sortLineupByPosition(chosen.players);
      showStep(2);
      renderDraftStep();
    }).catch(function(err) {
      console.error(err);
      alert('Could not load players. Make sure male_players2.csv is in the same folder.');
    });
  }

  function onPlayerDropped(slotIndex, lineupIndex) {
    const player = state.lineupPlayers[lineupIndex];
    if (!player) return;
    state.selectedTeam[slotIndex] = player;
    state.selectedLineupIndex = null;
    state.usedClubKeys.add(state.clubName + '\n' + state.fifaVersion);
    const filled = state.selectedTeam.filter(Boolean).length;
    if (filled >= 11) {
      const completeBtn = document.getElementById('btn-complete-team');
      if (completeBtn) completeBtn.style.display = 'inline-block';
      renderDraftStep();
      return;
    }
    const chosen = pickRandomClubVersion(state.players, state.usedClubKeys);
    if (!chosen) {
      alert('Not enough clubs left. ' + filled + ' positions filled.');
      renderDraftStep();
      return;
    }
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

  function showTeam() {
    showStep(3);
    const pitch = document.getElementById('formation-pitch');
    const slots = state.formation.slots;
    const rows = getFormationRows(slots);
    const displayName = (p) => (p && (p.short_name || p.long_name)) ? escapeHtml(p.short_name || p.long_name) : '—';
    pitch.innerHTML = rows.map(row => `
      <div class="pitch-row">
        ${row.map(({ role, player }) => {
          const posRating = player ? getRatingAtPosition(player, role) : '';
          const showRating = posRating !== '' && !Number.isNaN(posRating);
          return '<div class="pitch-slot ' + (player ? '' : 'empty') + '">' +
            '<div class="slot-position">' + escapeHtml(role) + '</div>' +
            '<div class="slot-name">' + displayName(player) + '</div>' +
            (showRating ? '<div class="slot-overall">' + (Number.isInteger(posRating) ? posRating : posRating.toFixed(1)) + '</div>' : '') +
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
    const teamRating = ratings.length === 11
      ? (ratings.reduce((a, b) => a + b, 0) / 11).toFixed(1)
      : '—';
    const teamStatsEl = document.getElementById('team-stats');
    teamStatsEl.innerHTML = '<h3>Team rating</h3><p class="team-rating-value">' + teamRating + '</p><p class="score-note">Average of each player’s rating at their position (position column if present, else overall).</p>';
  }

  function getFormationRows(slots) {
    const layout = { '4-4-2': [1, 4, 4, 2], '4-3-3': [1, 4, 3, 3], '3-5-2': [1, 3, 5, 2], '3-4-3': [1, 3, 4, 3], '5-3-2': [1, 5, 3, 2] };
    const counts = layout[state.formation.id] || [1, 4, 4, 2];
    let i = 0;
    return counts.map(n => Array.from({ length: n }, () => ({ role: slots[i].role, player: state.selectedTeam[i++] })));
  }

  function init() {
    state.formation = pickRandomFormation();
    const shapeEl = document.getElementById('formation-shape');
    if (shapeEl) shapeEl.textContent = state.formation.shape;

    window.squadifyStartDraft = startDraft;

    const completeBtn = document.getElementById('btn-complete-team');
    if (completeBtn) completeBtn.addEventListener('click', () => showTeam());

    const newDraftBtn = document.getElementById('btn-new-draft');
    if (newDraftBtn) {
      newDraftBtn.addEventListener('click', () => {
        state.formation = pickRandomFormation();
        state.lineupPlayers = [];
        state.selectedTeam = [];
        state.usedClubKeys = new Set();
        state.selectedLineupIndex = null;
        const shapeEl = document.getElementById('formation-shape');
        if (shapeEl) shapeEl.textContent = state.formation.shape;
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
