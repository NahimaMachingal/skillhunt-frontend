## Skillhunt Job Portal


## 📋 Overview

Skillhunt is a comprehensive job portal platform built with React and Redux Toolkit. It bridges the gap between employers and job seekers while providing powerful administrative tools. The platform features a built-in resume builder to help candidates create professional resumes.

## ✨ Features

### For Job Seekers
- Professional profile creation
- Advanced job search with filters
- Built-in resume builder with multiple templates
- Job application tracking
- Saved job listings
- Company follow functionality
- Interview scheduling
- Skill assessment tests

### For Employers
- Company profile management
- Job posting and management
- Applicant tracking system
- Resume filtering and ranking
- Interview scheduling
- Candidate communication tools
- Analytics dashboard

### For Administrators
- User management
- Content moderation
- Platform analytics
- Job category management
- Support ticket system
- System configuration

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux Toolkit, React Router
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Form Handling:** Formik, Yup
- **Resume Generation:** React-PDF
- **Authentication:** JWT, Firebase Auth
- **Real-time Features:** WebSockets
- **Testing:** Jest, React Testing Library
- **Build Tools:** Webpack, Babel

## 🚀 Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/skillhunt.git
   cd skillhunt
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration values.

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   The application will be available at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📁 Project Structure

```
skillhunt/
├── public/
├── src/
│   ├── app/             # Redux store configuration
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   ├── features/        # Feature-based modules with their slices
│   │   ├── auth/
│   │   ├── jobs/
│   │   ├── profiles/
│   │   ├── resume/
│   │   ├── interview/
│   │   ├── subscription/
│   │   ├── chat/
│   │   └── admin/
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── AuthHoc.jsx      # Authentication Higher Order Component
│   ├── App.js           # Application entry point
│   └── index.js         # React DOM rendering
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Authentication Flow

The application uses JWT with refresh tokens for authentication:

1. User signs in with email/password or social login
2. Backend validates credentials and returns JWT token
3. Token is stored in local storage (or cookies) and added to API requests
4. Token expiration is handled via refresh tokens
5. Different role-based routes are protected with AuthHoc

## 🌐 Real-time Features

The application utilizes WebSockets for real-time functionality:

- Instant messaging between employers and job seekers
- Real-time notifications for job applications
- Live updates for interview scheduling
- Instant alerts for new job postings matching saved preferences

## 🛣️ Main Routes

- `/` - Homepage with job listings
- `/login` & `/register` - Authentication pages
- `/jobs` - Job search and listings
- `/jobs/:id` - Job details
- `/resume-builder` - Resume creation tool
- `/profile` - User profile management
- `/chat` - Messaging center
- `/interviews` - Interview management
- `/subscription` - Subscription plans and management
- `/employers` - Employer dashboard
- `/employers/jobs` - Job management for employers
- `/employers/candidates` - Candidate management
- `/admin` - Admin dashboard
- `/admin/users` - User management for admins

## 💻 Development

### Code Style

This project uses ESLint and Prettier for code formatting. Run the following commands to ensure code quality:

```bash
# Lint code
npm run lint

# Format code
npm run format
```

### Testing

Run tests with:

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage
```

### Git Workflow

1. Create a new branch from `main` for each feature or fix
2. Submit a pull request for review
3. After approval, merge into `main`

## 📱 Responsive Design

The application is built with Tailwind CSS for responsive design across:

- Mobile devices
- Tablets
- Desktops
- Large screens

## 🔄 CI/CD

This project uses GitHub Actions for continuous integration and deployment:

- CI pipeline runs tests and linting on pull requests
- CD pipeline deploys to staging on merge to `develop`
- CD pipeline deploys to production on merge to `main`

## 🌐 Deployment

### Production Build

1. Create an optimized production build
   ```bash
   npm run build
   ```

2. The build files will be in the `build/` directory

### Deployment Options

- **Vercel/Netlify:** Connect your repository for automatic deployment
- **AWS S3 + CloudFront:** For static site hosting with CDN
- **Docker:** Containerize the application for consistent deployment

## 📈 Future Enhancements

- AI-powered job matching
- Enhanced analytics
- Mobile applications
- Multi-language support
- Video resume creation
- Blockchain-based credential verification

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- [Your Name](https://github.com/yourusername)
- [Contributor 1](https://github.com/contributor1)
- [Contributor 2](https://github.com/contributor2)

## 📞 Contact

For any questions or suggestions, please open an issue or contact the repository owners.

---

Made with ❤️ by the Skillhunt Team
