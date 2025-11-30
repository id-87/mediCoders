import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import '../../../medical-theme.css';

const PatientPortal = () => {
  const [doctors, setDoctors] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const doctorsResponse = await api.get('/doctors');
      setDoctors(doctorsResponse.data || []);


      const appointmentsResponse = await api.get('/appointments');
      setMyAppointments(appointmentsResponse.data || []);

      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Loading...</h3>
          <p style={{ color: 'var(--text-light)' }}>Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>
      {/* Header */}
      <div className="portal-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Patient Portal</h2>
              <p style={{ opacity: 0.9, marginTop: '5px' }}>Find available doctors and manage your appointments</p>
            </div>
            <Link to="/" className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.2)' }}>
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="portal-container">
        {error && (
          <div className="card" style={{ marginBottom: '30px', background: 'var(--accent-color)', color: 'white' }}>
            <p>{error}</p>
            <button onClick={fetchData} className="btn" style={{ background: 'white', color: 'var(--accent-color)', marginTop: '10px' }}>
              Retry
            </button>
          </div>
        )}

        {/* Emergency Care Banner */}
        <div className="card" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, var(--primary-light), var(--secondary-color))', color: 'white' }}>
          <h3 style={{ marginBottom: '10px' }}>🚑 Need Emergency Care?</h3>
          <p style={{ opacity: 0.9, marginBottom: '20px' }}>See which doctors are available right now - no waiting!</p>
          <button className="btn" style={{ background: 'white', color: 'var(--primary-color)' }}>
            View Available Doctors
          </button>
        </div>

        {/* My Upcoming Appointments */}
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>📅 My Upcoming Appointments</h3>
          {myAppointments.length > 0 ? (
            <div style={{ display: 'grid', gap: '15px' }}>
              {myAppointments.map(apt => (
                <div key={apt.id} className="slot-card slot-unavailable">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '5px' }}>
                        Appointment #{apt.id}
                      </div>
                      <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>
                        {apt.date ? new Date(apt.date).toLocaleString() : 'Date TBD'} • {apt.reason || 'General consultation'}
                      </div>
                      <div style={{ color: 'var(--text-light)', fontSize: '14px', marginTop: '5px' }}>
                        Status: <span className={`badge ${apt.status === 'scheduled' ? 'badge-success' : 'badge-danger'}`}>
                          {apt.status || 'scheduled'}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                        View Details
                      </button>
                      <button className="btn" style={{ padding: '8px 16px', background: 'var(--accent-color)', color: 'white' }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '20px' }}>
              No upcoming appointments
            </p>
          )}
        </div>

        {/* Available Doctors Today */}
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>👨‍⚕️ Available Doctors</h3>
          {doctors.length > 0 ? (
            <div className="dashboard-grid">
              {doctors.map(doctor => (
                <div key={doctor.id} className="feature-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '10px' }}>👨‍⚕️</div>
                  <h4 style={{ fontSize: '18px', marginBottom: '5px', color: 'var(--text-dark)' }}>
                    {doctor.name}
                  </h4>
                  <p style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '15px' }}>
                    {doctor.details || 'General Physician'}
                  </p>
                  <div style={{ marginBottom: '15px' }}>
                    <span className="badge badge-success">
                      Available
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '15px' }}>
                    Email: {doctor.email}
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '20px' }}>
              No doctors available at the moment
            </p>
          )}
        </div>

        {/* Medical Records Section */}

      </div>
    </div>
  );
};

export default PatientPortal;
