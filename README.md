# MERN Frontend - React Dashboard Application

A modern, responsive React application built with Vite, Tailwind CSS, and Axios. This frontend provides a feature-rich dashboard with secure JWT-based authentication, role-based access control, and seamless integration with the Express.js backend API.

---
# Urls

🚀 Postman Documentation:  
https://parbeen-s-team.docs.buildwithfern.com/notes-baclend-api/localhost-3000-api-admin

🔗 Live Backend URL:  
https://notes-backend-crcj.onrender.com

Backend Git Link
https://github.com/Parbeen27/Notes_Backend

🔗 Live Frontend URL:  
https://notes-frontend-one-nu.vercel.app/

## 🧪 Test Credentials

### Admin User
username: test_admin  
Password: 1234

### Normal User
username: user4  
Password: 1234

## 📋 Project Overview

This React frontend application is the user-facing layer of a full-stack MERN application. It delivers a dynamic, responsive dashboard experience with real-time authentication state management, protected routes based on user roles, and efficient API communication with automatic token refresh capabilities.

### Key Characteristics:
- **Modern React**: Built with React 19 using functional components and hooks
- **Fast Build Tool**: Vite for lightning-fast development and optimized production builds
- **Responsive Design**: Mobile-first approach using Tailwind CSS utility classes
- **Smart API Integration**: Axios with intelligent interceptors for token management
- **Protected Routes**: Role-based access control with RoleGuard component
- **State Management**: React Context API for authentication and global state
- **Production Ready**: Deployed on Vercel with optimized build output
- **User Experience**: Toast notifications, loading states, and error handling

---

## ✨ Features

- ✅ **User Authentication**
  - User registration and login with form validation
  - JWT access token management
  - Persistent authentication across page reloads
  - Automatic logout on token expiration
  - "Remember Me" functionality (optional)

- ✅ **Role-Based Access Control**
  - Different dashboard layouts for Admin and User roles
  - Protected routes with automatic redirects
  - Role-aware navigation and menu items
  - Conditional UI rendering based on user role

- ✅ **Admin Dashboard**
  - User management interface
  - Activity log viewer with filtering
  - System statistics and analytics
  - User role management
  - Delete user functionality

- ✅ **User Dashboard**
  - Personal profile management
  - Notes management (Create, Read, Update, Delete)
  - Search and filter capabilities
  - Profile update with validation
  - Personal activity tracking

- ✅ **Responsive UI**
  - Mobile-first design
  - Fully responsive on all device sizes
  - Touch-friendly interface
  - Adaptive layouts

- ✅ **Security Features**
  - Token stored in secure localStorage
  - HTTP-only cookie handling for refresh tokens
  - CORS with credentials support
  - Input validation and sanitization
  - Protected route guards

- ✅ **User Experience**
  - Toast notifications for success/error messages
  - Loading states and spinners
  - Form validation with feedback
  - Error boundaries
  - Smooth transitions and animations
  - Intuitive navigation

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Frontend Framework** | React | ^19.2.5 |
| **Build Tool** | Vite | ^8.0.10 |
| **Styling** | Tailwind CSS | ^4.2.4 |
| **HTTP Client** | Axios | ^1.16.0 |
| **Routing** | React Router DOM | ^7.15.0 |
| **Icons** | Lucide React | ^1.14.0 |
| **Notifications** | React Toastify | ^11.1.0 |
| **Code Quality** | ESLint | ^10.2.1 |
| **Deployment** | Vercel | - |
| **Package Manager** | npm | 9+ |
| **Node.js** | Node.js | 18+ |

---

## 📁 Folder Structure

