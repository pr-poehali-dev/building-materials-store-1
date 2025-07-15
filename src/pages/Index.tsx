import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [area, setArea] = useState('');
  const [userType, setUserType] = useState('retail');

  const categories = [
    { name: 'Цемент и смеси', icon: 'Package', count: 156 },
    { name: 'Кирпич и блоки', icon: 'Home', count: 89 },
    { name: 'Инструменты', icon: 'Wrench', count: 234 },
    { name: 'Металлопрокат', icon: 'Zap', count: 67 },
    { name: 'Пиломатериалы', icon: 'TreePine', count: 123 },
    { name: 'Крепеж', icon: 'Settings', count: 345 }
  ];

  const products = [
    {
      id: 1,
      name: 'Цемент М500',
      price: 450,
      discountPrice: userType === 'wholesale' ? 380 : null,
      unit: 'мешок 50кг',
      category: 'Цемент',
      inStock: true,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Кирпич керамический',
      price: 12,
      discountPrice: userType === 'wholesale' ? 10 : null,
      unit: 'шт',
      category: 'Кирпич',
      inStock: true,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Перфоратор BOSCH',
      price: 8500,
      discountPrice: userType === 'wholesale' ? 7650 : null,
      unit: 'шт',
      category: 'Инструменты',
      inStock: false,
      rating: 4.9
    }
  ];

  const calculateMaterials = () => {
    if (!area) return null;
    const areaNum = parseFloat(area);
    return {
      cement: Math.ceil(areaNum * 2.5),
      bricks: Math.ceil(areaNum * 120),
      sand: Math.ceil(areaNum * 0.3)
    };
  };

  const calculation = calculateMaterials();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-[#2C3E50]">СтройМаркет</h1>
              <Badge variant="secondary" className="bg-[#FF6B35] text-white">Профессиональный</Badge>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-[#FF6B35] transition-colors">Главная</a>
              <a href="#" className="text-gray-600 hover:text-[#FF6B35] transition-colors">О компании</a>
              <a href="#" className="text-gray-600 hover:text-[#FF6B35] transition-colors">Каталог</a>
              <a href="#" className="text-gray-600 hover:text-[#FF6B35] transition-colors">Доставка</a>
              <a href="#" className="text-gray-600 hover:text-[#FF6B35] transition-colors">Контакты</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
              <Button size="sm" className="bg-[#FF6B35] hover:bg-[#e55a2b]">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#2C3E50] text-white">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/img/a91db329-460e-4483-b8f6-bb06836a701c.jpg" 
            alt="Warehouse" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-6">Строительные материалы для профессионалов</h2>
            <p className="text-xl mb-8 text-gray-300">
              Качественные материалы, выгодные цены, быстрая доставка. 
              Всё для вашего строительства в одном месте.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" className="bg-[#FF6B35] hover:bg-[#e55a2b]">
                <Icon name="Package" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#2C3E50]">
                <Icon name="Calculator" size={20} className="mr-2" />
                Калькулятор материалов
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selector */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Тип покупателя:</span>
              <Tabs value={userType} onValueChange={setUserType}>
                <TabsList>
                  <TabsTrigger value="retail">Розничный</TabsTrigger>
                  <TabsTrigger value="wholesale">Оптовый</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {userType === 'wholesale' && (
              <Badge className="bg-green-100 text-green-800">
                <Icon name="Percent" size={14} className="mr-1" />
                Скидка до 20%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8 text-[#2C3E50]">Категории товаров</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <Icon name={category.icon as any} size={32} className="mx-auto mb-3 text-[#FF6B35]" />
                  <h4 className="font-semibold text-sm mb-1">{category.name}</h4>
                  <span className="text-xs text-gray-500">{category.count} товаров</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-[#2C3E50]">
                <Icon name="Calculator" size={24} className="mr-2" />
                Калькулятор материалов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Площадь строительства (м²)</label>
                  <Input
                    type="number"
                    placeholder="Введите площадь"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>
                {calculation && (
                  <div className="mt-6 p-4 bg-[#FF6B35] bg-opacity-10 rounded-lg">
                    <h4 className="font-semibold mb-3 text-[#2C3E50]">Расчёт материалов:</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Цемент:</span>
                        <div className="font-semibold">{calculation.cement} мешков</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Кирпич:</span>
                        <div className="font-semibold">{calculation.bricks} шт</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Песок:</span>
                        <div className="font-semibold">{calculation.sand} м³</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8 text-[#2C3E50]">Популярные товары</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                    <img 
                      src="/img/0f9cd94e-04a7-4390-bc5a-1c46827c2f39.jpg" 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Нет в наличии</span>
                      </div>
                    )}
                  </div>
                  <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <div className="flex items-center mb-3">
                    <Icon name="Star" size={16} className="text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {product.discountPrice ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-[#FF6B35]">
                            {product.discountPrice} ₽
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {product.price} ₽
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-[#2C3E50]">
                          {product.price} ₽
                        </span>
                      )}
                      <div className="text-sm text-gray-500">за {product.unit}</div>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]"
                    disabled={!product.inStock}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    {product.inStock ? 'В корзину' : 'Уведомить о поступлении'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-[#2C3E50] text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-[#FF6B35]" />
              <h4 className="font-semibold mb-2">Быстрая доставка</h4>
              <p className="text-gray-300">Доставим материалы в день заказа</p>
            </div>
            <div className="text-center">
              <Icon name="Shield" size={48} className="mx-auto mb-4 text-[#FF6B35]" />
              <h4 className="font-semibold mb-2">Гарантия качества</h4>
              <p className="text-gray-300">Только сертифицированная продукция</p>
            </div>
            <div className="text-center">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-[#FF6B35]" />
              <h4 className="font-semibold mb-2">Консультации</h4>
              <p className="text-gray-300">Помощь в выборе материалов</p>
            </div>
            <div className="text-center">
              <Icon name="Percent" size={48} className="mx-auto mb-4 text-[#FF6B35]" />
              <h4 className="font-semibold mb-2">Оптовые скидки</h4>
              <p className="text-gray-300">Выгодные цены для строителей</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">СтройМаркет</h4>
              <p className="text-gray-400 mb-4">
                Профессиональные строительные материалы для вашего успеха
              </p>
              <div className="flex space-x-4">
                <Icon name="Phone" size={20} className="text-[#FF6B35]" />
                <span>+7 (495) 123-45-67</span>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Каталог</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Цемент и смеси</a></li>
                <li><a href="#" className="hover:text-white">Кирпич и блоки</a></li>
                <li><a href="#" className="hover:text-white">Инструменты</a></li>
                <li><a href="#" className="hover:text-white">Металлопрокат</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Услуги</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Доставка</a></li>
                <li><a href="#" className="hover:text-white">Консультации</a></li>
                <li><a href="#" className="hover:text-white">Проектирование</a></li>
                <li><a href="#" className="hover:text-white">Монтаж</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Icon name="MapPin" size={16} className="mr-2 text-[#FF6B35]" />
                  <span>Москва, ул. Строителей, 1</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-2 text-[#FF6B35]" />
                  <span>info@stroymarket.ru</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" size={16} className="mr-2 text-[#FF6B35]" />
                  <span>Пн-Пт: 8:00-20:00</span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 СтройМаркет. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}