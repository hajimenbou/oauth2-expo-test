import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { StyleSheet, Button, View, Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'http://localhost:8000/oauth/authorize',
  tokenEndpoint: 'http://localhost:8000/oauth/tokens/refresh',
};

export default function App() {
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '<your client id>',
      clientSecret: '<your client secret>',
      redirectUri: 'exp://localhost:19000',
      // redirectUri: makeRedirectUri({
      //   scheme: 'your.app',
      // }),
      // imgur requires an empty array
      scopes: [],
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});