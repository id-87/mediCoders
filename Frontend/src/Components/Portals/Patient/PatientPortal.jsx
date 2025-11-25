import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../medical-theme.css';

const PatientPortal = () => {

  const [doctors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', availableSlots: 3, nextSlot: '9:00 AM' },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'General Physician', availableSlots: 5, nextSlot: '10:00 AM' },
    { id: 3, name: 'Dr. Emily Brown', specialization: 'Pediatrician', availableSlots: 2, nextSlot: '2:00 PM' },
    { id: 4, name: 'Dr. James Wilson', specialization: 'Dermatologist', availableSlots: 4, nextSlot: '11:00 AM' },
  ]);

  const [myAppointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Johnson', date: 'Today', time: '3:00 PM', type: 'Follow-up' },
    { id: 2, doctor: 'Dr. Michael Chen', date: 'Tomorrow', time: '10:30 AM', type: 'Check-up' },
  ]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>
      { }
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

      { }
      <div className="portal-container">
        { }
        <div className="card" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, var(--primary-light), var(--secondary-color))', color: 'white' }}>
          <h3 style={{ marginBottom: '10px' }}>🚑 Need Emergency Care?</h3>
          <p style={{ opacity: 0.9, marginBottom: '20px' }}>See which doctors are available right now - no waiting!</p>
          <button className="btn" style={{ background: 'white', color: 'var(--primary-color)' }}>
            View Available Doctors
          </button>
        </div>

        { }
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>📅 My Upcoming Appointments</h3>
          {myAppointments.length > 0 ? (
            <div style={{ display: 'grid', gap: '15px' }}>
              {myAppointments.map(apt => (
                <div key={apt.id} className="slot-card slot-unavailable">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '5px' }}>
                        {apt.doctor}
                      </div>
                      <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>
                        {apt.date} at {apt.time} • {apt.type}
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

        { }
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>👨‍⚕️ Available Doctors Today</h3>
          <div className="dashboard-grid">
            {doctors.map(doctor => (
              <div key={doctor.id} className="feature-card" style={{ padding: '20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>👨‍⚕️</div>
                <h4 style={{ fontSize: '18px', marginBottom: '5px', color: 'var(--text-dark)' }}>
                  {doctor.name}
                </h4>
                <p style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '15px' }}>
                  {doctor.specialization}
                </p>
                <div style={{ marginBottom: '15px' }}>
                  <span className="badge badge-success">
                    {doctor.availableSlots} slots available
                  </span>
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '15px' }}>
                  Next available: {doctor.nextSlot}
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }}>
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>

        { }
        <div className="card" style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>📋 My Medical History</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '15px' }}>
            Your complete medical history is securely stored and accessible to doctors you visit.
            This includes all past visits, prescriptions, test results, and diagnoses.
          </p>
          <div style={{ padding: '20px', background: 'var(--bg-light)', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', color: 'var(--primary-color)', fontWeight: 'bold' }}>12</div>
                <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>Total Visits</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', color: 'var(--secondary-color)', fontWeight: 'bold' }}>8</div>
                <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>Prescriptions</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', color: 'var(--accent-color)', fontWeight: 'bold' }}>5</div>
                <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>Lab Reports</div>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%' }}>
              View Complete History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;
