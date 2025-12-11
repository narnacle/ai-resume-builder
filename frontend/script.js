const API_BASE_URL = 'http://localhost:5000/api';

async function generateResume() {
    const userInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        summary: document.getElementById('summary').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        skills: document.getElementById('skills').value
    };

    const jobDescription = document.getElementById('jobDescription').value;

    // Validation
    if (!userInfo.name || !userInfo.email) {
        alert('Please fill in required fields (Name and Email)');
        return;
    }

    showLoading(true);

    try {
        const response = await fetch(`${API_BASE_URL}/generate-resume`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userInfo,
                jobDescription
            })
        });

        const data = await response.json();

        if (response.ok) {
            displayResume(data);
            displayATSTips(data.atsKeywords, data.suggestions);
        } else {
            throw new Error(data.error || 'Failed to generate resume');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error generating resume. Please try again.');
    } finally {
        showLoading(false);
    }
}

function displayResume(data) {
    const outputDiv = document.getElementById('resumeOutput');
    
    let resumeHTML = `
        <div class="resume-section">
            <h3>Professional Summary</h3>
            <div class="resume-content">${formatText(data.optimizedSummary)}</div>
        </div>
        
        <div class="resume-section">
            <h3>Work Experience</h3>
            <div class="resume-content">${formatText(data.optimizedExperience)}</div>
        </div>
        
        <div class="resume-section">
            <h3>Skills</h3>
            <div class="resume-content">${formatText(data.optimizedSkills)}</div>
        </div>
    `;

    if (data.fullResumeText && data.fullResumeText !== "See full response") {
        resumeHTML += `
            <div class="resume-section">
                <h3>Complete Résumé</h3>
                <div class="resume-content">${formatText(data.fullResumeText)}</div>
            </div>
        `;
    }

    outputDiv.innerHTML = resumeHTML;
}

function displayATSTips(keywords, suggestions) {
    const tipsDiv = document.getElementById('atsTips');
    
    let tipsHTML = '';
    
    if (keywords && keywords.length > 0) {
        tipsHTML += `
            <p><strong>ATS Keywords Found:</strong></p>
            <div class="keyword-list">
                ${keywords.map(keyword => `<span class="keyword">${keyword}</span>`).join('')}
            </div>
        `;
    }
    
    if (suggestions && Array.isArray(suggestions)) {
        tipsHTML += `
            <div style="margin-top: 15px;">
                <p><strong>AI Suggestions:</strong></p>
                <ul style="margin-left: 20px; color: #4a5568;">
                    ${suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    tipsDiv.innerHTML = tipsHTML || '<p>No specific tips available. Make sure to include relevant keywords from the job description.</p>';
}

async function suggestImprovements(section) {
    const currentText = document.getElementById(section).value;
    
    if (!currentText.trim()) {
        alert('Please enter some text first');
        return;
    }

    showLoading(true);

    try {
        const response = await fetch(`${API_BASE_URL}/suggest-improvements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentText,
                section
            })
        });

        const data = await response.json();

        if (response.ok) {
            showSuggestions(data.suggestions);
        } else {
            throw new Error(data.error || 'Failed to get suggestions');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error getting suggestions. Please try again.');
    } finally {
        showLoading(false);
    }
}

function showSuggestions(suggestions) {
    const panel = document.getElementById('suggestionsPanel');
    const content = document.getElementById('suggestionsContent');
    
    let suggestionsHTML = '';
    
    if (Array.isArray(suggestions)) {
        suggestions.forEach((suggestion, index) => {
            suggestionsHTML += `
                <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #4299e1;">
                    <strong>Option ${index + 1}:</strong>
                    <p style="margin-top: 8px; color: #4a5568;">${suggestion}</p>
                </div>
            `;
        });
    } else if (typeof suggestions === 'string') {
        // Handle string response
        suggestionsHTML = `
            <div style="padding: 15px; background: white; border-radius: 8px;">
                <p style="color: #4a5568;">${suggestions}</p>
            </div>
        `;
    }
    
    content.innerHTML = suggestionsHTML;
    panel.style.display = 'block';
}

function closeSuggestions() {
    document.getElementById('suggestionsPanel').style.display = 'none';
}

function formatText(text) {
    if (!text) return '';
    
    // Convert markdown-style formatting to HTML
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^- (.*?)(?=\n|$)/gm, '<li>$1</li>')
        .replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>')
        .replace(/<\/ul>\s*<ul>/g, '');
}

function copyToClipboard() {
    const resumeText = document.getElementById('resumeOutput').innerText;
    navigator.clipboard.writeText(resumeText)
        .then(() => alert('Résumé copied to clipboard!'))
        .catch(err => console.error('Failed to copy:', err));
}

function downloadResume() {
    const resumeContent = document.getElementById('resumeOutput').innerHTML;
    const name = document.getElementById('name').value || 'resume';
    
    const blob = new Blob([`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${name}'s Résumé</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 40px auto; padding: 20px; }
                h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
                h2 { color: #34495e; border-bottom: 2px solid #bdc3c7; padding-bottom: 5px; margin-top: 30px; }
                .section { margin-bottom: 25px; }
                .keyword { background: #ecf0f1; padding: 2px 8px; border-radius: 12px; font-size: 0.9em; margin-right: 5px; }
            </style>
        </head>
        <body>
            ${resumeContent}
        </body>
        </html>
    `], { type: 'text/html' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\s+/g, '-').toLowerCase()}-resume.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function showLoading(show) {
    document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
}