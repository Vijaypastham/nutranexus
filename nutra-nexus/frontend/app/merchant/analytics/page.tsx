"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Package, 
  Users,
  Calendar,
  Download,
  AlertCircle,
  Eye,
  ShoppingCart,
  RefreshCw
} from 'lucide-react';
import { merchantApiService, type OrderStatsResponse } from '@/lib/merchant-api-service';
import { formatPrice } from '@/lib/utils';
import MerchantLayout from '@/components/merchant/merchant-layout';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  orders: {
    current: number;
    previous: number;
    growth: number;
  };
  averageOrderValue: {
    current: number;
    previous: number;
    growth: number;
  };
  conversionRate: {
    current: number;
    previous: number;
    growth: number;
  };
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
    percentage: number;
  }>;
  revenueByDay: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
  ordersByStatus: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
  customerMetrics: {
    newCustomers: number;
    returningCustomers: number;
    totalCustomers: number;
  };
}

export default function MerchantAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('7days');
  const [activeTab, setActiveTab] = useState('overview');

  const { toast } = useToast();

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '1year', label: 'Last Year' }
  ];



  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await merchantApiService.getAnalytics(dateRange);

      if (response.success) {
        setAnalytics(response.data);
      } else {
        throw new Error('Failed to fetch analytics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const exportAnalytics = () => {
    if (!analytics) return;

    const csvContent = [
      ['Metric', 'Current Period', 'Previous Period', 'Growth %'],
      ['Revenue', analytics.revenue.current, analytics.revenue.previous, analytics.revenue.growth],
      ['Orders', analytics.orders.current, analytics.orders.previous, analytics.orders.growth],
      ['Average Order Value', analytics.averageOrderValue.current, analytics.averageOrderValue.previous, analytics.averageOrderValue.growth],
      ['Conversion Rate', analytics.conversionRate.current, analytics.conversionRate.previous, analytics.conversionRate.growth],
      [],
      ['Top Products', 'Sales Count', 'Revenue', 'Percentage'],
      ...analytics.topProducts.map(product => [product.name, product.sales, product.revenue, product.percentage])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Analytics data has been exported to CSV",
    });
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4" />;
    if (growth < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  if (isLoading) {
    return (
      <MerchantLayout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MerchantLayout>
    );
  }

  if (error) {
    return (
      <MerchantLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </MerchantLayout>
    );
  }

  if (!analytics) {
    return (
      <MerchantLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">No analytics data available</p>
        </div>
      </MerchantLayout>
    );
  }

  return (
    <MerchantLayout>
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Detailed business insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={fetchAnalytics} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={exportAnalytics} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold">{formatPrice(analytics.revenue.current)}</p>
                  <div className={`flex items-center gap-1 text-sm ${getGrowthColor(analytics.revenue.growth)}`}>
                    {getGrowthIcon(analytics.revenue.growth)}
                    <span>{analytics.revenue.growth > 0 ? '+' : ''}{analytics.revenue.growth.toFixed(1)}%</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Orders</p>
                  <p className="text-2xl font-bold">{analytics.orders.current}</p>
                  <div className={`flex items-center gap-1 text-sm ${getGrowthColor(analytics.orders.growth)}`}>
                    {getGrowthIcon(analytics.orders.growth)}
                    <span>{analytics.orders.growth > 0 ? '+' : ''}{analytics.orders.growth.toFixed(1)}%</span>
                  </div>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold">{formatPrice(analytics.averageOrderValue.current)}</p>
                  <div className={`flex items-center gap-1 text-sm ${getGrowthColor(analytics.averageOrderValue.growth)}`}>
                    {getGrowthIcon(analytics.averageOrderValue.growth)}
                    <span>{analytics.averageOrderValue.growth > 0 ? '+' : ''}{analytics.averageOrderValue.growth.toFixed(1)}%</span>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">{analytics.conversionRate.current.toFixed(1)}%</p>
                  <div className={`flex items-center gap-1 text-sm ${getGrowthColor(analytics.conversionRate.growth)}`}>
                    {getGrowthIcon(analytics.conversionRate.growth)}
                    <span>{analytics.conversionRate.growth > 0 ? '+' : ''}{analytics.conversionRate.growth.toFixed(1)}%</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Daily revenue for the selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.revenueByDay.map((day, index) => (
                      <div key={day.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{new Date(day.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">{day.orders} orders</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(day.revenue)}</p>
                          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ 
                                width: `${(day.revenue / Math.max(...analytics.revenueByDay.map(d => d.revenue))) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Status Distribution</CardTitle>
                  <CardDescription>Breakdown of orders by current status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.ordersByStatus.map((status) => (
                      <div key={status.status} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            status.status === 'pending' ? 'bg-yellow-500' :
                            status.status === 'confirmed' ? 'bg-blue-500' :
                            status.status === 'processing' ? 'bg-purple-500' :
                            status.status === 'shipped' ? 'bg-indigo-500' :
                            status.status === 'delivered' ? 'bg-green-500' :
                            'bg-red-500'
                          }`}></div>
                          <span className="capitalize font-medium">{status.status}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">{status.count} orders</span>
                          <span className="font-semibold">{status.percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best performing products by sales and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(product.revenue)}</p>
                        <p className="text-sm text-gray-600">{product.percentage.toFixed(1)}% of revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold">{analytics.orders.current}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                      <p className="text-2xl font-bold">
                        {analytics.ordersByStatus.find(s => s.status === 'delivered')?.count || 0}
                      </p>
                    </div>
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                      <p className="text-2xl font-bold">
                        {((analytics.ordersByStatus.find(s => s.status === 'delivered')?.count || 0) / analytics.orders.current * 100).toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Customers</p>
                      <p className="text-2xl font-bold">{analytics.customerMetrics.totalCustomers}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New Customers</p>
                      <p className="text-2xl font-bold">{analytics.customerMetrics.newCustomers}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Returning Customers</p>
                      <p className="text-2xl font-bold">{analytics.customerMetrics.returningCustomers}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
                <CardDescription>Customer behavior and retention metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Customer Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>New Customers</span>
                        <span className="font-medium">
                          {((analytics.customerMetrics.newCustomers / analytics.customerMetrics.totalCustomers) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Returning Customers</span>
                        <span className="font-medium">
                          {((analytics.customerMetrics.returningCustomers / analytics.customerMetrics.totalCustomers) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Key Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Customer Lifetime Value</span>
                        <span className="font-medium">{formatPrice(analytics.revenue.current / analytics.customerMetrics.totalCustomers)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Orders per Customer</span>
                        <span className="font-medium">{(analytics.orders.current / analytics.customerMetrics.totalCustomers).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MerchantLayout>
  );
} 