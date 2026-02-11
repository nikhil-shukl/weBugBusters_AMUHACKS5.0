import React, { useState, useEffect } from 'react';
import { useResults } from '../context/ResultsContext';
import jsPDF from 'jspdf';
import { 
  Download, 
  FileText, 
  Briefcase, 
  Award, 
  ChevronRight,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  GraduationCap,
  Code,
  Trophy
} from 'lucide-react';

const ResumeWorkspace = () => {
  const { results } = useResults();
  const [resumeData, setResumeData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // ----- Build professional resume data from analysis results -----
  useEffect(() => {
    if (!results?.skills) return;

    // --- Skills categorisation ---
    const skillCategories = {
      'Programming Languages': [],
      'Frameworks & Libraries': [],
      'Databases': [],
      'Tools & Platforms': [],
      'Soft Skills': [],
      'Other': []
    };

    results.skills.forEach(skill => {
      const name = skill.name;
      const cat = skill.category?.toLowerCase() || '';
      
      if (['python', 'java', 'c++', 'c', 'javascript', 'typescript', 'sql'].includes(name.toLowerCase())) {
        skillCategories['Programming Languages'].push(name);
      } else if (['react', 'node.js', 'express', 'django', 'flask', 'spring'].includes(name.toLowerCase())) {
        skillCategories['Frameworks & Libraries'].push(name);
      } else if (['mongodb', 'postgresql', 'mysql', 'redis', 'supabase'].includes(name.toLowerCase())) {
        skillCategories['Databases'].push(name);
      } else if (['docker', 'kubernetes', 'aws', 'git', 'figma', 'postman'].includes(name.toLowerCase())) {
        skillCategories['Tools & Platforms'].push(name);
      } else if (['leadership', 'teamwork', 'communication', 'problemsolving'].includes(name.toLowerCase())) {
        skillCategories['Soft Skills'].push(name);
      } else {
        skillCategories['Other'].push(name);
      }
    });

    // Clean empty categories
    const formattedSkills = Object.entries(skillCategories)
      .filter(([_, skills]) => skills.length > 0)
      .map(([category, skills]) => ({
        category,
        skills: skills.join(', ')
      }));

    // --- Project from evidence ---
    const mainProject = {
      title: results.skills[0]?.evidence 
        ? results.skills[0].evidence.split('"')[1] || 'Project Analysis' 
        : 'Project Analysis',
      description: results.summary || 'Detailed project analysis with verified skills.',
      technologies: results.skills.slice(0, 4).map(s => s.name).join(', '),
      link: '#',
      date: 'June, 2025'
    };

    // --- Contact & Personal ---
    const contact = {
      name: 'Your Full Name',
      email: 'your.email@example.com',
      phone: '+91 98765 43210',
      linkedin: 'linkedin.com/in/yourprofile',
      github: 'github.com/yourusername',
      location: 'Mumbai, India'
    };

    // --- Education ---
    const education = [
      {
        degree: 'Bachelor of Technology in Computer Engineering',
        institution: 'Dwarkadas J. Sanghvi College of Engineering',
        year: '2023 - 2026',
        score: 'CGPA: 8.30'
      },
      {
        degree: 'Diploma in Computer Engineering',
        institution: 'Government Polytechnic Mumbai',
        year: '2020 - 2023',
        score: 'Percentage: 92.25%'
      },
      {
        degree: 'SSC (Maharashtra State Board)',
        institution: 'Shree Vailankanni English School',
        year: '2019 - 2020',
        score: 'Percentage: 94.60%'
      }
    ];

    // --- Experience ---
    const experience = [
      {
        title: 'Full Stack Developer',
        organization: 'Softel Technologies INC.',
        date: 'Jul 2023 - Present',
        points: [
          'Led development for renewable energy solutions, managed code on GitHub, designed prototypes in Figma, and handled client interactions.',
          'Debugged and developed web applications, implemented core features.'
        ]
      },
      {
        title: 'Data Engineer Intern',
        organization: 'IIT Bombay',
        date: 'Jun 2023 - Aug 2023',
        points: [
          'Data annotation for ASR models and contribution to the Bharat GPT project.'
        ]
      }
    ];

    // --- Achievements ---
    const achievements = [
      `Verified ${results.skills.length} professional skills through AI‑powered project analysis.`,
      `Career readiness score: ${results.career_readiness_score || 0}% – strong alignment with ${results.recommended_job_roles?.[0] || 'your target role'}.`,
      'First topper in 1st and 2nd year of Diploma.',
      'Multiple prizes in school and inter-school competitions.'
    ];

    // --- Co-Curricular Activities ---
    const coCurricular = [
      'Class Representative (3 years), General Secretary (2 years)',
      'Organized college sports meets, cultural gatherings, and rallies, including Azadi ka Amrut Mahotsav 2022.',
      'Hobbies: Driving bikes and cars, doodling designs.'
    ];

    setResumeData({
      contact,
      summary: results.summary || 'Professional summary not available.',
      careerScore: results.career_readiness_score || 0,
      targetRole: results.recommended_job_roles?.[0] || 'Software Developer',
      skills: formattedSkills,
      projects: [mainProject],
      education,
      experience,
      achievements,
      coCurricular,
      verifiedCount: results.skills.length,
      suggestedSkills: results.suggested_skills_to_learn || []
    });
  }, [results]);

  // ----- Generate Professional PDF Resume -----
  const generatePDF = () => {
    if (!resumeData) return;
    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 50;
      let y = margin;
      let pageNumber = 1;

      const addNewPage = () => {
        pdf.addPage();
        pageNumber++;
        y = margin;
      };

      const checkPageBreak = (space) => {
        if (y + space > pageHeight - margin * 2) {
          addNewPage();
          return true;
        }
        return false;
      };

      // ========== HEADER ==========
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      pdf.setTextColor(0, 0, 0);
      pdf.text(resumeData.contact.name, margin, y);
      y += 20;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      
      const contactLine1 = `${resumeData.contact.phone} | ${resumeData.contact.email} | ${resumeData.contact.location}`;
      pdf.text(contactLine1, margin, y);
      y += 14;

      const contactLine2 = `${resumeData.contact.linkedin} | ${resumeData.contact.github}`;
      pdf.text(contactLine2, margin, y);
      y += 20;

      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 20;

      // ========== EDUCATION ==========
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(34, 211, 238);
      pdf.text('Education', margin, y);
      y += 16;

      resumeData.education.forEach((edu) => {
        checkPageBreak(50);
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        pdf.text(edu.degree, margin, y);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(80, 80, 80);
        pdf.text(edu.institution, margin, y + 14);
        pdf.text(edu.year, pageWidth - margin - 60, y);
        
        y += 28;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text(edu.score, margin, y);
        y += 20;
      });
      y += 5;

      // ========== EXPERIENCE ==========
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(34, 211, 238);
      pdf.text('Experience', margin, y);
      y += 16;

      resumeData.experience.forEach((exp) => {
        checkPageBreak(80);
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        pdf.text(exp.title, margin, y);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(80, 80, 80);
        pdf.text(exp.organization, margin, y + 14);
        pdf.text(exp.date, pageWidth - margin - 70, y);
        
        y += 28;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        
        exp.points.forEach((point) => {
          checkPageBreak(20);
          pdf.text('•', margin, y);
          const pointLines = pdf.splitTextToSize(point, pageWidth - margin * 2 - 15);
          pdf.text(pointLines, margin + 15, y);
          y += pointLines.length * 14 + 4;
        });
        y += 6;
      });

      // ========== PROJECTS ==========
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(34, 211, 238);
      pdf.text('Projects', margin, y);
      y += 16;

      resumeData.projects.forEach((proj) => {
        checkPageBreak(60);
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        pdf.text(proj.title, margin, y);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(80, 80, 80);
        pdf.text(proj.date || 'June, 2025', pageWidth - margin - 60, y);
        y += 16;

        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Technologies: ${proj.technologies}`, margin, y);
        y += 16;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text('•', margin, y);
        const descLines = pdf.splitTextToSize(proj.description, pageWidth - margin * 2 - 15);
        pdf.text(descLines, margin + 15, y);
        y += descLines.length * 14 + 12;
      });

      // ========== SKILLS ==========
      checkPageBreak(60);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(34, 211, 238);
      pdf.text('Skills', margin, y);
      y += 16;

      resumeData.skills.forEach(cat => {
        checkPageBreak(30);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(34, 211, 238);
        pdf.text(`${cat.category}:`, margin, y);
        y += 14;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        const skillLines = pdf.splitTextToSize(cat.skills, pageWidth - margin * 2);
        pdf.text(skillLines, margin, y);
        y += skillLines.length * 14 + 8;
      });

      // ========== ACHIEVEMENTS ==========
      checkPageBreak(50);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(34, 211, 238);
      pdf.text('Achievements & Certifications', margin, y);
      y += 16;

      resumeData.achievements.forEach((ach) => {
        checkPageBreak(20);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text('•', margin, y);
        const achLines = pdf.splitTextToSize(ach, pageWidth - margin * 2 - 15);
        pdf.text(achLines, margin + 15, y);
        y += achLines.length * 14 + 4;
      });
      y += 6;

      // ========== CO-CURRICULAR ==========
      checkPageBreak(50);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(34, 211, 238);
      pdf.text('Co‑Curricular Activities', margin, y);
      y += 16;

      resumeData.coCurricular.forEach((act) => {
        checkPageBreak(20);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text('•', margin, y);
        const actLines = pdf.splitTextToSize(act, pageWidth - margin * 2 - 15);
        pdf.text(actLines, margin + 15, y);
        y += actLines.length * 14 + 4;
      });

      // ========== FOOTER ==========
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          'Generated by Bridge‑AI · weBugBusters · AMUHACKS 5.0',
          margin,
          pageHeight - margin / 2
        );
        pdf.text(
          `Page ${i} of ${totalPages}`,
          pageWidth - margin - 40,
          pageHeight - margin / 2,
          { align: 'right' }
        );
      }

      pdf.save(`Bridge-AI_Resume_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Check console for details.');
    } finally {
      setIsGenerating(false);
    }
  };

  // ----- No data state -----
  if (!resumeData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-panel max-w-2xl w-full p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <FileText className="w-10 h-10 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">No resume yet</h2>
          <p className="text-slate-400 text-lg mb-8">
            Analyze a project first – we'll generate a professional resume with your verified skills.
          </p>
          <a
            href="/analyzer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105"
          >
            <span>Go to Analyzer</span>
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

      {/* ===== HEADER ===== */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            RESUME WORKSPACE
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Your <span className="gradient-heading">Professional Resume</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Based on your verified skills and project evidence.
        </p>
      </div>

      {/* ===== TOP DOWNLOAD BUTTON ===== */}
      <div className="flex justify-center">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="group relative px-10 py-5 bg-white/5 backdrop-blur-md border border-white/30 rounded-2xl 
                   hover:border-cyan-400/60 hover:bg-white/10 transition-all duration-300 
                   shadow-xl hover:shadow-cyan-500/20 transform hover:scale-105"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative z-10 flex items-center justify-center space-x-3">
            <Download className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="text-xl font-semibold text-white/90 group-hover:text-white">
              {isGenerating ? 'Generating...' : 'Download Resume PDF'}
            </span>
          </span>
        </button>
      </div>

      {/* ===== PREVIEW CARD ===== */}
      <div className="glass-panel p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-white">{resumeData.contact.name}</h2>
            <p className="text-lg text-cyan-400">{resumeData.targetRole}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">Career Readiness</div>
            <div className="text-3xl font-bold text-cyan-400">{resumeData.careerScore}%</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {resumeData.contact.phone}</span>
            <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {resumeData.contact.email}</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {resumeData.contact.location}</span>
            <span className="flex items-center gap-1"><Linkedin className="w-4 h-4" /> {resumeData.contact.linkedin}</span>
            <span className="flex items-center gap-1"><Github className="w-4 h-4" /> {resumeData.contact.github}</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              Education
            </h3>
            <div className="space-y-2">
              {resumeData.education.slice(0, 2).map((edu, i) => (
                <div key={i} className="text-slate-300 text-sm">
                  <span className="font-medium text-white">{edu.degree}</span> – {edu.institution}, {edu.year}, {edu.score}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" />
              Key Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.slice(0, 3).map((cat, i) => (
                <span key={i} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm">
                  {cat.category}: {cat.skills.split(',').slice(0, 2).join(', ')}...
                </span>
              ))}
            </div>
          </div>

          {resumeData.projects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                Featured Project
              </h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-cyan-300 font-medium">{resumeData.projects[0].title}</p>
                <p className="text-slate-400 text-sm mt-1">{resumeData.projects[0].description}</p>
                <p className="text-slate-500 text-xs mt-2">Tech: {resumeData.projects[0].technologies}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== BOTTOM DOWNLOAD BUTTON ===== */}
      <div className="glass-panel p-8 text-center border border-cyan-500/30 bg-gradient-to-br from-cyan-900/10 to-purple-900/10">
        <h3 className="text-2xl font-bold text-white mb-2">📄 Download Your Resume</h3>
        <p className="text-slate-300 mb-6 max-w-lg mx-auto">
          Get a professionally formatted, ATS‑friendly PDF with all your verified skills, projects, and achievements.
        </p>
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          <span>{isGenerating ? 'Generating...' : 'Download Resume (PDF)'}</span>
        </button>
      </div>

      <div className="text-center text-sm text-slate-500">
        <span className="text-cyan-400 font-semibold">{resumeData.verifiedCount}</span> verified skills • 
        <span className="text-purple-400 font-semibold ml-1">{resumeData.suggestedSkills.length}</span> skills to grow
      </div>

    </div>
  );
};

export default ResumeWorkspace;