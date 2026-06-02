## 📂 Cấu trúc thư mục dự án

```plaintext
spotify-clone/
│
├── client/                          📂 Frontend
│   ├── index.html                   📄 Trang chủ sau khi đăng nhập
│   ├── login.html                   📄 Trang đăng nhập
│   ├── register.html                📄 Trang đăng ký
│   └── assets/
│       ├── css/                     📂 CSS giao diện
│       │   ├── login.css            📄 CSS trang đăng nhập/đăng ký
│       │   ├── main.css             📄 CSS layout trang chủ, hover, nút play
│       │   └── style.css            📄 CSS hệ màu hệ thống, font chữ gốc
│       ├── images/                  📂 Logo, icon, ảnh mặc định
│       └── js/                      📂 Logic JavaScript
│           ├── api.js               📄 Hàm Fetch/Axios gọi server
│           ├── auth.js              📄 Xử lý đăng nhập/đăng ký/lưu Token
│           ├── player.js            📄 Xử lý phát nhạc, thanh tua, âm lượng
│           ├── playlist.js          📄 Xử lý tạo/hiển thị playlist
│           └── search.js            📄 Xử lý thanh tìm kiếm bài hát
│
├── server/                          📂 Backend (logic & database)
│   ├── src/
│   │   ├── config/                  📂 Kết nối Database
│   │   │   └── db.js
│   │   ├── models/                  📂 Schema Database
│   │   │   ├── User.js              📄 Bảng thông tin người dùng
│   │   │   ├── Song.js              📄 Bảng thông tin bài hát
│   │   │   └── Playlist.js          📄 Bảng danh sách phát
│   │   ├── controllers/             📂 Logic xử lý API
│   │   │   ├── authController.js    📄 Kiểm tra tài khoản, mật khẩu
│   │   │   ├── songController.js    📄 Lấy nhạc, tìm kiếm nhạc từ DB
│   │   │   └── playlistController.js📄 Thêm/xóa/sửa playlist
│   │   ├── routes/                  📂 Định nghĩa API endpoint
│   │   │   ├── authRoutes.js        📄 /api/v1/auth/...
│   │   │   ├── songRoutes.js        📄 /api/v1/songs/...
│   │   │   └── playlistRoutes.js    📄 /api/v1/playlists/...
│   │   ├── middlewares/             📂 Bảo mật & bắt lỗi
│   │   │   └── authMiddleware.js    📄 Chặn người chưa đăng nhập
│   │   ├── utils/                   📂 Hàm tiện ích
│   │   │   └── generateToken.js     📄 Tạo JWT Token khi đăng nhập
│   │   └── server.js                📄 Điểm khởi chạy chính
│   ├── .env                         📄 Biến môi trường (local, không push GitHub)
│   ├── .env.example                 📄 File mẫu cấu hình biến môi trường
│   └── package.json                 📄 Khai báo thư viện backend
│
├── docs/                            📂 Tài liệu dự án
│   ├── Tai_lieu_SRS_Spotify_Clone.docx
│   └── use-case-diagram.png
│
├── .gitignore                       📄 Chặn node_modules và .env
└── README.md                        📄 Hướng dẫn cài đặt & vận hành
