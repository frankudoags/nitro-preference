import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Preference } from 'nitro-preferences'

export default function App() {
  const [key, setKey] = useState('my_key')
  const [stringValue, setStringValue] = useState('hello world')
  const [numberValue, setNumberValue] = useState('42')
  const [boolValue, setBoolValue] = useState(true)
  const [storedValues, setStoredValues] = useState<Array<{ key: string; type: string; value: string }>>([])

  const handleSetString = async () => {
    try {
      await Preference.setString(key, stringValue)
      loadValues()
      Alert.alert('Success', `Set string: ${key} = ${stringValue}`)
    } catch (error) {
      Alert.alert('Error', String(error))
    }
  }

  const handleSetNumber = async () => {
    try {
      const num = parseFloat(numberValue)
      if (isNaN(num)) {
        Alert.alert('Error', 'Invalid number')
        return
      }
      await Preference.setNumber(key, num)
      loadValues()
      Alert.alert('Success', `Set number: ${key} = ${num}`)
    } catch (error) {
      Alert.alert('Error', String(error))
    }
  }

  const handleSetBool = async () => {
    try {
      await Preference.setBool(key, boolValue)
      loadValues()
      Alert.alert('Success', `Set bool: ${key} = ${boolValue}`)
    } catch (error) {
      Alert.alert('Error', String(error))
    }
  }

  const handleGetString = async () => {
    try {
      const value = await Preference.getString(key)
      loadValues()
      Alert.alert('Result', `String value for "${key}": ${value ?? 'null'}`)
    } catch (error) {
      Alert.alert('Error', String(error))
    }
  }

  const handleGetNumber = async () => {
    try {
      const value = await Preference.getNumber(key)
      loadValues()
      Alert.alert('Result', `Number value for "${key}": ${value ?? 'null'}`)
    } catch (error) {
      Alert.alert('Error', String(error))
    }
  }

  const handleGetBool = async () => {
    try {
      const value = await Preference.getBool(key)
      loadValues()
      Alert.alert('Result', `Bool value for "${key}": ${value ?? 'null'}`)
    } catch (error) {
      Alert.alert('Error', String(error))
    }
  }

  const handleRemove = async () => {
    try {
      await Preference.remove(key)
      loadValues()
      Alert.alert('Success', `Removed key: ${key}`)
    } catch (error) {
      Alert.alert('Error', String(error))
    }
  }

  const handleClear = async () => {
    try {
      await Preference.clear()
      loadValues()
      Alert.alert('Success', 'Cleared all preferences')
    } catch (error) {
      Alert.alert('Error', String(error))
    }
  }

  const loadValues = async () => {
    try {
      const testKeys = ['my_key', 'my_key_string', 'my_key_number', 'my_key_bool']
      const values: Array<{ key: string; type: string; value: string }> = []

      for (const testKey of testKeys) {
        const strValue = await Preference.getString(testKey)
        if (strValue !== null) {
          values.push({ key: testKey, type: 'string', value: strValue })
          continue
        }

        const numValue = await Preference.getNumber(testKey)
        if (numValue !== null) {
          values.push({ key: testKey, type: 'number', value: String(numValue) })
          continue
        }

        const boolValue = await Preference.getBool(testKey)
        if (boolValue !== null) {
          values.push({ key: testKey, type: 'boolean', value: String(boolValue) })
          continue
        }
      }

      setStoredValues(values)
    } catch (error) {
      console.error('Failed to load values:', error)
    }
  }

  React.useEffect(() => {
    loadValues()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Nitro Preferences Demo</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key</Text>
          <TextInput style={styles.input} value={key} onChangeText={setKey} placeholder="Enter key" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>String Value</Text>
          <TextInput
            style={styles.input}
            value={stringValue}
            onChangeText={setStringValue}
            placeholder="Enter string value"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleSetString}>
              <Text style={styles.buttonText}>Set String</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleGetString}>
              <Text style={styles.buttonText}>Get String</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number Value</Text>
          <TextInput
            style={styles.input}
            value={numberValue}
            onChangeText={setNumberValue}
            placeholder="Enter number"
            keyboardType="numeric"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleSetNumber}>
              <Text style={styles.buttonText}>Set Number</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleGetNumber}>
              <Text style={styles.buttonText}>Get Number</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Boolean Value: {boolValue ? 'true' : 'false'}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleSetBool}>
              <Text style={styles.buttonText}>Set Bool</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleGetBool}>
              <Text style={styles.buttonText}>Get Bool</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.button, styles.buttonTertiary]} onPress={() => setBoolValue(!boolValue)}>
            <Text style={styles.buttonText}>Toggle Bool Value</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={handleRemove}>
              <Text style={styles.buttonText}>Remove Key</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={handleClear}>
              <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stored Values</Text>
          {storedValues.length === 0 ? (
            <Text style={styles.noData}>No values stored</Text>
          ) : (
            storedValues.map((item, index) => (
              <View key={index} style={styles.valueItem}>
                <Text style={styles.valueKey}>{item.key}</Text>
                <Text style={styles.valueType}>[{item.type}]</Text>
                <Text style={styles.valueValue}>{item.value}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#5856D6',
  },
  buttonTertiary: {
    backgroundColor: '#34C759',
    marginTop: 8,
  },
  buttonDanger: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noData: {
    color: '#999',
    textAlign: 'center',
    padding: 8,
  },
  valueItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  valueKey: {
    flex: 1,
    fontWeight: '500',
    color: '#333',
  },
  valueType: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    fontSize: 12,
    color: '#666',
  },
  valueValue: {
    flex: 1,
    textAlign: 'right',
    color: '#007AFF',
    fontFamily: 'monospace',
  },
})
