function InputBar({ onSend }) {
  const [value, setValue] = React.useState('');
  function submit(e) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    if (onSend) onSend(v);
    setValue('');
  }
  return (
    <form
      data-od-id="input-bar"
      onSubmit={submit}
      style={{
        display: 'flex',
        gap: 10,
        padding: '0.9rem 1.25rem',
        borderTop: '1px solid var(--clr-border)',
        background: 'var(--clr-surface)',
        alignItems: 'center',
      }}
    >
      <input
        className="form-input"
        data-od-id="composer-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="اكتب ردّاً للعميل حول الموعد أو الفرع…"
        style={{ flex: 1 }}
      />
      <button type="submit" className="btn btn-primary" data-od-id="composer-send">
        إرسال
      </button>
    </form>
  );
}

Object.assign(window, { InputBar });
