// ============================================
// auth.js — Đăng nhập / Đăng ký (ÉP BUỘC ĐĂNG NHẬP TRƯỚC KHI VÀO INDEX)
// ============================================

// Bật chế độ Demo động (Không cần server nhưng vẫn chạy theo dữ liệu người dùng nhập)
const DEMO_MODE = true; 

// Tài khoản mặc định ban đầu điền sẵn ở trang Đăng nhập để bạn test
const DEFAULT_DEMO_USER = {
  name: "Nguyễn Văn A",
  email: "demo@spotify.com",
  avatar: "https://i.pravatar.cc/150?img=33"
};
const DEMO_TOKEN = "fake-jwt-token-for-demo-purposes";

/**
 * Kiểm tra người dùng đã đăng nhập chưa. Nếu chưa -> Đá văng về trang Login ngay lập tức!
 */
function requireAuth() {
  const token = localStorage.getItem('sp_token');
  
  // Nếu chưa có token trong máy (chưa đăng nhập)
  if (!token) {
    // Nếu không nằm ở trang login hoặc register thì bắt buộc chuyển hướng về login.html
    if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
      window.location.href = 'login.html'; 
      return false;
    }
    return false;
  }
  return true;
}

/**
 * Nếu đã đăng nhập thành công rồi mà cố tình quay lại login/register → đẩy thẳng về index
 */
function redirectIfLoggedIn() {
  const token = localStorage.getItem('sp_token');
  if (token) {
    window.location.href = 'index.html';
  }
}

/**
 * Lưu thông tin đăng nhập vào localStorage
 */
function saveSession(token, user) {
  localStorage.setItem('sp_token', token);
  localStorage.setItem('sp_user', JSON.stringify(user));
}

/**
 * Lấy thông tin người dùng đang đăng nhập
 */
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('sp_user'));
  } catch {
    return null;
  }
}

/**
 * Đăng xuất - Xóa sạch tài khoản để quay lại từ đầu
 */
async function logout() {
  try {
    if (!DEMO_MODE) {
      await window.API?.auth.logout();
    }
  } finally {
    localStorage.removeItem('sp_token');
    localStorage.removeItem('sp_user');
    window.location.href = 'login.html';
  }
}

// ============================================
// XỬ LÝ TRANG ĐĂNG NHẬP (TỰ ĐIỀN TÀI KHOẢN CÓ SẴN)
// ============================================
function initLoginPage() {
  redirectIfLoggedIn();

  const form      = document.getElementById('login-form');
  const emailEl   = document.getElementById('login-email');
  const passEl    = document.getElementById('login-password');
  const submitBtn = document.getElementById('login-submit');
  const togglePw  = document.getElementById('toggle-password');

  if (!form) return;

  // ĐÃ CÀI ĐẶT: Tự động điền tài khoản có sẵn hiển thị chữ trắng tinh, không bị lỗi đỏ
  if (DEMO_MODE) {
    if (emailEl) emailEl.value = DEFAULT_DEMO_USER.email;
    if (passEl) passEl.value = "123456"; 
  }

  togglePw?.addEventListener('click', () => {
    const isText = passEl.type === 'text';
    passEl.type  = isText ? 'password' : 'text';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const email    = emailEl.value.trim();
    const password = passEl.value;

    let valid = true;
    if (!isValidEmail(email)) { showFieldError('email-error', 'Email không hợp lệ'); setFieldError(emailEl); valid = false; }
    if (password.length < 6) { showFieldError('password-error', 'Mật khẩu phải ít nhất 6 ký tự'); setFieldError(passEl); valid = false; }
    if (!valid) return;

    setLoading(submitBtn, true);
    try {
      if (DEMO_MODE) {
        // Nếu dùng đúng email mặc định thì lấy tên mặc định, nếu nhập email khác thì tự chế tên theo email
        const isDefault = email === DEFAULT_DEMO_USER.email;
        const mockName = isDefault ? DEFAULT_DEMO_USER.name : email.split('@')[0];
        
        saveSession(DEMO_TOKEN, {
          name: isDefault ? mockName : mockName.charAt(0).toUpperCase() + mockName.slice(1),
          email: email,
          avatar: DEFAULT_DEMO_USER.avatar
        });
      } else {
        const data = await window.API.auth.login(email, password);
        saveSession(data.token, data.user);
      }
      
      showToast('Đăng nhập thành công!', 'success');
      setTimeout(() => { window.location.href = 'index.html'; }, 800);
    } catch (err) {
      showToast('Lỗi đăng nhập', 'error');
    } finally {
      setLoading(submitBtn, false);
    }
  });
}

