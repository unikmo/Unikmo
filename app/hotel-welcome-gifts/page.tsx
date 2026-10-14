import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['hotel-welcome-gifts'];

export const metadata = buildHotelSeoMetadata(page);

export default function HotelWelcomeGiftsPage() {
  return <HotelSeoLandingPage page={page} />;
}