```
ReactFrontend/
├── public/                              # Static assets
├── src/
│   ├── App.jsx                          # Root component
│   ├── main.jsx                         # Entry point
│   ├── index.css                        # Global styles
│   ├── assets/                          # Images, fonts, media
│   ├── components/
│   │   ├── admin/                       # Admin-specific components
│   │   │   ├── Sidebar.jsx              # Navigation sidebar
│   │   │   ├── Topbar.jsx               # Header/top navigation
│   │   │   ├── UsersTable.jsx           # Users management table
│   │   │   └── Dashboard/
│   │   │       └── Activitylog.jsx      # Activity log viewer
│   │   └── user/                        # User-specific components
│   │       ├── Navebar.jsx              # User navigation
│   │       └── SearchToggle.jsx         # Search functionality
│   ├── context/
│   │   └── AuthProvider.jsx             # Auth state & context
│   ├── layout/
│   │   ├── AdminLayout.jsx              # Admin dashboard layout
│   │   ├── AppLayout.jsx                # General app layout
│   │   └── LayoutMap.jsx                # Layout routing configuration
│   ├── Pages/
│   │   ├── admin/                       # Admin page components
│   │   │   ├── AdminDashboard.jsx       # Admin dashboard page
│   │   │   └── Users.jsx                # Users management page
│   │   ├── common/                      # Shared pages
│   │   │   ├── Login.jsx                # Login page
│   │   │   └── Signup.jsx               # Registration page
│   │   └── user/                        # User page components
│   │       ├── Home.jsx                 # User home/dashboard
│   │       └── Profile.jsx              # User profile page
│   ├── routes/
│   │   ├── AppRoutes.jsx                # Route configuration
│   │   ├── RoleGuard.jsx                # Protected route component
│   │   └── routeConfig.js               # Route metadata
│   └── services/
│       └── api.js                       # Axios instance with interceptors
├── index.html                           # HTML entry point
├── .env                                 # Environment variables
├── .env.example                         # Environment variables template
├── .gitignore                           # Git ignore rules
├── package.json                         # Dependencies and scripts
├── vite.config.js                       # Vite configuration
├── eslint.config.js                     # ESLint configuration
├── LICENSE                              # License file
└── README.md                            # This file
```

---

## 🔐 Authentication Flow

### JWT Token-Based Authentication with Axios Interceptors

```
1. User Registration
   ├─ User fills registration form
   ├─ Form validation on frontend
   ├─ POST to /api/auth/register
   ├─ Backend hashes password and saves user
   └─ Redirect to login page

2. User Login
   ├─ User submits email and password
   ├─ POST to /api/auth/login
   ├─ Backend verifies credentials
   ├─ Returns Access Token and Refresh Token
   ├─ Access Token → Stored in localStorage
   ├─ Refresh Token → Stored in HTTP-only cookie
   ├─ User data set in AuthContext
   └─ Redirect to dashboard

3. Authenticated API Requests
   ├─ Request Interceptor triggers
   ├─ Token retrieved from localStorage
   ├─ Token added to Authorization header
   ├─ Request sent: Authorization: Bearer {token}
   ├─ Backend validates token
   ├─ Response received and returned
   └─ UI updates with fresh data

4. Token Expiration & Refresh
   ├─ Access Token expires after 15 minutes
   ├─ User makes API call with expired token
   ├─ Backend returns 401 Unauthorized
   ├─ Response Interceptor catches 401
   ├─ Automatic POST to /api/auth/refresh
   ├─ Backend verifies refresh token from cookie
   ├─ New Access Token issued
   ├─ localStorage updated with new token
   ├─ Original request retried with new token
   └─ Response returned to user (transparent refresh)

5. Logout
   ├─ User clicks logout button
   ├─ localStorage.removeItem("accessToken")
   ├─ AuthContext cleared
   ├─ User redirected to login page
   └─ All protected routes become inaccessible
```

### Authentication Context

```javascript
// AuthContext provides:
{
  user: {
    id: "userId",
    email: "user@example.com",
    role: "user",
    name: "John Doe"
  },
  loading: false,
  login: (credentials) => Promise,
  logout: () => void,
  isAuthenticated: boolean
}
```

---

## 🛡️ Protected Routes Explanation

### Route Protection Mechanism

```
Protected Route Flow:
┌──────────────────┐
│  Route Request   │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────┐
│  Check if route is public?       │
└────────┬──────────────┬──────────┘
         │ Yes          │ No
         │              ▼
         │      ┌──────────────────┐
         │      │   RoleGuard      │
         │      │  component       │
         │      └────────┬─────────┘
         │               │
         │               ▼
         │      ┌──────────────────┐
         │      │  AuthContext     │
         │      │  Check user      │
         │      │  check role      │
         │      └────────┬─────────┘
         │               │
         │      ┌────────┴────────┐
         │      │                 │
         │      ▼                 ▼
         │   Role    Role not
         │   Match   Allowed
         │   │            │
         │   ▼            ▼
         │ Render    Redirect to
         │ Page      Login/403
         │
         ▼
   Render Public Page
```

### RoleGuard Implementation

The `RoleGuard` component ensures only authenticated users with proper roles can access routes:

