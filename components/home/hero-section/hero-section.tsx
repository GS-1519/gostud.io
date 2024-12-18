export function HeroSection() {
  return (
    <section className={'mx-auto max-w-7xl px-[32px] relative flex items-center justify-between mt-16 mb-12'}>
      <div className={'text-center w-full'}>
        <h1 className={'text-[48px] leading-[48px] md:text-[80px] md:leading-[80px] tracking-[-1.6px] font-medium'}>
          Premium Quality at
          <br />
          10x Less Price
        </h1>
        <p className={'mt-6 text-[18px] leading-[27px] md:text-[20px] md:leading-[30px] max-w-3xl mx-auto text-gray-600'}>
          No studio visits. No $200+ photoshoot fees. No waiting for appointments.
          <br className="hidden md:block" />
          Achieve stunning, professional-grade headshots in just 30 minutes—all from the comfort of your home.
        </p>
      </div>
    </section>
  );
}
