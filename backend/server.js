const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// AI Resume Generation Endpoint
app.post('/api/generate-resume', async (req, res) => {
  try {
    const { userInfo, jobDescription } = req.body;
    
    const prompt = `Create a professional resume based on the following information:
    
    Personal Information:
    Name: ${userInfo.name}
    Email: ${userInfo.email}
    Phone: ${userInfo.phone}
    Location: ${userInfo.location}
    LinkedIn: ${userInfo.linkedin || 'Not provided'}
    GitHub: ${userInfo.github || 'Not provided'}
    
    Summary: ${userInfo.summary}
    
    Work Experience:
    ${userInfo.experience}
    
    Education:
    ${userInfo.education}
    
    Skills:
    ${userInfo.skills}
    
    Target Job Description:
    ${jobDescription}
    
    Please generate:
    1. A professional summary tailored to the job
    2. Optimized bullet points for work experience
    3. Skills section prioritized for this role
    4. Any additional sections that would strengthen this resume
    5. Keywords to include for ATS optimization
    
    Format the response in a structured JSON format with these sections:
    - optimizedSummary
    - optimizedExperience
    - optimizedSkills
    - atsKeywords
    - suggestions
    - fullResumeText`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer and career coach. Create optimized, professional resumes tailored to specific job descriptions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const aiResponse = completion.choices[0].message.content;
    
    // Try to parse as JSON, otherwise return as text
    try {
      const parsedResponse = JSON.parse(aiResponse);
      res.json(parsedResponse);
    } catch (e) {
      res.json({
        fullResumeText: aiResponse,
        optimizedSummary: "See full response",
        optimizedExperience: "See full response",
        optimizedSkills: "See full response",
        atsKeywords: [],
        suggestions: []
      });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate resume',
      details: error.message 
    });
  }
});

// Template suggestions endpoint
app.post('/api/suggest-improvements', async (req, res) => {
  try {
    const { currentText, section } = req.body;
    
    const prompt = `Improve the following ${section} for a resume to be more professional, impactful, and results-oriented:
    
    "${currentText}"
    
    Provide 3 improved versions with different tones (professional, achievement-focused, concise).`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a professional resume editor. Provide specific, actionable improvements."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    res.json({ suggestions: completion.choices[0].message.content.split('\n\n') });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});