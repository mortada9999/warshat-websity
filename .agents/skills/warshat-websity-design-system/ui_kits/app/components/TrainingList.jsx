function TrainingCard({ title, description, image }) {
  return (
    <div
      data-od-id={`training-${title}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 28,
        background: '#fff',
        border: '1px solid var(--clr-olive)',
        padding: 20,
        position: 'relative',
        marginBottom: 36,
      }}
    >
      <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 14,
        }}
      >
        <h3
          style={{
            fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
            color: 'var(--clr-olive)',
            fontFamily: 'var(--font-heading)',
            margin: 0,
          }}
        >
          {title}
        </h3>
        {description ? (
          <p style={{ fontSize: '1rem', color: 'var(--olive-light)', lineHeight: 1.8, maxWidth: 380, margin: 0 }}>
            {description}
          </p>
        ) : null}
        <a
          href="#"
          className="btn btn-primary"
          style={{ borderRadius: 4, marginTop: 8 }}
          data-od-id="book-btn"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}

function TrainingList({ items }) {
  return (
    <section data-od-id="training-section" style={{ background: '#fff', padding: '4rem 1rem', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <h2
          data-od-id="training-heading"
          style={{
            color: 'var(--clr-olive)',
            marginBottom: '2.5rem',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          الورش التدريبية
        </h2>
        {items.map((item) => (
          <TrainingCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { TrainingList, TrainingCard });