```javascript
// RoleGuard.jsx
- Checks if user is authenticated
- Verifies user role against allowedRoles
- Redirects unauthorized users
- Shows loading state while checking auth
```

### Route Configuration

Routes are defined in `routeConfig.js` with metadata:
- `path`: URL path
- `element`: Component to render
- `public`: Is route publicly accessible?
- `roles`: Array of allowed roles
- `layout`: Layout wrapper component

---

## ⚡ Axios Interceptor Explanation

### Axios Configuration

```javascript
// api.js - Centralized Axios instance
- Base URL: Development (/api), Production (VITE_API_URL)
- Credentials: Enabled (for cookies)
- Request Interceptor: Adds Authorization header
- Response Interceptor: Handles token refresh on 401
```

### Request Interceptor

```
Outgoing Request:
    ↓
Check localStorage for accessToken
    ↓
If token exists:
  Add to headers: Authorization: Bearer {token}
    ↓
If no token:
  Send request without auth header
    ↓
Send request to backend
```

### Response Interceptor

```
Response Received:
    ↓
Status 2xx (Success):
  → Return response as-is
    ↓
Status 4xx/5xx (Error):
  → Check if 401 Unauthorized
    ↓
  Is 401 AND not refresh endpoint?
    ├─ YES: Attempt token refresh
    │  ├─ POST /api/auth/refresh
    │  ├─ Get new token from response
    │  ├─ Update localStorage
    │  ├─ Retry original request
    │  └─ Return retried response
    │
    └─ NO: Return error as-is
       ├─ If logout endpoint: Clear auth
       ├─ If 403: Insufficient permissions
       └─ Show error to user
```

### Features:

✅ **Automatic Token Injection**: Every request automatically includes the JWT token
✅ **Transparent Token Refresh**: User doesn't notice token refresh happening
✅ **Retry Failed Requests**: Requests are retried with new token
✅ **Logout on Permanent 401**: If refresh fails, user is logged out
✅ **Credential Support**: Cookies sent with cross-origin requests
✅ **Error Prevention**: Prevents infinite loops on refresh endpoint

---

## 🚀 Installation Steps

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git
- Backend API running (see backend README)

### Step 1: Clone Repository
```bash
git clone https://github.com/Parbeen27/Notes_Frontend
cd ReactFrontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs all required packages:
- react & react-dom
- vite (build tool)
- react-router-dom (routing)
- axios (HTTP client)
- tailwindcss (styling)
- lucide-react (icons)
- react-toastify (notifications)
- eslint (code quality)

### Step 3: Environment Setup
Create `.env` file (see [Environment Variables](#-environment-variables) section)

### Step 4: Start Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5173` (Vite default port)

### Step 5: Verify Backend Connection
- Ensure backend is running on `http://localhost:3000`
- Check `.env` file for correct `VITE_API_URL`
- Open DevTools to verify API calls are working

---

## 🔑 Environment Variables

### Required Variables

Create a `.env` file in the root of the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Optional: Backend URLs for different environments
VITE_DEV_API_URL=http://localhost:3000
VITE_PROD_API_URL=https://mern-backend-production.onrender.com

# Optional: Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

### Environment Variable Guidelines

| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` | ✅ |
| `VITE_DEV_API_URL` | Development API URL | `http://localhost:3000` | ❌ |
| `VITE_PROD_API_URL` | Production API URL | `https://api.production.com` | ❌ |
| `VITE_ENABLE_ANALYTICS` | Enable analytics tracking | `true` or `false` | ❌ |
| `VITE_ENABLE_DEBUG_MODE` | Enable debug logging | `true` or `false` | ❌ |

### Using Environment Variables in Code

```javascript
// Access in React components
const apiUrl = import.meta.env.VITE_API_URL;
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;
```

### .env.example Template

Create `.env.example` for team reference:

```env
# Example configuration - copy to .env and update values
VITE_API_URL=http://localhost:3000
VITE_DEV_API_URL=http://localhost:3000
VITE_PROD_API_URL=https://mern-backend-production.onrender.com
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

---

## 💻 Running Locally

### Development Mode

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

**Output:**
```
  VITE v8.0.10  ready in 245 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Production Build

Build optimized production bundle:

```bash
npm run build
```

**Output:**
```
vite v8.0.10 building for production...
✓ 1234 modules transformed.
dist/index.html                    0.50 kB │ gzip:  0.30 kB
dist/assets/index-a1b2c3d4.js    245.67 kB │ gzip: 78.45 kB
dist/assets/index-e5f6g7h8.css    12.34 kB │ gzip:  3.12 kB
```

