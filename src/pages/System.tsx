import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  MapPin, 
  Thermometer, 
  Camera, 
  Satellite, 
  CloudRain,
  ArrowLeft,
  TrendingUp,
  Activity,
  Shield,
  Zap,
  ChevronDown,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const System = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedMine, setSelectedMine] = useState('Thunder Creek Mine');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
    windSpeed: '',
    soilMoisture: '',
    vibration: ''
  });

  // Mock data for mines
  const mines = [
    { id: '1', name: 'Thunder Creek Mine', location: 'Colorado, USA' },
    { id: '2', name: 'Iron Ridge Quarry', location: 'Montana, USA' },
    { id: '3', name: 'Copper Valley Mine', location: 'Arizona, USA' },
  ];

  // Mock data for zones
  const zones = [
    { id: '1', name: 'Zone A', risk: 'very-high', x: 20, y: 30, temp: 28.5 },
    { id: '2', name: 'Zone B', risk: 'high', x: 45, y: 25, temp: 24.2 },
    { id: '3', name: 'Zone C', risk: 'medium', x: 70, y: 40, temp: 22.1 },
    { id: '4', name: 'Zone D', risk: 'low', x: 35, y: 60, temp: 19.8 },
    { id: '5', name: 'Zone E', risk: 'very-low', x: 65, y: 70, temp: 18.3 },
  ];

  // Mock data for graphs
  const temperatureData = [
    { time: '00:00', value: 22.1 },
    { time: '04:00', value: 21.8 },
    { time: '08:00', value: 24.2 },
    { time: '12:00', value: 28.5 },
    { time: '16:00', value: 26.3 },
    { time: '20:00', value: 23.7 },
  ];

  const vibrationData = [
    { time: '00:00', value: 2.1 },
    { time: '04:00', value: 1.8 },
    { time: '08:00', value: 3.2 },
    { time: '12:00', value: 4.5 },
    { time: '16:00', value: 5.8 },
    { time: '20:00', value: 3.2 },
  ];

  const alerts = [
    {
      id: 1,
      zone: 'Zone A',
      risk: 'Critical',
      message: 'High vibration detected in eastern slope',
      action: 'Evacuate personnel, deploy stabilization barriers',
      time: '2 mins ago'
    },
    {
      id: 2,
      zone: 'Zone B',
      risk: 'High',
      message: 'Unusual weather patterns affecting stability',
      action: 'Increase monitoring frequency, prepare equipment',
      time: '15 mins ago'
    },
    {
      id: 3,
      zone: 'Zone C',
      risk: 'Medium',
      message: 'Soil moisture levels rising after rainfall',
      action: 'Monitor drainage systems, check sensor calibration',
      time: '1 hour ago'
    }
  ];

  // Filter alerts based on selected zone
  const filteredAlerts = selectedZoneFilter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.zone === selectedZoneFilter);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'very-high': return 'bg-risk-very-high';
      case 'high': return 'bg-risk-high';
      case 'medium': return 'bg-risk-medium';
      case 'low': return 'bg-risk-low';
      case 'very-low': return 'bg-risk-very-low';
      default: return 'bg-muted';
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'outline';
      default: return 'secondary';
    }
  };

  const handlePrediction = () => {
    // Mock prediction logic
    alert('Prediction completed! Risk assessment: Medium. Recommended action: Continue monitoring with increased sensor frequency.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-xl font-bold text-foreground">MineGuard AI System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-safety-safe text-safety-safe">
                <Activity className="w-3 h-3 mr-1" />
                System Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Mine Selection */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4">
              <Select value={selectedMine} onValueChange={setSelectedMine}>
                <SelectTrigger className="w-64">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mines.map((mine) => (
                    <SelectItem key={mine.id} value={mine.name}>
                      <div className="flex flex-col">
                        <span className="font-medium">{mine.name}</span>
                        <span className="text-xs text-muted-foreground">{mine.location}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <Label htmlFor="zone-filter" className="text-sm text-muted-foreground">Filter by Zone:</Label>
              <Select value={selectedZoneFilter} onValueChange={setSelectedZoneFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  {zones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.name}>
                      {zone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* First Row: Synthetic Data Prediction | Heat Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Synthetic Data Prediction */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-accent" />
                <span>AI Prediction Engine</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input 
                      id="temperature"
                      type="number"
                      placeholder="25.5"
                      value={formData.temperature}
                      onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="humidity">Humidity (%)</Label>
                    <Input 
                      id="humidity"
                      type="number"
                      placeholder="65"
                      value={formData.humidity}
                      onChange={(e) => setFormData({...formData, humidity: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="windSpeed">Wind Speed (km/h)</Label>
                    <Input 
                      id="windSpeed"
                      type="number"
                      placeholder="15"
                      value={formData.windSpeed}
                      onChange={(e) => setFormData({...formData, windSpeed: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="soilMoisture">Soil Moisture (%)</Label>
                    <Input 
                      id="soilMoisture"
                      type="number"
                      placeholder="30"
                      value={formData.soilMoisture}
                      onChange={(e) => setFormData({...formData, soilMoisture: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="vibration">Vibration Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handlePrediction}
                  className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Run AI Prediction
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Heat Map */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Mine Risk Heat Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-secondary/20 rounded-lg h-96 overflow-hidden">
                {/* Mine map background */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary opacity-50"></div>
                
                {/* Zone markers */}
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className={`absolute w-8 h-8 rounded-full border-2 border-white cursor-pointer transform -translate-x-4 -translate-y-4 ${getRiskColor(zone.risk)} hover:scale-125 transition-all duration-200 ${selectedZoneFilter !== 'all' && selectedZoneFilter !== zone.name ? 'opacity-30' : ''} ${zone.risk === 'very-high' || zone.risk === 'high' ? 'animate-pulse' : ''}`}
                    style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                    onClick={() => setSelectedZone(zone.id)}
                  >
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs font-medium text-foreground whitespace-nowrap bg-card/80 px-2 py-1 rounded border backdrop-blur-sm">
                      {zone.name}
                    </div>
                  </div>
                ))}
                
                {/* Selected zone info */}
                {selectedZone && (
                  <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-4 shadow-lg">
                    {(() => {
                      const zone = zones.find(z => z.id === selectedZone);
                      if (!zone) return null;
                      return (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">{zone.name}</h4>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getRiskColor(zone.risk)}`}></div>
                            <span className="text-sm text-muted-foreground capitalize">{zone.risk.replace('-', ' ')} Risk</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Temperature: {zone.temp}°C
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
              
              {/* Legend */}
              <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-risk-very-high"></div>
                  <span className="text-xs text-muted-foreground">Very High</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-risk-high"></div>
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-risk-medium"></div>
                  <span className="text-xs text-muted-foreground">Medium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-risk-low"></div>
                  <span className="text-xs text-muted-foreground">Low</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-risk-very-low"></div>
                  <span className="text-xs text-muted-foreground">Very Low</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row: Data Graphs | Alert Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Data Graphs */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Real-time Data Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="temperature" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="temperature">Temperature</TabsTrigger>
                  <TabsTrigger value="vibration">Vibration</TabsTrigger>
                </TabsList>
                
                <TabsContent value="temperature" className="mt-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="time" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary))" 
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="vibration" className="mt-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={vibrationData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="time" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--safety-critical))" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--safety-critical))' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Alert Panel */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-safety-critical" />
                <span>Active Alerts</span>
                {selectedZoneFilter !== 'all' && (
                  <Badge variant="outline" className="ml-2">
                    {selectedZoneFilter}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-80 overflow-y-auto">
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No alerts for selected zone</p>
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <Alert key={alert.id} className="border-l-4 border-l-safety-critical">
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant={getRiskBadgeVariant(alert.risk)}>
                            {alert.risk}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <h4 className="font-semibold text-foreground">{alert.zone}</h4>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <div className="bg-secondary/20 p-2 rounded text-xs">
                          <strong>Action:</strong> {alert.action}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Third Row: Data Sources (Full Width) */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Multi-Source Data Integration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dem" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dem" className="flex items-center space-x-1">
                  <Satellite className="w-4 h-4" />
                  <span>DEM</span>
                </TabsTrigger>
                <TabsTrigger value="drone" className="flex items-center space-x-1">
                  <Camera className="w-4 h-4" />
                  <span>Drone</span>
                </TabsTrigger>
                <TabsTrigger value="sensors" className="flex items-center space-x-1">
                  <Thermometer className="w-4 h-4" />
                  <span>IoT</span>
                </TabsTrigger>
                <TabsTrigger value="weather" className="flex items-center space-x-1">
                  <CloudRain className="w-4 h-4" />
                  <span>Weather</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dem" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">1.2m</div>
                      <div className="text-sm text-muted-foreground">Resolution</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">95.8%</div>
                      <div className="text-sm text-muted-foreground">Coverage</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">24/7</div>
                      <div className="text-sm text-muted-foreground">Monitoring</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">Active</div>
                      <div className="text-sm text-muted-foreground">Status</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Digital Elevation Model data provides high-resolution topographic information for slope stability analysis and geological hazard prediction.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="drone" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">4K</div>
                      <div className="text-sm text-muted-foreground">Video Quality</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">12</div>
                      <div className="text-sm text-muted-foreground">Active Drones</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">2.5km</div>
                      <div className="text-sm text-muted-foreground">Range</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">15min</div>
                      <div className="text-sm text-muted-foreground">Update Cycle</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Real-time aerial imagery and thermal data from autonomous drone fleet monitoring all zones continuously for early hazard detection.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="sensors" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">247</div>
                      <div className="text-sm text-muted-foreground">Active Sensors</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">99.2%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">5s</div>
                      <div className="text-sm text-muted-foreground">Data Interval</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">8</div>
                      <div className="text-sm text-muted-foreground">Data Types</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    IoT sensor network monitoring vibrations, soil moisture, temperature, pressure changes, and structural integrity across all zones.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="weather" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">5min</div>
                      <div className="text-sm text-muted-foreground">Update Interval</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">8</div>
                      <div className="text-sm text-muted-foreground">Weather Stations</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">15km</div>
                      <div className="text-sm text-muted-foreground">Coverage Radius</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">7 day</div>
                      <div className="text-sm text-muted-foreground">Forecast</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive weather monitoring including precipitation, wind patterns, atmospheric pressure, and conditions affecting slope stability.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default System;