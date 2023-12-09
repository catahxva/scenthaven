import Header from "../UI/HomeComponents/Header";
import Promo from "../UI/HomeComponents/Promo";
import Discover from "../UI/HomeComponents/Discover";
import HomeLatest from "../UI/HomeComponents/HomeLatest";
import HomePopular from "../UI/HomeComponents/HomePopular";
import AccountPromo from "../UI/HomeComponents/AccountPromo";

import { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Promo />
      <Discover />
      <HomeLatest />
      {/* <HomePopular /> */}
      <AccountPromo />
    </>
  );
}

export default Home;
