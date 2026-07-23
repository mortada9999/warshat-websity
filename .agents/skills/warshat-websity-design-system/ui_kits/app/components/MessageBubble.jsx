function MessageBubble({ role = 'staff', author, body, time }) {
  const isUser = role === 'user';
  return (
    <div
      data-od-id={`bubble-${role}`}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-start' : 'flex-end',
        marginBottom: 12,
      }}
    >
      <div
        style={{
          maxWidth: '78%',
          background: isUser ? '#fff' : 'var(--clr-olive)',
          color: isUser ? 'var(--clr-text)' : '#F6F0E2',
          border: isUser ? '1px solid var(--clr-border)' : 'none',
          borderRadius: isUser ? '18px 18px 18px 6px' : '18px 18px 6px 18px',
          padding: '0.75rem 1rem',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4, fontWeight: 600 }}>{author}</div>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>{body}</div>
        {time ? (
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6 }}>{time}</div>
        ) : null}
      </div>
    </div>
  );
}

Object.assign(window, { MessageBubble });
