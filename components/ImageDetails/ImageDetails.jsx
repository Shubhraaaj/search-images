import { Image, View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
    container: {
      paddingBottom: 24,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 240,
      height: 120,
      borderColor: 'lightgray',
      borderWidth: 1,
      borderRadius: 4
    },
  });

export default function ImageDetails () {
    const image = useSelector(state => state.image);
    console.log('IMAGE', image);
    return (
        <>
            <View>
                <Image 
                    style={{
                        width: image?.webformatWidth,
                        height: image?.webformatHeight
                    }}
                    source={{
                        uri: image?.webformatURL,
                    }}/>
                <Text>NAME: {image?.user}</Text>
                <Text>TAGS: {image?.tags}</Text>
                <Text>WIDTH: {image?.webformatWidth}px | HEIGHT: {image?.webformatHeight}px</Text>
            </View>
        </>
    );
};