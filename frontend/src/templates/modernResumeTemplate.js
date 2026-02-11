export const generateResumeHTML = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      font-size: 14px;
      color: #000;
      line-height: 1.5;
    }

    h1 {
      font-size: 22px;
      margin-bottom: 5px;
      letter-spacing: 1px;
    }

    .contact {
      font-size: 12px;
      margin-bottom: 15px;
    }

    .section-title {
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #000;
      margin-top: 18px;
      margin-bottom: 8px;
      padding-bottom: 2px;
    }

    .job-title {
      font-weight: bold;
    }

    .company-date {
      float: right;
      font-size: 12px;
    }

    ul {
      margin: 5px 0 10px 18px;
      padding: 0;
    }

    li {
      margin-bottom: 4px;
    }

    .clear {
      clear: both;
    }

  </style>
</head>

<body>

  <!-- HEADER -->
  <h1>${data.name || "Candidate Name"}</h1>

  <div class="contact">
    ${data.email || "email@example.com"} |
    ${data.phone || "+91 XXXXX XXXXX"} |
    ${data.linkedin || "linkedin.com/in/username"} |
    ${data.github || "github.com/username"}
  </div>

  <!-- SUMMARY -->
  <div class="section-title">PROFESSIONAL SUMMARY</div>
  <p>${data.professional_summary || ""}</p>

  <!-- EXPERIENCE -->
  ${data.experience?.length ? `
  <div class="section-title">EXPERIENCE</div>
  ${data.experience.map(exp => `
    <div>
      <span class="job-title">${exp.role}</span>,
      ${exp.company}
      <span class="company-date">${exp.duration}</span>
    </div>
    <div class="clear"></div>
    <ul>
      ${exp.points.map(point => `<li>${point}</li>`).join("")}
    </ul>
  `).join("")}
  ` : ""}

  <!-- PROJECTS -->
  ${data.projects?.length ? `
  <div class="section-title">PROJECTS</div>
  ${data.projects.map(project => `
    <div>
      <span class="job-title">${project.title}</span>
    </div>
    <ul>
      ${project.description?.map(desc => `<li>${desc}</li>`).join("")}
    </ul>
  `).join("")}
  ` : ""}

  <!-- SKILLS -->
  ${data.technical_skills?.length ? `
  <div class="section-title">SKILLS</div>
  <ul>
    ${data.technical_skills.map(skill => `<li>${skill}</li>`).join("")}
  </ul>
  ` : ""}

  <!-- EDUCATION -->
  ${data.education ? `
  <div class="section-title">EDUCATION</div>
  <div>
    <strong>${data.education.degree}</strong><br/>
    ${data.education.institution}<br/>
    ${data.education.duration}
  </div>
  ` : ""}

</body>
</html>
`;
