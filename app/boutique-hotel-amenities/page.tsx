import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['boutique-hotel-amenities'];

export const metadata = buildHotelSeoMetadata(page);

export default function BoutiqueHotelAmenitiesPage() {
  return <HotelSeoLandingPage page={page} />;
}
