# 📚 Waslah Platform

**Connecting Students, Universities, and Companies for Internship Success**

[![Backend](https://img.shields.io/badge/Backend-Node.js-green)](https://github.com/alid0721/Waslah-backend/tree/dev)  
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](https://github.com/sedratiaziz/waslah-frontend/tree/dev)

---

## 🧭 Project Overview

**Waslah** is a non-commercial, student-focused internship management platform that connects university students with companies and organizations offering internship opportunities. It aims to:

- Streamline the internship process for students, universities, and companies.
- Align internships with academic requirements and specialization fields.
- Provide students with the right experience to support their career growth.
- Simplify follow-ups and tracking for teachers and coordinators.

This system acts as a structured link between students and industry, supporting educational objectives while enhancing real-world learning opportunities.

---

## 👥 Contributors

| Name              | GitHub Username                                |
|-------------------|-------------------------------------------------|
| Ali Dashti        | [a4a7d](https://github.com/a4a7d)              |
| Abdulaziz Sedrati | [asedrati](https://github.com/asedrati)        |
| Adel Ebrahim      | [adelbh7](https://github.com/adelbh7)          |

---

## 🏗️ System Architecture

- **Frontend:** React + Vite  
- **Backend:** Node.js + Express.js  
- **Database:** (TBD – database configuration not committed yet)  
- **Auth & Security:** Planned (e.g., JWT, middleware validation)  
- **APIs:** RESTful (under development)

---

## 🧪 Project Status

### ✅ What’s Done

#### Backend
- Project scaffold using Node.js & Express.js.
- MVC structure implemented (`controllers`, `models`, `routes`).
- Environment configuration set up.
- Initial routing and logic placeholders added.

#### Frontend
- Project initialized with React + Vite.
- Folder structure for `src`, `services`, `components` created.
- ESLint configuration prepared.
- Basic entry point set up.

---

## 🛠️ What’s In Progress / Planned

### Backend
- [ ] Authentication & Authorization (JWT-based)
- [ ] RESTful API completion (students, internships, companies)
- [ ] API documentation (Swagger/Postman)
- [ ] Unit and integration testing
- [ ] Centralized error handling and logging

### Frontend
- [ ] Component development (Student dashboard, Company dashboard, Admin view)
- [ ] Routing (React Router)
- [ ] State management (Context API or Redux)
- [ ] API service integration
- [ ] Styling using CSS/Tailwind/Material UI
- [ ] Form validation and alerts
- [ ] Testing with Jest & React Testing Library

---

## 🧑‍💻 Target Users

- 🎓 **Students**: Search, apply, and track internship opportunities aligned with their academic programs.  
- 👨‍🏫 **University Supervisors / Teachers**: Oversee student progress and internship matching.  
- 🏢 **Companies / Organizations**: Post available internship positions and review applicants.

---

## 📂 Repository Structure

### Backend: [Waslah-backend](https://github.com/alid0721/Waslah-backend/tree/dev)

```
📦 Waslah-backend
 ┣ 📂 controllers
 ┣ 📂 middleware
 ┣ 📂 models
 ┣ 📜 server.js
 ┣ 📜 package.json
 ┣ 📜 .env
```

### Frontend: [waslah-frontend](https://github.com/sedratiaziz/waslah-frontend/tree/dev)

```
📦 waslah-frontend
 ┣ 📂 public
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┣ 📂 services
 ┣ 📜 index.html
 ┣ 📜 vite.config.js
 ┣ 📜 eslint.config.js
```

---

## 🧰 Installation & Setup

### Backend

```bash
cd Waslah-backend
npm install
npm run dev
```

> ⚠️ Ensure you configure your `.env` file with appropriate variables.

### Frontend

```bash
cd waslah-frontend
npm install
npm run dev
```

> 🌐 The app will be available on [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## ✅ Future Enhancements

- Role-based dashboards (Student, Teacher, Company)  
- Internship tracking and evaluations  
- Internship approval workflows  
- Notifications and reminders  
- Mobile responsiveness and accessibility  

---

## 📜 License

---

## 🙌 Acknowledgments

- Inspired by real-world academic internship challenges  
- Developed as part of an educational initiative
