import { View } from 'react-native'
import React from 'react'

import Spinner from 'react-native-loading-spinner-overlay'

export default function Loading({ loading }) {
  return <View>{loading && <Spinner visible={loading} />}</View>
}
