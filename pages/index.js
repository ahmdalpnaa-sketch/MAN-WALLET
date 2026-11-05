import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router'; // استدعاء الراوتر للتوجيه

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // تعريف الراوتر

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // مسح أي خطأ سابق
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // التوجيه إلى لوحة التحكم مباشرة بعد نجاح الدخول
      router.push('/dashboard'); 
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Arial' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '350px', textAlign: 'center' }}>
        <h1 style={{ color: '#1877F2', marginBottom: '20px' }}>MAN محفظة</h1>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="ادخل البريد الإلكتروني" 
            value={email} onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '12px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <input 
            type="password" 
            placeholder="ادخل كلمة المرور" 
            value={password} onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '12px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          
          <button type="submit" style={{ padding: '12px', backgroundColor: '#1877F2', color: 'white', fontSize: '18px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            دخول
          </button>
        </form>
        
        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          <a href="#" style={{ color: '#1877F2', display: 'block', marginBottom: '10px' }}>نسيت كلمة المرور</a>
          <a href="#" style={{ color: '#1877F2' }}>انشاء حساب جديد</a>
        </div>
      </div>
    </div>
  );
}
