// // src/components/SearchBar.js
// import React, { useState, useRef } from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Keyboard,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import * as Animatable from 'react-native-animatable';

// const SearchBar = ({ onSearch }) => {
//   const [searchText, setSearchText] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const animatedWidth = useRef(new Animated.Value(0)).current;

//   const handleFocus = () => {
//     setIsFocused(true);
//     Animated.timing(animatedWidth, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   const handleBlur = () => {
//     if (!searchText) {
//       setIsFocused(false);
//       Animated.timing(animatedWidth, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: false,
//       }).start();
//     }
//   };

//   const handleSearch = () => {
//     if (searchText.trim()) {
//       onSearch(searchText.trim());
//       setSearchText('');
//       Keyboard.dismiss();
//     }
//   };

//   const handleClear = () => {
//     setSearchText('');
//     setIsFocused(false);
//     Animated.timing(animatedWidth, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//     Keyboard.dismiss();
//   };

//   const searchBarWidth = animatedWidth.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['85%', '100%'],
//   });

//   return (
//     <Animatable.View
//       animation="fadeInDown"
//       duration={800}
//       style={styles.container}
//     >
//       <Animated.View style={[styles.searchContainer, { width: searchBarWidth }]}>
//         <Icon name="search" size={20} color="rgba(255, 255, 255, 0.8)" />
//         <TextInput
//           style={styles.input}
//           placeholder="Search city..."
//           placeholderTextColor="rgba(255, 255, 255, 0.6)"
//           value={searchText}
//           onChangeText={setSearchText}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           onSubmitEditing={handleSearch}
//           returnKeyType="search"
//         />
//         {searchText !== '' && (
//           <TouchableOpacity onPress={handleClear}>
//             <Icon name="x" size={20} color="rgba(255, 255, 255, 0.8)" />
//           </TouchableOpacity>
//         )}
//       </Animated.View>
      
//       {!isFocused && (
//         <Animatable.View animation="fadeIn" duration={300}>
//           <TouchableOpacity onPress={() => {}} style={styles.menuButton}>
//             <Icon name="menu" size={24} color="#FFF" />
//           </TouchableOpacity>
//         </Animatable.View>
//       )}
//     </Animatable.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     height: 45,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 10,
//     color: '#FFF',
//     fontSize: 16,
//   },
//   menuButton: {
//     marginLeft: 15,
//     padding: 5,
//   },
// });

// export default SearchBar;
















// src/components/SearchBar.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText.trim());
      setSearchText('');
      Keyboard.dismiss();
    }
  };

  return (
    <Animatable.View 
      animation="fadeInDown" 
      duration={800}
      style={styles.container}
    >
      <View style={[styles.searchContainer, isFocused && styles.searchContainerFocused]}>
        <Icon 
          name="search" 
          size={20} 
          color={isFocused ? '#FFF' : 'rgba(255, 255, 255, 0.6)'} 
          style={styles.searchIcon} 
        />
        
        <TextInput
          style={styles.input}
          placeholder="Search any city..."
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="search"
        />
        
        {searchText.length > 0 && (
          <TouchableOpacity 
            onPress={() => setSearchText('')}
            style={styles.clearButton}
          >
            <Icon name="x" size={18} color="rgba(255, 255, 255, 0.6)" />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          onPress={handleSearch}
          style={styles.searchButton}
          activeOpacity={0.7}
        >
          <View style={styles.searchButtonInner}>
            <Icon name="arrow-right" size={18} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchContainerFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
  clearButton: {
    padding: 8,
    marginRight: 8,
  },
  searchButton: {
    marginLeft: 8,
  },
  searchButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default SearchBar;