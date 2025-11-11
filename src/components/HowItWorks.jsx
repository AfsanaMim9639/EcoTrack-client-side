import React, { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Join a Challenge",
    description: "Select an eco-friendly challenge and start your journey towards a sustainable lifestyle.",
    number: "01"
  },
  {
    title: "Track Progress",
    description: "Monitor your actions and see your environmental impact grow with detailed analytics.",
    number: "02"
  },
  {
    title: "Share Tips",
    description: "Share your eco-friendly tips and inspire the community to make a difference.",
    number: "03"
  },
];

const HowItWorks = () => {
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, #09110D 0%, #0B3221 50%, #09110D 100%)',
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        padding: '6rem 1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div 
          style={{
            position: 'absolute',
            top: '5rem',
            left: '2.5rem',
            width: '18rem',
            height: '18rem',
            borderRadius: '9999px',
            filter: 'blur(75px)',
            backgroundColor: 'rgba(26, 160, 109, 0.1)',
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '5rem',
            right: '2.5rem',
            width: '24rem',
            height: '24rem',
            borderRadius: '9999px',
            filter: 'blur(75px)',
            backgroundColor: 'rgba(19, 94, 61, 0.15)',
            animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '1s'
          }}
        />
      </div>

      {/* Pattern Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: 'linear-gradient(rgba(26,160,109,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,160,109,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div style={{ position: 'relative', maxWidth: '80rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(2.5rem)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s ease-out'
          }}>
            <span 
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.5rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: '9999px',
                color: '#1AA06D',
                backgroundColor: 'rgba(26, 160, 109, 0.1)',
                border: '1px solid rgba(26, 160, 109, 0.3)'
              }}
            >
              Simple & Effective Process
            </span>
            <h2 
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                fontWeight: 700,
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #1AA06D 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              How It Works
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              maxWidth: '42rem',
              margin: '0 auto',
              color: '#a8afa7'
            }}>
              Follow these three simple steps to start your sustainable journey and make a real environmental impact
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(5rem)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.7s ease-out',
                transitionDelay: `${idx * 200}ms`
              }}
              onMouseEnter={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div style={{ position: 'relative', height: '100%' }}>
                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '6rem',
                      left: '100%',
                      width: '2rem',
                      height: '2px',
                      background: 'linear-gradient(to right, rgba(26, 160, 109, 0.5), transparent)',
                      zIndex: 0,
                      display: window.innerWidth >= 768 ? 'block' : 'none'
                    }}
                  />
                )}

                {/* Card */}
                <div 
                  style={{
                    position: 'relative',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    border: `1px solid ${activeCard === idx ? 'rgba(26, 160, 109, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                    background: activeCard === idx 
                      ? 'linear-gradient(135deg, rgba(19, 94, 61, 0.3), rgba(11, 50, 33, 0.3))'
                      : 'linear-gradient(135deg, rgba(19, 94, 61, 0.15), rgba(11, 50, 33, 0.15))',
                    boxShadow: activeCard === idx 
                      ? '0 20px 50px rgba(26, 160, 109, 0.2)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.3)',
                    height: '100%',
                    transform: activeCard === idx ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.5s ease'
                  }}
                >
                  {/* Step Number */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-1.5rem',
                      right: '-1.5rem',
                      fontSize: '6rem',
                      fontWeight: 700,
                      color: activeCard === idx ? 'rgba(26, 160, 109, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon Container */}
                  <div 
                    style={{
                      position: 'relative',
                      marginBottom: '1.5rem',
                      width: '5rem',
                      height: '5rem',
                      borderRadius: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #1AA06D, #135E3D)',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                      transform: activeCard === idx ? 'rotate(6deg) scale(1.1)' : 'scale(1)',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    <svg 
                      width="36" 
                      height="36" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#ffffff" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      {idx === 0 && (
                        // Mouse Pointer
                        <>
                          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                          <path d="M13 13l6 6" />
                        </>
                      )}
                      {idx === 1 && (
                        // Trending Up
                        <>
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                          <polyline points="17 6 23 6 23 12" />
                        </>
                      )}
                      {idx === 2 && (
                        // Share
                        <>
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </>
                      )}
                    </svg>
                  </div>

                  {/* Content */}
                  <h3 
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                      color: activeCard === idx ? '#1AA06D' : '#ffffff',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    style={{
                      lineHeight: 1.6,
                      color: activeCard === idx ? '#a8afa7' : 'rgba(168, 175, 167, 0.8)',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {step.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div 
                    style={{
                      marginTop: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 600,
                      color: '#1AA06D',
                      fontSize: '0.875rem',
                      transform: activeCard === idx ? 'translateX(0.5rem)' : 'translateX(0)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span>Explore Step</span>
                    <svg style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Glow Effect */}
                  {activeCard === idx && (
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '1.5rem',
                        background: 'linear-gradient(135deg, #1AA06D, #135E3D)',
                        filter: 'blur(40px)',
                        opacity: 0.3,
                        zIndex: -1
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: '5rem',
          textAlign: 'center',
          transform: isVisible ? 'translateY(0)' : 'translateY(2.5rem)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 1s ease-out',
          transitionDelay: '700ms'
        }}>
          <button 
            style={{
              position: 'relative',
              padding: '1.25rem 2.5rem',
              borderRadius: '9999px',
              fontWeight: 700,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #1AA06D, #135E3D)',
              boxShadow: '0 10px 30px rgba(26, 160, 109, 0.3)',
              border: 'none',
              fontSize: '1.125rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(26, 160, 109, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 160, 109, 0.3)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 10 }}>Start Your Journey</span>
            <svg style={{ width: '1.25rem', height: '1.25rem', position: 'relative', zIndex: 10 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;