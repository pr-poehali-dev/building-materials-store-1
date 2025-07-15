import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product1C {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  barcode?: string;
  description?: string;
  manufacturer?: string;
  lastUpdated: string;
}

interface LoadStats {
  total: number;
  loaded: number;
  errors: number;
  startTime: Date;
}

export default function ProductLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product1C[]>([]);
  const [stats, setStats] = useState<LoadStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  // Симуляция загрузки данных из 1С
  const simulateProductLoad = async (): Promise<Product1C[]> => {
    // В реальном проекте здесь будет API вызов к 1С
    const sampleProducts: Product1C[] = [
      {
        id: '1C_001',
        name: 'Цемент портландский М500 Д0',
        price: 450,
        quantity: 156,
        unit: 'мешок 50кг',
        category: 'Цемент и вяжущие',
        barcode: '4607146680014',
        manufacturer: 'ЦементНовороссийск',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '1C_002',
        name: 'Кирпич керамический одинарный М150',
        price: 12.50,
        quantity: 2500,
        unit: 'шт',
        category: 'Кирпич и камень',
        barcode: '4607146680021',
        manufacturer: 'КирпичЗавод',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '1C_003',
        name: 'Перфоратор BOSCH GBH 2-28 DV',
        price: 8500,
        quantity: 5,
        unit: 'шт',
        category: 'Электроинструмент',
        barcode: '3165140347273',
        manufacturer: 'BOSCH',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '1C_004',
        name: 'Арматура A500C диаметр 12мм',
        price: 65000,
        quantity: 12,
        unit: 'тонна',
        category: 'Металлопрокат',
        barcode: '4607146680038',
        manufacturer: 'МеталлТорг',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '1C_005',
        name: 'Доска обрезная 40х150х6000 сосна',
        price: 850,
        quantity: 45,
        unit: 'шт',
        category: 'Пиломатериалы',
        barcode: '4607146680045',
        manufacturer: 'ЛесПром',
        lastUpdated: new Date().toISOString()
      }
    ];

    // Симуляция задержки загрузки
    await new Promise(resolve => setTimeout(resolve, 1500));
    return sampleProducts;
  };

  const loadProductsFrom1C = async () => {
    setIsLoading(true);
    setError(null);
    
    const startTime = new Date();
    setStats({ total: 0, loaded: 0, errors: 0, startTime });

    try {
      // Симуляция получения данных
      const loadedProducts = await simulateProductLoad();
      
      setProducts(loadedProducts);
      setStats({
        total: loadedProducts.length,
        loaded: loadedProducts.length,
        errors: 0,
        startTime
      });
      setLastSync(new Date());
      
    } catch (err) {
      setError('Ошибка при загрузке данных из 1С. Проверьте подключение к серверу.');
      setStats(prev => prev ? { ...prev, errors: prev.errors + 1 } : null);
    } finally {
      setIsLoading(false);
    }
  };

  // Автообновление каждые 30 минут
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        loadProductsFrom1C();
      }
    }, 30 * 60 * 1000); // 30 минут

    return () => clearInterval(interval);
  }, [isLoading]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { status: 'Нет в наличии', color: 'destructive' };
    if (quantity < 10) return { status: 'Мало в наличии', color: 'secondary' };
    return { status: 'В наличии', color: 'default' };
  };

  return (
    <div className="space-y-6">
      {/* Управление загрузкой */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Icon name="Database" size={24} className="mr-2 text-[#FF6B35]" />
            Интеграция с 1С
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="space-x-4">
              <Button 
                onClick={loadProductsFrom1C}
                disabled={isLoading}
                className="bg-[#FF6B35] hover:bg-[#e55a2b]"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Загрузка...
                  </>
                ) : (
                  <>
                    <Icon name="Download" size={16} className="mr-2" />
                    Загрузить из 1С
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки подключения
              </Button>
            </div>
            {lastSync && (
              <div className="text-sm text-gray-500">
                Последняя синхронизация: {lastSync.toLocaleString('ru-RU')}
              </div>
            )}
          </div>

          {/* Прогресс загрузки */}
          {stats && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Загружено товаров: {stats.loaded} из {stats.total}</span>
                <span>{stats.errors > 0 && `Ошибок: ${stats.errors}`}</span>
              </div>
              <Progress 
                value={stats.total > 0 ? (stats.loaded / stats.total) * 100 : 0} 
                className="h-2"
              />
            </div>
          )}

          {/* Ошибки */}
          {error && (
            <Alert className="mt-4">
              <Icon name="AlertCircle" size={16} />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Список загруженных товаров */}
      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Товары из 1С ({products.length})</span>
              <Badge className="bg-green-100 text-green-800">
                <Icon name="CheckCircle" size={14} className="mr-1" />
                Синхронизировано
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => {
                const stockStatus = getStockStatus(product.quantity);
                return (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{product.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Цена:</span>
                            <div className="text-[#FF6B35] font-bold">
                              {formatPrice(product.price)}
                            </div>
                            <div className="text-xs">за {product.unit}</div>
                          </div>
                          
                          <div>
                            <span className="font-medium">Остаток:</span>
                            <div className="font-semibold">{product.quantity} {product.unit}</div>
                            <Badge 
                              variant={stockStatus.color as any}
                              className="text-xs mt-1"
                            >
                              {stockStatus.status}
                            </Badge>
                          </div>
                          
                          {product.barcode && (
                            <div>
                              <span className="font-medium">Штрихкод:</span>
                              <div className="font-mono text-xs">{product.barcode}</div>
                            </div>
                          )}
                          
                          {product.manufacturer && (
                            <div>
                              <span className="font-medium">Производитель:</span>
                              <div className="text-xs">{product.manufacturer}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Icon name="Edit" size={14} className="mr-1" />
                          Редактировать
                        </Button>
                        <Button size="sm" className="bg-[#FF6B35] hover:bg-[#e55a2b]">
                          <Icon name="Eye" size={14} className="mr-1" />
                          Просмотр
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* API документация */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Icon name="Code" size={24} className="mr-2 text-[#2C3E50]" />
            API для интеграции с 1С
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h5 className="font-semibold mb-2">Эндпоинты для синхронизации:</h5>
              <div className="bg-gray-100 p-3 rounded font-mono text-xs space-y-1">
                <div><span className="text-green-600">GET</span> /api/1c/products - Получить все товары</div>
                <div><span className="text-blue-600">POST</span> /api/1c/products/sync - Синхронизировать товары</div>
                <div><span className="text-orange-600">PUT</span> /api/1c/products/stock - Обновить остатки</div>
                <div><span className="text-purple-600">GET</span> /api/1c/categories - Получить категории</div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h5 className="font-semibold mb-2">Формат данных 1С:</h5>
              <div className="bg-gray-100 p-3 rounded font-mono text-xs">
                <pre>{`{
  "id": "1C_001",
  "name": "Название товара",
  "price": 450.00,
  "quantity": 156,
  "unit": "шт",
  "category": "Категория",
  "barcode": "штрихкод",
  "manufacturer": "Производитель"
}`}</pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}