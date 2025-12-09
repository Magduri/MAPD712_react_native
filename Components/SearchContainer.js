import { Feather } from '@expo/vector-icons';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
//import Feather from '@react-native-vector-icons/feather';

const SearchContainer = ({ value, onChangeText, onClear }) => {
    //const [searchPatient, setSearchPatient] = React.useState('');

    return (


        <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
                style={styles.searchBar}
                placeholder="Search patient by name..."
                value={value}
                onChangeText={onChangeText}
            />
            {/* Clear button if text exists */}
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onClear()}>
                    <Feather name="x" size={20} color="#666" />
                </TouchableOpacity>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
     searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});
export default SearchContainer;