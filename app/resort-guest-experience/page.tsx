import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['resort-guest-experience'];

export const metadata = buildHotelSeoMetadata(page);

export default function ResortGuestExperiencePage() {
  return <HotelSeoLandingPage page={page} />;
}
