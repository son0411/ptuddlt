import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

// Hàm App chính
export default function App() {
  const { width, height } = useWindowDimensions();
  const [isPortrait, setIsPortrait] = useState(height > width);

  // Lắng nghe sự thay đổi của kích thước màn hình
  useEffect(() => {
    const updateLayout = () => {
      const { height, width } = Dimensions.get('window');
      setIsPortrait(height > width);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => {
      subscription?.remove();
    };
  }, []);

  // Kích thước nút bấm và hình ảnh
  const buttonWidth = width / 2;
  const imageWidth = width * 0.8;

  return (
    <>
      {/* Tùy chỉnh thanh trạng thái */}
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={isPortrait ? 'blue' : 'green'}
      />

      {/* KeyboardAvoidingView đảm bảo trường nhập liệu không bị che */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={isPortrait ? styles.portraitContainer : styles.landscapeContainer}>
          {/* Hình ảnh có kích thước thay đổi theo tỷ lệ */}
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={{
              width: imageWidth,
              height: isPortrait ? imageWidth * 0.75 : imageWidth * 0.5,
            }}
          />

          {/* Custom-styled buttons */}
          <TouchableOpacity
            style={[styles.button, { width: buttonWidth }]}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Button 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { width: buttonWidth }]}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Button 2</Text>
          </TouchableOpacity>
        </View>

        {/* Improved TextInput */}
        <TextInput
          style={styles.input}
          placeholder="Enter your text"
          placeholderTextColor="#666" // Custom placeholder color
        />
      </KeyboardAvoidingView>
    </>
  );
}

// Các kiểu dáng
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10, // Rounded corners
    backgroundColor: '#f9f9f9', // Light background color
    paddingHorizontal: 15, // Padding inside the text box
    fontSize: 16, // Text size
    color: '#333', // Text color
    marginVertical: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 3,
  },
  portraitContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  landscapeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
