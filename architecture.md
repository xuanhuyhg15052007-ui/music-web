🎨 Frontend

Frontend được phát triển bằng HTML, CSS và JavaScript, chịu trách nhiệm hiển thị giao diện và tương tác với người dùng.

Các chức năng chính bao gồm:

Đăng ký, đăng nhập tài khoản.
Quản lý hồ sơ cá nhân.
Nghe nhạc trực tuyến.
Tìm kiếm bài hát, album, nghệ sĩ và thể loại.
Tạo và quản lý playlist.
Hiển thị danh sách nhạc đề xuất.
Hiển thị bảng xếp hạng Top Trending.
Đăng ký và sử dụng gói Premium.
Giao diện riêng cho User, Artist và Admin.
⚙️ Backend

Backend được phát triển bằng Node.js, Express.js và JavaScript, chịu trách nhiệm xử lý các nghiệp vụ của hệ thống và kết nối với cơ sở dữ liệu.

Các chức năng chính bao gồm:

Xác thực người dùng và phân quyền bằng JWT.
Quản lý tài khoản User, Artist và Admin.
Quản lý bài hát, album và thể loại.
Xử lý upload nhạc từ Artist.
Kiểm duyệt bài hát trước khi công khai trên hệ thống.
Quản lý playlist và lịch sử nghe nhạc.
Thống kê lượt nghe và bài hát thịnh hành.
Xử lý đề xuất nhạc dựa trên hành vi người dùng.
Quản lý các gói Premium.
🗄️ Cơ Sở Dữ Liệu

Hệ thống sử dụng MySQL để lưu trữ và quản lý dữ liệu.

Các bảng dữ liệu chính gồm:

Users
Artists
Songs
Albums
Genres
Playlists
PlaylistSongs
PremiumSubscriptions
ListeningHistory
SongApprovals
👥 Phân Quyền Hệ Thống

User

Đăng ký, đăng nhập.
Quản lý hồ sơ cá nhân.
Nghe nhạc.
Tìm kiếm bài hát.
Tạo playlist.
Theo dõi nghệ sĩ.
Nhận đề xuất nhạc.
Sử dụng Premium.

Artist

Toàn bộ quyền của User.
Upload bài hát.
Tạo Album.
Quản lý bài hát và Album.
Theo dõi thống kê lượt nghe.

Admin

Quản lý User.
Quản lý Artist.
Duyệt hoặc từ chối bài hát.
Quản lý Album và Thể loại.
Quản lý Premium.
Theo dõi thống kê toàn hệ thống
