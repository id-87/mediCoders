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

  // Booking State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingReason, setBookingReason] = useState('');

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
    // Default to tomorrow at 10 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    setBookingDate(tomorrow.toISOString().slice(0, 16));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    const patientId = localStorage.getItem('userId');

    if (!patientId) {
      alert('User ID not found. Please logout and login again.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/appointments', {
        doctorId: selectedDoctor.id,
        patientId: parseInt(patientId),
        date: bookingDate,
        reason: bookingReason,
        status: 'scheduled'
      });

      alert('Appointment booked successfully!');
      setShowBookingModal(false);
      setBookingReason('');
      fetchData(); // Refresh list
    } catch (err) {
      console.error('Booking error:', err);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                      {apt.doctor && (
                        <div style={{ color: 'var(--primary-color)', fontSize: '14px', marginTop: '5px', fontWeight: 500 }}>
                          Dr. {apt.doctor.name}
                        </div>
                      )}
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
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => handleBookClick(doctor)}
                  >
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

        {/* Booking Modal */}
        {showBookingModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}>
            <div className="card" style={{ maxWidth: '500px', width: '90%' }}>
              <h3>Book Appointment</h3>
              <p style={{ marginBottom: '20px', color: 'var(--text-light)' }}>
                with {selectedDoctor?.name}
              </p>

              <form onSubmit={handleBookAppointment}>
                <div className="form-group">
                  <label>Date & Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Reason for Visit</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={bookingReason}
                    onChange={(e) => setBookingReason(e.target.value)}
                    placeholder="Briefly describe your symptoms or reason for visit"
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button type="button" className="btn" onClick={() => setShowBookingModal(false)} style={{ flex: 1, background: '#e0e0e0', color: '#333' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PatientPortal;
