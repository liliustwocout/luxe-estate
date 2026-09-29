'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  onToggleMobile: () => void;
}

export default function AdminHeader({ onToggleMobile }: HeaderProps) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const fetchNotifs = async () => {
    try {
      const res = await fetch('/api/admin/notifications');
      const data = await res.json();
      if (data.notifications) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 10000);
    return () => clearInterval(interval);
  }, []);

  const markAllRead = async () => {
    try {
      await fetch('/api/admin/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true }),
      });
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      // ignore
    }
  };

  const getPageTitle = () => {
    if (pathname.includes('/properties/new')) return 'Add New Property';
    if (pathname.includes('/properties/') && pathname.includes('/edit')) return 'Edit Property';
    if (pathname.includes('/properties/')) return 'Property Details';
    if (pathname.includes('/properties')) return 'Properties Management';
    if (pathname.includes('/viewings/calendar')) return 'Viewing Schedule Calendar';
    if (pathname.includes('/viewings/')) return 'Viewing Request Details';
    if (pathname.includes('/viewings')) return 'Viewing Requests';
    if (pathname.includes('/customers/')) return 'Customer Profile & History';
    if (pathname.includes('/customers')) return 'Customers Directory';
    if (pathname.includes('/settings')) return 'Admin Settings';
    return 'Dashboard Overview';
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#E8E8E5] px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-xl text-charcoal hover:bg-[#F7F7F5] transition-colors"
          aria-label="Open sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-semibold text-[#111111]">
            {getPageTitle()}
          </h1>
          <p className="text-[11px] text-[#6B6B6B] hidden sm:block">
            LuxeEstate Management System
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Add Button */}
        <Link
          href="/admin/properties/new"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111111] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm"
        >
          <svg className="w-4 h-4 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Property</span>
        </Link>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            aria-label="Notifications"
            className="relative p-2 rounded-full hover:bg-[#F7F7F5] text-[#111111] transition-colors border border-[#E8E8E5]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E8E8E5] overflow-hidden z-50">
              <div className="p-3.5 border-b border-[#E8E8E5] flex items-center justify-between bg-[#F7F7F5]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">Thông Báo</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-full">
                      {unreadCount} mới
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-[11px] text-[#C9A96E] hover:underline font-semibold"
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#E8E8E5]">
                {notifications.length === 0 ? (
                  <p className="p-6 text-center text-xs text-[#6B6B6B]">Không có thông báo mới.</p>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <Link
                      key={n.id}
                      href={n.link}
                      onClick={() => setShowNotifMenu(false)}
                      className={`block p-3.5 hover:bg-[#F7F7F5] transition-colors ${
                        !n.isRead ? 'bg-amber-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold text-[#111111]">{n.title}</span>
                        {!n.isRead && <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-[#6B6B6B] leading-relaxed mb-1">{n.message}</p>
                      <span className="text-[10px] text-muted font-mono">
                        {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </Link>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-[#E8E8E5] text-center bg-[#F7F7F5]">
                <Link
                  href="/admin/viewings"
                  onClick={() => setShowNotifMenu(false)}
                  className="text-xs font-semibold text-charcoal hover:text-[#C9A96E] transition-colors"
                >
                  Xem tất cả lịch hẹn →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
