import { Link } from "react-router-dom";
import classes from "./AccountPromo.module.css";

function AccountPromo() {
  return (
    <section className={classes.account__grid}>
      <div className={classes.account__flex__column}>
        <div className={classes.account__feat}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-6 h-6 ${classes.account__svg}`}
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <div className={classes.account__feat__text}>
            <h3 className={classes.account__feat__title}>
              Save your favorites
            </h3>
            <p className={classes.account__feat__par}>
              Never lose track of your favorite scents! With your account, you
              can effortlessly save and organize your preferred fragrances for
              quick and easy access.
            </p>
          </div>
        </div>
        <div className={classes.account__feat}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-6 h-6 ${classes.account__svg}`}
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
              clipRule="evenodd"
            />
          </svg>
          <div className={classes.account__feat__text}>
            <h3 className={classes.account__feat__title}>
              Seamless Order History
            </h3>
            <p className={classes.account__feat__par}>
              Curious about your past fragrance adventures? Dive into your order
              history to revisit the scents that captivated you.
            </p>
          </div>
        </div>
        <div className={classes.account__feat}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-6 h-6 ${classes.account__svg}`}
          >
            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
            <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
            <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
          </svg>
          <div className={classes.account__feat__text}>
            <h3 className={classes.account__feat__title}>Swift Checkouts</h3>
            <p className={classes.account__feat__par}>
              Make the checkout process a breeze! Save your frequently used
              addresses, and enjoy faster and more efficient shopping.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2>Enhance Your Shopping Experience with Personalized Accounts</h2>
        <p>
          Create a personal account today and unlock a world of convenience and
          tailored experiences. A personalized account can bring to your
          fingertips a better checkout experience, the ability to save your
          favourite products and now you will also be able to see your previous
          order in a more accesible way.
        </p>
        <p>
          Your fragrance journey is about to get even more delightful. Create
          your account now and immerse yourself in a world where every scent is
          a story waiting to be told. Happy exploring!
        </p>
        <div className={classes.account__container__btns}>
          <Link className={classes.account__link__big}>Sign Up</Link>
          <Link className={classes.account__link__small}>Login</Link>
        </div>
      </div>
    </section>
  );
}

export default AccountPromo;
