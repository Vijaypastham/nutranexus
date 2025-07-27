"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  RefreshCw, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign
} from 'lucide-react';
import { merchantApiService, type Order } from '@/lib/merchant-api-service';
import { formatPrice } from '@/lib/utils';
import MerchantLayout from '@/components/merchant/merchant-layout';
import { useToast } from '@/hooks/use-toast';

interface RefundData {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  refund_amount: number;
  original_amount: number;
  currency: string;
  status: string;
  reason: string;
  created_at: string;
  stripe_refund_id?: string;
}

export default function MerchantRefundsPage() {
  const [refunds, setRefunds] = useState<RefundData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRefund, setSelectedRefund] = useState<RefundData | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const { toast } = useToast();

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'succeeded', label: 'Succeeded' },
    { value: 'failed', label: 'Failed' },
    { value: 'canceled', label: 'Canceled' }
  ];



  useEffect(() => {
    fetchRefunds();
  }, [currentPage, statusFilter]);

  const fetchRefunds = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await merchantApiService.getRefunds({
        page: currentPage,
        limit: 20,
        status: statusFilter
      });

      if (response.success) {
        setRefunds(response.data.refunds);
      } else {
        throw new Error('Failed to fetch refunds');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch refunds');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'succeeded': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'canceled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'succeeded': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'canceled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredRefunds = refunds.filter(refund => 
    searchTerm === '' || 
    refund.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.stripe_refund_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRefundAmount = filteredRefunds.reduce((sum, refund) => sum + refund.refund_amount, 0);

  const exportRefunds = () => {
    const csvContent = [
      ['Order Number', 'Customer Name', 'Customer Email', 'Refund Amount', 'Original Amount', 'Status', 'Reason', 'Date', 'Stripe Refund ID'],
      ...filteredRefunds.map(refund => [
        refund.order_number,
        refund.customer_name,
        refund.customer_email,
        refund.refund_amount,
        refund.original_amount,
        refund.status,
        refund.reason,
        new Date(refund.created_at).toLocaleDateString(),
        refund.stripe_refund_id || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `refunds-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Refunds data has been exported to CSV",
    });
  };

  return (
    <MerchantLayout>
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Refunds</p>
                  <p className="text-2xl font-bold">{filteredRefunds.length}</p>
                </div>
                <RefreshCw className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold">{formatPrice(totalRefundAmount)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold">
                    {filteredRefunds.length > 0 
                      ? Math.round((filteredRefunds.filter(r => r.status === 'succeeded').length / filteredRefunds.length) * 100)
                      : 0}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Refund Management
            </CardTitle>
            <CardDescription>
              View and manage all processed refunds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Refunds</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by order number, customer, or refund ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Label htmlFor="status-filter">Filter by Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={fetchRefunds} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button onClick={exportRefunds} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refunds List */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRefunds.map((refund) => (
              <Card key={refund.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                    {/* Refund Info */}
                    <div className="lg:col-span-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{refund.order_number}</h3>
                        <Badge className={`${getStatusColor(refund.status)} border`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(refund.status)}
                            <span className="capitalize">{refund.status}</span>
                          </span>
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Customer:</strong> {refund.customer_name}</p>
                        <p><strong>Email:</strong> {refund.customer_email}</p>
                        <p><strong>Date:</strong> {new Date(refund.created_at).toLocaleDateString()}</p>
                        {refund.stripe_refund_id && (
                          <p><strong>Stripe ID:</strong> {refund.stripe_refund_id}</p>
                        )}
                      </div>
                    </div>

                    {/* Refund Details */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Refund Details:</h4>
                      <div className="text-sm bg-gray-50 p-3 rounded">
                        <p><strong>Amount:</strong> {formatPrice(refund.refund_amount)}</p>
                        <p><strong>Original:</strong> {formatPrice(refund.original_amount)}</p>
                        <p><strong>Type:</strong> {refund.refund_amount === refund.original_amount ? 'Full' : 'Partial'}</p>
                        <p className="mt-2"><strong>Reason:</strong></p>
                        <p className="text-gray-600">{refund.reason}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">
                          -{formatPrice(refund.refund_amount)}
                        </p>
                        <p className="text-sm text-gray-500">{refund.currency}</p>
                      </div>
                      
                      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedRefund(refund)}
                            className="w-full"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Refund Details</DialogTitle>
                            <DialogDescription>
                              Complete information for refund {selectedRefund?.stripe_refund_id}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedRefund && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Order Number</Label>
                                  <p className="font-medium">{selectedRefund.order_number}</p>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <Badge className={`${getStatusColor(selectedRefund.status)} border inline-flex items-center gap-1 mt-1`}>
                                    {getStatusIcon(selectedRefund.status)}
                                    <span className="capitalize">{selectedRefund.status}</span>
                                  </Badge>
                                </div>
                                <div>
                                  <Label>Customer Name</Label>
                                  <p className="font-medium">{selectedRefund.customer_name}</p>
                                </div>
                                <div>
                                  <Label>Customer Email</Label>
                                  <p className="font-medium">{selectedRefund.customer_email}</p>
                                </div>
                                <div>
                                  <Label>Refund Amount</Label>
                                  <p className="font-medium text-red-600">{formatPrice(selectedRefund.refund_amount)}</p>
                                </div>
                                <div>
                                  <Label>Original Amount</Label>
                                  <p className="font-medium">{formatPrice(selectedRefund.original_amount)}</p>
                                </div>
                                <div>
                                  <Label>Refund Date</Label>
                                  <p className="font-medium">{new Date(selectedRefund.created_at).toLocaleString()}</p>
                                </div>
                                <div>
                                  <Label>Stripe Refund ID</Label>
                                  <p className="font-medium font-mono text-sm">{selectedRefund.stripe_refund_id}</p>
                                </div>
                              </div>
                              <div>
                                <Label>Refund Reason</Label>
                                <p className="mt-1 p-3 bg-gray-50 rounded border">{selectedRefund.reason}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredRefunds.length === 0 && !isLoading && (
              <Card>
                <CardContent className="text-center py-12">
                  <RefreshCw className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No refunds found</h3>
                  <p className="text-gray-500">
                    {searchTerm || (statusFilter && statusFilter !== 'all') ? 'Try adjusting your search or filters' : 'No refunds have been processed yet'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </MerchantLayout>
  );
} 