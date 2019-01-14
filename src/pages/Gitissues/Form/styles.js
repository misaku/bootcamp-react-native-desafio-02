import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 40,
    width: 40,
    justifyContent: 'center',
    marginLeft: 10,
  },
  icon: {
    color: colors.regular,
  },
  container: {
    alignContent: 'center',
    backgroundColor: colors.lighter,
    flex: 1,
    padding: metrics.basePadding,
  },
  error: {
    color: colors.danger,
    marginTop: metrics.baseMargin,
    textAlign: 'center',
  },
  form: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: metrics.basePadding,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 40,
    paddingHorizontal: metrics.basePadding,
  },
});
