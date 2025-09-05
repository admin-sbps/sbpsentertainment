'use client'

import { useState, type SVGProps } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronRightIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  BuildingStorefrontIcon,
  BuildingOffice2Icon,
  UsersIcon,
} from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Home', href: '#hero' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Our Mission', href: '#features' },
  { name: 'Contact', href: '#contact' },
]
const primaryFeatures = [
  {
    name: 'Engaging Entertainment.',
    description: 'We build platforms that make events like the Super Bowl more interactive and fun for everyone involved.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Secure & Reliable.',
    description: 'As the world’s longest-running online squares contest, our technology is battle-tested and dependable.',
    icon: LockClosedIcon,
  },
  {
    name: 'Seamless Experience.',
    description: 'Our sites are designed for ease of use, ensuring that anyone can participate without a steep learning curve.',
    icon: ServerIcon,
  },
]
const secondaryFeatures = [
  {
    name: 'Technology',
    description:
      'We specialize in building robust and scalable web applications that handle high traffic and provide a smooth user experience.',
    href: 'https://superbowlpoolsite.com/about-us',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Entertainment',
    description:
      'Our primary goal is to create products that bring people together, making watch parties and get-togethers more exciting and memorable.',
    href: 'https://superbowlpoolsite.com/how-it-works',
    icon: LockClosedIcon,
  },
  {
    name: 'Community Focus',
    description:
      'We are passionate about building strong communities and believe that our platforms can be a force for good, from friendly contests to charitable fundraising.',
    href: 'https://superbowlpoolsite.com/fundraising',
    icon: CloudArrowUpIcon,
  },
]

// Custom contest showcases
const customContestShowcases = [
  {
    name: 'Local Promotions',
    description: 'Perfect for local bars or restaurants to drive foot traffic with exciting game-day contests.',
    icon: BuildingStorefrontIcon,
    href: '/custom_squares_contest',
  },
  {
    name: 'National Brand Campaigns',
    description: 'Empower franchisees to run branded, location-specific giveaways that feed into a larger campaign.',
    icon: BuildingOffice2Icon,
    href: '/national-chain',
  },
  {
    name: 'Employee Engagement',
    description: 'Foster team spirit and competition in the workplace with fun, branded contests and giveaways.',
    icon: UsersIcon,
    href: '/team-building',
  },
]

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">SBPS Entertainment</span>
<a href="#" className="-m-1.5 p-1.5 flex items-center">
  <span className="sr-only">SBPS Entertainment</span>
  <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
    SBPS
  </span>
</a>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="https://superbowlpoolsite.com" rel="nofollow" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
              Visit SuperBowlPoolSite.com <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">SBPS Entertainment</span>
                <img
                  alt="SBPS Entertainment Logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto dark:hidden"
                />
                <img
                  alt="SBPS Entertainment Logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto not-dark:hidden"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="https://superbowlpoolsite.com"
                    rel="nofollow"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  >
                    Visit SuperBowlPoolSite.com
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main>
        {/* Hero section */}
        <div id="hero" className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.09375rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">Our Flagship Site</span>
                <span aria-hidden="true" className="mx-2 h-4 w-px bg-gray-900/10 dark:bg-white/10" />
                <a href="https://superbowlpoolsite.com" rel="nofollow" className="inline-flex items-center gap-x-1">
                  Visit SuperBowlPoolSite.com
                  <ChevronRightIcon aria-hidden="true" className="-mr-2 size-5 text-gray-400" />
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
                Connecting Communities Through Fun and Technology
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                SBPS Entertainment is a technology company behind sites like SuperBowlPoolSite.com, the world&lsquo;s longest-running website offering free online squares contests. We are dedicated to building fun, engaging, and reliable digital platforms.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="https://superbowlpoolsite.com"
                  rel="nofollow"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  Visit Our Site
                </a>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.09375rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        {/* Solutions section */}
        <div id="solutions" className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Our Custom Contest Solutions</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Tailored platforms for any brand or audience
            </p>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
              From local promotions to large-scale national campaigns, we have a solution to help you connect with your community.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {customContestShowcases.map((showcase) => (
                <div key={showcase.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base/7 font-semibold leading-7 text-gray-900 dark:text-white">
                    <showcase.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-indigo-600 dark:text-indigo-400"
                    />
                    {showcase.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base/7 leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">{showcase.description}</p>
                    <p className="mt-6">
                      <a href={showcase.href} className="text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400">
                        View Demo <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Feature section */}
        <div id="features" className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Our Platforms</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Innovative technology for an engaging experience
            </p>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
              We leverage modern technology stacks to build robust, scalable, and user-friendly platforms that are enjoyed by millions.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {secondaryFeatures.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900 dark:text-white">
                    <feature.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-indigo-600 dark:text-indigo-400"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Newsletter section */}
        <div id="contact" className="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32 dark:bg-gray-800 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-0 dark:after:inset-ring dark:after:inset-ring-white/15 dark:after:sm:rounded-3xl">
            <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Stay up to date with our projects
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-center text-lg text-gray-300">
              Get the latest news and updates from SBPS Entertainment straight to your inbox.
            </p>
            <form className="mx-auto mt-10 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 dark:outline-white/20"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:shadow-none"
              >
                Subscribe
              </button>
            </form>
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2"
            >
              <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient
                  r={1}
                  cx={0}
                  cy={0}
                  id="759c1415-0410-454c-8f7c-9a820de03641"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 sm:mt-56">
        <div className="mx-auto max-w-7xl border-t border-gray-200 px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32 dark:border-white/10">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-sm/6 text-gray-600 md:mt-0 dark:text-gray-400">
              &copy; 2025 SBPS Entertainment, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}