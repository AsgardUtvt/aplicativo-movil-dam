import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  borderColor?:   string;
  color?:         string;
  onPress:        () => void;
  title:          string;
  width: number;
}

export const BtnTouch = ( { title, color = 'blue', borderColor = 'black', onPress, width = 190 } : Props ) => {
  return(
    <TouchableOpacity
      onPress={ () => onPress() }
    >
      <View
        style={{
          ...style.btnContainer,
          backgroundColor: color,
          borderColor: borderColor,
          width: width
        }}
      >
          <Text
            style={ style.text }
          >
            { title }
          </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  btnContainer: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    width: 190,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 5
  }
});
