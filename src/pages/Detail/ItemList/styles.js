import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.basePadding,
    marginBottom: metrics.baseMargin,
    borderRadius: metrics.baseRadius * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginRight: metrics.basePadding,
  },
  boxTitle: {
    flex: 1,
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    color: colors.regular,
    fontSize: 12,
  },
  icon: {
    marginLeft: metrics.basePadding,
    color: colors.light,
  },
});
