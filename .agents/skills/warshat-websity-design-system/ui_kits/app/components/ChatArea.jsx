function ChatArea({ workshop, messages = [] }) {
  const { MessageBubble } = window;
  return (
    <section
      data-od-id="chat-area"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        background: 'var(--clr-bg)',
      }}
    >
      <header
        style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--clr-border)',
          background: 'var(--clr-surface)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {workshop ? (
          <>
            <img
              src={workshop.image}
              alt=""
              style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-heading)', fontSize: '1.2rem' }}>
                {workshop.title}
              </div>
              <div style={{ fontSize: 13, color: 'var(--clr-text-dim)' }}>
                {workshop.branch} · تنسيق الحجز
              </div>
            </div>
            <span className="badge badge-orange" style={{ marginRight: 'auto' }}>
              {workshop.category}
            </span>
          </>
        ) : (
          <div style={{ color: 'var(--clr-text-muted)' }}>اختر ورشة من القائمة</div>
        )}
      </header>
      <div style={{ flex: 1, overflow: 'auto', padding: '1.25rem' }} data-od-id="message-thread">
        {messages.map((m, i) => (
          <MessageBubble key={i} {...m} />
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { ChatArea });
