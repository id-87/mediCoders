import React from 'react';
import { Link } from 'react-router-dom';
import '../../medical-theme.css';

const LandingPage = () => (
    <div>
        { }
        <div className="header">
            <div className="container">
                <h1>MediCoders</h1>
                <p>Smart Healthcare Appointments & Universal Medical Records</p>
                <div style={{ marginTop: '30px' }}>
                    <Link to="/login" className="btn btn-primary" style={{ marginRight: '15px' }}>
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-secondary">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>

        { }
        <div className="section" style={{ background: 'white' }}>
            <div className="container">
                <h2 className="section-title">The Problem We Solve</h2>
                <p className="section-subtitle">
                    Emergency healthcare shouldn't mean endless waiting
                </p>
                <div className="card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
                    <h3 style={{ color: 'var(--accent-color)', marginBottom: '20px' }}>⚠️ Current Challenges</h3>
                    <ul style={{ lineHeight: '2', fontSize: '18px', color: 'var(--text-light)' }}>
                        <li>Long waiting times when visiting doctors without prior appointments</li>
                        <li>No visibility into which doctors are available right now</li>
                        <li>Inconvenient to visit multiple clinics to check availability</li>
                        <li>Medical history scattered across different healthcare providers</li>
                        <li>Doctors lack complete patient history during emergency visits</li>
                    </ul>
                </div>
            </div>
        </div>

        { }
        <div className="section">
            <div className="container">
                <h2 className="section-title">Our Solution</h2>
                <p className="section-subtitle">
                    Real-time doctor availability & unified medical records
                </p>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📅</div>
                        <h3 className="feature-title">Real-Time Slot Viewing</h3>
                        <p className="feature-description">
                            View available doctor slots in real-time before leaving home. Save time by knowing exactly when doctors are free.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">👨‍⚕️</div>
                        <h3 className="feature-title">Doctor Availability</h3>
                        <p className="feature-description">
                            See which doctors are available right now across multiple clinics. No more visiting multiple locations.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📋</div>
                        <h3 className="feature-title">Universal Medical History</h3>
                        <p className="feature-description">
                            Complete medical history from all visits accessible to authorized doctors for better diagnosis and care.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3 className="feature-title">Quick Appointments</h3>
                        <p className="feature-description">
                            Book appointments instantly based on availability. Perfect for emergencies and walk-in needs.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3 className="feature-title">Secure & Private</h3>
                        <p className="feature-description">
                            Your medical data is encrypted and only accessible to doctors you authorize during your visits.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💊</div>
                        <h3 className="feature-title">Complete Care Records</h3>
                        <p className="feature-description">
                            Prescriptions, test results, and visit notes all in one place for seamless healthcare continuity.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        { }
        <div className="section" style={{ background: 'white', textAlign: 'center' }}>
            <div className="container">
                <h2 className="section-title">Ready to Transform Your Healthcare Experience?</h2>
                <p style={{ fontSize: '18px', color: 'var(--text-light)', marginBottom: '30px' }}>
                    Join MediCodes today and never wait unnecessarily again
                </p>
                <Link to="/signup" className="btn btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
                    Get Started Now
                </Link>
            </div>
        </div>
    </div>
);

export default LandingPage;
