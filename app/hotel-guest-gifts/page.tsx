import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['hotel-guest-gifts'];

export const metadata = buildHotelSeoMetadata(page);

export default function HotelGuestGiftsPage() {
  return <HotelSeoLandingPage page={page} />;
}
