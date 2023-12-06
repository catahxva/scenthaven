import classes from "./AuthPromo.module.css";

function AuthPromo() {
  return (
    <div className={classes.auth__promo}>
      <h3 className={classes.auth__promo__title}>Welcome to Scent Haven</h3>
      <p>
        Your aromatic oasis for indulging in a world of captivating fragrances!
        At Scent Haven, we curate a diverse collection of premium perfumes,
        ensuring there's a perfect scent for every mood. Register today for a
        streamlined checkout experience and access to a personalized dashboard,
        where you can conveniently track previous orders and keep your favorite
        scents at your fingertips.
      </p>
      <p>
        Experience the convenience of registering at Scent Haven. Unlock a
        streamlined checkout process with securely stored delivery details for
        quick and efficient shopping. Registering also lets you create a wish
        list, making it easy to bookmark and revisit your favorite fragrances.
        Elevate your shopping experience by joining our exclusive community that
        values your choices and preferences. Register today for a scented
        adventure tailored just for you!
      </p>
      <p>
        Scent Haven – where fragrance meets convenience! Register now for
        streamlined checkout and easy access to a personalized dashboard. Track
        your orders effortlessly, store your preferred address securely, and
        create a wish list to bookmark and revisit your favorite scents. Join
        our exclusive community that values your choices – register today for a
        tailored and convenient shopping experience.
      </p>
    </div>
  );
}

export default AuthPromo;
