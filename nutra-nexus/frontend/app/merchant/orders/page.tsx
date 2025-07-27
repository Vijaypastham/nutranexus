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
import { Textarea } from '@/components/ui/textarea';
import { 
  Package, 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  Edit3, 
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { merchantApiService, type Order, type OrdersResponse } from '@/lib/merchant-api-service';
import { formatPrice } from '@/lib/utils';
import MerchantLayout from '@/components/merchant/merchant-layout';
import { useToast } from '@/hooks/use-toast';

export default function MerchantOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    trackingNumber: ''
  });
  const [refundData, setRefundData] = useState({
    amount: '',
    reason: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const { toast } = useToast();

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params: any = {
        page: currentPage,
        limit: 10
      };
      
      if (statusFilter && statusFilter !== 'all') {
        params.status = statusFilter;
      }

      const response = await merchantApiService.getOrders(params);
      setOrders(response.data.orders);
      setHasMore(response.data.pagination.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = orders.filter(order => 
    searchTerm === '' || 
    order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = async () => {
    if (!selectedOrder || !statusUpdate.status) {
      toast({
        title: "Error",
        description: "Please select a status",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUpdating(true);
      await merchantApiService.updateOrderStatus(
        selectedOrder.order_number,
        statusUpdate.status,
        statusUpdate.trackingNumber || undefined
      );

      toast({
        title: "Success!",
        description: `Order ${selectedOrder.order_number} updated successfully`,
      });

      setIsStatusDialogOpen(false);
      setStatusUpdate({ status: '', trackingNumber: '' });
      fetchOrders(); // Refresh orders
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update order status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRefund = async () => {
    if (!selectedOrder) return;

    try {
      setIsUpdating(true);
      const amount = refundData.amount ? parseFloat(refundData.amount) : undefined;
      
      await merchantApiService.processRefund(
        selectedOrder.order_number,
        amount,
        refundData.reason || undefined
      );

      toast({
        title: "Refund Processed!",
        description: `Refund initiated for order ${selectedOrder.order_number}`,
      });

      setIsRefundDialogOpen(false);
      setRefundData({ amount: '', reason: '' });
      fetchOrders(); // Refresh orders
    } catch (err) {
      toast({
        title: "Refund Failed",
        description: err instanceof Error ? err.message : "Failed to process refund",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <MerchantLayout>
      <div className="space-y-6">
        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Management
            </CardTitle>
            <CardDescription>
              Search, filter, and manage customer orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Orders</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by order number, customer name, or email..."
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
              <div className="flex items-end">
                <Button onClick={fetchOrders} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
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
            {filteredOrders.map((order) => (
              <Card key={order.order_number} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                    {/* Order Info */}
                    <div className="lg:col-span-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{order.order_number}</h3>
                        <Badge className={`${getStatusColor(order.status)} border`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </span>
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Customer:</strong> {order.customer_name}</p>
                        <p><strong>Email:</strong> {order.customer_email}</p>
                        <p><strong>Phone:</strong> {order.customer_phone}</p>
                        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                        {order.tracking_number && (
                          <p><strong>Tracking:</strong> {order.tracking_number}</p>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Items:</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                            <p className="font-medium">{item.name}</p>
                            {item.flavor && <p className="text-gray-600">Flavor: {item.flavor}</p>}
                            <p className="text-gray-600">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#1b4332]">
                          {formatPrice(parseFloat(order.total_amount))}
                        </p>
                        <p className="text-sm text-gray-500">{order.currency}</p>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedOrder(order);
                                setStatusUpdate({ status: order.status, trackingNumber: order.tracking_number || '' });
                              }}
                            >
                              <Edit3 className="h-4 w-4 mr-1" />
                              Update Status
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Order Status</DialogTitle>
                              <DialogDescription>
                                Update the status and tracking information for order {selectedOrder?.order_number}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={statusUpdate.status} onValueChange={(value) => setStatusUpdate(prev => ({ ...prev, status: value }))}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {statusOptions.slice(1).map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="tracking">Tracking Number (Optional)</Label>
                                <Input
                                  id="tracking"
                                  value={statusUpdate.trackingNumber}
                                  onChange={(e) => setStatusUpdate(prev => ({ ...prev, trackingNumber: e.target.value }))}
                                  placeholder="Enter tracking number"
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleStatusUpdate} disabled={isUpdating}>
                                  {isUpdating ? 'Updating...' : 'Update Status'}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {order.status !== 'cancelled' && order.stripe_payment_intent_id && (
                          <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setRefundData({ amount: '', reason: '' });
                                }}
                              >
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Refund
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Process Refund</DialogTitle>
                                <DialogDescription>
                                  Process a refund for order {selectedOrder?.order_number}. 
                                  Leave amount empty for full refund.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="refund-amount">Refund Amount (Optional)</Label>
                                  <Input
                                    id="refund-amount"
                                    type="number"
                                    step="0.01"
                                    value={refundData.amount}
                                    onChange={(e) => setRefundData(prev => ({ ...prev, amount: e.target.value }))}
                                    placeholder={`Full amount: ${selectedOrder ? formatPrice(parseFloat(selectedOrder.total_amount)) : ''}`}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="refund-reason">Reason (Optional)</Label>
                                  <Textarea
                                    id="refund-reason"
                                    value={refundData.reason}
                                    onChange={(e) => setRefundData(prev => ({ ...prev, reason: e.target.value }))}
                                    placeholder="Enter reason for refund"
                                    rows={3}
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" onClick={() => setIsRefundDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleRefund} disabled={isUpdating} variant="destructive">
                                    {isUpdating ? 'Processing...' : 'Process Refund'}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredOrders.length === 0 && !isLoading && (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                                  <p className="text-gray-500">
                  {searchTerm || (statusFilter && statusFilter !== 'all') ? 'Try adjusting your search or filters' : 'No orders have been placed yet'}
                </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Pagination */}
        {(currentPage > 1 || hasMore) && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-gray-600">
              Page {currentPage}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={!hasMore || isLoading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </MerchantLayout>
  );
} 