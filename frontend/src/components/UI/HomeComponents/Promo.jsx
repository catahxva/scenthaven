import classes from "./Promo.module.css";

function Promo() {
  return (
    <section className={classes.promo}>
      <div className={classes.promo__container}>
        <img src="/info.jpg" className={classes.promo__img} />
      </div>
      <div>
        <h2 className={classes.promo__title}>
          Scent Haven: Unveil the Art of Fragrance
        </h2>
        <p>
          Immerse yourself in a world where each bottle tells a story, and every
          spritz is a journey into sensory bliss. Our collection transcends the
          ordinary, curated to inspire and elevate your everyday moments. From
          delicate floral notes to bold and exotic blends, Scent Haven invites
          you to discover the perfect fragrance that encapsulates your unique
          style.
        </p>
        <p>
          With each scent carefully chosen, our collection becomes a canvas for
          self-expression, a palette of olfactory masterpieces that enchant and
          linger. Join us on a fragrant adventure, where the allure of scents
          becomes a testament to the beauty found in the details of life. Scent
          Haven is more than a destination; it's an invitation to embrace the
          extraordinary, to indulge in the luxury of fragrance, and to make
          every day a scented celebration.
        </p>
        <p>
          In the realm of Scent Haven, we believe that fragrance is not merely a
          purchase but a personal journey—a journey that transcends trends and
          embraces the timeless allure of scent. Each bottle is a testament to
          the craftsmanship of perfumery, encapsulating the emotions and
          memories that fragrances can evoke.
        </p>
      </div>
    </section>
  );
}

export default Promo;
