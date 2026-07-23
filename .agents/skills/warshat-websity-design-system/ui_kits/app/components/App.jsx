const WORKSHOPS = [
  {
    id: '1',
    title: 'الرسم على الاكواب الفخارية',
    branch: 'الزيونة',
    category: 'نشاط مفتوح',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    title: 'ورشة الفخار',
    branch: 'اليرموك',
    category: 'ورشة عمل',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    title: 'كورسات الحياكة',
    branch: 'الزيونة',
    category: 'دورة',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400',
  },
];

const SEED_MESSAGES = {
  '1': [
    { role: 'user', author: 'سارة', body: 'هل النشاط مفتوح اليوم بدون حجز؟', time: '10:12' },
    { role: 'staff', author: 'ورشة فن', body: 'نعم — يومياً في الزيونة من 4–8 مساءً. السعر 10,000 د.ع.', time: '10:14' },
  ],
  '2': [
    { role: 'user', author: 'أحمد', body: 'كم عدد المقاعد المتبقية لورشة الفخار؟', time: '11:02' },
    { role: 'staff', author: 'ورشة فن', body: 'يتبقى 4 مقاعد هذا الأسبوع في اليرموك.', time: '11:05' },
  ],
  '3': [
    { role: 'user', author: 'نور', body: 'هل كورس الحياكة مناسب للمبتدئين؟', time: '09:40' },
    { role: 'staff', author: 'ورشة فن', body: 'بالتأكيد — نبدأ من الصفر مع أدوات متوفرة في المرسم.', time: '09:44' },
  ],
};

function App() {
  const { Header, Sidebar, AssistantsList, ChatArea, InputBar, SiteFooter } = window;
  const [selectedId, setSelectedId] = React.useState('1');
  const [nav, setNav] = React.useState('workshops');
  const [messages, setMessages] = React.useState(SEED_MESSAGES);

  const workshop = WORKSHOPS.find((w) => w.id === selectedId);
  const thread = messages[selectedId] || [];

  function handleSend(text) {
    setMessages((prev) => ({
      ...prev,
      [selectedId]: [
        ...(prev[selectedId] || []),
        { role: 'staff', author: 'ورشة فن', body: text, time: 'الآن' },
      ],
    }));
  }

  return (
    <div data-od-id="app-root" style={{ minHeight: '100vh', background: 'var(--clr-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, minHeight: 0, height: 'calc(100vh - 70px)' }}>
        <Sidebar active={nav} onNavigate={setNav} />
        <AssistantsList workshops={WORKSHOPS} selectedId={selectedId} onSelect={setSelectedId} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <ChatArea workshop={workshop} messages={thread} />
          <InputBar onSend={handleSend} />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

Object.assign(window, { App });
