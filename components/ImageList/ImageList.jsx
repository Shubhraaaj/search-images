import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Text, FlatList, Pressable, SafeAreaView } from "react-native";
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux'
import { IMAGE_CHANGE } from '../../redux/constants';

const styles = StyleSheet.create({
    container: {
      paddingBottom: 24,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: '80vw',
      height: '40vh',
      borderColor: 'lightgray',
      borderWidth: 1,
      borderRadius: 4,
      margin: 'auto'
    },
  });

export default function ImageList({ navigation }) {

    const [ images, setImages ] = useState([]);
    const [query, setQuery] = useState("");
    
    const [loading, setLoading] = useState(false);
    const lastItemRef = useRef();
    const observer = useRef();

    const API_KEY = '3909886-a4b3466f9dc96a8cc1a1256c9';
    const dispatch = useDispatch();

    useEffect(()=>{
        fetchImages();
    },[]);

    const fetchImages = async () => {
        let url = `https://pixabay.com/api/?key=${API_KEY}` + (query.length>0?`&q=${query}`:``) ;
        let response = await fetch(
            url, {
                method: 'GET'
            });
        let json = await response.json();
        setImages(json.hits);
    };

    const pressed = (item) => {
        // TODO: Intent to details page
        dispatch({ type: IMAGE_CHANGE, payload: item });
        navigation.navigate('Details', { name: item.id } )
        // console.log('press', item);
    };

    const renderItem = ({ item }) => (
        <Pressable
            onPress={()=>pressed(item)}>
                <View
                    style={styles.container}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: item.previewURL,
                        }} />
                </View>
        </Pressable>
    );

    useEffect(()=>{
        fetchImages();
    },[query]);

    const textChange = (text) => {
        setQuery(text);
    };

    return (
        <SafeAreaView>
            <SearchBar onTextChange={textChange} />
            <FlatList
                style={{
                    paddingTop: 24,
                }}
                data={images}
                renderItem={renderItem} 
                keyExtractor={item=>item.id} />
        </SafeAreaView>
    );
}