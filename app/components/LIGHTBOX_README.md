# Lightbox Component

Shared component để hiển thị ảnh phóng to trong popup/modal với đầy đủ tính năng navigation.

## Tính năng

- ✅ **Keyboard Navigation**: ← → để chuyển ảnh, ESC để đóng
- ✅ **Mouse/Touch Navigation**: Click buttons hoặc click outside để đóng
- ✅ **Thumbnails Navigation**: Hiển thị thumbnails trên desktop
- ✅ **Smooth Animations**: Fade và scale transitions
- ✅ **Responsive Design**: Tối ưu cho mobile và desktop
- ✅ **Image Counter**: Hiển thị số thứ tự ảnh
- ✅ **Image Caption**: Hiển thị mô tả ảnh

## Sử dụng

### 1. Import component

```jsx
import Lightbox from "./Lightbox";
```

### 2. Setup state và handlers

```jsx
const [selectedImageIndex, setSelectedImageIndex] = useState(null);

const images = [
  { src: "/image1.jpg", alt: "Mô tả ảnh 1" },
  { src: "/image2.jpg", alt: "Mô tả ảnh 2" },
  // ... hoặc chỉ string: ["/image1.jpg", "/image2.jpg", ...]
];

const openLightbox = (index) => {
  setSelectedImageIndex(index);
};

const closeLightbox = () => {
  setSelectedImageIndex(null);
};

const nextImage = () => {
  setSelectedImageIndex((prev) => (prev + 1) % images.length);
};

const prevImage = () => {
  setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
};
```

### 3. Render Lightbox

```jsx
{
  selectedImageIndex !== null && (
    <Lightbox
      images={images}
      currentIndex={selectedImageIndex}
      onClose={closeLightbox}
      onNext={nextImage}
      onPrev={prevImage}
      showThumbnails={true} // Optional: default true
      showKeyboardHint={true} // Optional: default true
    />
  );
}
```

## Props

| Prop               | Type                      | Required | Default | Description                                     |
| ------------------ | ------------------------- | -------- | ------- | ----------------------------------------------- |
| `images`           | `Array<string \| object>` | ✅ Yes   | -       | Mảng ảnh (string URLs hoặc objects với src/alt) |
| `currentIndex`     | `number`                  | ✅ Yes   | -       | Index của ảnh hiện tại                          |
| `onClose`          | `function`                | ✅ Yes   | -       | Callback khi đóng lightbox                      |
| `onNext`           | `function`                | ✅ Yes   | -       | Callback để chuyển sang ảnh tiếp theo           |
| `onPrev`           | `function`                | ✅ Yes   | -       | Callback để chuyển sang ảnh trước               |
| `showThumbnails`   | `boolean`                 | ❌ No    | `true`  | Hiển thị thumbnails navigation                  |
| `showKeyboardHint` | `boolean`                 | ❌ No    | `true`  | Hiển thị keyboard shortcuts hint                |

## Image Format

### Object format (Recommended)

```jsx
const images = [
  { src: "/image1.jpg", alt: "Beautiful sunset" },
  { src: "/image2.jpg", alt: "Mountain view" },
];
```

### String format (Simple)

```jsx
const images = ["/image1.jpg", "/image2.jpg"];
```

## Components sử dụng

- ✅ `Gallery.jsx` - Phần "Khoảnh khắc ngọt ngào"
- ✅ `OurJourney.jsx` - Phần "Chặng đường của chúng tôi"
- ✅ `AboutUs.jsx` - Phần "Về chúng tôi"

## Customization

Để thay đổi style, chỉnh sửa các class Tailwind trong `Lightbox.jsx`:

- Background: `bg-black/95`
- Button style: `bg-white/10 hover:bg-white/20`
- Text color: `text-white`
- Animation: `transition-colors duration-300`
