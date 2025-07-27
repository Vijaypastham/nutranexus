"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MerchantHomePage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to login after 3 seconds
    const timer = setTimeout(() => {
      router.push('/merchant/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-[#1b4332] rounded-full">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Merchant Portal</h1>
          <p className="text-gray-600">Access your merchant dashboard</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle>Welcome to Nutra Nexus</CardTitle>
            <CardDescription>
              Merchant Management System
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              <p>Manage orders, process refunds, and view analytics</p>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                asChild 
                className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white"
              >
                <Link href="/merchant/login">
                  Access Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Redirecting automatically in 3 seconds...
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Features:</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Order Management & Status Updates</li>
                <li>• Refund Processing</li>
                <li>• Real-time Analytics</li>
                <li>• Customer Information</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Nutra Nexus Merchant Portal v1.0</p>
          <p>Secure merchant access only</p>
        </div>
      </div>
    </div>
  );
} 