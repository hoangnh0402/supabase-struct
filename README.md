# supabase-struct

Dự án này sử dụng kiến trúc **Client-Side Backend** dựa trên nguyên lý **Clean Architecture** (còn gọi là Hexagonal Architecture) để tách biệt logic nghiệp vụ khỏi giao diện (React) và hạ tầng (Supabase). Kiến trúc này giúp code dễ bảo trì, dễ test và dễ dàng thay thế backend trong tương lai.

## Cấu Trúc Thư Mục

Mã nguồn được tổ chức trong thư mục `src/` với các layer sau:

### 1. Domain Layer (`src/domain/`)
Đây là "trái tim" của ứng dụng, chứa các quy tắc nghiệp vụ cốt lõi (Business Rules). Layer này **không phụ thuộc** vào bất kỳ layer nào khác.
- **Entities**: Các object đại diện cho dữ liệu nghiệp vụ (ví dụ: `User`). Chứa logic validate và xử lý dữ liệu.
- **Rules**: Các quy tắc nghiệp vụ phức tạp.

### 2. Application Layer (`src/application/`)
Layer này điều phối logic ứng dụng (Orchestration).
- **Use Cases**: Chỉ huy các bước thực hiện một tính năng (ví dụ: `GetUserProfileUseCase`, `UpdateUserProfileUseCase`). Use Case gọi xuống Repository Interface để lấy dữ liệu.
- **DTO (Data Transfer Object)**: Định nghĩa dữ liệu input/output của Use Case, đảm bảo UI không dùng trực tiếp Entity.

### 3. Interfaces Layer (`src/interfaces/`)
Định nghĩa các "Hợp đồng" (Interfaces) mà Infrastructure phải tuân theo.
- **Repositories**: Ví dụ `IUserRepository`. Giúp Application Layer gọi dữ liệu mà không cần biết dữ liệu đó đến từ Supabase hay API nào khác.

### 4. Infrastructure Layer (`src/infrastructure/`)
Nơi thực hiện các chi tiết kỹ thuật (Frameworks & Drivers).
- **Supabase**: Triển khai các Repository Interface bằng Supabase Client (ví dụ: `SupabaseUserRepository`).
- Đây là nơi duy nhất biết về Database Schema.

### 5. Dependency Injection (`src/di/`)
- Chứa `Container` để kết nối ("wire") các Use Case với implementation cụ thể của Repository.
- Giúp tách biệt việc khởi tạo object khỏi việc sử dụng object.

### 6. React Hooks (`src/hooks/`)
- Đóng vai trò là "Adapter" để React giao tiếp với Application Layer.
- Sử dụng `TanStack Query` để quản lý state và caching.
- React Component chỉ tương tác qua các hooks này, không gọi trực tiếp Supabase.

## Luồng Dữ Liệu

1. **UI (React)** gọi Hook (ví dụ: `useUserProfile`).
2. **Hook** gọi **Use Case** từ `DI Container`.
3. **Use Case** gọi **Repository Interface** (ví dụ: `findById`).
4. **Infrastructure** (Supabase) thực thi query và trả về dữ liệu thô.
5. **Infrastructure** chuyển đổi dữ liệu thô thành **Domain Entity**.
6. **Use Case** nhận Entity, chuyển đổi thành **DTO** và trả về cho UI.

## Lợi Ích
1. **Độc lập**: Logic nghiệp vụ không dính dáng đến UI (React) hay DB (Supabase).
2. **Dễ test**: Có thể test logic nghiệp vụ mà không cần chạy React hay kết nối DB thật.
3. **Linh hoạt**: Muốn đổi từ Supabase sang REST API? Chỉ cần viết lại phần `Infrastructure` mà không cần sửa `Domain`, `Application` hay `UI`.