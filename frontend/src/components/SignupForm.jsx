import { useState } from 'react';
import './SignupForm.css';

function SignupForm({ activities, onSignup }) {
  const [email, setEmail] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !selectedActivity) {
      return;
    }

    await onSignup(selectedActivity, email);
    
    // Reset form
    setEmail('');
    setSelectedActivity('');
  };

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Student Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your-email@mergington.edu"
        />
      </div>
      <div className="form-group">
        <label htmlFor="activity">Select Activity:</label>
        <select
          id="activity"
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
          required
        >
          <option value="">-- Select an activity --</option>
          {Object.keys(activities).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
