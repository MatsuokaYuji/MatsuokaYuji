import * as ImagePicker from 'expo-image-picker';
import { Constants } from 'expo-constants';

const getCameraRollPermission = async () => {
    // webappのため削除した箇所あり
    // if (Constants.platform.ios) {
    // }
    const {status} = await ImagePicker.getCameraPermissionsAsync();
    if (status !=="granted"){
        alert("画像を選択すためにはカメラロールの許可が必要です")
    }
}

export const pickImage = async () => {
    await getCameraRollPermission
    // imagepicker起動
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:false
    });
    if (!result.cancelled){
        return result.uri;
    }
}