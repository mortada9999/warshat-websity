function Hero() {
  return (
    <section
      data-od-id="app-hero"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        minHeight: '70vh',
      }}
    >
      <div
        style={{
          background: 'var(--bg-pink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '12%',
            right: '12%',
            width: 48,
            height: 48,
            background: '#ABC175',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '18%',
            left: -30,
            width: 120,
            height: 120,
            background: '#FFD600',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            opacity: 0.9,
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 400 }}>
          <img
            src="../../assets/logo.png"
            alt="ورشة فن"
            style={{ height: 72, margin: '0 auto 1.25rem', filter: 'brightness(0) invert(1)', display: 'block' }}
          />
          <h1
            data-od-id="hero-title"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              color: 'var(--clr-olive)',
              lineHeight: 1.25,
              marginBottom: 12,
            }}
          >
            المكان المثالي للترفيه عن طريق الفن
          </h1>
          <p style={{ color: 'var(--clr-olive)', fontSize: '1.1rem', marginBottom: 28 }}>
            و لتعلم مختلف الفنون بأحترافية!
          </p>
          <a className="btn btn-primary" href="#activities" data-od-id="hero-cta">
            our menu
          </a>
        </div>
      </div>
      <div style={{ minHeight: 320, position: 'relative' }}>
        <img
          src="https://images.unsplash.com/photo-1560421711-8f5eb53d2657?auto=format&fit=crop&q=80&w=1000"
          alt="مرسم"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
