import { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'تواصل معنا - SaudiSaaSHub',
  description: 'تواصل مع منصة SaudiSaaSHub للاستفسارات والشراكات والمساهمة في المحتوى. نحب أن نسمع منك!',
  alternates: {
    canonical: 'https://saudisaashub.pages.dev/contact',
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
