function ActivityCard({ title, price, image }) {
  return (
    <a
      href="#"
      data-od-id={`activity-${title}`}
      style={{
        background: '#fff',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        textDecoration: 'none',
        borderRadius: 12,
        transition: 'transform 0.25s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ width: 130, height: 130, borderRadius: '50%', overflow: 'hidden' }}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <h3
        style={{
          fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
          fontWeight: 700,
          color: 'var(--olive-light)',
          textAlign: 'center',
          margin: 0,
          lineHeight: 1.4,
          fontFamily: 'var(--font-body)',
        }}
      >
        {title}
      </h3>
      <span
        style={{
          background: 'var(--clr-coral)',
          color: '#fff',
          padding: '4px 20px',
          fontWeight: 700,
          borderRadius: '8px 30px 10px 40px',
          transform: 'rotate(-2deg)',
          fontSize: '1.05rem',
        }}
      >
        {price.toLocaleString()}
      </span>
    </a>
  );
}

function ActivityGrid({ items }) {
  return (
    <section
      id="activities"
      data-od-id="activity-section"
      style={{ background: 'var(--olive-light)', padding: '4rem 1rem', textAlign: 'center' }}
    >
      <div className="container">
        <h2
          className="section-title"
          style={{ color: 'var(--clr-olive)', fontSize: '2rem', marginBottom: 8 }}
          data-od-id="activity-heading"
        >
          النشاطات الترفيهية المفتوحة
        </h2>
        <p style={{ color: 'var(--clr-olive)', marginBottom: '2.5rem', fontSize: '1.15rem' }}>
          يومياً و بدون حجز!
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1.75rem',
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {items.map((item) => (
            <ActivityCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ActivityGrid, ActivityCard });
