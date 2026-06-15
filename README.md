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


Trình bày việc sử dụng kiến trúc MVC cho dự án Spotify Clone 

1. Giới thiệu 

Dự án Spotify Clone là một ứng dụng web mô phỏng các chức năng cơ bản của Spotify như đăng ký, đăng nhập, tìm kiếm bài hát, xem nghệ sĩ, tạo danh sách phát và phát nhạc. Để xây dựng hệ thống có cấu trúc rõ ràng, dễ bảo trì và mở rộng, nhóm lựa chọn áp dụng kiến trúc Model – View – Controller (MVC). 

 

2. Lý do lựa chọn kiến trúc MVC 

Kiến trúc MVC giúp tách biệt giao diện, xử lý nghiệp vụ và dữ liệu thành các thành phần độc lập. Điều này mang lại các lợi ích: 

Dễ phát triển và bảo trì.  

Giảm sự phụ thuộc giữa các thành phần.  

Hỗ trợ làm việc nhóm hiệu quả.  

Dễ mở rộng tính năng trong tương lai.  

Phù hợp với các ứng dụng web có nhiều chức năng như Spotify.  

 

3. Tổng quan kiến trúc MVC 

MVC gồm ba thành phần chính: 

Model 

Model chịu trách nhiệm quản lý dữ liệu và tương tác với cơ sở dữ liệu. 

Trong Spotify Clone, Model quản lý: 

Người dùng (User)  

Bài hát (Song)  

Nghệ sĩ (Artist)  

Album (Album)  

Danh sách phát (Playlist)  

Ví dụ: 

Song Model 
- Lấy danh sách bài hát 
- Thêm bài hát 
- Cập nhật bài hát 
- Xóa bài hát 

 

View 

View là giao diện người dùng được xây dựng bằng: 

HTML  

CSS  

JavaScript  

Các View chính: 

Trang chủ  

Trang đăng nhập  

Trang đăng ký  

Trang tìm kiếm  

Trang nghệ sĩ  

Trang playlist  

Thanh phát nhạc  

View chỉ hiển thị dữ liệu và gửi yêu cầu đến Controller. 

 

Controller 

Controller là cầu nối giữa View và Model. 

Nhiệm vụ: 

Nhận yêu cầu từ người dùng.  

Xử lý logic nghiệp vụ.  

Gọi Model để truy xuất dữ liệu.  

Trả kết quả về View.  

Ví dụ: 

Người dùng nhấn nút "Tìm kiếm" 
 
→ SearchController nhận yêu cầu 
→ SongModel tìm dữ liệu trong database 
→ Kết quả trả về Controller 
→ Controller gửi dữ liệu cho View hiển thị 

 

4. Sơ đồ hoạt động của hệ thống 

Người dùng 
      │ 
      ▼ 
    View 
      │ 
      ▼ 
Controller 
      │ 
      ▼ 
    Model 
      │ 
      ▼ 
   MySQL 
      │ 
      ▼ 
    Model 
      │ 
      ▼ 
Controller 
      │ 
      ▼ 
    View 

 

5. Áp dụng MVC vào Spotify Clone 

Chức năng đăng nhập 

Login View 
     │ 
     ▼ 
Auth Controller 
     │ 
     ▼ 
User Model 
     │ 
     ▼ 
Database 

Quy trình: 

Người dùng nhập tài khoản và mật khẩu.  

Controller nhận dữ liệu.  

Model kiểm tra thông tin trong cơ sở dữ liệu.  

Nếu hợp lệ, Controller cho phép đăng nhập.  

Giao diện chuyển sang trang chủ.  

 

Chức năng xem danh sách bài hát 

Home View 
     │ 
     ▼ 
Song Controller 
     │ 
     ▼ 
Song Model 
     │ 
     ▼ 
Database 

Quy trình: 

Người dùng truy cập trang chủ.  

Controller yêu cầu danh sách bài hát.  

Model truy vấn dữ liệu từ MySQL.  

Dữ liệu được trả về giao diện.  

 

Chức năng tạo playlist 

Playlist View 
       │ 
       ▼ 
Playlist Controller 
       │ 
       ▼ 
Playlist Model 
       │ 
       ▼ 
Database 

Quy trình: 

Người dùng nhập tên playlist.  

Controller nhận yêu cầu tạo mới.  

Model lưu playlist vào cơ sở dữ liệu.  

Giao diện cập nhật danh sách playlist.  

 

6. Cấu trúc thư mục dự án 

spotify-clone/ 
│ 
├── public/ 
│   ├── index.html 
│   ├── login.html 
│   ├── register.html 
│   ├── css/ 
│   ├── js/ 
│   └── images/ 
│ 
├── controllers/ 
│   ├── authController.js 
│   ├── songController.js 
│   ├── playlistController.js 
│ 
├── models/ 
│   ├── User.js 
│   ├── Song.js 
│   ├── Playlist.js 
│   └── Artist.js 
│ 
├── routes/ 
│   ├── authRoutes.js 
│   ├── songRoutes.js 
│   └── playlistRoutes.js 
│ 
├── config/ 
│   └── db.js 
│ 
├── database/ 
│   └── spotify.sql 
│ 
└── app.js 

 

7. Ưu điểm của MVC trong dự án 

Dễ bảo trì 

Khi thay đổi giao diện chỉ cần chỉnh sửa View mà không ảnh hưởng đến Model hoặc Controller. 

Dễ mở rộng 

Có thể bổ sung: 

Yêu thích bài hát  

Theo dõi nghệ sĩ  

Gói Premium  

Lịch sử nghe nhạc  

mà không cần thay đổi toàn bộ hệ thống. 

Hỗ trợ làm việc nhóm 

Mỗi thành viên có thể phụ trách một phần: 

Frontend (View)  

Backend (Controller)  

Database (Model)  

giúp tăng hiệu quả phát triển. 

Tái sử dụng mã nguồn 

Các Model và Controller có thể được sử dụng cho nhiều giao diện khác nhau. 


