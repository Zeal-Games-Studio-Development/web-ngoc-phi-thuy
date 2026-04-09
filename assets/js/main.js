// ============================================================
// NGỌC PHỈ THÚY - Shared JS Utilities
// ============================================================

// ─── Custom Cursor Removed ───────────────────────────────────────────

// ─── Navbar Scroll ───────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobile.classList.toggle('open');
      document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
    });
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open'); mobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === '../index.html') || href === './' + path) {
      a.classList.add('active');
    }
  });
}

// ─── Scroll Reveal ───────────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── 3D Tilt on Cards ────────────────────────────────────────
function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 18;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -18;
      card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ─── Counter Animation ────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const decimals = (el.dataset.count.split('.')[1] || '').length;
      const suffix = el.dataset.suffix || '';
      let start = 0; const dur = 1800; const startTime = performance.now();
      const tick = (now) => {
        const t = Math.min((now - startTime) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const val = (start + (target - start) * ease).toFixed(decimals);
        el.textContent = val + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ─── Tabs ─────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const parent = tabGroup.closest('[data-tab-group]') || document;
        parent.querySelectorAll('.tab-content').forEach(c => {
          c.classList.toggle('active', c.dataset.tab === target);
        });
      });
    });
  });
}

// ─── Toast ────────────────────────────────────────────────────
function showToast(icon, msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon"></span><span class="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('.toast-icon').textContent = icon;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─── Navbar HTML ────────────────────────────────────────────
function renderNavbar() {
  const base = document.documentElement.dataset.base || './';
  const html = `
    <nav id="navbar">
      <div class="container">
        <div class="nav-inner">
          <a href="${base}index.html" class="nav-logo">
            <div class="nav-logo-icon">💎</div>
            <div>
              <span class="nav-logo-text">Ngọc Phỉ Thúy</span>
              <span class="nav-logo-sub">Jadeite Fine Jewelry</span>
            </div>
          </a>
          <div class="nav-links">
            <a href="${base}index.html">Trang Chủ</a>
            <a href="${base}pages/products.html">Sản Phẩm</a>
            <a href="${base}pages/collections.html">Bộ Sưu Tập</a>
            <a href="${base}pages/story.html">Câu Chuyện</a>
            <a href="${base}pages/blog.html">Blog</a>
            <a href="${base}pages/contact.html">Liên Hệ</a>
          </div>
          <div class="nav-actions">
            <a href="${base}pages/contact.html" class="btn btn-gold btn-sm">📞 Tư Vấn</a>
            <button class="nav-hamburguer" id="navToggle" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="nav-mobile" id="navMobile">
      <a href="${base}index.html">🏠 Trang Chủ</a>
      <a href="${base}pages/products.html">💎 Sản Phẩm</a>
      <a href="${base}pages/collections.html">✨ Bộ Sưu Tập</a>
      <a href="${base}pages/story.html">📖 Câu Chuyện</a>
      <a href="${base}pages/blog.html">📝 Blog</a>
      <a href="${base}pages/contact.html">📞 Liên Hệ</a>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', html);
}

// ─── Footer HTML ─────────────────────────────────────────────
function renderFooter() {
  const base = document.documentElement.dataset.base || './';
  const html = `
    <footer id="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="${base}index.html" class="nav-logo">
              <div class="nav-logo-icon">💎</div>
              <div>
                <span class="nav-logo-text">Ngọc Phỉ Thúy</span>
                <span class="nav-logo-sub">Jadeite Fine Jewelry</span>
              </div>
            </a>
            <p>Chuyên cung cấp Ngọc Phỉ Thúy Jadeite tự nhiên 100% — Nhập khẩu trực tiếp từ Myanmar & Vân Nam (Trung Quốc). Cam kết kiểm định và hoàn trả nếu không đúng chất lượng.</p>
            <div class="footer-socials">
              <a href="#" class="social-btn" aria-label="Facebook">📘</a>
              <a href="#" class="social-btn" aria-label="Zalo">💬</a>
              <a href="#" class="social-btn" aria-label="Instagram">📷</a>
              <a href="#" class="social-btn" aria-label="YouTube">▶️</a>
            </div>
          </div>
          <div class="footer-col">
            <h5>Sản Phẩm</h5>
            <a href="${base}pages/products.html?cat=vong-tay">Vòng Tay Ngọc</a>
            <a href="${base}pages/products.html?cat=mat-day">Mặt Dây Chuyền</a>
            <a href="${base}pages/products.html?cat=nhan">Nhẫn Ngọc</a>
            <a href="${base}pages/products.html?cat=bong-tai">Bông Tai Ngọc</a>
            <a href="${base}pages/products.html?cat=lac-tay">Lắc Tay</a>
            <a href="${base}pages/collections.html">Bộ Sưu Tập</a>
          </div>
          <div class="footer-col">
            <h5>Thông Tin</h5>
            <a href="${base}pages/story.html">Câu Chuyện Của Chúng Tôi</a>
            <a href="${base}pages/blog.html">Blog Kiến Thức</a>
            <a href="${base}pages/blog.html?tag=phong-thuy">Phong Thủy</a>
            <a href="${base}pages/blog.html?tag=phan-biet">Phân Biệt Thật Giả</a>
            <a href="${base}pages/blog.html?tag=gia">Định Giá Ngọc</a>
          </div>
          <div class="footer-col">
            <h5>Hỗ Trợ</h5>
            <a href="${base}pages/contact.html">Liên Hệ Tư Vấn</a>
            <a href="#">Chính Sách Đổi Trả</a>
            <a href="#">Cam Kết Kiểm Định</a>
            <a href="#">Hướng Dẫn Chọn Ngọc</a>
            <a href="#">Câu Hỏi Thường Gặp</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2024 Ngọc Phỉ Thúy Jadeite. Tất cả quyền được bảo lưu.</span>
          <span>💎 Thiên nhiên tạo ra — Nghệ nhân chế tác — Chúng tôi bảo đảm</span>
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

// ─── Product Data ─────────────────────────────────────────────
const PRODUCTS = [
  // --- Vòng Tay ---
  { id: 1, name: 'Vòng Băng Chủng Hoàng Gia', cat: 'vong-tay', catLabel: 'Vòng Tay', badges: ['loai-a', 'hot'], price: 85000000, img: '../assets/images/prod_vong_xanh.png', desc: 'Vòng băng chủng loại A, màu lục đế đậm, nước ngọc thượng thừa. Xuất xứ Myanmar.', color: 'Lục Đế', loai: 'Loại A', size: '54mm' },
  { id: 2, name: 'Vòng Tử La Lan Thiên Phước', cat: 'vong-tay', catLabel: 'Vòng Tay', badges: ['loai-a', 'moi'], price: 62000000, img: '../assets/images/prod_vong_tim.png', desc: 'Vòng tử la lan (lavender jade) tím hoa cà, mịn mượt, hiếm gặp, loại A Myanmar.', color: 'Tím Lavender', loai: 'Loại A', size: '56mm' },
  { id: 3, name: 'Vòng Bản Hẹ Lục Dương', cat: 'vong-tay', catLabel: 'Vòng Tay', badges: ['moi'], price: 28000000, img: '../assets/images/prod_vong_xanh.png', desc: 'Vòng bản hẹ màu lục dương bán trong, vân tự nhiên, phù hợp cổ tay thanh thoát.', color: 'Lục Dương', loai: 'Loại A-B', size: '55mm' },
  { id: 4, name: 'Vòng Bạch Ngọc Tuyết Sơn', cat: 'vong-tay', catLabel: 'Vòng Tay', badges: [], price: 19000000, img: '../assets/images/prod_vong_xanh.png', desc: 'Vòng ngọc trắng băng tinh khiết, tượng trưng cho sự thuần khiết và may mắn.', color: 'Trắng Băng', loai: 'Loại A', size: '52mm' },
  { id: 5, name: 'Vòng Hạt Tròn Song Hỷ', cat: 'vong-tay', catLabel: 'Vòng Tay', badges: ['moi'], price: 15500000, img: '../assets/images/prod_lac_tay.png', desc: 'Vòng hạt tròn phỉ thúy đều màu, kết hợp hạt vàng 18K, sang trọng tinh tế.', color: 'Lục Nhạt & Trắng', loai: 'Loại A', size: 'Đàn hồi' },
  { id: 6, name: 'Vòng Điêu Khắc Thanh Long', cat: 'vong-tay', catLabel: 'Vòng Tay', badges: ['hot'], price: 45000000, img: '../assets/images/prod_vong_xanh.png', desc: 'Vòng ngọc khắc họa rồng thanh long uốn lượn, tay nghề điêu luyện, phong thủy vượng khí.', color: 'Lục Đế', loai: 'Loại A', size: '54mm' },

  // --- Mặt Dây Chuyền ---
  { id: 7, name: 'Mặt Quan Âm Phúc Thọ', cat: 'mat-day', catLabel: 'Mặt Dây Chuyền', badges: ['loai-a', 'hot'], price: 0, img: '../assets/images/prod_mat_day.png', desc: 'Mặt dây chuyền điêu khắc tượng Quan Âm Bồ Tát, ngọc lục đế loại A, bản thủ công.', color: 'Lục Đế', loai: 'Loại A', mat: 'Quan Âm' },
  { id: 8, name: 'Mặt Phật Di Lặc Hoan Hỷ', cat: 'mat-day', catLabel: 'Mặt Dây Chuyền', badges: ['loai-a'], price: 0, img: '../assets/images/prod_mat_day.png', desc: 'Phật Di Lặc cười tươi tạc nguyên ngọc phỉ thúy xanh lam, đem lại may mắn và hạnh phúc.', color: 'Lục Lam', loai: 'Loại A', mat: 'Di Lặc' },
  { id: 9, name: 'Mặt Như Ý Phú Quý', cat: 'mat-day', catLabel: 'Mặt Dây Chuyền', badges: [], price: 0, img: '../assets/images/prod_mat_day.png', desc: 'Hình dây như ý tượng trưng vạn sự như ý, ngọc tím lavender thanh thoát.', color: 'Tím Lavender', loai: 'Loại A', mat: 'Như Ý' },
  { id: 10, name: 'Mặt Tỳ Hưu Chiêu Tài', cat: 'mat-day', catLabel: 'Mặt Dây Chuyền', badges: ['loai-a','moi'], price: 0, img: '../assets/images/prod_mat_day.png', desc: 'Tỳ hưu linh vật phong thủy chiêu tài nạp bảo, điêu khắc 3D chi tiết trên ngọc xanh đậm.', color: 'Lục Đậm', loai: 'Loại A', mat: 'Tỳ Hưu' },
  { id: 11, name: 'Mặt Rồng Vân Nam Cổ Phong', cat: 'mat-day', catLabel: 'Mặt Dây Chuyền', badges: ['hot'], price: 0, img: '../assets/images/prod_mat_day.png', desc: 'Rồng điêu khắc cổ phong phong cách Vân Nam, ngọc xanh đen huyền bí.', color: 'Lục Đen', loai: 'Loại A', mat: 'Rồng' },
  { id: 12, name: 'Mặt Thuyền Vàng Phát Tài', cat: 'mat-day', catLabel: 'Mặt Dây Chuyền', badges: [], price: 0, img: '../assets/images/prod_mat_day.png', desc: 'Thuyền vàng phong thủy thuận buồm xuôi gió, sự nghiệp hanh thông.', color: 'Lục Nhạt', loai: 'Loại A-B', mat: 'Thuyền Vàng' },

  // --- Nhẫn ---
  { id: 13, name: 'Nhẫn Phỉ Thúy Hoàng Kim 18K', cat: 'nhan', catLabel: 'Nhẫn', badges: ['loai-a', 'hot'], price: 35000000, img: '../assets/images/prod_nhan.png', desc: 'Nhẫn ngọc xanh đậm oval cut, khung vàng 18K sang trọng. Chứng nhận kiểm định kèm theo.', color: 'Lục Đế', loai: 'Loại A', size: 'Có thể chỉnh' },
  { id: 14, name: 'Nhẫn Hoa Ngọc Lavender', cat: 'nhan', catLabel: 'Nhẫn', badges: ['moi'], price: 22000000, img: '../assets/images/prod_nhan.png', desc: 'Nhẫn thiết kế hoa mai với đá ngọc tím lavender, viền kim cương nhỏ trang trí thanh lịch.', color: 'Tím Lavender', loai: 'Loại A', size: 'Có thể chỉnh' },
  { id: 15, name: 'Nhẫn Trắng Băng Bạch Liên', cat: 'nhan', catLabel: 'Nhẫn', badges: [], price: 18000000, img: '../assets/images/prod_nhan.png', desc: 'Ngọc trắng thuần khiết như tuyết, thiết kế tối giản sang trọng, hợp mệnh Kim và Thủy.', color: 'Trắng Băng', loai: 'Loại A', size: 'Có thể chỉnh' },
  { id: 16, name: 'Nhẫn Đôi Uyên Ương Phỉ Thúy', cat: 'nhan', catLabel: 'Nhẫn', badges: ['moi', 'hot'], price: 55000000, img: '../assets/images/prod_nhan.png', desc: 'Cặp nhẫn đôi từ cùng một viên ngọc tự nhiên, biểu tượng tình yêu bền vững.', color: 'Lục & Tím', loai: 'Loại A', size: 'Cặp đôi' },

  // --- Bông Tai ---
  { id: 17, name: 'Bông Tai Lệ Ngọc Hoàng Kim', cat: 'bong-tai', catLabel: 'Bông Tai', badges: ['loai-a'], price: 28000000, img: '../assets/images/prod_bong_tai.png', desc: 'Bông tai hình lệ (water-drop) ngọc xanh đậm, khung vàng 18K, dài 35mm, cuốn hút.', color: 'Lục Đế', loai: 'Loại A', size: '35mm' },
  { id: 18, name: 'Bông Tai Tròn Thiên Thanh', cat: 'bong-tai', catLabel: 'Bông Tai', badges: ['moi'], price: 15000000, img: '../assets/images/prod_bong_tai.png', desc: 'Bông tai tròn nhỏ màu thiên thanh, phù hợp mặc hàng ngày lẫn dự tiệc sang trọng.', color: 'Lục Nhạt', loai: 'Loại A-B', size: '12mm' },
  { id: 19, name: 'Bông Tai Hoa Mẫu Đơn', cat: 'bong-tai', catLabel: 'Bông Tai', badges: [], price: 19500000, img: '../assets/images/prod_bong_tai.png', desc: 'Bông tai điêu khắc hoa mẫu đơn tinh xảo, ngọc tím lavender, ý nghĩa phú quý viên mãn.', color: 'Tím Lavender', loai: 'Loại A', size: '22mm' },
  { id: 20, name: 'Bông Tai Đế Bạch Ngọc Phúc', cat: 'bong-tai', catLabel: 'Bông Tai', badges: ['hot'], price: 12000000, img: '../assets/images/prod_bong_tai.png', desc: 'Bông tai ngọc trắng viền bạc tinh khiết, thanh thoát nhẹ nhàng, hợp nhiều phong cách.', color: 'Trắng Băng', loai: 'Loại A', size: '18mm' },

  // --- Lắc Tay ---
  { id: 21, name: 'Lắc Tay Hạt Phỉ Thúy Xanh', cat: 'lac-tay', catLabel: 'Lắc Tay', badges: ['loai-a'], price: 24000000, img: '../assets/images/prod_lac_tay.png', desc: 'Lắc hạt phỉ thúy xanh đậm đều màu, 12 hạt tròn đường kính 10mm. May mắn và bình an.', color: 'Lục Đế', loai: 'Loại A', size: '19cm' },
  { id: 22, name: 'Lắc Tay Hạt Mix Tím Trắng', cat: 'lac-tay', catLabel: 'Lắc Tay', badges: ['moi'], price: 18000000, img: '../assets/images/prod_lac_tay.png', desc: 'Lắc tay phối hạt tím lavender và trắng băng xen kẽ, điểm bạch kim, tinh tế và hiếm có.', color: 'Tím & Trắng', loai: 'Loại A', size: '18cm' },
  { id: 23, name: 'Lắc Vàng Khảm Ngọc Phỉ Thúy', cat: 'lac-tay', catLabel: 'Lắc Tay', badges: ['loai-a', 'hot'], price: 0, img: '../assets/images/prod_lac_tay.png', desc: 'Lắc vàng 18K khảm 5 viên ngọc xanh đậm, thiết kế hoàng gia, sang trọng tuyệt đỉnh.', color: 'Lục Đế & Vàng', loai: 'Loại A', size: '18cm' },
  { id: 24, name: 'Lắc Tay Hoa Văn Rồng Phụng', cat: 'lac-tay', catLabel: 'Lắc Tay', badges: [], price: 9800000, img: '../assets/images/prod_lac_tay.png', desc: 'Lắc phỉ thúy khắc hoa văn rồng phụng ý nghĩa phong thủy cao cấp.', color: 'Lục Nhạt', loai: 'Loại A-B', size: '19cm' },

  // --- Thêm Mới: Vòng Tay ---
  { id: 25, name: 'Vòng Bản Vuông Khói Lam', cat: 'vong-tay', catLabel: 'Vòng Tay', badges: ['moi'], price: 0, img: '../assets/images/prod_vong_xanh.png', desc: 'Vòng tay bản vuông (bình an trạc) chạm khắc vân khói độc đáo, mang vẻ đẹp ma mị và cuốn hút.', color: 'Lục Lam', loai: 'Loại A-B', size: '53mm' },
  { id: 26, name: 'Vòng Băng Chủng Mùa Xuân', cat: 'vong-tay', catLabel: 'Vòng Tay', badges: ['loai-a', 'hot'], price: 0, img: '../assets/images/prod_vong_moi.png', desc: 'Vòng ngọc pha ba màu: xanh dương, trắng băng, và điểm tím nhẹ (Spring Color). Tuyệt phẩm thiên nhiên.', color: 'Tím Lavender', loai: 'Loại A', size: '55mm' },

  // --- Thêm Mới: Mặt Dây Chuyền ---
  { id: 27, name: 'Mặt Hồ Ly Khuyển Thạch', cat: 'mat-day', catLabel: 'Mặt Dây Chuyền', badges: ['hot'], price: 0, img: '../assets/images/prod_mat_day.png', desc: 'Hồ ly 9 đuôi điêu khắc sắc nét từ ngọc tím đậm, chiêu tình duyên và mang lại may mắn trong giao tiếp.', color: 'Tím Lavender', loai: 'Loại A', mat: 'Hồ Ly' },
  { id: 28, name: 'Mặt Đồng Điếu Bình An', cat: 'mat-day', catLabel: 'Mặt Dây Chuyền', badges: [], price: 0, img: '../assets/images/prod_mat_day.png', desc: 'Thiết kế hình đồng xu tròn trịa, tượng trưng cho sự bình an không vướng bận, ngọc trắng tinh khiết.', color: 'Trắng Băng', loai: 'Loại A', mat: 'Đồng Điếu' },
  { id: 29, name: 'Mặt Long Phụng Trình Tường', cat: 'mat-day', catLabel: 'Mặt Dây Chuyền', badges: ['loai-a'], price: 0, img: '../assets/images/prod_mat_day.png', desc: 'Sự kết hợp hoàn mỹ giữa Rồng và Phượng, khắc trên ngọc xanh lục bảo cao cấp, gia đạo viên mãn.', color: 'Lục Đế', loai: 'Loại A', mat: 'Long Phụng' },

  // --- Thêm Mới: Nhẫn ---
  { id: 30, name: 'Nhẫn Nam Phong Cách Cổ Cung', cat: 'nhan', catLabel: 'Nhẫn', badges: ['loai-a', 'hot'], price: 0, img: '../assets/images/prod_nhan_moi.png', desc: 'Bản nhẫn vuông nam tính, ngọc lục đậm phối với vàng 18k hoa văn cổ điển nhà Thanh.', color: 'Lục Đậm', loai: 'Loại A', size: '20mm' },
  { id: 31, name: 'Nhẫn Nữ Hoa Mai Điểm Vàng', cat: 'nhan', catLabel: 'Nhẫn', badges: ['moi'], price: 0, img: '../assets/images/prod_nhan.png', desc: 'Nhẫn hoa mai 5 cánh mang ý nghĩa ngũ phúc lâm môn, điêu khắc từ ngọc trắng băng viền vàng.', color: 'Trắng Băng', loai: 'Loại A', size: 'Có thể chỉnh' },
  { id: 32, name: 'Nhẫn Kim Tiền Chiêu Tài', cat: 'nhan', catLabel: 'Nhẫn', badges: [], price: 0, img: '../assets/images/prod_nhan.png', desc: 'Nhẫn ngọc bản tròn chạm khắc chuỗi đồng tiền vòng quanh, ý nghĩa tiền tài liên miên.', color: 'Lục Nhạt', loai: 'Loại A-B', size: '16mm' },

  // --- Thêm Mới: Bông Tai ---
  { id: 33, name: 'Bông Tai Giọt Sương Băng', cat: 'bong-tai', catLabel: 'Bông Tai', badges: ['loai-a'], price: 0, img: '../assets/images/prod_bong_tai_moi.png', desc: 'Thiết kế dáng tua rua rũ xuống, đính những viên ngọc trắng băng nhỏ xinh như giọt sương buổi sáng.', color: 'Trắng Băng', loai: 'Loại A', size: 'Dài 45mm' },
  { id: 34, name: 'Bông Tai Mộc Lan Lục Bạch', cat: 'bong-tai', catLabel: 'Bông Tai', badges: ['moi'], price: 0, img: '../assets/images/prod_bong_tai.png', desc: 'Họa tiết hoa mộc lan thanh khiết từ ngọc phỉ thúy trắng phối nhụy xanh lục. Tôn vinh vẻ đẹp Á Đông.', color: 'Lục Nhạt & Trắng', loai: 'Loại A', size: '20mm' },

  // --- Thêm Mới: Lắc Tay ---
  { id: 35, name: 'Lắc Tay Trúc Xanh', cat: 'lac-tay', catLabel: 'Lắc Tay', badges: ['loai-a', 'hot'], price: 0, img: '../assets/images/prod_lac_tay_moi.png', desc: 'Lắc tay bao gồm các đốt ngọc được điêu khắc thành hình thân trúc, thể hiện khí tiết thanh tao quân tử.', color: 'Lục Đế', loai: 'Loại A', size: '18cm' },
  { id: 36, name: 'Lắc Hạt Khuyển Nha (Răng Chó)', cat: 'lac-tay', catLabel: 'Lắc Tay', badges: [], price: 0, img: '../assets/images/prod_lac_tay.png', desc: 'Lắc tay gồm các viên ngọc mài thô, giữ lại nét hoang sơ tự nhiên của đá ngọc Myanmar.', color: 'Lục Lam', loai: 'Loại A-B', size: '19cm' }
];

// Collections Data
const COLLECTIONS = [
  {
    id: 1,
    name: 'Bộ Hoàng Gia Lục Đế',
    desc: 'Bộ trang sức cao cấp từ ngọc lục đế loại A, được chế tác hoàn hảo để tôn lên vẻ đẹp quý phái của người đeo.',
    pieces: ['Nhẫn', 'Dây Chuyền', 'Bông Tai'],
    img: '../assets/images/collection_set.png',
    price: 75000000,
    color: 'Lục Đế',
    loai: 'Loại A'
  },
  {
    id: 2,
    name: 'Bộ Tím Lavender Quý Cô',
    desc: 'Vẻ đẹp bí ẩn của ngọc tử la lan lavender phối hợp cùng vàng trắng 18K trong bộ trang sức dành cho phái đẹp.',
    pieces: ['Nhẫn', 'Lắc Tay', 'Bông Tai'],
    img: '../assets/images/collection_set.png',
    price: 55000000,
    color: 'Tím Lavender',
    loai: 'Loại A'
  },
  {
    id: 3,
    name: 'Bộ Trắng Băng Thuần Khiết',
    desc: 'Sự thuần khiết và sạch khiết của ngọc bạch ngọc loại A kết hợp với bạch kim, thanh thoát và sang trọng.',
    pieces: ['Dây Chuyền', 'Lắc Tay', 'Bông Tai'],
    img: '../assets/images/collection_set.png',
    price: 42000000,
    color: 'Trắng Băng',
    loai: 'Loại A'
  },
];

// Blog Data
const BLOGS = [
  { id: 1, title: 'Ngọc Phỉ Thúy Loại A, B, C — Báu Vật Hay Bẫy Tiền?', tag: 'Kiến Thức', date: '05/04/2024', read: '8 phút', excerpt: 'Thị trường ngọc tràn ngập hàng xử lý hóa chất. Bài viết này giải mã hoàn toàn hệ thống phân loại Loại A, B, C và cách nhận biết bằng mắt thường.', img: '../assets/images/story_bg.png' },
  { id: 2, title: 'Vòng Ngọc Phỉ Thúy Hợp Mệnh Gì? Giải Mã Ngũ Hành', tag: 'Phong Thủy', date: '28/03/2024', read: '6 phút', excerpt: 'Từ Mệnh Kim đến Mệnh Hỏa, mỗi mệnh đều có tông màu ngọc đặc biệt phù hợp. Khám phá ngay bạn nên đeo màu ngọc gì.', img: '../assets/images/collection_bg.png' },
  { id: 3, title: 'Hành Trình Ngọc Từ Mỏ Myanmar Đến Tay Bạn', tag: 'Câu Chuyện', date: '20/03/2024', read: '10 phút', excerpt: 'Từ mỏ ngọc Hpakant Myanmar đến xưởng chế tác Vân Nam Trung Quốc, hành trình của một viên ngọc phỉ thúy là câu chuyện dài về thiên nhiên và nghệ thuật.', img: '../assets/images/story_bg.png' },
  { id: 4, title: 'Nước Ngọc Là Gì? Bí Kíp Chọn Vòng Phỉ Thúy Đẹp', tag: 'Kiến Thức', date: '12/03/2024', read: '7 phút', excerpt: '"Nước ngọc" hay độ trong thấu quang là yếu tố quyết định giá trị của một viên ngọc. Học cách đánh giá nước ngọc như chuyên gia.', img: '../assets/images/collection_bg.png' },
  { id: 5, title: 'Ngọc Phỉ Thúy Vân Nam vs Myanmar — Khác Biệt Tinh Tế', tag: 'Kiến Thức', date: '05/03/2024', read: '9 phút', excerpt: 'Cùng là jadeite nhưng ngọc từ hai vùng có màu sắc và đặc điểm khác nhau. Bài so sánh chi tiết này giúp bạn hiểu rõ hơn về sản phẩm mình đang chọn.', img: '../assets/images/story_bg.png' },
  { id: 6, title: 'Vì Sao Ngọc Phỉ Thúy Xanh Lục Lại Đắt Nhất?', tag: 'Định Giá', date: '28/02/2024', read: '5 phút', excerpt: 'Màu "Imperial Green" — xanh lục đế — là màu hiếm nhất và đắt nhất trong trang sức ngọc. Khám phá tại sao màu sắc lại ảnh hưởng lớn đến giá trị.', img: '../assets/images/collection_bg.png' },
];

// ─── Init all shared stuff ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initTilt();
  initCounters();
  initTabs();
});

// Export for pages
window.JadeStore = { PRODUCTS, COLLECTIONS, BLOGS, showToast };
