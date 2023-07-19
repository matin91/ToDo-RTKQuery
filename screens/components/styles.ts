import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainHeader: {
    backgroundColor: '#000',
  },
  container: {
    margin: 30,
  },
  header: {
    fontSize: 25,
    color: '#4f4f4f',
  },

  colourKeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },

  colourKey: {
    width: 15,
    height: 15,
    borderColor: 'red',
    borderRadius: 3,
    borderWidth: 2,
  },

  urgent: {
    fontSize: 15,
    marginLeft: 10,
  },

  button: {
    backgroundColor: '#9FB6B1',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 50,
  },

  todoItem: {
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },

  todoNumber: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
  },

  todoNumberContainer: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 5,

    marginRight: 20,
  },

  red: {
    borderColor: 'red',
    borderWidth: 1,
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },

  close: {
    position: 'absolute',
    right: 0,
    top: 0,
  },

  logoContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    marginTop: 10,
  },

  logo: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default styles;
