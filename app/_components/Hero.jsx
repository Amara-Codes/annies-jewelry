import Image from 'next/image';
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from '../sessionValidator';

const Hero = () => {
  const session = useSession(); 
  const user = session?.user;

  return (
    <section>
    <div className="w-full">
      <div className="relative h-80 sm:h-96 lg:h-[600px]">
        <Image
          alt="doctor-image"
          src="/doctors.jpg"
          height={600}
          width={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Semi-transparent overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 py-6 sm:px-8 sm:py-12">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
             Annie's Jewelry 
            </h2>
            <p className="text-lg sm:text-xl mb-8">
              Craft Jewelry in Siem Reap
            </p>
            <Button className="mt-10">
              <Link href="/explore">Book your appointment now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default Hero ;