import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Text, FlatList, Pressable } from "react-native";

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

export default function ImageList() {

    const [ images, setImages ] = useState([]);
    
    const API_KEY = '3909886-a4b3466f9dc96a8cc1a1256c9';

    useEffect(()=>{
        fetchImages();
    },[]);

    const fetchImages = async () => {
        let response = await fetch(
            `https://pixabay.com/api/?key=${API_KEY}`, {
                method: 'GET'
            }
        );
        let json = await response.json();
        setImages(json.hits);
    };

    const pressed = (item) => {
        // TODO: Intent to details page
        console.log('press', item);
    };

    const renderItem = ({ item }) => (
        <Pressable
            onPress={()=>pressed(item)}><View
            style={styles.container}>
            <Image
                style={styles.logo}
                source={{
                    uri: item.previewURL,
                }} />
        </View></Pressable>
    );

    return (
        <>
            <FlatList
                style={{
                    paddingTop: 24
                }}
                data={images}
                renderItem={renderItem} 
                keyExtractor={item=>item.id} />
        </>
    );
}