/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert} from 'react-native';
import { apiHost } from "./config/config";



export default class App extends Component {
    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            blogs: {},
            title : "",
            content : ""
        }
    }

    allBlogs = _ => {
        return fetch(`${apiHost}/blogs`)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState(_ => (
                { isLoading: false, blogs: responseJson }
            ))
        })
        .catch((error) => {
            console.error(error);
        });
    }

    addBlog = (title, content) => {
        if (title === "" || content === "") {
            Alert.alert(
                'Empty Values',
                'Please enter valid title and content',
                [
                //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: true},
            );
            
            return
        }
        return fetch((`${apiHost}/blog/add`), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            this.resetState()
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
    upVoteBlog = (blogID) => {
        return fetch(`${apiHost}/blog/upvote/${blogID}`)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState(_ => (
                { isLoading: false, blogs: responseJson.blogs }
            ))
        })
        .catch((error) => {
            console.error(error);
        });
    }

    resetState = _ => {
        this.setState({
            blogs : this.allBlogs(),
            title : "",
            content : ""
        })
    }

    componentDidMount(){
        this.setState({
            blogs : this.allBlogs()
        })   
    }

  render() {
    return (
        <View style={styles.container}>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({title : text})}
                value={this.state.title}
                placeholder="Enter Blog Title"
            />
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({content : text})
                }
                value={this.state.content}
                placeholder="Enter Blog Content"
            />
            <Button
                onPress={() => this.addBlog(this.state.title, this.state.content)}
                title="Add Blog"
                color="#841584"
            />
            <FlatList
                keyExtractor={blogs => blogs.blogID}
                data={this.state.blogs}
                renderItem={({ item }) =>
                    <View>
                        <Text>
                        Title   : {item.title +"\n"} 
                        Content : {item.content+"\n"} 
                        Date    : {item.dateAdded+"\n"}
                        Votes   : {item.votes+"\n"} 
                        </Text>
                        <Button
                        onPress={() => this.upVoteBlog(item.blogID)}
                        title="Up Vote"
                        color="#841584"
                        />
                    </View>
                }
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
