import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // <--- CHANGE to LineChart

const ScreenWidth = Dimensions.get("window").width;

const PatientRecordChart = ({ data }) => {
  if (!data) {
      return (
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Text style={{ color: 'gray' }}>No Blood Pressure data found.</Text>
          </View>
      );
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
    strokeWidth: 2, 
    decimalPlaces: 0, 
  };

  return (
    <View>
      <LineChart 
        data={data}
        width={ScreenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        fromZero={false} 
      />
    </View>
  );
};

export default PatientRecordChart;