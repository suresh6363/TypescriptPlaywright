import { TuiPlaywrightTestsConfig } from "../typings/tuiPlaywrightTestsConflig";
const nlRegion='nl'
const ukRegion='uk'
const usRegion='us' 
const localConfig: TuiPlaywrightTestsConfig = {
  US_User:{
    
    url:`https://www.tui.co.uk`,
  },
   UK_User:{
    
    url:`https://www.tui.co.uk`
  },
   NL_User:{
   
    url:`https://www.tui.co.uk`,
  },
};
export default localConfig;