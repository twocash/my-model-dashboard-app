"use client"
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ModelDashboard = () => {
  const [accountParams, setAccountParams] = useState({
    tier1: 3,
    tier2: 10,
    tier3: 20
  });
  
  const [bhnShare] = useState(0.5); // 50% revenue share

  const baseMetrics = {
    tier1: {
      targetedCustomers: 50000000,
      servedCustomers: 42000000,
      annualImpressions: 1200000000,
      offerActivations: 7800000,
      salesGenerated: 130000000,
      grossRevenue: 3100000
    },
    tier2: {
      targetedCustomers: 50000000,
      servedCustomers: 40000000,
      annualImpressions: 900000000,
      offerActivations: 5700000,
      salesGenerated: 100000000,
      grossRevenue: 1900000
    },
    tier3: {
      targetedCustomers: 50000000,
      servedCustomers: 36000000,
      annualImpressions: 650000000,
      offerActivations: 4100000,
      salesGenerated: 175000000,
      grossRevenue: 1400000
    }
  };

  const calculateMetrics = () => {
    const tier1Metrics = Object.entries(baseMetrics.tier1).reduce((acc, [key, value]) => {
      acc[key] = value * accountParams.tier1;
      return acc;
    }, {});
    
    const tier2Metrics = Object.entries(baseMetrics.tier2).reduce((acc, [key, value]) => {
      acc[key] = value * accountParams.tier2;
      return acc;
    }, {});
    
    const tier3Metrics = Object.entries(baseMetrics.tier3).reduce((acc, [key, value]) => {
      acc[key] = value * accountParams.tier3;
      return acc;
    }, {});

    return [
      {
        name: 'Tier 1',
        accounts: accountParams.tier1,
        bhnShare: tier1Metrics.grossRevenue * bhnShare,
      },
      {
        name: 'Tier 2',
        accounts: accountParams.tier2,
        bhnShare: tier2Metrics.grossRevenue * bhnShare,
      },
      {
        name: 'Tier 3',
        accounts: accountParams.tier3,
        bhnShare: tier3Metrics.grossRevenue * bhnShare,
      }
    ];
  };

  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Business Model Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="tier1" className="block text-sm font-medium mb-1">
                Tier 1 Accounts (0-10): {accountParams.tier1}
              </label>
              <input
                type="range"
                id="tier1"
                min="0"
                max="10"
                value={accountParams.tier1}
                onChange={(e) => setAccountParams({
                  ...accountParams,
                  tier1: parseInt(e.target.value)
                })}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="tier2" className="block text-sm font-medium mb-1">
                Tier 2 Accounts (0-50): {accountParams.tier2}
              </label>
              <input
                type="range"
                id="tier2"
                min="0"
                max="50"
                value={accountParams.tier2}
                onChange={(e) => setAccountParams({
                  ...accountParams,
                  tier2: parseInt(e.target.value)
                })}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="tier3" className="block text-sm font-medium mb-1">
                Tier 3 Accounts (0-100): {accountParams.tier3}
              </label>
              <input
                type="range"
                id="tier3"
                min="0"
                max="100"
                value={accountParams.tier3}
                onChange={(e) => setAccountParams({
                  ...accountParams,
                  tier3: parseInt(e.target.value)
                })}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <BarChart
              width={600}
              height={400}
              data={calculateMetrics()}
              margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={formatCurrency}
                label={{ 
                  value: "Revenue (USD)", 
                  angle: -90, 
                  position: 'insideLeft',
                  offset: -45
                }}
              />
              <Tooltip formatter={formatCurrency} />
              <Legend />
              <Bar dataKey="bhnShare" fill="#3B82F6" name="BHN Share">
                <LabelList 
                  dataKey="bhnShare" 
                  position="top" 
                  formatter={formatCurrency}
                  style={{ fill: '#374151' }}
                />
              </Bar>
            </BarChart>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelDashboard;