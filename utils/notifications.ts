import Toast from 'react-native-toast-message';

export function showProductLimitNotification(productName: string): void {
  Toast.show({
    type: 'error',
    text1: 'Product Limit Reached!',
    text2: `"${productName}" was your 5th product. Maximum limit reached.`,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 80,
  });
}

export function showSuccessNotification(productName: string, count: number): void {
  Toast.show({
    type: 'success',
    text1: 'Product Added Successfully!',
    text2: `"${productName}" added to inventory (${count}/5)`,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 80,
  });
}
