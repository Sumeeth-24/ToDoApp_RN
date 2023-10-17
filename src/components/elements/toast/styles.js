import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderColor: '#00000029',
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {fontWeight: '600', paddingLeft: 10, color: '#000', fontSize: 15},
});

export default styles;
