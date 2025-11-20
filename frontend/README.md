# Mergington High School - React Frontend

This is the React.js frontend for the Mergington High School Activities Management System.

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and development server
- **CSS3** - Styling (component-based CSS modules)

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at **http://localhost:3000** (or the port shown in the terminal).

**Important:** The FastAPI backend must be running on port 8000 for the frontend to work properly.

## Building for Production

Build the optimized production bundle:

```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── ActivityCard.jsx # Activity display card
│   │   ├── ActivityCard.css
│   │   ├── SignupForm.jsx   # Signup form component
│   │   ├── SignupForm.css
│   │   ├── MessageBanner.jsx # Success/error messages
│   │   └── MessageBanner.css
│   ├── services/
│   │   └── api.js           # API client for backend
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global app styles
│   ├── main.jsx             # Entry point
│   └── index.css            # Global CSS reset
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## API Integration

The frontend communicates with the FastAPI backend through the proxy configured in `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

All API calls are made to endpoints starting with `/api/`:
- `GET /api/activities` - Fetch all activities
- `POST /api/activities/{name}/signup?email={email}` - Sign up for activity
- `DELETE /api/activities/{name}/unregister?email={email}` - Unregister from activity

## Features

- **Activity Listing**: View all available activities with real-time participant counts
- **Student Signup**: Register for activities with email validation
- **Participant Management**: Remove participants with confirmation dialog
- **Success/Error Messages**: Auto-dismissing feedback messages (5 seconds)
- **Responsive Design**: Mobile-friendly layout
- **Real-time Updates**: Activity list refreshes after mutations

## Components

### App.jsx
Main application component that manages global state:
- Activities data
- Loading states
- Message notifications
- API calls coordination

### ActivityCard.jsx
Displays individual activity details:
- Activity name and description
- Schedule information
- Available spots calculation
- Current participants list
- Delete buttons for each participant

### SignupForm.jsx
Handles student registration:
- Email input with validation
- Activity selection dropdown
- Form submission handling
- Form reset after successful signup

### MessageBanner.jsx
Shows success/error messages:
- Auto-dismiss after 5 seconds
- Different styles for success/error/info
- Smooth transitions

## Styling Approach

The project uses modular CSS with each component having its own CSS file:
- `App.css` - Global layout and theme
- `ActivityCard.css` - Activity card specific styles
- `SignupForm.css` - Form styling
- `MessageBanner.css` - Message notification styles

Color scheme:
- Primary: `#1a237e` (deep blue)
- Success: Green tones
- Error: Red tones
- Background: Light gray (`#f5f5f5`)

## Development Notes

- Hot Module Replacement (HMR) is enabled for instant updates during development
- The proxy configuration ensures API requests work seamlessly in development
- CORS is handled by the backend for production deployments
