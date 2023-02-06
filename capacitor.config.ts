import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sungbok.acafe',
  appName: 'acafe',
  webDir: 'build',
  bundledWebRuntime: false,
  server:{
    url : "https://port-0-acafe-kiosk-sveltekit-1jx7m2gldi7x7be.gksl2.cloudtype.app:3000", //<=이부분은 연결할 주소로 설정
    cleartext : true
  }
};

export default config;
