# Fit Journey App - Vercel Deployment

A full-stack fitness goal tracking application built with React and Node.js, deployed on Vercel.

## 🚀 Architecture

- **Frontend**: React app served as static files
- **Backend**: Serverless functions in `/api` directory
- **Database**: MongoDB (via Mongoose)

## 📁 Project Structure

```
FitJourneyApp_React/
├── api/                    # Serverless API functions
│   ├── goals.js           # Main goals endpoint
│   ├── goals/[id].js      # Individual goal operations
│   ├── models/            # Database models
│   ├── utils/             # Utility functions
│   └── package.json       # API dependencies
├── frontend/              # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── package.json           # Root workspace config
├── vercel.json           # Vercel deployment config
└── .env.example          # Environment variables template
```

## 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/coleLenting/FitJourneyApp_React.git
   cd FitJourneyApp_React
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your MongoDB connection string
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🌐 Deployment to Vercel

### Prerequisites
- GitHub repository
- Vercel account
- MongoDB database (MongoDB Atlas recommended)

### Environment Variables
Set these in your Vercel dashboard:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/fitjourney` |

### Deploy Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Migrate to Vercel serverless"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration
   - Add environment variables
   - Deploy!

3. **Verify Deployment**
   - Frontend: `https://your-app.vercel.app`
   - API: `https://your-app.vercel.app/api/goals`

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/goals` | Get all goals |
| POST | `/api/goals` | Create new goal |
| GET | `/api/goals/[id]` | Get specific goal |
| PATCH | `/api/goals/[id]` | Update goal |
| DELETE | `/api/goals/[id]` | Delete goal |

## 🎯 Features

- ✅ Create fitness goals with name, description, and timeframe
- ✅ View all goals with creation timestamps
- ✅ Edit existing goals inline
- ✅ Delete goals
- ✅ Responsive design with Bootstrap
- ✅ Animated success notifications
- ✅ Real-time updates with React Context

## 🔄 Migration from Azure

This app was successfully migrated from Azure App Service to Vercel serverless functions:

- **Before**: Separate frontend and backend deployments
- **After**: Unified monorepo with serverless API
- **Benefits**: Better performance, automatic scaling, simplified deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).