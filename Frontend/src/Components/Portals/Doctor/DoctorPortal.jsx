import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import '../../../medical-theme.css';

const DoctorPortal = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Fetch all appointments
      const response = await api.get('/appointments');
      setAppointments(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const scheduledCount = appointments.filter(a => a.status === 'scheduled').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const totalPatients = new Set(appointments.map(a => a.patientId)).size;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Loading...</h3>
          <p style={{ color: 'var(--text-light)' }}>Please wait while we fetch your appointments</p>
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
              <h2>Doctor Portal</h2>
              <p style={{ opacity: 0.9, marginTop: '5px' }}>Manage your appointments and view patient history</p>
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
            <button onClick={fetchAppointments} className="btn" style={{ background: 'white', color: 'var(--accent-color)', marginTop: '10px' }}>
              Retry
            </button>
          </div>
        )}

        {/* Statistics Dashboard */}
        <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--text-light)', marginBottom: '5px' }}>Scheduled Appointments</p>
                <h3 style={{ fontSize: '36px', color: 'var(--secondary-color)', margin: 0 }}>{scheduledCount}</h3>
              </div>
              <div style={{ fontSize: '48px' }}>✅</div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--text-light)', marginBottom: '5px' }}>Completed</p>
                <h3 style={{ fontSize: '36px', color: 'var(--primary-color)', margin: 0 }}>{completedCount}</h3>
              </div>
              <div style={{ fontSize: '48px' }}>📅</div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--text-light)', marginBottom: '5px' }}>Total Patients</p>
                <h3 style={{ fontSize: '36px', color: 'var(--accent-color)', margin: 0 }}>{totalPatients}</h3>
              </div>
              <div style={{ fontSize: '48px' }}>👥</div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>All Appointments</h3>
            <button className="btn btn-primary" onClick={fetchAppointments}>Refresh</button>
          </div>

          {appointments.length > 0 ? (
            <div style={{ display: 'grid', gap: '15px' }}>
              {appointments.map(appointment => (
                <div
                  key={appointment.id}
                  className={`slot-card ${appointment.status === 'scheduled' ? 'slot-available' : 'slot-unavailable'}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '5px' }}>
                        Appointment #{appointment.id}
                      </div>
                      <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>
                        Date: {appointment.date ? new Date(appointment.date).toLocaleString() : 'Not scheduled'}
                      </div>
                      <div style={{ color: 'var(--text-light)', fontSize: '14px', marginTop: '5px' }}>
                        Patient ID: {appointment.patientId} | Doctor ID: {appointment.doctorId}
                      </div>
                      {appointment.reason && (
                        <div style={{ color: 'var(--text-light)', fontSize: '14px', marginTop: '5px' }}>
                          Reason: {appointment.reason}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`badge ${appointment.status === 'scheduled' ? 'badge-success' : 'badge-danger'}`}>
                        {appointment.status || 'scheduled'}
                      </span>
                      <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '20px' }}>
              No appointments found
            </p>
          )}
        </div>

        {/* Universal Medical Records Section */}
        <div className="card" style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>📋 Universal Medical Records</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '15px' }}>
            Access complete patient medical history when they check in for their appointment.
            All previous visits, prescriptions, and test results in one place.
          </p>
          <div style={{ padding: '20px', background: 'var(--bg-light)', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-light)' }}>
              Select a patient from your appointments to view their medical history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;