### Preview Production Build

Test production build locally:

```bash
npm run preview
```

Accessible at `http://localhost:4173`

### Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

### Development Tips

**Hot Module Replacement (HMR):**
- Changes to components automatically reflect in browser
- Component state is preserved
- Perfect for rapid development

**Browser DevTools:**
- React DevTools extension
- Network tab to monitor API calls
- Console for debugging
- Application tab to inspect localStorage/cookies

**API Testing:**
Test API calls directly in browser console:
```javascript
// Import api instance
import api from './src/services/api'

// Test authenticated request
api.get('/user/profile').then(res => console.log(res.data))

// Test token refresh
api.post('/auth/refresh').then(res => console.log(res.data))
```

---

## 🌐 Deployment Link

### Live Application URL
**https://mern-frontend-production.vercel.app**

### Deployment Details
- **Platform**: Vercel
- **Region**: Auto-optimized
- **Environment**: Production
- **Status**: Active ✅

### Deployment Process

The application is deployed on Vercel with automatic deployments:

1. **GitHub Integration**
   - Linked GitHub repository to Vercel
   - Auto-deploy on push to main branch
   - Preview deployments for pull requests

2. **Build Configuration**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

3. **Environment Variables**
   - Configured `VITE_API_URL` in Vercel dashboard
   - Points to production backend on Render
   - Separate staging/preview configs if needed

4. **Optimizations**
   - Automatic code splitting
   - Image optimization
   - Edge caching enabled
   - Gzip compression active

5. **Domain Configuration**
   - Custom domain configured (optional)
   - SSL/TLS certificate auto-enabled
   - Automatic redirects from http to https

### Accessing Live Application

Test the live deployment:
```bash
# In browser
https://mern-frontend-production.vercel.app

# Check API connectivity
curl https://mern-frontend-production.vercel.app/api/auth/checklogin
```

### Vercel Dashboard

Monitor deployment in Vercel:
1. Visit vercel.com
2. Select project
3. View deployment logs
4. Monitor analytics and performance
5. Configure environment variables
6. Manage domain settings

---

## 📸 Screenshots & UI Highlights

### Login Page
- Email and password input fields with validation
- Link to signup for new users
- Responsive design for mobile and desktop
- Error message display
- Loading state indicator

**Path**: src/Pages/common/Login.jsx

### Signup Page
- Registration form with email, password, name
- Password confirmation field
- Form validation
- Terms of service checkbox
- Link back to login page

**Path**: src/Pages/common/Signup.jsx

### Admin Dashboard
- User management interface
- Activity logs viewer
- System statistics
- User role management
- Responsive admin layout

**Path**: src/Pages/admin/AdminDashboard.jsx

### Users Management
- Table of all users
- User role display
- Delete user functionality
- Role change capability
- Pagination (recommended)

**Path**: src/Pages/admin/Users.jsx

### User Home Page
- Personal dashboard
- Notes management
- Quick stats
- Recent activity

**Path**: src/Pages/user/Home.jsx

### User Profile Page
- Profile information display
- Edit profile form
- Update password
- Account settings

**Path**: src/Pages/user/Profile.jsx

---

## 🎨 UI/UX Highlights

### Design System

**Color Palette:**
- Primary colors for CTA buttons
- Neutral grays for text and backgrounds
- Accent colors for alerts and notifications
- Consistent color usage across components

**Typography:**
- Clear hierarchy with heading sizes
- Readable font sizes (16px minimum)
- Proper line-height for readability
- Consistent font weights

### Responsive Design

**Mobile First Approach:**
- Layouts optimized for mobile first
- Tablet adaptations
- Desktop enhancements
- Flexible grid system using Tailwind

**Breakpoints:**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

### Accessibility

**WCAG Compliance:**
- Semantic HTML structure
- Proper alt text for images
- Keyboard navigation support
- Sufficient color contrast
- Form labels and error messages
- Focus indicators visible

### User Experience

**Loading States:**
- Skeleton screens for content loading
- Spinner indicators for async operations
- Disabled buttons during submission
- Progress indicators for long operations

**Error Handling:**
- User-friendly error messages
- Toast notifications for feedback
- Form validation before submission
- Clear error boundaries

**Navigation:**
- Intuitive menu structure
- Breadcrumb navigation
- Active route highlighting
- Quick access shortcuts

