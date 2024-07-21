document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
  });
  
  function loadProjects() {
    fetch('projects/projects.json')
      .then(response => response.json())
      .then(data => {
        const projectsContainer = document.querySelector('.projects-container');
        projectsContainer.innerHTML = '';
        data.projects.forEach(project => {
          const projectElement = document.createElement('div');
          projectElement.classList.add('project');
          projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.demoLink}" target="_blank">Live Demo</a>
            <a href="${project.codeLink}" target="_blank">Code Repository</a>
          `;
          projectsContainer.appendChild(projectElement);
        });
      });
  }
  