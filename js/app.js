// ========================================
// Portfolio App v2
// ========================================

// ========================================
// Theme
// ========================================

const themeButton = document.getElementById("themeButton");
const nav = document.getElementById("sidebar-nav");
const content = document.getElementById("content");
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");

init();

function init() {

    loadTheme();

    buildSidebar();

    showSection("summary");

    themeButton.addEventListener("click", toggleTheme);

}

// ========================================
// Sidebar
// ========================================

function buildSidebar() {

    nav.innerHTML = "";

    portfolio.navigation.forEach(item => {

        const div = document.createElement("div");

        div.className = "nav-item";

        div.innerText = item.label;

        div.onclick = () => {

            document
                .querySelectorAll(".nav-item")
                .forEach(x => x.classList.remove("active"));

            div.classList.add("active");

            showSection(item.id);

        };

        nav.appendChild(div);

    });

    nav.firstChild.classList.add("active");

}

// ========================================
// Section renderer
// ========================================

function showSection(sectionName) {

    const section = portfolio.sections[sectionName];

    pageTitle.innerText = section.title;
    pageSubtitle.innerText = section.subtitle;

    content.innerHTML = "";

    // Summary page

   if (section.paragraphs) {

    section.paragraphs.forEach(text => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <div class="card-description">

                ${text}

            </div>

        `;

        content.appendChild(card);

    });

    return;

}

    // Skills page

    const grid = document.createElement("div");

    grid.className = "skill-grid";

    section.items.forEach(skill => {

        grid.appendChild(createSkillCard(skill));

    });

    content.appendChild(grid);

}

// ========================================
// Skill Card
// ========================================

function createSkillCard(skill, sectionKey) {

    const card = document.createElement("div");

    card.className = "skill-card";

    card.innerHTML = `

        <div class="skill-header">

            <div class="skill-title-group">

                <div class="skill-name">
                    ${skill.name}
                </div>

                ${skill.experience ? `

		<div class="skill-years">
    		🕒 ${skill.experience}
		</div>

		` : ""}

            </div>

            <span class="skill-level ${getSkillClass(skill.level)}">
   		 ${skill.level}
	</span>

        </div>

        <div class="card-description">

    ${skill.description}

</div>

${skill.email ? `

<div class="contact-email">

    <a href="mailto:${skill.email}" class="contact-email">

    📧 ${skill.email}

</a>

</div>

` : ""}

${skill.type === "contact" ? `

<div class="contact-highlights">

    ${skill.highlights.map(item => `
        <div class="contact-item">✔ ${item}</div>
    `).join("")}

</div>

` : skill.type === "language" ? `` : `

<div class="expand-text">

    ▼ View Details

</div>

`}
    `;

    if (skill.type !== "contact" && skill.type !== "language") {

    card.addEventListener("click", () => {

        toggleDetails(card, skill);

    });

}

    return card;

}

// ========================================
// Expand card
// ========================================

function toggleDetails(card, skill) {

    // Close all other cards first
    document.querySelectorAll(".skill-card").forEach(otherCard => {

        if (otherCard !== card) {

            const otherDetails = otherCard.querySelector(".skill-details");

            if (otherDetails) {
                otherDetails.remove();
            }

            const otherButton = otherCard.querySelector(".expand-text");

            if (otherButton) {
                otherButton.innerHTML = "▼ View Details";
            }

        }

    });

    // Is this card already open?
    const existing = card.querySelector(".skill-details");
    const button = card.querySelector(".expand-text");

    if (existing) {

        existing.remove();

        button.innerHTML = "▼ View Details";

        return;

    }

    // Create details
    const details = document.createElement("div");

    details.className = "skill-details";

    details.innerHTML = `

        <h4>Key Experience</h4>

        <ul>

            ${skill.highlights
                .map(item => `<li>${item}</li>`)
                .join("")}

        </ul>

    `;

    card.appendChild(details);

    button.innerHTML = "▲ Hide Details";

}

// ========================================
// Theme
// ========================================

function toggleTheme() {

    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    localStorage.setItem("theme", isLight ? "light" : "dark");

    themeButton.innerHTML = isLight ? "☀️" : "🌙";

}

function loadTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light");

        themeButton.innerHTML = "☀️";

    }
    else {

        themeButton.innerHTML = "🌙";

    }

}

function getSkillClass(level) {

    switch(level.toLowerCase()) {

        case "expert":
            return "expert";

        case "advanced":
            return "advanced";

        case "working knowledge":
            return "working";

        case "foundation":
            return "foundation";

        case "current":
            return "current";

        default:
            return "";

    }

}