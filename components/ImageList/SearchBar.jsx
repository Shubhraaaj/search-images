import React, { useEffect, useState } from "react";
import { SafeAreaView, TextInput, StyleSheet, Button, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_CHANGE } from "../../redux/constants";

// const styles = StyleSheet.create({
//     input: {
//       height: 40,
//       marginTop: 24,
//       borderWidth: 1,
//       padding: 10,
//       borderColor: 'gray',
//       borderRadius: 4,
//       width: 80,
//       margin: 'auto'
//     },
//     button: {
//         width: 100
//     }
// });

const newImage = {
    'collections': 349,
    'comments': 36,
    'downloads': 11314,
    'id': 7127630,
    'imageHeight': 3530,
    'imageSize': 3355691,
    'imageWidth': 5295,
    'largeImageURL': "https://pixabay.com/get/ga5aaf1971da689cb03f0fd4be7e772fbb12da7cc1066f0dc31dba44c97873b683bde6ac49cf813398e5f50105973a44bd0a84a0378f0c41790d2a7f09a79c86b_1280.jpg",
    'likes': 80,
    'pageURL': "https://pixabay.com/photos/bird-warbling-white-eye-ornithology-7127630/",
    'previewHeight': 100,
    'previewURL': "https://cdn.pixabay.com/photo/2022/04/12/09/03/bird-7127630_150.jpg",
    'previewWidth': 150,
    'tags': "bird, warbling white-eye, ornithology",
    'type': "photo",
    'user': "Johnnys_pic",
    'userImageURL': "https://cdn.pixabay.com/user/2022/04/04/09-57-39-842_250x250.jpeg",
    'user_id': 21062476,
    'views': 14145,
    'webformatHeight': 427,
    'webformatURL': "https://pixabay.com/get/g024fd858d7b9f1636f36d300db5945d13e7bc6a10b7dd6570b2fae55691ae17aef8304eb0e8b788e031c0a219d52ce46_640.jpg",
    'webformatWidth': 640,
};

export default function SearchBar ({ onTextChange }) {

    const [text, setText] = useState("");
    
    const item = useSelector(state => state);
    const dispatch = useDispatch();
    
    const updateImage = () => {
        dispatch({ type: IMAGE_CHANGE, payload: newImage });
    };

    return (
        <View style={{ 
            marginLeft: 24 , 
            marginRight: 24,
            marginTop: 24,
            marginBottom: 16,
            flexDirection: 'row' 
            }}>
            <TextInput
                style={{
                    height: 40,
                    borderWidth: 1,
                    padding: 10,
                    marginRight: 10, 
                    borderColor: 'gray',
                    borderRadius: 4,
                    flex:1,
                }}
                onChangeText={setText}
                value={text}
                placeholder="Search images..."
                keyboardType="default"
            />
            <Button title="Search" 
                onPress={()=>onTextChange(text)} />
        </View>
    );
}