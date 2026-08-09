const STORAGE_KEY = 'syncstudyProfiles';
const defaultProfiles = [
  {
    id: crypto.randomUUID(),
    name: 'Mia',
    subject: 'CS101: Algorithms',
    availability: 'Evenings',
    style: 'Quiet Focus',
    contact: 'mia.studies@gmail.com',
  },
  {
    id: crypto.randomUUID(),
    name: 'Noah',
    subject: 'MATH201: Calculus',
    availability: 'Weekends',
    style: 'Discussion & Quiz',
    contact: 'discord.gg/noahstudy',
  },
  {
    id: crypto.randomUUID(),
    name: 'Avery',
    subject: 'PHYS102: Physics',
    availability: 'Weekdays',
    style: 'Quiet Focus',
    contact: 'https://meet.google.com/xyz-study',
  },
];

const modalOverlay = document.getElementById('modalOverlay');
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const cancelFormButton = document.getElementById('cancelFormButton');
const profileForm = document.getElementById('profileForm');
const cardsGrid = document.getElementById('cardsGrid');
const countLabel = document.getElementById('countLabel');
const searchInput = document.getElementById('searchInput');
const subjectFilter = document.getElementById('subjectFilter');
const styleFilter = document.getElementById('styleFilter');
const availabilityFilter = document.getElementById('availabilityFilter');

let profiles = loadProfiles();

openModalButton.addEventListener('click', () => toggleModal(true));
closeModalButton.addEventListener('click', () => toggleModal(false));
cancelFormButton.addEventListener('click', () => toggleModal(false));
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) toggleModal(false);
});
profileForm.addEventListener('submit', handleFormSubmit);
searchInput.addEventListener('input', renderProfiles);
subjectFilter.addEventListener('change', renderProfiles);
styleFilter.addEventListener('change', renderProfiles);
availabilityFilter.addEventListener('change', renderProfiles);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalOverlay.classList.contains('invisible')) {
    toggleModal(false);
  }
});

renderFilters();
renderProfiles();

function loadProfiles() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch (error) {
      console.error('Could not parse saved profiles', error);
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfiles));
  return [...defaultProfiles];
}

function saveProfiles() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

function toggleModal(show) {
  if (show) {
    modalOverlay.classList.remove('invisible', 'opacity-0');
    modalOverlay.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
    profileForm.reset();
  } else {
    modalOverlay.classList.add('opacity-0');
    setTimeout(() => modalOverlay.classList.add('invisible'), 200);
    document.body.style.overflow = '';
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(profileForm);
  const name = formData.get('name')?.toString().trim();
  const subject = formData.get('subject')?.toString().trim();
  const availability = formData.get('availability')?.toString();
  const style = formData.get('studyStyle')?.toString();
  const contact = formData.get('contact')?.toString().trim();

  if (!name || !subject || !availability || !style) return;

  const newProfile = {
    id: crypto.randomUUID(),
    name,
    subject,
    availability,
    style,
    contact: contact || 'No contact provided',
  };

  profiles.unshift(newProfile);
  saveProfiles();
  renderFilters();
  renderProfiles();
  toggleModal(false);
}

function renderFilters() {
  const subjects = Array.from(new Set(profiles.map((profile) => profile.subject))).sort();
  subjectFilter.innerHTML = '<option value="">All subjects</option>' + subjects.map((subject) => `<option value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`).join('');
}

function renderProfiles() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedSubject = subjectFilter.value;
  const selectedStyle = styleFilter.value;
  const selectedAvailability = availabilityFilter.value;

  const visibleProfiles = profiles.filter((profile) => {
    const matchesSearch = [profile.name, profile.subject, profile.availability, profile.style, profile.contact]
      .some((text) => text.toLowerCase().includes(searchValue));
    const matchesSubject = selectedSubject ? profile.subject === selectedSubject : true;
    const matchesStyle = selectedStyle ? profile.style === selectedStyle : true;
    const matchesAvailability = selectedAvailability ? profile.availability === selectedAvailability : true;
    return matchesSearch && matchesSubject && matchesStyle && matchesAvailability;
  });

  countLabel.textContent = visibleProfiles.length;
  cardsGrid.innerHTML = visibleProfiles.length ? visibleProfiles.map(renderCardHtml).join('') : renderEmptyState();
}

function renderCardHtml(profile) {
  const initials = profile.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

  return `
    <article class="group rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-sky-500/50">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-lg font-semibold text-sky-300">${escapeHtml(initials)}</div>
            <div>
              <h3 class="text-xl font-semibold text-white">${escapeHtml(profile.name)}</h3>
              <p class="text-sm text-slate-400">${escapeHtml(profile.subject)}</p>
            </div>
          </div>
        </div>
        <span class="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-sky-300">${escapeHtml(profile.availability)}</span>
      </div>
      <div class="mt-6 space-y-4 text-sm text-slate-300">
        <div class="rounded-3xl bg-slate-950/80 p-4">
          <p class="text-slate-400">Study Style</p>
          <p class="mt-1 font-semibold text-white">${escapeHtml(profile.style)}</p>
        </div>
        <div class="rounded-3xl bg-slate-950/80 p-4">
          <p class="text-slate-400">Connect</p>
          <p class="mt-1 break-words text-white">${escapeHtml(profile.contact)}</p>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-between gap-4">
        <span class="rounded-2xl bg-slate-950/90 px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-400">Profile ID ${escapeHtml(profile.id.slice(0, 6))}</span>
        <button type="button" class="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40">View Workspace</button>
      </div>
    </article>
  `;
}

function renderEmptyState() {
  return `
    <div class="col-span-full rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/80 p-12 text-center text-slate-400">
      <p class="text-lg font-semibold text-white">No profiles matched your search.</p>
      <p class="mt-3">Try a different subject, style, or availability filter.</p>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