// ============================================
// XỬ LÝ TRANG ĐĂNG KÝ
// ============================================
function initRegisterPage() {
  redirectIfLoggedIn();

  const form        = document.getElementById('register-form');
  const nameEl      = document.getElementById('register-name');
  const emailEl     = document.getElementById('register-email');
  const passEl      = document.getElementById('register-password');
  const confirmEl   = document.getElementById('register-confirm');
  const submitBtn   = document.getElementById('register-submit');
  const togglePw    = document.getElementById('toggle-password');
  const toggleConf  = document.getElementById('toggle-confirm');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name     = nameEl?.value.trim();
    const email    = emailEl.value.trim();
    const password = passEl.value;
    const confirm  = confirmEl?.value;

    let valid = true;
    if (!name || name.length < 2) { showFieldError('name-error', 'Tên phải ít nhất 2 ký tự'); setFieldError(nameEl); valid = false; }
    if (!isValidEmail(email)) { showFieldError('email-error', 'Email không hợp lệ'); setFieldError(emailEl); valid = false; }
    if (password.length < 6) { showFieldError('password-error', 'Mật khẩu phải ít nhất 6 ký tự'); setFieldError(passEl); valid = false; }
    if (confirm !== password) { showFieldError('confirm-error', 'Mật khẩu xác nhận không khớp'); setFieldError(confirmEl); valid = false; }
    if (!valid) return;

    setLoading(submitBtn, true);
    try {
      if (DEMO_MODE) {
        saveSession(DEMO_TOKEN, {
          name: name,
          email: email,
          avatar: "https://i.pravatar.cc/150?img=59" 
        });
      } else {
        const data = await window.API.auth.register(name, email, password);
        saveSession(data.token, data.user);
      }
      
      showToast('Tạo tài khoản thành công! Chào mừng bạn 🎉', 'success');
      setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    } catch (err) {
      showToast('Email đã được sử dụng', 'error');
    } finally {
      setLoading(submitBtn, false);
    }
  });
}

// ============================================
// HELPER FUNCTIONS (Giữ nguyên các hàm bổ trợ)
// ============================================
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
// Sửa lại hàm hiển thị lỗi để ẩn bớt lỗi nhầm khi form vừa tải
function showFieldError(elementId, message) { const el = document.getElementById(elementId); if (el) { el.textContent = message; el.style.display = 'block'; } }
function setFieldError(inputEl) { inputEl?.closest('.form-group')?.classList.add('has-error'); }
function clearErrors() { document.querySelectorAll('.form-error').forEach(el => { el.style.display = 'none'; }); document.querySelectorAll('.form-group.has-error').forEach(el => { removeFieldError(el); }); }
function removeFieldError(el) { el.classList.remove('has-error'); }
function setLoading(btn, isLoading) { if (!btn) return; btn.disabled = isLoading; btn.classList.toggle('loading', isLoading); }
function showToast(message, type = 'success') { let toast = document.querySelector('.auth-toast'); if (!toast) { toast = document.createElement('div'); toast.className = 'auth-toast'; document.body.appendChild(toast); } toast.textContent = message; toast.className = `auth-toast ${type} show`; setTimeout(() => { toast.classList.remove('show'); }, 3500); }

// CHẠY KIỂM TRA ĐĂNG NHẬP NGAY LÚC TẢI FILE (CHẶN ĐỨNG TRANG CHỦ)
const currentPage = document.body.dataset.page;
if (currentPage !== 'login' && currentPage !== 'register') {
  requireAuth();
}

// AUTO-INIT KHI GIAO DIỆN SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'login')    initLoginPage();
  if (page === 'register') initRegisterPage();
});

window.Auth = { requireAuth, getCurrentUser, logout, showToast };