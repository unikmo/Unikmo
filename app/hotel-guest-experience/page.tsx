import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['hotel-guest-experience'];

export const metadata = buildHotelSeoMetadata(page);

export default function HotelGuestExperiencePage() {
  return <HotelSeoLandingPage page={page} />;
}
