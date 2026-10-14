import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['hotel-anniversary-packages'];

export const metadata = buildHotelSeoMetadata(page);

export default function HotelAnniversaryPackagesPage() {
  return <HotelSeoLandingPage page={page} />;
}
