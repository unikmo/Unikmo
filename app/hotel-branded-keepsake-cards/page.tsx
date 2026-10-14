import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['hotel-branded-keepsake-cards'];

export const metadata = buildHotelSeoMetadata(page);

export default function HotelBrandedKeepsakeCardsPage() {
  return <HotelSeoLandingPage page={page} />;
}
