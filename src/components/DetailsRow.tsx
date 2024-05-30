import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string;
  value: string;
  color?: string;
};

const DetailsRow: React.FC<Props> = ({title, value, color}) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.title, {color}]}>{title}</Text>
      <Text style={[styles.value, {color}]}>{value}</Text>
    </View>
  );
};

export default DetailsRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
});
