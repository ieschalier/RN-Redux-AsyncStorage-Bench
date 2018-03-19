import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native'
import { connect } from 'react-redux'
import * as actions from './actions'
console.log(actions)
class App extends React.Component {
  state = {
    storeLoadTime: undefined,
    saveTime: undefined,
    loadTime: undefined,
  }

  componentDidMount = () => {
    this.fetchTime = Date.now()
    this.props.loadData()
  }

  componentWillReceiveProps = nProps => {
    if (nProps.data.length !== this.props.data) {
      this.setState({ storeLoadTime: Date.now() - this.fetchTime })
    }
  }

  save = async () => {
    time = Date.now()
    await AsyncStorage.setItem('save', JSON.stringify(this.props.data))
    this.setState({ saveTime: Date.now() - time })
  }

  load = async () => {
    time = Date.now()
    await AsyncStorage.getItem('save')
    this.setState({ loadTime: Date.now() - time })
  }

  time
  render() {
    const { storeLoadTime, saveTime, loadTime } = this.state
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          Time to add more then 36000 line of json in redux store{storeLoadTime &&
            ` : ${storeLoadTime} ms`}
        </Text>
        <Button title="save" onPress={this.save} />
        {saveTime && (
          <View>
            <Text>Time to save data with AsyncStorage : {saveTime} ms</Text>
            <Button title="load" onPress={this.load} />
            {loadTime && (
              <Text>Time to load data with AsyncStorage : {loadTime} ms</Text>
            )}
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default connect(data => ({ data }), actions)(App)