**Feedback:**
- Success messages after actions
- Confirmation dialogs for destructive actions
- Loading spinners during API calls
- Toast notifications (react-toastify)
- Inline form error messages

### Performance Optimizations

- Code splitting with lazy loading
- Image optimization
- CSS purging with Tailwind
- Asset caching strategies
- Minimal bundle size

---

## 🎯 Future Improvements

### Short-term Enhancements
- [ ] **Form Validation Library**: Integrate `react-hook-form` or `Formik`
- [ ] **Toast Notifications Enhancement**: Custom toast templates and themes
- [ ] **Loading Skeletons**: Add skeleton screens for better UX
- [ ] **Search Optimization**: Add debouncing to search inputs
- [ ] **Pagination**: Implement pagination for user/notes lists
- [ ] **Dark Mode**: Add light/dark theme toggle
- [ ] **Accessibility**: Improve WCAG compliance
- [ ] **Unit Testing**: Add Jest and React Testing Library tests

### Medium-term Features
- [ ] **Advanced Filtering**: Filter notes by date, category, tags
- [ ] **Notes Categories/Tags**: Organize notes better
- [ ] **Notes Search**: Full-text search across all notes
- [ ] **User Preferences**: Theme, language, notification settings
- [ ] **Profile Picture Upload**: Avatar management
- [ ] **Activity Timeline**: Enhanced activity visualization
- [ ] **Bulk Actions**: Select multiple users/notes for batch operations
- [ ] **Export Data**: CSV/PDF export functionality
- [ ] **Email Notifications**: Settings for email alerts
- [ ] **Two-Factor Authentication (2FA)**: TOTP or SMS-based 2FA UI

### Long-term Scalability
- [ ] **PWA Support**: Progressive Web App capabilities
- [ ] **Offline Support**: Service workers and IndexedDB
- [ ] **Real-time Updates**: WebSocket integration
- [ ] **Advanced Analytics**: Charts and reporting dashboard
- [ ] **Internationalization (i18n)**: Multi-language support
- [ ] **State Management Upgrade**: Redux or Zustand
- [ ] **Component Library**: Reusable component documentation
- [ ] **Storybook**: Component library and documentation
- [ ] **GraphQL**: Migration from REST to GraphQL
- [ ] **Mobile App**: React Native version for iOS/Android

### Developer Experience
- [ ] **TypeScript**: Add TypeScript for type safety
- [ ] **Testing**: Comprehensive unit and integration tests
- [ ] **E2E Testing**: Cypress or Playwright tests
- [ ] **Storybook**: Interactive component development
- [ ] **Error Tracking**: Sentry integration
- [ ] **Performance Monitoring**: Web vitals tracking
- [ ] **API Documentation**: Swagger/OpenAPI documentation
- [ ] **Pre-commit Hooks**: Husky for code quality

### DevOps & Deployment
- [ ] **Docker**: Containerize application
- [ ] **CI/CD Pipeline**: GitHub Actions for automated testing/deployment
- [ ] **Environment Parity**: Dev, staging, production configs
- [ ] **Database Migrations**: Frontend state persistence improvements
- [ ] **CDN Integration**: Static asset delivery via CDN

---

## 👨‍💼 Author

**Your Name**
- **Email**: parbeensingh27@gmail.com
- **GitHub**: [@Parbeen27](https://github.com/Parbeen27)
- **LinkedIn**: [Parbeen](https://www.linkedin.com/in/parbeen-singh-b75289249?utm_source=share_via&utm_content=profile&utm_medium=member_android)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

This is an MERN Stack project. For contributions or feedback, please reach out directly.

---

## 📞 Support

For issues, questions, or feedback:
- Email: parbeensingh27@gmail.com
- GitHub Issues: [Git_repo]https://github.com/Parbeen27/Notes_Frontend

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [React Context API](https://react.dev/reference/react/useContext)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [REST API Design](https://restfulapi.net/)
- [Web Accessibility (WCAG)](https://www.w3.org/WAI/)
- [React Hooks](https://react.dev/reference/react)

---

## 🔗 Related Projects

- **Backend API**: [Backend_Repo]https://github.com/Parbeen27/Notes_Backend
- **Documentation**: [Postman Documentation]https://parbeen-s-team.docs.buildwithfern.com/notes-baclend-api/localhost-3000-api-admin
- **Deployment**: [Backend on Render](https://mern-backend-production.onrender.com)

---

**Last Updated**: May 2026
**Version**: 1.0.0

---


