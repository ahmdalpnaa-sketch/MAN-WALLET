import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // حماية الصفحة: إذا لم يكن هناك مستخدم مسجل، يتم توجيهه لتسجيل الدخول
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push('/'); // العودة لصفحة تسجيل الدخول
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return <p style={{ textAlign: 'center', marginTop: '50px' }}>جاري التحميل...</p>;

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      
      {/* الشريط العلوي */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '15px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1877F2', margin: 0 }}>MAN محفظة</h2>
        <div>
          <span style={{ marginRight: '15px', color: '#555' }}>{user.email}</span>
          <button onClick={() => { auth.signOut(); router.push('/'); }} style={{ padding: '8px 15px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            تسجيل خروج
          </button>
        </div>
      </div>

      {/* بطاقة الرصيد */}
      <div style={{ backgroundColor: '#1877F2', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
        <h3 style={{ margin: 0, marginBottom: '10px' }}>رصيدك الحالي</h3>
        <h1 style={{ fontSize: '40px', margin: 0 }}>0.00 <span style={{ fontSize: '20px' }}>A1</span></h1>
      </div>

      {/* الأزرار */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <button style={buttonStyle}>إرسال أموال</button>
        <button style={buttonStyle}>استلام أموال</button>
        <button style={buttonStyle}>توليد قسيمة</button>
        <button style={buttonStyle}>استلام قسيمة</button>
        <button style={buttonStyle}>سجل العمليات</button>
        <button style={buttonStyle}>تعديل الملف الشخصي</button>
      </div>
      
      {/* معلومات سفلية (بناءً على ملف MAN) */}
      <div style={{ marginTop: '30px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
        <p>خدمة العملاء: man44228866@gmail.com</p>
        <p>نسبة التحويل: 1% (0.5% من المرسل و 0.5% من المستلم)</p>
      </div>
    </div>
  );
}

// تنسيق الأزرار
const buttonStyle = {
  padding: '15px',
  fontSize: '18px',
  backgroundColor: 'white',
  color: '#1877F2',
  border: '2px solid #1877F2',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};
