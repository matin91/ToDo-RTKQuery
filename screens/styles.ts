import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    flex: 1,
    justifyContent: 'center',
  },

  add: {
    marginBottom: 10,
    fontSize: 20,
  },

  label: {
    fontWeight: '700',
    marginBottom: 10,
  },
  title: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 15,
    marginBottom: 20,
  },

  body: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 15,
    height: 200,
  },

  checkbox: {
    marginTop: 10,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  urgentText: {
    marginTop: 10,
    fontSize: 15,
  },

  submit: {
    backgroundColor: '#9FB6B1',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 50,
  },

  back: {
    alignItems: 'flex-start',
  },
});

export default styles;
