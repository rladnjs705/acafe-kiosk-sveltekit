import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sungbok.acafe',
  appName: 'acafe',
  webDir: 'build',
  bundledWebRuntime: false,
  server:{
    url : "http://localhost:3000", //<=이부분은 연결할 주소로 설정
    cleartext : true,
    allowNavigation: ['localhost']
  }
};

export default config;
