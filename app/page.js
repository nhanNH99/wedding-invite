import EventsSection from "./components/EventsSection";
import Hero from "./components/Hero";
import NameSection from "./components/NameSection";

export default function Page() {
  return (
    <main className="mx-auto max-w-screen-md px-4 sm:px-6 bg-[var(--paper)] text-[var(--ink)]">
      {/* HERO */}
      <Hero />

      {/* NAMES */}
      <NameSection />

      {/* EVENTS */}
      <EventsSection />

      {/* ABOUT US */}
      <section className="mt-10 grid gap-8">
        <AboutCard heading="VỀ CÔ DÂU" name="THU MINH" />
        <AboutCard heading="VỀ CHÚ RỂ" name="NHẤT VŨ" />
      </section>

      {/* GALLERY */}
      <section className="mt-10">
        <h4 className="text-center tracking-[0.25em]">
          KHOẢNH KHẮC NGỌT NGÀO ❤
        </h4>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          <GalleryImg src="/g1.jpg" />
          <GalleryImg src="/g2.jpg" />
          <GalleryImg src="/g3.jpg" />
          <GalleryImg src="/g4.jpg" />
        </div>
      </section>

      {/* GIFT BOX */}
      <section className="mt-10">
        <h4 className="text-center tracking-[0.25em]">HỘP MỪNG CƯỚI</h4>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <GiftCard
            who="Chú rể"
            bank="VCB"
            name="Nhất Vũ"
            number="0123456789"
          />
          <GiftCard
            who="Cô dâu"
            bank="TCB"
            name="Thu Minh"
            number="9876543210"
          />
        </div>
      </section>

      {/* RSVP */}
      <section className="mt-10 text-center">
        <h4 className="tracking-[0.25em]">BẠN SẼ ĐẾN CHỨ?</h4>
        <p className="text-sm text-[var(--muted)] mt-1">
          (Form RSVP sẽ đặt ở đây sau)
        </p>
      </section>

      {/* FOOTER */}
      <section className="mt-10 pb-16 text-center">
        <p className="font-serif">Nhất Vũ & Thu Minh</p>
        <p className="text-sm text-[var(--muted)]">— Thank you —</p>
      </section>
    </main>
  );
}

/* --- COMPONENTS nhỏ --- */
function HeroCard({ src, number }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white shadow">
      <img src={src} alt="" className="h-full w-full object-cover" />
      <div className="absolute bottom-2 left-2 bg-white/70 px-2 py-1 text-2xl font-semibold tracking-widest">
        {number}
      </div>
    </div>
  );
}

function EventCard({ title, when, place }) {
  return (
    <div className="rounded-2xl border border-[var(--accent)] bg-white/70 p-4 shadow-sm">
      <h5 className="text-center tracking-[.25em]">{title}</h5>
      <p className="mt-2 text-center font-serif text-lg">{when}</p>
      <p className="text-center text-sm text-[var(--muted)]">{place}</p>
    </div>
  );
}

function AboutCard({ heading, name }) {
  return (
    <div className="rounded-2xl border border-[var(--accent)] bg-white/70 p-4 shadow-sm">
      <h5 className="text-center tracking-[.25em]">{heading}</h5>
      <p className="mt-1 text-center font-serif text-xl">{name}</p>
      <p className="mt-2 text-sm leading-6 text-justify">
        (Thêm mô tả chi tiết tại đây…)
      </p>
    </div>
  );
}

function GalleryImg({ src }) {
  return (
    <img
      src={src}
      alt="gallery"
      className="aspect-[3/4] w-full rounded-lg object-cover shadow"
    />
  );
}

function GiftCard({ who, bank, name, number }) {
  return (
    <div className="rounded-2xl border border-[var(--accent)] bg-white/80 p-4 text-center shadow-sm">
      <p className="text-sm text-[var(--muted)]">Tài khoản {who}</p>
      <div className="mt-2 rounded bg-[var(--ink)]/90 p-3 text-white">
        <p>
          {bank} - {name}
        </p>
        <p className="font-serif text-xl tracking-widest">{number}</p>
      </div>
    </div>
  );
}
