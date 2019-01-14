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
    marginBottom: metrics.baseMargin * 2,
  },
  filter: {
    backgroundColor: colors.light,
    flexDirection: 'row',
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding / 2,
    justifyContent: 'space-evenly',
  },
  ftText: {
    color: colors.regular,
  },
  active: {
    color: colors.dark,
  },
  loading: {

  },
});
