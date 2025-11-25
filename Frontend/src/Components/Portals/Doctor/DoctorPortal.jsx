import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../medical-theme.css';

const DoctorPortal = () => {

  const [slots] = useState([
    { id: 1, time: '9:00 AM - 9:30 AM', status: 'available', patient: null },
    { id: 2, time: '9:30 AM - 10:00 AM', status: 'booked', patient: 'John Doe' },
    { id: 3, time: '10:00 AM - 10:30 AM', status: 'available', patient: null },
    { id: 4, time: '10:30 AM - 11:00 AM', status: 'booked', patient: 'Jane Smith' },
    { id: 5, time: '11:00 AM - 11:30 AM', status: 'available', patient: null },
    { id: 6, time: '2:00 PM - 2:30 PM', status: 'available', patient: null },
    { id: 7, time: '2:30 PM - 3:00 PM', status: 'booked', patient: 'Mike Johnson' },
    { id: 8, time: '3:00 PM - 3:30 PM', status: 'available', patient: null },
  ]);

  const availableCount = slots.filter(s => s.status === 'available').length;
  const bookedCount = slots.filter(s => s.status === 'booked').length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>
      { }
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

      { }
      <div className="portal-container">
        { }
        <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--text-light)', marginBottom: '5px' }}>Available Slots</p>
                <h3 style={{ fontSize: '36px', color: 'var(--secondary-color)', margin: 0 }}>{availableCount}</h3>
              </div>
              <div style={{ fontSize: '48px' }}>✅</div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--text-light)', marginBottom: '5px' }}>Booked Appointments</p>
                <h3 style={{ fontSize: '36px', color: 'var(--primary-color)', margin: 0 }}>{bookedCount}</h3>
              </div>
              <div style={{ fontSize: '48px' }}>📅</div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--text-light)', marginBottom: '5px' }}>Today's Patients</p>
                <h3 style={{ fontSize: '36px', color: 'var(--accent-color)', margin: 0 }}>{bookedCount}</h3>
              </div>
              <div style={{ fontSize: '48px' }}>👥</div>
            </div>
          </div>
        </div>

        { }
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>Today's Schedule</h3>
            <button className="btn btn-primary">Add Slot</button>
          </div>

          <div style={{ display: 'grid', gap: '15px' }}>
            {slots.map(slot => (
              <div
                key={slot.id}
                className={`slot-card ${slot.status === 'available' ? 'slot-available' : 'slot-unavailable'}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '5px' }}>
                      {slot.time}
                    </div>
                    {slot.patient && (
                      <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>
                        Patient: {slot.patient}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`badge ${slot.status === 'available' ? 'badge-success' : 'badge-danger'}`}>
                      {slot.status === 'available' ? 'Available' : 'Booked'}
                    </span>
                    {slot.patient && (
                      <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                        View History
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        { }
        <div className="card" style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>📋 Universal Medical Records</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '15px' }}>
            Access complete patient medical history when they check in for their appointment.
            All previous visits, prescriptions, and test results in one place.
          </p>
          <div style={{ padding: '20px', background: 'var(--bg-light)', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-light)' }}>
              Select a patient from your booked appointments to view their medical history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;
