export const generateResumeHTML = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      color: #2c3e50;
    }

    h1 {
      font-size: 26px;
      letter-spacing: 2px;
      margin-bottom: 5px;
    }

    h2 {
      font-size: 18px;
      border-bottom: 2px solid #2c3e50;
      padding-bottom: 4px;
      margin-top: 25px;
    }

    .section {
      margin-top: 10px;
    }

    ul {
      margin: 0;
      padding-left: 20px;
    }

    .header-line {
      border-top: 2px solid #2c3e50;
      margin: 10px 0 20px 0;
    }
  </style>
</head>
<body>

  <h1>${data.name || "Candidate Name"}</h1>
  <div class="header-line"></div>

  <h2>CAREER SUMMARY</h2>
  <div class="section">
    <p>${data.professional_summary}</p>
  </div>

  <h2>TECHNICAL SKILLS</h2>
  <div class="section">
    <ul>
      ${data.technical_skills?.map(skill => `<li>${skill}</li>`).join("")}
    </ul>
  </div>

  <h2>PROJECT EXPERIENCE</h2>
  <div class="section">
    <ul>
      ${data.projects?.map(project => `
        <li>
          <strong>${project.title}</strong><br/>
          ${project.description}
        </li>
      `).join("")}
    </ul>
  </div>

</body>
</html>
`;
