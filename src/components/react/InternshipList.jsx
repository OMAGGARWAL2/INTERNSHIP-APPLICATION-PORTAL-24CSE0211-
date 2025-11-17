import React, { useState, useEffect } from 'react';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching internships data
    const fetchInternships = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockInternships = [
          {
            id: 1,
            position: 'Frontend Developer Intern',
            company: 'TechCorp',
            location: 'Remote',
            stipend: '₹20,000 - ₹25,000',
            description: 'Work on cutting-edge web applications using React and modern JavaScript frameworks.',
            skills: ['React', 'JavaScript', 'HTML/CSS']
          },
          {
            id: 2,
            position: 'Backend Developer Intern',
            company: 'DataSystems',
            location: 'Bangalore',
            stipend: '₹18,000 - ₹22,000',
            description: 'Develop and maintain backend services using Node.js and MongoDB.',
            skills: ['Node.js', 'MongoDB', 'Express']
          },
          {
            id: 3,
            position: 'UI/UX Designer Intern',
            company: 'CreativeMinds',
            location: 'Mumbai',
            stipend: '₹15,000 - ₹20,000',
            description: 'Create beautiful and intuitive user interfaces for web and mobile applications.',
            skills: ['Figma', 'Adobe XD', 'UI Design']
          }
        ];
        
        setInternships(mockInternships);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch internships');
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading internships...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ color: '#1e3a8a', marginBottom: '1.5rem' }}>Available Internships</h2>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {internships.map(internship => (
          <div 
            key={internship.id} 
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a' }}>{internship.position}</h3>
                <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontWeight: '600' }}>{internship.company}</p>
              </div>
              <span style={{ 
                background: '#0ea5e9', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '20px', 
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {internship.stipend}
              </span>
            </div>
            
            <p style={{ color: '#374151', marginBottom: '1rem' }}>{internship.description}</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {internship.skills.map((skill, index) => (
                <span 
                  key={index} 
                  style={{
                    background: 'rgba(14, 165, 233, 0.1)',
                    color: '#0ea5e9',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                <i className="fas fa-map-marker-alt"></i> {internship.location}
              </span>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #1e3a8a, #0ea5e9)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1.5rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipList;