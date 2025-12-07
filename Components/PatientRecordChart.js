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
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Default color
    strokeWidth: 2, // Make the lines a bit thicker
    decimalPlaces: 0, // No decimals (BP is always whole numbers)
  };

  return (
    <View>
      <LineChart 
        data={data}
        width={ScreenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        fromZero={false} // Blood Pressure can be low, so don't force zero baseline
      />
    </View>
  );
};

export default PatientRecordChart;