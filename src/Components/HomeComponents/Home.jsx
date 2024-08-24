import Header from "../HeaderFooter/Header";
import BannerSection from "./BannerSection";
import ShopSection from "./ShopSection";
import BestSellerSection from "./BestSellerSection";
import SaleSection from "./SaleSection";
import MediaComponent from "./MediaComponent";
import NewsletterSection from "./NewsletterSection";
import Footer from "../HeaderFooter/Footer";

const Home = () => {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="bg-banner-bg">
          <Header />
        </div>
        <BannerSection />
      </div>
      <div className="mx-4 px-2 pb-15 md:mx-6 md:px-3 lg:mx-8 lg:px-4">
        <ShopSection />
        <BestSellerSection />
      </div>
      <div className="flex items-center justify-center md:h-screen">
        <SaleSection />
      </div>
      <div>
        <MediaComponent />
      </div>
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default Home;
