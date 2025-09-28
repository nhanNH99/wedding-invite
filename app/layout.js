import "./globals.css";
import {
  Playfair_Display,
  Great_Vibes,
  Tangerine,
  WindSong,
} from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  variable: "--font-greatvibes",
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-tangerine",
});

// Nếu muốn dùng WindSong, uncomment dòng này:
const windSong = WindSong({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-windsong",
});

export const metadata = {
  title: "Thiệp cưới Nhân & Phúc",
  description: "Save the date 💍",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body
        className={`${playfair.variable} ${greatVibes.variable} ${tangerine.variable}  ${windSong.variable} antialiased`}
        // Nếu dùng WindSong, thêm: ${windSong.variable}
      >
        {children}
      </body>
    </html>
  );
}
