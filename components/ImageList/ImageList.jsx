import React, { useEffect, useRef, useState } from 'react';
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
    const [page, setPage] = useState(1);
    const lastItemRef = useRef();
    const observer = useRef();

    const API_KEY = '3909886-a4b3466f9dc96a8cc1a1256c9';
    const dispatch = useDispatch();

    useEffect(()=>{
        fetchImages('');
    },[]);

    // Infinte
    useEffect(() => {
        const options = {
          root: document,
          rootMargin: "20px",
          threshold: 1
        };
        const callback = (images) => {
            if (images[0].isIntersecting) {
                console.log('last item reached');
                fetchImages(query);
            }
        };
        observer.current = new IntersectionObserver(callback, options);
        if (lastItemRef.current) {
            observer.current.observe(lastItemRef.current);
        }
        return () => {
            observer.current.disconnect();
        };
    });

    const fetchImages = async (text) => {
        let url = `https://pixabay.com/api/?key=${API_KEY}` + (text.length>0?`&q=${text}&page=${page}`:`&page=${page}`) ;
        let response = await fetch(
            url, {
                method: 'GET'
            });
        let json = await response.json();

        if(query===text){
            console.log('add the new elements');
            setImages(images.concat(json.hits));
            setPage(page+1);
        }else{
            console.log('assign new array');
            setImages(json.hits);
            setPage(1);
        }
        setQuery(text);
    };

    const pressed = (item) => {
        dispatch({ type: IMAGE_CHANGE, payload: item });
        navigation.navigate('Details', { name: item.id } )
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

    const textChange = (text) => {
        // setImages([]);
        fetchImages(text);
        // setQuery(text,  fetchImages(text));
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
            {images.length!==0&&<p ref={lastItemRef} style={{textAlign: 'center'}}>Loading images...</p>}
            {images.length===0&&query!==''&&<h2 style={{textAlign: 'center'}}>No images found...</h2>}
        </SafeAreaView>
    );
}