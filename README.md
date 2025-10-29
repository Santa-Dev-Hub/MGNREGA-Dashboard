# 🚀 MGNREGA Performance Dashboard

**Production-ready MGNREGA Performance Dashboard:**  
A full-stack web app for visualizing government employment scheme performance at the district level in Uttar Pradesh.

---

## ✨ Features

- Visualizes performance data for **75 UP districts**
- **12-month trend analysis** with interactive charts
- **District vs state average** comparisons
- **Bilingual interface** (English / हिंदी)
- **District geolocation auto-detection**
- **Mobile responsive**
- **Production deployed** (HTTPS, auto-scaled, continuous deployment)
- Robust error handling
- API health monitoring

---

## 🌐 Live Demo

- Frontend: [https://mgnrega-frontend-4qn1.onrender.com](https://mgnrega-frontend-4qn1.onrender.com)
- Backend API: [https://mgnrega-backend-jg47.onrender.com/api/health](https://mgnrega-backend-jg47.onrender.com/api/health)

---

## 📹 Video Walkthrough

- [Loom Video Demo](https://loom.com/share/YOUR_LOOM_ID)

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Recharts, CSS
- **Backend:** Node.js, Express.js, Mongoose, MongoDB Atlas
- **Charts:** Recharts (trends & bar comparisons)
- **Hosting:** Render.com
- **Database:** MongoDB Atlas

---

## 📦 Quick Start

### 1. Clone the repository

git clone https://github.com/Santa-Dev-Hub/MGNREGA-Dashboard.git
cd MGNREGA-Dashboard

### 2. Setup Backend

cd backend
cp .env.example .env # Add your MongoDB URI + frontend URL
npm install
npm run seed # Seed the database
npm run dev # Start dev server

API on `http://localhost:5000`

### 3. Setup Frontend

Open a second terminal:

cd frontend
cp .env.example .env # Add your backend URL to REACT_APP_API_URL
npm install
npm start # Run React locally

App on `http://localhost:3000`

---

## 🏗️ Project Structure
MGNREGA-Dashboard/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── scripts/
│ ├── server.js
│ └── .env.example
├── frontend/
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── .env.example
├── README.md


---

## 📊 API Endpoints

| Method | Endpoint                                       | Description                     |
|--------|------------------------------------------------|---------------------------------|
| GET    | `/api/health`                                  | API health check                |
| GET    | `/api/districts`                               | All 75 districts                |
| GET    | `/api/data/district/:districtCode`             | Latest data for a district      |
| GET    | `/api/data/district/:districtCode/history`     | 12 months history for a district|
| GET    | `/api/data/state/averages`                     | State-level performance averages|

---

## 🚢 Deployment (Render)

Both frontend and backend are **deployed separately** on Render:
- **Backend:** Web service connected to MongoDB Atlas
- **Frontend:** Static React site with environment for backend URL

Auto-deploy enabled from GitHub main branch.

---

## 🚦 Service Health & Monitoring

- **Health endpoint**: `/api/health` for backend monitoring
- **Pre-deploy seed script**: for initial data load

---

## 🤖 Useful Scripts

- `npm run seed` (in backend): Seeds MongoDB with 75 UP districts and 12 months of data.

---

## 💡 Future Enhancements

- Real-time integration with nrega.nic.in
- User login and personalized dashboards
- Asset visualization and mapping
- Export/download analytics

---

## 🙏 Credits

Built by [Santa-Dev-Hub](https://github.com/Santa-Dev-Hub)  
Designed to make rural government data accessible, visual, and actionable.

---

## 📝 License

MIT License.  
Feel free to fork, customize, and use for your own data dashboard projects!

---

**Enjoy using the MGNREGA Performance Dashboard! For support file a GitHub issue or create a pull request.**


