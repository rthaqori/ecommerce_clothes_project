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
      <div className="mx-8 px-4 pb-15">
        <ShopSection />
        <BestSellerSection />
      </div>
      <div className="flex h-screen items-center justify-center">
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
