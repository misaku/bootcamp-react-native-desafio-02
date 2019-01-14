import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

export default StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: colors.lighter,
    flex: 1,
    padding: metrics.basePadding,
  },
  list: {
    marginTop: metrics.baseMargin * 2,
  },
});
