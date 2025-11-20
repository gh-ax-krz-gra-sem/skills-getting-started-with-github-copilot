import { useState, useEffect } from 'react';
import './App.css';
import ActivityCard from './components/ActivityCard';
import SignupForm from './components/SignupForm';
import MessageBanner from './components/MessageBanner';
import { activitiesAPI } from './services/api';

function App() {
  const [activities, setActivities] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Fetch activities on component mount
  useEffect(() => {
    loadActivities();
  }, []);

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await activitiesAPI.getActivities();
      setActivities(data);
    } catch (error) {
      setMessage({
        text: 'Failed to load activities. Please try again later.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (activityName, email) => {
    try {
      const result = await activitiesAPI.signUp(activityName, email);
      setMessage({ text: result.message, type: 'success' });
      await loadActivities();
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to sign up. Please try again.',
        type: 'error'
      });
    }
  };

  const handleUnregister = async (activityName, email) => {
    try {
      const result = await activitiesAPI.unregister(activityName, email);
      setMessage({ text: result.message, type: 'success' });
      await loadActivities();
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to unregister. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <>
      <header>
        <h1>Mergington High School</h1>
        <h2>Extracurricular Activities</h2>
      </header>

      <main>
        <section id="activities-container">
          <h3>Available Activities</h3>
          <div id="activities-list">
            {loading ? (
              <p>Loading activities...</p>
            ) : Object.keys(activities).length > 0 ? (
              Object.entries(activities).map(([name, details]) => (
                <ActivityCard
                  key={name}
                  name={name}
                  details={details}
                  onUnregister={handleUnregister}
                />
              ))
            ) : (
              <p>No activities available.</p>
            )}
          </div>
        </section>

        <section id="signup-container">
          <h3>Sign Up for an Activity</h3>
          <SignupForm activities={activities} onSignup={handleSignup} />
          <MessageBanner
            message={message.text}
            type={message.type}
            onClose={() => setMessage({ text: '', type: '' })}
          />
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Mergington High School</p>
      </footer>
    </>
  );
}

export default App;
