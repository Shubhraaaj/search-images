import React, { useState } from "react";
import { TextInput, Button, View } from "react-native";

export default function SearchBar ({ onTextChange }) {

    const [text, setText] = useState("");

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