import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Chrome,
  ArrowRight,
  Star,
  Clock,
  Users,
} from 'lucide-react';
import Image from 'next/image';

const page = () => {
  const features = [
    {
      icon: <Sparkles className='h-6 w-6' />,
      title: 'AI-Powered Intelligence',
      description:
        'Advanced AI algorithms detect and fix grammar, spelling, and punctuation errors instantly.',
    },
    {
      icon: <Zap className='h-6 w-6' />,
      title: 'Lightning Fast',
      description:
        'Get corrections in real-time as you type. No delays, no interruptions to your workflow.',
    },
    {
      icon: <Shield className='h-6 w-6' />,
      title: 'Privacy First',
      description:
        'Your data stays private. All processing happens securely without storing your content.',
    },
    {
      icon: <Globe className='h-6 w-6' />,
      title: 'Works Everywhere',
      description:
        'Compatible with Gmail, Slack, Twitter, LinkedIn, and all your favorite websites.',
    },
  ];

  const stats = [
    {
      icon: <Users className='h-5 w-5' />,
      value: '10K+',
      label: 'Active Users',
    },
    {
      icon: <CheckCircle className='h-5 w-5' />,
      value: '1M+',
      label: 'Corrections Made',
    },
    { icon: <Star className='h-5 w-5' />, value: '4.9', label: 'User Rating' },
    {
      icon: <Clock className='h-5 w-5' />,
      value: '<1s',
      label: 'Avg Response',
    },
  ];

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50'>
      {/* Header */}
      <header className='border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 flex items-center justify-center'>
              {/* <Sparkles className='h-6 w-6 text-white' /> */}
              <Image
                src='/logo.png'
                alt='ReWrite Logo'
                width={40}
                height={40}
              />
            </div>
            <span className='text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              ReWrite
            </span>
          </div>
          <Button className='bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'>
            <Chrome className='mr-2 h-4 w-4' />
            Add to Chrome
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className='container mx-auto px-4 py-20 md:py-32'>
        <div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Screenshot/Demo Image - Left Side */}
          <div className='order-2 lg:order-1'>
            <div className='relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200'>
              <Image
                src='/screenshot.jpg'
                alt='ReWrite Chrome Extension in action'
                className='w-full h-auto'
                width={1000}
                height={1000}
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/10 to-transparent'></div>
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className='order-1 lg:order-2 space-y-8'>
            <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200'>
              <Star className='h-3 w-3 mr-1 fill-blue-700' />
              Trusted by 10,000+ users
            </Badge>

            <h1 className='text-5xl md:text-7xl font-bold leading-tight'>
              Write with
              <span className='bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                {' '}
                Confidence
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-slate-600'>
              AI-powered grammar and spelling correction that works everywhere
              you write. Elevate your writing instantly with ReWrite.
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                size='lg'
                className='bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all'
              >
                <Chrome className='mr-2 h-5 w-5' />
                Install Free Extension
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-lg px-8 py-6 border-2'
              >
                Watch Demo
              </Button>
            </div>

            <div className='flex flex-wrap gap-6 pt-4 text-sm text-slate-500'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='h-4 w-4 text-green-600' />
                <span>Free forever</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className='h-4 w-4 text-green-600' />
                <span>No credit card required</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className='h-4 w-4 text-green-600' />
                <span>Install in seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='bg-linear-to-r from-blue-600 to-purple-600 py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center text-white'>
                <div className='flex justify-center mb-2 opacity-90'>
                  {stat.icon}
                </div>
                <div className='text-3xl md:text-4xl font-bold mb-1'>
                  {stat.value}
                </div>
                <div className='text-sm md:text-base opacity-90'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='container mx-auto px-4 py-20 md:py-32'>
        <div className='text-center space-y-4 mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold'>
            Why Choose ReWrite?
          </h2>
          <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
            Experience the future of writing assistance with cutting-edge AI
            technology
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='border-2 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group'
            >
              <CardHeader>
                <div className='w-12 h-12 bg-linear-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                  <div className='text-blue-600'>{feature.icon}</div>
                </div>
                <CardTitle className='text-xl'>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-base'>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className='bg-slate-50 py-20 md:py-32'>
        <div className='container mx-auto px-4'>
          <div className='text-center space-y-4 mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold'>
              Get Started in 3 Simple Steps
            </h2>
          </div>

          <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            {[
              {
                step: '1',
                title: 'Install Extension',
                desc: 'Add ReWrite to Chrome with one click',
              },
              {
                step: '2',
                title: 'Start Writing',
                desc: 'Write anywhere on the web as you normally do',
              },
              {
                step: '3',
                title: 'Get Corrections',
                desc: 'AI automatically fixes errors in real-time',
              },
            ].map((item, index) => (
              <div key={index} className='relative'>
                <div className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full'>
                  <div className='w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg'>
                    {item.step}
                  </div>
                  <h3 className='text-2xl font-bold mb-3'>{item.title}</h3>
                  <p className='text-slate-600 text-lg'>{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className='hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2'>
                    <ArrowRight className='h-8 w-8 text-slate-300' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container mx-auto px-4 py-20 md:py-32'>
        <div className='max-w-4xl mx-auto bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>
            Ready to Transform Your Writing?
          </h2>
          <p className='text-xl mb-8 opacity-90'>
            Join thousands of users who write with confidence using ReWrite
          </p>
          <Button
            size='lg'
            className='bg-white text-blue-600 hover:bg-slate-100 text-lg px-10 py-6 shadow-xl'
          >
            <Chrome className='mr-2 h-5 w-5' />
            Install ReWrite Now - It's Free
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
          <p className='mt-6 text-sm opacity-75'>
            ⭐ Rated 4.9/5 by 10,000+ users • Free forever • No credit card
            required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t bg-white py-12'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
                <Sparkles className='h-5 w-5 text-white' />
              </div>
              <span className='text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                ReWrite
              </span>
            </div>
            <div className='text-slate-600 text-sm'>
              © 2025 ReWrite. All rights reserved.
            </div>
            <div className='flex gap-6 text-sm text-slate-600'>
              <a href='#' className='hover:text-blue-600 transition-colors'>
                Privacy
              </a>
              <a href='#' className='hover:text-blue-600 transition-colors'>
                Terms
              </a>
              <a href='#' className='hover:text-blue-600 transition-colors'>
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;
