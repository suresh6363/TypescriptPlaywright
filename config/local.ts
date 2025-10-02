import { TuiPlaywrightTestsConfig } from "../typings/tuiPlaywrightTestsConflig";
const nlRegion='nl'
const ukRegion='uk'
const usRegion='us' 
const localConfig: TuiPlaywrightTestsConfig = {
  US_User:{
    
    url:`https://www.tui.be/${usRegion}`,
  },
   UK_User:{
    
    url:`https://www.tui.be/${ukRegion}`
  },
   NL_User:{
   
    url:`https://www.tui.be/${nlRegion}`,
  },
};
export default localConfig;