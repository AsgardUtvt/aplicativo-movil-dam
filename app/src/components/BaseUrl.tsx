import {getDeviceIPv4} from "../utils/singleton";



export const BaseUrl = async () => {

    const ip =  getDeviceIPv4();
    return `http://${ip}:3000`;
};
