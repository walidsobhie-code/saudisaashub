// Enhanced visual components for articles
'use client';

import { useState } from 'react';

// Progress/Stat Card Component
export function StatCard({ label, value, change, icon }: { label: string; value: string; change?: string; icon?: string }) {
  return (
    <div className="p-5 rounded-xl bg-card border border-white/10 hover:border-accent-green/30 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-text-muted text-sm">{label}</span>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {change && (
          <span className="text-accent-green text-sm mb-1">{change}</span>
        )}
      </div>
    </div>
  );
}

// Comparison Table Component
interface ComparisonItem {
  name: string;
  features: string[];
}

interface ComparisonTableProps {
  title: string;
  items: ComparisonItem[];
  highlight?: number;
}

export function ComparisonTable({ title, items, highlight }: ComparisonTableProps) {
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10">
      <div className="px-6 py-4 bg-card border-b border-white/10">
        <h3 className="font-bold text-white">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-3 text-right text-text-muted font-medium">العنصر</th>
              {items.map((item, i) => (
                <th key={i} className="px-6 py-3 text-center text-white font-medium">{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items[0]?.features.map((_, featIdx) => (
              <tr key={featIdx} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 text-text-secondary">ميزة {featIdx + 1}</td>
                {items.map((item, itemIdx) => (
                  <td key={itemIdx} className="px-6 py-4 text-center">
                    {item.features[featIdx] ? (
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${itemIdx === highlight ? 'bg-accent-green/20 text-accent-green' : 'bg-white/10 text-text-muted'}`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Bar Chart Component
interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: ChartData[];
  title?: string;
}

export function BarChart({ data, title }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="my-8 p-6 rounded-xl bg-card border border-white/10">
      {title && <h3 className="font-bold text-white mb-6">{title}</h3>}
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-secondary">{item.label}</span>
              <span className="text-white font-medium">{item.value}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color || 'bg-accent-green'}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pie/Donut Chart Component
interface PieChartProps {
  data: ChartData[];
  title?: string;
}

export function PieChart({ data, title }: PieChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;

  return (
    <div className="my-8 p-6 rounded-xl bg-card border border-white/10">
      {title && <h3 className="font-bold text-white mb-6">{title}</h3>}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Donut visualization */}
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {data.map((item, i) => {
              const percentage = (item.value / total) * 100;
              const offset = cumulative;
              cumulative += percentage;
              const color = item.color || ['#00D9A5', '#8B5CF6', '#FF6B9D', '#F59E0B', '#3B82F6'][i % 5];

              return (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={color}
                  strokeWidth="20"
                  strokeDasharray={`${percentage * 2.51} ${251 - percentage * 2.51}`}
                  strokeDashoffset={`${-offset * 2.51}`}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || ['#00D9A5', '#8B5CF6', '#FF6B9D', '#F59E0B', '#3B82F6'][i % 5] }}
              />
              <span className="text-text-secondary flex-1">{item.label}</span>
              <span className="text-white font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Timeline Component
interface TimelineItem {
  title: string;
  description: string;
  date?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="my-8">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-green via-purple-500 to-accent-pink" />

        {items.map((item, i) => (
          <div key={i} className="relative pr-20 pb-8 last:pb-0">
            {/* Dot */}
            <div className="absolute right-6 top-1 w-5 h-5 rounded-full bg-accent-green border-4 border-background" />

            <div className="p-5 rounded-xl bg-card border border-white/10 hover:border-accent-green/30 transition-colors">
              {item.date && (
                <span className="text-xs text-accent-green mb-2 block">{item.date}</span>
              )}
              <h4 className="font-bold text-white mb-2">{item.title}</h4>
              <p className="text-text-secondary text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Step-by-step Guide Component
interface Step {
  title: string;
  content: string;
}

interface StepsGuideProps {
  steps: Step[];
}

export function StepsGuide({ steps }: StepsGuideProps) {
  return (
    <div className="my-8 space-y-4">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
            {i + 1}
          </div>
          <div className="flex-1 p-5 rounded-xl bg-card border border-white/10">
            <h4 className="font-bold text-white mb-2">{step.title}</h4>
            <p className="text-text-secondary">{step.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Highlight Box Component
export function HighlightBox({ title, children, type = 'info' }: { title?: string; children: React.ReactNode; type?: 'info' | 'success' | 'warning' | 'tip' }) {
  const styles = {
    info: 'border-blue-500 bg-blue-500/10',
    success: 'border-accent-green bg-accent-green/10',
    warning: 'border-yellow-500 bg-yellow-500/10',
    tip: 'border-purple-500 bg-purple-500/10',
  };

  const icons = {
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    tip: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  };

  return (
    <div className={`my-6 p-5 rounded-xl border-r-4 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[type]} />
        </svg>
        <div>
          {title && <h4 className="font-bold text-white mb-2">{title}</h4>}
          <div className="text-text-secondary">{children}</div>
        </div>
      </div>
    </div>
  );
}
