'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', href: '/' },
  { icon: 'gavel', label: 'Legal Research', href: '/workspace', filled: true },
  { icon: 'description', label: 'Drafting', href: '/notice' },
  { icon: 'folder_open', label: 'Exhibit Vault', href: '/evidence' },
  { icon: 'history', label: 'Dispute History', href: '#' },
];

const bottomNavItems = [
  { icon: 'help_outline', label: 'Support', href: '#' },
  { icon: 'account_circle', label: 'Profile', href: '#' },
];

export default function SideNavBar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav
      className={`hidden md:flex flex-col py-6 px-4 glass-strong h-full border-r border-glass-stroke transition-all duration-300 ease-smooth flex-shrink-0 ${
        isCollapsed ? 'w-[72px]' : 'w-[280px]'
      }`}
    >
      {/* ── Brand Header ── */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center text-on-primary shadow-primary-md flex-shrink-0 hover:scale-105 transition-transform"
          aria-label="Toggle sidebar"
        >
          <span className="material-symbols-outlined filled text-[22px]">balance</span>
        </button>
        {!isCollapsed && (
          <div className="animate-fade-in overflow-hidden">
            <h1 className="font-headline font-semibold text-primary leading-tight text-[17px] whitespace-nowrap">
              Lexis Counsel
            </h1>
            <p className="text-[10px] text-on-surface-variant opacity-80 whitespace-nowrap">
              Elite Legal AI / Civic Empowerment
            </p>
          </div>
        )}
      </div>

      {/* ── New Consultation CTA ── */}
      <div className={`mb-6 ${isCollapsed ? 'px-0' : 'px-2'}`}>
        <Link
          href="/intake"
          className={`btn-primary w-full shadow-btn transition-all duration-200 ${
            isCollapsed ? 'rounded-full p-2.5 justify-center' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          {!isCollapsed && <span className="whitespace-nowrap">New Consultation</span>}
        </Link>
      </div>

      {/* ── Navigation Links ── */}
      <ul className="flex flex-col gap-1 flex-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <span
                  className={`material-symbols-outlined text-[20px] flex-shrink-0 ${item.filled && isActive ? 'filled' : ''}`}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="animate-fade-in whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ── Bottom Nav ── */}
      <div className="border-t border-glass-stroke pt-4 px-2 space-y-1">
        {bottomNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`nav-link ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="material-symbols-outlined text-[20px] flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="animate-fade-in whitespace-nowrap">{item.label}</span>}
          </Link>
        ))}
      </div>
    </nav>
  );
}
