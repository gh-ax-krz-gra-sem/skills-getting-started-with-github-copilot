"""
Tests for the High School Management System API
"""

import pytest
from fastapi.testclient import TestClient
from src.app import app, activities


@pytest.fixture
def client():
    """Create a test client"""
    return TestClient(app)


@pytest.fixture(autouse=True)
def reset_activities():
    """Reset activities data before each test"""
    # Save original state
    original_activities = {
        name: {
            "description": details["description"],
            "schedule": details["schedule"],
            "max_participants": details["max_participants"],
            "participants": details["participants"].copy()
        }
        for name, details in activities.items()
    }
    
    yield
    
    # Restore original state after test
    for name, details in original_activities.items():
        activities[name]["participants"] = details["participants"].copy()


def test_get_activities(client):
    """Test getting all activities"""
    response = client.get("/api/activities")
    assert response.status_code == 200
    data = response.json()
    
    assert "Chess Club" in data
    assert "Programming Class" in data
    assert "description" in data["Chess Club"]
    assert "schedule" in data["Chess Club"]
    assert "max_participants" in data["Chess Club"]
    assert "participants" in data["Chess Club"]


def test_signup_for_activity_success(client):
    """Test successful signup for an activity"""
    response = client.post(
        "/api/activities/Chess%20Club/signup?email=test@mergington.edu"
    )
    assert response.status_code == 200
    data = response.json()
    assert "Signed up test@mergington.edu for Chess Club" in data["message"]
    
    # Verify the participant was added
    activities_response = client.get("/api/activities")
    activities_data = activities_response.json()
    assert "test@mergington.edu" in activities_data["Chess Club"]["participants"]


def test_signup_for_nonexistent_activity(client):
    """Test signup for an activity that doesn't exist"""
    response = client.post(
        "/api/activities/Nonexistent%20Club/signup?email=test@mergington.edu"
    )
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Activity not found"


def test_signup_duplicate_participant(client):
    """Test that a student cannot sign up twice for the same activity"""
    email = "duplicate@mergington.edu"
    
    # First signup should succeed
    response1 = client.post(
        f"/api/activities/Chess%20Club/signup?email={email}"
    )
    assert response1.status_code == 200
    
    # Second signup should fail
    response2 = client.post(
        f"/api/activities/Chess%20Club/signup?email={email}"
    )
    assert response2.status_code == 400
    data = response2.json()
    assert data["detail"] == "Student already signed up for this activity"


def test_unregister_from_activity_success(client):
    """Test successful unregistration from an activity"""
    # First, sign up a student
    email = "test@mergington.edu"
    client.post(f"/api/activities/Chess%20Club/signup?email={email}")
    
    # Then unregister
    response = client.delete(
        f"/api/activities/Chess%20Club/unregister?email={email}"
    )
    assert response.status_code == 200
    data = response.json()
    assert "Unregistered test@mergington.edu from Chess Club" in data["message"]
    
    # Verify the participant was removed
    activities_response = client.get("/api/activities")
    activities_data = activities_response.json()
    assert email not in activities_data["Chess Club"]["participants"]


def test_unregister_from_nonexistent_activity(client):
    """Test unregistration from an activity that doesn't exist"""
    response = client.delete(
        "/api/activities/Nonexistent%20Club/unregister?email=test@mergington.edu"
    )
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Activity not found"


def test_unregister_non_participant(client):
    """Test that unregistering a non-participant returns an error"""
    email = "notregistered@mergington.edu"
    
    response = client.delete(
        f"/api/activities/Chess%20Club/unregister?email={email}"
    )
    assert response.status_code == 400
    data = response.json()
    assert data["detail"] == "Student not signed up for this activity"


def test_activity_has_correct_structure(client):
    """Test that each activity has the required fields"""
    response = client.get("/api/activities")
    data = response.json()
    
    for activity_name, activity_details in data.items():
        assert "description" in activity_details
        assert "schedule" in activity_details
        assert "max_participants" in activity_details
        assert "participants" in activity_details
        assert isinstance(activity_details["participants"], list)
        assert isinstance(activity_details["max_participants"], int)


def test_multiple_signups_different_activities(client):
    """Test that a student can sign up for multiple different activities"""
    email = "multitask@mergington.edu"
    
    response1 = client.post(f"/api/activities/Chess%20Club/signup?email={email}")
    assert response1.status_code == 200
    
    response2 = client.post(f"/api/activities/Programming%20Class/signup?email={email}")
    assert response2.status_code == 200
    
    # Verify participant is in both activities
    activities_response = client.get("/api/activities")
    activities_data = activities_response.json()
    assert email in activities_data["Chess Club"]["participants"]
    assert email in activities_data["Programming Class"]["participants"]
