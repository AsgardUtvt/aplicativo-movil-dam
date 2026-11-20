import * as Network from 'expo-network';

// src/utils/deviceInfo.ts
let deviceIPv4: string | null = null;

export const setDeviceIPv4 = (ip: string | null) => {
    console.log("Ip recibio el set ", ip);
    
  deviceIPv4 = ip;
};

export const getDeviceIPv4 = (): string | null => {
  return deviceIPv4;
};
