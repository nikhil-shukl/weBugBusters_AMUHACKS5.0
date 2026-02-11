export const formatResumeToMarkdown = (data) => {
  return `
# ${data.name || "Candidate Name"}

${data.professional_summary}

---

## PROFESSIONAL EXPERIENCE

${data.experience?.map(exp => `
**${exp.role} | ${exp.company}**  
_${exp.duration}_  

${exp.points.map(point => `• ${point}`).join("\n")}
`).join("\n")}

---

## PROJECTS

${data.projects?.map(project => `
**${project.title}**

${project.description.map(desc => `• ${desc}`).join("\n")}
`).join("\n")}

---

## TECHNICAL SKILLS

${data.technical_skills?.join(" | ")}

`;
};
