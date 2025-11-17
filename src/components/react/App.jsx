import React, { useState } from 'react';
import InternshipList from './InternshipList';

const App = () => {
  const [activeTab, setActiveTab] = useState('internships');

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: '#f6f1e7',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        borderBottom: '2px solid #0ea5e9',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ 
            fontSize: '1.8rem', 
            fontWeight: '700', 
            color: '#1e3a8a',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-graduation-cap"></i>
            <span>InternHub</span>
          </div>
          
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#" style={{ 
              color: activeTab === 'home' ? '#0ea5e9' : '#1e3a8a', 
              textDecoration: 'none', 
              fontWeight: '500',
              paddingBottom: '0.5rem',
              borderBottom: activeTab === 'home' ? '2px solid #0ea5e9' : 'none'
            }} onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
              Home
            </a>
            <a href="#" style={{ 
              color: activeTab === 'internships' ? '#0ea5e9' : '#1e3a8a', 
              textDecoration: 'none', 
              fontWeight: '500',
              paddingBottom: '0.5rem',
              borderBottom: activeTab === 'internships' ? '2px solid #0ea5e9' : 'none'
            }} onClick={(e) => { e.preventDefault(); setActiveTab('internships'); }}>
              Internships
            </a>
            <a href="#" style={{ 
              color: activeTab === 'community' ? '#0ea5e9' : '#1e3a8a', 
              textDecoration: 'none', 
              fontWeight: '500',
              paddingBottom: '0.5rem',
              borderBottom: activeTab === 'community' ? '2px solid #0ea5e9' : 'none'
            }} onClick={(e) => { e.preventDefault(); setActiveTab('community'); }}>
              Community
            </a>
            <button style={{
              padding: '0.7rem 1.5rem',
              background: 'linear-gradient(135deg, #1e3a8a, #0ea5e9)',
              border: 'none',
              borderRadius: '25px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              <i className="fas fa-user"></i> Login
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        {activeTab === 'home' && (
          <div>
            <section style={{ 
              textAlign: 'center', 
              padding: '3rem 0',
              background: 'linear-gradient(135deg, #1e3a8a, #0ea5e9)',
              borderRadius: '20px',
              color: 'white',
              marginBottom: '3rem'
            }}>
              <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>Find Your Dream Internship</h1>
              <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                Connect with top companies and kickstart your career with InternHub
              </p>
              <button style={{
                padding: '1rem 2rem',
                background: 'white',
                border: 'none',
                borderRadius: '30px',
                color: '#1e3a8a',
                fontWeight: '600',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}>
                Browse Internships
              </button>
            </section>

            <section>
              <h2 style={{ color: '#1e3a8a', marginBottom: '1.5rem' }}>Why Choose InternHub?</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2rem' 
              }}>
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <i className="fas fa-briefcase" style={{ 
                    fontSize: '3rem', 
                    color: '#0ea5e9', 
                    marginBottom: '1rem' 
                  }}></i>
                  <h3>Verified Internships</h3>
                  <p>All internships are verified by our team to ensure quality and legitimacy</p>
                </div>
                
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <i className="fas fa-graduation-cap" style={{ 
                    fontSize: '3rem', 
                    color: '#0ea5e9', 
                    marginBottom: '1rem' 
                  }}></i>
                  <h3>Skill Development</h3>
                  <p>Access courses and resources to enhance your skills and knowledge</p>
                </div>
                
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <i className="fas fa-users" style={{ 
                    fontSize: '3rem', 
                    color: '#0ea5e9', 
                    marginBottom: '1rem' 
                  }}></i>
                  <h3>Community Support</h3>
                  <p>Connect with peers and mentors to grow your professional network</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'internships' && <InternshipList />}
        
        {activeTab === 'community' && (
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#1e3a8a', marginBottom: '1.5rem' }}>Community Feed</h2>
            <p>Connect with other students and professionals in your field.</p>
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              background: '#f9fafb', 
              borderRadius: '10px',
              border: '1px dashed #e5e7eb'
            }}>
              <p style={{ textAlign: 'center', color: '#6b7280' }}>
                <i className="fas fa-users" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                <br />
                Community features coming soon!
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        color: 'white',
        padding: '3rem 2rem',
        marginTop: '3rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>InternHub</h3>
            <p>Connecting talent with opportunity through innovative internship solutions.</p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Internships</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Community</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>About</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
            <p>Email: info@internhub.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          paddingTop: '1rem', 
          borderTop: '1px solid rgba(255,255,255,0.2)' 
        }}>
          <p>&copy; 2025 InternHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;