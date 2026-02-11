import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import puppeteer from "puppeteer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* -------- Generate Resume -------- */

router.post("/generate-resume", upload.single("file"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(
      `${process.env.AI_BACKEND_URL}/generate_verified_resume`,
      formData,
      { headers: formData.getHeaders() }
    );

    res.json(response.data);

  } catch (error) {
    console.error("Generate error:", error);
    res.status(500).json({ error: "Resume generation failed" });
  }
});


/* -------- Download Resume -------- */

router.post("/download-resume", async (req, res) => {
  try {
    const { html } = req.body;

    const browser = await puppeteer.launch({
      headless: "new"
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });

    res.send(pdf);

  } catch (error) {
    console.error("PDF error:", error);
    res.status(500).json({ error: "PDF generation failed" });
  }
});

export default router;
