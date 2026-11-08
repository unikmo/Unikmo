'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Stats {
  totalBuyers: number;
  totalOrders: number;
  totalCodes: number;
  claimedCodes: number;
  unclaimedCodes: number;
  revenue: Array<{ currency: string; amount: number }>;
  providers: Record<string, number>;
  recentOrders: Array<{
    _id: string;
    shopifyOrderName?: string;
    totalPrice: number;
    currency: string;
    paymentProvider?: 'shopify' | 'stripe' | 'manual';
    source: string;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testingEmail, setTestingEmail] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        credentials: 'include', // Important: include cookies
      });
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // Don't redirect on error - let middleware handle it
    } finally {
      setLoading(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setTestingEmail(true);
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    try {
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 20000);
      const response = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ testEmail }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      timeoutId = null;

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.error || 'Failed to send test email');
        if (data.details) {
          console.error('Email test error details:', data.details);
        }
        return;
      }

      toast.success(data.message || 'Test email sent successfully!');
      setTestEmail('');
      setShowTestEmail(false);
    } catch (error: any) {
      const message = error?.name === 'AbortError'
        ? 'Email test timed out. Please verify SMTP host/port and try again.'
        : (error.message || 'Failed to send test email');
      toast.error(message);
      console.error('Test email error:', error);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      setTestingEmail(false);
    }
  };

  const statCards = [
    {
      title: 'Total Buyers',
      value: stats?.totalBuyers || 0,
      color: 'from-purple-500 to-purple-600',
      icon: '👥',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      color: 'from-blue-500 to-blue-600',
      icon: '📦',
    },
    {
      title: 'Total Codes',
      value: stats?.totalCodes || 0,
      color: 'from-pink-500 to-pink-600',
      icon: '🎁',
    },
    {
      title: 'Claimed Codes',
      value: stats?.claimedCodes || 0,
      color: 'from-green-500 to-green-600',
      icon: '✅',
    },
    {
      title: 'Unclaimed Codes',
      value: stats?.unclaimedCodes || 0,
      color: 'from-yellow-500 to-yellow-600',
      icon: '⏳',
    },
  ];
  const primaryRevenue = stats?.revenue?.find((item) => item.currency === 'USD') || stats?.revenue?.[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-[#2D2926] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="rounded-2xl border border-[#E3DAD0] bg-[#2D2926] p-6 text-[#FDF9F5] shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D9B77A]">Commerce overview</p>
            <h2 className="mt-2 font-serif text-3xl">{primaryRevenue ? new Intl.NumberFormat('en-US', { style: 'currency', currency: primaryRevenue.currency }).format(primaryRevenue.amount) : '$0.00'}</h2>
            <p className="mt-1 text-sm text-[#FDF9F5]/60">Recorded paid revenue across current and historical orders</p>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="rounded-full bg-white/10 px-3 py-1.5">Stripe {stats?.providers?.stripe || 0}</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Shopify {stats?.providers?.shopify || 0}</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Manual {stats?.providers?.manual || 0}</span>
          </div>
        </div>
      </div>
      {/* Test Email Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 border border-[#E3DAD0] bg-white shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#2D2926] mb-1">Email configuration</h2>
            <p className="text-sm text-[#2D2926]/60">Test your SMTP email connection</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowTestEmail(!showTestEmail)}
            className="px-4 py-2 rounded-full bg-[#2D2926] text-[#FDF9F5] text-xs font-medium tracking-wide uppercase hover:bg-[#1E1B18] transition-colors"
          >
            {showTestEmail ? 'Cancel' : 'Test email'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showTestEmail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[#E3DAD0]"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D2926] mb-2">
                    Test email address
                  </label>
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your-email@example.com"
                    className="w-full px-4 py-2 rounded-xl border border-[#D3C7BB] bg-white text-[#2D2926] placeholder-[#2D2926]/40 focus:outline-none focus:ring-2 focus:ring-[#2D2926]/20"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !testingEmail) {
                        handleTestEmail();
                      }
                    }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTestEmail}
                  disabled={testingEmail || !testEmail}
                  className="w-full py-3 rounded-full bg-[#2D2926] text-[#FDF9F5] text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1E1B18] transition-colors flex items-center justify-center gap-2"
                >
                    {testingEmail ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      'Send test email'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl p-6 border border-[#E3DAD0] bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl" aria-hidden>{card.icon}</span>
            </div>
            <h3 className="text-sm font-medium text-[#2D2926]/70 mb-1">{card.title}</h3>
            <p className="text-2xl font-semibold text-[#2D2926]">{card.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#E3DAD0] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#2D2926]">Recent orders</h2>
            <p className="mt-1 text-sm text-[#2D2926]/60">Stripe, Shopify, and manually created orders in one view</p>
          </div>
          <a href="/admin/orders" className="rounded-full border border-[#D3C7BB] px-4 py-2 text-xs font-medium uppercase tracking-wide text-[#2D2926]">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-[#2D2926]/50"><tr><th className="pb-3">Order</th><th className="pb-3">Provider</th><th className="pb-3">Total</th><th className="pb-3">Created</th></tr></thead>
            <tbody className="divide-y divide-[#EFE3D8]">
              {(stats?.recentOrders || []).map((order) => (
                <tr key={order._id}>
                  <td className="py-4 font-medium text-[#2D2926]">{order.shopifyOrderName || order._id}</td>
                  <td className="py-4 capitalize text-[#2D2926]/70">{order.paymentProvider || (order.source === 'admin' ? 'manual' : 'shopify')}</td>
                  <td className="py-4 text-[#2D2926]">{new Intl.NumberFormat('en-US', { style: 'currency', currency: order.currency || 'USD' }).format(order.totalPrice)}</td>
                  <td className="py-4 text-[#2D2926]/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {!stats?.recentOrders?.length && <tr><td colSpan={4} className="py-8 text-center text-[#2D2926]/50">No orders yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
