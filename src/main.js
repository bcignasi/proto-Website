const projectGrid = document.querySelector("#project-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const projects = window.PORTFOLIO_PROJECTS ?? [];

function projectMatchesFilter(project, filter) {
  return filter === "all" || project.language === filter || project.type === filter;
}

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const demoLink = project.demoUrl
    ? `<a href="${project.demoUrl}" target="_blank" rel="noreferrer">Demo</a>`
    : "";

  article.innerHTML = `
    <div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-meta">
        <span class="tag">${project.language}</span>
        <span class="tag">${project.type}</span>
      </div>
    </div>
    <div class="project-links">
      <a href="${project.githubUrl}" target="_blank" rel="noreferrer">Repositorio</a>
      ${demoLink}
    </div>
  `;

  return article;
}

function renderProjects(filter = "all") {
  const visibleProjects = projects.filter((project) => projectMatchesFilter(project, filter));
  projectGrid.replaceChildren(...visibleProjects.map(createProjectCard));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

renderProjects();
