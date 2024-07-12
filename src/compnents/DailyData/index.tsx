import React from 'react';
import { Dimensions, View } from 'react-native';

interface props {
  dayData: string[];
  tempData: any;
}

const { width } = Dimensions.get('screen');

import { LineChart } from 'react-native-chart-kit';

const DailyData: React.FC<props> = ({ dayData, tempData }) => {
  return (
    <View style={{ marginHorizontal: 'auto' }}>
      <LineChart
        data={{
          labels: dayData,
          datasets: [
            {
              data: tempData,
            },
          ],
        }}
        width={width - 40}
        height={115}
        withInnerLines={false}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#252525',
          backgroundGradientFrom: '#252525',
          backgroundGradientTo: '#252525',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(230, 230, 230, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(230, 230, 230, ${opacity})`,
          style: {
            borderRadius: 25,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#252525',
          },
        }}
        bezier
        style={{
          borderRadius: 25,
          alignSelf: 'center',
          paddingBottom: 25,
        }}
        onDataPointClick={data => console.log(data)}
      />
    </View>
  );
};

export default DailyData;
