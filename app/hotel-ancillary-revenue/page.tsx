import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['hotel-ancillary-revenue'];

export const metadata = buildHotelSeoMetadata(page);

export default function HotelAncillaryRevenuePage() {
  return <HotelSeoLandingPage page={page} />;
}
