import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['luxury-hotel-amenities'];

export const metadata = buildHotelSeoMetadata(page);

export default function LuxuryHotelAmenitiesPage() {
  return <HotelSeoLandingPage page={page} />;
}
