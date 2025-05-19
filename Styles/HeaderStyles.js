import { StyleSheet } from 'react-native';

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    backgroundColor: '#f5f5f5', 
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  }
});

export default headerStyles;
