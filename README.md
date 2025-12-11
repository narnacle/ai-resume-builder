# AI Résumé Builder 🤖📄

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenAI Powered](https://img.shields.io/badge/OpenAI-Powered-blue.svg)](https://openai.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A sophisticated web application that leverages AI to create professional, ATS-optimized résumés tailored to specific job descriptions.

## ✨ Features

### 🤖 **AI-Powered Generation**
- **Smart Content Creation**: Generate compelling résumé content using GPT-4
- **Section Optimization**: AI-powered improvements for summaries, experience, and skills
- **Personalized Suggestions**: Get tailored recommendations for your specific background

### 🎯 **ATS Optimization**
- **Keyword Extraction**: Identify and incorporate relevant keywords from job descriptions
- **ATS Compatibility**: Ensure your résumé passes through Applicant Tracking Systems
- **Optimization Tips**: Receive specific suggestions for ATS improvements

### 🛠️ **User-Friendly Interface**
- **Modern UI**: Clean, responsive design with intuitive controls
- **Real-Time Preview**: Instant preview of your AI-optimized résumé
- **Export Options**: Copy to clipboard or download as HTML
- **Mobile Responsive**: Works seamlessly on all devices

### ⚡ **Productivity Features**
- **Quick Suggestions**: AI improvement suggestions for individual sections
- **Template Support**: Multiple formatting options
- **Progress Tracking**: Save and continue your work

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (get one from [OpenAI Platform](https://platform.openai.com/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder
```

2. **Set up the backend**
```bash
cd backend
npm install
```

3. **Configure environment variables**
Create a `.env` file in the `backend` directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

4. **Start the backend server**
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

5. **Launch the frontend**
- Open `frontend/index.html` directly in your browser
- **Recommended**: Use a local server like Live Server in VS Code
- Or serve using Python: `python -m http.server 8000` in the frontend directory

6. **Access the application**
- Open your browser and navigate to `http://localhost:8000` (or wherever you're serving the frontend)
- The frontend will automatically connect to the backend API

## 📁 Project Structure

```
ai-resume-builder/
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── frontend/               # Pure HTML/CSS/JS frontend
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styling
│   └── script.js          # Frontend logic
├── LICENSE                 # MIT License
├── README.md              # This file
└── CONTRIBUTING.md        # Contribution guidelines
```

## 🎨 How to Use

### 1. **Enter Your Information**
Fill in your personal details, work experience, education, and skills in the left panel.

### 2. **Target Your Résumé**
Paste the job description you're applying for to get tailored AI optimizations.

### 3. **Generate AI-Optimized Content**
Click "Generate AI-Powered Résumé" to create your personalized résumé.

### 4. **Refine with AI Suggestions**
Use the "AI Suggestions" buttons to get improvements for specific sections.

### 5. **Export and Use**
- **Copy to Clipboard**: Quick copy for online applications
- **Download as HTML**: Save for offline use or further editing

## 🔧 API Endpoints

### POST `/api/generate-resume`
Generate a complete AI-optimized résumé.

**Request Body:**
```json
{
  "userInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-0123",
    "location": "San Francisco, CA",
    "summary": "Experienced software developer...",
    "experience": "5 years at Tech Corp...",
    "education": "BS in Computer Science...",
    "skills": "JavaScript, React, Node.js..."
  },
  "jobDescription": "Looking for a full-stack developer..."
}
```

**Response:**
```json
{
  "optimizedSummary": "AI-generated professional summary...",
  "optimizedExperience": "Optimized work experience...",
  "optimizedSkills": "Prioritized skills list...",
  "atsKeywords": ["keyword1", "keyword2"],
  "suggestions": ["Suggestion 1", "Suggestion 2"],
  "fullResumeText": "Complete formatted résumé..."
}
```

### POST `/api/suggest-improvements`
Get AI suggestions for improving specific résumé sections.

**Request Body:**
```json
{
  "currentText": "Managed a team of developers",
  "section": "experience"
}
```

## 🌟 Advanced Features

### Custom Prompts
Modify the AI prompts in `backend/server.js` to customize the output style:
```javascript
const prompt = `Create a ${style} resume with ${tone} tone...`;
```

### Multiple Templates
Add different résumé templates by modifying the display logic in `script.js`:
```javascript
const templates = {
  'modern': { /* template config */ },
  'classic': { /* template config */ },
  'creative': { /* template config */ }
};
```

### Rate Limiting
Add rate limiting to prevent API abuse:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

## 🧪 Development

### Running Tests
```bash
# Install test dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

### Code Style
- Use ESLint for JavaScript linting
- Follow consistent naming conventions
- Add comments for complex logic

### Adding Features
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Ways to Contribute
- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Fix issues
- 🎨 Enhance UI/UX

### Development Setup
```bash
# Install dependencies
cd backend && npm install

# Set up development environment
cp .env.example .env
# Edit .env with your API keys

# Run development server with hot reload
npm run dev
```

## 📊 Performance Optimization

### Caching
Implement Redis caching for frequent queries:
```javascript
const redis = require('redis');
const client = redis.createClient();
```

### Compression
Enable gzip compression for API responses:
```javascript
const compression = require('compression');
app.use(compression());
```

## 🔒 Security

### Best Practices
1. **API Keys**: Never commit API keys to version control
2. **Input Validation**: Sanitize all user inputs
3. **Rate Limiting**: Prevent API abuse
4. **CORS**: Configure properly for production
5. **HTTPS**: Always use in production

### Environment Variables
Required for production:
```env
OPENAI_API_KEY=your_key_here
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://yourdomain.com
```

## 🌍 Deployment

### Option 1: Heroku
```bash
# Deploy backend to Heroku
heroku create your-app-name
heroku config:set OPENAI_API_KEY=your_key
git push heroku main

# Deploy frontend to Netlify/Vercel
# Connect your GitHub repo and deploy
```

### Option 2: Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
EXPOSE 5000
CMD ["node", "server.js"]
```

### Option 3: AWS/Google Cloud
1. Deploy backend as a container service
2. Use S3/Cloud Storage for static frontend files
3. Configure load balancing and auto-scaling

## 📈 Monitoring

### Logging
```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Metrics
Track usage metrics:
- Number of résumés generated
- Average response time
- Error rates
- User retention

## 🤔 FAQ

### Q: Is my data safe?
A: Yes! Your data is never stored permanently. It's only sent to OpenAI's API for processing and then discarded.

### Q: Do I need programming knowledge?
A: No! The application is designed to be user-friendly with no coding required.

### Q: How much does it cost?
A: The application is free to use, but you need your own OpenAI API key (costs apply based on usage).

### Q: Can I customize the AI output?
A: Yes! You can modify the prompts in the backend code to change the tone, style, and content focus.

### Q: Is it ATS-friendly?
A: Absolutely! The AI is specifically trained to create ATS-optimized résumés with proper keywords and formatting.

## 📚 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [ATS Optimization Guide](https://www.jobscan.co/ats-resume-checklist)
- [Résumé Best Practices](https://www.themuse.com/advice/resume-writing-tips)
- [Express.js Documentation](https://expressjs.com/)
- [Contributing Guidelines](CONTRIBUTING.md)

## 👥 Contributors

Thanks to these amazing people who have contributed to this project:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/yourusername"><img src="https://avatars.githubusercontent.com/u/youruserid?s=100" width="100px;" alt=""/><br /><sub><b>Your Name</b></sub></a><br />💻 📖 🎨</td>
  </tr>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for the incredible GPT API
- All the contributors who have helped improve this project
- The open-source community for inspiration and tools

---

<div align="center">
  <p>Made with ❤️ by the AI Résumé Builder Team</p>
  <p>If you find this project useful, please consider giving it a ⭐️</p>
</div>
```
