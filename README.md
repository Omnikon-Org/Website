# Omnikon Website

[![GitHub](https://img.shields.io/badge/GitHub-Demon--Die-181717?style=for-the-badge&logo=github)](https://github.com/Omnikon-Org)
[![Discord](https://img.shields.io/badge/Discord-Join%20Us-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/yWtjK2Tb8T)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://github.com/Omnikon-Org/Website?tab=MIT-1-ov-file)

Professional static website for the Omnikon organization.

Designed with Google Stitch, Connected by hands, Styled with TailwindCss.

## 🚀 Projects Highlight

### Demon Tech Roadmap
Community-driven learning roadmaps for students and aspiring developers. Designed to help learners navigate technology careers through structured, beginner-friendly roadmaps, curated resources, and practical project recommendations.
- Repository: [github.com/Omnikon-Org/DemonTechRoadmap](https://github.com/Omnikon-Org/DemonTechRoadmap)
- Website: [demon-tech-roadmap.vercel.app](https://demon-tech-roadmap.vercel.app/)

### UnVibe
UnVibe trains developers to truly understand code, not just generate it.
- Repository: [github.com/Omnikon-Org/unvibe](https://github.com/Omnikon-Org/unvibe)

### SyncCanvas
An AI-powered collaborative whiteboard for real-time brainstorming, diagramming, and team collaboration on an infinite canvas.
- Repository: [github.com/Omnikon-Org/SyncCanvas](https://github.com/Omnikon-Org/SyncCanvas)

---

## 💻 Local Development

This repository is a static website, so there is no Node install or build step required. The site relies on the Tailwind CDN and Vanilla CSS.

### 1. Environment Setup
To run the website fully (including GitHub stats, Supabase integration, and Firebase Authentication), you need to configure your environment variables. 
Copy the provided `.env.example` or create a new `env.json` and `.env` file in the root directory with your Firebase, Supabase, and GitHub configuration:

```json
{
  "FIREBASE_API_KEY": "YOUR_API_KEY",
  "FIREBASE_AUTH_DOMAIN": "YOUR_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID": "YOUR_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET": "YOUR_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID": "YOUR_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID": "YOUR_APP_ID",
  "GIT_OMNIKON_ALL": "YOUR_GITHUB_TOKEN",
  "SUPABASE_URL": "YOUR_SUPABASE_URL",
  "SUPABASE_ANON_KEY": "YOUR_SUPABASE_KEY"
}
```

### 2. Start Local Server
Because the website fetches local JSON and module files, you must serve it over HTTP (opening `index.html` directly in the browser may cause CORS issues).

```bash
# Clone the repo
git clone https://github.com/Omnikon-Org/Website.git
cd Website

# Start a local web server (e.g. using npx)
npx -y http-server -p 8080
```
Open `http://localhost:8080` in your browser.

---

## ▶️ Features & Usage
- **Dynamic Content**: Fetches recent activity, contributor stats, and repository details directly via the GitHub API.
- **Firebase Authentication**: Integrated Google & GitHub OAuth. Authorized maintainers can log in to access admin-only features (e.g., adding blogs).
- **Responsive Layout**: Designed to adapt perfectly to mobile, tablet, and desktop screens.

---

## 🤝 Contributing
We welcome contributions! To get started:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Make your changes – keep the existing design language consistent.
4. Open a Pull Request describing the improvement.

Please follow the existing code style (Tailwind utility classes, BEM-like naming, and the custom color palette defined in the `<script id="tailwind-config">`).

---

## 📄 License
Distributed under the **MIT License**. See the `LICENSE` file for details.

---

## 📧 Contact & Community
- **GitHub Org:** https://github.com/Omnikon-Org
- **Discord:** https://discord.gg/yWtjK2Tb8T
- **Twitter:** https://x.com/OmnikonOrg
- **LinkedIn:** https://www.linkedin.com/in/omnikon-org/

*Join us, build together, and make open-source learning fun!*
