import Constants from "expo-constants"

const {manifest} = Constants;
export const BASE_API_URL = `http://${manifest.debuggerHost.split(':').shift()}:5000/api`;